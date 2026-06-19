import { getFilesByType } from '@/lib/okf'
import TagFilter from '@/components/TagFilter'

export const metadata = {
  alternates: { canonical: '/methodology' },
  title: 'Methodology',
  description: 'How CricketStudio thinks: sample-size floors, ranking eligibility, citation policy, and phase definitions.',
}

export default async function MethodologyPage() {
  const files = await getFilesByType('methodology')
  const nonIndex = files.filter((f) => !f.slug.endsWith('/index'))

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Methodology</h1>
      <p className="text-gray-400 mb-6">
        The standards and rules that govern how CricketStudio computes, ranks, cites, and discloses uncertainty.
        These are the documents that teach agents how to answer cricket questions correctly.
      </p>
      <TagFilter
        files={nonIndex}
        pinnedTags={[
          // Topic — show all, ordered by usefulness
          'ranking', 'sample-size', 'citation', 'phase', 'correction', 'freshness',
        ]}
        minCount={1}
      />
    </div>
  )
}
