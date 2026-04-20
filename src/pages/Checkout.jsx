import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WhatsAppButton from '../components/WhatsAppButton'

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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: 'easeOut' }
  })
}

const float = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
  }
}

export default function Checkout() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const cart = state?.cart || []
  const total = state?.total || 0

  const [form, setForm] = useState({
    name: '', phone: '', address: '', pincode: '', landmark: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      alert('Please fill all required fields!')
      return
    }
    if (form.phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number!')
      return
    }
    setSubmitted(true)
  }

  const handleConfirm = () => {
    navigate('/order-confirmed', { state: { form, cart, total } })
  }

  const inputStyle = (name) => ({
    width: '100%',
    background: colors.cream,
    border: `1.5px solid ${focused === name ? colors.terracotta : colors.sand}`,
    borderRadius: '12px',
    padding: '0.85rem 1rem',
    fontSize: '1rem',
    color: colors.brown,
    outline: 'none',
    transition: 'border-color 0.2s',
    marginTop: '0.3rem',
  })

  return (
    <div className="min-h-screen pb-16" style={{ background: colors.cream }}>

      {/* Floating background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${colors.yolk}, transparent)` }}
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-40 left-10 w-48 h-48 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${colors.terracotta}, transparent)` }}
        />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${colors.sage}, transparent)`, transform: 'translate(-50%, -50%)' }}
        />
      </div>

      {/* Header */}
      <div className="relative overflow-hidden text-center py-16 px-6"
        style={{ background: `linear-gradient(160deg, ${colors.darkBrown} 0%, #3D2B1F 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${colors.yolk}15 0%, transparent 60%)` }} />

        {/* Floating egg emojis */}
        <motion.span className="absolute top-6 left-12 text-4xl opacity-20"
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🥚</motion.span>
        <motion.span className="absolute bottom-6 right-16 text-3xl opacity-20"
          animate={{ y: [0, 10, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>🥚</motion.span>
        <motion.span className="absolute top-8 right-24 text-2xl opacity-15"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}>✨</motion.span>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ color: colors.yolk, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
          Almost There
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'Playfair Display', color: colors.buttermilk, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800 }}>
          Checkout 🛒
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ color: '#C4956A', marginTop: '0.5rem' }}>
          Fill your details and pay via PhonePe
        </motion.p>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: 'block', height: '50px', width: '100%' }}>
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill={colors.cream} />
          </svg>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-10">

        {/* Order Summary */}
        <motion.div
          initial="hidden" animate="visible" variants={fadeUp} custom={0}
          className="rounded-3xl p-6 border mb-6"
          style={{ background: colors.buttermilk, borderColor: colors.sand, boxShadow: `0 8px 32px ${colors.terracotta}10` }}>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `${colors.terracotta}18` }}>📦</div>
            <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.4rem', fontWeight: 700 }}>
              Order Summary
            </h2>
          </div>

          <div style={{ borderTop: `1px solid ${colors.sand}` }}>
            {cart.map(item => (
              <motion.div
                key={`${item.id}-${item.size}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex justify-between items-center py-3"
                style={{ borderBottom: `1px solid ${colors.sand}` }}>
                <div>
                  <p style={{ color: colors.brown, fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</p>
                  <p style={{ color: colors.slate, fontSize: '0.8rem' }}>{item.size} eggs × {item.qty}</p>
                </div>
                <span style={{ color: colors.terracotta, fontWeight: 700 }}>
                  ₹{item.pricePerEgg * item.size * item.qty}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-4">
            <span style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.2rem', fontWeight: 700 }}>Total</span>
            <span style={{ fontFamily: 'Playfair Display', color: colors.terracotta, fontSize: '1.5rem', fontWeight: 800 }}>₹{total}</span>
          </div>
          <p style={{ color: colors.sage, fontSize: '0.8rem', marginTop: '0.5rem' }}>✅ Free delivery included</p>
        </motion.div>

        {/* Delivery Form */}
        <motion.div
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
          className="rounded-3xl p-6 border mb-6"
          style={{ background: colors.buttermilk, borderColor: colors.sand, boxShadow: `0 8px 32px ${colors.terracotta}10` }}>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
              style={{ background: `${colors.sage}18` }}>📍</div>
            <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.4rem', fontWeight: 700 }}>
              Delivery Details
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {/* Name */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Full Name *
              </label>
              <input
                name="name" value={form.name} onChange={handleChange}
                placeholder="Enter your full name"
                style={inputStyle('name')}
                onFocus={() => setFocused('name')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Phone */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Phone Number *
              </label>
              <input
                name="phone" value={form.phone} onChange={handleChange}
                placeholder="10-digit mobile number"
                maxLength={10} type="tel"
                style={inputStyle('phone')}
                onFocus={() => setFocused('phone')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Address */}
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Full Address *
              </label>
              <textarea
                name="address" value={form.address} onChange={handleChange}
                placeholder="House no, Street, Area, City"
                rows={3}
                style={{ ...inputStyle('address'), resize: 'none' }}
                onFocus={() => setFocused('address')}
                onBlur={() => setFocused(null)}
              />
            </div>

            {/* Pincode + Landmark */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Pincode *
                </label>
                <input
                  name="pincode" value={form.pincode} onChange={handleChange}
                  placeholder="6-digit pincode"
                  maxLength={6} type="tel"
                  style={inputStyle('pincode')}
                  onFocus={() => setFocused('pincode')}
                  onBlur={() => setFocused(null)}
                />
              </div>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Landmark
                </label>
                <input
                  name="landmark" value={form.landmark} onChange={handleChange}
                  placeholder="Near temple, etc."
                  style={inputStyle('landmark')}
                  onFocus={() => setFocused('landmark')}
                  onBlur={() => setFocused(null)}
                />
              </div>
            </div>
          </div>

          <AnimatePresence>
            {!submitted ? (
              <motion.button
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={handleSubmit}
                whileHover={{ scale: 1.02, boxShadow: `0 8px 25px ${colors.terracotta}44` }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-6 py-4 rounded-2xl text-lg font-bold tracking-wide transition-all"
                style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk }}>
                Continue to Payment →
              </motion.button>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-5 rounded-2xl p-3 text-center"
                style={{ background: '#F0FFF4', border: `1px solid ${colors.sage}44` }}>
                <p style={{ color: colors.sage, fontWeight: 700 }}>✅ Details saved! Now pay below.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Payment Section */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="rounded-3xl p-6 border text-center"
              style={{ background: colors.buttermilk, borderColor: colors.sand, boxShadow: `0 8px 32px ${colors.terracotta}15` }}>

              <div className="flex items-center justify-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${colors.yolk}22` }}>💳</div>
                <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.4rem', fontWeight: 700 }}>
                  Pay via PhonePe
                </h2>
              </div>

              <p style={{ color: colors.slate, fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                Scan QR or pay directly to UPI ID
              </p>

              <motion.p
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                style={{ fontFamily: 'Playfair Display', color: colors.terracotta, fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                Amount: ₹{total}
              </motion.p>

              {/* QR Code with floating animation */}
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block mb-4">
                <div className="rounded-2xl p-4 inline-block"
                  style={{ border: `3px solid ${colors.sand}`, background: '#fff', boxShadow: `0 8px 24px ${colors.terracotta}18` }}>
                  <img
                    src="/phonepe-qr.jpeg"
                    alt="PhonePe QR Code"
                    style={{ width: '200px', height: '200px', objectFit: 'contain', borderRadius: '12px' }}
                  />
                </div>
              </motion.div>

              <p style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.25rem' }}>
                ANNABATHINA HARSHAVARDHAN
              </p>
              <p style={{ color: colors.slate, fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                Or pay directly to UPI ID:
              </p>
              <div className="inline-block px-6 py-3 rounded-2xl mb-6"
                style={{ background: colors.cream, border: `1.5px solid ${colors.sand}` }}>
                <p style={{ color: colors.terracotta, fontWeight: 800, fontSize: '1.1rem', letterSpacing: '0.05em' }}>
                  8919349833-4@ibl
                </p>
              </div>

              {/* Warning */}
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="rounded-2xl p-4 mb-5 text-sm"
                style={{ background: `${colors.yolk}18`, border: `1px solid ${colors.yolk}44`, color: colors.brown }}>
                ⚠️ After paying, click confirm below. We'll verify and process your order within minutes.
              </motion.div>

              {/* WhatsApp Button */}
              <div className="mb-4">
                <p style={{ color: colors.slate, fontSize: '0.85rem', marginBottom: '0.75rem' }}>
                  Or send your order directly via WhatsApp:
                </p>
                <WhatsAppButton cart={cart} total={total} />
              </div>

              {/* Confirm Button */}
              <motion.button
                onClick={handleConfirm}
                whileHover={{ scale: 1.02, boxShadow: `0 10px 30px ${colors.sage}55` }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-2xl text-lg font-bold tracking-wide mt-2 transition-all"
                style={{ background: `linear-gradient(135deg, ${colors.sage}, #7A9E5F)`, color: colors.buttermilk }}>
                ✅ I Have Paid — Confirm My Order
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}