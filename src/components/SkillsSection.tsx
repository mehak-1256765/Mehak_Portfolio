import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { ClipReveal, FlyUp, SlideRight, FadeIn } from './Animate'

const SKILLS = {
  'AI & ML': {
    color: '#f472b6',
    items: [
      { name: 'Claude / Gemini API',  pct: 88 },
      { name: 'Prompt Engineering',   pct: 85 },
      { name: 'LangChain',            pct: 80 },
      { name: 'FAISS / RAG',          pct: 78 },
      { name: 'scikit-learn',         pct: 72 },
      { name: 'Pandas / NumPy',       pct: 80 },
      { name: 'n8n Automation',       pct: 82 },
    ],
  },
  Frontend: {
    color: '#a78bfa',
    items: [
      { name: 'React.js',      pct: 90 },
      { name: 'Next.js',       pct: 70 },
      { name: 'TypeScript',    pct: 65 },
      { name: 'JavaScript',    pct: 88 },
      { name: 'Tailwind CSS',  pct: 92 },
      { name: 'Three.js / 3D', pct: 75 },
      { name: 'Framer Motion', pct: 80 },
    ],
  },
  Backend: {
    color: '#22d3ee',
    items: [
      { name: 'Python',     pct: 85 },
      { name: 'FastAPI',    pct: 82 },
      { name: 'Node.js',    pct: 60 },
      { name: 'REST APIs',  pct: 85 },
      { name: 'Docker',     pct: 70 },
      { name: 'GCP Cloud Run', pct: 72 },
    ],
  },
  'Data & Tools': {
    color: '#fb923c',
    items: [
      { name: 'Git / GitHub',   pct: 88 },
      { name: 'PostgreSQL',     pct: 70 },
      { name: 'MongoDB',        pct: 65 },
      { name: 'Firebase',       pct: 72 },
      { name: 'DuckDB / FAISS', pct: 75 },
      { name: 'MySQL',          pct: 68 },
    ],
  },
}

function SkillBar({ name, pct, color, delay }: { name: string; pct: number; color: string; delay: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  return (
    <div ref={ref} className="flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-white/55 text-sm">{name}</span>
        <span className="text-xs font-mono" style={{ color }}>{pct}%</span>
      </div>
      <div className="h-px bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(90deg, ${color}50, ${color})` }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1], delay }}
        />
      </div>
    </div>
  )
}

/* Extracted to avoid hooks-in-map violation */
function SkillCategory({ cat, color, items, ci }: { cat: string; color: string; items: { name: string; pct: number }[]; ci: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 70, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: ci * 0.15 }}
      className="liquid-glass rounded-3xl p-7 md:p-8"
    >
      <div className="flex items-center justify-between mb-7">
        <h3 className="text-xs font-bold tracking-widest uppercase" style={{ color }}>{cat}</h3>
        <span className="text-white/20 text-xs">{items.length} skills</span>
      </div>
      <div className="flex flex-col gap-4">
        {items.map((s, si) => (
          <SkillBar key={s.name} {...s} color={color} delay={0.1 + ci * 0.08 + si * 0.055} />
        ))}
      </div>
    </motion.div>
  )
}

export default function SkillsSection() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const inView     = useInView(headRef, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const videoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 md:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 section-layer" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Heading + video row */}
        <div ref={headRef} className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20 md:mb-28">
          <div className="flex flex-col justify-center">
            <FadeIn>
              <p className="text-white/40 text-xs tracking-[0.35em] uppercase mb-5">
                05 — Technical Arsenal
              </p>
            </FadeIn>
            <ClipReveal delay={0.1}>
              <h2 className="serif text-white tracking-tight leading-none"
                style={{ fontSize: 'clamp(2.8rem,7vw,5.5rem)' }}>
                Skills & <em className="italic text-white/35">Expertise</em>
              </h2>
            </ClipReveal>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.85, delay: 0.2 }}
            className="rounded-3xl overflow-hidden aspect-video"
          >
            <motion.div className="w-full h-full" style={{ y: videoY }}>
              <video
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
                className="w-full h-full object-cover scale-110"
                muted autoPlay loop playsInline preload="auto"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {Object.entries(SKILLS).map(([cat, { color, items }], ci) => (
            <SkillCategory key={cat} cat={cat} color={color} items={items} ci={ci} />
          ))}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-10 md:mt-14"
        >
          <p className="text-white/20 text-xs tracking-widest uppercase mb-4">Certifications</p>
          <div className="flex flex-wrap gap-3">
            {['MERN Stack — TechEdo', 'Full Stack Internship — Unified Mentor', 'Core Java — Udemy'].map(c => (
              <span key={c} className="liquid-glass rounded-full px-5 py-2.5 text-white/35 text-sm">{c}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
