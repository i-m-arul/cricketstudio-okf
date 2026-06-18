import { getFilesByType } from '@/lib/okf'
import OKFCard from '@/components/OKFCard'

export const metadata = {
  title: 'Examples',
  description: 'Verified Q&A patterns showing how AI agents should answer cricket questions with citations and scope.',
}

export default async function ExamplesPage() {
  const files = await getFilesByType('example')
  const nonIndex = files.filter((f) => !f.slug.endsWith('/index'))

  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-2">Examples</h1>
      <p className="text-gray-400 mb-8">
        Verified question-and-answer patterns. Each shows the right way to cite scope, sample size,
        and canonical resources — and the wrong way to answer without context.
      </p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {nonIndex.map((f) => (
          <OKFCard key={f.slug} {...f} />
        ))}
      </div>
    </div>
  )
}
