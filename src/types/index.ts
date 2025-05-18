export interface User {
  id: string
  email: string
  name?: string
  token?: string
}

export interface Task {
  id: string
  title: string
  description?: string
  status: "todo" | "in-progress" | "completed"
  priority: "low" | "medium" | "high"
  due_date?: string
  category_id: string
  userId: string,
  completed: boolean,
  createdAt: string
  updatedAt: string
}


export interface Category {
  id: string,
  name: string
}

export interface TaskStats {
  total: number
  completed: number
  pending: number
  byCategory: Record<string, number>
  byPriority: Record<string, number>
}

export interface ApiResponse<T> {
  data?: T
  error?: {
    status: number
    message: string
  }
  isSuccess: boolean
  isError: boolean
}

export type ToastType = "default" | "success" | "error" | "warning" | "info"

export interface ToastMessage {
  id: string
  type: ToastType
  title: string
  message: string
  duration?: number
}
