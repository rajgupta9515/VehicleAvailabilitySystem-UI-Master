"use client"

import { createContext, useState, useContext, useEffect } from "react"
import axios from "axios"

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
    setLoading(false)
  }, [])

  const login = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/api/auth/login", {
        username,
        password,
      })

      const userData = response.data
      setCurrentUser(userData)
      localStorage.setItem("user", JSON.stringify(userData))
      return userData
    } catch (error) {
      console.error("Login error:", error)
      throw error
    }
  }

  const signup = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT/api/auth/register",
        userData,
      )
      return response.data
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem("user")
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isDealer: currentUser?.isDealer || false,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
