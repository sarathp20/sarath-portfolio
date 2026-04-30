// app/contact/page.tsx
'use client'

import { useState } from 'react'

const contacts = [
  {
    label: 'LinkedIn',
    value: 'sarath-p-77ab97183',
    display: 'linkedin.com/in/sarath-p',
    href: 'https://www.linkedin.com/in/sarath-p-77ab97183/',
    action: 'link',
  },
  {
    label: 'GitHub',
    value: 'sarathp20',
    display: 'github.com/sarathp20',
    href: 'https://github.com/sarathp20',
    action: 'link',
  },
  {
    label: 'Email',
    value: 'sarathp20@gmail.com',
    display: 'sarathp20@gmail.com',
    href: null,
    action: 'copy',
  },
] as const

export default function Contact() {
  const [copied, setCopied] = useState(false)

  function handleCopy(value: string) {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex flex-col gap-2 mb-10">
        <p className="font-mono text-sm text-amber-400">05. contact</p>
        <h1 className="text-4xl font-bold text-zinc-100">Get in touch</h1>
        <p className="text-base leading-relaxed max-w-xl text-zinc-500">
          Open to new opportunities, collaborations, or just a good conversation. Pick the channel that works best for you.
        </p>
      </div>

      <ul aria-label="Contact links" className="flex flex-col gap-4 list-none max-w-lg">
        {contacts.map(({ label, value, display, href, action }) => (
          <li key={label}>
            {action === 'link' ? (
              <a
                href={href!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} — opens in a new tab`}
                className="group flex items-center justify-between gap-4 p-5 bg-zinc-900 rounded-xl border border-zinc-800 ring-1 ring-zinc-800 hover:border-zinc-700 hover:ring-amber-400/20 hover:shadow-lg hover:shadow-amber-400/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-200"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-mono text-amber-400">{label}</span>
                  <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors duration-200">{display}</span>
                </div>
                <span className="shrink-0 text-zinc-600 group-hover:text-zinc-400 transition-colors duration-200" aria-hidden="true">↗</span>
              </a>
            ) : (
              <button
                onClick={() => handleCopy(value)}
                aria-label={copied ? 'Email copied to clipboard' : `Copy email address ${value}`}
                className="group w-full flex items-center justify-between gap-4 p-5 bg-zinc-900 rounded-xl border border-zinc-800 ring-1 ring-zinc-800 hover:border-zinc-700 hover:ring-amber-400/20 hover:shadow-lg hover:shadow-amber-400/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-200 text-left"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-mono text-amber-400">{label}</span>
                  <span className="text-sm text-zinc-300 group-hover:text-zinc-100 transition-colors duration-200">{display}</span>
                </div>
                <span
                  className={`shrink-0 text-xs font-mono transition-colors duration-200 ${
                    copied ? 'text-amber-400' : 'text-zinc-600 group-hover:text-zinc-400'
                  }`}
                  aria-hidden="true"
                >
                  {copied ? 'copied!' : 'copy'}
                </span>
              </button>
            )}
          </li>
        ))}
      </ul>
    </main>
  )
}
