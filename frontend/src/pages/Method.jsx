import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import NeuralCanvas from "../components/NeuralCanvas";
import ScrollReveal from "../components/ScrollReveal";
import VennDiagram from "../components/VennDiagram";
import { useLanguage } from "../context/LanguageContext";

// ─── Assets ─────────────────────────────────────────────────────────────────
const METHOD_HERO_BG =
  "https://images.unsplash.com/photo-1754663575934-7964717934c1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjAzMzJ8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGV4ZWN1dGl2ZSUyMGNvbnRlbXBsYXRpdmUlMjB3aW5kb3clMjBsaWdodCUyMG1vb2R5JTIwcG9ydHJhaXR8ZW58MHx8fHwxNzczMTQyOTA3fDA&ixlib=rb-4.1.0&q=85";

const TESTIMONIAL_PORTRAITS = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
];

// ─── NARM Diagram ────────────────────────────────────────────────────────────
const NarmDiagram = ({ layers }) => (
  <div className="w-full mt-16" data-testid="narm-diagram">
    {layers.map((layer, i) => {
      const progress = i / (layers.length - 1); // 0 = top biological, 1 = bottom expression
      const bgOpacity = 0.06 + progress * 0.12;
      const leftPad = i * 32;
      return (
        <ScrollReveal key={i} delay={0.08 * i}>
          <div
            className="flex items-stretch mb-2"
            style={{ marginLeft: `${leftPad}px` }}
          >
            {/* Level badge */}
            <div
              style={{
                flexShrink: 0,
                width: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: `rgba(200,169,106,${bgOpacity + 0.06})`,
                borderLeft: "2px solid rgba(200,169,106,0.35)",
              }}
            >
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: "rgba(200,169,106,0.7)",
                  letterSpacing: "1px",
                }}
              >
                {layer.level}
              </span>
            </div>
            {/* Content */}
            <div
              style={{
                flex: 1,
                padding: "14px 24px",
                background: `rgba(200,169,106,${bgOpacity})`,
                borderTop: "1px solid rgba(200,169,106,0.1)",
                borderBottom: "1px solid rgba(200,169,106,0.1)",
                borderRight: "1px solid rgba(200,169,106,0.1)",
              }}
            >
              <div className="flex items-baseline gap-4">
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "18px",
                    fontWeight: 600,
                    color: "#C8A96A",
                    minWidth: "140px",
                  }}
                >
                  {layer.name}
                </span>
                <span
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "13px",
                    fontWeight: 300,
                    color: "rgba(227,222,215,0.55)",
                  }}
                >
                  {layer.description}
                </span>
              </div>
            </div>
          </div>
        </ScrollReveal>
      );
    })}
    {/* Arrow at bottom */}
    <ScrollReveal delay={0.5}>
      <div className="flex items-center gap-3 mt-6" style={{ marginLeft: "160px" }}>
        <div style={{ width: "1px", height: "32px", background: "rgba(200,169,106,0.4)" }} />
        <span
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "14px",
            fontStyle: "italic",
            color: "rgba(200,169,106,0.6)",
          }}
        >
          NARM works simultaneously across all layers
        </span>
      </div>
    </ScrollReveal>
  </div>
);

// ─── Page ─────────────────────────────────────────────────────────────────────
const Method = () => {
  const { t } = useLanguage();
  const m = t.method;

  // Hero parallax
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "-12%"]);

  // Accordion
  const [openAccordion, setOpenAccordion] = useState(0);

  // Benefits hover accordion
  const [activeBenefit, setActiveBenefit] = useState(null);

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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials.length]);

  return (
    <div className="bg-[#F5F2EC]">

      {/* ══════════════════════════════════════════════════════════════
          1. HERO — same rounded-card layout as Home
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="pt-[6px] px-3 md:px-4 pb-3"
        style={{ background: "#F5F2EC" }}
        data-testid="method-hero"
      >
        <div
          ref={heroRef}
          className="relative overflow-hidden w-full"
          style={{ borderRadius: "20px", minHeight: "96vh" }}
        >
          <motion.img
            src={METHOD_HERO_BG}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute", left: 0, right: 0, top: 0,
              width: "100%", height: "115%",
              objectFit: "cover", objectPosition: "center",
              y: heroBgY,
            }}
          />
          {/* Left dark gradient */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to right, rgba(18,18,18,1.00) 0%, rgba(18,18,18,0.90) 20%, rgba(18,18,18,0.75) 40%, rgba(18,18,18,0.30) 60%, rgba(18,18,18,0.15) 80%, rgba(18,18,18,0.01) 100%)",
            }}
          />
          {/* Top strip */}
          <div
            className="absolute top-0 left-0 right-0 z-[2]"
            style={{
              height: "130px",
              background: "linear-gradient(to bottom, rgba(12,12,12,0.65) 0%, rgba(12,12,12,0.2) 70%, transparent 100%)",
            }}
          />
          <NeuralCanvas opacity={0.08} nodeCount={40} />

          {/* Bottom-left text */}
          <div className="absolute bottom-0 left-0 z-10 p-8 md:p-14" style={{ maxWidth: "860px" }}>
            <ScrollReveal delay={0.1}>
              <p className="ct-overline text-gold mb-6" data-testid="method-hero-overline">
                {m.hero.overline}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <h1
                className="text-ivory leading-[1.04]"
                style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(40px, 6.5vw, 84px)", fontWeight: 400 }}
                data-testid="method-hero-headline"
              >
                {m.hero.headline}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.42}>
              <p
                className="mt-5 max-w-[520px] leading-relaxed"
                style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300, color: "rgba(227,222,215,0.65)" }}
              >
                {m.hero.subtitle}
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.58}>
              <div className="flex flex-col sm:flex-row gap-3 mt-9 mb-10">
                <Link to="/contact" className="btn-hero-pill" data-testid="method-hero-cta">
                  {m.cta.button}
                  <ArrowRight size={13} />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2">
            <span className="ct-overline text-white/25" style={{ fontSize: "9px" }}>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          2. THE TWO METHODOLOGIES — Ivory, 2×2 grid
          Row 1: [Heading + subtext] | [Venn on ivory]
          Row 2: [NARM card]         | [Integral card]
      ══════════════════════════════════════════════════════════════ */}
      <section className="ct-section" style={{ background: "#F5F2EC", paddingBottom: "60px" }} data-testid="method-what-we-do">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 7fr",
              gap: "40px 64px",
              alignItems: "start",
            }}
            className="grid-cols-1 md:grid-cols-2"
          >

            {/* ── Row 1 Left: heading + subtext ── */}
            <div style={{ gridColumn: 1, gridRow: 1 }}>
              <ScrollReveal>
                <p className="ct-overline text-sage mb-5">{m.whatWeDo.overline}</p>
                <h2
                  className="text-charcoal leading-[1.1]"
                  style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 400 }}
                >
                  {m.whatWeDo.headline}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.12}>
                <p
                  className="mt-6 text-charcoal/55 leading-relaxed"
                  style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}
                >
                  {m.whatWeDo.body}
                </p>
              </ScrollReveal>
            </div>

            {/* ── Row 1 Right: Venn on ivory ── */}
            <div style={{ gridColumn: 2, gridRow: 1 }} data-testid="method-venn-container">
              <ScrollReveal delay={0.08}>
                <VennDiagram showLogo={false} showArrow={false} staticView={true} theme="ivory" />
              </ScrollReveal>
            </div>

            {/* ── Row 2: NARM + Integral — editorial two-column layout ── */}
            <div style={{ gridColumn: "1 / -1" }}>
              <div style={{ display: "flex", alignItems: "stretch" }}>

                {/* NARM — left column */}
                <div style={{ flex: 1, paddingRight: "64px" }}>
                  <ScrollReveal delay={0.1}>
                    <div data-testid="narm-card">
                      <div style={{ paddingTop: "0px", marginBottom: "28px" }}>
                        <p className="ct-overline" style={{ color: "rgba(200,169,106,0.65)" }}>{m.whatWeDo.narmCard.label}</p>
                      </div>
                      <h3 style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(34px, 3.2vw, 50px)", fontWeight: 400, color: "#121212", lineHeight: 1.0, marginBottom: "10px" }}>
                        {m.whatWeDo.narmCard.title}
                      </h3>
                      <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "19px", fontStyle: "italic", color: "rgba(124,140,130,0.85)", marginBottom: "24px" }}>
                        {m.whatWeDo.narmCard.subtitle}
                      </p>
                      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(18,18,18,0.52)", lineHeight: 1.85, marginBottom: "28px" }}>
                        {m.whatWeDo.narmCard.description}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                        {m.whatWeDo.narmCard.points.map((pt, i) => (
                          <div key={i} style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "16px", color: "rgba(200,169,106,0.55)", flexShrink: 0, lineHeight: 1 }}>—</span>
                            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(18,18,18,0.45)", lineHeight: 1.6 }}>{pt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Thin vertical divider */}
                <div style={{ width: "1px", background: "rgba(18,18,18,0.10)", flexShrink: 0 }} />

                {/* Integral Coaching — right column */}
                <div style={{ flex: 1, paddingLeft: "64px" }}>
                  <ScrollReveal delay={0.18}>
                    <div data-testid="integral-card">
                      <div style={{ paddingTop: "0px", marginBottom: "28px" }}>
                        <p className="ct-overline" style={{ color: "rgba(124,140,130,0.6)" }}>{m.whatWeDo.integralCard.label}</p>
                      </div>
                      <h3 style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(34px, 3.2vw, 50px)", fontWeight: 400, color: "#121212", lineHeight: 1.0, marginBottom: "10px" }}>
                        {m.whatWeDo.integralCard.title}
                      </h3>
                      <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "19px", fontStyle: "italic", color: "rgba(124,140,130,0.85)", marginBottom: "24px" }}>
                        {m.whatWeDo.integralCard.subtitle}
                      </p>
                      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(18,18,18,0.52)", lineHeight: 1.85, marginBottom: "28px" }}>
                        {m.whatWeDo.integralCard.description}
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "9px" }}>
                        {m.whatWeDo.integralCard.points.map((pt, i) => (
                          <div key={i} style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "16px", color: "rgba(124,140,130,0.5)", flexShrink: 0, lineHeight: 1 }}>—</span>
                            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(18,18,18,0.45)", lineHeight: 1.6 }}>{pt}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          3. HIGH-LEVEL BENEFITS — Ivory, hover-to-reveal accordion
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="ct-section"
        style={{ background: "#F5F2EC", paddingTop: "60px" }}
        data-testid="method-benefits"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="max-w-[600px] mx-auto mb-16 text-center">
            <ScrollReveal>
              <p className="ct-overline text-sage mb-5">{m.benefits.overline}</p>
              <h2
                className="text-charcoal leading-[1.1]"
                style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}
              >
                {m.benefits.headline}
              </h2>
            </ScrollReveal>
          </div>

          {/* Horizontal accordion — hover to reveal */}
          <div
            className="flex"
            style={{
              height: "420px",
              overflow: "hidden",
            }}
          >
            {m.benefits.items.map((item, i) => {
              const isActive = activeBenefit === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveBenefit(i)}
                  onMouseLeave={() => setActiveBenefit(null)}
                  data-testid={`benefit-card-${i}`}
                  style={{
                    flex: isActive ? 3.5 : 1,
                    transition: "flex 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    borderRight: i < m.benefits.items.length - 1 ? "1px solid rgba(18,18,18,0.07)" : "none",
                    cursor: "default",
                    background: isActive ? "rgba(18,18,18,0.025)" : "#F5F2EC",
                    transition: "flex 0.65s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease",
                  }}
                >
                  {/* Collapsed: rotated title + number */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
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
                        color: "rgba(18,18,18,0.5)",
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
                        color: "rgba(18,18,18,0.12)",
                        lineHeight: 1,
                        paddingBottom: "4px",
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Expanded: editorial layout */}
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
                        color: "rgba(124,140,130,0.75)",
                        marginBottom: "20px",
                        display: "block",
                      }}
                    >
                      {item.number}
                    </span>
                    <h3
                      style={{
                        fontFamily: "Figtree, sans-serif",
                        fontSize: "clamp(20px, 2vw, 26px)",
                        fontWeight: 400,
                        color: "#121212",
                        lineHeight: 1.2,
                        marginBottom: "18px",
                        maxWidth: "340px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "14px",
                        fontWeight: 300,
                        color: "rgba(18,18,18,0.5)",
                        lineHeight: 1.75,
                        maxWidth: "340px",
                      }}
                    >
                      {item.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          4. WHO THIS SERVES — Editorial two-column selector
          Left: stacked selector rows   Right: sticky benefits panel
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="ct-section"
        style={{
          background: "linear-gradient(to bottom, #F5F2EC 0%, #D4C5B0 6%, #A08872 18%, #6B5040 32%, #3D2410 52%, #1A1210 74%, #121212 100%)",
        }}
        data-testid="method-accordion"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">

          {/* Section heading */}
          <div className="max-w-[680px] mb-20">
            <ScrollReveal>
              <p className="ct-overline text-sage mb-5">{m.accordion.overline}</p>
              <h2
                style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400, color: "#121212" }}
              >
                {m.accordion.headline}
              </h2>
            </ScrollReveal>
          </div>

          {/* Two-column layout */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: "0" }}>

            {/* Left: selector rows (~44%) */}
            <div style={{ flex: "0 0 44%", paddingRight: "80px" }}>
              {m.accordion.items.map((item, i) => {
                const isActive = openAccordion === i;
                return (
                  <div
                    key={i}
                    onClick={() => setOpenAccordion(i)}
                    data-testid={`accordion-item-${i}`}
                    style={{
                      borderTop: i > 0 ? "1px solid rgba(245,242,236,0.12)" : "none",
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
                        color: isActive ? "rgba(200,169,106,0.85)" : "rgba(200,169,106,0.3)",
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
                        color: isActive ? "#F5F2EC" : "rgba(245,242,236,0.38)",
                        transition: "color 0.35s",
                        lineHeight: 1.15,
                      }}
                    >
                      {item.audience}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Thin vertical divider */}
            <div style={{ width: "1px", background: "rgba(245,242,236,0.10)", flexShrink: 0, alignSelf: "stretch" }} />

            {/* Right: active benefits panel (~56%) — sticky */}
            <div style={{ flex: 1, paddingLeft: "80px", position: "sticky", top: "100px" }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={openAccordion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div style={{ paddingTop: "0", marginBottom: "32px" }}>
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
                      What shifts
                    </p>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {m.accordion.items[openAccordion >= 0 ? openAccordion : 0].benefits.map((benefit, j) => (
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
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          5. TESTIMONIALS — Charcoal (same as Home)
      ══════════════════════════════════════════════════════════════ */}
      <section className="bg-charcoal ct-section relative overflow-hidden" data-testid="method-testimonials">
        <NeuralCanvas opacity={0.06} nodeCount={30} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline text-gold/60 mb-10">{t.home.testimonials.overline}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div
              style={{
                display: "flex",
                minHeight: "400px",
                background: "rgba(200,169,106,0.04)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                border: "1px solid rgba(200,169,106,0.11)",
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
                <div style={{ position: "absolute", right: 0, top: "15%", bottom: "15%", width: "1px", background: "linear-gradient(to bottom, transparent, rgba(200,169,106,0.45), transparent)", zIndex: 2 }} />
              </div>

              {/* Quote */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "52px 60px", position: "relative" }}>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "120px", lineHeight: 1, color: "rgba(200,169,106,0.07)", position: "absolute", top: "16px", left: "52px", userSelect: "none", pointerEvents: "none" }}>&ldquo;</span>
                <div style={{ position: "relative", minHeight: "220px" }}>
                  {testimonials.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center",
                        opacity: i === activeTestimonial ? 1 : 0,
                        transform: i === activeTestimonial ? "translateY(0)" : "translateY(14px)",
                        transition: "opacity 0.8s ease, transform 0.8s ease",
                        pointerEvents: i === activeTestimonial ? "auto" : "none",
                      }}
                    >
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

              {/* Auto-progress bar */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(200,169,106,0.08)" }}>
                <div key={activeTestimonial} style={{ height: "100%", background: "rgba(200,169,106,0.45)", animation: "progressSlide 6s linear forwards" }} />
              </div>
            </div>
          </ScrollReveal>

          {/* Thumbnail navigation — outside the card, matches Home.jsx */}
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
                    border: i === activeTestimonial ? "2px solid #C8A96A" : "2px solid rgba(245,242,236,0.12)",
                    transform: i === activeTestimonial ? "translateY(-12px)" : "translateY(0)",
                    transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                    flexShrink: 0,
                    boxShadow: i === activeTestimonial ? "0 8px 28px rgba(200,169,106,0.22)" : "none",
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    style={{
                      width: "100%", height: "100%",
                      objectFit: "cover", objectPosition: "center top",
                      filter: i === activeTestimonial ? "none" : "grayscale(70%)",
                      transition: "filter 0.45s ease",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "9px", fontWeight: 500,
                    letterSpacing: "0.14em", textTransform: "uppercase",
                    color: i === activeTestimonial ? "#F5F2EC" : "rgba(245,242,236,0.32)",
                    transition: "color 0.4s ease",
                    textAlign: "center", maxWidth: "88px", lineHeight: 1.55,
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
      <section className="bg-charcoal ct-section relative overflow-hidden" data-testid="method-narm-deep">
        <NeuralCanvas opacity={0.07} nodeCount={35} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <p className="ct-overline text-gold mb-5">{m.narm.overline}</p>
                <h2
                  className="text-ivory leading-[1.1]"
                  style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400 }}
                >
                  {m.narm.headline}
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              {m.narm.body.split("\n\n").map((para, i) => (
                <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                  <p
                    className="text-stone/55 mb-5 leading-relaxed"
                    style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}
                  >
                    {para}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Diagram */}
          <div className="mt-10 max-w-[900px]">
            <ScrollReveal>
              <p
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "13px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(200,169,106,0.5)", marginBottom: "8px" }}
              >
                {m.narm.diagramTitle}
              </p>
            </ScrollReveal>
            <NarmDiagram layers={m.narm.diagramLayers} />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          7. WHAT IS INTEGRAL COACHING — Charcoal
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="ct-section relative overflow-hidden"
        style={{ background: "#121212" }}
        data-testid="method-integral-deep"
      >
        <NeuralCanvas opacity={0.06} nodeCount={30} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <p className="ct-overline text-gold mb-5">{m.integral.overline}</p>
                <h2
                  className="text-ivory leading-[1.1]"
                  style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400 }}
                >
                  {m.integral.headline}
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-7">
              {m.integral.body.split("\n\n").map((para, i) => (
                <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                  <p
                    className="text-stone/50 mb-5 leading-relaxed"
                    style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}
                  >
                    {para}
                  </p>
                </ScrollReveal>
              ))}
            </div>
            <div className="lg:col-span-10 lg:col-start-2">
              {/* Integral rows — matches NARM layers pattern, sage accent */}
              <div className="w-full mt-4" data-testid="integral-diagram">
                {m.integral.points.map((point, i) => {
                  const bgOpacity = 0.04 + (i / (m.integral.points.length - 1)) * 0.08;
                  return (
                    <ScrollReveal key={i} delay={0.08 * i}>
                      <div className="flex items-stretch mb-2">
                        {/* Number badge */}
                        <div
                          style={{
                            flexShrink: 0,
                            width: "44px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            background: `rgba(124,140,130,${bgOpacity + 0.08})`,
                            borderLeft: "2px solid rgba(124,140,130,0.4)",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Manrope, sans-serif",
                              fontSize: "10px",
                              fontWeight: 600,
                              color: "rgba(124,140,130,0.85)",
                              letterSpacing: "1px",
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                        </div>
                        {/* Content */}
                        <div
                          style={{
                            flex: 1,
                            padding: "16px 28px",
                            background: `rgba(124,140,130,${bgOpacity})`,
                            borderTop: "1px solid rgba(124,140,130,0.12)",
                            borderBottom: "1px solid rgba(124,140,130,0.12)",
                            borderRight: "1px solid rgba(124,140,130,0.12)",
                          }}
                          data-testid={`integral-point-${i}`}
                        >
                          <p
                            style={{
                              fontFamily: "Manrope, sans-serif",
                              fontSize: "14px",
                              fontWeight: 300,
                              color: "rgba(227,222,215,0.6)",
                              lineHeight: 1.65,
                            }}
                          >
                            {point}
                          </p>
                        </div>
                      </div>
                    </ScrollReveal>
                  );
                })}
                <ScrollReveal delay={0.35}>
                  <div className="flex items-center gap-3 mt-6">
                    <div style={{ width: "1px", height: "32px", background: "rgba(124,140,130,0.4)" }} />
                    <span
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "14px",
                        fontStyle: "italic",
                        color: "rgba(124,140,130,0.65)",
                      }}
                    >
                      Integral Coaching works with the whole person across all dimensions
                    </span>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          8. COMBINED POWER — Gradient charcoal → ivory (inverted)
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="ct-section"
        style={{
          background: "linear-gradient(to bottom, #121212 0%, #1A1210 26%, #3D2410 48%, #6B5040 68%, #A08872 82%, #D4C5B0 94%, #F5F2EC 100%)",
        }}
        data-testid="method-combined"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="text-center max-w-[680px] mx-auto mb-16">
            <ScrollReveal>
              <p className="ct-overline text-gold/60 mb-5">{m.combined.overline}</p>
              <h2
                className="text-ivory leading-[1.1]"
                style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 46px)", fontWeight: 400 }}
              >
                {m.combined.headline}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <p
                className="mt-6 leading-relaxed"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px", fontStyle: "italic", color: "rgba(200,169,106,0.7)" }}
              >
                {m.combined.subtitle}
              </p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {m.combined.columns.map((col, i) => {
              const isCenter = i === 2;
              return (
                <ScrollReveal key={i} delay={0.1 * i}>
                  <div
                    style={{
                      padding: "40px 36px",
                      borderRadius: "8px",
                      border: isCenter ? "1px solid rgba(200,169,106,0.25)" : "1px solid rgba(245,242,236,0.08)",
                      background: isCenter ? "rgba(200,169,106,0.06)" : "rgba(245,242,236,0.03)",
                      height: "100%",
                    }}
                    data-testid={`combined-col-${i}`}
                  >
                    <h3
                      style={{
                        fontFamily: "Figtree, sans-serif",
                        fontSize: "17px",
                        fontWeight: 500,
                        color: isCenter ? "#C8A96A" : "rgba(245,242,236,0.65)",
                        marginBottom: "24px",
                        paddingBottom: "16px",
                        borderBottom: `1px solid ${isCenter ? "rgba(200,169,106,0.25)" : "rgba(245,242,236,0.1)"}`,
                      }}
                    >
                      {col.heading}
                    </h3>
                    <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                      {col.items.map((item, j) => (
                        <div key={j} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                          <div
                            style={{
                              flexShrink: 0, width: "18px", height: "18px", borderRadius: "50%",
                              background: isCenter ? "rgba(200,169,106,0.15)" : "rgba(245,242,236,0.06)",
                              display: "flex", alignItems: "center", justifyContent: "center", marginTop: "2px",
                            }}
                          >
                            <Check size={10} color={isCenter ? "#C8A96A" : "rgba(245,242,236,0.5)"} />
                          </div>
                          <p
                            style={{
                              fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300,
                              color: isCenter ? "rgba(245,242,236,0.8)" : "rgba(245,242,236,0.5)",
                              lineHeight: 1.6,
                            }}
                          >
                            {item}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          9. FINAL CTA — Ivory
      ══════════════════════════════════════════════════════════════ */}
      <section
        className="ct-section text-center"
        style={{ background: "#F5F2EC" }}
        data-testid="method-final-cta"
      >
        <div className="max-w-[560px] mx-auto px-6">
          <ScrollReveal>
            <div
              style={{ width: "1px", height: "60px", background: "linear-gradient(to bottom, transparent, rgba(18,18,18,0.2), transparent)", margin: "0 auto 40px" }}
            />
            <h2
              className="text-charcoal"
              style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.1 }}
            >
              {m.cta.headline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p
              className="mt-6 leading-relaxed"
              style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300, color: "rgba(18,18,18,0.55)" }}
            >
              {m.cta.body}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.28}>
            <Link
              to="/contact"
              className="btn-primary mt-10 inline-flex items-center gap-2"
              style={{ borderRadius: "8px", padding: "14px 32px" }}
              data-testid="method-cta-btn"
            >
              {m.cta.button}
              <ArrowRight size={14} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
};

export default Method;
