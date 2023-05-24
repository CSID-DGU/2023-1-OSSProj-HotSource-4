import { Group } from "../../models/group.model.js";
import { Note } from "../../models/note.model.js";
import { requireAuth } from "../../user.permission.js";

export const queryNotes = async (_, __, { user }) => {
  requireAuth(user);
  const groups = await Group.find({ members: { $in: [user._id] } });
  return Note.find({ group: { $in: groups.map((group) => group._id) } });
};

export const queryNote = async (_, { _id }, { user }) => {
  requireAuth(user);
  const note = await Note.findById(_id).populate("group");
  if (!note) throw new Error("Note not found");
  if (!note.group.members.includes(user._id)) {
    throw new AuthenticationError("Unauthorized");
  }
  return note;
};
