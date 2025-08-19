import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//Register
export const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    //password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 7 characters long, include one uppercase letter, one number, and one special character",
      });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ email, password });
    await user.save();

    res.json({
      token: generateToken(user._id),
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if email exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "No email found please register" });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Wrong password" });
    }

    // Success 
    res.json({
      token: generateToken(user._id),
      user,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
