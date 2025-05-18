

import { useState } from "react"
import { motion } from "framer-motion"
import { Plus } from "lucide-react"
import { useFetchTasksQuery } from "../services/api"
import TaskStats from "../components/TaskStats"
import TaskList from "../components/TaskList"
import TaskForm from "../components/TaskForm"
import { Button } from "../components/ui/button"

const Dashboard = () => {
  const { data: tasks = [], isLoading, error } = useFetchTasksQuery()
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false)

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center">
          <svg
            className="animate-spin h-8 w-8 text-primary mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          <p className="text-gray-500 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load dashboard data</p>
          <p className="text-gray-500 dark:text-gray-400">Please try again later</p>
        </div>
      </div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <Button onClick={() => setIsTaskFormOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Task
        </Button>
      </div>

      <TaskStats tasks={tasks} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Recent 3 Tasks</h2>
          <TaskList tasks={tasks.slice(0, 3)} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">High Priority Tasks</h2>
          <div className="space-y-6">
            <TaskList tasks={tasks.filter((task) => task.priority === "high").slice(0, 3)} title="" />
          </div>
        </div>
      </div>

      <TaskForm isOpen={isTaskFormOpen} onClose={() => setIsTaskFormOpen(false)} />
    </motion.div>
  )
}

export default Dashboard
