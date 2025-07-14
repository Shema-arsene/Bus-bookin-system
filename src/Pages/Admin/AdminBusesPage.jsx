import { Plus } from "lucide-react"
import { Link } from "react-router-dom"

const AdminBusesPage = () => {
  //   const { id } = useParams()
  //   const isEditMode = !!id

  return (
    <section className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Buses</h1>
          <p className="text-gray-600">Manage your buses</p>
        </div>
        <Link
          to="/admin/buses/new"
          className="flex items-center space-x-2 bg-blue-600 text-white px-3 py-1.5 rounded-lg hover:bg-blue-900 duration-300"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Journey</span>
        </Link>
      </div>
      {/* <AdminBusesPage /> */}
      List of all buses (You can connect this to backend later)
    </section>
  )
}
export default AdminBusesPage
