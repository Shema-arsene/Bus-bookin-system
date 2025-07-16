const mongoose = require("mongoose")

const journeySchema = new mongoose.Schema(
  {
    busName: {
      type: String,
      required: true,
    },
    departure: {
      type: String,
      required: true,
    },
    destination: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    arrivalTime: {
      type: Date,
    },
    price: {
      type: Number,
      required: true,
    },
    seatsAvailable: {
      type: Number,
      required: true,
    },
    busNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("Journey", journeySchema)
