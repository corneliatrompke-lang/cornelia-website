import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";

import { LanguageProvider } from "./context/LanguageContext";
import Preloader from "./components/Preloader";
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
import Legal from "./pages/Legal";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppContent = () => (
  <>
    <ScrollToTop />
    <Navigation />
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/method" element={<Method />} />
        <Route path="/work-with-me" element={<WorkWithMe />} />
        <Route path="/work-with-me/executive-coaching" element={<ExecutiveCoaching />} />
        <Route path="/work-with-me/meditation-retreat" element={<MeditationRetreat />} />
        <Route path="/work-with-me/team-facilitation" element={<TeamFacilitation />} />
        <Route path="/work-with-me/organisational-advisory" element={<OrganizationalAdvisory />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/legal" element={<Legal />} />
      </Routes>
    </main>
    <Footer />
  </>
);

function App() {
  const [ready, setReady] = useState(false);
  const handleComplete = useCallback(() => setReady(true), []);

  return (
    <LanguageProvider>
      {!ready && <Preloader onComplete={handleComplete} />}
      {ready && (
        <BrowserRouter>
          <div className="App">
            <AppContent />
          </div>
        </BrowserRouter>
      )}
    </LanguageProvider>
  );
}

export default App;
