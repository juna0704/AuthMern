import asyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

//@desc this is registere route
//@route POST /api/v1/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  //Validate data
  if (!name || !email || !password) {
    res.status(400).json("all fields are required");
  }

  // Check if user already exists
  const userExist = await User.findOne({ email });
  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  //Response with use and token
  if (user) {
    res.status(201).json({
      id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc this is login route
//@route POST /api/v1/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //find user
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid credentials");
  }

  //compare password
  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }

  //response with user and token
  res.status(200).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    token: generateToken(user._id),
  });
});

//@desc this is user detail route
//@route GET /api/v1/user
//@access public
const detailUser = asyncHandler(async (req, res) => {
  if (!req.user) {
    res.status(401);
    throw new Error("Not authorized");
  }

  res.status(200).json(req.user);
});

export { registerUser, loginUser, detailUser };
