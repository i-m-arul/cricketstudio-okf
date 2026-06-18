import { getAllFiles, TYPE_LABELS } from '@/lib/okf'
import OKFCard from '@/components/OKFCard'

export const metadata = {
  title: 'Concepts',
  description: 'Players, teams, leagues, seasons, venues, and matches in the CricketStudio OKF knowledge catalog.',
}

const CONCEPT_TYPES = ['player', 'record', 'team', 'league', 'season', 'venue', 'match']

export default async function ConceptsPage() {
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
      <h1 className="text-3xl font-bold text-white mb-2">Concepts</h1>
      <p className="text-gray-400 mb-8">
        Players, teams, leagues, seasons, venues, and matches — each with canonical CricketStudio resources and provenance.
      </p>

      {CONCEPT_TYPES.filter((t) => byType[t]?.length).map((type) => (
        <section key={type} className="mb-10">
          <h2 className="text-lg font-semibold text-gray-300 mb-3 capitalize flex items-center gap-2">
            {TYPE_LABELS[type] || type}
            <span className="text-xs font-normal text-gray-600">{byType[type].length} entries</span>
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {byType[type].map((f) => (
              <OKFCard key={f.slug} {...f} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
