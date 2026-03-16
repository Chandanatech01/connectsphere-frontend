import axios from 'axios'

// Locally = http://localhost:8081 (via vite proxy)
// On Vercel = https://your-render-app.onrender.com
const BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

const api = axios.create({ baseURL: BASE_URL })

api.interceptors.request.use(config => {
  const t = localStorage.getItem('token')
  if (t) config.headers.Authorization = `Bearer ${t}`
  return config
})

api.interceptors.response.use(
  r => r,
  e => {
    if (e.response?.status === 401) {
      localStorage.clear()
      window.location.href = '/login'
    }
    return Promise.reject(e)
  }
)

// Auth
export const loginUser = d => api.post('/auth/login', d)
export const registerUser = d => api.post('/auth/register', d)

// User
export const getProfile = () => api.get('/users/profile')

// Contacts
export const getContacts = (page = 0, size = 10) => api.get(`/contacts?page=${page}&size=${size}`)
export const getContact = id => api.get(`/contacts/${id}`)
export const createContact = d => api.post('/contacts', d, { headers: { 'Content-Type': 'multipart/form-data' } })
export const updateContact = (id, d) => api.put(`/contacts/${id}`, d, { headers: { 'Content-Type': 'multipart/form-data' } })
export const deleteContact = id => api.delete(`/contacts/${id}`)
export const searchContacts = (field, value, page = 0, size = 10) =>
  api.get(`/contacts/search?field=${field}&value=${value}&page=${page}&size=${size}`)

export default api
