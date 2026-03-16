import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function Sidebar() {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  const avatar = user?.profilePic ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=3b82f6&color=fff`

  const isAdmin = user?.roleList?.includes('ROLE_ADMIN')
  const isActive = path => location.pathname === path

  const links = [
    { to: '/', icon: 'fa-house', label: 'Home' },
    { to: '/user/dashboard', icon: 'fa-gauge', label: 'Dashboard' },
    { to: '/user/profile', icon: 'fa-user', label: 'Profile', badge: 'Manage' },
    { to: '/user/contacts/add', icon: 'fa-plus', label: 'Add Contact' },
    { to: '/user/contacts', icon: 'fa-address-book', label: 'My Contacts' },
    { to: '/user/contacts/search', icon: 'fa-magnifying-glass', label: 'Search' },
  ]

  return (
    <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
      <div className="h-full pt-16 px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800 border-r border-gray-100 dark:border-gray-700">

        <Link to="/user/profile" className="flex flex-col items-center py-4 mb-4 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl transition px-2">
          <img src={avatar} onError={e => e.target.src = `https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff`}
            className="h-20 w-20 rounded-full object-cover shadow-md ring-2 ring-blue-500 ring-offset-2" alt="Profile" />
          <span className="mt-3 font-semibold text-gray-800 dark:text-white text-center text-sm">{user?.name}</span>
          <span className="text-xs text-gray-400 text-center truncate w-full text-center">{user?.email}</span>
          <div className="flex gap-1 mt-2 flex-wrap justify-center">
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-medium">ConnectSphere</span>
            {isAdmin && <span className="text-xs bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full font-medium">Admin</span>}
          </div>
        </Link>

        <hr className="border-gray-100 dark:border-gray-700 mb-3" />

        <ul className="space-y-1 font-medium">
          {links.map(({ to, icon, label, badge }) => (
            <li key={to}>
              <Link to={to}
                className={`flex items-center p-2.5 rounded-xl transition group ${isActive(to)
                  ? 'bg-blue-50 dark:bg-gray-700 text-blue-700 dark:text-white'
                  : 'text-gray-700 dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700'}`}>
                <i className={`fa-solid ${icon} w-5 text-center ${isActive(to) ? 'text-blue-600' : 'text-gray-400 group-hover:text-blue-600'} transition`}></i>
                <span className="flex-1 ms-3">{label}</span>
                {badge && <span className="text-xs bg-green-100 text-green-700 dark:bg-gray-700 dark:text-gray-300 px-2 py-0.5 rounded-full">{badge}</span>}
              </Link>
            </li>
          ))}

          {isAdmin && (
            <>
              <li><hr className="border-gray-100 dark:border-gray-700 my-2" /></li>
              <li>
                <Link to="/admin/dashboard"
                  className={`flex items-center p-2.5 rounded-xl transition group ${isActive('/admin/dashboard')
                    ? 'bg-red-50 dark:bg-gray-700 text-red-700'
                    : 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-gray-700'}`}>
                  <i className="fa-solid fa-shield-halved w-5 text-center text-red-500"></i>
                  <span className="flex-1 ms-3">Admin Panel</span>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Admin</span>
                </Link>
              </li>
            </>
          )}

          <li><hr className="border-gray-100 dark:border-gray-700 my-2" /></li>

          <li>
            <button onClick={toggleTheme}
              className="w-full flex items-center p-2.5 text-gray-700 rounded-xl dark:text-white hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-blue-700 group transition">
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} w-5 text-center text-gray-400 group-hover:text-blue-600 transition`}></i>
              <span className="flex-1 ms-3">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </li>

          <li>
            <button onClick={() => { logout(); navigate('/login') }}
              className="w-full flex items-center p-2.5 text-red-600 rounded-xl hover:bg-red-50 dark:hover:bg-gray-700 transition">
              <i className="fa-solid fa-arrow-right-from-bracket w-5 text-center text-red-400"></i>
              <span className="flex-1 ms-3">Logout</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  )
}
