// app/admin/writing/_components/PostEditor.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PostEditorProps {
  initialData?: {
    id:        string
    title:     string
    slug:      string
    excerpt:   string
    content:   string
    published: boolean
  }
}

export default function PostEditor({ initialData }: PostEditorProps) {
  const router  = useRouter()
  const isEdit  = !!initialData

  const [title,     setTitle]     = useState(initialData?.title     ?? '')
  const [slug,      setSlug]      = useState(initialData?.slug      ?? '')
  const [excerpt,   setExcerpt]   = useState(initialData?.excerpt   ?? '')
  const [content,   setContent]   = useState(initialData?.content   ?? '')
  const [published, setPublished] = useState(initialData?.published ?? false)
  const [saving,    setSaving]    = useState(false)
  const [error,     setError]     = useState('')

  // Auto-generate slug from title
  function handleTitleChange(value: string) {
    setTitle(value)
    if (!isEdit) {
      setSlug(
        value
          .toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')  // remove special chars
          .replace(/\s+/g, '-')           // spaces to hyphens
          .replace(/-+/g, '-')            // collapse multiple hyphens
          .trim()
      )
    }
  }

  async function handleSave(publish: boolean) {
    setSaving(true)
    setError('')

    const url    = isEdit ? `/api/admin/writing/${initialData.id}` : '/api/admin/writing'
    const method = isEdit ? 'PATCH' : 'POST'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title, slug, excerpt, content,
        published: publish,
      }),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error ?? 'Something went wrong')
      setSaving(false)
      return
    }

    router.push('/admin/writing')
    router.refresh()
  }

  return (
    <div className="flex flex-col gap-6">

      {/* Title */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono text-zinc-500">Title</label>
        <input
          type="text"
          value={title}
          onChange={e => handleTitleChange(e.target.value)}
          placeholder="My first writing post"
          className="rounded border border-zinc-800 bg-zinc-900 px-4 py-3 text-lg font-semibold text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-400/50 transition-colors"
        />
      </div>

      {/* Slug */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono text-zinc-500">
          Slug — <span className="text-zinc-600">yoursite.com/writing/<span className="text-amber-400">{slug || 'my-first-post'}</span></span>
        </label>
        <input
          type="text"
          value={slug}
          onChange={e => setSlug(e.target.value)}
          placeholder="my-first-post"
          className="rounded border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-mono text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-400/50 transition-colors"
        />
      </div>

      {/* Excerpt */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono text-zinc-500">
          Excerpt — shown on writing list and in Google search results
        </label>
        <textarea
          value={excerpt}
          onChange={e => setExcerpt(e.target.value)}
          rows={2}
          placeholder="A short summary of what this post covers..."
          className="rounded border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-400/50 transition-colors resize-none"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-mono text-zinc-500">
          Content — markdown supported
        </label>
        <textarea
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={20}
          placeholder={`# My first post\n\nWrite your content here in **markdown**...\n\n## Section heading\n\nMore content...`}
          className="rounded border border-zinc-800 bg-zinc-900 px-4 py-3 text-sm font-mono text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-400/50 transition-colors resize-none leading-relaxed"
        />
      </div>

      {error && (
        <p className="text-xs text-red-400 font-mono">{error}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-4 pt-2 border-t border-zinc-800">
        <button
          onClick={() => handleSave(false)}
          disabled={saving}
          className="rounded border border-zinc-700 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 transition-colors disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save draft'}
        </button>
        <button
          onClick={() => handleSave(true)}
          disabled={saving}
          className="rounded bg-amber-400 px-6 py-3 text-sm font-semibold text-zinc-950 hover:bg-amber-300 transition-colors disabled:opacity-50"
        >
          {saving ? 'Publishing...' : 'Publish'}
        </button>
      </div>
    </div>
  )
}