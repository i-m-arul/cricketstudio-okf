import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BackToTop from '@/components/BackToTop'

const DEFAULT_OG = 'https://okf.cricketstudio.ai/og-image.png'

export const metadata: Metadata = {
  title: { default: 'CricketStudio OKF', template: '%s | CricketStudio OKF' },
  description: 'The open, agent-readable knowledge layer for cricket. Curated facts, metric definitions, methodology, and canonical CricketStudio links.',
  metadataBase: new URL('https://okf.cricketstudio.ai'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    siteName: 'CricketStudio OKF',
    type: 'website',
    title: 'CricketStudio OKF — Open Cricket Knowledge',
    description: 'The open, agent-readable knowledge layer for cricket. Curated facts, metric definitions, methodology, and canonical CricketStudio links.',
    url: 'https://okf.cricketstudio.ai',
    images: [{ url: DEFAULT_OG, width: 1200, height: 630, alt: 'CricketStudio OKF' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@cricketstudio',
    title: 'CricketStudio OKF — Open Cricket Knowledge',
    description: 'The open, agent-readable knowledge layer for cricket. Curated facts, metric definitions, methodology, and canonical CricketStudio links.',
    images: [DEFAULT_OG],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0f1a] text-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  )
}
