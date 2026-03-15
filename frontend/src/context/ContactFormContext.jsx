import React, { createContext, useContext, useState, useRef } from "react";

const ContactFormContext = createContext();

export const ContactFormProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);

  // Callbacks registered by Home.jsx to trigger section-specific forms
  const heroOpenFn    = useRef(null);
  const finalCtaOpenFn = useRef(null);

  const openForm = () => {
    // Real-time viewport check at the moment of click — no async state lag
    const check = (selector) => {
      const el = document.querySelector(selector);
      if (!el) return false;
      const { top, bottom } = el.getBoundingClientRect();
      return top < window.innerHeight * 0.75 && bottom > window.innerHeight * 0.25;
    };

    if (heroOpenFn.current && check('[data-testid="hero-section"]')) {
      heroOpenFn.current();
    } else if (finalCtaOpenFn.current && check('[data-testid="final-cta-section"]')) {
      finalCtaOpenFn.current();
    } else {
      setModalOpen(true);
    }
  };

  return (
    <ContactFormContext.Provider value={{
      modalOpen,
      setModalOpen,
      heroOpenFn,
      finalCtaOpenFn,
      openForm,
    }}>
      {children}
    </ContactFormContext.Provider>
  );
};

export const useContactForm = () => useContext(ContactFormContext);
