import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'
import { FadeIn, ClipReveal } from './Animate'

const TESTIMONIALS = [
  {
    name: 'khalidsdc',
    platform: 'Fiverr · 5 Stars · Saudi Arabia',
    rating: 5,
    quote: 'Your expertise is truly rare in the programming world — an expertise possessed only by a select group of genuine pioneers in this field. You embody professionalism, respect, elegance, and impeccable manners. Your integrity, reliability, and high ethical standards are qualities that have become increasingly difficult to find nowadays.',
    featured: true,
  },
  {
    name: 'kananel0',
    platform: 'Fiverr · Repeat Client · South Africa',
    rating: 5,
    quote: 'Highly recommended 👌',
  },
  {
    name: 'kananel0',
    platform: 'Fiverr · Repeat Client · South Africa',
    rating: 5,
    quote: 'She is the best like Dj Khaled',
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} fill="#fbbf24" color="#fbbf24" />
      ))}
    </div>
  )
}

export default function TestimonialsSection() {
  const ref    = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [featured, ...rest] = TESTIMONIALS

  return (
    <section className="relative py-28 md:py-40 px-6 overflow-hidden">
      <div className="absolute inset-0 section-layer" />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>

        {/* Heading */}
        <div className="mb-14">
          <FadeIn>
            <p className="text-white/40 text-xs tracking-[0.35em] uppercase mb-5">06 — Kind Words</p>
          </FadeIn>
          <ClipReveal delay={0.1}>
            <h2
              className="serif text-white tracking-tight leading-none"
              style={{ fontSize: 'clamp(2.8rem,8vw,6rem)' }}
            >
              Client <em className="italic text-white/30">Reviews</em>
            </h2>
          </ClipReveal>
        </div>

        {/* Featured card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative rounded-3xl p-10 md:p-14 mb-6 overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Decorative large quote mark */}
          <span
            className="serif absolute -top-4 left-8 pointer-events-none select-none text-white/[0.04]"
            style={{ fontSize: '12rem', lineHeight: 1 }}
          >
            "
          </span>

          <div className="relative z-10">
            <Stars count={featured.rating} />
            <p
              className="serif italic text-white/80 mt-6 mb-8 leading-relaxed"
              style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.45rem)' }}
            >
              "{featured.quote}"
            </p>
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-white/80 text-xs font-bold flex-shrink-0"
                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.14)' }}
              >
                {featured.name[0].toUpperCase()}
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">{featured.name}</p>
                <p className="text-white/35 text-xs">{featured.platform}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Two smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {rest.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.3 + i * 0.12 }}
              className="rounded-3xl p-8"
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Stars count={t.rating} />
              <p className="serif italic text-white/65 mt-5 mb-6 text-lg leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 text-xs font-bold flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  {t.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-white/70 text-sm font-medium">{t.name}</p>
                  <p className="text-white/30 text-xs">{t.platform}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
