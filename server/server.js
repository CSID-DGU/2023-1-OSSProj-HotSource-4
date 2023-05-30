import { ApolloServer, gql } from "apollo-server";
import mongoose from "mongoose";
import {
  queryFile,
  queryGroupFiles,
  queryUserFiles,
} from "./controller/query/query.file.js";
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
import { queryUser, queryUsers } from "./controller/query/query.user.js";
import { queryGroup, queryGroups } from "./controller/query/query.group.js";
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
    await initData();
    console.log("Admin user checked successfully");
  } catch (error) {
    console.error("Error checking admin user:", error);
  }

  const typeDefs = gql`
    scalar Upload
    scalar DateTime

    type Query {
      notes(groupId: ID!): [Note]
      note(_id: ID!): Note
      groupFiles(groupId: ID!): [File]
      userFiles(userId: ID!): [File]
      file(_id: ID!): File
      subjects: [Subject]
      subject(_id: ID!): Subject
      userSubjects(userId: ID!): [Subject]
      groups: [Group]
      group(_id: ID!): Group
      users: [User]
      user(_id: ID!): User
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
      ): Group
      addUserToGroup(userId: ID!, groupId: ID!): Group
      removeUserFromGroup(userId: ID!, groupId: ID!): Group
      createFile(file: Upload!, uploaderId: ID!): File
      deleteFile(_id: ID!): File
      addFileToGroup(groupId: ID!, fileId: ID!): Group
      removeFileFromGroup(groupId: ID!, fileId: ID!): Group
      createSubject(name: String!, credit: Int, classification: String): Subject
      addUserToSubject(subjectId: ID!, userId: ID!): Subject
      removeUserFromSubject(subjectId: ID!, userId: ID!): Subject
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
      capacity: Int
      users: [User!]!
    }
  `;

  const resolvers = {
    Query: {
      notes: queryNotes,
      note: queryNote,
      file: queryFile,
      groupFiles: queryGroupFiles,
      userFiles: queryUserFiles,
      subjects: querySubjects,
      subject: querySubject,
      userSubjects: queryUserSubjects,
      users: queryUsers,
      user: queryUser,
      groups: queryGroups,
      group: queryGroup,
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