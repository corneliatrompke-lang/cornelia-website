import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import NeuralCanvas from "../../components/NeuralCanvas";
import ScrollReveal from "../../components/ScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import { useContactForm } from "../../context/ContactFormContext";

// ─── Constants ────────────────────────────────────────────────────────────────
const HERO_BG =
  "https://images.unsplash.com/photo-1771270759486-1f7703945072?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODB8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBtZWV0aW5nJTIwcm9vbSUyMGV4ZWN1dGl2ZXMlMjBkYXJrJTIwcHJvZmVzc2lvbmFsfGVufDB8fHx8MTc3MzMwODA2M3ww&ixlib=rb-4.1.0&q=85";

const TESTIMONIAL_PORTRAITS = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
];

const PROCESS_PHASES = [
  {
    number: "01",
    title: "Individual Sessions",
    subtitle: "Listening Beneath the Surface",
    description:
      "The work begins with individual conversations with each member of the leadership team. These sessions give each person space to share their perspective, their experience of the team, and what they sense is most needed — without constraint. What emerges is always a fuller and more honest picture than the group dynamic alone reveals.",
  },
  {
    number: "02",
    title: "Facilitated Team Sessions",
    subtitle: "Creating the Conditions for Real Alignment",
    description:
      "Drawing on those individual insights, the facilitated sessions bring the full leadership team together to address what is actually real — priorities, communication patterns, unresolved tensions, and how decisions are genuinely made. The sessions are direct, carefully structured, and held with both challenge and care.",
  },
];

const WORK_ADDRESSES = [
  {
    number: "01",
    title: "Priorities",
    subtitle: "Shared Direction",
    body: "Leadership teams often carry strong, separately-optimising individual agendas that fragment collective direction. This work creates genuine shared clarity on what matters most — and why. That alignment becomes the foundation from which every decision and every direction that follows can be made with real authority.",
  },
  {
    number: "02",
    title: "Communication",
    subtitle: "How the Team Actually Speaks",
    body: "How leaders speak to each other in a room determines how the organisation functions at every level below. This work surfaces the patterns that slow, distort, and bypass real exchange — and creates the conditions for more direct, honest, and genuinely productive communication across the leadership body.",
  },
  {
    number: "03",
    title: "Tensions",
    subtitle: "What Is Really in the Room",
    body: "Unaddressed tensions cost organisations enormous energy, clarity, and trust. The facilitated sessions create conditions in which what has been unsayable can finally be said — and worked through constructively, rather than managed around indefinitely at great invisible cost.",
  },
  {
    number: "04",
    title: "Decision-Making",
    subtitle: "From Discussion to Commitment",
    body: "Strong individuals often inadvertently stall the collective decisions that need to move. This work builds a shared framework for how the team decides together — creating speed, genuine accountability, and clarity in how the organisation is actually led from the top.",
  },
];

const FOR_WHOM_ITEMS = [
  {
    number: "01",
    subtitle: "A CEO and Their Direct Reports",
    title: "The C-Suite",
    benefits: [
      "Establish shared direction and genuine priorities the whole team can actually act from",
      "Surface the dynamics that are slowing or fragmenting collective decision-making",
      "Build communication norms that create real clarity — not more noise",
      "Develop the team's real capacity to address difficulty directly and constructively",
    ],
  },
  {
    number: "02",
    subtitle: "Early Ways of Working at Their Limit",
    title: "The Founder's Team",
    benefits: [
      "Navigate the transition from founder-led culture to a genuinely structured leadership team",
      "Establish shared ownership over direction — rather than competing individual fiefdoms",
      "Rebuild trust on a more honest, adult, peer basis than the early culture allowed",
      "Create decision-making norms that scale with the organisation as it grows",
    ],
  },
  {
    number: "03",
    subtitle: "Navigating Significant Organisational Change",
    title: "The Transition Team",
    benefits: [
      "Create stability and shared ground during restructuring, merger, or leadership transition",
      "Manage the anxiety of change without suppressing what genuinely needs to be addressed",
      "Realign around new priorities without losing the team's hard-won collective intelligence",
      "Emerge from the transition as a more coherent and capable leadership body than before",
    ],
  },
  {
    number: "04",
    subtitle: "Starting from the Ground Up",
    title: "The New Leadership Body",
    benefits: [
      "Establish working norms and shared expectations before pressure creates them by force",
      "Build genuine trust — not assumed from day one, but earned through real structured work",
      "Create clarity on how decisions are made, by whom, and on what basis",
      "Develop a culture of direct and honest peer communication from the very outset",
    ],
  },
];

const OUTCOME_ROWS = [
  {
    label: "Priorities",
    before: "Strong, separately-optimising individual agendas",
    after: "Shared direction the whole team can genuinely act from",
  },
  {
    label: "Communication",
    before: "Patterns that slow, distort, or bypass real exchange",
    after: "Direct, honest communication between peers",
  },
  {
    label: "Tensions",
    before: "Energy consumed by what goes permanently unsaid",
    after: "Difficulty addressed directly and constructively",
  },
  {
    label: "Decisions",
    before: "Slow, recursive, or quietly avoided collective decisions",
    after: "Clear, fast decisions made from a shared framework",
  },
];

const PHASE_GRADIENT =
  "linear-gradient(to bottom, #F5F2EC 0%, #CDD8C4 15%, #8A9A80 32%, #2A3825 52%, #162018 75%, #0F1A12 100%)";

const OUTCOME_GRADIENT =
  "linear-gradient(to bottom, #0F1A12 0%, #162018 25%, #2A3825 48%, #8A9A80 68%, #CDD8C4 85%, #F5F2EC 100%)";

// ─── Page ─────────────────────────────────────────────────────────────────────
const TeamFacilitation = () => {
  const { t } = useLanguage();
  const { openForm } = useContactForm();
  const testimonials = t.home.testimonials.items;

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "-12%"]);

  // Accordion states
  const [activeWork, setActiveWork] = useState(null);
  const [openForWhom, setOpenForWhom] = useState(0);
  const [openWorkMobile, setOpenWorkMobile] = useState(0);

  // Mobile
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Testimonials
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const timerRef = useRef(null);
  const restartTimer = (len) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActiveTestimonial((p) => (p + 1) % len), 6000);
  };
  useEffect(() => {
    restartTimer(testimonials.length);
    return () => clearInterval(timerRef.current);
  }, [testimonials.length]);

  return (
    <div className="bg-[#F5F2EC]">

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section
        className="pt-[6px] px-3 md:px-4 pb-3"
        style={{ background: "#F5F2EC" }}
        data-testid="facilitation-hero"
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
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to right, rgba(15,26,18,0.97) 0%, rgba(15,26,18,0.90) 25%, rgba(15,26,18,0.72) 48%, rgba(15,26,18,0.28) 68%, rgba(15,26,18,0.06) 100%)",
            }}
          />
          <div
            className="absolute top-0 left-0 right-0 z-[2]"
            style={{ height: "130px", background: "linear-gradient(to bottom, rgba(15,26,18,0.70) 0%, rgba(15,26,18,0.2) 70%, transparent 100%)" }}
          />
          <NeuralCanvas opacity={0.05} nodeCount={30} />
          <div className="absolute bottom-0 left-0 z-10 p-8 md:p-14" style={{ maxWidth: "860px" }}>
            <ScrollReveal delay={0.1}>
              <p className="ct-overline text-gold mb-6">02 — Team Facilitation</p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <h1
                className="text-ivory leading-[1.04]"
                style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(40px, 6.5vw, 84px)", fontWeight: 400 }}
                data-testid="facilitation-hero-headline"
              >
                From Strong Individuals to a Coherent Leadership Unit
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.42}>
              <p
                className="mt-5 max-w-[520px] leading-relaxed"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", fontStyle: "italic", color: "rgba(227,222,215,0.65)" }}
              >
                Alignment. Clarity. Decision-making authority.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.58}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "36px", marginBottom: "40px" }}>
                <button onClick={() => openForm('team-facilitation')} className="btn-hero-pill" data-testid="facilitation-hero-cta">
                  Begin the Conversation
                </button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ 2. THE PREMISE — Ivory ═══════════════════════════════════════════ */}
      <section className="ct-section" style={{ background: "#F5F2EC" }} data-testid="facilitation-premise">
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
                  "In my 1:1 work with leaders, it becomes clear again and again that the most persistent challenges are rarely individual — they live in the space between people."
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
                "In my work with leadership teams, I help leaders align on shared priorities, improve how they communicate under pressure, address what has gone unsaid, and build the kind of trust that enables real collective decisions.",
                "The goal is not harmony for its own sake. It is to move the leadership team from a group of strong individuals — each optimising separately — to a genuinely synchronised leadership body capable of leading the organisation with clarity and authority.",
                "This work operates at the level of the team as a system, not only at the level of each individual within it. That distinction is everything.",
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

      {/* ══ 3. HOW IT WORKS — Ivory → Forest gradient ════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{ background: PHASE_GRADIENT, paddingTop: "160px", paddingBottom: "140px" }}
        data-testid="facilitation-process"
      >
        {/* Decorative numeral — top ivory zone only */}
        <div
          style={{
            position: "absolute", right: "-60px", top: "30px",
            fontFamily: "Cormorant Garamond, serif", fontSize: "480px",
            fontWeight: 300, color: "rgba(18,18,18,0.022)", lineHeight: 1,
            pointerEvents: "none", userSelect: "none",
          }}
        >
          02
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-16 relative z-10">
          {/* Heading — sits in the ivory/sage top zone */}
          <ScrollReveal>
            <p className="ct-overline text-sage mb-5">The Process</p>
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
              Two Phases. One Coherent Team.
            </h2>
          </ScrollReveal>

          {/* Phases — two columns (desktop) or stacked (mobile) */}
          <ScrollReveal>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
              }}
            >
              {PROCESS_PHASES.map((phase, i) => (
                <div
                  key={i}
                  style={{
                    paddingTop: "32px",
                    paddingRight: !isMobile && i === 0 ? "clamp(40px, 6vw, 80px)" : "0",
                    paddingLeft: !isMobile && i === 1 ? "clamp(40px, 6vw, 80px)" : "0",
                    paddingBottom: isMobile ? "40px" : "0",
                    borderRight: !isMobile && i === 0 ? "1px solid rgba(245,242,236,0.10)" : "none",
                    borderBottom: isMobile && i === 0 ? "1px solid rgba(245,242,236,0.10)" : "none",
                  }}
                  data-testid={`process-phase-${i}`}
                >
                  <span
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "clamp(72px, 9vw, 110px)",
                      fontWeight: 300,
                      color: "rgba(200,169,106,0.10)",
                      lineHeight: 1,
                      display: "block",
                      marginBottom: "-6px",
                      letterSpacing: "-2px",
                    }}
                  >
                    {phase.number}
                  </span>
                  <h3
                    style={{
                      fontFamily: "Figtree, sans-serif",
                      fontSize: "clamp(22px, 2.4vw, 34px)",
                      fontWeight: 400,
                      color: "rgba(245,242,236,0.92)",
                      lineHeight: 1.12,
                      marginBottom: "12px",
                    }}
                  >
                    {phase.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "16px",
                      fontStyle: "italic",
                      color: "rgba(200,169,106,0.55)",
                      marginBottom: "28px",
                    }}
                  >
                    {phase.subtitle}
                  </p>
                  <p
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "rgba(245,242,236,0.52)",
                      lineHeight: 1.9,
                    }}
                  >
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Dark cluster: eliminates sub-pixel gaps between consecutive dark sections ─── */}
      <div style={{ background: "#0F1A12", marginTop: "-2px" }}>

      {/* ══ 4. WHAT THE WORK ADDRESSES — Deep forest, accordion ══════════════ */}
      <section className="ct-section" style={{ background: "#0F1A12" }} data-testid="facilitation-work">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="max-w-[600px] mx-auto mb-16 text-center">
            <ScrollReveal>
              <p className="ct-overline text-gold/60 mb-5">The Work</p>
              <h2
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 46px)",
                  fontWeight: 400,
                  color: "#F5F2EC",
                  lineHeight: 1.1,
                }}
              >
                Four Dimensions of Genuine Team Alignment
              </h2>
            </ScrollReveal>
          </div>

          {isMobile ? (
            /* ── Mobile: vertical accordion ── */
            <div>
              {WORK_ADDRESSES.map((item, i) => {
                const isOpen = openWorkMobile === i;
                return (
                  <div key={i} style={{ borderBottom: "1px solid rgba(245,242,236,0.08)" }} data-testid={`work-item-${i}`}>
                    <button
                      onClick={() => setOpenWorkMobile(isOpen ? null : i)}
                      style={{ width: "100%", textAlign: "left", padding: "20px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <div style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(200,169,106,0.65)", flexShrink: 0 }}>{item.number}</span>
                        <span style={{ fontFamily: "Figtree, sans-serif", fontSize: "18px", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.3 }}>{item.title}</span>
                      </div>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "22px", fontWeight: 300, color: "rgba(245,242,236,0.35)", lineHeight: 1, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.3s ease", flexShrink: 0, marginLeft: "12px" }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ paddingBottom: "20px", paddingRight: "8px" }}>
                        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "14px", fontStyle: "italic", color: "rgba(200,169,106,0.55)", marginBottom: "10px" }}>{item.subtitle}</p>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,242,236,0.52)", lineHeight: 1.75 }}>{item.body}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
          <div className="flex" style={{ height: "420px", overflow: "hidden" }}>
            {WORK_ADDRESSES.map((item, i) => {
              const isActive = activeWork === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveWork(i)}
                  onMouseLeave={() => setActiveWork(null)}
                  data-testid={`work-item-${i}`}
                  style={{
                    flex: isActive ? 3.5 : 1,
                    transition: "flex 0.65s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease",
                    position: "relative",
                    overflow: "hidden",
                    borderRight: i < WORK_ADDRESSES.length - 1 ? "1px solid rgba(245,242,236,0.07)" : "none",
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
                      {item.title}
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
                      {item.number}
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
                      minWidth: "380px",
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
                      {item.number}
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
                      {item.title}
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
                      {item.subtitle}
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
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          )}{/* end isMobile work conditional */}
        </div>
      </section>

      {/* ══ 5. FOR WHOM — Deep forest, Method-style vertical selector ════════ */}
      <section className="ct-section" style={{ background: "#0F1A12" }} data-testid="facilitation-for-whom">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">

          {/* Section heading */}
          <div className="max-w-[680px] mb-20">
            <ScrollReveal>
              <p className="ct-overline text-gold/60 mb-5">For Whom</p>
              <h2 style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400, color: "#F5F2EC" }}>
                The Teams This Work Is Built For
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
          /* ── Desktop: two-column layout ── */
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0" }}>

            {/* Left: selector rows (44%) */}
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

            {/* Thin vertical divider */}
            <div style={{ width: "1px", background: "rgba(245,242,236,0.08)", flexShrink: 0, alignSelf: "stretch" }} />

            {/* Right: benefits panel (56%) — sticky */}
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

          {/* Unified CTA — centered, no divider */}
          <div
            style={{
              marginTop: "56px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => openForm('team-facilitation')}
              className="btn-primary"
              style={{ borderRadius: "8px", cursor: "pointer" }}
              data-testid="for-whom-unified-cta"
            >
              Begin the Conversation
            </button>
          </div>

        </div>
      </section>

      {/* ══ 6. WHAT CHANGES — Forest → Ivory gradient ════════════════════════ */}
      <section
        className="ct-section"
        style={{ background: "#0F1A12" }}
        data-testid="facilitation-outcome"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "32px" : "80px", alignItems: "flex-start" }}>

            {/* Left: heading */}
            <div style={{ flex: isMobile ? "none" : "0 0 38%" }}>
              <ScrollReveal>
                <p className="ct-overline text-gold/60 mb-5">The Outcome</p>
                <h2
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontSize: "clamp(28px, 3.2vw, 44px)",
                    fontWeight: 400,
                    color: "#F5F2EC",
                    lineHeight: 1.1,
                    marginBottom: "28px",
                  }}
                >
                  What the Work Actually Creates
                </h2>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "18px",
                    fontStyle: "italic",
                    color: "rgba(245,242,236,0.45)",
                    lineHeight: 1.58,
                    maxWidth: "340px",
                  }}
                >
                  "A group of strong individuals becomes a coherent unit with shared direction and mutual accountability."
                </p>
              </ScrollReveal>
            </div>

            {/* Right: before / after table */}
            <div style={{ flex: 1, paddingTop: "8px" }}>
              {/* Headers */}
              <div
                style={{
                  display: "flex",
                  gap: "40px",
                  paddingBottom: "18px",
                  borderBottom: "1px solid rgba(245,242,236,0.10)",
                }}
              >
                <div style={{ flex: "0 0 44%" }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(245,242,236,0.28)" }}>
                    Before
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(200,169,106,0.55)" }}>
                    What Opens
                  </span>
                </div>
              </div>

              {OUTCOME_ROWS.map((row, i) => (
                <ScrollReveal key={i} delay={0.08 * i}>
                  <div
                    style={{
                      display: "flex",
                      gap: "40px",
                      alignItems: "flex-start",
                      borderBottom: "1px solid rgba(245,242,236,0.07)",
                      padding: "24px 0",
                    }}
                    data-testid={`outcome-row-${i}`}
                  >
                    <div style={{ flex: "0 0 44%" }}>
                      <span
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "9px",
                          fontWeight: 600,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: "rgba(200,169,106,0.5)",
                          display: "block",
                          marginBottom: "8px",
                        }}
                      >
                        {row.label}
                      </span>
                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "13px",
                          fontWeight: 300,
                          color: "rgba(245,242,236,0.35)",
                          lineHeight: 1.65,
                        }}
                      >
                        {row.before}
                      </p>
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "14px",
                          fontWeight: 400,
                          color: "rgba(245,242,236,0.78)",
                          lineHeight: 1.65,
                          marginTop: "20px",
                        }}
                      >
                        {row.after}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. TESTIMONIALS — Deep forest, glassmorphic card ════════════════ */}
      <section className="ct-section relative overflow-hidden" style={{ background: "#0F1A12" }} data-testid="facilitation-testimonials">
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
              {/* Portrait (desktop/tablet only) */}
              {!isMobile && (
              <div style={{ width: "38%", flexShrink: 0, position: "relative" }}>
                {TESTIMONIAL_PORTRAITS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    style={{
                      position: "absolute", inset: 0,
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center top",
                      opacity: i === activeTestimonial ? 1 : 0,
                      transition: "opacity 0.9s ease",
                      filter: "grayscale(15%)",
                    }}
                  />
                ))}
                <div
                  style={{
                    position: "absolute", right: 0, top: "15%", bottom: "15%",
                    width: "1px",
                    background: "linear-gradient(to bottom, transparent, rgba(200,169,106,0.4), transparent)",
                    zIndex: 2,
                  }}
                />
              </div>
              )}

              {/* Quote */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: isMobile ? "36px 28px" : "52px 60px",
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

          {/* Thumbnail nav */}
          <div style={{ display: "flex", gap: "28px", marginTop: "0px", alignItems: "flex-start", paddingLeft: "4px" }}>
            {TESTIMONIAL_PORTRAITS.map((src, i) => (
              <button
                key={i}
                onClick={() => { setActiveTestimonial(i); restartTimer(testimonials.length); }}
                data-testid={`testimonial-nav-${i}`}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: i === activeTestimonial ? "68px" : "56px",
                    height: i === activeTestimonial ? "68px" : "56px",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: i === activeTestimonial ? "2px solid #C8A96A" : "2px solid rgba(245,242,236,0.15)",
                    transform: i === activeTestimonial ? "translateY(-12px)" : "translateY(0)",
                    transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                    flexShrink: 0,
                    boxShadow: i === activeTestimonial ? "0 8px 28px rgba(200,169,106,0.18)" : "none",
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: i === activeTestimonial ? "none" : "grayscale(70%)", transition: "filter 0.45s ease" }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "9px",
                    fontWeight: 500,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: i === activeTestimonial ? "#F5F2EC" : "rgba(245,242,236,0.35)",
                    transition: "color 0.4s ease",
                    textAlign: "center",
                    maxWidth: "88px",
                    lineHeight: 1.55,
                  }}
                >
                  {testimonials[i]?.author}
                </span>
              </button>
            ))}
          </div>
        </div>
        <style>{`@keyframes progressSlide { from { width: 0%; } to { width: 100%; } }`}</style>
      </section>

      {/* ══ 8. FINAL CTA — Forest → Ivory gradient ══════════════════════════ */}
      <section
        className="ct-section relative overflow-hidden"
        style={{ background: "linear-gradient(to bottom, #0F1A12 0%, #162018 25%, #2A3825 48%, #8A9A80 68%, #CDD8C4 85%, #F5F2EC 100%)" }}
        data-testid="facilitation-cta"
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
              {/* Corner accents */}
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
                  When Your Team Is Ready
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
                  The work begins with a conversation. If you are facing challenges at the level of your leadership team, I welcome an initial exchange to understand the situation.
                </p>
                <button
                  onClick={() => openForm('team-facilitation')}
                  className="btn-secondary"
                  style={{ marginTop: "40px", borderRadius: "8px", display: "inline-block", cursor: "pointer" }}
                  data-testid="facilitation-apply-btn"
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

export default TeamFacilitation;
