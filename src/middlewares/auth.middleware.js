import asyncHandler from "../middlewares/asyncHandler.js";
import User from "../model/user.model.js";
import AppError from "../utils/appError.js";
import { verifyToken } from "../utils/jwt.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  //if you are not getting from cookies
  //==================================
  // const authHeader = req.headers.athorization;

  // if (!authHeader || !authHeader.startsWith("Bearer ")) {
  //   throw new AppError("Unauthorized", 401);
  // }
  // const token = authHeader.split(" ")[1];

  const token = req.cookies.jwt;

  if (!token) {
    throw new AppError("Unauthorized, please login", 401);
  }

  const decoded = await verifyToken(token);

  const user = await User.findById(decoded.id).select("-password");

  req.user = user;

  next();
});

export default authMiddleware;
