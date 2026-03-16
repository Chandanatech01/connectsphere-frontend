import { useState } from 'react'
import Navbar from '../components/Navbar'

const contactInfo = [
  { icon: 'fa-envelope', bg: 'bg-blue-100 dark:bg-blue-900/50', ic: 'text-blue-600', label: 'Email', value: 'support@connectsphere.com' },
  { icon: 'fa-phone', bg: 'bg-green-100 dark:bg-green-900/50', ic: 'text-green-600', label: 'Phone', value: '+91 98765 43210' },
  { icon: 'fa-location-dot', bg: 'bg-red-100 dark:bg-red-900/50', ic: 'text-red-500', label: 'Location', value: 'Hyderabad, India' },
  { icon: 'fa-clock', bg: 'bg-yellow-100 dark:bg-yellow-900/50', ic: 'text-yellow-600', label: 'Working Hours', value: 'Mon–Fri, 9AM – 6PM IST' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = e => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => { setSent(true); setLoading(false) }, 1000)
  }

  return (
    <>
      <Navbar />

      <section style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #7c3aed 100%)' }} className="text-white py-16 text-center px-6">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p style={{ color: '#dbeafe' }} className="max-w-xl mx-auto">Have a question or feedback? We'd love to hear from you.</p>
      </section>

      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12">

          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Get in Touch</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">We're here to help and answer any questions you might have.</p>

            <div className="space-y-4">
              {contactInfo.map(item => (
                <div key={item.label} className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                  <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <i className={`fa-solid ${item.icon} ${item.ic}`}></i>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{item.label}</p>
                    <p className="text-gray-700 dark:text-white font-semibold mt-0.5">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-blue-50 dark:bg-gray-800 rounded-2xl border border-blue-100 dark:border-gray-700">
              <h3 className="font-bold text-gray-800 dark:text-white mb-2">Quick Links</h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {['Documentation', 'FAQ', 'Privacy Policy', 'Terms of Service'].map(link => (
                  <span key={link} className="bg-white dark:bg-gray-700 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-gray-600 text-sm px-3 py-1.5 rounded-full cursor-pointer hover:bg-blue-50 transition">
                    {link}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Send a Message</h2>

            {sent ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-circle-check text-green-500 text-3xl"></i>
                </div>
                <h3 className="font-bold text-gray-800 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">We'll get back to you within 24 hours.</p>
                <button onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }) }}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-blue-500 transition">
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Your Name</label>
                    <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                      className="w-full p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="John Doe" required />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email Address</label>
                    <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
                      className="w-full p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      placeholder="you@example.com" required />
                  </div>
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                  <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="How can we help?" required />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                  <textarea rows={5} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full p-3 text-sm border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
                    placeholder="Describe your question or feedback in detail..." required />
                </div>
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl px-6 py-3 transition shadow disabled:opacity-60">
                  {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Sending...</> : <><i className="fa-solid fa-paper-plane"></i> Send Message</>}
                </button>
              </form>
            )}
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
