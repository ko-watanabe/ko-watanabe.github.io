'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

interface Publication {
  title: string
  authors: string
  venue: string
  year: string
  citations: number
  url?: string
  dateOrder?: number // 最新順のURLから取得した順序
}

const INITIAL_DISPLAY_COUNT = 5

const content = {
  ja: {
    title: "Publications",
    showMore: "もっと見る",
    citations: "引用件数",
    noPublications: "論文データを読み込んでいます...",
    mostCited: "引用数上位",
    latest: "最新論文",
  },
  en: {
    title: "Publications",
    showMore: "Show More",
    citations: "Citations",
    noPublications: "Loading publications...",
    mostCited: "Most Cited",
    latest: "Latest",
  },
}

export function PublicationsListSection() {
  const { language } = useLanguage()
  const texts = content[language]
  const [publications, setPublications] = useState<Publication[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // ビルド時に生成されたJSONファイルを読み込む
    const loadPublications = async () => {
      try {
        const response = await fetch('/scholar-publications.json')
        if (response.ok) {
          const data: Publication[] = await response.json()
          setPublications(data)
        } else {
          console.warn('Failed to load publications data')
        }
      } catch (error) {
        console.error('Error loading publications data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPublications()
  }, [])

  // 引用件数でソート（降順）
  const sortedByCitations = [...publications].sort((a, b) => b.citations - a.citations)
  const mostCitedPublications = sortedByCitations.slice(0, INITIAL_DISPLAY_COUNT)

  // 最新順でソート（dateOrderを使用、なければ年でソート）
  const sortedByDate = [...publications]
    .filter(pub => {
      // dateOrderがあるか、年が有効なものだけをフィルタリング
      if (pub.dateOrder !== undefined) return true
      const year = parseInt(pub.year.trim())
      return !isNaN(year) && year > 0
    })
    .sort((a, b) => {
      // dateOrderを優先
      if (a.dateOrder !== undefined && b.dateOrder !== undefined) {
        return a.dateOrder - b.dateOrder
      }
      if (a.dateOrder !== undefined) return -1
      if (b.dateOrder !== undefined) return 1

      // dateOrderがない場合は年でソート
      const yearA = parseInt(a.year.trim())
      const yearB = parseInt(b.year.trim())
      // 年が同じ場合は引用数でソート（降順）
      if (yearB === yearA) {
        return b.citations - a.citations
      }
      return yearB - yearA
    })
  const latestPublications = sortedByDate.slice(0, INITIAL_DISPLAY_COUNT)

  const hasMore = publications.length > INITIAL_DISPLAY_COUNT

  const scholarUrl = language === 'ja'
    ? 'https://scholar.google.com/citations?user=AluAUmEAAAAJ&hl=ja'
    : 'https://scholar.google.com/citations?user=AluAUmEAAAAJ&hl=en'

  return (
    <section className="px-4 py-20" id="publications-list">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-12 text-balance text-center font-serif text-4xl font-bold tracking-tight md:text-5xl">
          {texts.title}
        </h2>

        {isLoading ? (
          <div className="text-center text-muted-foreground">
            <p>{texts.noPublications}</p>
          </div>
        ) : publications.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>No publications available. Please check Google Scholar.</p>
            <Button
              variant="outline"
              size="lg"
              asChild
              className="mt-4 gap-2"
            >
              <a
                href={scholarUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-5 w-5" />
                View on Google Scholar
              </a>
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2">
              {/* 左カラム: 引用数上位 */}
              <div className="flex flex-col">
                <h3 className="mb-4 text-xl font-semibold text-foreground">
                  {texts.mostCited}
                </h3>
                <div className="space-y-4">
                  {mostCitedPublications.map((pub, index) => (
                    <Card key={`cited-${index}`} className="transition-shadow hover:shadow-md">
                      <CardContent className="p-4 flex flex-col min-h-[180px]">
                        <h4 className="mb-2 text-base font-semibold text-foreground line-clamp-3">
                          {pub.url ? (
                            <a
                              href={pub.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {pub.title}
                            </a>
                          ) : (
                            pub.title
                          )}
                        </h4>
                        <p className="mb-1 text-xs text-muted-foreground line-clamp-2">{pub.authors}</p>
                        <p className="mb-2 text-xs text-muted-foreground line-clamp-2">
                          {pub.venue} ({pub.year})
                        </p>
                        <div className="mt-auto flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs w-fit">
                            {texts.citations}: {pub.citations}
                          </Badge>
                          {pub.url && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="h-7 text-xs"
                            >
                              <a
                                href={pub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View
                              </a>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 右カラム: 最新論文 */}
              <div className="flex flex-col">
                <h3 className="mb-4 text-xl font-semibold text-foreground">
                  {texts.latest}
                </h3>
                <div className="space-y-4">
                  {latestPublications.map((pub, index) => (
                    <Card key={`latest-${index}`} className="transition-shadow hover:shadow-md">
                      <CardContent className="p-4 flex flex-col min-h-[180px]">
                        <h4 className="mb-2 text-base font-semibold text-foreground line-clamp-3">
                          {pub.url ? (
                            <a
                              href={pub.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline"
                            >
                              {pub.title}
                            </a>
                          ) : (
                            pub.title
                          )}
                        </h4>
                        <p className="mb-1 text-xs text-muted-foreground line-clamp-2">{pub.authors}</p>
                        <p className="mb-2 text-xs text-muted-foreground line-clamp-2">
                          {pub.venue} ({pub.year})
                        </p>
                        {pub.url && (
                          <div className="mt-auto">
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                              className="h-7 text-xs"
                            >
                              <a
                                href={pub.url}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <ExternalLink className="h-3 w-3 mr-1" />
                                View
                              </a>
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {hasMore && (
              <div className="mt-8 text-center">
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="gap-2"
                >
                  <a
                    href={scholarUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-5 w-5" />
                    {texts.showMore} - Google Scholar
                  </a>
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

