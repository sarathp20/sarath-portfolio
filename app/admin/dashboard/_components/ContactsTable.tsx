// app/admin/dashboard/_components/ContactsTable.tsx
'use client'

import { useState } from 'react'
import { useRouter }    from 'next/navigation'

interface Contact {
    id: string
    name: string
    email: string
    message: string
    read: boolean
    createdAt: Date
}

export default function ContactsTable({ contacts: initial }: { contacts: Contact[] }) {
    const [contacts, setContacts] = useState(initial)
    const router = useRouter()
  async function markAsRead(id: string) {
    await fetch(`/api/admin/contacts/${id}/read`, { method: 'PATCH' })
    
    // Optimistic update — update UI immediately
    setContacts(prev =>
      prev.map(c => c.id === id ? { ...c, read: true } : c)
    )
    
    // Then refresh server data
    router.refresh()
  }

  async function deleteContact(id: string) {
    await fetch(`/api/admin/contacts/${id}`, { method: 'DELETE' })
    
    // Optimistic update — remove from UI immediately
    setContacts(prev => prev.filter(c => c.id !== id))
    
    // Then refresh server data
    router.refresh()
  }

    if (contacts.length === 0) {
        return (
            <div className="text-center py-20 text-zinc-500 font-mono text-sm">
                No submissions yet.
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-4">
            {contacts.map(contact => (
                <div
                    key={contact.id}
                    className={`rounded-lg border p-6 transition-colors ${contact.read
                            ? 'border-zinc-800 bg-zinc-900/50'
                            : 'border-amber-400/20 bg-amber-400/5'
                        }`}
                >
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-3">
                                <span className="text-sm font-semibold text-zinc-100">
                                    {contact.name}
                                </span>
                                {!contact.read && (
                                    <span className="text-xs font-mono bg-amber-400/15 text-amber-400 border border-amber-400/25 px-2 py-0.5 rounded">
                                        new
                                    </span>
                                )}
                            </div>
                            <a
                                href={`mailto:${contact.email}`}
                                className="text-xs font-mono text-zinc-500 hover:text-amber-400 transition-colors"
                            >
                                {contact.email}
                            </a>
                            <span className="text-xs text-zinc-600 font-mono">
                                {new Date(contact.createdAt).toISOString().replace('T', ' ').slice(0, 16)}
                            </span>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 shrink-0">
                            {!contact.read && (
                                <button
                                    onClick={() => markAsRead(contact.id)}
                                    className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
                                >
                                    Mark read
                                </button>
                            )}
                            <button
                                onClick={() => deleteContact(contact.id)}
                                className="text-xs font-mono text-zinc-500 hover:text-red-400 transition-colors cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>

                    <p className="mt-4 text-sm text-zinc-400 leading-relaxed border-t border-zinc-800 pt-4">
                        {contact.message}
                    </p>
                </div>
            ))}
        </div>
    )
}