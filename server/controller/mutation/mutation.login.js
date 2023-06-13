import { User } from "../../models/user.model.js";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const mutLogin = async (_, { id, password }) => {
  const users = await User.find();
  const foundUser = users.find((user) => {
    const [userId] = user.email.split("@");
    console.log(user)
    return userId === id;
  });

  if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
    throw new Error("Invalid ID or password");
  }

  const token = jwt.sign({ userId: foundUser._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  foundUser.tokenExpiration = Math.floor(Date.now() / 1000) + 86400;
  await foundUser.save();
  return { token, user: foundUser };
};
