import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

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

const products = [
  {
    id: 1,
    name: 'Country Eggs',
    telugu: 'నాటు గుడ్లు',
    emoji: '🥚',
    pricePerEgg: 12,
    description: 'Pure desi country eggs with rich golden yolk — raised freely on natural feed',
    sizes: [6, 12, 30],
    badge: '🏆 Best Seller',
    color: colors.terracotta,
    highlight: 'Rich golden yolk',
    facts: ['Free range hens', 'No hormones', 'Collected daily'],
  },
  {
    id: 2,
    name: 'Farm Eggs',
    telugu: 'పొలం గుడ్లు',
    emoji: '🍳',
    pricePerEgg: 9,
    description: 'Fresh farm eggs perfect for everyday cooking — great value for families',
    sizes: [12, 30],
    badge: '💰 Best Value',
    color: colors.sage,
    highlight: 'Great for cooking',
    facts: ['Farm raised', 'Affordable', 'Bulk packs'],
  },
  {
    id: 3,
    name: 'Premium Desi',
    telugu: 'ప్రీమియం గుడ్లు',
    emoji: '✨',
    pricePerEgg: 15,
    description: 'Finest free-range eggs from hens fed organic grain — taste the difference',
    sizes: [6, 12],
    badge: '⭐ Premium',
    color: colors.duckBlue,
    highlight: 'Organic fed hens',
    facts: ['Free range', 'Organic feed', 'Premium quality'],
  },
]

const whyUs = [
  { icon: '🌅', text: 'Collected every morning' },
  { icon: '🚚', text: 'Delivered same day' },
  { icon: '🌿', text: 'No hormones ever' },
  { icon: '💯', text: '100% farm fresh' },
]

export default function Shop() {
  const [cart, setCart] = useState([])
  const [added, setAdded] = useState(null)
  const [activeProduct, setActiveProduct] = useState(null)
  const navigate = useNavigate()

  const addToCart = (product, size) => {
    setAdded(`${product.id}-${size}`)
    setTimeout(() => setAdded(null), 1000)
    const existing = cart.find(i => i.id === product.id && i.size === size)
    if (existing) {
      setCart(cart.map(i => i.id === product.id && i.size === size ? { ...i, qty: i.qty + 1 } : i))
    } else {
      setCart([...cart, { ...product, size, qty: 1 }])
    }
  }

  const removeFromCart = (id, size) => setCart(cart.filter(i => !(i.id === id && i.size === size)))
  const updateQty = (id, size, delta) => {
    setCart(cart.map(i => {
      if (i.id === id && i.size === size) {
        const newQty = i.qty + delta
        return newQty <= 0 ? null : { ...i, qty: newQty }
      }
      return i
    }).filter(Boolean))
  }

  const total = cart.reduce((sum, i) => sum + i.pricePerEgg * i.size * i.qty, 0)
  const totalItems = cart.reduce((sum, i) => sum + i.qty, 0)

  const handleCheckout = () => {
    if (cart.length === 0) return alert('Please add items to cart first!')
    navigate('/checkout', { state: { cart, total } })
  }

  return (
    <div className="min-h-screen pb-48 overflow-x-hidden" style={{ background: colors.cream }}>

      {/* Floating background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-32 right-0 w-80 h-80 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${colors.yolk}, transparent)` }} />
        <motion.div
          animate={{ y: [0, 25, 0], x: [0, -10, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-60 left-0 w-64 h-64 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${colors.terracotta}, transparent)` }} />
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute top-1/2 left-1/3 w-48 h-48 rounded-full opacity-10"
          style={{ background: `radial-gradient(circle, ${colors.sage}, transparent)` }} />
      </div>

      {/* Hero Header */}
      <div className="relative overflow-hidden text-center py-20 px-6"
        style={{ background: `linear-gradient(160deg, ${colors.darkBrown} 0%, #3D2B1F 60%, #5C3020 100%)` }}>

        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at 30% 50%, ${colors.yolk}12 0%, transparent 60%)` }} />

        {/* Floating decorative eggs */}
        {['🥚', '✨', '🌿', '🥚', '⭐'].map((emoji, i) => (
          <motion.span key={i}
            className="absolute opacity-15 text-2xl pointer-events-none"
            style={{ top: `${15 + i * 15}%`, left: i % 2 === 0 ? `${5 + i * 3}%` : `${75 + i * 4}%` }}
            animate={{ y: [0, -12, 0], rotate: [0, i % 2 === 0 ? 10 : -10, 0] }}
            transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}>
            {emoji}
          </motion.span>
        ))}

        <motion.p
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ color: colors.yolk, fontSize: '0.72rem', letterSpacing: '0.35em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 700 }}>
          Farm to Doorstep · Nellore District
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ fontFamily: 'Playfair Display', color: colors.buttermilk, fontSize: 'clamp(2.8rem, 7vw, 5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
          Our Finest <br /><span style={{ color: colors.yolk }}>Eggs 🥚</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          style={{ color: '#C4956A', fontSize: '1rem', marginBottom: '2rem' }}>
          Hand-picked every morning · Delivered fresh to your door
        </motion.p>

        {/* Why us strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 mb-4">
          {whyUs.map((w, i) => (
            <motion.div key={i}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: 'rgba(255,248,236,0.1)', border: '1px solid rgba(255,248,236,0.15)' }}>
              <span style={{ fontSize: '1rem' }}>{w.icon}</span>
              <span style={{ color: colors.sand, fontSize: '0.8rem', fontWeight: 500 }}>{w.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: 'block', height: '60px', width: '100%' }}>
            <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill={colors.cream} />
          </svg>
        </div>
      </div>

      {/* Products */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-14">

        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}>
          <p style={{ color: colors.terracotta, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.5rem' }}>
            Choose Your Eggs
          </p>
          <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '2.2rem', fontWeight: 700 }}>
            Select Pack Size & Add to Cart
          </h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(to right, ${colors.terracotta}, ${colors.yolk})`, borderRadius: '2px', margin: '0.75rem auto 0' }} />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.18 }}
              className="relative rounded-3xl overflow-hidden border transition-all"
              style={{
                background: colors.buttermilk,
                borderColor: activeProduct === product.id ? product.color : colors.sand,
                borderWidth: activeProduct === product.id ? '2px' : '1px',
                boxShadow: activeProduct === product.id ? `0 24px 60px ${product.color}30` : `0 4px 20px ${colors.brown}08`,
              }}
              onMouseEnter={() => setActiveProduct(product.id)}
              onMouseLeave={() => setActiveProduct(null)}>

              {/* Colored top section */}
              <div className="relative p-6 text-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${product.color}18, ${colors.yolk}10)` }}>

                {/* Background pattern */}
                <div className="absolute inset-0 pointer-events-none opacity-5"
                  style={{ backgroundImage: `radial-gradient(${product.color} 1px, transparent 1px)`, backgroundSize: '20px 20px' }} />

                {/* Badge */}
                <div className="absolute top-3 right-3 text-xs font-bold px-3 py-1 rounded-full"
                  style={{ background: `${product.color}22`, color: product.color, border: `1px solid ${product.color}55` }}>
                  {product.badge}
                </div>

                {/* Floating emoji */}
                <motion.div
                  animate={activeProduct === product.id
                    ? { y: [0, -12, 0], rotate: [0, 8, 0], scale: [1, 1.1, 1] }
                    : { y: [0, -5, 0] }}
                  transition={{ duration: activeProduct === product.id ? 1.5 : 3, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ fontSize: '5rem', marginBottom: '0.75rem', display: 'inline-block' }}>
                  {product.emoji}
                </motion.div>

                <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.15rem' }}>
                  {product.name}
                </h2>
                <p style={{ color: product.color, fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                  {product.telugu}
                </p>

                {/* Highlight pill */}
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full"
                  style={{ background: `${product.color}15`, border: `1px solid ${product.color}33` }}>
                  <span style={{ fontSize: '0.7rem' }}>✦</span>
                  <span style={{ color: product.color, fontSize: '0.75rem', fontWeight: 600 }}>{product.highlight}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <p style={{ color: colors.slate, fontSize: '0.875rem', lineHeight: 1.7, marginBottom: '1rem' }}>
                  {product.description}
                </p>

                {/* Facts */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {product.facts.map(fact => (
                    <span key={fact} className="px-3 py-1 rounded-full text-xs font-medium"
                      style={{ background: colors.cream, color: colors.brown, border: `1px solid ${colors.sand}` }}>
                      ✓ {fact}
                    </span>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-4">
                  <span style={{ fontFamily: 'Playfair Display', color: product.color, fontSize: '1.8rem', fontWeight: 800 }}>
                    ₹{product.pricePerEgg}
                  </span>
                  <span style={{ color: colors.slate, fontSize: '0.85rem' }}>per egg</span>
                </div>

                {/* Pack size buttons */}
                <div className="flex flex-col gap-2">
                  {product.sizes.map(size => {
                    const key = `${product.id}-${size}`
                    const isAdded = added === key
                    const inCart = cart.find(i => i.id === product.id && i.size === size)

                    return (
                      <motion.button
                        key={size}
                        onClick={() => addToCart(product, size)}
                        whileTap={{ scale: 0.95 }}
                        whileHover={{ x: 4 }}
                        className="relative py-3 px-4 rounded-xl flex justify-between items-center font-medium text-sm transition-all border overflow-hidden"
                        style={{
                          background: isAdded ? `${product.color}20` : inCart ? `${product.color}10` : colors.cream,
                          borderColor: isAdded ? product.color : inCart ? `${product.color}66` : colors.sand,
                          color: isAdded ? product.color : colors.brown,
                        }}>

                        {/* Shine effect on hover */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          style={{ background: `linear-gradient(90deg, transparent, ${product.color}10, transparent)` }}
                          initial={{ x: '-100%' }}
                          whileHover={{ x: '100%' }}
                          transition={{ duration: 0.4 }} />

                        <div className="flex items-center gap-3 relative z-10">
                          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold"
                            style={{ background: `${product.color}18`, color: product.color }}>
                            {size}
                          </div>
                          <div className="text-left">
                            <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>
                              {isAdded ? '✅ Added to cart!' : `${size} eggs pack`}
                            </p>
                            {inCart && !isAdded && (
                              <p style={{ color: product.color, fontSize: '0.72rem' }}>
                                {inCart.qty} in cart — tap to add more
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="relative z-10 text-right">
                          <p style={{ color: product.color, fontWeight: 800, fontSize: '1rem' }}>
                            ₹{product.pricePerEgg * size}
                          </p>
                          <p style={{ color: colors.slate, fontSize: '0.7rem' }}>
                            ₹{product.pricePerEgg}/egg
                          </p>
                        </div>
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Freshness Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 rounded-3xl p-8 text-center relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${colors.sage}, ${colors.sageLight})` }}>

          <div className="absolute inset-0 pointer-events-none opacity-10"
            style={{ backgroundImage: `radial-gradient(white 1px, transparent 1px)`, backgroundSize: '25px 25px' }} />

          <motion.div
            animate={{ rotate: [0, 5, 0, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>
            🌅
          </motion.div>

          <h3 style={{ fontFamily: 'Playfair Display', color: colors.buttermilk, fontSize: '1.8rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Freshness Guaranteed
          </h3>
          <p style={{ color: 'rgba(255,248,236,0.85)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.7 }}>
            Every egg is collected before sunrise and delivered to your door by morning. If you're not satisfied, we'll replace it — no questions asked.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mt-6">
            {['🕕 Collected at 5 AM', '🚚 Delivered by 9 AM', '💯 Or full refund'].map((t, i) => (
              <motion.span key={i}
                whileHover={{ scale: 1.05 }}
                style={{ color: colors.buttermilk, fontSize: '0.85rem', fontWeight: 600 }}>
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sticky Cart */}
      <AnimatePresence>
        {cart.length > 0 && (
          <motion.div
            initial={{ y: 140, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 140, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="fixed bottom-0 left-0 w-full z-50"
            style={{ background: colors.darkBrown, borderTop: `2px solid ${colors.yolk}44`, boxShadow: `0 -8px 40px ${colors.darkBrown}88` }}>

            <div className="max-w-4xl mx-auto px-6 py-4">

              {/* Cart header */}
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.4 }}
                    key={totalItems}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{ background: colors.yolk, color: colors.darkBrown }}>
                    {totalItems}
                  </motion.div>
                  <span style={{ color: colors.buttermilk, fontWeight: 700, fontSize: '1rem' }}>
                    🛒 Your Cart
                  </span>
                </div>
                <div className="text-right">
                  <span style={{ color: colors.yolk, fontWeight: 800, fontSize: '1.2rem', fontFamily: 'Playfair Display' }}>
                    ₹{total}
                  </span>
                  <span style={{ color: '#C4956A', fontSize: '0.75rem', marginLeft: '4px' }}>total</span>
                </div>
              </div>

              {/* Cart items */}
              <div className="flex flex-col gap-2 mb-3 max-h-28 overflow-y-auto pr-1">
                {cart.map(item => (
                  <motion.div
                    key={`${item.id}-${item.size}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex justify-between items-center rounded-xl px-3 py-2"
                    style={{ background: 'rgba(255,248,236,0.06)' }}>
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: '1.1rem' }}>{item.emoji}</span>
                      <div>
                        <p style={{ color: colors.buttermilk, fontSize: '0.8rem', fontWeight: 600 }}>{item.name}</p>
                        <p style={{ color: '#C4956A', fontSize: '0.7rem' }}>{item.size} eggs pack</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Qty controls */}
                      <div className="flex items-center gap-2 rounded-lg px-2 py-1"
                        style={{ background: 'rgba(255,248,236,0.08)' }}>
                        <button onClick={() => updateQty(item.id, item.size, -1)}
                          style={{ color: colors.yolk, fontWeight: 700, fontSize: '1rem', width: '20px' }}>−</button>
                        <span style={{ color: colors.buttermilk, fontSize: '0.85rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.size, 1)}
                          style={{ color: colors.yolk, fontWeight: 700, fontSize: '1rem', width: '20px' }}>+</button>
                      </div>

                      <span style={{ color: colors.yolk, fontWeight: 700, fontSize: '0.9rem', minWidth: '50px', textAlign: 'right' }}>
                        ₹{item.pricePerEgg * item.size * item.qty}
                      </span>

                      <button onClick={() => removeFromCart(item.id, item.size)}
                        style={{ color: '#E87070', fontWeight: 700, fontSize: '1rem' }}>✕</button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Checkout button */}
              <motion.button
                onClick={handleCheckout}
                whileHover={{ scale: 1.02, boxShadow: `0 0 30px ${colors.terracotta}66` }}
                whileTap={{ scale: 0.97 }}
                className="w-full py-4 rounded-2xl text-lg font-bold tracking-wide transition-all relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk }}>

                {/* Shine sweep */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)' }}
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear', repeatDelay: 1 }} />

                <span className="relative z-10">Proceed to Checkout → ₹{total}</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}