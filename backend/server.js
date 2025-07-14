const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const connectDB = require("./config/db")
const busRoutes = require("./routes/busRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const userRoutes = require("./routes/userRoutes")

const PORT = process.env.PORT || 5000

dotenv.config()

const app = express()
app.use(express.json()) // Parse incoming JSON

app.get("/", (req, res) => {
  res.send("Bus Booking API Running")
})

// Routes
app.use("/api/buses", busRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/users", userRoutes)

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
