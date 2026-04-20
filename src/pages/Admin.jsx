import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { db } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  collection, doc, updateDoc,
  orderBy, query, serverTimestamp,
  onSnapshot
} from 'firebase/firestore'

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
  sageLight: '#7A9E5F',
  slate: '#708090',
  duckBlue: '#5B8DB8',
}

const ADMIN_EMAIL = 'harsha95539@gmail.com'

const statusColors = {
  pending: { bg: '#FFF8EC', border: '#F2C14E44', text: '#C4622D', label: '⏳ Pending' },
  confirmed: { bg: '#EFF8FF', border: '#5B8DB844', text: '#5B8DB8', label: '✅ Confirmed' },
  out_for_delivery: { bg: '#F0FFF4', border: '#4A7C5944', text: '#4A7C59', label: '🚚 Out for Delivery' },
  delivered: { bg: '#F5F5F5', border: '#70809044', text: '#708090', label: '📦 Delivered' },
  cancelled: { bg: '#FFF0F0', border: '#C4622D44', text: '#C4622D', label: '❌ Cancelled' },
}

const tabs = [
  { id: 'orders', icon: '📋', label: 'Orders' },
  { id: 'delivery', icon: '🗺️', label: 'Delivery List' },
  { id: 'stock', icon: '📦', label: 'Stock' },
  { id: 'products', icon: '🥚', label: 'Products' },
  { id: 'customers', icon: '👥', label: 'Customers' },
  { id: 'reports', icon: '📊', label: 'Reports' },
]

const initialProducts = [
  { id: 1, name: 'Country Eggs', pricePerEgg: 12, available: true, stock: 500 },
  { id: 2, name: 'Farm Eggs', pricePerEgg: 9, available: true, stock: 300 },
  { id: 3, name: 'Premium Desi', pricePerEgg: 15, available: true, stock: 200 },
]

export default function Admin() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('orders')
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [statusFilter, setStatusFilter] = useState('all')
  const [products, setProducts] = useState(initialProducts)
  const [editingProduct, setEditingProduct] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    if (!user) { navigate('/login'); return }
    if (user.email !== ADMIN_EMAIL) { navigate('/'); return }
  }, [user])

  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) return
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        shortId: doc.id.slice(0, 8).toUpperCase(),
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      }))
      setOrders(data)
      setLoading(false)
    })
    return unsub
  }, [user])

  const updateOrderStatus = async (orderId, status) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status,
        updatedAt: serverTimestamp(),
      })
    } catch (err) {
      alert('Failed to update status!')
    }
  }

  const filteredOrders = orders.filter(o => {
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    const matchSearch = !searchTerm ||
      o.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customer?.phone?.includes(searchTerm) ||
      o.shortId?.includes(searchTerm.toUpperCase())
    return matchStatus && matchSearch
  })

  const todayOrders = orders.filter(o => {
    const today = new Date()
    return o.createdAt?.toDateString?.() === today.toDateString()
  })

  const totalRevenue = orders
    .filter(o => o.status === 'delivered')
    .reduce((sum, o) => sum + (o.total || 0), 0)

  const todayRevenue = todayOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + (o.total || 0), 0)

  const pendingCount = orders.filter(o => o.status === 'pending').length
  const deliveredCount = orders.filter(o => o.status === 'delivered').length
  const uniqueCustomers = [...new Map(orders.map(o => [o.customer?.phone, o.customer])).values()]

  if (!user || user.email !== ADMIN_EMAIL) return null

  return (
    <div className="min-h-screen" style={{ background: colors.cream }}>

      {/* Admin Header */}
      <div className="sticky top-0 z-50 px-6 py-4 flex justify-between items-center"
        style={{ background: colors.darkBrown, borderBottom: `1px solid ${colors.yolk}22` }}>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: '1.8rem' }}>🥚</span>
          <div>
            <p style={{ fontFamily: 'Playfair Display', color: colors.yolk, fontSize: '1.1rem', fontWeight: 700, lineHeight: 1 }}>
              Admin Dashboard
            </p>
            <p style={{ color: '#C4956A', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
              Desi Eggs Management
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {pendingCount > 0 && (
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: colors.terracotta, color: colors.buttermilk }}>
              {pendingCount} new
            </motion.div>
          )}
          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm"
            style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk }}>
            {user?.displayName?.[0] || 'A'}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="px-6 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Orders", value: todayOrders.length, icon: '📋', color: colors.duckBlue },
          { label: "Today's Revenue", value: `₹${todayRevenue}`, icon: '💰', color: colors.sage },
          { label: 'Pending Orders', value: pendingCount, icon: '⏳', color: colors.terracotta },
          { label: 'Total Delivered', value: deliveredCount, icon: '✅', color: colors.sageLight },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl p-4 border transition-all"
            style={{ background: colors.buttermilk, borderColor: colors.sand }}>
            <div className="flex justify-between items-start mb-2">
              <span style={{ fontSize: '1.5rem' }}>{stat.icon}</span>
              <div className="w-2 h-2 rounded-full" style={{ background: stat.color, marginTop: '4px' }} />
            </div>
            <p style={{ fontFamily: 'Playfair Display', color: stat.color, fontSize: '1.6rem', fontWeight: 800, lineHeight: 1 }}>
              {stat.value}
            </p>
            <p style={{ color: colors.slate, fontSize: '0.75rem', marginTop: '0.25rem' }}>{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="px-6 mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all"
              style={{
                background: activeTab === tab.id
                  ? `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`
                  : colors.buttermilk,
                color: activeTab === tab.id ? colors.buttermilk : colors.brown,
                border: `1px solid ${activeTab === tab.id ? colors.terracotta : colors.sand}`,
              }}>
              <span>{tab.icon}</span>
              {tab.label}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="px-6 pb-10">

        {/* ORDERS TAB */}
        {activeTab === 'orders' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex flex-wrap gap-3 mb-5">
              <input
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                placeholder="Search by name, phone, order ID..."
                className="flex-1 px-4 py-2 rounded-xl border text-sm outline-none"
                style={{ background: colors.buttermilk, borderColor: colors.sand, color: colors.brown, minWidth: '200px' }}
              />
              <div className="flex gap-2 flex-wrap">
                {['all', 'pending', 'confirmed', 'out_for_delivery', 'delivered', 'cancelled'].map(s => (
                  <button
                    key={s}
                    onClick={() => setStatusFilter(s)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold border transition-all"
                    style={{
                      background: statusFilter === s ? colors.terracotta : colors.buttermilk,
                      color: statusFilter === s ? colors.buttermilk : colors.brown,
                      borderColor: statusFilter === s ? colors.terracotta : colors.sand,
                    }}>
                    {s === 'all' ? 'All' : statusColors[s]?.label}
                  </button>
                ))}
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  style={{ fontSize: '2rem', display: 'inline-block' }}>
                  🥚
                </motion.div>
                <p style={{ color: colors.slate, marginTop: '1rem' }}>Loading orders...</p>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ fontSize: '3rem' }}>📭</p>
                <p style={{ color: colors.slate, marginTop: '1rem' }}>No orders found</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {filteredOrders.map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl border overflow-hidden"
                    style={{ background: colors.buttermilk, borderColor: colors.sand }}>

                    <div className="p-4 flex flex-wrap justify-between items-start gap-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span style={{ color: colors.terracotta, fontWeight: 700, fontSize: '0.9rem' }}>
                            #{order.shortId}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold"
                            style={{
                              background: statusColors[order.status]?.bg,
                              border: `1px solid ${statusColors[order.status]?.border}`,
                              color: statusColors[order.status]?.text,
                            }}>
                            {statusColors[order.status]?.label}
                          </span>
                        </div>
                        <p style={{ color: colors.brown, fontWeight: 700 }}>{order.customer?.name}</p>
                        <p style={{ color: colors.slate, fontSize: '0.82rem' }}>📞 {order.customer?.phone}</p>
                        <p style={{ color: colors.slate, fontSize: '0.82rem' }}>📍 {order.customer?.address}, {order.customer?.pincode}</p>
                        {order.customer?.landmark && (
                          <p style={{ color: colors.slate, fontSize: '0.78rem' }}>Near: {order.customer?.landmark}</p>
                        )}
                        <p style={{ color: colors.slate, fontSize: '0.75rem', marginTop: '0.25rem' }}>
                          🕒 {order.createdAt?.toLocaleString?.('en-IN') || 'Just now'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p style={{ fontFamily: 'Playfair Display', color: colors.terracotta, fontSize: '1.4rem', fontWeight: 800 }}>
                          ₹{order.total}
                        </p>
                        <p style={{ color: colors.slate, fontSize: '0.75rem' }}>{order.items?.length} item types</p>
                      </div>
                    </div>

                    <div className="px-4 pb-3">
                      <div className="flex flex-wrap gap-2 mb-3">
                        {order.items?.map((item, j) => (
                          <span key={j} className="px-2 py-1 rounded-lg text-xs"
                            style={{ background: colors.cream, color: colors.brown, border: `1px solid ${colors.sand}` }}>
                            🥚 {item.name} × {item.size} × {item.qty}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {Object.entries(statusColors).map(([key, val]) => (
                          <motion.button
                            key={key}
                            onClick={() => updateOrderStatus(order.id, key)}
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                            className="px-3 py-1 rounded-xl text-xs font-semibold border transition-all"
                            style={{
                              background: order.status === key ? val.text : 'transparent',
                              color: order.status === key ? colors.buttermilk : val.text,
                              borderColor: val.text + '44',
                              opacity: order.status === key ? 1 : 0.7,
                            }}>
                            {val.label}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* DELIVERY LIST TAB */}
        {activeTab === 'delivery' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-5">
              <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.4rem', fontWeight: 700 }}>
                Today's Delivery List
              </h2>
              <span className="px-3 py-1 rounded-full text-sm font-bold"
                style={{ background: `${colors.sage}20`, color: colors.sage }}>
                {todayOrders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length} pending
              </span>
            </div>

            {todayOrders.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ fontSize: '3rem' }}>🚚</p>
                <p style={{ color: colors.slate, marginTop: '1rem' }}>No deliveries today</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {todayOrders
                  .filter(o => o.status !== 'cancelled')
                  .sort((a, b) => (a.customer?.pincode || '').localeCompare(b.customer?.pincode || ''))
                  .map((order, i) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.08 }}
                      className="rounded-2xl p-4 border flex justify-between items-start gap-4"
                      style={{ background: colors.buttermilk, borderColor: order.status === 'delivered' ? `${colors.sage}44` : colors.sand }}>

                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk }}>
                          {i + 1}
                        </div>
                        <div>
                          <p style={{ color: colors.brown, fontWeight: 700, fontSize: '0.95rem' }}>{order.customer?.name}</p>
                          <p style={{ color: colors.slate, fontSize: '0.82rem' }}>📞 {order.customer?.phone}</p>
                          <p style={{ color: colors.brown, fontSize: '0.85rem', marginTop: '0.2rem' }}>
                            📍 {order.customer?.address}
                          </p>
                          {order.customer?.landmark && (
                            <p style={{ color: colors.slate, fontSize: '0.78rem' }}>Near: {order.customer?.landmark}</p>
                          )}
                          <p style={{ color: colors.terracotta, fontWeight: 600, fontSize: '0.8rem', marginTop: '0.25rem' }}>
                            PIN: {order.customer?.pincode}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {order.items?.map((item, j) => (
                              <span key={j} className="px-2 py-0.5 rounded-lg text-xs"
                                style={{ background: colors.cream, color: colors.brown, border: `1px solid ${colors.sand}` }}>
                                {item.name} × {item.size} × {item.qty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="text-right flex-shrink-0">
                        <p style={{ color: colors.terracotta, fontWeight: 800, fontSize: '1.1rem' }}>₹{order.total}</p>
                        <motion.button
                          onClick={() => updateOrderStatus(order.id,
                            order.status === 'delivered' ? 'confirmed' : 'delivered')}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="mt-2 px-3 py-1 rounded-xl text-xs font-bold transition-all"
                          style={{
                            background: order.status === 'delivered'
                              ? `${colors.sage}20` : `linear-gradient(135deg, ${colors.sage}, ${colors.sageLight})`,
                            color: order.status === 'delivered' ? colors.sage : colors.buttermilk,
                          }}>
                          {order.status === 'delivered' ? '✅ Done' : 'Mark Delivered'}
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
              </div>
            )}
          </motion.div>
        )}

        {/* STOCK TAB */}
        {activeTab === 'stock' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Stock Management
            </h2>
            <div className="flex flex-col gap-4">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-5 border"
                  style={{ background: colors.buttermilk, borderColor: colors.sand }}>

                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p style={{ color: colors.darkBrown, fontWeight: 700, fontSize: '1rem' }}>{product.name}</p>
                      <p style={{ color: colors.slate, fontSize: '0.82rem' }}>₹{product.pricePerEgg} per egg</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full text-xs font-bold"
                        style={{
                          background: product.available ? `${colors.sage}20` : `${colors.terracotta}15`,
                          color: product.available ? colors.sage : colors.terracotta,
                        }}>
                        {product.available ? '✅ Available' : '❌ Out of Stock'}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setProducts(products.map(p =>
                          p.id === product.id ? { ...p, available: !p.available } : p
                        ))}
                        className="px-3 py-1 rounded-xl text-xs font-bold border transition-all"
                        style={{ borderColor: colors.sand, color: colors.brown, background: colors.cream }}>
                        Toggle
                      </motion.button>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span style={{ color: colors.slate, fontSize: '0.8rem' }}>Stock level</span>
                      <span style={{ color: colors.brown, fontWeight: 700, fontSize: '0.8rem' }}>{product.stock} eggs</span>
                    </div>
                    <div className="h-3 rounded-full overflow-hidden" style={{ background: colors.sand }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((product.stock / 500) * 100, 100)}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1 }}
                        className="h-full rounded-full"
                        style={{ background: product.stock > 100 ? `linear-gradient(to right, ${colors.sage}, ${colors.sageLight})` : `linear-gradient(to right, ${colors.terracotta}, ${colors.terracottaLight})` }} />
                    </div>
                    {product.stock < 100 && (
                      <p style={{ color: colors.terracotta, fontSize: '0.75rem', marginTop: '0.25rem' }}>
                        ⚠️ Low stock! Consider restocking soon.
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-3 mt-4">
                    <span style={{ color: colors.slate, fontSize: '0.85rem' }}>Update stock:</span>
                    <div className="flex items-center gap-2 rounded-xl px-3 py-2 border"
                      style={{ background: colors.cream, borderColor: colors.sand }}>
                      <button
                        onClick={() => setProducts(products.map(p =>
                          p.id === product.id ? { ...p, stock: Math.max(0, p.stock - 50) } : p
                        ))}
                        style={{ color: colors.terracotta, fontWeight: 700, fontSize: '1.1rem' }}>−50</button>
                      <span style={{ color: colors.brown, fontWeight: 700, minWidth: '50px', textAlign: 'center' }}>
                        {product.stock}
                      </span>
                      <button
                        onClick={() => setProducts(products.map(p =>
                          p.id === product.id ? { ...p, stock: p.stock + 50 } : p
                        ))}
                        style={{ color: colors.sage, fontWeight: 700, fontSize: '1.1rem' }}>+50</button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* PRODUCTS TAB */}
        {activeTab === 'products' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Manage Products
            </h2>
            <div className="flex flex-col gap-4">
              {products.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-2xl p-5 border"
                  style={{ background: colors.buttermilk, borderColor: colors.sand }}>

                  {editingProduct === product.id ? (
                    <div className="flex flex-col gap-3">
                      <p style={{ color: colors.darkBrown, fontWeight: 700 }}>Editing: {product.name}</p>
                      <div className="flex items-center gap-3">
                        <label style={{ color: colors.slate, fontSize: '0.85rem', minWidth: '80px' }}>Price/egg:</label>
                        <input
                          type="number"
                          value={product.pricePerEgg}
                          onChange={e => setProducts(products.map(p =>
                            p.id === product.id ? { ...p, pricePerEgg: Number(e.target.value) } : p
                          ))}
                          className="px-3 py-2 rounded-xl border outline-none w-24 text-center"
                          style={{ background: colors.cream, borderColor: colors.terracotta, color: colors.brown }}
                        />
                        <span style={{ color: colors.slate, fontSize: '0.85rem' }}>₹ per egg</span>
                      </div>
                      <div className="flex gap-2">
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setEditingProduct(null)}
                          className="px-5 py-2 rounded-xl font-bold text-sm"
                          style={{ background: `linear-gradient(135deg, ${colors.sage}, ${colors.sageLight})`, color: colors.buttermilk }}>
                          ✅ Save
                        </motion.button>
                        <motion.button
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setEditingProduct(null)}
                          className="px-5 py-2 rounded-xl font-bold text-sm border"
                          style={{ borderColor: colors.sand, color: colors.slate }}>
                          Cancel
                        </motion.button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <div>
                        <p style={{ color: colors.darkBrown, fontWeight: 700, fontSize: '1rem' }}>🥚 {product.name}</p>
                        <p style={{ color: colors.terracotta, fontWeight: 700, fontSize: '1.2rem', marginTop: '0.25rem' }}>
                          ₹{product.pricePerEgg} per egg
                        </p>
                        <p style={{ color: colors.slate, fontSize: '0.8rem' }}>
                          {product.available ? '✅ Visible in shop' : '❌ Hidden from shop'}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setEditingProduct(product.id)}
                        className="px-4 py-2 rounded-xl text-sm font-bold border"
                        style={{ borderColor: colors.terracotta, color: colors.terracotta, background: `${colors.terracotta}10` }}>
                        ✏️ Edit Price
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CUSTOMERS TAB */}
        {activeTab === 'customers' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex justify-between items-center mb-5">
              <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.4rem', fontWeight: 700 }}>
                All Customers
              </h2>
              <span className="px-3 py-1 rounded-full text-sm font-bold"
                style={{ background: `${colors.duckBlue}20`, color: colors.duckBlue }}>
                {uniqueCustomers.length} total
              </span>
            </div>

            {uniqueCustomers.length === 0 ? (
              <div className="text-center py-20">
                <p style={{ fontSize: '3rem' }}>👥</p>
                <p style={{ color: colors.slate, marginTop: '1rem' }}>No customers yet</p>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {uniqueCustomers.map((customer, i) => {
                  const customerOrders = orders.filter(o => o.customer?.phone === customer?.phone)
                  const totalSpent = customerOrders.reduce((sum, o) => sum + (o.total || 0), 0)
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="rounded-2xl p-4 border flex justify-between items-center"
                      style={{ background: colors.buttermilk, borderColor: colors.sand }}>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                          style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk }}>
                          {customer?.name?.[0] || '?'}
                        </div>
                        <div>
                          <p style={{ color: colors.brown, fontWeight: 700 }}>{customer?.name}</p>
                          <p style={{ color: colors.slate, fontSize: '0.82rem' }}>📞 {customer?.phone}</p>
                          <p style={{ color: colors.slate, fontSize: '0.78rem' }}>📍 {customer?.pincode}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p style={{ color: colors.terracotta, fontWeight: 800, fontSize: '1.1rem' }}>₹{totalSpent}</p>
                        <p style={{ color: colors.slate, fontSize: '0.75rem' }}>{customerOrders.length} orders</p>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedOrder(customer)}
                          className="mt-1 px-3 py-1 rounded-xl text-xs font-bold border"
                          style={{ borderColor: colors.duckBlue, color: colors.duckBlue, background: `${colors.duckBlue}10` }}>
                          View Orders
                        </motion.button>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            )}
          </motion.div>
        )}

        {/* REPORTS TAB */}
        {activeTab === 'reports' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem' }}>
              Sales Reports
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Total Revenue', value: `₹${totalRevenue}`, icon: '💰', sub: 'From delivered orders', color: colors.sage },
                { label: "Today's Revenue", value: `₹${todayRevenue}`, icon: '📅', sub: 'All orders today', color: colors.duckBlue },
                { label: 'Total Orders', value: orders.length, icon: '📋', sub: 'All time', color: colors.terracotta },
                { label: 'Total Customers', value: uniqueCustomers.length, icon: '👥', sub: 'Unique customers', color: '#C4956A' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl p-5 border transition-all"
                  style={{ background: colors.buttermilk, borderColor: colors.sand }}>
                  <div className="flex items-center gap-3 mb-2">
                    <span style={{ fontSize: '1.8rem' }}>{stat.icon}</span>
                    <div>
                      <p style={{ fontFamily: 'Playfair Display', color: stat.color, fontSize: '1.8rem', fontWeight: 800, lineHeight: 1 }}>
                        {stat.value}
                      </p>
                      <p style={{ color: colors.slate, fontSize: '0.75rem' }}>{stat.label}</p>
                    </div>
                  </div>
                  <p style={{ color: colors.slate, fontSize: '0.78rem' }}>{stat.sub}</p>
                </motion.div>
              ))}
            </div>

            <div className="rounded-2xl p-5 border"
              style={{ background: colors.buttermilk, borderColor: colors.sand }}>
              <p style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.1rem', fontWeight: 700, marginBottom: '1rem' }}>
                Order Status Breakdown
              </p>
              {Object.entries(statusColors).map(([key, val]) => {
                const count = orders.filter(o => o.status === key).length
                const pct = orders.length ? Math.round((count / orders.length) * 100) : 0
                return (
                  <div key={key} className="mb-3">
                    <div className="flex justify-between mb-1">
                      <span style={{ color: val.text, fontSize: '0.85rem', fontWeight: 600 }}>{val.label}</span>
                      <span style={{ color: colors.brown, fontSize: '0.85rem', fontWeight: 700 }}>{count} ({pct}%)</span>
                    </div>
                    <div className="h-2 rounded-full overflow-hidden" style={{ background: colors.sand }}>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8 }}
                        className="h-full rounded-full"
                        style={{ background: val.text }} />
                    </div>
                  </div>
                )
              })}
            </div>
          </motion.div>
        )}
      </div>

      {/* Customer order history modal */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
            style={{ background: 'rgba(0,0,0,0.5)' }}
            onClick={() => setSelectedOrder(null)}>
            <motion.div
              initial={{ scale: 0.9, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 40 }}
              onClick={e => e.stopPropagation()}
              className="rounded-3xl p-6 w-full max-w-lg overflow-y-auto"
              style={{ background: colors.buttermilk, border: `1px solid ${colors.sand}`, maxHeight: '80vh' }}>

              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.3rem', fontWeight: 700 }}>
                    {selectedOrder?.name}'s Orders
                  </h3>
                  <p style={{ color: colors.slate, fontSize: '0.8rem' }}>📞 {selectedOrder?.phone}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)}
                  style={{ color: colors.slate, fontSize: '1.5rem', fontWeight: 700 }}>✕</button>
              </div>

              {orders
                .filter(o => o.customer?.phone === selectedOrder?.phone)
                .map((order, i) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="rounded-2xl p-4 border mb-3"
                    style={{ background: colors.cream, borderColor: colors.sand }}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p style={{ color: colors.terracotta, fontWeight: 700, fontSize: '0.85rem' }}>
                          #{order.id.slice(0, 8).toUpperCase()}
                        </p>
                        <p style={{ color: colors.slate, fontSize: '0.75rem' }}>
                          {order.createdAt?.toLocaleDateString?.('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold block mb-1"
                          style={{
                            background: statusColors[order.status]?.bg,
                            color: statusColors[order.status]?.text,
                          }}>
                          {statusColors[order.status]?.label}
                        </span>
                        <p style={{ color: colors.terracotta, fontWeight: 800 }}>₹{order.total}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {order.items?.map((item, j) => (
                        <span key={j} className="px-2 py-0.5 rounded-lg text-xs"
                          style={{ background: colors.buttermilk, color: colors.brown, border: `1px solid ${colors.sand}` }}>
                          🥚 {item.name} × {item.size} × {item.qty}
                        </span>
                      ))}
                    </div>
                    <p style={{ color: colors.slate, fontSize: '0.78rem' }}>
                      📍 {order.customer?.address}, {order.customer?.pincode}
                    </p>

                    {/* Quick status update from modal */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      {Object.entries(statusColors).map(([key, val]) => (
                        <button
                          key={key}
                          onClick={() => updateOrderStatus(order.id, key)}
                          className="px-2 py-0.5 rounded-lg text-xs font-semibold border transition-all"
                          style={{
                            background: order.status === key ? val.text : 'transparent',
                            color: order.status === key ? colors.buttermilk : val.text,
                            borderColor: val.text + '44',
                          }}>
                          {val.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}

              {orders.filter(o => o.customer?.phone === selectedOrder?.phone).length === 0 && (
                <div className="text-center py-8">
                  <p style={{ color: colors.slate }}>No orders found for this customer</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}