const Booking = require("../models/bookingModel")
const Journey = require("../models/journeyModel")

const bookSeats = async (req, res) => {
  const { journeyId, seatsBooked } = req.body

  const userId = req.user._id // comes from protect middleware

  if (!journeyId || !seatsBooked) {
    return res.status(400).json({ message: "Journey ID and seats required" })
  }

  try {
    const journey = await Journey.findById(journeyId)
    if (!journey) {
      return res.status(404).json({ message: "Journey not found" })
    }

    if (journey.seatsAvailable < seatsBooked) {
      return res.status(400).json({ message: "Not enough seats available" })
    }

    // Reduce seats available
    journey.seatsAvailable -= seatsBooked
    await journey.save()

    // Create booking
    const totalPrice = seatsBooked * journey.price
    const booking = await Booking.create({
      user: userId,
      journey: journey._id,
      seatsBooked,
      totalPrice,
    })

    res.status(201).json(booking)
  } catch (error) {
    res.status(500).json({ message: "Booking failed", error: error.message })
  }
}

module.exports = { bookSeats }
