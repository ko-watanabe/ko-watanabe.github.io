'use client'

import { Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

const content = {
  ja: {
    title: "Contact",
    description: "研究に関するご質問や共同研究のご提案がございましたら、お気軽にご連絡ください。",
  },
  en: {
    title: "Contact",
    description: "Please feel free to contact me if you have any questions about research or collaboration proposals.",
  },
}

export function ContactSection() {
  const { language } = useLanguage()
  const texts = content[language]

  return (
    <section className="px-4 py-20" id="contact">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="mb-6 text-balance font-serif text-4xl font-bold tracking-tight md:text-5xl">{texts.title}</h2>

        <p className="mb-12 text-pretty text-lg text-muted-foreground">
          {texts.description}
        </p>

        <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium text-foreground">Kaiserslautern, Germany</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary text-secondary-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <div className="text-left">
              <p className="text-sm text-muted-foreground">Email</p>
              <a href="mailto:ko.watanabe@dfki.de" className="font-medium text-secondary hover:underline">
                ko.watanabe@dfki.de
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="mt-20 border-t border-border pt-8 text-center">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Ko Watanabe. All rights reserved.</p>
      </footer>
    </section>
  )
}
