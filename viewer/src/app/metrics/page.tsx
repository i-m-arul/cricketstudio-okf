import { getFilesByType } from '@/lib/okf'
import TagFilter from '@/components/TagFilter'

export const metadata = {
  alternates: { canonical: '/metrics' },
  title: 'Metrics',
  description: 'Cricket metric definitions: batting strike rate, bowling economy, death overs, Orange Cap, Purple Cap.',
}

export default async function MetricsPage() {
  const files = await getFilesByType('metric')
  const nonIndex = files.filter((f) => !f.slug.endsWith('/index'))

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Metrics</h1>
      <p className="text-gray-400 mb-6">
        Every metric file includes formula, eligibility rules, sample-size floors, edge cases, and agent answering guidance.
      </p>
      <TagFilter
        files={nonIndex}
        pinnedTags={[
          // Discipline
          'batting', 'bowling',
          // Topic
          'award', 'death-overs', 'powerplay',
        ]}
        minCount={1}
      />
    </div>
  )
}
