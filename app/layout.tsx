// app/layout.tsx
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import './globals.css'

const BASE_URL = 'https://sarath-technical-portfolio.vercel.app'

export const metadata: Metadata = {
  // ── Basic ──────────────────────────────────────────────
  title: {
    default:  'Sarath P — Software Developer',
    template: '%s — Sarath P',  // blog posts: "Post title — Sarath P"
  },
  description:
    'Frontend Software Engineer with 4+ years at IBM. React, TypeScript, Node.js, AWS Certified. Based in Abu Dhabi, UAE.',

  // ── Open Graph — LinkedIn, WhatsApp, Facebook ──────────
  openGraph: {
    type:        'website',
    url:         BASE_URL,
    title:       'Sarath P — Software Developer',
    description: 'Frontend Software Engineer with 4+ years at IBM. React, TypeScript, Node.js, AWS Certified.',
    siteName:    'Sarath P',
    images: [
      {
        url:    `${BASE_URL}/opengraph-image`,
        width:  1200,
        height: 630,
        alt:    'Sarath P — Software Developer',
      },
    ],
  },

  // ── Twitter / X ────────────────────────────────────────
  twitter: {
    card:        'summary_large_image',
    title:       'Sarath P — Software Developer',
    description: 'Frontend Software Engineer with 4+ years at IBM. React, TypeScript, Node.js, AWS Certified.',
    images:      [`${BASE_URL}/opengraph-image`],
  },

  // ── Google verification ────────────────────────────────
  verification: {
    google: 'CA3BpI4KTRYt94X5b_MHmrYTObQXYZ-_cddJ4GJt5RI',
  },

  // ── Canonical ──────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <Navbar />
        <div className="pt-16">{children}</div>
      </body>
    </html>
  )
}