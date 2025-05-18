import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Menu, X, Bell, Sun, Moon, LogOut } from "lucide-react"
import type { RootState } from "../store"
import { logout } from "../store/slices/authSlice"
import { useTheme } from "../contexts/ThemeContext"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { motion } from "framer-motion"

const Navbar = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state: RootState) => state.auth)
  const { theme, toggleTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/dashboard" className="text-xl font-bold text-primary">
                Task Management
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Bell size={20} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="p-2 text-sm text-center text-gray-500 dark:text-gray-400">No new notifications</div>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                      {user?.name?.charAt(0) || user?.email?.charAt(0)}
                    </div>
                    <span className="hidden lg:block">{user?.name || user?.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 dark:text-red-400">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <div className="flex justify-between items-center p-2">
              <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
                {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell size={20} />
              </Button>
            </div>

            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-3 p-2">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                  {user?.name?.charAt(0) || user?.email?.charAt(0)}
                </div>
                <span>{user?.name || user?.email}</span>
              </div>

              <Button
                variant="ghost"
                className="w-full justify-start text-red-500 dark:text-red-400 mt-2"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  )
}

export default Navbar
