'use client'

import { useEffect, useState } from "react"
import { partitionSlides, type SlideItem } from "@/lib/slides"

/**
 * Splits slides into Upcoming / Past using the visitor's local calendar day.
 * Until ready, lists stay empty so nothing flashes early on a static export.
 */
export function usePublishedSlides(slides: SlideItem[]) {
  const [upcoming, setUpcoming] = useState<SlideItem[]>([])
  const [past, setPast] = useState<SlideItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const partitioned = partitionSlides(slides, new Date())
    setUpcoming(partitioned.upcoming)
    setPast(partitioned.past)
    setReady(true)
  }, [slides])

  return { upcoming, past, ready }
}
