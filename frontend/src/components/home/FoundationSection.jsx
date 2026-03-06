import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const BANNER_SRC =
  "https://images.unsplash.com/photo-1671735250135-fc322596644a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";
const CIRCLE_SRC =
  "https://images.unsplash.com/photo-1572866649630-bd38af3d527c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";
const SQUARE_SRC =
  "https://images.unsplash.com/photo-1684963948721-e24aa0d82911?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";

const N_PARTICLES = 70;

function initParticles(w, h) {
  // Cards sits roughly at 55% down the section
  const cx = w * 0.5;
  const cardY = h * 0.55;
  return Array.from({ length: N_PARTICLES }, (_, i) => {
    const angle = (i / N_PARTICLES) * Math.PI * 2 + Math.random() * 0.5;
    // Scatter radius: large enough to be clearly visible travelling in
    const r = 120 + Math.random() * 400;
    return {
      sx: cx + Math.cos(angle) * r,
      sy: cardY + Math.sin(angle) * r * 0.55,
      // Target: cluster near the card centre with natural spread
      tx: cx + (Math.random() - 0.5) * 220,
      ty: cardY + (Math.random() - 0.5) * 130,
      size: Math.random() * 3.0 + 0.8,
      baseA: Math.random() * 0.60 + 0.25,
      sf: 0.50 + Math.random() * 0.50,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

export default function FoundationSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const canvasRef  = useRef(null);
  const particlesRef = useRef([]);
  const progressRef  = useRef(0);
  const rafRef = useRef(null);

  // ── Scroll offset extended to section bottom → huge scroll budget ─
  // Animation runs from section top hitting viewport bottom all the way
  // until section bottom is at 70% of viewport → ~1400px of scroll range
  const { scrollYProgress: fp } = useScroll({
    target: sectionRef,
    offset: ["start end", "end 70%"],
  });

  // ── Banner — 400px dramatic drop ────────────────────────────────
  const bannerY = useTransform(fp, [0.00, 0.50], [-400, 0]);
  const bannerO = useTransform(fp, [0.00, 0.22], [0, 1]);

  // ── Circle — 600px sweep from right ─────────────────────────────
  const circleX = useTransform(fp, [0.05, 0.55], [600, 0]);
  const circleO = useTransform(fp, [0.05, 0.30], [0, 1]);

  // ── Square — 520px left / 200px below surge ──────────────────────
  const squareX = useTransform(fp, [0.05, 0.55], [-520, 0]);
  const squareY = useTransform(fp, [0.05, 0.55], [200, 0]);
  const squareO = useTransform(fp, [0.05, 0.28], [0, 1]);

  // ── Content card — 220px rise ────────────────────────────────────
  const cardY = useTransform(fp, [0.52, 0.80], [220, 0]);
  const cardO = useTransform(fp, [0.52, 0.68], [0, 1]);

  // ── Text cascade — generous ranges, dramatic travel ──────────────
  const dividerScaleX = useTransform(fp, [0.78, 0.92], [0, 1]);
  const dividerO      = useTransform(fp, [0.78, 0.87], [0, 1]);
  // Heading: drops from 120px above
  const headingY = useTransform(fp, [0.82, 0.95], [-120, 0]);
  const headingO = useTransform(fp, [0.82, 0.95], [0, 1]);
  // Para 1: rises 90px, starts after heading lands
  const para0Y = useTransform(fp, [0.88, 0.97], [90, 0]);
  const para0O = useTransform(fp, [0.88, 0.97], [0, 1]);
  // Para 2: staggered a beat behind
  const para1Y = useTransform(fp, [0.92, 1.00], [90, 0]);
  const para1O = useTransform(fp, [0.92, 1.00], [0, 1]);

  // ── Particle canvas RAF loop ─────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initP = () => {
      const w = (canvas.width  = canvas.offsetWidth  || 1200);
      const h = (canvas.height = canvas.offsetHeight || 800);
      particlesRef.current = initParticles(w, h);
    };

    initP();
    let alive = true;

    const loop = (ts) => {
      if (!alive) return;
      const prog = progressRef.current;

      if (prog > 0.02 && prog < 0.99) {
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // Convergence: 0 = fully scattered, 1 = at card
        const conv = Math.min(1, Math.max(0, (prog - 0.03) / 0.72));
        const fadeIn  = Math.min(1, prog / 0.20);
        // Graceful dissolve as particles fully arrive
        const fadeOut = conv > 0.85 ? Math.max(0, 1 - (conv - 0.85) / 0.15) : 1;
        const tw = ts * 0.0012;

        particlesRef.current.forEach((p) => {
          const t = Math.pow(Math.min(1, conv * p.sf), 0.70);
          const x = p.sx + (p.tx - p.sx) * t;
          const y = p.sy + (p.ty - p.sy) * t;
          const twinkle = 0.60 + 0.40 * Math.sin(tw + p.phase);
          const a = p.baseA * fadeIn * fadeOut * twinkle;
          if (a < 0.01) return;

          // Glow halo
          const grd = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4.0);
          grd.addColorStop(0, `rgba(200,169,106,${a * 0.70})`);
          grd.addColorStop(1, "rgba(200,169,106,0)");
          ctx.beginPath();
          ctx.arc(x, y, p.size * 4.0, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Core dot
          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,169,106,${a})`;
          ctx.fill();
        });
      }

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

  useMotionValueEvent(fp, "change", (v) => {
    progressRef.current = v;
  });

  return (
    <section
      ref={sectionRef}
      className="bg-ivory"
      style={{ paddingBottom: "380px", position: "relative" }}
      data-testid="philosophy-section"
    >
      {/* Gold dust canvas — z-index 10 so particles float over images AND card */}
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 10,
        }}
      />

      {/* ── Desktop: scroll-assembled collage ─────────────────────── */}
      <div
        className="hidden md:block max-w-[1400px] mx-auto px-6 md:px-16"
        style={{ overflow: "hidden", position: "relative", zIndex: 2 }}
      >
        <div className="relative">

          {/* Banner — 400px drop from above */}
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

          {/* Circle — 600px sweep from right */}
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

          {/* Square — 520px left + 200px below surge */}
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

          {/* Content card — rises from 220px below */}
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
            {/* Divider — scales in from centre */}
            <motion.div
              className="ct-divider mx-auto mb-8"
              style={{
                background: "rgba(18,18,18,0.2)",
                opacity: dividerO,
                scaleX: dividerScaleX,
                transformOrigin: "center",
              }}
            />

            {/* Heading — drops 120px from above, clipped */}
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

            {/* Body paragraphs — staggered upward slide, clipped */}
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
