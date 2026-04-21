const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TiffinProvider = require("../models/TiffinProvider");


exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await TiffinProvider.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await TiffinProvider.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Registered successfully" });
  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await TiffinProvider.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("LOGIN ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};