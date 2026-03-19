import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "ct-cookie-consent";
const VERSION     = "1";

const DEFAULTS = { given: false, essential: true, analytics: false, marketing: false };

const CookieConsentContext = createContext();

export const CookieConsentProvider = ({ children }) => {
  const [consent, setConsent]           = useState(DEFAULTS);
  const [bannerVisible, setBannerVisible] = useState(false);
  const [settingsOpen, setSettingsOpen]   = useState(false);

  // Load stored consent on mount
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
      if (stored?.given && stored?.version === VERSION) {
        setConsent(stored);
        setBannerVisible(false);
      } else {
        // Delay banner so preloader finishes first
        setTimeout(() => setBannerVisible(true), 2800);
      }
    } catch {
      setTimeout(() => setBannerVisible(true), 2800);
    }
  }, []);

  const save = useCallback((prefs) => {
    const record = { ...prefs, given: true, essential: true, version: VERSION, timestamp: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
    setConsent(record);
    setBannerVisible(false);
    setSettingsOpen(false);
  }, []);

  // Sync GA4 consent mode whenever consent state changes
  useEffect(() => {
    if (typeof window.gtag !== "function") return;
    const granted = consent.given && consent.analytics;
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: consent.given && consent.marketing ? "granted" : "denied",
    });
    // Fire initial page view when analytics first granted
    if (granted) {
      window.gtag("event", "page_view", { page_location: window.location.href });
    }
  }, [consent]);

  const acceptAll  = useCallback(() => save({ analytics: true,  marketing: true  }), [save]);
  const rejectAll  = useCallback(() => save({ analytics: false, marketing: false }), [save]);
  const saveCustom = useCallback((prefs) => save(prefs), [save]);
  const openSettings  = useCallback(() => setSettingsOpen(true),  []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);

  return (
    <CookieConsentContext.Provider value={{
      consent, bannerVisible, settingsOpen,
      acceptAll, rejectAll, saveCustom, openSettings, closeSettings,
    }}>
      {children}
    </CookieConsentContext.Provider>
  );
};

export const useCookieConsent = () => useContext(CookieConsentContext);
