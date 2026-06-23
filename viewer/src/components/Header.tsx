'use client'
import Link from 'next/link'
import { useState } from 'react'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const nav = [
    { href: '/spec/', label: 'Spec' },
    { href: '/scorebook/', label: 'Scorebook' },
    { href: '/metrics/', label: 'Metrics' },
    { href: '/research/', label: 'Research' },
    { href: '/dossier/', label: 'Dossier' },
    { href: '/agents/', label: 'Agents' },
    { href: '/search/', label: 'Search' },
    { href: '/about/', label: 'About' },
  ]

  return (
    <header className="border-b border-gray-800 bg-[#0a0f1a]/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-green-400 font-bold text-lg tracking-tight group-hover:text-green-300 transition-colors">
              CricketStudio
            </span>
            <span className="text-gray-500 text-sm font-mono">OKF</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-400 hover:text-white text-sm px-3 py-1.5 rounded-md hover:bg-gray-800 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <a
              href="https://players.cricketstudio.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 text-sm bg-green-700 hover:bg-green-600 text-white px-3 py-1.5 rounded-md transition-colors"
            >
              Live data ↗
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <div id="mobile-nav" className="md:hidden py-3 border-t border-gray-800">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-400 hover:text-white px-2 py-2 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  )
}
