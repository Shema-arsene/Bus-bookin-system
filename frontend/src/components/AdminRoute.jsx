import { Navigate, Outlet } from "react-router-dom"

const isAdmin = () => {
  // Replace with real auth logic
  //   return localStorage.getItem("role") === "admin"
  return true
}

const AdminRoute = () => {
  return isAdmin() ? <Outlet /> : <Navigate to="/login" />
}

export default AdminRoute
