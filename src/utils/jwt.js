import jwt from "jsonwebtoken";

export const generateToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

export const verifyToken = (token) => {
  const verify = jwt.verify(token, process.env.JWT_SECRET);
  return verify;
};
