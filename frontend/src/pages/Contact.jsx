import React, { useState } from "react";
import axios from "axios";
import { MessageCircle, MapPin, Languages, Clock } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import { useLanguage } from "../context/LanguageContext";
import SEOHead from "../components/SEOHead";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const WHATSAPP_NUMBER = "49030000000"; // Placeholder – update with real number

const Contact = () => {
  const { t } = useLanguage();
  const c = t.contact;

  const [form, setForm] = useState({ name: "", email: "", organisation: "", role: "", message: "" });
  const [status, setStatus] = useState(null); // null | 'success' | 'error'
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${BACKEND_URL}/api/contact`, form);
      setStatus("success");
      setForm({ name: "", email: "", organisation: "", role: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const whatsappMessage = encodeURIComponent("Hello Cornelia, I found your website and would like to learn more about working together.");

  return (
    <div>
      <SEOHead
        title="Contact & Apply — Start the Conversation"
        description="Begin the conversation. Every engagement starts with understanding. All enquiries to Cornelia Trompke receive a personal response within 2–3 business days. Based in Berlin, working in German and English."
        path="/contact"
      />
      <section className="bg-charcoal min-h-[55vh] flex items-end pb-20 pt-36" data-testid="contact-hero">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full">
          <ScrollReveal>
            <p className="ct-overline text-gold mb-6">{c.hero.overline}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <h1 className="text-ivory leading-[1.05] max-w-[600px]" style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(44px, 6vw, 76px)", fontWeight: 400 }}>
              {c.hero.headline}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.3}>
            <p className="text-stone/50 mt-5 max-w-[500px]" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "20px", fontStyle: "italic" }}>
              {c.hero.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══ FORM + INFO ═══ */}
      <section className="bg-ivory ct-section" data-testid="contact-form-section">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <ScrollReveal>
                <h2 className="text-charcoal mb-10" style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(24px, 2.5vw, 32px)", fontWeight: 400 }}>
                  {c.form.headline}
                </h2>
              </ScrollReveal>

              {status === "success" ? (
                <ScrollReveal>
                  <div className="border-l-2 border-gold pl-6 py-4">
                    <p className="text-charcoal/70" style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300 }}>
                      {c.form.success}
                    </p>
                  </div>
                </ScrollReveal>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8" data-testid="contact-form">
                  <ScrollReveal delay={0.05}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="ct-overline text-charcoal/40 block mb-2">{c.form.name} *</label>
                        <input name="name" value={form.name} onChange={handleChange} required className="ct-input" data-testid="contact-name" />
                      </div>
                      <div>
                        <label className="ct-overline text-charcoal/40 block mb-2">{c.form.email} *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} required className="ct-input" data-testid="contact-email" />
                      </div>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.1}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <label className="ct-overline text-charcoal/40 block mb-2">{c.form.organisation}</label>
                        <input name="organisation" value={form.organisation} onChange={handleChange} className="ct-input" data-testid="contact-organisation" />
                      </div>
                      <div>
                        <label className="ct-overline text-charcoal/40 block mb-2">{c.form.role}</label>
                        <input name="role" value={form.role} onChange={handleChange} className="ct-input" data-testid="contact-role" />
                      </div>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.15}>
                    <div>
                      <label className="ct-overline text-charcoal/40 block mb-2">{c.form.message} *</label>
                      <textarea name="message" value={form.message} onChange={handleChange} required placeholder={c.form.messagePlaceholder} className="ct-textarea" data-testid="contact-message" />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    {status === "error" && (
                      <p className="text-red-500/70 text-sm mb-4" style={{ fontFamily: "Manrope, sans-serif" }}>{c.form.error}</p>
                    )}
                    <button type="submit" disabled={loading} className="btn-primary" data-testid="contact-submit-btn">
                      {loading ? "..." : c.form.submit}
                    </button>
                  </ScrollReveal>
                </form>
              )}
            </div>

            {/* Info sidebar */}
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={0.2}>
                {/* WhatsApp */}
                <div className="mb-12">
                  <h3 className="text-charcoal mb-3" style={{ fontFamily: "Figtree, sans-serif", fontSize: "20px", fontWeight: 400 }}>
                    {c.whatsapp.headline}
                  </h3>
                  <p className="text-charcoal/55 mb-5" style={{ fontFamily: "Manrope, sans-serif", fontSize: "14px", fontWeight: 300 }}>
                    {c.whatsapp.body}
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-dark inline-flex items-center gap-3"
                    data-testid="whatsapp-btn"
                  >
                    <MessageCircle size={14} />
                    {c.whatsapp.button}
                  </a>
                </div>

                {/* Info items */}
                <div className="space-y-6 border-t pt-8" style={{ borderColor: "rgba(18,18,18,0.1)" }}>
                  <p className="ct-overline text-sage mb-5">{c.info.headline}</p>
                  {[
                    { icon: <MapPin size={14} />, text: c.info.location },
                    { icon: <Languages size={14} />, text: c.info.languages },
                    { icon: <Clock size={14} />, text: c.info.response },
                  ].map((item, i) => (
                    <div key={i} className="flex gap-3 items-start">
                      <span className="text-gold/60 mt-0.5">{item.icon}</span>
                      <p className="text-charcoal/55" style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300 }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
