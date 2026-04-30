# Technology Stack

## Core Framework
- **Next.js 16.2.4** — App Router, file-system routing, SSR/SSG capabilities
- **React 19.2.4** — UI library; hooks-based functional components
- **TypeScript 5.x** — strict mode enabled, ES2017 target, `bundler` module resolution

## Styling
- **Tailwind CSS v4** (`tailwindcss ^4`) — utility-first CSS
- **@tailwindcss/postcss ^4** — PostCSS integration for Tailwind v4
- Colour palette: dark zinc backgrounds (`zinc-800/900/950`), amber accents (`amber-400/300`), zinc text hierarchy (`zinc-100/300/400/500`)

## TypeScript Configuration
- `strict: true` — full strict type checking
- `target: ES2017`
- `moduleResolution: bundler`
- Path alias: `@/*` maps to project root (`./`)
- `isolatedModules: true`

## Linting
- **ESLint 9** with flat config (`eslint.config.mjs`)
- **eslint-config-next 16.2.4** — Next.js recommended rules

## Development Commands
```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Key Dependencies Summary
| Package | Version | Role |
|---|---|---|
| next | 16.2.4 | Framework |
| react | 19.2.4 | UI library |
| react-dom | 19.2.4 | DOM renderer |
| tailwindcss | ^4 | Styling |
| typescript | ^5 | Type safety |
| eslint | ^9 | Linting |

## No Additional Runtime Dependencies
The project has zero third-party runtime dependencies beyond Next.js and React — no UI component libraries, no animation libraries, no form libraries, no state management packages.
