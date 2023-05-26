import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  credit: Number,
  classification: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
    },
  ],
});

export const Subject = mongoose.model("Subject", SubjectSchema);
