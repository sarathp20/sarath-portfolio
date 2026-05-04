// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://sarath-technical-portfolio.vercel.app',
      lastModified: new Date(),
      priority: 1,
    },
    {
      url: 'https://sarath-technical-portfolio.vercel.app/projects',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://sarath-technical-portfolio.vercel.app/publications',
      lastModified: new Date(),
      priority: 0.8,
    },
    {
      url: 'https://sarath-technical-portfolio.vercel.app/contact',
      lastModified: new Date(),
      priority: 0.6,
    },
  ]
}