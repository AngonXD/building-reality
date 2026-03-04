import { useStore } from '../store'
import { projects } from '../data/projects'

export default function CaseStudyModal() {
  const isDark = useStore((s) => s.isDark)
  const activeProject = useStore((s) => s.activeProject)
  const showModal = useStore((s) => s.showProjectModal)
  const setShowModal = useStore((s) => s.setShowProjectModal)

  if (!showModal || activeProject < 0 || activeProject >= projects.length) {
    return null
  }

  const project = projects[activeProject]

  return (
    <div
      onClick={() => setShowModal(false)}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(12px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.3s ease-out',
        overflowY: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: isDark ? 'rgba(15, 15, 15, 0.95)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(30px)',
          border: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
          borderRadius: '20px',
          padding: '40px',
          maxWidth: '700px',
          maxHeight: '90vh',
          overflowY: 'auto',
          animation: 'scrollReveal 0.4s ease-out',
          margin: 'auto',
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setShowModal(false)}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '32px',
            height: '32px',
            background: isDark ? 'rgba(26, 26, 42, 0.5)' : 'rgba(0, 0, 0, 0.05)',
            border: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isDark ? '#00f0ff' : '#1a1a2e',
            fontSize: '20px',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isDark ? '#00f0ff22' : '#1a1a2e11'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDark
              ? 'rgba(26, 26, 42, 0.5)'
              : 'rgba(0, 0, 0, 0.05)'
          }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ marginBottom: '24px' }}>
          <h2
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: project.color,
              margin: '0 0 8px 0',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {project.title}
          </h2>
          <p
            style={{
              fontSize: '14px',
              color: isDark ? '#e0e6ed99' : '#1a1a2e99',
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {project.subtitle} · {project.year}
          </p>
        </div>

        {/* The Problem */}
        <section style={{ marginBottom: '28px' }}>
          <h3
            style={{
              fontSize: '16px',
              fontWeight: 600,
              color: isDark ? '#00f0ff' : '#1a1a2e',
              marginBottom: '8px',
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              fontSize: '12px',
            }}
          >
            The Problem
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: isDark ? '#e0e6ed' : '#1a1a2e',
              lineHeight: 1.8,
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {project.problem}
          </p>
        </section>

        {/* Why I Built It */}
        <section style={{ marginBottom: '28px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: isDark ? '#00f0ff' : '#1a1a2e',
              marginBottom: '8px',
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Why I Built It
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: isDark ? '#e0e6ed' : '#1a1a2e',
              lineHeight: 1.8,
              margin: 0,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {project.whyBuilt}
          </p>
        </section>

        {/* Architecture */}
        <section style={{ marginBottom: '28px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: isDark ? '#00f0ff' : '#1a1a2e',
              marginBottom: '8px',
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Architecture & Tech
          </h3>
          <p
            style={{
              fontSize: '14px',
              color: isDark ? '#e0e6ed' : '#1a1a2e',
              lineHeight: 1.8,
              margin: '0 0 12px 0',
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {project.architecture}
          </p>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  fontSize: '11px',
                  padding: '4px 10px',
                  borderRadius: '20px',
                  background: isDark ? `${project.color}22` : `${project.color}11`,
                  color: project.color,
                  border: `1px solid ${project.color}44`,
                  fontFamily: "'JetBrains Mono', monospace",
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Challenges */}
        <section style={{ marginBottom: '28px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: isDark ? '#00f0ff' : '#1a1a2e',
              marginBottom: '8px',
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Challenges
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '14px',
              color: isDark ? '#e0e6ed' : '#1a1a2e',
              lineHeight: 1.8,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {project.challenges.map((challenge, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>
                {challenge}
              </li>
            ))}
          </ul>
        </section>

        {/* Learnings */}
        <section style={{ marginBottom: '28px' }}>
          <h3
            style={{
              fontSize: '12px',
              fontWeight: 600,
              color: isDark ? '#00f0ff' : '#1a1a2e',
              marginBottom: '8px',
              fontFamily: "'Space Grotesk', sans-serif",
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Key Learnings
          </h3>
          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              fontSize: '14px',
              color: isDark ? '#e0e6ed' : '#1a1a2e',
              lineHeight: 1.8,
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {project.learnings.map((learning, idx) => (
              <li key={idx} style={{ marginBottom: '6px' }}>
                {learning}
              </li>
            ))}
          </ul>
        </section>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
          {project.github !== '#' && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: `1px solid ${project.color}`,
                color: project.color,
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: "'JetBrains Mono', monospace",
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = project.color
                e.currentTarget.style.color = isDark ? '#0f0f0f' : '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = project.color
              }}
            >
              GitHub
            </a>
          )}
          {project.liveLink !== '#' && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: '10px 20px',
                borderRadius: '8px',
                border: `1px solid ${project.color}`,
                color: project.color,
                textDecoration: 'none',
                fontSize: '13px',
                fontFamily: "'JetBrains Mono', monospace",
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                background: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = project.color
                e.currentTarget.style.color = isDark ? '#0f0f0f' : '#ffffff'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = project.color
              }}
            >
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
