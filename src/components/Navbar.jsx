"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { logout } from "../store/authSlice"

const Navbar = () => {
  const { user, isDealer } = useSelector((state) => state.auth)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      // Optional: Call logout API if your backend has one
      // await axios.post("http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/logout", {},
      //   { withCredentials: true }
      // )

      dispatch(logout())
      navigate("/")
    } catch (err) {
      console.error("Logout error:", err)
    }
  }

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-green-600">KPIT</h1>
            <span className="ml-2 text-gray-600 font-semibold hidden sm:inline">Vehicle Availability System</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/vehicles" className="text-gray-700 hover:text-green-600 transition duration-300">
              Vehicles
            </Link>
            {isDealer && (
              <Link to="/add-vehicle" className="text-gray-700 hover:text-green-600 transition duration-300">
                Add Vehicle
              </Link>
            )}
            <div className="relative">
              <button
                className="flex items-center text-gray-700 hover:text-green-600 transition duration-300"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <span className="mr-1">{user?.username || "User"}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <button
              className="text-gray-700 hover:text-green-600 transition duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {isMenuOpen && (
              <div className="absolute top-16 right-0 left-0 bg-white shadow-md z-10">
                <div className="container mx-auto px-4 py-2">
                  <Link
                    to="/vehicles"
                    className="block py-2 text-gray-700 hover:text-green-600 transition duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Vehicles
                  </Link>
                  {isDealer && (
                    <Link
                      to="/add-vehicle"
                      className="block py-2 text-gray-700 hover:text-green-600 transition duration-300"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Add Vehicle
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left py-2 text-gray-700 hover:text-green-600 transition duration-300"
                  >
                    Logout ({user?.username || "User"})
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar
