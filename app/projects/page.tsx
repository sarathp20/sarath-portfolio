// app/projects/page.tsx
import { getPortfolioRepos } from '@/lib/github'  // ← renamed
import ProjectTabs from '../components/ProjectTabs'

export default async function Projects() {
  const repos = await getPortfolioRepos()  // ← renamed

  return (
    <main className="mx-auto max-w-5xl px-6 py-20">
      <div className="flex flex-col gap-2 mb-10">
        <p className="font-mono text-sm text-amber-400">02. work</p>
        <h1 className="text-4xl font-bold text-zinc-100">Projects</h1>
        <p className="text-base leading-relaxed max-w-xl text-zinc-500">
          Professional work from IBM and personal projects from GitHub.
        </p>
      </div>
      <ProjectTabs repos={repos} />
    </main>
  )
}