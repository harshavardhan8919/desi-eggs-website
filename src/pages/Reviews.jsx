import { useState } from 'react'
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
  slate: '#708090',
}

const initialReviews = [
  { id: 1, name: 'Priya Lakshmi', area: 'Nellore', stars: 5, date: 'March 2026', review: 'Best desi eggs I have ever tasted! The yolk is so rich and golden. Delivery is always on time. My whole family loves it!', product: 'Country Eggs' },
  { id: 2, name: 'Ravi Kumar', area: 'Gudur', stars: 5, date: 'March 2026', review: 'My family switched to these eggs 3 months ago. The quality is outstanding and the price is very fair. Highly recommend!', product: 'Premium Desi Eggs' },
  { id: 3, name: 'Sunita Devi', area: 'Kavali', stars: 5, date: 'February 2026', review: 'Fresh eggs every morning at my doorstep. The eggs are so fresh you can taste the difference. Cannot ask for anything better!', product: 'Country Eggs' },
  { id: 4, name: 'Venkat Rao', area: 'Nellore', stars: 4, date: 'February 2026', review: 'Great quality eggs. The farm eggs tray is perfect for my hotel kitchen. Good value for bulk orders.', product: 'Farm Eggs (Tray)' },
  { id: 5, name: 'Lakshmi Bai', area: 'Atmakur', stars: 5, date: 'January 2026', review: 'I have been ordering for 6 months now. Never disappointed. The eggs are always fresh and delivery is reliable.', product: 'Country Eggs' },
  { id: 6, name: 'Suresh Babu', area: 'Kovur', stars: 5, date: 'January 2026', review: 'Premium quality at a fair price. You can clearly see these are genuine country eggs — rich dark yolk every time!', product: 'Premium Desi Eggs' },
]

function StarRating({ value, onChange, size = 32 }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(star => (
        <motion.button
          key={star}
          type="button"
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          onClick={() => onChange(star)}
          style={{ fontSize: size, color: star <= (hovered || value) ? colors.yolk : colors.sand, background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1 }}>
          ★
        </motion.button>
      ))}
    </div>
  )
}

function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, boxShadow: `0 20px 40px ${colors.terracotta}15` }}
      className="rounded-3xl p-6 border transition-all"
      style={{ background: colors.buttermilk, borderColor: colors.sand }}>

      {/* Stars */}
      <div className="flex mb-3">
        {[...Array(review.stars)].map((_, i) => (
          <span key={i} style={{ color: colors.yolk, fontSize: '1.1rem' }}>★</span>
        ))}
        {[...Array(5 - review.stars)].map((_, i) => (
          <span key={i} style={{ color: colors.sand, fontSize: '1.1rem' }}>★</span>
        ))}
      </div>

      {/* Review text */}
      <p style={{ color: colors.slate, fontSize: '0.9rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1rem' }}>
        "{review.review}"
      </p>

      {/* Product tag */}
      <div className="inline-block px-3 py-1 rounded-full mb-4"
        style={{ background: `${colors.sage}15`, border: `1px solid ${colors.sage}33` }}>
        <span style={{ color: colors.sage, fontSize: '0.75rem', fontWeight: 600 }}>🥚 {review.product}</span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})` }}>
          {review.name[0]}
        </div>
        <div>
          <p style={{ color: colors.darkBrown, fontWeight: 700, fontSize: '0.9rem' }}>{review.name}</p>
          <p style={{ color: colors.slate, fontSize: '0.75rem' }}>{review.area} · {review.date}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState(initialReviews)
  const [showForm, setShowForm] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [filter, setFilter] = useState('All')
  const [form, setForm] = useState({
    name: '', area: '', product: 'Country Eggs', stars: 0, review: ''
  })
  const [focused, setFocused] = useState(null)

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

  const totalReviews = reviews.length
  const avgRating = (reviews.reduce((sum, r) => sum + r.stars, 0) / totalReviews).toFixed(1)
  const fiveStars = reviews.filter(r => r.stars === 5).length

  const filteredReviews = filter === 'All'
    ? reviews
    : reviews.filter(r => r.product === filter)

  const handleSubmit = () => {
    if (!form.name || !form.area || !form.review || form.stars === 0) {
      alert('Please fill all fields and select a star rating!')
      return
    }
    const newReview = {
      id: reviews.length + 1,
      name: form.name,
      area: form.area,
      stars: form.stars,
      date: 'April 2026',
      review: form.review,
      product: form.product,
    }
    setReviews([newReview, ...reviews])
    setSubmitted(true)
    setShowForm(false)
    setForm({ name: '', area: '', product: 'Country Eggs', stars: 0, review: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div className="min-h-screen" style={{ background: colors.cream }}>

      {/* Floating background blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-20"
          style={{ background: `radial-gradient(circle, ${colors.yolk}, transparent)` }} />
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-40 left-10 w-48 h-48 rounded-full opacity-15"
          style={{ background: `radial-gradient(circle, ${colors.terracotta}, transparent)` }} />
      </div>

      {/* Header */}
      <div className="relative overflow-hidden text-center py-20 px-6"
        style={{ background: `linear-gradient(160deg, ${colors.darkBrown} 0%, #3D2B1F 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at top, ${colors.yolk}15 0%, transparent 60%)` }} />

        <motion.span className="absolute top-8 left-16 text-3xl opacity-20"
          animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>⭐</motion.span>
        <motion.span className="absolute bottom-8 right-20 text-2xl opacity-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>🥚</motion.span>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ color: colors.yolk, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
          Customer Stories
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'Playfair Display', color: colors.buttermilk, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800 }}>
          Reviews & Ratings ⭐
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ color: '#C4956A', marginTop: '0.5rem', fontSize: '1rem' }}>
          Real customers, real experiences
        </motion.p>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: 'block', height: '50px', width: '100%' }}>
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill={colors.cream} />
          </svg>
        </div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-4 mb-10">
          {[
            { number: avgRating, label: 'Average Rating', icon: '⭐' },
            { number: totalReviews, label: 'Total Reviews', icon: '💬' },
            { number: `${Math.round((fiveStars / totalReviews) * 100)}%`, label: '5 Star Reviews', icon: '🏆' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-5 text-center border transition-all"
              style={{ background: colors.buttermilk, borderColor: colors.sand }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.3rem' }}>{stat.icon}</div>
              <p style={{ fontFamily: 'Playfair Display', color: colors.terracotta, fontSize: '2rem', fontWeight: 800 }}>{stat.number}</p>
              <p style={{ color: colors.slate, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: '0.25rem' }}>{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Filter + Write Review button */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {['All', 'Country Eggs', 'Farm Eggs (Tray)', 'Premium Desi Eggs'].map(f => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setFilter(f)}
                className="px-4 py-2 rounded-full text-sm font-semibold transition-all border"
                style={{
                  background: filter === f ? `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})` : colors.buttermilk,
                  color: filter === f ? colors.buttermilk : colors.brown,
                  borderColor: filter === f ? colors.terracotta : colors.sand,
                }}>
                {f}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: `0 8px 25px ${colors.sage}44` }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowForm(!showForm)}
            className="px-6 py-2 rounded-full text-sm font-bold transition-all"
            style={{ background: `linear-gradient(135deg, ${colors.sage}, #7A9E5F)`, color: colors.buttermilk }}>
            {showForm ? '✕ Close' : '✍️ Write a Review'}
          </motion.button>
        </div>

        {/* Success message */}
        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl p-4 mb-6 text-center"
              style={{ background: '#F0FFF4', border: `1px solid ${colors.sage}44` }}>
              <p style={{ color: colors.sage, fontWeight: 700 }}>🎉 Thank you! Your review has been posted!</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -20 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl p-6 border mb-8 overflow-hidden"
              style={{ background: colors.buttermilk, borderColor: colors.sand, boxShadow: `0 8px 32px ${colors.terracotta}10` }}>

              <h3 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                Share Your Experience ✍️
              </h3>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Name *</label>
                    <input
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Enter your name"
                      style={inputStyle('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Area *</label>
                    <input
                      value={form.area}
                      onChange={e => setForm({ ...form, area: e.target.value })}
                      placeholder="e.g. Nellore, Gudur"
                      style={inputStyle('area')}
                      onFocus={() => setFocused('area')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Product *</label>
                  <select
                    value={form.product}
                    onChange={e => setForm({ ...form, product: e.target.value })}
                    style={{ ...inputStyle('product'), cursor: 'pointer' }}>
                    <option>Country Eggs</option>
                    <option>Farm Eggs (Tray)</option>
                    <option>Premium Desi Eggs</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>Your Rating *</label>
                  <StarRating value={form.stars} onChange={stars => setForm({ ...form, stars })} />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Your Review *</label>
                  <textarea
                    value={form.review}
                    onChange={e => setForm({ ...form, review: e.target.value })}
                    placeholder="Tell us about your experience with our eggs..."
                    rows={4}
                    style={{ ...inputStyle('review'), resize: 'none' }}
                    onFocus={() => setFocused('review')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <motion.button
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02, boxShadow: `0 8px 25px ${colors.terracotta}44` }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full py-4 rounded-2xl text-lg font-bold tracking-wide transition-all"
                  style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk }}>
                  Submit Review →
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((review, i) => (
            <ReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-16">
            <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🥚</p>
            <p style={{ color: colors.slate, fontSize: '1rem' }}>No reviews for this product yet. Be the first!</p>
          </div>
        )}

      </div>
    </div>
  )
}