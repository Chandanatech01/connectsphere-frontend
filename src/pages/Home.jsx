import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Navbar'

const features = [
  { icon: 'fa-address-book', bg: 'bg-blue-100 dark:bg-blue-900/50', color: 'text-blue-600', title: 'Easy Management', desc: 'Add, edit, delete and organize contacts in a clean, intuitive interface.' },
  { icon: 'fa-lock', bg: 'bg-green-100 dark:bg-green-900/50', color: 'text-green-600', title: 'Secure Storage', desc: 'Your data is protected with enterprise-grade encryption and security.' },
  { icon: 'fa-globe', bg: 'bg-purple-100 dark:bg-purple-900/50', color: 'text-purple-600', title: 'Cloud Access', desc: 'Access your contacts from any device, anywhere in the world, anytime.' },
  { icon: 'fa-magnifying-glass', bg: 'bg-yellow-100 dark:bg-yellow-900/50', color: 'text-yellow-600', title: 'Smart Search', desc: 'Quickly find contacts by name, email, or phone number instantly.' },
  { icon: 'fa-heart', bg: 'bg-red-100 dark:bg-red-900/50', color: 'text-red-500', title: 'Favorites', desc: 'Mark important contacts as favorites for quick and easy access.' },
  { icon: 'fa-brands fa-google', bg: 'bg-indigo-100 dark:bg-indigo-900/50', color: 'text-indigo-600', title: 'OAuth Login', desc: 'Sign in easily using your Google or GitHub account — no password needed.' },
]

export default function Home() {
  const { isLoggedIn } = useAuth()
  const loggedIn = isLoggedIn()

  return (
    <>
      <Navbar />
      <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #7c3aed 100%)' }}
        className="relative text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 -left-10 w-72 h-72 rounded-full" style={{ background: '#60a5fa', filter: 'blur(80px)', opacity: 0.2 }}></div>
          <div className="absolute -bottom-10 -right-10 w-96 h-96 rounded-full" style={{ background: '#a78bfa', filter: 'blur(80px)', opacity: 0.2 }}></div>
        </div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <span className="inline-block text-sm font-semibold px-4 py-1.5 rounded-full mb-6"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)' }}>
            ✨ Smart Contact Manager 2.0
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Manage Contacts<br /><span style={{ color: '#bfdbfe' }}>Like Never Before</span>
          </h1>
          <p className="text-lg md:text-xl mb-10 max-w-2xl mx-auto" style={{ color: '#dbeafe' }}>
            Store, organize, and access all your contacts securely in the cloud.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {loggedIn ? (
              <>
                <Link to="/user/dashboard" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition shadow-lg">
                  Go to Dashboard →
                </Link>
                <Link to="/user/contacts" className="border-2 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
                  My Contacts
                </Link>
              </>
            ) : (
              <>
                <Link to="/register" className="bg-white text-blue-700 font-semibold px-8 py-3 rounded-full hover:bg-blue-50 transition shadow-lg">Get Started Free</Link>
                <Link to="/login" className="border-2 text-white font-semibold px-8 py-3 rounded-full hover:bg-white/10 transition" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>Login</Link>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Everything You Need</h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">A powerful set of features to make contact management effortless.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(f => (
              <div key={f.title} className="card-hover bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl border border-gray-100 dark:border-gray-700">
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-5`}>
                  <i className={`fa-solid ${f.icon} ${f.color} text-xl`}></i>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 text-white" style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)' }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[['1000+', 'Contacts Managed'], ['500+', 'Active Users'], ['99.9%', 'Uptime']].map(([v, l]) => (
              <div key={l}><h2 className="text-4xl font-bold mb-2">{v}</h2><p style={{ color: '#bfdbfe' }}>{l}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-14">What Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { text: '"ConnectSphere has completely changed how I manage my contacts. Fast, secure, and incredibly easy to use!"', author: '— Rahul Sharma' },
              { text: '"A fantastic app! Love the OAuth login and cloud sync. My contacts are always up to date."', author: '— Priya Mehta' },
            ].map(t => (
              <div key={t.author} className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex text-yellow-400 text-sm mb-4">★★★★★</div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-4">{t.text}</p>
                <p className="font-semibold text-gray-800 dark:text-white">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white dark:bg-gray-800 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">Ready to Get Started?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-xl mx-auto">Join thousands of users who trust ConnectSphere.</p>
          <Link to={loggedIn ? "/user/dashboard" : "/register"}
            className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-500 transition shadow-lg">
            {loggedIn ? 'Go to Dashboard →' : 'Create Free Account'}
          </Link>
        </div>
      </section>

      <footer className="bg-gray-900 text-gray-400 py-10 text-center">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-address-book text-white text-xs"></i>
            </div>
            <span className="text-white font-semibold">ConnectSphere</span>
          </div>
          <p className="text-sm">© 2025 ConnectSphere. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}
