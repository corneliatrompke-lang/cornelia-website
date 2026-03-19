import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import NeuralCanvas from "../../components/NeuralCanvas";
import ScrollReveal from "../../components/ScrollReveal";
import HeroContactForm from "../../components/HeroContactForm";
import { useLanguage } from "../../context/LanguageContext";
import { useContactForm } from "../../context/ContactFormContext";
import SEOHead from "../../components/SEOHead";

// ─── Constants ────────────────────────────────────────────────────────────────
const HERO_VIDEO_DESKTOP =
  "https://customer-assets.emergentagent.com/job_nervous-system-exec/artifacts/9i70gx6z_Hero%20-%20desktop.mp4";
const HERO_VIDEO_MOBILE =
  "https://customer-assets.emergentagent.com/job_nervous-system-exec/artifacts/i0lzwodo_Hero%20-%20mobile.mp4";

const PHASES = [
  {
    number: "01",
    label: "Orientation & Mirroring",
    duration: "Months 1–3",
    description:
      "We begin with what is most present — not a framework imposed from outside. Together, we establish the reflective space and map the landscape of your leadership: the patterns, the edges, the places where something important has been waiting to shift.",
  },
  {
    number: "02",
    label: "Deepening",
    duration: "Months 4–8",
    description:
      "The real work begins here. Patterns become visible. The nervous system work takes root. What was invisible — and unavailable — starts to move. This is where change stops being conceptual and becomes lived.",
  },
  {
    number: "03",
    label: "Integration",
    duration: "Months 9–12",
    description:
      "The changes consolidate into something structural. New ways of leading stop feeling effortful and begin to feel like you. The work moves from insight into embodied capacity — and that is what holds over time.",
  },
];

const WHAT_SHIFTS = [
  "The inner architecture of how you make decisions becomes transparent — and genuinely available to change",
  "Leadership presence deepens from performance to real, embodied authority that others can feel",
  "The capacity to hold high complexity without losing clarity, steadiness, or inner regulation",
  "Relationships built on genuine depth, directness, and real trust — not managed distance",
  "The ability to act from your own centre, even under the most demanding and pressured conditions",
  "A quality of inner spaciousness that changes the entire texture of how you lead and relate",
];

const FOR_WHOM_ITEMS = [
  {
    number: "01",
    title: "You've Outgrown Standard Coaching",
    body: "You are a senior executive, founder, or board member. You have done the personal development work before. Standard coaching no longer reaches the level where your real limitations actually live.",
  },
  {
    number: "02",
    title: "The Pattern Runs Deeper Than Strategy",
    body: "You sense that what is holding you back is not a strategic or tactical problem — it is structural. The pattern recurs across different contexts and roles. No framework has yet reached it.",
  },
  {
    number: "03",
    title: "You're Navigating Real Complexity",
    body: "You are in the middle of something significant — organisationally, professionally, or personally — and you need an advisor who can hold the full weight of it without minimising or reducing it.",
  },
  {
    number: "04",
    title: "You Want to Lead From Wholeness",
    body: "You want to lead from a genuine centre — not from performance, anxiety, or depletion. You are looking for something more than optimisation, and you already know what that means.",
  },
  {
    number: "05",
    title: "You Are Ready to Work at Depth",
    body: "You understand that real change takes time and genuine commitment. You are prepared to invest sustained attention in something that actually changes you — not just how you present yourself.",
  },
];

// ─── Concentric Circles Viz ───────────────────────────────────────────────────
const PHASE_GRADIENT = "linear-gradient(to bottom, #F5F2EC 0%, #CDD8C4 8%, #8A9A80 16%, #2A3825 28%, #162018 44%, #0F1A12 60%)";

const CirclesViz = ({ activePhase, size = 500 }) => {
  const scale = size / 500;
  // Rings: index 0 = innermost (01), index 1 = middle (02), index 2 = outermost (03)
  const rings = [
    { inset: `${Math.round(180 * scale)}px`, size: `${Math.round(140 * scale)}px` },
    { inset: `${Math.round(90 * scale)}px`,  size: `${Math.round(320 * scale)}px` },
    { inset: "0px",   size: `${size}px` },
  ];
  return (
    <div style={{ position: "relative", width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
      {rings.map((ring, i) => {
        const lit = activePhase >= i;
        return (
          <motion.div
            key={i}
            animate={{
              borderColor: lit ? `rgba(200,169,106,${0.75 - i * 0.18})` : "rgba(200,169,106,0.06)",
              boxShadow: lit ? `0 0 ${20 + i * 14}px rgba(200,169,106,${0.12 - i * 0.025})` : "none",
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: ring.inset,
              borderRadius: "50%",
              border: "1px solid",
            }}
          />
        );
      })}
      {/* Center label */}
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "11px", fontStyle: "italic", color: "rgba(200,169,106,0.45)", whiteSpace: "nowrap" }}>
          The Work
        </span>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const ExecutiveCoaching = () => {
  const { t } = useLanguage();
  const { heroOpenFn, finalCtaOpenFn } = useContactForm();
  const s = t.services.executiveCoaching;

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "-12%"]);

  const phasesRef = useRef(null);
  const { scrollYProgress: phasesProgress } = useScroll({ target: phasesRef, offset: ["start start", "end end"] });
  const [activePhase, setActivePhase] = useState(-1);
  useMotionValueEvent(phasesProgress, "change", (v) => {
    if (v < 0.06)       setActivePhase(-1);
    else if (v < 0.38)  setActivePhase(0);
    else if (v < 0.68)  setActivePhase(1);
    else                setActivePhase(2);
  });

  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [isNarrow, setIsNarrow] = useState(typeof window !== "undefined" ? window.innerWidth < 1024 : false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showFinalForm, setShowFinalForm] = useState(false);

  const testimonials = t.home.testimonials.items;
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const timerRef = useRef(null);
  const restartTimer = (len) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActiveTestimonial((p) => (p + 1) % len), 6000);
  };
  useEffect(() => {
    const handleResize = () => { setIsMobile(window.innerWidth < 768); setIsNarrow(window.innerWidth < 1024); };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => { restartTimer(testimonials.length); return () => clearInterval(timerRef.current); }, [testimonials.length]);
  useEffect(() => {
    heroOpenFn.current     = () => setShowContactForm(true);
    finalCtaOpenFn.current = () => setShowFinalForm(true);
    return () => { heroOpenFn.current = null; finalCtaOpenFn.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setShowContactForm(false); setShowFinalForm(false); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const [activeForWhom, setActiveForWhom] = useState(null);
  const [openForWhomMobile, setOpenForWhomMobile] = useState(0);

  return (
    <div className="bg-[#0F1A12]">
      <SEOHead
        title="Executive Coaching & Advisory — 1:1 Coaching for Senior Leaders"
        description="A deeply confidential 1:1 executive coaching partnership for senior executives, founders, and board members — grounded in nervous system science and integral coaching methodology. Based in Berlin, working globally."
        path="/executive-coaching"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": "https://www.corneliatrompke.com/executive-coaching#service",
              "name": "Executive Coaching & Advisory",
              "description": "A deeply confidential 1:1 executive coaching partnership for senior executives, founders, and board members — grounded in nervous system science and integral coaching methodology.",
              "url": "https://www.corneliatrompke.com/executive-coaching",
              "serviceType": "Executive Coaching",
              "provider": { "@id": "https://www.corneliatrompke.com/#organization" },
              "areaServed": "Worldwide",
              "availableLanguage": [{ "@type": "Language", "name": "German" }, { "@type": "Language", "name": "English" }],
              "offers": { "@type": "Offer", "description": "6 to 12 months engagement, biweekly 90-minute sessions, in person or virtual" },
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.corneliatrompke.com" },
                { "@type": "ListItem", "position": 2, "name": "Work With Me", "item": "https://www.corneliatrompke.com/work-with-me" },
                { "@type": "ListItem", "position": 3, "name": "Executive Coaching & Advisory", "item": "https://www.corneliatrompke.com/executive-coaching" },
              ],
            },
            {
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "Who is 1:1 executive coaching for?",
                  "acceptedAnswer": { "@type": "Answer", "text": "This work is for senior executives, founders, and board members ready for something that goes deeper than standard coaching — particularly those navigating major transitions, sensing that what holds them back runs deeper than any framework has reached, or wanting to lead from wholeness rather than performance or anxiety." },
                },
                {
                  "@type": "Question",
                  "name": "How long does an executive coaching engagement last?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Engagements typically run 6 to 12 months with biweekly 90-minute sessions, conducted in person or virtually. The duration is set to allow for the depth of work required for lasting transformation." },
                },
                {
                  "@type": "Question",
                  "name": "What methodology does Cornelia Trompke use in executive coaching?",
                  "acceptedAnswer": { "@type": "Answer", "text": "Cornelia integrates NARM (NeuroAffective Relational Model) — a leading trauma-informed approach grounded in neuroscience and developmental psychology — with Integral Coaching, which engages the whole person using Ken Wilber's Integral Theory and Robert Kegan's developmental framework." },
                },
              ],
            },
          ],
        }}
      />
      <div style={{ background: "#F5F2EC" }}>

      <section className="pt-[6px] px-3 md:px-4 pb-3" style={{ background: "#F5F2EC" }} data-testid="hero-section">
        <div ref={heroRef} className="relative overflow-hidden w-full" style={{ borderRadius: "20px", minHeight: "96vh" }}
          onClick={showContactForm ? () => setShowContactForm(false) : undefined}>
          <motion.video
            key={isMobile ? "coaching-mobile" : "coaching-desktop"}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            style={{ position: "absolute", left: 0, right: 0, top: 0, width: "100%", height: "115%", objectFit: "cover", objectPosition: "center top", y: heroBgY }}
          >
            <source src={isMobile ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP} type="video/mp4" />
          </motion.video>
          {/* Directional gradient: left→right on desktop, bottom→top on mobile */}
          <div className="absolute inset-0 z-[1]" style={{ background: isMobile ? "linear-gradient(to top, rgba(18,18,18,1.00) 0%, rgba(18,18,18,0.90) 20%, rgba(18,18,18,0.75) 40%, rgba(18,18,18,0.30) 60%, rgba(18,18,18,0.15) 80%, rgba(18,18,18,0.01) 100%)" : "linear-gradient(to right, rgba(18,18,18,1.00) 0%, rgba(18,18,18,0.90) 20%, rgba(18,18,18,0.75) 40%, rgba(18,18,18,0.30) 60%, rgba(18,18,18,0.15) 80%, rgba(18,18,18,0.01) 100%)" }} />
          {/* Top strip */}
          <div className="absolute top-0 left-0 right-0 z-[2]" style={{ height: "130px", background: "linear-gradient(to bottom, rgba(12,12,12,0.65) 0%, rgba(12,12,12,0.2) 70%, transparent 100%)" }} />
          <NeuralCanvas opacity={0.08} nodeCount={40} />

          <motion.div className="absolute inset-y-0 left-0 z-10 p-8 md:p-14"
            style={{ overflowY: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
            animate={{ maxWidth: showContactForm ? "580px" : "860px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <ScrollReveal delay={0.1}><p className="ct-overline text-gold mb-6">{s.hero.overline}</p></ScrollReveal>
            <ScrollReveal delay={0.25}>
              <h1 className="text-ivory leading-[1.04]" data-testid="coaching-hero-headline"
                style={{ fontFamily: "Figtree, sans-serif", fontSize: showContactForm ? (isMobile ? "30px" : "55px") : "clamp(40px, 6.5vw, 84px)", fontWeight: 400, transition: "font-size 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                {s.hero.headline}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.42}>
              <p className="mt-5 max-w-[520px] leading-relaxed" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", fontStyle: "italic", color: "rgba(227,222,215,0.65)" }}>{s.hero.subtitle}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.58}>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginTop: "36px", marginBottom: "40px" }}>
                <button onClick={() => setShowContactForm(true)} className="btn-hero-pill" data-testid="coaching-hero-cta" style={{ border: "none", cursor: "pointer" }}>
                  {s.cta.button}
                </button>
              </div>
            </ScrollReveal>
          </motion.div>

          <AnimatePresence>
            {showContactForm && (<>
              <motion.div key="ec-veil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}
                style={{ position: "absolute", inset: 0, zIndex: 15, background: "linear-gradient(to right, transparent 30%, rgba(5,10,7,0.55) 70%)", pointerEvents: "none" }} />
              <motion.div key="ec-panel" initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }} onClick={e => e.stopPropagation()}
                style={{ position: "absolute", right: "clamp(24px, 4vw, 56px)", top: "10%", height: "80%", width: "clamp(360px, 40%, 520px)", borderRadius: "16px", background: "rgba(8,16,11,0.25)", backdropFilter: "blur(28px) saturate(1.6)", WebkitBackdropFilter: "blur(28px) saturate(1.6)", border: "1px solid rgba(200,169,106,0.18)", zIndex: 20, overflowY: "auto" }}
                data-testid="coaching-contact-form-panel">
                <HeroContactForm onClose={() => setShowContactForm(false)} preselectedService="executive-coaching" sendFrom="Executive Coaching — Hero Section" />
              </motion.div>
            </>)}
          </AnimatePresence>
        </div>
      </section>

      {/* ══ 2. CORE PREMISE — Ivory ══════════════════════════════════════════ */}
      <section className="ct-section" style={{ background: "#F5F2EC" }} data-testid="coaching-premise">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "32px" : "80px", alignItems: "flex-start" }}>
            {/* Left: pull quote */}
            <div style={{ flex: isMobile ? "none" : "0 0 42%" }}>
              <ScrollReveal>
                <p className="ct-overline text-sage mb-8">{s.description.overline}</p>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(34px, 3.8vw, 54px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#121212",
                    lineHeight: 1.25,
                  }}
                >
                  "{s.description.headline}"
                </p>
                <div style={{ width: "40px", height: "1px", background: "rgba(200,169,106,0.5)", marginTop: "36px" }} />
              </ScrollReveal>
            </div>
            {/* Right: body paragraphs */}
            <div style={{ flex: 1, paddingTop: isMobile ? "0" : "64px" }}>
              {s.description.body.split("\n\n").map((para, i) => (
                <ScrollReveal key={i} delay={0.1 + i * 0.1}>
                  <p
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "15px",
                      fontWeight: 300,
                      color: "rgba(18,18,18,0.55)",
                      lineHeight: 1.85,
                      marginBottom: "24px",
                    }}
                  >
                    {para}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      </div>{/* end ivory cluster 1 */}

      {/* ══ 3. HOW THE ENGAGEMENT UNFOLDS — sticky scroll animation ═════ */}
      {/* Outer wrapper tracks scroll for phase activation */}
      <div
        ref={phasesRef}
        style={{ background: PHASE_GRADIENT, position: "relative", marginTop: "-2px" }}
        data-testid="coaching-phases"
      >
        {/* Non-sticky heading */}
        <div className="max-w-[1400px] mx-auto px-6 md:px-16" style={{ paddingTop: isMobile ? "64px" : "140px", paddingBottom: isMobile ? "40px" : "80px" }}>
          <ScrollReveal>
            <p className="ct-overline text-sage mb-5">The Engagement Arc</p>
            <h2 style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400, color: "#121212", lineHeight: 1.1 }}>
              How the Work Unfolds Over Time
            </h2>
          </ScrollReveal>
        </div>

        {isMobile ? (
          /* ── Mobile: same sticky-scroll as desktop, but vertical layout ── */
          <div style={{ height: "260vh" }}>
            <div
              style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: "0 24px 24px",
              }}
            >
              {/* Circles — update with scroll */}
              <div style={{ marginBottom: "28px", flexShrink: 0 }}>
                <CirclesViz activePhase={activePhase} size={200} />
              </div>

              {/* Phase rows */}
              <div style={{ width: "100%" }}>
                {PHASES.map((phase, i) => {
                  const isActive = activePhase >= i;
                  const isCurrent = activePhase === i;
                  return (
                    <div
                      key={i}
                      data-testid={`phase-row-${i}`}
                      style={{
                        borderTop: i > 0 ? "1px solid rgba(245,242,236,0.1)" : "none",
                        paddingTop: i > 0 ? "18px" : "0",
                        paddingBottom: "18px",
                        paddingLeft: "16px",
                        borderLeft: `2px solid ${isCurrent ? "rgba(200,169,106,0.65)" : isActive ? "rgba(200,169,106,0.3)" : "rgba(200,169,106,0.08)"}`,
                        transition: "border-color 0.6s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "5px" }}>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: isActive ? "rgba(200,169,106,0.85)" : "rgba(200,169,106,0.2)", transition: "color 0.6s ease" }}>
                          {phase.number}
                        </span>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 400, letterSpacing: "1px", color: isActive ? "rgba(245,242,236,0.35)" : "rgba(245,242,236,0.12)", textTransform: "uppercase", transition: "color 0.6s ease" }}>
                          {phase.duration}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: "Figtree, sans-serif", fontSize: "17px", fontWeight: 400, color: isActive ? "rgba(245,242,236,0.88)" : "rgba(245,242,236,0.18)", lineHeight: 1.2, transition: "color 0.6s ease" }}>
                        {phase.label}
                      </h3>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: "7px" }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                            style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(245,242,236,0.45)", lineHeight: 1.7, overflow: "hidden" }}
                          >
                            {phase.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ paddingBottom: "40px" }} />
          </div>
        ) : (
          /* ── Desktop/tablet: sticky scroll animation ── */
          <>
            <div style={{ height: "260vh" }}>
              <div style={{ position: "sticky", top: 0, height: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>
                <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full">
                  <div style={{ display: "flex", alignItems: "center", gap: isNarrow ? "32px" : "0" }}>

                    {/* Left: circles */}
                    <div style={{ flex: isNarrow ? "0 0 42%" : "0 0 50%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                      <CirclesViz activePhase={activePhase} size={isNarrow ? 360 : 500} />
                    </div>

                    {/* Right: phase rows */}
                    <div style={{ flex: 1 }}>
                      {PHASES.map((phase, i) => {
                        const isActive = activePhase >= i;
                        const isCurrent = activePhase === i;
                        return (
                          <div
                            key={i}
                            style={{
                              borderTop: i > 0 ? "1px solid rgba(245,242,236,0.1)" : "none",
                              paddingTop: i > 0 ? "32px" : "0",
                              paddingBottom: "32px",
                              paddingLeft: "20px",
                              borderLeft: `2px solid ${isCurrent ? "rgba(200,169,106,0.65)" : isActive ? "rgba(200,169,106,0.3)" : "rgba(200,169,106,0.08)"}`,
                              transition: "border-color 0.6s ease",
                            }}
                            data-testid={`phase-row-${i}`}
                          >
                            <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: isActive ? "rgba(200,169,106,0.85)" : "rgba(200,169,106,0.2)", transition: "color 0.6s ease" }}>
                                {phase.number}
                              </span>
                              <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "1px", color: isActive ? "rgba(245,242,236,0.35)" : "rgba(245,242,236,0.12)", textTransform: "uppercase", transition: "color 0.6s ease" }}>
                                {phase.duration}
                              </span>
                            </div>
                            <h3 style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(18px, 2vw, 26px)", fontWeight: 400, color: isActive ? "rgba(245,242,236,0.88)" : "rgba(245,242,236,0.2)", lineHeight: 1.2, transition: "color 0.6s ease" }}>
                              {phase.label}
                            </h3>
                            <AnimatePresence>
                              {isActive && (
                                <motion.p
                                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                  animate={{ opacity: 1, height: "auto", marginTop: "10px" }}
                                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                  transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
                                  style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,242,236,0.45)", lineHeight: 1.75, overflow: "hidden" }}
                                >
                                  {phase.description}
                                </motion.p>
                              )}
                            </AnimatePresence>
                          </div>
                        );
                      })}
                    </div>

                  </div>
                </div>
              </div>
            </div>
            {/* Bottom spacer so section ends cleanly */}
            <div style={{ paddingBottom: "80px" }} />
          </>
        )}

      </div>

      {/* ══ 4. WHAT YOU RECEIVE — dark→light gradient ════════════════════════ */}
      <section className="ct-section" style={{ background: "linear-gradient(to bottom, #0F1A12 0%, #162018 25%, #2A3825 50%, #8A9A80 72%, #F5F2EC 100%)" }} data-testid="coaching-format-detail">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="max-w-[600px] mb-16">
            <ScrollReveal>
              <p className="ct-overline text-gold/60 mb-5">What You Receive</p>
              <h2
                style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.1 }}
              >
                The Structure of the Engagement
              </h2>
            </ScrollReveal>
          </div>

          {[
            { number: "01", title: "Regular 1:1 Sessions", description: "Biweekly 90-minute sessions — structured, held, and never rushed. A dedicated space for whatever is most present and alive in your development. Not a fixed curriculum delivered on schedule, but a living relationship with your actual growth." },
            { number: "02", title: "Direct Messenger Access", description: "Between sessions, for brief check-ins and to capture emerging insights before they dissolve. The development doesn't pause between calls — and neither does the support." },
            { number: "03", title: "Individually Designed Deep-Dive Sessions", description: "Longer format sessions for the work that requires more time, more depth, or specific preparation — designed entirely around the edges in your development that matter most right now." },
            { number: "04", title: "Personalized Recordings", description: "Created specifically for you to support self-regulation and integration between sessions. A private resource, built around your actual nervous system, that travels wherever you go." },
          ].map((item, i) => {
            const bgOpacity = 0.15 + (i / 3) * 0.21;
            return (
              <ScrollReveal key={i} delay={0.08 * i}>
                <div className="flex items-stretch mb-2" data-testid={`receive-item-${i}`}>
                  <div
                    style={{
                      flexShrink: 0, width: "44px", display: "flex", alignItems: "center", justifyContent: "center",
                      background: `rgba(200,169,106,${bgOpacity + 0.07})`,
                      borderLeft: "2px solid rgba(200,169,106,0.4)",
                    }}
                  >
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, color: "#0F1A12", letterSpacing: "1px" }}>
                      {item.number}
                    </span>
                  </div>
                <div
                    style={{
                      flex: 1, padding: isMobile ? "16px 20px" : "22px 32px",
                      background: `rgba(200,169,106,${bgOpacity})`,
                      border: "1px solid rgba(200,169,106,0.1)",
                      borderLeft: "none",
                      display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "8px" : "40px", alignItems: isMobile ? "flex-start" : "baseline",
                    }}
                  >
                    <p
                      style={{ fontFamily: "Figtree, sans-serif", fontSize: "16px", fontWeight: 400, color: "rgba(245,242,236,0.82)", flexShrink: 0, minWidth: isMobile ? "auto" : "260px" }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,242,236,0.80)", lineHeight: 1.7 }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ── Ivory cluster 2: For Whom + What Shifts ───────────────────────── */}
      <div style={{ background: "#F5F2EC", marginTop: "-2px" }}>

      {/* ══ 5. FOR WHOM — Ivory background, horizontal hover accordion ══ */}
      <section
        className="ct-section"
        style={{ background: "#F5F2EC" }}
        data-testid="coaching-for-whom"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="max-w-[600px] mx-auto mb-16 text-center">
            <ScrollReveal>
              <p className="ct-overline text-sage mb-5">{s.forWhom.overline}</p>
              <h2 style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400, color: "#121212", lineHeight: 1.1 }}>
                {s.forWhom.headline}
              </h2>
            </ScrollReveal>
          </div>

          {isMobile ? (
            /* ── Mobile: vertical expand/collapse accordion ── */
            <div>
              {FOR_WHOM_ITEMS.map((item, i) => {
                const isOpen = openForWhomMobile === i;
                return (
                  <div key={i} style={{ borderBottom: "1px solid rgba(18,18,18,0.08)" }} data-testid={`for-whom-item-${i}`}>
                    <button
                      onClick={() => setOpenForWhomMobile(isOpen ? null : i)}
                      style={{ width: "100%", textAlign: "left", padding: "20px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <div style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(124,140,130,0.75)", flexShrink: 0 }}>{item.number}</span>
                        <span style={{ fontFamily: "Figtree, sans-serif", fontSize: "17px", fontWeight: 400, color: "#121212", lineHeight: 1.3 }}>{item.title}</span>
                      </div>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "22px", fontWeight: 300, color: "rgba(18,18,18,0.35)", lineHeight: 1, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.3s ease", flexShrink: 0, marginLeft: "12px" }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ paddingBottom: "20px", paddingRight: "16px" }}>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(18,18,18,0.5)", lineHeight: 1.75 }}>{item.body}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
          /* ── Desktop/tablet: horizontal hover accordion ── */
          <div className="flex" style={{ height: "420px", overflow: "hidden" }}>
            {FOR_WHOM_ITEMS.map((item, i) => {
              const isActive = activeForWhom === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveForWhom(i)}
                  onMouseLeave={() => setActiveForWhom(null)}
                  data-testid={`for-whom-item-${i}`}
                  style={{
                    flex: isActive ? 3.5 : 1,
                    transition: "flex 0.65s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease",
                    position: "relative",
                    overflow: "hidden",
                    borderRight: i < FOR_WHOM_ITEMS.length - 1 ? "1px solid rgba(18,18,18,0.07)" : "none",
                    cursor: "default",
                    background: isActive ? "rgba(18,18,18,0.025)" : "#F5F2EC",
                  }}
                >
                  {/* Collapsed: rotated title + faint number */}
                  <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", opacity: isActive ? 0 : 1, transition: "opacity 0.2s ease", pointerEvents: "none" }}>
                    <span style={{ writingMode: "vertical-rl", transform: "rotate(180deg)", fontFamily: "Figtree, sans-serif", fontSize: "clamp(13px, 1.6vw, 18px)", fontWeight: 400, letterSpacing: "0.08em", color: "rgba(18,18,18,0.45)", flex: 1, display: "flex", alignItems: "center" }}>
                      {item.title}
                    </span>
                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "28px", fontWeight: 300, color: "rgba(18,18,18,0.1)", lineHeight: 1, paddingBottom: "4px" }}>
                      {item.number}
                    </span>
                  </div>

                  {/* Expanded */}
                  <div style={{ opacity: isActive ? 1 : 0, transition: "opacity 0.35s ease 0.22s", padding: "48px 64px 48px 52px", height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", minWidth: "380px" }}>
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(124,140,130,0.75)", marginBottom: "20px", display: "block" }}>
                      {item.number}
                    </span>
                    <h3 style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(20px, 2vw, 28px)", fontWeight: 400, color: "#121212", lineHeight: 1.2, marginBottom: "18px", maxWidth: "360px" }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(18,18,18,0.5)", lineHeight: 1.75, maxWidth: "360px" }}>
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* ══ 6. WHAT SHIFTS — Ivory ══════════════════════════════════════════ */}
      <section className="ct-section" style={{ background: "#F5F2EC" }} data-testid="coaching-what-shifts">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "32px" : (isNarrow ? "40px" : "80px"), alignItems: "flex-start" }}>
            {/* Left: heading */}
            <div style={{ flex: isMobile ? "none" : (isNarrow ? "0 0 28%" : "0 0 38%") }}>
              <ScrollReveal>
                <p className="ct-overline text-sage mb-5">What Shifts</p>
                <h2
                  style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 400, color: "#121212", lineHeight: 1.1 }}
                >
                  The Shifts That Actually Hold
                </h2>
                <p
                  style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(18,18,18,0.45)", lineHeight: 1.8, marginTop: "20px" }}
                >
                  A sustained engagement changes the architecture of how you lead — not through effort, but through transformation that is genuinely structural.
                </p>
              </ScrollReveal>
            </div>
            {/* Thin divider */}
            <div style={{ width: "1px", background: "rgba(18,18,18,0.08)", flexShrink: 0, alignSelf: "stretch" }} />
            {/* Right: numbered row blocks (Integral-diagram style, ivory-adapted) */}
            <div style={{ flex: 1 }}>
              {WHAT_SHIFTS.map((item, i) => {
                const bgOpacity = 0.025 + (i / (WHAT_SHIFTS.length - 1)) * 0.04;
                return (
                  <ScrollReveal key={i} delay={0.07 * i}>
                    <div className="flex items-stretch mb-2" data-testid={`shift-item-${i}`}>
                      {/* Number badge */}
                      <div
                        style={{
                          flexShrink: 0, width: "44px",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          background: `rgba(18,18,18,${bgOpacity + 0.03})`,
                          borderLeft: "2px solid rgba(18,18,18,0.18)",
                        }}
                      >
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, color: "rgba(18,18,18,0.35)", letterSpacing: "1px" }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      {/* Content row */}
                      <div
                        style={{
                          flex: 1, padding: "16px 28px",
                          background: `rgba(18,18,18,${bgOpacity})`,
                          borderTop: "1px solid rgba(18,18,18,0.06)",
                          borderBottom: "1px solid rgba(18,18,18,0.06)",
                          borderRight: "1px solid rgba(18,18,18,0.06)",
                        }}
                      >
                        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(18,18,18,0.55)", lineHeight: 1.65 }}>
                          {item}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
              <ScrollReveal delay={0.45}>
                <div className="flex items-center gap-3 mt-6">
                  <div style={{ width: "1px", height: "32px", background: "rgba(18,18,18,0.2)" }} />
                  <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "14px", fontStyle: "italic", color: "rgba(18,18,18,0.35)" }}>
                    Sustained engagement changes the architecture of how you lead
                  </span>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      </div>{/* end ivory cluster 2 */}

      {/* ══ 7. TESTIMONIALS — light→dark gradient ═══════════════════════════ */}
      <section className="ct-section" style={{ background: "linear-gradient(to bottom, #F5F2EC 0%, #CDD8C4 15%, #8A9A80 32%, #2A3825 52%, #162018 75%, #0F1A12 100%)", marginTop: "-2px" }} data-testid="coaching-testimonials">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline mb-10" style={{ color: "rgba(18,18,18,0.35)" }}>{t.home.testimonials.overline}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div
              style={{
                display: "flex", minHeight: "400px",
                background: "rgba(18, 18, 18, 0.95)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                border: "1px solid rgba(200,169,106,0.12)",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Quote — full width */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "48px 36px" : "64px 80px", position: "relative" }}>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "120px", lineHeight: 1, color: "rgba(200,169,106,0.06)", position: "absolute", top: "16px", left: "52px", userSelect: "none", pointerEvents: "none" }}>&ldquo;</span>
                <div style={{ position: "relative", minHeight: "220px" }}>
                  {testimonials.map((item, i) => (
                    <div key={i} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", opacity: i === activeTestimonial ? 1 : 0, transform: i === activeTestimonial ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.8s ease, transform 0.8s ease", pointerEvents: i === activeTestimonial ? "auto" : "none" }}>
                      <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.45, fontStyle: "italic" }}>
                        "{item.text}"
                      </p>
                      <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "28px", height: "1px", background: "rgba(200,169,106,0.5)" }} />
                        <div>
                          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 500, color: "rgba(200,169,106,0.9)", letterSpacing: "1.5px", textTransform: "uppercase" }}>{item.author}</p>
                          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(227,222,215,0.4)", marginTop: "3px" }}>{item.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(200,169,106,0.08)" }}>
                <div key={activeTestimonial} style={{ height: "100%", background: "rgba(200,169,106,0.45)", animation: "progressSlide 6s linear forwards" }} />
              </div>
            </div>
          </ScrollReveal>

          {/* Author navigation — single row, names only */}
          <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto", scrollbarWidth: "none", gap: "0", marginTop: "4px", borderTop: "1px solid rgba(200,169,106,0.12)" }}>
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => { setActiveTestimonial(i); restartTimer(testimonials.length); }}
                data-testid={`testimonial-nav-${i}`}
                style={{ background: "none", border: "none", padding: "16px 28px 14px 0", cursor: "pointer", textAlign: "left", flexShrink: 0 }}
              >
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.20em", textTransform: "uppercase", color: i === activeTestimonial ? "#F5F2EC" : "rgba(245,242,236,0.28)", transition: "color 0.4s ease, border-color 0.4s ease", borderBottom: "2px solid", borderColor: i === activeTestimonial ? "rgba(200,169,106,0.65)" : "transparent", paddingBottom: "4px", margin: 0, whiteSpace: "nowrap" }}>
                  {item.author}
                </p>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 400, letterSpacing: "0.08em", color: i === activeTestimonial ? "rgba(200,169,106,0.7)" : "rgba(200,169,106,0.25)", transition: "color 0.4s ease", marginTop: "5px", whiteSpace: "nowrap" }}>
                  {item.role}
                </p>
              </button>
            ))}
          </div>
        </div>
        <style>{`@keyframes progressSlide { from { width: 0%; } to { width: 100%; } }`}</style>
      </section>

      {/* ══ 8. ENGAGEMENT DETAILS — Deep Forest Green ════════════════════ */}
      <section
        className="ct-section"
        style={{ background: "#0F1A12" }}
        data-testid="coaching-format"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "32px" : "80px", alignItems: "flex-start" }}>
            {/* Left: heading */}
            <div style={{ flex: isMobile ? "none" : "0 0 38%" }}>
              <ScrollReveal>
                <p className="ct-overline text-gold/60 mb-5">{s.format.overline}</p>
                <h2
                  style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.1 }}
                >
                  {s.format.headline}
                </h2>
              </ScrollReveal>
            </div>
            {/* Right: format rows */}
            <div style={{ flex: 1, paddingTop: isMobile ? "0" : "64px" }}>
              {s.format.items.map((item, i) => (
                <ScrollReveal key={i} delay={0.08 * i}>
                  <div
                    style={{
                      borderTop: i > 0 ? "1px solid rgba(245,242,236,0.1)" : "none",
                      padding: "24px 0",
                      display: "flex", gap: "40px", alignItems: "baseline",
                    }}
                    data-testid={`format-item-${i}`}
                  >
                    <p
                      style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(200,169,106,0.6)", flexShrink: 0, minWidth: "100px" }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(245,242,236,0.65)", lineHeight: 1.7 }}
                    >
                      {item.value}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
              <div style={{ borderTop: "1px solid rgba(245,242,236,0.1)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 9. FINAL CTA — Forest green → ivory gradient ══════════════ */}
      <section className="ct-section relative overflow-hidden" style={{ background: "linear-gradient(to bottom, #0F1A12 0%, #162018 25%, #2A3825 48%, #8A9A80 68%, #CDD8C4 85%, #F5F2EC 100%)" }} data-testid="coaching-cta" data-final-cta="true"
        onClick={showFinalForm ? () => setShowFinalForm(false) : undefined}>
        <NeuralCanvas opacity={0.04} nodeCount={22} />
        <div className="relative z-10 max-w-[760px] mx-auto px-6">
          <ScrollReveal>
            <motion.div
              animate={{
                padding: showFinalForm
                  ? isMobile ? "32px 28px 36px" : "36px 56px 44px"
                  : isMobile ? "52px 28px" : "80px 72px",
                textAlign: showFinalForm ? "left" : "center",
              }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "rgba(15,26,18,0.92)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(200,169,106,0.25)",
                borderRadius: "20px",
                position: "relative",
                overflow: showFinalForm ? "auto" : "hidden",
              }}
              data-testid="coaching-final-cta-card"
            >
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,169,106,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "relative", zIndex: 10 }}>
                <AnimatePresence mode="wait">
                  {!showFinalForm ? (
                    <motion.div
                      key="coaching-cta-content"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.1, color: "#F5F2EC" }}>
                        {s.cta.headline}
                      </h2>
                      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300, color: "rgba(227,222,215,0.45)", lineHeight: 1.75, marginTop: "18px" }}>
                        All engagements begin with a conversation. There is no obligation — only the beginning of understanding whether this is the right fit.
                      </p>
                      <button
                        onClick={() => setShowFinalForm(true)}
                        className="btn-secondary"
                        style={{ marginTop: "40px", borderRadius: "8px", display: "inline-block", cursor: "pointer" }}
                        data-testid="coaching-apply-btn"
                      >
                        {s.cta.button}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="coaching-form-content"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HeroContactForm onClose={() => setShowFinalForm(false)} noPadding preselectedService="executive-coaching" sendFrom="Executive Coaching — Final CTA Section" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default ExecutiveCoaching;
