import { useEffect, useState } from 'react'

const CircularProgress = ({ skill, percentage, isDark, color, category }) => {
  const [displayValue, setDisplayValue] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isVisible) {
      let current = 0
      const increment = percentage / 20
      const timer = setInterval(() => {
        current += increment
        if (current >= percentage) {
          setDisplayValue(percentage)
          clearInterval(timer)
        } else {
          setDisplayValue(Math.round(current))
        }
      }, 20)
      return () => clearInterval(timer)
    }
  }, [isVisible, percentage])

  const radius = 45
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <div
      onMouseEnter={() => setIsVisible(true)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '16px',
        animation: 'slideInLeft 0.6s ease-out forwards',
        opacity: 0,
      }}
    >
      <div style={{ position: 'relative', width: '120px', height: '120px' }}>
        <svg width="120" height="120" style={{ transform: 'rotate(-90deg)' }}>
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={isDark ? '#ffffff11' : '#00000011'}
            strokeWidth="3"
          />
          {/* Progress circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dashoffset 0.6s ease-out',
              filter: isDark ? `drop-shadow(0 0 8px ${color}88)` : 'none',
            }}
          />
        </svg>

        {/* Center text */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
          }}
        >
          <div
            style={{
              fontSize: '24px',
              fontWeight: 700,
              color: color,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {displayValue}
            <span style={{ fontSize: '14px', opacity: 0.6 }}>%</span>
          </div>
        </div>
      </div>

      {/* Skill name */}
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontSize: '14px',
            fontWeight: 600,
            color: isDark ? '#e0e6ed' : '#1a1a2e',
            fontFamily: "'Space Grotesk', sans-serif",
            marginBottom: '4px',
          }}
        >
          {skill}
        </div>
        <div
          style={{
            fontSize: '11px',
            color: isDark ? '#e0e6ed99' : '#1a1a2e99',
            fontFamily: "'JetBrains Mono', monospace",
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {category}
        </div>
      </div>
    </div>
  )
}

export default function SkillsVisualization({ isDark }) {
  const skillsData = [
    // Frontend
    { skill: 'React', percentage: 95, category: 'Frontend', color: '#00f0ff' },
    { skill: 'TypeScript', percentage: 90, category: 'Frontend', color: '#3b82f6' },
    { skill: 'Next.js', percentage: 92, category: 'Frontend', color: '#10b981' },
    { skill: 'Tailwind CSS', percentage: 94, category: 'Frontend', color: '#06b6d4' },

    // Backend
    { skill: 'Node.js', percentage: 88, category: 'Backend', color: '#ff3e9a' },
    { skill: 'PostgreSQL', percentage: 85, category: 'Backend', color: '#f59e0b' },
    { skill: 'GraphQL', percentage: 82, category: 'Backend', color: '#a855f7' },
    { skill: 'Python', percentage: 83, category: 'Backend', color: '#ec4899' },

    // Tools & Systems
    { skill: 'Docker', percentage: 85, category: 'Systems', color: '#06b6d4' },
    { skill: 'Git', percentage: 92, category: 'Systems', color: '#f97316' },
    { skill: 'AWS', percentage: 80, category: 'Systems', color: '#ff9900' },
    { skill: 'Linux', percentage: 87, category: 'Systems', color: '#fbbf24' },
  ]

  return (
    <div style={{ marginBottom: '32px' }}>
      <h3
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: isDark ? '#00f0ff' : '#1a1a2e',
          textTransform: 'uppercase',
          letterSpacing: '0.15em',
          marginBottom: '32px',
          opacity: 0.6,
        }}
      >
        Technical Skills
      </h3>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 'clamp(24px, 4vw, 40px)',
        }}
      >
        {skillsData.map((item, idx) => (
          <div key={`${item.skill}-${idx}`} style={{ animationDelay: `${idx * 0.08}s` }}>
            <CircularProgress
              skill={item.skill}
              percentage={item.percentage}
              isDark={isDark}
              color={item.color}
              category={item.category}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
