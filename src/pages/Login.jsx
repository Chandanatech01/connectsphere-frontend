import { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { loginUser } from '../api/api'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login, isLoggedIn } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [params] = useSearchParams()

  useEffect(() => {
    if (isLoggedIn()) navigate('/user/dashboard')
  }, [])

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const res = await loginUser(form)
      login(res.data.token, res.data.user)
      navigate('/user/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid email or password.')
    } finally { setLoading(false) }
  }

  if (isLoggedIn()) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
        <div className="text-center bg-white dark:bg-gray-800 p-10 rounded-2xl shadow border border-gray-100 dark:border-gray-700">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-circle-check text-green-500 text-3xl"></i>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Already Logged In!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mb-5">You are already signed in to ConnectSphere.</p>
          <Link to="/user/dashboard" className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl text-sm transition">
            Go to Dashboard →
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
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

          <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-1">Welcome back</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6">Sign in to your account to continue</p>

          {params.get('verified') === 'true' && (
            <div className="flex items-center gap-2 p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-xl">
              <i className="fa-solid fa-circle-check"></i> Email verified! You can now login.
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-xl dark:bg-red-900/30 dark:text-red-400">
              <i className="fa-solid fa-circle-exclamation"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400"><i className="fa-regular fa-envelope text-sm"></i></div>
                <input type="email" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full ps-9 p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400"><i className="fa-solid fa-lock text-sm"></i></div>
                <input type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full ps-9 p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Your password" required />
              </div>
            </div>
            <button type="submit" disabled={loading}
              className="w-full flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl text-sm px-6 py-3 transition shadow disabled:opacity-60">
              {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Signing in...</> : 'Sign In'}
            </button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <hr className="flex-1 border-gray-200 dark:border-gray-600" />
            <span className="text-gray-400 text-xs">or continue with</span>
            <hr className="flex-1 border-gray-200 dark:border-gray-600" />
          </div>

          <div className="flex gap-3">
            <a href="https://connectsphere-backend-vopj.onrender.com/oauth2/authorization/google"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-xl text-sm px-4 py-2.5 transition">
              <svg width="16" height="16" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
              Google
            </a>
            <a href="https://connectsphere-backend-vopj.onrender.com/oauth2/authorization/github"
              className="flex-1 flex items-center justify-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-xl text-sm px-4 py-2.5 transition">
              <i className="fa-brands fa-github"></i> GitHub
            </a>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
            <Link to="/forgot-password" className="text-gray-500 hover:text-blue-600 dark:text-gray-400 text-sm">Forgot password?</Link>
            <br />
            Don't have an account? <Link to="/register" className="text-blue-600 font-semibold hover:underline">Sign up free</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
