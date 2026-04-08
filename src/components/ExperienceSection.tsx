import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { FlyUp, SlideLeft, ClipReveal, FadeIn } from './Animate'

const EXPERIENCES = [
  {
    role: 'AI Application Engineer',
    company: 'dSights AI',
    badge: 'FULL TIME',
    promoted: true,
    period: '2026 – Present',
    loc: 'Bengaluru, India',
    color: '#c4b5fd',
    points: [
      'Promoted from internship — leading AI-powered application development end-to-end',
      'Architecting LLM-integrated systems for automated enterprise insights & decision support',
      'Building AI agents and orchestration workflows using Python, FastAPI & LangChain',
      'Designing full-stack AI applications with real-time inference pipelines',
      'Collaborating with data science teams to productionise ML models into interactive UIs',
    ],
  },
  {
    role: 'Full Stack Engineer',
    company: 'dSights AI',
    badge: 'INTERNSHIP',
    promoted: false,
    period: 'Nov 2025 – 2026',
    loc: 'Bengaluru, India',
    color: '#a78bfa',
    points: [
      'Built 15+ reusable React components — reduced dev time by 30%',
      'Integrated ML pipelines and REST APIs for real-time enterprise analytics',
      'Developed Retail Analytics Platform with automated inventory recommendations',
      'Integrated OptBinning models with interactive binning visualisations & scorecards',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'OneUp Hosting',
    badge: 'FREELANCE',
    promoted: false,
    period: 'May – Oct 2025',
    loc: 'Remote',
    color: '#22d3ee',
    points: [
      'Built complete frontend for a production hosting platform from scratch',
      'SEO 75% → 100% · Performance 70% → 90% via code splitting & optimisation',
      'Built immersive 3D experiences with Three.js & @react-three/fiber',
      'Pixel-perfect responsive UI with Tailwind CSS & Framer Motion',
    ],
  },
]

function ExpCard({ exp, i }: { exp: typeof EXPERIENCES[0]; i: number }) {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80, rotateX: 4 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.15 }}
      style={{ transformPerspective: 1200, borderLeft: `2px solid ${exp.color}30` }}
      className="rounded-3xl p-8 md:p-10 relative"
      whileHover={{ y: -4 }}
    >
      {/* Glass bg */}
      <div className="absolute inset-0 rounded-3xl"
        style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(16px)' }} />

      {exp.promoted && (
        <div className="absolute top-6 right-6 text-[10px] font-bold tracking-widest px-3 py-1 rounded-full z-10"
          style={{ background: `${exp.color}18`, color: exp.color, border: `1px solid ${exp.color}30` }}>
          ↑ PROMOTED
        </div>
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start gap-4 mb-5 pr-24">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1.5">
              <span className="serif italic text-white/45 text-sm">{exp.company}</span>
              <span className="text-[10px] font-bold tracking-widest px-2 py-0.5 rounded-md"
                style={{ background: `${exp.color}12`, color: exp.color, border: `1px solid ${exp.color}20` }}>
                {exp.badge}
              </span>
            </div>
            <h3 className="serif text-white leading-tight" style={{ fontSize: 'clamp(1.4rem,3vw,2rem)' }}>
              {exp.role}
            </h3>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-white/40 text-xs">{exp.period}</p>
            <p className="text-white/25 text-xs mt-1">{exp.loc}</p>
          </div>
        </div>

        <div className="w-full h-px mb-5" style={{ background: `${exp.color}15` }} />

        {/* Bullets — stagger in */}
        <ul className="flex flex-col gap-3">
          {exp.points.map((pt, j) => (
            <motion.li key={j}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.12 + j * 0.07 }}
              className="flex gap-3 text-white/55 text-sm leading-relaxed"
            >
              <span className="mt-[0.55rem] flex-shrink-0 w-1 h-1 rounded-full" style={{ background: `${exp.color}70` }} />
              {pt}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  )
}

export default function ExperienceSection() {
  const sectionRef = useRef(null)
  const headRef    = useRef(null)
  const inView     = useInView(headRef, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 md:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.30)' }} />

      <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4"
          muted autoPlay loop playsInline preload="auto"
          className="w-full h-full object-cover opacity-[0.35]"
        />
      </motion.div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Heading */}
        <div ref={headRef} className="mb-14 md:mb-20">
          <FadeIn>
            <p className="text-white/40 text-xs tracking-[0.35em] uppercase mb-5">03 — The Journey</p>
          </FadeIn>
          <ClipReveal delay={0.1}>
            <h2 className="serif text-white tracking-tight leading-none"
              style={{ fontSize: 'clamp(2.8rem,8vw,6rem)' }}>
              Experience
            </h2>
          </ClipReveal>
        </div>

        <div className="flex flex-col gap-5">
          {EXPERIENCES.map((exp, i) => <ExpCard key={`${exp.company}-${i}`} exp={exp} i={i} />)}
        </div>
      </div>
    </section>
  )
}
