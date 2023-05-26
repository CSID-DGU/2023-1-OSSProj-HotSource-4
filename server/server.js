import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import { queryFiles, queryFile } from "./controller/query/query.file.js";
import { queryNotes, queryNote } from "./controller/query/query.note.js";
import {
  querySubjects,
  querySubject,
  queryUserSubjects,
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
  mutAddFileToGroup,
  mutRemoveFileToGroup,
} from "./controller/mutation/mutation.group.js";
import { mutLogin } from "./controller/mutation/mutation.login.js";
import {
  mutCreateFile,
  mutDeleteFile,
} from "./controller/mutation/mutation.file.js";
import {
  mutAddUserToSubject,
  mutCreateSubject,
} from "./controller/mutation/mutation.subject.js";
import { getUserFromToken } from "./user.permission.js";
import "dotenv/config";

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDataBase is connected");

  mongoose.connection.db.collection("users").createIndex({ email: 1 });

  const typeDefs = gql`
    scalar Upload

    type Query {
      notes: [Note]
      note(_id: ID!): Note
      files: [File]
      file(_id: ID!): File
      subjects: [Subject]
      subject(_id: ID!): Subject
      userSubjects: [Subject]
    }

    type Mutation {
      createNote(title: String!, content: String!, groupId: ID!): Note
      updateNote(_id: ID!, title: String, content: String): Note
      deleteNote(_id: ID!): Note
      createUser(email: String!, password: String!): User
      login(id: String!, password: String!): AuthPayload
      createGroup(name: String!): Group
      addUserToGroup(userId: ID!, groupId: ID!): Group
      createFile(file: Upload!): File
      deleteFile(_id: ID!): File
      addFileToGroup(groupId: ID!, fileId: ID!): Group
      removeFileFromGroup(groupId: ID!, fileId: ID!): Group
      createSubject(name: String!, credit: Int, classification: String): Subject
      addUserToSubject(subjectId: ID!, userId: ID!): Subject
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
      email: String!
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
      files: [File!]!
    }

    type AuthPayload {
      token: String!
      user: User!
    }

    type File {
      _id: ID!
      file_name: String!
      mimetype: String!
      file_path: String
      file_size: Int
      uploader: User!
    }

    type Subject {
      _id: ID!
      name: String!
      credit: Int
      classification: String
      users: [User!]!
    }
  `;

  const resolvers = {
    Query: {
      notes: queryNotes,
      note: queryNote,
      files: queryFiles,
      file: queryFile,
      subjects: querySubjects,
      subject: querySubject,
      userSubjects: queryUserSubjects,
    },

    Mutation: {
      createNote: mutCreateNote,
      updateNote: mutUpdateNote,
      deleteNote: mutDeleteNote,
      createUser: mutCreateUser,
      login: mutLogin,
      createGroup: mutCreateGroup,
      addUserToGroup: mutAddUserToGroup,
      createFile: mutCreateFile,
      deleteFile: mutDeleteFile,
      addFileToGroup: mutAddFileToGroup,
      removeFileFromGroup: mutRemoveFileToGroup,
      createSubject: mutCreateSubject,
      addUserToSubject: mutAddUserToSubject,
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