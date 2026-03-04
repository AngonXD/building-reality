import { useStore } from '../store'
import SkillsVisualization from './SkillsVisualization'

export default function SkillsPage() {
  const isDark = useStore((s) => s.isDark)
  const currentSection = useStore((s) => s.currentSection)

  const visible = currentSection === 'skills'

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 12,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
        width: '90%',
        maxWidth: '1000px',
      }}
    >
      <div
        className="glass"
        style={{
          padding: 'clamp(32px, 5vw, 48px)',
          borderRadius: '14px',
        }}
      >
        {/* Section header */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: isDark ? '#00f0ff' : '#1a1a2e',
            marginBottom: '32px',
            letterSpacing: '0.15em',
            opacity: 0.7,
          }}
        >
          {'// TECHNICAL_SKILLS'}
        </div>

        {/* Skills content */}
        <div style={{ marginTop: '24px' }}>
          <SkillsVisualization isDark={isDark} />
        </div>
      </div>
    </div>
  )
}
