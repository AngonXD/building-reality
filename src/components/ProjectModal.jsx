import { useStore } from '../store'

export default function ProjectModal() {
  const isDark = useStore((s) => s.isDark)
  const selectedProject = useStore((s) => s.selectedProject)
  const setSelectedProject = useStore((s) => s.setSelectedProject)

  if (!selectedProject) return null

  const project = selectedProject

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDark ? 'rgba(5, 5, 16, 0.9)' : 'rgba(240, 242, 245, 0.9)',
        backdropFilter: 'blur(10px)',
        animation: 'fadeInUp 0.4s ease',
      }}
      onClick={() => setSelectedProject(null)}
    >
      <div
        className="glass"
        style={{
          width: '90%',
          maxWidth: '680px',
          maxHeight: '85vh',
          overflowY: 'auto',
          padding: 'clamp(24px, 4vw, 40px)',
          borderRadius: '12px',
          position: 'relative',
          border: isDark ? `1px solid ${project.color}33` : '1px solid #00000011',
          boxShadow: isDark
            ? `0 0 40px ${project.color}15, 0 0 80px ${project.color}08`
            : '0 4px 40px rgba(0,0,0,0.1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={() => setSelectedProject(null)}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '36px',
            height: '36px',
            border: `1px solid ${isDark ? '#ffffff22' : '#00000022'}`,
            background: 'transparent',
            color: isDark ? '#e0e6ed' : '#1a1a2e',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            borderRadius: '4px',
            fontFamily: "'JetBrains Mono', monospace",
            transition: 'all 0.2s ease',
          }}
          aria-label="Close project details"
        >
          x
        </button>

        {/* Project label */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '11px',
          color: project.color,
          letterSpacing: '0.15em',
          marginBottom: '8px',
          opacity: 0.7,
        }}>
          {'// PROJECT_0' + project.id}
        </div>

        {/* Title */}
        <h2 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 'clamp(24px, 4vw, 36px)',
          fontWeight: 700,
          color: isDark ? '#ffffff' : '#1a1a2e',
          marginBottom: '4px',
          lineHeight: 1.2,
        }}>
          {project.title}
        </h2>

        {/* Subtitle + Year */}
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '15px',
          color: isDark ? '#e0e6ed88' : '#1a1a2e88',
          marginBottom: '20px',
        }}>
          {project.subtitle}
          <span style={{
            marginLeft: '12px',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            padding: '2px 8px',
            border: `1px solid ${isDark ? project.color + '44' : '#00000022'}`,
            borderRadius: '3px',
            color: isDark ? project.color : '#555',
          }}>
            {project.year}
          </span>
        </div>

        {/* Role */}
        <div style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          color: isDark ? '#00f0ff' : '#1a1a2e',
          marginBottom: '20px',
          opacity: 0.6,
        }}>
          Role: {project.role}
        </div>

        {/* Description */}
        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: '15px',
          lineHeight: 1.7,
          color: isDark ? '#e0e6edcc' : '#1a1a2ecc',
          marginBottom: '24px',
        }}>
          {project.description}
        </p>

        {/* Features */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: isDark ? '#00f0ff' : '#1a1a2e',
            letterSpacing: '0.1em',
            marginBottom: '12px',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}>
            Key Features
          </div>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            {project.features.map((feature, i) => (
              <li key={i} style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '14px',
                color: isDark ? '#e0e6edaa' : '#1a1a2eaa',
                paddingLeft: '16px',
                position: 'relative',
              }}>
                <span style={{
                  position: 'absolute',
                  left: 0,
                  color: project.color,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '12px',
                }}>
                  {'>>'}
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech stack */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            color: isDark ? '#00f0ff' : '#1a1a2e',
            letterSpacing: '0.1em',
            marginBottom: '12px',
            textTransform: 'uppercase',
            opacity: 0.6,
          }}>
            Tech Stack
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {project.tech.map((t, i) => (
              <span key={i} style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '12px',
                padding: '5px 14px',
                border: `1px solid ${isDark ? project.color + '44' : '#00000018'}`,
                borderRadius: '4px',
                color: isDark ? project.color : '#1a1a2e',
                background: isDark ? `${project.color}08` : '#f5f5f8',
              }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
        }}>
          <a href={project.link} className="btn-primary" target="_blank" rel="noopener noreferrer">
            View Live
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
          <a href={project.github} className="btn-primary" target="_blank" rel="noopener noreferrer">
            Source Code
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
            </svg>
          </a>
        </div>

        {/* Decorative accent line */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '40px',
          right: '40px',
          height: '2px',
          background: isDark
            ? `linear-gradient(90deg, transparent, ${project.color}66, transparent)`
            : `linear-gradient(90deg, transparent, #1a1a2e22, transparent)`,
          borderRadius: '1px',
        }} />
      </div>
    </div>
  )
}
