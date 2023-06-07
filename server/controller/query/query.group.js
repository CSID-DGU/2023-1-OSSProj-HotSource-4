import { Group } from "../../models/group.model.js";

export const queryGroups = async () => {
  return Group.find().populate("members");
};

export const queryGroup = async (_, { _id }) => {
  return Group.findById(_id).populate("members");
};
