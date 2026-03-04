import { useEffect, useState } from 'react'
import { useStore } from '../store'

const architectureBlocks = [
  { id: 1, title: 'User Input', description: 'Ideas, feedback, and real-world problems' },
  { id: 2, title: 'Curiosity Engine', description: 'Deep dive into concepts and emerging tech' },
  { id: 3, title: 'Research Module', description: 'Synthesize knowledge into actionable insights' },
  { id: 4, title: 'Prototype Builder', description: 'Create tangible solutions and experiments' },
  { id: 5, title: 'Public Deployment', description: 'Share, iterate, and learn from users' },
]

export default function SystemArchitecture() {
  const isDark = useStore((s) => s.isDark)
  const currentSection = useStore((s) => s.currentSection)
  const [visibleBlocks, setVisibleBlocks] = useState({})
  const [hoveredBlock, setHoveredBlock] = useState(null)

  const visible = currentSection === 'system-architecture'

  // Stagger animation
  useEffect(() => {
    if (visible) {
      architectureBlocks.forEach((block, idx) => {
        const timer = setTimeout(() => {
          setVisibleBlocks((prev) => ({ ...prev, [block.id]: true }))
        }, idx * 80)
        return () => clearTimeout(timer)
      })
    } else {
      setVisibleBlocks({})
    }
  }, [visible])

  return (
    <div
      style={{
        position: 'fixed',
        top: '40%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '95%',
        maxWidth: '1200px',
        pointerEvents: visible ? 'auto' : 'none',
        zIndex: 12,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.6s ease',
      }}
    >
      <h2
        style={{
          fontSize: 'clamp(18px, 2vw, 28px)',
          fontWeight: 600,
          color: isDark ? '#e0e6ed' : '#1a1a2e',
          marginBottom: '40px',
          textAlign: 'center',
          fontFamily: "'Space Grotesk', sans-serif",
          letterSpacing: '0.05em',
        }}
      >
        How I Work as a System
      </h2>

      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 'clamp(12px, 2vw, 20px)',
          flexWrap: 'wrap',
          rowGap: '40px',
        }}
      >
        {architectureBlocks.map((block, idx) => (
          <div
            key={block.id}
            style={{
              flex: 'calc(20% - 16px)',
              minWidth: '140px',
              animation: visibleBlocks[block.id] ? 'slideInLeft 0.6s ease-out forwards' : 'none',
              animationDelay: visibleBlocks[block.id] ? `${idx * 0.1}s` : '0s',
              opacity: visibleBlocks[block.id] ? 1 : 0,
              transform: visibleBlocks[block.id] ? 'translateX(0)' : 'translateX(-20px)',
            }}
          >
            <div
              onMouseEnter={() => setHoveredBlock(block.id)}
              onMouseLeave={() => setHoveredBlock(null)}
              style={{
                background: isDark ? 'rgba(26, 26, 42, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(25px)',
                border: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
                borderRadius: '12px',
                padding: '20px 16px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                transform: hoveredBlock === block.id ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)',
                boxShadow:
                  hoveredBlock === block.id
                    ? `0 0 30px ${isDark ? 'rgba(0, 240, 255, 0.3)' : 'rgba(0, 0, 0, 0.1)'}`
                    : 'none',
              }}
            >
              {/* Block number */}
              <div
                style={{
                  fontSize: '11px',
                  fontFamily: "'JetBrains Mono', monospace",
                  color: isDark ? '#00f0ff77' : '#1a1a2e77',
                  marginBottom: '8px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Step {block.id}
              </div>

              {/* Title */}
              <h3
                style={{
                  fontSize: 'clamp(13px, 1.5vw, 16px)',
                  fontWeight: 600,
                  color: isDark ? '#00f0ff' : '#1a1a2e',
                  marginBottom: '8px',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {block.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  fontSize: 'clamp(11px, 1vw, 12px)',
                  color: isDark ? '#e0e6ed99' : '#1a1a2e99',
                  lineHeight: 1.4,
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {block.description}
              </p>
            </div>

            {/* Arrow connector */}
            {idx < architectureBlocks.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  right: '-30px',
                  top: '50%',
                  width: '20px',
                  height: '2px',
                  background: isDark ? '#00f0ff44' : '#1a1a2e44',
                  animation: visibleBlocks[block.id] ? 'slideInLeft 0.8s ease-out forwards' : 'none',
                  opacity: visibleBlocks[block.id] ? 1 : 0,
                }}
              >
                <svg
                  style={{
                    position: 'absolute',
                    right: '-8px',
                    top: '-3px',
                    width: '8px',
                    height: '8px',
                  }}
                  viewBox="0 0 8 8"
                  fill="none"
                >
                  <path
                    d="M2 4L6 2L6 6Z"
                    fill={isDark ? '#00f0ff77' : '#1a1a2e77'}
                  />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
