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
          <h1 className="text-charcoal mb-8" style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 400 }}>
            {l.privacy.headline}
          </h1>
          <p className="text-charcoal/65 leading-relaxed" style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}>
            {l.privacy.content}
          </p>
          <div className="mt-10 space-y-6">
            {[
              { title: "Data Controller", text: "Cornelia Trompke, Berlin, Germany. Email: contact@corneliatrompke.com" },
              { title: "Data Collected", text: "Contact form: name, email, organisation, role, and message. This data is used solely to respond to your enquiry and is never passed to third parties." },
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
      </div>
    </div>
  );
};

export default PrivacyPolicy;
