import express from "express";
import {
  detailUser,
  loginUser,
  registerUser,
} from "../controllers/userController.js";
import protect from "../middlewares/authMiddleware.js";

const route = express.Router();

route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/user", protect, detailUser);

export default route;
