// components/CustomCursor.tsx
import { useEffect, useState, useRef } from 'react'

const lerp = (start: number, end: number, factor: number) => {
  return (1 - factor) * start + factor * end
}

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const requestRef = useRef<number>()
  const previousTimeRef = useRef<number>()
  const targetPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', onMouseMove)

    const animate = (time: number) => {
      if (previousTimeRef.current !== undefined) {
        const deltaTime = time - previousTimeRef.current
        if (deltaTime > 0) {
          setCursorPosition((prevPosition) => ({
            x: lerp(prevPosition.x, targetPosition.current.x, 0.1),
            y: lerp(prevPosition.y, targetPosition.current.y, 0.1)
          }))
        }
      }
      previousTimeRef.current = time
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [])

  return (
    <div
      style={{
        left: `${cursorPosition.x}px`,
        top: `${cursorPosition.y}px`
      }}
      className="pointer-events-none fixed z-50 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black transition-transform duration-100 ease-out"
    />
  )
}

export default CustomCursor
