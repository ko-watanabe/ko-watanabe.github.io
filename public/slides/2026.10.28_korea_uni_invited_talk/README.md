# Korea University invited talk · 28 October 2026

Open `/slides/2026.10.28_korea_uni_invited_talk/index.html` through the existing Next.js server. The presentation is a standalone HTML/CSS/JS asset and is copied into `out/` by static export. No additional packages or build steps are needed for the deck itself.

- 23 slides, in English; 51 minutes including films plus 5 minutes of discussion and 4 minutes of buffer in the 60-minute slot.
- Arrow keys / Space / Page Up / Page Down: navigate. Home / End: first / last slide.
- On P3, Next steps through enlarged views of the five research areas, then an illustrated preview of today's Trustworthy AI focus, before advancing to P4. Previous reverses these steps; All areas restores the overview. Works in full screen and windowed view, with buttons, keys and swipes. The page number remains 03 / 23 through the preview. Contents and direct slide links reset to the overview. Printing always uses the complete five-area map.
- On Seven dimensions of trustworthiness, Next selects 01–07 in order before advancing the slide; Previous reverses the selection and returns to the overview. Clicking any dimension synchronizes the sequence. All dimensions, Contents and direct slide navigation restore the overview; the slide number stays unchanged during the seven steps. Button, keyboard and swipe navigation share this behavior.
- F: full screen. O: contents. N: speaker notes and sources. R: replay slide animation.
- T: start / pause the rehearsal timer. P: browser print / Save as PDF (16:9 pages).
- Touch: swipe horizontally. URL hashes (`#14`) link to individual slides.
- System reduced-motion preferences are honored. Add `?motion=off` for a static presentation without entrance animations.
- P12 repeatedly highlights Research, Test, Document, Deploy and Monitor with JavaScript and an animated progress line. Pause / Resume animation holds or continues the cycle; R restarts it. The loop runs only while P12 is visible, pauses for notes and contents, and stops for printing or reduced motion.

Edit content, timings and presenter notes in `slides.js`; edit appearance in `deck.css`; presentation behavior is in `deck.js`.

## Media and sources

The DFKI films, logo and photographs were extracted from the supplied `DFKI_Facts.pptx`. Paper previews, source PDFs and figures come from the four supplied research papers. The source taxonomy for the seven dimensions is page 11 of the supplied `trustworth_ai.pdf`. Source details and policy references are attached to each slide's Notes panel. P3 maps five research areas. P4 introduces explainability, fairness, and AI ethics and bias through three illustrations, questions and research examples, then leads into the DFKI introduction. The ethics theme centers on the JMIR AI case-based audit of medical ethics recommendations across LLMs. It describes recommendation tendencies, not a test of ethical correctness or discrimination. Full paper titles and sources are in the Notes panel. The five research illustrations are conceptual scenes created with the built-in image generation tool. They show gaze sensing, interactive learning, everyday interaction, medical-AI evaluation and image generation. Saved assets and the full prompts are in `assets/research-illustrations/README.md`. P8 marks the transition from the DFKI introduction to the main topic, Trustworthy AI, with a staged section heading. The schedule includes 1 minute of buffer in the 60-minute slot.

DFKI in 100 Seconds is 1:43. The optional Living Labs film is 3:47 and is outside the default timing on P7. The four research-film slides embed the exact YouTube links requested by the speaker. VXAI, skin-lesion fairness and deepfake fairness also have local English MP4 backups and WebVTT captions converted from the supplied subtitle files. The medical-ethics film requires internet access; no local copy was supplied. Playback begins on user action and stops when leaving the slide.

The “Useful AI needs warranted trust” slide includes a locally hosted three-minute anime overview with English AI-generated narration and burned English subtitles. The film explains the importance of warranted trust, lawful/ethical/robust AI, the seven dimensions and evaluation/documentation/monitoring. Separate WebVTT/SRT subtitles and the transcript are supplied in assets. Original artwork, prompts, storyboard and local production sources are retained in the draft video/trustworthy-ai-overview folder.

Institution logos preserve their proportions. The title slide uses a white DFKI mark on a transparent background for contrast; the introduction retains the original logo colors:

- DFKI: original vector in the supplied facts deck.
- NAIST: full-color emblem extracted losslessly with its original alpha mask from page 3 of the official <https://www.naist.jp/about/img/logoyoryo.pdf>; guidelines <https://www.naist.jp/about/pr/logo.html>.
- Osaka Metropolitan University: original vector <https://www.omu.moe/img/omu-logo.svg>, linked by the university's temporary official site, to which <https://www.omu.ac.jp/en/> redirects as of 25 October 2026.

The title preserves the wording requested by the speaker. The skin-lesion paper is labeled as a WACV workshop paper; the deepfake study concerns detector fairness. The ethics study measures recommendation behavior, not ethical correctness. Policy references were checked on 25 October 2026.

The Slides listing includes future talks only on loopback hosts (`localhost`, `.localhost`, `127.0.0.1`, IPv6 loopback). Public hosts retain the existing publication-date filter. This is a listing rule, not access control for files under `public/`.
