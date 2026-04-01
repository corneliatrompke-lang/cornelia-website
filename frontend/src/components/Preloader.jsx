import React, { useState, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LOGO_MARK =
  "/ct-logo-mark.webp";

const Preloader = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);

  // useLayoutEffect is synchronous and not deferred by React scheduler
  useLayoutEffect(() => {
    const t1 = setTimeout(() => setVisible(false), 1500);
    const t2 = setTimeout(onComplete, 1920);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] } }}
          className="fixed inset-0 z-[9999] bg-charcoal flex flex-col items-center justify-center"
          data-testid="preloader"
        >
          {/* Neural lines background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="absolute inset-0 overflow-hidden"
          >
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  width: `${80 + i * 40}px`,
                  height: "1px",
                  background: `rgba(200,169,106,${0.06 + i * 0.01})`,
                  top: `${20 + i * 13}%`,
                  left: `${10 + i * 8}%`,
                  transform: `rotate(${-20 + i * 8}deg)`,
                }}
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </motion.div>

          {/* Logo */}
          <motion.img
            src={LOGO_MARK}
            alt="Cornelia Trompke"
            width={110}
            height={110}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.3 }}
            style={{ width: 110, height: 110, objectFit: "contain" }}
          />

          {/* Brand name */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-6 text-center"
          >
            <p
              className="text-ivory/80 tracking-[0.35em] uppercase text-[10px]"
              style={{ fontFamily: "Manrope, sans-serif", fontWeight: 500 }}
            >
              Cornelia Trompke
            </p>
            <p
              className="text-gold/50 tracking-[0.25em] uppercase text-[8px] mt-1"
              style={{ fontFamily: "Manrope, sans-serif" }}
            >
              Consulting & Coaching
            </p>
          </motion.div>

          {/* Progress line */}
          <motion.div
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="w-24 h-px bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-gold/60"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.8, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
