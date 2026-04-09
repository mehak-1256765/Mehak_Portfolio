import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, Mail, MapPin, Sparkles } from 'lucide-react'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260330_145725_08886141-ed95-4a8e-8d6d-b75eaadce638.mp4'

const ROLES = ['AI Application Engineer', 'Full Stack Developer', 'UI / UX Craftsperson']

export default function HireMeModal({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop — blur only, barely dark so focus stays on modal */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'rgba(0,0,0,0.55)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
            onClick={onClose}
          />

          {/* Card */}
          <motion.div
            initial={{ y: 70, opacity: 0, scale: 0.93 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 70, opacity: 0, scale: 0.93 }}
            transition={{ type: 'spring', stiffness: 230, damping: 28, mass: 0.8 }}
            onClick={e => e.stopPropagation()}
            className="relative z-10 w-full max-w-2xl rounded-3xl overflow-hidden"
            style={{ minHeight: 460 }}
          >
            {/* ── VIDEO — fills the entire card, nothing covering it at the top ── */}
            <video
              src={VIDEO_URL}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ zIndex: 0 }}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />

            {/* ── very thin bottom scrim — only for text legibility, nothing more ── */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                zIndex: 1,
                background:
                  'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.30) 45%, rgba(0,0,0,0.08) 100%)',
              }}
            />

            {/* ── top-right glow accent ── */}
            <div
              className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
              style={{
                zIndex: 2,
                background:
                  'radial-gradient(ellipse at top right, rgba(139,92,246,0.25) 0%, transparent 65%)',
              }}
            />

            {/* ── Close ── */}
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="absolute top-5 right-5 rounded-full p-2.5 text-white/70 hover:text-white transition-colors"
              style={{
                zIndex: 10,
                background: 'rgba(0,0,0,0.35)',
                border: '1px solid rgba(255,255,255,0.18)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <X size={14} />
            </motion.button>

            {/* ── Content — sits at the bottom on top of scrim ── */}
            <div className="relative flex flex-col justify-end p-8 md:p-10" style={{ zIndex: 3, minHeight: 460 }}>

              {/* Available badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2.5 mb-6"
              >
                <div
                  className="flex items-center gap-2 rounded-full px-3.5 py-1.5"
                  style={{
                    background: 'rgba(0,0,0,0.40)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <motion.span
                    animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.45, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="block w-1.5 h-1.5 rounded-full bg-emerald-400"
                  />
                  <span className="text-white/85 text-xs tracking-wider font-medium">Open to opportunities</span>
                </div>
                <Sparkles size={13} className="text-yellow-300/80" />
              </motion.div>

              {/* Headline */}
              <div className="overflow-hidden pb-2 mb-4">
                <motion.h2
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.22, duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
                  className="serif text-white leading-[0.9] tracking-tight"
                  style={{ fontSize: 'clamp(2.6rem, 7vw, 4rem)', textShadow: '0 2px 20px rgba(0,0,0,0.6)' }}
                >
                  Let's create
                  <br />
                  <em className="italic" style={{ color: 'rgba(255,255,255,0.65)' }}>something great.</em>
                </motion.h2>
              </div>

              {/* Role pills */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap gap-2 mb-6"
              >
                {ROLES.map((role, i) => (
                  <motion.span
                    key={role}
                    initial={{ opacity: 0, scale: 0.82 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.45 + i * 0.08, type: 'spring', stiffness: 280, damping: 20 }}
                    className="text-xs px-3 py-1.5 rounded-full text-white/70"
                    style={{
                      background: 'rgba(0,0,0,0.40)',
                      border: '1px solid rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {role}
                  </motion.span>
                ))}
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="flex items-center gap-1.5 text-white/45 text-xs mb-5"
              >
                <MapPin size={11} />
                <span>Bangalore · Chandigarh · Pune · Remote · Open to Relocation (DE · UK · EU)</span>
              </motion.div>

              {/* Divider */}
              <div className="h-px mb-5" style={{ background: 'rgba(255,255,255,0.12)' }} />

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <motion.a
                  href="https://wa.me/916280309346?text=Hi%20Mehak%2C%20I%27d%20love%20to%20hire%20you!"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-semibold text-black flex-1"
                  style={{ background: 'rgba(255,255,255,0.95)' }}
                >
                  <MessageCircle size={15} />
                  Chat on WhatsApp
                </motion.a>
                <motion.a
                  href="mailto:mehakmanhas19@gmail.com"
                  whileHover={{ scale: 1.04, y: -3 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center justify-center gap-2.5 rounded-full px-8 py-4 text-sm font-medium text-white flex-1"
                  style={{
                    background: 'rgba(0,0,0,0.35)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <Mail size={15} />
                  Send an Email
                </motion.a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
