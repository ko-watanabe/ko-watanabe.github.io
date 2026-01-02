'use client'

import { useLanguage } from '@/contexts/language-context'

const content = {
  ja: {
    title: 'About Me',
    paragraph1: '私の専門分野は、人工知能(AI)プロダクトの実装全体をカバーしています。アイデアやデザインから機械学習機能の生成、ウェブクラウドを使用したソフトウェア開発、バックエンド技術、モデル実装、そしてサービス展開後のモデル改善まで携わっています。また、AIの説明可能性や公平性などの信頼できるAI(Trustworthy AI)が私の研究関心領域です。',
    dfkiTitle: 'DFKI ホームページの経歴',
  },
  en: {
    title: 'About Me',
    paragraph1: 'My area of expertise encompasses the entire Artificial Intelligence (AI) product implementation: from an idea or design to generation of machine learning function, developing software using web clouds, some backend techniques, model implementation, and improving the model after deploying the service. Also, Trustworthy AI such as explainability and fairness (or more) of AI is my interest.',
    dfkiTitle: 'DFKI Homepage Bio',
  },
}

export function AboutSection() {
  const { language } = useLanguage()
  const texts = content[language]

  return (
    <section className="px-4 py-20" id="about">
      <div className="container mx-auto max-w-4xl">
        <h2 className="mb-12 text-balance text-center font-serif text-4xl font-bold tracking-tight md:text-5xl">
          {texts.title}
        </h2>

        <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
          <p>{texts.paragraph1}</p>

          <div className="mt-8 rounded-lg border border-border bg-card p-6">
            <h3 className="mb-4 text-xl font-semibold text-foreground">{texts.dfkiTitle}</h3>
            <a
              href="https://www.dfki.de/en/web/about-us/employee/person/kowa01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              https://www.dfki.de/en/web/about-us/employee/person/kowa01
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
