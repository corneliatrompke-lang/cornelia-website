import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

const LOGO_MARK =
  "https://customer-assets.emergentagent.com/job_c6a96dcc-a529-4678-b4e5-76313235aa2d/artifacts/kv7m20gz_Cornelia%20Trompke%20Logo%20Mark.png";

const Navigation = () => {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const location = useLocation();

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
  const isServicesActive = location.pathname.startsWith("/work-with-me");

  return (
    <>
      <nav
        data-testid="navigation"
        className="fixed top-0 left-0 right-0 z-[900] transition-all duration-500"
        style={{
          padding: scrolled ? "16px 40px" : "24px 40px",
          background: scrolled ? "rgba(18,18,18,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(200,169,106,0.08)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline" data-testid="nav-logo">
            <img
              src={LOGO_MARK}
              alt="CT"
              className="w-9 h-9 object-contain"
              style={{ mixBlendMode: "lighten" }}
            />
            <div className="hidden sm:block">
              <div className="text-ivory text-sm leading-none" style={{ fontFamily: "Playfair Display, serif", fontWeight: 400 }}>
                Cornelia Trompke
              </div>
              <div className="ct-overline text-stone/50 mt-0.5">
                Consulting & Coaching
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link to="/" className={`nav-link ${isActive("/") ? "active" : ""}`} data-testid="nav-home">
              {t.nav.home}
            </Link>
            <Link to="/about" className={`nav-link ${isActive("/about") ? "active" : ""}`} data-testid="nav-about">
              {t.nav.about}
            </Link>
            <Link to="/method" className={`nav-link ${isActive("/method") ? "active" : ""}`} data-testid="nav-method">
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
                className={`nav-link flex items-center gap-1 bg-transparent border-none cursor-pointer ${isServicesActive ? "active" : ""}`}
                style={{ fontFamily: "Manrope, sans-serif" }}
              >
                {t.nav.workWithMe}
                <ChevronDown size={12} className={`transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.25 }}
                    className="absolute top-full left-0 pt-3 w-72"
                  >
                    <div
                      className="py-3"
                      style={{
                        background: "rgba(18,18,18,0.96)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(200,169,106,0.12)",
                      }}
                    >
                      {t.nav.workWithMeLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          className="block px-6 py-3 text-stone/70 hover:text-ivory hover:bg-white/5 no-underline transition-colors duration-200"
                          style={{ fontFamily: "Manrope, sans-serif", fontSize: "11px", letterSpacing: "0.08em" }}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/contact" className={`nav-link ${isActive("/contact") ? "active" : ""}`} data-testid="nav-contact">
              {t.nav.contact}
            </Link>

            {/* Language Switcher */}
            <div className="flex items-center gap-2 ml-2 border-l border-white/10 pl-6">
              <button
                onClick={() => setLang("en")}
                className={`ct-overline transition-colors duration-300 bg-transparent border-none cursor-pointer ${lang === "en" ? "text-gold" : "text-stone/40 hover:text-stone/70"}`}
                data-testid="lang-en"
              >
                EN
              </button>
              <span className="text-stone/20 text-xs">|</span>
              <button
                onClick={() => setLang("de")}
                className={`ct-overline transition-colors duration-300 bg-transparent border-none cursor-pointer ${lang === "de" ? "text-gold" : "text-stone/40 hover:text-stone/70"}`}
                data-testid="lang-de"
              >
                DE
              </button>
            </div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-ivory p-1 bg-transparent border-none cursor-pointer"
            data-testid="mobile-menu-btn"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[800] lg:hidden"
            style={{ background: "rgba(18,18,18,0.98)", backdropFilter: "blur(20px)" }}
            data-testid="mobile-menu"
          >
            <div className="flex flex-col h-full justify-center items-start px-10">
              <div className="space-y-6">
                {[
                  { to: "/", label: t.nav.home },
                  { to: "/about", label: t.nav.about },
                  { to: "/method", label: t.nav.method },
                  { to: "/work-with-me", label: t.nav.workWithMe },
                  { to: "/contact", label: t.nav.contact },
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
                      style={{ fontFamily: "Playfair Display, serif", fontSize: "28px", fontWeight: 400 }}
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Sub-services */}
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

              {/* Language Switcher Mobile */}
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
