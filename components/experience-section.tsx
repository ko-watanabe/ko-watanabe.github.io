'use client'

import { Briefcase, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

const educationJa = [
  {
    degree: "博士（工学） - 情報学",
    institution: "RPTU Kaiserslautern-Landau, Germany",
    year: "2024",
  },
  {
    degree: "修士（工学） - 情報学",
    institution: "奈良先端科学技術大学院大学, Japan",
    year: "2019",
  },
  {
    degree: "学士（工学） - 機械工学",
    institution: "東京農工大学, Japan",
    year: "2017",
  },
]

const educationEn = [
  {
    degree: "Ph.D. in Computer Science",
    institution: "RPTU Kaiserslautern-Landau, Germany",
    year: "2024",
  },
  {
    degree: "M.S. in Computer Science",
    institution: "Nara Institute of Science and Technology, Japan",
    year: "2019",
  },
  {
    degree: "B.S. in Mechanical Engineering",
    institution: "Tokyo University of Agriculture and Technology, Japan",
    year: "2017",
  },
]

const workExperienceJa = [
  {
    title: "Postdoctoral Researcher",
    company: "DFKI GmbH, Germany",
    period: "2024年7月 - 現在",
    type: "フルタイム",
  },
  {
    title: "PhD Researcher",
    company: "Psyberlab (RPTU Kaiserslautern) & SDS Group (DFKI GmbH), Germany",
    period: "2021年3月 - 2024年6月",
    type: "フルタイム",
  },
  {
    title: "Software Engineer",
    company: "Pocochain DeNA co ltd, Japan",
    period: "2019年4月 - 2021年2月",
    type: "フルタイム",
  },
  {
    title: "Software Engineer",
    company: "Affectify Inc",
    period: "2024年3月 - 現在",
    type: "インターンシップ",
  },
  {
    title: "Scrum Master",
    company: "Allesgood Inc",
    period: "2022年7月 - 2023年2月",
    type: "インターンシップ",
  },
  {
    title: "Research Internship",
    company: "DFKI GmbH",
    period: "2018年4月 - 2018年10月",
    type: "インターンシップ",
  },
]

const workExperienceEn = [
  {
    title: "Postdoctoral Researcher",
    company: "DFKI GmbH, Germany",
    period: "July 2024 - Present",
    type: "Full-time",
  },
  {
    title: "PhD Researcher",
    company: "Psyberlab (RPTU Kaiserslautern) & SDS Group (DFKI GmbH), Germany",
    period: "March 2021 - June 2024",
    type: "Full-time",
  },
  {
    title: "Software Engineer",
    company: "Pocochain DeNA co ltd, Japan",
    period: "April 2019 - February 2021",
    type: "Full-time",
  },
  {
    title: "Software Engineer",
    company: "Affectify Inc",
    period: "March 2024 - Present",
    type: "Internship",
  },
  {
    title: "Scrum Master",
    company: "Allesgood Inc",
    period: "July 2022 - February 2023",
    type: "Internship",
  },
  {
    title: "Research Internship",
    company: "DFKI GmbH",
    period: "April 2018 - October 2018",
    type: "Internship",
  },
]

const content = {
  ja: {
    title: "Education & Experience",
    educationTitle: "学歴",
    workTitle: "職歴",
  },
  en: {
    title: "Education & Experience",
    educationTitle: "Education",
    workTitle: "Work Experience",
  },
}

export function ExperienceSection() {
  const { language } = useLanguage()
  const texts = content[language]
  const workExperience = language === 'ja' ? workExperienceJa : workExperienceEn
  const education = language === 'ja' ? educationJa : educationEn

  return (
    <section className="px-4 py-20" id="experience">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-16 text-balance text-center font-serif text-4xl font-bold tracking-tight md:text-5xl">
          {texts.title}
        </h2>

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold">{texts.educationTitle}</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h4 className="mb-2 font-semibold text-foreground">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="mt-2 text-sm font-medium text-secondary">{edu.year}</p>
                  </CardContent>
                </Card>
              ))}
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
              {workExperience.map((work, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <h4 className="font-semibold text-foreground">{work.title}</h4>
                      <span className="shrink-0 text-xs text-muted-foreground">{work.type}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{work.company}</p>
                    <p className="mt-2 text-sm font-medium text-secondary">{work.period}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
