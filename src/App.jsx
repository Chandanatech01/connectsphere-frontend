import { HashRouter as BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './components/ProtectedRoute'

// Public pages
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import OAuthSuccess from './pages/OAuthSuccess'

// User pages
import Dashboard from './pages/user/Dashboard'
import Contacts from './pages/user/Contacts'
import AddContact from './pages/user/AddContact'
import EditContact from './pages/user/EditContact'
import Search from './pages/user/Search'
import Profile from './pages/user/Profile'

// Admin pages
import AdminDashboard from './pages/admin/AdminDashboard'

function AdminRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  const isAdmin = user?.roleList?.includes('ROLE_ADMIN')
  if (!isAdmin) return <Navigate to="/user/dashboard" replace />
  return children
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/oauth-success" element={<OAuthSuccess />} />

            {/* Protected User */}
            <Route path="/user/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/user/contacts" element={<ProtectedRoute><Contacts /></ProtectedRoute>} />
            <Route path="/user/contacts/add" element={<ProtectedRoute><AddContact /></ProtectedRoute>} />
            <Route path="/user/contacts/edit/:id" element={<ProtectedRoute><EditContact /></ProtectedRoute>} />
            <Route path="/user/contacts/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
            <Route path="/user/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

            {/* Admin */}
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminRoute><AdminDashboard /></AdminRoute></ProtectedRoute>} />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
