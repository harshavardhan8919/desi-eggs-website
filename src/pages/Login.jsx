import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

const colors = {
  cream: '#F9F3E3',
  buttermilk: '#FFF8EC',
  yolk: '#F2C14E',
  sand: '#E8D5A3',
  terracotta: '#C4622D',
  terracottaLight: '#E8854A',
  brown: '#3D2B1F',
  darkBrown: '#2C1A0F',
  sage: '#4A7C59',
  slate: '#708090',
}

export default function Login() {
  const [method, setMethod] = useState('google')
  const [isLogin, setIsLogin] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focused, setFocused] = useState(null)
  const { login, signup, loginWithGoogle } = useAuth()
  const navigate = useNavigate()

  const inputStyle = (name) => ({
    width: '100%',
    background: colors.cream,
    border: `1.5px solid ${focused === name ? colors.terracotta : colors.sand}`,
    borderRadius: '12px',
    padding: '0.85rem 1rem',
    fontSize: '0.95rem',
    color: colors.brown,
    outline: 'none',
    transition: 'border-color 0.2s',
    marginTop: '0.3rem',
  })

  const handleEmailSubmit = async () => {
    setError('')
    if (!form.email || !form.password) {
      setError('Please fill all fields!')
      return
    }
    if (!isLogin && !form.name) {
      setError('Please enter your name!')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters!')
      return
    }
    setLoading(true)
    try {
      if (isLogin) {
        await login(form.email, form.password)
      } else {
        await signup(form.email, form.password, form.name)
      }
      navigate('/')
    } catch (err) {
      if (err.code === 'auth/user-not-found') setError('No account found with this email!')
      else if (err.code === 'auth/wrong-password') setError('Wrong password!')
      else if (err.code === 'auth/email-already-in-use') setError('Email already registered!')
      else if (err.code === 'auth/invalid-email') setError('Invalid email address!')
      else if (err.code === 'auth/invalid-credential') setError('Wrong email or password!')
      else setError('Something went wrong. Please try again!')
    }
    setLoading(false)
  }

  const handleGoogle = async () => {
    setError('')
    setLoading(true)
    try {
      await loginWithGoogle()
      navigate('/')
    } catch (err) {
      setError('Google login failed. Please try again!')
    }
    setLoading(false)
  }

  const methods = [
    { id: 'google', icon: '🔵', label: 'Google' },
    { id: 'email', icon: '📧', label: 'Email' },
  ]

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{ background: colors.cream }}>

      {/* Floating blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${colors.yolk}, transparent)` }} />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${colors.terracotta}, transparent)` }} />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 right-1/4 w-32 h-32 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${colors.sage}, transparent)` }} />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative z-10 w-full max-w-md">

        {/* Logo */}
        <Link to="/">
          <motion.div whileHover={{ scale: 1.04 }} className="text-center mb-8">
            <motion.span
              animate={{ y: [0, -8, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ fontSize: '3.5rem', display: 'inline-block' }}>
              🥚
            </motion.span>
            <p style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.8rem', fontWeight: 800, marginTop: '0.25rem' }}>
              Desi Eggs
            </p>
            <p style={{ color: colors.slate, fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              Premium Farm Fresh
            </p>
          </motion.div>
        </Link>

        {/* Card */}
        <div className="rounded-3xl p-8 border"
          style={{ background: colors.buttermilk, borderColor: colors.sand, boxShadow: `0 24px 60px ${colors.terracotta}15` }}>

          <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.6rem', fontWeight: 700, marginBottom: '0.25rem', textAlign: 'center' }}>
            Welcome! 👋
          </h2>
          <p style={{ color: colors.slate, fontSize: '0.85rem', marginBottom: '1.5rem', textAlign: 'center' }}>
            Login or sign up to manage your orders
          </p>

          {/* Method selector */}
          <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-2xl"
            style={{ background: colors.cream }}>
            {methods.map(m => (
              <motion.button
                key={m.id}
                onClick={() => { setMethod(m.id); setError('') }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="py-3 px-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                style={{
                  background: method === m.id
                    ? `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`
                    : 'transparent',
                  color: method === m.id ? colors.buttermilk : colors.slate,
                  boxShadow: method === m.id ? `0 4px 12px ${colors.terracotta}33` : 'none',
                }}>
                <span style={{ fontSize: '1.1rem' }}>{m.icon}</span>
                {m.label}
              </motion.button>
            ))}
          </div>

          {/* Error */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="rounded-xl p-3 mb-4 text-sm text-center"
                style={{ background: '#FFF0F0', border: '1px solid #FFCCCC', color: colors.terracotta }}>
                ⚠️ {error}
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence mode="wait">

            {/* GOOGLE */}
            {method === 'google' && (
              <motion.div
                key="google"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}>

                <div className="text-center mb-6">
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ fontSize: '3.5rem', marginBottom: '0.75rem' }}>
                    🔵
                  </motion.div>
                  <p style={{ color: colors.brown, fontWeight: 700, fontSize: '1.1rem' }}>
                    Continue with Google
                  </p>
                  <p style={{ color: colors.slate, fontSize: '0.85rem', marginTop: '0.25rem' }}>
                    Quick and secure — no password needed
                  </p>
                </div>

                <motion.button
                  onClick={handleGoogle}
                  disabled={loading}
                  whileHover={{ scale: 1.02, boxShadow: `0 8px 25px rgba(66,133,244,0.25)` }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 border transition-all"
                  style={{ background: colors.cream, borderColor: colors.sand, color: colors.brown, opacity: loading ? 0.7 : 1 }}>
                  <svg width="22" height="22" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  {loading ? '⏳ Please wait...' : 'Continue with Google'}
                </motion.button>

                <div className="mt-5 rounded-2xl p-4 text-center"
                  style={{ background: colors.cream, border: `1px solid ${colors.sand}` }}>
                  <p style={{ color: colors.slate, fontSize: '0.82rem', lineHeight: 1.8 }}>
                    ✅ No password needed<br />
                    ✅ Secure Google login<br />
                    ✅ One tap access
                  </p>
                </div>
              </motion.div>
            )}

            {/* EMAIL */}
            {method === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}>

                {/* Login / Signup toggle */}
                <div className="flex rounded-2xl p-1 mb-5"
                  style={{ background: colors.cream }}>
                  {['Login', 'Sign Up'].map((tab, i) => (
                    <motion.button
                      key={tab}
                      onClick={() => { setIsLogin(i === 0); setError('') }}
                      whileTap={{ scale: 0.97 }}
                      className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
                      style={{
                        background: (isLogin && i === 0) || (!isLogin && i === 1)
                          ? `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`
                          : 'transparent',
                        color: (isLogin && i === 0) || (!isLogin && i === 1)
                          ? colors.buttermilk : colors.slate,
                      }}>
                      {tab}
                    </motion.button>
                  ))}
                </div>

                <div className="flex flex-col gap-4">
                  <AnimatePresence>
                    {!isLogin && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                          Full Name *
                        </label>
                        <input
                          value={form.name}
                          onChange={e => setForm({ ...form, name: e.target.value })}
                          placeholder="Your full name"
                          style={inputStyle('name')}
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com"
                      style={inputStyle('email')}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Password *
                    </label>
                    <input
                      type="password"
                      value={form.password}
                      onChange={e => setForm({ ...form, password: e.target.value })}
                      placeholder={isLogin ? 'Enter password' : 'Min 6 characters'}
                      style={inputStyle('password')}
                      onFocus={() => setFocused('password')}
                      onBlur={() => setFocused(null)}
                      onKeyDown={e => e.key === 'Enter' && handleEmailSubmit()}
                    />
                  </div>
                </div>

                <motion.button
                  onClick={handleEmailSubmit}
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.02, boxShadow: `0 8px 25px ${colors.terracotta}44` }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full mt-5 py-4 rounded-2xl text-lg font-bold tracking-wide transition-all"
                  style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk, opacity: loading ? 0.7 : 1 }}>
                  {loading ? '⏳ Please wait...' : isLogin ? 'Login →' : 'Create Account →'}
                </motion.button>

                {isLogin && (
                  <p className="text-center mt-3" style={{ color: colors.slate, fontSize: '0.8rem' }}>
                    Don't have an account?{' '}
                    <button onClick={() => setIsLogin(false)}
                      style={{ color: colors.terracotta, fontWeight: 700 }}>
                      Sign up
                    </button>
                  </p>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="text-center mt-6" style={{ color: colors.slate, fontSize: '0.8rem' }}>
          By continuing you agree to receive fresh eggs 🥚
        </p>
      </motion.div>
    </div>
  )
}