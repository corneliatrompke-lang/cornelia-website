import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ScrollReveal from "../components/ScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import SEOHead from "../components/SEOHead";

const Legal = () => {
  const { t } = useLanguage();
  const l = t.legal;
  const [params] = useSearchParams();
  const [activeTab, setActiveTab] = useState(params.get("tab") || "impressum");

  const tabs = [
    { key: "impressum", label: l.nav.impressum },
    { key: "privacy", label: l.nav.privacy },
    { key: "terms", label: l.nav.terms },
  ];

  return (
    <div className="bg-ivory min-h-screen pt-32">
      <SEOHead
        title="Legal — Impressum, Privacy Policy & Terms"
        description="Impressum, Privacy Policy, and Terms of Service for Cornelia Trompke Consulting & Coaching. Based in Berlin, Germany."
        path="/legal"
        noIndex
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": "https://www.corneliatrompke.com/legal#webpage",
          "url": "https://www.corneliatrompke.com/legal",
          "name": "Legal — Cornelia Trompke Consulting & Coaching",
          "isPartOf": { "@id": "https://www.corneliatrompke.com/#website" },
        }}
      />
      <div className="max-w-[900px] mx-auto px-6 md:px-16 pb-24">
        {/* Tabs */}
        <div className="flex gap-0 border-b mb-16" style={{ borderColor: "rgba(18,18,18,0.12)" }}>
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className="py-4 px-6 bg-transparent border-none cursor-pointer transition-all duration-300"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "11px",
                fontWeight: 500,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: activeTab === tab.key ? "#121212" : "rgba(18,18,18,0.35)",
                borderBottom: activeTab === tab.key ? "1px solid #C8A96A" : "1px solid transparent",
                marginBottom: "-1px",
              }}
              data-testid={`legal-tab-${tab.key}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Impressum */}
        {activeTab === "impressum" && (
          <ScrollReveal key="impressum">
            <h1 className="text-charcoal mb-2" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 400 }}>
              {l.impressum.headline}
            </h1>
            <p className="ct-overline text-charcoal/40 mb-10" style={{ fontSize: "11px" }}>{l.impressum.intro}</p>

            {/* Name & Address */}
            <div className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(18,18,18,0.08)" }}>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "rgba(18,18,18,0.75)", lineHeight: 1.9 }}>
                {l.impressum.name}<br />
                {l.impressum.street}<br />
                {l.impressum.city}<br />
                {l.impressum.country}
              </p>
            </div>

            {/* Contact */}
            <div className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(18,18,18,0.08)" }}>
              <p className="ct-overline text-charcoal/40 mb-4" style={{ fontSize: "11px" }}>{l.impressum.contactHeading}</p>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300, color: "rgba(18,18,18,0.70)", lineHeight: 1.9 }}>
                {l.impressum.phoneLabel}: {l.impressum.phone}<br />
                {l.impressum.emailLabel}: <a href={`mailto:${l.impressum.email}`} style={{ color: "#C8A96A", textDecoration: "none" }}>{l.impressum.email}</a>
              </p>
            </div>

            {/* VAT ID */}
            <div className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(18,18,18,0.08)" }}>
              <p className="ct-overline text-charcoal/40 mb-4" style={{ fontSize: "11px" }}>{l.impressum.vatHeading}</p>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(18,18,18,0.55)", lineHeight: 1.7 }}>{l.impressum.vatNote}</p>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "rgba(18,18,18,0.75)", marginTop: "8px" }}>{l.impressum.vatId}</p>
            </div>

            {/* Editorial Responsibility */}
            <div className="mb-8 pb-8" style={{ borderBottom: "1px solid rgba(18,18,18,0.08)" }}>
              <p className="ct-overline text-charcoal/40 mb-4" style={{ fontSize: "11px" }}>{l.impressum.editorialHeading}</p>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(18,18,18,0.55)", lineHeight: 1.7 }}>{l.impressum.editorialNote}</p>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 400, color: "rgba(18,18,18,0.75)", marginTop: "8px", lineHeight: 1.9 }}>
                {l.impressum.editorialName}<br />
                {l.impressum.editorialStreet}<br />
                {l.impressum.editorialCity}
              </p>
            </div>

            {/* EU Dispute Resolution */}
            <div>
              <p className="ct-overline text-charcoal/40 mb-4" style={{ fontSize: "11px" }}>{l.impressum.disputeHeading}</p>
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, color: "rgba(18,18,18,0.60)", lineHeight: 1.8 }}>
                {l.impressum.disputeText}{" "}
                <a href={l.impressum.disputeUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#C8A96A", textDecoration: "none", wordBreak: "break-all" }}>
                  {l.impressum.disputeUrl}
                </a>
                {". "}{l.impressum.disputeSuffix}
              </p>
            </div>
          </ScrollReveal>
        )}

        {/* Privacy */}
        {activeTab === "privacy" && (
          <ScrollReveal key="privacy">
            <h1 className="text-charcoal mb-8" style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400 }}>
              {l.privacy.headline}
            </h1>
            <p className="text-charcoal/65 leading-relaxed" style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}>
              {l.privacy.content}
            </p>
            <div className="mt-10 space-y-6">
              {[
                { title: "Data Controller", text: "Cornelia Trompke, Berlin, Germany. Email: contact@corneliatrompke.com" },
                { title: "Data Collected", text: "Contact form: name, email, organisation, role, and message. This data is used solely to respond to your enquiry." },
                { title: "Data Retention", text: "Contact form data is retained for a period of 6 months from the date of submission, after which it is securely deleted." },
                { title: "Your Rights", text: "Under GDPR, you have the right to access, rectify, and erase your personal data. You may exercise these rights by contacting us at the email address above." },
                { title: "Cookies", text: "This website does not use tracking or marketing cookies. Anonymous analytics data may be collected to improve the user experience." },
              ].map((item) => (
                <div key={item.title} className="border-t pt-6" style={{ borderColor: "rgba(18,18,18,0.08)" }}>
                  <p className="ct-overline text-charcoal/50 mb-3">{item.title}</p>
                  <p className="text-charcoal/60" style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300, lineHeight: 1.7 }}>{item.text}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        )}

        {/* Terms */}
        {activeTab === "terms" && (
          <ScrollReveal key="terms">
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
        )}
      </div>
    </div>
  );
};

export default Legal;
