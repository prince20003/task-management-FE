import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface TasksState {
  selectedCategory: string | null
  selectedStatus: string | null
  selectedPriority: string | null
  searchQuery: string
}

const initialState: TasksState = {
  selectedCategory: null,
  selectedStatus: null,
  selectedPriority: null,
  searchQuery: "",
}

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload
    },
    setSelectedStatus: (state, action: PayloadAction<string | null>) => {
      state.selectedStatus = action.payload
    },
    setSelectedPriority: (state, action: PayloadAction<string | null>) => {
      state.selectedPriority = action.payload
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload
    },
    clearFilters: (state) => {
      state.selectedCategory = null
      state.selectedStatus = null
      state.selectedPriority = null
      state.searchQuery = ""
    },
  },
})

export const { setSelectedCategory, setSelectedStatus, setSelectedPriority, setSearchQuery, clearFilters } =
  tasksSlice.actions

export default tasksSlice.reducer
