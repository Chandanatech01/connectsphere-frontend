import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { registerUser } from '../api/api'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', phoneNumber: '', about: '' })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const { theme, toggleTheme, isLoggedIn } = useTheme()
  const { isLoggedIn: checkLogin } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (checkLogin()) navigate('/user/dashboard')
  }, [])

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setSuccess(''); setLoading(true)
    try {
      await registerUser(form)
      setSuccess('Account created! Please check your email to verify your account.')
      setTimeout(() => navigate('/login'), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally { setLoading(false) }
  }

  if (checkLogin()) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-2xl shadow border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-circle-check text-green-500 text-3xl"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Already Logged In!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">You already have an account and are signed in.</p>
          <Link to="/user/dashboard" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition">
            Go to Dashboard →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="fixed top-4 right-4">
        <button onClick={toggleTheme} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-white">
          <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
      </div>

      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">

          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl scm-gradient flex items-center justify-center shadow">
              <i className="fa-solid fa-address-book text-white"></i>
            </div>
            <span className="text-xl font-bold text-gray-800 dark:text-white">ConnectSphere</span>
          </div>

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-1">Create account</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6">Start managing your contacts for free</p>

          {error && <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-xl"><i className="fa-solid fa-circle-exclamation"></i>{error}</div>}
          {success && <div className="flex items-center gap-2 p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-xl"><i className="fa-solid fa-circle-check"></i>{success}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { name: 'name', label: 'Full Name', type: 'text', icon: 'fa-regular fa-user', placeholder: 'John Doe' },
              { name: 'email', label: 'Email Address', type: 'email', icon: 'fa-regular fa-envelope', placeholder: 'you@example.com' },
              { name: 'password', label: 'Password', type: 'password', icon: 'fa-solid fa-lock', placeholder: 'Min 8 chars, uppercase, number, special' },
              { name: 'phoneNumber', label: 'Phone Number', type: 'text', icon: 'fa-solid fa-phone', placeholder: '10-digit number' },
            ].map(f => (
              <div key={f.name}>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{f.label}</label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400"><i className={`${f.icon} text-sm`}></i></div>
                  <input type={f.type} value={form[f.name]} onChange={e => setForm({ ...form, [f.name]: e.target.value })}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full ps-9 p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder={f.placeholder} required />
                </div>
              </div>
            ))}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">About <span className="text-gray-400 font-normal">(optional)</span></label>
              <textarea value={form.about} onChange={e => setForm({ ...form, about: e.target.value })} rows={2}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Tell something about yourself..." />
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl text-sm px-6 py-3 transition shadow disabled:opacity-60 mt-2">
              {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Creating...</> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            Already have an account? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
