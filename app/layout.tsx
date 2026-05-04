// app/layout.tsx
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sarath P — Software Developer',
  description: 'Software Developer (Full Stack) · React · TypeScript · AWS Certified',
  verification: {
    google: 'CA3BpI4KTRYt94X5b_MHmrYTObQXYZ-_cddJ4GJt5RI',  // ← paste your content value here
  }
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