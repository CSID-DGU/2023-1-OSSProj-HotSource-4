import { User } from "../../models/user.model.js";

export const queryUsers = async () => {
  return User.find();
};

export const queryUser = async (_, { userId }) => {
  return User.findById(userId);
};
