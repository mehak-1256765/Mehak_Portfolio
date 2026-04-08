import FluidBackground from './components/FluidBackground'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import useLenis from './hooks/useLenis'
import HeroSection from './pages/Index'
import AboutSection from './components/AboutSection'
import ExperienceSection from './components/ExperienceSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'

export default function App() {
  useLenis()
  return (
    <>
      <FluidBackground />
      <CustomCursor />
      <ScrollProgress />
      <main className="relative overflow-x-hidden" style={{ zIndex: 1 }}>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </>
  )
}
