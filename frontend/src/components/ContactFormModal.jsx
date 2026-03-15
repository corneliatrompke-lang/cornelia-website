import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HeroContactForm } from "./HeroContactForm";
import { useContactForm } from "../context/ContactFormContext";

export const ContactFormModal = () => {
  const { modalOpen, setModalOpen, selectedService } = useContactForm();

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          key="modal-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={() => setModalOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(5, 10, 7, 0.78)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            padding: "24px",
          }}
          data-testid="contact-form-modal-backdrop"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            onClick={e => e.stopPropagation()}
            style={{
              width: "clamp(340px, 90vw, 520px)",
              maxHeight: "calc(100vh - 48px)",
              overflowY: "auto",
              background: "rgba(8, 16, 11, 0.94)",
              backdropFilter: "blur(32px) saturate(1.6)",
              WebkitBackdropFilter: "blur(32px) saturate(1.6)",
              border: "1px solid rgba(200,169,106,0.22)",
              borderRadius: "20px",
              scrollbarWidth: "none",
              position: "relative",
            }}
            data-testid="contact-form-modal"
          >
            {/* Corner accent lines */}
            <div style={{ position: "absolute", top: 0, left: 0, width: "36px", height: "1px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
            <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "36px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "36px", height: "1px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "36px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
            <HeroContactForm onClose={() => setModalOpen(false)} preselectedService={selectedService} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
