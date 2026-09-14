import authServices from "../services/auth.services.js";

const createAdmin = async (req, res) => {
  const { name, email, password, role } = req.body;

  const { user, token } = await authServices.signup({
    name,
    email,
    password,
    role,
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    message: "User Registered",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
};

const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const { user, token } = await authServices.signup({
    name,
    email,
    password,
    role: "user",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(201).json({
    success: true,
    message: "User Registered",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await authServices.signin({ email, password });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure:
      process.env.NODE_ENV === "development" ? "development" : "production",
    maxAge: 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Successfully Logged In",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    },
  });
};

const signout = async (req, res) => {
  res.clearCookie("jwt");

  return res.status(200).json({
    success: true,
    message: "Successfully Logged Out",
  });
};

export default { signin, signout, signup, createAdmin };
