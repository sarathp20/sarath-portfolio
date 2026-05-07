'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role:    'user' | 'assistant'
  content: string
}

// ── Animated Robot SVG ────────────────────────────────────────────────────────
function RobotIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-8 h-8"
    >
      {/* Antenna */}
      <line
        x1="20" y1="4" x2="20" y2="9"
        stroke="#09090b" strokeWidth="2" strokeLinecap="round"
      />
      <circle cx="20" cy="3" r="2" fill="#09090b">
        <animate
          attributeName="r"
          values="2;3;2"
          dur="1.5s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="1;0.4;1"
          dur="1.5s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Head */}
      <rect x="8" y="9" width="24" height="18" rx="4" fill="#09090b"/>

      {/* Eyes */}
      {open ? (
        <>
          <line x1="13" y1="15" x2="17" y2="19" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
          <line x1="17" y1="15" x2="13" y2="19" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
          <line x1="23" y1="15" x2="27" y2="19" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
          <line x1="27" y1="15" x2="23" y2="19" stroke="#fbbf24" strokeWidth="2" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <ellipse cx="15" cy="17" rx="3" ry="3" fill="#fbbf24">
            <animate
              attributeName="ry"
              values="3;0.3;3"
              dur="3s"
              repeatCount="indefinite"
            />
          </ellipse>
          <ellipse cx="25" cy="17" rx="3" ry="3" fill="#fbbf24">
            <animate
              attributeName="ry"
              values="3;0.3;3"
              dur="3s"
              begin="0.1s"
              repeatCount="indefinite"
            />
          </ellipse>
        </>
      )}

      {/* Mouth */}
      <rect x="13" y="22" width="14" height="3" rx="1.5" fill="#fbbf24" opacity="0.8"/>

      {/* Body */}
      <rect x="11" y="29" width="18" height="8" rx="3" fill="#09090b"/>

      {/* Body buttons */}
      <circle cx="17" cy="33" r="1.5" fill="#fbbf24" opacity="0.6"/>
      <circle cx="23" cy="33" r="1.5" fill="#fbbf24" opacity="0.6"/>
    </svg>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function ChatWidget() {
  const [open,     setOpen]     = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role:    'assistant',
      content: "Hi! I'm Sarath's AI assistant. Ask me anything about his experience, skills, or projects.",
    },
  ])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Auto scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend() {
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: userMessage },
    ]
    setMessages(newMessages)
    setLoading(true)

    // Add empty assistant message to stream into
    setMessages(prev => [...prev, { role: 'assistant', content: '' }])

    try {
      const res = await fetch('/api/chat', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: newMessages.slice(1), // skip initial greeting
        }),
      })

      if (!res.body) throw new Error('No response body')

      const reader  = res.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const token = decoder.decode(value)

        setMessages(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            role:    'assistant',
            content: updated[updated.length - 1].content + token,
          }
          return updated
        })
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role:    'assistant',
          content: 'Sorry, something went wrong. Please try again.',
        }
        return updated
      })
    } finally {
      setLoading(false)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <>
      {/* ── Wiggle keyframe ── */}
      <style>{`
        @keyframes wiggle {
          0%, 85%, 100% { transform: rotate(0deg) scale(1); }
          88%            { transform: rotate(-10deg) scale(1.08); }
          92%            { transform: rotate(10deg) scale(1.08); }
          96%            { transform: rotate(-5deg) scale(1.04); }
          98%            { transform: rotate(3deg) scale(1.02); }
        }
      `}</style>

      {/* ── Robot button + tooltip ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-2">

        {/* Bouncing tooltip — only when closed */}
        {!open && (
          <div className="animate-bounce">
            <div className="bg-zinc-900 border border-zinc-700 text-zinc-300 text-xs px-3 py-1.5 rounded-full font-mono whitespace-nowrap shadow-lg">
              Ask me about Sarath ✨
            </div>
          </div>
        )}

        <button
          onClick={() => setOpen(prev => !prev)}
          aria-label={open ? 'Close chat' : 'Open AI assistant'}
          style={{
            animation: !open ? 'wiggle 2.5s ease-in-out infinite' : 'none',
          }}
          className="w-16 h-16 rounded-full bg-amber-400 flex items-center justify-center shadow-lg shadow-amber-400/20 hover:bg-amber-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950"
        >
          <RobotIcon open={open} />
        </button>
      </div>

      {/* ── Chat window ── */}
      {open && (
        <div className="fixed bottom-28 right-6 z-50 w-80 sm:w-96 flex flex-col rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl overflow-hidden">

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-zinc-800 bg-zinc-900">
            <div className="w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center shrink-0">
              <svg viewBox="0 0 20 20" fill="none" className="w-5 h-5">
                <line x1="10" y1="1" x2="10" y2="4" stroke="#09090b" strokeWidth="1.5" strokeLinecap="round"/>
                <circle cx="10" cy="1" r="1" fill="#09090b"/>
                <rect x="3" y="4" width="14" height="10" rx="2.5" fill="#09090b"/>
                <ellipse cx="7" cy="9" rx="1.8" ry="1.8" fill="#fbbf24"/>
                <ellipse cx="13" cy="9" rx="1.8" ry="1.8" fill="#fbbf24"/>
                <rect x="6" y="12" width="8" height="1.5" rx="0.75" fill="#fbbf24" opacity="0.8"/>
                <rect x="6" y="15" width="8" height="4" rx="1.5" fill="#09090b"/>
                <circle cx="8.5" cy="17" r="0.8" fill="#fbbf24" opacity="0.6"/>
                <circle cx="11.5" cy="17" r="0.8" fill="#fbbf24" opacity="0.6"/>
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-zinc-100">Sarath's AI Assistant</p>
              <p className="text-xs text-zinc-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"/>
                Powered by Gemini
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-zinc-500 hover:text-zinc-300 transition-colors text-lg leading-none"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex flex-col gap-3 p-4 overflow-y-auto max-h-80 min-h-[200px]">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-amber-400 text-zinc-950 rounded-br-sm'
                    : 'bg-zinc-800 text-zinc-100 rounded-bl-sm'
                }`}>
                  {msg.content || (
                    <span className="flex gap-1 items-center py-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce"/>
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.15s]"/>
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.3s]"/>
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-2 px-3 py-3 border-t border-zinc-800">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask about Sarath..."
              disabled={loading}
              className="flex-1 bg-zinc-800 rounded-full px-4 py-2 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:ring-1 focus:ring-amber-400/50 disabled:opacity-50 transition-all"
            />
            <button
              onClick={handleSend}
              disabled={loading || !input.trim()}
              className="w-8 h-8 rounded-full bg-amber-400 text-zinc-950 flex items-center justify-center text-sm font-bold hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
              aria-label="Send message"
            >
              →
            </button>
          </div>

        </div>
      )}
    </>
  )
}