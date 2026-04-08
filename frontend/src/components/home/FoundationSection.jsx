import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

// Fixed nav height
const NAV_H = 80;

// Gold particle glitter configuration
const N_PARTICLES = 70;

function initParticles(w, h) {
  const cx = w * 0.5;
  const cy = h * 0.5;
  return Array.from({ length: N_PARTICLES }, (_, i) => {
    const angle = (i / N_PARTICLES) * Math.PI * 2 + Math.random() * 0.5;
    const r = 80 + Math.random() * 320;
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r * 0.6,
      size: Math.random() * 3.0 + 0.8,
      baseA: Math.random() * 0.55 + 0.25,
      phase: Math.random() * Math.PI * 2,
      speed: 0.8 + Math.random() * 0.4,
    };
  });
}

export default function FoundationSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const rafRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for triggering animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Particle canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initP = () => {
      const w = (canvas.width = canvas.offsetWidth || 1200);
      const h = (canvas.height = canvas.offsetHeight || 600);
      particlesRef.current = initParticles(w, h);
    };

    initP();
    let alive = true;

    const loop = (ts) => {
      if (!alive) return;

      const ctx = canvas.getContext("2d");
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const tw = ts * 0.001;

      particlesRef.current.forEach((p) => {
        const twinkle = 0.5 + 0.5 * Math.sin(tw * p.speed + p.phase);
        const a = p.baseA * twinkle;
        if (a < 0.01) return;

        // Subtle floating motion
        const floatX = Math.sin(tw * 0.3 + p.phase) * 8;
        const floatY = Math.cos(tw * 0.25 + p.phase) * 6;
        const x = p.x + floatX;
        const y = p.y + floatY;

        // Glow effect
        const grd = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4.0);
        grd.addColorStop(0, `rgba(200,169,106,${a * 0.6})`);
        grd.addColorStop(1, "rgba(200,169,106,0)");
        ctx.beginPath();
        ctx.arc(x, y, p.size * 4.0, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Core particle
        ctx.beginPath();
        ctx.arc(x, y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,169,106,${a})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", initP);
    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", initP);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-ivory relative"
      style={{ minHeight: "70vh", paddingTop: NAV_H + 40, paddingBottom: 80 }}
      data-testid="philosophy-section"
    >
      {/* Gold particle canvas - background */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content wrapper with subtle fade-in animation */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "relative",
          zIndex: 2,
          maxWidth: "760px",
          margin: "0 auto",
          padding: "0 28px",
          textAlign: "center",
        }}
      >
        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="ct-divider mx-auto mb-8"
          style={{
            background: "rgba(18,18,18,0.2)",
            transformOrigin: "center",
          }}
        />

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="leading-[1.15]"
          style={{
            fontFamily: "Figtree, sans-serif",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 400,
            background: "linear-gradient(160deg, #121212 30%, #3D2916 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {t.home.philosophy.headline}
        </motion.h2>

        {/* Body paragraphs */}
        {t.home.philosophy.body.split("\n\n").map((para, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 25 }}
            animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
            transition={{ duration: 0.6, delay: 0.5 + i * 0.15, ease: "easeOut" }}
            className="text-charcoal/65 mt-6 leading-relaxed"
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "17px",
              fontWeight: 300,
            }}
          >
            {para}
          </motion.p>
        ))}
      </motion.div>
    </section>
  );
}
