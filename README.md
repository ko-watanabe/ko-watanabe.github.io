# Ko Watanabe - Portfolio Website

Personal academic portfolio website for Ko Watanabe, Medicine Trustworthy AI & HCI Researcher at DFKI.

🌐 **Live Site**: [https://ko-watanabe.github.io/](https://ko-watanabe.github.io/)

## Features

- 📄 **Publications**: Automatically fetches and displays publications from Google Scholar
  - Most Cited: Top 5 publications by citation count
  - Latest: Top 5 publications by publication date
- 🌍 **Multi-language Support**: Japanese and English with automatic language detection
- 📰 **News Section**: Research news and updates
- 🏆 **Awards & Activities**: Academic awards and committee activities
- 📧 **Contact Information**: Easy way to get in touch

## Tech Stack

- **Framework**: Next.js 16.0.10
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## Getting Started

### Prerequisites

- Node.js 20 or higher
- Yarn package manager

### Installation

```bash
# Install dependencies
yarn install
```

### Development

```bash
# Run development server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build

```bash
# To get the recent publication information
yarn update-publications

# Build for production
yarn build

# Preview production build
yarn start
```

The build output will be in the `out` directory.

## Deployment

This site is automatically deployed to GitHub Pages when changes are pushed to the `master` or `main` branch.

The deployment process:
1. Fetches publication data from Google Scholar
2. Builds the Next.js static site
3. Deploys to GitHub Pages

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── hero-section.tsx
│   ├── about-section.tsx
│   ├── publications-list-section.tsx
│   ├── news-section.tsx
│   └── ...
├── scripts/               # Build-time scripts
│   └── fetch-scholar-publications.js
├── public/               # Static assets
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions workflow
```

## License

This project is private and proprietary.

## Contact

- **Email**: ko.watanabe@dfki.de
- **Website**: https://ko-watanabe.github.io/
- **Google Scholar**: [Ko Watanabe](https://scholar.google.com/citations?user=AluAUmEAAAAJ)
