import type { MetadataRoute } from 'next'

// AWS CodeBuild artifact paths (/codebuild/output/...) were crawled and indexed
// by Google after Amplify exposed them. Disallow prevents future indexing;
// use GSC URL Removal Tool to clear already-indexed URLs.
const DISALLOW = ['/codebuild/']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly welcome all major LLM and search crawlers (but block CI paths)
      { userAgent: 'GPTBot', allow: '/', disallow: DISALLOW },
      { userAgent: 'ChatGPT-User', allow: '/', disallow: DISALLOW },
      { userAgent: 'anthropic-ai', allow: '/', disallow: DISALLOW },
      { userAgent: 'ClaudeBot', allow: '/', disallow: DISALLOW },
      { userAgent: 'Claude-Web', allow: '/', disallow: DISALLOW },
      { userAgent: 'PerplexityBot', allow: '/', disallow: DISALLOW },
      { userAgent: 'Googlebot', allow: '/', disallow: DISALLOW },
      { userAgent: 'Bingbot', allow: '/', disallow: DISALLOW },
      { userAgent: 'cohere-ai', allow: '/', disallow: DISALLOW },
      { userAgent: 'meta-externalagent', allow: '/', disallow: DISALLOW },
      { userAgent: 'Applebot', allow: '/', disallow: DISALLOW },
      { userAgent: '*', allow: '/', disallow: DISALLOW },
    ],
    sitemap: 'https://okf.cricketstudio.ai/sitemap.xml',
    host: 'https://okf.cricketstudio.ai',
  }
}
