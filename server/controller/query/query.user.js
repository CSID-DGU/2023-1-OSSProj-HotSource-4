import { User } from "../../models/user.model.js";

export const queryUsers = async () => {
  return User.find().populate("groups").populate("subjects");
};

export const queryUser = async (_, { userId }) => {
  return User.findById(userId).populate("groups").populate("subjects");
};
