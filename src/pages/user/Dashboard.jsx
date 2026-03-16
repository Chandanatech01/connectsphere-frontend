import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import UserNavbar from '../../components/UserNavbar'
import { useAuth } from '../../context/AuthContext'
import { getContacts } from '../../api/api'

export default function Dashboard() {
  const { user } = useAuth()
  const [totalContacts, setTotalContacts] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getContacts(0, 1).then(r => setTotalContacts(r.data.totalElements || 0)).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const quickActions = [
    { icon: 'fa-plus', label: 'Add Contact', to: '/user/contacts/add', bg: 'bg-blue-100 dark:bg-blue-900/50', color: 'text-blue-600' },
    { icon: 'fa-address-book', label: 'View Contacts', to: '/user/contacts', bg: 'bg-green-100 dark:bg-green-900/50', color: 'text-green-600' },
    { icon: 'fa-magnifying-glass', label: 'Search', to: '/user/contacts/search', bg: 'bg-yellow-100 dark:bg-yellow-900/50', color: 'text-yellow-600' },
    { icon: 'fa-user', label: 'My Profile', to: '/user/profile', bg: 'bg-purple-100 dark:bg-purple-900/50', color: 'text-purple-600' },
  ]

  return (
    <div>
      <UserNavbar />
      <Sidebar />
      <div className="sm:pl-64 pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-6 max-w-5xl mx-auto">

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Welcome back, {user?.name?.split(' ')[0]} 👋</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Here's what's happening with your contacts today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-address-book text-blue-600 text-xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">{loading ? '...' : totalContacts}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Total Contacts</div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center">
                <i className="fa-solid fa-heart text-red-500 text-xl"></i>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800 dark:text-white">—</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Favorites</div>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 flex items-center gap-4">
              <div className={`w-12 h-12 ${user?.emailVerified ? 'bg-green-100 dark:bg-green-900/50' : 'bg-yellow-100 dark:bg-yellow-900/50'} rounded-xl flex items-center justify-center`}>
                <i className={`fa-solid fa-envelope ${user?.emailVerified ? 'text-green-600' : 'text-yellow-600'} text-xl`}></i>
              </div>
              <div>
                <div className="text-lg font-bold text-gray-800 dark:text-white">{user?.emailVerified ? 'Verified' : 'Pending'}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Email Status</div>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickActions.map(a => (
                <Link key={a.label} to={a.to} className="card-hover bg-white dark:bg-gray-800 p-5 rounded-2xl border border-gray-100 dark:border-gray-700 text-center">
                  <div className={`w-11 h-11 ${a.bg} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                    <i className={`fa-solid ${a.icon} ${a.color} text-lg`}></i>
                  </div>
                  <div className="font-semibold text-sm text-gray-700 dark:text-gray-300">{a.label}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Account Info</h2>
            {[['Name', user?.name], ['Email', user?.email], ['Phone', user?.phoneNumber || '—'], ['Provider', user?.provider || 'Email']].map(([l, v]) => (
              <div key={l} className="flex justify-between py-3 border-b border-gray-100 dark:border-gray-700 text-sm last:border-0">
                <span className="text-gray-500 dark:text-gray-400 font-medium">{l}</span>
                <span className="font-semibold text-gray-800 dark:text-white">{v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
