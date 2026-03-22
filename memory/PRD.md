# Cornelia Trompke Consulting & Coaching - PRD

## Original Problem Statement
Create a "Cinematic Editorial Luxury" marketing website for "Cornelia Trompke Consulting & Coaching". The website's design should be calm, minimal, and intelligent, with a specific color palette and typography.

## Product Requirements

### Design Philosophy
- Calm, minimal, intelligent, grounded
- Visual Style: "Executive Luxury" and "Nervous System Science"

### Color Palette
- Deep Forest Green: `#0F1A12`
- Warm Ivory, Soft Stone, Muted Sage, Soft Gold

### Typography
- Elegant serif for headlines (Cormorant Garamond)
- Modern sans-serif for body (Manrope, Figtree)

### Key Visuals
- Subtle, animated neural visualization motif
- Global grain texture overlay

### Pages
- Home, About, Method, Work With Me, Services, Contact
- Legal (Impressum, Privacy, Terms)

### Features
- Pre-loader
- Language switching (EN/DE)
- Context-aware contact form system
- Full-stack Google Sheets integration for contact form submissions and dynamic retreat data
- Separate application form modal for retreats
- Comprehensive SEO features including custom OG image and JSON-LD schemas
- Email notifications for form submissions
- WhatsApp integration
- GDPR-compliant cookie consent management
- Client logo ticker on homepage

---

## What's Been Implemented

### Session - March 22, 2026

#### i18n Bug Fix & Translation Completion
- **Fixed critical i18n bug**: All 4 service pages were hardcoded in English, bypassing translation system
- **Full refactoring of service pages**:
  - `OrganizationalAdvisory.jsx` - Fully translated
  - `MeditationRetreat.jsx` - Fully translated
  - `TeamFacilitation.jsx` - Fully translated
  - `ExecutiveCoaching.jsx` - Verified working
- **Translation file expansion**: Added new structures to `en.js` and `de.js`:
  - `engagement` section (The Format)
  - `forWhomDetailed` section with benefits arrays
  - `finalCta` section
- **Removed hardcoded constants**: DIMENSIONS, PROCESS_PHASES, ENGAGEMENT_ITEMS, FOR_WHOM_ITEMS now loaded from translations

### Previous Sessions
- Responsive text clipping fix (FoundationSection)
- Comprehensive German translation refinement
- Testimonial sync (EN/DE)
- American English standardization
- Content updates (headlines, taglines)
- Google Sheets integration
- GA4 with GDPR Consent Mode v2
- Cookie consent management

---

## Prioritized Backlog

### P0 - Blockers/Critical
- None currently

### P1 - Required for Production
- [ ] Review agent-generated German translations for quality/tone
- [ ] Resolve logo ticker issue (ZAHORANSKY, Riverty) - need official logo files
- [ ] Confirm Executive Retreat hero video fix
- [ ] Point real domain (`www.corneliatrompke.com`) to deployment
- [ ] Replace placeholder portrait photo on About page
- [ ] Populate Retreats Google Sheet with real data

### P2 - Nice to Have
- [ ] Add `twitter:site` meta tag (need handle)
- [ ] Create image/video sitemap
- [ ] Review pre-loader duration
- [ ] Refactor large page components into smaller section components
- [ ] Add dark nav treatment to Contact page

---

## Technical Architecture

```
/app/
├── frontend/
│   ├── public/
│   │   └── logos/
│   └── src/
│       ├── components/
│       │   ├── ui/           # Shadcn components
│       │   └── home/
│       ├── context/
│       │   ├── LanguageContext.js
│       │   ├── ContactFormContext.js
│       │   └── CookieConsentContext.js
│       ├── pages/
│       │   ├── services/
│       │   │   ├── OrganizationalAdvisory.jsx
│       │   │   ├── MeditationRetreat.jsx
│       │   │   ├── TeamFacilitation.jsx
│       │   │   └── ExecutiveCoaching.jsx
│       │   └── ...
│       └── translations/
│           ├── en.js
│           └── de.js
└── backend/
    └── server.py
```

## 3rd Party Integrations
- Google Sheets via Google Apps Script
- Google Analytics 4 (GA4) with GDPR Consent Mode v2
- Google MailApp (via Apps Script) for email notifications

## Key Files of Reference
- `/app/frontend/src/translations/de.js` - German translations
- `/app/frontend/src/translations/en.js` - English translations
- `/app/frontend/src/pages/services/OrganizationalAdvisory.jsx`
- `/app/frontend/src/context/LanguageContext.js`
