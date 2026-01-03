'use client'

import { useState, useMemo } from "react"
import { Briefcase, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

const educationJa = [
  {
    degree: "博士（工学） - 情報学",
    institution: "RPTU Kaiserslautern-Landau",
    country: "Germany",
    year: "2024年修了（2021-2024）",
    url: "https://rptu.de/",
  },
  {
    degree: "修士（工学） - 情報学",
    institution: "奈良先端科学技術大学院大学",
    country: "Japan",
    year: "2019年修了（2017-2019）",
    url: "https://www.naist.jp/en/",
  },
  {
    degree: "学士（工学） - 機械工学",
    institution: "東京農工大学",
    country: "Japan",
    year: "2017年修了（2013-2017）",
    url: "https://www.tuat.ac.jp/en/",
  },
  {
    degree: "中学校・高等学校",
    institution: "北京BISS国際学校",
    country: "China",
    year: "2012年卒業（2010-2012）",
  },
  {
    degree: "中学校・高等学校",
    institution: "成蹊中学校・高等学校",
    country: "Japan",
    year: "2009年転校（2006-2009）",
    url: "https://www.seikei.ac.jp/",
  },
  {
    degree: "中学校",
    institution: "American School of Bangkok",
    country: "Thailand",
    year: "2005年転校（2002-2005）",
    url: "https://www.asb.ac.th/",
  },
]

const educationEn = [
  {
    degree: "Ph.D. in Computer Science",
    institution: "RPTU Kaiserslautern-Landau",
    country: "Germany",
    year: "Graduated in 2024 (2021-2024)",
    url: "https://rptu.de/",
  },
  {
    degree: "M.S. in Computer Science",
    institution: "Nara Institute of Science and Technology",
    country: "Japan",
    year: "Graduated in 2019 (2017-2019)",
    url: "https://www.naist.jp/en/",
  },
  {
    degree: "B.S. in Mechanical Engineering",
    institution: "Tokyo University of Agriculture and Technology",
    country: "Japan",
    year: "Graduated in 2017 (2013-2017)",
    url: "https://www.tuat.ac.jp/en/",
  },
  {
    degree: "High School",
    institution: "BISS International School Beijing",
    country: "China",
    year: "Graduated in 2012 (2010-2012)",
    url: "http://www.biss.com.cn/",
  },
  {
    degree: "Junior and Senior High School",
    institution: "Seikei Junior and Senior High School",
    country: "Japan",
    year: "Transferred in 2009 (2006-2009)",
    url: "https://www.seikei.ac.jp/",
  },
  {
    degree: "Middle School",
    institution: "American School of Bangkok",
    country: "Thailand",
    year: "Transferred in 2005 (2002-2005)",
    url: "https://www.asb.ac.th/",
  },
]

const workExperienceJa = [
  {
    title: "ポスドク研究員（シニア・リサーチャー）",
    company: "DFKI GmbH",
    period: "2024年7月 - 現在",
    type: "フルタイム",
    url: "https://www.dfki.de/web",
  },
  {
    title: "技術顧問",
    company: "株式会社Mesh",
    period: "2024年12月 - 2025年8月",
    type: "複業",
    url: "https://mesh-corp.com/",
  },
  {
    title: "技術顧問",
    company: "Affectify",
    period: "2024年3月 - 2025年6月",
    type: "複業",
    url: "https://affectify.jp/",
  },
  {
    title: "ソフトウェアエンジニア（業務委託）",
    company: "Bcode",
    period: "2024年9月 - 2024年12月",
    type: "複業",
    url: "https://bcode.co.jp/",
  },
  {
    title: "ソフトウェアエンジニア（業務委託）",
    company: "イチロク",
    period: "2024年2月 - 2024年12月",
    type: "複業",
    url: "https://16match.co.jp/",
  },
  {
    title: "研究員（博士課程）",
    company: "RPTU Kaiserslautern & DFKI GmbH",
    period: "2021年3月 - 2024年6月",
    type: "フルタイム",
    url: "https://www.dfki.de/web",
  },
  {
    title: "ソフトウェアエンジニア（業務委託）",
    company: "一般社団法人 CRD協会",
    period: "2023年6月 - 2024年6月",
    type: "複業",
    url: "https://www.crd-office.net/CRD/",
  },
  {
    title: "ソフトウェアエンジニア（Ruby on Rails・Flutter）",
    company: "ECサービス",
    period: "2021年1月 - 2023年5月",
    type: "複業",
  },
  {
    title: "ソフトウェアエンジニア（Ruby on Rails・Next.js）",
    company: "株式会社Allesgood",
    period: "2022年7月 - 2023年2月",
    type: "複業",
    url: "https://www.allesgood.jp/",
  },
  {
    title: "バックエンドエンジニア（Golang）",
    company: "株式会社villio",
    period: "2022年4月 - 2022年5月",
    type: "複業",
    url: "https://villio.jp/",
  },
  {
    title: "機械学習エンジニア（Python）",
    company: "株式会社Orario",
    period: "2020年12月 - 2022年5月",
    type: "複業",
    url: "https://kickoff-delivery.com/",
  },
  {
    title: "機械学習エンジニア（Python・AWS）",
    company: "株式会社PanHouse",
    period: "2021年8月 - 2022年2月",
    type: "複業",
    url: "https://panhouse.jp/",
  },
  {
    title: "バックエンドエンジニア（PHP・Laravel・MySQL）",
    company: "アパレル",
    period: "2021年4月 - 2021年6月",
    type: "複業",
  },
  {
    title: "モバイルエンジニア（Flutter・Firebase）",
    company: "SaaS",
    period: "2021年4月 - 2021年6月",
    type: "複業",
  },
  {
    title: "iOSアプリ開発 講師",
    company: "TechPlayAcademy",
    period: "2020年11月 - 2020年12月",
    type: "複業",
    url: "https://academy.techplay.jp",
  },
  {
    title: "ソフトウェアエンジニア",
    company: "株式会社ディー・エヌ・エー（Pococha）",
    period: "2019年4月 - 2021年2月",
    type: "フルタイム",
    url: "https://www.pococha.com/ja",
  },
  {
    title: "ソフトウェアエンジニア（Java）",
    company: "楽天グループ株式会社（Rakuten Books）",
    period: "2018年1月 - 2018年3月",
    type: "インターンシップ",
    url: "https://books.rakuten.co.jp/",
  },
  {
    title: "研究インターンシップ",
    company: "DFKI GmbH",
    period: "2018年4月 - 2018年10月",
    type: "インターンシップ",
    url: "https://www.dfki.de/web",
  },
  {
    title: "広報課",
    company: "文部科学省",
    period: "2017年6月 - 2017年7月",
    type: "インターンシップ",
    url: "https://www.mext.go.jp/",
  },
]

const workExperienceEn = [
  {
    title: "Postdoctoral Researcher",
    company: "DFKI GmbH",
    period: "July 2024 - Present",
    type: "Full-time",
    url: "https://www.dfki.de/web",
  },
  {
    title: "Technical Advisor",
    company: "Mesh Inc",
    period: "Dec 2024 - Aug 2025",
    type: "Side project",
    url: "https://mesh-corp.com/",
  },
  {
    title: "Technical Advisor",
    company: "Affectify",
    period: "Mar 2024 - Jun 2025",
    type: "Side project",
    url: "https://affectify.jp/",
  },
  {
    title: "Software Engineer (ML Engineer)",
    company: "Bcode",
    period: "Sep 2024 - Dec 2024",
    type: "Side project",
    url: "https://bcode.co.jp/",
  },
  {
    title: "Software Engineer (Backend Engineer)",
    company: "Ichiroku",
    period: "Feb 2024 - Dec 2024",
    type: "Side project",
    url: "https://16match.co.jp/",
  },
  {
    title: "PhD Researcher",
    company: "RPTU Kaiserslautern & DFKI GmbH",
    period: "March 2021 - June 2024",
    type: "Full-time",
    url: "https://www.dfki.de/web",
  },
  {
    title: "Software Engineer (Full-stack Engineer)",
    company: "CRD Association",
    period: "Jun 2023 - Jun 2024",
    type: "Side project",
    url: "https://www.crd-office.net/CRD/",
  },
  {
    title: "Software Engineer (Ruby on Rails / Flutter)",
    company: "E-commerce Service",
    period: "Jan 2021 - May 2023",
    type: "Side project",
  },
  {
    title: "Scrum Master",
    company: "Allesgood",
    period: "Jul 2022 - Feb 2023",
    type: "Side project",
    url: "https://www.allesgood.jp/",
  },
  {
    title: "Backend Engineer (Golang)",
    company: "Villio (Talent Amp Coaching)",
    period: "Apr 2022 - May 2022",
    type: "Side project",
    url: "https://villio.jp/",
  },
  {
    title: "Machine Learning Engineer (Python)",
    company: "Orario (Kick-Off Delivery)",
    period: "Dec 2020 - May 2022",
    type: "Side project",
    url: "https://kickoff-delivery.com/",
  },
  {
    title: "Machine Learning Engineer (Python / AWS)",
    company: "PanHouse",
    period: "Aug 2021 - Feb 2022",
    type: "Side project",
    url: "https://panhouse.jp/",
  },
  {
    title: "Backend Engineer (PHP / Laravel / MySQL)",
    company: "Apparel (Contract)",
    period: "Apr 2021 - Jun 2021",
    type: "Side project",
  },
  {
    title: "Mobile Engineer (Flutter / Firebase)",
    company: "SaaS (Contract)",
    period: "Apr 2021 - Jun 2021",
    type: "Side project",
  },
  {
    title: "Development Instructor (Swift / iOS)",
    company: "TechPlayAcademy",
    period: "Nov 2020 - Dec 2020",
    type: "Side project",
    url: "https://academy.techplay.jp",
  },
  {
    title: "Software Engineer (Backend Engineer)",
    company: "DeNA (Pococha)",
    period: "April 2019 - February 2021",
    type: "Full-time",
    url: "https://www.pococha.com/ja",
  },
  {
    title: "Software Engineer (Java)",
    company: "Rakuten (Rakuten Books)",
    period: "Jan 2018 - Mar 2018",
    type: "Internship",
    url: "https://books.rakuten.co.jp/",
  },
  {
    title: "Research Internship",
    company: "DFKI GmbH",
    period: "April 2018 - October 2018",
    type: "Internship",
    url: "https://www.dfki.de/web",
  },
  {
    title: "Public Relations Division",
    company: "MEXT (Japan)",
    period: "Jun 2017 - Jul 2017",
    type: "Internship",
    url: "https://www.mext.go.jp/",
  },
]

const content = {
  ja: {
    title: "Education & Experience",
    educationTitle: "学歴",
    workTitle: "職歴",
    showMore: "もっと見る",
    showLess: "閉じる",
  },
  en: {
    title: "Education & Experience",
    educationTitle: "Education",
    workTitle: "Work Experience",
    showMore: "Show More",
    showLess: "Show Less",
  },
}

// 国名から国旗の絵文字を取得
function getCountryFlag(country: string): string {
  const flagMap: { [key: string]: string } = {
    'Germany': '🇩🇪',
    'Japan': '🇯🇵',
    'China': '🇨🇳',
    'Thailand': '🇹🇭',
  }
  return flagMap[country] || ''
}

// 国名を言語に応じて表示用に変換
function getCountryDisplayName(country: string, language: 'ja' | 'en'): string {
  if (country === 'Japan') {
    return language === 'ja' ? '日本' : 'Japan'
  }
  if (country === 'Germany') {
    return language === 'ja' ? 'ドイツ' : 'Germany'
  }
  if (country === 'China') {
    return language === 'ja' ? '中国' : 'China'
  }
  if (country === 'Thailand') {
    return language === 'ja' ? 'タイ' : 'Thailand'
  }
  return country
}

// 日本語の期間文字列から終了日を抽出してDateオブジェクトに変換
function parseEndDateJa(period: string): Date {
  // "2024年7月 - 現在" のような形式
  if (period.includes('現在') || period.includes('Present')) {
    return new Date(9999, 11, 31) // 未来の日付として扱う
  }

  // "2024年12月 - 2025年8月" のような形式から終了日を抽出
  const match = period.match(/- (.+)$/)
  if (match) {
    const endDateStr = match[1].trim()
    // "2025年8月" のような形式をパース
    const dateMatch = endDateStr.match(/(\d{4})年(\d{1,2})月/)
    if (dateMatch) {
      const year = parseInt(dateMatch[1])
      const month = parseInt(dateMatch[2]) - 1 // 月は0ベース
      return new Date(year, month, 1)
    }
  }

  return new Date(0) // パースできない場合は古い日付
}

// 英語の期間文字列から終了日を抽出してDateオブジェクトに変換
function parseEndDateEn(period: string): Date {
  // "July 2024 - Present" のような形式
  if (period.includes('Present')) {
    return new Date(9999, 11, 31) // 未来の日付として扱う
  }

  // "Dec 2024 - Aug 2025" のような形式から終了日を抽出
  const match = period.match(/- (.+)$/)
  if (match) {
    const endDateStr = match[1].trim()
    // 月名のマッピング
    const monthMap: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
      'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
    }

    // "Aug 2025" のような形式をパース
    const dateMatch = endDateStr.match(/(\w{3}) (\d{4})/)
    if (dateMatch) {
      const monthName = dateMatch[1]
      const year = parseInt(dateMatch[2])
      const month = monthMap[monthName] ?? 0
      return new Date(year, month, 1)
    }
  }

  return new Date(0) // パースできない場合は古い日付
}

export function ExperienceSection() {
  const { language } = useLanguage()
  const texts = content[language]
  const rawWorkExperience = language === 'ja' ? workExperienceJa : workExperienceEn
  const education = language === 'ja' ? educationJa : educationEn

  // 終了日でソート（終了日が新しい順）
  const workExperience = useMemo(() => {
    return [...rawWorkExperience].sort((a, b) => {
      const endDateA = language === 'ja'
        ? parseEndDateJa(a.period)
        : parseEndDateEn(a.period)
      const endDateB = language === 'ja'
        ? parseEndDateJa(b.period)
        : parseEndDateEn(b.period)
      return endDateB.getTime() - endDateA.getTime() // 降順（新しい順）
    })
  }, [rawWorkExperience, language])

  const [visibleWorkCount, setVisibleWorkCount] = useState(3)
  const [visibleEducationCount, setVisibleEducationCount] = useState(3)

  const displayedWorkExperience = workExperience.slice(0, visibleWorkCount)
  const displayedEducation = education.slice(0, visibleEducationCount)

  const hasMoreWork = workExperience.length > visibleWorkCount
  const hasMoreEducation = education.length > visibleEducationCount
  const canShowLess = visibleWorkCount > 3
  const canShowLessEducation = visibleEducationCount > 3

  const handleShowMore = () => {
    setVisibleWorkCount(prev => Math.min(prev + 3, workExperience.length))
  }

  const handleShowLess = () => {
    setVisibleWorkCount(prev => Math.max(prev - 3, 3))
  }

  const handleShowMoreEducation = () => {
    setVisibleEducationCount(prev => Math.min(prev + 3, education.length))
  }

  const handleShowLessEducation = () => {
    setVisibleEducationCount(prev => Math.max(prev - 3, 3))
  }

  return (
    <section className="px-4 py-20" id="experience">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-16 text-balance text-center font-serif text-4xl font-bold tracking-tight md:text-5xl">
          {texts.title}
        </h2>

        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">{texts.educationTitle}</h3>
            </div>
            <div className="space-y-4">
              {displayedEducation.map((edu, index) => (
                edu.url ? (
                  <a
                    key={index}
                    href={edu.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="cursor-pointer">
                      <CardContent className="relative p-6">
                        {edu.country && (
                          <div className="absolute right-4 top-4 z-10">
                            <Badge variant="outline" className="text-xs">
                              {getCountryFlag(edu.country)} {getCountryDisplayName(edu.country, language)}
                            </Badge>
                          </div>
                        )}
                        <h4 className="mb-2 font-semibold text-foreground pr-20 underline underline-offset-4">{edu.institution}</h4>
                        <p className="text-sm text-muted-foreground">{edu.degree}</p>
                        <p className="mt-2 text-sm font-medium text-secondary">{edu.year}</p>
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Card key={index}>
                    <CardContent className="relative p-6">
                      {edu.country && (
                        <div className="absolute right-4 top-4 z-10">
                          <Badge variant="outline" className="text-xs">
                            {getCountryFlag(edu.country)} {getCountryDisplayName(edu.country, language)}
                          </Badge>
                        </div>
                      )}
                      <h4 className="mb-2 font-semibold text-foreground pr-20">{edu.institution}</h4>
                      <p className="text-sm text-muted-foreground">{edu.degree}</p>
                      <p className="mt-2 text-sm font-medium text-secondary">{edu.year}</p>
                    </CardContent>
                  </Card>
                )
              ))}
              {(hasMoreEducation || canShowLessEducation) && (
                <div className="pt-2 flex gap-2">
                  {hasMoreEducation && (
                    <Button
                      variant="outline"
                      onClick={handleShowMoreEducation}
                      className="flex-1"
                    >
                      {texts.showMore}
                    </Button>
                  )}
                  {canShowLessEducation && (
                    <Button
                      variant="outline"
                      onClick={handleShowLessEducation}
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
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">{texts.workTitle}</h3>
            </div>
            <div className="space-y-4">
              {displayedWorkExperience.map((work, index) => (
                work.url ? (
                  <a
                    key={index}
                    href={work.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Card className="cursor-pointer">
                      <CardContent className="p-6">
                        <div className="mb-2 flex items-start justify-between gap-2">
                          <h4 className="font-semibold text-foreground underline underline-offset-4">
                            {work.company}
                          </h4>
                          <Badge variant="secondary" className="shrink-0">{work.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{work.title}</p>
                        <p className="mt-2 text-sm font-medium text-secondary">{work.period}</p>
                      </CardContent>
                    </Card>
                  </a>
                ) : (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="mb-2 flex items-start justify-between gap-2">
                        <h4 className="font-semibold text-foreground">{work.company}</h4>
                        <Badge variant="secondary" className="shrink-0">{work.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{work.title}</p>
                      <p className="mt-2 text-sm font-medium text-secondary">{work.period}</p>
                    </CardContent>
                  </Card>
                )
              ))}
              {(hasMoreWork || canShowLess) && (
                <div className="pt-2 flex gap-2">
                  {hasMoreWork && (
                    <Button
                      variant="outline"
                      onClick={handleShowMore}
                      className="flex-1"
                    >
                      {texts.showMore}
                    </Button>
                  )}
                  {canShowLess && (
                    <Button
                      variant="outline"
                      onClick={handleShowLess}
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
      </div>
    </section>
  )
}

