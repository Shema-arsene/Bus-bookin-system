const Bus = require("../models/busModel")

// Get all upcoming buses
const getBuses = async (req, res) => {
  try {
    const buses = await Bus.find().sort({ departureTime: 1 })
    res.status(200).json(buses)
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

// Create a new bus journey
const createBus = async (req, res) => {
  try {
    const newBus = new Bus(req.body)
    const savedBus = await newBus.save()
    res.status(201).json(savedBus)
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error })
  }
}

// Get single bus by ID
const getBusById = async (req, res) => {
  try {
    const bus = await Bus.findById(req.params.id)
    if (!bus) return res.status(404).json({ message: "Bus not found" })
    res.status(200).json(bus)
  } catch (error) {
    res.status(500).json({ message: "Server error", error })
  }
}

// Update bus journey
const updateBus = async (req, res) => {
  try {
    const updatedBus = await Bus.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updatedBus) return res.status(404).json({ message: "Bus not found" })
    res.status(200).json(updatedBus)
  } catch (error) {
    res.status(400).json({ message: "Update failed", error })
  }
}

// Delete bus journey
const deleteBus = async (req, res) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(req.params.id)
    if (!deletedBus) return res.status(404).json({ message: "Bus not found" })
    res.status(200).json({ message: "Bus deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Delete failed", error })
  }
}

module.exports = {
  getBuses,
  createBus,
  getBusById,
  updateBus,
  deleteBus,
}
