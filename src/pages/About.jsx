import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <>
      <Navbar />
      <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #7c3aed 100%)' }} className="text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-3">About ConnectSphere</h1>
        <p style={{ color: '#dbeafe' }} className="max-w-xl mx-auto">A modern, secure, and smart contact manager built for everyone.</p>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">What is ConnectSphere?</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              ConnectSphere (SCM 2.0) helps you organize and manage your professional and personal contacts securely in one place — accessible from anywhere, anytime.
            </p>
            <p className="text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
              Built with Spring Boot, React, MySQL, and Cloudinary for image storage.
            </p>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              Our goal is to simplify contact management and make it fast, secure and accessible for everyone.
            </p>
            <div className="mt-6">
              <Link to="/register" className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-500 transition shadow">
                Get Started Free
              </Link>
            </div>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600"
              className="rounded-2xl shadow-lg w-full object-cover" alt="About ConnectSphere" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            { val: '1000+', label: 'Contacts Managed', color: '#2563eb' },
            { val: '500+', label: 'Active Users', color: '#16a34a' },
            { val: '99.9%', label: 'Secure & Reliable', color: '#9333ea' },
          ].map(item => (
            <div key={item.label} className="card-hover bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-sm border border-gray-100 dark:border-gray-700">
              <h2 className="text-4xl font-bold mb-2" style={{ color: item.color }}>{item.val}</h2>
              <p className="text-gray-500 dark:text-gray-400">{item.label}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Built With</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Spring Boot', 'React', 'MySQL', 'Tailwind CSS', 'Cloudinary', 'Spring Security', 'OAuth2', 'JWT', 'Vite'].map(tech => (
              <span key={tech} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-600">
                {tech}
              </span>
            ))}
          </div>
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
