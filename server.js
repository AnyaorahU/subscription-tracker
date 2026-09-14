import app from "./src/app.js";
import dotenv from "dotenv";
import mongoConnect from "./src/database/db.config.js";
dotenv.config();

mongoConnect();

app.get("/health", (req, res) => {
  console.log("Server is Live");
  res.status(200).json({
    success: true,
    message: "Server is Healthy 😀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Backend Server Running on Port http://localhost:${PORT}`);
});
