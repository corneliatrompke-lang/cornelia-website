import React from "react";
import { Link } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import { useLanguage } from "../context/LanguageContext";

const PORTRAIT =
  "https://images.unsplash.com/photo-1686078803106-7c6684f62158?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1NTJ8MHwxfHNlYXJjaHwyfHxwcm9mZXNzaW9uYWwlMjBzZW5pb3IlMjB3b21hbiUyMGV4ZWN1dGl2ZSUyMHBvcnRyYWl0JTIwYmxhY2slMjB3aGl0ZSUyMGVkaXRvcmlhbHxlbnwwfHx8fDE3NzI3ODc5NjB8MA&ixlib=rb-4.1.0&q=85";

const About = () => {
  const { t } = useLanguage();
  const a = t.about;

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section
        className="bg-charcoal min-h-[70vh] flex items-end pb-20 pt-36 relative overflow-hidden"
        data-testid="about-hero"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 70% 60% at 20% 60%, rgba(200,169,106,0.04) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <p className="ct-overline text-gold mb-6">{a.hero.overline}</p>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <h1
                  className="text-ivory leading-[1.05]"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(48px, 7vw, 88px)", fontWeight: 400 }}
                >
                  {a.hero.headline}
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p
                  className="text-sage mt-4"
                  style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px", fontStyle: "italic" }}
                >
                  {a.hero.subheadline}
                </p>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BIOGRAPHY ═══ */}
      <section className="bg-ivory ct-section" data-testid="about-bio">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            {/* Portrait */}
            <div className="lg:col-span-4">
              <ScrollReveal direction="left">
                <div className="relative" style={{ aspectRatio: "3/4", maxWidth: 400 }}>
                  <img
                    src={PORTRAIT}
                    alt="Cornelia Trompke"
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(100%)" }}
                  />
                  <div
                    className="absolute right-0 top-0 bottom-0 w-px"
                    style={{ background: "linear-gradient(to bottom, transparent, #C8A96A, transparent)" }}
                  />
                </div>
              </ScrollReveal>
            </div>

            {/* Text */}
            <div className="lg:col-span-7 lg:col-start-6">
              <ScrollReveal>
                <p className="ct-overline text-sage mb-4">{a.bio.overline}</p>
                <h2
                  className="text-charcoal leading-[1.1] mb-8"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400 }}
                >
                  {a.bio.headline}
                </h2>
              </ScrollReveal>
              <div className="space-y-5">
                {a.bio.paragraphs.map((para, i) => (
                  <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                    <p
                      className="text-charcoal/65 leading-relaxed"
                      style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300 }}
                    >
                      {para}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CREDENTIALS ═══ */}
      <section className="bg-charcoal ct-section" data-testid="about-credentials">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline text-gold mb-5">{a.credentials.overline}</p>
            <h2
              className="text-ivory leading-[1.1] mb-14 max-w-[500px]"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 400 }}
            >
              {a.credentials.headline}
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(200,169,106,0.1)" }}>
            {a.credentials.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-charcoal p-8" data-testid={`credential-${i}`}>
                  <div className="ct-divider mb-5" />
                  <h3
                    className="text-ivory mb-3"
                    style={{ fontFamily: "Playfair Display, serif", fontSize: "18px", fontWeight: 400 }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-stone/50"
                    style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300 }}
                  >
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PHILOSOPHY ═══ */}
      <section className="bg-stone ct-section" data-testid="about-philosophy">
        <div className="max-w-[750px] mx-auto px-6">
          <ScrollReveal>
            <p className="ct-overline text-charcoal/40 mb-6">{a.philosophy.overline}</p>
            <h2
              className="text-charcoal leading-[1.15] mb-8"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400 }}
            >
              {a.philosophy.headline}
            </h2>
          </ScrollReveal>
          {a.philosophy.body.split("\n\n").map((para, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.1}>
              <p
                className="text-charcoal/65 leading-relaxed mt-5"
                style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300 }}
              >
                {para}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-charcoal ct-section-sm text-center" data-testid="about-cta">
        <div className="max-w-[580px] mx-auto px-6">
          <ScrollReveal>
            <h2
              className="text-ivory leading-[1.1]"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400 }}
            >
              {a.cta.headline}
            </h2>
            <p
              className="text-stone/50 mt-5 leading-relaxed"
              style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}
            >
              {a.cta.body}
            </p>
            <Link to="/contact" className="btn-secondary mt-8 inline-block" data-testid="about-contact-cta">
              {a.cta.button}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default About;
