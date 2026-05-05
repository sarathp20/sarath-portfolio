// app/writings/[slug]/opengraph-image.tsx
import { ImageResponse } from 'next/og'
import { prisma }        from '@/lib/prisma'

export const runtime = 'edge'
export const size    = { width: 1200, height: 630 }

export default async function Image({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where:  { slug: params.slug },
    select: { title: true, excerpt: true },
  })

  return new ImageResponse(
    (
      <div style={{
        background:     '#09090b',
        width:          '100%',
        height:         '100%',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        '80px',
        fontFamily:     'sans-serif',
        position:       'relative',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: '#fbbf24' }} />

        <div style={{ fontSize: '18px', color: '#fbbf24', fontFamily: 'monospace', marginBottom: '32px' }}>
          sarath.dev / writing
        </div>

        <div style={{ fontSize: '56px', fontWeight: '700', color: '#f4f4f5', lineHeight: '1.1', marginBottom: '24px' }}>
          {post?.title ?? 'Blog post'}
        </div>

        <div style={{ fontSize: '24px', color: '#71717a', lineHeight: '1.5' }}>
          {post?.excerpt ?? ''}
        </div>

        <div style={{ position: 'absolute', bottom: '60px', right: '80px', fontSize: '18px', color: '#52525b', fontFamily: 'monospace' }}>
          Sarath P
        </div>
      </div>
    ),
    { ...size }
  )
}