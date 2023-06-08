import { Subject } from "../../models/subject.model.js";
import { requireAuth } from "../../user.permission.js";

export const querySubjects = async () => {
  return Subject.find().populate("users");
};

export const querySubject = async (_, { subjectId }) => {
  return Subject.findById(subjectId).populate("users");
};

export const queryUserSubjects = async (_, __, { user }) => {
  requireAuth(user);
  return Subject.find({ users: user._id });
};

export const querySubjectGroups = async (_, { subjectId }, { user }) => {
  requireAuth(user);
  return Subject.findById(subjectId).populate("groups");
};
