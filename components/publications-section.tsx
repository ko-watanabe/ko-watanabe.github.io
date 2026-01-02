'use client'

import { Award, Users, FileText, ExternalLink } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const awards = [
  {
    title: "Best Short Paper Award",
    event: "ETRA 2025",
    icon: "🏆",
    url: "https://dl.acm.org/doi/full/10.1145/3715669.3723125",
    awardDetailUrl: "https://etra.acm.org/2025/awards.html",
  },
]

const fundingJa = [
  {
    title: "CREST AIP CHALLANGE",
    amount: "¥1,000,000",
    description: "研究費として受領",
  },
  {
    title: "TOBITATE Exchange Scholarship",
    amount: "¥1,160,000",
    description: "6ヶ月間の奨学金として受領",
  },
  {
    title: "JASSO Scholarship",
    amount: "¥2,112,000",
    description: "2年間で月額¥88,000を受領",
  },
  {
    title: "JASSO Scholarship 半額返還免除",
    amount: "¥1,056,000",
    description: "免除として受領",
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
    description: "Received for six months scholarship",
  },
  {
    title: "JASSO Scholarship",
    amount: "¥2,112,000",
    description: "Received ¥88,000 per month for two years",
  },
  {
    title: "Half Repayment Exemption for JASSO Scholarship",
    amount: "¥1,056,000",
    description: "Received as exemption",
  },
]

const committees = [
  {
    name: "IUI 2026 Program Committee",
    url: "https://iui.acm.org/2026/",
  },
  {
    name: "Augmented Humans 2026 - Demo & Poster Chair",
    url: "https://www.augmented-humans.org/",
  },
  {
    name: "ISWC 2025 Program Committee",
    url: "https://www.ubicomp.org/ubicomp-iswc-2025/organizing-committee/iswc-program-committee/",
  },
  {
    name: "CHI 2025 Late-Breaking-Work AC",
    url: "https://chi2025.acm.org/",
  },
  {
    name: "Augmented Humans 2025 - Demo Chair",
    url: "https://2025.augmented-humans.org/committee/",
  },
  {
    name: "ICMU 2025 - TPC",
    url: "https://www.icmu.org/",
  },
  {
    name: "IEEE SMARTCOMP 2024 - TPC",
    url: "https://smartcomp2024.ieee-smartcomp.org/",
  },
]

const content = {
  ja: {
    title: "Awards & Activities",
    awardsTitle: "受賞",
    fundingTitle: "研究助成金",
    committeesTitle: "委員会活動",
    view: "View",
    awardDetail: "Award Detail",
  },
  en: {
    title: "Awards & Activities",
    awardsTitle: "Awards",
    fundingTitle: "Fundings",
    committeesTitle: "Committee Activities",
    view: "View",
    awardDetail: "Award Detail",
  },
}

export function PublicationsSection() {
  const { language } = useLanguage()
  const texts = content[language]
  const funding = language === 'ja' ? fundingJa : fundingEn

  return (
    <section className="bg-muted/30 px-4 py-20" id="publications">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-16 text-balance text-center font-serif text-4xl font-bold tracking-tight md:text-5xl">
          {texts.title}
        </h2>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2 lg:col-span-1">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <Award className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">{texts.awardsTitle}</h3>
              </div>
              <div className="space-y-3">
                {awards.map((award, index) => (
                  <div key={index}>
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
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-bold">{texts.fundingTitle}</h3>
              </div>
              <div className="space-y-4">
                {funding.map((fund, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between gap-2">
                      <p className="font-semibold text-foreground">{fund.title}</p>
                      <span className="shrink-0 text-sm font-bold text-secondary">{fund.amount}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{fund.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3">
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
                    className="rounded-md border border-border bg-background p-3 text-sm text-foreground"
                  >
                    {committee.url ? (
                      <a
                        href={committee.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-secondary hover:underline"
                      >
                        {committee.name}
                      </a>
                    ) : (
                      committee.name
                    )}
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
