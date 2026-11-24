# ヨーロッパで活躍する日本人博士によるキャリアトーク · 2026.11.26

Open `/slides/2026.11.26_career_talk_tsukuba/index.html` through the existing Next.js server. The presentation is a standalone HTML/CSS/JS asset and is copied into `out/` by static export. No additional packages or build steps are needed for the deck itself.

## Design

Visual design follows the [SLIDE.md](https://github.com/sho-ai-magic/slide.md) sample system **`SLIDE-md-blue-simple-diagram`** (education / training). Scenario and deck brief live in the repo root:

- `SLIDE-SCENARIO/SLIDE-SCENARIO-career-talk-tsukuba.md`
- `SLIDE-DECK/SLIDE-DECK-career-talk-tsukuba/SLIDE-DECK-career-talk-tsukuba.md`
- Design tokens: Noto Sans JP, primary `#29ABE2`, secondary `#A8DCF0`, blob accents, dotted-bracket section titles, white inner panels

- 18 slides, in Japanese. Planned speaking time is about 30 minutes (buffer included in chapter dividers and the closing).
- Audience: University of Tsukuba SPRING/BOOST supported doctoral students; career paths after the Ph.D., especially overseas.
- Venue listing: Ruhr University Bochum, Germany · hosted by the University of Tsukuba.
- Arrow keys / Space / Page Up / Page Down: navigate. Home / End: first / last slide.
- F: full screen. O: contents. N: speaker notes and sources. R: replay slide animation.
- T: start / pause the rehearsal timer (30:00). P: browser print / Save as PDF (16:9 pages).
- Touch: swipe horizontally. URL hashes (`#14`) link to individual slides.
- System reduced-motion preferences are honored. Add `?motion=off` for a static presentation without entrance animations.

Edit content, timings and presenter notes in `slides.js`; edit appearance in `deck.css`; presentation behavior is in `deck.js`.

## Structure (approx.)

| Part | Focus |
| --- | --- |
| はじめに | 目的・自己紹介・キャリア全体像 |
| 日本での歩み | 学部・修士、DeNA、ドイツへの決断 |
| ドイツでの博士 | 研究所雇用モデル、研究と学位プロセス |
| 博士取得後 | 現在の役割、生活、メッセージ、パスの地図 |

## Sources used for content

Speaker biography and timeline: <https://ko-watanabe.github.io/>  
Career narrative notes (images mirrored under `assets/note/`):  
- DeNA→Germany · <https://note.com/ko_watanabe_note/n/nb30491bfbc3e>  
- Ph.D. in Germany · <https://note.com/ko_watanabe_note/n/n622b5a205a9d>  
- 2025 year-in-review · <https://note.com/ko_watanabe_note/n/na248a96494e1>  
- ETRA award story · <https://note.com/ko_watanabe_note/n/n53f3306d4e3d>  
Scholar: <https://scholar.google.com/citations?user=AluAUmEAAAAJ>  
YouTube: <https://www.youtube.com/@ko_watanabe>

Institution logos reused from the Korea University deck assets (DFKI, NAIST, OMU). Portrait uses the site root `/ko-watanabe.jpg`.
