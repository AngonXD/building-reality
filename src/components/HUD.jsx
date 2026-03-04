import { useStore } from '../store'
import { Link } from 'react-router-dom'

export default function HUD() {
  const isDark = useStore((s) => s.isDark)
  const toggleTheme = useStore((s) => s.toggleTheme)
  const currentSection = useStore((s) => s.currentSection)
  const scrollProgress = useStore((s) => s.scrollProgress)

  const sections = ['hero', 'about', 'projects', 'contact']

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 10,
      fontFamily: "'Space Grotesk', sans-serif",
    }}>
      {/* Top bar */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 30px',
        pointerEvents: 'auto',
      }}>
        {/* Logo */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '14px',
          fontWeight: 600,
          color: isDark ? '#00f0ff' : '#1a1a2e',
          letterSpacing: '0.1em',
        }}>
          <span style={{ opacity: 0.5 }}>{'<'}</span>
          anish.rej
          <span style={{ opacity: 0.5 }}>{' />'}</span>
        </div>

        {/* Nav + Theme toggle */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
        }}>
          {/* Lab Link */}
          <Link
            to="/lab"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '12px',
              color: isDark ? '#00f0ff' : '#1a1a2e',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              padding: '6px 12px',
              borderRadius: '4px',
              border: `1px solid ${isDark ? '#00f0ff44' : '#1a1a2e22'}`,
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = isDark ? '#00f0ff' : '#1a1a2e'
              e.currentTarget.style.boxShadow = isDark ? '0 0 10px #00f0ff55' : 'none'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = isDark ? '#00f0ff44' : '#1a1a2e22'
              e.currentTarget.style.boxShadow = 'none'
            }}
          >
            /lab
          </Link>
          {/* Section nav dots */}
          <div style={{
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}>
            {sections.map((section) => (
              <div
                key={section}
                style={{
                  width: currentSection === section ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: currentSection === section
                    ? (isDark ? '#00f0ff' : '#1a1a2e')
                    : (isDark ? '#ffffff22' : '#00000022'),
                  transition: 'all 0.4s ease',
                  boxShadow: currentSection === section && isDark
                    ? '0 0 10px #00f0ff55'
                    : 'none',
                }}
                title={section}
              />
            ))}
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              border: `1px solid ${isDark ? '#00f0ff44' : '#00000022'}`,
              background: isDark ? '#0d0d1a' : '#ffffff',
              color: isDark ? '#00f0ff' : '#1a1a2e',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              transition: 'all 0.3s ease',
              boxShadow: isDark ? '0 0 15px #00f0ff22' : '0 2px 10px rgba(0,0,0,0.1)',
            }}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Scroll progress bar */}
      <div style={{
        position: 'absolute',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        width: '3px',
        height: '120px',
        background: isDark ? '#ffffff11' : '#00000011',
        borderRadius: '2px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: '100%',
          height: `${scrollProgress * 100}%`,
          background: isDark ? '#00f0ff' : '#1a1a2e',
          borderRadius: '2px',
          transition: 'height 0.1s ease',
          boxShadow: isDark ? '0 0 8px #00f0ff55' : 'none',
        }} />
      </div>

      {/* Bottom info line */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '30px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: isDark ? '#00f0ff66' : '#1a1a2e44',
        letterSpacing: '0.05em',
      }}>
        scroll to explore
        <span style={{
          display: 'inline-block',
          marginLeft: '8px',
          animation: 'typing-blink 1s step-end infinite',
        }}>_</span>
      </div>

      {/* Section label */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        right: '40px',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: isDark ? '#ffffff33' : '#00000033',
        letterSpacing: '0.15em',
        textTransform: 'uppercase',
      }}>
        {currentSection}
      </div>
    </div>
  )
}
