const Journey = require("../models/journeyModel")

// Create a new journey
const createJourney = async (req, res) => {
  try {
    const journey = await Journey.create({
      ...req.body,
      user: req.user._id,
    })
    res.status(201).json(journey)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create journey", error: error.message })
  }
}

// Get all journeys
const getAllJourneys = async (req, res) => {
  try {
    const journeys = await Journey.find()
    res.status(200).json(journeys)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch journeys", error: error.message })
  }
}

// Get journeys by user
const getJourneysByUser = async (req, res) => {
  try {
    const journeys = await Journey.find({ user: req.params.userId })
    res.status(200).json(journeys)
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch user's journeys",
      error: error.message,
    })
  }
}

// Get one journey by ID
const getJourneyById = async (req, res) => {
  try {
    const journey = await Journey.findById(req.params.id)
    if (!journey) return res.status(404).json({ message: "Journey not found" })
    res.status(200).json(journey)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch journey", error: error.message })
  }
}

// Update a journey
const updateJourney = async (req, res) => {
  try {
    const updated = await Journey.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    if (!updated) return res.status(404).json({ message: "Journey not found" })
    res.status(200).json(updated)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update journey", error: error.message })
  }
}

// Delete a journey
const deleteJourney = async (req, res) => {
  try {
    const deleted = await Journey.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: "Journey not found" })
    res.status(200).json({ message: "Journey deleted" })
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete journey", error: error.message })
  }
}

module.exports = {
  createJourney,
  getAllJourneys,
  getJourneysByUser,
  getJourneyById,
  updateJourney,
  deleteJourney,
}
