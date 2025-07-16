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
  const { name, email, password } = req.body
  try {
    let user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: "User already exists" })

    user = await User.create({ name, email, password })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    })
  } catch (error) {
    res.status(500).json({ message: "Server error" })
  }
}

// Get user info
const getUserInfo = async (req, res) => {
  const user = req.user
  if (!user) {
    return res.status(401).json({ message: "Not authorized" })
  }
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  })
}

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
}
