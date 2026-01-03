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
    <div className="fixed top-4 right-4 z-50 flex gap-2">
      <div className="flex gap-2 rounded-none border border-border bg-card p-1 shadow-lg">
        <Button
          variant={language === 'ja' ? 'default' : 'ghost'}
          size="sm"
          onClick={toggleLanguage}
          className="rounded-none px-3 py-1 text-xs"
        >
          JP
        </Button>
        <Button
          variant={language === 'en' ? 'default' : 'ghost'}
          size="sm"
          onClick={toggleLanguage}
          className="rounded-none px-3 py-1 text-xs"
        >
          EN
        </Button>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={toggleTheme}
        className="rounded-none border border-border bg-card px-3 py-1 shadow-lg"
      >
        {theme === 'dark' ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )}
      </Button>
    </div>
  )
}

