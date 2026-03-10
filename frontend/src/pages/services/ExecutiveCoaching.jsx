import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import NeuralCanvas from "../../components/NeuralCanvas";
import ScrollReveal from "../../components/ScrollReveal";
import { useLanguage } from "../../context/LanguageContext";

// ─── Constants ────────────────────────────────────────────────────────────────
const HERO_BG =
  "https://images.unsplash.com/photo-1754663575934-7964717934c1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGV4ZWN1dGl2ZSUyMGNvbnRlbXBsYXRpdmUlMjB3aW5kb3clMjBsaWdodCUyMG1vb2R5JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzczMTQyOTA3fDA&ixlib=rb-4.1.0&q=85";

const TESTIMONIAL_PORTRAITS = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
];

const PHASES = [
  {
    number: "01",
    label: "Orientation & Mirroring",
    duration: "Months 1–3",
    description:
      "Establishing the reflective space. Mapping the landscape of your leadership. The work begins with what is most present and pressing — not with a framework imposed from outside.",
  },
  {
    number: "02",
    label: "Deepening",
    duration: "Months 4–8",
    description:
      "Patterns emerge. The nervous system work begins. What was invisible becomes visible — and workable. This is where the real change takes root.",
  },
  {
    number: "03",
    label: "Integration",
    duration: "Months 9–12",
    description:
      "The changes consolidate. New ways of leading become structural, not effortful. The work moves from insight to embodied capacity.",
  },
];

const WHAT_SHIFTS = [
  "The inner architecture of decision-making becomes transparent — and available to change",
  "Leadership presence deepens from performance to genuine, embodied authority",
  "The capacity to hold high complexity without losing clarity or regulation",
  "Relationships marked by depth, directness, and genuine trust",
  "The ability to act from your own centre, even under the most demanding conditions",
  "A quality of inner spaciousness that changes the texture of leadership entirely",
];

// ─── Concentric Circles ───────────────────────────────────────────────────────
const ConcentricCircles = () => (
  <div style={{ position: "relative", width: "320px", height: "320px", margin: "0 auto" }}>
    {/* Outer ring — Integration */}
    <motion.div
      initial={{ scale: 0.6, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "1px solid rgba(200,169,106,0.18)" }}
    />
    {/* Middle ring — Deepening */}
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{ position: "absolute", inset: "52px", borderRadius: "50%", border: "1px solid rgba(200,169,106,0.32)" }}
    />
    {/* Inner ring — Orientation */}
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, delay: 0.06, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        position: "absolute", inset: "104px", borderRadius: "50%",
        border: "1px solid rgba(200,169,106,0.52)",
        background: "rgba(200,169,106,0.03)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}
    >
      <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "11px", fontStyle: "italic", color: "rgba(200,169,106,0.55)", textAlign: "center" }}>
        The Work
      </span>
    </motion.div>
    {/* Phase labels — positioned around the rings */}
    {PHASES.map((phase, i) => {
      const radii = [160, 108, 56]; // distance from center
      const angles = [-55, 25, -10]; // angle in degrees
      const rads = (angles[i] * Math.PI) / 180;
      const x = 160 + radii[i] * Math.cos(rads) - 36;
      const y = 160 + radii[i] * Math.sin(rads) - 10;
      return (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + i * 0.15, duration: 0.6 }}
          style={{ position: "absolute", left: x, top: y, pointerEvents: "none" }}
        >
          <span style={{
            fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600,
            letterSpacing: "1.5px", textTransform: "uppercase",
            color: "rgba(200,169,106,0.6)",
          }}>
            {phase.number}
          </span>
        </motion.div>
      );
    })}
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const ExecutiveCoaching = () => {
  const { t } = useLanguage();
  const s = t.services.executiveCoaching;

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "-12%"]);

  // Testimonials
  const testimonials = t.home.testimonials.items;
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

  // For whom active item
  const [activeForWhom, setActiveForWhom] = useState(null);

  return (
    <div className="bg-[#F5F2EC]">

      {/* ══ 1. HERO — rounded-card wrapper matching Home & Method ════════ */}
      <section
        className="pt-[6px] px-3 md:px-4 pb-3"
        style={{ background: "#F5F2EC" }}
        data-testid="coaching-hero"
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
              objectFit: "cover", objectPosition: "center top",
              y: heroBgY,
            }}
          />
          {/* Left gradient */}
          <div
            className="absolute inset-0 z-[1]"
            style={{ background: "linear-gradient(to right, rgba(18,18,18,1.00) 0%, rgba(18,18,18,0.90) 20%, rgba(18,18,18,0.75) 40%, rgba(18,18,18,0.30) 60%, rgba(18,18,18,0.15) 80%, rgba(18,18,18,0.01) 100%)" }}
          />
          {/* Top strip */}
          <div
            className="absolute top-0 left-0 right-0 z-[2]"
            style={{ height: "130px", background: "linear-gradient(to bottom, rgba(12,12,12,0.65) 0%, rgba(12,12,12,0.2) 70%, transparent 100%)" }}
          />
          <NeuralCanvas opacity={0.08} nodeCount={40} />

          {/* Content — bottom left */}
          <div className="absolute bottom-0 left-0 z-10 p-8 md:p-14" style={{ maxWidth: "860px" }}>
            <ScrollReveal delay={0.1}>
              <p className="ct-overline text-gold mb-6">{s.hero.overline}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <h1
                className="text-ivory leading-[1.04]"
                style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(40px, 6.5vw, 84px)", fontWeight: 400 }}
                data-testid="coaching-hero-headline"
              >
                {s.hero.headline}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.42}>
              <p
                className="mt-5 max-w-[520px] leading-relaxed"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", fontStyle: "italic", color: "rgba(227,222,215,0.65)" }}
              >
                {s.hero.subtitle}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.58}>
              <div className="flex flex-col sm:flex-row gap-3 mt-9 mb-10">
                <Link
                  to="/contact"
                  className="btn-primary inline-block"
                  style={{ borderRadius: "8px" }}
                  data-testid="coaching-hero-cta"
                >
                  Begin an Application
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══ 2. CORE PREMISE — Ivory ══════════════════════════════════════════ */}
      <section className="ct-section" style={{ background: "#F5F2EC" }} data-testid="coaching-premise">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div style={{ display: "flex", gap: "80px", alignItems: "flex-start" }}>
            {/* Left: pull quote */}
            <div style={{ flex: "0 0 42%" }}>
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
            <div style={{ flex: 1, paddingTop: "64px" }}>
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

      {/* ══ 3. HOW THE ENGAGEMENT UNFOLDS — Ivory→Charcoal + Concentric Circles ══ */}
      <section
        className="ct-section"
        style={{ background: "linear-gradient(to bottom, #F5F2EC 0%, #D4C5B0 8%, #A08872 20%, #6B5040 35%, #3D2410 55%, #1A1210 76%, #121212 100%)" }}
        data-testid="coaching-phases"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          {/* Heading */}
          <div className="max-w-[600px] mb-20">
            <ScrollReveal>
              <p className="ct-overline text-sage mb-5">The Engagement Arc</p>
              <h2
                style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400, color: "#121212", lineHeight: 1.1 }}
              >
                How the Work Unfolds Over Time
              </h2>
            </ScrollReveal>
          </div>

          {/* Two columns */}
          <div style={{ display: "flex", gap: "80px", alignItems: "center" }}>

            {/* Left: concentric circles */}
            <div style={{ flex: "0 0 38%" }}>
              <ConcentricCircles />
            </div>

            {/* Thin divider */}
            <div style={{ width: "1px", background: "rgba(245,242,236,0.1)", flexShrink: 0, alignSelf: "stretch" }} />

            {/* Right: phase rows */}
            <div style={{ flex: 1 }}>
              {PHASES.map((phase, i) => (
                <ScrollReveal key={i} delay={0.12 * i}>
                  <div
                    style={{
                      borderTop: i > 0 ? "1px solid rgba(245,242,236,0.1)" : "none",
                      paddingTop: i > 0 ? "32px" : "0",
                      paddingBottom: "32px",
                      paddingLeft: "20px",
                      borderLeft: "2px solid rgba(200,169,106,0.35)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "8px" }}>
                      <span
                        style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(200,169,106,0.7)" }}
                      >
                        {phase.number}
                      </span>
                      <span
                        style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 400, letterSpacing: "1px", color: "rgba(245,242,236,0.3)", textTransform: "uppercase" }}
                      >
                        {phase.duration}
                      </span>
                    </div>
                    <h3
                      style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(18px, 2vw, 24px)", fontWeight: 400, color: "rgba(245,242,236,0.85)", marginBottom: "10px", lineHeight: 1.2 }}
                    >
                      {phase.label}
                    </h3>
                    <p
                      style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,242,236,0.45)", lineHeight: 1.75 }}
                    >
                      {phase.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. WHAT YOU RECEIVE — Charcoal (NARM-row style) ════════════════ */}
      <section className="ct-section" style={{ background: "#121212" }} data-testid="coaching-format-detail">
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
            { number: "01", title: "Regular 1:1 Sessions", description: "Biweekly 90-minute sessions. Structured and held. A dedicated space for whatever is most present — not a fixed curriculum, but a living relationship with your development." },
            { number: "02", title: "Direct Messenger Access", description: "Between sessions, for brief check-ins and to capture emerging themes before they dissolve. The work doesn't pause between calls." },
            { number: "03", title: "Individually Designed Deep-Dive Sessions", description: "Longer format sessions for work that requires more time, depth, or preparation. These are designed around specific edges in your development." },
            { number: "04", title: "Personalized Recordings", description: "Created specifically for you to support self-regulation and integration between sessions. A private resource that travels with you." },
          ].map((item, i) => {
            const bgOpacity = 0.04 + (i / 3) * 0.07;
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
                    <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, color: "rgba(200,169,106,0.8)", letterSpacing: "1px" }}>
                      {item.number}
                    </span>
                  </div>
                  <div
                    style={{
                      flex: 1, padding: "22px 32px",
                      background: `rgba(200,169,106,${bgOpacity})`,
                      border: "1px solid rgba(200,169,106,0.1)",
                      borderLeft: "none",
                      display: "flex", gap: "40px", alignItems: "baseline",
                    }}
                  >
                    <p
                      style={{ fontFamily: "Figtree, sans-serif", fontSize: "16px", fontWeight: 400, color: "rgba(245,242,236,0.82)", flexShrink: 0, minWidth: "260px" }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,242,236,0.42)", lineHeight: 1.7 }}
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

      {/* ══ 5. FOR WHOM — Charcoal→Ivory gradient (accordion editorial style) ══ */}
      <section
        className="ct-section"
        style={{ background: "linear-gradient(to bottom, #121212 0%, #1A1210 25%, #3D2410 48%, #6B5040 65%, #A08872 80%, #D4C5B0 92%, #F5F2EC 100%)" }}
        data-testid="coaching-for-whom"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="max-w-[600px] mb-16">
            <ScrollReveal>
              <p className="ct-overline text-gold/60 mb-5">{s.forWhom.overline}</p>
              <h2
                style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.1 }}
              >
                {s.forWhom.headline}
              </h2>
            </ScrollReveal>
          </div>

          <div style={{ maxWidth: "760px" }}>
            {s.forWhom.items.map((item, i) => (
              <ScrollReveal key={i} delay={0.08 * i}>
                <div
                  style={{
                    borderTop: i > 0 ? "1px solid rgba(245,242,236,0.1)" : "none",
                    padding: "28px 0 28px 20px",
                    borderLeft: "2px solid rgba(200,169,106,0.4)",
                  }}
                  data-testid={`for-whom-item-${i}`}
                >
                  <div style={{ display: "flex", gap: "18px", alignItems: "baseline" }}>
                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "16px", color: "rgba(200,169,106,0.4)", flexShrink: 0 }}>—</span>
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300, color: "rgba(245,242,236,0.7)", lineHeight: 1.7 }}>
                      {item}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 6. WHAT SHIFTS — Ivory ══════════════════════════════════════════ */}
      <section className="ct-section" style={{ background: "#F5F2EC" }} data-testid="coaching-what-shifts">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div style={{ display: "flex", gap: "80px", alignItems: "flex-start" }}>
            {/* Left: heading */}
            <div style={{ flex: "0 0 38%" }}>
              <ScrollReveal>
                <p className="ct-overline text-sage mb-5">What Shifts</p>
                <h2
                  style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 400, color: "#121212", lineHeight: 1.1 }}
                >
                  The Changes That Become Structural
                </h2>
                <p
                  style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(18,18,18,0.45)", lineHeight: 1.8, marginTop: "20px" }}
                >
                  Sustained engagement changes the architecture of how you lead — not through effort, but through structural transformation.
                </p>
              </ScrollReveal>
            </div>
            {/* Thin divider */}
            <div style={{ width: "1px", background: "rgba(18,18,18,0.08)", flexShrink: 0, alignSelf: "stretch" }} />
            {/* Right: outcomes */}
            <div style={{ flex: 1 }}>
              {WHAT_SHIFTS.map((item, i) => (
                <ScrollReveal key={i} delay={0.07 * i}>
                  <div
                    style={{
                      borderTop: i > 0 ? "1px solid rgba(18,18,18,0.07)" : "none",
                      padding: "22px 0",
                      display: "flex", gap: "18px", alignItems: "baseline",
                    }}
                  >
                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "16px", color: "rgba(18,18,18,0.2)", flexShrink: 0 }}>—</span>
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(18,18,18,0.55)", lineHeight: 1.7 }}>
                      {item}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 7. TESTIMONIALS — Ivory bg, charcoal card ═══════════════════════ */}
      <section className="ct-section" style={{ background: "#F5F2EC" }} data-testid="coaching-testimonials">
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
              {/* Portrait */}
              <div style={{ width: "38%", flexShrink: 0, position: "relative" }}>
                {TESTIMONIAL_PORTRAITS.map((src, i) => (
                  <img key={i} src={src} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", opacity: i === activeTestimonial ? 1 : 0, transition: "opacity 0.9s ease", filter: "grayscale(15%)" }} />
                ))}
                <div style={{ position: "absolute", right: 0, top: "15%", bottom: "15%", width: "1px", background: "linear-gradient(to bottom, transparent, rgba(200,169,106,0.4), transparent)", zIndex: 2 }} />
              </div>
              {/* Quote */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "52px 60px", position: "relative" }}>
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

          {/* Thumbnail nav */}
          <div style={{ display: "flex", gap: "28px", marginTop: "0px", alignItems: "flex-start", paddingLeft: "4px" }}>
            {TESTIMONIAL_PORTRAITS.map((src, i) => (
              <button
                key={i}
                onClick={() => { setActiveTestimonial(i); restartTimer(testimonials.length); }}
                data-testid={`testimonial-nav-${i}`}
                style={{ background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}
              >
                <div style={{ width: i === activeTestimonial ? "68px" : "56px", height: i === activeTestimonial ? "68px" : "56px", borderRadius: "50%", overflow: "hidden", border: i === activeTestimonial ? "2px solid #C8A96A" : "2px solid rgba(18,18,18,0.12)", transform: i === activeTestimonial ? "translateY(-12px)" : "translateY(0)", transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)", flexShrink: 0, boxShadow: i === activeTestimonial ? "0 8px 28px rgba(200,169,106,0.18)" : "none" }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", filter: i === activeTestimonial ? "none" : "grayscale(70%)", transition: "filter 0.45s ease" }} />
                </div>
                <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", color: i === activeTestimonial ? "#121212" : "rgba(18,18,18,0.32)", transition: "color 0.4s ease", textAlign: "center", maxWidth: "88px", lineHeight: 1.55 }}>
                  {testimonials[i]?.author}
                </span>
              </button>
            ))}
          </div>
        </div>
        <style>{`@keyframes progressSlide { from { width: 0%; } to { width: 100%; } }`}</style>
      </section>

      {/* ══ 8. ENGAGEMENT DETAILS — Ivory→Charcoal gradient ════════════════ */}
      <section
        className="ct-section"
        style={{ background: "linear-gradient(to bottom, #F5F2EC 0%, #D4C5B0 8%, #A08872 20%, #6B5040 35%, #3D2410 55%, #1A1210 76%, #121212 100%)" }}
        data-testid="coaching-format"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div style={{ display: "flex", gap: "80px", alignItems: "flex-start" }}>
            {/* Left: heading */}
            <div style={{ flex: "0 0 38%" }}>
              <ScrollReveal>
                <p className="ct-overline text-sage mb-5">{s.format.overline}</p>
                <h2
                  style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.2vw, 44px)", fontWeight: 400, color: "#121212", lineHeight: 1.1 }}
                >
                  {s.format.headline}
                </h2>
              </ScrollReveal>
            </div>
            {/* Right: format rows */}
            <div style={{ flex: 1, paddingTop: "64px" }}>
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

      {/* ══ 9. FINAL CTA — Charcoal bg, gold glassmorphic card ══════════════ */}
      <section className="ct-section" style={{ background: "#121212" }} data-testid="coaching-cta">
        <div className="max-w-[760px] mx-auto px-6">
          <ScrollReveal>
            <div
              style={{
                background: "rgba(14, 9, 0, 0.92)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(200,169,106,0.25)",
                borderRadius: "20px",
                padding: "80px 72px",
                textAlign: "center",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,169,106,0.05) 0%, transparent 70%)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.35)" }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.35)" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.35)" }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.35)" }} />
              <div className="relative z-10">
                <h2 style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.1, color: "#F5F2EC" }}>
                  {s.cta.headline}
                </h2>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300, color: "rgba(227,222,215,0.45)", lineHeight: 1.75, marginTop: "18px" }}>
                  All engagements begin with a conversation. There is no obligation — only the beginning of understanding whether this is the right fit.
                </p>
                <Link
                  to="/contact"
                  className="btn-primary inline-block"
                  style={{ marginTop: "40px", borderRadius: "8px" }}
                  data-testid="coaching-apply-btn"
                >
                  {s.cta.button}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default ExecutiveCoaching;
