import { useRef, useState, useEffect, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'
import { useStore } from '../store'

/* ────────────────────────────────────────────
   KDE Konsole-style terminal content generator
   ──────────────────────────────────────────── */
function generateTerminalLines(project, index) {
  const commands = [
    { type: 'prompt', text: `anish@kde-dev ~ $ cd ~/projects/${project.title.toLowerCase().replace(/\s+/g, '-')}` },
    { type: 'output', text: '' },
    { type: 'prompt', text: `anish@kde-dev ${project.title.toLowerCase().replace(/\s+/g, '-')} $ cat README.md` },
    { type: 'header', text: `# ${project.title}` },
    { type: 'dim', text: `> ${project.subtitle}` },
    { type: 'output', text: '' },
    { type: 'prompt', text: `anish@kde-dev ${project.title.toLowerCase().replace(/\s+/g, '-')} $ echo $STACK` },
    { type: 'tech', text: project.tech.join(' | ') },
    { type: 'output', text: '' },
    { type: 'prompt', text: `anish@kde-dev ${project.title.toLowerCase().replace(/\s+/g, '-')} $ npm run build` },
    { type: 'success', text: `> ${project.title.toLowerCase().replace(/\s+/g, '-')}@1.0.0 build` },
    { type: 'output', text: `> compiling ${project.tech.length * 12} modules...` },
    { type: 'progress', text: '' },
    { type: 'success', text: 'Build completed successfully in 2.4s' },
    { type: 'output', text: '' },
    { type: 'prompt', text: `anish@kde-dev ${project.title.toLowerCase().replace(/\s+/g, '-')} $ git log --oneline -5` },
    { type: 'git', text: `${(0xa3f + index * 0x1b2).toString(16)} feat: ${project.features?.[0] || 'initial commit'}` },
    { type: 'git', text: `${(0x92d + index * 0x0e1).toString(16)} fix: performance optimization` },
    { type: 'git', text: `${(0x81a + index * 0x0c4).toString(16)} feat: ${project.features?.[1] || 'add core logic'}` },
    { type: 'git', text: `${(0x70c + index * 0x0a3).toString(16)} chore: update dependencies` },
    { type: 'git', text: `${(0x604 + index * 0x091).toString(16)} feat: ${project.features?.[2] || 'setup project'}` },
    { type: 'output', text: '' },
    { type: 'prompt', text: `anish@kde-dev ${project.title.toLowerCase().replace(/\s+/g, '-')} $ npm test` },
    { type: 'test', text: `PASS  src/app.test.ts` },
    { type: 'test', text: `PASS  src/api/routes.test.ts` },
    { type: 'success', text: `Tests: ${8 + index * 3} passed, ${8 + index * 3} total` },
    { type: 'success', text: 'All tests passed.' },
    { type: 'output', text: '' },
    { type: 'prompt', text: `anish@kde-dev ${project.title.toLowerCase().replace(/\s+/g, '-')} $ _` },
  ]
  return commands
}

/* ─── Animated terminal text inside the Html overlay ─── */
function TerminalContent({ project, index, isActive, isDark, color }) {
  const [visibleLines, setVisibleLines] = useState(0)
  const lines = useMemo(() => generateTerminalLines(project, index), [project, index])
  const [progressWidth, setProgressWidth] = useState(0)

  useEffect(() => {
    if (!isActive) return
    setVisibleLines(0)
    setProgressWidth(0)

    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= lines.length) {
          clearInterval(interval)
          return prev
        }
        return prev + 1
      })
    }, 120)

    return () => clearInterval(interval)
  }, [isActive, lines.length])

  // Progress bar animation
  useEffect(() => {
    const progressLineIndex = lines.findIndex(l => l.type === 'progress')
    if (visibleLines > progressLineIndex && progressLineIndex >= 0) {
      const t = setInterval(() => {
        setProgressWidth((prev) => {
          if (prev >= 100) {
            clearInterval(t)
            return 100
          }
          return prev + 4
        })
      }, 30)
      return () => clearInterval(t)
    }
  }, [visibleLines, lines])

  const promptColor = isDark ? '#22d3ee' : '#0891b2'
  const successColor = isDark ? '#34d399' : '#059669'
  const headerColor = isDark ? '#f9fafb' : '#111827'
  const dimColor = isDark ? '#6b7280' : '#9ca3af'
  const techColor = isDark ? color : '#6366f1'
  const gitHash = isDark ? '#fbbf24' : '#d97706'
  const testColor = isDark ? '#a78bfa' : '#7c3aed'

  const getLineStyle = (line) => {
    switch (line.type) {
      case 'prompt': return { color: promptColor }
      case 'header': return { color: headerColor, fontWeight: 700, fontSize: '11px' }
      case 'dim': return { color: dimColor, fontStyle: 'italic' }
      case 'success': return { color: successColor }
      case 'tech': return { color: techColor, fontWeight: 600 }
      case 'git': return { color: gitHash }
      case 'test': return { color: testColor }
      case 'progress': return {}
      default: return { color: isDark ? '#9ca3af' : '#6b7280' }
    }
  }

  const barFull = Math.round(progressWidth / 4)
  const barEmpty = 25 - barFull
  const progressBar = `[${'='.repeat(barFull)}${barFull < 25 ? '>' : ''}${' '.repeat(Math.max(0, barEmpty - (barFull < 25 ? 1 : 0)))}] ${progressWidth}%`

  return (
    <div style={{
      width: '260px',
      height: '160px',
      overflow: 'hidden',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '8.5px',
      lineHeight: 1.6,
      color: isDark ? '#d1d5db' : '#374151',
      position: 'relative',
      background: isDark
        ? 'linear-gradient(180deg, #0c0c1d 0%, #111127 100%)'
        : 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
      borderRadius: '4px',
      padding: '0',
    }}>
      {/* KDE Konsole title bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 8px',
        background: isDark ? '#1a1a35' : '#e2e8f0',
        borderBottom: `1px solid ${isDark ? '#2a2a4a' : '#cbd5e1'}`,
        borderRadius: '4px 4px 0 0',
      }}>
        <div style={{ display: 'flex', gap: '3px' }}>
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#ef4444', display: 'block' }} />
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#f59e0b', display: 'block' }} />
          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'block' }} />
        </div>
        <span style={{
          fontSize: '7px',
          color: isDark ? '#64748b' : '#94a3b8',
          letterSpacing: '0.05em',
          flex: 1,
          textAlign: 'center',
        }}>
          {`Konsole - ${project.title.toLowerCase().replace(/\s+/g, '-')}`}
        </span>
      </div>

      {/* Terminal body */}
      <div style={{
        padding: '6px 8px',
        height: '138px',
        overflowY: 'hidden',
        display: 'flex',
        flexDirection: 'column-reverse',
      }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {lines.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{
              ...getLineStyle(line),
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              minHeight: line.type === 'output' ? '8px' : undefined,
            }}>
              {line.type === 'progress' ? (
                <span style={{ color: successColor }}>{progressBar}</span>
              ) : line.type === 'prompt' ? (
                <>
                  <span style={{ color: isDark ? '#34d399' : '#059669' }}>anish</span>
                  <span style={{ color: dimColor }}>@</span>
                  <span style={{ color: isDark ? '#818cf8' : '#6366f1' }}>kde-dev</span>
                  <span style={{ color: dimColor }}>{' '}{line.text.split('$ ')[0]?.split('kde-dev')[1] || ' ~'} $ </span>
                  <span style={{ color: isDark ? '#e5e7eb' : '#374151' }}>{line.text.split('$ ').slice(1).join('$ ')}</span>
                </>
              ) : line.type === 'test' ? (
                <>
                  <span style={{ color: successColor, fontWeight: 700 }}>{'PASS '}</span>
                  <span style={{ color: testColor }}>{line.text.replace('PASS  ', '')}</span>
                </>
              ) : line.text}
            </div>
          ))}
          {/* Blinking cursor */}
          {visibleLines >= lines.length && (
            <span style={{
              display: 'inline-block',
              width: '5px',
              height: '10px',
              background: promptColor,
              animation: 'typing-blink 1s step-end infinite',
              marginTop: '2px',
            }} />
          )}
        </div>
      </div>

      {/* Scanline overlay for dark mode */}
      {isDark && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: 'none',
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,240,255,0.02) 2px, rgba(0,240,255,0.02) 4px)',
          borderRadius: '4px',
        }} />
      )}
    </div>
  )
}

/* ─── Single holographic screen with terminal ─── */
function HolographicScreen({ project, index, position, isActive, isDark }) {
  const groupRef = useRef()
  const screenRef = useRef()
  const setSelectedProject = useStore((s) => s.setSelectedProject)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!groupRef.current) return

    const floatY = Math.sin(state.clock.elapsedTime * 0.8 + index * 1.2) * 0.08
    groupRef.current.position.y = position[1] + floatY

    const targetScale = isActive ? 1.05 : hovered ? 1.02 : 1
    groupRef.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.05
    )

    if (screenRef.current) {
      const intensity = isActive
        ? (isDark ? 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.15 : 0.1)
        : (isDark ? 0.2 : 0.02)
      screenRef.current.material.emissiveIntensity = THREE.MathUtils.lerp(
        screenRef.current.material.emissiveIntensity,
        intensity,
        0.05
      )
    }
  })

  const handleClick = (e) => {
    e.stopPropagation()
    setSelectedProject(project)
  }

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={handleClick}
      onPointerEnter={() => {
        setHovered(true)
        document.body.style.cursor = 'pointer'
      }}
      onPointerLeave={() => {
        setHovered(false)
        document.body.style.cursor = 'default'
      }}
    >
      {/* Screen frame */}
      <RoundedBox args={[3, 2, 0.06]} radius={0.04} smoothness={4}>
        <meshStandardMaterial
          color={isDark ? '#0a0a18' : '#eeeeef'}
          metalness={0.7}
          roughness={0.2}
        />
      </RoundedBox>

      {/* Screen surface */}
      <mesh ref={screenRef} position={[0, 0, 0.04]}>
        <planeGeometry args={[2.8, 1.8]} />
        <meshStandardMaterial
          color={isDark ? '#050518' : '#f8f8fa'}
          emissive={new THREE.Color(project.color)}
          emissiveIntensity={isDark ? 0.3 : 0.02}
          metalness={0.1}
          roughness={0.4}
        />
      </mesh>

      {/* Terminal content via Html overlay */}
      <Html
        position={[0, 0, 0.08]}
        transform
        occlude
        distanceFactor={4}
        style={{
          width: '260px',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <TerminalContent
          project={project}
          index={index}
          isActive={isActive}
          isDark={isDark}
          color={project.color}
        />

        {/* Project title bar below terminal */}
        <div style={{
          fontFamily: "'Space Grotesk', sans-serif",
          marginTop: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '1px',
            background: project.color,
            boxShadow: isDark ? `0 0 8px ${project.color}88` : 'none',
          }} />
          <span style={{
            fontWeight: 700,
            fontSize: '11px',
            color: isDark ? '#ffffff' : '#1a1a2e',
          }}>{project.title}</span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '8px',
            color: isDark ? '#64748b' : '#94a3b8',
          }}>{project.subtitle}</span>
        </div>

        {/* "click to expand" hint */}
        {isActive && (
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '8px',
            marginTop: '4px',
            color: project.color,
            opacity: 0.8,
          }}>
            {'> click to expand_'}
          </div>
        )}
      </Html>

      {/* Neon border glow (dark mode) */}
      {isDark && (
        <>
          <mesh position={[0, 1.03, 0.04]}>
            <boxGeometry args={[2.9, 0.008, 0.01]} />
            <meshBasicMaterial color={project.color} transparent opacity={isActive ? 0.8 : 0.3} />
          </mesh>
          <mesh position={[0, -1.03, 0.04]}>
            <boxGeometry args={[2.9, 0.008, 0.01]} />
            <meshBasicMaterial color={project.color} transparent opacity={isActive ? 0.8 : 0.3} />
          </mesh>
          <mesh position={[-1.43, 0, 0.04]}>
            <boxGeometry args={[0.008, 2.05, 0.01]} />
            <meshBasicMaterial color={project.color} transparent opacity={isActive ? 0.8 : 0.3} />
          </mesh>
          <mesh position={[1.43, 0, 0.04]}>
            <boxGeometry args={[0.008, 2.05, 0.01]} />
            <meshBasicMaterial color={project.color} transparent opacity={isActive ? 0.8 : 0.3} />
          </mesh>
        </>
      )}

      {/* Light mode shadow */}
      {!isDark && (
        <mesh position={[0, 0, -0.02]}>
          <planeGeometry args={[3.1, 2.1]} />
          <meshBasicMaterial color="#000000" transparent opacity={0.05} />
        </mesh>
      )}

      {/* Status LED */}
      <mesh position={[1.25, 0.85, 0.04]}>
        <circleGeometry args={[0.025, 16]} />
        <meshBasicMaterial
          color={isActive ? '#10b981' : (isDark ? '#334155' : '#cbd5e1')}
        />
      </mesh>
    </group>
  )
}

export default function ProjectScreens({ projects, isDark }) {
  const activeProject = useStore((s) => s.activeProject)
  const spacing = 4.5

  return (
    <group position={[0, 0.5, -1]}>
      {projects.map((project, index) => (
        <HolographicScreen
          key={project.id}
          project={project}
          index={index}
          position={[index * spacing - ((projects.length - 1) * spacing) / 2, 0, 0]}
          isActive={activeProject === index}
          isDark={isDark}
        />
      ))}
    </group>
  )
}
