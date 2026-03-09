import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const BANNER_SRC =
  "https://images.unsplash.com/photo-1671735250135-fc322596644a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";
const CIRCLE_SRC =
  "https://images.unsplash.com/photo-1572866649630-bd38af3d527c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";
const SQUARE_SRC =
  "https://images.unsplash.com/photo-1684963948721-e24aa0d82911?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";

// Fixed nav height — sticky inner content starts below this
const NAV_H = 80;

const N_PARTICLES = 70;

function initParticles(w, h) {
  const cx = w * 0.5;
  const cardCY = h * 0.75;
  return Array.from({ length: N_PARTICLES }, (_, i) => {
    const angle = (i / N_PARTICLES) * Math.PI * 2 + Math.random() * 0.5;
    const r = 100 + Math.random() * 360;
    return {
      sx: cx + Math.cos(angle) * r,
      sy: cardCY * 0.65 + Math.sin(angle) * r * 0.55,
      tx: cx + (Math.random() - 0.5) * 200,
      ty: cardCY + (Math.random() - 0.5) * 80,
      size: Math.random() * 3.0 + 0.8,
      baseA: Math.random() * 0.60 + 0.25,
      sf: 0.50 + Math.random() * 0.50,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

export default function FoundationSection() {
  const { t } = useLanguage();
  const outerRef  = useRef(null);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const progressRef  = useRef(0);
  const rafRef = useRef(null);

  const { scrollYProgress: fp } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // ── Images assemble over first ~58% ────────────────────────────
  const bannerY = useTransform(fp, [0.00, 0.55], [-240, 0]);
  const bannerO = useTransform(fp, [0.00, 0.22], [0, 1]);

  const circleX = useTransform(fp, [0.05, 0.58], [620, 0]);
  const circleO = useTransform(fp, [0.05, 0.28], [0, 1]);

  const squareX = useTransform(fp, [0.05, 0.58], [-560, 0]);
  const squareY = useTransform(fp, [0.05, 0.58], [160, 0]);
  const squareO = useTransform(fp, [0.05, 0.26], [0, 1]);

  // ── Card rises after images settle ─────────────────────────────
  const cardY = useTransform(fp, [0.50, 0.70], [180, 0]);
  const cardO = useTransform(fp, [0.50, 0.66], [0, 1]);

  // ── Text cascade ───────────────────────────────────────────────
  const dividerScaleX = useTransform(fp, [0.68, 0.80], [0, 1]);
  const dividerO      = useTransform(fp, [0.68, 0.78], [0, 1]);

  const headingY = useTransform(fp, [0.73, 0.86], [-100, 0]);
  const headingO = useTransform(fp, [0.73, 0.86], [0, 1]);

  const para0Y = useTransform(fp, [0.82, 0.92], [80, 0]);
  const para0O = useTransform(fp, [0.82, 0.92], [0, 1]);

  const para1Y = useTransform(fp, [0.88, 0.97], [80, 0]);
  const para1O = useTransform(fp, [0.88, 0.97], [0, 1]);

  // ── Particle canvas RAF ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initP = () => {
      const w = (canvas.width  = canvas.offsetWidth  || 1200);
      const h = (canvas.height = canvas.offsetHeight || 700);
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

        const conv    = Math.min(1, Math.max(0, (prog - 0.03) / 0.68));
        const fadeIn  = Math.min(1, prog / 0.18);
        const fadeOut = conv > 0.85 ? Math.max(0, 1 - (conv - 0.85) / 0.15) : 1;
        const tw = ts * 0.0012;

        particlesRef.current.forEach((p) => {
          const t = Math.pow(Math.min(1, conv * p.sf), 0.70);
          const x = p.sx + (p.tx - p.sx) * t;
          const y = p.sy + (p.ty - p.sy) * t;
          const twinkle = 0.60 + 0.40 * Math.sin(tw + p.phase);
          const a = p.baseA * fadeIn * fadeOut * twinkle;
          if (a < 0.01) return;

          const grd = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4.0);
          grd.addColorStop(0, `rgba(200,169,106,${a * 0.70})`);
          grd.addColorStop(1, "rgba(200,169,106,0)");
          ctx.beginPath();
          ctx.arc(x, y, p.size * 4.0, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

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
    // ── 300vh outer section: scroll driver ──────────────────────
    <section
      ref={outerRef}
      className="bg-ivory"
      style={{ height: "300vh" }}
      data-testid="philosophy-section"
    >
      {/* ── Pinned inner frame: viewport-locked ───────────────── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#F5F2EC",
        }}
      >
        {/* Particle canvas — fills full sticky frame */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* ── Desktop collage ───────────────────────────────────── */}
        {/* Sub-container offset by nav height so images start below nav */}
        <div
          className="hidden md:block"
          style={{
            position: "absolute",
            top: NAV_H + 32,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {/* Centred layout wrapper */}
          <div
            style={{
              position: "relative",
              maxWidth: "1400px",
              margin: "0 auto",
              height: "100%",
            }}
          >
            {/* Banner — drops 240px from above, slightly inset from sides */}
            <motion.div
              style={{
                position: "absolute",
                top: 0,
                left: "13%",
                right: "13%",
                height: 450,
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

            {/* Circle — 260px, sweeps 620px from the right */}
            <motion.div
              style={{
                position: "absolute",
                right: 80,
                top: 0,
                width: 260,
                height: 260,
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

            {/* Square — 225px, surges from lower-left */}
            <motion.div
              style={{
                position: "absolute",
                left: 60,
                top: 244,
                width: 225,
                height: 225,
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

            {/* Card centering wrapper
                top: 392px = banner bottom (450) minus 58px overlap (~12.86%) */}
            <div
              style={{
                position: "absolute",
                top: 392,
                left: "50%",
                transform: "translateX(-50%)",
                width: "clamp(494px, 47%, 676px)",
                textAlign: "center",
                zIndex: 3,
              }}
            >
              <motion.div
                style={{
                  background: "#F5F2EC",
                  padding: "28px 28px 0",
                  y: cardY,
                  opacity: cardO,
                }}
              >
                {/* Divider scales from centre */}
                <motion.div
                  className="ct-divider mx-auto mb-6"
                  style={{
                    background: "rgba(18,18,18,0.2)",
                    opacity: dividerO,
                    scaleX: dividerScaleX,
                    transformOrigin: "center",
                  }}
                />

                {/* Heading — clips down from above, warm gold gradient tint */}
                <div style={{ overflow: "hidden" }}>
                  <motion.h2
                    className="leading-[1.15]"
                    style={{
                      fontFamily: "Figtree, sans-serif",
                      fontSize: "clamp(26px, 3.2vw, 44px)",
                      fontWeight: 400,
                      background: "linear-gradient(160deg, #121212 30%, #3D2916 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      y: headingY,
                      opacity: headingO,
                    }}
                  >
                    {t.home.philosophy.headline}
                  </motion.h2>
                </div>

                {/* Paragraphs clip up individually */}
                {t.home.philosophy.body.split("\n\n").map((para, i) => {
                  const py = i === 0 ? para0Y : para1Y;
                  const po = i === 0 ? para0O : para1O;
                  return (
                    <div key={i} style={{ overflow: "hidden" }}>
                      <motion.p
                        className="text-charcoal/65 mt-5 leading-relaxed"
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "16px",
                          fontWeight: 300,
                          y: py,
                          opacity: po,
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
        </div>

        {/* ── Mobile: centred static layout ──────────────────────── */}
        <div
          className="md:hidden flex items-center justify-center h-full px-6 text-center"
          style={{ position: "relative", zIndex: 2, paddingTop: NAV_H }}
        >
          <div>
            <div className="ct-divider mx-auto mb-8" style={{ background: "rgba(18,18,18,0.2)" }} />
            <h2
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
            </h2>
            {t.home.philosophy.body.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-charcoal/65 mt-5 leading-relaxed"
                style={{ fontFamily: "Manrope, sans-serif", fontSize: "16px", fontWeight: 300 }}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
