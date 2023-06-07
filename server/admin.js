import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";
import "dotenv/config";

export const createAdmin = async () => {
  const adminName = "교수님";
  const adminEmail = process.env.ADMIN_ACCOUNT;
  const adminPassword = process.env.ADMIN_PASSWORD;

  const existingAdmin = await User.findOne({
    email: adminEmail,
    isAdmin: true,
  });
  if (existingAdmin) {
    console.log("Admin user already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash(adminPassword, 10);
  const newAdminUser = new User({
    username: adminName,
    email: adminEmail,
    password: hashedPassword,
    isAdmin: true,
  });

  await newAdminUser.save();
  console.log("Admin user created successfully");
};
