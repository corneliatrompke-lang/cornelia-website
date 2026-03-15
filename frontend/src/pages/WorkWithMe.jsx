import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import { useContactForm } from "../context/ContactFormContext";
import SEOHead from "../components/SEOHead";

const WorkWithMe = () => {
  const { t } = useLanguage();
  const { openForm } = useContactForm();
  const w = t.workWithMe;

  return (
    <div>
      <SEOHead
        title="Work With Me — 4 Engagement Formats"
        description="Four ways to work with Cornelia Trompke: 1:1 executive coaching, executive retreats, leadership team facilitation, and organisational advisory. All engagements begin with a conversation."
        path="/work-with-me"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://corneliatrompke.com/work-with-me#webpage",
              "url": "https://corneliatrompke.com/work-with-me",
              "name": "Work With Me — 4 Engagement Formats | Cornelia Trompke",
              "isPartOf": { "@id": "https://corneliatrompke.com/#website" },
            },
            {
              "@type": "ItemList",
              "name": "Services Offered by Cornelia Trompke",
              "description": "Four engagement formats for executive leadership development.",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Executive Coaching & Advisory", "url": "https://corneliatrompke.com/executive-coaching" },
                { "@type": "ListItem", "position": 2, "name": "Executive Retreats", "url": "https://corneliatrompke.com/executive-retreats" },
                { "@type": "ListItem", "position": 3, "name": "Leadership Team Facilitation", "url": "https://corneliatrompke.com/leadership-team-facilitation" },
                { "@type": "ListItem", "position": 4, "name": "Organisational Advisory for People & Culture Transformation", "url": "https://corneliatrompke.com/organizational-advisory" },
              ],
            },
          ],
        }}
      />
      <section
        className="bg-charcoal min-h-[65vh] flex items-end pb-20 pt-36"
        data-testid="work-hero"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full">
          <ScrollReveal>
            <p className="ct-overline text-gold mb-6">{w.hero.overline}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h1
              className="text-ivory leading-[1.05] max-w-[680px]"
              style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(44px, 6vw, 76px)", fontWeight: 400 }}
            >
              {w.hero.headline}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p
              className="text-stone/50 mt-5 max-w-[480px]"
              style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px", fontStyle: "italic" }}
            >
              {w.hero.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ SERVICES LIST ═══ */}
      <section className="bg-ivory ct-section" data-testid="work-services">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="space-y-0">
            {w.services.map((service, i) => (
              <ScrollReveal key={service.number} delay={i * 0.06}>
                <div
                  className="border-t py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
                  style={{ borderColor: "rgba(18,18,18,0.1)" }}
                  data-testid={`work-service-${i}`}
                >
                  <div className="lg:col-span-1">
                    <span
                      className="text-charcoal/15"
                      style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "52px", lineHeight: 1 }}
                    >
                      {service.number}
                    </span>
                  </div>
                  <div className="lg:col-span-4">
                    <h2
                      className="text-charcoal leading-[1.1]"
                      style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(22px, 2.5vw, 30px)", fontWeight: 400 }}
                    >
                      {service.title}
                    </h2>
                  </div>
                  <div className="lg:col-span-5">
                    <p
                      className="text-charcoal/60 leading-relaxed"
                      style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}
                    >
                      {service.description}
                    </p>
                  </div>
                  <div className="lg:col-span-2 flex lg:justify-end items-start">
                    <Link
                      to={service.link}
                      className="inline-flex items-center gap-2 text-sage hover:text-charcoal transition-colors duration-300 no-underline group"
                      style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase" }}
                    >
                      {service.cta}
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
            <div className="border-t" style={{ borderColor: "rgba(18,18,18,0.1)" }} />
          </div>
        </div>
      </section>

      {/* ═══ NOTE ═══ */}
      <section className="bg-stone ct-section-sm" data-testid="work-note">
        <div className="max-w-[680px] mx-auto px-6 text-center">
          <ScrollReveal>
            <div className="ct-divider mx-auto mb-8" style={{ background: "rgba(18,18,18,0.2)" }} />
            <p
              className="text-charcoal/60 leading-relaxed"
              style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "18px", fontStyle: "italic" }}
            >
              {w.note}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="bg-charcoal ct-section text-center" data-testid="work-cta">
        <div className="max-w-[580px] mx-auto px-6">
          <ScrollReveal>
            <h2
              className="text-ivory"
              style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 40px)", fontWeight: 400 }}
            >
              {w.cta.headline}
            </h2>
            <p
              className="text-stone/50 mt-5 leading-relaxed"
              style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}
            >
              {w.cta.body}
            </p>
            <button onClick={() => openForm(null, 'Work With Me')} className="btn-secondary mt-8" style={{ display: "inline-block", cursor: "pointer" }} data-testid="work-contact-cta">
              {w.cta.button}
            </button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
};

export default WorkWithMe;
