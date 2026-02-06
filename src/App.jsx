import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import Scene from './components/Scene'
import HUD from './components/HUD'
import HeroOverlay from './components/HeroOverlay'
import AboutOverlay from './components/AboutOverlay'
import ProjectModal from './components/ProjectModal'
import ContactOverlay from './components/ContactOverlay'
import ProjectsLabel from './components/ProjectsLabel'
import { useStore } from './store'
import { TOTAL_PAGES } from './components/CameraRig'

export default function App() {
  const isDark = useStore((s) => s.isDark)

  return (
    <>
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 50 }}
        gl={{ antialias: true, alpha: false }}
        dpr={[1, 2]}
      >
        <color attach="background" args={[isDark ? '#050510' : '#f0f2f5']} />

        {/* Lighting */}
        <ambientLight intensity={isDark ? 0.4 : 0.8} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={isDark ? 1 : 1.5}
          color={isDark ? '#ffffff' : '#ffffff'}
        />

        {/* Fog */}
        <fog attach="fog" args={[isDark ? '#050510' : '#f0f2f5', 8, 25]} />

        <ScrollControls pages={TOTAL_PAGES} damping={0.15}>
          <Scene />
        </ScrollControls>
      </Canvas>

      {/* HTML Overlays */}
      <HUD />
      <HeroOverlay />
      <AboutOverlay />
      <ContactOverlay />
      <ProjectsLabel />
      <ProjectModal />

      {/* Scanline effect for dark mode */}
      {isDark && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.01) 2px, rgba(0, 240, 255, 0.01) 4px)',
          opacity: 0.3,
        }} />
      )}
    </>
  )
}
