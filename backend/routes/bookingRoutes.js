const express = require("express")
const {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
} = require("../controller/bookingController")

const router = express.Router()

router.route("/").get(getBookings).post(createBooking)
router
  .route("/:id")
  .get(getBookingById)
  .put(updateBooking)
  .delete(deleteBooking)

module.exports = router
