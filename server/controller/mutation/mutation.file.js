import { AuthenticationError } from "apollo-server";
import { createWriteStream } from "fs";
import { resolve, extname, join } from "path";
import { isValidExtension, isValidMimeType } from "../../file.constraint.js";
import fs from "fs";
import { requireAuth } from "../../user.permission.js";
import { File } from "../../models/file.model.js";
import "dotenv/config";

export const mutCreateFile = async (_, { file }, { user }) => {
  requireAuth(user);
  if (!file) {
    throw new Error("No file provided");
  }
  const { createReadStream, filename, mimetype } = await file;
  const extension = extname(filename);
  if (!isValidExtension(extension)) {
    throw new Error("Invalid file extension");
  }
  if (!isValidMimeType(mimetype)) {
    throw new Error("Invalid file format");
  }
  const MAX_FILE_SIZE =
    parseInt(process.env.MAX_FILE_SIZE_MB || "10", 10) * 1024 * 1024; // Default: 10MB
  let fileSize = 0;

  const stream = createReadStream();
  stream.on("data", (chunk) => {
    fileSize += chunk.length;
    if (fileSize > MAX_FILE_SIZE) {
      stream.destroy();
      throw new Error("File size exceeds the limit");
    }
  });
  const filePath = resolve(
    join(process.env.FILE_UPLOAD_PATH || "actual/upload/directory", filename)
  );
  const fileStream = createWriteStream(filePath);
  return new Promise((resolve, reject) => {
    stream
      .pipe(fileStream)
      .on("error", (error) => {
        console.error(`Error writing file: ${error}`);
        reject(error);
      })
      .on("finish", () => {
        const newFile = new File({
          file_name: filename,
          mimetype,
          file_path: filePath,
          file_size: fileSize,
          uploader: user._id,
        });
        resolve(newFile.save());
      });
  });
};

export const mutDeleteFile = async (_, { _id }, { user }) => {
  requireAuth(user);
  const file = await File.findById(_id);
  if (!file || file.uploader.toString() !== user._id.toString()) {
    throw new AuthenticationError("Unauthorized");
  }
  try {
    await fs.unlink(file.file_path);
  } catch (error) {
    console.error(`Failed to delete file from filesystem: ${error}`);
    throw new Error("Failed to delete file");
  }

  const deletedFile = await File.findByIdAndDelete(_id);
  if (!deletedFile) {
    throw new Error("File not found or already deleted");
  }
  return deletedFile;
};
