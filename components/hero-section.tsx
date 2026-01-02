'use client'

import { Github, Linkedin, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { LocationBadge } from "@/components/location-badge"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"

const content = {
  ja: {
    description: "ドイツ・カイザースラウテルンを拠点とする信頼できるAI＆HCI研究者です。AIプロダクトの実装全体を専門としており、アイデアやデザインから機械学習機能の生成、ウェブクラウドを使用したソフトウェア開発、モデル実装、そしてサービス展開後の改善まで携わっています。また、AIの説明可能性や公平性などの信頼できるAIにも関心があります。",
    scholarLink: "https://scholar.google.com/citations?user=AluAUmEAAAAJ&hl=ja",
  },
  en: {
    description: "I am a Trustworthy AI & HCI Researcher based in Kaiserslautern, Germany. My area of expertise encompasses the entire Artificial Intelligence (AI) product implementation: from an idea or design to generation of machine learning function, developing software using web clouds, some backend techniques, model implementation, and improving the model after deploying the service. Also, Trustworthy AI such as explainability and fairness (or more) of AI is my interest.",
    scholarLink: "https://scholar.google.com/citations?user=AluAUmEAAAAJ&hl=en",
  },
}

export function HeroSection() {
  const { language } = useLanguage()
  const texts = content[language]

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-secondary/5 px-4 py-20">
      <LanguageSwitcher />
      <div className="container mx-auto max-w-5xl text-center">
        <LocationBadge />

        <div className="mb-6 flex justify-center">
          <div className="relative h-48 w-48 md:h-64 md:w-64 lg:h-80 lg:w-80">
            <Image
              src="/ko-watanabe.jpg"
              alt="Ko Watanabe"
              fill
              className="rounded-full object-cover shadow-lg"
              unoptimized
            />
          </div>
        </div>

        <h1 className="mb-6 text-balance font-serif text-5xl font-bold tracking-tight md:text-7xl lg:text-8xl">
          Ko Watanabe
        </h1>

        <p className="mb-4 text-xl text-foreground md:text-2xl">Trustworthy AI & HCI Researcher</p>

        <p className="mb-8 text-lg text-muted-foreground md:text-xl">
          German Research Center for Artificial Intelligence (DFKI)
        </p>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          <Button variant="outline" size="lg" asChild>
            <a href="https://github.com/ko-watanabe" target="_blank" rel="noopener noreferrer" className="gap-2">
              <Github className="h-5 w-5" />
              GitHub
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://www.linkedin.com/in/ko-watanabe/"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <Linkedin className="h-5 w-5" />
              LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href={texts.scholarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <ExternalLink className="h-5 w-5" />
              Google Scholar
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a
              href="https://www.researchgate.net/profile/Ko-Watanabe-3"
              target="_blank"
              rel="noopener noreferrer"
              className="gap-2"
            >
              <ExternalLink className="h-5 w-5" />
              ResearchGate
            </a>
          </Button>
        </div>

        <div className="mx-auto max-w-3xl">
          <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
            {texts.description}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    </section>
  )
}
