import React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const LOGO_MARK =
  "https://customer-assets.emergentagent.com/job_c6a96dcc-a529-4678-b4e5-76313235aa2d/artifacts/kv7m20gz_Cornelia%20Trompke%20Logo%20Mark.png";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer
      className="bg-charcoal border-t"
      style={{ borderColor: "rgba(200,169,106,0.1)" }}
      data-testid="footer"
    >
      {/* Main footer */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-6 no-underline">
              <img
                src={LOGO_MARK}
                alt="CT"
                style={{ width: 42, height: 42, objectFit: "contain", mixBlendMode: "lighten" }}
              />
              <div>
                <div
                  className="text-ivory leading-none"
                  style={{ fontFamily: "Playfair Display, serif", fontSize: "16px" }}
                >
                  Cornelia Trompke
                </div>
                <div className="ct-overline text-stone/40 mt-1">Consulting & Coaching</div>
              </div>
            </Link>
            <p
              className="text-stone/50 text-sm font-light leading-relaxed max-w-xs"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              {t.footer.tagline}
            </p>
            <p className="ct-overline text-stone/30 mt-6">{t.footer.location}</p>
          </div>

          {/* Navigation */}
          <div className="md:col-span-3">
            <p className="ct-overline text-gold/60 mb-5">{t.footer.navigation}</p>
            <ul className="space-y-3">
              {[
                { to: "/", label: t.nav.home },
                { to: "/about", label: t.nav.about },
                { to: "/method", label: t.nav.method },
                { to: "/work-with-me", label: t.nav.workWithMe },
                { to: "/contact", label: t.nav.contact },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-stone/50 hover:text-stone/80 transition-colors no-underline text-sm"
                    style={{ fontFamily: "Manrope, sans-serif", fontWeight: 300 }}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="md:col-span-4">
            <p className="ct-overline text-gold/60 mb-5">{t.footer.services}</p>
            <ul className="space-y-3">
              {t.nav.workWithMeLinks.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-stone/50 hover:text-stone/80 transition-colors no-underline text-sm"
                    style={{ fontFamily: "Manrope, sans-serif", fontWeight: 300 }}
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
      <div
        className="border-t"
        style={{ borderColor: "rgba(200,169,106,0.06)" }}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p
            className="text-stone/30 text-xs"
            style={{ fontFamily: "Manrope, sans-serif" }}
          >
            {t.footer.rights}
          </p>
          <div className="flex gap-6">
            {[
              { to: "/legal?tab=impressum", label: t.legal.nav.impressum },
              { to: "/legal?tab=privacy", label: t.legal.nav.privacy },
              { to: "/legal?tab=terms", label: t.legal.nav.terms },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="text-stone/30 hover:text-stone/60 transition-colors no-underline"
                style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", letterSpacing: "0.08em" }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
