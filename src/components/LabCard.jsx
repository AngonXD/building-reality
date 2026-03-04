import { useState } from 'react'

export default function LabCard({ card, isDark }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getTagColor = (tag) => {
    const colors = {
      AI: '#00f0ff',
      Security: '#ff3e9a',
      ML: '#a855f7',
      Systems: '#3b82f6',
    }
    return colors[tag] || '#00f0ff'
  }

  return (
    <>
      {/* Card */}
      <div
        onClick={() => setIsExpanded(true)}
        style={{
          background: isDark ? 'rgba(26, 26, 42, 0.8)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(30px)',
          border: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
          borderRadius: '16px',
          padding: '24px',
          cursor: 'pointer',
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: 'translateY(0) scale(1)',
          boxShadow: isDark ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.05)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          animation: 'slideInLeft 0.6s ease-out forwards',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'
          e.currentTarget.style.boxShadow = isDark
            ? '0 0 40px rgba(0, 240, 255, 0.2)'
            : '0 8px 32px rgba(0, 0, 0, 0.1)'
          e.currentTarget.style.borderColor = isDark
            ? 'rgba(0, 240, 255, 0.4)'
            : 'rgba(0, 0, 0, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)'
          e.currentTarget.style.boxShadow = isDark ? 'none' : '0 4px 20px rgba(0, 0, 0, 0.05)'
          e.currentTarget.style.borderColor = isDark
            ? 'rgba(0, 240, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.1)'
        }}
      >
        {/* Title */}
        <h3
          style={{
            fontSize: '18px',
            fontWeight: 600,
            color: isDark ? '#00f0ff' : '#1a1a2e',
            fontFamily: "'Space Grotesk', sans-serif",
            margin: 0,
          }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontSize: '13px',
            color: isDark ? '#e0e6ed99' : '#1a1a2e99',
            lineHeight: 1.6,
            margin: 0,
            flex: 1,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          {card.shortDesc}
        </p>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            marginTop: 'auto',
          }}
        >
          {card.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '11px',
                padding: '4px 10px',
                borderRadius: '20px',
                background: `${getTagColor(tag)}22`,
                color: getTagColor(tag),
                border: `1px solid ${getTagColor(tag)}44`,
                fontFamily: "'JetBrains Mono', monospace",
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View Details Button */}
        <button
          style={{
            padding: '8px 16px',
            fontSize: '12px',
            fontFamily: "'JetBrains Mono', monospace",
            color: isDark ? '#00f0ff' : '#1a1a2e',
            border: `1px solid ${isDark ? '#00f0ff' : '#1a1a2e'}`,
            background: 'transparent',
            borderRadius: '6px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            marginTop: '8px',
          }}
          onClick={(e) => {
            e.stopPropagation()
            setIsExpanded(true)
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isDark ? '#00f0ff' : '#1a1a2e'
            e.currentTarget.style.color = isDark ? '#0f0f0f' : '#ffffff'
            e.currentTarget.style.boxShadow = isDark
              ? '0 0 20px rgba(0, 240, 255, 0.4)'
              : '0 4px 15px rgba(0, 0, 0, 0.2)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = isDark ? '#00f0ff' : '#1a1a2e'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          View Details
        </button>
      </div>

      {/* Modal Backdrop and Content */}
      {isExpanded && (
        <div
          onClick={() => setIsExpanded(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease-out',
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
              maxWidth: '600px',
              maxHeight: '85vh',
              overflowY: 'auto',
              animation: 'scrollReveal 0.4s ease-out',
            }}
          >
            {/* Close button */}
            <button
              onClick={() => setIsExpanded(false)}
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

            {/* Modal Content */}
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: isDark ? '#00f0ff' : '#1a1a2e',
                marginBottom: '16px',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {card.title}
            </h2>

            {/* Tags in modal */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {card.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '11px',
                    padding: '4px 10px',
                    borderRadius: '20px',
                    background: `${getTagColor(tag)}22`,
                    color: getTagColor(tag),
                    border: `1px solid ${getTagColor(tag)}44`,
                    fontFamily: "'JetBrains Mono', monospace",
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <p
              style={{
                fontSize: '14px',
                color: isDark ? '#e0e6ed' : '#1a1a2e',
                lineHeight: 1.8,
                marginBottom: '24px',
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              {card.fullDesc}
            </p>

            {/* Tech Stack */}
            {card.techStack && (
              <div style={{ marginBottom: '24px' }}>
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: isDark ? '#00f0ff' : '#1a1a2e',
                    marginBottom: '8px',
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Tech Stack
                </h3>
                <div
                  style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  {card.techStack.map((tech) => (
                    <span
                      key={tech}
                      style={{
                        fontSize: '12px',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        background: isDark ? 'rgba(26, 26, 42, 0.8)' : 'rgba(0, 0, 0, 0.05)',
                        color: isDark ? '#e0e6ed' : '#1a1a2e',
                        border: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0, 0, 0, 0.1)'}`,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Links */}
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px' }}>
              {card.github && (
                <a
                  href={card.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: `1px solid ${isDark ? '#00f0ff' : '#1a1a2e'}`,
                    color: isDark ? '#00f0ff' : '#1a1a2e',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? '#00f0ff' : '#1a1a2e'
                    e.currentTarget.style.color = isDark ? '#0f0f0f' : '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = isDark ? '#00f0ff' : '#1a1a2e'
                  }}
                >
                  GitHub
                </a>
              )}
              {card.live && (
                <a
                  href={card.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '10px 20px',
                    borderRadius: '8px',
                    border: `1px solid ${isDark ? '#ff3e9a' : '#1a1a2e'}`,
                    color: isDark ? '#ff3e9a' : '#1a1a2e',
                    textDecoration: 'none',
                    fontSize: '13px',
                    fontFamily: "'JetBrains Mono', monospace",
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = isDark ? '#ff3e9a' : '#1a1a2e'
                    e.currentTarget.style.color = isDark ? '#0f0f0f' : '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = isDark ? '#ff3e9a' : '#1a1a2e'
                  }}
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
