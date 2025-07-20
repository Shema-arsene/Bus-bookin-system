import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"

const AdminEditJourneyFormPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    agency: "",
    from: "",
    to: "",
    price: "",
    departureDay: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    busLicensePlate: "",
  })

  const [userId, setUserId] = useState("")
  const [agencyName, setAgencyName] = useState("")

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))
    if (storedUser?._id) setUserId(storedUser._id)
    if (storedUser?.fullName) setAgencyName(storedUser.fullName)
  }, [])

  useEffect(() => {
    const fetchJourney = async () => {
      try {
        const res = await axiosInstance.get(
          `${API_PATHS.JOURNEYS.GET_JOURNEY}/${id}`
        )
        const journey = res.data

        const departure = new Date(journey.departureTime)
        const arrival = new Date(journey.arrivalTime)

        setFormData({
          agency: journey.busName,
          from: journey.departure,
          to: journey.destination,
          price: journey.price,
          departureDay: departure.toISOString().split("T")[0],
          departureTime: departure.toTimeString().slice(0, 5),
          arrivalTime: arrival.toTimeString().slice(0, 5),
          duration: "", // will be calculated in next effect
          busLicensePlate: journey.busNumber,
        })
      } catch (error) {
        console.error("Failed to fetch journey:", error)
        alert("Failed to load journey data.")
      }
    }

    fetchJourney()
  }, [id])

  useEffect(() => {
    const { departureTime, arrivalTime } = formData
    const duration = calculateDuration(departureTime, arrivalTime)
    setFormData((prev) => ({ ...prev, duration }))
  }, [formData.departureTime, formData.arrivalTime])

  const calculateDuration = (departure, arrival) => {
    if (!departure || !arrival) return ""
    const [depH, depM] = departure.split(":").map(Number)
    const [arrH, arrM] = arrival.split(":").map(Number)

    let start = new Date(2000, 0, 1, depH, depM)
    let end = new Date(2000, 0, 1, arrH, arrM)
    if (end < start) end.setDate(end.getDate() + 1)

    const diffMs = end - start
    const hrs = Math.floor(diffMs / (1000 * 60 * 60))
    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
    return `${hrs}h ${mins}m`
  }

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

    const updatedJourney = {
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
      await axiosInstance.put(
        `${API_PATHS.JOURNEYS.UPDATE_JOURNEY}/${id}`,
        updatedJourney
      )
      alert("Journey updated successfully!")
      navigate("/admin/buses")
    } catch (error) {
      console.error("Error updating journey:", error)
      alert("Failed to update journey")
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
          <h1 className="text-2xl font-bold">Edit Journey</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="agency"
            placeholder="Agency Name"
            value={agencyName}
            readOnly
            className="w-full p-3 border border-gray-300 rounded bg-gray-100"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="from"
              placeholder="From"
              value={formData.from}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
            <input
              type="text"
              name="to"
              placeholder="To"
              value={formData.to}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <input
            type="number"
            name="price"
            placeholder="Price (Rwf)"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm">Departure Time</label>
              <input
                type="time"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
            </div>

            <div>
              <label className="text-sm">Arrival Time</label>
              <input
                type="time"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleChange}
                className="w-full p-3 border rounded"
                required
              />
            </div>
          </div>

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            readOnly
            className="w-full p-3 border rounded bg-gray-100 text-gray-600"
          />

          <div>
            <label className="text-sm">Departure Day</label>
            <input
              type="date"
              name="departureDay"
              value={formData.departureDay}
              onChange={handleChange}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          <input
            type="text"
            name="busLicensePlate"
            placeholder="License Plate (e.g. ABC 1234)"
            value={formData.busLicensePlate}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-900 transition"
          >
            Update Journey
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminEditJourneyFormPage
