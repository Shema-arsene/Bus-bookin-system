const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  })
}

// Register user
const registerUser = async (req, res) => {
  const { fullName, email, password, phone } = req.body

  //   Validation: Check for missing fields
  if (!fullName || !email || !password || !phone) {
    return res
      .status(400)
      .json({ message: "Please fill in all required fields" })
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" })
    }

    // Create new user
    const user = await User.create({ fullName, email, password, phone })

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      token: generateToken(user._id),
    })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error registering user", error: error.message })
  }
}

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  // Validation: Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  try {
    const user = await User.findOne({ email })

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    res.json({
      user: {
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

// Get user info
const getUserInfo = async (req, res) => {
  const id = req.user._id

  try {
    const user = await User.findById(id).select("-password")

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
}
