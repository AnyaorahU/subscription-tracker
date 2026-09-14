import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your name"],
      trim: true,
      minLength: 2,
      maxLength: 225,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      trim: true,
      unique: true,
      minLength: 5,
      maxLength: 225,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide your password"],
      minLength: 6,
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

export default User;
