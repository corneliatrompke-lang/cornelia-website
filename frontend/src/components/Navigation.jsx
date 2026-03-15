import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, Globe } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { useContactForm } from "../context/ContactFormContext";

const LOGO_NAV = "/ct-logo-nav.png";

const Navigation = () => {
  const { lang, setLang, t } = useLanguage();
  const { openForm } = useContactForm();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;
  const isServicesActive = location.pathname.startsWith("/work-with-me") ||
    ["/executive-coaching", "/executive-retreats", "/leadership-team-facilitation", "/organizational-advisory"].includes(location.pathname);

  // Derive human-readable page name for send_from tracking
  const getNavSendFrom = () => {
    const map = {
      "/": "Homepage",
      "/about-me": "About Me",
      "/about": "About Me",
      "/how-i-work": "How I Work",
      "/method": "How I Work",
      "/work-with-me": "Work With Me",
      "/executive-coaching": "Executive Coaching & Advisory",
      "/executive-retreats": "Executive Retreats",
      "/leadership-team-facilitation": "Leadership Team Facilitation",
      "/organizational-advisory": "Organizational Advisory",
      "/contact": "Contact",
    };
    return `Navigation CTA — ${map[location.pathname] || location.pathname}`;
  };

  return (
    <>
      <nav
        data-testid="navigation"
        className="fixed top-0 left-0 right-0 z-[900] transition-all duration-500"
        style={{
          padding: "16px 24px",
          background: scrolled ? "rgba(15,26,18,0.82)" : "transparent",
          backdropFilter: scrolled ? "blur(28px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div
          className="max-w-[1400px] mx-auto flex items-center justify-between relative"
          style={{ height: 48 }}
        >
          {/* ── LEFT: Logo ── */}
          <Link to="/" className="flex items-center no-underline flex-shrink-0" data-testid="nav-logo">
            <img
              src={LOGO_NAV}
              alt="Cornelia Trompke Consulting & Coaching"
              style={{ height: 38, width: "auto", objectFit: "contain" }}
            />
          </Link>

          {/* ── CENTER: Individual glassmorphic nav links (desktop) ── */}
          <div
            className="hidden lg:flex items-center gap-2 absolute left-1/2 -translate-x-1/2"
          >
            <Link to="/" className={`nav-pill-link ${isActive("/") ? "active" : ""}`} data-testid="nav-home">
              {t.nav.home}
            </Link>
            <Link to="/about-me" className={`nav-pill-link ${isActive("/about-me") ? "active" : ""}`} data-testid="nav-about">
              {t.nav.about}
            </Link>
            <Link to="/how-i-work" className={`nav-pill-link ${isActive("/how-i-work") ? "active" : ""}`} data-testid="nav-method">
              {t.nav.method}
            </Link>

            {/* Work With Me Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
              data-testid="nav-work-with-me"
            >
              <button
                className={`nav-pill-link gap-1 ${isServicesActive ? "active" : ""}`}
              >
                {t.nav.workWithMe}
                <ChevronDown
                  size={11}
                  className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.22 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-3 w-72"
                  >
                    <div
                      className="py-2"
                      style={{
                        background: "rgba(12,22,15,0.96)",
                        backdropFilter: "blur(24px)",
                        border: "1px solid rgba(200,169,106,0.12)",
                        borderRadius: "12px",
                      }}
                    >
                      {t.nav.workWithMeLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-5 py-2.5 text-stone/65 hover:text-ivory hover:bg-white/5 no-underline transition-colors duration-200"
                          style={{
                            fontFamily: "Manrope, sans-serif",
                            fontSize: "11px",
                            letterSpacing: "0.07em",
                          }}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT: CTA → Language switcher (desktop) ── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            {/* CTA — first */}
            <button
              onClick={() => openForm(null, getNavSendFrom())}
              className="nav-cta-pill"
              data-testid="nav-cta-btn"
              style={{ cursor: "pointer", border: "none" }}
            >
              {t.nav.cta}
            </button>

            {/* Language switcher — extreme right */}
            <div
              className="flex items-center gap-1.5"
              style={{
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255,255,255,0.09)",
                borderRadius: "8px",
                padding: "10px 12px",
              }}
            >
              <Globe size={11} className="text-stone/40" />
              <button
                onClick={() => setLang("en")}
                className={`ct-overline bg-transparent border-none cursor-pointer transition-colors ${lang === "en" ? "text-ivory" : "text-stone/40 hover:text-stone/70"}`}
                data-testid="lang-en"
              >
                EN
              </button>
              <span className="text-stone/25 text-xs">|</span>
              <button
                onClick={() => setLang("de")}
                className={`ct-overline bg-transparent border-none cursor-pointer transition-colors ${lang === "de" ? "text-ivory" : "text-stone/40 hover:text-stone/70"}`}
                data-testid="lang-de"
              >
                DE
              </button>
            </div>
          </div>

          {/* ── MOBILE hamburger ── */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-ivory p-1 bg-transparent border-none cursor-pointer"
            data-testid="mobile-menu-btn"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[800] lg:hidden"
            style={{ background: "rgba(12,22,15,0.97)", backdropFilter: "blur(24px)" }}
            data-testid="mobile-menu"
          >
            <div className="flex flex-col h-full justify-center items-start px-10">
              <div className="space-y-6">
                {[
                  { to: "/", label: t.nav.home },
                  { to: "/about-me", label: t.nav.about },
                  { to: "/how-i-work", label: t.nav.method },
                  { to: "/work-with-me", label: t.nav.workWithMe },
                ].map((item, i) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      to={item.to}
                      className="text-ivory/80 hover:text-ivory no-underline block transition-colors"
                      style={{ fontFamily: "Figtree, sans-serif", fontSize: "28px", fontWeight: 400 }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
                {/* Mobile CTA — opens form */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 4 * 0.07, duration: 0.4 }}
                >
                  <button
                    onClick={() => { setMobileOpen(false); openForm(null, getNavSendFrom()); }}
                    className="text-ivory/80 hover:text-ivory block transition-colors"
                    style={{ fontFamily: "Figtree, sans-serif", fontSize: "28px", fontWeight: 400, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    data-testid="mobile-cta-btn"
                  >
                    {t.nav.cta}
                  </button>
                </motion.div>
              </div>

              <div className="mt-10 space-y-2 border-t border-white/10 pt-8">
                {t.nav.workWithMeLinks.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.35 + i * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className="text-stone/50 hover:text-stone/80 no-underline block transition-colors ct-overline"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 flex gap-4">
                {["en", "de"].map((l) => (
                  <button
                    key={l}
                    onClick={() => { setLang(l); setMobileOpen(false); }}
                    className={`ct-overline bg-transparent border-none cursor-pointer transition-colors ${lang === l ? "text-gold" : "text-stone/40"}`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
