import React from "react";
import ScrollReveal from "../../components/ScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import SEOHead from "../../components/SEOHead";
import LegalNav from "./LegalNav";

const Impressum = () => {
  const { t } = useLanguage();
  const l = t.legal;

  return (
    <div className="bg-ivory min-h-screen pt-32">
      <SEOHead
        title="Impressum"
        description="Impressum for Cornelia Trompke Consulting & Coaching. Based in Berlin, Germany."
        path="/impressum"
        noIndex
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://corneliatrompke.com/impressum#webpage",
          "url": "https://corneliatrompke.com/impressum",
          "name": "Impressum — Cornelia Trompke Consulting & Coaching",
          "isPartOf": { "@id": "https://corneliatrompke.com/#website" },
        }}
      />
      <div className="max-w-[900px] mx-auto px-6 md:px-16 pb-24">
        <LegalNav active="impressum" />
        <ScrollReveal>
          <h1 className="text-charcoal mb-10" style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400 }}>
            {l.impressum.headline}
          </h1>
          <div className="space-y-4">
            {[
              { label: "Name", value: l.impressum.name },
              { label: "Address", value: l.impressum.address },
              { label: "Email", value: l.impressum.email },
            ].map((item) => (
              <div key={item.label} className="grid grid-cols-3 gap-4 py-4 border-b" style={{ borderColor: "rgba(18,18,18,0.08)" }}>
                <p className="ct-overline text-charcoal/40">{item.label}</p>
                <p className="col-span-2 text-charcoal/70" style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300 }}>{item.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 p-6" style={{ background: "rgba(18,18,18,0.03)", border: "1px solid rgba(18,18,18,0.06)" }}>
            <p className="ct-overline text-charcoal/40 mb-3">{l.impressum.vatNote}</p>
            <p className="text-charcoal/55" style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, lineHeight: 1.7 }}>
              {l.impressum.disclaimer}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Impressum;
