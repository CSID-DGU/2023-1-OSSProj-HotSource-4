import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";
import { Group } from "./models/group.model.js";
import { Note } from "./models/note.model.js";
import { getUserFromToken, requireAuth } from "./user.permission.js";
import "dotenv/config";

// 몽고DB연결
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.error("Error connecting to MongoDB:", err);
});

const typeDefs = gql`
  type Query {
    notes: [Note]
    note(_id: ID!): Note
  }

  type Mutation {
    createNote(title: String!, content: String!, groupId: ID!): Note
    updateNote(_id: ID!, title: String, content: String): Note
    deleteNote(_id: ID!): Note
    createUser(username: String!, password: String!): User
    login(username: String!, password: String!): AuthPayload
    createGroup(name: String!): Group
    addUserToGroup(userId: ID!, groupId: ID!): Group
  }

  type Note {
    _id: ID!
    title: String!
    content: String!
    owner: User!
    group: Group!
  }

  type User {
    _id: ID!
    username: String!
    groups: [Group!]!
  }

  type Group {
    _id: ID!
    name: String!
    members: [User!]!
    notes: [Note!]!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

const resolvers = {
  Query: {
    notes: async (_, __, { user }) => {
      requireAuth(user);
      const groups = await Group.find({ members: { $in: [user._id] } });
      return Note.find({ group: { $in: groups.map((group) => group._id) } });
    },
    note: async (_, { _id }, { user }) => {
      requireAuth(user);
      const note = await Note.findById(_id).populate("group");
      if (!note) throw new Error("Note not found");
      if (!note.group.members.includes(user._id)) {
        throw new Error("Unauthorized");
      }
      return note;
    },
  },

  Mutation: {
    createNote: async (_, { title, content, groupId }, { user }) => {
      requireAuth(user);
      const group = await Group.findById(groupId);
      if (!group || !group.members.includes(user._id)) {
        throw new Error("Unauthorized");
      }
      const note = new Note({
        title,
        content,
        owner: user._id,
        group: groupId,
      });
      return note.save();
    },
    updateNote: async (_, { _id, title, content }, { user }) => {
      requireAuth(user);
      const note = await Note.findById(_id);
      if (!note || note.owner.toString() !== user._id.toString()) {
        throw new Error("Unauthorized");
      }
      return Note.findByIdAndUpdate(_id, { title, content }, { new: true });
    },
    deleteNote: async (_, { _id }, { user }) => {
      requireAuth(user);
      const note = await Note.findById(_id);
      if (!note || note.owner.toString() !== user._id.toString()) {
        throw new Error("Unauthorized");
      }
      return Note.findByIdAndDelete(_id);
    },
    createUser: async (_, { username, password }) => {
      const user = new User({ username, password });
      return user.save();
    },
    login: async (_, { username, password }) => {
      const user = await User.findOne({ username });
      if (!user || user.password !== password) {
        throw new Error("Invalid username or password");
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return { token, user };
    },
    createGroup: async (_, { name }, { user }) => {
      requireAuth(user);
      const group = new Group({ name, members: [user._id] });
      return group.save();
    },
    addUserToGroup: async (_, { userId, groupId }, { user }) => {
      requireAuth(user);
      const group = await Group.findById(groupId);
      if (!group || !group.members.includes(user._id)) {
        throw new Error("Unauthorized");
      }
      group.members.push(userId);
      return group.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const token = req.headers.authorization;
    const user = await getUserFromToken(token);
    return { user };
  },
  cors: {
    origin: "*",
    credentials: true,
  },
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`Server running at ${url}`);
});
