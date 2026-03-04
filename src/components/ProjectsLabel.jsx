import { useStore } from '../store'
import { projects } from '../data/projects'

export default function ProjectsLabel() {
  const isDark = useStore((s) => s.isDark)
  const currentSection = useStore((s) => s.currentSection)
  const activeProject = useStore((s) => s.activeProject)
  const setShowModal = useStore((s) => s.setShowProjectModal)

  const visible = currentSection === 'projects'
  const project = activeProject >= 0 ? projects[activeProject] : null

  return (
    <div style={{
      position: 'fixed',
      bottom: '60px',
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'center',
      pointerEvents: 'none',
      zIndex: 5,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.4s ease',
      width: '90%',
      maxWidth: '500px',
    }}>
      {/* Section header */}
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: '11px',
        color: isDark ? '#00f0ff66' : '#1a1a2e44',
        letterSpacing: '0.2em',
        marginBottom: '8px',
      }}>
        BUILDING REALITY
      </div>

      {/* Project counter */}
      {project && (
        <div
          onClick={() => setShowModal(true)}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            color: isDark ? project.color : '#1a1a2e',
            letterSpacing: '0.1em',
            transition: 'color 0.3s ease',
            cursor: 'pointer',
            pointerEvents: 'auto',
            padding: '8px 16px',
            borderRadius: '6px',
            border: `1px solid ${isDark ? project.color + '44' : '#00000022'}`,
            display: 'inline-block',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = isDark ? project.color + '88' : '#00000044'
            e.currentTarget.style.background = isDark ? project.color + '11' : '#00000011'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = isDark ? project.color + '44' : '#00000022'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          {String(activeProject + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}
          <span style={{ marginLeft: '12px', opacity: 0.5 }}>
            {project.title}
          </span>
          <span style={{ marginLeft: '12px', opacity: 0.5 }}>→ View Case Study</span>
        </div>
      )}

      {/* Progress dots */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '6px',
        marginTop: '12px',
      }}>
        {projects.map((p, i) => (
          <div key={i} style={{
            width: i === activeProject ? '20px' : '6px',
            height: '6px',
            borderRadius: '3px',
            background: i === activeProject
              ? (isDark ? p.color : '#1a1a2e')
              : (isDark ? '#ffffff22' : '#00000022'),
            transition: 'all 0.4s ease',
            boxShadow: i === activeProject && isDark
              ? `0 0 10px ${p.color}55`
              : 'none',
          }} />
        ))}
      </div>
    </div>
  )
}
