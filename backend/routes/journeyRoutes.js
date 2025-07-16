// routes/journeyRoutes.js
const express = require("express")
const router = express.Router()
const {
  createJourney,
  getAllJourneys,
  getJourneyById,
  updateJourney,
  deleteJourney,
} = require("../controller/journeyController")
const protect = require("../middleware/authMiddleware")

// Public Routes
router.get("/", getAllJourneys)
router.get("/:id", getJourneyById)

// Admin/Protected Routes (optional: add role check later)
router.post("/add", protect, createJourney)
router.put("/update/:id", protect, updateJourney)
router.delete("/delete/:id", protect, deleteJourney)

module.exports = router
