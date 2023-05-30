import { User } from "../../models/user.model.js";

export const queryUsers = async () => {
  return User.find().populate("groups").populate("subjects");
};

export const queryUser = async (_, { _id }) => {
  return User.findById(_id).populate("groups").populate("subjects");
};
