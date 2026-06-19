import { getAllFiles, TYPE_LABELS } from '@/lib/okf'
import TagFilter from '@/components/TagFilter'

export const metadata = {
  title: 'Scorebook',
  description: 'Players, teams, leagues, seasons, venues, and matches in the CricketStudio OKF knowledge catalog.',
}

const CONCEPT_TYPES = ['player', 'record', 'team', 'league', 'season', 'venue', 'match']

export default async function ScorebookPage() {
  const allFiles = await getAllFiles()
  const concepts = allFiles.filter(
    (f) => CONCEPT_TYPES.includes(f.type) && !f.slug.endsWith('/index')
  )

  const byType: Record<string, typeof concepts> = {}
  for (const f of concepts) {
    if (!byType[f.type]) byType[f.type] = []
    byType[f.type].push(f)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Scorebook</h1>
      <p className="text-gray-400 mb-6">
        Players, teams, leagues, seasons, venues, and matches — each with canonical CricketStudio resources and provenance.
      </p>

      <TagFilter
        files={concepts}
        pinnedTags={[
          // League
          'IPL', 'MLC',
          // Role
          'batter', 'bowler', 'all-rounder', 'wicket-keeper',
          // Format / topic
          'T20', 'records', 'batting',
        ]}
        minCount={2}
        groupByType={byType}
        typeLabels={TYPE_LABELS}
      />
    </div>
  )
}
