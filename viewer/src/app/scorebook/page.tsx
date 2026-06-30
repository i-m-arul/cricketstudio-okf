import { getAllFiles, TYPE_LABELS } from '@/lib/okf'
import TagFilter from '@/components/TagFilter'

export const metadata = {
  alternates: { canonical: '/scorebook' },
  title: 'Scorebook',
  description: 'Players, teams, leagues, seasons, venues, records, and matches in the CricketStudio OKF knowledge catalog.',
}

const CONCEPT_TYPES = ['player', 'record', 'team', 'season', 'league', 'venue', 'match']

export default async function ScorebookPage() {
  const allFiles = await getAllFiles()
  const concepts = allFiles.filter(
    (f) => CONCEPT_TYPES.includes(f.type) && !f.slug.endsWith('/index')
  )

  // Pre-seed in display order so Object.entries() in TagFilter respects it
  const byType: Record<string, typeof concepts> = Object.fromEntries(
    CONCEPT_TYPES.map((t) => [t, []])
  )
  for (const f of concepts) {
    byType[f.type].push(f)
  }

  const sectionCounts = Object.fromEntries(
    CONCEPT_TYPES.map((t) => [t, byType[t]?.length ?? 0])
  )

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Scorebook</h1>
      <p className="text-gray-400 mb-4">
        Players, teams, leagues, seasons, venues, records, and matches — each with canonical CricketStudio resources and provenance.
      </p>

      <TagFilter
        files={concepts}
        pinnedTags={['IPL', 'MLC', 'batter', 'bowler']}
        minCount={3}
        maxChips={4}
        groupByType={byType}
        typeLabels={TYPE_LABELS}
        topSlot={
          <div className="flex flex-wrap gap-2">
            {CONCEPT_TYPES.filter((t) => sectionCounts[t] > 0).map((t) => (
              <a
                key={t}
                href={`#section-${t}`}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm border border-gray-700 text-gray-400 hover:border-green-700 hover:text-gray-200 transition-all"
              >
                {TYPE_LABELS[t] || t}
                <span className="text-xs text-gray-600">{sectionCounts[t]}</span>
              </a>
            ))}
          </div>
        }
      />
    </div>
  )
}
