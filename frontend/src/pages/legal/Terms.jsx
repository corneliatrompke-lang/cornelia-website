import React from "react";
import ScrollReveal from "../../components/ScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import SEOHead from "../../components/SEOHead";
import LegalNav from "./LegalNav";

const Terms = () => {
  const { t } = useLanguage();
  const l = t.legal;

  return (
    <div className="bg-ivory min-h-screen pt-32">
      <SEOHead
        title="Terms of Service"
        description="Terms of Service for Cornelia Trompke Consulting & Coaching. Governing law: Germany."
        path="/terms"
        noIndex
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://www.corneliatrompke.com/terms#webpage",
          "url": "https://www.corneliatrompke.com/terms",
          "name": "Terms of Service — Cornelia Trompke Consulting & Coaching",
          "isPartOf": { "@id": "https://www.corneliatrompke.com/#website" },
        }}
      />
      <div className="max-w-[900px] mx-auto px-6 md:px-16 pb-24">
        <LegalNav active="terms" />
        <ScrollReveal>
          <h1 className="text-charcoal mb-8" style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400 }}>
            {l.terms.headline}
          </h1>
          <p className="text-charcoal/65 leading-relaxed mb-10" style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}>
            {l.terms.content}
          </p>
          <div className="space-y-6">
            {[
              { title: "Scope of Services", text: "All services provided by Cornelia Trompke Consulting & Coaching are subject to individual agreement. The scope, duration, and fees of any engagement are defined in a separate written agreement." },
              { title: "Intellectual Property", text: "All content on this website — including texts, images, and design elements — is protected by copyright. Reproduction or distribution without prior written consent is prohibited." },
              { title: "Limitation of Liability", text: "Cornelia Trompke Consulting & Coaching accepts no liability for the accuracy of content on third-party websites linked from this site. Links are provided for informational purposes only." },
              { title: "Governing Law", text: "These terms are governed by the laws of the Federal Republic of Germany. The place of jurisdiction is Berlin, Germany." },
            ].map((item) => (
              <div key={item.title} className="border-t pt-6" style={{ borderColor: "rgba(18,18,18,0.08)" }}>
                <p className="ct-overline text-charcoal/50 mb-3">{item.title}</p>
                <p className="text-charcoal/60" style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, lineHeight: 1.7 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Terms;
