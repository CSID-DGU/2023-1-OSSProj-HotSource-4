import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      maxlength: 50,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    files: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "File",
      },
    ],
    assignmentPeriod: {
      start: {
        type: Date,
        required: true,
      },
      end: {
        type: Date,
        required: true,
      },
    },
    gradeReleaseDate: {
      type: Date,
      required: true,
    },
    extensionAllowed: {
      type: Boolean,
      default: false,
    },
    submissionStatus: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const Group = mongoose.model("Group", groupSchema);
