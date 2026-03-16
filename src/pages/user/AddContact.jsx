import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import UserNavbar from '../../components/UserNavbar'
import { createContact } from '../../api/api'

export default function AddContact() {
  const [form, setForm] = useState({ name: '', email: '', phoneNumber: '', address: '', description: '', websiteLink: '', linkedInLink: '', favorite: false })
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const handleImage = e => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true)
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      if (image) fd.append('contactImage', image)
      await createContact(fd)
      navigate('/user/contacts')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add contact.')
    } finally { setLoading(false) }
  }

  return (
    <div>
      <UserNavbar />
      <Sidebar />
      <div className="sm:pl-64 pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-6 max-w-3xl mx-auto">

          <div className="flex items-center gap-4 mb-6">
            <Link to="/user/contacts" className="w-9 h-9 flex items-center justify-center bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <i className="fa-solid fa-arrow-left text-gray-500 text-sm"></i>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Add New Contact</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">This contact will be stored securely in the cloud.</p>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8">
            {error && <div className="flex items-center gap-2 p-3 mb-5 text-sm text-red-700 bg-red-100 rounded-xl"><i className="fa-solid fa-circle-exclamation"></i>{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Image */}
              <div className="flex items-start gap-5">
                <img src={preview || 'https://ui-avatars.com/api/?name=Contact&background=e0e7ff&color=4f46e5&size=128'}
                  className="w-20 h-20 rounded-xl object-cover border-2 border-gray-200 dark:border-gray-600 flex-shrink-0" alt="preview" />
                <div className="flex-1">
                  <input type="file" accept="image/*" onChange={handleImage}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:text-gray-400 cursor-pointer" />
                  <p className="text-gray-400 text-xs mt-2">PNG, JPG up to 5MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { name: 'name', label: 'Contact Name *', icon: 'fa-regular fa-user', placeholder: 'Full name', type: 'text', required: true },
                  { name: 'email', label: 'Email Address *', icon: 'fa-regular fa-envelope', placeholder: 'email@example.com', type: 'email', required: true },
                  { name: 'phoneNumber', label: 'Phone Number *', icon: 'fa-solid fa-phone', placeholder: '10-digit number', type: 'text', required: true },
                  { name: 'address', label: 'Address', icon: 'fa-solid fa-location-dot', placeholder: 'City, Country', type: 'text', required: false },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{f.label}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400"><i className={`${f.icon} text-sm`}></i></div>
                      <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} required={f.required}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full ps-9 p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder={f.placeholder} />
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3}
                  className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Write something about this contact..." />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { name: 'websiteLink', label: 'Website Link', icon: 'fa-solid fa-earth-americas', placeholder: 'https://yourwebsite.com' },
                  { name: 'linkedInLink', label: 'LinkedIn Profile', icon: 'fa-brands fa-linkedin', placeholder: 'https://linkedin.com/in/username' },
                ].map(f => (
                  <div key={f.name}>
                    <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">{f.label}</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400"><i className={`${f.icon} text-sm`}></i></div>
                      <input type="text" name={f.name} value={form[f.name]} onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full ps-9 p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder={f.placeholder} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-gray-700 rounded-xl">
                <input type="checkbox" id="favorite" name="favorite" checked={form.favorite} onChange={handleChange}
                  className="w-4 h-4 text-red-500 bg-gray-100 border-gray-300 rounded focus:ring-red-500" />
                <label htmlFor="favorite" className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2 cursor-pointer">
                  <i className="fa-solid fa-heart text-red-400"></i> Mark as Favorite Contact
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={loading}
                  className="flex-1 flex items-center justify-center gap-2 text-white bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl text-sm px-6 py-3 transition shadow disabled:opacity-60">
                  {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Adding...</> : <><i className="fa-solid fa-plus"></i> Add Contact</>}
                </button>
                <button type="reset" onClick={() => { setForm({ name: '', email: '', phoneNumber: '', address: '', description: '', websiteLink: '', linkedInLink: '', favorite: false }); setPreview(null) }}
                  className="px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm font-medium transition">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
