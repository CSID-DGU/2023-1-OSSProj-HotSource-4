import mongoose from "mongoose";

const FileSchema = new mongoose.Schema(
  {
    file_name: { type: String, required: true },
    mimetype: { type: String, required: true },
    file_path: String,
    file_size: Number,
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const File = mongoose.model("File", FileSchema);
