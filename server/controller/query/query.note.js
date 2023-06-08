import { Group } from "../../models/group.model.js";
import { Note } from "../../models/note.model.js";
import { requireAuth } from "../../user.permission.js";

export const queryNotes = async (_, { groupId }, { user }) => {
  requireAuth(user);
  const userGroups = await Group.find({ members: { $in: [user._id] } });
  if (!userGroups.map((group) => group._id).includes(groupId)) {
    throw new AuthenticationError("Unauthorized");
  }
  return Note.find({ group: groupId });
};

export const queryNote = async (_, { groupId, noteId }, { user }) => {
  requireAuth(user);
  const userGroups = await Group.find({ members: { $in: [user._id] } });
  if (!userGroups.map((group) => group._id).includes(groupId)) {
    throw new AuthenticationError("Unauthorized");
  }
  const note = await Note.findOne({ _id: noteId, group: groupId });
  if (!note) throw new Error("Note not found");
  return note;
};
