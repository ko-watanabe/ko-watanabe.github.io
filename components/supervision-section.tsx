'use client'

import { useEffect, useMemo, useState } from "react"
import { Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

type SuperviseeRole = "master" | "bachelor"
type SupervisionCategory = "thesis" | "internship"

type Supervisee = {
  name: string
  roles: SuperviseeRole[]
  category: SupervisionCategory
  university?: string
  thesisTitle?: string
  date?: string
  url?: string
}

function formatSupervisionDate(date: string, language: "ja" | "en") {
  const parsed = new Date(`${date}T00:00:00`)

  if (language === "ja") {
    return parsed.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return parsed.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

const supervisees: Supervisee[] = [
  {
    name: "Tanuja Sathyanarayana",
    roles: ["master"],
    category: "thesis",
    university: "RPTU Kaiserslautern-Landau",
    thesisTitle:
      "Using Deep Neural Networks to Predict Engagement in Online Meetings Based on Facial Expressions",
    date: "2023-04-16",
    url: "https://rptu.de/",
  },
  {
    name: "David Dembinsky",
    roles: ["master"],
    category: "thesis",
    university: "RPTU Kaiserslautern-Landau",
    thesisTitle: "Generating Naturalistic Eye Gaze for Conversational Avatars",
    date: "2024-05-06",
    url: "https://rptu.de/",
  },
  {
    name: "Pooja Atul Pol",
    roles: ["master"],
    category: "thesis",
    university: "RPTU Kaiserslautern-Landau",
    thesisTitle: "Right-Left Brain Cognitive Activity Recognition Through Pupillometry",
    date: "2024-12-13",
    url: "https://rptu.de/",
  },
  {
    name: "Sahana Yadnakudige Subramanya",
    roles: ["master"],
    category: "thesis",
    university: "RPTU Kaiserslautern-Landau",
    thesisTitle:
      "Enhancing Emotion Recognition with Human-in-the-Loop User Feedback Annotation",
    date: "2024-12-15",
    url: "https://rptu.de/",
  },
  {
    name: "Arib Yousuf",
    roles: ["master"],
    category: "thesis",
    university: "RPTU Kaiserslautern-Landau",
    thesisTitle: "Estimation of Personal Identifiable Information in Skin Diagnosis Images",
    date: "2026-06-02",
    url: "https://rptu.de/",
  },
  {
    name: "Gitesh Gund",
    roles: ["master"],
    category: "thesis",
    university: "RPTU Kaiserslautern-Landau",
    thesisTitle:
      "Integrating Eye Tracking and Deep Learning for Enhanced Lecturer Feedback and Student's Comprehension in Online Video Education",
    date: "2025-02-19",
    url: "https://rptu.de/",
  },
  {
    name: "Noriyuki Tanaka",
    roles: ["master"],
    category: "thesis",
    university: "Osaka Metropolitan University",
    date: "2025-03-31",
    url: "https://www.omu.ac.jp/en/",
  },
  {
    name: "Shunta Sato",
    roles: ["bachelor"],
    category: "thesis",
    university: "Osaka Metropolitan University",
    date: "2025-03-31",
    url: "https://www.omu.ac.jp/en/",
  },
  {
    name: "Soushi Yoshida",
    roles: ["bachelor"],
    category: "thesis",
    university: "Osaka Metropolitan University",
    date: "2025-03-31",
    url: "https://www.omu.ac.jp/en/",
  },
  {
    name: "Soki Kokado",
    roles: ["bachelor"],
    category: "thesis",
    university: "Osaka Metropolitan University",
    date: "2025-03-31",
    url: "https://www.omu.ac.jp/en/",
  },
  {
    name: "Takeshi Tai",
    roles: ["bachelor"],
    category: "thesis",
    university: "Osaka Metropolitan University",
    date: "2025-03-31",
    url: "https://www.omu.ac.jp/en/",
  },
  {
    name: "Ryogo Ueshima",
    roles: ["bachelor"],
    category: "thesis",
    university: "Osaka Metropolitan University",
    date: "2024-03-31",
    url: "https://www.omu.ac.jp/en/",
  },
  {
    name: "Noriyuki Tanaka",
    roles: ["bachelor"],
    category: "thesis",
    university: "Osaka Metropolitan University",
    date: "2023-03-31",
    url: "https://www.omu.ac.jp/en/",
  },
  { name: "Kanta Yamaoka", roles: ["bachelor"], category: "internship", url: "https://kanta-yamaoka.earth" },
  { name: "Haruki Suzawa", roles: ["bachelor", "master"], category: "internship", url: "https://github.com/harukisuzawa" },
  { name: "Haruka Sakagami", roles: ["master"], category: "internship" },
  { name: "Seiya Tanaka", roles: ["master"], category: "internship" },
  { name: "Riku Higashimura", roles: ["master"], category: "internship", url: "https://liku.jp/" },
  { name: "Dai Shimizu", roles: ["bachelor"], category: "internship", url: "https://nulla1202.github.io/neuroisallineed/" },
  { name: "Tokio Uchida", roles: ["master"], category: "internship" },
  { name: "Ryugo Morita", roles: ["master"], category: "internship", url: "https://ryugo417.github.io/" },
]

const INITIAL_DISPLAY_COUNT = 3
const LOAD_MORE_COUNT = 3

const content = {
  ja: {
    title: "Supervision",
    tabs: {
      thesis: "Thesis",
      internship: "Internship",
    },
    showMore: "もっと見る",
    showLess: "閉じる",
    roleLabels: {
      master: "修士",
      bachelor: "学士",
      both: "学士・修士",
    },
    countLabels: {
      master: "修士課程",
      bachelor: "学士課程",
    },
    university: "大学",
    thesis: "論文タイトル",
    date: "年月",
    countSummary: (label: string, count: number) => `${label}：${count} 名`,
  },
  en: {
    title: "Supervision",
    tabs: {
      thesis: "Thesis",
      internship: "Internship",
    },
    showMore: "Show More",
    showLess: "Show Less",
    roleLabels: {
      master: "Master",
      bachelor: "Bachelor",
      both: "Bachelor & Master",
    },
    countLabels: {
      master: "Master Student",
      bachelor: "Bachelor Student",
    },
    university: "University",
    thesis: "Thesis Title",
    date: "Date",
    countSummary: (label: string, count: number) => `${label}: ${count}`,
  },
}

function formatRoleLabel(roles: SuperviseeRole[], texts: (typeof content)["en"]) {
  if (roles.includes("bachelor") && roles.includes("master")) {
    return texts.roleLabels.both
  }
  return texts.roleLabels[roles[0]]
}

export function SupervisionSection() {
  const { language } = useLanguage()
  const texts = content[language]
  const [activeCategory, setActiveCategory] = useState<SupervisionCategory>("thesis")
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT)

  const categorySupervisees = useMemo(
    () => supervisees.filter((supervisee) => supervisee.category === activeCategory),
    [activeCategory],
  )

  const sortedSupervisees = useMemo(
    () =>
      [...categorySupervisees].sort((a, b) => {
        if (a.date && b.date) {
          return b.date.localeCompare(a.date)
        }
        if (a.date) return -1
        if (b.date) return 1
        return 0
      }),
    [categorySupervisees],
  )

  const displayedSupervisees = sortedSupervisees.slice(0, displayCount)
  const hasMore = displayCount < sortedSupervisees.length
  const canShowLess = displayCount > INITIAL_DISPLAY_COUNT

  useEffect(() => {
    setDisplayCount(INITIAL_DISPLAY_COUNT)
  }, [language, activeCategory])

  const masterCount = categorySupervisees.filter((s) => s.roles.includes("master")).length
  const bachelorCount = categorySupervisees.filter((s) => s.roles.includes("bachelor")).length

  const handleLoadMore = () => {
    setDisplayCount((prev) => Math.min(prev + LOAD_MORE_COUNT, sortedSupervisees.length))
  }

  const handleShowLess = () => {
    setDisplayCount((prev) => Math.max(prev - LOAD_MORE_COUNT, INITIAL_DISPLAY_COUNT))
  }

  return (
    <section className="bg-muted/30 px-4 py-20" id="supervision">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="text-balance text-center font-serif text-4xl font-bold tracking-tight md:text-5xl">
            {texts.title}
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {(["thesis", "internship"] as const).map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
              >
                {texts.tabs[category]}
              </Button>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-base">
            {texts.countSummary(texts.countLabels.master, masterCount)},{" "}
            {texts.countSummary(texts.countLabels.bachelor, bachelorCount)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayedSupervisees.map((supervisee) => (
            <Card
              key={`${supervisee.name}-${supervisee.roles.join("-")}-${supervisee.date ?? activeCategory}`}
              className="aspect-square gap-0 py-0 transition-shadow hover:shadow-md"
            >
              {activeCategory === "internship" ? (
                <CardContent className="flex h-full flex-col items-center justify-center p-4 text-center md:p-5">
                  <h3 className="mb-4 text-base font-semibold leading-snug md:text-lg">
                    {supervisee.url ? (
                      <a
                        href={supervisee.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:underline"
                      >
                        {supervisee.name}
                      </a>
                    ) : (
                      <span className="text-foreground">{supervisee.name}</span>
                    )}
                  </h3>
                  <Badge variant="secondary" className="text-xs">
                    {formatRoleLabel(supervisee.roles, texts)}
                  </Badge>
                </CardContent>
              ) : (
                <CardContent className="flex h-full flex-col p-4 md:p-5">
                  <div className="mb-3 flex items-start justify-between gap-2">
                    <h3 className="line-clamp-2 text-base font-semibold leading-snug text-foreground">
                      {supervisee.name}
                    </h3>
                    <Badge variant="secondary" className="shrink-0 text-xs">
                      {formatRoleLabel(supervisee.roles, texts)}
                    </Badge>
                  </div>

                  <dl className="flex min-h-0 flex-1 flex-col gap-2.5 text-xs md:text-sm">
                    {supervisee.date && (
                      <div>
                        <dt className="font-medium text-muted-foreground">{texts.date}</dt>
                        <dd className="mt-0.5 font-medium text-secondary">
                          {formatSupervisionDate(supervisee.date, language)}
                        </dd>
                      </div>
                    )}
                    {supervisee.university && (
                      <div>
                        <dt className="font-medium text-muted-foreground">{texts.university}</dt>
                        <dd className="mt-0.5 line-clamp-2 text-foreground">
                          {supervisee.url ? (
                            <a
                              href={supervisee.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-secondary hover:underline"
                            >
                              {supervisee.university}
                            </a>
                          ) : (
                            supervisee.university
                          )}
                        </dd>
                      </div>
                    )}
                    {supervisee.thesisTitle && (
                      <div className="min-h-0 flex-1">
                        <dt className="font-medium text-muted-foreground">{texts.thesis}</dt>
                        <dd className="mt-0.5 line-clamp-4 leading-relaxed text-foreground">
                          {supervisee.thesisTitle}
                        </dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {(hasMore || canShowLess) && (
          <div className="mt-8 flex justify-center gap-2">
            {hasMore && (
              <Button variant="outline" size="lg" onClick={handleLoadMore} className="gap-2">
                {texts.showMore}
              </Button>
            )}
            {canShowLess && (
              <Button variant="outline" size="lg" onClick={handleShowLess} className="gap-2">
                {texts.showLess}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
