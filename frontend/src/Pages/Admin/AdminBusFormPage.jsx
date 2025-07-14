import { useParams } from "react-router-dom"
import AgencyForm from "./AgencyForm"
import { Link, useNavigate } from "react-router-dom"

// const  = () => {
//   const { id } = useParams()
//   const isEdit = Boolean(id)

//   return (
// <div className="p-6">
//   {isEdit ? "Edit Bus Information" : "Create New Bus"}
// </div>
;<AgencyForm />

//   )
// }
// export default AdminBusFormPage

import React, { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"

const AdminBusFormPage = () => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    agency: "",
    from: "",
    to: "",
    price: "",
    departureTime: "",
    arrivalTime: "",
    duration: "",
    busLicensePlate: "",
    amenities: "",
  })

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

  const amenitiesList = [
    "Wi-Fi",
    "Charging Port",
    "Reclining Seats",
    "AC",
    "Entertainment",
    "Toilet",
    "Comfortable Seats",
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Submitted travel info:", formData)
    alert("Travel info submitted!")
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        {/* <h2 className="text-2xl text-center text-blue-600 font-bold mb-6">
          Agency Travel Info Form
        </h2> */}
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
          <input
            type="text"
            name="agency"
            placeholder="Agency Name"
            value={formData.agency}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="from"
              placeholder="From"
              value={formData.from}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
              required
            />
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

          <input
            type="number"
            name="price"
            placeholder="Price (Rwf)"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            required
          />

          {/* Arrival & Departure time */}
          <div className="grid grid-cols-2 gap-4">
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

          <input
            type="text"
            name="duration"
            placeholder="Duration"
            value={formData.duration}
            readOnly
            className="w-full p-3 border border-gray-300 rounded bg-gray-100 text-gray-600"
          />

          <input
            type="text"
            name="busLicensePlate"
            placeholder="License Plate (e.g. ABC 1234)"
            value={formData.busLicensePlate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-600 focus:border-blue-600 sm:text-sm"
            required
          />

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="flex flex-wrap gap-3">
              {amenitiesList.map((amenity) => (
                <label
                  key={amenity}
                  className="flex items-center space-x-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={formData.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="rounded text-blue-600"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </div>

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

export default AdminBusFormPage
