import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const services = [
  { icon: 'fa-address-book', color: '#dbeafe', iconColor: '#2563eb', title: 'Contact Management', desc: 'Store, organize, and manage all your contacts with photos, social links, and descriptions.' },
  { icon: 'fa-cloud', color: '#dcfce7', iconColor: '#16a34a', title: 'Cloud Sync', desc: 'Access your contacts from any device, any browser. Always up to date and synced in real time.' },
  { icon: 'fa-lock', color: '#fee2e2', iconColor: '#dc2626', title: 'Secure Backup', desc: 'BCrypt encryption and Spring Security authentication keep your data completely safe.' },
  { icon: 'fa-envelope', color: '#f3e8ff', iconColor: '#9333ea', title: 'Email to Contacts', desc: 'Send emails directly to your saved contacts from within the app — no switching needed.' },
  { icon: 'fa-magnifying-glass', color: '#fef9c3', iconColor: '#ca8a04', title: 'Smart Search', desc: 'Find any contact instantly by name, email, or phone number with powerful filtering.' },
  { icon: 'fa-file-csv', color: '#dcfce7', iconColor: '#16a34a', title: 'Export to CSV', desc: 'Export all your contacts to a CSV file anytime for backup or use in other tools.' },
  { icon: 'fa-brands fa-google', color: '#e0e7ff', iconColor: '#4f46e5', title: 'Google OAuth', desc: 'Sign in quickly and securely using your existing Google account.' },
  { icon: 'fa-brands fa-github', color: '#f1f5f9', iconColor: '#374151', title: 'GitHub OAuth', desc: 'Sign in with your GitHub account — fast, secure, no new passwords needed.' },
  { icon: 'fa-heart', color: '#fee2e2', iconColor: '#dc2626', title: 'Favorites', desc: 'Mark important contacts as favorites for quick and easy access anytime.' },
]

export default function Services() {
  return (
    <>
      <Navbar />
      <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #7c3aed 100%)' }} className="text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-3">Our Services</h1>
        <p style={{ color: '#dbeafe' }} className="max-w-xl mx-auto">Everything you need to manage your contacts smarter and faster.</p>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-6">
          {services.map(s => (
            <div key={s.title} className="card-hover bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: s.color }}>
                <i className={`fa-solid ${s.icon} text-xl`} style={{ color: s.iconColor }}></i>
              </div>
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">{s.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white dark:bg-gray-800 rounded-2xl p-12 border border-gray-100 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Ready to get started?</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">Join thousands of users who trust ConnectSphere to manage their contacts.</p>
          <Link to="/register" className="inline-block bg-blue-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-500 transition shadow-lg">
            Create Free Account
          </Link>
        </div>
      </div>

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
