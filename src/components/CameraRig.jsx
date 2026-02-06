import { useRef } from 'react'
import { useScroll } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useStore } from '../store'
import { projects } from '../data/projects'

/*
  Scroll Layout (6 total pages):
  - Page 0-0.8:   Hero section (camera at center, looking at floating shapes)
  - Page 0.8-1.2: Transition to About
  - Page 1.2-2.0: About section
  - Page 2.0-5.0: Projects section (camera pans left to right)
  - Page 5.0-6.0: Contact section
*/

const TOTAL_PAGES = 7

// Camera positions for each section
const HERO_POS = new THREE.Vector3(0, 0.5, 6)
const HERO_LOOK = new THREE.Vector3(0, 0.5, 0)

const ABOUT_POS = new THREE.Vector3(0, 0.5, 4)
const ABOUT_LOOK = new THREE.Vector3(0, 0.5, 0)

// Projects: camera pans left to right
const projectSpacing = 4.5
const projectCount = projects.length
const projectStartX = -((projectCount - 1) * projectSpacing) / 2
const projectEndX = ((projectCount - 1) * projectSpacing) / 2

const PROJECTS_Z = 4.5
const PROJECTS_Y = 0.8

const CONTACT_POS = new THREE.Vector3(0, 0.5, 5)
const CONTACT_LOOK = new THREE.Vector3(0, 0.5, 0)

function lerp3(v, target, alpha) {
  v.x = THREE.MathUtils.lerp(v.x, target.x, alpha)
  v.y = THREE.MathUtils.lerp(v.y, target.y, alpha)
  v.z = THREE.MathUtils.lerp(v.z, target.z, alpha)
}

export default function CameraRig() {
  const scroll = useScroll()
  const { camera } = useThree()
  const setScrollProgress = useStore((s) => s.setScrollProgress)
  const setActiveProject = useStore((s) => s.setActiveProject)
  const setCurrentSection = useStore((s) => s.setCurrentSection)

  const targetPos = useRef(new THREE.Vector3()).current
  const targetLook = useRef(new THREE.Vector3()).current
  const currentLook = useRef(new THREE.Vector3(0, 0.5, 0)).current

  useFrame(() => {
    const offset = scroll.offset
    setScrollProgress(offset)

    // Normalize to sections
    const heroEnd = 0.12
    const aboutStart = 0.12
    const aboutEnd = 0.25
    const projectsStart = 0.25
    const projectsEnd = 0.82
    const contactStart = 0.82

    if (offset <= heroEnd) {
      // Hero section
      targetPos.copy(HERO_POS)
      targetLook.copy(HERO_LOOK)
      setCurrentSection('hero')
      setActiveProject(-1)
    } else if (offset <= aboutEnd) {
      // About section
      const t = (offset - aboutStart) / (aboutEnd - aboutStart)
      targetPos.lerpVectors(HERO_POS, ABOUT_POS, Math.min(t * 1.5, 1))
      targetLook.lerpVectors(HERO_LOOK, ABOUT_LOOK, Math.min(t * 1.5, 1))
      setCurrentSection('about')
      setActiveProject(-1)
    } else if (offset <= projectsEnd) {
      // Projects section - pan left to right
      const t = (offset - projectsStart) / (projectsEnd - projectsStart)
      const currentX = THREE.MathUtils.lerp(projectStartX, projectEndX, t)

      targetPos.set(currentX, PROJECTS_Y, PROJECTS_Z)
      targetLook.set(currentX, PROJECTS_Y - 0.1, 0)

      // Determine active project
      const projectIndex = Math.round(t * (projectCount - 1))
      setActiveProject(Math.max(0, Math.min(projectCount - 1, projectIndex)))
      setCurrentSection('projects')
    } else {
      // Contact section
      const t = (offset - contactStart) / (1 - contactStart)
      targetPos.lerpVectors(
        new THREE.Vector3(projectEndX, PROJECTS_Y, PROJECTS_Z),
        CONTACT_POS,
        Math.min(t * 2, 1)
      )
      targetLook.copy(CONTACT_LOOK)
      setCurrentSection('contact')
      setActiveProject(-1)
    }

    // Smooth camera movement
    lerp3(camera.position, targetPos, 0.04)
    lerp3(currentLook, targetLook, 0.04)
    camera.lookAt(currentLook)
  })

  return null
}

export { TOTAL_PAGES }
