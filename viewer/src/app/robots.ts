import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: 'https://okf.cricketstudio.ai/sitemap.xml',
    host: 'https://okf.cricketstudio.ai',
  }
}
