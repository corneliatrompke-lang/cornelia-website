import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const BANNER_SRC =
  "https://images.unsplash.com/photo-1671735250135-fc322596644a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";
const CIRCLE_SRC =
  "https://images.unsplash.com/photo-1572866649630-bd38af3d527c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";
const SQUARE_SRC =
  "https://images.unsplash.com/photo-1684963948721-e24aa0d82911?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";

const N_PARTICLES = 55;

function initParticles(w, h) {
  const cx = w * 0.5;
  const cy = h * 0.42;
  return Array.from({ length: N_PARTICLES }, (_, i) => {
    const angle = (i / N_PARTICLES) * Math.PI * 2 + Math.random() * 0.5;
    const r = 80 + Math.random() * 340;
    return {
      sx: cx + Math.cos(angle) * r,
      sy: cy + Math.sin(angle) * r * 0.6,
      tx: w * 0.5 + (Math.random() - 0.5) * 160,
      ty: h * 0.70 + (Math.random() - 0.5) * 100,
      size: Math.random() * 2.2 + 0.5,
      baseA: Math.random() * 0.45 + 0.15,
      sf: 0.55 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

export default function FoundationSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const progressRef = useRef(0);
  const rafRef = useRef(null);

  // Extended scroll offset — animation spans from section entering viewport
  // all the way until its top reaches near the viewport top → much slower feel
  const { scrollYProgress: fp } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 5%"],
  });

  // ── Banner — dramatic drop from 220px above ─────────────────────
  const bannerY = useTransform(fp, [0.0, 0.62], [-220, 0]);
  const bannerO = useTransform(fp, [0.0, 0.25], [0, 1]);

  // ── Circle — sweeps in from 380px to the right ──────────────────
  const circleX = useTransform(fp, [0.08, 0.68], [380, 0]);
  const circleO = useTransform(fp, [0.08, 0.35], [0, 1]);

  // ── Square — surges from 300px left + 140px below ───────────────
  const squareX = useTransform(fp, [0.05, 0.65], [-300, 0]);
  const squareY = useTransform(fp, [0.05, 0.65], [140, 0]);
  const squareO = useTransform(fp, [0.05, 0.30], [0, 1]);

  // ── Content card — rises 160px from below ───────────────────────
  const cardY = useTransform(fp, [0.50, 0.80], [160, 0]);
  const cardO = useTransform(fp, [0.50, 0.68], [0, 1]);

  // ── Text cascade — each element has its own scroll-driven reveal ─
  // Divider sweeps in first
  const dividerScaleX = useTransform(fp, [0.76, 0.86], [0, 1]);
  const dividerO      = useTransform(fp, [0.76, 0.83], [0, 1]);
  // Heading drops in dramatically
  const headingY = useTransform(fp, [0.80, 0.91], [-80, 0]);
  const headingO = useTransform(fp, [0.80, 0.91], [0, 1]);
  // Paragraph 1 — slides up after heading lands
  const para0Y = useTransform(fp, [0.86, 0.94], [60, 0]);
  const para0O = useTransform(fp, [0.86, 0.94], [0, 1]);
  // Paragraph 2 — follows with a beat of delay
  const para1Y = useTransform(fp, [0.90, 0.97], [60, 0]);
  const para1O = useTransform(fp, [0.90, 0.97], [0, 1]);

  // ── Particle canvas RAF loop ─────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initP = () => {
      const w = (canvas.width = canvas.offsetWidth || 1200);
      const h = (canvas.height = canvas.offsetHeight || 700);
      particlesRef.current = initParticles(w, h);
    };

    initP();

    let alive = true;

    const loop = (ts) => {
      if (!alive) return;
      const prog = progressRef.current;

      if (prog > 0.03 && prog < 0.99) {
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // How far along the convergence is (0 = scattered, 1 = fully converged)
        const conv = Math.min(1, Math.max(0, (prog - 0.05) / 0.78));
        const fadeIn  = Math.min(1, prog / 0.22);
        // Fade out when fully converged so particles dissolve gracefully
        const fadeOut = conv > 0.85 ? Math.max(0, 1 - (conv - 0.85) / 0.15) : 1;
        const tw = ts * 0.0014;

        particlesRef.current.forEach((p) => {
          const t = Math.pow(Math.min(1, conv * p.sf), 0.75);
          const x = p.sx + (p.tx - p.sx) * t;
          const y = p.sy + (p.ty - p.sy) * t;
          const twinkle = 0.65 + 0.35 * Math.sin(tw + p.phase);
          const a = p.baseA * fadeIn * fadeOut * twinkle;
          if (a < 0.01) return;

          // Soft glow halo
          const grd = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4.5);
          grd.addColorStop(0, `rgba(200,169,106,${a * 0.65})`);
          grd.addColorStop(1, "rgba(200,169,106,0)");
          ctx.beginPath();
          ctx.arc(x, y, p.size * 4.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Crisp core dot
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,169,106,${a})`;
          ctx.fill();
        });
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);

    const handleResize = () => { initP(); };
    window.addEventListener("resize", handleResize);

    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useMotionValueEvent(fp, "change", (v) => {
    progressRef.current = v;
  });

  return (
    <section
      ref={sectionRef}
      className="bg-ivory"
      style={{ paddingBottom: "200px", position: "relative" }}
      data-testid="philosophy-section"
    >
      {/* Gold dust particle canvas */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* ── Desktop: scroll-assembled collage ─────────────────────── */}
      <div
        className="hidden md:block max-w-[1400px] mx-auto px-6 md:px-16"
        style={{ overflow: "hidden", position: "relative", zIndex: 2 }}
      >
        <div className="relative">

          {/* Banner — drops dramatically from above */}
          <motion.div
            style={{
              margin: "140px auto 0",
              width: "75%",
              height: "460px",
              overflow: "hidden",
              y: bannerY,
              opacity: bannerO,
            }}
          >
            <img
              src={BANNER_SRC}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
            />
          </motion.div>

          {/* Circle — sweeps in from far right */}
          <motion.div
            style={{
              position: "absolute",
              right: 0,
              top: "140px",
              width: "290px",
              height: "290px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "6px solid #F5F2EC",
              boxShadow: "0 12px 48px rgba(18,18,18,0.20)",
              zIndex: 2,
              x: circleX,
              opacity: circleO,
            }}
          >
            <img
              src={CIRCLE_SRC}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          </motion.div>

          {/* Square — surges from lower-left */}
          <motion.div
            style={{
              position: "absolute",
              left: "calc(12.5% - 40px)",
              top: "280px",
              width: "250px",
              height: "250px",
              overflow: "hidden",
              border: "6px solid #F5F2EC",
              boxShadow: "0 12px 48px rgba(18,18,18,0.20)",
              zIndex: 2,
              rotate: -5,
              x: squareX,
              y: squareY,
              opacity: squareO,
            }}
          >
            <img
              src={SQUARE_SRC}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>

          {/* Content card — rises from below; text reveals after card lands */}
          <motion.div
            className="mx-auto text-center"
            style={{
              maxWidth: "608px",
              marginTop: "-100px",
              position: "relative",
              zIndex: 3,
              background: "#F5F2EC",
              padding: "24px 24px 0",
              y: cardY,
              opacity: cardO,
            }}
          >
            {/* Divider — scales in horizontally */}
            <motion.div
              className="ct-divider mx-auto mb-8"
              style={{
                background: "rgba(18,18,18,0.2)",
                opacity: dividerO,
                scaleX: dividerScaleX,
                transformOrigin: "center",
              }}
            />

            {/* Heading — drops in from above */}
            <div style={{ overflow: "hidden" }}>
              <motion.h2
                className="text-charcoal leading-[1.15]"
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: "clamp(28px, 4vw, 46px)",
                  fontWeight: 400,
                  y: headingY,
                  opacity: headingO,
                }}
              >
                {t.home.philosophy.headline}
              </motion.h2>
            </div>

            {/* Body paragraphs — each slides up individually */}
            {t.home.philosophy.body.split("\n\n").map((para, i) => {
              const paraY = i === 0 ? para0Y : para1Y;
              const paraO = i === 0 ? para0O : para1O;
              return (
                <div key={i} style={{ overflow: "hidden" }}>
                  <motion.p
                    className="text-charcoal/65 mt-6 leading-relaxed"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "17px",
                      fontWeight: 300,
                      y: paraY,
                      opacity: paraO,
                    }}
                  >
                    {para}
                  </motion.p>
                </div>
              );
            })}
          </motion.div>

        </div>
      </div>

      {/* ── Mobile: simple scroll-reveal ──────────────────────────── */}
      <div
        className="md:hidden max-w-[720px] mx-auto px-6 text-center"
        style={{ paddingTop: "60px", position: "relative", zIndex: 2 }}
      >
        <div className="ct-divider mx-auto mb-8" style={{ background: "rgba(18,18,18,0.2)" }} />
        <h2
          className="text-charcoal leading-[1.15]"
          style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400 }}
        >
          {t.home.philosophy.headline}
        </h2>
        {t.home.philosophy.body.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="text-charcoal/65 mt-6 leading-relaxed"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "17px", fontWeight: 300 }}
          >
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}
