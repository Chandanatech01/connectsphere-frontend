import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function UserNavbar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-800 sm:pl-64 fixed w-full top-0 left-0 right-0 z-40">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-3">
        <Link to="/user/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg scm-gradient flex items-center justify-center">
            <i className="fa-solid fa-address-book text-white text-xs"></i>
          </div>
          <span className="text-lg font-bold text-gray-800 dark:text-white hidden sm:inline">ConnectSphere</span>
        </Link>

        <div className="flex items-center gap-2">
          <button onClick={toggleTheme}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 px-3 py-2 rounded-lg text-sm transition text-gray-700 dark:text-white">
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <Link to="/user/profile"
            className="hidden md:flex items-center gap-2 bg-blue-50 hover:bg-blue-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-blue-700 dark:text-white font-medium rounded-lg text-sm px-3 py-2 transition">
            <i className="fa-solid fa-user-circle"></i>
            <span>{user?.name}</span>
          </Link>
          <button onClick={() => { logout(); navigate('/login') }}
            className="hidden md:flex items-center gap-1 text-white bg-red-600 hover:bg-red-500 font-medium rounded-lg text-sm px-3 py-2 transition">
            <i className="fa-solid fa-arrow-right-from-bracket"></i>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}
