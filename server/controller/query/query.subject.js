import { File } from "../../models/file.model.js";

export const querySubjects = async () => {
  return Subject.find().populate("users");
};

export const querySubject = async (_, { _id }) => {
  return Subject.findById(_id).populate("users");
};

export const queryUserSubjects = async (_, __, { user }) => {
  requireAuth(user);
  return Subject.find({ users: user._id });
};
