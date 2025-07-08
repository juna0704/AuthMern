import express from "express";
import {
  detailUser,
  loginUser,
  registerUser,
  forgotPassword,
  resetPassword,
  verifyResetToken,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/user", protect, detailUser);
route.post("/forgot-password", forgotPassword);
route.post("/reset-password", resetPassword);
route.post("/verify-reset-token", verifyResetToken);

export default route;
