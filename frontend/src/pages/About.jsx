import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import NeuralCanvas from "../components/NeuralCanvas";
import ScrollReveal from "../components/ScrollReveal";
import HeroContactForm from "../components/HeroContactForm";
import { useLanguage } from "../context/LanguageContext";
import { useContactForm } from "../context/ContactFormContext";
import SEOHead from "../components/SEOHead";

const HERO_IMG_DESKTOP =
  "/images/about-hero-desktop.webp";
const HERO_IMG_MOBILE =
  "/images/about-hero-mobile.webp";

const About = () => {
  const { t } = useLanguage();
  const { heroOpenFn, finalCtaOpenFn } = useContactForm();
  const a = t.about;
  const testimonials = t.home.testimonials.items;

  const [activeApproach, setActiveApproach] = useState(null);
  const [activeMobileApproach, setActiveMobileApproach] = useState(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showFinalForm, setShowFinalForm] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const timerRef = useRef(null);

  // ── Hero parallax ────────────────────────────────────────────────────────
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "-12%"]);

  // ── Testimonial auto-advance ─────────────────────────────────────────────
  const restartTimer = (count) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % count);
    }, 5000);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Register section-specific openers in context ─────────────────────────
  useEffect(() => {
    heroOpenFn.current     = () => setShowContactForm(true);
    finalCtaOpenFn.current = () => setShowFinalForm(true);
    return () => {
      heroOpenFn.current     = null;
      finalCtaOpenFn.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Escape key closes both panels ────────────────────────────────────────
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowContactForm(false);
        setShowFinalForm(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    restartTimer(testimonials.length);
    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testimonials.length]);

  const handleTestimonialClick = (i) => {
    setActiveTestimonial(i);
    restartTimer(testimonials.length);
  };

  return (
    <div style={{ background: "#0F1A12" }}>
      <SEOHead
        title="About Cornelia Trompke — Executive Coach & Advisor"
        description="Two decades at the intersection of executive leadership, depth psychology, and neuroscience. Meet Cornelia Trompke — trauma-informed executive coach, systemic thinker, and advisor to senior leaders worldwide."
        path="/about-me"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Person",
              "@id": "https://www.corneliatrompke.com/about-me#person",
              "name": "Cornelia Trompke",
              "jobTitle": "Executive Coach & Advisor",
              "description": "Trauma-informed executive coach, systemic thinker, and advisor with over two decades at the intersection of executive leadership, depth psychology, and neuroscience.",
              "url": "https://www.corneliatrompke.com/about-me",
              "image": "https://www.corneliatrompke.com/favicon.png",
              "address": { "@type": "PostalAddress", "addressLocality": "Berlin", "addressCountry": "DE" },
              "knowsAbout": ["Executive Coaching", "NARM — NeuroAffective Relational Model", "Integral Coaching", "Leadership Development", "Nervous System Science", "Trauma-Informed Coaching", "Organizational Development", "Depth Psychology"],
              "hasCredential": [
                { "@type": "EducationalOccupationalCredential", "name": "NARM Practitioner", "description": "Certified in the NeuroAffective Relational Model, developed by Dr. Laurence Heller" },
                { "@type": "EducationalOccupationalCredential", "name": "Integral Coach", "description": "Trained at New Ventures West Institute, San Francisco" },
                { "@type": "EducationalOccupationalCredential", "name": "Systemic Facilitator", "description": "Advanced training in systemic organizational constellations and team dynamics" },
              ],
              "worksFor": { "@id": "https://www.corneliatrompke.com/#organization" },
            },
            {
              "@type": "WebPage",
              "@id": "https://www.corneliatrompke.com/about-me#webpage",
              "url": "https://www.corneliatrompke.com/about-me",
              "name": "About Cornelia Trompke — Executive Coach & Advisor",
              "about": { "@id": "https://www.corneliatrompke.com/about-me#person" },
              "isPartOf": { "@id": "https://www.corneliatrompke.com/#website" },
            },
          ],
        }}
      />
      {/* Outer div is dark so gaps between dark sections are seamless.
          Credentials ends at #0F1A12 — wrapper end → dark sections: seamless. */}
      <div style={{ background: "#F5F2EC" }}>

      {/* ═══ HERO — rounded card, same as Home / Method / Coaching ═══ */}
      <section
        className="pt-[6px] px-3 md:px-4 pb-3"
        data-testid="hero-section"
      >
        <div
          ref={heroRef}
          className="relative overflow-hidden w-full"
          style={{ borderRadius: "20px", minHeight: "96vh" }}
          onClick={showContactForm ? () => setShowContactForm(false) : undefined}
        >
          {/* Parallax background — responsive desktop/mobile */}
          <motion.img
            key={isMobile ? "about-hero-mobile" : "about-hero-desktop"}
            src={isMobile ? HERO_IMG_MOBILE : HERO_IMG_DESKTOP}
            alt=""
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              width: "100%",
              height: "115%",
              objectFit: isMobile ? "cover" : "contain",
              objectPosition: isMobile ? "45% 66%" : "center top",
              y: heroBgY,
            }}
          />

          {/* Directional gradient: left→right on desktop, bottom→top on mobile */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background: isMobile
                ? "linear-gradient(to top, rgba(18,18,18,1.00) 0%, rgba(18,18,18,0.90) 20%, rgba(18,18,18,0.75) 40%, rgba(18,18,18,0.30) 60%, rgba(18,18,18,0.15) 80%, rgba(18,18,18,0.01) 100%)"
                : "linear-gradient(to right, rgba(18,18,18,1.00) 0%, rgba(18,18,18,0.90) 20%, rgba(18,18,18,0.75) 40%, rgba(18,18,18,0.30) 60%, rgba(18,18,18,0.15) 80%, rgba(18,18,18,0.01) 100%)",
            }}
          />

          {/* Top fade — nav legibility */}
          <div
            className="absolute top-0 left-0 right-0 z-[2]"
            style={{
              height: "130px",
              background:
                "linear-gradient(to bottom, rgba(12,12,12,0.65) 0%, rgba(12,12,12,0.2) 70%, transparent 100%)",
            }}
          />

          <NeuralCanvas opacity={0.06} nodeCount={30} />

          {/* Text — full height, bottom-aligned, clips overflow at top */}
          <motion.div
            className="absolute inset-y-0 left-0 z-10 p-8 md:p-14"
            style={{ overflowY: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
            animate={{ maxWidth: showContactForm ? "580px" : "860px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ScrollReveal delay={0.1}>
              <p className="ct-overline text-gold mb-6">{a.hero.overline}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <h1
                className="text-ivory leading-[1.04]"
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: showContactForm
                    ? (isMobile ? "30px" : "55px")
                    : "clamp(40px, 6.5vw, 84px)",
                  fontWeight: 400,
                  transition: "font-size 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
                data-testid="about-hero-headline"
              >
                {a.hero.headline}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.42}>
              <p
                className="mt-4"
                style={{
                  fontFamily: "Cormorant Garamond, serif",
                  fontSize: "clamp(16px, 1.8vw, 22px)",
                  fontStyle: "italic",
                  color: "rgba(227,222,215,0.7)",
                  maxWidth: "520px",
                }}
              >
                {a.hero.subheadline}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.58}>
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "12px", marginTop: "36px", marginBottom: "40px" }}>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="btn-hero-pill"
                  data-testid="about-hero-cta-primary"
                  style={{ cursor: "pointer", border: "none" }}
                >
                  {a.hero.ctaPrimary}
                  <ArrowRight size={13} />
                </button>
                <Link to="/how-i-work" className="btn-hero-pill-outline" data-testid="about-hero-cta-secondary">
                  {a.hero.ctaSecondary}
                </Link>
              </div>
            </ScrollReveal>
          </motion.div>

          {/* Scroll indicator — bottom right */}
          <div className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2">
            <span className="ct-overline text-white/25" style={{ fontSize: "9px" }}>Scroll</span>
            <div className="scroll-line" />
          </div>

          {/* ── Glassmorphic form panel (slides in from right) ── */}
          <AnimatePresence>
            {showContactForm && (
              <>
                <motion.div
                  key="about-form-veil"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  style={{
                    position: "absolute", inset: 0, zIndex: 15,
                    background: "linear-gradient(to right, transparent 30%, rgba(5,10,7,0.55) 70%)",
                    pointerEvents: "none",
                  }}
                />
                <motion.div
                  key="about-form-panel"
                  initial={{ opacity: 0, x: "100%" }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: "100%" }}
                  transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                  onClick={e => e.stopPropagation()}
                  style={{
                    position: "absolute",
                    right: "clamp(24px, 4vw, 56px)",
                    top: "10%",
                    height: "80%",
                    width: "clamp(360px, 40%, 520px)",
                    borderRadius: "16px",
                    background: "rgba(8,16,11,0.25)",
                    backdropFilter: "blur(28px) saturate(1.6)",
                    WebkitBackdropFilter: "blur(28px) saturate(1.6)",
                    border: "1px solid rgba(200,169,106,0.18)",
                    zIndex: 20,
                    overflowY: "auto",
                  }}
                  data-testid="about-contact-form-panel"
                >
                  <HeroContactForm onClose={() => setShowContactForm(false)} sendFrom="About — Hero Section" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>


      {/* ═══ ORIGIN STORY — editorial timeline, ivory ═══ */}
      <section
        style={{ paddingTop: "120px", paddingBottom: "120px" }}
        data-testid="about-origin-story"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p
              className="ct-overline mb-4"
              style={{ color: "rgba(124,140,130,0.8)" }}
            >
              {a.originStory.overline}
            </p>
            <h2
              style={{
                fontFamily: "Figtree, sans-serif",
                fontSize: "clamp(26px, 3.5vw, 44px)",
                fontWeight: 400,
                color: "#121212",
                lineHeight: 1.1,
                maxWidth: "600px",
                marginBottom: "80px",
              }}
            >
              {a.originStory.headline}
            </h2>
          </ScrollReveal>

          {/* 3-milestone timeline */}
          <div className="relative">
            {/* Horizontal connector line — desktop only */}
            <div
              className="hidden lg:block absolute"
              style={{
                top: "18px",
                left: "8px",
                right: "8px",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent 2%, rgba(200,169,106,0.3) 15%, rgba(200,169,106,0.3) 85%, transparent 98%)",
              }}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-10">
              {a.originStory.milestones.map((m, i) => (
                <ScrollReveal key={i} delay={i * 0.18}>
                  <div
                    className="relative"
                    data-testid={`origin-milestone-${i}`}
                  >
                    {/* Gold dot on timeline */}
                    <div
                      className="hidden lg:block"
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        border: "1px solid rgba(200,169,106,0.55)",
                        background: "rgba(200,169,106,0.1)",
                        marginBottom: "0",
                        position: "relative",
                        top: 0,
                      }}
                    />
                    {/* Mobile: vertical left accent */}
                    <div
                      className="lg:hidden absolute left-0 top-0 bottom-0"
                      style={{
                        width: "1px",
                        background:
                          "linear-gradient(to bottom, rgba(200,169,106,0.6) 0%, rgba(200,169,106,0.08) 100%)",
                      }}
                    />

                    <div className="pl-6 lg:pl-0 mt-8 lg:mt-10">
                      <span
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "11px",
                          fontWeight: 400,
                          letterSpacing: "0.32em",
                          color: "rgba(200,169,106,0.7)",
                          display: "block",
                        }}
                      >
                        {m.number}
                      </span>

                      <h3
                        style={{
                          fontFamily: "Figtree, sans-serif",
                          fontSize: "clamp(20px, 2vw, 26px)",
                          fontWeight: 400,
                          color: "#121212",
                          lineHeight: 1.2,
                          marginTop: "20px",
                          minHeight: "94px",
                        }}
                      >
                        {m.role}
                      </h3>

                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "10px",
                          fontWeight: 600,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "rgba(124,140,130,0.7)",
                          marginTop: "6px",
                        }}
                      >
                        {m.period}
                      </p>

                      <div
                        style={{
                          width: "24px",
                          height: "1px",
                          background: "rgba(200,169,106,0.4)",
                          marginTop: "22px",
                          marginBottom: "22px",
                        }}
                      />

                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "14px",
                          fontWeight: 300,
                          color: "rgba(18,18,18,0.58)",
                          lineHeight: 1.85,
                        }}
                      >
                        {m.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══ PHILOSOPHY — ivory, 3 bold two-column statements ═══ */}
      <section
        style={{ paddingTop: "40px", paddingBottom: "100px" }}
        data-testid="about-philosophy"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p
              className="ct-overline mb-16"
              style={{ color: "rgba(18,18,18,0.32)" }}
            >
              {a.philosophy.overline}
            </p>
          </ScrollReveal>

          <div>
            {a.philosophy.statements.map((s, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <div
                  style={{
                    borderTop: "1px solid rgba(18,18,18,0.08)",
                    paddingTop: "56px",
                    paddingBottom: "56px",
                    display: "grid",
                    gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                    gap: isMobile ? "16px" : "80px",
                    alignItems: "start",
                  }}
                  data-testid={`philosophy-statement-${i}`}
                >
                  <h3
                    style={{
                      fontFamily: "Cormorant Garamond, serif",
                      fontSize: "clamp(22px, 2.8vw, 36px)",
                      fontStyle: "italic",
                      fontWeight: 400,
                      color: "#121212",
                      lineHeight: 1.35,
                    }}
                  >
                    &ldquo;{s.text}&rdquo;
                  </h3>
                  <p
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "15px",
                      fontWeight: 300,
                      color: "rgba(18,18,18,0.52)",
                      lineHeight: 1.9,
                      paddingTop: "4px",
                    }}
                  >
                    {s.note}
                  </p>
                </div>
              </ScrollReveal>
            ))}
            {/* No bottom border — credentials section gradient picks up seamlessly */}
          </div>
        </div>
      </section>


      {/* ═══ CREDENTIALS — gradient ivory → forest green (visual bridge) ═══ */}
      <section
        style={{
          background:
            "linear-gradient(to bottom, #F5F2EC 0%, #CDD8C4 15%, #8A9A80 32%, #2A3825 52%, #162018 75%, #0F1A12 100%)",
          paddingTop: "80px",
          paddingBottom: "100px",
        }}
        data-testid="about-credentials"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p
              className="ct-overline mb-3"
              style={{ color: "#5C3317" }}
            >
              {a.credentials.overline}
            </p>
            <h2
              style={{
                fontFamily: "Figtree, sans-serif",
                fontSize: "clamp(24px, 3vw, 38px)",
                fontWeight: 400,
                color: "#121212",
                lineHeight: 1.1,
                maxWidth: "460px",
                marginBottom: "90px",
              }}
            >
              {a.credentials.headline}
            </h2>
          </ScrollReveal>

          {/* Vertical credential rows — integral coaching pattern */}
          <div className="w-full max-w-[860px]" data-testid="credentials-list">
            {a.credentials.items.map((item, i) => {
              const bgOpacity = [0.20, 0.26, 0.32, 0.40][i] ?? 0.20;
              const isLast = i === a.credentials.items.length - 1;
              return (
                <ScrollReveal key={i} delay={0.08 * i}>
                  <div className="flex items-stretch mb-2" style={{ marginLeft: isMobile ? 0 : `${i * 40}px` }} data-testid={`credential-${i}`}>
                    {/* Number badge */}
                    <div
                      style={{
                        flexShrink: 0,
                        width: "52px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: `rgba(200,169,106,${bgOpacity + 0.06})`,
                        borderLeft: "2px solid rgba(200,169,106,0.4)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "10px",
                          fontWeight: 600,
                          color: "#F5F2EC",
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
                        padding: "20px 32px",
                        background: `rgba(200,169,106,${bgOpacity})`,
                        borderBottom: !isLast ? "1px solid rgba(200,169,106,0.10)" : "none",
                        borderRight: "1px solid rgba(200,169,106,0.10)",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Figtree, sans-serif",
                          fontSize: "15px",
                          fontWeight: 400,
                          color: "#F5F2EC",
                          marginBottom: "6px",
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "13px",
                          fontWeight: 300,
                          color: "rgba(245,242,236,0.75)",
                          lineHeight: 1.72,
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      </div>{/* end ivory wrapper */}

      {/* ═══ APPROACH + VALUES — deep forest green, horizontal accordion ═══ */}
      <section
        style={{ background: "#0F1A12", paddingTop: "80px", paddingBottom: "80px", position: "relative", marginTop: "-2px", zIndex: 1 }}
        data-testid="about-approach"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline text-gold/60 mb-4">{a.approach.overline}</p>
            <h2
              className="text-ivory leading-[1.1] max-w-[500px]"
              style={{
                fontFamily: "Figtree, sans-serif",
                fontSize: "clamp(28px, 3.5vw, 44px)",
                fontWeight: 400,
              }}
            >
              {a.approach.headline}
            </h2>
          </ScrollReveal>

          {/* ── Mobile: vertical expand/collapse accordion ── */}
          {isMobile ? (
            <div className="mt-12 flex flex-col" style={{ gap: "2px" }}>
              {a.approach.items.map((item, i) => {
                const isOpen = activeMobileApproach === i;
                return (
                  <div
                    key={i}
                    style={{ borderBottom: "1px solid rgba(245,242,236,0.10)" }}
                    data-testid={`approach-item-${i}`}
                  >
                    {/* Header row */}
                    <button
                      onClick={() => setActiveMobileApproach(isOpen ? null : i)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "20px 0",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        gap: "16px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                        <span style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "13px",
                          color: "rgba(200,169,106,0.65)",
                          letterSpacing: "0.12em",
                          flexShrink: 0,
                        }}>{item.number}</span>
                        <span style={{
                          fontFamily: "Figtree, sans-serif",
                          fontSize: "17px",
                          fontWeight: 400,
                          color: isOpen ? "#F5F2EC" : "rgba(245,242,236,0.65)",
                          lineHeight: 1.25,
                          transition: "color 0.25s",
                        }}>{item.title}</span>
                      </div>
                      <span style={{
                        color: "rgba(200,169,106,0.65)",
                        fontSize: "20px",
                        lineHeight: 1,
                        flexShrink: 0,
                        transition: "transform 0.3s",
                        transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      }}>+</span>
                    </button>

                    {/* Expandable content */}
                    <div style={{
                      maxHeight: isOpen ? "300px" : "0",
                      overflow: "hidden",
                      transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}>
                      <p style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "14px",
                        fontWeight: 300,
                        color: "rgba(245,242,236,0.5)",
                        lineHeight: 1.8,
                        paddingBottom: "24px",
                        paddingRight: "32px",
                      }}>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
          /* ── Desktop/tablet: horizontal hover accordion ── */
          <div className="flex mt-16" style={{ height: "520px" }}>
            {a.approach.items.map((item, i) => {
              const isActive = activeApproach === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveApproach(i)}
                  onMouseLeave={() => setActiveApproach(null)}
                  data-testid={`approach-item-${i}`}
                  style={{
                    flex: isActive ? 3.5 : 1,
                    transition: "flex 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    borderRight:
                      i < a.approach.items.length - 1
                        ? "1px solid rgba(245,242,236,0.10)"
                        : "none",
                    cursor: "default",
                  }}
                >
                  {/* ── Collapsed: rotated title + number ── */}
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
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "clamp(16px, 2vw, 24px)",
                        fontWeight: 400,
                        letterSpacing: "0.08em",
                        color: "rgba(245,242,236,0.6)",
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
                        fontSize: "32px",
                        fontWeight: 300,
                        color: "rgba(245,242,236,0.16)",
                        lineHeight: 1,
                        paddingBottom: "4px",
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* ── Expanded: editorial layout ── */}
                  <div
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.35s ease 0.22s",
                      padding: "48px 80px 48px 52px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      minWidth: "420px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "rgba(200,169,106,0.65)",
                        marginBottom: "20px",
                        display: "block",
                      }}
                    >
                      {item.number}
                    </span>
                    <h3
                      style={{
                        fontFamily: "Figtree, sans-serif",
                        fontSize: "clamp(22px, 2.2vw, 30px)",
                        fontWeight: 400,
                        color: "#F5F2EC",
                        lineHeight: 1.2,
                        marginBottom: "18px",
                        maxWidth: "380px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "14px",
                        fontWeight: 300,
                        color: "rgba(245,242,236,0.5)",
                        lineHeight: 1.75,
                        maxWidth: "360px",
                      }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>


      {/* ═══ TESTIMONIALS — deep forest green, exact slideshow from Home ═══ */}
      <section
        style={{ background: "#0F1A12", paddingTop: "100px", paddingBottom: "100px" }}
        data-testid="about-testimonials"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline mb-10" style={{ color: "rgba(200,169,106,0.65)" }}>
              {t.home.testimonials.overline}
            </p>
          </ScrollReveal>

          {/* Glassmorphic card */}
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
              {/* Quote text — full width */}
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
                {/* Decorative large open-quote */}
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "120px",
                    lineHeight: 1,
                    color: "rgba(200,169,106,0.07)",
                    position: "absolute",
                    top: "16px",
                    left: "52px",
                    userSelect: "none",
                    pointerEvents: "none",
                  }}
                >
                  &ldquo;
                </span>

                {/* Stacked testimonial panels */}
                <div style={{ position: "relative", minHeight: "220px" }}>
                  {testimonials.map((item, i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        opacity: i === activeTestimonial ? 1 : 0,
                        transform:
                          i === activeTestimonial ? "translateY(0)" : "translateY(10px)",
                        transition: "opacity 0.75s ease, transform 0.75s ease",
                        pointerEvents: i === activeTestimonial ? "auto" : "none",
                      }}
                    >
                      <blockquote
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "clamp(18px, 2vw, 26px)",
                          fontStyle: "italic",
                          fontWeight: 400,
                          color: "#F5F2EC",
                          lineHeight: 1.6,
                          position: "relative",
                          zIndex: 1,
                        }}
                      >
                        &ldquo;{item.text}&rdquo;
                      </blockquote>

                      <div style={{ marginTop: "28px" }}>
                        <div
                          style={{
                            width: "32px",
                            height: "1px",
                            background: "rgba(200,169,106,0.45)",
                            marginBottom: "12px",
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "Manrope, sans-serif",
                            fontSize: "11px",
                            fontWeight: 600,
                            letterSpacing: "0.20em",
                            textTransform: "uppercase",
                            color: "#F5F2EC",
                          }}
                        >
                          {item.author}
                        </p>
                        <p
                          style={{
                            fontFamily: "Manrope, sans-serif",
                            fontSize: "12px",
                            fontWeight: 300,
                            color: "rgba(200,169,106,0.65)",
                            marginTop: "4px",
                          }}
                        >
                          {item.company}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "rgba(200,169,106,0.08)",
                  }}
                >
                  <div
                    key={activeTestimonial}
                    style={{
                      height: "100%",
                      background: "rgba(200,169,106,0.45)",
                      animation: "progressSlide 5s linear forwards",
                    }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Author navigation — single row, names only */}
          <div style={{ display: "flex", flexWrap: "nowrap", overflowX: "auto", scrollbarWidth: "none", gap: "0", marginTop: "4px", borderTop: "1px solid rgba(200,169,106,0.12)" }}>
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => handleTestimonialClick(i)}
                data-testid={`about-testimonial-nav-${i}`}
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

        <style>{`
          @keyframes progressSlide {
            from { width: 0%; }
            to   { width: 100%; }
          }
        `}</style>
      </section>


      {/* ═══ FINAL CTA — forest green → ivory gradient (seamless with footer) ═══ */}
      <section
        className="ct-section relative overflow-hidden"
        style={{
          background: "linear-gradient(to bottom, #0F1A12 0%, #162018 25%, #2A3825 48%, #8A9A80 68%, #CDD8C4 85%, #F5F2EC 100%)",
        }}
        data-testid="final-cta-section"
        onClick={showFinalForm ? () => setShowFinalForm(false) : undefined}
      >
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
                background: "rgba(15,26,18,0.60)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(200,169,106,0.18)",
                borderRadius: "20px",
                position: "relative",
                overflow: showFinalForm ? "auto" : "hidden",
              }}
              data-testid="about-final-cta-card"
            >
              {/* Inner radial shimmer */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,169,106,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
              {/* Corner accent lines */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />

              <div style={{ position: "relative", zIndex: 10 }}>
                <AnimatePresence mode="wait">
                  {!showFinalForm ? (
                    <motion.div
                      key="about-cta-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <h2
                        className="text-ivory leading-[1.1]"
                        style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 400 }}
                      >
                        {a.cta.headline}
                      </h2>
                      <p
                        className="text-stone/50 mt-6 leading-relaxed"
                        style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300 }}
                      >
                        {a.cta.body}
                      </p>
                      <button
                        onClick={() => setShowFinalForm(true)}
                        className="btn-secondary mt-10 inline-block"
                        style={{ borderRadius: "8px", cursor: "pointer" }}
                        data-testid="about-contact-cta"
                      >
                        {a.cta.button}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="about-form-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <HeroContactForm
                        onClose={() => setShowFinalForm(false)}
                        noPadding
                        sendFrom="About — Final CTA Section"
                      />
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

export default About;
