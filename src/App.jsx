import { Canvas } from '@react-three/fiber'
import { ScrollControls } from '@react-three/drei'
import Scene from './components/Scene'
import HUD from './components/HUD'
import HeroOverlay from './components/HeroOverlay'
import AboutOverlay from './components/AboutOverlay'
import SystemArchitecture from './components/SystemArchitecture'
import ProjectModal from './components/ProjectModal'
import CaseStudyModal from './components/CaseStudyModal'
import ContactOverlay from './components/ContactOverlay'
import ProjectsLabel from './components/ProjectsLabel'
import TerminalInteractive from './components/TerminalInteractive'
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
        <color attach="background" args={[isDark ? '#0f0f0f' : '#f0f2f5']} />

        {/* Lighting */}
        <ambientLight intensity={isDark ? 0.4 : 0.8} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={isDark ? 1 : 1.5}
          color={isDark ? '#ffffff' : '#ffffff'}
        />

        {/* Fog */}
        <fog attach="fog" args={[isDark ? '#0f0f0f' : '#f0f2f5', 8, 25]} />

        <ScrollControls pages={TOTAL_PAGES} damping={0.15}>
          <Scene />
        </ScrollControls>
      </Canvas>

      {/* Animated Background Gradient */}
      {isDark && (
        <div style={{
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
        }} />
      )}

      {/* HTML Overlays */}
      <HUD />
      <HeroOverlay />
      <AboutOverlay />
      <SystemArchitecture />
      <ContactOverlay />
      <ProjectsLabel />
      <ProjectModal />
      <CaseStudyModal />
      <TerminalInteractive />

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
