import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import NeuralCanvas from "../../components/NeuralCanvas";
import ScrollReveal from "../../components/ScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import { useContactForm } from "../../context/ContactFormContext";
import SEOHead from "../../components/SEOHead";

// ─── Constants ────────────────────────────────────────────────────────────────
const HERO_BG =
  "https://images.unsplash.com/photo-1601277743437-2b4cf99aab99?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";

const DIMENSIONS = [
  {
    number: "01",
    title: "Leadership",
    subtitle: "How Leaders Actually Operate",
    body: "Leadership is the primary lever of every meaningful organisational change. Who leads, how they lead, and what they model creates the conditions — or the constraints — for everything else. We examine leadership maturity, decision-making patterns, and the gap between what is stated and what is actually lived. Where leadership is not genuinely aligned with the intended future, the transformation stalls. Always.",
  },
  {
    number: "02",
    title: "People Systems",
    subtitle: "The Architecture of Work",
    body: "People practices are the operating system of your organisation. Performance processes, talent frameworks, how you hire, develop, and recognise people — these are not administrative functions. They are the structural encoding of what the organisation truly values. We examine what your current systems actually produce, where they constrain the culture you are trying to build, and what specifically needs to change.",
  },
  {
    number: "03",
    title: "Culture",
    subtitle: "What the Organisation Actually Lives",
    body: "Culture is not a programme or a set of values printed on a wall. It is the sum of what is rewarded, what is tolerated, and what goes permanently unsaid. Understanding your current culture — honestly, without consolation — is the foundation for changing it. We examine the lived experience of people across the organisation and identify the patterns and norms shaping how work actually gets done.",
  },
];

const PROCESS_PHASES = [
  {
    number: "01",
    title: "Stakeholder Conversations",
    subtitle: "Listening With Real Depth",
    description:
      "Before anything is diagnosed or recommended, we listen. Individual conversations across levels of the organisation — designed to surface what the data cannot capture and what the official narrative consistently leaves out.",
  },
  {
    number: "02",
    title: "Systemic Analysis",
    subtitle: "Mapping What Is Actually Happening",
    description:
      "A rigorous examination of current structures, cultural patterns, and leadership dynamics. Not what the organisation says it is — but what it actually is, beneath the layer of stated intention and curated presentation.",
  },
  {
    number: "03",
    title: "Strategic Guidance",
    subtitle: "A Clear Path Forward",
    description:
      "Concrete recommendations grounded in what the system can absorb and genuinely sustain. Not a slide deck — but a real advisory presence that stays with the organisation through the full complexity of meaningful change.",
  },
];

const ENGAGEMENT_ITEMS = [
  "Stakeholder conversation series across levels of the organisation",
  "Review of People & Culture practices and leadership routines in depth",
  "Transformation levers presentation with clear priority focus areas",
  "Structured options for the transformation journey ahead",
  "Regular strategic check-ins with the teams driving implementation",
  "Conceptual and strategic guidance throughout — not just at the beginning",
];

const FOR_WHOM_ITEMS = [
  {
    number: "01",
    subtitle: "Leading Change From the Inside",
    title: "The CHRO / People Leader",
    benefits: [
      "Build a coherent transformation strategy grounded in the organisation's actual current state — not the intended one",
      "Create a shared language with leadership for what real change requires and what it genuinely costs",
      "Identify where people systems are actively reinforcing the culture you are trying to move away from",
      "Develop a clear, credible, and honest narrative for the transformation journey ahead",
    ],
  },
  {
    number: "02",
    subtitle: "Leading an Organisation Through Change",
    title: "The CEO",
    benefits: [
      "Understand what your organisation actually needs — beyond the symptoms presenting on the surface",
      "Build genuine alignment across the leadership team on direction, priorities, and what each person is accountable for",
      "Identify where leadership behaviour is the real lever — and where the systems themselves need to change",
      "Create a transformation roadmap that is honest and realistic about what the organisation can absorb",
    ],
  },
  {
    number: "03",
    subtitle: "Scaling, Merging, or Reinventing",
    title: "The Organisation at Inflection Point",
    benefits: [
      "Navigate significant growth, merger, or strategic pivot without losing organisational coherence and trust",
      "Align people practices with the organisation you are genuinely becoming — not the one you were",
      "Address the cultural drift that almost always accompanies rapid scale before it becomes embedded",
      "Build the leadership and people infrastructure the next stage of growth actually requires",
    ],
  },
  {
    number: "04",
    subtitle: "Moving Beyond Founder-Led Culture",
    title: "The Scale-up",
    benefits: [
      "Replace informal people practices with structured systems that genuinely support a growing organisation",
      "Retain what made the company exceptional while building the infrastructure required for scale",
      "Develop leaders who can manage and lead — not just build and execute",
      "Create real clarity around performance, development, and expectations without losing the agility that matters",
    ],
  },
];

const PHASE_GRADIENT =
  "linear-gradient(to bottom, #F5F2EC 0%, #CDD8C4 15%, #8A9A80 32%, #2A3825 52%, #162018 75%, #0F1A12 100%)";

const FOREST_TO_IVORY =
  "linear-gradient(to bottom, #0F1A12 0%, #162018 25%, #2A3825 48%, #8A9A80 68%, #CDD8C4 85%, #F5F2EC 100%)";

// ─── Page ─────────────────────────────────────────────────────────────────────
const OrganizationalAdvisory = () => {
  const { t } = useLanguage();
  const { openForm } = useContactForm();
  const testimonials = t.home.testimonials.items;

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "-12%"]);

  const [openForWhom, setOpenForWhom] = useState(0);
  const [activePhase, setActivePhase] = useState(null);
  const [openProcessMobile, setOpenProcessMobile] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const timerRef = useRef(null);
  const restartTimer = (len) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActiveTestimonial((p) => (p + 1) % len), 6000);
  };
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    restartTimer(testimonials.length);
    return () => clearInterval(timerRef.current);
  }, [testimonials.length]);

  return (
    <div className="bg-[#F5F2EC]">
      <SEOHead
        title="Organisational Transformation Advisory — People & Culture"
        description="Strategic advisory for organisations at inflection points — addressing leadership, people systems, and culture simultaneously. Real transformation requires all three dimensions to move together."
        path="/organizational-advisory"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": "https://corneliatrompke.com/organizational-advisory#service",
              "name": "Organisational Advisory for People & Culture Transformation",
              "description": "Strategic advisory for organisations at inflection points — addressing leadership, people systems, and culture simultaneously.",
              "url": "https://corneliatrompke.com/organizational-advisory",
              "serviceType": "Organisational Consulting",
              "provider": { "@id": "https://corneliatrompke.com/#organization" },
              "areaServed": "Worldwide",
              "availableLanguage": [{ "@type": "Language", "name": "German" }, { "@type": "Language", "name": "English" }],
              "offers": { "@type": "Offer", "description": "Minimum 6 months, typically 12–18 months. Diagnostic phase, systemic mapping, leadership architecture, sustained advisory presence." },
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://corneliatrompke.com" },
                { "@type": "ListItem", "position": 2, "name": "Work With Me", "item": "https://corneliatrompke.com/work-with-me" },
                { "@type": "ListItem", "position": 3, "name": "Organisational Advisory", "item": "https://corneliatrompke.com/organizational-advisory" },
              ],
            },
          ],
        }}
      />
      <section
        className="pt-[6px] px-3 md:px-4 pb-3"
        style={{ background: "#F5F2EC" }}
        data-testid="advisory-hero"
      >
        <div
          ref={heroRef}
          className="relative overflow-hidden w-full"
          style={{ borderRadius: "20px", minHeight: "96vh" }}
        >
          <motion.img
            src={HERO_BG}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute", left: 0, right: 0, top: 0,
              width: "100%", height: "115%",
              objectFit: "cover", objectPosition: "center 40%",
              y: heroBgY,
            }}
          />
          {/* Directional gradient: left→right on desktop, bottom→top on mobile */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: isMobile
                ? "linear-gradient(to top, rgba(15,26,18,0.97) 0%, rgba(15,26,18,0.90) 25%, rgba(15,26,18,0.72) 48%, rgba(15,26,18,0.28) 68%, rgba(15,26,18,0.06) 100%)"
                : "linear-gradient(to right, rgba(15,26,18,0.97) 0%, rgba(15,26,18,0.90) 25%, rgba(15,26,18,0.72) 48%, rgba(15,26,18,0.28) 68%, rgba(15,26,18,0.06) 100%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 z-[2]"
            style={{ height: "130px", background: "linear-gradient(to bottom, rgba(15,26,18,0.70) 0%, rgba(15,26,18,0.2) 70%, transparent 100%)" }}
          />
          <NeuralCanvas opacity={0.05} nodeCount={30} />
          <div className="absolute bottom-0 left-0 z-10 p-8 md:p-14" style={{ maxWidth: "900px" }}>
            <ScrollReveal delay={0.1}>
              <p className="ct-overline text-gold mb-6">03 — Organisational Advisory</p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <h1
                className="text-ivory leading-[1.04]"
                style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(38px, 6vw, 80px)", fontWeight: 400 }}
                data-testid="advisory-hero-headline"
              >
                Where Leadership, People Practices, and Culture Evolve Together
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.42}>
              <p
                className="mt-5 max-w-[540px] leading-relaxed"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", fontStyle: "italic", color: "rgba(227,222,215,0.65)" }}
              >
                Strategic guidance for organisations at points of meaningful transformation.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.58}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "36px", marginBottom: "40px" }}>
                <button onClick={() => openForm('org-advisory', 'Organizational Advisory')} className="btn-hero-pill" data-testid="advisory-hero-cta">
                  Begin the Conversation
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ 2. THE PREMISE — Ivory ═══════════════════════════════════════════ */}
      <section className="ct-section" style={{ background: "#F5F2EC" }} data-testid="advisory-premise">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "32px" : "80px", alignItems: "flex-start" }}>

            {/* Left: pull quote */}
            <div style={{ flex: isMobile ? "none" : "0 0 44%" }}>
              <ScrollReveal>
                <p className="ct-overline text-sage mb-8">The Premise</p>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(26px, 3vw, 44px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#121212",
                    lineHeight: 1.28,
                  }}
                >
                  "Organisations evolve when leadership, people practices, and culture develop in the same direction — rarely when only one changes while the others stay fixed."
                </p>
                <div style={{ width: "40px", height: "1px", background: "rgba(200,169,106,0.5)", marginTop: "36px" }} />
                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(18,18,18,0.35)",
                    marginTop: "16px",
                  }}
                >
                  Cornelia Trompke
                </p>
              </ScrollReveal>
            </div>

            {/* Right: body */}
            <div style={{ flex: 1, paddingTop: isMobile ? "0" : "68px" }}>
              {[
                "My work with organisations addresses the three dimensions that must evolve together for transformation to hold: leadership, people systems, and culture. When only one changes, the system restabilises around its old patterns.",
                "The engagement typically begins with a listening phase — structured conversations across the organisation to surface what the data cannot capture and what the official narrative consistently leaves out.",
                "Based on this, I develop a clear picture of where your current systems and practices support the direction you intend — and where they actively work against it. What follows is a frank strategic conversation about what needs to change, and how.",
              ].map((para, i) => (
                <ScrollReveal key={i} delay={0.08 * i}>
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

      {/* ══ 3. THREE DIMENSIONS — Ivory → Forest gradient, triptych ══════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: PHASE_GRADIENT, paddingTop: "160px", paddingBottom: "140px" }}
        data-testid="advisory-dimensions"
      >
        <div
          style={{
            position: "absolute", right: "-60px", top: "20px",
            fontFamily: "Cormorant Garamond, serif", fontSize: "480px",
            fontWeight: 300, color: "rgba(18,18,18,0.022)", lineHeight: 1,
            pointerEvents: "none", userSelect: "none",
          }}
        >
          03
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-16 relative z-10">
          <ScrollReveal>
            <p className="ct-overline text-sage mb-5">The Work</p>
            <h2
              style={{
                fontFamily: "Figtree, sans-serif",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 400,
                color: "#121212",
                lineHeight: 1.1,
                maxWidth: "680px",
                marginBottom: "100px",
              }}
            >
              Three Dimensions That Must Move Together
            </h2>
          </ScrollReveal>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1fr 1px 1fr 1px 1fr",
              gap: "0",
            }}
          >
            {DIMENSIONS.map((dim, i) => (
              <React.Fragment key={i}>
                <ScrollReveal delay={0.1 * i}>
                  <div
                    style={{
                      paddingRight: !isMobile && i < DIMENSIONS.length - 1 ? "clamp(32px, 4vw, 64px)" : "0",
                      paddingLeft: !isMobile && i > 0 ? "clamp(32px, 4vw, 64px)" : "0",
                      paddingBottom: isMobile ? "40px" : "0",
                      borderBottom: isMobile && i < DIMENSIONS.length - 1 ? "1px solid rgba(245,242,236,0.10)" : "none",
                    }}
                    data-testid={`dimension-${i}`}
                  >
                    <span
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "clamp(64px, 8vw, 96px)",
                        fontWeight: 300,
                        color: "rgba(200,169,106,0.10)",
                        lineHeight: 1,
                        display: "block",
                        marginBottom: "-4px",
                        letterSpacing: "-2px",
                      }}
                    >
                      {dim.number}
                    </span>
                    <h3
                      style={{
                        fontFamily: "Figtree, sans-serif",
                        fontSize: "clamp(20px, 2.2vw, 30px)",
                        fontWeight: 400,
                        color: "rgba(245,242,236,0.92)",
                        lineHeight: 1.12,
                        marginBottom: "10px",
                      }}
                    >
                      {dim.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "16px",
                        fontStyle: "italic",
                        color: "rgba(200,169,106,0.55)",
                        marginBottom: "24px",
                      }}
                    >
                      {dim.subtitle}
                    </p>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "rgba(245,242,236,0.50)",
                        lineHeight: 1.85,
                      }}
                    >
                      {dim.body}
                    </p>
                  </div>
                </ScrollReveal>
                {i < DIMENSIONS.length - 1 && !isMobile && (
                  <div style={{ background: "rgba(245,242,236,0.10)" }} />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* ── Dark cluster: eliminates sub-pixel gaps between consecutive dark sections ─── */}
      <div style={{ background: "#0F1A12", marginTop: "-2px" }}>

      {/* ══ 4. HOW THE WORK UNFOLDS — Deep forest, horizontal accordion ══════ */}
      <section className="ct-section" style={{ background: "#0F1A12" }} data-testid="advisory-process">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="max-w-[680px] mb-16">
            <ScrollReveal>
              <p className="ct-overline text-gold/60 mb-5">The Process</p>
              <h2
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 46px)",
                  fontWeight: 400,
                  color: "#F5F2EC",
                  lineHeight: 1.1,
                }}
              >
                Three Phases. One Coherent Transformation.
              </h2>
            </ScrollReveal>
          </div>

          {isMobile ? (
            /* ── Mobile: vertical expand/collapse accordion ── */
            <div>
              {PROCESS_PHASES.map((phase, i) => {
                const isOpen = openProcessMobile === i;
                return (
                  <div key={i} style={{ borderBottom: "1px solid rgba(245,242,236,0.08)" }} data-testid={`process-phase-${i}`}>
                    <button
                      onClick={() => setOpenProcessMobile(isOpen ? null : i)}
                      style={{ width: "100%", textAlign: "left", padding: "20px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <div style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(200,169,106,0.65)", flexShrink: 0 }}>{phase.number}</span>
                        <span style={{ fontFamily: "Figtree, sans-serif", fontSize: "18px", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.3 }}>{phase.title}</span>
                      </div>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "22px", fontWeight: 300, color: "rgba(245,242,236,0.35)", lineHeight: 1, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.3s ease", flexShrink: 0, marginLeft: "12px" }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ paddingBottom: "20px", paddingRight: "8px" }}>
                        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "14px", fontStyle: "italic", color: "rgba(200,169,106,0.6)", marginBottom: "12px" }}>{phase.subtitle}</p>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,242,236,0.52)", lineHeight: 1.75 }}>{phase.description}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
          <div className="flex" style={{ height: "420px", overflow: "hidden" }}>
            {PROCESS_PHASES.map((phase, i) => {
              const isActive = activePhase === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActivePhase(i)}
                  onMouseLeave={() => setActivePhase(null)}
                  data-testid={`process-phase-${i}`}
                  style={{
                    flex: isActive ? 3.5 : 1,
                    transition: "flex 0.65s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease",
                    position: "relative",
                    overflow: "hidden",
                    borderRight: i < PROCESS_PHASES.length - 1 ? "1px solid rgba(245,242,236,0.07)" : "none",
                    cursor: "default",
                    background: isActive ? "rgba(200,169,106,0.04)" : "transparent",
                  }}
                >
                  {/* Collapsed: rotated title */}
                  <div
                    style={{
                      position: "absolute", inset: 0,
                      display: "flex", flexDirection: "column", alignItems: "center",
                      padding: "40px 0",
                      opacity: isActive ? 0 : 1,
                      transition: "opacity 0.2s ease",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        fontFamily: "Figtree, sans-serif",
                        fontSize: "clamp(13px, 1.6vw, 18px)",
                        fontWeight: 400,
                        letterSpacing: "0.08em",
                        color: "rgba(245,242,236,0.38)",
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {phase.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "28px",
                        fontWeight: 300,
                        color: "rgba(200,169,106,0.10)",
                        lineHeight: 1,
                        paddingBottom: "4px",
                      }}
                    >
                      {phase.number}
                    </span>
                  </div>

                  {/* Expanded */}
                  <div
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.35s ease 0.22s",
                      padding: "48px 52px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      minWidth: "360px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "rgba(200,169,106,0.8)",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      {phase.number}
                    </span>
                    <h3
                      style={{
                        fontFamily: "Figtree, sans-serif",
                        fontSize: "clamp(20px, 2vw, 28px)",
                        fontWeight: 400,
                        color: "#F5F2EC",
                        lineHeight: 1.2,
                        marginBottom: "6px",
                      }}
                    >
                      {phase.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "14px",
                        fontStyle: "italic",
                        color: "rgba(200,169,106,0.6)",
                        marginBottom: "18px",
                      }}
                    >
                      {phase.subtitle}
                    </p>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "rgba(227,222,215,0.52)",
                        lineHeight: 1.75,
                        maxWidth: "360px",
                      }}
                    >
                      {phase.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          )}{/* end isMobile process conditional */}
        </div>
      </section>

      {/* ══ 5. THE ENGAGEMENT — Deep forest, 2-column ════════════════════════ */}
      <section className="ct-section" style={{ background: "#0F1A12" }} data-testid="advisory-engagement">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "32px" : "80px", alignItems: "flex-start" }}>

            {/* Left: duration + context */}
            <div style={{ flex: isMobile ? "none" : "0 0 42%" }}>
              <ScrollReveal>
                <p className="ct-overline text-gold/60 mb-5">The Format</p>
                <h2
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontSize: "clamp(28px, 3.2vw, 44px)",
                    fontWeight: 400,
                    color: "#F5F2EC",
                    lineHeight: 1.1,
                    marginBottom: "36px",
                  }}
                >
                  Strategic Guidance Over Time
                </h2>
                {/* Duration display */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: "12px",
                    marginBottom: "28px",
                    paddingBottom: "28px",
                    borderBottom: "1px solid rgba(245,242,236,0.08)",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "clamp(52px, 7vw, 80px)",
                      fontWeight: 300,
                      color: "rgba(200,169,106,0.55)",
                      lineHeight: 1,
                      letterSpacing: "-1px",
                    }}
                  >
                    3–12
                  </span>
                  <span
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "13px",
                      fontWeight: 400,
                      letterSpacing: "2px",
                      textTransform: "uppercase",
                      color: "rgba(245,242,236,0.35)",
                    }}
                  >
                    months
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "14px",
                    fontWeight: 300,
                    color: "rgba(245,242,236,0.45)",
                    lineHeight: 1.85,
                  }}
                >
                  The structure adapts to what the organisation needs — from intensive diagnostic work at the front to lighter-touch strategic support during implementation.
                </p>
              </ScrollReveal>
            </div>

            {/* Right: what's included */}
            <div style={{ flex: 1, paddingTop: isMobile ? "0" : "88px" }}>
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "rgba(200,169,106,0.5)",
                  marginBottom: "28px",
                }}
              >
                What's Included
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {ENGAGEMENT_ITEMS.map((item, i) => (
                  <ScrollReveal key={i} delay={0.06 * i}>
                    <div
                      style={{
                        display: "flex",
                        gap: "18px",
                        alignItems: "baseline",
                        padding: "18px 0",
                        borderBottom: "1px solid rgba(245,242,236,0.07)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "18px",
                          color: "rgba(200,169,106,0.38)",
                          flexShrink: 0,
                          lineHeight: 1,
                        }}
                      >
                        —
                      </span>
                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "14px",
                          fontWeight: 300,
                          color: "rgba(227,222,215,0.62)",
                          lineHeight: 1.7,
                        }}
                      >
                        {item}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ 6. FOR WHOM — Deep forest, Method-style vertical selector ════════ */}
      <section className="ct-section" style={{ background: "#0F1A12" }} data-testid="advisory-for-whom">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">

          <div className="max-w-[680px] mb-20">
            <ScrollReveal>
              <p className="ct-overline text-gold/60 mb-5">For Whom</p>
              <h2
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 46px)",
                  fontWeight: 400,
                  color: "#F5F2EC",
                }}
              >
                The Organisations This Work Is Built For
              </h2>
            </ScrollReveal>
          </div>

          {isMobile ? (
            /* ── Mobile: vertical expand/collapse accordion ── */
            <div>
              {FOR_WHOM_ITEMS.map((item, i) => {
                const isOpen = openForWhom === i;
                return (
                  <div key={i} style={{ borderBottom: "1px solid rgba(245,242,236,0.08)" }} data-testid={`for-whom-item-${i}`}>
                    <button
                      onClick={() => setOpenForWhom(isOpen ? null : i)}
                      style={{ width: "100%", textAlign: "left", padding: "20px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(200,169,106,0.65)" }}>{item.subtitle}</span>
                        <span style={{ fontFamily: "Figtree, sans-serif", fontSize: "18px", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.3 }}>{item.title}</span>
                      </div>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "22px", fontWeight: 300, color: "rgba(245,242,236,0.35)", lineHeight: 1, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.3s ease", flexShrink: 0, marginLeft: "12px" }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ paddingBottom: "20px" }}>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(200,169,106,0.5)", marginBottom: "14px" }}>What this addresses</p>
                        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                          {item.benefits.map((benefit, j) => (
                            <div key={j} style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                              <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "16px", color: "rgba(200,169,106,0.4)", flexShrink: 0, lineHeight: 1 }}>—</span>
                              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(227,222,215,0.65)", lineHeight: 1.75 }}>{benefit}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0" }}>

            {/* Left: selector rows */}
            <div style={{ flex: "0 0 44%", paddingRight: "80px" }}>
              {FOR_WHOM_ITEMS.map((item, i) => {
                const isActive = openForWhom === i;
                return (
                  <div
                    key={i}
                    onClick={() => setOpenForWhom(i)}
                    data-testid={`for-whom-item-${i}`}
                    style={{
                      borderTop: i > 0 ? "1px solid rgba(245,242,236,0.10)" : "none",
                      padding: "28px 0 28px 20px",
                      cursor: "pointer",
                      borderLeft: isActive ? "2px solid rgba(200,169,106,0.65)" : "2px solid transparent",
                      transition: "border-color 0.35s ease",
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "2.5px",
                        textTransform: "uppercase",
                        color: isActive ? "rgba(200,169,106,0.85)" : "rgba(200,169,106,0.28)",
                        marginBottom: "10px",
                        transition: "color 0.35s",
                      }}
                    >
                      {item.subtitle}
                    </p>
                    <h3
                      style={{
                        fontFamily: "Figtree, sans-serif",
                        fontSize: "clamp(20px, 2.4vw, 32px)",
                        fontWeight: 400,
                        color: isActive ? "#F5F2EC" : "rgba(245,242,236,0.32)",
                        transition: "color 0.35s",
                        lineHeight: 1.15,
                      }}
                    >
                      {item.title}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div style={{ width: "1px", background: "rgba(245,242,236,0.08)", flexShrink: 0, alignSelf: "stretch" }} />

            {/* Right: benefits panel */}
            <div style={{ flex: 1, paddingLeft: "80px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={openForWhom}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div style={{ marginBottom: "32px" }}>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "10px",
                        fontWeight: 500,
                        letterSpacing: "2.5px",
                        textTransform: "uppercase",
                        color: "rgba(200,169,106,0.5)",
                      }}
                    >
                      What this addresses
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {FOR_WHOM_ITEMS[openForWhom].benefits.map((benefit, j) => (
                      <motion.div
                        key={j}
                        initial={{ opacity: 0, x: 14 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: j * 0.07, duration: 0.38, ease: "easeOut" }}
                        style={{ display: "flex", gap: "18px", alignItems: "baseline" }}
                      >
                        <span
                          style={{
                            fontFamily: "Cormorant Garamond, serif",
                            fontSize: "18px",
                            color: "rgba(200,169,106,0.4)",
                            flexShrink: 0,
                            lineHeight: 1,
                          }}
                        >
                          —
                        </span>
                        <p
                          style={{
                            fontFamily: "Manrope, sans-serif",
                            fontSize: "14px",
                            fontWeight: 300,
                            color: "rgba(227,222,215,0.65)",
                            lineHeight: 1.8,
                          }}
                        >
                          {benefit}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          )}{/* end isMobile for-whom conditional */}

          {/* Unified CTA */}
          <div style={{ marginTop: "56px", display: "flex", justifyContent: "center" }}>
            <button
              onClick={() => openForm('org-advisory', 'Organizational Advisory')}
              className="btn-primary"
              style={{ borderRadius: "8px", cursor: "pointer" }}
              data-testid="advisory-for-whom-cta"
            >
              Begin the Conversation
            </button>
          </div>

        </div>
      </section>

      {/* ══ 7. TESTIMONIALS — Deep forest, glassmorphic ══════════════════════ */}
      <section className="ct-section relative overflow-hidden" style={{ background: "#0F1A12" }} data-testid="advisory-testimonials">
        <NeuralCanvas opacity={0.05} nodeCount={28} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline text-gold/60 mb-10">
              {t.home.testimonials.overline}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div
              style={{
                display: "flex",
                minHeight: "400px",
                background: "rgba(245,242,236,0.04)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                border: "1px solid rgba(200,169,106,0.12)",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Quote — full width */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: isMobile ? "48px 36px" : "64px 80px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "120px",
                    lineHeight: 1,
                    color: "rgba(200,169,106,0.06)",
                    position: "absolute",
                    top: "16px",
                    left: "52px",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  &ldquo;
                </span>
                <div style={{ position: "relative", minHeight: "220px" }}>
                  {testimonials.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute", inset: 0,
                        display: "flex", flexDirection: "column", justifyContent: "center",
                        opacity: i === activeTestimonial ? 1 : 0,
                        transform: i === activeTestimonial ? "translateY(0)" : "translateY(14px)",
                        transition: "opacity 0.8s ease, transform 0.8s ease",
                        pointerEvents: i === activeTestimonial ? "auto" : "none",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "clamp(20px, 2.2vw, 26px)",
                          fontWeight: 400,
                          color: "#F5F2EC",
                          lineHeight: 1.45,
                          fontStyle: "italic",
                        }}
                      >
                        "{item.text}"
                      </p>
                      <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "28px", height: "1px", background: "rgba(200,169,106,0.5)" }} />
                        <div>
                          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 500, color: "rgba(200,169,106,0.9)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                            {item.author}
                          </p>
                          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(227,222,215,0.4)", marginTop: "3px" }}>
                            {item.company}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Progress bar */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(200,169,106,0.08)" }}>
                <div
                  key={activeTestimonial}
                  style={{ height: "100%", background: "rgba(200,169,106,0.45)", animation: "progressSlide 6s linear forwards" }}
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Text-based author navigation */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0", marginTop: "4px", paddingLeft: "4px", borderTop: "1px solid rgba(200,169,106,0.12)" }}>
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => { setActiveTestimonial(i); restartTimer(testimonials.length); }}
                data-testid={`testimonial-nav-${i}`}
                style={{ background: "none", border: "none", padding: "20px 32px 20px 0", cursor: "pointer", textAlign: "left", position: "relative" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: i === activeTestimonial ? "rgba(200,169,106,0.65)" : "transparent", transition: "background 0.4s ease" }} />
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.20em", textTransform: "uppercase", color: i === activeTestimonial ? "#F5F2EC" : "rgba(245,242,236,0.28)", transition: "color 0.4s ease", marginBottom: "4px" }}>
                  {item.author}
                </p>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 300, color: i === activeTestimonial ? "rgba(200,169,106,0.70)" : "rgba(200,169,106,0.22)", transition: "color 0.4s ease", letterSpacing: "0.05em" }}>
                  {item.company}
                </p>
              </button>
            ))}
          </div>
        </div>
        <style>{`@keyframes progressSlide { from { width: 0%; } to { width: 100%; } }`}</style>
      </section>

      {/* ══ 8. FINAL CTA — Forest → Ivory gradient ══════════════════════════ */}
      <section
        className="ct-section relative overflow-hidden"
        style={{ background: FOREST_TO_IVORY }}
        data-testid="advisory-cta"
      >
        <NeuralCanvas opacity={0.04} nodeCount={20} />
        <div className="relative z-10 max-w-[760px] mx-auto px-6">
          <ScrollReveal>
            <div
              style={{
                background: "rgba(15,26,18,0.92)",
                backdropFilter: "blur(24px)",
                WebkitBackdropFilter: "blur(24px)",
                border: "1px solid rgba(200,169,106,0.22)",
                borderRadius: "20px",
                padding: "80px 72px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", top: 0, left: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.45)" }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.45)" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.45)" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.45)" }} />

              <div className="relative z-10">
                <h2
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontSize: "clamp(28px, 3.5vw, 44px)",
                    fontWeight: 400,
                    lineHeight: 1.1,
                    color: "#F5F2EC",
                  }}
                >
                  When Transformation Becomes the Work
                </h2>
                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "15px",
                    fontWeight: 300,
                    color: "rgba(227,222,215,0.45)",
                    lineHeight: 1.75,
                    marginTop: "18px",
                  }}
                >
                  If your organisation is at a point where people, culture, and leadership need to evolve together, I welcome an initial conversation to understand your situation.
                </p>
                <button
                  onClick={() => openForm('org-advisory', 'Organizational Advisory')}
                  className="btn-secondary"
                  style={{ marginTop: "40px", borderRadius: "8px", display: "inline-block", cursor: "pointer" }}
                  data-testid="advisory-apply-btn"
                >
                  Begin the Conversation
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      </div>{/* end dark cluster */}

    </div>
  );
};

export default OrganizationalAdvisory;
