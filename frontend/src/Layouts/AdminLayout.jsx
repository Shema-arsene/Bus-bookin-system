import { Home, LogOut } from "lucide-react"
import { Outlet, Link, NavLink } from "react-router-dom"

const AdminLayout = () => {
  const logout = () => {
    // Implement your logout logic here
    console.log("Log out clicked")
  }
  const closeSidebar = () => {
    // Implement your sidebar close logic here
    console.log("Sidebar close clicked")
  }

  return (
    <div className="min-h-screen flex">
      <aside className="w-64 flex flex-col bg-gray-800 text-white p-4 space-y-4">
        <Link to="/admin" className="text-2xl font-bold my-3">
          Admin Panel
        </Link>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `group relative text-base font-semibold transition-colors duration-300 ${
                isActive ? "text-sky-400" : "text-white hover:text-sky-400"
              }`
            }
          >
            {({ isActive }) => (
              <span
                className={`relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-sky-400 before:transition-all before:duration-300 ${
                  isActive
                    ? "before:w-full"
                    : "before:w-0 group-hover:before:w-full"
                }`}
              >
                Dashboard
              </span>
            )}
          </NavLink>

          <NavLink
            to="/admin/buses"
            className={({ isActive }) =>
              `group relative text-base font-semibold transition-colors duration-300 ${
                isActive ? "text-sky-400" : "text-white hover:text-sky-400"
              }`
            }
          >
            {({ isActive }) => (
              <span
                className={`relative before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-sky-400 before:transition-all before:duration-300 ${
                  isActive
                    ? "before:w-full"
                    : "before:w-0 group-hover:before:w-full"
                }`}
              >
                Buses
              </span>
            )}
          </NavLink>

          <hr className="my-5" />

          <Link
            to="/"
            className="flex items-center space-x-3 p-3 rounded-lg text-white hover:text-sky-400 w-full cursor-pointer"
          >
            <Home className="h-5 w-5" /> <span>Back Home</span>
          </Link>

          <button
            onClick={() => {
              logout()
              closeSidebar()
            }}
            className="flex items-center space-x-3 p-3 rounded-lg text-white hover:text-sky-400 w-full cursor-pointer"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </nav>
      </aside>
      <main className="flex-1 bg-gray-100">
        <Outlet />
      </main>
    </div>
  )
}

export default AdminLayout
