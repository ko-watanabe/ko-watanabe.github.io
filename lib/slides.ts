export type SlideItem = {
  title: string
  event: string
  /** Display date shown in the UI (free-form). */
  date: string
  /** ISO calendar date (YYYY-MM-DD). Visible from this day (local midnight) onward. */
  publishAt: string
  location?: string
  url?: string
}

export const slidesJa: SlideItem[] = [
  {
    title: "高麗大学 招待講演",
    event: "高麗大学 招待講演",
    date: "2026-10-28",
    publishAt: "2026-10-28",
    location: "高麗大学",
    url: "/slides/2026.10.28_korea_uni_invited_talk/index.html",
  },
  {
    title: "公立はこだて未来大学 招待講義",
    event: "公立はこだて未来大学 招待講義",
    date: "2026-12-04",
    publishAt: "2026-12-04",
    location: "公立はこだて未来大学",
    // url: "/slides/2026.12.04_future_hakodate_university_invited_lecture/",
  },
]

export const slidesEn: SlideItem[] = [
  {
    title: "Korea University Invited Lecture",
    event: "Korea University Invited Lecture",
    date: "2026-10-28",
    publishAt: "2026-10-28",
    location: "Korea University",
    url: "/slides/2026.10.28_korea_uni_invited_talk/index.html",
  },
  {
    title: "Future University Hakodate Invited Lecture",
    event: "Future University Hakodate Invited Lecture",
    date: "2026-12-04",
    publishAt: "2026-12-04",
    location: "Future University Hakodate",
    // url: "/slides/2026.12.04_future_hakodate_university_invited_lecture/",
  },
]

function parseIsoDate(iso: string): Date | null {
  const [year, month, day] = iso.split("-").map(Number)
  if (!year || !month || !day) return null
  return new Date(year, month - 1, day)
}

function startOfLocalDay(now: Date): Date {
  return new Date(now.getFullYear(), now.getMonth(), now.getDate())
}

/** True when local time is on or after publishAt (start of that calendar day). */
export function isSlidePublished(slide: SlideItem, now: Date = new Date()): boolean {
  const publishStart = parseIsoDate(slide.publishAt)
  if (!publishStart) return false
  return now >= publishStart
}

/** Event date is before today (local calendar). */
export function isSlidePast(slide: SlideItem, now: Date = new Date()): boolean {
  const eventDate = parseIsoDate(slide.date)
  if (!eventDate) return false
  return eventDate < startOfLocalDay(now)
}

/** Only loopback hosts preview future talks; public hosts keep their publication dates. */
export function isLocalSlidePreview(hostname: string): boolean {
  return hostname === "localhost" || hostname.endsWith(".localhost") ||
    hostname === "127.0.0.1" || hostname === "[::1]" || hostname === "::1"
}

export function getPublishedSlides(slides: SlideItem[], now: Date = new Date(), preview = false): SlideItem[] {
  return slides.filter((slide) => preview || isSlidePublished(slide, now))
}

/**
 * Splits published slides into upcoming (today or later) and past.
 * Upcoming: nearest date first. Past: most recent first.
 */
export function partitionPublishedSlides(
  slides: SlideItem[],
  now: Date = new Date(),
  preview = false,
): { upcoming: SlideItem[]; past: SlideItem[] } {
  const published = getPublishedSlides(slides, now, preview)
  const upcoming = published
    .filter((slide) => !isSlidePast(slide, now))
    .sort((a, b) => a.date.localeCompare(b.date))
  const past = published
    .filter((slide) => isSlidePast(slide, now))
    .sort((a, b) => b.date.localeCompare(a.date))
  return { upcoming, past }
}
