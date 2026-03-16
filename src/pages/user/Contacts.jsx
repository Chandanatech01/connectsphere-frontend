import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import UserNavbar from '../../components/UserNavbar'
import { getContacts, deleteContact } from '../../api/api'

function ContactModal({ contact, onClose, onEmail }) {
  if (!contact) return null
  const avatar = contact.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(contact.name)}&background=e0e7ff&color=4f46e5`
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="h-20 relative" style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb, #7c3aed)' }}>
          <button onClick={onClose} className="absolute top-3 right-3 text-white/80 hover:text-white bg-white/20 rounded-lg p-1.5 transition">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="flex flex-col items-center -mt-10 pb-2 px-6">
          <img src={avatar} onError={e => e.target.src = `https://ui-avatars.com/api/?name=C&background=e0e7ff&color=4f46e5`}
            className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-gray-800 shadow-lg" alt="" />
          <h3 className="mt-3 text-xl font-bold text-gray-800 dark:text-white">{contact.name}</h3>
          <p className="text-gray-400 text-sm">{contact.email}</p>
        </div>
        <div className="px-6 pb-4 mt-2 space-y-2">
          {[
            { icon: 'fa-phone', bg: 'bg-green-50', ic: 'text-green-500', label: 'Phone', val: contact.phoneNumber },
            { icon: 'fa-location-dot', bg: 'bg-red-50', ic: 'text-red-500', label: 'Address', val: contact.address },
            { icon: 'fa-circle-info', bg: 'bg-blue-50', ic: 'text-blue-500', label: 'About', val: contact.description },
            { icon: 'fa-heart', bg: 'bg-red-50', ic: 'text-red-500', label: 'Favorite', val: contact.favorite ? '❤️ Yes' : 'No' },
          ].map(d => (
            <div key={d.label} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className={`w-8 h-8 ${d.bg} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <i className={`fa-solid ${d.icon} ${d.ic} text-sm`}></i>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{d.label}</p>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{d.val || '—'}</p>
              </div>
            </div>
          ))}
          <div className="flex gap-3 pt-1">
            <a href={contact.websiteLink ? (contact.websiteLink.startsWith('http') ? contact.websiteLink : 'https://' + contact.websiteLink) : '#'} target="_blank" rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 transition ${!contact.websiteLink ? 'opacity-40 pointer-events-none' : ''}`}>
              <i className="fa-solid fa-earth-americas text-blue-500"></i> Website
            </a>
            <a href={contact.linkedInLink ? (contact.linkedInLink.startsWith('http') ? contact.linkedInLink : 'https://' + contact.linkedInLink) : '#'} target="_blank" rel="noreferrer"
              className={`flex-1 flex items-center justify-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl text-sm text-gray-600 dark:text-gray-300 hover:bg-blue-50 transition ${!contact.linkedInLink ? 'opacity-40 pointer-events-none' : ''}`}>
              <i className="fa-brands fa-linkedin text-blue-600"></i> LinkedIn
            </a>
          </div>
        </div>
        <div className="flex justify-between px-6 pb-5 gap-3">
          <button onClick={() => onEmail(contact)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm px-4 py-2.5 transition">
            <i className="fa-solid fa-envelope"></i> Send Email
          </button>
          <button onClick={onClose} className="px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 rounded-xl transition">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

function EmailModal({ contact, onClose }) {
  const [form, setForm] = useState({ subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSend = async e => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/contacts/${contact.id}/send-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ subject: form.subject, message: form.message })
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
    } catch {
      setError('Failed to send email. Please try again.')
    } finally { setLoading(false) }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-white">Send Email</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">To: {contact.name} ({contact.email})</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-white">
            <i className="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-circle-check text-green-500 text-3xl"></i>
            </div>
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Email Sent!</h3>
            <p className="text-gray-500 text-sm mb-4">Your email was sent to {contact.email}</p>
            <button onClick={onClose} className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:bg-blue-500 transition">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSend} className="space-y-4">
            {error && <div className="flex items-center gap-2 p-3 text-sm text-red-700 bg-red-100 rounded-xl"><i className="fa-solid fa-circle-exclamation"></i>{error}</div>}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
              <input type="text" value={form.subject} onChange={e => setForm({ ...form, subject: e.target.value })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Email subject" required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
              <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Write your message here..." required />
            </div>
            <div className="flex gap-3">
              <button type="submit" disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl text-sm py-3 transition disabled:opacity-60">
                {loading ? <><i className="fa-solid fa-spinner fa-spin"></i> Sending...</> : <><i className="fa-solid fa-paper-plane"></i> Send Email</>}
              </button>
              <button type="button" onClick={onClose} className="px-5 py-3 border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-xl text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

function exportToCSV(contacts) {
  const headers = ['Name', 'Email', 'Phone', 'Address', 'Description', 'Website', 'LinkedIn', 'Favorite']
  const rows = contacts.map(c => [
    c.name || '', c.email || '', c.phoneNumber || '', c.address || '',
    c.description || '', c.websiteLink || '', c.linkedInLink || '',
    c.favorite ? 'Yes' : 'No'
  ])
  const csv = [headers, ...rows].map(row => row.map(v => `"${String(v).replace(/"/g, '""')}"`).join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `contacts_${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

export default function Contacts() {
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)
  const [selected, setSelected] = useState(null)
  const [emailContact, setEmailContact] = useState(null)
  const [exportLoading, setExportLoading] = useState(false)

  const load = async (p = 0) => {
    setLoading(true)
    try {
      const res = await getContacts(p, 10)
      setContacts(res.data.content || [])
      setTotalPages(res.data.totalPages || 0)
      setTotalElements(res.data.totalElements || 0)
      setPage(p)
    } catch { } finally { setLoading(false) }
  }

  useEffect(() => { load(0) }, [])

  const handleDelete = async id => {
    if (!window.confirm('Delete this contact? This cannot be undone.')) return
    try { await deleteContact(id); load(page) } catch { alert('Failed to delete.') }
  }

  const handleExport = async () => {
    setExportLoading(true)
    try {
      const res = await getContacts(0, 1000)
      exportToCSV(res.data.content || [])
    } catch { alert('Failed to export.') }
    finally { setExportLoading(false) }
  }

  const avatar = c => c.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=e0e7ff&color=4f46e5`

  return (
    <div>
      <UserNavbar />
      <Sidebar />
      <div className="sm:pl-64 pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-6 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">My Contacts</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{totalElements} contact{totalElements !== 1 ? 's' : ''} total</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <button onClick={handleExport} disabled={exportLoading || totalElements === 0}
                className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-xl text-sm px-4 py-2.5 transition disabled:opacity-50">
                {exportLoading ? <><i className="fa-solid fa-spinner fa-spin"></i> Exporting...</> : <><i className="fa-solid fa-file-csv text-green-600"></i> Export CSV</>}
              </button>
              <Link to="/user/contacts/add" className="flex items-center gap-2 text-white bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl text-sm px-5 py-2.5 transition shadow">
                <i className="fa-solid fa-plus"></i> Add Contact
              </Link>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-address-book text-gray-400 text-3xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">No contacts yet</h3>
                <p className="text-gray-400 text-sm mb-4">Start by adding your first contact.</p>
                <Link to="/user/contacts/add" className="text-white bg-blue-600 hover:bg-blue-500 font-medium rounded-xl text-sm px-5 py-2.5 transition">Add Contact</Link>
              </div>
            ) : (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-600 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4">Links</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {contacts.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={avatar(c)} onError={e => e.target.src = `https://ui-avatars.com/api/?name=C&background=e0e7ff&color=4f46e5`}
                            className="w-10 h-10 rounded-full object-cover flex-shrink-0" alt="" />
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{c.name} {c.favorite && <i className="fa-solid fa-heart text-red-400 text-xs ml-1"></i>}</p>
                            <p className="text-gray-400 text-xs">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{c.phoneNumber || '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {c.websiteLink && <a href={c.websiteLink.startsWith('http') ? c.websiteLink : 'https://' + c.websiteLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:text-blue-700"><i className="fa-solid fa-link"></i></a>}
                          {c.linkedInLink && <a href={c.linkedInLink.startsWith('http') ? c.linkedInLink : 'https://' + c.linkedInLink} target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-800"><i className="fa-brands fa-linkedin"></i></a>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button onClick={() => setSelected(c)} className="w-8 h-8 bg-blue-50 dark:bg-gray-700 hover:bg-blue-100 rounded-lg flex items-center justify-center transition" title="View">
                            <i className="fa-solid fa-eye text-blue-500 text-xs"></i>
                          </button>
                          <button onClick={() => setEmailContact(c)} className="w-8 h-8 bg-purple-50 dark:bg-gray-700 hover:bg-purple-100 rounded-lg flex items-center justify-center transition" title="Send Email">
                            <i className="fa-solid fa-envelope text-purple-500 text-xs"></i>
                          </button>
                          <Link to={`/user/contacts/edit/${c.id}`} className="w-8 h-8 bg-green-50 dark:bg-gray-700 hover:bg-green-100 rounded-lg flex items-center justify-center transition" title="Edit">
                            <i className="fa-solid fa-pen text-green-500 text-xs"></i>
                          </Link>
                          <button onClick={() => handleDelete(c.id)} className="w-8 h-8 bg-red-50 dark:bg-gray-700 hover:bg-red-100 rounded-lg flex items-center justify-center transition" title="Delete">
                            <i className="fa-solid fa-trash text-red-500 text-xs"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm text-gray-500 dark:text-gray-400">Page {page + 1} of {totalPages}</p>
                <nav className="flex items-center gap-1">
                  <button disabled={page === 0} onClick={() => load(page - 1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 text-gray-600 dark:text-gray-300 disabled:opacity-40">
                    <i className="fa-solid fa-chevron-left text-xs"></i>
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button key={i} onClick={() => load(i)} className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${i === page ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-100'}`}>{i + 1}</button>
                  ))}
                  <button disabled={page >= totalPages - 1} onClick={() => load(page + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-blue-100 text-gray-600 dark:text-gray-300 disabled:opacity-40">
                    <i className="fa-solid fa-chevron-right text-xs"></i>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
      {selected && <ContactModal contact={selected} onClose={() => setSelected(null)} onEmail={c => { setSelected(null); setEmailContact(c) }} />}
      {emailContact && <EmailModal contact={emailContact} onClose={() => setEmailContact(null)} />}
    </div>
  )
}
