import { Router } from "express";
import usercontrollers from "../controllers/user.controllers.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import authorization from "../middlewares/authorization.js";

const userRoute = Router();

userRoute.post(
  "/",
  authMiddleware,
  authorization("admin"),
  asyncHandler(usercontrollers.createUser),
);

userRoute.get(
  "/",
  authMiddleware,
  authorization("admin"),
  asyncHandler(usercontrollers.getUsers),
);

userRoute.get("/me", authMiddleware, asyncHandler(usercontrollers.getMe));

userRoute.get(
  "/:id",
  authMiddleware,
  authorization("admin"),
  asyncHandler(usercontrollers.getUser),
);

userRoute.put("/me", authMiddleware, asyncHandler(usercontrollers.updateMe));

userRoute.put(
  "/:id",
  authMiddleware,
  authorization("admin"),
  asyncHandler(usercontrollers.updateUser),
);

userRoute.delete("/me", authMiddleware, asyncHandler(usercontrollers.deleteMe));

userRoute.delete(
  "/:id",
  authMiddleware,
  authorization("admin"),
  asyncHandler(usercontrollers.deleteUser),
);

export default userRoute;
