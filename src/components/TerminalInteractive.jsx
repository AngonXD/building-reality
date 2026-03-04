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
  const [isMinimized, setIsMinimized] = useState(true)
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
    if (e && e.key === 'Enter' && input.trim()) {
      executeCmd()
    }
  }

  const executeCmd = () => {
    if (!input.trim()) return
    
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

  if (isMinimized) {
    return (
      <button
        onClick={() => setIsMinimized(false)}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          padding: '10px 16px',
          background: isDark ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(26, 26, 42, 0.95) 100%)' : 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(30px)',
          border: `1.5px solid ${isDark ? 'rgba(0, 240, 255, 0.35)' : 'rgba(0, 0, 0, 0.1)'}`,
          borderRadius: '10px',
          color: isDark ? '#00f0ff' : '#1a1a2e',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '12px',
          fontWeight: 600,
          cursor: 'pointer',
          zIndex: 50,
          boxShadow: isDark 
            ? '0 0 30px rgba(0, 240, 255, 0.2)' 
            : '0 4px 16px rgba(0, 0, 0, 0.1)',
          letterSpacing: '0.05em',
          transition: 'all 0.3s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = isDark ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.25) 0%, rgba(26, 26, 42, 0.98) 100%)' : 'rgba(255, 255, 255, 0.98)'
          e.currentTarget.style.boxShadow = isDark ? '0 0 40px rgba(0, 240, 255, 0.3)' : '0 6px 20px rgba(0, 0, 0, 0.15)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = isDark ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.15) 0%, rgba(26, 26, 42, 0.95) 100%)' : 'rgba(255, 255, 255, 0.95)'
          e.currentTarget.style.boxShadow = isDark ? '0 0 30px rgba(0, 240, 255, 0.2)' : '0 4px 16px rgba(0, 0, 0, 0.1)'
        }}
      >
        ▶ CLI
      </button>
    )
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        width: '450px',
        maxWidth: 'calc(100% - 40px)',
        background: isDark ? 'linear-gradient(135deg, rgba(15, 15, 15, 0.98) 0%, rgba(26, 26, 42, 0.95) 100%)' : 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(30px)',
        border: `1.5px solid ${isDark ? 'rgba(0, 240, 255, 0.25)' : 'rgba(0, 0, 0, 0.1)'}`,
        borderRadius: '14px',
        overflow: 'hidden',
        zIndex: 50,
        boxShadow: isDark 
          ? '0 0 40px rgba(0, 240, 255, 0.2), inset 0 1px 0 rgba(0, 240, 255, 0.1)' 
          : '0 8px 32px rgba(0, 0, 0, 0.12)',
        display: 'flex',
        flexDirection: 'column',
        maxHeight: '600px',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 18px',
          borderBottom: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`,
          background: isDark ? 'rgba(26, 26, 42, 0.6)' : 'rgba(0, 0, 0, 0.02)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: '#10b981',
            animation: 'glowPulse 2s ease-in-out infinite',
            boxShadow: '0 0 8px rgba(16, 185, 129, 0.6)'
          }} />
          <div
            style={{
              fontSize: '12px',
              fontFamily: "'JetBrains Mono', monospace",
              color: isDark ? '#00f0ff' : '#1a1a2e',
              letterSpacing: '0.08em',
              fontWeight: 600,
            }}
          >
            anish@portfolio
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            fontSize: '10px', 
            color: isDark ? '#00f0ff88' : '#1a1a2e88',
            letterSpacing: '0.05em'
          }}>
            CLI
          </div>
          <button
            onClick={() => setIsMinimized(true)}
            style={{
              background: 'transparent',
              border: 'none',
              color: isDark ? '#00f0ff88' : '#1a1a2e88',
              cursor: 'pointer',
              fontSize: '14px',
              padding: '4px 8px',
              transition: 'color 0.2s ease',
              fontFamily: "'JetBrains Mono', monospace",
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = isDark ? '#00f0ff' : '#1a1a2e'}
            onMouseLeave={(e) => e.currentTarget.style.color = isDark ? '#00f0ff88' : '#1a1a2e88'}
            title="Minimize"
          >
            −
          </button>
        </div>
      </div>

      {/* Terminal Output */}
      <div
        ref={terminalRef}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '14px 18px',
          fontSize: '12px',
          fontFamily: "'JetBrains Mono', monospace",
          color: isDark ? '#e0e6ed' : '#1a1a2e',
          lineHeight: 1.7,
          minHeight: '180px',
          maxHeight: '420px',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          background: isDark ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.01)',
        }}
      >
        {history.map((item, idx) => (
          <div key={idx}>
            {item.type === 'welcome' && (
              <div style={{ opacity: 0.6, marginBottom: '12px', color: isDark ? '#00f0ff' : '#1a1a2e' }}>
                <span style={{ fontSize: '10px' }}>{'$ '}</span>
                {item.text}
              </div>
            )}
            {item.type === 'command' && (
              <div style={{ marginBottom: '6px', color: isDark ? '#e0e6ed' : '#374151' }}>
                <span style={{ color: isDark ? '#00f0ff' : '#1a1a2e', fontWeight: 600 }}>{'❯ '}</span>
                <span style={{ color: isDark ? '#e0e6ed' : '#1a1a2e' }}>{item.text}</span>
              </div>
            )}
            {item.type === 'output' && (
              <div
                style={{
                  marginBottom: '12px',
                  opacity: idx === history.length - 1 ? 1 : 0.85,
                  color: isDark ? '#a0aec0' : '#6b7280',
                  lineHeight: 1.8,
                }}
              >
                {idx === history.length - 1 ? displayedOutput : item.fullOutput}
                {idx === history.length - 1 && isTyping && (
                  <span
                    style={{
                      display: 'inline-block',
                      width: '2px',
                      height: '1.2em',
                      backgroundColor: isDark ? '#00f0ff' : '#1a1a2e',
                      marginLeft: '3px',
                      verticalAlign: 'text-bottom',
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
          padding: '12px 18px',
          borderTop: `1.5px solid ${isDark ? 'rgba(0, 240, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)'}`,
          background: isDark ? 'rgba(26, 26, 42, 0.4)' : 'rgba(0, 0, 0, 0.01)',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ color: isDark ? '#00f0ff' : '#1a1a2e', fontWeight: 600, minWidth: '24px' }}>{'❯ '}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleExecute}
          placeholder="whoami, skills, projects, contact, help"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: isDark ? '#00f0ff' : '#1a1a2e',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '12px',
            outline: 'none',
            padding: 0,
          }}
          autoFocus
        />
        <button
          onClick={executeCmd}
          style={{
            background: isDark ? 'rgba(0, 240, 255, 0.15)' : 'rgba(26, 26, 42, 0.1)',
            border: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.3)' : 'rgba(26, 26, 42, 0.2)'}`,
            color: isDark ? '#00f0ff' : '#1a1a2e',
            cursor: 'pointer',
            padding: '6px 10px',
            borderRadius: '4px',
            fontSize: '12px',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 600,
            transition: 'all 0.2s ease',
            minWidth: '40px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = isDark ? 'rgba(0, 240, 255, 0.25)' : 'rgba(26, 26, 42, 0.15)'
            e.currentTarget.style.borderColor = isDark ? 'rgba(0, 240, 255, 0.5)' : 'rgba(26, 26, 42, 0.3)'
            e.currentTarget.style.boxShadow = isDark ? '0 0 10px rgba(0, 240, 255, 0.2)' : 'none'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isDark ? 'rgba(0, 240, 255, 0.15)' : 'rgba(26, 26, 42, 0.1)'
            e.currentTarget.style.borderColor = isDark ? 'rgba(0, 240, 255, 0.3)' : 'rgba(26, 26, 42, 0.2)'
            e.currentTarget.style.boxShadow = 'none'
          }}
          title="Send command (Ctrl+Enter)"
        >
          ↵
        </button>
      </div>

      {/* Footer hint */}
      <div
        style={{
          fontSize: '10px',
          padding: '8px 18px',
          background: isDark ? 'rgba(26, 26, 42, 0.5)' : 'rgba(0, 0, 0, 0.02)',
          color: isDark ? '#00f0ff66' : '#1a1a2e66',
          letterSpacing: '0.05em',
          textAlign: 'center',
          borderTop: `1px solid ${isDark ? 'rgba(0, 240, 255, 0.08)' : 'rgba(0, 0, 0, 0.05)'}`,
        }}
      >
        {history.length === 0 ? 'Start typing a command...' : '↑ ↓ scroll • clear to reset'}
      </div>
    </div>
  )
}
