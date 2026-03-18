# Cornelia Trompke Consulting & Coaching — Marketing Website

## Project Overview
**Type:** Marketing Website (Luxury Editorial)
**Client:** Cornelia Trompke Consulting & Coaching, Berlin, Germany
**Built:** March 2025 → ongoing
**Stack:** React + FastAPI + MongoDB

---

## Problem Statement
Create a cinematic editorial luxury marketing website for Cornelia Trompke — a trauma-informed leadership development consultant working with senior executives, founders, and board members globally. The design should feel closer to elite consulting firms than a typical coaching website.

---

## Architecture

### Frontend (React)
- **Fonts:** Playfair Display (serif) + Manrope (sans-serif) + Cormorant Garamond (accent)
- **Colors:** Deep Forest Green #0F1A12 | Ivory #F5F2EC | Stone #E3DED7 | Sage #7C8C82 | Gold #C8A96A
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

### Interactive Form System (COMPLETE — All Pages)
- **Hero CTA → Glassmorphic Panel:** Clicking the hero CTA on any page slides in a glassmorphic form panel in the right column of the hero section. ✅ All pages (Home, About, Method, all 4 service pages).
- **Final CTA → In-Place Transform:** Clicking the CTA in the bottom section of any page transforms the card in-place using AnimatePresence (no modal/navigation). ✅ All pages.
- **Intermediate CTAs:** "For Whom" section CTAs on Organizational Advisory and Team Facilitation pages also trigger the form. ✅
- **Method Page Video Hero:** Replaced static image with responsive videos (.mov desktop / .mp4 mobile). ✅
- **Testimonials Text-Only (All Pages):** All testimonial sections use text-based navigation (no portrait images). ✅ Including MeditationRetreat (was using old portrait design — now fixed Feb 2026).

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

## What's Been Implemented (March 2026)

### v2.3 — Navigation & URL Slug Refactor (Mar 2026)
1. **Header — "Contact / Apply" removed** from the middle nav pill links. Desktop nav now ends with the "Work With Me" dropdown.
2. **Header CTA copy** changed from `{t.nav.contact}` ("Contact / Apply") to new `t.nav.cta` key ("Begin an Enquiry" / "Anfrage starten" in DE). CTA is action-oriented and distinct from nav.
3. **Service names updated** in en.js, de.js:
   - "1:1 Executive Coaching" → "Executive Coaching & Advisory"
   - "Executive Meditation Retreat" → "Executive Retreats"
   - "Leadership Team Facilitation" → unchanged
   - "Organisational Transformation Advisory" → "Organizational Advisory for People & Culture Transformation"
4. **URL slugs cleaned** — removed `/work-with-me/` prefix from all service page routes:
   - `/executive-coaching`, `/executive-retreats`, `/leadership-team-facilitation`, `/organizational-advisory`
   - Old `/work-with-me/*` routes kept as fallbacks (backward compatibility)
5. **Method.jsx** 3 hardcoded service links updated to new slugs.
6. **Navigation `isServicesActive`** updated to match both `/work-with-me` and new root-level service slugs.

### v2.2 — OrganizationalAdvisory Layout Fixes (Mar 2026)
1. **Equal-Length Dividers in "The Work" (Three Dimensions) section:** Root cause was `borderRight` applied to inner `<div>`s inside `ScrollReveal` wrappers — those only span content height, not cell height. Fix: changed the CSS grid from `"1fr 1fr 1fr"` to `"1fr 1px 1fr 1px 1fr"` and added dedicated `1px`-wide separator `<div>`s as grid children. CSS Grid's default `align-items: stretch` makes them naturally span the full row height, creating visually equal dividers.
2. **"The Process" section — Horizontal Accordion:** Replaced the static 3-column grid with the hover-expand accordion pattern from `TeamFacilitation.jsx`'s "The Work" section. Fixed height `420px`, each phase collapses to a rotated vertical title + faint number, expands on hover to reveal full content. Added `activePhase` state.

### v2.1 — Deep Forest Green Theme + Bug Fixes (Mar 2026)
1. **Bug Fix: Hero CTA Buttons** — Replaced `flex flex-col sm:flex-row` Tailwind responsive classes with inline flex styles. Buttons always render in a horizontal row. (Home.jsx + About.jsx)
2. **Bug Fix: Foundation Section Duplicate Text** — Replaced `hidden md:block` / `md:hidden` CSS classes with JS-based `isDesktop` state (`useState` + `useEffect` with `window.innerWidth`). Eliminates CSS specificity conflict causing dual-render of mobile + desktop layouts simultaneously. Also added `position: relative` to all `overflow: hidden` animation wrappers for reliable transform clipping. (FoundationSection.jsx)
3. **Deep Forest Green Theme — Site-wide:** Replaced `#121212` (charcoal) with `#0F1A12` (deep forest green) across all dark backgrounds. Replaced warm amber gradient intermediaries with forest green equivalents:
   - Ivory → Dark gradient: `#F5F2EC → #CDD8C4 → #8A9A80 → #2A3825 → #162018 → #0F1A12`
   - Dark → Ivory gradient: `#0F1A12 → #162018 → #2A3825 → #8A9A80 → #CDD8C4 → #F5F2EC`
   - Files updated: `About.jsx`, `Method.jsx`, `ExecutiveCoaching.jsx`, `index.css` (body background)
4. **About Page Final CTA:** Changed from solid charcoal (`bg-charcoal`) to forest green → ivory gradient, creating a seamless transition into the ivory footer. Glassmorphic card updated from `rgba(200,169,106,0.06)` to `rgba(15,26,18,0.60)` for better contrast on the gradient background.
5. **Preloader Fix:** Rewrote timer logic using `useLayoutEffect` (synchronous, not deferred by React scheduler) with both timers set at mount time. Removed `AnimatePresence mode="wait"` from `App.js`. Memoized `handleComplete` callback with `useCallback` to prevent effect cleanup cancellation on re-renders. Preloader duration reduced to 1.5s (from 2.6s) + 0.4s exit animation.
6. **Body Background:** Updated `index.css` body background from `#121212` to `#0F1A12`.

### v2.0 — About Page Complete Rebuild (Mar 2026)
Full About.jsx redesign with 7-section page flow:
1. **Hero** — rounded card, parallax bg (same pattern as Home/Method/Coaching), portrait placeholder, CTAs
2. **Origin Story** — ivory bg, 3-milestone editorial horizontal timeline (Corporate Leadership → Org Development → Executive Coach), gold connector line + dots
3. **Philosophy** — ivory bg, 3 bold statements in two-column rows (italic Cormorant left, explanatory Manrope right), hairline dividers
4. **Credentials** — full-section gradient `#F5F2EC → warm amber → #121212` as visual bridge, 4-column horizontal credential row
5. **Approach + Values** — charcoal bg, exact horizontal accordion from Homepage (4 items: Selective Engagement, Confidential Container, Bespoke Process, Integrity Above All)
6. **Testimonials** — charcoal bg, identical glassmorphic slideshow + thumbnail navigation from Home/Method
7. **Final CTA** — charcoal bg with NeuralCanvas background
- Translations fully updated (en.js + de.js): replaced `bio` + old `philosophy` with `originStory`, `philosophy.statements[]`, `approach.items[]`

### v1.4 (Services Section Redesign + CTA + Fixes — Mar 2026)

- Services section background changed from bg-stone → bg-charcoal (continues from About Preview)
- Replaced vertical list with horizontal accordion: 4 columns, thin ivory/10% dividers, rotated serif titles when collapsed
- On hover: column expands (flex 1→3.5, 0.65s cubic-bezier), editorial layout fades in — number overline, large headline, description, rounded CTA pill
- Each service has a dedicated CTA routing to its page
- About Preview ("Cornelia Trompke") CTA: updated to pill style (border-radius 8px, padding 10px 22px), icon removed
- Venn chevron clip fix: SVG H extended 620→650 so polygon bottom (y≈630) is fully visible
- Homepage services section padding removed (paddingTop 72px → 30px on Philosophy section)

### v1.9 (Method Page — Layout & Benefits Redesign — Mar 2026)
- Section 2 (Two Methodologies) grid: changed from `1fr 1fr` → `3fr 7fr` so Venn diagram occupies 70% width; heading text column narrowed to 30%
- Section 2 padding reduced: `paddingBottom: 60px` override (was ct-section default 140px)
- Section 3 (Benefits): removed `borderTop` divider; `paddingTop: 60px` override tightens gap from Section 2
- Benefits section redesigned from static 4-box grid → horizontal hover-to-reveal accordion matching the Home services pattern:
  - Collapsed: rotated serif title + faint number at bottom (charcoal on ivory)
  - Hover: column expands (flex 1→3.5, 0.65s cubic-bezier), editorial layout fades in — sage number overline, large heading, description body
  - `activeBenefit` state added to Method component


- `VennDiagram.jsx` extended with 3 new props: `showLogo` (bool, default true), `showArrow` (bool, default true), `staticView` (bool, default false)
- `staticView=true`: no 280vh sticky wrapper; circles animate from off-screen to final positions via `useInView` + rAF cubic-ease-out when section enters viewport; unique clipPath/mask IDs to avoid DOM collisions when both Venns exist on the same page
- Method page Section 2 redesigned as two-column: left = overline/headline + NARM card + Integral card; right = `<VennDiagram showLogo={false} showArrow={false} staticView={true} />` in dark rounded container
- Home page `<VennDiagram />` (no props) unchanged — scroll-driven mode still works correctly

### v1.7 (Method Page — Full Build — Mar 2026)
Complete 9-section Method page built from scratch:
1. Hero (same rounded card + parallax BG as Home) — cinematic woman-at-window image
2. The Two Methodologies — NARM dark card / Integral Coaching light card side-by-side
3. High-Level Benefits — 4-column grid with large gold numbers (01–04)
4. Accordion — 3 audience panels (Executives / Teams / Orgs) with AnimatePresence expand, gradient ivory→charcoal BG
5. Testimonials — exact Home.jsx carousel (glassmorphic card, portrait, quote, dot nav)
6. What is NARM — deep text + staggered 5-layer NARM diagram (Biological→Psychological→Relational→Identity→Expression)
7. What is Integral Coaching — deep text + 4 bordered key-point cards
8. Combined Power — 3-column card comparison (NARM / Integral / Together), gradient charcoal→ivory
9. Final CTA — centered ivory with Begin the Conversation pill
Footer (from shared Footer component)
- Translations expanded in en.js: whatWeDo, benefits, accordion, narm (with diagramLayers), integral, combined sections

### v1.6 (About Gradient + Hero Parallax — Mar 2026)
- **About Preview section**: removed SVG dome design; replaced with seamless CSS gradient `#F5F2EC → warm taupe → warm brown → #121212` for a cinematic ivory-to-charcoal transition
- Portrait: removed `grayscale(40%)` filter — shows in full colour against the warm gradient
- **Hero parallax**: added `useScroll` + `useTransform` (framer-motion) on hero container ref; background image is now `motion.img` with `height: "115%"` and Y drift `0% → -12%` as hero scrolls out of viewport — cinematic slow drift
- Fixed: `motion` import was missing from Home.jsx (critical crash fix, v1.5)

### v1.5 (Venn Diagram — Off-Screen Slide-In — Mar 2026)
- LX_START changed from 80 → -220 (circle fully off-screen left)
- RX_START changed from 920 → 1220 (circle fully off-screen right)
- "NARM" and "Integral Coaching" labels separated from labelOpacity group → always visible, track circle centers (lx/rx state), slide in with the circles
- CT logo mark still fades in only when circles fully converge (labelOpacity group)
- Fixed critical bug: `motion` import was missing from Home.jsx (caused "motion is not defined" runtime crash)

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

### v2.9 — Method Page Mobile Foundation Fix (Mar 2026)
- **Bug Fix: "Two Methodologies" section mobile layout** — The Venn Diagram div had `gridColumn: 2` hard-coded, forcing CSS Grid to create a phantom second column on mobile even with `gridTemplateColumns: "1fr"`. Fixed by conditionally rendering the Venn Diagram: on mobile it appears inline after the intro paragraph (inside col 1), on desktop it remains in grid column 2. Result: clean single-column flow on mobile: heading → intro paragraph → Venn Diagram → METHODOLOGY ONE.

### v3.9 — Retreat Application Modal (Mar 2026)
- **RetreatApplicationForm.jsx** (new): Name, Email, Phone, Retreat dropdown (pre-selected from clicked card, changeable to any visible retreat), T&C checkbox, Message, Submit
- **RetreatApplicationModal.jsx** (new): Glassmorphic modal wrapper (zIndex 1100), matching ContactFormModal aesthetic
- **ContactFormContext.jsx** updated: added `openApplicationForm(retreat, allRetreats)`, `closeApplicationForm`, `applicationModalOpen`, `selectedRetreat`, `availableRetreats` state
- **MeditationRetreat.jsx**: Apply button now calls `openApplicationForm(retreat, upcomingRetreats)` instead of the general contact form
- **App.js**: Added `<RetreatApplicationModal />` globally rendered alongside `<ContactFormModal />`
- **google_apps_script.js** updated: `doPost` now routes payload to `Applications` tab (new sheet) when `retreat_id` is present, otherwise routes to `Leads` tab as before
- Applications tab columns: Timestamp | Name | Email | Phone | Retreat ID | Retreat Title | Retreat Date | Retreat Location | T&C Agreed | Notes | Status
- **Tested**: 100% pass rate (iteration_21.json), all 15 test cases

### v4.0 — GDPR / DSGVO Cookie Consent (Mar 2026)
- **CookieConsentContext.jsx** (new): manages consent state in localStorage (`ct-cookie-consent`), 2800ms banner delay (post-preloader), acceptAll / rejectAll / saveCustom / openSettings
- **CookieBanner.jsx** (new): floating bottom banner — equal-weight "Reject All" + "Accept All" + "Manage Preferences" link; EN/DE bilingual; `learn more` links to /privacy
- **CookieSettingsModal.jsx** (new): 3 category toggles — Essential (always-on, locked), Analytics (opt-in), Marketing (opt-in); 3 action buttons (Reject All / Save Preferences / Accept All)
- **Footer.jsx**: "Cookie Settings" button always accessible in legal bar (GDPR requirement to allow withdrawal of consent)
- **LanguageContext.js** (bug fix): added `language: lang` alias so EN/DE switching works correctly in cookie components
- **Tested**: 100% pass rate (iteration_22.json), all 16 tests including German text, localStorage persistence, backdrop/X close, toggle interactions

### v4.3 — Privacy Policy Updated (Mar 2026)
- **EN & DE:** Full 5-section privacy policy rendered via translations (not hardcoded): General Information, Controller, Hosting & Infrastructure (Emergent), Contact via Email, Your Rights
- **Files changed:** `legal/PrivacyPolicy.jsx`, `translations/en.js`, `translations/de.js`

### v4.2 — Impressum Page Updated with Real Legal Data (Mar 2026)
- **EN:** Legal Notice / Information according to § 5 TMG / Full address (Stargarder Str. 36, 10437 Berlin) / Phone +49 (0) 162 2363466 / Email info@corneliatrompke.com / VAT ID DE325822364 / Editorial responsibility per § 18 MStV / EU Dispute Resolution with ODR link
- **DE:** Impressum / Angaben gemäß § 5 TMG / Full German address / Telefon 0162-2363466 / Umsatzsteuer-ID DE325822364 / Redaktionell verantwortlich / EU-Streitschlichtung
- **Files changed:** `legal/Impressum.jsx` (new layout), `translations/en.js` + `translations/de.js` (impressum section expanded)

### v4.1 — A.Lange & Söhne Logo Fix (Mar 2026)
- **Issue:** Previous `a-lange-soehne.webp` had a black background, causing it to render as a solid black box in the ivory ticker due to `mix-blend-mode: multiply` incompatibility.
- **Fix:** Replaced with new client-provided PNG (`10gzvm2e_A.-Lange-and-Sohne-logo.png`). The new PNG already has a transparent background with dark gray text (~RGB 35,35,35), which renders correctly with `mix-blend-mode: multiply` on the ivory ticker background.
- **Files changed:** `Home.jsx` (updated src reference from `.webp` to `.png`), `public/logos/a-lange-soehne.png` (new file replacing old webp).

## Next Tasks

1. ~~Wire nav "BEGIN THE WORK" button to open contact form globally (React Context) (P0)~~ ✅ Done
2. ~~Replace service page CTAs to trigger the contact form (P0)~~ ✅ Done
3. Build "Work With Me" landing page at `/work-with-me` (P1)
4. Add WhatsApp floating button (P2)
5. Wire contact form to `/api/contact` backend endpoint (P3)
6. Replace placeholder copy with final client copy (P0)
7. Upload Cornelia's real portrait photo (P0)
8. Update WhatsApp number and legal details (P0)
9. Configure custom domain (P0)
10. Refactor large page components into smaller section components (P2)
11. Optionally add Calendly booking integration (P1)

### v3.6 — JSON-LD Structured Data (Mar 2026)
- **All 10 pages** have JSON-LD: `Organization` + `WebSite` + `WebPage` (homepage), `Person` with credentials (About), `WebPage` + topic subjects (Method), `ItemList` (Work With Me), `Service` + `BreadcrumbList` (all 4 service pages), `ContactPage` (Contact), `WebPage` (Legal)
- **SEOHead.jsx** updated to accept optional `jsonLd` prop, rendered as `<script type="application/ld+json">`
- **`<html lang="en">`** confirmed in index.html


- **send_from hidden field**: `openForm(serviceId, sendFrom)` signature; each CTA passes page name; Navigation CTA derives page from `useLocation()`; hidden `<input name="send_from">` in all form variants; submission payload logs `send_from` (ready for backend)
- **Meta tags**: Installed `react-helmet-async@3.0.0`; `SEOHead.jsx` component; `HelmetProvider` in `App.js`; unique title + description + Open Graph tags on all 10 pages
- **Favicon**: Downloaded CT Logo Mark PNG → `/public/favicon.png`; referenced in `index.html` and as Apple Touch Icon; `theme-color` updated to `#0F1A12`
- **sitemap.xml**: All 10 pages at `corneliatrompke.com` with `changefreq` and `priority`
- **robots.txt**: Allows all bots, disallows `/api/`, references Sitemap
- **llms.txt**: Full AI-readable site description with service summaries, methodology, key facts
- **Tested**: 100% pass, all 11 tests (iteration_13.json) — send_from values confirmed, SEO titles confirmed, all static files 200


- **Scope**: All pages except About rewritten with bold, warm, welcoming, insightful + SEO-friendly tone
- **en.js**: Complete rewrite of `home`, `method`, `workWithMe`, `services` (all 4), `contact`, `legal`, `footer` sections; `about` kept untouched
- **Service page hardcoded arrays updated**:
  - `ExecutiveCoaching.jsx`: PHASES, WHAT_SHIFTS, FOR_WHOM_ITEMS, "What You Receive" descriptions
  - `OrganizationalAdvisory.jsx`: DIMENSIONS, PROCESS_PHASES, ENGAGEMENT_ITEMS, FOR_WHOM_ITEMS, pull quote, body paragraphs, section headlines
  - `TeamFacilitation.jsx`: PROCESS_PHASES, WORK_ADDRESSES, FOR_WHOM_ITEMS, OUTCOME_ROWS, pull quote, body paragraphs, section headlines
  - `MeditationRetreat.jsx`: WHAT_OPENS, EXPERIENCE_ELEMENTS, TIMELINE_DAYS, pull quote, body paragraphs
- **Method.jsx**: Added `m.intro` section rendering ("Most Leadership Development Doesn't Go Deep Enough")
- **SEO keywords** naturally woven in: "executive coaching Berlin", "trauma-informed leadership", "nervous system", "NARM coaching", "leadership team facilitation", "executive retreat Germany"
- **Tested**: Frontend lint ✅, copy renders across all pages (iteration_12.json reference)


- **Root cause**: `marginTop: isNarrow ? "-210px" : undefined` on the Method Teaser section was applied to ALL screens < 1024px including mobile. On mobile, the Venn Diagram shows only a ~15px marquee ticker (not the full 200vh sticky animation), so -210px dragged the Method section 210px into the About Preview section.
- **Fix**: `marginTop: (!isMobile && isNarrow) ? "-210px" : undefined` — negative margin now only applies at tablet (768–1023px)
- **Also fixed**: `paddingTop` override now uses `isMobile ? undefined : (isNarrow ? "0" : "32px")`, restoring the ct-section's 72px default top-padding on mobile
- **Tested**: 100% pass at 390px (no overlap), 768px (Venn diagram + correct gap)


- **Escape key**: Added global `keydown` listener in `ContactFormContext.jsx` (closes modal) and in `Home.jsx` (closes hero panel + final CTA card)
- **Service pre-selection**: `openForm(serviceId)` stores `selectedService` in context; `ContactFormModal` passes it as `preselectedService` prop to `HeroContactForm`; `HeroContactForm` initializes `services` state from `preselectedService`
- **Pages updated** — all `<Link to="/contact">` replaced with `<button onClick={() => openForm(serviceId)}>`:
  - `ExecutiveCoaching.jsx` → pre-selects `'executive-coaching'`
  - `OrganizationalAdvisory.jsx` → pre-selects `'org-advisory'` (3 CTAs)
  - `TeamFacilitation.jsx` → pre-selects `'team-facilitation'` (3 CTAs)
  - `MeditationRetreat.jsx` → pre-selects `'executive-retreats'` (hero + apply cards + final CTA)
  - `About.jsx`, `Method.jsx`, `WorkWithMe.jsx` → no pre-selection
- **Route aliases added**: `/about` → `About.jsx`, `/method` → `Method.jsx`
- **100% test pass rate** (testing agent iteration_10.json)


- **`ContactFormContext`** (`/src/context/ContactFormContext.jsx`): Holds `openForm()` + `heroOpenFn`/`finalCtaOpenFn` refs. No async state — uses real-time `getBoundingClientRect()` check at click time to avoid race conditions.
- **`ContactFormModal`** (`/src/components/ContactFormModal.jsx`): Global modal rendered in `App.js` inside `ContactFormProvider`. Glassmorphic dark panel, backdrop-blur overlay, AnimatePresence enter/exit.
- **Nav CTA behavior (3 states):**
  1. Hero section ≥25% in viewport → slides in hero panel (right column of hero image)
  2. Final CTA section ≥25% in viewport → transforms the CTA card in-place
  3. All other contexts (other pages, mid-scroll) → centered modal overlay
- **Home.jsx**: Registers `heroOpenFn.current` / `finalCtaOpenFn.current` on mount; cleanup on unmount
- **Navigation.jsx**: CTA `<Link>` replaced with `<button onClick={openForm}>` (desktop + mobile menu)
- **Feature:** Final CTA section glassmorphic card now transforms in-place to show contact form when CTA button is clicked.
- **No layout change:** Card wrapper (glassmorphic bg, border, border-radius, corner accent lines, gradient background section) stays identical.
- **AnimatePresence:** `mode="wait"` cross-fades between CTA content ("Ready to Begin?" headline + button) and form content ("Start a Conversation" + all fields).
- **`motion.div` card:** Padding animates from `80px 72px` → `36px 56px 44px` to give form breathing room within the same wrapper.
- **`HeroContactForm` updated:** New `noPadding` prop strips the component's internal padding when rendered inside an already-padded container.
- **Close button:** X button in form header returns card to default CTA state (`setShowFinalForm(false)`).
- **Hero contact form styling confirmed:** 80% height, 0.25 opacity background, "Begin The Work" title removed (these were applied in the previous session and verified now).

### v2.8 — Transformation Section Tablet Refinements (Mar 2026)
- **Large individual circles (tablet)**: Reduced size from 698px → 560px (-20%); increased heading font from 22px → 30px and subtext from 14px → 16px for improved readability
- **4 Summary circles (tablet)**: Fixed CSS grid row distribution — added `alignContent: "start"` to prevent rows from stretching across full container height; added explicit `rowGap: "80px"` to control inter-row spacing; reduced visual row gap by ~65% vs original stretched layout

### v2.7 — Tablet Layout Refinements (Mar 2026)
- **About section**: Portrait image now full-width on tablet (`isMobile ? "260px" : "100%"`, maxHeight 500px on tablet); image column changes from `flex justify-center` to `block` on tablet/desktop
- **Transformation large circle**: Size increased from 465px → 700px (50% larger) on tablet (`isNarrow`)
- **Transformation summary circles**: Moved up from `top: 40%` → `top: 20%` on tablet, bringing them closer to the section header
- **Venn→Method gap**: Applied `marginTop: -210px` on Method section on tablet (`isNarrow`) — reduces gap between Venn final state and Method section title by ~70%
- Removed all ticker `borderTop`/`borderBottom` properties entirely (not just conditionally)
- FoundationSection mobile: changed from `height: auto` + `whileInView` to `height: 200vh` with `position: sticky` — now uses full scroll-driven cascade
- Added mobile-specific `useTransform` values (`mHeadingY/O`, `mPara0Y/O`, `mPara1Y/O`) tuned to 200vh scroll range (triggers at fp=0.18–0.76)
- Removed `ct-divider` horizontal line from mobile Foundation layout
- Gold particle canvas now animates during mobile scroll (same as desktop)
- **Root cause identified:** Outer `<div className="bg-[#F5F2EC]">` wrapper on `Home.jsx` caused sub-pixel rendering gaps between adjacent dark sections to expose ivory background as visible 1px lines
- **Fix:** Removed `bg-[#F5F2EC]` from Home.jsx outer wrapper. `body { background: #0F1A12 }` in `index.css` already covers the dark bg. All ivory sections (Hero, Ticker, FoundationSection, About Preview, Final CTA) retain their own explicit backgrounds
- **Also fixed (v2.4):** Brand logo ticker `borderTop`/`borderBottom` + Footer `border-t` now hidden on mobile/tablet (`isNarrow < 1024px`)

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

### v3.8 — Hero Video Background (Feb 2026)
- Replaced static Unsplash hero background image with client-provided responsive videos
- Desktop: `ihle29r5_Hero video 2 - desktop.mp4`, Mobile: `x84hoo3c_Hero video 2 - mobile.mp4`
- Implemented as `motion.video` with `autoPlay`, `muted`, `loop`, `playsInline` — no controls
- `key={isMobile ? 'hero-mobile' : 'hero-desktop'}` forces remount when viewport switches
- Existing parallax `y` drift and all overlay gradients/text content preserved
- Tested: 100% pass (iteration_15.json)

### v3.7 — Text-Only Testimonials (Feb 2026)
- **All 4 testimonial sections** redesigned to be purely text-based (no images):
  - Deleted `TESTIMONIAL_PORTRAITS` arrays from `Home.jsx`, `ExecutiveCoaching.jsx`, `OrganizationalAdvisory.jsx`, `TeamFacilitation.jsx`
  - Removed portrait image column (left 38% of card) from desktop layout — testimonial card now full-width
  - Replaced circular thumbnail nav buttons with elegant text-based author name + company navigation: active item highlighted by gold top-border indicator + full-brightness text
  - Increased card padding to `48px 36px` (mobile) / `64px 80px` (desktop) to use full width
  - Auto-cycling rotation logic and progress bar preserved unchanged
- **Tested**: 100% pass (iteration_14.json)

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


### Mobile Responsiveness — All 4 Service Pages (Mar 2026)
- **ExecutiveCoaching.jsx**: Fixed "Engagement Arc" mobile animation — Framer Motion `whileInView` on each phase row (fade + slide from left, staggered)
- **OrganizationalAdvisory.jsx**: Added `openProcessMobile` state; made Premise, Three Dimensions grid, Process accordion, Engagement, For Whom all responsive (1-col on mobile)
- **TeamFacilitation.jsx**: Added `isMobile` state + useEffect (was missing); added `openWorkMobile`; made Premise, Process grid, Work Addresses, For Whom, Outcome all responsive; testimonials portrait hidden on mobile
- **MeditationRetreat.jsx**: Added `isMobile` state + useEffect (was missing); added `openWhatOpensMobile`; made Invitation, Guide, What Opens, Experience circles (sticky→whileInView), Timeline (horizontal→vertical), Upcoming Retreats, Format all responsive; testimonials portrait hidden on mobile
- 100% test pass rate at 390px viewport, no horizontal overflow

### Engagement Arc Mobile Fix — Proper Sticky Scroll (Mar 2026)
- Replaced `whileInView` approach with proper sticky-scroll (same as desktop): `height: 260vh` container, `position: sticky, height: 100vh` inner panel
- Mobile layout: CirclesViz (200px) on top, 3 phase rows stacked below — driven by same `activePhase` state from `phasesProgress` scroll hook (not a static activePhase={2})
- Circles progressively light up ring-by-ring, phases reveal their descriptions as user scrolls