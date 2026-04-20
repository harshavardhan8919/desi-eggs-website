import { motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore'

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

const statusColors = {
  pending: { bg: '#FFF8EC', border: '#F2C14E44', text: '#C4622D', label: '⏳ Pending Verification' },
  confirmed: { bg: '#EFF8FF', border: '#5B8DB844', text: '#5B8DB8', label: '✅ Confirmed' },
  out_for_delivery: { bg: '#F0FFF4', border: '#4A7C5944', text: '#4A7C59', label: '🚚 Out for Delivery' },
  delivered: { bg: '#F5F5F5', border: '#70809044', text: '#708090', label: '📦 Delivered' },
  cancelled: { bg: '#FFF0F0', border: '#C4622D44', text: '#C4622D', label: '❌ Cancelled' },
}

export default function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [loadingOrders, setLoadingOrders] = useState(true)
  const [activeTab, setActiveTab] = useState('orders')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    const q = query(
      collection(db, 'orders'),
      where('customer.uid', '==', user.uid),
      orderBy('createdAt', 'desc')
    )
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        shortId: doc.id.slice(0, 8).toUpperCase(),
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }))
      setOrders(data)
      setLoadingOrders(false)
    })
    return unsub
  }, [user])

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (!user) return null

  const totalSpent = orders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0)

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ background: colors.cream }}>

      {/* Floating blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
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

      {/* Header */}
      <div className="relative overflow-hidden text-center py-16 px-6"
        style={{ background: `linear-gradient(160deg, ${colors.darkBrown} 0%, #3D2B1F 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${colors.yolk}15 0%, transparent 60%)` }} />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10">

          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4 border-4 overflow-hidden"
            style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, borderColor: colors.yolk, color: colors.buttermilk }}>
            {user.photoURL
              ? <img src={user.photoURL} alt="profile" className="w-full h-full object-cover" />
              : (user.displayName?.[0] || user.email?.[0] || '🥚').toUpperCase()
            }
          </motion.div>

          <h1 style={{ fontFamily: 'Playfair Display', color: colors.buttermilk, fontSize: '1.8rem', fontWeight: 800 }}>
            {user.displayName || 'Egg Lover'}
          </h1>
          <p style={{ color: '#C4956A', fontSize: '0.9rem', marginTop: '0.25rem' }}>{user.email}</p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-6">
            {[
              { value: orders.length, label: 'Orders' },
              { value: `₹${totalSpent}`, label: 'Total Spent' },
              { value: orders.filter(o => o.status === 'delivered').length, label: 'Delivered' },
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p style={{ fontFamily: 'Playfair Display', color: colors.yolk, fontSize: '1.5rem', fontWeight: 800 }}>{stat.value}</p>
                <p style={{ color: '#C4956A', fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: 'block', height: '50px', width: '100%' }}>
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill={colors.cream} />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-8">

        {/* Tabs */}
        <div className="flex rounded-2xl p-1 mb-6" style={{ background: colors.buttermilk, border: `1px solid ${colors.sand}` }}>
          {[
            { id: 'orders', label: '📋 My Orders' },
            { id: 'account', label: '👤 Account' },
          ].map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileTap={{ scale: 0.97 }}
              className="flex-1 py-2 rounded-xl text-sm font-bold transition-all"
              style={{
                background: activeTab === tab.id
                  ? `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`
                  : 'transparent',
                color: activeTab === tab.id ? colors.buttermilk : colors.slate,
              }}>
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {loadingOrders ? (
              <div className="text-center py-16">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ fontSize: '2rem', display: 'inline-block' }}>
                  🥚
                </motion.div>
                <p style={{ color: colors.slate, marginTop: '1rem' }}>Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-16">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                  🥚
                </motion.div>
                <p style={{ color: colors.brown, fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                  No orders yet!
                </p>
                <p style={{ color: colors.slate, fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Place your first order and get fresh eggs at your door
                </p>
                <Link to="/shop">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-3 rounded-full font-bold"
                    style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk }}>
                    Shop Now →
                  </motion.button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {orders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    whileHover={{ y: -4, boxShadow: `0 12px 30px ${colors.terracotta}12` }}
                    className="rounded-2xl border overflow-hidden transition-all"
                    style={{ background: colors.buttermilk, borderColor: colors.sand }}>

                    {/* Order header */}
                    <div className="p-4 flex justify-between items-start"
                      style={{ borderBottom: `1px solid ${colors.sand}` }}>
                      <div>
                        <p style={{ color: colors.terracotta, fontWeight: 700, fontSize: '0.85rem' }}>
                          Order #{order.shortId}
                        </p>
                        <p style={{ color: colors.slate, fontSize: '0.75rem', marginTop: '0.15rem' }}>
                          {order.createdAt?.toLocaleDateString?.('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: statusColors[order.status]?.bg || '#F5F5F5',
                          border: `1px solid ${statusColors[order.status]?.border || '#ccc'}`,
                          color: statusColors[order.status]?.text || colors.slate,
                        }}>
                        {statusColors[order.status]?.label || order.status}
                      </span>
                    </div>

                    {/* Order items */}
                    <div className="px-4 py-3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {order.items?.map((item, j) => (
                          <span key={j} className="px-3 py-1 rounded-xl text-xs font-medium"
                            style={{ background: colors.cream, color: colors.brown, border: `1px solid ${colors.sand}` }}>
                            🥚 {item.name} × {item.size} × {item.qty}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between items-center">
                        <div>
                          <p style={{ color: colors.slate, fontSize: '0.8rem' }}>
                            📍 {order.customer?.address}, {order.customer?.pincode}
                          </p>
                        </div>
                        <p style={{ fontFamily: 'Playfair Display', color: colors.terracotta, fontSize: '1.2rem', fontWeight: 800 }}>
                          ₹{order.total}
                        </p>
                      </div>
                    </div>

                    {/* Progress tracker */}
                    <div className="px-4 pb-4">
                      <div className="flex items-center gap-1">
                        {['pending', 'confirmed', 'out_for_delivery', 'delivered'].map((s, idx) => {
                          const statuses = ['pending', 'confirmed', 'out_for_delivery', 'delivered']
                          const currentIdx = statuses.indexOf(order.status)
                          const isActive = idx <= currentIdx
                          const isCancelled = order.status === 'cancelled'
                          return (
                            <div key={s} className="flex items-center flex-1">
                              <div className="flex flex-col items-center flex-1">
                                <div className="w-4 h-4 rounded-full flex items-center justify-center"
                                  style={{
                                    background: isCancelled ? colors.sand : isActive ? colors.sage : colors.sand,
                                    transition: 'background 0.3s'
                                  }}>
                                  {isActive && !isCancelled && (
                                    <div className="w-2 h-2 rounded-full" style={{ background: colors.buttermilk }} />
                                  )}
                                </div>
                                <p style={{ fontSize: '0.6rem', color: isActive && !isCancelled ? colors.sage : colors.slate, marginTop: '0.2rem', textAlign: 'center' }}>
                                  {s === 'pending' ? 'Placed' : s === 'confirmed' ? 'Confirmed' : s === 'out_for_delivery' ? 'On Way' : 'Delivered'}
                                </p>
                              </div>
                              {idx < 3 && (
                                <div className="h-0.5 flex-1 mb-3"
                                  style={{ background: isActive && idx < currentIdx && !isCancelled ? colors.sage : colors.sand }} />
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* ACCOUNT TAB */}
        {activeTab === 'account' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>

            {/* Quick actions */}
            <div className="rounded-3xl p-6 border mb-4"
              style={{ background: colors.buttermilk, borderColor: colors.sand }}>
              <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
                Quick Actions
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { icon: '🛒', label: 'Shop Eggs', to: '/shop', color: colors.terracotta },
                  { icon: '🔄', label: 'Subscribe for Daily Delivery', to: '/subscription', color: colors.sage },
                  { icon: '⭐', label: 'Write a Review', to: '/reviews', color: '#C4956A' },
                  { icon: '📍', label: 'Check Delivery Area', to: '/', color: colors.slate },
                ].map((item, i) => (
                  <Link key={i} to={item.to}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      whileTap={{ scale: 0.97 }}
                      className="flex items-center gap-4 p-4 rounded-2xl border transition-all cursor-pointer"
                      style={{ background: colors.cream, borderColor: colors.sand }}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                        style={{ background: `${item.color}15` }}>
                        {item.icon}
                      </div>
                      <span style={{ color: colors.brown, fontWeight: 600, fontSize: '0.9rem' }}>{item.label}</span>
                      <span style={{ color: colors.slate, marginLeft: 'auto' }}>→</span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Account info */}
            <div className="rounded-3xl p-6 border mb-4"
              style={{ background: colors.buttermilk, borderColor: colors.sand }}>
              <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.2rem', fontWeight: 700, marginBottom: '1rem' }}>
                Account Info
              </h2>
              <div className="flex flex-col gap-3">
                {[
                  { label: 'Name', value: user.displayName || 'Not set' },
                  { label: 'Email', value: user.email },
                  { label: 'Account', value: user.providerData?.[0]?.providerId === 'google.com' ? 'Google Account' : 'Email Account' },
                ].map(info => (
                  <div key={info.label} className="flex justify-between items-center py-2"
                    style={{ borderBottom: `1px solid ${colors.sand}` }}>
                    <span style={{ color: colors.slate, fontSize: '0.85rem' }}>{info.label}</span>
                    <span style={{ color: colors.brown, fontWeight: 600, fontSize: '0.85rem' }}>{info.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Logout */}
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-4 rounded-2xl text-lg font-bold transition-all border"
              style={{ background: 'transparent', borderColor: colors.terracotta, color: colors.terracotta }}>
              Logout →
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  )
}