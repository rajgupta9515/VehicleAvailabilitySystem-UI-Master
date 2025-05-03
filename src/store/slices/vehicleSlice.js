import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT"

// Async thunks
export const fetchAllVehicles = createAsyncThunk("vehicles/fetchAll", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/vehicles`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch vehicles")
  }
})

export const fetchVehicleById = createAsyncThunk("vehicles/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/vehicle?id=${id}`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to fetch vehicle details")
  }
})

export const addVehicle = createAsyncThunk("vehicles/add", async (vehicleData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/addVehicle`, vehicleData, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to add vehicle")
  }
})

export const updateVehicle = createAsyncThunk("vehicles/update", async ({ id, vehicleData }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/editVehicle?id=${id}`, vehicleData, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to update vehicle")
  }
})

export const deleteVehicle = createAsyncThunk("vehicles/delete", async (id, { rejectWithValue }) => {
  try {
    await axios.post(
      `${BASE_URL}/deleteVehicle?id=${id}`,
      {},
      {
        withCredentials: true,
      },
    )
    return id
  } catch (error) {
    return rejectWithValue(error.response?.data || "Failed to delete vehicle")
  }
})

const initialState = {
  vehicles: [],
  currentVehicle: null,
  loading: false,
  error: null,
}

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    clearVehicleError: (state) => {
      state.error = null
    },
    clearCurrentVehicle: (state) => {
      state.currentVehicle = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Vehicles
      .addCase(fetchAllVehicles.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchAllVehicles.fulfilled, (state, action) => {
        state.loading = false
        state.vehicles = action.payload
      })
      .addCase(fetchAllVehicles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch vehicles"
      })

      // Fetch Vehicle By ID
      .addCase(fetchVehicleById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchVehicleById.fulfilled, (state, action) => {
        state.loading = false
        state.currentVehicle = action.payload
      })
      .addCase(fetchVehicleById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to fetch vehicle details"
      })

      // Add Vehicle
      .addCase(addVehicle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(addVehicle.fulfilled, (state, action) => {
        state.loading = false
        state.vehicles.push(action.payload)
      })
      .addCase(addVehicle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to add vehicle"
      })

      // Update Vehicle
      .addCase(updateVehicle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateVehicle.fulfilled, (state, action) => {
        state.loading = false
        state.currentVehicle = action.payload
        const index = state.vehicles.findIndex((v) => v.id === action.payload.id)
        if (index !== -1) {
          state.vehicles[index] = action.payload
        }
      })
      .addCase(updateVehicle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to update vehicle"
      })

      // Delete Vehicle
      .addCase(deleteVehicle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(deleteVehicle.fulfilled, (state, action) => {
        state.loading = false
        state.vehicles = state.vehicles.filter((vehicle) => vehicle.id !== action.payload)
        state.currentVehicle = null
      })
      .addCase(deleteVehicle.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Failed to delete vehicle"
      })
  },
})

export const { clearVehicleError, clearCurrentVehicle } = vehicleSlice.actions
export default vehicleSlice.reducer
