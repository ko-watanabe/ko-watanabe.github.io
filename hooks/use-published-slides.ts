'use client'

import { useEffect, useState } from "react"
import {
  isLocalSlidePreview,
  partitionPublishedSlides,
  type SlideItem,
} from "@/lib/slides"

/**
 * Filters slides by publishAt using the visitor's local clock after mount.
 * Localhost previews include future talks so drafts can be rehearsed.
 * Until ready, treat as unpublished so nothing flashes early on a static export.
 */
export function usePublishedSlides(slides: SlideItem[]) {
  const [upcoming, setUpcoming] = useState<SlideItem[]>([])
  const [past, setPast] = useState<SlideItem[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const partitioned = partitionPublishedSlides(
      slides,
      new Date(),
      isLocalSlidePreview(window.location.hostname),
    )
    setUpcoming(partitioned.upcoming)
    setPast(partitioned.past)
    setReady(true)
  }, [slides])

  return { upcoming, past, ready }
}
