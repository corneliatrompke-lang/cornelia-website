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
