import { useState, useEffect } from 'react'

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    let throttleTimer
    const handleMouseMove = (e) => {
      if (throttleTimer) return

      throttleTimer = setTimeout(() => {
        setPosition({ x: e.clientX, y: e.clientY })
        throttleTimer = null
      }, 16) // ~60fps
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return position
}
