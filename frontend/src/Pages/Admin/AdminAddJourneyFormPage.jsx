import React, { useState, useEffect } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import axiosInstance from "../../utils/axiosInstance"
import { API_PATHS } from "../../utils/apiPaths"

const AdminJourneyFormPage = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id

  console.log(`typeof ${id}: `, typeof id)
  console.log("Journey ID from URL:", id)

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
    if (isEditMode) fetchJourney()
  }, [id])

  const fetchJourney = async () => {
    try {
      const res = await axiosInstance.get(
        `${API_PATHS.JOURNEYS.GET_JOURNEY}/${id}`
      )
      const journey = res.data

      const departure = new Date(journey.departureTime)
      const arrival = new Date(journey.arrivalTime)

      // just added
      // const combinedDeparture = new Date(
      //   `${day}T${departureTime}`
      // ).toISOString()
      // const combinedArrival = new Date(`${day}T${arrivalTime}`).toISOString()

      // const journeyData = {
      //   from,
      //   to,
      //   price,
      //   bus,
      //   departureTime: combinedDeparture,
      //   arrivalTime: combinedArrival,
      // }

      setFormData({
        agency: journey.busName || agencyName,
        from: journey.departure,
        to: journey.destination,
        price: journey.price.toString(),
        departureDay: departure.toISOString().split("T")[0],
        departureTime: departure.toTimeString().slice(0, 5),
        arrivalTime: arrival.toTimeString().slice(0, 5),
        duration: "",
        busLicensePlate: journey.busNumber,
      })
    } catch (error) {
      console.error("Error fetching journey:", error)
      alert("Failed to load journey data.")
      navigate("/admin/buses")
    }
  }

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

    const diff = end - start
    const hrs = Math.floor(diff / (1000 * 60 * 60))
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    return `${hrs}h ${mins}m`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const departureDateTime = new Date(
      `${formData.departureDay}T${formData.departureTime}:00.000+00:00`
    )
    const arrivalDateTime = new Date(
      `${formData.departureDay}T${formData.arrivalTime}:00.000+00:00`
    )

    const payload = {
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
      if (isEditMode) {
        await axiosInstance.put(
          `${API_PATHS.JOURNEYS.UPDATE_JOURNEY}/${id}`,
          payload
        )
        alert("Journey updated successfully!")
      } else {
        await axiosInstance.post(API_PATHS.JOURNEYS.ADD_JOURNEY, payload)
        alert("Journey added successfully!")
      }
      navigate("/admin/buses")
    } catch (error) {
      console.error("Error submitting journey:", error)
      alert(`Failed to ${isEditMode ? "update" : "add"} journey`)
    }
  }

  // const handleSubmit = async (e) => {
  //   e.preventDefault()

  //   try {
  //     const journeyDateTime = new Date(
  //       `${formData.date}T${formData.time}:00.000Z`
  //     )

  //     const payload = {
  //       ...formData,
  //       datetime: journeyDateTime.toISOString(), // '2025-07-19T10:00:00.000Z'
  //     }

  //     if (isEditMode) {
  //       await axiosInstance.put(API_PATHS.JOURNEYS.UPDATE_JOURNEY(id), payload)
  //     } else {
  //       await axiosInstance.post(API_PATHS.JOURNEYS.ADD_JOURNEY, payload)
  //     }

  //     navigate("/admin/buses")
  //   } catch (error) {
  //     console.error("Journey submission error:", error)
  //   }
  // }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <div className="flex items-center justify-between mb-6">
          <Link
            to="/admin/buses"
            className="flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Back</span>
          </Link>
          <h1 className="text-2xl font-bold">
            {isEditMode ? "Edit Journey" : "Add New Journey"}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="agency"
            placeholder="Agency Name"
            value={agencyName}
            readOnly
            className="w-full p-3 border border-gray-300 rounded bg-gray-100"
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
            {isEditMode ? "Update Journey" : "Add Journey"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default AdminJourneyFormPage
