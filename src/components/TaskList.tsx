

import { useState } from "react"
import { useDispatch } from "react-redux"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import { Edit, Trash2, CheckCircle, Clock, AlertCircle } from "lucide-react"
import type { Task } from "../types"
import { useDeleteTaskMutation, useUpdateTaskMutation } from "../services/api"
import { addToast } from "../store/slices/toastSlice"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter } from "./ui/card"
import TaskForm from "./TaskForm"

interface TaskListProps {
  tasks: Task[]
  title?: string
}

const TaskList = ({ tasks, title }: TaskListProps) => {
  const dispatch = useDispatch()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id).unwrap()
    } catch (error) {
      console.error("Failed to delete task:", error)
    }
  }

  const handleStatusChange = async (task: Task, newStatus: "completed") => {
    try {
      await updateTask({
        id: task.id,
        updates: { completed: true },
      }).unwrap()

      if (newStatus === "completed") {
        dispatch(
          addToast({
            type: "success",
            title: "Task completed",
            message: "Great job! Task marked as completed",
          }),
        )
      }
    } catch (error) {
      console.error("Failed to update task status:", error)
    }
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500 dark:text-gray-400">
        {title ? `No ${title.toLowerCase()} tasks found.` : "No tasks found."}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}

      <TransitionGroup className="space-y-4">
        {tasks.map((task) => (
          <CSSTransition key={task.id} timeout={300} classNames="task-item">
            <Card
              className={`task-item border-l-4 ${
                task.status === "completed"
                  ? "border-l-green-500"
                  : task.status === "in-progress"
                    ? "border-l-yellow-500"
                    : "border-l-blue-500"
              } ${task.status === "completed" ? "bg-green-50 dark:bg-green-900/10" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium ${task.status === "completed" ? "line-through text-gray-500" : ""}`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center text-sm">
                        {task.completed ? "✅ Completed" : "⏳ Pending"}
                      </div>
                      <span className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
                        {getPriorityIcon(task.priority)}
                        {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {task.description || "No description provided"}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800">
                        {task?.Category?.name}
                      </span>
                      {task?.due_date && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Due: {new Date(task?.due_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-4 pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setEditingTask(task)}>
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(task.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>

                <div className="flex gap-2">
                  {!task.completed && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-green-500 hover:text-green-600"
                      onClick={() => handleStatusChange(task, "completed")}
                    >
                      Mark as Completed
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          </CSSTransition>
        ))}
      </TransitionGroup>

      {editingTask && <TaskForm task={editingTask} onClose={() => setEditingTask(null)} isOpen={!!editingTask} />}
    </div>
  )
}

export default TaskList
