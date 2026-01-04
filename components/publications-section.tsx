'use client'

import { useState } from "react"
import { Award, Users, FileText, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import Image from "next/image"

const awards = [
  {
    title: "Best Short Paper Award",
    event: "ETRA 2025",
    icon: "🏆",
    url: "https://dl.acm.org/doi/full/10.1145/3715669.3723125",
    awardDetailUrl: "https://etra.acm.org/2025/awards.html",
    image: "/awards/etra2025.png",
  },
]

const fundingJa = [
  {
    title: "CREST AIP CHALLANGE",
    amount: "¥1,000,000",
    description: "研究費として受領",
  },
  {
    title: "トビタテ留学ジャパン奨学金",
    amount: "¥1,160,000",
    description: "給付型奨学金(6ヶ月間)",
  },
  {
    title: "JASSO Scholarship",
    amount: "¥2,112,000",
    description: "返済型奨学金(2年間)・成績優秀につき1年分返還免除",
  },
]

const fundingEn = [
  {
    title: "CREST AIP CHALLANGE",
    amount: "¥1,000,000",
    description: "Received for research use",
  },
  {
    title: "TOBITATE Exchange Scholarship",
    amount: "¥1,160,000",
    description: "Grant Scholarship (6 months)",
  },
  {
    title: "JASSO Scholarship",
    amount: "¥2,112,000",
    description: "Repayment Scholarship (2 years)・Half repayment exemption",
  },
]

const committees = [
  {
    organization: "IUI 2026",
    role: "Program Committee",
    url: "https://iui.acm.org/2026/",
    image: "/committee/iui2026.jpg",
  },
  {
    organization: "Augmented Humans 2026",
    role: "Demo & Poster Chair",
    url: "https://www.augmented-humans.org/",
    image: "/committee/ahs2026.png",
  },
  {
    organization: "MUM 2025",
    role: "Program Committee",
    url: "https://www.mum-conf.org/2025/index.php?web=committee",
    image: "/committee/mum2025.png",
  },
  {
    organization: "ISWC 2025",
    role: "Program Committee",
    url: "https://www.ubicomp.org/ubicomp-iswc-2025/organizing-committee/iswc-program-committee/",
    image: "/committee/iswc2025.jpeg",
  },
  {
    organization: "CHI 2025",
    role: "Late-Breaking-Work AC",
    url: "https://chi2025.acm.org/",
    image: "/committee/chi2025.png",
  },
  {
    organization: "Augmented Humans 2025",
    role: "Demo Chair",
    url: "https://2025.augmented-humans.org/committee/",
    image: "/committee/ahs2025.png",
  },
  {
    organization: "ICMU 2025",
    role: "TPC",
    url: "https://www.icmu.org/",
    image: "/committee/icmu2025.png",
  },
  {
    organization: "IEEE SMARTCOMP 2024",
    role: "TPC",
    url: "https://smartcomp2024.ieee-smartcomp.org/",
    image: "/committee/smartcomp2024.png",
  },
]

const content = {
  ja: {
    title: "Awards & Activities",
    awardsTitle: "受賞",
    fundingTitle: "研究助成金・奨学金",
    committeesTitle: "学会運営・委員会",
    view: "View",
    awardDetail: "Award Detail",
    showMore: "もっと見る",
    showLess: "閉じる",
  },
  en: {
    title: "Awards & Activities",
    awardsTitle: "Awards",
    fundingTitle: "Fundings",
    committeesTitle: "Committee Activities",
    view: "View",
    awardDetail: "Award Detail",
    showMore: "Show More",
    showLess: "Show Less",
  },
}

export function PublicationsSection() {
  const { language } = useLanguage()
  const texts = content[language]
  const funding = language === 'ja' ? fundingJa : fundingEn

  const [visibleAwardCount, setVisibleAwardCount] = useState(3)
  const [visibleFundingCount, setVisibleFundingCount] = useState(3)

  const displayedAwards = awards.slice(0, visibleAwardCount)
  const displayedFunding = funding.slice(0, visibleFundingCount)

  const hasMoreAwards = awards.length > visibleAwardCount
  const hasMoreFunding = funding.length > visibleFundingCount
  const canShowLessAwards = visibleAwardCount > 3
  const canShowLessFunding = visibleFundingCount > 3

  const handleShowMoreAwards = () => {
    setVisibleAwardCount(prev => Math.min(prev + 3, awards.length))
  }

  const handleShowLessAwards = () => {
    setVisibleAwardCount(prev => Math.max(prev - 3, 3))
  }

  const handleShowMoreFunding = () => {
    setVisibleFundingCount(prev => Math.min(prev + 3, funding.length))
  }

  const handleShowLessFunding = () => {
    setVisibleFundingCount(prev => Math.max(prev - 3, 3))
  }

  return (
    <section className="bg-muted/30 px-4 py-20" id="publications">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-16 text-balance text-center font-serif text-4xl font-bold tracking-tight md:text-5xl">
          {texts.title}
        </h2>

        <div className="space-y-8">
          <div className="grid gap-12 md:grid-cols-2 md:items-start">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <Award className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">{texts.awardsTitle}</h3>
              </div>
              <div className="space-y-4">
                {displayedAwards.map((award, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">
                            {award.icon} {award.title}
                          </p>
                          <p className="text-sm text-muted-foreground">{award.event}</p>
                          <div className="mt-2 flex gap-2">
                            {award.url && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="h-7 text-xs"
                              >
                                <a
                                  href={award.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  {texts.view}
                                </a>
                              </Button>
                            )}
                            {award.awardDetailUrl && (
                              <Button
                                variant="outline"
                                size="sm"
                                asChild
                                className="h-7 text-xs"
                              >
                                <a
                                  href={award.awardDetailUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  {texts.awardDetail}
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                        {award.image && (
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded">
                            <Image
                              src={award.image}
                              alt={award.event}
                              fill
                              className="object-contain"
                              unoptimized
                            />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                {(hasMoreAwards || canShowLessAwards) && (
                  <div className="pt-2 flex gap-2">
                    {hasMoreAwards && (
                      <Button
                        variant="outline"
                        onClick={handleShowMoreAwards}
                        className="flex-1"
                      >
                        {texts.showMore}
                      </Button>
                    )}
                    {canShowLessAwards && (
                      <Button
                        variant="outline"
                        onClick={handleShowLessAwards}
                        className="flex-1"
                      >
                        {texts.showLess}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <FileText className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">{texts.fundingTitle}</h3>
              </div>
              <div className="space-y-4">
                {displayedFunding.map((fund, index) => (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-semibold text-foreground">{fund.title}</p>
                        <span className="shrink-0 text-sm font-bold text-secondary">{fund.amount}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{fund.description}</p>
                    </CardContent>
                  </Card>
                ))}
                {(hasMoreFunding || canShowLessFunding) && (
                  <div className="pt-2 flex gap-2">
                    {hasMoreFunding && (
                      <Button
                        variant="outline"
                        onClick={handleShowMoreFunding}
                        className="flex-1"
                      >
                        {texts.showMore}
                      </Button>
                    )}
                    {canShowLessFunding && (
                      <Button
                        variant="outline"
                        onClick={handleShowLessFunding}
                        className="flex-1"
                      >
                        {texts.showLess}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <Users className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">{texts.committeesTitle}</h3>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {committees.map((committee, index) => (
                  <div
                    key={index}
                    className="relative rounded-md border border-border bg-background p-3 text-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {committee.url ? (
                          <a
                            href={committee.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block hover:text-secondary"
                          >
                            <p className="font-semibold text-foreground hover:underline">
                              {committee.organization}
                            </p>
                            <p className="mt-1 text-muted-foreground">
                              {committee.role}
                            </p>
                          </a>
                        ) : (
                          <>
                            <p className="font-semibold text-foreground">
                              {committee.organization}
                            </p>
                            <p className="mt-1 text-muted-foreground">
                              {committee.role}
                            </p>
                          </>
                        )}
                      </div>
                      {committee.image && (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded">
                          <Image
                            src={committee.image}
                            alt={committee.organization}
                            fill
                            className="object-contain"
                            unoptimized
                          />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
