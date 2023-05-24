import { AuthenticationError } from "apollo-server";
import { Group } from "../../models/group.model.js";
import { requireAuth } from "../../user.permission.js";

export const mutCreateGroup = async (_, { name }, { user }) => {
  requireAuth(user);
  if (!name) {
    throw new Error("Group name is required");
  }
  if (name.length > 50) {
    throw new Error("Group name should not exceed 50 characters");
  }
  const existingGroup = await Group.findOne({ name });
  if (existingGroup) {
    throw new Error("Group name already exists");
  }
  const group = new Group({ name, members: [user._id] });
  return group.save();
};

export const mutAddUserToGroup = async (_, { userId, groupId }, { user }) => {
  requireAuth(user);
  const group = await Group.findById(groupId);
  if (!group || !group.members.includes(user._id)) {
    throw new AuthenticationError("Unauthorized");
  }
  if (!group.members.includes(userId)) {
    group.members.push(userId);
    await group.save();
  }
  await Group.populate(group, "members");
  return group;
};

export const mutAddFileToGroup = async (_, { groupId, fileId }, { user }) => {
  requireAuth(user);
  const group = await Group.findById(groupId);
  if (!group || !group.members.includes(user._id)) {
    throw new AuthenticationError("Unauthorized");
  }
  if (group.files.includes(fileId)) {
    throw new Error("File already exists in the group");
  }
  group.files.push(fileId);
  await group.save();
  await Group.populate(group, ["members", "files"]);
  return group;
};

export const mutRemoveFileToGroup = async (
  _,
  { groupId, fileId },
  { user }
) => {
  requireAuth(user);
  const group = await Group.findById(groupId);
  if (!group || !group.members.includes(user._id)) {
    throw new AuthenticationError("Unauthorized");
  }
  const fileIndex = group.files.indexOf(fileId);
  if (fileIndex === -1) {
    throw new Error("File not found in the group");
  }
  group.files.splice(fileIndex, 1);
  await group.save();
  await Group.populate(group, ["members", "files"]);
  return group;
};
