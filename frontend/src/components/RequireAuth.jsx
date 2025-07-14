import { Navigate, Outlet } from "react-router-dom"

const RequireAuth = () => {
  //   const isAuthenticated = localStorage.getItem("token") // or your preferred logic
  const isAuthenticated = true // or your preferred logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}

export default RequireAuth
