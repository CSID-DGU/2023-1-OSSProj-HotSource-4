import { AuthenticationError } from "apollo-server";
import { Group } from "../../models/group.model.js";
import { Subject } from "../../models/subject.model.js";
import { requireAuth } from "../../user.permission.js";

export const mutCreateGroup = async (
  _,
  { name, assignmentPeriod, gradeReleaseDate, extensionAllowed, subjectId },
  { user }
) => {
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
  const group = new Group({
    name,
    members: [user._id],
    assignmentPeriod,
    gradeReleaseDate,
    extensionAllowed,
  });

  const savedGroup = await group.save();
  const subject = await Subject.findById(subjectId);
  if (subject) {
    subject.groups.push(savedGroup._id);
    await subject.save();
  }

  return savedGroup;
};

export const mutUpdateGroup = async (
  _,
  { groupId, assignmentPeriod, gradeReleaseDate, extensionAllowed },
  { user }
) => {
  requireAuth(user);
  const group = await Group.findById(groupId);

  if (!group || !group.members.includes(user._id)) {
    throw new AuthenticationError("Unauthorized");
  }
  if (!user.isAdmin) {
    throw new AuthenticationError("Only admins can update groups");
  }

  if (assignmentPeriod !== undefined) {
    group.assignmentPeriod = assignmentPeriod;
  }
  if (gradeReleaseDate !== undefined) {
    group.gradeReleaseDate = gradeReleaseDate;
  }
  if (extensionAllowed !== undefined) {
    group.extensionAllowed = extensionAllowed;
  }

  const updatedGroup = await group.save();
  return updatedGroup;
};

export const mutAddUserToGroup = async (_, { userId, groupId }, { user }) => {
  requireAuth(user);
  const group = await Group.findById(groupId);
  if (!group || !group.members.includes(user._id)) {
    throw new AuthenticationError("Unauthorized");
  }
  if (!user.isAdmin) {
    throw new AuthenticationError("Only admins can add users to groups");
  }
  if (!group.members.includes(userId)) {
    group.members.push(userId);
    await group.save();
  }
  await Group.populate(group, "members");
  return group;
};
