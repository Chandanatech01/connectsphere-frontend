import { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import UserNavbar from '../../components/UserNavbar'
import { searchContacts, deleteContact } from '../../api/api'

export default function Search() {
  const [field, setField] = useState('name')
  const [value, setValue] = useState('')
  const [contacts, setContacts] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [totalElements, setTotalElements] = useState(0)

  const handleSearch = async (p = 0) => {
    if (!value.trim()) return
    setLoading(true); setSearched(true)
    try {
      const res = await searchContacts(field, value, p)
      setContacts(res.data.content || [])
      setTotalPages(res.data.totalPages || 0)
      setTotalElements(res.data.totalElements || 0)
      setPage(p)
    } catch { } finally { setLoading(false) }
  }

  const handleDelete = async id => {
    if (!window.confirm('Delete this contact?')) return
    try { await deleteContact(id); handleSearch(page) } catch { alert('Failed.') }
  }

  const avatar = c => c.picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(c.name)}&background=e0e7ff&color=4f46e5`

  return (
    <div>
      <UserNavbar />
      <Sidebar />
      <div className="sm:pl-64 pt-20 min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="p-6 max-w-7xl mx-auto">

          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Search Contacts</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{searched ? `${totalElements} result(s) found` : 'Search by name, email, or phone'}</p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 p-4 mb-6">
            <div className="flex flex-wrap items-center gap-3">
              <select value={field} onChange={e => setField(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-xl focus:ring-2 focus:ring-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value="name">Name</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
              <div className="relative flex-1 min-w-[200px]">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <i className="fa-solid fa-magnifying-glass text-gray-400 text-sm"></i>
                </div>
                <input type="text" value={value} onChange={e => setValue(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSearch(0)}
                  className="block p-2.5 ps-9 w-full text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Type to search..." />
              </div>
              <button onClick={() => handleSearch(0)} disabled={loading}
                className="bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl text-sm px-5 py-2.5 transition">
                {loading ? <i className="fa-solid fa-spinner fa-spin"></i> : 'Search'}
              </button>
              <button onClick={() => { setValue(''); setContacts([]); setSearched(false) }}
                className="border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-medium rounded-xl text-sm px-5 py-2.5 transition">
                Clear
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
            {loading ? (
              <div className="flex justify-center py-20"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div></div>
            ) : !searched ? (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <i className="fa-solid fa-magnifying-glass text-gray-400 text-2xl"></i>
                </div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">Search your contacts</h3>
                <p className="text-gray-400 text-sm">Enter a name, email, or phone number above.</p>
              </div>
            ) : contacts.length === 0 ? (
              <div className="text-center py-20">
                <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-2">No results found</h3>
                <p className="text-gray-400 text-sm">Try a different search term.</p>
              </div>
            ) : (
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-600 uppercase bg-gray-50 dark:bg-gray-700 border-b dark:border-gray-600">
                  <tr>
                    <th className="px-6 py-4">Contact</th>
                    <th className="px-6 py-4">Phone</th>
                    <th className="px-6 py-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {contacts.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img src={avatar(c)} onError={e => e.target.src = `https://ui-avatars.com/api/?name=C&background=e0e7ff&color=4f46e5`}
                            className="w-10 h-10 rounded-full object-cover" alt="" />
                          <div>
                            <p className="font-semibold text-gray-800 dark:text-white">{c.name} {c.favorite && <i className="fa-solid fa-heart text-red-400 text-xs"></i>}</p>
                            <p className="text-gray-400 text-xs">{c.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{c.phoneNumber || '—'}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Link to={`/user/contacts/edit/${c.id}`} className="w-8 h-8 bg-green-50 dark:bg-gray-700 hover:bg-green-100 rounded-lg flex items-center justify-center transition">
                            <i className="fa-solid fa-pen text-green-500 text-xs"></i>
                          </Link>
                          <button onClick={() => handleDelete(c.id)} className="w-8 h-8 bg-red-50 dark:bg-gray-700 hover:bg-red-100 rounded-lg flex items-center justify-center transition">
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
              <div className="flex justify-center px-6 py-4 border-t border-gray-100 dark:border-gray-700 gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button key={i} onClick={() => handleSearch(i)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm ${i === page ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 hover:bg-blue-100'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
