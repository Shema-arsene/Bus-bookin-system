import React, { createContext, useState, useEffect, useContext } from "react"
import axiosInstance from "../utils/axiosInstance"
import { API_PATHS } from "../utils/apiPaths"
const AuthContext = createContext(undefined)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  // Load token/user from localStorage on first mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${storedToken}`
    }
    setLoading(false)
  }, [])

  // Sync axios headers with token changes
  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"]
    }
  }, [token])

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      })
      const { token, user } = res.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      setToken(token)
      setUser(user)

      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  // Register function
  const register = async (fullName, email, password, phone) => {
    console.log("Registering user:", { fullName, email, password, phone })

    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        phone,
      })

      console.log("Register response:", res.data)

      const { token, user } = res.data

      localStorage.setItem("token", token)
      localStorage.setItem("user", JSON.stringify(user))

      setToken(token)
      setUser(user)

      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } catch (error) {
      console.error("Register error:", error)
      console.error(
        "Registering error:",
        error?.response?.data || error.message
      )
      throw error
    }
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    delete axiosInstance.defaults.headers.common["Authorization"]

    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
