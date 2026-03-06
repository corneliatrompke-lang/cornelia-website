import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import ScrollReveal from "../../components/ScrollReveal";
import { useLanguage } from "../../context/LanguageContext";

const MeditationRetreat = () => {
  const { t } = useLanguage();
  const s = t.services.meditationRetreat;

  return (
    <div>
      <section className="bg-charcoal min-h-[65vh] flex items-end pb-20 pt-36" data-testid="retreat-hero">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full">
          <ScrollReveal>
            <p className="ct-overline text-gold mb-6">{s.hero.overline}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h1 className="text-ivory leading-[1.05] max-w-[680px]" style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(40px, 6vw, 74px)", fontWeight: 400 }}>
              {s.hero.headline}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-stone/50 mt-5 max-w-[520px]" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px", fontStyle: "italic" }}>
              {s.hero.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="bg-stone ct-section" data-testid="retreat-description">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <p className="ct-overline text-charcoal/40 mb-4">{s.description.overline}</p>
                <h2 className="text-charcoal leading-[1.1]" style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400 }}>
                  {s.description.headline}
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              {s.description.body.split("\n\n").map((para, i) => (
                <ScrollReveal key={i} delay={0.1 + i * 0.08}>
                  <p className="text-charcoal/65 mb-5 leading-relaxed" style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}>{para}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-charcoal ct-section" data-testid="retreat-for-whom">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
            <div className="lg:col-span-5">
              <ScrollReveal>
                <p className="ct-overline text-gold mb-4">{s.forWhom.overline}</p>
                <h2 className="text-ivory leading-[1.1]" style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400 }}>
                  {s.forWhom.headline}
                </h2>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-5">
                {s.forWhom.items.map((item, i) => (
                  <ScrollReveal key={i} delay={0.08 * i}>
                    <div className="flex gap-4 items-start">
                      <CheckCircle2 size={15} className="text-gold/60 mt-0.5 flex-shrink-0" />
                      <p className="text-stone/60" style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300 }}>{item}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ivory ct-section" data-testid="retreat-format">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline text-sage mb-4">{s.format.overline}</p>
            <h2 className="text-charcoal leading-[1.1] mb-12" style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400 }}>
              {s.format.headline}
            </h2>
          </ScrollReveal>
          <div className="space-y-0">
            {s.format.items.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.06}>
                <div className="border-t py-6 grid grid-cols-1 md:grid-cols-3 gap-4" style={{ borderColor: "rgba(18,18,18,0.12)" }}>
                  <p className="ct-overline text-charcoal/40">{item.label}</p>
                  <p className="md:col-span-2 text-charcoal/70" style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300 }}>{item.value}</p>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t" style={{ borderColor: "rgba(18,18,18,0.12)" }} />
          </div>
        </div>
      </section>

      <section className="bg-charcoal ct-section-sm text-center">
        <div className="max-w-[520px] mx-auto px-6">
          <ScrollReveal>
            <h2 className="text-ivory" style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(26px, 3vw, 36px)", fontWeight: 400 }}>
              {s.cta.headline}
            </h2>
            <Link to="/contact" className="btn-secondary mt-8 inline-block" data-testid="retreat-enquire-btn">
              {s.cta.button}
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default MeditationRetreat;
