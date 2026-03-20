# Cornelia Trompke Consulting & Coaching — PRD

## Original Problem Statement
Cinematic Editorial Luxury marketing website for "Cornelia Trompke Consulting & Coaching". Design: calm, minimal, intelligent, grounded. Visual style: "Executive Luxury" + "Nervous System Science."

## Color Palette
- Deep Forest Green: `#0F1A12`
- Warm Ivory, Soft Stone, Muted Sage, Soft Gold

## Typography
- Elegant serif for headlines, modern sans-serif for body

## Pages
Home, About, Method, Work With Me, Services, Contact, Legal (Impressum, Privacy, Terms)

## Core Features
- Pre-loader, language switching (EN/DE)
- Context-aware contact form system
- Full-stack Google Sheets integration (form submissions + dynamic retreat data)
- Retreat application form modal
- Comprehensive SEO (custom OG image, JSON-LD schemas)
- Email notifications for form submissions
- WhatsApp integration
- GDPR-compliant cookie consent management
- Client logo ticker on homepage
- Google Analytics 4 (GA4) with Consent Mode v2

## What's Been Implemented
- Full site with all pages and features listed above
- Venn Diagram text-overlap fix (SVG clipPath masking)
- Homepage scroll animation fix (FoundationSection slide-down reveal)
- GA4 integration (Measurement ID: G-F3MYQCYJSD)
- Form pre-selection bug fix
- Google Apps Script URL updated
- Executive Coaching page internationalization (en.js/de.js)
- Numerous content & copy updates (German translations)
- **FoundationSection responsive fix** — banner height, card position, and card width now use `clamp()` for responsive scaling (2026-03-20)

## Pending / In Progress
- Content & Translation Finalization (ongoing, user-driven)
- Executive Retreat hero video verification (user needs hard refresh)

## Upcoming (P1 - Production)
- Point real domain (www.corneliatrompke.com) to deployment
- Replace placeholder portrait photo on About page
- Review/finalize remaining German translations in de.js
- Populate Retreats Google Sheet with real data

## Future / Backlog (P2)
- Add twitter:site meta tag (needs user handle)
- Create image/video sitemap
- Review pre-loader duration
- Refactor large page components into smaller sub-components
- Add dark nav treatment to Contact page

## Tech Stack
- Frontend: React (CRA) + Framer Motion + Tailwind CSS
- Backend: FastAPI + Google Sheets (via Apps Script)
- Data: Google Sheets (Leads, Applications, Retreats)
- Analytics: GA4 with Consent Mode v2
- Email: Google MailApp via Apps Script

## Key Files
- `/app/frontend/src/components/home/FoundationSection.jsx` — Banner/text scroll animation
- `/app/frontend/src/components/VennDiagram.jsx` — Homepage Venn diagram
- `/app/frontend/src/pages/services/ExecutiveCoaching.jsx` — Coaching page (internationalized)
- `/app/frontend/src/translations/en.js` / `de.js` — Translation files
- `/app/frontend/public/index.html` — GA4 script
- `/app/backend/.env` — Apps Script URL
