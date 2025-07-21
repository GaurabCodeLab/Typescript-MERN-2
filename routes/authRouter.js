const express = require("express");
const User = require("../models/user");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const newUser = req.body;
    const validFields = ["name", "email", "password"];
    const isValidFields = Object.keys(newUser).every((value) =>
      validFields.includes(value)
    );
    if (!isValidFields) {
      return res.status(400).json({ message: "invalid field body" });
    }

    const isExistingUser = await User.findOne({ email: newUser.email });
    if (isExistingUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    const isValidPassword = validator.isStrongPassword(newUser.password);

    if (!isValidPassword) {
      return res.status(400).json({ message: "provide valid password" });
    }
    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const newUserDetails = await User.create({
      ...newUser,
      password: hashedPassword,
    });
    res
      .status(201)
      .json({ message: "user created successfully", data: newUserDetails });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in registering new user: " + error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "missing required fields" });
    }
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({ message: "invalid credentials" });
    }
    const isValidPassword = await bcrypt.compare(
      password,
      userDetails.password
    );
    if (!isValidPassword) {
      return res.status(404).json({ message: "invalid credentials" });
    }
    const token = jwt.sign(
      { _id: userDetails._id, email: userDetails.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("token", token);
    res.status(200).json({ message: "login successful", data: userDetails });
  } catch (error) {
    res.status(500).json({ message: "Error in login user: " + error.message });
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie();
  res.status(200).json({ message: "logout successful" });
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    const userDetails = await User.findOne({ email });
    if (!userDetails) {
      return res.status(404).json({ message: "user not found" });
    }
    const resetToken = jwt.sign(
      { _id: userDetails._id, email: userDetails.email },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );
    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      to: userDetails.email,
      subject: "Password Reset",
      html: `<p>You requested a password reset</p><p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
    });
    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error in forgot password: " + error.message });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;
    const isValidPassword = validator.isStrongPassword(newPassword);
    if (!isValidPassword) {
      return res.status(400).json({ message: "new password is not valid" });
    }
    const decodedObj = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodedObj) {
      return res.status(400).json({ message: "Token is missing or expired" });
    }
    const user = await User.findById(decodedObj._id);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "password reset successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Errorn in re-setting password: " + error.message });
  }
});

module.exports = { authRouter: router };
