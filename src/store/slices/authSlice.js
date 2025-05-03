import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const BASE_URL = "http://localhost:8080/VehicleAvaibilitySystem-1.0-SNAPSHOT"

// Async thunks
export const loginUser = createAsyncThunk("auth/login", async ({ username, password }, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, { username, password }, { withCredentials: true })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Login failed")
  }
})

export const signupUser = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Signup failed")
  }
})

export const checkAuthStatus = createAsyncThunk("auth/checkStatus", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${BASE_URL}/checkAuth`, {
      withCredentials: true,
    })
    return response.data
  } catch (error) {
    return rejectWithValue(error.response?.data || "Authentication check failed")
  }
})

export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await axios.post(
      `${BASE_URL}/logout`,
      {},
      {
        withCredentials: true,
      },
    )
    return true
  } catch (error) {
    return rejectWithValue(error.response?.data || "Logout failed")
  }
})

const initialState = {
  user: null,
  isAuthenticated: false,
  isDealer: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.isDealer = action.payload.isDealer || false
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Login failed"
      })

      // Signup
      .addCase(signupUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signupUser.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Signup failed"
      })

      // Check Auth Status
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
        state.isDealer = action.payload.isDealer || false
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.loading = false
        state.user = null
        state.isAuthenticated = false
        state.isDealer = false
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
        state.isDealer = false
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
