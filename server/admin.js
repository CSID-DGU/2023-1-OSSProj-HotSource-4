import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";

export const createAdmin = async () => {
  const adminName = "관리자";
  const adminEmail = "admin@dgu.co.kr";
  const adminPassword = "hotsource";

  // 이미 관리자 계정이 있는지 확인
  const existingAdmin = await User.findOne({
    email: adminEmail,
    isAdmin: true,
  });
  if (existingAdmin) {
    console.log("Admin user already exists");
    return; // 관리자 계정이 이미 있다면 더 이상 진행하지 않고 종료
  }

  // 새로운 관리자 계정 생성
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
