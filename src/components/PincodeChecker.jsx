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

const deliverablePincodes = [
  '524001', '524002', '524003', '524004', '524005',
  '524101', '524102', '524103', '524104', '524105',
  '524121', '524122', '524123', '524124', '524125',
  '524126', '524127', '524128', '524129', '524130',
  '524131', '524132', '524133', '524134', '524135',
  '524136', '524137', '524138', '524139', '524140',
  '524141', '524142', '524143', '524144', '524145',
  '524146', '524147', '524148', '524149', '524150',
  '524151', '524152', '524153', '524154', '524155',
  '524201', '524202', '524203', '524204', '524205',
  '524206', '524207', '524208', '524209', '524210',
  '524211', '524212', '524213', '524214', '524215',
  '524216', '524217', '524218', '524219', '524220',
  '524221', '524222', '524223', '524224', '524225',
  '524226', '524227', '524228', '524229', '524230',
  '524231', '524232', '524233', '524234', '524235',
  '524236', '524237', '524238', '524239', '524240',
  '524301', '524302', '524303', '524304', '524305',
  '524306', '524307', '524308', '524309', '524310',
  '524311', '524312', '524313', '524314', '524315',
  '524316', '524317', '524318', '524319', '524320',
  '524321', '524322', '524323', '524324', '524325',
  '524326', '524327', '524328', '524329', '524330',
  '524331', '524332', '524333', '524334', '524335',
  '524336', '524337', '524338', '524339', '524340',
  '524341', '524342', '524343', '524344', '524345',
  '524346', '524347', '524348', '524349', '524350',
  '524401', '524402', '524403', '524404', '524405',
  '524406', '524407', '524408', '524409', '524410',
  '524411', '524412', '524413', '524414', '524415',
  '524416', '524417', '524418', '524419', '524420',
  '524421',
]

export default function PincodeChecker() {
  const [pincode, setPincode] = useState('')
  const [result, setResult] = useState(null)

  const checkPincode = () => {
    if (pincode.length !== 6) { alert('Please enter a valid 6-digit pincode!'); return }
    setResult(deliverablePincodes.includes(pincode) ? 'available' : 'unavailable')
  }

  return (
    <div className="rounded-3xl p-8 border text-center"
      style={{ background: colors.buttermilk, borderColor: colors.sand, boxShadow: `0 8px 32px ${colors.terracotta}12` }}>
      <p style={{ color: colors.terracotta, fontSize: '0.75rem', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 600 }}>
        Delivery Check
      </p>
      <h3 style={{ fontFamily: 'Playfair Display', color: colors.darkBrown, fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
        Do We Deliver to You?
      </h3>
      <p style={{ color: colors.slate, fontSize: '0.875rem', marginBottom: '1.5rem' }}>
        Enter your pincode to check delivery availability
      </p>

      <div className="flex gap-3 max-w-sm mx-auto">
        <input
          type="tel" maxLength={6} value={pincode}
          onChange={(e) => { setPincode(e.target.value); setResult(null) }}
          placeholder="Enter pincode"
          className="flex-1 px-4 py-3 rounded-xl text-center text-lg font-medium outline-none border transition-all"
          style={{ background: colors.cream, borderColor: colors.sand, color: colors.brown }}
          onFocus={e => e.target.style.borderColor = colors.terracotta}
          onBlur={e => e.target.style.borderColor = colors.sand}
        />
        <motion.button
          onClick={checkPincode}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 rounded-xl font-bold text-sm"
          style={{ background: `linear-gradient(135deg, ${colors.terracotta}, ${colors.terracottaLight})`, color: colors.buttermilk }}>
          Check
        </motion.button>
      </div>

      <AnimatePresence>
        {result === 'available' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-5 rounded-2xl p-4 border"
            style={{ background: '#F0FFF4', borderColor: '#4A7C5944' }}>
            <p className="font-bold text-lg" style={{ color: '#2D6A3F' }}>✅ We deliver to {pincode}!</p>
            <p className="text-sm mt-1" style={{ color: '#4A7C59' }}>Free delivery · Fresh eggs daily 🥚</p>
          </motion.div>
        )}
        {result === 'unavailable' && (
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="mt-5 rounded-2xl p-4 border"
            style={{ background: '#FFF5F5', borderColor: '#C4622D44' }}>
            <p className="font-bold text-lg" style={{ color: colors.terracotta }}>❌ Not available in {pincode} yet</p>
            <p className="text-sm mt-1" style={{ color: '#E8854A' }}>Contact us on WhatsApp — we're expanding soon!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}