const FOOTER_COLS = [
  {
    heading: 'Explore',
    links: [
      { label: 'Concepts', href: '/concepts' },
      { label: 'Metrics', href: '/metrics' },
      { label: 'Methodology', href: '/methodology' },
      { label: 'Research', href: '/research' },
      { label: 'Examples', href: '/examples' },
      { label: 'Search', href: '/search' },
    ],
  },
  {
    heading: 'CricketStudio',
    links: [
      { label: 'CricketStudio.ai', href: 'https://cricketstudio.ai', external: true },
      { label: 'Live data', href: 'https://players.cricketstudio.ai', external: true },
      { label: 'About OKF', href: '/about' },
      { label: 'GitHub', href: 'https://github.com/i-m-arul/cricketstudio-okf', external: true },
    ],
  },
  {
    heading: 'Open Data',
    links: [
      { label: 'Citation policy', href: '/methodology/citation-policy' },
      { label: 'Data sources', href: '/sources/cricketstudio-derived-claims' },
      { label: 'Cricsheet (CC BY 3.0)', href: 'https://cricsheet.org', external: true },
      { label: 'License (CC-BY-4.0)', href: 'https://creativecommons.org/licenses/by/4.0/', external: true },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-20 text-sm text-gray-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 mb-10">
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                {col.heading}
              </div>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="hover:text-gray-300 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-600">
          <span>
            <span className="text-green-500 font-semibold">CricketStudio</span> OKF v0.1
          </span>
          <span>
            CC-BY-4.0 · IPL historical &amp; MLC data via{' '}
            <a href="https://cricsheet.org" className="text-green-700 hover:text-green-600">Cricsheet</a> (CC BY 3.0)
          </span>
        </div>
      </div>
    </footer>
  )
}
