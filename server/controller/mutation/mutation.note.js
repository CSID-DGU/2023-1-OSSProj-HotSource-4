import { requireAuth } from "../../user.permission.js";
import { AuthenticationError } from "apollo-server";
import { Group } from "../../models/group.model.js";
import { Note } from "../../models/note.model.js";

export const mutCreateNote = async (
  _,
  { title, content, color, groupId, userId },
  { user }
) => {
  requireAuth(user);

  if (user._id.toString() !== userId) {
    throw new AuthenticationError("Unauthorized");
  }

  const group = await Group.findById(groupId);
  if (!title || title.trim() === "") {
    throw new Error("Title is required");
  }

  if (!group || !group.members.includes(user._id)) {
    throw new AuthenticationError("Unauthorized");
  }
  const note = new Note({
    title,
    content,
    color,
    owner: userId,
    group: groupId,
  });
  return note.save();
};

export const mutUpdateNote = async (
  _,
  { _id, title, content, color, userId },
  { user }
) => {
  requireAuth(user);

  if (user._id.toString() !== userId) {
    throw new AuthenticationError("Unauthorized");
  }

  const note = await Note.findById(_id);
  if (!note || note.owner.toString() !== user._id.toString()) {
    throw new AuthenticationError("Unauthorized");
  }

  if (!title || title.trim() === "") {
    throw new Error("Title is required");
  }

  return Note.findByIdAndUpdate(_id, { title, content, color }, { new: true });
};

export const mutDeleteNote = async (_, { _id, userId }, { user }) => {
  requireAuth(user);

  if (user._id.toString() !== userId) {
    throw new AuthenticationError("Unauthorized");
  }

  const note = await Note.findById(_id);
  if (!note || note.owner.toString() !== user._id.toString()) {
    throw new AuthenticationError("Unauthorized");
  }

  const deletedNote = await Note.findByIdAndDelete(_id);
  if (!deletedNote) {
    throw new Error("Note not found or already deleted");
  }

  return deletedNote;
};
