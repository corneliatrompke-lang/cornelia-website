import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Check } from "lucide-react";
import { useContactForm } from "../context/ContactFormContext";
import { BACKEND_URL } from "../lib/config";

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

const retreatLabel = (r) => {
  if (!r) return "";
  const title = r.title || r.location || "";
  return r.date ? `${title} — ${r.date}` : title;
};

const SuccessView = ({ name, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.97 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.45, ease: "easeOut" }}
    style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "48px 40px", textAlign: "center" }}
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
      Your application has been received. I will be in touch within 48 hours.
    </p>
    <button
      onClick={onClose}
      style={{ marginTop: "40px", fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(200,169,106,0.55)", background: "none", border: "none", cursor: "pointer" }}
      data-testid="application-success-close"
    >
      Close
    </button>
  </motion.div>
);

export const RetreatApplicationForm = ({ onClose }) => {
  const { selectedRetreat, availableRetreats } = useContactForm();

  const [form, setForm] = useState({
    name: "", email: "", countryCode: "+49", phone: "",
    retreatIndex: 0, notes: "", agreeTC: false,
  });
  const [errors, setErrors]     = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  // Pre-select the retreat that was clicked
  useEffect(() => {
    if (!selectedRetreat || availableRetreats.length === 0) return;
    const idx = availableRetreats.findIndex(r =>
      (r.id && r.id === selectedRetreat.id) ||
      (r.date === selectedRetreat.date && r.location === selectedRetreat.location)
    );
    setForm(p => ({ ...p, retreatIndex: idx >= 0 ? idx : 0 }));
  }, [selectedRetreat, availableRetreats]);

  const currentRetreat = availableRetreats[form.retreatIndex] || selectedRetreat;

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
    const r = currentRetreat;
    const payload = {
      name:             form.name,
      email:            form.email,
      phone:            form.countryCode + form.phone,
      services:         ["executive-retreats"],
      notes:            form.notes,
      send_from:        "Executive Retreat — Application Form",
      retreat_id:       r?.id || `${r?.date}-${r?.location}`,
      retreat_title:    r?.title || r?.location || "",
      retreat_date:     r?.date || "",
      retreat_location: r?.location || "",
    };
    try {
      const res = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Server error");
    } catch (err) {
      console.error("Application submission error:", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  const field = (hasErr) => ({ ...INPUT, borderColor: hasErr ? "rgba(210,80,80,0.55)" : "rgba(200,169,106,0.22)" });

  if (submitted) return <SuccessView name={form.name} onClose={onClose} />;

  return (
    <div style={{ padding: "32px 32px 28px", scrollbarWidth: "none" }}>
      <style>{`
        .ct-app-input:focus { border-color: rgba(200,169,106,0.55) !important; }
        .ct-app-input::placeholder { color: rgba(245,242,236,0.25); }
        select.ct-app-input option { background: #0F1A12; color: #F5F2EC; }
        textarea.ct-app-input { resize: none; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
        <div>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(200,169,106,0.6)", marginBottom: "6px" }}>
            Executive Retreats
          </p>
          <h3 style={{ fontFamily: "Figtree, sans-serif", fontSize: "22px", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.15 }}>
            Apply for a Retreat
          </h3>
        </div>
        <button
          onClick={onClose}
          data-testid="application-form-close"
          style={{ background: "rgba(245,242,236,0.07)", border: "1px solid rgba(245,242,236,0.12)", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginTop: "2px" }}
        >
          <X size={13} color="rgba(245,242,236,0.55)" />
        </button>
      </div>

      {/* Hairline divider */}
      <div style={{ height: "1px", background: "rgba(200,169,106,0.15)", margin: "18px 0 22px" }} />

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

        {/* Name */}
        <div>
          <label style={LABEL}>Name <span style={{ color: "rgba(200,169,106,0.5)" }}>*</span></label>
          <input
            className="ct-app-input"
            type="text"
            placeholder="Your full name"
            value={form.name}
            onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setErrors(p => ({ ...p, name: false })); }}
            style={field(errors.name)}
            data-testid="application-name"
          />
        </div>

        {/* Email */}
        <div>
          <label style={LABEL}>Email <span style={{ color: "rgba(200,169,106,0.5)" }}>*</span></label>
          <input
            className="ct-app-input"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: false })); }}
            style={field(errors.email)}
            data-testid="application-email"
          />
        </div>

        {/* Phone */}
        <div>
          <label style={LABEL}>Phone <span style={{ color: "rgba(245,242,236,0.25)", fontWeight: 300, textTransform: "none", letterSpacing: 0 }}>(optional)</span></label>
          <div style={{ display: "flex", gap: "8px" }}>
            <select
              className="ct-app-input"
              value={form.countryCode}
              onChange={e => setForm(p => ({ ...p, countryCode: e.target.value }))}
              style={{ ...INPUT, width: "auto", flexShrink: 0, cursor: "pointer", paddingRight: "10px" }}
              data-testid="application-country-code"
            >
              {COUNTRY_CODES.map(c => (
                <option key={c.code} value={c.code}>{c.code} {c.country}</option>
              ))}
            </select>
            <input
              className="ct-app-input"
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
              style={{ ...INPUT, flex: 1 }}
              data-testid="application-phone"
            />
          </div>
        </div>

        {/* Retreat selector */}
        <div>
          <label style={LABEL}>Retreat <span style={{ color: "rgba(200,169,106,0.5)" }}>*</span></label>
          <select
            className="ct-app-input"
            value={form.retreatIndex}
            onChange={e => setForm(p => ({ ...p, retreatIndex: Number(e.target.value) }))}
            style={{ ...INPUT, cursor: "pointer", appearance: "none", WebkitAppearance: "none" }}
            data-testid="application-retreat-select"
          >
            {availableRetreats.map((r, i) => (
              <option key={i} value={i}>{retreatLabel(r)}</option>
            ))}
            {availableRetreats.length === 0 && selectedRetreat && (
              <option value={0}>{retreatLabel(selectedRetreat)}</option>
            )}
          </select>
        </div>

        {/* Notes */}
        <div>
          <label style={LABEL}>
            Message{" "}
            <span style={{ color: "rgba(245,242,236,0.3)", fontWeight: 300, textTransform: "none", letterSpacing: 0, fontSize: "9px" }}>(optional)</span>
          </label>
          <textarea
            className="ct-app-input"
            rows={3}
            placeholder="Tell me a little about yourself and what draws you to this retreat..."
            value={form.notes}
            onChange={e => setForm(p => ({ ...p, notes: e.target.value }))}
            style={{ ...INPUT, lineHeight: 1.65 }}
            data-testid="application-notes"
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
            data-testid="application-agree-tc"
          >
            {form.agreeTC && <Check size={9} color="#C8A96A" />}
          </div>
          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 300, color: "rgba(245,242,236,0.42)", lineHeight: 1.65 }}>
            I agree to the{" "}
            <a href="/terms" style={{ color: "rgba(200,169,106,0.65)", textDecoration: "none", borderBottom: "1px solid rgba(200,169,106,0.28)" }}>
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
          }}
          data-testid="application-submit"
        >
          {submitting ? "Sending..." : "Submit Application"}
          {!submitting && <ArrowRight size={12} />}
        </motion.button>

      </form>
    </div>
  );
};

export default RetreatApplicationForm;
