import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function OAuthSuccess() {
  const [params] = useSearchParams()
  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = params.get('token')
    const userId = params.get('userId')
    const name = params.get('name')
    const email = params.get('email')
    const profilePic = params.get('profilePic')
    const provider = params.get('provider')
    const emailVerified = params.get('emailVerified') === 'true'

    if (token && email) {
      const user = {
        userId,
        name,
        email,
        profilePic,
        provider,
        emailVerified,
        roleList: ['ROLE_USER']
      }

      login(token, user)  // save token & user to context/localStorage
      navigate('/user/dashboard', { replace: true })
    } else {
      // Something went wrong
      navigate('/login?error=oauth_failed', { replace: true })
    }
  }, [params, login, navigate])  // ✅ include dependencies

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400 font-medium">Signing you in...</p>
      </div>
    </div>
  )
}