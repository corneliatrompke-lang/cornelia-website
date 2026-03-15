import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";

const COUNTRY_CODES = [
  { code: "+49", country: "DE" },
  { code: "+1",  country: "US/CA" },
  { code: "+44", country: "GB" },
  { code: "+41", country: "CH" },
  { code: "+43", country: "AT" },
  { code: "+33", country: "FR" },
  { code: "+31", country: "NL" },
  { code: "+32", country: "BE" },
  { code: "+46", country: "SE" },
  { code: "+47", country: "NO" },
  { code: "+45", country: "DK" },
  { code: "+34", country: "ES" },
  { code: "+39", country: "IT" },
  { code: "+81", country: "JP" },
  { code: "+65", country: "SG" },
  { code: "+971", country: "AE" },
  { code: "+61", country: "AU" },
  { code: "+55", country: "BR" },
  { code: "+91", country: "IN" },
];

const SERVICES = [
  { id: "executive-coaching",  label: "Executive Coaching & Advisory" },
  { id: "executive-retreats",  label: "Executive Retreats" },
  { id: "team-facilitation",   label: "Leadership Team Facilitation" },
  { id: "org-advisory",        label: "Organizational Advisory" },
];

const LABEL = {
  fontFamily: "Manrope, sans-serif",
  fontSize: "9px",
  fontWeight: 600,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "rgba(200,169,106,0.7)",
  display: "block",
  marginBottom: "7px",
};

const INPUT = {
  width: "100%",
  background: "rgba(245,242,236,0.06)",
  border: "1px solid rgba(200,169,106,0.22)",
  borderRadius: "6px",
  padding: "11px 14px",
  fontFamily: "Manrope, sans-serif",
  fontSize: "13px",
  fontWeight: 300,
  color: "#F5F2EC",
  outline: "none",
  transition: "border-color 0.25s ease",
};

// ─── Success Screen ────────────────────────────────────────────────────────────
const SuccessView = ({ name, onClose, noPadding }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: noPadding ? "24px 0" : "48px 40px", textAlign: "center" }}
  >
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.2, type: "spring", stiffness: 240, damping: 18 }}
      style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(200,169,106,0.1)", border: "1px solid rgba(200,169,106,0.35)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "28px" }}
    >
      <Check size={22} color="#C8A96A" />
    </motion.div>
    <h3 style={{ fontFamily: "Figtree, sans-serif", fontSize: "24px", fontWeight: 400, color: "#F5F2EC", marginBottom: "14px", lineHeight: 1.2 }}>
      Thank you, {name.split(" ")[0]}.
    </h3>
    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,242,236,0.5)", lineHeight: 1.75, maxWidth: "280px" }}>
      I will be in touch within 48 hours to arrange a first conversation.
    </p>
    <button
      onClick={onClose}
      style={{ marginTop: "40px", fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(200,169,106,0.55)", background: "none", border: "none", cursor: "pointer", transition: "color 0.2s" }}
      data-testid="contact-success-close"
    >
      Close
    </button>
  </motion.div>
);

// ─── Main Form Component ───────────────────────────────────────────────────────
export const HeroContactForm = ({ onClose, noPadding = false }) => {
  const [form, setForm] = useState({
    name: "", email: "", countryCode: "+49", phone: "", services: [], notes: "", agreeTC: false,
  });
  const [servicesOpen, setServicesOpen] = useState(false);
  const [submitted, setSubmitted]       = useState(false);
  const [errors, setErrors]             = useState({});
  const [submitting, setSubmitting]     = useState(false);
  const ddRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ddRef.current && !ddRef.current.contains(e.target)) setServicesOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleService = (id) =>
    setForm(p => ({ ...p, services: p.services.includes(id) ? p.services.filter(s => s !== id) : [...p.services, id] }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = true;
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = true;
    if (!form.agreeTC) e.agreeTC = true;
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    // TODO: POST to /api/contact when backend is ready
    await new Promise(r => setTimeout(r, 800));
    setSubmitting(false);
    setSubmitted(true);
  };

  const field = (hasErr) => ({ ...INPUT, borderColor: hasErr ? "rgba(210,80,80,0.55)" : "rgba(200,169,106,0.22)" });

  if (submitted) return <SuccessView name={form.name} onClose={onClose} noPadding={noPadding} />;

  return (
    <div style={{ padding: noPadding ? "0" : "32px 32px 28px", scrollbarWidth: "none" }}>
      <style>{`
        .ct-form-scroll::-webkit-scrollbar { display: none; }
        .ct-input:focus { border-color: rgba(200,169,106,0.55) !important; }
        .ct-input::placeholder { color: rgba(245,242,236,0.25); }
        select.ct-input option { background: #0F1A12; color: #F5F2EC; }
        textarea.ct-input { resize: none; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px" }}>
        <h3 style={{ fontFamily: "Figtree, sans-serif", fontSize: "22px", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.15 }}>
          Start a Conversation
        </h3>
        <button
          onClick={onClose}
          data-testid="contact-form-close"
          style={{ background: "rgba(245,242,236,0.07)", border: "1px solid rgba(245,242,236,0.12)", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginTop: "2px", transition: "background 0.2s" }}
        >
          <X size={13} color="rgba(245,242,236,0.55)" />
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        {/* Name */}
        <div>
          <label style={LABEL}>Name <span style={{ color: "rgba(200,169,106,0.5)" }}>*</span></label>
          <input
            className="ct-input"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: false })); }}
            style={field(errors.name)}
            data-testid="contact-name"
          />
        </div>

        {/* Email */}
        <div>
          <label style={LABEL}>Email <span style={{ color: "rgba(200,169,106,0.5)" }}>*</span></label>
          <input
            className="ct-input"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: false })); }}
            style={field(errors.email)}
            data-testid="contact-email"
          />
        </div>

        {/* Phone */}
        <div>
          <label style={LABEL}>Phone <span style={{ color: "rgba(245,242,236,0.25)", fontWeight: 300, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
          <div style={{ display: "flex", gap: "8px" }}>
            <select
              className="ct-input"
              value={form.countryCode}
              onChange={e => setForm(p => ({ ...p, countryCode: e.target.value }))}
              style={{ ...INPUT, width: "auto", flexShrink: 0, cursor: "pointer", paddingRight: "10px" }}
              data-testid="contact-country-code"
            >
              {COUNTRY_CODES.map(c => (
                <option key={c.code} value={c.code}>{c.code} {c.country}</option>
              ))}
            </select>
            <input
              className="ct-input"
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              style={{ ...INPUT, flex: 1 }}
              data-testid="contact-phone"
            />
          </div>
        </div>

        {/* Services Multi-select */}
        <div ref={ddRef} style={{ position: "relative" }}>
          <label style={LABEL}>Service of Interest</label>
          <button
            type="button"
            onClick={() => setServicesOpen(v => !v)}
            style={{ ...INPUT, textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
            data-testid="contact-services-toggle"
          >
            <span style={{ color: form.services.length === 0 ? "rgba(245,242,236,0.25)" : "#F5F2EC", fontSize: "13px", fontFamily: "Manrope, sans-serif", fontWeight: 300 }}>
              {form.services.length === 0
                ? "Select service(s)..."
                : form.services.length === 1
                ? SERVICES.find(s => s.id === form.services[0])?.label
                : `${form.services.length} services selected`}
            </span>
            <motion.span animate={{ rotate: servicesOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path d="M1 1L5 5L9 1" stroke="rgba(200,169,106,0.6)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.span>
          </button>

          <AnimatePresence>
            {servicesOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                style={{
                  position: "absolute",
                  top: "calc(100% + 4px)",
                  left: 0,
                  right: 0,
                  background: "rgba(8,15,10,0.97)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(200,169,106,0.22)",
                  borderRadius: "6px",
                  overflow: "hidden",
                  zIndex: 60,
                }}
              >
                {SERVICES.map((svc, i) => {
                  const selected = form.services.includes(svc.id);
                  return (
                    <div
                      key={svc.id}
                      onClick={() => toggleService(svc.id)}
                      style={{
                        padding: "12px 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        cursor: "pointer",
                        borderTop: i > 0 ? "1px solid rgba(245,242,236,0.06)" : "none",
                        background: selected ? "rgba(200,169,106,0.07)" : "transparent",
                        transition: "background 0.15s ease",
                      }}
                      data-testid={`service-option-${svc.id}`}
                    >
                      <div style={{
                        width: "15px", height: "15px", borderRadius: "3px", flexShrink: 0,
                        border: selected ? "1px solid rgba(200,169,106,0.65)" : "1px solid rgba(245,242,236,0.25)",
                        background: selected ? "rgba(200,169,106,0.18)" : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all 0.15s ease",
                      }}>
                        {selected && <Check size={9} color="#C8A96A" />}
                      </div>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 300, color: selected ? "#F5F2EC" : "rgba(245,242,236,0.55)" }}>
                        {svc.label}
                      </span>
                    </div>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notes */}
        <div>
          <label style={LABEL}>
            Notes{" "}
            <span style={{ color: "rgba(245,242,236,0.3)", fontWeight: 300, textTransform: "none", letterSpacing: 0, fontSize: "9px" }}>(optional)</span>
          </label>
          <textarea
            className="ct-input"
            rows={3}
            placeholder="Briefly describe your current situation or what brings you here..."
            value={form.notes}
            onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
            style={{ ...INPUT, lineHeight: 1.65 }}
            data-testid="contact-notes"
          />
        </div>

        {/* T&C Checkbox */}
        <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
          <div
            onClick={() => { setForm(p => ({ ...p, agreeTC: !p.agreeTC })); setErrors(p => ({ ...p, agreeTC: false })); }}
            style={{
              width: "16px", height: "16px", borderRadius: "3px", flexShrink: 0, marginTop: "1px",
              border: errors.agreeTC ? "1px solid rgba(210,80,80,0.55)" : form.agreeTC ? "1px solid rgba(200,169,106,0.65)" : "1px solid rgba(245,242,236,0.28)",
              background: form.agreeTC ? "rgba(200,169,106,0.18)" : "transparent",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", transition: "all 0.18s ease",
            }}
            data-testid="contact-agree-tc"
          >
            {form.agreeTC && <Check size={9} color="#C8A96A" />}
          </div>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 300, color: "rgba(245,242,236,0.42)", lineHeight: 1.65 }}>
            I agree to the{" "}
            <a href="/legal" style={{ color: "rgba(200,169,106,0.65)", textDecoration: "none", borderBottom: "1px solid rgba(200,169,106,0.28)" }}>
              Terms & Privacy Policy
            </a>
          </p>
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={submitting}
          whileHover={{ background: "rgba(200,169,106,0.18)" }}
          style={{
            width: "100%",
            marginTop: "6px",
            padding: "13px 24px",
            background: "rgba(200,169,106,0.1)",
            border: "1px solid rgba(200,169,106,0.42)",
            borderRadius: "6px",
            fontFamily: "Manrope, sans-serif",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            color: submitting ? "rgba(200,169,106,0.4)" : "#C8A96A",
            cursor: submitting ? "wait" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            transition: "color 0.2s",
          }}
          data-testid="contact-submit"
        >
          {submitting ? "Sending..." : "Send Enquiry"}
          {!submitting && <ArrowRight size={12} />}
        </motion.button>

      </form>
    </div>
  );
};

export default HeroContactForm;
