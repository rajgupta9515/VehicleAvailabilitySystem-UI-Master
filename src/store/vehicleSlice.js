import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  vehicles: [],
  currentVehicle: null,
}

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload
    },
    setCurrentVehicle: (state, action) => {
      state.currentVehicle = action.payload
    },
    addNewVehicle: (state, action) => {
      state.vehicles.push(action.payload)
    },
    updateExistingVehicle: (state, action) => {
      state.currentVehicle = action.payload
      const index = state.vehicles.findIndex((v) => v.id === action.payload.id)
      if (index !== -1) {
        state.vehicles[index] = action.payload
      }
    },
    removeVehicle: (state, action) => {
      state.vehicles = state.vehicles.filter((vehicle) => vehicle.id !== action.payload)
      if (state.currentVehicle && state.currentVehicle.id === action.payload) {
        state.currentVehicle = null
      }
    },
    clearCurrentVehicle: (state) => {
      state.currentVehicle = null
    },
  },
})

export const {
  setVehicles,
  setCurrentVehicle,
  addNewVehicle,
  updateExistingVehicle,
  removeVehicle,
  clearCurrentVehicle,
} = vehicleSlice.actions
export default vehicleSlice.reducer
