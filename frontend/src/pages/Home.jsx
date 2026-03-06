import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import NeuralCanvas from "../components/NeuralCanvas";
import ScrollReveal from "../components/ScrollReveal";
import VennDiagram from "../components/VennDiagram";
import { useLanguage } from "../context/LanguageContext";

const PORTRAIT =
  "https://images.unsplash.com/photo-1686078803106-7c6684f62158?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBzZW5pb3IlMjB3b21hbiUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0JTIwYmxhY2slMjB3aGl0ZSUyMGVkaXRvcmlhbHxlbnwwfHx8fDE3NzI3ODc5NjB8MA&ixlib=rb-4.1.0&q=85";

// Hero placeholder image — replace with client's own photography

const HERO_BG =
  "https://images.unsplash.com/photo-1729250829395-864b0d9489c2?crop=entropy&cs=srgb&fm=jpg&q=85";

const Home = () => {
  const { t } = useLanguage();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeService, setActiveService] = useState(null);
  const testimonials = t.home.testimonials.items;

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

      {/* ═══ VENN DIAGRAM ═══ */}
      <VennDiagram />

      {/* ═══ PHILOSOPHY ═══ */}
      <section
        className="bg-ivory ct-section"
        style={{ paddingTop: "30px" }}
        data-testid="philosophy-section"
      >
        <div className="max-w-[720px] mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="ct-divider mx-auto mb-8" style={{ background: "rgba(18,18,18,0.2)" }} />
            <p className="ct-overline text-sage mb-6">{t.home.philosophy.overline}</p>
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

      {/* ═══ METHOD TEASER ═══ */}
      <section className="bg-charcoal ct-section relative overflow-hidden" data-testid="method-section">
        <NeuralCanvas opacity={0.08} nodeCount={40} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

            {/* Left column — decorative space (NeuralCanvas shows through) */}
            <div />

            {/* Right column — editorial text */}
            <div>
              <ScrollReveal>
                <div className="ct-divider mb-8" />
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

          </div>
        </div>
      </section>

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
      <section className="bg-ivory ct-section" data-testid="testimonials-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline text-sage mb-12">{t.home.testimonials.overline}</p>
          </ScrollReveal>

          <div className="max-w-[760px]">
            <ScrollReveal delay={0.1}>
              <blockquote
                className="text-charcoal/80 leading-relaxed"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(20px, 2.5vw, 28px)", fontStyle: "italic", fontWeight: 400 }}
              >
                &ldquo;{testimonials[activeTestimonial].text}&rdquo;
              </blockquote>
              <div className="mt-6">
                <div className="ct-divider mb-5" style={{ background: "rgba(18,18,18,0.15)" }} />
                <p className="ct-overline text-charcoal/50">
                  {testimonials[activeTestimonial].author}
                </p>
                <p
                  className="text-sage text-xs mt-1"
                  style={{ fontFamily: "Manrope, sans-serif", fontWeight: 300 }}
                >
                  {testimonials[activeTestimonial].company}
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Testimonial navigation */}
          <div className="flex gap-3 mt-10">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className="transition-all duration-300 border-none cursor-pointer p-0"
                style={{
                  width: i === activeTestimonial ? 32 : 16,
                  height: 1,
                  background: i === activeTestimonial ? "#C8A96A" : "rgba(18,18,18,0.2)",
                }}
                data-testid={`testimonial-nav-${i}`}
              />
            ))}
          </div>
        </div>
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
