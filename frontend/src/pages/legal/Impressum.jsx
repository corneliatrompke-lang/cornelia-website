import React from "react";
import ScrollReveal from "../../components/ScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import SEOHead from "../../components/SEOHead";
import LegalNav from "./LegalNav";

const Impressum = () => {
  const { t } = useLanguage();
  const l = t.legal;
  const i = l.impressum;

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
          "@id": "https://www.corneliatrompke.com/impressum#webpage",
          "url": "https://www.corneliatrompke.com/impressum",
          "name": "Impressum — Cornelia Trompke Consulting & Coaching",
          "isPartOf": { "@id": "https://www.corneliatrompke.com/#website" },
        }}
      />
      <div className="max-w-[900px] mx-auto px-6 md:px-16 pb-24">
        <LegalNav active="impressum" />
        <ScrollReveal>
          <h1 className="text-charcoal mb-2" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400 }}>
            {i.headline}
          </h1>
          <p className="ct-overline text-charcoal/40 mb-1" style={{ fontSize: "11px" }}>{i.intro}</p>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", color: "rgba(18,18,18,0.35)", marginBottom: "40px" }}>{l.lastUpdated}</p>

          {/* Name & Address */}
          <div className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(18,18,18,0.08)" }}>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "rgba(18,18,18,0.75)", lineHeight: 1.9 }}>
              {i.name}<br />
              {i.street}<br />
              {i.city}<br />
              {i.country}
            </p>
          </div>

          {/* Contact */}
          <div className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(18,18,18,0.08)" }}>
            <p className="ct-overline text-charcoal/40 mb-4" style={{ fontSize: "11px" }}>{i.contactHeading}</p>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300, color: "rgba(18,18,18,0.70)", lineHeight: 1.9 }}>
              {i.phoneLabel}: {i.phone}<br />
              {i.emailLabel}: <a href={`mailto:${i.email}`} style={{ color: "#C8A96A", textDecoration: "none" }}>{i.email}</a>
            </p>
          </div>

          {/* VAT ID */}
          <div className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(18,18,18,0.08)" }}>
            <p className="ct-overline text-charcoal/40 mb-4" style={{ fontSize: "11px" }}>{i.vatHeading}</p>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(18,18,18,0.55)", lineHeight: 1.7 }}>{i.vatNote}</p>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "rgba(18,18,18,0.75)", marginTop: "8px" }}>{i.vatId}</p>
          </div>

          {/* Editorial Responsibility */}
          <div className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(18,18,18,0.08)" }}>
            <p className="ct-overline text-charcoal/40 mb-4" style={{ fontSize: "11px" }}>{i.editorialHeading}</p>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(18,18,18,0.55)", lineHeight: 1.7 }}>{i.editorialNote}</p>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "rgba(18,18,18,0.75)", marginTop: "8px", lineHeight: 1.9 }}>
              {i.editorialName}<br />
              {i.editorialStreet}<br />
              {i.editorialCity}
            </p>
          </div>

          {/* EU Dispute Resolution */}
          <div>
            <p className="ct-overline text-charcoal/40 mb-4" style={{ fontSize: "11px" }}>{i.disputeHeading}</p>
            <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(18,18,18,0.60)", lineHeight: 1.8 }}>
              {i.disputeText}{" "}
              <a href={i.disputeUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#C8A96A", textDecoration: "none", wordBreak: "break-all" }}>
                {i.disputeUrl}
              </a>
              {". "}{i.disputeSuffix}
            </p>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Impressum;
