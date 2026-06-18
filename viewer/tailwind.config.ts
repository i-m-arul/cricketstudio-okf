import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        cricket: {
          green: '#16a34a',
          'green-light': '#22c55e',
          navy: '#0a0f1a',
          card: '#111827',
          border: '#1f2937',
          muted: '#6b7280',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      typography: {
        invert: {
          css: {
            '--tw-prose-body': '#d1d5db',
            '--tw-prose-headings': '#f9fafb',
            '--tw-prose-links': '#22c55e',
            '--tw-prose-code': '#f9fafb',
            '--tw-prose-pre-bg': '#1f2937',
            '--tw-prose-th-borders': '#374151',
            '--tw-prose-td-borders': '#374151',
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config
