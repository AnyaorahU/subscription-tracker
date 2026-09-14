import express from "express";
import cors from "cors";
import authRouter from "./routers/auth.routes.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/error.handler.js";
import userRoute from "./routers/user.routes.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/auth", authRouter);
app.use("/api/users", userRoute);
app.use(errorHandler);

export default app;
