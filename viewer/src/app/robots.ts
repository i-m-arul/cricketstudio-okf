import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly welcome all major LLM and search crawlers
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'ChatGPT-User', allow: '/' },
      { userAgent: 'anthropic-ai', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Claude-Web', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'cohere-ai', allow: '/' },
      { userAgent: 'meta-externalagent', allow: '/' },
      { userAgent: 'Applebot', allow: '/' },
      { userAgent: '*', allow: '/' },
    ],
    sitemap: 'https://okf.cricketstudio.ai/sitemap.xml',
    host: 'https://okf.cricketstudio.ai',
  }
}
