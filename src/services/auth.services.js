import User from "../model/user.model.js";
import AppError from "../utils/appError.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jwt.js";

const signup = async ({ name, email, password, role }) => {
  const exists = await User.findOne({ email });
  if (exists) {
    throw new AppError("User registered, Please login", 400);
  }
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = await User.create({ name, email, password: hashPassword, role });
  const token = generateToken(user.id);

  return { user, token };
};

const signin = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError("Invalid Credentials, Please register", 400);
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new AppError("Invalide Credentails", 401);
  }

  const token = generateToken(user.id);

  return { user, token };
};

export default { signup, signin };
