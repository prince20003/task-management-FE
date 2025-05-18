import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { User } from "../../types"

interface AuthState {
  user: User | null
  isLoading: boolean
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      // Store user in localStorage for persistence
      localStorage.setItem("user", JSON.stringify(action.payload))
      if (action.payload.token) {
        localStorage.setItem("token", action.payload.token)
      }
    },
    logout: (state) => {
      state.user = null
      localStorage.removeItem("token")
      localStorage.removeItem("user")
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
  },
})

export const { setUser, logout, setLoading } = authSlice.actions
export default authSlice.reducer
