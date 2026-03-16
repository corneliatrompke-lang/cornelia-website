import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import { useCookieConsent } from "../context/CookieConsentContext";
import { useLanguage } from "../context/LanguageContext";

const Toggle = ({ enabled, locked, onChange, testId }) => (
  <button
    onClick={() => !locked && onChange(!enabled)}
    disabled={locked}
    data-testid={testId}
    style={{
      width: "42px", height: "24px", borderRadius: "12px", flexShrink: 0,
      background: enabled ? "rgba(200,169,106,0.75)" : "rgba(245,242,236,0.12)",
      border: enabled ? "1px solid rgba(200,169,106,0.5)" : "1px solid rgba(245,242,236,0.18)",
      cursor: locked ? "not-allowed" : "pointer",
      position: "relative", transition: "background 0.25s ease, border-color 0.25s ease",
      opacity: locked ? 0.55 : 1,
    }}
    aria-pressed={enabled}
  >
    <span style={{
      position: "absolute", top: "3px",
      left: enabled ? "20px" : "3px",
      width: "16px", height: "16px", borderRadius: "50%",
      background: enabled ? "#C8A96A" : "rgba(245,242,236,0.45)",
      transition: "left 0.22s ease",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      {enabled && locked && <Check size={8} color="#0F1A12" />}
    </span>
  </button>
);

export const CookieSettingsModal = () => {
  const { consent, settingsOpen, closeSettings, saveCustom, acceptAll, rejectAll } = useCookieConsent();
  const { language } = useLanguage();
  const isDE = language === "de";

  const [local, setLocal] = useState({
    analytics: consent.analytics,
    marketing: consent.marketing,
  });

  useEffect(() => {
    if (settingsOpen) setLocal({ analytics: consent.analytics, marketing: consent.marketing });
  }, [settingsOpen, consent]);

  const categories = [
    {
      key: "essential",
      locked: true,
      enabled: true,
      title:   isDE ? "Notwendige Cookies"           : "Strictly Necessary",
      desc:    isDE
        ? "Unverzichtbar für den Betrieb der Website. Können nicht deaktiviert werden."
        : "Required for the website to function. These cannot be disabled.",
      testId: "cookie-toggle-essential",
    },
    {
      key: "analytics",
      locked: false,
      enabled: local.analytics,
      title:   isDE ? "Analyse & Performance"         : "Analytics & Performance",
      desc:    isDE
        ? "Helfen uns zu verstehen, wie Besucher die Website nutzen, damit wir sie verbessern können."
        : "Help us understand how visitors use the website so we can improve it.",
      testId: "cookie-toggle-analytics",
    },
    {
      key: "marketing",
      locked: false,
      enabled: local.marketing,
      title:   isDE ? "Marketing & Targeting"         : "Marketing & Targeting",
      desc:    isDE
        ? "Ermöglichen personalisierte Inhalte und relevante Werbung auf anderen Plattformen."
        : "Enable personalised content and relevant advertising on other platforms.",
      testId: "cookie-toggle-marketing",
    },
  ];

  const copy = {
    title:     isDE ? "Cookie-Einstellungen"           : "Cookie Settings",
    subtitle:  isDE
      ? "Wählen Sie, welche Cookies Sie akzeptieren möchten. Ihre Präferenzen werden gespeichert."
      : "Choose which cookies you want to accept. Your preferences are saved.",
    save:      isDE ? "Einstellungen speichern"        : "Save Preferences",
    rejectAll: isDE ? "Alle ablehnen"                  : "Reject All",
    acceptAll: isDE ? "Alle akzeptieren"               : "Accept All",
    always:    isDE ? "Immer aktiv"                    : "Always active",
  };

  return (
    <AnimatePresence>
      {settingsOpen && (
        <motion.div
          key="cookie-settings-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closeSettings}
          style={{
            position: "fixed", inset: 0, zIndex: 1300,
            background: "rgba(5,10,7,0.75)",
            backdropFilter: "blur(6px)",
            WebkitBackdropFilter: "blur(6px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "24px",
          }}
          data-testid="cookie-settings-backdrop"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 18 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: "clamp(340px, 90vw, 540px)",
              maxHeight: "calc(100vh - 48px)",
              overflowY: "auto",
              background: "rgba(8, 16, 11, 0.97)",
              backdropFilter: "blur(32px) saturate(1.5)",
              WebkitBackdropFilter: "blur(32px) saturate(1.5)",
              border: "1px solid rgba(200,169,106,0.22)",
              borderRadius: "20px",
              scrollbarWidth: "none",
              position: "relative",
            }}
            data-testid="cookie-settings-modal"
          >
            {/* Corner accents */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "32px", height: "1px", background: "rgba(200,169,106,0.4)", zIndex: 1 }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "32px", background: "rgba(200,169,106,0.4)", zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "32px", height: "1px", background: "rgba(200,169,106,0.4)", zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "32px", background: "rgba(200,169,106,0.4)", zIndex: 1 }} />

            <div style={{ padding: "28px 28px 24px" }}>

              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                <div>
                  <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(200,169,106,0.6)", marginBottom: "6px" }}>
                    GDPR / DSGVO
                  </p>
                  <h3 style={{ fontFamily: "Figtree, sans-serif", fontSize: "22px", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.15, margin: 0 }}>
                    {copy.title}
                  </h3>
                </div>
                <button
                  onClick={closeSettings}
                  data-testid="cookie-settings-close"
                  style={{ background: "rgba(245,242,236,0.07)", border: "1px solid rgba(245,242,236,0.12)", borderRadius: "50%", width: "32px", height: "32px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, marginTop: "2px" }}
                >
                  <X size={13} color="rgba(245,242,236,0.55)" />
                </button>
              </div>

              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(245,242,236,0.38)", lineHeight: 1.7, margin: "10px 0 0" }}>
                {copy.subtitle}
              </p>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(200,169,106,0.12)", margin: "20px 0" }} />

              {/* Categories */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {categories.map((cat, idx) => (
                  <div
                    key={cat.key}
                    style={{
                      padding: "16px 0",
                      borderBottom: idx < categories.length - 1 ? "1px solid rgba(245,242,236,0.06)" : "none",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", marginBottom: "6px" }}>
                      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 600, color: "rgba(245,242,236,0.8)", margin: 0 }}>
                        {cat.title}
                      </p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexShrink: 0 }}>
                        {cat.locked && (
                          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "8px", fontWeight: 600, letterSpacing: "1.5px", textTransform: "uppercase", color: "rgba(200,169,106,0.5)" }}>
                            {copy.always}
                          </span>
                        )}
                        <Toggle
                          enabled={cat.enabled}
                          locked={cat.locked}
                          onChange={(val) => setLocal(p => ({ ...p, [cat.key]: val }))}
                          testId={cat.testId}
                        />
                      </div>
                    </div>
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", fontWeight: 300, color: "rgba(245,242,236,0.32)", lineHeight: 1.65, margin: 0 }}>
                      {cat.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: "1px", background: "rgba(200,169,106,0.12)", margin: "20px 0 18px" }} />

              {/* Action buttons */}
              <div style={{ display: "flex", gap: "10px" }}>
                {/* Reject All */}
                <button
                  onClick={rejectAll}
                  data-testid="cookie-settings-reject-btn"
                  style={{
                    flex: 1, fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600,
                    letterSpacing: "1.8px", textTransform: "uppercase",
                    color: "rgba(245,242,236,0.55)",
                    background: "rgba(245,242,236,0.05)",
                    border: "1px solid rgba(245,242,236,0.12)",
                    borderRadius: "5px", padding: "11px 12px", cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = "rgba(245,242,236,0.09)"}
                  onMouseLeave={e => e.target.style.background = "rgba(245,242,236,0.05)"}
                >
                  {copy.rejectAll}
                </button>

                {/* Save custom */}
                <button
                  onClick={() => saveCustom(local)}
                  data-testid="cookie-settings-save-btn"
                  style={{
                    flex: 1, fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600,
                    letterSpacing: "1.8px", textTransform: "uppercase",
                    color: "rgba(245,242,236,0.65)",
                    background: "rgba(245,242,236,0.07)",
                    border: "1px solid rgba(245,242,236,0.18)",
                    borderRadius: "5px", padding: "11px 12px", cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = "rgba(245,242,236,0.11)"}
                  onMouseLeave={e => e.target.style.background = "rgba(245,242,236,0.07)"}
                >
                  {copy.save}
                </button>

                {/* Accept All */}
                <button
                  onClick={acceptAll}
                  data-testid="cookie-settings-accept-btn"
                  style={{
                    flex: 1, fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600,
                    letterSpacing: "1.8px", textTransform: "uppercase",
                    color: "#C8A96A",
                    background: "rgba(200,169,106,0.1)",
                    border: "1px solid rgba(200,169,106,0.35)",
                    borderRadius: "5px", padding: "11px 12px", cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={e => e.target.style.background = "rgba(200,169,106,0.18)"}
                  onMouseLeave={e => e.target.style.background = "rgba(200,169,106,0.1)"}
                >
                  {copy.acceptAll}
                </button>
              </div>

              {/* Privacy link */}
              <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 300, color: "rgba(245,242,236,0.22)", textAlign: "center", marginTop: "14px" }}>
                {isDE ? "Weitere Informationen in unserer " : "For more information, see our "}
                <a href="/privacy" style={{ color: "rgba(200,169,106,0.5)", textDecoration: "none", borderBottom: "1px solid rgba(200,169,106,0.2)" }}>
                  {isDE ? "Datenschutzerklärung" : "Privacy Policy"}
                </a>
              </p>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieSettingsModal;
