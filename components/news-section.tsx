'use client'

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

const newsItemsJa = [
  {
    date: "2026年1月",
    title: "The Future of Education with AI - Springer Book Chapter出版 🎉",
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
    title: "UbiComp-ISWC 2025で2本の論文を発表(エスポー、フィンランド🇫🇮)",
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
    title: "Open IFAC WC OIT webpage: Learning-Enabled and Human-Centric Robotics with Wearable and Sensor Systems 🇰🇷",
  },
  {
    date: "2025年9月",
    title: "IATM conferenceで「Trustworthy AI」ワークショップを開催(フランクフルト、ドイツ🇩🇪)",
  },
  {
    date: "2025年9月",
    title: "DFKIで開催されたMedical AIに関するAspireワークショップに参加(カイザースラウテルン、ドイツ🇩🇪)",
  },
  {
    date: "2025年9月",
    title: "9月1日に愛息誕生🎉",
  },
  {
    date: "2025年8月",
    title: "MUM 2025 program committeeに任命",
  },
  {
    date: "2025年7月",
    title: "ISWC 2025 (Note)に論文が採択。エスポー、フィンランド🇫🇮で発表予定",
    links: [
      {
        text: "From Neck to Head: Bio-Impedance Sensing",
        url: "https://arxiv.org/abs/2507.12884",
      },
    ],
  },
  {
    date: "2025年6月",
    title: "UbiComp 2025 (Poster)に論文が採択。エスポー、フィンランド🇫🇮で発表予定",
    links: [
      {
        text: "Push or Light: Nudging Standing",
        url: "https://arxiv.org/abs/2507.08659",
      },
    ],
  },
  {
    date: "2025年6月",
    title: "HCII 2025に参加(イェーテボリ、スウェーデン🇸🇪)",
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
    title: "ETRA 2025に参加(東京、日本🇯🇵)",
  },
  {
    date: "2025年4月",
    title: "CHI 2025に参加(横浜、日本🇯🇵)",
  },
  {
    date: "2025年4月",
    title: "ABC 2025で発表 🇦🇪",
    links: [
      {
        text: "TrackThink Dashboard: Understanding Student Self-Regulated Learning in Programming Study (IJABC)",
        url: "",
      },
      {
        text: "ABCDE: Appearance-Based Confidence Detection by Evaluating Gaze Behavior Using Deep Learning (IJABC)",
        url: "",
      },
    ],
  },
  {
    date: "2025年3月",
    title: "AHs 2025に参加。1本のフルペーパーと1本のデモペーパーを発表。デモチェアとしても活動 🇦🇪",
    links: [
      {
        text: "GenAIReading: Augmenting Human Cognition with Interactive Digital Textbooks (Full Paper)",
        url: "",
      },
      {
        text: "Augmenting Online Meetings with Context-Aware Real-time Music Generation (Demo Paper)",
        url: "",
      },
    ],
  },
  {
    date: "2025年3月",
    title: "ETRA 2025 (Short Paper)に論文が採択",
    links: [
      {
        text: "PupilSense: A Novel Application for Webcam-Based Pupil Diameter Estimation",
        url: "",
      },
    ],
  },
  {
    date: "2025年3月",
    title: "ABC 2025 (Journal Paper)に論文が採択",
    links: [
      {
        text: "TrackThink Dashboard: Understanding Student Self-Regulated Learning in Programming Study (IJABC)",
        url: "",
      },
      {
        text: "ABCDE: Appearance-Based Confidence Detection by Evaluating Gaze Behavior Using Deep Learning (IJABC)",
        url: "",
      },
    ],
  },
  {
    date: "2025年2月",
    title: "CVPR 2025 (Full Paper)に論文が採択",
    links: [
      {
        text: "TKG-DM: Training-free Chroma Key Content Generation Diffusion Model",
        url: "",
      },
    ],
  },
  {
    date: "2025年2月",
    title: "AHs 2025 (Full Paper and Demo)に論文が採択",
    links: [
      {
        text: "GenAIReading: Augmenting Human Cognition with Interactive Digital Textbooks (Full Paper)",
        url: "",
      },
      {
        text: "Augmenting Online Meetings with Context-Aware Real-time Music Generation (Demo Paper)",
        url: "",
      },
    ],
  },
  {
    date: "2025年2月",
    title: "ICAART 2025に参加 🇵🇹",
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
        url: "",
      },
    ],
  },
  {
    date: "2024年12月",
    title: "IEEE Accessに論文が採択",
    links: [
      {
        text: "Estimating Self-Confidence in Video-Based Learning Using Eye-Tracking and Deep Neural Networks",
        url: "",
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
        url: "",
      },
    ],
  },
  {
    date: "2024年9月",
    title: "IEEE Accessに論文が採択",
    links: [
      {
        text: "Estimating Unknown English Words From User Smartphone Reading Behaviors",
        url: "",
      },
    ],
  },
  {
    date: "2024年8月",
    title: "EUSIPCO 2024で発表(リヨン、フランス🇫🇷)",
  },
  {
    date: "2024年7月",
    title: "IEEE Accessに論文が採択",
    links: [
      {
        text: "Gaze Generation for Avatars using GANs",
        url: "",
      },
    ],
  },
  {
    date: "2024年7月",
    title: "UbiComp' 24に論文が採択。メルボルン、オーストラリア🇦🇺で発表",
    links: [
      {
        text: "Comparing Web Browsing Behaviors with High and Low Information Literacy",
        url: "",
      },
      {
        text: "Concentration Estimation in Online Video Lecture Using Multimodal Sensors",
        url: "",
      },
    ],
  },
  {
    date: "2024年5月",
    title: "EUSIPCO 2024に論文が採択。リヨン、フランス🇫🇷で発表予定",
    links: [
      {
        text: "Edge-based Denoising Image Compression",
        url: "",
      },
    ],
  },
  {
    date: "2024年4月",
    title: "AHs 2024で発表(メルボルン、オーストラリア🇦🇺)",
    links: [
      {
        text: "Metacognition-EnGauge: Real-time Augmentation of Self-and-Group Engagement Levels",
        url: "",
      },
    ],
  },
  {
    date: "2024年4月",
    title: "コンピュータサイエンス学科に博士論文を提出",
  },
  {
    date: "2024年3月",
    title: "ETRA 2024 Short Paperに論文が採択。グラスゴー、イギリス🇬🇧で発表",
    links: [
      {
        text: "Eye Movement in a Controlled Dialogue Setting",
        url: "",
      },
    ],
  },
  {
    date: "2024年3月",
    title: "NII Shonan-Meetingに参加 🇯🇵",
    links: [
      {
        text: "The Future of Education with AI",
        url: "",
      },
    ],
  },
  {
    date: "2023年11月",
    title: "Deutsche Forschungsgemeinschaft (DFG)のLeCycl Workshopに参加(ボン、ドイツ🇩🇪)",
  },
  {
    date: "2023年10月",
    title: "UbiComp 2023に参加(カンクン、メキシコ🇲🇽)",
    links: [
      {
        text: "Accelerating Knowledge Transfer by Sensing and Actuating Social-Cognitive States",
        url: "",
      },
    ],
  },
  {
    date: "2023年8月",
    title: "CHI 2023に参加(ハンブルク、ドイツ🇩🇪)",
    links: [
      {
        text: "Combining the Knowledge of Experienced Programmers to Extract Useful Web Resources",
        url: "",
      },
    ],
  },
]

const newsItemsEn = [
  {
    date: "January 2026",
    title: "The Future of Education with AI - Springer Book Chapter Published 🎉",
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
    title: "Presenting two papers at UbiComp-ISWC 2025 (Espoo, Finland 🇫🇮)",
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
    title: "Hosted workshop 'Trustworthy AI' at IATM conference (Frankfurt, Germany 🇩🇪)",
  },
  {
    date: "September 2025",
    title: "Joined Aspire workshop about Medical AI held in DFKI (Kaiserslautern, Germany 🇩🇪)",
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
    title: "Accepted work in ISWC 2025 (Note). Will be presented at Espoo, Finland 🇫🇮",
    links: [
      {
        text: "From Neck to Head: Bio-Impedance Sensing",
        url: "https://arxiv.org/abs/2507.12884",
      },
    ],
  },
  {
    date: "June 2025",
    title: "Accepted work in UbiComp 2025 (Poster). Will be presented at Espoo, Finland 🇫🇮",
    links: [
      {
        text: "Push or Light: Nudging Standing",
        url: "https://arxiv.org/abs/2507.08659",
      },
    ],
  },
  {
    date: "June 2025",
    title: "Attending HCII 2025 in Gothenburg, Sweden 🇸🇪",
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
    title: "Attending ETRA 2025 in Tokyo, Japan 🇯🇵",
  },
  {
    date: "April 2025",
    title: "Attend CHI 2025 in Yokohama, Japan 🇯🇵",
  },
  {
    date: "April 2025",
    title: "Presenting work at ABC 2025 🇦🇪",
    links: [
      {
        text: "TrackThink Dashboard: Understanding Student Self-Regulated Learning in Programming Study (IJABC)",
        url: "",
      },
      {
        text: "ABCDE: Appearance-Based Confidence Detection by Evaluating Gaze Behavior Using Deep Learning (IJABC)",
        url: "",
      },
    ],
  },
  {
    date: "March 2025",
    title: "Attended AHs 2025 presenting 1 full-paper and 1 demo-paper. Also, role as a demo chair 🇦🇪",
    links: [
      {
        text: "GenAIReading: Augmenting Human Cognition with Interactive Digital Textbooks (Full Paper)",
        url: "",
      },
      {
        text: "Augmenting Online Meetings with Context-Aware Real-time Music Generation (Demo Paper)",
        url: "",
      },
    ],
  },
  {
    date: "March 2025",
    title: "Accepted work in ETRA 2025 (Short Paper)",
    links: [
      {
        text: "PupilSense: A Novel Application for Webcam-Based Pupil Diameter Estimation",
        url: "",
      },
    ],
  },
  {
    date: "March 2025",
    title: "Accepted work in ABC 2025 (Journal Paper)",
    links: [
      {
        text: "TrackThink Dashboard: Understanding Student Self-Regulated Learning in Programming Study (IJABC)",
        url: "",
      },
      {
        text: "ABCDE: Appearance-Based Confidence Detection by Evaluating Gaze Behavior Using Deep Learning (IJABC)",
        url: "",
      },
    ],
  },
  {
    date: "February 2025",
    title: "Accepted work in CVPR 2025 (Full Paper)",
    links: [
      {
        text: "TKG-DM: Training-free Chroma Key Content Generation Diffusion Model",
        url: "",
      },
    ],
  },
  {
    date: "February 2025",
    title: "Accepted work in AHs 2025 (Full Paper and Demo)",
    links: [
      {
        text: "GenAIReading: Augmenting Human Cognition with Interactive Digital Textbooks (Full Paper)",
        url: "",
      },
      {
        text: "Augmenting Online Meetings with Context-Aware Real-time Music Generation (Demo Paper)",
        url: "",
      },
    ],
  },
  {
    date: "February 2025",
    title: "Attended ICAART 2025 🇵🇹",
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
        url: "",
      },
    ],
  },
  {
    date: "December 2024",
    title: "Accepted work in IEEE Access",
    links: [
      {
        text: "Estimating Self-Confidence in Video-Based Learning Using Eye-Tracking and Deep Neural Networks",
        url: "",
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
        url: "",
      },
    ],
  },
  {
    date: "September 2024",
    title: "Accepted work in IEEE Access",
    links: [
      {
        text: "Estimating Unknown English Words From User Smartphone Reading Behaviors",
        url: "",
      },
    ],
  },
  {
    date: "August 2024",
    title: "Presented work in EUSIPCO 2024 at Lyon, France 🇫🇷",
  },
  {
    date: "July 2024",
    title: "Accepted work in IEEE Access",
    links: [
      {
        text: "Gaze Generation for Avatars using GANs",
        url: "",
      },
    ],
  },
  {
    date: "July 2024",
    title: "Accepted work in UbiComp' 24 presenting work at Melbourne, Australia 🇦🇺",
    links: [
      {
        text: "Comparing Web Browsing Behaviors with High and Low Information Literacy",
        url: "",
      },
      {
        text: "Concentration Estimation in Online Video Lecture Using Multimodal Sensors",
        url: "",
      },
    ],
  },
  {
    date: "May 2024",
    title: "Accepted work in EUSIPCO 2024 presenting work at Lyon, France 🇫🇷",
    links: [
      {
        text: "Edge-based Denoising Image Compression",
        url: "",
      },
    ],
  },
  {
    date: "April 2024",
    title: "Presenting work at AHs 2024 in Melbourne, Australia 🇦🇺",
    links: [
      {
        text: "Metacognition-EnGauge: Real-time Augmentation of Self-and-Group Engagement Levels",
        url: "",
      },
    ],
  },
  {
    date: "April 2024",
    title: "Submitted PhD thesis to the Department of Computer Science",
  },
  {
    date: "March 2024",
    title: "Accepted work in ETRA 2024 Short Paper presenting work at Glasgow, UK 🇬🇧",
    links: [
      {
        text: "Eye Movement in a Controlled Dialogue Setting",
        url: "",
      },
    ],
  },
  {
    date: "March 2024",
    title: "Attend NII Shonan-Meeting 🇯🇵",
    links: [
      {
        text: "The Future of Education with AI",
        url: "",
      },
    ],
  },
  {
    date: "November 2023",
    title: "Attend LeCycl Workshop in Deutsche Forschungsgemeinschaft (DFG) in Bonn 🇩🇪",
  },
  {
    date: "October 2023",
    title: "Attend UbiComp 2023 in Cancun, Mexico 🇲🇽",
    links: [
      {
        text: "Accelerating Knowledge Transfer by Sensing and Actuating Social-Cognitive States",
        url: "",
      },
    ],
  },
  {
    date: "August 2023",
    title: "Attend CHI 2023 in Hamburg, Germany 🇩🇪",
    links: [
      {
        text: "Combining the Knowledge of Experienced Programmers to Extract Useful Web Resources",
        url: "",
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

  const displayedItems = newsItems.slice(0, displayCount)
  const hasMore = displayCount < newsItems.length

  const handleLoadMore = () => {
    setDisplayCount(prev => Math.min(prev + LOAD_MORE_COUNT, newsItems.length))
  }

  const content = {
    ja: {
      showMore: "もっと見る",
    },
    en: {
      showMore: "Show More",
    },
  }

  const texts = content[language]

  return (
    <section className="bg-muted/30 px-4 py-20" id="news">
      <div className="container mx-auto max-w-5xl">
        <h2 className="mb-12 text-balance text-center font-serif text-4xl font-bold tracking-tight md:text-5xl">
          News
        </h2>

        <div className="space-y-4">
          {displayedItems.map((item, index) => (
            <Card key={index} className="transition-shadow hover:shadow-md">
              <CardContent className="p-6">
                <div className="flex flex-col gap-4 md:flex-row md:items-start">
                  <Badge variant="secondary" className="w-fit shrink-0">
                    {item.date}
                  </Badge>
                  <div className="flex-1">
                    <p className="mb-2 text-base leading-relaxed text-foreground">{item.title}</p>
                    {item.links && (
                      <ul className="space-y-1">
                        {item.links.map((link, linkIndex) => (
                          <li key={linkIndex}>
                            {link.url ? (
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
          ))}
        </div>

        {hasMore && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              className="gap-2"
            >
              {texts.showMore}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
