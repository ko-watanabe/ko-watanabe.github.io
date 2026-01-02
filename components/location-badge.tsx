'use client'

import { useLanguage } from '@/contexts/language-context'

const defaultLocations = {
  ja: '現在、ドイツで研究活動中',
  en: 'Currently researching in Germany',
}

export function LocationBadge() {
  const { language } = useLanguage()
  const location = defaultLocations[language]

  return (
    <div className="mb-8 flex flex-col items-center gap-3">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-secondary opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-secondary"></span>
        </span>
        {location}
      </div>
    </div>
  )
}

