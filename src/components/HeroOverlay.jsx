import { useStore } from '../store'
import { aboutData } from '../data/projects'

export default function HeroOverlay() {
  const isDark = useStore((s) => s.isDark)
  const currentSection = useStore((s) => s.currentSection)

  const visible = currentSection === 'hero'

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      pointerEvents: 'none',
      zIndex: 5,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease',
      width: '90%',
      maxWidth: '700px',
    }}>
      {/* Terminal-style greeting */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '13px',
        color: isDark ? '#00f0ff' : '#1a1a2e',
        marginBottom: '16px',
        opacity: 0.7,
        letterSpacing: '0.1em',
      }}>
        {'> initializing portfolio...'}
      </div>

      {/* Name */}
      <h1 style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(36px, 7vw, 72px)',
        fontWeight: 700,
        color: isDark ? '#ffffff' : '#1a1a2e',
        lineHeight: 1.1,
        marginBottom: '12px',
        textShadow: isDark ? '0 0 30px #00f0ff22' : 'none',
      }}>
        {aboutData.name}
      </h1>

      {/* Role */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(14px, 2.5vw, 18px)',
        color: isDark ? '#00f0ff' : '#1a1a2e',
        marginBottom: '24px',
        fontWeight: 400,
        letterSpacing: '0.15em',
      }}>
        {aboutData.role}
      </div>

      {/* Tagline */}
      <p style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontSize: 'clamp(14px, 2vw, 18px)',
        color: isDark ? '#e0e6ed99' : '#1a1a2e88',
        lineHeight: 1.6,
        maxWidth: '500px',
        margin: '0 auto',
      }}>
        {aboutData.tagline}
      </p>

      {/* Decorative line */}
      <div style={{
        width: '60px',
        height: '2px',
        background: isDark ? '#00f0ff' : '#1a1a2e',
        margin: '32px auto 0',
        boxShadow: isDark ? '0 0 10px #00f0ff55' : 'none',
      }} />
    </div>
  )
}
