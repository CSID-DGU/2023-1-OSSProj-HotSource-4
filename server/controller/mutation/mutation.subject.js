import { Subject } from "../../models/subject.model.js";
import { requireAuth } from "../../user.permission.js";
import { AuthenticationError } from "apollo-server";

export const mutCreateSubject = async (
  _,
  { name, credit, classification },
  { user }
) => {
  requireAuth(user);
  if (!user.isAdmin) {
    throw new AuthenticationError(
      "Unauthorized: Only admins can create subjects"
    );
  }
  if (!name || name.trim() === "") {
    throw new Error("Subject name is required");
  }
  if (name.length > 50) {
    throw new Error("Subject name should not exceed 50 characters");
  }
  if (credit && (credit < 0 || credit > 4)) {
    throw new Error("Credit should be between 0 and 4");
  }
  const subject = new Subject({
    name,
    credit,
    classification,
    users: [user._id],
  });
  return subject.save();
};

export const mutAddUserToSubject = async (
  _,
  { subjectId, userId },
  { user }
) => {
  requireAuth(user);
  const subject = await Subject.findById(subjectId);
  if (!user.isAdmin) {
    throw new AuthenticationError(
      "Unauthorized: Only admins can add users to subjects"
    );
  }
  if (!subject) {
    throw new Error("Subject not found");
  }
  if (!subject.users.includes(userId)) {
    subject.users.push(userId);
    await subject.save();
  }
  return Subject.populate(subject, "users");
};
