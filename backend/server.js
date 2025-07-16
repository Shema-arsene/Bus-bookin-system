const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const journeyRoutes = require("./routes/journeyRoutes")
const busRoutes = require("./routes/busRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const userRoutes = require("./routes/userRoutes")

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json()) // Parse incoming JSON

app.get("/", (req, res) => {
  res.send("Bus Booking API Running")
})

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/journeys", journeyRoutes)
app.use("/api/buses", busRoutes)
app.use("/api/bookings", bookingRoutes)
app.use("/api/users", userRoutes)

connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
