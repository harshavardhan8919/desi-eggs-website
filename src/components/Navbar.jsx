import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const links = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/reviews', label: 'Reviews' },
    { to: '/subscription', label: 'Subscribe' },
  ]

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-50"
      style={{ background: 'rgba(44,26,15,0.97)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #5C3D2E44' }}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to="/">
          <motion.div whileHover={{ scale: 1.04 }} className="flex items-center gap-3">
            <span className="text-3xl">🥚</span>
            <div>
              <p style={{ fontFamily: 'Playfair Display', color: '#F2C14E', fontSize: '1.2rem', fontWeight: 700, lineHeight: 1 }}>
                Desi Eggs
              </p>
              <p style={{ color: '#C4956A', fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase' }}>
                Premium Farm Fresh
              </p>
            </div>
          </motion.div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <Link key={link.to} to={link.to}>
              <motion.span whileHover={{ scale: 1.08 }}
                style={{
                  color: location.pathname === link.to ? '#F2C14E' : '#C4956A',
                  fontWeight: location.pathname === link.to ? 700 : 400,
                  fontSize: '0.9rem', letterSpacing: '0.05em'
                }}>
                {link.label}
              </motion.span>
            </Link>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <Link to="/profile">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm border-2 overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #C4622D, #E8854A)', borderColor: '#F2C14E', color: '#FFF8EC' }}>
                  {user.photoURL
                    ? <img src={user.photoURL} alt="profile" className="w-full h-full object-cover" />
                    : (user.displayName?.[0] || user.email?.[0] || '🥚').toUpperCase()
                  }
                </motion.div>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleLogout}
                style={{ color: '#C4956A', fontSize: '0.85rem', fontWeight: 500 }}>
                Logout
              </motion.button>
            </div>
          ) : (
            <Link to="/login">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: '0 0 20px #F2C14E55' }}
                whileTap={{ scale: 0.97 }}
                style={{ background: 'linear-gradient(135deg, #C4622D, #E8854A)', color: '#FFF8EC', borderRadius: '999px', padding: '0.5rem 1.5rem', fontWeight: 700, fontSize: '0.85rem' }}>
                Login / Sign Up
              </motion.button>
            </Link>
          )}
        </div>

        {/* Mobile button */}
        <button className="md:hidden text-2xl" style={{ color: '#F2C14E' }}
          onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden flex flex-col items-center gap-5 py-6 overflow-hidden"
            style={{ borderTop: '1px solid #5C3D2E44' }}>
            {links.map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                <span style={{ color: '#F2C14E', fontSize: '1rem' }}>{link.label}</span>
              </Link>
            ))}
            {user ? (
              <>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  <span style={{ color: '#F2C14E' }}>My Profile</span>
                </Link>
                <button onClick={() => { handleLogout(); setMenuOpen(false) }}
                  style={{ color: '#C4956A' }}>Logout</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                <button style={{ background: 'linear-gradient(135deg, #C4622D, #E8854A)', color: '#FFF8EC', borderRadius: '999px', padding: '0.5rem 2rem', fontWeight: 700 }}>
                  Login / Sign Up
                </button>
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}