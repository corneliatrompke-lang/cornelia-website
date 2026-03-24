# Cornelia Trompke Consulting & Coaching - PRD

## Original Problem Statement
Create a "Cinematic Editorial Luxury" marketing website for "Cornelia Trompke Consulting & Coaching". The website's design should be calm, minimal, and intelligent, with a specific color palette and typography.

## Design Philosophy
- **Visual Style:** "Executive Luxury" meets "Nervous System Science"
- **Tone:** Calm, minimal, intelligent, grounded
- **Color Palette:** Deep Forest Green (#0F1A12), Warm Ivory, Soft Stone, Muted Sage, Soft Gold
- **Typography:** Elegant serif for headlines, modern sans-serif for body

## Core Requirements
- Pre-loader animation
- Language switching (EN/DE)
- Context-aware contact form system
- Google Sheets integration for form submissions and retreat data
- Separate application form modal for retreats
- Comprehensive SEO (custom OG image, JSON-LD schemas)
- Email notifications for form submissions
- WhatsApp integration
- GDPR-compliant cookie consent
- Client logo ticker on homepage

## Pages
- Home
- About
- Method (How I Work)
- Work With Me
- Services (Executive Coaching, Organizational Advisory, Meditation Retreats, Leadership Facilitation)
- Contact
- Legal (Impressum, Privacy, Terms)

## Tech Stack
- **Frontend:** React with Framer Motion
- **Backend:** FastAPI
- **Database:** Google Sheets (via Google Apps Script)
- **Analytics:** GA4 with GDPR Consent Mode v2
- **Email:** Google MailApp (serverless via Apps Script)

---

## Implementation Status

### Completed Features ✓
- [x] Full website structure with all pages
- [x] Bilingual support (EN/DE) with language toggle
- [x] Pre-loader animation
- [x] Cookie consent management (GDPR compliant)
- [x] Contact form with Google Sheets integration
- [x] Retreat application form modal
- [x] SEO implementation (meta tags, OG image, JSON-LD)
- [x] WhatsApp integration
- [x] Email notifications via Apps Script
- [x] Neural visualization background motif
- [x] Global grain texture
- [x] Client logo ticker (12 logos total)
- [x] Responsive design
- [x] American English spelling standardization
- [x] German translation refinement (natural phrasing)
- [x] Full i18n for all form components

### Logo Ticker (Updated 2024-03-24)
Current logos in ticker:
1. Metro AG
2. Metro.digital
3. Tom Tailor
4. KWS
5. Beiersdorf
6. A. Lange & Söhne
7. Fashion Digital
8. Unite
9. Otto Krahn Group (.png)
10. Otto (.webp) - NEW
11. Riverty - NEW
12. ZAHORANSKY - NEW

---

## Pending Tasks

### P1 - Required for Production
- [ ] Point domain (www.corneliatrompke.com) to deployment
- [ ] Replace placeholder portrait photo on About page
- [ ] Populate Retreats Google Sheet with real data
- [ ] Verify desktop hero video on Executive Retreat page (user verification pending)

### P2 - Nice to Have
- [ ] Add twitter:site meta tag (needs user's handle)
- [ ] Create image/video sitemap for better media indexing
- [ ] Review pre-loader duration with user
- [ ] Refactor large page components (Home.jsx, service pages)
- [ ] Add dark nav treatment to Contact page

---

## 3rd Party Integrations
| Service | Status | Notes |
|---------|--------|-------|
| Google Sheets | Active | Form submissions + retreat data |
| Google Analytics 4 | Active | With GDPR Consent Mode v2 |
| Google MailApp | Active | Email notifications via Apps Script |

---

## Key Files Reference
- `/app/frontend/src/translations/en.js` - English translations
- `/app/frontend/src/translations/de.js` - German translations
- `/app/frontend/src/pages/Home.jsx` - Homepage with logo ticker
- `/app/frontend/public/logos/` - Client logo assets
- `/app/frontend/src/components/` - Shared components

---

*Last updated: 2024-03-24*
