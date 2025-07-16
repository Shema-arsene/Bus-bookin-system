const express = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware")
const { bookSeats } = require("../controller/bookingController")

router.post("/", protect, bookSeats)

module.exports = router
