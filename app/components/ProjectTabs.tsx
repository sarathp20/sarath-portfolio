// components/ProjectTabs.tsx
"use client"

import { useState, useRef, KeyboardEvent } from 'react'
import type { GitHubRepo } from '@/lib/github'

// ── Professional projects — static data ──────────────────────────────────────
const professionalProjects = [
  {
    title: 'Record & Replay',
    description: 'React UI enabling users to capture and retrigger integration flow messages across MQ and DB2 backends. First-of-its-kind capability on IBM App Connect SaaS.',
    tags: ['React', 'TypeScript', 'MQ', 'DB2'],
    featured: true,
  },
  {
    title: 'Remote Runtime Management',
    description: 'React UI allowing enterprise users to monitor and control distributed integration runtimes from a single control plane.',
    tags: ['React', 'TypeScript', 'WebSockets'],
    featured: false,
  },
  {
    title: 'Team Dashboard',
    description: 'Internal dashboard built with React, TypeScript, and tRPC that improved operational efficiency by 20% for product and release teams.',
    tags: ['React', 'TypeScript', 'tRPC', 'Node.js'],
    featured: false,
  },
  {
    title: 'AngularJS → React Migration',
    description: 'Migrated key product modules from AngularJS to React. Built full test coverage from scratch using React Testing Library and Jest.',
    tags: ['React', 'AngularJS', 'Jest', 'RTL'],
    featured: false,
  },
]

type Tab = 'professional' | 'personal'

// ── Props — GitHub repos passed in from the server component ──────────────────
interface Props {
  repos: GitHubRepo[]
}

export default function ProjectTabs({ repos }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>('professional')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const TABS = [
    { id: 'professional' as Tab, label: 'Professional', hint: 'IBM · Enterprise', count: professionalProjects.length },
    { id: 'personal' as Tab, label: 'Personal', hint: 'GitHub · Open source', count: repos.length },
  ]

  function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index
    if (e.key === 'ArrowRight') next = (index + 1) % TABS.length
    if (e.key === 'ArrowLeft') next = (index - 1 + TABS.length) % TABS.length
    if (next !== index) {
      e.preventDefault()
      setActiveTab(TABS[next].id)
      tabRefs.current[next]?.focus()
    }
  }

  return (
    <>
      {/* Tabs */}
      <div
        role="tablist"
        aria-label="Project categories"
        className="grid grid-cols-2 mb-10 border border-zinc-800 rounded-xl overflow-hidden"
      >
        {TABS.map((tab, i) => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            ref={el => { tabRefs.current[i] = el }}
            onClick={() => setActiveTab(tab.id)}
            onKeyDown={e => handleKeyDown(e, i)}
            className={`
              relative flex flex-col items-start gap-1 px-8 py-5 text-left
              transition-all duration-200 outline-none cursor-pointer
              focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-amber-400
              ${i !== 0 ? 'border-l border-zinc-800' : ''}
              ${activeTab === tab.id
                ? 'bg-zinc-900 text-zinc-100'
                : 'bg-zinc-950 text-zinc-500 hover:bg-zinc-900/50 hover:text-zinc-300'}
            `}
          >
            <div className="flex items-center gap-2">
              <span className="text-base font-semibold">{tab.label}</span>
              <span className={`text-xs font-mono px-1.5 py-0.5 rounded border
                ${activeTab === tab.id
                  ? 'bg-amber-400/15 text-amber-400 border-amber-400/25'
                  : 'bg-zinc-800 text-zinc-600 border-zinc-700'}`}>
                {tab.count}
              </span>
            </div>
            <span className={`text-xs ${activeTab === tab.id ? 'text-zinc-500' : 'text-zinc-700'}`}>
              {tab.hint}
            </span>
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400" />
            )}
          </button>
        ))}
      </div>

      {/* Professional panel */}
      <div
        id="panel-professional"
        role="tabpanel"
        aria-labelledby="tab-professional"
        hidden={activeTab !== 'professional'}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {professionalProjects.map(p => (
            <article
              key={p.title}
              aria-label={p.title}
              className={`flex flex-col gap-4 p-6 bg-zinc-900 rounded-xl border
                ring-1 ring-zinc-800 hover:ring-amber-400/20
                hover:shadow-lg hover:shadow-amber-400/5 transition-all duration-200
                ${p.featured
                  ? 'md:col-span-2 border-amber-400/30 hover:border-amber-400/50'
                  : 'border-zinc-800 hover:border-zinc-700'}`}
            >
              <h2 className="text-lg font-semibold text-zinc-100">{p.title}</h2>
              <p className="text-sm leading-relaxed text-zinc-400 flex-1">{p.description}</p>
              <ul className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800 list-none">
                {p.tags.map(tag => (
                  <li key={tag} className="px-2.5 py-1 text-xs font-mono rounded-full bg-zinc-950 border border-zinc-800 text-zinc-500">
                    {tag}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      {/* Personal panel — rendered from live GitHub data */}
      <div
        id="panel-personal"
        role="tabpanel"
        aria-labelledby="tab-personal"
        hidden={activeTab !== 'personal'}
      >
        {repos.length === 0 ? (
          <p className="text-zinc-500 text-sm">No repositories found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {repos.map(repo => (
              <article
                key={repo.id}
                aria-label={repo.name}
                className="flex flex-col gap-4 p-6 bg-zinc-900 rounded-xl border border-zinc-800 ring-1 ring-zinc-800 hover:border-zinc-700 hover:ring-amber-400/20 hover:shadow-lg hover:shadow-amber-400/5 transition-all duration-200"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <h2 className="text-lg font-semibold text-zinc-100 wrap-break-word min-w-0">
                    {repo.name.replace(/[-_]/g, ' ')}
                  </h2>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${repo.name} on GitHub — opens in a new tab`}
                    className="self-start shrink-0 text-xs font-mono px-3 py-2 min-h-9 flex items-center rounded border border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-200"
                  >
                    GitHub ↗
                  </a>
                </div>

                <p className="text-sm leading-relaxed text-zinc-400 flex-1">
                  {repo.description ?? 'No description provided.'}
                </p>

                {/* Language + stars */}
                <div className="flex items-center gap-4 text-xs text-zinc-500 font-mono">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      {repo.language}
                    </span>
                  )}
                  {repo.stargazers_count > 0 && (
                    <span>★ {repo.stargazers_count}</span>
                  )}
                </div>

                {/* Topics as tags */}
                {repo.topics.filter(t => t !== 'portfolio').length > 0 && (
                  <ul className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800 list-none">
                    {repo.topics
                      .filter(t => t !== 'portfolio')  // ← hide the internal label
                      .map(topic => (
                        <li key={topic} className="px-2.5 py-1 text-xs font-mono rounded-full bg-zinc-950 border border-zinc-800 text-zinc-500">
                          {topic}
                        </li>
                      ))}
                  </ul>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </>
  )
}