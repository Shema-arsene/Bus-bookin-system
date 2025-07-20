import React, { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"

const AdminAddJourneyFormPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    agency: "",
    from: "",
    to: "",
    price: "",
    departureDay: "", // <-- new
    departureTime: "",
    arrivalTime: "",
    duration: "",
    busLicensePlate: "",
  })

  const [userId, setUserId] = useState("")
  const [agencyName, setAgencyName] = useState("")

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    if (storedUser?._id) {
      setUserId(storedUser._id)
    }
  }, [])

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    if (storedUser?.fullName) {
      setAgencyName(storedUser.fullName)
    }
  }, [])

  // Function to calculate duration
  const calculateDuration = (departure, arrival) => {
    if (!departure || !arrival) return ""

    const [depHours, depMinutes] = departure.split(":").map(Number)
    const [arrHours, arrMinutes] = arrival.split(":").map(Number)

    let start = new Date(2000, 0, 1, depHours, depMinutes)
    let end = new Date(2000, 0, 1, arrHours, arrMinutes)

    // If arrival is before departure, assume it's the next day
    if (end < start) end.setDate(end.getDate() + 1)

    const diffMs = end - start
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60))
    const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    return `${diffHrs}h ${diffMins}m`
  }

  // Recalculate duration whenever departure or arrival time changes
  useEffect(() => {
    const { departureTime, arrivalTime } = formData
    const duration = calculateDuration(departureTime, arrivalTime)
    setFormData((prev) => ({ ...prev, duration }))
  }, [formData.departureTime, formData.arrivalTime])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const departureDateTime = new Date(
      `${formData.departureDay}T${formData.departureTime}:00.000Z`
    )
    const arrivalDateTime = new Date(
      `${formData.departureDay}T${formData.arrivalTime}:00.000Z`
    )

    const journeyData = {
      busName: agencyName,
      departure: formData.from,
      destination: formData.to,
      departureTime: departureDateTime.toISOString(),
      arrivalTime: arrivalDateTime.toISOString(),
      price: Number(formData.price),
      seatsAvailable: 50,
      busNumber: formData.busLicensePlate,
      user: userId,
    }

    try {
      await axiosInstance.post(API_PATHS.JOURNEYS.ADD_JOURNEY, journeyData)
      alert("Journey added successfully!")
      navigate("/admin/buses")
    } catch (error) {
      console.error("Error adding journey:", error)
      alert("Failed to add journey")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/admin/buses"
            className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </Link>
          <h1 className="text-2xl font-bold">Add New Journey</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Agency Name */}
          <input
            type="text"
            name="agency"
            placeholder="Agency Name"
            value={agencyName}
            readOnly
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Departure */}
            <input
              type="text"
              name="from"
              placeholder="From"
              value={formData.from}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              required
            />

            {/* Destination */}
            <input
              type="text"
              name="to"
              placeholder="To"
              value={formData.to}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              required
            />
          </div>

          {/* Price */}
          <input
            type="number"
            name="price"
            placeholder="Price (Rwf)"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            {/* Departure time */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Departure Time
              </label>
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                required
              />
            </div>

            {/* Arrival Time */}
            <div>
              <label className="text-sm text-gray-600 block mb-1">
                Arrival Time
              </label>
              <input
                type="time"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
                required
              />
            </div>
          </div>

          {/* Duration */}
          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            readOnly
            className="w-full p-3 border border-gray-300 rounded bg-gray-100 text-gray-600"
          />

          {/* Departure date */}
          <div>
            <label className="text-sm text-gray-600 block mb-1">
              Departure Day
            </label>
            <input
              type="date"
              name="departureDay"
              value={formData.departureDay}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              required
            />
          </div>

          {/* License plate */}
          <input
            type="text"
            name="busLicensePlate"
            placeholder="License Plate (e.g. ABC 1234)"
            value={formData.busLicensePlate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-900 cursor-pointer transition"
          >
            Submit Info
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminAddJourneyFormPage
