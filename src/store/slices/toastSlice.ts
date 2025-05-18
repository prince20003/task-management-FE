import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { ToastMessage } from "../../types"
import { v4 as uuidv4 } from "uuid"

interface ToastState {
  toasts: ToastMessage[]
}

const initialState: ToastState = {
  toasts: [],
}

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast: (state, action: PayloadAction<Omit<ToastMessage, "id">>) => {
      const newToast = {
        ...action.payload,
        id: uuidv4(),
      }
      state.toasts.push(newToast)
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload)
    },
  },
})

export const { addToast, removeToast } = toastSlice.actions
export default toastSlice.reducer
