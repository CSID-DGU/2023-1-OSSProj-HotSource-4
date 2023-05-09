import jwt from "jsonwebtoken";
import { User } from "./models/user.model.js";

export const getUserFromToken = async (token) => {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    return user;
  } catch (err) {
    return null;
  }
};

export const requireAuth = (user) => {
  if (!user) {
    throw new Error("Authentication required");
  }
};
