import React from "react";
import ScrollReveal from "../../components/ScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import SEOHead from "../../components/SEOHead";
import LegalNav from "./LegalNav";

const PrivacyPolicy = () => {
  const { t } = useLanguage();
  const l = t.legal;

  return (
    <div className="bg-ivory min-h-screen pt-32">
      <SEOHead
        title="Privacy Policy"
        description="Privacy Policy for Cornelia Trompke Consulting & Coaching — GDPR compliant data processing information."
        path="/privacy"
        noIndex
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://www.corneliatrompke.com/privacy#webpage",
          "url": "https://www.corneliatrompke.com/privacy",
          "name": "Privacy Policy — Cornelia Trompke Consulting & Coaching",
          "isPartOf": { "@id": "https://www.corneliatrompke.com/#website" },
        }}
      />
      <div className="max-w-[900px] mx-auto px-6 md:px-16 pb-24">
        <LegalNav active="privacy" />
        <ScrollReveal>
          <h1 className="text-charcoal mb-2" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400 }}>
            {l.privacy.headline}
          </h1>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", color: "rgba(18,18,18,0.35)", marginBottom: "40px" }}>{l.lastUpdated}</p>
          <div className="space-y-0">
            {l.privacy.sections.map((section) => (
              <div key={section.number} className="py-8" style={{ borderBottom: "1px solid rgba(18,18,18,0.08)" }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 500, letterSpacing: "0.15em", color: "#C8A96A" }}>
                    {section.number}.
                  </span>
                  <p className="ct-overline text-charcoal/50" style={{ fontSize: "11px" }}>{section.title}</p>
                </div>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(18,18,18,0.65)", lineHeight: 1.85, paddingLeft: "27px" }}>
                  {section.text}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
