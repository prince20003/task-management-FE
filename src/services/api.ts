import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import type { Task, User, Category } from "../types"
import { handleApiResponse } from "../utils/apiResponseHandler"

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token")
      if (token) headers.set("authorization", `Bearer ${token}`)
      return headers
    },
  }),
  refetchOnMountOrArgChange: true,
  tagTypes: ["Tasks"],
  endpoints: (build) => ({
    register: build.mutation<User, { email: string; password: string; name?: string }>({
      query: (creds) => ({ url: "/auth/register", method: "POST", body: creds }),
      transformResponse: (response: any) => handleApiResponse(response),
    }),
    login: build.mutation<User, { email: string; password: string }>({
      query: (creds) => ({ url: "/auth/login", method: "POST", body: creds }),
      transformResponse: (response: any) => handleApiResponse(response),
    }),
    fetchCategory: build.query<Category[], void>({
      query: () => "/categories",
      transformResponse: (response: any) => handleApiResponse(response, { showSuccess: false }),
    }),
    fetchTasks: build.query<Task[], void>({
      query: () => "/tasks",
      // transformResponse: (response: any) => handleApiResponse(response),
      transformResponse: (response: any) => handleApiResponse<Task[]>(response, { showSuccess: false }),
      providesTags: ["Tasks"],
    }),
    createTask: build.mutation<Task, Partial<Task>>({
      query: (task) => ({ url: "/tasks", method: "POST", body: task }),
      transformResponse: (response: any) => handleApiResponse(response, { showSuccess: false }),
      invalidatesTags: ["Tasks"],
    }),
    updateTask: build.mutation<Task, { id: string; updates: Partial<Task> }>({
      query: ({ id, updates }) => ({ url: `/tasks/${id}`, method: "PUT", body: updates }),
      transformResponse: (response: any) => handleApiResponse(response, { showSuccess: false }),
      invalidatesTags: ["Tasks"],
    }),
    deleteTask: build.mutation<{ id: string }, string>({
      query: (id) => ({ url: `/tasks/${id}`, method: "DELETE" }),
      transformResponse: (response: any, meta, id) => {
        const processedResponse = handleApiResponse(response)
        return { id }
      },
      invalidatesTags: ["Tasks"],
    }),
  }),
})

export const {
  useRegisterMutation,
  useLoginMutation,
  useFetchTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useFetchCategoryQuery
} = api
