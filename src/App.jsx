import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { store } from "./store"
import LandingPage from "./pages/LandingPage"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import VehicleList from "./pages/VehicleList"
import VehicleDetail from "./pages/VehicleDetail"
import AddVehicle from "./pages/AddVehicle"
import EditVehicle from "./pages/EditVehicle"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/vehicles"
            element={
              <ProtectedRoute>
                <VehicleList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/vehicles/:id"
            element={
              <ProtectedRoute>
                <VehicleDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-vehicle"
            element={
              <ProtectedRoute requireDealer={true}>
                <AddVehicle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-vehicle/:id"
            element={
              <ProtectedRoute requireDealer={true}>
                <EditVehicle />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
