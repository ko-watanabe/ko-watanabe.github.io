import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { PublicationsListSection } from "@/components/publications-list-section"
import { NewsSection } from "@/components/news-section"
import { ExperienceSection } from "@/components/experience-section"
import { PublicationsSection } from "@/components/publications-section"
import { ContactSection } from "@/components/contact-section"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutSection />
      <PublicationsListSection />
      <NewsSection />
      <ExperienceSection />
      <PublicationsSection />
      <ContactSection />
    </main>
  )
}
