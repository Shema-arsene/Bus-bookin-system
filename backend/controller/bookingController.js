const Booking = require("../models/bookingModel")

const createBooking = async (req, res) => {
  try {
    const booking = new Booking(req.body)
    const saved = await booking.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ message: "Booking failed", error: err })
  }
}

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("user bus")
    res.status(200).json(bookings)
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings", error: err })
  }
}

const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate("user bus")
    if (!booking) return res.status(404).json({ message: "Booking not found" })
    res.status(200).json(booking)
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err })
  }
}

const updateBooking = async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
    res.status(200).json(updated)
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err })
  }
}

const deleteBooking = async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: "Booking deleted" })
  } catch (err) {
    res.status(500).json({ message: "Delete failed", error: err })
  }
}
module.exports = {
  createBooking,
  getBookings,
  getBookingById,
  updateBooking,
  deleteBooking,
}
const express = require("express")
