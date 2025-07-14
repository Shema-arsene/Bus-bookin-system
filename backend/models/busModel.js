const mongoose = require("mongoose")

const busSchema = new mongoose.Schema(
  {
    agency: {
      type: String,
      required: true,
    },
    origin: {
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
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Scheduled", "Departed", "Cancelled"],
      default: "Scheduled",
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Bus", busSchema)
