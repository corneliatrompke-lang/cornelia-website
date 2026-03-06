import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import NeuralCanvas from "../components/NeuralCanvas";
import ScrollReveal from "../components/ScrollReveal";
import { useLanguage } from "../context/LanguageContext";

const Method = () => {
  const { t } = useLanguage();
  const m = t.method;

  return (
    <div>
      {/* ═══ HERO ═══ */}
      <section
        className="bg-charcoal min-h-[70vh] flex items-end pb-20 pt-36 relative overflow-hidden"
        data-testid="method-hero"
      >
        <NeuralCanvas opacity={0.1} nodeCount={50} />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 80%, rgba(200,169,106,0.05) 0%, transparent 65%)",
          }}
        />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16 w-full">
          <div className="max-w-[720px]">
            <ScrollReveal>
              <p className="ct-overline text-gold mb-6">{m.hero.overline}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <h1
                className="text-ivory leading-[1.05]"
                style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(40px, 6vw, 76px)", fontWeight: 400 }}
              >
                {m.hero.headline}
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p
                className="text-stone/55 mt-6 leading-relaxed"
                style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px", fontStyle: "italic" }}
              >
                {m.hero.subtitle}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══ INTRO ═══ */}
      <section className="bg-ivory ct-section" data-testid="method-intro">
        <div className="max-w-[720px] mx-auto px-6">
          <ScrollReveal>
            <p className="ct-overline text-sage mb-5">{m.intro.overline}</p>
            <h2
              className="text-charcoal leading-[1.15] mb-8"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 400 }}
            >
              {m.intro.headline}
            </h2>
          </ScrollReveal>
          {m.intro.body.split("\n\n").map((para, i) => (
            <ScrollReveal key={i} delay={0.1 + i * 0.1}>
              <p
                className="text-charcoal/65 mt-5 leading-relaxed"
                style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300 }}
              >
                {para}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ═══ NARM ═══ */}
      <section className="bg-charcoal ct-section relative overflow-hidden" data-testid="method-narm">
        <NeuralCanvas opacity={0.07} nodeCount={35} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <p className="ct-overline text-gold mb-5">{m.narm.overline}</p>
                <h2
                  className="text-ivory leading-[1.1]"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400 }}
                >
                  {m.narm.headline}
                </h2>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6">
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

            <div className="lg:col-span-10 lg:col-start-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {m.narm.points.map((point, i) => (
                  <ScrollReveal key={i} delay={0.1 + i * 0.06}>
                    <div className="flex gap-4 items-start" data-testid={`narm-point-${i}`}>
                      <CheckCircle2 size={16} className="text-gold/60 mt-0.5 flex-shrink-0" />
                      <p
                        className="text-stone/60"
                        style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300 }}
                      >
                        {point}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ INTEGRAL COACHING ═══ */}
      <section className="bg-stone ct-section" data-testid="method-integral">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-start">
            <div className="lg:col-span-6">
              <ScrollReveal>
                <p className="ct-overline text-charcoal/40 mb-5">{m.integral.overline}</p>
                <h2
                  className="text-charcoal leading-[1.1]"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400 }}
                >
                  {m.integral.headline}
                </h2>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-6">
              {m.integral.body.split("\n\n").map((para, i) => (
                <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                  <p
                    className="text-charcoal/65 mb-5 leading-relaxed"
                    style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}
                  >
                    {para}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            <div className="lg:col-span-10 lg:col-start-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
                {m.integral.points.map((point, i) => (
                  <ScrollReveal key={i} delay={0.1 + i * 0.06}>
                    <div className="flex gap-4 items-start">
                      <CheckCircle2 size={16} className="text-sage mt-0.5 flex-shrink-0" />
                      <p
                        className="text-charcoal/60"
                        style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300 }}
                      >
                        {point}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SYNTHESIS ═══ */}
      <section className="bg-charcoal ct-section text-center" data-testid="method-synthesis">
        <div className="max-w-[680px] mx-auto px-6">
          <ScrollReveal>
            <div className="ct-divider mx-auto mb-8" />
            <p className="ct-overline text-gold/60 mb-6">{m.integration.overline}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h2
              className="text-ivory leading-[1.15]"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400 }}
            >
              {m.integration.headline}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p
              className="text-stone/55 mt-6 leading-relaxed"
              style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300 }}
            >
              {m.integration.body}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-stone ct-section-sm text-center" data-testid="method-cta">
        <div className="max-w-[540px] mx-auto px-6">
          <ScrollReveal>
            <h2
              className="text-charcoal"
              style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 400 }}
            >
              {m.cta.headline}
            </h2>
            <p
              className="text-charcoal/55 mt-4 leading-relaxed"
              style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}
            >
              {m.cta.body}
            </p>
            <Link to="/contact" className="btn-dark mt-8 inline-block" data-testid="method-contact-cta">
              {m.cta.button}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default Method;
