# Development Guidelines

## Code Quality Standards

### File Header Convention
Every file starts with a single-line comment declaring its path:
```tsx
// app/components/Navbar.tsx
```

### Client Component Declaration
Pages and components that use React hooks must declare `'use client'` as the very first line (before imports):
```tsx
'use client'

import { useState } from 'react'
```
Server components (layout.tsx, stub pages) omit this directive.

### TypeScript Patterns
- Strict mode is enabled — no implicit `any`, no loose nulls
- Derive prop types from data arrays using `(typeof dataArray)[number]`:
  ```tsx
  function ProfessionalCard({ title, description, tags, featured }: (typeof professionalProjects)[number]) { ... }
  ```
- Use explicit union types for tab/state discriminators:
  ```tsx
  type Tab = 'professional' | 'personal'
  ```
- Non-null assert (`!`) only when logically guaranteed (e.g. `.find()` on a known-present value)

---

## Structural Conventions

### Data Co-location
Static data arrays are defined at the top of the file that renders them — no separate data files:
```tsx
const professionalProjects = [ { title: '...', ... }, ... ]
const personalProjects = [ ... ]

export default function Projects() { ... }
```

### Sub-component Extraction
Reusable card/item components are defined in the same file as the page, above the default export, with a section comment separator:
```tsx
// ── Professional card ─────────────────────────────────────────────────────────
function ProfessionalCard(...) { ... }

// ── Personal card ─────────────────────────────────────────────────────────────
function PersonalCard(...) { ... }

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Projects() { ... }
```

### Page Layout Pattern
Every complete page follows this structure:
```tsx
<main className="mx-auto max-w-5xl px-6 py-20">
  {/* Page header */}
  <div className="flex flex-col gap-2 mb-10">
    <p className="font-mono text-sm text-amber-400">NN. section-name</p>
    <h1 className="text-4xl font-bold text-zinc-100">Page Title</h1>
    <p className="text-base leading-relaxed max-w-xl text-zinc-500">Subtitle</p>
  </div>
  {/* Content */}
</main>
```

### Section numbering convention
Page headers use a numbered monospace label: `01. intro`, `02. work`, `04. writing` etc.

---

## Styling Conventions (Tailwind CSS v4)

### Colour Palette
| Role | Class |
|---|---|
| Page / card background | `bg-zinc-950` / `bg-zinc-900` |
| Primary text | `text-zinc-100` |
| Secondary text | `text-zinc-400` |
| Muted / meta text | `text-zinc-500` |
| Accent (amber) | `text-amber-400`, `bg-amber-400`, `border-amber-400` |
| Borders | `border-zinc-800`, `border-zinc-700` |
| Rings | `ring-zinc-800`, `ring-amber-400/20` |

### Card Pattern
All cards share this base class set:
```
flex flex-col gap-4 p-6 bg-zinc-900 rounded-xl border border-zinc-800
ring-1 ring-zinc-800 hover:border-zinc-700 hover:ring-amber-400/20
hover:shadow-lg hover:shadow-amber-400/5 transition-all duration-200
```

### Tag / Pill Pattern
Technology tags use:
```
px-2.5 py-1 text-xs font-mono rounded-full bg-zinc-950 border border-zinc-800 text-zinc-500
```

### Responsive Layout
- Max content width: `max-w-5xl` with `px-4 sm:px-6 lg:px-8`
- Grid: `grid-cols-1 md:grid-cols-2 gap-4`
- Flex direction: `flex-col` mobile → `sm:flex-row` desktop

---

## Accessibility Patterns (Applied Consistently)

### Focus Styles
All interactive elements use:
```
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400
```
Never use `outline-none` alone — always pair with `focus-visible:ring-*`.

### ARIA on Interactive Elements
- Buttons: `aria-label`, `aria-expanded` for toggles
- Tab components: full ARIA tab pattern (`role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`, `role="tabpanel"`, `aria-labelledby`, `tabIndex` roving)
- Cards: `<article aria-label={title}>`
- Tag lists: `<ul aria-label="Technologies">` with `list-none`
- External links: `aria-label="... — opens in a new tab"` + `target="_blank" rel="noopener noreferrer"`
- Active nav links: `aria-current="page"`

### Keyboard Navigation
Tab components implement arrow-key navigation:
```tsx
function handleKeyDown(e: KeyboardEvent<HTMLButtonElement>, index: number) {
  let next = index
  if (e.key === 'ArrowRight') next = (index + 1) % TABS.length
  if (e.key === 'ArrowLeft')  next = (index - 1 + TABS.length) % TABS.length
  if (next !== index) {
    e.preventDefault()
    setActiveTab(TABS[next].id)
    tabRefs.current[next]?.focus()
  }
}
```

---

## Component Patterns

### External Link Button
Reused pattern for GitHub / IEEE / external links:
```tsx
<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  aria-label={`Label — opens in a new tab`}
  className="self-start shrink-0 text-xs font-mono px-3 py-2 min-h-[36px] flex items-center rounded border border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 transition-all duration-200"
>
  Link text ↗
</a>
```

### Navbar Active Link
```tsx
const isActive = pathname === href
className={`... ${isActive ? 'bg-amber-400/10 text-amber-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'}`}
aria-current={isActive ? 'page' : undefined}
```

### Hamburger Menu (Mobile)
Three `<span>` bars with CSS transform animations for open/close state — no icon library dependency.

---

## Naming Conventions
- Components: PascalCase (`ProfessionalCard`, `Navbar`)
- Page default exports: PascalCase matching route (`Projects`, `Publications`)
- Data arrays: camelCase plural (`professionalProjects`, `navLinks`, `specialisations`)
- Type aliases: PascalCase (`Tab`, `Metadata`)
- Event handlers: `handle` prefix (`handleKeyDown`)
- Boolean state: descriptive (`menuOpen`, `expanded`)

---

## Stub Page Pattern
Pages not yet implemented use a minimal stub — no imports, no styling:
```tsx
export default function PageName() {
  return <main><h1>Page Title</h1></main>
}
```
Upgrade stubs to the full page layout pattern when implementing.
