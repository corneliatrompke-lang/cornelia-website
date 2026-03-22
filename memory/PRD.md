# Cornelia Trompke Consulting & Coaching - Website PRD

## Original Problem Statement
Create a "Cinematic Editorial Luxury" marketing website for "Cornelia Trompke Consulting & Coaching" - Executive coaching and organizational advisory services.

## Core Requirements
- **Design Philosophy:** Calm, minimal, intelligent, grounded
- **Visual Style:** "Executive Luxury" and "Nervous System Science"
- **Color Palette:** Deep Forest Green (#0F1A12), Warm Ivory, Soft Stone, Muted Sage, Soft Gold
- **Typography:** Elegant serif (Cormorant Garamond) for headlines, modern sans-serif (Manrope, Figtree) for body
- **Languages:** English and German (full i18n support)

## Pages
- Home, About, Method (How I Work), Work With Me, Services (4 sub-pages), Contact, Legal (Impressum, Privacy, Terms)

## Key Features
- Pre-loader with language switching (EN/DE)
- Context-aware contact form system
- Google Sheets integration for form submissions
- Email notifications via Google Apps Script
- WhatsApp integration
- GDPR-compliant cookie consent
- GA4 with Consent Mode v2
- Full SEO with JSON-LD schemas

## Architecture
```
/app/
├── frontend/ (React + Tailwind)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── translations/ (en.js, de.js)
│   │   └── context/
│   └── public/
└── backend/ (FastAPI)
```

## What's Been Implemented

### Session: March 22, 2026
**Internationalization Fixes:**
- ✅ Fixed Method.jsx German runtime error - added missing translation keys (whatWeDo, benefits, accordion, combined)
- ✅ Updated OrganizationalAdvisory.jsx to use translations for hero, premise, dimensions, and process sections
- ✅ Extended German translations (de.js) with comprehensive content for Method and OrganizationalAdvisory pages
- ✅ Extended English translations (en.js) to match structure

**Content Updates:**
- ✅ Updated "How I Work" section CTA text - removed "no agenda, no pressure" and "real" as per user feedback

### Previous Sessions
- Comprehensive German translation refinement
- American English standardization across codebase
- Homepage responsive text clipping fix
- Full Google Sheets integration
- Cookie consent system
- GA4 integration

## Prioritized Backlog

### P0 - Critical (In Progress)
1. **Complete Service Pages i18n:**
   - OrganizationalAdvisory.jsx - forWhom, format sections still have hardcoded content
   - MeditationRetreat.jsx - needs full i18n conversion (1756 lines)
   - TeamFacilitation.jsx - needs full i18n conversion

### P1 - Required for Production
- Point real domain (www.corneliatrompke.com) to deployment
- Replace placeholder portrait photo on About page
- Populate Retreats Google Sheet with real retreat data
- User verification: Hero video on Executive Retreat page

### P2 - Nice to Have
- Add twitter:site meta tag (when user provides handle)
- Create image/video sitemap
- Review pre-loader duration
- Refactor large page components into smaller sections
- Add dark nav treatment to Contact page

## 3rd Party Integrations
- Google Sheets via Google Apps Script (forms + dynamic content)
- Google Analytics 4 with GDPR Consent Mode v2
- Google MailApp for email notifications

## Known Issues
- Some sections on service pages still show hardcoded English when in German mode (MeditationRetreat, TeamFacilitation, parts of OrganizationalAdvisory)
