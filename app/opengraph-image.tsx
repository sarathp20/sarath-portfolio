// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt     = 'Sarath P — Software Developer'
export const size    = { width: 1200, height: 630 }

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background:     '#09090b',
          width:          '100%',
          height:         '100%',
          display:        'flex',
          flexDirection:  'column',
          justifyContent: 'center',
          padding:        '80px',
          fontFamily:     'sans-serif',
          position:       'relative',
        }}
      >
        {/* Amber accent line */}
        <div style={{
          position:   'absolute',
          top:        0,
          left:       0,
          right:      0,
          height:     '4px',
          background: '#fbbf24',
        }} />

        {/* Eyebrow */}
        <div style={{
          fontSize:      '18px',
          color:         '#fbbf24',
          letterSpacing: '0.15em',
          marginBottom:  '24px',
          fontFamily:    'monospace',
        }}>
          sarathp.dev
        </div>

        {/* Name */}
        <div style={{
          fontSize:   '80px',
          fontWeight: '700',
          color:      '#f4f4f5',
          lineHeight: '1',
          marginBottom: '16px',
        }}>
          Sarath P
        </div>

        {/* Role */}
        <div style={{
          fontSize:     '32px',
          color:        '#a1a1aa',
          marginBottom: '48px',
        }}>
          Software Developer (Full Stack)
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', gap: '12px' }}>
          {['React', 'TypeScript', 'Node.js', 'AWS Certified', 'IBM'].map(tag => (
            <div
              key={tag}
              style={{
                background:    '#18181b',
                border:        '1px solid #27272a',
                borderRadius:  '999px',
                padding:       '8px 20px',
                fontSize:      '18px',
                color:         '#a1a1aa',
                fontFamily:    'monospace',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* Bottom right — location */}
        <div style={{
          position:  'absolute',
          bottom:    '60px',
          right:     '80px',
          fontSize:  '18px',
          color:     '#52525b',
          fontFamily: 'monospace',
        }}>
          Abu Dhabi, UAE
        </div>
      </div>
    ),
    { ...size }
  )
}