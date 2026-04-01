# Cornelia Trompke Consulting & Coaching - PRD

## Original Problem Statement
Create a "Cinematic Editorial Luxury" marketing website for "Cornelia Trompke Consulting & Coaching". The website's design should be calm, minimal, and intelligent, with a specific color palette and typography.

## Design Philosophy
- **Visual Style:** "Executive Luxury" meets "Nervous System Science"
- **Tone:** Calm, minimal, intelligent, grounded
- **Color Palette:** Deep Forest Green (#0F1A12), Warm Ivory, Soft Stone, Muted Sage, Soft Gold
- **Typography:** Elegant serif for headlines, modern sans-serif for body

## Core Requirements
- Pre-loader animation (removed for performance)
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
- **Frontend:** React 19 with Framer Motion (LazyMotion for tree-shaking)
- **Backend:** FastAPI
- **Database:** Google Sheets (via Google Apps Script)
- **Analytics:** GA4 with GDPR Consent Mode v2 (deferred loading)
- **Email:** Google MailApp (serverless via Apps Script)
- **Deployment:** Railway (Docker containers, Nginx for static serving)

---

## Implementation Status

### Completed Features ✓
- [x] Full website structure with all pages
- [x] Bilingual support (EN/DE) with language toggle
- [x] Cookie consent management (GDPR compliant)
- [x] Contact form with Google Sheets integration
- [x] Retreat application form modal
- [x] SEO implementation (meta tags, OG image, JSON-LD)
- [x] WhatsApp integration
- [x] Email notifications via Apps Script
- [x] Neural visualization background motif
- [x] Global grain texture
- [x] Client logo ticker (11 logos)
- [x] Responsive design
- [x] American English spelling standardization
- [x] German translation refinement (natural phrasing)
- [x] Full i18n for all form components

### Performance Optimizations (2026-04-01) ✓
- [x] Deferred PostHog loading (3s after page load) - saves ~975ms TBT
- [x] Deferred GA4 loading (1.5s after page load) - saves ~183ms TBT
- [x] LazyMotion wrapper for Framer Motion tree-shaking
- [x] RAF-throttled scroll handlers to reduce forced reflows
- [x] LCP image preload hint in HTML head
- [x] fetchPriority="high" on hero video
- [x] Video error handling with poster fallback
- [x] Simplified PostHog init (disabled autocapture, session recording)

### Logo Ticker
Current logos:
1. Metro AG
2. Metro.digital
3. Tom Tailor
4. KWS
5. Beiersdorf
6. A. Lange & Söhne
7. Fashion Digital
8. Unite
9. Otto Krahn Group
10. Riverty
11. ZAHORANSKY

---

## Pending Tasks

### P0 - Requires User Verification
- [ ] Deploy to Railway and verify PageSpeed improvements (target: 95+ desktop, 70+ mobile)

### P1 - Required for Production
- [ ] Point domain (www.corneliatrompke.com) to deployment
- [ ] Replace placeholder portrait photo on About page
- [ ] Populate Retreats Google Sheet with real data

### P2 - Nice to Have
- [ ] Add twitter:site meta tag (needs user's handle)
- [ ] Create image/video sitemap for better media indexing
- [ ] Refactor large page components (Home.jsx, service pages)
- [ ] Add dark nav treatment to Contact page

---

## 3rd Party Integrations
| Service | Status | Notes |
|---------|--------|-------|
| Google Sheets | Active | Form submissions + retreat data |
| Google Analytics 4 | Active | With GDPR Consent Mode v2 (deferred) |
| Google MailApp | Active | Email notifications via Apps Script |
| PostHog | Active | Analytics (deferred 3s, minimal config) |

---

## Key Files Reference
- `/app/frontend/src/translations/en.js` - English translations
- `/app/frontend/src/translations/de.js` - German translations
- `/app/frontend/src/pages/Home.jsx` - Homepage with logo ticker
- `/app/frontend/public/logos/` - Client logo assets
- `/app/frontend/src/components/` - Shared components
- `/app/frontend/public/index.html` - Analytics/PostHog deferred loading
- `/app/frontend/src/App.js` - LazyMotion wrapper

---

## Performance Notes
The PageSpeed issues stem primarily from:
1. **PostHog** (~184KB unused JS, ~975ms execution) - Now deferred 3s
2. **GA4/GTM** (~150KB, ~183ms execution) - Now deferred 1.5s
3. **Framer Motion** (~8.5KB unused motion-dom) - LazyMotion wrapper added
4. **Scroll handlers** causing forced reflows - RAF-throttled

After deploying these changes, re-run PageSpeed Insights to measure impact.

---

*Last updated: 2026-04-01*
