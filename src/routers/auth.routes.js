import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import authController from "../controllers/auth.controllers.js";
import authorization from "../middlewares/authorization.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post(
  "/admin",
  authMiddleware,
  authorization("admin"),
  asyncHandler(authController.createAdmin),
);

authRouter.post("/signup", asyncHandler(authController.signup));

authRouter.post("/signin", asyncHandler(authController.signin));

authRouter.post("/signout", asyncHandler(authController.signout));

export default authRouter;
