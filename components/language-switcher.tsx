'use client'

import { useLanguage } from '@/contexts/language-context'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleLanguage = () => {
    setLanguage(language === 'ja' ? 'en' : 'ja')
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed top-2 right-2 z-50 flex gap-1.5 md:top-4 md:right-4 md:gap-2">
      <div className="flex gap-1 rounded-none border border-border bg-card p-0.5 shadow-lg md:gap-2 md:p-1">
        <Button
          variant={language === 'ja' ? 'default' : 'ghost'}
          size="sm"
          onClick={toggleLanguage}
          className="rounded-none px-2 py-1 text-xs md:px-3"
        >
          JP
        </Button>
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={toggleLanguage}
          className="rounded-none px-2 py-1 text-xs md:px-3"
        >
          EN
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="rounded-none border border-border bg-card px-2 py-1 shadow-lg md:px-3"
      >
        {theme === 'dark' ? (
          <Sun className="h-3.5 w-3.5 md:h-4 md:w-4" />
        ) : (
          <Moon className="h-3.5 w-3.5 md:h-4 md:w-4" />
        )}
      </Button>
    </div>
  )
}

