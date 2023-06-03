import { AuthenticationError } from "apollo-server";
import { Message } from "../../models/message.model.js";
import { Group } from "../../models/group.model.js";
import { requireAuth } from "../../user.permission.js";

export const queryMessages = async (_, { groupId }, { user }) => {
  requireAuth(user);
  const group = await Group.findById(groupId);
  if (!group.members.includes(user._id)) {
    throw new AuthenticationError("Unauthorized");
  }
  
  const messages = await Message.find({ group: groupId })
  .populate({
    path: 'user',
    select: 'username',
  })
  .populate({
    path: 'group',
    select: 'name',
  })
  .sort({ createdAt: 1 });

  const result = messages.map(message => ({
    ...message._doc,
    isCurrentUser: String(message.user._id) === String(user._id),
    groupName: message.group.name,
  }));

  return result;
};
