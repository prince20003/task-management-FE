

import { useMemo } from "react"
import { useSelector } from "react-redux"
import type { RootState } from "../store"
import type { Task } from "../types"
import { filterTasks } from "../utils/taskTransformations"

export const useFilteredTasks = (tasks: Task[]): Task[] => {
  const { selectedCategory, selectedStatus, selectedPriority, searchQuery } = useSelector(
    (state: RootState) => state.tasks,
  )

  const filteredTasks = useMemo(() => {
    return filterTasks(tasks, selectedCategory, selectedStatus, selectedPriority, searchQuery)
  }, [tasks, selectedCategory, selectedStatus, selectedPriority, searchQuery])

  return filteredTasks
}