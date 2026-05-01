// app/layout.tsx
import type { Metadata } from 'next'
import Navbar from './components/Navbar'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sarath P — Software Developer',
  description: 'Software Developer (Full Stack) · React · TypeScript · AWS Certified',
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