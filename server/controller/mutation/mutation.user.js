import { requireAuth } from "../../user.permission.js";
import { AuthenticationError } from "apollo-server";
import { User } from "../../models/user.model.js";
import bcrypt from "bcrypt";

export const mutCreateUser = async (
  _,
  { username, email, password },
  { user }
) => {
  requireAuth(user);
  if (!user.isAdmin) {
    throw new AuthenticationError("Unauthorized: Only admins can create users");
  }

  if (username.length < 2) {
    throw new Error("Name should be at least 2 characters long");
  }

  if (email.length < 4) {
    throw new Error("Username should be at least 4 characters long");
  }

  if (password.length < 8) {
    throw new Error("Password should be at least 8 characters long");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Username already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashedPassword,
  });
  return newUser.save();
};
