import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { FlyUp, SlideLeft, SlideRight, WordReveal, FadeIn, ClipReveal } from './Animate'

const TICKER_ITEMS = [
  'React.js','·','TypeScript','·','Python','·','FastAPI','·','Three.js','·',
  'Framer Motion','·','n8n Automation','·','Firebase','·','Tailwind CSS','·',
  'Node.js','·','MongoDB','·','LLMs','·','AI Engineering','·',
  'React.js','·','TypeScript','·','Python','·','FastAPI','·','Three.js','·',
  'Framer Motion','·','n8n Automation','·','Firebase','·','Tailwind CSS','·',
  'Node.js','·','MongoDB','·','LLMs','·','AI Engineering','·',
]

export default function AboutSection() {
  const sectionRef = useRef(null)
  const ref        = useRef(null)
  const inView     = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.50)' }} />

      <div className="relative z-10 pt-24 md:pt-36 pb-0">
        <div className="max-w-6xl mx-auto px-6 md:px-10">

          {/* Chapter label */}
          <FadeIn delay={0}>
            <p ref={ref} className="text-white/40 text-xs tracking-[0.35em] uppercase mb-12">
              02 — Who I Am
            </p>
          </FadeIn>

          {/* Two-column */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-16">

            {/* LEFT: framed video */}
            <ScaleInVideo imgY={imgY} inView={inView} />

            {/* RIGHT: text */}
            <div className="flex flex-col justify-center gap-8">
              {/* Big lines, each clips in */}
              <div className="flex flex-col gap-1">
                {[
                  { text: 'Full Stack & AI Application',  italic: false },
                  { text: 'Engineer — promoted at',        italic: false },
                  { text: 'dSights AI, Bengaluru.',        italic: false },
                  { text: 'Obsessed with building',        italic: true  },
                  { text: 'products that move people.',    italic: true  },
                ].map(({ text, italic }, i) => (
                  <ClipReveal key={i} delay={0.1 + i * 0.1}>
                    <p
                      className={`serif leading-tight ${italic ? 'text-white/50 italic' : 'text-white'}`}
                      style={{ fontSize: 'clamp(1.3rem, 3vw, 2.1rem)' }}
                    >
                      {text}
                    </p>
                  </ClipReveal>
                ))}
              </div>

              {/* Details */}
              <FlyUp delay={0.55}>
                <div className="grid grid-cols-1 gap-4 pt-6 border-t border-white/10">
                  {[
                    { label: 'Current Role', value: 'AI Application Engineer @ dSights AI' },
                    { label: 'Location',     value: 'Bangalore · Remote · Open to International' },
                    { label: 'Education',    value: 'MCA — GNDU (CGPA 7.96) · BSc CS — PU' },
                    { label: 'Interests',    value: 'AI/LLMs · 3D Web · Automation · Data Viz' },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex gap-6 items-start">
                      <span className="text-white/35 text-xs tracking-widest uppercase w-28 flex-shrink-0 pt-0.5">{label}</span>
                      <span className="text-white/80 text-sm leading-snug">{value}</span>
                    </div>
                  ))}
                </div>
              </FlyUp>

              {/* Badges */}
              <FadeIn delay={0.75}>
                <div className="flex gap-3 flex-wrap">
                  {['MCA · GNDU', 'BSc CS · PU', 'CGPA 7.96'].map(b => (
                    <span key={b} className="liquid-glass rounded-full px-4 py-2 text-white/65 text-xs">{b}</span>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>

        {/* Ticker */}
        <motion.div
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="py-7 overflow-hidden border-t border-b border-white/[0.06]"
        >
          <div className="ticker flex gap-10 whitespace-nowrap">
            {TICKER_ITEMS.map((item, i) => (
              <span key={i} className={`text-sm ${item === '·' ? 'text-white/15' : 'text-white/30'}`}>
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* Separate component to avoid inline hook weirdness */
function ScaleInVideo({ imgY, inView }: { imgY: any; inView: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.88, y: 40 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="rounded-3xl overflow-hidden relative"
      style={{ aspectRatio: '3/4' }}
    >
      <motion.div className="w-full h-full" style={{ y: imgY }}>
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          className="w-full h-full object-cover scale-110"
          muted autoPlay loop playsInline preload="auto"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-6 left-6 right-6 flex gap-3"
      >
        {[{ value: '90%', label: 'AI Cost Reduction' }, { value: '60%', label: 'Manual Effort Saved' }].map(s => (
          <div key={s.label} className="liquid-glass rounded-2xl px-4 py-3 flex-1 text-center">
            <p className="text-white text-xl font-semibold serif">{s.value}</p>
            <p className="text-white/55 text-[10px] tracking-wide">{s.label}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  )
}
