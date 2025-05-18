

import { useMemo } from "react"
import { CheckCircle, AlertCircle, ListChecks } from "lucide-react"
import type { Task } from "../types"
import { useTaskStatistics } from "../hooks/useTaskStatistics"
import { Card, CardContent } from "./ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

interface TaskStatsProps {
  tasks: Task[]
}

const TaskStats = ({ tasks }: TaskStatsProps) => {
  const stats = useTaskStatistics(tasks)

  const statusData = useMemo(
    () => [
      { name: "Completed", value: stats.completed, color: "#10b981" },
      { name: "Pedning", value: stats.pending, color: "#f59e0b" },
    ],
    [stats],
  )

  const priorityData = useMemo(
    () => [
      { name: "Low", value: stats.byPriority.low, color: "#10b981" },
      { name: "Medium", value: stats.byPriority.medium, color: "#f59e0b" },
      { name: "High", value: stats.byPriority.high, color: "#ef4444" },
    ],
    [stats],
  )

  const categoryData = useMemo(() => {
    return Object.entries(stats.byCategory).map(([name, value], index) => {
      const colors = ["#3b82f6", "#8b5cf6", "#ec4899", "#f43f5e", "#f97316", "#84cc16", "#14b8a6"]
      return {
        name,
        value,
        color: colors[index % colors.length],
      }
    })
  }, [stats])

  const completionPercentage = useMemo(() => {
    if (stats.total === 0) return 0
    return Math.round((stats.completed / stats.total) * 100)
  }, [stats])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Tasks</p>
              <h3 className="text-2xl font-bold mt-1">{stats.total}</h3>
            </div>
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
              <ListChecks className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Pending</p>
              <h3 className="text-2xl font-bold mt-1">{stats.pending}</h3>
            </div>
            <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center">
              <AlertCircle className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Completed</p>
              <h3 className="text-2xl font-bold mt-1">{stats.completed}</h3>
            </div>
            <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      {tasks?.length > 0 && <Card className="md:col-span-2">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Task Status</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>}

      {tasks?.length > 0 && <Card className="md:col-span-2">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Task Priority</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>}
    </div>
  )
}

export default TaskStats
