import { User } from "../../models/user.model.js";
import { Group } from "../../models/group.model.js";
import { Message } from "../../models/message.model.js";
import { requireAuth } from "../../user.permission.js";

export const mutSendMessage = async (_, { content, groupId }, { user }) => {
  requireAuth(user);

  const group = await Group.findById(groupId);
  const detailedUser = await User.findById(user._id);

  if (!group.members.includes(user._id)) {
    throw new Error("Unauthorized");
  }

  const message = new Message({
    content,
    user: detailedUser,
    group: group, 
  });

  await message.save();

  return message;
};
