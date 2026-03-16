import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

import { LanguageProvider } from "./context/LanguageContext";
import { ContactFormProvider } from "./context/ContactFormContext";
import { ContactFormModal } from "./components/ContactFormModal";
import Preloader from "./components/Preloader";
import GrainOverlay from "./components/GrainOverlay";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Method from "./pages/Method";
import WorkWithMe from "./pages/WorkWithMe";
import ExecutiveCoaching from "./pages/services/ExecutiveCoaching";
import MeditationRetreat from "./pages/services/MeditationRetreat";
import TeamFacilitation from "./pages/services/TeamFacilitation";
import OrganizationalAdvisory from "./pages/services/OrganizationalAdvisory";
import Contact from "./pages/Contact";
import Impressum from "./pages/legal/Impressum";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import Terms from "./pages/legal/Terms";

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
    <Navigation />
    <main>
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
    </main>
    <Footer />
  </>
);

function App() {
  const [ready, setReady] = useState(false);
  const handleComplete = useCallback(() => setReady(true), []);

  return (
    <HelmetProvider>
      <LanguageProvider>
        {!ready && <Preloader onComplete={handleComplete} />}
        {ready && (
          <BrowserRouter>
            <ContactFormProvider>
              <div className="App">
                <GrainOverlay />
                <AppContent />
                <ContactFormModal />
              </div>
            </ContactFormProvider>
          </BrowserRouter>
        )}
      </LanguageProvider>
    </HelmetProvider>
  );
}

export default App;
