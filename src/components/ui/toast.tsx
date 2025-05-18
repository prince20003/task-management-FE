

import type React from "react"

import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"
import type { RootState } from "../../store"
import { removeToast } from "../../store/slices/toastSlice"
import type { ToastMessage, ToastType } from "../../types"

const toastIcons: Record<ToastType, React.ReactNode> = {
  success: <CheckCircle className="h-5 w-5 text-green-500" />,
  error: <AlertCircle className="h-5 w-5 text-red-500" />,
  warning: <AlertTriangle className="h-5 w-5 text-yellow-500" />,
  info: <Info className="h-5 w-5 text-blue-500" />,
  default: <Info className="h-5 w-5 text-gray-500" />,
}

const toastClasses: Record<ToastType, string> = {
  success: "border-green-500 bg-green-50 dark:bg-green-900/20",
  error: "border-red-500 bg-red-50 dark:bg-red-900/20",
  warning: "border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20",
  info: "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
  default: "border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800",
}

const Toast = ({ toast }: { toast: ToastMessage }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(removeToast(toast.id))
    }, toast.duration || 5000)

    return () => clearTimeout(timer)
  }, [dispatch, toast])

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`notification w-full max-w-sm rounded-lg border-l-4 shadow-md ${toastClasses[toast.type]}`}
    >
      <div className="flex p-4">
        <div className="flex-shrink-0">{toastIcons[toast.type]}</div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{toast.title}</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{toast.message}</p>
        </div>
        <button
          onClick={() => dispatch(removeToast(toast.id))}
          className="ml-4 flex-shrink-0 inline-flex text-gray-400 hover:text-gray-500 focus:outline-none"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </motion.div>
  )
}

export const Toaster = () => {
  const { toasts } = useSelector((state: RootState) => state.toast)

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} />
        ))}
      </AnimatePresence>
    </div>
  )
}
