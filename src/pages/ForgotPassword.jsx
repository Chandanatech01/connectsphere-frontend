import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import api from '../api/api'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const { theme, toggleTheme } = useTheme()

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      await api.post('/users/forgot-password', { email })
      setSent(true)
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.')
    } finally { setLoading(false) }
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

          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <i className="fa-solid fa-envelope-circle-check text-green-500 text-3xl"></i>
              </div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Check your email!</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                If an account exists for <strong>{email}</strong>, we've sent a password reset link.
              </p>
              <Link to="/login" className="text-blue-600 font-semibold hover:underline text-sm">
                ← Back to Login
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white text-center mb-1">Forgot Password?</h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center mb-6">
                Enter your email and we'll send you a reset link.
              </p>

              {error && (
                <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-xl">
                  <i className="fa-solid fa-circle-exclamation"></i>{error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
                      <i className="fa-regular fa-envelope text-sm"></i>
                    </div>
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full ps-9 p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="you@example.com" required />
                  </div>
                </div>
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl text-sm px-6 py-3 transition shadow disabled:opacity-60">
                  {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Sending...</> : <><i className="fa-solid fa-paper-plane"></i> Send Reset Link</>}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-5">
                Remember your password? <Link to="/login" className="text-blue-600 font-semibold hover:underline">Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
