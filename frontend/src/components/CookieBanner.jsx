import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCookieConsent } from "../context/CookieConsentContext";
import { useLanguage } from "../context/LanguageContext";

export const CookieBanner = () => {
  const { bannerVisible, acceptAll, rejectAll, openSettings } = useCookieConsent();
  const { language } = useLanguage();
  const isDE = language === "de";

  const copy = {
    text: isDE
      ? "Diese Website verwendet Cookies, um Ihnen die bestmögliche Erfahrung zu bieten. Notwendige Cookies sind immer aktiv. Weitere Cookies helfen uns, die Website zu verbessern."
      : "This website uses cookies to give you the best experience. Essential cookies are always active. Additional cookies help us improve the website.",
    manage:    isDE ? "Einstellungen"  : "Manage Preferences",
    reject:    isDE ? "Alle ablehnen"  : "Reject All",
    accept:    isDE ? "Alle akzeptieren" : "Accept All",
    learnMore: isDE ? "Datenschutzerklärung lesen"  : "Read our Privacy Policy",
  };

  return (
    <AnimatePresence>
      {bannerVisible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "max(16px, calc((100vw - 1400px) / 2))",
            width: "min(460px, calc(100vw - 32px))",
            zIndex: 1200,
            background: "rgba(8, 16, 11, 0.97)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            border: "1px solid rgba(200,169,106,0.22)",
            borderRadius: "14px",
            padding: "22px 26px",
            boxShadow: "0 8px 40px rgba(0,0,0,0.45)",
          }}
          data-testid="cookie-banner"
        >
          {/* Corner accents */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "28px", height: "1px", background: "rgba(200,169,106,0.4)" }} />
          <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "28px", background: "rgba(200,169,106,0.4)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "28px", height: "1px", background: "rgba(200,169,106,0.4)" }} />
          <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "28px", background: "rgba(200,169,106,0.4)" }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {/* Top row — text */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "14px" }}>
              {/* Cookie icon */}
              <span style={{ fontSize: "18px", lineHeight: 1, flexShrink: 0, marginTop: "1px", opacity: 0.7 }}>🍪</span>
              <div>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(200,169,106,0.65)", marginBottom: "5px" }}>
                  {isDE ? "Cookie-Einstellungen" : "Cookie Preferences"}
                </p>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(245,242,236,0.55)", lineHeight: 1.7, margin: 0 }}>
                  {copy.text}{" "}
                  <a
                    href="/privacy"
                    style={{ color: "rgba(200,169,106,0.6)", textDecoration: "none", borderBottom: "1px solid rgba(200,169,106,0.25)" }}
                    data-testid="cookie-banner-learn-more"
                  >
                    {copy.learnMore}
                  </a>
                </p>
              </div>
            </div>

            {/* Bottom row — actions */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "8px", flexWrap: "wrap" }}>
              {/* Manage */}
              <button
                onClick={openSettings}
                data-testid="cookie-manage-btn"
                style={{
                  fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 500,
                  letterSpacing: "1.5px", textTransform: "uppercase",
                  color: "rgba(245,242,236,0.45)", background: "none", border: "none",
                  cursor: "pointer", padding: "2px 0", textDecoration: "underline",
                  textDecorationColor: "rgba(245,242,236,0.15)",
                }}
              >
                {copy.manage}
              </button>

              {/* Reject All */}
              <button
                onClick={rejectAll}
                data-testid="cookie-reject-btn"
                style={{
                  fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600,
                  letterSpacing: "1.8px", textTransform: "uppercase",
                  color: "rgba(245,242,236,0.65)",
                  background: "rgba(245,242,236,0.06)",
                  border: "1px solid rgba(245,242,236,0.15)",
                  borderRadius: "5px", padding: "10px 18px", cursor: "pointer",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => { e.target.style.background = "rgba(245,242,236,0.1)"; e.target.style.borderColor = "rgba(245,242,236,0.25)"; }}
                onMouseLeave={e => { e.target.style.background = "rgba(245,242,236,0.06)"; e.target.style.borderColor = "rgba(245,242,236,0.15)"; }}
              >
                {copy.reject}
              </button>

              {/* Accept All */}
              <button
                onClick={acceptAll}
                data-testid="cookie-accept-btn"
                style={{
                  fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600,
                  letterSpacing: "1.8px", textTransform: "uppercase",
                  color: "#C8A96A",
                  background: "rgba(200,169,106,0.1)",
                  border: "1px solid rgba(200,169,106,0.35)",
                  borderRadius: "5px", padding: "10px 18px", cursor: "pointer",
                  transition: "background 0.2s, border-color 0.2s",
                }}
                onMouseEnter={e => { e.target.style.background = "rgba(200,169,106,0.18)"; e.target.style.borderColor = "rgba(200,169,106,0.55)"; }}
                onMouseLeave={e => { e.target.style.background = "rgba(200,169,106,0.1)"; e.target.style.borderColor = "rgba(200,169,106,0.35)"; }}
              >
                {copy.accept}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
