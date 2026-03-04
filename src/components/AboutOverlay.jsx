import { useStore } from '../store'
import { aboutData } from '../data/projects'
import SkillsVisualization from './SkillsVisualization'

export default function AboutOverlay() {
  const isDark = useStore((s) => s.isDark)
  const currentSection = useStore((s) => s.currentSection)

  const visible = currentSection === 'about'

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      pointerEvents: visible ? 'auto' : 'none',
      zIndex: 5,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.6s ease',
      width: '90%',
      maxWidth: '900px',
    }}>
      <div className="glass" style={{
        padding: 'clamp(24px, 4vw, 48px)',
        borderRadius: '12px',
      }}>
        {/* Section header */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: isDark ? '#00f0ff' : '#1a1a2e',
          marginBottom: '24px',
          letterSpacing: '0.15em',
          opacity: 0.7,
        }}>
          {'// ABOUT_ME'}
        </div>

        {/* Bio */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(14px, 2vw, 17px)',
          lineHeight: 1.7,
          color: isDark ? '#e0e6edcc' : '#1a1a2ecc',
          marginBottom: '32px',
          maxWidth: '700px',
        }}>
          {aboutData.bio}
        </p>

        {/* Skills Visualization */}
        <SkillsVisualization isDark={isDark} />

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
          gap: '16px',
          paddingTop: '24px',
          borderTop: `1px solid ${isDark ? '#ffffff11' : '#00000011'}`,
        }}>
          {aboutData.stats.map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(20px, 3vw, 28px)',
                fontWeight: 700,
                color: isDark ? '#00f0ff' : '#1a1a2e',
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '10px',
                color: isDark ? '#e0e6ed66' : '#1a1a2e66',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                marginTop: '4px',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
