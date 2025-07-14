import { Plus, BusFront, Trash2, Edit2 } from "lucide-react"
import { Link } from "react-router-dom"

const mockJourneys = [
  {
    id: "1",
    agency: "RITCO Express",
    origin: "Kigali",
    destination: "Huye",
    departureTime: "2025-07-15 08:00",
    price: "6,000 RWF",
    status: "Scheduled",
  },
  {
    id: "2",
    agency: "Volcano",
    origin: "Kigali",
    destination: "Musanze",
    departureTime: "2025-07-15 09:30",
    price: "5,500 RWF",
    status: "Scheduled",
  },
  {
    id: "3",
    agency: "KBS",
    origin: "Kigali",
    destination: "Rubavu",
    departureTime: "2025-07-14 18:00",
    price: "7,000 RWF",
    status: "Departed",
  },
]

const AdminBusesPage = () => {
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
            {mockJourneys.map((journey) => (
              <tr
                key={journey.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 flex items-center gap-2">
                  <BusFront className="w-4 h-4 text-blue-500" />
                  {journey.agency}
                </td>
                <td className="px-4 py-3">
                  {journey.origin} → {journey.destination}
                </td>
                <td className="px-4 py-3">{journey.departureTime}</td>
                <td className="px-4 py-3">{journey.price}</td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-block px-2 py-0.5 text-xs font-semibold rounded-full ${
                      journey.status === "Scheduled"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {journey.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right flex justify-end gap-2">
                  <Link
                    to={`/admin/buses/edit/${journey.id}`}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Link>
                  <button className="text-red-600 hover:text-red-800">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default AdminBusesPage
