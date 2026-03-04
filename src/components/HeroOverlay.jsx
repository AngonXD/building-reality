import { useEffect, useState } from 'react'
import { useStore } from '../store'
import { aboutData } from '../data/projects'
import TypingText from './TypingText'
import { useMousePosition } from '../hooks/useMousePosition'

export default function HeroOverlay() {
  const isDark = useStore((s) => s.isDark)
  const currentSection = useStore((s) => s.currentSection)
  const mousePos = useMousePosition()
  const [showGlow, setShowGlow] = useState(false)

  const visible = currentSection === 'hero'

  useEffect(() => {
    if (visible) {
      setShowGlow(true)
    }
  }, [visible])

  return (
    <>
      {/* Mouse-follow glow */}
      {visible && showGlow && (
        <div
          style={{
            position: 'fixed',
            left: `${mousePos.x}px`,
            top: `${mousePos.y}px`,
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(0, 240, 255, 0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 3,
            transform: 'translate(-50%, -50%)',
            filter: 'blur(40px)',
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Animated background orb */}
      {visible && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            background: `radial-gradient(circle, ${isDark ? 'rgba(0, 240, 255, 0.08)' : 'rgba(0, 240, 255, 0.05)'} 0%, transparent 70%)`,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 2,
            filter: 'blur(60px)',
            animation: 'pulse-glow 4s ease-in-out infinite',
          }}
        />
      )}

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

      {/* Role with typing effect */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 'clamp(14px, 2.5vw, 18px)',
        color: isDark ? '#00f0ff' : '#1a1a2e',
        marginBottom: '24px',
        fontWeight: 400,
        letterSpacing: '0.15em',
        minHeight: '1.5em',
      }}>
        {visible && <TypingText text={aboutData.role} speed={40} isDark={isDark} />}
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
    </>
  )
}
