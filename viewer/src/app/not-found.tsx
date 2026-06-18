import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto text-center py-20">
      <div className="text-5xl font-bold text-gray-700 mb-4">404</div>
      <h1 className="text-2xl font-semibold text-white mb-2">Concept not found</h1>
      <p className="text-gray-400 mb-6">
        This OKF concept doesn't exist yet, or the URL has changed.
      </p>
      <div className="flex justify-center gap-3">
        <Link href="/" className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors">
          Home
        </Link>
        <Link href="/search" className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg transition-colors">
          Search
        </Link>
      </div>
    </div>
  )
}
