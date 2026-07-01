'use client'

import { useEffect, useMemo, useState } from 'react'
import { CalendarRange, RotateCcw } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

type NewsItem = {
  date: string
  title: string
  location?: string
  links?: Array<{ text: string; url?: string }>
}

const ENGLISH_MONTHS: Record<string, number> = {
  january: 1,
  february: 2,
  march: 3,
  april: 4,
  may: 5,
  june: 6,
  july: 7,
  august: 8,
  september: 9,
  october: 10,
  november: 11,
  december: 12,
}

function parseNewsDate(date: string): { year: number; month: number } | null {
  const jaMatch = date.match(/(\d{4})年(\d{1,2})月/)
  if (jaMatch) {
    return { year: Number(jaMatch[1]), month: Number(jaMatch[2]) }
  }

  const enMatch = date.match(/^([A-Za-z]+)\s+(?:\d{1,2},\s+)?(\d{4})$/)
  if (enMatch) {
    const month = ENGLISH_MONTHS[enMatch[1].toLowerCase()]
    if (month) {
      return { year: Number(enMatch[2]), month }
    }
  }

  return null
}

function getAvailableYears(items: NewsItem[]) {
  const years = new Set<number>()
  for (const item of items) {
    const parsed = parseNewsDate(item.date)
    if (parsed) {
      years.add(parsed.year)
    }
  }
  return Array.from(years).sort((a, b) => b - a)
}

function getAvailableMonths(items: NewsItem[], year: string) {
  const months = new Set<number>()
  for (const item of items) {
    const parsed = parseNewsDate(item.date)
    if (parsed && (!year || parsed.year === Number(year))) {
      months.add(parsed.month)
    }
  }
  return Array.from(months).sort((a, b) => b - a)
}

function filterNewsItems(items: NewsItem[], year: string, month: string) {
  if (!year && !month) {
    return items
  }

  return items.filter((item) => {
    const parsed = parseNewsDate(item.date)
    if (!parsed) {
      return false
    }
    if (year && parsed.year !== Number(year)) {
      return false
    }
    if (month && parsed.month !== Number(month)) {
      return false
    }
    return true
  })
}

const newsItemsJa = [
  {
    date: "2026年6月",
    title: "大阪大学と頭蓋脳波からの視聴映像再構成に関する研究の共同研究開始",
    location: "Osaka, Japan 🇯🇵",
    links: [
      {
        text: "頭蓋脳波からの視聴映像再構成に関する共同研究",
        url: "https://www.med.osaka-u.ac.jp/pub/nsurg/wp-content/uploads/2026/06/99cdc02aded27318bf9d0c0bcc651cb2.pdf",
      },
    ],
  },
  {
    date: "2026年6月",
    title: "WCCIにて論文を発表",
    location: "Maastricht, Netherlands 🇳🇱",
    links: [
      {
        text: "LGTM: Training-Free Light-Guided Text-to-Image Diffusion Model via Initial Noise Manipulation",
        url: "https://arxiv.org/abs/2603.24086",
      },
    ],
  },
  {
    date: "2026年5月",
    title: "「第3回 GenAI Hackathon of the German Police」に参加",
    location: "Wiesbaden, Germany 🇩🇪",
  },
  {
    date: "2026年4月",
    title: "23rd IFAC World Congress に論文が採択 🎉",
    location: "Busan, Korea 🇰🇷",
    links: [
      {
        text: "SensHRPS: Sensing Comfortable Human-Robot Proxemics and Personal Space With Eye-Tracking",
        url: "https://arxiv.org/abs/2512.08518",
      },
    ],
  },
  {
    date: "2026年4月",
    title: "WCCI 2026に論文が採択 🎉",
    location: "Maastricht, Netherlands 🇳🇱",
    links: [
      {
        text: "LGTM: Training-Free Light-Guided Text-to-Image Diffusion Model via Initial Noise Manipulation",
        url: "https://arxiv.org/abs/2603.24086",
      },
    ],
  },
  {
    date: "2026年4月",
    title: "Electronicsに論文が採択 🎉",
    links: [
      {
        text: "Identifying Hurdles to Making Sleep Wearables Data Actionable for Users: A Grounded Theory Study",
        url: "https://www.mdpi.com/2079-9292/15/7/1480",
      },
    ],
  },
  {
    date: "2026年3月",
    title: "室蘭・函館でABC2026に参加",
    location: "Hokkaido, Japan 🇯🇵",
    links: [
      {
        text: "IJABC (International Journal of Affective Engineering)",
        url: "https://www.jstage.jst.go.jp/browse/ijabc",
      },
    ],
  },
  {
    date: "2026年3月",
    title: "沖縄でAugmented Humansに参加",
    location: "Okinawa, Japan 🇯🇵",
  },
  {
    date: "2026年2月",
    title: "Augmented Humans (Poster Paper)に採択 🎉",
    location: "Okinawa, Japan 🇯🇵",
    links: [
      {
        text: "Empowering Vocabulary Learning Through Teaching AI: Using LLMs as a Student to Perform Learning by Teaching in Vocabulary Acquisition",
        // url: "https://www.jstage.jst.go.jp/browse/ijabc",
      },
    ],
  },
  {
    date: "2026年1月",
    title: "IJABCのジャーナルに3件、Position Paper に1件採択 🎉",
    location: "Hokkaido, Japan 🇯🇵",
    links: [
      {
        text: "Estimating the Level of Surgical Skill During Robot-Assisted Surgery Simulation Using a Neck-Worn Wearable Camera",
        // url: "https://www.jstage.jst.go.jp/browse/ijabc",
      },
      {
        text: "SensCogAR: Cognitive Load Estimation Via Movement Data in Assembly Tasks",
        // url: "https://www.jstage.jst.go.jp/browse/ijabc",
      },
      {
        text: "SipSense: Acoustic Sensing of Beverage Type and Volume Using Dual-Microphone Wearable System",
        // url: "https://www.jstage.jst.go.jp/browse/ijabc",
      },
    ],
  },
  {
    date: "2026年1月",
    title: "Augmented Humans フルペーパーに採択 🎉",
    location: "Okinawa, Japan 🇯🇵",
    links: [
      {
        text: "FutureLetter: Augmenting Personal Writing for Future-Self Dialogue using LLMs",
        // url: "https://www.augmented-humans.org/",
      },
    ],
  },
  {
    date: "2026年1月",
    title: "IPSJインタラクション に採択 🎉",
    location: "Tokyo, Japan 🇯🇵",
    links: [
      {
        text: "IPSJインタラクション",
        url: "https://www.interaction-ipsj.org/2026/",
      },
    ],
  },
  {
    date: "2026年1月",
    title: "WACV workshop (P2P-CV) に採択 🎉",
    location: "Tucson, Arizona, USA 🇺🇸",
    links: [
      {
        text: "P2P-CV",
        url: "https://p2pcv-wacv.github.io/p2pcv.github.io/",
      },
    ],
  },
  {
    date: "2026年1月",
    title: "The Future of Education with AI - Springer Book Chapter出版 🎉",
    location: "Shonan, Japan 🇯🇵",
    links: [
      {
        text: "The Future of Education with AI",
        url: "https://link.springer.com/book/10.1007/978-981-95-1622-3",
      },
      {
        text: "Knowledge Transfer with AI",
        url: "https://link.springer.com/chapter/10.1007/978-981-95-1622-3_4",
      },
    ],
  },
  {
    date: "2025年12月",
    title: "ArXivにプレプリント論文を投稿(査読中)",
    links: [
      {
        text: "SensHRPS: Sensing Comfortable Human-Robot Proxemics",
        url: "https://arxiv.org/abs/2512.08518",
      },
      {
        text: "HandyLabel: Post-Processing to Real-Time Annotation",
        url: "https://arxiv.org/abs/2511.22337",
      },
    ],
  },
  {
    date: "2025年12月",
    title: "AHs Full Paper Review - 4 papers",
  },
  {
    date: "2025年12月",
    title: "IMWUT (November Round) Review - 1 paper",
  },
  {
    date: "2025年11月",
    title: "IUI Full-Paper Review - 4 papers",
  },
  {
    date: "2025年10月",
    title: "UbiComp-ISWC 2025で2本の論文を発表",
    location: "Espoo, Finland 🇫🇮",
    links: [
      {
        text: "From Neck to Head: Bio-Impedance Sensing",
        url: "https://arxiv.org/abs/2507.12884",
      },
      {
        text: "Push or Light: Nudging Standing",
        url: "https://arxiv.org/abs/2507.08659",
      },
    ],
  },
  {
    date: "2025年10月",
    title: "CHI Full-Paper Review - 5 papers 🇪🇸",
  },
  {
    date: "2025年9月",
    title: "IFACにてワークショップ主催",
    links: [
      {
        text: "Learning-Enabled and Human-Centric Robotics with Wearable and Sensor Systems",
        url: "https://ifac-wc-oit-45f2x.netlify.app/",
      },
    ],
  },
  {
    date: "2025年9月",
    title: "IATM conferenceで「Trustworthy AI」ワークショップを開催",
    location: "Frankfurt, Germany 🇩🇪",
    links: [
      {
        text: "Trustworthy AI Workshop",
        url: "https://www.iatm.museum/conferences/48th-conference-2025/",
      },
    ],
  },
  {
    date: "2025年9月",
    title: "DFKIで開催されたMedical AIに関するAspireワークショップに参加",
    location: "Kaiserslautern, Germany 🇩🇪",
  },
  {
    date: "2025年9月",
    title: "9月1日に息子が産まれました🎉",
  },
  {
    date: "2025年8月",
    title: "MUM 2025 program committeeに任命",
  },
  {
    date: "2025年7月",
    title: "ISWC 2025 (Note)に論文が採択",
    location: "Espoo, Finland 🇫🇮",
    links: [
      {
        text: "From Neck to Head: Bio-Impedance Sensing",
        url: "https://arxiv.org/abs/2507.12884",
      },
    ],
  },
  {
    date: "2025年6月",
    title: "UbiComp 2025 (Poster)に論文が採択",
    location: "Espoo, Finland 🇫🇮",
    links: [
      {
        text: "Push or Light: Nudging Standing",
        url: "https://arxiv.org/abs/2507.08659",
      },
    ],
  },
  {
    date: "2025年6月",
    title: "HCII 2025に参加",
    location: "Gothenburg, Sweden 🇸🇪",
    links: [
      {
        text: "SensPS: Sensing Personal Space Comfortable Distance Between Human-Human",
        url: "",
      },
      {
        text: "HITL Annotation for Image-Based Engagement Estimation",
        url: "",
      },
    ],
  },
  {
    date: "2025年6月",
    title: "IEEE Access(ジャーナル論文)に論文が採択",
    links: [
      {
        text: "EyeUnderstand: Dashboard for Gaze and Deep-Learning",
        url: "https://ieeexplore.ieee.org/document/11029003",
      },
    ],
  },
  {
    date: "2025年5月",
    title: "ETRA 2025で「Best Short Paper Award」を受賞 🏆",
  },
  {
    date: "2025年5月",
    title: "ETRA 2025に参加",
    location: "Tokyo, Japan 🇯🇵",
  },
  {
    date: "2025年4月",
    title: "CHI 2025に参加",
    location: "Yokohama, Japan 🇯🇵",
  },
  {
    date: "2025年4月",
    title: "ABC 2025で発表 🇦🇪",
    location: "Abu Dhabi, UAE 🇦🇪",
    links: [
      {
        text: "TrackThink Dashboard: Understanding Student Self-Regulated Learning in Programming Study (IJABC)",
        url: "https://www.jstage.jst.go.jp/article/ijabc/2025/1/2025_48/_article/-char/ja/",
      },
      {
        text: "ABCDE: Appearance-Based Confidence Detection by Evaluating Gaze Behavior Using Deep Learning (IJABC)",
        url: "https://www.jstage.jst.go.jp/article/ijabc/2025/1/2025_46/_article/-char/ja/",
      },
    ],
  },
  {
    date: "2025年3月",
    title: "AHs 2025に参加。1本のフルペーパーと1本のデモペーパーを発表。デモチェアとしても活動 🇦🇪",
    location: "Abu Dhabi, UAE 🇦🇪",
    links: [
      {
        text: "GenAIReading: Augmenting Human Cognition with Interactive Digital Textbooks (Full Paper)",
        url: "https://dl.acm.org/doi/full/10.1145/3745900.3746066",
      },
      {
        text: "Augmenting Online Meetings with Context-Aware Real-time Music Generation (Demo Paper)",
        url: "https://dl.acm.org/doi/10.1145/3745900.3746116",
      },
    ],
  },
  {
    date: "2025年3月",
    title: "ETRA 2025 (Short Paper)に論文が採択",
    links: [
      {
        text: "PupilSense: A Novel Application for Webcam-Based Pupil Diameter Estimation",
        url: "https://dl.acm.org/doi/10.1145/3715669.3723125",
      },
    ],
  },
  {
    date: "2025年3月",
    title: "ABC 2025 (Journal Paper)に論文が採択",
    links: [
      {
        text: "TrackThink Dashboard: Understanding Student Self-Regulated Learning in Programming Study (IJABC)",
        url: "https://www.jstage.jst.go.jp/article/ijabc/2025/1/2025_48/_article/-char/ja/",
      },
      {
        text: "ABCDE: Appearance-Based Confidence Detection by Evaluating Gaze Behavior Using Deep Learning (IJABC)",
        url: "https://www.jstage.jst.go.jp/article/ijabc/2025/1/2025_46/_article/-char/ja/",
      },
    ],
  },
  {
    date: "2025年2月",
    title: "CVPR 2025 (Full Paper)に論文が採択",
    links: [
      {
        text: "TKG-DM: Training-free Chroma Key Content Generation Diffusion Model",
        url: "https://ieeexplore.ieee.org/document/11092342/",
      },
    ],
  },
  {
    date: "2025年2月",
    title: "AHs 2025 (Full Paper and Demo)に論文が採択",
    links: [
      {
        text: "GenAIReading: Augmenting Human Cognition with Interactive Digital Textbooks (Full Paper)",
        url: "https://dl.acm.org/doi/full/10.1145/3745900.3746066",
      },
      {
        text: "Augmenting Online Meetings with Context-Aware Real-time Music Generation (Demo Paper)",
        url: "https://dl.acm.org/doi/10.1145/3745900.3746116",
      },
    ],
  },
  {
    date: "2025年2月",
    title: "ICAART 2025に参加 🇵🇹",
    location: "Portugal 🇵🇹",
    links: [
      {
        text: "Webcam-based Pupil Diameter Prediction Benefits from Upscaling",
        url: "",
      },
    ],
  },
  {
    date: "2025年1月",
    title: "IEEE Accessに論文が採択",
    links: [
      {
        text: "Img2Vocab: Explore Words Tied to Your Life with LLMs and Social Media Images",
        url: "https://ieeexplore.ieee.org/document/10851279",
      },
    ],
  },
  {
    date: "2024年12月",
    title: "IEEE Accessに論文が採択",
    links: [
      {
        text: "Estimating Self-Confidence in Video-Based Learning Using Eye-Tracking and Deep Neural Networks",
        url: "https://ieeexplore.ieee.org/document/10792912",
      },
    ],
  },
  {
    date: "2024年12月",
    title: "ICAART2025に論文が採択",
    links: [
      {
        text: "Webcam-based Pupil Diameter Prediction Benefits from Upscaling",
        url: "",
      },
    ],
  },
  {
    date: "2024年11月",
    title: "AHs2025のデモチェアに任命",
  },
  {
    date: "2024年10月",
    title: "ICMU2025のTechnical Program Committeeに任命",
  },
  {
    date: "2024年9月",
    title: "ACCV2024に論文が採択",
    links: [
      {
        text: "Feature Estimation of Global Language Processing in EEG Using Attention Maps",
        url: "https://link.springer.com/chapter/10.1007/978-981-96-0901-7_6",
      },
    ],
  },
  {
    date: "2024年9月",
    title: "IEEE Accessに論文が採択",
    links: [
      {
        text: "Estimating Unknown English Words From User Smartphone Reading Behaviors",
        url: "https://ieeexplore.ieee.org/document/10670436",
      },
    ],
  },
  {
    date: "2024年8月",
    title: "EUSIPCO 2024で発表",
    location: "Lyon, France 🇫🇷",
  },
  {
    date: "2024年7月",
    title: "IEEE Accessに論文が採択",
    links: [
      {
        text: "Gaze Generation for Avatars using GANs",
        url: "https://ieeexplore.ieee.org/document/10601689/",
      },
    ],
  },
  {
    date: "2024年7月",
    title: "UbiComp' 24に論文が採択",
    location: "Melbourne, Australia 🇦🇺",
    links: [
      {
        text: "Comparing Web Browsing Behaviors with High and Low Information Literacy",
        url: "https://dl.acm.org/doi/10.1145/3675094.3677575",
      },
      {
        text: "Concentration Estimation in Online Video Lecture Using Multimodal Sensors",
        url: "https://dl.acm.org/doi/10.1145/3675094.3677587",
      },
    ],
  },
  {
    date: "2024年5月",
    title: "EUSIPCO 2024に論文が採択",
    location: "Lyon, France 🇫🇷",
    links: [
      {
        text: "Edge-based Denoising Image Compression",
        url: "",
      },
    ],
  },
  {
    date: "2024年4月",
    title: "AHs 2024で発表",
    location: "Melbourne, Australia 🇦🇺",
    links: [
      {
        text: "Metacognition-EnGauge: Real-time Augmentation of Self-and-Group Engagement Levels",
        url: "https://dl.acm.org/doi/abs/10.1145/3652920.3653054",
      },
    ],
  },
  {
    date: "2024年4月",
    title: "コンピュータサイエンス学科に博士論文を提出",
  },
  {
    date: "2024年3月",
    title: "ETRA 2024 Short Paperに論文が採択",
    location: "Glasgow, UK 🇬🇧",
    links: [
      {
        text: "Eye Movement in a Controlled Dialogue Setting",
        url: "https://dl.acm.org/doi/abs/10.1145/3649902.3653337",
      },
    ],
  },
  {
    date: "2024年3月",
    title: "NII Shonan-Meetingに参加 🇯🇵",
    location: "Shonan, Japan 🇯🇵",
    links: [
      {
        text: "The Future of Education with AI",
        url: "https://shonan.nii.ac.jp/seminars/214/",
      },
    ],
  },
  {
    date: "2023年11月",
    title: "Deutsche Forschungsgemeinschaft (DFG)のLeCycl Workshopに参加",
    location: "Bonn, Germany 🇩🇪",
  },
  {
    date: "2023年10月",
    title: "UbiComp 2023に参加",
    location: "Cancun, Mexico 🇲🇽",
    links: [
      {
        text: "Accelerating Knowledge Transfer by Sensing and Actuating Social-Cognitive States",
        url: "https://dl.acm.org/doi/10.1145/3594739.3610769",
      },
    ],
  },
  {
    date: "2023年8月",
    title: "CHI 2023に参加",
    location: "Hamburg, Germany 🇩🇪",
    links: [
      {
        text: "Combining the Knowledge of Experienced Programmers to Extract Useful Web Resources",
        url: "https://dl.acm.org/doi/10.1145/3604571.3604575",
      },
    ],
  },
]

const newsItemsEn = [
  {
    date: "June 2026",
    title: "Started joint research with Osaka University on audiovisual reconstruction from intracranial EEG",
    location: "Osaka, Japan 🇯🇵",
    links: [
      {
        text: "Joint research on audiovisual reconstruction from intracranial EEG",
        url: "https://www.med.osaka-u.ac.jp/pub/nsurg/wp-content/uploads/2026/06/99cdc02aded27318bf9d0c0bcc651cb2.pdf",
      },
    ],
  },
  {
    date: "June 2026",
    title: "Presented work at WCCI 2026",
    location: "Maastricht, Netherlands 🇳🇱",
    links: [
      {
        text: "LGTM: Training-Free Light-Guided Text-to-Image Diffusion Model via Initial Noise Manipulation",
        url: "https://arxiv.org/abs/2603.24086",
      },
    ],
  },
  {
    date: "May 2026",
    title: "Joined: 3rd GenAI Hackathon of the German Police",
    location: "Wiesbaden, Germany 🇩🇪",
  },
  {
    date: "April 2026",
    title: "Accepted in 23rd IFAC World Congress 🎉",
    location: "Busan, Korea 🇰🇷",
    links: [
      {
        text: "SensHRPS: Sensing Comfortable Human-Robot Proxemics and Personal Space With Eye-Tracking",
        url: "https://arxiv.org/abs/2512.08518",
      },
    ],
  },
  {
    date: "April 2026",
    title: "Accepted in WCCI 2026 🎉",
    location: "Maastricht, Netherlands 🇳🇱",
    links: [
      {
        text: "LGTM: Training-Free Light-Guided Text-to-Image Diffusion Model via Initial Noise Manipulation",
        url: "https://arxiv.org/abs/2603.24086",
      },
    ],
  },
  {
    date: "April 2026",
    title: "Accepted in Electronics 🎉",
    links: [
      {
        text: "Identifying Hurdles to Making Sleep Wearables Data Actionable for Users: A Grounded Theory Study",
        url: "https://www.mdpi.com/2079-9292/15/7/1480",
      },
    ],
  },
  {
    date: "March 2026",
    title: "Attend Augmented Humans in Okinawa, Japan",
    location: "Okinawa, Japan 🇯🇵",
    links: [
      {
        text: "Augmented Humans",
        url: "https://augmented-humans.org/",
      },
    ],
  },
  {
    date: "March 2026",
    title: "Attend ABC2026 in Muroran and Hakodate",
    location: "Hokkaido, Japan 🇯🇵",
    links: [
      {
        text: "IJABC (International Journal of Affective Engineering)",
        url: "https://www.jstage.jst.go.jp/browse/ijabc",
      },
    ],
  },
  {
    date: "February 2026",
    title: "Accepted in Augmented Humans (Poster Paper) 🎉",
    location: "Okinawa, Japan 🇯🇵",
    links: [
      {
        text: "Empowering Vocabulary Learning Through Teaching AI: Using LLMs as a Student to Perform Learning by Teaching in Vocabulary Acquisition",
        // url: "https://www.jstage.jst.go.jp/browse/ijabc",
      },
    ],
  },
  {
    date: "January 2026",
    title: "Accepted 3 papers in IJABC (Journal) and 1 Position Paper 🎉",
    location: "Hokkaido, Japan 🇯🇵",
    links: [
      {
        text: "Estimating the Level of Surgical Skill During Robot-Assisted Surgery Simulation Using a Neck-Worn Wearable Camera",
        // url: "https://www.jstage.jst.go.jp/browse/ijabc",
      },
      {
        text: "SensCogAR: Cognitive Load Estimation Via Movement Data in Assembly Tasks",
        // url: "https://www.jstage.jst.go.jp/browse/ijabc",
      },
      {
        text: "SipSense: Acoustic Sensing of Beverage Type and Volume Using Dual-Microphone Wearable System",
        // url: "https://www.jstage.jst.go.jp/browse/ijabc",
      },
      {
        text: "HandyLabel: Towards Post-Processing to Real-Time Annotation Using Skeleton Based Hand Gesture Recognition",
        // url: "https://www.jstage.jst.go.jp/browse/ijabc",
      },
    ],
  },
  {
    date: "January 2026",
    title: "Accepted in Augmented Humans (Full Paper) 🎉",
    location: "Okinawa, Japan 🇯🇵",
    links: [
      {
        text: "FutureLetter: Augmenting Personal Writing for Future-Self Dialogue using LLMs",
        // url: "https://www.augmented-humans.org/",
      },
    ],
  },
  {
    date: "January 2026",
    title: "Accepted in WACV workshop (P2P-CV) 🎉",
    location: "Tucson, Arizona, USA 🇺🇸",
    links: [
      {
        text: "Towards Facilitated Fairness Assessment of AI-based Skin Lesion Classifiers Through GenAI-based Image Synthesis",
        url: "https://openaccess.thecvf.com/content/WACV2026W/P2P/html/Watanabe_Towards_Facilitated_Fairness_Assessment_of_AI-based_Skin_Lesion_Classifiers_Through_WACVW_2026_paper.html",
      },
    ],
  },
  {
    date: "January 2026",
    title: "The Future of Education with AI - Springer Book Chapter Published 🎉",
    location: "Shonan, Japan 🇯🇵",
    links: [
      {
        text: "The Future of Education with AI",
        url: "https://link.springer.com/book/10.1007/978-981-95-1622-3",
      },
      {
        text: "Knowledge Transfer with AI",
        url: "https://link.springer.com/chapter/10.1007/978-981-95-1622-3_4",
      },
    ],
  },
  {
    date: "December 2025",
    title: "Submitted pre-prints to ArXiv (under review)",
    links: [
      {
        text: "SensHRPS: Sensing Comfortable Human-Robot Proxemics",
        url: "https://arxiv.org/abs/2512.08518",
      },
      {
        text: "HandyLabel: Post-Processing to Real-Time Annotation",
        url: "https://arxiv.org/abs/2511.22337",
      },
    ],
  },
  {
    date: "December 2025",
    title: "AHs Full Paper Review - 4 papers",
  },
  {
    date: "December 2025",
    title: "IMWUT (November Round) Review - 1 paper",
  },
  {
    date: "November 2025",
    title: "IUI Full-Paper Review - 4 papers",
  },
  {
    date: "October 2025",
    title: "Presenting two papers at UbiComp-ISWC 2025",
    location: "Espoo, Finland 🇫🇮",
    links: [
      {
        text: "From Neck to Head: Bio-Impedance Sensing",
        url: "https://arxiv.org/abs/2507.12884",
      },
      {
        text: "Push or Light: Nudging Standing",
        url: "https://arxiv.org/abs/2507.08659",
      },
    ],
  },
  {
    date: "October 2025",
    title: "CHI Full-Paper Review - 5 papers 🇪🇸",
  },
  {
    date: "September 2025",
    title: "Open IFAC WC OIT webpage: Learning-Enabled and Human-Centric Robotics with Wearable and Sensor Systems 🇰🇷",
  },
  {
    date: "September 2025",
    title: "Hosted workshop 'Trustworthy AI' at IATM conference",
    location: "Frankfurt, Germany 🇩🇪",
  },
  {
    date: "September 2025",
    title: "Joined Aspire workshop about Medical AI held in DFKI",
    location: "Kaiserslautern, Germany 🇩🇪",
  },
  {
    date: "September 2025",
    title: "Lovely son born on September 1st 🎉",
  },
  {
    date: "August 2025",
    title: "Assigned as MUM 2025 program committee",
  },
  {
    date: "July 2025",
    title: "Accepted work in ISWC 2025 (Note)",
    location: "Espoo, Finland 🇫🇮",
    links: [
      {
        text: "From Neck to Head: Bio-Impedance Sensing",
        url: "https://arxiv.org/abs/2507.12884",
      },
    ],
  },
  {
    date: "June 2025",
    title: "Accepted work in UbiComp 2025 (Poster)",
    location: "Espoo, Finland 🇫🇮",
    links: [
      {
        text: "Push or Light: Nudging Standing",
        url: "https://arxiv.org/abs/2507.08659",
      },
    ],
  },
  {
    date: "June 2025",
    title: "Attending HCII 2025",
    location: "Gothenburg, Sweden 🇸🇪",
    links: [
      {
        text: "SensPS: Sensing Personal Space Comfortable Distance Between Human-Human",
        url: "",
      },
      {
        text: "HITL Annotation for Image-Based Engagement Estimation",
        url: "",
      },
    ],
  },
  {
    date: "June 2025",
    title: "Accepted work in IEEE Access (Journal Paper)",
    links: [
      {
        text: "EyeUnderstand: Dashboard for Gaze and Deep-Learning",
        url: "https://ieeexplore.ieee.org/document/11029003",
      },
    ],
  },
  {
    date: "May 2025",
    title: "Received 'Best Short Paper Award' in ETRA 2025 🏆",
  },
  {
    date: "May 2025",
    title: "Attending ETRA 2025",
    location: "Tokyo, Japan 🇯🇵",
  },
  {
    date: "April 2025",
    title: "Attend CHI 2025",
    location: "Yokohama, Japan 🇯🇵",
  },
  {
    date: "April 2025",
    title: "Presenting work at ABC 2025 🇦🇪",
    location: "Abu Dhabi, UAE 🇦🇪",
    links: [
      {
        text: "TrackThink Dashboard: Understanding Student Self-Regulated Learning in Programming Study",
        url: "https://www.jstage.jst.go.jp/article/ijabc/2025/1/2025_48/_article/-char/ja/",
      },
      {
        text: "ABCDE: Appearance-Based Confidence Detection by Evaluating Gaze Behavior Using Deep Learning",
        url: "https://www.jstage.jst.go.jp/article/ijabc/2025/1/2025_46/_article/-char/ja/",
      },
    ],
  },
  {
    date: "March 2025",
    title: "Attended AHs 2025 presenting 1 full-paper and 1 demo-paper. Also, role as a demo chair 🇦🇪",
    location: "Abu Dhabi, UAE 🇦🇪",
    links: [
      {
        text: "GenAIReading: Augmenting Human Cognition with Interactive Digital Textbooks (Full Paper)",
        url: "https://dl.acm.org/doi/full/10.1145/3745900.3746066",
      },
      {
        text: "Augmenting Online Meetings with Context-Aware Real-time Music Generation (Demo Paper)",
        url: "https://dl.acm.org/doi/10.1145/3745900.3746116",
      },
    ],
  },
  {
    date: "March 2025",
    title: "Accepted work in ETRA 2025 (Short Paper)",
    links: [
      {
        text: "PupilSense: A Novel Application for Webcam-Based Pupil Diameter Estimation",
        url: "https://dl.acm.org/doi/10.1145/3715669.3723125",
      },
    ],
  },
  {
    date: "March 2025",
    title: "Accepted work in ABC 2025 (Journal Paper)",
    links: [
      {
        text: "TrackThink Dashboard: Understanding Student Self-Regulated Learning in Programming Study",
        url: "https://www.jstage.jst.go.jp/article/ijabc/2025/1/2025_48/_article/-char/ja/",
      },
      {
        text: "ABCDE: Appearance-Based Confidence Detection by Evaluating Gaze Behavior Using Deep Learning",
        url: "https://www.jstage.jst.go.jp/article/ijabc/2025/1/2025_46/_article/-char/ja/",
      },
    ],
  },
  {
    date: "February 2025",
    title: "Accepted work in CVPR 2025 (Full Paper)",
    links: [
      {
        text: "TKG-DM: Training-free Chroma Key Content Generation Diffusion Model",
        url: "https://ieeexplore.ieee.org/document/11092342/",
      },
    ],
  },
  {
    date: "February 2025",
    title: "Accepted work in AHs 2025 (Full Paper and Demo)",
    links: [
      {
        text: "GenAIReading: Augmenting Human Cognition with Interactive Digital Textbooks (Full Paper)",
        url: "https://dl.acm.org/doi/full/10.1145/3745900.3746066",
      },
      {
        text: "Augmenting Online Meetings with Context-Aware Real-time Music Generation (Demo Paper)",
        url: "https://dl.acm.org/doi/10.1145/3745900.3746116",
      },
    ],
  },
  {
    date: "February 2025",
    title: "Attended ICAART 2025 🇵🇹",
    location: "Porto,Portugal 🇵🇹",
    links: [
      {
        text: "Webcam-based Pupil Diameter Prediction Benefits from Upscaling",
        url: "",
      },
    ],
  },
  {
    date: "January 2025",
    title: "Accepted work in IEEE Access",
    links: [
      {
        text: "Img2Vocab: Explore Words Tied to Your Life with LLMs and Social Media Images",
        url: "https://ieeexplore.ieee.org/document/10851279",
      },
    ],
  },
  {
    date: "December 2024",
    title: "Accepted work in IEEE Access",
    links: [
      {
        text: "Estimating Self-Confidence in Video-Based Learning Using Eye-Tracking and Deep Neural Networks",
        url: "https://ieeexplore.ieee.org/document/10792912",
      },
    ],
  },
  {
    date: "December 2024",
    title: "Accepted work in ICAART2025",
    links: [
      {
        text: "Webcam-based Pupil Diameter Prediction Benefits from Upscaling",
        url: "",
      },
    ],
  },
  {
    date: "November 2024",
    title: "Assigned as Demo chair in AHs2025",
  },
  {
    date: "October 2024",
    title: "Assigned as Technical Program Committee in ICMU2025",
  },
  {
    date: "September 2024",
    title: "Accepted work in ACCV2024",
    links: [
      {
        text: "Feature Estimation of Global Language Processing in EEG Using Attention Maps",
        url: "https://link.springer.com/chapter/10.1007/978-981-96-0901-7_6",
      },
    ],
  },
  {
    date: "September 2024",
    title: "Accepted work in IEEE Access",
    links: [
      {
        text: "Estimating Unknown English Words From User Smartphone Reading Behaviors",
        url: "https://ieeexplore.ieee.org/document/10670436",
      },
    ],
  },
  {
    date: "August 2024",
    title: "Presented work in EUSIPCO 2024",
    location: "Lyon, France 🇫🇷",
  },
  {
    date: "July 2024",
    title: "Accepted work in IEEE Access",
    links: [
      {
        text: "Gaze Generation for Avatars using GANs",
        url: "https://ieeexplore.ieee.org/document/10601689/",
      },
    ],
  },
  {
    date: "July 2024",
    title: "Accepted work in UbiComp' 24",
    location: "Melbourne, Australia 🇦🇺",
    links: [
      {
        text: "Comparing Web Browsing Behaviors with High and Low Information Literacy",
        url: "https://dl.acm.org/doi/10.1145/3675094.3677575",
      },
      {
        text: "Concentration Estimation in Online Video Lecture Using Multimodal Sensors",
        url: "https://dl.acm.org/doi/10.1145/3675094.3677587",
      },
    ],
  },
  {
    date: "May 2024",
    title: "Accepted work in EUSIPCO 2024",
    location: "Lyon, France 🇫🇷",
    links: [
      {
        text: "Edge-based Denoising Image Compression",
        url: "",
      },
    ],
  },
  {
    date: "April 2024",
    title: "Presenting work at AHs 2024",
    location: "Melbourne, Australia 🇦🇺",
    links: [
      {
        text: "Metacognition-EnGauge: Real-time Augmentation of Self-and-Group Engagement Levels",
        url: "https://dl.acm.org/doi/abs/10.1145/3652920.3653054",
      },
    ],
  },
  {
    date: "April 2024",
    title: "Submitted PhD thesis to the Department of Computer Science",
  },
  {
    date: "March 2024",
    title: "Accepted work in ETRA 2024 Short Paper",
    location: "Glasgow, UK 🇬🇧",
    links: [
      {
        text: "Eye Movement in a Controlled Dialogue Setting",
        url: "https://dl.acm.org/doi/abs/10.1145/3649902.3653337",
      },
    ],
  },
  {
    date: "March 2024",
    title: "Attend NII Shonan-Meeting 🇯🇵",
    location: "Shonan, Japan 🇯🇵",
    links: [
      {
        text: "The Future of Education with AI",
        url: "https://shonan.nii.ac.jp/seminars/214/",
      },
    ],
  },
  {
    date: "November 2023",
    title: "Attend LeCycl Workshop in Deutsche Forschungsgemeinschaft (DFG)",
    location: "Bonn, Germany 🇩🇪",
  },
  {
    date: "October 2023",
    title: "Attend UbiComp 2023",
    location: "Cancun, Mexico 🇲🇽",
    links: [
      {
        text: "Accelerating Knowledge Transfer by Sensing and Actuating Social-Cognitive States",
        url: "https://dl.acm.org/doi/10.1145/3594739.3610769",
      },
    ],
  },
  {
    date: "August 2023",
    title: "Attend CHI 2023",
    location: "Hamburg, Germany 🇩🇪",
    links: [
      {
        text: "Combining the Knowledge of Experienced Programmers to Extract Useful Web Resources",
        url: "https://dl.acm.org/doi/10.1145/3604571.3604575",
      },
    ],
  },
]

const INITIAL_DISPLAY_COUNT = 5
const LOAD_MORE_COUNT = 5

export function NewsSection() {
  const { language } = useLanguage()
  const newsItems = language === 'ja' ? newsItemsJa : newsItemsEn
  const [displayCount, setDisplayCount] = useState(INITIAL_DISPLAY_COUNT)
  const [filterYear, setFilterYear] = useState('')
  const [filterMonth, setFilterMonth] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const isFilterActive = filterYear !== '' || filterMonth !== ''

  const filteredItems = useMemo(
    () => filterNewsItems(newsItems, filterYear, filterMonth),
    [newsItems, filterYear, filterMonth],
  )

  const availableYears = useMemo(() => getAvailableYears(newsItems), [newsItems])
  const availableMonths = useMemo(
    () => getAvailableMonths(newsItems, filterYear),
    [newsItems, filterYear],
  )

  useEffect(() => {
    setDisplayCount(INITIAL_DISPLAY_COUNT)
  }, [language, filterYear, filterMonth])

  useEffect(() => {
    if (filterMonth && !availableMonths.includes(Number(filterMonth))) {
      setFilterMonth('')
    }
  }, [availableMonths, filterMonth])

  const displayedItems = filteredItems.slice(0, displayCount)
  const hasMore = displayCount < filteredItems.length
  const canShowLess = displayCount > INITIAL_DISPLAY_COUNT

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + LOAD_MORE_COUNT, filteredItems.length))
  }

  const handleShowLess = () => {
    setDisplayCount(prev => Math.max(prev - 3, INITIAL_DISPLAY_COUNT))
  }

  const handleResetFilter = () => {
    setFilterYear('')
    setFilterMonth('')
  }

  const content = {
    ja: {
      showMore: "もっと見る",
      showLess: "閉じる",
      filterTitle: "期間で絞り込み",
      toggleFilter: "期間で絞り込む",
      closeFilter: "絞り込みを閉じる",
      year: "年",
      month: "月",
      allYears: "すべて",
      allMonths: "すべて",
      reset: "リセット",
      noResults: "該当するニュースはありません。",
      monthLabel: (value: number) => `${value}月`,
      activeFilter: (year: string, month: string) => {
        if (year && month) return `${year}年${month}月`
        if (year) return `${year}年`
        if (month) return `${month}月`
        return ""
      },
    },
    en: {
      showMore: "Show More",
      showLess: "Show Less",
      filterTitle: "Filter by period",
      toggleFilter: "Filter by period",
      closeFilter: "Close filter",
      year: "Year",
      month: "Month",
      allYears: "All",
      allMonths: "All",
      reset: "Reset",
      noResults: "No news found for this period.",
      monthLabel: (value: number) =>
        new Date(2000, value - 1, 1).toLocaleString('en', { month: 'short' }),
      activeFilter: (year: string, month: string) => {
        if (year && month) {
          const monthName = new Date(2000, Number(month) - 1, 1).toLocaleString('en', { month: 'long' })
          return `${monthName} ${year}`
        }
        if (year) return String(year)
        if (month) {
          return new Date(2000, Number(month) - 1, 1).toLocaleString('en', { month: 'long' })
        }
        return ""
      },
    },
  }

  const texts = content[language]

  const chipClassName = (active: boolean) =>
    cn(
      "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-all duration-200",
      active
        ? "border-secondary bg-secondary text-secondary-foreground shadow-sm"
        : "border-border/80 bg-background/70 text-muted-foreground hover:border-secondary/35 hover:bg-background hover:text-foreground",
    )

  const activeFilterLabel = texts.activeFilter(filterYear, filterMonth)

  return (
    <section className="bg-muted/30 px-4 py-20" id="news">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-8 flex items-center justify-center gap-3">
          <h2 className="text-balance text-center font-serif text-4xl font-bold tracking-tight md:text-5xl">
            News
          </h2>
          <button
            type="button"
            onClick={() => setIsFilterOpen((open) => !open)}
            aria-expanded={isFilterOpen}
            aria-label={isFilterOpen ? texts.closeFilter : texts.toggleFilter}
            className={cn(
              "relative inline-flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200",
              isFilterOpen
                ? "border-secondary bg-secondary text-secondary-foreground shadow-sm"
                : "border-border/80 bg-card/80 text-muted-foreground hover:border-secondary/35 hover:bg-card hover:text-foreground",
            )}
          >
            <CalendarRange className="h-5 w-5" />
            {isFilterActive && !isFilterOpen && (
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-secondary ring-2 ring-background" />
            )}
          </button>
        </div>

        {isFilterOpen && (
        <div className="mb-10 overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-card via-card to-secondary/5 p-5 shadow-sm animate-in fade-in slide-in-from-top-2 duration-200 md:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="font-serif text-lg font-semibold tracking-tight text-foreground">
                {texts.filterTitle}
              </p>
              {isFilterActive && (
                <p className="text-sm text-muted-foreground">{activeFilterLabel}</p>
              )}
            </div>

            {isFilterActive && (
              <Badge variant="secondary" className="w-fit rounded-full px-3 py-1">
                {filteredItems.length}
              </Badge>
            )}
          </div>

          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {texts.year}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFilterYear('')}
                  className={chipClassName(filterYear === '')}
                >
                  {texts.allYears}
                </button>
                {availableYears.map((year) => (
                  <button
                    key={year}
                    type="button"
                    onClick={() => setFilterYear(String(year))}
                    className={chipClassName(filterYear === String(year))}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {texts.month}
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setFilterMonth('')}
                  className={chipClassName(filterMonth === '')}
                >
                  {texts.allMonths}
                </button>
                {availableMonths.map((month) => (
                  <button
                    key={month}
                    type="button"
                    onClick={() => setFilterMonth(String(month))}
                    className={chipClassName(filterMonth === String(month))}
                  >
                    {texts.monthLabel(month)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 flex justify-end border-t border-border/60 pt-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilter}
              disabled={!isFilterActive}
              className="gap-2 rounded-full px-4 text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="h-4 w-4" />
              {texts.reset}
            </Button>
          </div>
        </div>
        )}

        <div className="space-y-4">
          {displayedItems.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                {texts.noResults}
              </CardContent>
            </Card>
          ) : (
            displayedItems.map((item) => (
            <Card
              key={`${item.date}-${item.title}`}
              className="transition-shadow hover:shadow-md"
            >
              <CardContent className="relative p-6">
                {(item as { location?: string }).location && (
                  <div className="absolute right-4 top-4 z-10">
                    <Badge variant="outline" className="text-xs">
                      {(item as { location?: string }).location}
                    </Badge>
                  </div>
                )}
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <Badge variant="secondary" className="w-fit shrink-0">
                    {item.date}
                  </Badge>
                  <div className="flex-1 pr-20">
                    <p className="mb-2 text-base leading-relaxed text-foreground">{item.title}</p>
                    {item.links && (
                      <ul className="space-y-1">
                        {item.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            {'url' in link && link.url ? (
                              <a
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-secondary hover:underline"
                              >
                                • {link.text}
                              </a>
                            ) : (
                              <span className="text-sm text-muted-foreground">• {link.text}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            ))
          )}
        </div>

        {(hasMore || canShowLess) && (
          <div className="mt-8 flex justify-center gap-2">
            {hasMore && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                className="gap-2"
              >
                {texts.showMore}
              </Button>
            )}
            {canShowLess && (
              <Button
                variant="outline"
                size="lg"
                onClick={handleShowLess}
                className="gap-2"
              >
                {texts.showLess}
              </Button>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
