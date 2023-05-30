import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";

export const createAdmin = async () => {
  const adminName = "관리자";
  const adminEmail = "admin@dgu.co.kr";
  const adminPassword = "hotsource";

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
