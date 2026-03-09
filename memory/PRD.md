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
- **SVG Venn Diagram** (homepage): Two text-keyword circles rotating at different speeds
  - Keywords form the circle edges (no stroke/fill), 12px Manrope, letterSpacing 3.5
  - CW sweep paths — text reads left-to-right at top of each circle
  - Three-layer SVG masking for interlocking chain-link illusion
  - "Executive" italic label at left circle centre, "Advisory" at right circle centre
  - CT logo mark (SVG feColorMatrix black-bg removal filter) at intersection centre
  - Twisted loop arrow: self-intersecting teardrop cubic bezier (P0=P3) + downward S-curve tail
  - Arrow: #C8A96A Gold, strokeWidth 2.2, open chevron arrowhead, scroll-triggered
  - Rotation: 60s CW (left), 48s CCW (right) — meditative, unhurried feel
  - Hover on circles pauses orbit animation
  - Background: bg-ivory (merges seamlessly with Philosophy section)
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

### v1.4 (Services Section Redesign + CTA + Fixes — Mar 2026)
- Services section background changed from bg-stone → bg-charcoal (continues from About Preview)
- Replaced vertical list with horizontal accordion: 4 columns, thin ivory/10% dividers, rotated serif titles when collapsed
- On hover: column expands (flex 1→3.5, 0.65s cubic-bezier), editorial layout fades in — number overline, large headline, description, rounded CTA pill
- Each service has a dedicated CTA routing to its page
- About Preview ("Cornelia Trompke") CTA: updated to pill style (border-radius 8px, padding 10px 22px), icon removed
- Venn chevron clip fix: SVG H extended 620→650 so polygon bottom (y≈630) is fully visible
- Homepage services section padding removed (paddingTop 72px → 30px on Philosophy section)

### v1.3 (Venn Diagram — Arrow & Logo Fix — Mar 2026)
- Fixed CT logo rendering: switched from external URL to local `/ct-logo-mark.png`; logo already has RGBA transparency so feColorMatrix filter removed entirely
- Replaced procedural SVG path arrow with the client-provided `Venn arrow.svg` asset:
  - Two SVG paths inlined directly (no external image request)
  - Recoloured from navy #15305B → gold #C8A96A to match brand palette
  - Vertically flipped via `scale(0.183, -0.183)` so the chevron faces downward toward the heading
  - Scaled and centred at INT_X=500 within SVG viewBox (arrow occupies y=286→607)
  - SVG viewport height extended from H=490 to H=620 to accommodate the taller arrow
  - Retains Framer Motion scroll-triggered opacity fade-in (0→0.88, 1.6s, delay 0.4s)

### v1.2 (Venn Diagram Section — Feb 2026)
- Replaced scrolling marquee with an interactive SVG Venn diagram
- Two overlapping circles: Left = executive/leadership keywords, Right = methodology keywords
- Keywords orbit each circle at different speeds (CW/CCW) via CSS animation
- Hover state: rotation pauses; arrow emerges pointing toward the heading
- Intersection zone labelled with CT logo mark (Cormorant Garamond italic "Executive"/"Advisory" labels)
- Mobile fallback: original scrolling marquee preserved for smaller screens
- New component: `/app/frontend/src/components/VennDiagram.jsx`


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
- [x] Venn Diagram complete redesign (SVG text-circles, interlocking masking, Gold arrow)
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

1. Get user sign-off on TransformationSection scroll animation (verified 100% passing — Mar 2026)
2. Replace all placeholder content with final copy
3. Upload Cornelia's real portrait photo
4. Update WhatsApp number and legal details
5. Configure custom domain
6. Optionally add Calendly booking integration

## Changelog

### FoundationSection — Layout Fixes + Gold Heading (Mar 2026)
- Sub-container offset `top: 80px` (NAV_H) so banner starts below fixed nav — no overlap
- Circle: fixed 260px x 260px; Square: fixed 225px x 225px (back to editorial scale)
- Card positioned at `top: 305px` = 45px overlap below banner bottom — editorial float effect restored
- Heading: warm gold gradient `linear-gradient(160deg, #121212 30%, #3D2916 100%)` with WebkitBackgroundClip for subtle warmth
- Outer section: `height: 300vh` — scroll driver giving ~1600px of animation range
- Inner div: `position: sticky, top: 0, height: 100vh` — content pins to viewport for full duration
- Images assemble in first ~60% (fp 0.0–0.58), card rises at fp [0.50, 0.70], text cascades at fp [0.68–0.97]
- Heading uses negative-y (drops from above, clips via overflow:hidden); paragraphs use positive-y (slide up from below)
- Gold particle canvas at z-index 10 — floats over all elements, clearly visible

### About Section — SVG Arc Divider (Mar 2026)
- Replaced circular CSS blob with an SVG cubic-bezier arc divider
- SVG `viewBox="0 0 100 100"` with `preserveAspectRatio="none"` scales to fill section
- **Ivory fill path:** `M 0 0 L 100 0 L 100 48 C 60 52, 25 78, 0 88 Z` — upper region
- **Gold arc stroke:** `M 0 88 C 25 78, 60 52, 100 48` — `strokeWidth="1.5"`, `strokeOpacity="0.55"`, `vectorEffect="non-scaling-stroke"`
- Arc sweeps from lower-left (y≈88%) diagonally to upper-right (y≈48%) with gentle cubic curve
- Text content (left column) fully covered by ivory zone ✓
- Portrait (right column) sits against arc boundary — charcoal visible in lower section area ✓
- Removed `.about-blob` CSS class from App.css (no longer needed)

### Testimonials Section Redesign (Mar 2026)
- Background changed to charcoal (#121212)
- Glassmorphic card: left portrait image (cross-fade) + right quote text (vertically centred)
- Thumbnails below card — active floats up with gold ring, title text below each portrait
- Auto-advance every 5s with progress bar; resets on click

### Final CTA — Glassmorphic Wrapper (Mar 2026)
- Gold-tinted glass card with corner accent lines and inner radial shimmer
- NeuralCanvas background, section stays charcoal

### Brand Logo Ticker (Mar 2026)
- Infinite marquee below hero: Microsoft, Google, Amazon, Apple, Meta, Netflix, Tesla, BMW, Siemens, SAP
- `brightness(0)` filter → clean black marks on ivory at 22% opacity, 70s loop speed

### TransformationSection Rewrite (Mar 2026)
- Removed `backdrop-filter` to fix ghost dot rendering at opacity=0
- Circle 1 now visible immediately on section entry (opacity starts at 1)
- Circle size 450px, heading 24-30px, subtext 14-18px
- Wavy SVG connector lines, L/R/L/R alternating positions, slower animations
- Final all-4 scene: staggered small circles (text below) at [60,230,150,350]px offsets, 60px gap
- SVG nerve line split into 3 separate segments (seg12, seg23, seg34)
- Section height: 500vh (4 individual + 1 final)
- 100% test pass rate confirmed by testing agent
