import { User } from "../../models/user.model.js";
import { Group } from "../../models/group.model.js";
import { Message } from "../../models/message.model.js";
import { requireAuth } from "../../user.permission.js";

export const mutSendMessage = async (_, { content, groupId }, { user, pubsub }) => {
  requireAuth(user);
  const group = await Group.findById(groupId);
  if (!group.members.includes(user._id)) {
    throw new Error("Unauthorized");
  }
  const message = new Message({
    content,
    user: user._id,
    group: groupId,
  });
  await message.save();

  // 새로운 메시지가 전송되었음을 PubSub으로 알림
  pubsub.publish("MESSAGE_CREATED", { messageCreated: message });

  return message;
};
