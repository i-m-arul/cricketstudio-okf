'use client'

import { useState } from 'react'

interface Props {
  usc: string
  claimUrl: string
}

export default function CiteChip({ usc, claimUrl }: Props) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard?.writeText(usc).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <span className="inline-flex items-center gap-0.5 font-mono text-xs">
      <button
        type="button"
        onClick={handleCopy}
        title="Copy USC citation"
        className="px-1.5 py-0.5 rounded-l bg-green-950 text-green-400 border border-green-800 hover:bg-green-900 transition-colors"
      >
        {copied ? '✓ Copied' : usc}
      </button>
      <button
        type="button"
        onClick={() => window.open(claimUrl, '_blank', 'noopener,noreferrer')}
        title="View claim"
        className="px-1 py-0.5 rounded-r bg-green-950 text-green-500 border border-l-0 border-green-800 hover:bg-green-900 transition-colors"
      >
        ↗
      </button>
    </span>
  )
}
