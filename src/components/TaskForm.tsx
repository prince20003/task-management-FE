

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import type { Task } from "../types"
import { useCreateTaskMutation, useFetchCategoryQuery, useUpdateTaskMutation } from "../services/api"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface TaskFormProps {
  task?: Task
  isOpen: boolean
  onClose: () => void
}


const TaskForm = ({ task, isOpen, onClose }: TaskFormProps) => {
  const [createTask] = useCreateTaskMutation()
  const [updateTask] = useUpdateTaskMutation()
  const { data: categories = [] } = useFetchCategoryQuery();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "medium",
    category_id: "",
    due_date: "",
  })

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description || "",
        priority: task.priority,
        category_id: task.category_id,
        due_date: task.due_date ? new Date(task.due_date).toISOString().split("T")[0] : "",
      })
    } else {
      setFormData({
        title: "",
        description: "",
        priority: "medium",
        category_id: "",
        due_date: "",
      })
    }
  }, [task])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      if (task) {
        await updateTask({
          id: task.id,
          updates: formData,
        }).unwrap()
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          category_id: "",
          due_date: "",
        })
      } else {
        await createTask(formData).unwrap()
        setFormData({
          title: "",
          description: "",
          priority: "medium",
          category_id: "",
          due_date: "",
        })
      }

      onClose()
    } catch (error) {
      console.error("Failed to save task:", error)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold">{task ? "Edit Task" : "Create New Task"}</h2>
              <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
                <X size={20} />
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Task title"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  placeholder="Task description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="priority" className="block text-sm font-medium">
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="category_id" className="block text-sm font-medium">
                    Category
                  </label>
                  <select
                    id="category_id"
                    name="category_id"
                    value={formData?.category_id}
                    onChange={handleChange}
                    required
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <option value="" disabled>
                      Select category
                    </option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                  <label htmlFor="due_date" className="block text-sm font-medium">
                    Due Date
                  </label>
                  <Input id="due_date" name="due_date" type="date" value={formData.due_date} onChange={handleChange} />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button type="submit">{task ? "Update Task" : "Create Task"}</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default TaskForm
