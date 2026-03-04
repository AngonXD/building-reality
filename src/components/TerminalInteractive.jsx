import { useRef, useState, useEffect } from 'react'
import { useStore } from '../store'
import { executeCommand } from '../utils/terminalCommands'

export default function TerminalInteractive() {
  const isDark = useStore((s) => s.isDark)
  const [history, setHistory] = useState([
    {
      type: 'welcome',
      text: 'Welcome to Anish Rej\'s portfolio terminal. Type "help" for available commands.',
    },
  ])
  const [input, setInput] = useState('')
  const [displayedOutput, setDisplayedOutput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const terminalRef = useRef(null)
  const inputRef = useRef(null)

  // Type out output character by character
  useEffect(() => {
    if (displayedOutput.length < (history[history.length - 1]?.fullOutput || '').length) {
      const timer = setTimeout(() => {
        setDisplayedOutput((prev) => prev + (history[history.length - 1]?.fullOutput || '').charAt(prev.length))
      }, 15)
      return () => clearTimeout(timer)
    } else {
      setIsTyping(false)
    }
  }, [displayedOutput, history])

  // Scroll to bottom
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history, displayedOutput])

  const handleExecute = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      const command = input.trim()
      const result = executeCommand(command)

      if (result.isClear) {
        setHistory([])
        setDisplayedOutput('')
      } else {
        setHistory((prev) => [
          ...prev,
          { type: 'command', text: command },
          { type: 'output', fullOutput: result.output },
        ])
        setDisplayedOutput('')
        setIsTyping(true)
      }

      setInput('')
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '400px',
        maxWidth: 'calc(100% - 40px)',
        background: isDark ? 'rgba(15, 15, 15, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(30px)',
        border: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}`,
        borderRadius: '12px',
        overflow: 'hidden',
        zIndex: 50,
        boxShadow: isDark ? '0 0 30px rgba(0, 240, 255, 0.15)' : '0 8px 32px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '500px',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '12px 16px',
          borderBottom: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          background: isDark ? 'rgba(26, 26, 42, 0.5)' : 'rgba(0, 0, 0, 0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            fontSize: '12px',
            fontFamily: "'JetBrains Mono', monospace",
            color: isDark ? '#00f0ff' : '#1a1a2e',
            letterSpacing: '0.1em',
            fontWeight: 600,
          }}
        >
          anish@portfolio
        </div>
        <div style={{ fontSize: '10px', color: isDark ? '#00f0ff77' : '#1a1a2e77' }}>
          TERMINAL
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={terminalRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 16px',
          fontSize: '11px',
          fontFamily: "'JetBrains Mono', monospace",
          color: isDark ? '#00f0ff' : '#1a1a2e',
          lineHeight: 1.6,
          minHeight: '150px',
          maxHeight: '380px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
        }}
      >
        {history.map((item, idx) => (
          <div key={idx}>
            {item.type === 'welcome' && (
              <div style={{ opacity: 0.7, marginBottom: '8px' }}>
                {item.text}
              </div>
            )}
            {item.type === 'command' && (
              <div style={{ marginBottom: '4px', color: isDark ? '#e0e6ed' : '#1a1a2e' }}>
                <span style={{ opacity: 0.5 }}>{'> '}</span>
                {item.text}
              </div>
            )}
            {item.type === 'output' && (
              <div
                style={{
                  marginBottom: '8px',
                  opacity: idx === history.length - 1 ? 1 : 0.8,
                }}
              >
                {idx === history.length - 1 ? displayedOutput : item.fullOutput}
                {idx === history.length - 1 && isTyping && (
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
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div
        style={{
          padding: '8px 16px',
          borderTop: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          background: isDark ? 'rgba(26, 26, 42, 0.3)' : 'rgba(0, 0, 0, 0.01)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        <span style={{ opacity: 0.5 }}>{'> '}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleExecute}
          placeholder="Type a command..."
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: isDark ? '#00f0ff' : '#1a1a2e',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '11px',
            outline: 'none',
            padding: 0,
          }}
          autoFocus
        />
      </div>

      {/* Scrollbar hint */}
      {history.length > 0 && (
        <div
          style={{
            fontSize: '9px',
            padding: '4px 16px',
            background: isDark ? 'rgba(26, 26, 42, 0.5)' : 'rgba(0, 0, 0, 0.02)',
            color: isDark ? '#00f0ff44' : '#1a1a2e44',
            letterSpacing: '0.05em',
            textAlign: 'center',
          }}
        >
          Type "help" for commands
        </div>
      )}
    </div>
  )
}
