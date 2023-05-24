import { File } from "../../models/file.model.js";

export const queryFiles = async () => {
  return File.find();
};

export const queryFile = async (_, { _id }) => {
  return File.findById(_id);
};
