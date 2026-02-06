import CameraRig from './CameraRig'
import TerminalSetup from './Terminal'
import ProjectScreens from './ProjectScreen'
import HeroGeometry from './HeroGeometry'
import { projects } from '../data/projects'
import { useStore } from '../store'

export default function Scene() {
  const isDark = useStore((s) => s.isDark)

  return (
    <>
      <CameraRig />

      {/* Hero floating geometry */}
      <group position={[0, 0.5, 0]}>
        <HeroGeometry isDark={isDark} />
      </group>

      {/* Terminal desk setup */}
      <TerminalSetup isDark={isDark} />

      {/* Project holographic screens */}
      <ProjectScreens projects={projects} isDark={isDark} />

      {/* Ambient environment lighting */}
      {isDark ? (
        <>
          <pointLight position={[0, 3, 4]} intensity={0.5} color="#00f0ff" />
          <pointLight position={[-5, 2, 2]} intensity={0.3} color="#ff3e9a" />
          <pointLight position={[5, 2, 2]} intensity={0.3} color="#a855f7" />
        </>
      ) : (
        <>
          <pointLight position={[0, 5, 5]} intensity={1} color="#ffffff" />
          <pointLight position={[-5, 3, 3]} intensity={0.5} color="#f0f0f0" />
        </>
      )}
    </>
  )
}
