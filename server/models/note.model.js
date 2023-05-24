import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: String,
  content: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Group",
  },
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

export const Note = mongoose.model("Note", NoteSchema);
