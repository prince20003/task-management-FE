

import { useMemo } from "react"
import type { Task, TaskStats } from "../types"
import { calculateTaskStats } from "../utils/taskTransformations"

export const useTaskStatistics = (tasks: Task[]): TaskStats => {
  const statistics = useMemo(() => calculateTaskStats(tasks), [tasks])
  return statistics
}
