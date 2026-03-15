import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import NeuralCanvas from "../components/NeuralCanvas";
import ScrollReveal from "../components/ScrollReveal";
import VennDiagram from "../components/VennDiagram";
import TransformationSection from "../components/TransformationSection";
import FoundationSection from "../components/home/FoundationSection";
import HeroContactForm from "../components/HeroContactForm";
import { useLanguage } from "../context/LanguageContext";
import { useContactForm } from "../context/ContactFormContext";
import SEOHead from "../components/SEOHead";

const PORTRAIT =
  "https://customer-assets.emergentagent.com/job_nervous-system-exec/artifacts/za4j3pc7_Cornelia%2BTrompke_0436.webp";

// Brand logo ticker — Simple Icons CDN, rendered as black marks on ivory
const TICKER_ITEMS = [
  { src: "https://cdn.simpleicons.org/microsoft", alt: "Microsoft" },
  { src: "https://cdn.simpleicons.org/google",    alt: "Google"    },
  { src: "https://cdn.simpleicons.org/amazon",    alt: "Amazon"    },
  { src: "https://cdn.simpleicons.org/apple",     alt: "Apple"     },
  { src: "https://cdn.simpleicons.org/meta",      alt: "Meta"      },
  { src: "https://cdn.simpleicons.org/netflix",   alt: "Netflix"   },
  { src: "https://cdn.simpleicons.org/tesla",     alt: "Tesla"     },
  { src: "https://cdn.simpleicons.org/bmw",       alt: "BMW"       },
  { src: "https://cdn.simpleicons.org/siemens",   alt: "Siemens"   },
  { src: "https://cdn.simpleicons.org/sap",       alt: "SAP"       },
];

// Hero videos — desktop and mobile variants
const HERO_VIDEO_DESKTOP =
  "https://customer-assets.emergentagent.com/job_nervous-system-exec/artifacts/ihle29r5_Hero%20video%202%20-%20desktop.mp4";
const HERO_VIDEO_MOBILE =
  "https://customer-assets.emergentagent.com/job_nervous-system-exec/artifacts/x84hoo3c_Hero%20video%202%20-%20mobile.mp4";

const Home = () => {
  const { t } = useLanguage();
  const { heroOpenFn, finalCtaOpenFn } = useContactForm();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeService, setActiveService] = useState(null);
  const [activeMobileService, setActiveMobileService] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showFinalForm, setShowFinalForm] = useState(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [isNarrow, setIsNarrow] = useState(typeof window !== "undefined" ? window.innerWidth < 1024 : false);
  useEffect(() => {
    const h = () => {
      setIsMobile(window.innerWidth < 768);
      setIsNarrow(window.innerWidth < 1024);
    };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  const testimonials = t.home.testimonials.items;
  const timerRef = useRef(null);

  // ── Hero parallax ────────────────────────────────────────────────────────
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  // Background image drifts upward -12% as hero scrolls out of view
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "-12%"]);

  // ── Register section-specific openers ─────────────────────────────────
  useEffect(() => {
    heroOpenFn.current     = () => setShowContactForm(true);
    finalCtaOpenFn.current = () => setShowFinalForm(true);
    return () => {
      heroOpenFn.current     = null;
      finalCtaOpenFn.current = null;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escape key to close hero / final-CTA panels
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

  const restartTimer = (count) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActiveTestimonial(prev => (prev + 1) % count);
    }, 5000);
  };

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
    <div>
      <SEOHead
        title="Executive Leadership Coaching Berlin & Worldwide"
        description="Trauma-informed executive coaching and leadership development for senior leaders — grounded in nervous system science, designed for transformation that actually lasts. By Cornelia Trompke."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Organization",
              "@id": "https://corneliatrompke.com/#organization",
              "name": "Cornelia Trompke Consulting & Coaching",
              "url": "https://corneliatrompke.com",
              "logo": { "@type": "ImageObject", "url": "https://corneliatrompke.com/favicon.png" },
              "description": "Trauma-informed executive coaching and leadership development for senior leaders — grounded in nervous system science.",
              "address": { "@type": "PostalAddress", "addressLocality": "Berlin", "addressCountry": "DE" },
              "areaServed": "Worldwide",
              "knowsLanguage": ["de", "en"],
              "founder": { "@id": "https://corneliatrompke.com/about-me#person" },
            },
            {
              "@type": "WebSite",
              "@id": "https://corneliatrompke.com/#website",
              "url": "https://corneliatrompke.com",
              "name": "Cornelia Trompke Consulting & Coaching",
              "publisher": { "@id": "https://corneliatrompke.com/#organization" },
              "inLanguage": ["en", "de"],
            },
            {
              "@type": "WebPage",
              "@id": "https://corneliatrompke.com/#webpage",
              "url": "https://corneliatrompke.com",
              "name": "Executive Leadership Coaching Berlin & Worldwide | Cornelia Trompke Consulting & Coaching",
              "isPartOf": { "@id": "https://corneliatrompke.com/#website" },
              "about": { "@id": "https://corneliatrompke.com/#organization" },
              "description": "Trauma-informed executive coaching and leadership development for senior leaders.",
            },
          ],
        }}
      />
      <section
        className="pt-[6px] px-3 md:px-4 pb-3"
        style={{ background: "#F5F2EC" }}
        data-testid="hero-section"
      >
        {/* Rounded container */}
        <div
          ref={heroRef}
          className="relative overflow-hidden w-full"
          style={{
            borderRadius: "20px",
            minHeight: "96vh",
            cursor: showContactForm ? "default" : "default",
          }}
          onClick={showContactForm ? () => setShowContactForm(false) : undefined}
        >
          {/* Background video — parallax drift, autoplay muted loop */}
          <motion.video
            key={isMobile ? "hero-mobile" : "hero-desktop"}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              width: "100%",
              height: "115%",
              objectFit: "cover",
              objectPosition: "center",
              y: heroBgY,
            }}
          >
            <source
              src={isMobile ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP}
              type="video/mp4"
            />
          </motion.video>

          {/* Left-to-right charcoal gradient: near-black on left → ~1% on right */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                "linear-gradient(to right, rgba(18,18,18,1.00) 0%, rgba(18,18,18,0.90) 20%, rgba(18,18,18,0.75) 40%, rgba(18,18,18,0.30) 60%, rgba(18,18,18,0.15) 80%, rgba(18,18,18,0.01) 100%)",
            }}
          />
          {/* Top strip gradient — keeps nav links legible over any image */}
          <div
            className="absolute top-0 left-0 right-0 z-[2]"
            style={{
              height: "130px",
              background:
                "linear-gradient(to bottom, rgba(12,12,12,0.65) 0%, rgba(12,12,12,0.2) 70%, transparent 100%)",
            }}
          />

          {/* Neural canvas */}
          <NeuralCanvas opacity={0.08} nodeCount={40} />

          {/* ── Text: bottom-left — spans full height so overflow clips at top ── */}
          <motion.div
            className="absolute inset-y-0 left-0 z-10 p-8 md:p-14"
            style={{ overflowY: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
            animate={{ maxWidth: showContactForm ? "580px" : "860px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <ScrollReveal delay={0.1}>
              <p className="ct-overline text-gold mb-6" data-testid="hero-overline">
                {t.home.hero.overline}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.25}>
              <h1
                className="text-ivory leading-[1.04]"
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: "clamp(40px, 6.5vw, 84px)",
                  fontWeight: 400,
                }}
                data-testid="hero-headline"
              >
                {t.home.hero.tagline}
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.42}>
              <p
                className="mt-5 max-w-[520px] leading-relaxed"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "16px",
                  fontWeight: 300,
                  color: "rgba(227,222,215,0.65)",
                }}
              >
                {t.home.hero.subtitle}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.58}>
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "12px", marginTop: "36px", marginBottom: "40px" }}>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="btn-hero-pill"
                  data-testid="hero-cta-primary"
                  style={{ cursor: "pointer", border: "none" }}
                >
                  {t.home.hero.cta}
                  <ArrowRight size={13} />
                </button>
                <Link to="/work-with-me" className="btn-hero-pill-outline" data-testid="hero-cta-secondary">
                  {t.home.hero.ctaSecondary}
                </Link>
              </div>
            </ScrollReveal>
          </motion.div>

          {/* Scroll indicator — bottom right */}
          <div className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2">
            <span className="ct-overline text-white/25" style={{ fontSize: "9px" }}>Scroll</span>
            <div className="scroll-line" />
          </div>

          {/* ── Contact Form Panel (slides in from right) ── */}
          <AnimatePresence>
            {showContactForm && (
              <>
                {/* Subtle dark veil over the hero image (right half) — deepens focus on form */}
                <motion.div
                  key="form-veil"
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

                {/* Glassmorphic form panel */}
                <motion.div
                  key="form-panel"
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
                  data-testid="hero-contact-form-panel"
                >
                  <HeroContactForm onClose={() => setShowContactForm(false)} sendFrom="Homepage — Hero Section" />
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ═══ BRAND LOGOS TICKER ═══ */}
      <div
        style={{
          background: "#F5F2EC",
          overflow: "hidden",
          padding: "18px 0",
        }}
        data-testid="brand-ticker"
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            animation: "logoTicker 70s linear infinite",
          }}
        >
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, idx) => {
            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "0 64px",
                  flexShrink: 0,
                }}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  style={{
                    height: "60px",
                    width: "auto",
                    filter: "brightness(0)",
                    opacity: 0.22,
                  }}
                />
              </div>
            );
          })}
        </div>
        <style>{`
          @keyframes logoTicker {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <FoundationSection />

      {/* ═══ ABOUT PREVIEW ═══ */}
      <section
        className="ct-section"
        data-testid="about-preview-section"
        style={{
          background: "linear-gradient(to bottom, #F5F2EC 0%, #CDD8C4 15%, #8A9A80 32%, #2A3825 52%, #162018 75%, #0F1A12 100%)",
          position: "relative",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16" style={{ position: "relative", zIndex: 1 }}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* ── Text column — order-2 on mobile so image appears first ── */}
            <div className="lg:col-span-6 lg:col-start-2 order-2 lg:order-1">
              <ScrollReveal>
                <p className="ct-overline mb-6" style={{ color: "#7A4F2D" }}>{t.home.aboutPreview.overline}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <h2
                  className="leading-[1.15] max-w-[500px]"
                  style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 400, color: "#F5F2EC" }}
                >
                  {t.home.aboutPreview.headline}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p
                  className="mt-6 leading-relaxed max-w-[480px]"
                  style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300, color: "rgba(245,242,236,0.72)" }}
                >
                  {t.home.aboutPreview.body}
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.45}>
                <Link
                  to="/about-me"
                  className="btn-primary mt-10"
                  style={{ borderRadius: "8px", padding: "10px 22px", display: "inline-block" }}
                  data-testid="about-cta"
                >
                  {t.home.aboutPreview.cta}
                </Link>
              </ScrollReveal>
            </div>

            {/* ── Portrait column — order-1 on mobile so image shows before text ── */}
            <div className={`lg:col-span-4 order-1 lg:order-2 lg:block ${isMobile ? "flex justify-center" : "block"}`}>
              <ScrollReveal delay={0.1} direction="none">
                <motion.div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/4", maxHeight: isMobile ? "380px" : isNarrow ? "500px" : undefined, width: isMobile ? "260px" : "100%" }}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
                  viewport={{ once: true, margin: "-5%" }}
                >
                  <motion.img
                    src={PORTRAIT}
                    alt="Cornelia Trompke"
                    className="w-full h-full object-cover"
                    style={{ filter: "contrast(1.05)" }}
                    initial={{ scale: 1.06 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    viewport={{ once: true }}
                  />
                  {/* Gold accent line — animates scaleY from top */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-px"
                    style={{
                      background: "linear-gradient(to bottom, transparent, #C8A96A, transparent)",
                      transformOrigin: "top",
                    }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 1.1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    viewport={{ once: true }}
                  />
                </motion.div>
              </ScrollReveal>
            </div>

          </div>
        </div>
      </section>

      {/* ═══ VENN DIAGRAM ═══ */}
      <VennDiagram />

      {/* ═══ METHOD TEASER ═══ */}
      <section className="ct-section relative overflow-hidden" style={{ background: "#0F1A12", paddingTop: isMobile ? undefined : (isNarrow ? "0" : "32px"), marginTop: (!isMobile && isNarrow) ? "-210px" : undefined }} data-testid="method-section">
        <NeuralCanvas opacity={0.08} nodeCount={40} />
        <div className="relative z-10 max-w-[750px] mx-auto px-6 text-center">
          <ScrollReveal>
            {!isNarrow && <div className="ct-divider mx-auto mb-8" />}
            <p className="ct-overline text-gold/70 mb-6">{t.home.method.overline}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2
              className="text-ivory leading-[1.15]"
              style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400 }}
            >
              {t.home.method.headline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p
              className="text-stone/55 mt-7 leading-relaxed"
              style={{ fontFamily: "Manrope, sans-serif", fontSize: "17px", fontWeight: 300 }}
            >
              {t.home.method.body}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.45}>
            <Link
              to="/how-i-work"
              className="btn-secondary mt-10"
              style={{ borderRadius: "8px", padding: "10px 22px", display: "inline-block" }}
              data-testid="method-cta"
            >
              {t.home.method.cta}
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ TRANSFORMATION ═══ */}
      <TransformationSection />

      {/* ═══ SERVICES — horizontal accordion ═══ */}
      <section style={{ background: "#0F1A12", paddingTop: "80px", paddingBottom: "80px" }} data-testid="services-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline text-gold/60 mb-4">{t.home.services.overline}</p>
            <h2
              className="text-ivory leading-[1.1] max-w-[500px]"
              style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400 }}
            >
              {t.home.services.headline}
            </h2>
          </ScrollReveal>

          {/* Accordion — desktop/tablet: horizontal | mobile: click-to-expand */}
          {isMobile ? (
            <div className="flex flex-col mt-10">
              {t.home.services.items.map((service, i) => {
                const isOpen = activeMobileService === i;
                return (
                  <div
                    key={i}
                    data-testid={`service-item-${i}`}
                    style={{ borderTop: "1px solid rgba(245,242,236,0.10)" }}
                  >
                    {/* Collapsed row — always visible */}
                    <button
                      onClick={() => setActiveMobileService(isOpen ? null : i)}
                      style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", textAlign: "left" }}
                    >
                      <div>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(200,169,106,0.65)", display: "block", marginBottom: "6px" }}>{service.number}</span>
                        <span style={{ fontFamily: "Figtree, sans-serif", fontSize: "18px", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.2 }}>{service.title}</span>
                      </div>
                      <span style={{ color: "rgba(200,169,106,0.7)", fontSize: "20px", flexShrink: 0, marginLeft: "16px", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.3s ease", display: "block" }}>+</span>
                    </button>
                    {/* Expanded content */}
                    {isOpen && (
                      <div style={{ paddingBottom: "24px" }}>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(245,242,236,0.5)", lineHeight: 1.75, marginBottom: "22px" }}>{service.description}</p>
                        <Link to={service.link} className="btn-secondary" style={{ borderRadius: "8px", padding: "10px 22px", display: "inline-block" }} data-testid={`service-cta-${i}`}>Explore This Work</Link>
                      </div>
                    )}
                  </div>
                );
              })}
              <div style={{ borderTop: "1px solid rgba(245,242,236,0.10)" }} />
            </div>
          ) : (
          <div
            className="flex mt-16"
            style={{ height: "520px" }}
          >
            {t.home.services.items.map((service, i) => {
              const isActive = activeService === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveService(i)}
                  onMouseLeave={() => setActiveService(null)}
                  data-testid={`service-item-${i}`}
                  style={{
                    flex: isActive ? 3.5 : 1,
                    transition: "flex 0.65s cubic-bezier(0.4, 0, 0.2, 1)",
                    position: "relative",
                    overflow: "hidden",
                    borderRight: i < t.home.services.items.length - 1 ? "1px solid rgba(245,242,236,0.10)" : "none",
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
                      {service.title}
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
                      {service.number}
                    </span>
                  </div>

                  {/* ── Expanded: editorial layout ── */}
                  <div
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.35s ease 0.22s",
                      padding: isNarrow ? "32px 60px 32px 32px" : "48px 80px 48px 52px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      minWidth: isNarrow ? "300px" : "420px",
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
                      {service.number}
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
                      {service.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "14px",
                        fontWeight: 300,
                        color: "rgba(245,242,236,0.5)",
                        lineHeight: 1.75,
                        marginBottom: "36px",
                        maxWidth: "360px",
                      }}
                    >
                      {service.description}
                    </p>
                    <Link
                      to={service.link}
                      className="btn-secondary"
                      style={{ borderRadius: "8px", padding: "10px 22px", display: "inline-block" }}
                      data-testid={`service-cta-${i}`}
                    >
                      Explore This Work
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section
        style={{ background: "#0F1A12", paddingTop: "100px", paddingBottom: "100px" }}
        data-testid="testimonials-section"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline mb-10" style={{ color: "rgba(200,169,106,0.65)" }}>
              {t.home.testimonials.overline}
            </p>
          </ScrollReveal>

          {/* ── Glassmorphic wrapper ── */}
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

                {/* Stacked testimonial panels — opacity-fade between them */}
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
                        transform: i === activeTestimonial ? "translateY(0)" : "translateY(10px)",
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

                {/* Thin auto-progress bar at bottom of card */}
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

          {/* Text-based author navigation */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0",
              marginTop: "4px",
              paddingLeft: "4px",
              borderTop: "1px solid rgba(200,169,106,0.12)",
            }}
          >
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => handleTestimonialClick(i)}
                data-testid={`testimonial-nav-${i}`}
                style={{
                  background: "none",
                  border: "none",
                  padding: "20px 32px 20px 0",
                  cursor: "pointer",
                  textAlign: "left",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: i === activeTestimonial ? "rgba(200,169,106,0.65)" : "transparent",
                    transition: "background 0.4s ease",
                  }}
                />
                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.20em",
                    textTransform: "uppercase",
                    color: i === activeTestimonial ? "#F5F2EC" : "rgba(245,242,236,0.28)",
                    transition: "color 0.4s ease",
                    marginBottom: "4px",
                  }}
                >
                  {item.author}
                </p>
                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "10px",
                    fontWeight: 300,
                    color: i === activeTestimonial ? "rgba(200,169,106,0.70)" : "rgba(200,169,106,0.22)",
                    transition: "color 0.4s ease",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.company}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Keyframe for progress bar */}
        <style>{`
          @keyframes progressSlide {
            from { width: 0%; }
            to   { width: 100%; }
          }
        `}</style>
      </section>

      {/* ═══ FINAL CTA ═══ */}
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
              data-testid="final-cta-card"
            >
              {/* Inner radial shimmer */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,169,106,0.05) 0%, transparent 70%)",
                  pointerEvents: "none",
                  zIndex: 0,
                }}
              />
              {/* Corner accent lines */}
              <div style={{ position: "absolute", top: 0, left: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />

              {/* Animated inner content */}
              <div style={{ position: "relative", zIndex: 10 }}>
                <AnimatePresence mode="wait">
                  {!showFinalForm ? (
                    <motion.div
                      key="cta-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <h2
                        className="text-ivory leading-[1.1]"
                        style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 400 }}
                      >
                        {t.home.cta.headline}
                      </h2>
                      <p
                        className="text-stone/50 mt-6 leading-relaxed"
                        style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300 }}
                      >
                        {t.home.cta.body}
                      </p>
                      <button
                        onClick={() => setShowFinalForm(true)}
                        className="btn-secondary mt-10 inline-block"
                        style={{ borderRadius: "8px", cursor: "pointer" }}
                        data-testid="final-cta-btn"
                      >
                        {t.home.cta.cta}
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="form-content"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <HeroContactForm
                        onClose={() => setShowFinalForm(false)}
                        noPadding
                        sendFrom="Homepage — Final CTA Section"
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

export default Home;
