import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '../store'
import LabCard from '../components/LabCard'

const labProjects = [
  {
    id: 1,
    title: 'AI Blood Group Detection',
    shortDesc: 'ML model for classifying blood types from microscopy images',
    fullDesc:
      'Developed a deep learning model using convolutional neural networks to automatically detect and classify blood group types from microscopy images. The system achieved 94% accuracy on test datasets and can process images in real-time.',
    tags: ['AI', 'ML'],
    techStack: ['Python', 'TensorFlow', 'OpenCV', 'NumPy'],
    github: 'https://github.com',
    live: null,
  },
  {
    id: 2,
    title: 'Prompt Injection Detection',
    shortDesc: 'Security tool to detect and prevent prompt injection attacks on LLMs',
    fullDesc:
      'A sophisticated security framework designed to detect, analyze, and prevent prompt injection attacks targeting large language models. Features real-time pattern matching, contextual analysis, and adaptive filtering against emerging attack vectors.',
    tags: ['Security', 'AI'],
    techStack: ['Node.js', 'TypeScript', 'ML-Model', 'Express'],
    github: 'https://github.com',
    live: null,
  },
  {
    id: 3,
    title: 'Distributed GPU Compute',
    shortDesc: 'Distributed computing system for parallel GPU workload processing',
    fullDesc:
      'Built a distributed computing system that orchestrates GPU resources across multiple nodes for parallel processing of computationally intensive workloads. Implements load balancing, fault tolerance, and efficient resource allocation.',
    tags: ['Systems', 'ML'],
    techStack: ['CUDA', 'Docker', 'Kubernetes', 'Python'],
    github: 'https://github.com',
    live: null,
  },
  {
    id: 4,
    title: 'Linux Ethical Hacking Setup',
    shortDesc: 'Complete penetration testing environment with specialized tools',
    fullDesc:
      'Comprehensive ethical hacking laboratory environment featuring pre-configured penetration testing tools, vulnerability scanning utilities, and network analysis frameworks. Includes documentation and practical exercises for security research.',
    tags: ['Security', 'Systems'],
    techStack: ['Linux', 'Bash', 'Metasploit', 'Wireshark'],
    github: 'https://github.com',
    live: null,
  },
]

export default function Lab() {
  const isDark = useStore((s) => s.isDark)
  const [visibleCards, setVisibleCards] = useState({})

  useEffect(() => {
    labProjects.forEach((project, idx) => {
      const timer = setTimeout(() => {
        setVisibleCards((prev) => ({ ...prev, [project.id]: true }))
      }, idx * 100)
      return () => clearTimeout(timer)
    })
  }, [])

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: isDark ? '#0f0f0f' : '#f0f2f5',
        color: isDark ? '#e0e6ed' : '#1a1a2e',
        fontFamily: "'Space Grotesk', sans-serif",
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Gradient */}
      {isDark && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
            background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.05) 0%, rgba(15, 15, 15, 0.9) 25%, rgba(255, 62, 154, 0.03) 50%, rgba(15, 15, 15, 0.9) 75%, rgba(0, 240, 255, 0.05) 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradientShift 15s ease infinite',
          }}
        />
      )}

      {/* Scanline effect */}
      {isDark && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1,
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.01) 2px, rgba(0, 240, 255, 0.01) 4px)',
            opacity: 0.3,
          }}
        />
      )}

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header */}
        <header
          style={{
            padding: '40px 30px',
            borderBottom: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 'clamp(28px, 5vw, 48px)',
                fontWeight: 700,
                margin: '0 0 8px 0',
                color: isDark ? '#00f0ff' : '#1a1a2e',
              }}
            >
              Lab Experiments
            </h1>
            <p
              style={{
                fontSize: '14px',
                color: isDark ? '#e0e6ed99' : '#1a1a2e99',
                margin: 0,
                letterSpacing: '0.05em',
              }}
            >
              Exploring emerging technologies and security research
            </p>
          </div>

          {/* Back to home link */}
          <Link
            to="/"
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
              display: 'inline-block',
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
            ← Home
          </Link>
        </header>

        {/* Projects Grid */}
        <main style={{ padding: 'clamp(40px, 8vw, 80px) clamp(20px, 8vw, 60px)' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(20px, 3vw, 32px)',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            {labProjects.map((project) => (
              <div key={project.id} style={{ opacity: visibleCards[project.id] ? 1 : 0 }}>
                <LabCard card={project} isDark={isDark} />
              </div>
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            borderTop: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            fontSize: '12px',
            color: isDark ? '#ffffff44' : '#00000044',
            fontFamily: "'JetBrains Mono', monospace",
          }}
        >
          <p>Lab experiments showcase | Exploring research areas</p>
        </footer>
      </div>
    </div>
  )
}
