import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, ArrowDown } from 'lucide-react'
import HireMeModal from '../components/HireMeModal'

function fadeOpacity(el: HTMLVideoElement, from: number, to: number, dur: number, onDone?: () => void) {
  const start = performance.now()
  const tick = (now: number) => {
    const t = Math.min((now - start) / dur, 1)
    el.style.opacity = String(from + (to - from) * t)
    if (t < 1) requestAnimationFrame(tick)
    else onDone?.()
  }
  requestAnimationFrame(tick)
}

const SOCIALS = [
  { icon: Github,   href: 'https://github.com/mehak-1256765',     label: 'GitHub'   },
  { icon: Linkedin, href: 'linkedin.com/in/mehak-thakur-8594791aa', label: 'LinkedIn' },
  { icon: Mail,     href: 'mailto:mehakmanhas19@gmail.com',       label: 'Email'    },
  { icon: Phone,    href: 'tel:+916280309346',                    label: 'Phone'    },
]

export default function HeroSection() {
  const [hireMeOpen, setHireMeOpen] = useState(false)
  const videoRef     = useRef<HTMLVideoElement>(null)
  const fadingOut    = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0])
  const heroY       = useTransform(scrollY, [0, 500], [0, -80])
  const videoY      = useTransform(scrollY, [0, 600], [0, 100])

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onCanPlay    = () => { video.play(); fadeOpacity(video, 0, 1, 700) }
    const onTimeUpdate = () => {
      const rem = video.duration - video.currentTime
      if (rem <= 0.55 && !fadingOut.current) {
        fadingOut.current = true
        fadeOpacity(video, parseFloat(video.style.opacity) || 1, 0, 500)
      }
    }
    const onEnded = () => {
      video.style.opacity = '0'; fadingOut.current = false
      setTimeout(() => { video.currentTime = 0; video.play(); fadeOpacity(video, 0, 1, 700) }, 100)
    }
    video.addEventListener('canplay',    onCanPlay)
    video.addEventListener('timeupdate', onTimeUpdate)
    video.addEventListener('ended',      onEnded)
    return () => {
      video.removeEventListener('canplay',    onCanPlay)
      video.removeEventListener('timeupdate', onTimeUpdate)
      video.removeEventListener('ended',      onEnded)
    }
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen flex flex-col overflow-hidden bg-black">

      {/* Full-width full-height background video with parallax */}
      <motion.div className="absolute inset-0" style={{ y: videoY }}>
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4"
          muted autoPlay playsInline preload="auto"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0 }}
        />
        {/* Layered gradients for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
      </motion.div>

      {/* Navbar */}
      <nav className="relative z-20 px-6 py-5 flex-shrink-0">
        <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between">
          <span className="serif text-white text-lg">
            Mehak<em className="italic text-white/35"> M.</em>
          </span>
          <div className="hidden md:flex items-center gap-7">
            {['Experience', 'Projects', 'Skills', 'Contact'].map(link => (
              <a key={link} href={`#${link.toLowerCase()}`}
                className="text-white/55 hover:text-white text-sm font-medium transition-colors duration-200">
                {link}
              </a>
            ))}
          </div>
          <motion.button
            onClick={() => setHireMeOpen(true)}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            className="liquid-glass rounded-full px-5 py-2 text-white text-sm font-medium"
          >
            Hire Me
          </motion.button>
        </div>
      </nav>

      {/* Hero content — centered, fades + lifts on scroll */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center gap-5 -translate-y-[5%]"
      >
        {/* Chapter + badge row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex items-center gap-4"
        >
          <span className="text-white/25 text-xs tracking-[0.35em] uppercase">01 — Portfolio</span>
          <div className="liquid-glass rounded-full px-4 py-1.5 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-dot" />
            <span className="text-white/60 text-xs tracking-wide">Available</span>
          </div>
        </motion.div>

        {/* Name */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 120, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="serif text-white tracking-tight leading-[0.88]"
            style={{ fontSize: 'clamp(4rem, 13vw, 10rem)' }}
          >
            Mehak
          </motion.h1>
        </div>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="serif italic text-white/50"
          style={{ fontSize: 'clamp(1rem, 2.5vw, 1.6rem)' }}
        >
          AI Application Engineer · Full Stack
        </motion.p>

        {/* Stack pills */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.78 }}
          className="flex flex-wrap justify-center gap-2 max-w-lg"
        >
          {['React.js', 'TypeScript', 'Python', 'FastAPI', 'LLMs', 'n8n', 'Three.js'].map(t => (
            <span key={t} className="liquid-glass rounded-full px-3 py-1 text-white/50 text-xs">{t}</span>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.95 }}
          className="flex gap-3"
        >
          <motion.a href="mailto:mehakmanhas19@gmail.com"
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}
            className="bg-white text-black rounded-full px-7 py-3 text-sm font-semibold">
            Email Me
          </motion.a>
          <motion.a href="#projects"
            whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.96 }}
            className="liquid-glass rounded-full px-7 py-3 text-white text-sm font-medium">
            View Work
          </motion.a>
        </motion.div>

        {/* Socials */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="flex gap-2.5"
        >
          {SOCIALS.map(({ icon: Icon, href, label }) => (
            <motion.a key={label} href={href} target="_blank" rel="noopener noreferrer"
              whileHover={{ scale: 1.15, y: -2 }} whileTap={{ scale: 0.88 }}
              className="liquid-glass rounded-full p-2.5 text-white/45 hover:text-white transition-colors"
              title={label}>
              <Icon size={16} />
            </motion.a>
          ))}
        </motion.div>
      </motion.div>

      {/* Hire Me modal */}
      <HireMeModal open={hireMeOpen} onClose={() => setHireMeOpen(false)} />

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        style={{ opacity: heroOpacity }}
        className="relative z-10 flex justify-center pb-7 flex-shrink-0"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-1.5 text-white/25"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase">Scroll to explore</span>
          <ArrowDown size={13} />
        </motion.div>
      </motion.div>
    </div>
  )
}
