// utils/apiResponseHandler.ts
import { store } from "../store"
import { addToast } from "../store/slices/toastSlice"

export interface ApiResponseOptions {
  /** if `false`, will skip dispatching the “success” toast even when `response.message` exists */
  showSuccess?: boolean
}

export const handleApiResponse = <T>(
  response: any,
  { showSuccess = true }: ApiResponseOptions = {}
): T => {
  // If the BE returned success: false
  if (response?.success === false) {
    const errorMessage = response?.message || "An error occurred"
    store.dispatch(
      addToast({
        type: "error",
        title: "Error",
        message: errorMessage,
        duration: 5000,
      })
    )
    throw new Error(errorMessage)
  }

  // Only show a success toast if the caller explicitly allows it
  if (showSuccess && response?.message) {
    store.dispatch(
      addToast({
        type: "success",
        title: "Success",
        message: response.message,
        duration: 3000,
      })
    )
  }

  return (response.data ?? response) as T
}
