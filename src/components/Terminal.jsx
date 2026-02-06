import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// A single terminal monitor with frame and screen
function Monitor({ position = [0, 0, 0], rotation = [0, 0, 0], scale = 1, color = '#00f0ff', isDark = true }) {
  const screenRef = useRef()
  const glowRef = useRef()
  const frameRef = useRef()

  useFrame((state) => {
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = isDark
        ? 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1
        : 0.05
    }
    if (glowRef.current) {
      glowRef.current.material.opacity = isDark
        ? 0.15 + Math.sin(state.clock.elapsedTime * 1.5) * 0.05
        : 0
    }
  })

  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Monitor frame */}
      <mesh ref={frameRef}>
        <boxGeometry args={[2.4, 1.5, 0.08]} />
        <meshStandardMaterial
          color={isDark ? '#0a0a1a' : '#e8e8ec'}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.05]}>
        <planeGeometry args={[2.2, 1.3]} />
        <meshStandardMaterial
          color={isDark ? '#030318' : '#f5f5f8'}
          emissive={new THREE.Color(color)}
          emissiveIntensity={isDark ? 0.3 : 0.05}
          metalness={0.1}
          roughness={0.3}
        />
      </mesh>

      {/* Screen glow (dark mode only) */}
      <mesh ref={glowRef} position={[0, 0, 0.06]}>
        <planeGeometry args={[2.6, 1.7]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={isDark ? 0.15 : 0}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Monitor stand */}
      <mesh position={[0, -0.95, -0.1]}>
        <boxGeometry args={[0.15, 0.5, 0.15]} />
        <meshStandardMaterial
          color={isDark ? '#0a0a1a' : '#d0d0d5'}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Monitor base */}
      <mesh position={[0, -1.22, 0]}>
        <boxGeometry args={[0.8, 0.06, 0.4]} />
        <meshStandardMaterial
          color={isDark ? '#0a0a1a' : '#d0d0d5'}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>

      {/* Screen border glow lines */}
      {isDark && (
        <>
          {/* Top line */}
          <mesh position={[0, 0.68, 0.06]}>
            <boxGeometry args={[2.3, 0.01, 0.01]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
          {/* Bottom line */}
          <mesh position={[0, -0.68, 0.06]}>
            <boxGeometry args={[2.3, 0.01, 0.01]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
          {/* Left line */}
          <mesh position={[-1.15, 0, 0.06]}>
            <boxGeometry args={[0.01, 1.35, 0.01]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
          {/* Right line */}
          <mesh position={[1.15, 0, 0.06]}>
            <boxGeometry args={[0.01, 1.35, 0.01]} />
            <meshBasicMaterial color={color} transparent opacity={0.6} />
          </mesh>
        </>
      )}
    </group>
  )
}

// Keyboard
function Keyboard({ position = [0, 0, 0], isDark = true }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1.8, 0.04, 0.6]} />
        <meshStandardMaterial
          color={isDark ? '#0d0d1a' : '#e0e0e5'}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>
      {/* Keys - simplified grid */}
      {Array.from({ length: 4 }).map((_, row) =>
        Array.from({ length: 12 }).map((_, col) => (
          <mesh
            key={`${row}-${col}`}
            position={[
              -0.74 + col * 0.13,
              0.03,
              -0.2 + row * 0.13
            ]}
          >
            <boxGeometry args={[0.1, 0.02, 0.1]} />
            <meshStandardMaterial
              color={isDark ? '#151530' : '#d5d5da'}
              metalness={0.4}
              roughness={0.5}
            />
          </mesh>
        ))
      )}
    </group>
  )
}

// Desk surface
function Desk({ position = [0, 0, 0], width = 14, isDark = true }) {
  return (
    <group position={position}>
      {/* Desktop surface */}
      <mesh>
        <boxGeometry args={[width, 0.08, 2.5]} />
        <meshStandardMaterial
          color={isDark ? '#0a0a15' : '#f0f0f3'}
          metalness={0.3}
          roughness={0.7}
        />
      </mesh>

      {/* Desk edge glow line */}
      {isDark && (
        <mesh position={[0, 0.05, 1.25]}>
          <boxGeometry args={[width, 0.01, 0.01]} />
          <meshBasicMaterial color="#00f0ff" transparent opacity={0.3} />
        </mesh>
      )}

      {/* Legs */}
      {[-(width / 2 - 0.3), (width / 2 - 0.3)].map((x, i) => (
        <mesh key={i} position={[x, -0.75, 0]}>
          <boxGeometry args={[0.1, 1.5, 0.1]} />
          <meshStandardMaterial
            color={isDark ? '#080812' : '#c0c0c5'}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
      ))}
    </group>
  )
}

// Floating particles around the terminal
function Particles({ count = 50, isDark = true }) {
  const mesh = useRef()

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8
      pos[i * 3 + 2] = (Math.random() - 0.5) * 8
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  if (!isDark) return null

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f0ff"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  )
}

// Grid floor
function GridFloor({ isDark = true }) {
  const gridRef = useRef()

  useFrame((state) => {
    if (gridRef.current && isDark) {
      gridRef.current.material.opacity = 0.15 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05
    }
  })

  return (
    <mesh ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <planeGeometry args={[40, 40, 40, 40]} />
      <meshBasicMaterial
        color={isDark ? '#00f0ff' : '#c0c0c5'}
        wireframe
        transparent
        opacity={isDark ? 0.15 : 0.08}
      />
    </mesh>
  )
}

export default function TerminalSetup({ isDark = true }) {
  return (
    <group>
      <Desk position={[0, -1.25, 0]} isDark={isDark} />
      <Keyboard position={[0, -1.18, 0.5]} isDark={isDark} />
      <GridFloor isDark={isDark} />
      <Particles isDark={isDark} count={80} />
    </group>
  )
}

export { Monitor, Keyboard, Desk, Particles, GridFloor }
