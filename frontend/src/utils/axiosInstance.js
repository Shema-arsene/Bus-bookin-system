import axios from "axios"

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
})

// Attach token from localStorage before every request
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token")
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
