import { getFilesByType } from '@/lib/okf'
import OKFCard from '@/components/OKFCard'

export const metadata = {
  title: 'Metrics',
  description: 'Cricket metric definitions: batting strike rate, bowling economy, death overs, Orange Cap, Purple Cap.',
}

export default async function MetricsPage() {
  const files = await getFilesByType('metric')
  const nonIndex = files.filter((f) => !f.slug.endsWith('/index'))

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Metrics</h1>
      <p className="text-gray-400 mb-8">
        Every metric file includes formula, eligibility rules, sample-size floors, edge cases, and agent answering guidance.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nonIndex.map((f) => (
          <OKFCard key={f.slug} {...f} />
        ))}
      </div>
    </div>
  )
}
