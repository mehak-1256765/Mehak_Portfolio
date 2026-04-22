import { useRef, useState, useEffect } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Globe, Car, Sparkles, Zap, BarChart2, FlaskConical, Bot, ScanSearch, X, Play, Lock, Heart, LucideIcon } from 'lucide-react'
import { FlyUp, ClipReveal, FadeIn } from './Animate'

const PROJECTS: {
  title: string; sub: string; icon: LucideIcon; color: string
  desc: string; tech: string[]; tags: string[]; url: string | null; video?: string
}[] = [
  { title: 'OneUp Hosting',    sub: 'Modern Hosting Website',    icon: Globe,        color: '#6366f1',
    desc: 'Full frontend for a production hosting platform with domain search, 3D visuals, and animated checkout.',
    tech: ['React.js','Three.js','Tailwind','Framer Motion'], tags: ['SEO 75→100%','Perf 70→90%','Freelance'], url: 'https://oneup-hosting.com/' },
  { title: 'SpecArs',          sub: 'Car Modification Platform', icon: Car,          color: '#fb7185',
    desc: 'Real-time Firebase inventory, config builder, and smooth UI animations for a car mod platform.',
    tech: ['React.js','Firebase','Tailwind','Vite'], tags: ['Real-time DB','Custom Config','Freelance'], url: 'https://specarts.vercel.app/' },
  { title: 'GALAXO',           sub: 'Galaxy Learning Web App',   icon: Sparkles,     color: '#22d3ee',
    desc: 'Space ed-tech with animated 3D models, galaxy backgrounds, and educational content.',
    tech: ['React.js','Three.js','GSAP','Tailwind'], tags: ['3D Models','Scroll Animations'], url: 'https://galaxo.vercel.app/' },
  { title: 'Moqbilin',         sub: 'Wedding Matchmaking Platform', icon: Heart,       color: '#fb7185',
    desc: 'Freelance frontend for a wedding matchmaking platform with clean UI, smooth UX, and responsive design built for a client.',
    tech: ['React.js','Tailwind','Framer Motion','Vite'], tags: ['Freelance','Client Work'], url: 'https://www.moqbilin.com/' },
  { title: 'AI Daily Digest',  sub: 'n8n Morning Briefing Bot',  icon: Bot,          color: '#f472b6',
    desc: 'Automated 7 AM email digest with unread Gmail, AI-summarised news, calendar events and daily tips. One email. Everything you need.',
    tech: ['n8n','Mistral AI','Gmail API','Google Calendar','RSS'], tags: ['< $0.01/day','7AM Autopilot'],
    url: null, video: '/ai-digest-automation.mp4' },
  { title: 'Sales Automation', sub: 'n8n Workflow Engine',       icon: Zap,          color: '#fb923c',
    desc: 'End-to-end salesperson automation with email outreach, risk alerts, and AI-powered insights.',
    tech: ['n8n','REST APIs','AI/LLM Nodes','Email'], tags: ['60% Less Manual','AI Insights'], url: null },
  { title: 'Retail Analytics', sub: 'Decision-Support Platform', icon: BarChart2,    color: '#34d399',
    desc: 'Inventory tracking, sales forecasting and segmentation with automated recommendations.',
    tech: ['React.js','Python','FastAPI'], tags: ['Auto Recs','Festival Alerts'], url: null },
  { title: 'OptBinning',       sub: 'ML Data Engineering',       icon: FlaskConical, color: '#fbbf24',
    desc: 'ML pipelines with OptBinning integration, interactive binning visualisations and scorecards.',
    tech: ['Python','FastAPI','React.js','Pandas'], tags: ['ML Pipeline','Scorecards'], url: null },
  { title: 'Data Extraction',  sub: 'Document Extraction Tool',  icon: ScanSearch,   color: '#818cf8',
    desc: 'Enhanced an existing document extraction tool to support multiple project types, improving flexibility and accuracy across different use cases.',
    tech: ['Python','FastAPI','LLMs','Pandas'], tags: ['Multi-Project','Enhanced'], url: null },
]

/* ── Video lightbox ── */
function VideoModal({ src, title, onClose }: { src: string; title: string; onClose: () => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', h); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-10"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <motion.div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
        onClick={onClose}
      />
      <motion.div
        className="relative z-10 w-full max-w-4xl"
        initial={{ scale: 0.88, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 40 }}
        transition={{ type: 'spring', stiffness: 240, damping: 26 }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 px-1">
          <p className="text-white/50 text-sm tracking-wide serif italic">{title}</p>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
            className="rounded-full p-2 text-white/50 hover:text-white transition-colors"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}
          >
            <X size={14} />
          </motion.button>
        </div>
        <div className="rounded-2xl overflow-hidden aspect-video"
          style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 40px 80px rgba(0,0,0,0.7)' }}>
          <video src={src} className="w-full h-full object-cover" controls autoPlay playsInline />
        </div>
        <p className="text-center text-white/25 text-xs mt-4 tracking-widest">Press ESC or click outside to close</p>
      </motion.div>
    </motion.div>
  )
}

/* ── Project card ── */
function ProjectCard({ p, i, onVideoClick }: {
  p: typeof PROJECTS[0]
  i: number
  onVideoClick: (video: string, title: string) => void
}) {
  const ref    = useRef<HTMLDivElement>(null)
  const col    = i % 3
  const num    = String(i + 1).padStart(2, '0')

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center 70%'] })
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 })

  const xOffset    = col === 0 ? -55 : col === 2 ? 55 : 0
  const rotateFrom = col === 0 ? -8  : col === 2 ? 8  : 0

  const y       = useTransform(smooth, [0, 1], [90, 0])
  const x       = useTransform(smooth, [0, 1], [xOffset, 0])
  const rotate  = useTransform(smooth, [0, 1], [rotateFrom, 0])
  const opacity = useTransform(smooth, [0, 0.35, 1], [0, 0.6, 1])
  const scale   = useTransform(smooth, [0, 1], [0.85, 1])

  const hasUrl   = !!p.url
  const hasVideo = !!p.video
  const isPrivate = !hasUrl && !hasVideo

  return (
    <motion.div
      ref={ref}
      style={{
        y, x, rotate, opacity, scale,
        transformOrigin: col === 0 ? 'left bottom' : col === 2 ? 'right bottom' : 'center bottom',
      }}
      className="group relative rounded-3xl flex flex-col overflow-hidden"
    >
      {/* Card glass base */}
      <div
        className="absolute inset-0 rounded-3xl transition-all duration-500 group-hover:border-white/[0.15]"
        style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(16px)',
        }}
      />

      {/* Hover colour glow — fills from top-left */}
      <motion.div
        className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at 20% 20%, ${p.color}22 0%, transparent 65%)` }}
      />

      {/* Animated bottom border on hover */}
      <div
        className="absolute bottom-0 left-6 right-6 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full"
        style={{ background: `linear-gradient(90deg, transparent, ${p.color}80, transparent)` }}
      />

      {/* Content */}
      <div className="relative z-10 p-7 flex flex-col flex-1">

        {/* Top row — icon + number */}
        <div className="flex items-start justify-between mb-6">
          <motion.div
            className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${p.color}14`, border: `1px solid ${p.color}30` }}
            whileHover={{ scale: 1.1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <p.icon size={21} style={{ color: p.color }} strokeWidth={1.5} />
          </motion.div>

          <span
            className="serif italic text-white/15 group-hover:text-white/25 transition-colors duration-300"
            style={{ fontSize: '2rem', lineHeight: 1 }}
          >
            {num}
          </span>
        </div>

        {/* Title & subtitle */}
        <h3 className="serif text-white text-xl md:text-2xl tracking-tight leading-tight mb-1">
          {p.title}
        </h3>
        <span className="text-xs font-medium mb-4 tracking-wide" style={{ color: p.color }}>
          {p.sub}
        </span>

        {/* Description */}
        <p className="text-white/40 text-sm leading-relaxed mb-6 flex-1">{p.desc}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {p.tags.map(t => (
            <span
              key={t}
              className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-lg uppercase"
              style={{ background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}25` }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Tech pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {p.tech.map(t => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-md text-white/25"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}
            >
              {t}
            </span>
          ))}
        </div>

        {/* ── CTA — always at the bottom, always obvious ── */}
        {hasUrl && (
          <motion.a
            href={p.url!}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full rounded-2xl py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-300"
            style={{
              background: `${p.color}15`,
              border: `1px solid ${p.color}30`,
              color: p.color,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${p.color}25`
              ;(e.currentTarget as HTMLElement).style.borderColor = `${p.color}60`
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = `${p.color}15`
              ;(e.currentTarget as HTMLElement).style.borderColor = `${p.color}30`
            }}
          >
            View Live <ArrowUpRight size={13} />
          </motion.a>
        )}

        {hasVideo && !hasUrl && (
          <motion.button
            onClick={() => onVideoClick(p.video!, p.title)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 w-full rounded-2xl py-3 text-xs font-semibold tracking-wider uppercase transition-all duration-300"
            style={{
              background: `${p.color}15`,
              border: `1px solid ${p.color}30`,
              color: p.color,
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = `${p.color}25`
              ;(e.currentTarget as HTMLElement).style.borderColor = `${p.color}60`
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = `${p.color}15`
              ;(e.currentTarget as HTMLElement).style.borderColor = `${p.color}30`
            }}
          >
            <Play size={12} fill="currentColor" /> Watch Demo
          </motion.button>
        )}

        {isPrivate && (
          <div
            className="flex items-center justify-center gap-2 w-full rounded-2xl py-3 text-xs tracking-wider uppercase"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.2)',
            }}
          >
            <Lock size={11} /> Private Project
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ── Section ── */
export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })
  const [videoModal, setVideoModal] = useState<{ src: string; title: string } | null>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const featuredY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="projects" ref={sectionRef} className="relative pb-28 md:pb-40 overflow-hidden">
      <div className="absolute inset-0 section-layer" />

      <div className="relative z-10 px-6 pt-28 md:pt-40 pb-12 max-w-6xl mx-auto">

        {/* Heading */}
        <div ref={ref} className="mb-14">
          <FadeIn>
            <p className="text-white/40 text-xs tracking-[0.35em] uppercase mb-5">04 — The Work</p>
          </FadeIn>
          <ClipReveal delay={0.1}>
            <h2 className="serif text-white tracking-tight leading-none"
              style={{ fontSize: 'clamp(2.8rem,8vw,6rem)' }}>
              Projects <em className="italic text-white/30 text-[0.5em]">— 9 shipped</em>
            </h2>
          </ClipReveal>
        </div>

        {/* Featured banner */}
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="rounded-3xl overflow-hidden aspect-video relative mb-14 md:mb-20"
        >
          <motion.div className="w-full h-full" style={{ y: featuredY }}>
            <video
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4"
              className="w-full h-full object-cover scale-110"
              muted autoPlay loop playsInline preload="auto"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 flex flex-col md:flex-row items-end justify-between gap-6">
            <FlyUp delay={0.4}>
              <div className="rounded-2xl p-6 md:p-8 max-w-md"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)' }}>
                <p className="text-white/50 text-xs tracking-widest uppercase mb-3">Approach</p>
                <p className="text-white text-sm md:text-base leading-relaxed">
                  Every product I build starts with obsessing over the user experience — then engineering the cleanest path to get there.
                </p>
              </div>
            </FlyUp>
            <motion.a href="https://github.com/mehak-1256765" target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium flex-shrink-0">
              View GitHub ↗
            </motion.a>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard
              key={p.title}
              p={p}
              i={i}
              onVideoClick={(src, title) => setVideoModal({ src, title })}
            />
          ))}
        </div>
      </div>

      {/* Video lightbox */}
      <AnimatePresence>
        {videoModal && (
          <VideoModal
            src={videoModal.src}
            title={videoModal.title}
            onClose={() => setVideoModal(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
