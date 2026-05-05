// app/blog/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size    = { width: 1200, height: 630 }
export const alt     = 'Sarath P — Writing'

type Props = { params: Promise<{ slug: string }> }

export default async function Image({ params }: Props) {
  const { slug } = await params

  // Convert slug to readable title
  // "my-first-post" → "My First Post"
  const title = slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')

  return new ImageResponse(
    (
      <div
        style={{
          background:    '#09090b',
          width:         '100%',
          height:        '100%',
          display:       'flex',
          flexDirection: 'column',
          justifyContent:'center',
          padding:       '80px',
          fontFamily:    'sans-serif',
          position:      'relative',
        }}
      >
        {/* Amber top bar */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: '4px', background: '#fbbf24',
        }} />

        {/* Eyebrow */}
        <div style={{
          fontSize: '18px', color: '#fbbf24',
          fontFamily: 'monospace', marginBottom: '32px',
          letterSpacing: '0.1em',
        }}>
          sarath.dev / writings
        </div>

        {/* Title from slug */}
        <div style={{
          fontSize: '60px', fontWeight: '700',
          color: '#f4f4f5', lineHeight: '1.1',
          marginBottom: '32px',
        }}>
          {title}
        </div>

        {/* Author */}
        <div style={{
          fontSize: '24px', color: '#71717a',
        }}>
          Sarath P · Software Developer
        </div>

        {/* Bottom right */}
        <div style={{
          position: 'absolute', bottom: '60px', right: '80px',
          fontSize: '16px', color: '#3f3f46', fontFamily: 'monospace',
        }}>
          sarath-technical-portfolio.vercel.app
        </div>
      </div>
    ),
    { ...size }
  )
}