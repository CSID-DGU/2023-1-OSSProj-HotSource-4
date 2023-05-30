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
    .sort({ createdAt: 1 });
  
    // 각 메시지에 isCurrentUser필드를 추가하여 본인의 메시지인지 아닌지 알 수 있음
    messages.forEach(message => {
      message.isCurrentUser = String(message.user._id) === String(user._id);
    });
  
    return messages;
  };
  