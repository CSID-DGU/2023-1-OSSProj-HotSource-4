import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import { queryNote, queryNotes } from "./controller/query/query.note.js";
import {
  querySubjects,
  querySubject,
  queryUserSubjects,
  querySubjectGroups,
} from "./controller/query/query.subject.js";
import {
  mutCreateNote,
  mutDeleteNote,
  mutUpdateNote,
} from "./controller/mutation/mutation.note.js";
import { mutCreateUser } from "./controller/mutation/mutation.user.js";
import {
  mutCreateGroup,
  mutAddUserToGroup,
  mutUpdateGroup,
} from "./controller/mutation/mutation.group.js";
import { mutLogin } from "./controller/mutation/mutation.login.js";
import {
  mutAddUserToSubject,
  mutCreateSubject,
} from "./controller/mutation/mutation.subject.js";
import { queryUser, queryUsers } from "./controller/query/query.user.js";
import { queryGroup, queryGroups } from "./controller/query/query.group.js";
import { mutSendMessage } from "./controller/mutation/mutation.message.js";
import { queryMessages } from "./controller/query/query.message.js";
import { getUserFromToken } from "./user.permission.js";
import { createAdmin } from "./admin.js";
import { initData } from "./info.js";
import "dotenv/config";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", async () => {
  console.log("MongoDataBase is connected");

  try {
    await createAdmin();
    // await initData();
    console.log("Admin user checked successfully");
  } catch (error) {
    console.error("Error checking admin user:", error);
  }

  const typeDefs = gql`
    scalar DateTime

    type Query {
      notes(groupId: ID!): [Note]
      note(_id: ID!): Note
      subjects: [Subject]
      subject(_id: ID!): Subject
      userSubjects(_id: ID!): [Subject]
      subjectGroups(_id: ID!): [Group]
      groups: [Group]
      group(_id: ID!): Group
      users: [User]
      user(_id: ID!): User
      messages(groupId: ID!): [Message]
    }

    type Mutation {
      createNote(
        title: String!
        content: String!
        groupId: ID!
        owner: ID!
      ): Note
      updateNote(_id: ID!, title: String, content: String): Note
      deleteNote(_id: ID!): Note
      createUser(username: String!, email: String!, password: String!): User
      login(id: String!, password: String!): AuthPayload
      createGroup(
        name: String!
        assignmentPeriod: AssignmentPeriodInput!
        gradeReleaseDate: DateTime!
        extensionAllowed: Boolean!
        subjectId: ID!
      ): Group
      updateGroup(
        _id: ID!
        assignmentPeriod: AssignmentPeriodInput
        gradeReleaseDate: DateTime
        extensionAllowed: Boolean
      ): Group
      addUserToGroup(userId: ID!, groupId: ID!): Group
      createSubject(name: String!, credit: Int, classification: String): Subject
      addUserToSubject(subjectId: ID!, userId: ID!): Subject
      sendMessage(content: String!, groupId: ID!): Message
    }

    type Note {
      _id: ID!
      title: String!
      content: String!
      color: String!
      owner: User!
      group: Group!
    }

    type User {
      _id: ID!
      username: String!
      email: String!
      password: String!
      groups: [Group!]!
      subjects: [Subject!]!
      isAdmin: Boolean!
      tokenExpiration: Int!
    }

    type Group {
      _id: ID!
      name: String!
      members: [User!]!
      notes: [Note!]!
      assignmentPeriod: AssignmentPeriod!
      gradeReleaseDate: DateTime!
      extensionAllowed: Boolean!
      submissionStatus: Boolean!
    }

    input AssignmentPeriodInput {
      start: DateTime!
      end: DateTime!
    }

    type AssignmentPeriod {
      start: DateTime!
      end: DateTime!
    }

    type AuthPayload {
      token: String!
      user: User!
    }

    type Subject {
      _id: ID!
      name: String!
      credit: Int
      classification: String
      capacity: Int
      users: [User!]!
      groups: [Group!]!
    }

    type Message {
      _id: ID!
      content: String!
      user: User!
      group: Group!
      isCurrentUser: Boolean
      createdAt: DateTime
      groupName: String!
    }
  `;

  const resolvers = {
    Query: {
      notes: queryNotes,
      note: queryNote,
      subjects: querySubjects,
      subject: querySubject,
      userSubjects: queryUserSubjects,
      subjectGroups: querySubjectGroups,
      users: queryUsers,
      user: queryUser,
      groups: queryGroups,
      group: queryGroup,
      messages: queryMessages,
    },

    Mutation: {
      createNote: mutCreateNote,
      updateNote: mutUpdateNote,
      deleteNote: mutDeleteNote,
      createUser: mutCreateUser,
      login: mutLogin,
      createGroup: mutCreateGroup,
      updateGroup: mutUpdateGroup,
      addUserToGroup: mutAddUserToGroup,
      createSubject: mutCreateSubject,
      addUserToSubject: mutAddUserToSubject,
      sendMessage: mutSendMessage,
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

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`Server running at ${url}`);
  });
});

mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});
