import { get } from "mongoose";
import userServices from "../services/user.services.js";
import AppError from "../utils/appError.js";

const createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    throw new AppError("No details provided", 400);
  }

  const { user, token } = await userServices.createUser({
    name,
    user,
    password,
    role,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  res.status(201).json({
    success: true,
    message: "New User created",
    data: user,
    token,
  });
};

const getUsers = async (req, res) => {
  const users = await userServices.getUsers();

  return res.status(200).json({
    sucess: true,
    data: users,
  });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("Bad request", 400);
  }

  const user = await userServices.getUser(id);

  return res.status(200).json({
    sucess: true,
    data: user,
  });
};

const getMe = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: req.user,
  });
};

const updateMe = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    throw new AppError("Bad request", 400);
  }

  const updated = await userServices.updateMe({ id, body: req.body });

  return res.status(200).json({
    success: true,
    message: "User have been updated",
    data: updated,
  });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("Bad request", 400);
  }

  const updated = await userServices.updateUser({ id, body: req.body });

  return res.status(200).json({
    success: true,
    message: "User updated",
    data: updated,
  });
};

const deleteMe = async (req, res) => {
  const { id } = req.user;
  if (!id) {
    throw new AppError("Bad request", 400);
  }

  await userServices.deleteMe(id);

  res.clearCookie("jwt");

  return res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new AppError("Bad request", 400);
  }

  await userServices.deleteUser(id);

  return res.status(200).json({
    success: true,
    message: "User Deleted successfully",
  });
};

export default {
  createUser,
  getUsers,
  getUser,
  getMe,
  updateMe,
  updateUser,
  deleteMe,
  deleteUser,
};
