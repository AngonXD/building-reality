import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Floating geometric shapes that assemble into a structure
function FloatingShape({ position, rotation, geometry, color, speed, isDark }) {
  const ref = useRef()
  const initialPos = useMemo(() => [...position], [position])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime

    // Floating motion
    ref.current.position.x = initialPos[0] + Math.sin(t * speed * 0.5) * 0.15
    ref.current.position.y = initialPos[1] + Math.sin(t * speed * 0.7 + 1) * 0.1
    ref.current.position.z = initialPos[2] + Math.cos(t * speed * 0.3) * 0.1

    // Gentle rotation
    ref.current.rotation.x += 0.002 * speed
    ref.current.rotation.z += 0.001 * speed
  })

  return (
    <mesh ref={ref} position={position} rotation={rotation}>
      {geometry === 'box' && <boxGeometry args={[0.4, 0.4, 0.4]} />}
      {geometry === 'octahedron' && <octahedronGeometry args={[0.25]} />}
      {geometry === 'torus' && <torusGeometry args={[0.2, 0.08, 8, 16]} />}
      {geometry === 'icosahedron' && <icosahedronGeometry args={[0.22]} />}
      {geometry === 'tetrahedron' && <tetrahedronGeometry args={[0.25]} />}
      <meshStandardMaterial
        color={color}
        wireframe={isDark}
        emissive={isDark ? new THREE.Color(color) : undefined}
        emissiveIntensity={isDark ? 0.3 : 0}
        metalness={isDark ? 0.3 : 0.1}
        roughness={isDark ? 0.4 : 0.6}
        transparent
        opacity={isDark ? 0.8 : 0.9}
      />
    </mesh>
  )
}

// Data lines connecting shapes
function DataLine({ start, end, color, isDark }) {
  const ref = useRef()
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ], [start, end])
  const lineGeometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])

  useFrame((state) => {
    if (ref.current) {
      ref.current.material.opacity = isDark
        ? 0.15 + Math.sin(state.clock.elapsedTime * 2) * 0.1
        : 0.05
    }
  })

  if (!isDark) return null

  return (
    <line ref={ref} geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.2} />
    </line>
  )
}

export default function HeroGeometry({ isDark = true }) {
  const shapes = [
    { pos: [-2, 1.5, -1], rot: [0.5, 0.3, 0], geo: 'octahedron', color: '#00f0ff', speed: 1.2 },
    { pos: [2, 1, -2], rot: [0.2, 0.8, 0.1], geo: 'box', color: '#ff3e9a', speed: 0.8 },
    { pos: [-1.5, -0.5, -1.5], rot: [0, 0.5, 0.3], geo: 'torus', color: '#a855f7', speed: 1 },
    { pos: [1.5, -1, -0.5], rot: [0.3, 0, 0.5], geo: 'icosahedron', color: '#f59e0b', speed: 1.3 },
    { pos: [0, 2, -2.5], rot: [0.1, 0.2, 0.4], geo: 'tetrahedron', color: '#10b981', speed: 0.9 },
    { pos: [-0.5, 0.5, -0.5], rot: [0.4, 0.1, 0.2], geo: 'box', color: '#00f0ff', speed: 1.1 },
    { pos: [0.8, -0.2, -1.8], rot: [0.6, 0.3, 0.1], geo: 'octahedron', color: '#ff3e9a', speed: 0.7 },
  ]

  const lines = [
    { start: [-2, 1.5, -1], end: [2, 1, -2], color: '#00f0ff' },
    { start: [2, 1, -2], end: [1.5, -1, -0.5], color: '#ff3e9a' },
    { start: [-1.5, -0.5, -1.5], end: [0, 2, -2.5], color: '#a855f7' },
    { start: [0, 2, -2.5], end: [-2, 1.5, -1], color: '#10b981' },
    { start: [-0.5, 0.5, -0.5], end: [0.8, -0.2, -1.8], color: '#00f0ff' },
  ]

  return (
    <group>
      {shapes.map((s, i) => (
        <FloatingShape
          key={i}
          position={s.pos}
          rotation={s.rot}
          geometry={s.geo}
          color={s.color}
          speed={s.speed}
          isDark={isDark}
        />
      ))}
      {lines.map((l, i) => (
        <DataLine
          key={i}
          start={l.start}
          end={l.end}
          color={l.color}
          isDark={isDark}
        />
      ))}
    </group>
  )
}
