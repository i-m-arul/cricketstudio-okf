import { getAllFiles, TYPE_LABELS } from '@/lib/okf'
import TagFilter from '@/components/TagFilter'

export const metadata = {
  alternates: { canonical: '/scorebook' },
  title: 'Scorebook',
  description: 'Players, teams, leagues, seasons, venues, records, and matches in the CricketStudio OKF knowledge catalog.',
}

const CONCEPT_TYPES = ['player', 'team', 'league', 'season', 'record', 'venue', 'match']

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

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Scorebook</h1>
      <p className="text-gray-400 mb-6">
        Players, teams, leagues, seasons, venues, records, and matches — each with canonical CricketStudio resources and provenance.
      </p>

      <TagFilter
        files={concepts}
        pinnedTags={['IPL', 'MLC', 'batter', 'bowler', 'all-rounder', 'pace', 'spin']}
        minCount={3}
        maxChips={10}
        groupByType={byType}
        typeLabels={TYPE_LABELS}
      />
    </div>
  )
}
