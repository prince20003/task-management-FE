

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AnimatePresence } from "framer-motion"
import { ThemeProvider } from "./contexts/ThemeContext"
import { setUser } from "./store/slices/authSlice"
import type { RootState } from "./store"
import ProtectedRoute from "./components/ProtectedRoute"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import Tasks from "./pages/Tasks"
import NotFound from "./pages/NotFound"
import Layout from "./components/Layout"
import { ErrorBoundary } from "./components/ErrorBoundary"

const App = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (token && storedUser) {
      try {
        dispatch(setUser(JSON.parse(storedUser)))
      } catch (error) {
        localStorage.removeItem("token")
        localStorage.removeItem("user")
      }
    }
  }, [dispatch])

  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
              <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />

              <Route element={<ProtectedRoute />}>
                <Route element={<Layout />}>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/tasks" element={<Tasks />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default App
