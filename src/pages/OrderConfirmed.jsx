import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'

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

export default function OrderConfirmed() {
  const { state } = useLocation()
  const { form, cart, total } = state || {}
  const { user } = useAuth()
  const [orderSaved, setOrderSaved] = useState(false)
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    const saveOrder = async () => {
      if (!form || !cart || orderSaved) return
      try {
        const orderData = {
          customer: {
            name: form.name,
            phone: form.phone,
            address: form.address,
            pincode: form.pincode,
            landmark: form.landmark || '',
            email: user?.email || '',
            uid: user?.uid || 'guest',
          },
          items: cart.map(item => ({
            name: item.name,
            size: item.size,
            qty: item.qty,
            pricePerEgg: item.pricePerEgg,
            subtotal: item.pricePerEgg * item.size * item.qty,
          })),
          total,
          status: 'pending',
          paymentMethod: 'UPI',
          paymentStatus: 'pending_verification',
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        }
        const docRef = await addDoc(collection(db, 'orders'), orderData)
        setOrderId(docRef.id.slice(0, 8).toUpperCase())
        setOrderSaved(true)
      } catch (err) {
        console.error('Error saving order:', err)
      }
    }
    saveOrder()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden"
      style={{ background: colors.cream }}>

      {/* Floating background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${colors.yolk}, transparent)` }} />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-20 left-10 w-48 h-48 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${colors.sage}, transparent)` }} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="relative z-10 rounded-3xl p-8 w-full max-w-md border text-center"
        style={{ background: colors.buttermilk, borderColor: colors.sand, boxShadow: `0 24px 60px ${colors.terracotta}18` }}>

        <motion.div
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontSize: '5rem', marginBottom: '1rem' }}>
          🎉
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{ fontFamily: 'Playfair Display', color: colors.sage, fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Order Placed!
        </motion.h1>

        {orderId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-block px-4 py-2 rounded-full mb-4"
            style={{ background: `${colors.terracotta}15`, border: `1px solid ${colors.terracotta}33` }}>
            <p style={{ color: colors.terracotta, fontWeight: 700, fontSize: '0.85rem' }}>
              Order ID: #{orderId}
            </p>
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          style={{ color: colors.slate, marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.6 }}>
          Thank you <strong style={{ color: colors.brown }}>{form?.name}</strong>! We'll verify your payment and confirm delivery shortly.
        </motion.p>

        {/* Delivery Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="rounded-2xl p-4 text-left mb-4"
          style={{ background: colors.cream, border: `1px solid ${colors.sand}` }}>
          <p style={{ fontWeight: 700, color: colors.terracotta, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            📍 Delivery Address
          </p>
          <p style={{ color: colors.brown, fontSize: '0.9rem', lineHeight: 1.6 }}>{form?.address}</p>
          <p style={{ color: colors.slate, fontSize: '0.85rem' }}>Pincode: {form?.pincode}</p>
          {form?.landmark && <p style={{ color: colors.slate, fontSize: '0.85rem' }}>Near: {form?.landmark}</p>}
          <p style={{ color: colors.slate, fontSize: '0.85rem' }}>📞 {form?.phone}</p>
        </motion.div>

        {/* Items */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="rounded-2xl p-4 text-left mb-5"
          style={{ background: colors.cream, border: `1px solid ${colors.sand}` }}>
          <p style={{ fontWeight: 700, color: colors.sage, marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            🥚 Items Ordered
          </p>
          {cart?.map(item => (
            <div key={`${item.id}-${item.size}`} className="flex justify-between py-1"
              style={{ borderBottom: `1px solid ${colors.sand}` }}>
              <span style={{ color: colors.brown, fontSize: '0.85rem' }}>
                {item.name} — {item.size} × {item.qty}
              </span>
              <span style={{ color: colors.terracotta, fontWeight: 700, fontSize: '0.85rem' }}>
                ₹{item.pricePerEgg * item.size * item.qty}
              </span>
            </div>
          ))}
          <div className="flex justify-between mt-3">
            <span style={{ fontWeight: 700, color: colors.darkBrown }}>Total</span>
            <span style={{ fontWeight: 800, color: colors.terracotta, fontSize: '1.1rem' }}>₹{total}</span>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          style={{ color: colors.slate, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          We will call you on <strong style={{ color: colors.brown }}>{form?.phone}</strong> to confirm!
        </motion.p>

        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.03, boxShadow: `0 10px 30px ${colors.terracotta}44` }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-4 rounded-2xl text-lg font-bold tracking-wide transition-all"
            style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk }}>
            Back to Home 🏠
          </motion.button>
        </Link>
      </motion.div>
    </div>
  )
}