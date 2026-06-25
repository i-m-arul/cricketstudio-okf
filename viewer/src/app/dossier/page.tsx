import { getFilesByType } from '@/lib/okf'
import TagFilter from '@/components/TagFilter'

export const metadata = {
  alternates: { canonical: '/dossier' },
  title: 'Dossier',
  description: 'Verified Q&A patterns showing how AI agents should answer cricket questions with citations and scope.',
}

export default async function DossierPage() {
  const files = await getFilesByType('dossier')
  const nonIndex = files.filter((f) => !f.slug.endsWith('/index'))

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Dossier</h1>
      <p className="text-gray-400 mb-6">
        Verified question-and-answer patterns. Each shows the right way to cite scope, sample size,
        and canonical resources — and the wrong way to answer without context.
      </p>
      <TagFilter
        files={nonIndex}
        pinnedTags={['IPL', 'MLC', 'batting', 'bowling', 'powerplay', 'death-overs', 'leaderboard', 'toss', 'all-time']}
        minCount={3}
        maxChips={10}
      />
    </div>
  )
}
