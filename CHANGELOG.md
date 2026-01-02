# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-XX

### Added
- Initial portfolio website for Ko Watanabe
- Hero section with profile image and location badge
- About section with research interests
- Publications section with:
  - Most Cited publications (top 5 by citations)
  - Latest publications (top 5 by publication date)
  - View buttons linking to Google Scholar
- News section with "Show More" functionality
- Experience section with education and work history
- Awards & Activities section with:
  - Best Short Paper Award (ETRA 2025) with links to paper and award details
  - Committee Activities with links to conference websites
  - Research funding information
- Contact section
- Multi-language support (Japanese/English) with:
  - Language switcher
  - IP-based initial language detection
  - Persistent language preference
- Responsive design for mobile and desktop
- Google Scholar integration:
  - Automatic publication fetching from Google Scholar
  - Citation count sorting
  - Publication date sorting
- GitHub Pages deployment with GitHub Actions

### Technical Details
- Built with Next.js 16.0.10
- Static site generation (SSG) for GitHub Pages
- TypeScript for type safety
- Tailwind CSS for styling
- Radix UI components
- Puppeteer for web scraping Google Scholar data

