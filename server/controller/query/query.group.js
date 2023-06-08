import { Group } from "../../models/group.model.js";

export const queryGroups = async () => {
  return Group.find().populate("members");
};

export const queryGroup = async (_, { groupId }) => {
  return Group.findById(groupId).populate("members");
};
