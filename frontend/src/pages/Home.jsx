import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import NeuralCanvas from "../components/NeuralCanvas";
import ScrollReveal from "../components/ScrollReveal";
import { useLanguage } from "../context/LanguageContext";

const PORTRAIT =
  "https://images.unsplash.com/photo-1686078803106-7c6684f62158?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBzZW5pb3IlMjB3b21hbiUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0JTIwYmxhY2slMjB3aGl0ZSUyMGVkaXRvcmlhbHxlbnwwfHx8fDE3NzI3ODc5NjB8MA&ixlib=rb-4.1.0&q=85";

const Home = () => {
  const { t } = useLanguage();
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = t.home.testimonials.items;

  return (
    <div className="bg-charcoal">
      {/* ═══ HERO ═══ */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        data-testid="hero-section"
      >
        <NeuralCanvas opacity={0.13} nodeCount={60} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 w-full pt-32 pb-24">
          <ScrollReveal delay={0.1}>
            <p className="ct-overline text-gold mb-10" data-testid="hero-overline">
              {t.home.hero.overline}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <h1
              className="text-ivory leading-[1.05] max-w-[860px]"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(44px, 7vw, 88px)", fontWeight: 400 }}
              data-testid="hero-headline"
            >
              {t.home.hero.tagline}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.5}>
            <p
              className="text-stone/60 mt-8 max-w-[560px] leading-relaxed"
              style={{ fontFamily: "Manrope, sans-serif", fontSize: "17px", fontWeight: 300 }}
            >
              {t.home.hero.subtitle}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 mt-12">
              <Link to="/contact" className="btn-primary" data-testid="hero-cta-primary">
                {t.home.hero.cta}
              </Link>
              <Link to="/work-with-me" className="btn-secondary" data-testid="hero-cta-secondary">
                {t.home.hero.ctaSecondary}
              </Link>
            </div>
          </ScrollReveal>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10">
          <span className="ct-overline text-stone/25">Scroll</span>
          <div className="scroll-line" />
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal to-transparent" />
      </section>

      {/* ═══ MARQUEE ═══ */}
      <section className="bg-stone py-5 overflow-hidden" data-testid="marquee-section">
        <div className="marquee-outer">
          <div className="marquee-track">
            {[t.home.marquee, t.home.marquee].map((text, i) => (
              <span
                key={i}
                className="ct-overline text-charcoal/50 pr-8"
                style={{ fontSize: "10px" }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section
        className="bg-ivory ct-section"
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
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400 }}
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
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(26px, 3.5vw, 42px)", fontWeight: 400 }}
                >
                  {t.home.aboutPreview.headline}
                </h2>
                <p
                  className="text-stone/55 mt-6 leading-relaxed max-w-[480px]"
                  style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300 }}
                >
                  {t.home.aboutPreview.body}
                </p>
                <Link to="/about" className="btn-secondary mt-10 inline-flex items-center gap-2" data-testid="about-cta">
                  {t.home.aboutPreview.cta}
                  <ArrowRight size={12} />
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

      {/* ═══ SERVICES ═══ */}
      <section className="bg-stone ct-section" data-testid="services-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline text-charcoal/40 mb-4">{t.home.services.overline}</p>
            <h2
              className="text-charcoal leading-[1.1] max-w-[500px]"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400 }}
            >
              {t.home.services.headline}
            </h2>
          </ScrollReveal>

          <div className="mt-16 space-y-0">
            {t.home.services.items.map((service, i) => (
              <ScrollReveal key={service.number} delay={i * 0.08}>
                <Link
                  to={service.link}
                  className="group block no-underline border-t py-10 hover:bg-charcoal/4 transition-colors duration-500"
                  style={{ borderColor: "rgba(18,18,18,0.12)" }}
                  data-testid={`service-item-${i}`}
                >
                  <div className="grid grid-cols-12 gap-6 items-start">
                    <div className="col-span-1">
                      <span
                        className="text-charcoal/20 text-sm"
                        style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "48px", lineHeight: 1 }}
                      >
                        {service.number}
                      </span>
                    </div>
                    <div className="col-span-10 lg:col-span-5">
                      <h3
                        className="text-charcoal group-hover:text-charcoal/80 transition-colors"
                        style={{ fontFamily: "Playfair Display, serif", fontSize: "22px", fontWeight: 400 }}
                      >
                        {service.title}
                      </h3>
                    </div>
                    <div className="col-span-12 lg:col-span-5 lg:col-start-7">
                      <p
                        className="text-charcoal/55 leading-relaxed"
                        style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300 }}
                      >
                        {service.description}
                      </p>
                    </div>
                    <div className="col-span-1 flex justify-end items-start pt-1">
                      <ArrowRight
                        size={16}
                        className="text-gold/40 group-hover:text-gold transition-all duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
            <div className="border-t" style={{ borderColor: "rgba(18,18,18,0.12)" }} />
          </div>

          <ScrollReveal delay={0.2}>
            <div className="mt-12">
              <Link to="/work-with-me" className="btn-dark" data-testid="view-all-services">
                {t.home.services.cta}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ METHOD TEASER ═══ */}
      <section className="bg-charcoal ct-section relative overflow-hidden" data-testid="method-section">
        <NeuralCanvas opacity={0.08} nodeCount={40} />
        <div className="relative z-10 max-w-[750px] mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="ct-divider mx-auto mb-8" />
            <p className="ct-overline text-gold/70 mb-6">{t.home.method.overline}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2
              className="text-ivory leading-[1.15]"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400 }}
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
            <Link to="/method" className="btn-secondary mt-10 inline-flex items-center gap-2" data-testid="method-cta">
              {t.home.method.cta}
              <ArrowRight size={12} />
            </Link>
          </ScrollReveal>
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
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 400 }}
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
