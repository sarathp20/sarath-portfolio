import { MetadataRoute } from 'next'
import { prisma }        from '@/lib/prisma'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch all published posts for sitemap
  const posts = await prisma.post.findMany({
    where:  { published: true },
    select: { slug: true, updatedAt: true },
  })

  const postUrls = posts.map(post => ({
    url:          `https://sarath-technical-portfolio.vercel.app/writings/${post.slug}`,
    lastModified: post.updatedAt,
    priority:     0.7,
  }))

  return [
    {
      url:          'https://sarath-technical-portfolio.vercel.app',
      lastModified: new Date(),
      priority:     1,
    },
    {
      url:          'https://sarath-technical-portfolio.vercel.app/projects',
      lastModified: new Date(),
      priority:     0.8,
    },
    {
      url:          'https://sarath-technical-portfolio.vercel.app/writings',
      lastModified: new Date(),
      priority:     0.8,
    },
    {
      url:          'https://sarath-technical-portfolio.vercel.app/publications',
      lastModified: new Date(),
      priority:     0.7,
    },
    {
      url:          'https://sarath-technical-portfolio.vercel.app/contact',
      lastModified: new Date(),
      priority:     0.6,
    },
    ...postUrls,  // ← each writing post gets its own sitemap entry
  ]
}