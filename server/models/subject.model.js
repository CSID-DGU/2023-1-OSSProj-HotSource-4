import mongoose from "mongoose";

const SubjectSchema = new mongoose.Schema({
  name: String,
  credit: Number,
  classification: String,
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

export const Subject = mongoose.model("Subject", SubjectSchema);
