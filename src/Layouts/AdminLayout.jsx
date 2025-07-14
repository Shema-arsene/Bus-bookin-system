import { Outlet, Link } from "react-router-dom"

const AdminLayout = () => {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-2xl font-bold">Admin Panel</h2>
        <nav className="space-y-2">
          <Link to="/admin" className="block hover:text-yellow-400">
            Dashboard
          </Link>
          <Link to="/admin/buses" className="block hover:text-yellow-400">
            Buses
          </Link>
          <Link to="/admin/orders" className="block hover:text-yellow-400">
            Orders
          </Link>
          <Link to="/admin/customers" className="block hover:text-yellow-400">
            Customers
          </Link>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
