import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Navbar() {
  const { isLoggedIn, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm dark:bg-gray-900 dark:border-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4 py-3">

        <Link to="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl scm-gradient flex items-center justify-center shadow">
            <i className="fa-solid fa-address-book text-white text-sm"></i>
          </div>
          <span className="text-xl font-bold text-gray-800 dark:text-white">ConnectSphere</span>
        </Link>

        <div className="flex gap-2 md:order-2 items-center">
          <button onClick={toggleTheme}
            className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-2 rounded-lg text-sm transition text-gray-700 dark:text-white">
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
            <span className="ml-1 hidden sm:inline">{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
          {isLoggedIn() ? (
            <>
              <Link to="/user/dashboard" className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm px-4 py-2 transition dark:bg-blue-600 dark:hover:bg-blue-500">Dashboard</Link>
              <button onClick={() => { logout(); navigate('/login') }} className="text-white bg-red-600 hover:bg-red-500 font-medium rounded-lg text-sm px-4 py-2 transition">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-white bg-gray-800 hover:bg-gray-700 font-medium rounded-lg text-sm px-4 py-2 transition dark:bg-blue-600 dark:hover:bg-blue-500">Login</Link>
              <Link to="/register" className="text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-lg text-sm px-4 py-2 transition">Sign Up</Link>
            </>
          )}
        </div>

        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1">
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 md:mt-0 md:flex-row md:space-x-1">
            {[['/', 'Home'], ['/about', 'About'], ['/services', 'Services'], ['/contact', 'Contact']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="block py-2 px-3 text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">{label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}
