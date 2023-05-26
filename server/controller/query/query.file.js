import { File } from "../../models/file.model.js";
import { Group } from "../../models/group.model.js";

export const queryFiles = async () => {
  return File.find();
};

export const queryFile = async (_, { _id }) => {
  return File.findById(_id);
};

export const queryGroupFiles = async (_, { groupId }, { user }) => {
  requireAuth(user);
  const group = await Group.findById(groupId);
  if (!group.members.includes(user._id)) {
    throw new AuthenticationError("Unauthorized");
  }
  return File.find({ group: groupId });
};

export const queryUserFiles = async (_, __, { user }) => {
  requireAuth(user);
  return File.find({ uploader: user._id });
};
