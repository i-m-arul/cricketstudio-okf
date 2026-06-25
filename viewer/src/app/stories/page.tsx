import { getFilesByType } from '@/lib/okf'
import TagFilter from '@/components/TagFilter'

export const metadata = {
  alternates: { canonical: 'https://okf.cricketstudio.ai/stories/' },
  title: 'Journeys — CricketStudio OKF',
  description:
    'Cricket stories built on provenance-backed data. Toss myths, powerplay revelations, venue quirks, death-bowling revolutions — the numbers behind the narrative.',
}

export default async function StoriesPage() {
  const files = await getFilesByType('story')
  const nonIndex = files.filter((f) => !f.slug.endsWith('/index'))

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Journeys</h1>
      <p className="text-gray-400 mb-6">
        Cricket stories built on OKF data. Every wow moment is grounded in provenance, scoped by
        season and format, and honest about what the numbers can't tell you.
      </p>
      <TagFilter
        files={nonIndex}
        pinnedTags={['IPL', 'MLC', 'rivalry', 'powerplay', 'death-overs', 'toss', 'batting', 'bowling', 'venue', 'finals']}
        minCount={2}
        maxChips={10}
      />
    </div>
  )
}
