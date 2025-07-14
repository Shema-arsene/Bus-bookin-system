const User = require("../models/userModel")

const createUser = async (req, res) => {
  try {
    const user = new User(req.body)
    const saved = await user.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: "User creation failed", error: err })
  }
}

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err })
  }
}

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: "User not found" })
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err })
  }
}

const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err })
  }
}

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "User deleted" })
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err })
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
}
