# Cornelia Trompke Consulting & Coaching — Marketing Website

## Project Overview
**Type:** Marketing Website (Luxury Editorial)
**Client:** Cornelia Trompke Consulting & Coaching, Berlin, Germany
**Built:** March 2025
**Stack:** React + FastAPI + MongoDB

---

## Problem Statement
Create a cinematic editorial luxury marketing website for Cornelia Trompke — a trauma-informed leadership development consultant working with senior executives, founders, and board members globally. The design should feel closer to elite consulting firms than a typical coaching website.

---

## Architecture

### Frontend (React)
- **Fonts:** Playfair Display (serif) + Manrope (sans-serif) + Cormorant Garamond (accent)
- **Colors:** Charcoal #121212 | Ivory #F5F2EC | Stone #E3DED7 | Sage #7C8C82 | Gold #C8A96A
- **Animations:** framer-motion scroll reveals, neural canvas (canvas API)
- **Routing:** React Router v7

### Backend (FastAPI)
- **Database:** MongoDB
- **Endpoints:** POST/GET /api/contact, POST/GET /api/status

---

## Pages Implemented

| Page | Route | Status |
|------|-------|--------|
| Home | / | ✅ |
| About Cornelia | /about | ✅ |
| The Method | /method | ✅ |
| Work With Me (overview) | /work-with-me | ✅ |
| 1:1 Executive Coaching | /work-with-me/executive-coaching | ✅ |
| Executive Meditation Retreat | /work-with-me/meditation-retreat | ✅ |
| Leadership Team Facilitation | /work-with-me/team-facilitation | ✅ |
| Organisational Transformation Advisory | /work-with-me/organisational-advisory | ✅ |
| Contact / Apply | /contact | ✅ |
| Legal (Impressum/Privacy/TOS) | /legal | ✅ |

---

## Key Features Implemented

### Design System
- Cinematic Editorial Luxury visual language
- Playfair Display serif headlines + Manrope body copy
- Dark/light section contrast (charcoal ↔ ivory ↔ stone)
- 120-160px vertical section spacing
- Narrow editorial text blocks (650-750px)
- Asymmetric 12-column grid layouts

### Animations & Motion
- Preloader with CT logo mark + progress bar (~2.5s)
- Neural network canvas background (custom canvas API, gold nodes + connections)
- Scroll-reveal animations (framer-motion useInView)
- Smooth hover transitions on all interactive elements
- Scrolling marquee ticker

### Navigation
- Sticky glassmorphism nav (transparent → dark on scroll)
- CT logo mark + brand name
- Work With Me dropdown with all 4 services
- EN/DE language switcher (bilingual content)
- Full-screen mobile menu overlay

### Content
- Full bilingual EN/DE content for all pages
- Professional placeholder copy for all sections
- Testimonials with navigation dots
- Service format tables (label/value pairs)

### Contact & Backend
- Contact form: name, email, organisation, role, message
- POST /api/contact stores to MongoDB
- WhatsApp direct link button
- Contact info sidebar (location, languages, response time)

### Legal
- Tabbed interface: Impressum / Privacy Policy / Terms
- GDPR-compliant privacy policy structure
- German business address and regulatory compliance

---

## User Personas

1. **C-Suite Executive** — Seeking trusted advisor for personal development
2. **Founder** — Navigating transition from founder-led to leadership-led org
3. **HR/Org Dev Leader** — Evaluating Cornelia for team facilitation or org advisory

---

## Core Requirements (Static)
- Cinematic luxury feel — NOT a startup or SaaS website
- EN/DE bilingual throughout
- Neural network motif (subtle, artistic)
- Contact form + WhatsApp
- German legal compliance (Impressum)
- Mobile responsive

---

## What's Been Implemented (March 2025)

### v1.1 (Homepage & Nav Update)
- Navigation redesigned: 3-zone layout (logo left | glassmorphic pill center | lang+CTA right)
- Hero section: rounded card wrapper (20px radius) with atmospheric background image
- Hero text repositioned to bottom-left with pill-style CTAs
- New button styles: btn-hero-pill, btn-hero-pill-outline, nav-cta-pill, nav-pill-link
- Scroll indicator moved to bottom-right of hero card
- Complete 10-page website with all routes
- Full bilingual EN/DE translations
- Luxury editorial design system
- Neural canvas animation (custom)
- Preloader with CT logo
- Contact form → MongoDB
- WhatsApp button
- Legal page (Impressum/Privacy/TOS)
- 100% test pass rate

---

## Prioritized Backlog

### P0 (Must Have — Pre-Launch)
- [ ] Replace placeholder copy with final client copy
- [ ] Replace portrait placeholder with real Cornelia photo
- [ ] Update WhatsApp number (currently placeholder 49030000000)
- [ ] Update Impressum with full legal address and VAT number
- [ ] Domain and DNS setup
- [ ] Add real client logos for social proof section

### P1 (Soon After Launch)
- [ ] Add a client logo strip (companies Cornelia has worked with)
- [ ] Blog / Insights section
- [ ] Calendar booking integration (Calendly)
- [ ] Email notification when contact form is submitted
- [ ] SEO meta tags for all pages
- [ ] Google Analytics / privacy-compliant analytics

### P2 (Nice to Have)
- [ ] Video background option for hero
- [ ] PDF brochure download
- [ ] Newsletter signup
- [ ] Testimonials page with full quotes
- [ ] Case studies section

---

## Next Tasks

1. Replace all placeholder content with final copy
2. Upload Cornelia's real portrait photo
3. Update WhatsApp number and legal details
4. Configure custom domain
5. Optionally add Calendly booking integration
