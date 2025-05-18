import type { Task, TaskStats } from "../types"

export const calculateTaskStats = (tasks: Task[]): TaskStats => {
  const completed = tasks.filter((task) => task.completed == true).length
  const pending = tasks.filter((task) => task.completed == false).length

  // Group by category
  const byCategory: Record<string, number> = {}
  tasks.forEach((task) => {
    if (!byCategory[task.category]) {
      byCategory[task.category] = 0
    }
    byCategory[task.category]++
  })

  // Group by priority
  const byPriority: Record<string, number> = {
    low: 0,
    medium: 0,
    high: 0,
  }
  tasks.forEach((task) => {
    byPriority[task.priority]++
  })

  return {
    total: tasks.length,
    completed,
    pending,
    byCategory,
    byPriority,
  }
}

export const getCompletionPercentage = (tasks: Task[]): number => {
  if (tasks.length === 0) return 0
  const completed = tasks.filter((task) => task.status === "completed").length
  return Math.round((completed / tasks.length) * 100)
}

export const getTasksByCategory = (tasks: Task[]): Record<string, Task[]> => {
  const result: Record<string, Task[]> = {}

  tasks.forEach((task) => {
    if (!result[task.category]) {
      result[task.category] = []
    }
    result[task.category].push(task)
  })

  return result
}

export const getTasksByStatus = (tasks: Task[]): Record<string, Task[]> => {
  const result: Record<string, Task[]> = {
    todo: [],
    "in-progress": [],
    completed: [],
  }

  tasks.forEach((task) => {
    result[task.status].push(task)
  })

  return result
}

export const filterTasks = (
  tasks: Task[],
  category: string | null,
  status: string | null,
  priority: string | null,
  searchQuery: string,
): Task[] => {
  
  return tasks.filter((task) => {
    const completed =  task.completed == true ? "completed" : "pending";
    const matchesCategory = !category || task.Category.name === category
    const matchesStatus = !status || completed == status
    const matchesPriority = !priority || task.priority === priority
    const matchesSearch =
      !searchQuery ||
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesStatus && matchesPriority && matchesSearch
  })
}
