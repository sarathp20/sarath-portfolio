// app/contact/page.tsx
'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [status, setStatus] = useState<FormState>('idle')
    const [errorMsg, setErrorMsg] = useState('')

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setStatus('loading')
        setErrorMsg('')

        try {
            // POST to your Route Handler
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            })

            const data = await res.json()

            if (!res.ok) {
                setErrorMsg(data.error ?? 'Something went wrong.')
                setStatus('error')
                return
            }

            setStatus('success')
            setName('')
            setEmail('')
            setMessage('')

        } catch {
            setErrorMsg('Could not connect. Please try again.')
            setStatus('error')
        }
    }

    return (
        <main className="mx-auto max-w-5xl px-6 py-20">
            <p className="font-mono text-sm text-amber-400">05. contact</p>
            <h1 className="mt-2 text-4xl font-bold text-zinc-100">Get in touch</h1>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-zinc-500">
                Open to new opportunities, collaborations, or just a good conversation.
            </p>

            <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-2">

                {/* ── Left — contact form ── */}
                <div>
                    <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest mb-6">
                        Send a message
                    </h2>

                    {status === 'success' ? (
                        // Success state
                        <div className="flex flex-col gap-4 rounded-lg border border-amber-400/30 bg-amber-400/5 p-8">
                            <p className="text-2xl">✓</p>
                            <p className="text-zinc-100 font-medium">Message sent!</p>
                            <p className="text-sm text-zinc-400">
                                Thanks for reaching out. I'll get back to you soon.
                            </p>
                            <button
                                onClick={() => setStatus('idle')}
                                className="self-start text-xs font-mono text-amber-400 hover:text-amber-300 transition-colors"
                            >
                                Send another →
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                            {/* Name */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="name" className="text-xs font-mono text-zinc-500">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                    required
                                    placeholder="Your name"
                                    className="rounded border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-colors"
                                />
                            </div>

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="email" className="text-xs font-mono text-zinc-500">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    className="rounded border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-colors"
                                />
                            </div>

                            {/* Message */}
                            <div className="flex flex-col gap-2">
                                <label htmlFor="message" className="text-xs font-mono text-zinc-500">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    required
                                    rows={5}
                                    placeholder="What's on your mind?"
                                    className="rounded border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-400/50 focus:ring-1 focus:ring-amber-400/20 transition-colors resize-none"
                                />
                            </div>

                            {/* Error message */}
                            {status === 'error' && (
                                <p className="text-xs text-red-400 font-mono">{errorMsg}</p>
                            )}

                            {/* Submit */}
                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="self-start rounded bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? 'Sending...' : 'Send message'}
                            </button>
                        </form>
                    )}
                </div>

                {/* ── Right — other channels ── */}
                <div className="flex flex-col gap-6">
                    <h2 className="text-sm font-mono text-zinc-500 uppercase tracking-widest">
                        Other channels
                    </h2>
                    {[
                        { label: 'LinkedIn', value: 'linkedin.com/in/sarath-p', href: 'https://www.linkedin.com/in/sarath-p-77ab97183/' },
                        { label: 'GitHub', value: 'github.com/sarathp20', href: 'https://github.com/sarathp20' },
                        { label: 'Email', value: 'sarathp20@gmail.com', href: 'mailto:sarathp20@gmail.com' },
                    ].map(link => (
                        <a
                            key={link.label}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex flex-col gap-1 border-b border-zinc-800 pb-6 hover:border-zinc-600 transition-colors"
                        >
                            <span className="text-xs font-mono text-zinc-500 group-hover:text-amber-400 transition-colors">
                                {link.label}
                            </span>
                            <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors">
                                {link.value} ↗
                            </span>
                        </a>
                    ))}
                </div>

            </div>
        </main>
    )
}