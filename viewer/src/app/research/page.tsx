import { getFilesByType } from '@/lib/okf'
import OKFCard from '@/components/OKFCard'

export const metadata = {
  title: 'Research',
  description: 'CricketStudio season reports, toss effects, death overs analysis, and IPL vs MLC comparisons.',
}

export default async function ResearchPage() {
  const files = await getFilesByType('research')
  const nonIndex = files.filter((f) => !f.slug.endsWith('/index'))

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Research</h1>
      <p className="text-gray-400 mb-8">
        Season reports, strategic analysis, toss effects, death overs, and cross-league comparisons.
        Each report includes source boundary, dataset version, and provenance.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nonIndex.map((f) => (
          <OKFCard key={f.slug} {...f} />
        ))}
      </div>
    </div>
  )
}
