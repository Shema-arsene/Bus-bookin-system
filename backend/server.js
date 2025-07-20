const express = require("express")
const dotenv = require("dotenv")
const connectDB = require("./config/db")
const authRoutes = require("./routes/authRoutes")
const journeyRoutes = require("./routes/journeyRoutes")
const busRoutes = require("./routes/busRoutes")
const bookingRoutes = require("./routes/bookingRoutes")
const userRoutes = require("./routes/userRoutes")
const cors = require("cors")

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json()) // Parse incoming JSON

app.use(
  cors({
    // origin: process.env.CLIENT_URL || "*",
    origin: "http://localhost:5176", // or your actual frontend URL
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
)

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
