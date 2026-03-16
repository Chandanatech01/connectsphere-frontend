import { useState, useEffect } from 'react'
import Sidebar from '../../components/Sidebar'
import UserNavbar from '../../components/UserNavbar'
import { useAuth } from '../../context/AuthContext'
import api from '../../api/api'

function ActivityFeed({ activities }) {
  const icons = {
    ADDED: { icon: 'fa-plus', bg: 'bg-green-100', ic: 'text-green-600', label: 'Added' },
    UPDATED: { icon: 'fa-pen', bg: 'bg-blue-100', ic: 'text-blue-600', label: 'Updated' },
    DELETED: { icon: 'fa-trash', bg: 'bg-red-100', ic: 'text-red-500', label: 'Deleted' },
    EMAILED: { icon: 'fa-envelope', bg: 'bg-purple-100', ic: 'text-purple-600', label: 'Emailed' },
  }
  const timeAgo = d => {
    const diff = Date.now() - new Date(d).getTime()
    const m = Math.floor(diff / 60000)
    if (m < 1) return 'just now'
    if (m < 60) return `${m}m ago`
    const h = Math.floor(m / 60)
    if (h < 24) return `${h}h ago`
    return `${Math.floor(h / 24)}d ago`
  }
  if (!activities.length) return <div className="text-center py-8 text-gray-400 text-sm">No activity yet. Start adding contacts!</div>
  return (
    <div className="space-y-3">
      {activities.map(a => {
        const info = icons[a.activityType] || icons.ADDED
        return (
          <div key={a.id} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
            <div className={`w-8 h-8 ${info.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <i className={`fa-solid ${info.icon} ${info.ic} text-xs`}></i>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                <span className="font-medium">{info.label}</span> contact <span className="font-semibold text-gray-800 dark:text-white">{a.contactName}</span>
              </p>
            </div>
            <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(a.createdAt)}</span>
          </div>
        )
      })}
    </div>
  )
}

export default function Profile() {
  const { user, setUser } = useAuth()
  const [tab, setTab] = useState('profile')
  const [form, setForm] = useState({ name: '', phoneNumber: '', about: '' })
  const [pwForm, setPwForm] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState({ text: '', type: '' })

  useEffect(() => {
    if (user) setForm({ name: user.name || '', phoneNumber: user.phoneNumber || '', about: user.about || '' })
  }, [user])

  useEffect(() => {
    if (tab === 'activity') api.get('/users/activity').then(r => setActivities(r.data)).catch(() => {})
  }, [tab])

  const showMsg = (text, type = 'success') => { setMsg({ text, type }); setTimeout(() => setMsg({ text: '', type: '' }), 3000) }

  const handleUpdateProfile = async e => {
    e.preventDefault(); setLoading(true)
    try {
      const res = await api.put('/users/profile', form)
      const u = res.data.user
      localStorage.setItem('user', JSON.stringify(u))
      setUser(u)
      showMsg('Profile updated successfully!')
    } catch (err) { showMsg(err.response?.data?.message || 'Failed.', 'error') }
    finally { setLoading(false) }
  }

  const handleChangePassword = async e => {
    e.preventDefault()
    if (pwForm.newPassword !== pwForm.confirmPassword) return showMsg('Passwords do not match.', 'error')
    setLoading(true)
    try {
      await api.put('/users/change-password', { currentPassword: pwForm.currentPassword, newPassword: pwForm.newPassword })
      setPwForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      showMsg('Password changed successfully!')
    } catch (err) { showMsg(err.response?.data?.message || 'Failed.', 'error') }
    finally { setLoading(false) }
  }

  const avatar = user?.profilePic || `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=e0e7ff&color=4f46e5&size=200`
  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'fa-user' },
    { id: 'edit', label: 'Edit', icon: 'fa-pen' },
    { id: 'password', label: 'Password', icon: 'fa-lock' },
    { id: 'activity', label: 'Activity', icon: 'fa-clock-rotate-left' },
  ]

  return (
    <div>
      <UserNavbar />
      <Sidebar />
      <div className="sm:pl-64 pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-6 max-w-2xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Profile</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage your account settings</p>
          </div>

          {msg.text && (
            <div className={`flex items-center gap-2 p-3 mb-5 text-sm rounded-xl ${msg.type === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              <i className={`fa-solid ${msg.type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'}`}></i>{msg.text}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden mb-5">
            <div className="h-28" style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb, #7c3aed)' }}></div>
            <div className="px-6 pb-5">
              <div className="-mt-10 mb-3">
                <img src={avatar} onError={e => e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=e0e7ff`}
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-lg" alt="profile" />
              </div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-bold text-gray-800 dark:text-white">{user?.name}</h2>
                {user?.emailVerified
                  ? <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-semibold px-2.5 py-1 rounded-full"><i className="fa-solid fa-circle-check"></i> Verified</span>
                  : <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 text-xs font-semibold px-2.5 py-1 rounded-full"><i className="fa-solid fa-circle-xmark"></i> Not Verified</span>}
              </div>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{user?.email}</p>
            </div>
          </div>

          <div className="flex gap-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-xl mb-5">
            {tabs.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-medium transition ${tab === t.id ? 'bg-white dark:bg-gray-700 text-blue-600 shadow-sm' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white'}`}>
                <i className={`fa-solid ${t.icon}`}></i><span className="hidden sm:inline">{t.label}</span>
              </button>
            ))}
          </div>

          {tab === 'profile' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <div className="grid gap-3">
                {[
                  { icon: 'fa-user', bg: 'bg-blue-100 dark:bg-blue-900/50', ic: 'text-blue-600', label: 'Full Name', value: user?.name },
                  { icon: 'fa-envelope', bg: 'bg-green-100 dark:bg-green-900/50', ic: 'text-green-600', label: 'Email', value: user?.email },
                  { icon: 'fa-phone', bg: 'bg-yellow-100 dark:bg-yellow-900/50', ic: 'text-yellow-600', label: 'Phone', value: user?.phoneNumber || '—' },
                  { icon: 'fa-circle-info', bg: 'bg-purple-100 dark:bg-purple-900/50', ic: 'text-purple-600', label: 'About', value: user?.about || '—' },
                  { icon: 'fa-shield', bg: 'bg-red-100 dark:bg-red-900/50', ic: 'text-red-500', label: 'Login Provider', value: String(user?.provider || 'SELF').toLowerCase() },
                ].map(item => (
                  <div key={item.label} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <i className={`fa-solid ${item.icon} ${item.ic} text-sm`}></i>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.label}</p>
                      <p className="font-semibold text-gray-800 dark:text-white text-sm mt-0.5">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'edit' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-5">Edit Profile</h3>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                {[
                  { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                  { name: 'phoneNumber', label: 'Phone Number', type: 'text', placeholder: '10-digit number' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{f.label}</label>
                    <input type={f.type} value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder={f.placeholder} />
                  </div>
                ))}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">About</label>
                  <textarea value={form.about} onChange={e => setForm({ ...form, about: e.target.value })} rows={3}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="Tell something about yourself..." />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl py-3 text-sm transition disabled:opacity-60">
                  {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Saving...</> : <><i className="fa-solid fa-floppy-disk"></i> Save Changes</>}
                </button>
              </form>
            </div>
          )}

          {tab === 'password' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-5">Change Password</h3>
              {user?.provider !== 'SELF' ? (
                <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl text-sm text-yellow-700 dark:text-yellow-400">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  Password change not available for {String(user?.provider).toLowerCase()} accounts.
                </div>
              ) : (
                <form onSubmit={handleChangePassword} className="space-y-4">
                  {[
                    { name: 'currentPassword', label: 'Current Password', placeholder: 'Enter current password' },
                    { name: 'newPassword', label: 'New Password', placeholder: 'Min 8 characters' },
                    { name: 'confirmPassword', label: 'Confirm New Password', placeholder: 'Repeat new password' },
                  ].map(f => (
                    <div key={f.name}>
                      <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{f.label}</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400"><i className="fa-solid fa-lock text-sm"></i></div>
                        <input type="password" value={pwForm[f.name]} onChange={e => setPwForm({ ...pwForm, [f.name]: e.target.value })}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full ps-9 p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          placeholder={f.placeholder} required />
                      </div>
                    </div>
                  ))}
                  <button type="submit" disabled={loading}
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl py-3 text-sm transition disabled:opacity-60">
                    {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Changing...</> : <><i className="fa-solid fa-key"></i> Change Password</>}
                  </button>
                </form>
              )}
            </div>
          )}

          {tab === 'activity' && (
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="font-bold text-gray-800 dark:text-white mb-5">
                <i className="fa-solid fa-clock-rotate-left text-blue-600 mr-2"></i>Recent Activity
              </h3>
              <ActivityFeed activities={activities} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
