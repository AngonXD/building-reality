import { useEffect, useState } from 'react'

export default function TypingText({ text, speed = 50, isDark = true }) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)
      return () => clearTimeout(timer)
    } else if (displayedText.length === text.length) {
      setIsComplete(true)
    }
  }, [displayedText, text, speed])

  return (
    <span>
      {displayedText}
      {!isComplete && (
        <span
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            backgroundColor: isDark ? '#00f0ff' : '#1a1a2e',
            marginLeft: '4px',
            animation: 'typing-blink 1s step-end infinite',
          }}
        />
      )}
    </span>
  )
}
