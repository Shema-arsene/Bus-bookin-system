const express = require("express")
const router = express.Router()
const protect = require("../middleware/authMiddleware")
const { bookSeats, cancelBooking } = require("../controller/bookingController")

router.post("/", protect, bookSeats)
router.put("/cancel/:id", protect, cancelBooking)

module.exports = router
