const User = require("../models/User");
const jwt = require("jsonwebtoken");

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res, next) => {
  const { fullName, email, password, profileImageUrl } = req.body;

  // Validation Check for Missing fields
  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Create the User - ADD AWAIT HERE
    const user = await User.create({
      fullName,
      email,
      password,
      profileImageUrl,
    });

    // Change status to 201 for successful creation
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user._id),
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message }); // Fix typo
  }
};

// Login User
exports.loginUser = async (req, res, next) => {};

// Get User Info
exports.getUserInfo = async (req, res, next) => {};
