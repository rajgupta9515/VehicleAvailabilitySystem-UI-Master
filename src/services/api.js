import axios from "axios"

const BASE_URL = "http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT"

// Create axios instance with base URL
const api = axios.create({
  baseURL: BASE_URL,
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") || "{}")
    if (user.token) {
      config.headers.Authorization = `Bearer ${user.token}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Vehicle API services
export const vehicleService = {
  getAllVehicles: () => api.get("/api/vehicles"),
  getVehicleById: (id) => api.get(`/api/vehicles/${id}`),
  addVehicle: (vehicleData) => api.post("/api/vehicles", vehicleData),
  updateVehicle: (id, vehicleData) => api.put(`/api/vehicles/${id}`, vehicleData),
  deleteVehicle: (id) => api.delete(`/api/vehicles/${id}`),
}

export default api
