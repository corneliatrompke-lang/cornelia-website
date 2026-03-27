import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useCookieConsent } from "../context/CookieConsentContext";

const LOGO_DARK =
  "/images/logo-vertical.png";

const Footer = () => {
  const { t, language } = useLanguage();
  const { openSettings } = useCookieConsent();
  const isDE = language === "de";
  const [isNarrow, setIsNarrow] = useState(typeof window !== "undefined" ? window.innerWidth < 1024 : false);
  useEffect(() => {
    const h = () => setIsNarrow(window.innerWidth < 1024);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <footer
      className={isNarrow ? "" : "border-t"}
      style={{ background: "#F5F2EC", borderColor: "rgba(18,18,18,0.08)" }}
      data-testid="footer"
    >
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-8">

          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="inline-block mb-8 no-underline" data-testid="footer-logo">
              <img
                src={LOGO_DARK}
                alt="Cornelia Trompke Consulting & Coaching"
                style={{
                  height: "44px",
                  width: "auto",
                  objectFit: "contain",
                  display: "block",
                }}
              />
            </Link>
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "14px",
                fontWeight: 300,
                color: "rgba(18,18,18,0.52)",
                lineHeight: 1.8,
                maxWidth: "280px",
              }}
            >
              {t.footer.tagline}
            </p>
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(18,18,18,0.32)",
                marginTop: "20px",
              }}
            >
              {t.footer.location}
            </p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(200,169,106,0.85)",
                marginBottom: "20px",
              }}
            >
              {t.footer.navigation}
            </p>
            <ul className="space-y-3">
              {[
                { to: "/", label: t.nav.home },
                { to: "/about-me", label: t.nav.about },
                { to: "/how-i-work", label: t.nav.method },
                { to: "/work-with-me", label: t.nav.workWithMe },
                { to: "/contact", label: t.nav.contact },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="no-underline transition-colors"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "rgba(18,18,18,0.5)",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "rgba(18,18,18,0.85)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(18,18,18,0.5)")}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-4">
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "10px",
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(200,169,106,0.85)",
                marginBottom: "20px",
              }}
            >
              {t.footer.services}
            </p>
            <ul className="space-y-3">
              {t.nav.workWithMeLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="no-underline transition-colors"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "13px",
                      fontWeight: 300,
                      color: "rgba(18,18,18,0.5)",
                    }}
                    onMouseEnter={(e) => (e.target.style.color = "rgba(18,18,18,0.85)")}
                    onMouseLeave={(e) => (e.target.style.color = "rgba(18,18,18,0.5)")}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Legal bar */}
      <div className="border-t" style={{ borderColor: "rgba(18,18,18,0.06)" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "11px",
              color: "rgba(18,18,18,0.32)",
            }}
          >
            {t.footer.rights}
          </p>
          <div className="flex gap-6">
            {[
              { to: "/impressum", label: t.legal.nav.impressum },
              { to: "/privacy", label: t.legal.nav.privacy },
              { to: "/terms", label: t.legal.nav.terms },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="no-underline transition-colors"
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.08em",
                  color: "rgba(18,18,18,0.35)",
                }}
                onMouseEnter={(e) => (e.target.style.color = "rgba(18,18,18,0.65)")}
                onMouseLeave={(e) => (e.target.style.color = "rgba(18,18,18,0.35)")}
              >
                {item.label}
              </Link>
            ))}
            {/* Cookie settings — always accessible for GDPR compliance */}
            <button
              onClick={openSettings}
              data-testid="footer-cookie-settings"
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.08em",
                color: "rgba(18,18,18,0.35)",
                background: "none",
                border: "none",
                padding: 0,
                cursor: "pointer",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.target.style.color = "rgba(18,18,18,0.65)")}
              onMouseLeave={(e) => (e.target.style.color = "rgba(18,18,18,0.35)")}
            >
              {isDE ? "Cookie-Einstellungen" : "Cookie Settings"}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
