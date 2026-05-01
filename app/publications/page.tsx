const publications = [
  {
    type: 'Research Paper',
    title: 'Stacked Attention Network with BERT for Textbook Visual Question Answering',
    venue: 'IEEE Xplore · 2023',
    description:
      'Proposed a Stacked Attention Network combined with BERT embeddings to answer questions grounded in textbook diagrams and figures. Published and indexed in IEEE Xplore.',
    tags: ['Python', 'BERT', 'Deep Learning', 'VQA'],
    link: 'https://ieeexplore.ieee.org/document/10040113',
  },
  {
    type: 'Blog Post',
    title: 'Record and Replay — IBM App Connect',
    venue: 'IBM Community · Jan 2026',
    description:
      'A deep-dive into the Record & Replay feature built for IBM App Connect SaaS — covering the motivation, architecture, and how it enables developers to capture and retrigger integration flow messages.',
    tags: ['IBM App Connect', 'Integration', 'React', 'MQ'],
    link: 'https://community.ibm.com/community/user/blogs/sarath-p/2026/01/09/record-and-replay-appconnect-iwhi',
  },
]

function PublicationCard({
  type,
  title,
  venue,
  description,
  tags,
  link,
}: (typeof publications)[number]) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${title} — opens in a new tab`}
      className="group flex flex-col gap-4 p-6 bg-zinc-900 rounded-xl border border-zinc-800 ring-1 ring-zinc-800 hover:border-zinc-700 hover:ring-amber-400/20 hover:shadow-lg hover:shadow-amber-400/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-amber-400">{type}</span>
          <h2 className="text-lg font-semibold text-zinc-100">{title}</h2>
          <span className="text-xs font-mono text-zinc-500">{venue}</span>
        </div>
        <span className="shrink-0 text-zinc-600 group-hover:text-amber-400 transition-colors duration-200" aria-hidden="true">↗</span>
      </div>
      <p className="text-sm leading-relaxed text-zinc-400">{description}</p>
      <ul
        aria-label="Technologies"
        className="flex flex-wrap gap-2 pt-3 border-t border-zinc-800 list-none"
      >
        {tags.map(tag => (
          <li
            key={tag}
            className="px-2.5 py-1 text-xs font-mono rounded-full bg-zinc-950 border border-zinc-800 text-zinc-500"
          >
            {tag}
          </li>
        ))}
      </ul>
    </a>
  )
}

export default function Publications() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex flex-col gap-2 mb-10">
        <p className="font-mono text-sm text-amber-400">04. writing</p>
        <h1 className="text-4xl font-bold text-zinc-100">Publications</h1>
        <p className="text-base leading-relaxed max-w-xl text-zinc-500">
          Research I&apos;ve published and technical writing I&apos;ve contributed to the community.
        </p>
      </div>

      <ul aria-label="Publications list" className="flex flex-col gap-4 list-none">
        {publications.map(p => (
          <li key={p.title}>
            <PublicationCard {...p} />
          </li>
        ))}
      </ul>
    </main>
  )
}
