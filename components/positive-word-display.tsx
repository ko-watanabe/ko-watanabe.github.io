'use client'

import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '@/contexts/language-context'

const positiveWords = {
  ja: [
    '素敵ですね！',
    'いい日ですね！',
    '一緒に仕事しましょう！',
    'あなたは頼もしい！',
    'あなたは最高です！',
  ],
  en: [
    'You are nice!',
    'You are great!',
    'You are awesome!',
    'Fantastic day right? 🤩',
    'You are amazing!',
    'You are wonderful!',
    'You are fantastic!',
    'You are incredible!',
    'You are amazing!',
    'You are wonderful!',
    'You are fantastic!',
    'You are incredible!',
    'Thank you for visiting!',
  ],
}

const siteRelatedWords = {
  ja: [
    'Trustworthy AI',
    'HCI研究',
    '機械学習',
    'DFKI',
    'RPTU',
    'ドイツ',
    'カイザースラウテルン',
    '研究',
    '論文',
    '学会',
    '受賞',
    '委員会',
    'AIの説明可能性',
    'AIの公平性',
    'ソフトウェア開発',
    'バックエンド',
    'クラウド',
    'モデル実装',
    'ドイツで起業',
    'コラボレーション',
    '国際共同プロジェクト',
  ],
  en: [
    'Trustworthy AI',
    'HCI Research',
    'Machine Learning',
    'DFKI',
    'RPTU',
    'Germany',
    'Kaiserslautern',
    'Research',
    'Publications',
    'Conference',
    'Awards',
    'Committee',
    'AI Explainability',
    'AI Fairness',
    'Software Development',
    'Backend',
    'Cloud',
    'Model Implementation',
    'Startup in Germany',
    'Collaboration',
    'International Projects',
  ],
}

interface Bubble {
  id: number
  word: string
  left: number
  type: 'positive' | 'siteRelated'
}

export function PositiveWordDisplay() {
  const { language } = useLanguage()
  const [bubbles, setBubbles] = useState<Bubble[]>([])
  const bubbleIdRef = useRef(0)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement

      // ボタン、リンク、またはその他のインタラクティブ要素を除外
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('[role="button"]') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('select') ||
        target.closest('[onclick]')
      ) {
        return
      }

      // ランダムなポジティブなワードまたはサイト関連ワードを選択
      const positiveWordsList = positiveWords[language]
      const siteWordsList = siteRelatedWords[language]
      const allWords = [...positiveWordsList, ...siteWordsList]
      const randomIndex = Math.floor(Math.random() * allWords.length)
      const randomWord = allWords[randomIndex]

      // ワードタイプを判定
      const wordType = randomIndex < positiveWordsList.length ? 'positive' : 'siteRelated'

      // ランダムな横位置（10%から90%の間）
      const randomLeft = 10 + Math.random() * 80

      // 新しいバブルを追加
      const newBubble: Bubble = {
        id: bubbleIdRef.current++,
        word: randomWord,
        left: randomLeft,
        type: wordType,
      }

      setBubbles(prev => [...prev, newBubble])

      // 6秒後にバブルを削除
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id))
      }, 6000)
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [language])

  return (
    <>
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="fixed bottom-0 z-50 pointer-events-none"
          style={{
            left: `${bubble.left}%`,
            animation: 'bubble-up 6s ease-out forwards'
          }}
        >
          <div
            className={`border border-border text-foreground px-6 py-3 rounded-full shadow-lg text-lg font-semibold whitespace-nowrap ${bubble.type === 'positive'
              ? 'bg-red-50 dark:bg-red-950/30'
              : 'bg-blue-50 dark:bg-blue-950/30'
              }`}
          >
            {bubble.word}
          </div>
        </div>
      ))}
    </>
  )
}

