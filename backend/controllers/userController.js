import asyncHandler from "express-async-handler";
import User from "../modals/userModal.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Generate reset token
const generateResetToken = () => {
  return crypto.randomBytes(32).toString("hex");
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

  // Check if phone number already exists (if provided)
  if (phone) {
    const phoneExist = await User.findOne({ phone });
    if (phoneExist) {
      res.status(400);
      throw new Error("Phone number already exists");
    }
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

//@desc Forgot password - send reset token
//@route POST /api/users/forgot-password
//@access public
const forgotPassword = asyncHandler(async (req, res) => {
  const { emailOrPhone } = req.body;

  if (!emailOrPhone) {
    res.status(400);
    throw new Error("Please enter your email or mobile number");
  }

  // Find user by email or phone
  const user = await User.findOne({
    $or: [{ email: emailOrPhone }, { phone: emailOrPhone }],
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found with this email or phone number");
  }

  // Generate reset token
  const resetToken = generateResetToken();
  const resetTokenExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  // Save reset token to user
  user.resetPasswordToken = resetToken;
  user.resetPasswordExpire = resetTokenExpire;
  await user.save();

  // Here you would typically send an email or SMS with the reset token
  // For now, we'll just return success with the token (remove in production)
  res.status(200).json({
    message: "Password reset instructions sent successfully",
    resetToken: resetToken, // Remove this in production
    securityQuestion: user.securityQuestion,
  });
});

//@desc Reset password using token and security question
//@route POST /api/users/reset-password
//@access public
const resetPassword = asyncHandler(async (req, res) => {
  const { resetToken, newPassword, securityAnswer } = req.body;

  if (!resetToken || !newPassword || !securityAnswer) {
    res.status(400);
    throw new Error("All fields are required");
  }

  // Find user by reset token
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  // In a real application, you would hash and compare the security answer
  // For now, we'll do a simple comparison (implement proper hashing in production)
  if (securityAnswer.toLowerCase() !== user.securityQuestion.toLowerCase()) {
    res.status(400);
    throw new Error("Security answer does not match");
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  // Update password and clear reset token
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.status(200).json({
    message: "Password reset successfully",
  });
});

//@desc Verify reset token and get security question
//@route POST /api/users/verify-reset-token
//@access public
const verifyResetToken = asyncHandler(async (req, res) => {
  const { resetToken } = req.body;

  if (!resetToken) {
    res.status(400);
    throw new Error("Reset token is required");
  }

  // Find user by reset token
  const user = await User.findOne({
    resetPasswordToken: resetToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired reset token");
  }

  res.status(200).json({
    message: "Token is valid",
    securityQuestion: user.securityQuestion,
  });
});

export {
  registerUser,
  loginUser,
  detailUser,
  forgotPassword,
  resetPassword,
  verifyResetToken,
};
