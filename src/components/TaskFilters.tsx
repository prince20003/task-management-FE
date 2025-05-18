

import type React from "react"

import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { Filter, X } from "lucide-react"
import type { RootState } from "../store"
import {
  setSelectedCategory,
  setSelectedStatus,
  setSelectedPriority,
  setSearchQuery,
  clearFilters,
} from "../store/slices/tasksSlice"
import type { Task } from "../types"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { useFetchCategoryQuery } from "@/services/api"

interface TaskFiltersProps {
  tasks: Task[]
}

const TaskFilters = ({ tasks }: TaskFiltersProps) => {
  const dispatch = useDispatch()
  const { selectedCategory, selectedStatus, selectedPriority, searchQuery } = useSelector(
    (state: RootState) => state.tasks,
  )
  const {data: categories} = useFetchCategoryQuery();
  // Extract unique categories from tasks
  // const categories = [...new Set(tasks.map((task) => task.category))].filter(Boolean)

  const handleCategoryChange = (category: string | null) => {
    dispatch(setSelectedCategory(category))
  }

  const handleStatusChange = (status: string | null) => {
    dispatch(setSelectedStatus(status))
  }

  const handlePriorityChange = (priority: string | null) => {
    dispatch(setSelectedPriority(priority))
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value))
  }

  const handleClearFilters = () => {
    dispatch(clearFilters())
  }

  const isFiltersApplied = selectedCategory || selectedStatus || selectedPriority || searchQuery

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <div className="relative">
            <Input placeholder="Search tasks..." value={searchQuery} onChange={handleSearchChange} className="pl-10" />
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={selectedCategory || ""}
            onChange={(e) => handleCategoryChange(e.target.value || null)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">All Categories</option>
            {categories?.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus || ""}
            onChange={(e) => handleStatusChange(e.target.value || null)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          <select
            value={selectedPriority || ""}
            onChange={(e) => handlePriorityChange(e.target.value || null)}
            className="rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          {isFiltersApplied && (
            <Button variant="outline" size="icon" onClick={handleClearFilters} className="rounded-full">
              <X size={18} />
            </Button>
          )}
        </div>
      </div>

      {isFiltersApplied && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Filter size={16} />
            <span>Filters applied:</span>
            <div className="flex flex-wrap gap-2">
              {selectedCategory && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                  Category: {selectedCategory}
                </span>
              )}
              {selectedStatus && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                  Status: {selectedStatus}
                </span>
              )}
              {selectedPriority && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                  Priority: {selectedPriority}
                </span>
              )}
              {searchQuery && (
                <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                  Search: "{searchQuery}"
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

export default TaskFilters
