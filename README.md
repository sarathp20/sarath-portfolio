# Sarath's Portfolio

A modern, full-stack portfolio and blog platform built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS**. Features an admin dashboard for content management, AI-powered document embeddings, and real-time chat capabilities.

## 🚀 Features

- **Portfolio Showcase** – Display projects, publications, and technical writings
- **Blog/Writing Management** – Create and publish markdown-based blog posts with drafts
- **Admin Dashboard** – Secure admin panel to manage all content
- **Contact Management** – Track visitor inquiries with read/unread status
- **AI Integration** – Google Generative AI for embeddings and intelligent features
- **Chat Widget** – Real-time chat capability on the portfolio
- **Authentication** – Secure authentication with NextAuth v5
- **Email Notifications** – Powered by Resend
- **Database** – PostgreSQL with Prisma ORM for type-safe queries
- **GitHub Integration** – Fetch and display GitHub projects and repositories
- **Responsive Design** – Mobile-first design with Tailwind CSS
- **SEO Optimized** – Dynamic sitemap, robots.txt, and OG image generation

## 📋 Tech Stack

### Frontend
- **Next.js 16.2.4** – React framework with app router
- **React 19.2.4** – UI library
- **TypeScript 5.9.3** – Type safety
- **Tailwind CSS 4** – Utility-first styling
- **MDX** – Markdown with JSX components (via `next-mdx-remote`)

### Backend & Database
- **Prisma 6.19.3** – ORM for PostgreSQL
- **PostgreSQL** (Neon) – Cloud-hosted relational database
- **NextAuth 5** – Authentication framework

### APIs & Integrations
- **Google Generative AI** – AI embeddings and content generation
- **GitHub API** – Project and repository integration
- **Resend** – Email service
- **Neon PostgreSQL** – Hosted database

### Development Tools
- **ESLint 9** – Code linting
- **ts-node** – TypeScript execution
- **Turbopack** – Fast builds (via `--turbopack` in dev mode)

## 🛠️ Installation

### Prerequisites
- **Node.js** 18+ and npm/yarn
- **PostgreSQL** database (Neon recommended)
- **Environment variables** (see `.env.local` setup below)

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/sarathp20/sarath-portfolio.git
   cd sarath-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # Database
   DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

   # Authentication
   NEXTAUTH_SECRET=your-nextauth-secret-here
   AUTH_SECRET=your-auth-secret-here
   ADMIN_EMAIL=admin@example.com
   ADMIN_PASSWORD=secure-password-here

   # GitHub Integration
   GITHUB_TOKEN=your-github-token
   GITHUB_USERNAME=your-username

   # AI Services
   GOOGLE_GENERATIVE_AI_API_KEY=your-google-ai-key

   # Email Service
   RESEND_API_KEY=your-resend-api-key
   ```

4. **Setup database**
   ```bash
   npm run build  # Generates Prisma client and builds app
   npx prisma migrate deploy  # Run migrations
   npm run seed:ai  # Seed AI embeddings (optional)
   ```

5. **Run development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
sarath-portfolio/
├── app/
│   ├── api/                 # API routes
│   │   ├── admin/          # Admin endpoints
│   │   ├── auth/           # NextAuth routes
│   │   ├── chat/           # Chat API
│   │   ├── contact/        # Contact form submission
│   │   └── seed/           # Database seeding
│   ├── admin/              # Admin dashboard pages
│   │   ├── dashboard/      # Main dashboard with contacts table
│   │   ├── writing/        # Single post editor
│   │   ├── writings/       # Posts list and editor
│   │   └── _components/    # Admin UI components
│   ├── contact/            # Contact page
│   ├── projects/           # Projects showcase
│   ├── publications/       # Publications page
│   ├── writings/           # Blog/writings listing and detail pages
│   ├── components/         # Shared UI components
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── lib/
│   ├── embeddings.ts       # AI embeddings utilities
│   ├── github.ts           # GitHub API integration
│   └── prisma.ts           # Prisma client
├── prisma/
│   ├── schema.prisma       # Database schema
│   └── migrations/         # Database migrations
├── public/                 # Static assets
├── scripts/
│   └── seed-ai.ts          # AI seeding script
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Dependencies and scripts
```

## 📊 Database Schema

### Models
- **Contact** – Visitor inquiries with read status tracking
- **Post** – Blog posts with draft/publish workflow
- **Document** – AI-indexed documents with vector embeddings

## 🔑 Key Commands

```bash
# Development
npm run dev           # Start dev server with Turbopack
npm run build         # Build for production
npm start             # Start production server

# Database
npx prisma migrate dev     # Create and apply new migration
npx prisma studio         # Open Prisma data browser

# Utilities
npm run seed:ai       # Seed AI embeddings for documents
npm run lint          # Run ESLint
```

## 🔐 Admin Dashboard

Access the admin dashboard at `/admin` with:
- **Email:** `ADMIN_EMAIL` from `.env.local`
- **Password:** `ADMIN_PASSWORD` from `.env.local`

### Dashboard Features
- **Contacts** – View and manage visitor inquiries
- **Writings** – Create, edit, and publish blog posts
- **Dashboard** – Overview of contacts and content

## 📝 Content Management

### Writing/Blog Posts
1. Navigate to `/admin/writings`
2. Click "New Post" to create content
3. Editor supports markdown and rich text
4. Save as draft or publish immediately
5. Access published posts at `/writings`

### Contacts
1. Visitors submit via the contact form at `/contact`
2. Admin can view all contacts in the dashboard
3. Mark contacts as read/unread for follow-up tracking

## 🚀 Deployment

### Build & Deploy
```bash
npm run build   # Creates optimized production build
npm start       # Runs production server
```

### Recommended Platforms
- **Vercel** (Next.js native, best performance)
- **Railway**
- **Heroku**
- **DigitalOcean**

Ensure all environment variables are set in your deployment platform's configuration.

## 🤝 GitHub Integration

The portfolio fetches and displays GitHub repositories using the GitHub API. Ensure your `GITHUB_TOKEN` and `GITHUB_USERNAME` are properly configured in `.env.local`.

## 🧠 AI Features

- **Document Embeddings** – Google Generative AI creates vector embeddings for semantic search
- **Chat Widget** – AI-powered chat assistant on the portfolio
- Run `npm run seed:ai` to process and embed documents

## 🎨 Styling

The project uses **Tailwind CSS 4** with:
- TypeScript for type-safe styling
- Responsive mobile-first design
- Dark mode support (can be added)
- Typography plugin for markdown content

## 📄 License

This project is private and for personal use.

## 👤 Author

**Sarath P**
- Portfolio: [sarath-portfolio.vercel.app](https://sarath-portfolio.vercel.app)
- GitHub: [@sarathp20](https://github.com/sarathp20)
- Email: sarathp20@gmail.com

---

**Last Updated:** May 2026
