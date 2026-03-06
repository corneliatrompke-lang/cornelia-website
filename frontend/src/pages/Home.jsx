import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import NeuralCanvas from "../components/NeuralCanvas";
import ScrollReveal from "../components/ScrollReveal";
import VennDiagram from "../components/VennDiagram";
import TransformationSection from "../components/TransformationSection";
import { useLanguage } from "../context/LanguageContext";

const PORTRAIT =
  "https://images.unsplash.com/photo-1686078803106-7c6684f62158?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBzZW5pb3IlMjB3b21hbiUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0JTIwYmxhY2slMjB3aGl0ZSUyMGVkaXRvcmlhbHxlbnwwfHx8fDE3NzI3ODc5NjB8MA&ixlib=rb-4.1.0&q=85";

// Placeholder testimonial portrait images — replace with real client photography
const TESTIMONIAL_PORTRAITS = [
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85",
];

// Hero placeholder image — replace with client's own photography

const HERO_BG =
  "https://images.unsplash.com/photo-1729250829395-864b0d9489c2?crop=entropy&cs=srgb&fm=jpg&q=85";

const Home = () => {
  const { t } = useLanguage();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeService, setActiveService] = useState(null);
  const testimonials = t.home.testimonials.items;
  const timerRef = useRef(null);

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
    <div className="bg-[#F5F2EC]">
      {/* ═══ HERO — Rounded card wrapper ═══ */}
      <section
        className="pt-[6px] px-3 md:px-4 pb-3"
        style={{ background: "#F5F2EC" }}
        data-testid="hero-section"
      >
        {/* Rounded container */}
        <div
          className="relative overflow-hidden w-full"
          style={{
            borderRadius: "20px",
            minHeight: "96vh",
          }}
        >
          {/* Background image */}
          <img
            src={HERO_BG}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            aria-hidden="true"
          />

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

          {/* ── Text: bottom-left ── */}
          <div
            className="absolute bottom-0 left-0 z-10 p-8 md:p-14"
            style={{ maxWidth: "860px" }}
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
              <div className="flex flex-col sm:flex-row gap-3 mt-9 mb-10">
                <Link to="/contact" className="btn-hero-pill" data-testid="hero-cta-primary">
                  {t.home.hero.cta}
                  <ArrowRight size={13} />
                </Link>
                <Link to="/work-with-me" className="btn-hero-pill-outline" data-testid="hero-cta-secondary">
                  {t.home.hero.ctaSecondary}
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Scroll indicator — bottom right */}
          <div className="absolute bottom-10 right-10 z-10 flex flex-col items-center gap-2">
            <span className="ct-overline text-white/25" style={{ fontSize: "9px" }}>Scroll</span>
            <div className="scroll-line" />
          </div>
        </div>
      </section>

      {/* ═══ THE FOUNDATION ═══ */}
      <section
        className="bg-ivory"
        style={{ paddingBottom: "140px" }}
        data-testid="philosophy-section"
      >
        {/* ── Desktop: collage + overlapping content card ── */}
        <div className="hidden md:block max-w-[1400px] mx-auto px-6 md:px-16">
          {/* Outer relative wrapper so absolute elements are scoped here */}
          <div className="relative">

            {/* Banner — 75% width, centered, in normal flow */}
            <div style={{ margin: "140px auto 0", width: "75%", height: "460px", overflow: "hidden" }}>
              <img
                src="https://images.unsplash.com/photo-1671735250135-fc322596644a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
              />
            </div>

            {/* Circle — middle layer, top-right of banner */}
            <div style={{
              position: "absolute", right: 0, top: "140px",
              width: "290px", height: "290px",
              borderRadius: "50%", overflow: "hidden",
              border: "6px solid #F5F2EC",
              boxShadow: "0 12px 48px rgba(18,18,18,0.20)",
              zIndex: 2,
            }}>
              <img
                src="https://images.unsplash.com/photo-1572866649630-bd38af3d527c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
              />
            </div>

            {/* Tilted square — middle layer, lower-left of banner */}
            <div style={{
              position: "absolute", left: "calc(12.5% - 40px)", top: "280px",
              width: "250px", height: "250px",
              transform: "rotate(-5deg)", overflow: "hidden",
              border: "6px solid #F5F2EC",
              boxShadow: "0 12px 48px rgba(18,18,18,0.20)",
              zIndex: 2,
            }}>
              <img
                src="https://images.unsplash.com/photo-1684963948721-e24aa0d82911?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85"
                alt=""
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>

            {/* Content card — top layer, narrow centered card overlapping square + banner */}
            <div
              className="mx-auto text-center"
              style={{
                maxWidth: "608px",
                marginTop: "-100px",
                position: "relative",
                zIndex: 3,
                background: "#F5F2EC",
                padding: "24px 24px 0",
              }}
            >
              <ScrollReveal>
                <div className="ct-divider mx-auto mb-8" style={{ background: "rgba(18,18,18,0.2)" }} />
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <h2
                  className="text-charcoal leading-[1.15]"
                  style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400 }}
                >
                  {t.home.philosophy.headline}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                {t.home.philosophy.body.split("\n\n").map((para, i) => (
                  <p
                    key={i}
                    className="text-charcoal/65 mt-6 leading-relaxed"
                    style={{ fontFamily: "Manrope, sans-serif", fontSize: "17px", fontWeight: 300 }}
                  >
                    {para}
                  </p>
                ))}
              </ScrollReveal>
            </div>

          </div>
        </div>

        {/* ── Mobile: text only ── */}
        <div className="md:hidden max-w-[720px] mx-auto px-6 text-center" style={{ paddingTop: "60px" }}>
          <ScrollReveal>
            <div className="ct-divider mx-auto mb-8" style={{ background: "rgba(18,18,18,0.2)" }} />
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2
              className="text-charcoal leading-[1.15]"
              style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400 }}
            >
              {t.home.philosophy.headline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            {t.home.philosophy.body.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-charcoal/65 mt-6 leading-relaxed"
                style={{ fontFamily: "Manrope, sans-serif", fontSize: "17px", fontWeight: 300 }}
              >
                {para}
              </p>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ ABOUT PREVIEW ═══ */}
      <section className="bg-charcoal ct-section" data-testid="about-preview-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            <div className="lg:col-span-6 lg:col-start-2">
              <ScrollReveal>
                <p className="ct-overline text-gold mb-6">{t.home.aboutPreview.overline}</p>
                <h2
                  className="text-ivory leading-[1.15] max-w-[500px]"
                  style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 400 }}
                >
                  {t.home.aboutPreview.headline}
                </h2>
                <p
                  className="text-stone/55 mt-6 leading-relaxed max-w-[480px]"
                  style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300 }}
                >
                  {t.home.aboutPreview.body}
                </p>
                <Link
                  to="/about"
                  className="btn-secondary mt-10"
                  style={{ borderRadius: "8px", padding: "10px 22px" }}
                  data-testid="about-cta"
                >
                  {t.home.aboutPreview.cta}
                </Link>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-4">
              <ScrollReveal delay={0.2} direction="left">
                <div
                  className="relative overflow-hidden"
                  style={{ aspectRatio: "3/4" }}
                >
                  <img
                    src={PORTRAIT}
                    alt="Cornelia Trompke"
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(100%) contrast(1.05)" }}
                  />
                  {/* Gold accent line */}
                  <div
                    className="absolute left-0 top-0 bottom-0 w-px"
                    style={{ background: "linear-gradient(to bottom, transparent, #C8A96A, transparent)" }}
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VENN DIAGRAM ═══ */}
      <VennDiagram />

      {/* ═══ METHOD TEASER ═══ */}
      <section className="bg-charcoal ct-section relative overflow-hidden" style={{ paddingTop: "32px" }} data-testid="method-section">
        <NeuralCanvas opacity={0.08} nodeCount={40} />
        <div className="relative z-10 max-w-[750px] mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="ct-divider mx-auto mb-8" />
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
              to="/method"
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
      <section className="bg-charcoal" style={{ paddingTop: "80px", paddingBottom: "80px" }} data-testid="services-section">
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

          {/* Accordion — 4 columns separated by thin lines */}
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
                      padding: "48px 52px",
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
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section
        style={{ background: "#121212", paddingTop: "100px", paddingBottom: "100px" }}
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
              {/* LEFT — cross-fading portrait images */}
              <div style={{ width: "38%", flexShrink: 0, position: "relative" }}>
                {TESTIMONIAL_PORTRAITS.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt=""
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                      opacity: i === activeTestimonial ? 1 : 0,
                      transition: "opacity 0.9s ease",
                      filter: "grayscale(15%)",
                    }}
                  />
                ))}
                {/* Vertical gold divider on right edge of image */}
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "15%",
                    bottom: "15%",
                    width: "1px",
                    background: "linear-gradient(to bottom, transparent, rgba(200,169,106,0.45), transparent)",
                    zIndex: 2,
                  }}
                />
              </div>

              {/* RIGHT — quote text, vertically centred */}
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  padding: "52px 60px",
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

          {/* ── Thumbnails — OUTSIDE the wrapper, float up toward it ── */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              marginTop: "0px",
              alignItems: "flex-end",
              paddingLeft: "4px",
            }}
          >
            {TESTIMONIAL_PORTRAITS.map((src, i) => (
              <button
                key={i}
                onClick={() => handleTestimonialClick(i)}
                data-testid={`testimonial-nav-${i}`}
                style={{
                  width: i === activeTestimonial ? "72px" : "58px",
                  height: i === activeTestimonial ? "72px" : "58px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: i === activeTestimonial
                    ? "2px solid #C8A96A"
                    : "2px solid rgba(245,242,236,0.12)",
                  transform: i === activeTestimonial
                    ? "translateY(-14px)"
                    : "translateY(0)",
                  transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "pointer",
                  padding: 0,
                  background: "none",
                  flexShrink: 0,
                  boxShadow: i === activeTestimonial
                    ? "0 8px 28px rgba(200,169,106,0.22)"
                    : "none",
                }}
              >
                <img
                  src={src}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    objectPosition: "center top",
                    filter: i === activeTestimonial ? "none" : "grayscale(70%)",
                    transition: "filter 0.45s ease",
                  }}
                />
              </button>
            ))}

            {/* Author labels beside thumbnails */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                marginLeft: "12px",
                paddingBottom: "6px",
              }}
            >
              {testimonials.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleTestimonialClick(i)}
                  style={{
                    background: "none",
                    border: "none",
                    padding: "0",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    opacity: i === activeTestimonial ? 1 : 0.35,
                    transition: "opacity 0.35s ease",
                  }}
                >
                  <div
                    style={{
                      width: i === activeTestimonial ? "20px" : "10px",
                      height: "1px",
                      background: i === activeTestimonial
                        ? "#C8A96A"
                        : "rgba(245,242,236,0.3)",
                      transition: "width 0.35s ease, background 0.35s ease",
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "10px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      color: i === activeTestimonial
                        ? "#F5F2EC"
                        : "rgba(245,242,236,0.4)",
                      whiteSpace: "nowrap",
                      transition: "color 0.35s ease",
                    }}
                  >
                    {item.author}
                  </span>
                </button>
              ))}
            </div>
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
        className="bg-charcoal ct-section relative overflow-hidden text-center"
        data-testid="final-cta-section"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(200,169,106,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[640px] mx-auto px-6">
          <ScrollReveal>
            <h2
              className="text-ivory leading-[1.1]"
              style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 400 }}
            >
              {t.home.cta.headline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p
              className="text-stone/50 mt-6 leading-relaxed"
              style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300 }}
            >
              {t.home.cta.body}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.35}>
            <Link to="/contact" className="btn-primary mt-10 inline-block" data-testid="final-cta-btn">
              {t.home.cta.cta}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Home;
