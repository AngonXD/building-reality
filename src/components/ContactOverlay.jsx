import { useStore } from '../store'
import { aboutData } from '../data/projects'

export default function ContactOverlay() {
  const isDark = useStore((s) => s.isDark)
  const currentSection = useStore((s) => s.currentSection)

  const visible = currentSection === 'contact'

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center',
      pointerEvents: visible ? 'auto' : 'none',
      zIndex: 5,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease',
      width: '90%',
      maxWidth: '600px',
    }}>
      <div className="glass" style={{
        padding: 'clamp(32px, 5vw, 56px)',
        borderRadius: '12px',
      }}>
        {/* Section label */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: isDark ? '#00f0ff' : '#1a1a2e',
          marginBottom: '24px',
          letterSpacing: '0.15em',
          opacity: 0.7,
        }}>
          {'// GET_IN_TOUCH'}
        </div>

        {/* Heading */}
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 700,
          color: isDark ? '#ffffff' : '#1a1a2e',
          lineHeight: 1.2,
          marginBottom: '16px',
        }}>
          {"Let's Build"}
          <br />
          <span style={{
            color: isDark ? '#00f0ff' : '#1a1a2e',
            textShadow: isDark ? '0 0 20px #00f0ff44' : 'none',
          }}>
            Something Great
          </span>
        </h2>

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '15px',
          color: isDark ? '#e0e6ed88' : '#1a1a2e88',
          lineHeight: 1.6,
          marginBottom: '36px',
          maxWidth: '400px',
          margin: '0 auto 36px',
        }}>
          Have a project in mind or just want to chat about tech?
          I'm always open to new ideas and collaborations.
        </p>

        {/* Social links */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '32px',
          flexWrap: 'wrap',
        }}>
          <a
            href={aboutData.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
            GitHub
          </a>
          <a
            href={aboutData.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
            LinkedIn
          </a>
          <a
            href={aboutData.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Instagram
          </a>
        </div>

        {/* Website link */}
        <a
          href={aboutData.socials.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '13px',
            color: isDark ? '#00f0ff' : '#1a1a2e',
            textDecoration: 'none',
            opacity: 0.6,
            transition: 'opacity 0.3s ease',
          }}
          onMouseEnter={(e) => e.target.style.opacity = 1}
          onMouseLeave={(e) => e.target.style.opacity = 0.6}
        >
          {aboutData.socials.website}
        </a>
      </div>
    </div>
  )
}
