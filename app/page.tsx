'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'

function calcDuration(start: Date, end: Date) {
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) + 1
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (years === 0) return `${remainingMonths}mo`
  if (remainingMonths === 0) return `${years}yr`
  return `${years}yr ${remainingMonths}mo`
}

function calcTotalYears(start: Date, end: Date) {
  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth()) + 1
  const years = Math.floor(months / 12)
  const remainingMonths = months % 12
  if (remainingMonths === 0) return `${years} yrs`
  return `${years} yrs ${remainingMonths} mos`
}

const experiences = [
  {
    role: 'Software Developer',
    company: 'IBM',
    start: new Date(2022, 6),
    end: null,
    description:
      'Built enterprise React applications on IBM App Connect SaaS. Led accessibility remediation, performance optimisation, and LLM integrations using IBM WatsonX.',
  },
  {
    role: 'Software Developer Intern',
    company: 'IBM',
    start: new Date(2022, 0),
    end: new Date(2022, 5),
    description:
      'Migrated product modules from AngularJS to React. Built frontend test coverage from scratch using React Testing Library and Jest.',
  },
]

const specialisations = [
  { label: 'React & TypeScript/JavaScript' },
  { label: 'Frontend Performance' },
  { label: 'Accessibility' },
  { label: 'Node.js & APIs' },
  { label: 'Testing' },
  { label: 'LLM Integration' },
]

export default function Home() {
  const [now, setNow] = useState(new Date())
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 60_000)
    return () => clearInterval(timer)
  }, [])

  const careerStart = new Date(2022, 0)
  const totalExp = calcTotalYears(careerStart, now)

  return (
    <main className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
      <section className="flex min-h-screen flex-col justify-center gap-6 py-16 sm:py-20">

        <p className="font-mono text-sm text-amber-400">Hi, I'm</p>

        {/* ── Name + Photo ── */}
        <div className="flex items-center gap-5">
          <Image
            src="/avatar.png"
            alt="Sarath P"
            width={88}
            height={88}
            priority
            className="rounded-full border-2 border-zinc-800 object-cover shrink-0 w-20 h-20 sm:w-22 sm:h-22"
          />
          <div className="flex flex-col gap-1.5">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl lg:text-6xl">
              Sarath P
            </h1>
            <h2 className="text-lg font-medium text-zinc-400 sm:text-xl lg:text-2xl">
              Software Developer (Full Stack)
            </h2>
          </div>
        </div>

        {/* ── Specialisation tags ── */}
        <div className="flex flex-wrap gap-2">
          {specialisations.map(s => (
            <span
              key={s.label}
              className="cursor-default rounded-full border border-zinc-700 bg-zinc-800 px-3 py-1 font-mono text-xs text-zinc-300"
            >
              {s.label}
            </span>
          ))}
        </div>

        {/* ── Description ── */}
        <p className="max-w-2xl text-base leading-relaxed text-zinc-500 sm:text-lg">
          Specialising in React, TypeScript/JavaScript, and Node.js — with a strong focus
          on accessibility, frontend performance, and building scalable enterprise UI.
          AWS Certified with hands-on experience integrating LLM models into production applications.
        </p>

        {/* ── CTAs ── */}
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/projects"
            className="rounded px-6 py-3 text-sm font-semibold bg-amber-400 text-zinc-950 transition-colors hover:bg-amber-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            See my work
          </Link>
          <Link
            href="/contact"
            className="rounded border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 transition-colors hover:border-zinc-500 hover:text-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            Get in touch
          </Link>
        </div>

        {/* ── Stats ── */}
        <div className="flex flex-col gap-8 border-t border-zinc-800 pt-10 sm:flex-row sm:flex-wrap sm:items-start sm:gap-12">

          {/* Experience */}
          <div className="flex flex-col gap-1">
            <button
              onClick={() => setExpanded(prev => !prev)}
              className="flex items-center gap-2 self-start rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-expanded={expanded}
              aria-label="Toggle experience details"
            >
              <span className="text-3xl font-bold text-amber-400 sm:text-4xl">
                {totalExp}
              </span>
              <span className={`text-lg text-zinc-500 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}>
                ↓
              </span>
            </button>
            <span className="text-sm text-zinc-500">Experience</span>

            {expanded && (
              <div className="mt-4 flex flex-col gap-4">
                {experiences.map(exp => {
                  const end = exp.end ?? now
                  const duration = calcDuration(exp.start, end)
                  const startStr = exp.start.toLocaleString('default', { month: 'short', year: 'numeric' })
                  const endStr = exp.end
                    ? exp.end.toLocaleString('default', { month: 'short', year: 'numeric' })
                    : 'Present'
                  return (
                    <div key={exp.role} className="flex flex-col gap-1 border-l-2 border-amber-400/40 pl-4">
                      <span className="text-sm font-semibold text-zinc-100">{exp.role}</span>
                      <span className="text-xs text-zinc-400">{exp.company}</span>
                      <span className="font-mono text-xs text-amber-400">
                        {startStr} – {endStr}
                        <span className="ml-2 text-zinc-500">({duration})</span>
                      </span>
                      <p className="mt-1 max-w-xs text-xs leading-relaxed text-zinc-500">
                        {exp.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* AWS */}
          <a
            href="https://www.credly.com/badges/c6f46a72-ba59-4ff2-96a4-6cdf4b9d20fc/linked_in_profile"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="AWS Certified — view credential on Credly, opens in a new tab"
            className="group flex flex-col gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span className="text-3xl font-bold text-amber-400 sm:text-4xl">AWS</span>
            <span className="text-sm text-zinc-500 transition-colors duration-200 group-hover:text-zinc-300">
              Certified ↗
            </span>
          </a>

          {/* IEEE */}
          <Link
            href="/publications#research"
            className="group flex flex-col gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span className="text-3xl font-bold text-amber-400 sm:text-4xl">IEEE</span>
            <span className="text-sm text-zinc-500 transition-colors duration-200 group-hover:text-zinc-300">
              Research →
            </span>
          </Link>

          {/* Blog — links to publications */}
          <Link
            href="/publications"
            className="group flex flex-col gap-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span className="text-3xl font-bold text-amber-400 sm:text-4xl">Blog</span>
            <span className="text-sm text-zinc-500 transition-colors duration-200 group-hover:text-zinc-300">
              Publications →  {/* ← links to publications page */}
            </span>
          </Link>

        </div>
      </section>
    </main>
  )
}