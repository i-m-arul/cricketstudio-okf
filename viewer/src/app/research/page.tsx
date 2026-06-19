import { getFilesByType } from '@/lib/okf'
import TagFilter from '@/components/TagFilter'

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
      <p className="text-gray-400 mb-6">
        Season reports, strategic analysis, toss effects, death overs, and cross-league comparisons.
        Each report includes source boundary, dataset version, and provenance.
      </p>
      <TagFilter
        files={nonIndex}
        pinnedTags={[
          // League
          'IPL', 'MLC',
          // Season
          'IPL-2026',
          // Topic
          'toss', 'death-overs', 'batting-analysis', 'bowling-analysis', 'season-analysis',
        ]}
        minCount={2}
      />
    </div>
  )
}
