import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PincodeChecker from '../components/PincodeChecker'
import WhatsAppButton from '../components/WhatsAppButton'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: 'easeOut' }
  })
}

const features = [
  { icon: '🌿', title: 'Pure Desi Breed', desc: 'Country hens raised naturally — no hormones, no artificial feed', color: '#4A7C59' },
  { icon: '🚚', title: 'Door Delivery', desc: 'Fresh eggs delivered straight to your home every single day', color: '#5B8DB8' },
  { icon: '💰', title: 'Farm Direct Price', desc: 'No middlemen — best price straight from our farm to you', color: '#C4622D' },
  { icon: '🥚', title: 'Harvested Daily', desc: 'Collected every morning, delivered within 24 hours', color: '#C4956A' },
  { icon: '🌾', title: 'Organic Feed', desc: 'Our hens eat natural grain, herbs and roam open pasture', color: '#7A9E5F' },
  { icon: '⭐', title: 'Trusted by 500+', desc: 'Happy families across Andhra Pradesh love our eggs', color: '#C4622D' },
]

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
  duckBlue: '#5B8DB8',
  slate: '#708090',
  forest: '#2D5A3D',
  barnRed: '#8B2020',
}

export default function Home() {
  return (
    <div style={{ background: colors.cream, color: colors.brown }} className="min-h-screen overflow-x-hidden">

      {/* Hero */}
      <div className="relative overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${colors.darkBrown} 0%, #3D2B1F 50%, #5C3D2E 100%)`, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>

        {/* Decorative circles */}
        <div className="absolute top-[-100px] right-[-100px] w-96 h-96 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${colors.terracotta}22 0%, transparent 70%)` }} />
        <div className="absolute bottom-[-80px] left-[-80px] w-80 h-80 rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${colors.yolk}15 0%, transparent 70%)` }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${colors.yolk}08 0%, transparent 60%)` }} />

        <div className="relative z-10 text-center px-6 py-24 max-w-4xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
            <span style={{ color: colors.yolk, border: `1px solid ${colors.yolk}44`, background: `${colors.yolk}11`, fontSize: '0.7rem', letterSpacing: '0.3em', textTransform: 'uppercase', padding: '0.4rem 1.2rem', borderRadius: '999px', fontWeight: 600 }}>
              🐔 Farm Fresh · Premium Quality · Andhra Pradesh
            </span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp} custom={1}
            style={{ fontFamily: 'Playfair Display', color: colors.buttermilk, fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 800, lineHeight: 1.1, marginTop: '2rem', marginBottom: '1rem' }}>
            Nature's Finest <br />
            <span style={{ color: colors.yolk }}>Desi Eggs</span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={2}
            style={{ color: '#C4956A', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
            100% Country Eggs — Straight from our farm to your doorstep
          </motion.p>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp} custom={3}
            style={{ color: `${colors.yolk}88`, fontSize: '0.9rem', marginBottom: '3rem' }}>
            Free delivery across Andhra Pradesh · Pay via PhonePe
          </motion.p>

          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={4}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 35px ${colors.terracotta}66` }}
                whileTap={{ scale: 0.97 }}
                style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk, borderRadius: '999px', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.03em' }}>
                Shop Now →
              </motion.button>
            </Link>
            <div className="w-60">
              <WhatsAppButton />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp} custom={5}
            className="flex flex-wrap justify-center gap-10 mt-20">
            {[
              { number: '500+', label: 'Happy Families' },
              { number: '10K+', label: 'Eggs Delivered' },
              { number: '100%', label: 'Farm Fresh' },
              { number: '24hr', label: 'Fast Delivery' },
            ].map((stat, i) => (
              <motion.div key={stat.label} className="text-center"
                whileHover={{ scale: 1.08 }}>
                <p style={{ fontFamily: 'Playfair Display', color: colors.yolk, fontSize: '2.2rem', fontWeight: 800 }}>{stat.number}</p>
                <p style={{ color: '#C4956A', fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '0.2rem' }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Wavy bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', height: '60px', width: '100%' }}>
            <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#F9F3E3" />
          </svg>
        </div>
      </div>

      {/* Pincode Checker */}
      <div className="max-w-2xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}>
          <PincodeChecker />
        </motion.div>
      </div>

      {/* Features */}
      <div style={{ background: colors.buttermilk }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14">
            <p style={{ color: colors.terracotta, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>Why Choose Us</p>
            <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '3rem', fontWeight: 800 }}>The Desi Difference</h2>
            <div style={{ width: '60px', height: '3px', background: `linear-gradient(to right, ${colors.terracotta}, ${colors.yolk})`, borderRadius: '2px', margin: '1rem auto 0' }} />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {features.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: `0 20px 40px ${item.color}22` }}
                className="rounded-2xl p-6 border transition-all cursor-default"
                style={{ background: colors.cream, borderColor: colors.sand }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: `${item.color}18` }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: 'Playfair Display', color: item.color, fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: colors.slate, fontSize: '0.875rem', lineHeight: 1.7 }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 px-6"
        style={{ background: `linear-gradient(135deg, ${colors.forest} 0%, ${colors.sage} 100%)` }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14">
          <p style={{ color: colors.yolk, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>Simple Process</p>
          <h2 style={{ fontFamily: 'Playfair Display', color: colors.buttermilk, fontSize: '3rem', fontWeight: 800 }}>How It Works</h2>
          <div style={{ width: '60px', height: '3px', background: `linear-gradient(to right, ${colors.yolk}, ${colors.terracottaLight})`, borderRadius: '2px', margin: '1rem auto 0' }} />
        </motion.div>

        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { step: '01', icon: '🛒', label: 'Pick Your Eggs' },
            { step: '02', icon: '📍', label: 'Enter Address' },
            { step: '03', icon: '💳', label: 'Pay via UPI' },
            { step: '04', icon: '🚚', label: 'Get Delivery' },
          ].map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="text-center p-6 rounded-2xl border transition-all"
              style={{ background: 'rgba(255,248,236,0.1)', borderColor: 'rgba(255,248,236,0.2)', backdropFilter: 'blur(8px)' }}>
              <p style={{ fontFamily: 'Playfair Display', color: colors.yolk, fontSize: '2rem', fontWeight: 800, opacity: 0.4 }}>{s.step}</p>
              <div className="text-4xl my-3">{s.icon}</div>
              <p style={{ color: colors.buttermilk, fontWeight: 600, fontSize: '0.9rem' }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20 px-6" style={{ background: colors.cream }}>
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14">
            <p style={{ color: colors.terracotta, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.75rem', fontWeight: 600 }}>Happy Customers</p>
            <h2 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '3rem', fontWeight: 800 }}>What They Say</h2>
            <div style={{ width: '60px', height: '3px', background: `linear-gradient(to right, ${colors.terracotta}, ${colors.yolk})`, borderRadius: '2px', margin: '1rem auto 0' }} />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Priya Lakshmi', area: 'Nellore', review: 'Best desi eggs I have ever tasted! The yolk is so rich and golden. Delivery is always on time.', stars: 5 },
              { name: 'Ravi Kumar', area: 'Gudur', review: 'My family switched to these eggs 3 months ago. The quality is outstanding and the price is fair!', stars: 5 },
              { name: 'Sunita Devi', area: 'Kavali', review: 'Fresh eggs every morning at my doorstep. Cannot ask for anything better. Highly recommended!', stars: 5 },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6, boxShadow: `0 20px 40px ${colors.terracotta}18` }}
                className="rounded-2xl p-6 border transition-all"
                style={{ background: colors.buttermilk, borderColor: colors.sand }}>
                <div className="flex mb-3">
                  {[...Array(t.stars)].map((_, j) => (
                    <span key={j} style={{ color: colors.yolk, fontSize: '1.1rem' }}>★</span>
                  ))}
                </div>
                <p style={{ color: colors.slate, fontSize: '0.9rem', lineHeight: 1.7, fontStyle: 'italic', marginBottom: '1rem' }}>"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                    style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})` }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p style={{ color: colors.darkBrown, fontWeight: 700, fontSize: '0.9rem' }}>{t.name}</p>
                    <p style={{ color: colors.slate, fontSize: '0.75rem' }}>{t.area}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative text-center py-24 px-6 overflow-hidden"
        style={{ background: `linear-gradient(160deg, ${colors.darkBrown} 0%, #3D2B1F 100%)` }}>
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(ellipse at center, ${colors.yolk}15 0%, transparent 65%)` }} />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative z-10">
          <p style={{ color: colors.yolk, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '1rem', fontWeight: 600 }}>Ready to Order?</p>
          <h2 style={{ fontFamily: 'Playfair Display', color: colors.buttermilk, fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, marginBottom: '1rem', lineHeight: 1.2 }}>
            Experience the <br /><span style={{ color: colors.yolk }}>Farm Difference</span>
          </h2>
          <p style={{ color: '#C4956A', marginBottom: '2.5rem', fontSize: '1rem' }}>
            Pay via PhonePe — Zero extra charges. Free delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: `0 0 35px ${colors.terracotta}66` }}
                whileTap={{ scale: 0.97 }}
                style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk, borderRadius: '999px', padding: '1rem 2.5rem', fontSize: '1.1rem', fontWeight: 700 }}>
                Browse Eggs →
              </motion.button>
            </Link>
            <div className="w-60">
              <WhatsAppButton />
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}