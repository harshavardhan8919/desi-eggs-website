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
  duckBlue: '#5B8DB8',
}

const plans = [
  {
    id: 1,
    name: 'Daily Fresh',
    emoji: '🌅',
    frequency: 'Every Day',
    color: colors.sage,
    badge: 'Most Popular',
    description: 'Fresh eggs delivered to your door every single morning',
    options: [
      { eggs: 6, price: 65, saving: 7 },
      { eggs: 12, price: 125, saving: 19 },
    ],
    perks: ['Delivered before 8 AM', 'Skip any day anytime', 'Free on festivals', 'Priority support'],
  },
  {
    id: 2,
    name: 'Weekly Box',
    emoji: '📦',
    frequency: 'Every Week',
    color: colors.terracotta,
    badge: 'Best Value',
    description: 'A big box of fresh eggs delivered once every week',
    options: [
      { eggs: 30, price: 250, saving: 20 },
      { eggs: 60, price: 480, saving: 60 },
    ],
    perks: ['Delivered every Monday', 'Flexible quantity', '5% discount always', 'Free delivery'],
  },
  {
    id: 3,
    name: 'Alternate Days',
    emoji: '🔄',
    frequency: 'Every 2 Days',
    color: colors.duckBlue,
    badge: 'Flexible',
    description: 'Perfect balance — fresh eggs every alternate day',
    options: [
      { eggs: 6, price: 62, saving: 10 },
      { eggs: 12, price: 118, saving: 26 },
    ],
    perks: ['Delivered every 2 days', 'Pause anytime', 'Consistent freshness', 'SMS reminders'],
  },
]

const faqs = [
  { q: 'How do I cancel my subscription?', a: 'You can cancel anytime by sending a WhatsApp message. No questions asked, no cancellation fee.' },
  { q: 'Can I skip a delivery?', a: 'Yes! Just message us on WhatsApp before 8 PM the previous day and we will skip your delivery.' },
  { q: 'What if I am not home?', a: 'We will leave the eggs safely at your door or with your neighbor as per your preference.' },
  { q: 'How do I pay for subscription?', a: 'Pay weekly or monthly via PhonePe UPI — same as regular orders. No extra charges.' },
  { q: 'Can I change my plan?', a: 'Absolutely! You can upgrade, downgrade or change frequency anytime via WhatsApp.' },
]

export default function Subscription() {
  const [selected, setSelected] = useState(null)
  const [selectedOption, setSelectedOption] = useState({})
  const [openFaq, setOpenFaq] = useState(null)
  const [showSuccess, setShowSuccess] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', address: '', pincode: '' })
  const [focused, setFocused] = useState(null)
  const [step, setStep] = useState(1)

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

  const handleSelectPlan = (plan, option) => {
    setSelected(plan)
    setSelectedOption(option)
    setStep(2)
    setTimeout(() => {
      document.getElementById('signup-form')?.scrollIntoView({ behavior: 'smooth' })
    }, 300)
  }

  const handleSubmit = () => {
    if (!form.name || !form.phone || !form.address || !form.pincode) {
      alert('Please fill all fields!')
      return
    }
    if (form.phone.length !== 10) {
      alert('Please enter a valid 10-digit phone number!')
      return
    }
    setShowSuccess(true)
    setStep(3)
  }

  const whatsappMessage = selected ? `🥚 *Subscription Request — Desi Eggs*\n\nPlan: ${selected.name} (${selected.frequency})\nQuantity: ${selectedOption.eggs} eggs/delivery\nPrice: ₹${selectedOption.price}/delivery\n\nName: ${form.name}\nPhone: ${form.phone}\nAddress: ${form.address}\nPincode: ${form.pincode}\n\nPlease activate my subscription!` : ''

  return (
    <div className="min-h-screen" style={{ background: colors.cream }}>

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
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>🥚</motion.span>
        <motion.span className="absolute bottom-8 right-20 text-2xl opacity-20"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>🌅</motion.span>

        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ color: colors.yolk, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>
          Never Run Out of Eggs
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: 'Playfair Display', color: colors.buttermilk, fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800 }}>
          Subscribe & Save 🥚
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          style={{ color: '#C4956A', marginTop: '0.5rem', fontSize: '1rem' }}>
          Fresh eggs at your door automatically — save up to 10% every delivery
        </motion.p>

        {/* Benefits strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-wrap justify-center gap-6 mt-10">
          {['💰 Save up to 10%', '🚚 Free delivery always', '⏸️ Pause anytime', '📱 Manage via WhatsApp'].map((b, i) => (
            <span key={i} style={{ color: colors.sand, fontSize: '0.85rem', fontWeight: 500 }}>{b}</span>
          ))}
        </motion.div>

        {/* Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 50" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none"
            style={{ display: 'block', height: '50px', width: '100%' }}>
            <path d="M0,25 C360,50 1080,0 1440,25 L1440,50 L0,50 Z" fill={colors.cream} />
          </svg>
        </div>
      </div>

      {/* Step indicator */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-10">
        <div className="flex items-center justify-center gap-4 mb-10">
          {[
            { n: 1, label: 'Choose Plan' },
            { n: 2, label: 'Your Details' },
            { n: 3, label: 'Confirmed!' },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                  style={{
                    background: step >= s.n ? `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})` : colors.sand,
                    color: step >= s.n ? colors.buttermilk : colors.slate,
                  }}>
                  {step > s.n ? '✓' : s.n}
                </div>
                <span style={{ fontSize: '0.8rem', color: step >= s.n ? colors.terracotta : colors.slate, fontWeight: step >= s.n ? 600 : 400 }}>
                  {s.label}
                </span>
              </div>
              {i < 2 && <div style={{ width: '40px', height: '1px', background: step > s.n ? colors.terracotta : colors.sand }} />}
            </div>
          ))}
        </div>
      </div>

      {/* Plans */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10">
          <p style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '2rem', fontWeight: 700 }}>
            Choose Your Plan
          </p>
          <p style={{ color: colors.slate, fontSize: '0.9rem', marginTop: '0.5rem' }}>
            Select a plan and pack size that suits your family
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -8, boxShadow: `0 24px 48px ${plan.color}25` }}
              className="rounded-3xl p-6 border relative transition-all"
              style={{
                background: colors.buttermilk,
                borderColor: selected?.id === plan.id ? plan.color : colors.sand,
                borderWidth: selected?.id === plan.id ? '2px' : '1px',
              }}>

              {/* Badge */}
              <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full"
                style={{ background: `${plan.color}18`, color: plan.color, border: `1px solid ${plan.color}44` }}>
                {plan.badge}
              </div>

              {/* Top color bar */}
              <div className="h-1 rounded-full mb-5"
                style={{ background: `linear-gradient(to right, ${plan.color}, ${colors.yolk})` }} />

              <div className="text-5xl text-center mb-3">{plan.emoji}</div>
              <h3 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.4rem', fontWeight: 700, textAlign: 'center', marginBottom: '0.25rem' }}>
                {plan.name}
              </h3>
              <p style={{ color: plan.color, fontSize: '0.8rem', fontWeight: 600, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
                {plan.frequency}
              </p>
              <p style={{ color: colors.slate, fontSize: '0.85rem', textAlign: 'center', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                {plan.description}
              </p>

              {/* Perks */}
              <div className="flex flex-col gap-2 mb-5">
                {plan.perks.map(perk => (
                  <div key={perk} className="flex items-center gap-2">
                    <span style={{ color: plan.color, fontSize: '0.85rem' }}>✓</span>
                    <span style={{ color: colors.brown, fontSize: '0.82rem' }}>{perk}</span>
                  </div>
                ))}
              </div>

              {/* Pack options */}
              <div className="flex flex-col gap-2">
                {plan.options.map(opt => (
                  <motion.button
                    key={opt.eggs}
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleSelectPlan(plan, opt)}
                    className="rounded-xl py-3 px-4 border text-left transition-all"
                    style={{
                      background: selected?.id === plan.id && selectedOption?.eggs === opt.eggs ? `${plan.color}15` : colors.cream,
                      borderColor: selected?.id === plan.id && selectedOption?.eggs === opt.eggs ? plan.color : colors.sand,
                    }}>
                    <div className="flex justify-between items-center">
                      <div>
                        <p style={{ color: colors.brown, fontWeight: 600, fontSize: '0.9rem' }}>{opt.eggs} eggs / delivery</p>
                        <p style={{ color: colors.sage, fontSize: '0.75rem' }}>Save ₹{opt.saving} vs regular price</p>
                      </div>
                      <div className="text-right">
                        <p style={{ color: plan.color, fontWeight: 800, fontSize: '1.1rem' }}>₹{opt.price}</p>
                        <p style={{ color: colors.slate, fontSize: '0.7rem' }}>per delivery</p>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Signup Form */}
        <AnimatePresence>
          {selected && step === 2 && (
            <motion.div
              id="signup-form"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-3xl p-6 border mb-8"
              style={{ background: colors.buttermilk, borderColor: colors.sand, boxShadow: `0 8px 32px ${colors.terracotta}10` }}>

              {/* Selected plan summary */}
              <div className="rounded-2xl p-4 mb-6 flex items-center justify-between"
                style={{ background: `${selected.color}10`, border: `1px solid ${selected.color}33` }}>
                <div>
                  <p style={{ fontWeight: 700, color: selected.color }}>{selected.emoji} {selected.name}</p>
                  <p style={{ color: colors.slate, fontSize: '0.85rem' }}>{selectedOption.eggs} eggs · {selected.frequency}</p>
                </div>
                <div className="text-right">
                  <p style={{ fontFamily: 'Playfair Display', color: selected.color, fontSize: '1.5rem', fontWeight: 800 }}>₹{selectedOption.price}</p>
                  <p style={{ color: colors.slate, fontSize: '0.75rem' }}>per delivery</p>
                </div>
              </div>

              <h3 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.25rem' }}>
                📍 Your Delivery Details
              </h3>

              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Name *</label>
                    <input
                      value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your name"
                      style={inputStyle('name')}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Phone Number *</label>
                    <input
                      value={form.phone}
                      onChange={e => setForm({ ...form, phone: e.target.value })}
                      placeholder="10-digit number"
                      maxLength={10} type="tel"
                      style={inputStyle('phone')}
                      onFocus={() => setFocused('phone')}
                      onBlur={() => setFocused(null)}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Full Address *</label>
                  <textarea
                    value={form.address}
                    onChange={e => setForm({ ...form, address: e.target.value })}
                    placeholder="House no, Street, Area, City"
                    rows={3}
                    style={{ ...inputStyle('address'), resize: 'none' }}
                    onFocus={() => setFocused('address')}
                    onBlur={() => setFocused(null)}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: colors.slate, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Pincode *</label>
                  <input
                    value={form.pincode}
                    onChange={e => setForm({ ...form, pincode: e.target.value })}
                    placeholder="6-digit pincode"
                    maxLength={6} type="tel"
                    style={inputStyle('pincode')}
                    onFocus={() => setFocused('pincode')}
                    onBlur={() => setFocused(null)}
                  />
                </div>
              </div>

              <motion.button
                onClick={handleSubmit}
                whileHover={{ scale: 1.02, boxShadow: `0 8px 25px ${colors.terracotta}44` }}
                whileTap={{ scale: 0.97 }}
                className="w-full mt-6 py-4 rounded-2xl text-lg font-bold tracking-wide transition-all"
                style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk }}>
                Activate Subscription →
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-8 border mb-8 text-center"
              style={{ background: colors.buttermilk, borderColor: colors.sand, boxShadow: `0 8px 32px ${colors.sage}20` }}>

              <motion.div
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                style={{ fontSize: '4rem', marginBottom: '1rem' }}>
                🎉
              </motion.div>

              <h2 style={{ fontFamily: 'Playfair Display', color: colors.sage, fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                Subscription Requested!
              </h2>
              <p style={{ color: colors.slate, marginBottom: '1.5rem', lineHeight: 1.7 }}>
                Thank you <strong style={{ color: colors.brown }}>{form.name}</strong>! We'll call you on <strong style={{ color: colors.brown }}>{form.phone}</strong> within 2 hours to confirm your <strong style={{ color: selected?.color }}>{selected?.name}</strong> subscription.
              </p>

              <div className="rounded-2xl p-4 mb-6 text-left"
                style={{ background: colors.cream, border: `1px solid ${colors.sand}` }}>
                <p style={{ fontWeight: 700, color: selected?.color, marginBottom: '0.5rem' }}>
                  {selected?.emoji} {selected?.name} — {selected?.frequency}
                </p>
                <p style={{ color: colors.brown, fontSize: '0.9rem' }}>{selectedOption.eggs} eggs per delivery</p>
                <p style={{ color: colors.terracotta, fontWeight: 700, fontSize: '1.1rem' }}>₹{selectedOption.price} per delivery</p>
                <p style={{ color: colors.sage, fontSize: '0.8rem', marginTop: '0.25rem' }}>You save ₹{selectedOption.saving} vs regular price!</p>
              </div>

              <p style={{ color: colors.slate, fontSize: '0.85rem', marginBottom: '1.5rem' }}>
                Or confirm right now via WhatsApp — we'll activate your plan instantly!
              </p>

              <WhatsAppButton
                cart={[]}
                total={selectedOption.price}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <div className="text-center mb-8">
            <p style={{ color: colors.terracotta, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>Got Questions?</p>
            <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '2rem', fontWeight: 700 }}>
              Frequently Asked
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border overflow-hidden"
                style={{ background: colors.buttermilk, borderColor: colors.sand }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full px-6 py-4 text-left flex justify-between items-center"
                  style={{ color: colors.brown }}>
                  <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{faq.q}</span>
                  <motion.span
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ color: colors.terracotta, fontSize: '1.2rem', flexShrink: 0 }}>
                    ▼
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      style={{ overflow: 'hidden' }}>
                      <p className="px-6 pb-4" style={{ color: colors.slate, fontSize: '0.9rem', lineHeight: 1.7 }}>
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}