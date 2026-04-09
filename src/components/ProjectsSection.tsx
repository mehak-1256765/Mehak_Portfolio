import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, useSpring } from 'framer-motion'
import { ArrowUpRight, Globe, Car, Sparkles, Zap, BarChart2, FlaskConical, Bot, ScanSearch, LucideIcon } from 'lucide-react'
import { FlyUp, ClipReveal, FadeIn } from './Animate'

const PROJECTS: {
  title: string; sub: string; icon: LucideIcon; color: string
  desc: string; tech: string[]; tags: string[]; url: string | null
}[] = [
  { title: 'OneUp Hosting',    sub: 'Modern Hosting Website',    icon: Globe,        color: '#6366f1',
    desc: 'Full frontend for a production hosting platform — domain search, 3D visuals, animated checkout.',
    tech: ['React.js','Three.js','Tailwind','Framer Motion'], tags: ['SEO 75→100%','Perf 70→90%'], url: 'https://oneup-hosting.com/' },
  { title: 'SpecArs',          sub: 'Car Modification Platform', icon: Car,          color: '#fb7185',
    desc: 'Real-time Firebase inventory, config builder, and smooth UI animations for a car mod platform.',
    tech: ['React.js','Firebase','Tailwind','Vite'], tags: ['Real-time DB','Custom Config'], url: 'https://specarts.vercel.app/' },
  { title: 'GALAXO',           sub: 'Galaxy Learning Web App',   icon: Sparkles,     color: '#22d3ee',
    desc: 'Space ed-tech with animated 3D models, galaxy backgrounds, and educational content.',
    tech: ['React.js','Three.js','GSAP','Tailwind'], tags: ['3D Models','Scroll Animations'], url: 'https://galaxo.vercel.app/' },
  { title: 'Sales Automation', sub: 'n8n Workflow Engine',       icon: Zap,          color: '#fb923c',
    desc: 'End-to-end salesperson automation — email outreach, risk alerts, AI-powered insights.',
    tech: ['n8n','REST APIs','AI/LLM Nodes','Email'], tags: ['60% Less Manual','AI Insights'], url: null },
  { title: 'Retail Analytics', sub: 'Decision-Support Platform', icon: BarChart2,    color: '#34d399',
    desc: 'Inventory tracking, sales forecasting & segmentation with automated recommendations.',
    tech: ['React.js','Python','FastAPI'], tags: ['Auto Recs','Festival Alerts'], url: null },
  { title: 'OptBinning',       sub: 'ML Data Engineering',       icon: FlaskConical, color: '#fbbf24',
    desc: 'ML pipelines with OptBinning integration — interactive binning visualisations & scorecards.',
    tech: ['Python','FastAPI','React.js','Pandas'], tags: ['ML Pipeline','Scorecards'], url: null },
  { title: 'AI Daily Digest',  sub: 'n8n Morning Briefing Bot',  icon: Bot,          color: '#f472b6',
    desc: 'Automated 7 AM email digest — unread Gmail, top news (AI-summarised), calendar events & daily tips. One email. Everything you need.',
    tech: ['n8n','Mistral AI','Gmail API','Google Calendar','RSS'], tags: ['< $0.01/day','7AM Autopilot'], url: null },
  { title: 'Data Extraction',  sub: 'Enhanced AI Pipeline',      icon: ScanSearch,   color: '#818cf8',
    desc: 'Advanced data extraction pipeline with enhanced accuracy, structured output and automated post-processing.',
    tech: ['Python','FastAPI','LLMs','Pandas'], tags: ['Enhanced Accuracy','Auto Pipeline'], url: null },
]

// Per-card scroll-driven animation — the "storytelling fall into place" effect
function ProjectCard({ p, i }: { p: typeof PROJECTS[0]; i: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const col = i % 3

  // Track this card's scroll progress from "just below the fold" → "centred in view"
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center 70%'],
  })

  // Spring-smooth the raw scroll value
  const smooth = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 })

  // Each column flies in from a different angle — left rotates CW, right CCW, centre straight up
  const xOffset = col === 0 ? -55 : col === 2 ? 55 : 0
  const rotateFrom = col === 0 ? -8 : col === 2 ? 8 : 0

  const y       = useTransform(smooth, [0, 1], [90, 0])
  const x       = useTransform(smooth, [0, 1], [xOffset, 0])
  const rotate  = useTransform(smooth, [0, 1], [rotateFrom, 0])
  const opacity = useTransform(smooth, [0, 0.35, 1], [0, 0.6, 1])
  const scale   = useTransform(smooth, [0, 1], [0.85, 1])

  return (
    <motion.div
      ref={ref}
      style={{
        y, x, rotate, opacity, scale,
        transformOrigin: col === 0 ? 'left bottom' : col === 2 ? 'right bottom' : 'center bottom',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        backdropFilter: 'blur(16px)',
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="rounded-3xl p-7 flex flex-col group relative overflow-hidden"
    >
      {/* Colour glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
        style={{ background: `radial-gradient(circle at 30% 30%, ${p.color}18, transparent 70%)` }}
      />

      <div className="relative z-10 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-5">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: `${p.color}14`, border: `1px solid ${p.color}22` }}>
            <p.icon size={22} style={{ color: p.color }} strokeWidth={1.5} />
          </div>
          {p.url ? (
            <motion.a href={p.url} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.15, rotate: 12 }} whileTap={{ scale: 0.9 }}
              className="rounded-full p-2 text-white/50 hover:text-white transition-colors"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <ArrowUpRight size={15} />
            </motion.a>
          ) : (
            <span className="text-white/20 text-[10px] tracking-widest uppercase">Private</span>
          )}
        </div>

        <h3 className="serif text-white text-xl md:text-2xl tracking-tight mb-0.5">{p.title}</h3>
        <span className="text-xs font-medium mb-4" style={{ color: p.color }}>{p.sub}</span>
        <p className="text-white/45 text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>

        <div className="flex flex-wrap gap-2 mb-3">
          {p.tags.map(t => (
            <span key={t} className="text-[10px] font-bold tracking-wider px-2.5 py-1 rounded-lg uppercase"
              style={{ background: `${p.color}12`, color: p.color, border: `1px solid ${p.color}20` }}>{t}</span>
          ))}
        </div>
        <div className="flex flex-wrap gap-1.5">
          {p.tech.map(t => (
            <span key={t} className="text-[10px] px-2 py-0.5 rounded-md text-white/30"
              style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}>{t}</span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default function ProjectsSection() {
  const sectionRef = useRef(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })

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
              Projects <em className="italic text-white/30 text-[0.5em]">— 8 shipped</em>
            </h2>
          </ClipReveal>
        </div>

        {/* Featured video banner */}
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

        {/* Project cards — scroll-driven storytelling animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => <ProjectCard key={p.title} p={p} i={i} />)}
        </div>
      </div>
    </section>
  )
}
