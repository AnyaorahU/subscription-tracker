import User from "../model/user.model.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

const createUser = async ({ name, email, password, role }) => {
  const exists = await User.findOne(email);
  if (exists) {
    throw new AppError("User exists", 409);
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashPassword, role });

  const token = generateToken(user.id);

  return { user, token };
};

const getUsers = async () => {
  const users = await User.find();
  if (!users) {
    throw new AppError("No User Was Found", 404);
  }

  return users;
};

const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  return user;
};

const updateMe = async ({ id, body }) => {
  if (!body || Object.keys(body).length === 0) {
    throw new AppError("No details provided", 400);
  }

  const allowedFields = ["name", "email"];
  const updates = {};

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updates[field] = body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    throw new AppError("No valid details provided", 400);
  }

  const user = await User.findByIdAndUpdate(id, updates, {
    new: true,
    runValidators: true,
  }).select("-password");
  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  return user;
};

const updateUser = async ({ id, body }) => {
  if (!body || Object.keys(body).length === 0) {
    throw new AppError("No details provided", 400);
  }

  const allowedFields = ["name", "email", "password"];
  const updates = {};

  for (const field of allowedFields) {
    if (!field) {
      throw new AppError("Field cant be empty", 400);
    }
    if (body[field] !== undefined) {
      updates[field] = body[field];
    }
  }

  if (Object.keys(updates).length === 0) {
    throw new AppError("N valid details found", 400);
  }

  const user = await User.findByIdAndUpdate(id, updates, {
    returnDocument: "after",
    runValidators: true,
  });

  return user;
};

const deleteMe = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  return user;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError("User Not Found", 404);
  }

  return user;
};

export default {
  createUser,
  getUser,
  getUsers,
  updateMe,
  updateUser,
  deleteMe,
  deleteUser,
};
