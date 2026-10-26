export type SlideItem = {
  title: string
  event: string
  /** Event / display date (YYYY-MM-DD). Upcoming until this day; Past afterward. */
  date: string
  location?: string
  url?: string
}

export const slidesJa: SlideItem[] = [
  {
    title: "高麗大学 招待講演",
    event: "高麗大学 招待講演",
    date: "2026-10-28",
    location: "高麗大学",
    url: "/slides/2026.10.28_korea_uni_invited_talk/index.html",
  },
  {
    title: "公立はこだて未来大学 招待講義",
    event: "公立はこだて未来大学 招待講義",
    date: "2026-12-04",
    location: "公立はこだて未来大学",
    // url: "/slides/2026.12.04_future_hakodate_university_invited_lecture/",
  },
]

export const slidesEn: SlideItem[] = [
  {
    title: "Korea University Invited Lecture",
    event: "Korea University Invited Lecture",
    date: "2026-10-28",
    location: "Korea University",
    url: "/slides/2026.10.28_korea_uni_invited_talk/index.html",
  },
  {
    title: "Future University Hakodate Invited Lecture",
    event: "Future University Hakodate Invited Lecture",
    date: "2026-12-04",
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

/** Event date is before today (local calendar). */
export function isSlidePast(slide: SlideItem, now: Date = new Date()): boolean {
  const eventDate = parseIsoDate(slide.date)
  if (!eventDate) return false
  return eventDate < startOfLocalDay(now)
}

/**
 * Splits all slides into upcoming (today or later) and past.
 * Upcoming: nearest date first. Past: most recent first.
 */
export function partitionSlides(
  slides: SlideItem[],
  now: Date = new Date(),
): { upcoming: SlideItem[]; past: SlideItem[] } {
  const upcoming = slides
    .filter((slide) => !isSlidePast(slide, now))
    .sort((a, b) => a.date.localeCompare(b.date))
  const past = slides
    .filter((slide) => isSlidePast(slide, now))
    .sort((a, b) => b.date.localeCompare(a.date))
  return { upcoming, past }
}
