import { Plus, BusFront, Trash2, Edit2 } from "lucide-react"
import { Link } from "react-router-dom"
import { API_PATHS, BASE_URL } from "../../utils/apiPaths"
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"

const AdminBusesPage = () => {
  const [journeys, setJourneys] = useState([])
  const [loading, setLoading] = useState(true)

  const [userId, setUserId] = useState("")

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"))

    if (storedUser && storedUser._id) {
      setUserId(storedUser._id)
    }
  }, [])

  const fetchJourneys = async () => {
    setLoading(true)

    try {
      const response = await axiosInstance.get(
        `${API_PATHS.JOURNEYS.GET_ALL_JOURNEYS}`
      )

      setJourneys(response.data.user)

      const filteredJourneys = response.data.filter(
        (journey) => journey.user === userId
      )
      setJourneys(filteredJourneys)
    } catch (error) {
      console.error("Error fetching journeys:", error)
      alert("Failed to load journeys")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (userId) {
      fetchJourneys()
    }
  }, [userId])

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-KE", {
      dateStyle: "medium",
      timeStyle: "short",
    })
  }

  const handleDelete = async (journeyId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this journey?"
    )
    if (!confirmDelete) return

    try {
      await axiosInstance.delete(API_PATHS.JOURNEYS.DELETE_JOURNEY(journeyId))
      setJourneys((prev) => prev.filter((j) => j._id !== journeyId))
      alert("Journey deleted successfully.")
    } catch (error) {
      console.error("Error deleting journey:", error)
      alert("Failed to delete journey")
    }
  }

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-[70vh]">
      <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )

  if (loading) return <LoadingSpinner />

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Upcoming Journeys</h1>
          <p className="text-gray-600">Manage your scheduled buses</p>
        </div>
        <Link
          to="/admin/buses/new"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-800 duration-300"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Journey</span>
        </Link>
      </div>

      <div className="bg-white rounded-md shadow overflow-x-auto">
        {loading ? (
          <>
            <LoadingSpinner />
          </>
        ) : journeys.length === 0 ? (
          <>
            <p className="p-4 text-gray-500">No journeys found.</p>
          </>
        ) : (
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left">Bus Agency</th>
                <th className="px-4 py-3 text-left">Route</th>
                <th className="px-4 py-3 text-left">Departure</th>
                <th className="px-4 py-3 text-left">Price</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700">
              {journeys.map((journey) => (
                <tr
                  key={journey._id}
                  className="border-b hover:bg-gray-50 transition-colors"
                >
                  <td className="font-medium px-4 py-3 whitespace-nowrap flex items-center gap-2">
                    {journey.busName}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {journey.departure} → {journey.destination}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {formatDateTime(journey.departureTime)}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {journey.price} rwf
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                        new Date(journey.departureTime) > new Date()
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {new Date(journey.departureTime) > new Date()
                        ? "Scheduled"
                        : "Departed"}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex justify-end gap-3">
                    <Link
                      to={`/admin/buses/edit/${journey.id}`}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit2 className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(journey._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}

export default AdminBusesPage
