import Link from 'next/link'
import { TYPE_LABELS } from '@/lib/constants'
import CiteChip from './CiteChip'

interface Props {
  slug: string
  urlPath: string
  type: string
  title: string
  description: string
  tags?: string[]
  canonical_page?: string
  source_boundary?: string
  confidence?: string
  usc?: string
  claimUrl?: string
}

const TYPE_COLORS: Record<string, string> = {
  player: 'bg-blue-900/40 text-blue-300 border-blue-800',
  team: 'bg-purple-900/40 text-purple-300 border-purple-800',
  league: 'bg-yellow-900/40 text-yellow-300 border-yellow-800',
  season: 'bg-orange-900/40 text-orange-300 border-orange-800',
  match: 'bg-red-900/40 text-red-300 border-red-800',
  venue: 'bg-teal-900/40 text-teal-300 border-teal-800',
  metric: 'bg-green-900/40 text-green-300 border-green-800',
  methodology: 'bg-gray-700/40 text-gray-300 border-gray-600',
  dossier: 'bg-indigo-900/40 text-indigo-300 border-indigo-800',
  research: 'bg-rose-900/40 text-rose-300 border-rose-800',
  source: 'bg-slate-700/40 text-slate-300 border-slate-600',
}

const CONF_STYLES: Record<string, { pill: string; dot: string }> = {
  medium: {
    pill: 'bg-amber-950/50 text-amber-400',
    dot: 'bg-amber-400',
  },
  low: {
    pill: 'bg-red-950/50 text-red-400',
    dot: 'bg-red-400',
  },
}

export default function OKFCard({ slug, urlPath, type, title, description, tags, canonical_page, confidence, usc, claimUrl }: Props) {
  const colorClass = TYPE_COLORS[type] || 'bg-gray-800/40 text-gray-300 border-gray-700'
  const typeLabel = TYPE_LABELS[type] || type
  const confStyle = type === 'dossier' && confidence && CONF_STYLES[confidence] ? CONF_STYLES[confidence] : null

  return (
    <Link
      href={urlPath}
      className="group block bg-gray-900 border border-gray-800 rounded-lg p-4 hover:border-green-700 hover:bg-gray-800/50 transition-all"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className={`inline-flex text-xs font-medium px-2 py-0.5 rounded border ${colorClass}`}>
            {typeLabel}
          </span>
          {confStyle && (
            <span className={`inline-flex items-center gap-1 text-xs font-medium px-1.5 py-0.5 rounded ${confStyle.pill}`}>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${confStyle.dot}`} aria-hidden="true" />
              {confidence}
            </span>
          )}
        </div>
        {canonical_page && (
          <span className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">↗ canonical</span>
        )}
      </div>
      <h3 className="font-semibold text-white mb-1 group-hover:text-green-300 transition-colors line-clamp-1">
        {title}
      </h3>
      <p className="text-sm text-gray-400 line-clamp-2">{description}</p>
      {tags && tags.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs text-gray-600 bg-gray-800 px-1.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
      {usc && claimUrl && (
        <div className="mt-2" onClick={(e) => e.preventDefault()}>
          <CiteChip usc={usc} claimUrl={claimUrl} />
        </div>
      )}
    </Link>
  )
}
