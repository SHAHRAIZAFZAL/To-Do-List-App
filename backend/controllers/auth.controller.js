import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";


export const userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ user: newUser, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
}

export const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ user, token });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
} 