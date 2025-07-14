const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const busRoutes = require("./routes/busRoutes")
const connectDB = require("./config/db")

const PORT = process.env.PORT || 5000

dotenv.config()

const app = express()
app.use(express.json()) // Parse incoming JSON

app.get("/", (req, res) => {
  res.send("Bus Booking API Running")
})

// Routes
app.use("/api/buses", busRoutes)

// connectDB()

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
