import { User } from "./models/user.model.js";
import { Subject } from "./models/subject.model.js";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const passwordLogPath = path.join(__dirname, "passwords.log");

const courseTypes = ["학기", "일교", "공교", "전공", "전필", "전선"];

const firstNames = [
  "지훈",
  "현우",
  "서준",
  "도윤",
  "하준",
  "지호",
  "준서",
  "예빈",
  "준우",
  "시우",
  "유준",
  "지우",
  "지후",
  "윤서",
  "서연",
  "민영",
  "준호",
  "유찬",
  "지환",
  "윤우",
  "민준",
  "재윤",
  "서진",
  "시윤",
  "도준",
  "세아",
  "유빈",
  "민지",
  "정훈",
  "연서",
  "유나",
  "소영",
];

const lastNames = [
  "김",
  "이",
  "박",
  "최",
  "정",
  "성",
  "강",
  "조",
  "윤",
  "장",
  "임",
  "오",
  "한",
  "신",
  "서",
  "권",
  "황",
  "안",
  "송",
  "류",
  "홍",
  "고",
  "진",
  "허",
];

function generateRandomPassword() {
  const length = 8;
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
  let password = "";
  for (let i = 0, n = charset.length; i < length; ++i) {
    password += charset[Math.floor(Math.random() * n)];
  }
  return password;
}

const getRandomKoreanName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return lastName + firstName;
};

const MAX_CONCURRENT_SAVES = 100;

async function assignSubjectsToUsers(users, subjects) {
  const saveQueue = [];

  for (let user of users) {
    // Randomly choose how many subjects this user will take
    const numSubjects = Math.floor(Math.random() * (7 - 4)) + 4;

    while (user.subjects.length < numSubjects) {
      let subjectIndex = Math.floor(Math.random() * subjects.length);
      let subject = subjects[subjectIndex];

      // Ensure student hasn't taken this subject and subject is not full
      if (
        !user.subjects.includes(subject._id) &&
        subject.users.length < subject.capacity
      ) {
        user.subjects.push(subject._id);
        subject.users.push(user._id);

        saveQueue.push(subject.save());
        if (saveQueue.length >= MAX_CONCURRENT_SAVES) {
          await Promise.allSettled(saveQueue);
          saveQueue.length = 0; // Clear the queue
        }
      }
    }

    saveQueue.push(user.save());
    if (saveQueue.length >= MAX_CONCURRENT_SAVES) {
      await Promise.allSettled(saveQueue);
      saveQueue.length = 0; // Clear the queue
    }
  }

  if (saveQueue.length > 0) {
    await Promise.allSettled(saveQueue); // Save any remaining documents
  }
}

export const initData = async () => {
  let subjects = [];
  for (let i = 0; i < 100; i++) {
    const credit = Math.floor(Math.random() * 3) + 1;
    const classification =
      courseTypes[Math.floor(Math.random() * courseTypes.length)];
    const capacity = Math.floor(Math.random() * (41 - 20)) + 20;
    let newSubject = new Subject({
      name: `Subject-${i}`,
      credit,
      classification,
      capacity,
    });
    await newSubject.save();
    subjects.push(newSubject);
  }

  let users = [];
  for (let i = 0; i < 1000; i++) {
    const username = getRandomKoreanName();
    const email =
      "2023" +
      String(Math.floor(Math.random() * 10 ** 6)).padStart(6, "0") +
      "@dgu.co.kr";
    const password = generateRandomPassword();
    const hashedPassword = bcrypt.hashSync(password, 10);

    fs.appendFileSync(passwordLogPath, `${username} ${email} ${password}\n`);

    let newUser = new User({
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
      tokenExpiration: 0,
    });

    await newUser.save();
    users.push(newUser);
  }

  await assignSubjectsToUsers(users, subjects);
};
