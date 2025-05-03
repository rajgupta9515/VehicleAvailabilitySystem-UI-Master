"use client"

import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

const ProtectedRoute = ({ children, requireDealer = false }) => {
  const { isAuthenticated, isDealer } = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login")
    } else if (requireDealer && !isDealer) {
      navigate("/vehicles")
    }
  }, [isAuthenticated, isDealer, requireDealer, navigate])

  if (!isAuthenticated || (requireDealer && !isDealer)) {
    return null
  }

  return children
}

export default ProtectedRoute
