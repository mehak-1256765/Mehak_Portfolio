import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { Mail, Phone, Github, Linkedin, ArrowUpRight, Send, CheckCircle } from 'lucide-react'

const LINKS = [
  { icon: Mail,     label: 'Email',    value: 'mehakmanhas19@gmail.com', href: 'mailto:mehakmanhas19@gmail.com' },
  { icon: Phone,    label: 'Phone',    value: '+91 6280309346',          href: 'tel:+916280309346' },
  { icon: Github,   label: 'GitHub',   value: 'github.com/mehak-1256765', href: 'https://github.com/mehak-1256765' },
  { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/mehak-thakur-8594791aa', href: 'https://linkedin.com/in/mehak-thakur-8594791aa' },
]

const WORDS = ["Let's", 'Build', 'Something', 'Together.']

type FormState = { name: string; email: string; message: string }
type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactSection() {
  const sectionRef = useRef(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-100px' })
  const [form, setForm]     = useState<FormState>({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<Status>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await fetch('https://formsubmit.co/ajax/mehakmanhas19@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _captcha: 'false' }),
      })
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }) }
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="contact" ref={sectionRef} className="relative overflow-hidden">
      {/* Thin base overlay — just enough for text legibility */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.45)' }} />

      {/* Parallax video bg */}
      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4"
          muted autoPlay loop playsInline preload="auto"
          className="w-full h-full object-cover opacity-[0.40]"
        />
      </motion.div>

      <div ref={ref} className="relative z-10 max-w-5xl mx-auto px-6 pt-28 md:pt-40 pb-20">

        {/* Chapter label */}
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-white/50 text-xs tracking-[0.35em] uppercase mb-8"
        >
          07 — Get In Touch
        </motion.p>

        {/* Heading */}
        <div className="mb-14 md:mb-20 overflow-hidden pb-3">
          <h2 className="serif text-white tracking-tight leading-none"
            style={{ fontSize: 'clamp(3rem,9vw,7rem)' }}>
            {WORDS.map((word, i) => (
              <motion.span
                key={i}
                className={`inline-block mr-[0.18em] ${i >= 2 ? 'text-white/60 italic' : 'text-white'}`}
                initial={{ y: 80, opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 + i * 0.1 }}
              >
                {word}
              </motion.span>
            ))}
          </h2>
        </div>

        {/* Contact form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="rounded-3xl p-8 md:p-10 mb-8"
          style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="flex flex-col gap-2">
              <label className="text-white/40 text-xs tracking-widest uppercase">Name</label>
              <input
                required
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className="rounded-xl px-4 py-3 text-white text-sm outline-none placeholder:text-white/20 transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-white/40 text-xs tracking-widest uppercase">Email</label>
              <input
                required
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="rounded-xl px-4 py-3 text-white text-sm outline-none placeholder:text-white/20 transition-colors"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-white/40 text-xs tracking-widest uppercase">Message</label>
            <textarea
              required
              rows={4}
              placeholder="Tell me about your project..."
              value={form.message}
              onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
              className="rounded-xl px-4 py-3 text-white text-sm outline-none placeholder:text-white/20 resize-none transition-colors"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
              onFocus={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
              onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}
            />
          </div>
          <div className="flex items-center gap-4">
            <motion.button
              type="submit"
              disabled={status === 'sending' || status === 'sent'}
              whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 bg-white text-black rounded-full px-8 py-3 text-sm font-semibold disabled:opacity-50"
            >
              {status === 'sending' ? 'Sending…' : <><Send size={14} /> Send Message</>}
            </motion.button>
            <AnimatePresence>
              {status === 'sent' && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-emerald-400 text-sm"
                >
                  <CheckCircle size={15} /> Message sent!
                </motion.span>
              )}
              {status === 'error' && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                  className="text-red-400 text-sm"
                >
                  Something went wrong — try emailing directly.
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.form>

        {/* Contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {LINKS.map(({ icon: Icon, label, value, href }, i) => (
            <motion.a
              key={label} href={href} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -5, scale: 1.01 }}
              className="group flex items-center justify-between p-6 rounded-2xl transition-colors"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="rounded-xl p-3 text-white/70 group-hover:text-white transition-colors"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-white/50 text-xs tracking-widest uppercase mb-1">{label}</p>
                  <p className="text-white/85 text-sm group-hover:text-white transition-colors font-medium">{value}</p>
                </div>
              </div>
              <ArrowUpRight size={16} className="text-white/40 group-hover:text-white transition-colors flex-shrink-0" />
            </motion.a>
          ))}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.85 }}
          className="flex flex-col md:flex-row gap-4 items-start md:items-center"
        >
          <motion.a
            href="https://wa.me/916280309346?text=Hi%20Mehak%2C%20I%27d%20love%20to%20start%20a%20conversation!"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.96 }}
            className="text-center bg-white text-black rounded-full px-10 py-4 text-sm font-semibold"
          >
            Start a Conversation
          </motion.a>
          <p className="text-white/65 text-sm">
            Open to &nbsp;Chandigarh &nbsp;·&nbsp; Bangalore &nbsp;·&nbsp; Pune &nbsp;·&nbsp; Remote &nbsp;·&nbsp; Germany &nbsp;·&nbsp; UK &nbsp;·&nbsp; EU
          </p>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="relative z-10 border-t border-white/10 py-8 text-center">
        <p className="text-white/45 text-xs tracking-widest">
          Designed &amp; Built by <span className="text-white/70 font-medium">Mehak</span> · 2026
        </p>
      </div>
    </section>
  )
}
