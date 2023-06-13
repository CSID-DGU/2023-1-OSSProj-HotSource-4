import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";
import "dotenv/config";

export const getUserFromToken = async (token) => {
  if (!token) return null;

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    return null;
  }
};

export const requireAuth = (user) => {
  if (!user) {
    throw new Error("Authentication required");
  }
};
