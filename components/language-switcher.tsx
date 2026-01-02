'use client'

import { useLanguage } from '@/contexts/language-context'
import { Button } from '@/components/ui/button'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'ja' ? 'en' : 'ja')
  }

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 rounded-lg border border-border bg-card p-1 shadow-lg">
      <Button
        variant={language === 'ja' ? 'default' : 'ghost'}
        size="sm"
        onClick={toggleLanguage}
        className="px-3 py-1 text-xs"
      >
        JP
      </Button>
      <Button
        variant={language === 'en' ? 'default' : 'ghost'}
        size="sm"
        onClick={toggleLanguage}
        className="px-3 py-1 text-xs"
      >
        EN
      </Button>
    </div>
  )
}

