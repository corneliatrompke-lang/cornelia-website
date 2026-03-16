import React, { createContext, useContext, useState, useRef, useEffect, useCallback } from "react";

const ContactFormContext = createContext();

export const ContactFormProvider = ({ children }) => {
  const [modalOpen, setModalOpen]           = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [sendFrom, setSendFrom]             = useState(null);

  // Retreat application modal state
  const [applicationModalOpen, setApplicationModalOpen] = useState(false);
  const [selectedRetreat, setSelectedRetreat]           = useState(null);
  const [availableRetreats, setAvailableRetreats]       = useState([]);

  // Callbacks registered by Home.jsx to trigger section-specific forms
  const heroOpenFn     = useRef(null);
  const finalCtaOpenFn = useRef(null);

  const closeForm = useCallback(() => {
    setModalOpen(false);
  }, []);

  const openApplicationForm = useCallback((retreat, allRetreats = []) => {
    setSelectedRetreat(retreat);
    setAvailableRetreats(allRetreats);
    setApplicationModalOpen(true);
  }, []);

  const closeApplicationForm = useCallback(() => {
    setApplicationModalOpen(false);
  }, []);

  const openForm = useCallback((serviceId = null, sendFrom = null) => {
    setSelectedService(serviceId);
    setSendFrom(sendFrom);

    // Real-time viewport check at the moment of click — no async state lag
    const check = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return false;
      const { top, bottom } = el.getBoundingClientRect();
      return top < window.innerHeight * 0.75 && bottom > window.innerHeight * 0.25;
    };

    if (heroOpenFn.current && check('[data-testid="hero-section"]')) {
      heroOpenFn.current();
    } else if (finalCtaOpenFn.current && (check('[data-testid="final-cta-section"]') || check('[data-final-cta="true"]'))) {
      finalCtaOpenFn.current();
    } else {
      setModalOpen(true);
    }
  }, []);

  // Global Escape key listener — dismisses both modals
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setModalOpen(false);
        setApplicationModalOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <ContactFormContext.Provider value={{
      modalOpen,
      setModalOpen,
      selectedService,
      sendFrom,
      heroOpenFn,
      finalCtaOpenFn,
      openForm,
      closeForm,
      applicationModalOpen,
      selectedRetreat,
      availableRetreats,
      openApplicationForm,
      closeApplicationForm,
    }}>
      {children}
    </ContactFormContext.Provider>
  );
};

export const useContactForm = () => useContext(ContactFormContext);

