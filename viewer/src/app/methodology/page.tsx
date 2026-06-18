import { getFilesByType } from '@/lib/okf'
import OKFCard from '@/components/OKFCard'

export const metadata = {
  title: 'Methodology',
  description: 'How CricketStudio thinks: sample-size floors, ranking eligibility, citation policy, and phase definitions.',
}

export default async function MethodologyPage() {
  const files = await getFilesByType('methodology')
  const nonIndex = files.filter((f) => !f.slug.endsWith('/index'))

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Methodology</h1>
      <p className="text-gray-400 mb-8">
        The standards and rules that govern how CricketStudio computes, ranks, cites, and discloses uncertainty.
        These are the documents that teach agents how to answer cricket questions correctly.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nonIndex.map((f) => (
          <OKFCard key={f.slug} {...f} />
        ))}
      </div>
    </div>
  )
}
