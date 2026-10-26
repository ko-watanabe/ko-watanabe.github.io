'use client'

import { useEffect, useState } from "react"
import { ArrowLeft, ExternalLink, Presentation } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useLanguage } from "@/contexts/language-context"
import { usePublishedSlides } from "@/hooks/use-published-slides"
import { slidesEn, slidesJa, type SlideItem } from "@/lib/slides"

type SlidesTab = "upcoming" | "past"

const content = {
  ja: {
    title: "Slides",
    description: "学会発表や講演で使用したスライドへのリンクです。",
    back: "ホームに戻る",
    view: "開く",
    emptyUpcoming: "予定のスライドはまだありません。",
    emptyPast: "過去のスライドはまだありません。",
    tabs: {
      upcoming: "Upcoming",
      past: "Past",
    },
  },
  en: {
    title: "Slides",
    description: "Links to slides from conference talks and presentations.",
    back: "Back to Home",
    view: "Open",
    emptyUpcoming: "No upcoming slides yet.",
    emptyPast: "No past slides yet.",
    tabs: {
      upcoming: "Upcoming",
      past: "Past",
    },
  },
}

function SlideList({
  slides,
  empty,
  viewLabel,
}: {
  slides: SlideItem[]
  empty: string
  viewLabel: string
}) {
  if (slides.length === 0) {
    return <p className="text-muted-foreground">{empty}</p>
  }

  return (
    <div className="space-y-4">
      {slides.map((slide, index) => (
        <Card key={`${slide.date}-${slide.title}-${index}`} className="transition-shadow hover:shadow-md">
          <CardContent className="p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold text-foreground">
                  {slide.url ? (
                    <a
                      href={slide.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {slide.title}
                    </a>
                  ) : (
                    slide.title
                  )}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {slide.event}
                  {slide.location ? ` · ${slide.location}` : ""}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">{slide.date}</p>
              </div>
              {slide.url && (
                <Button variant="outline" size="sm" asChild className="shrink-0 gap-2">
                  <a href={slide.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    {viewLabel}
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export function SlidesPage() {
  const { language } = useLanguage()
  const texts = content[language]
  const allSlides = language === "ja" ? slidesJa : slidesEn
  const { upcoming, past, ready } = usePublishedSlides(allSlides)
  const [activeTab, setActiveTab] = useState<SlidesTab>("upcoming")

  useEffect(() => {
    if (!ready) return
    if (upcoming.length === 0 && past.length > 0) {
      setActiveTab("past")
    } else {
      setActiveTab("upcoming")
    }
  }, [ready, upcoming.length, past.length, language])

  const visibleSlides = activeTab === "upcoming" ? upcoming : past
  const emptyMessage = activeTab === "upcoming" ? texts.emptyUpcoming : texts.emptyPast

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-background via-background to-secondary/5 px-4 py-20">
      <LanguageSwitcher />

      <div className="container mx-auto max-w-3xl">
        <Button variant="ghost" asChild className="mb-8 gap-2 px-0 hover:bg-transparent">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            {texts.back}
          </Link>
        </Button>

        <div className="mb-10 flex flex-col items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <Presentation className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-serif text-4xl font-bold tracking-tight md:text-5xl">
                {texts.title}
              </h1>
              <p className="mt-2 text-muted-foreground">{texts.description}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {(["upcoming", "past"] as const).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveTab(tab)}
              >
                {texts.tabs[tab]}
              </Button>
            ))}
          </div>
        </div>

        {ready && (
          <SlideList slides={visibleSlides} empty={emptyMessage} viewLabel={texts.view} />
        )}
      </div>

      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    </main>
  )
}
