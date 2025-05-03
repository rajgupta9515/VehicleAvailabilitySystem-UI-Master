"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { setVehicles } from "../store/vehicleSlice"
import VehicleCard from "../components/VehicleCard"
import Navbar from "../components/Navbar"
import axios from "axios"

const VehicleList = () => {
  const { vehicles } = useSelector((state) => state.vehicles)
  const { isDealer } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    const fetchVehicles = async () => {
      try {
        const response = await axios.get("http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/vehicles", {
          withCredentials: true,
        })
        dispatch(setVehicles(response.data))
        setLoading(false)
      } catch (err) {
        console.error("Error fetching vehicles:", err)
        setError("Failed to load vehicles. Please try again later.")
        setLoading(false)
      }
    }

    fetchVehicles()
  }, [dispatch])

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Available Vehicles</h1>
          {isDealer && (
            <Link
              to="/add-vehicle"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300 flex items-center"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add Vehicle
            </Link>
          )}
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
            <p className="text-red-700">{error}</p>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">No vehicles available at the moment.</h3>
            {isDealer && (
              <Link
                to="/add-vehicle"
                className="mt-4 inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition duration-300"
              >
                Add Your First Vehicle
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {vehicles.map((vehicle) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default VehicleList
