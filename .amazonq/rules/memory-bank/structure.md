# Project Structure

## Directory Layout
```
sarath-portfolio/
├── app/                        # Next.js App Router root
│   ├── components/
│   │   └── Navbar.tsx          # Shared navigation component
│   ├── about/page.tsx          # /about route
│   ├── contact/page.tsx        # /contact route
│   ├── projects/page.tsx       # /projects route
│   ├── publications/page.tsx   # /publications route
│   ├── skills/page.tsx         # /skills route
│   ├── globals.css             # Global Tailwind CSS imports
│   ├── layout.tsx              # Root layout (wraps all pages with Navbar)
│   └── page.tsx                # / home route
├── public/                     # Static assets (SVGs)
├── .amazonq/rules/memory-bank/ # AI assistant memory bank docs
├── next.config.ts              # Next.js configuration (minimal)
├── tsconfig.json               # TypeScript config (strict mode, ES2017 target)
├── postcss.config.mjs          # PostCSS config for Tailwind v4
├── eslint.config.mjs           # ESLint flat config (eslint-config-next)
└── package.json                # Dependencies and scripts
```

## Core Components and Relationships

### Root Layout (`app/layout.tsx`)
- Wraps every page
- Renders `<Navbar />` globally
- Sets HTML metadata (title, description)
- Applies global font and body styles

### Navbar (`app/components/Navbar.tsx`)
- Single shared navigation component
- Links to all top-level routes: `/`, `/projects`, `/skills`, `/about`, `/publications`, `/contact`
- Likely uses `usePathname` for active-link state

### Pages (App Router — each is a standalone route)
| File | Route | Purpose |
|---|---|---|
| `app/page.tsx` | `/` | Hero, experience stats, specialisation tags |
| `app/projects/page.tsx` | `/projects` | Project cards/list |
| `app/skills/page.tsx` | `/skills` | Skill categories |
| `app/about/page.tsx` | `/about` | Bio and background |
| `app/publications/page.tsx` | `/publications` | IEEE / research papers |
| `app/contact/page.tsx` | `/contact` | Contact details or form |

## Architectural Patterns
- **Next.js App Router** — file-system routing under `app/`
- **`'use client'` directive** — pages that need React state/effects are marked as client components
- **No external state management** — local `useState` / `useEffect` only
- **Tailwind CSS v4** — utility-first styling, dark zinc/amber colour palette
- **Data co-located with components** — static arrays (experiences, projects, etc.) defined in the same file as the page that renders them
- **No API routes** — purely static/client-rendered; no `app/api/` directory
