import bcrypt from "bcrypt";
import { User } from "./models/user.model.js";

export const createAdmin = async () => {
  const existingUser = await User.findOne({ email: "admin@dgu.co.kr" });

  if (!existingUser) {
    const hashedPassword = await bcrypt.hash("hotsource", 10);

    const adminUser = new User({
      name: "Admin",
      email: "admin@dgu.co.kr",
      password: hashedPassword,
      isAdmin: true,
    });

    await adminUser.save();

    console.log("Admin account created");
  } else {
    console.log("Admin account already exists");
  }
};
