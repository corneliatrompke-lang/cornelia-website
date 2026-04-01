import React, { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

import { LanguageProvider } from "./context/LanguageContext";
import { ContactFormProvider } from "./context/ContactFormContext";
import { CookieConsentProvider, useCookieConsent } from "./context/CookieConsentContext";

// Eagerly load critical components
import Navigation from "./components/Navigation";
import Home from "./pages/Home";

// Lazy load non-critical components
const ContactFormModal = lazy(() => import("./components/ContactFormModal").then(m => ({ default: m.ContactFormModal })));
const RetreatApplicationModal = lazy(() => import("./components/RetreatApplicationModal").then(m => ({ default: m.RetreatApplicationModal })));
const WhatsAppButton = lazy(() => import("./components/WhatsAppButton").then(m => ({ default: m.WhatsAppButton })));
const CookieBanner = lazy(() => import("./components/CookieBanner").then(m => ({ default: m.CookieBanner })));
const CookieSettingsModal = lazy(() => import("./components/CookieSettingsModal").then(m => ({ default: m.CookieSettingsModal })));
const GrainOverlay = lazy(() => import("./components/GrainOverlay"));
const Footer = lazy(() => import("./components/Footer"));

// Lazy load pages
const About = lazy(() => import("./pages/About"));
const Method = lazy(() => import("./pages/Method"));
const WorkWithMe = lazy(() => import("./pages/WorkWithMe"));
const ExecutiveCoaching = lazy(() => import("./pages/services/ExecutiveCoaching"));
const MeditationRetreat = lazy(() => import("./pages/services/MeditationRetreat"));
const TeamFacilitation = lazy(() => import("./pages/services/TeamFacilitation"));
const OrganizationalAdvisory = lazy(() => import("./pages/services/OrganizationalAdvisory"));
const Contact = lazy(() => import("./pages/Contact"));
const Impressum = lazy(() => import("./pages/legal/Impressum"));
const PrivacyPolicy = lazy(() => import("./pages/legal/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/legal/Terms"));

const GA4PageViewTracker = () => {
  const { pathname } = useLocation();
  const { consent } = useCookieConsent();
  useEffect(() => {
    if (consent.given && consent.analytics && typeof window.gtag === "function") {
      window.gtag("event", "page_view", { page_path: pathname, page_location: window.location.href });
    }
  }, [pathname, consent]);
  return null;
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = "";
    });
  }, [pathname]);
  return null;
};

const AppContent = () => (
  <>
    <ScrollToTop />
    <GA4PageViewTracker />
    <Navigation />
    <main>
      <Suspense fallback={<div style={{ minHeight: "100vh" }} />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about-me" element={<About />} />
          <Route path="/how-i-work" element={<Method />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
          <Route path="/executive-coaching" element={<ExecutiveCoaching />} />
          <Route path="/executive-retreats" element={<MeditationRetreat />} />
          <Route path="/leadership-team-facilitation" element={<TeamFacilitation />} />
          <Route path="/organizational-advisory" element={<OrganizationalAdvisory />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          {/* Redirects for old/duplicate routes */}
          <Route path="/about" element={<Navigate to="/about-me" replace />} />
          <Route path="/method" element={<Navigate to="/how-i-work" replace />} />
          <Route path="/work-with-me/executive-coaching" element={<Navigate to="/executive-coaching" replace />} />
          <Route path="/work-with-me/meditation-retreat" element={<Navigate to="/executive-retreats" replace />} />
          <Route path="/work-with-me/team-facilitation" element={<Navigate to="/leadership-team-facilitation" replace />} />
          <Route path="/work-with-me/organisational-advisory" element={<Navigate to="/organizational-advisory" replace />} />
          <Route path="/legal" element={<Navigate to="/impressum" replace />} />
        </Routes>
      </Suspense>
    </main>
    <Suspense fallback={null}>
      <Footer />
    </Suspense>
  </>
);

function App() {
  return (
    <HelmetProvider>
      <LanguageProvider>
        <CookieConsentProvider>
          <BrowserRouter>
            <ContactFormProvider>
              <div className="App">
                <Suspense fallback={null}>
                  <GrainOverlay />
                </Suspense>
                <AppContent />
                <Suspense fallback={null}>
                  <ContactFormModal />
                  <RetreatApplicationModal />
                  <WhatsAppButton />
                  <CookieBanner />
                  <CookieSettingsModal />
                </Suspense>
              </div>
            </ContactFormProvider>
          </BrowserRouter>
        </CookieConsentProvider>
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
