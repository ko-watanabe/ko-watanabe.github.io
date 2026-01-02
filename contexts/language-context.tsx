'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Language = 'ja' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en') // デフォルトは英語

  useEffect(() => {
    // まず、ローカルストレージから言語設定を読み込む（ユーザーが手動で切り替えた場合）
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage === 'ja' || savedLanguage === 'en') {
      setLanguageState(savedLanguage)
      return // ユーザーが手動で設定した場合は、IP判定をスキップ
    }

    // IPアドレスから国を判定
    const detectLanguageByIP = async () => {
      try {
        // ipapi.coの無料APIを使用（HTTPS対応）
        const response = await fetch('https://ipapi.co/json/')
        if (response.ok) {
          const data = await response.json()
          // 日本（JP）の場合は日本語、それ以外は英語
          if (data.country_code === 'JP') {
            setLanguageState('ja')
          } else {
            setLanguageState('en')
          }
        } else {
          // APIエラーの場合はデフォルト（英語）を使用
          setLanguageState('en')
        }
      } catch (error) {
        console.warn('Failed to detect country from IP, using default language:', error)
        // エラーの場合はデフォルト（英語）を使用
        setLanguageState('en')
      }
    }

    detectLanguageByIP()
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  // 翻訳関数（必要に応じて拡張可能）
  const t = (key: string) => {
    // ここでは単純な実装。必要に応じて翻訳ファイルを読み込む
    return key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

