// utils/axiosInstance.js
import axios from "axios"
import { BASE_URL } from "./apiPaths"

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// 🔐 Attach token from localStorage before every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
