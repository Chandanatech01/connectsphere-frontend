import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import UserNavbar from '../../components/UserNavbar'
import Sidebar from '../../components/Sidebar'
import api from '../../api/api'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState('')

  useEffect(() => {
    Promise.all([
      api.get('/admin/stats'),
      api.get('/admin/users')
    ]).then(([s, u]) => {
      setStats(s.data)
      setUsers(u.data)
    }).catch(() => {}).finally(() => setLoading(false))
  }, [])

  const handleBlock = async (userId, isBlocked) => {
    setActionLoading(userId)
    try {
      await api.put(`/admin/users/${userId}/${isBlocked ? 'unblock' : 'block'}`)
      setUsers(prev => prev.map(u =>
        u.userId === userId ? { ...u, blocked: !isBlocked, enabled: isBlocked } : u
      ))
    } catch { alert('Action failed.') }
    finally { setActionLoading('') }
  }

  const handleDelete = async userId => {
    if (!window.confirm('Delete this user and all their contacts? This cannot be undone!')) return
    setActionLoading(userId)
    try {
      await api.delete(`/admin/users/${userId}`)
      setUsers(prev => prev.filter(u => u.userId !== userId))
    } catch { alert('Delete failed.') }
    finally { setActionLoading('') }
  }

  const statCards = stats ? [
    { label: 'Total Users', value: stats.totalUsers, icon: 'fa-users', bg: 'bg-blue-100 dark:bg-blue-900/50', ic: 'text-blue-600' },
    { label: 'Total Contacts', value: stats.totalContacts, icon: 'fa-address-book', bg: 'bg-green-100 dark:bg-green-900/50', ic: 'text-green-600' },
    { label: 'Verified Users', value: stats.verifiedUsers, icon: 'fa-circle-check', bg: 'bg-purple-100 dark:bg-purple-900/50', ic: 'text-purple-600' },
    { label: 'Blocked Users', value: stats.blockedUsers, icon: 'fa-ban', bg: 'bg-red-100 dark:bg-red-900/50', ic: 'text-red-500' },
  ] : []

  return (
    <div>
      <UserNavbar />
      <Sidebar />
      <div className="sm:pl-64 pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-6 max-w-7xl mx-auto">

          <div className="mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 dark:bg-red-900/50 rounded-xl flex items-center justify-center">
              <i className="fa-solid fa-shield-halved text-red-600"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Panel</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Manage users and monitor platform activity</p>
            </div>
          </div>

          {/* Stats */}
          {loading ? (
            <div className="flex justify-center py-10"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
                {statCards.map(s => (
                  <div key={s.label} className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                    <div className={`w-12 h-12 ${s.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <i className={`fa-solid ${s.icon} ${s.ic} text-xl`}></i>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">{s.value}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Users Table */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex items-center justify-between">
                  <h2 className="font-bold text-gray-800 dark:text-white">All Users ({users.length})</h2>
                </div>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-600 uppercase bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Contacts</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Provider</th>
                      <th className="px-6 py-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {users.map(u => (
                      <tr key={u.userId} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img src={u.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=e0e7ff&color=4f46e5`}
                              onError={e => e.target.src = `https://ui-avatars.com/api/?name=U&background=e0e7ff&color=4f46e5`}
                              className="w-9 h-9 rounded-full object-cover" alt="" />
                            <div>
                              <p className="font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                {u.name}
                                {u.roleList?.includes('ROLE_ADMIN') && (
                                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">Admin</span>
                                )}
                              </p>
                              <p className="text-gray-400 text-xs">{u.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{u.totalContacts}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full w-fit ${u.emailVerified ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              <i className={`fa-solid fa-circle text-xs`}></i>
                              {u.emailVerified ? 'Verified' : 'Unverified'}
                            </span>
                            {u.blocked && (
                              <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full w-fit bg-red-100 text-red-700">
                                <i className="fa-solid fa-ban text-xs"></i> Blocked
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full capitalize">
                            {String(u.provider).toLowerCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {!u.roleList?.includes('ROLE_ADMIN') && (
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => handleBlock(u.userId, u.blocked)}
                                disabled={actionLoading === u.userId}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center transition text-xs ${u.blocked ? 'bg-green-50 dark:bg-gray-700 hover:bg-green-100' : 'bg-orange-50 dark:bg-gray-700 hover:bg-orange-100'}`}
                                title={u.blocked ? 'Unblock' : 'Block'}>
                                {actionLoading === u.userId
                                  ? <i className="fa-solid fa-spinner fa-spin text-gray-400"></i>
                                  : <i className={`fa-solid ${u.blocked ? 'fa-lock-open text-green-500' : 'fa-ban text-orange-500'}`}></i>}
                              </button>
                              <button
                                onClick={() => handleDelete(u.userId)}
                                disabled={actionLoading === u.userId}
                                className="w-8 h-8 bg-red-50 dark:bg-gray-700 hover:bg-red-100 rounded-lg flex items-center justify-center transition"
                                title="Delete user">
                                <i className="fa-solid fa-trash text-red-500 text-xs"></i>
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
