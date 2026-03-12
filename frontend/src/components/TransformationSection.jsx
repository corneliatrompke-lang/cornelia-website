import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Left / right alternating — x:22 = left, x:78 = right
const ITEMS = [
  {
    number: "01",
    heading: "From Reactive\nto Responsive",
    subtext: "Lead from clarity rather than fear, even under extraordinary pressure.",
    x: 22, y: 54,
  },
  {
    number: "02",
    heading: "From Isolation\nto Influence",
    subtext: "Build cultures of trust that attract and retain exceptional talent.",
    x: 78, y: 58,
  },
  {
    number: "03",
    heading: "From Depletion\nto Sustainability",
    subtext: "Your capacity grows rather than diminishes with the demands of leadership.",
    x: 22, y: 54,
  },
  {
    number: "04",
    heading: "From Performance\nto Presence",
    subtext: "Bring your full intelligence to every room, every decision, every relationship.",
    x: 78, y: 58,
  },
];

// Asymmetric vertical stagger for the final all-4 row
const FINAL_STAGGER = [60, 230, 150, 350];

// Wavy connector paths (viewBox 0 0 100 100)
const SEG12 = "M 22,54 C 36,46 43,65 50,54 C 57,43 65,65 78,58";
const SEG23 = "M 78,58 C 64,51 57,67 50,57 C 43,47 36,64 22,54";
const SEG34 = "M 22,54 C 36,46 43,65 50,54 C 57,43 65,65 78,58";

const CIRCLE_LARGE = 450;

export default function TransformationSection() {
  const sectionRef = useRef(null);

  const [screenW, setScreenW] = useState(typeof window !== "undefined" ? window.innerWidth : 1200);
  useEffect(() => {
    const h = () => setScreenW(window.innerWidth);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  const isMobile = screenW < 768;
  const isNarrow = screenW < 1024;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Individual circles (500vh, 4 phases × 0.20 each + final 0.20) ──

  const c1o = useTransform(scrollYProgress, [0, 0.15, 0.24], [1, 1, 0]);
  const c1s = useTransform(scrollYProgress, [0, 0.15, 0.24], [1, 1, 0.92]);

  const c2o = useTransform(scrollYProgress, [0.22, 0.34, 0.36, 0.46], [0, 1, 1, 0]);
  const c2s = useTransform(scrollYProgress, [0.22, 0.34, 0.36, 0.46], [0.84, 1, 1, 0.92]);

  const c3o = useTransform(scrollYProgress, [0.42, 0.54, 0.56, 0.66], [0, 1, 1, 0]);
  const c3s = useTransform(scrollYProgress, [0.42, 0.54, 0.56, 0.66], [0.84, 1, 1, 0.92]);

  const c4o = useTransform(scrollYProgress, [0.62, 0.74, 0.76, 0.84], [0, 1, 1, 0]);
  const c4s = useTransform(scrollYProgress, [0.62, 0.74, 0.76, 0.84], [0.84, 1, 1, 0.92]);

  // ── Wavy segments ────────────────────────────────────────────────

  const seg12PL = useTransform(scrollYProgress, [0.15, 0.30], [0, 1]);
  const seg12O  = useTransform(scrollYProgress, [0.15, 0.24, 0.36, 0.46], [0, 0.85, 0.85, 0]);

  const seg23PL = useTransform(scrollYProgress, [0.35, 0.50], [0, 1]);
  const seg23O  = useTransform(scrollYProgress, [0.35, 0.46, 0.56, 0.66], [0, 0.85, 0.85, 0]);

  const seg34PL = useTransform(scrollYProgress, [0.55, 0.70], [0, 1]);
  const seg34O  = useTransform(scrollYProgress, [0.55, 0.66, 0.76, 0.84], [0, 0.85, 0.85, 0]);

  // ── Final all-4 row ───────────────────────────────────────────────
  const finalO = useTransform(scrollYProgress, [0.82, 0.94], [0, 1]);

  const circles = [
    { o: c1o, s: c1s },
    { o: c2o, s: c2s },
    { o: c3o, s: c3s },
    { o: c4o, s: c4s },
  ];

  const segments = [
    { d: SEG12, pl: seg12PL, opacity: seg12O },
    { d: SEG23, pl: seg23PL, opacity: seg23O },
    { d: SEG34, pl: seg34PL, opacity: seg34O },
  ];

  return (
    <section
      ref={sectionRef}
      style={{ height: "500vh", background: "#0F1A12" }}
      data-testid="transformation-section"
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* ── Header — pushed below nav bar ──────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: "110px",
            left: 0,
            right: 0,
            textAlign: "center",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "11px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "#C8A96A",
              marginBottom: "8px",
            }}
          >
            The Transformation
          </p>
          <h2
            style={{
              fontFamily: "Figtree, sans-serif",
              fontSize: "clamp(26px, 3vw, 40px)",
              fontWeight: 400,
              color: "#F5F2EC",
              lineHeight: 1.1,
            }}
          >
            What Becomes Possible
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "13px",
              color: "rgba(245,242,236,0.36)",
              marginTop: "5px",
            }}
          >
            When leaders regulate their nervous system, everything changes.
          </p>
        </div>

        {/* ── Wavy nerve segments — desktop only ─────────────────── */}
        {!isNarrow && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 2,
          }}
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {segments.map(({ d, pl, opacity }, si) => (
            <React.Fragment key={si}>
              <motion.path
                d={d}
                stroke="rgba(200,169,106,0.18)"
                strokeWidth="2.2"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength: pl, opacity, filter: "blur(6px)" }}
              />
              <motion.path
                d={d}
                stroke="rgba(200,169,106,0.68)"
                strokeWidth="0.18"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength: pl, opacity }}
              />
            </React.Fragment>
          ))}
        </svg>
        )}

        {/* ── Individual large circles ─────────────────────────────── */}
        {ITEMS.map((item, i) => {
          const circleSize = isMobile ? 240 : isNarrow ? 310 : 450;
          const xPos = isNarrow ? 50 : item.x;
          const yPos = isNarrow ? 54 : item.y;
          return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: `${xPos}%`,
              top: `${yPos}%`,
              translateX: "-50%",
              translateY: "-50%",
              opacity: circles[i].o,
              scale: circles[i].s,
              zIndex: 5,
            }}
          >
            <div
              style={{
                width: `${circleSize}px`,
                height: `${circleSize}px`,
                borderRadius: "50%",
                border: "1px solid rgba(200,169,106,0.30)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "10%",
                background: "#131C10",
                boxShadow: "0 0 90px rgba(200,169,106,0.07)",
                textAlign: "center",
                boxSizing: "border-box",
              }}
            >
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.24em",
                  color: "#C8A96A",
                  marginBottom: "14px",
                  display: "block",
                }}
              >
                {item.number}
              </span>
              <span
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: isMobile ? "20px" : isNarrow ? "22px" : "clamp(24px, 2.4vw, 30px)",
                  fontWeight: 400,
                  color: "#F5F2EC",
                  lineHeight: 1.26,
                  display: "block",
                  whiteSpace: "pre-line",
                }}
              >
                {item.heading}
              </span>
              <div
                style={{
                  width: "32px",
                  height: "1px",
                  background: "rgba(200,169,106,0.34)",
                  margin: "16px auto",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: isMobile ? "13px" : isNarrow ? "14px" : "clamp(14px, 1.4vw, 18px)",
                  color: "rgba(245,242,236,0.50)",
                  lineHeight: 1.65,
                  maxWidth: "76%",
                  margin: 0,
                }}
              >
                {item.subtext}
              </p>
            </div>
          </motion.div>
          );
        })}

        {/* ── Final view: responsive layout ── */}
        <motion.div
          style={{
            position: "absolute",
            top: isMobile ? "130px" : "160px",
            left: 0,
            right: 0,
            bottom: 0,
            display: isMobile ? "grid" : "flex",
            gridTemplateColumns: isMobile ? "1fr 1fr" : undefined,
            alignItems: isMobile ? "start" : "flex-start",
            justifyContent: isMobile ? undefined : "center",
            gap: isMobile ? "12px" : "60px",
            paddingLeft: isMobile ? "20px" : "40px",
            paddingRight: isMobile ? "20px" : "40px",
            opacity: finalO,
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flex: isMobile ? undefined : 1,
                maxWidth: isMobile ? "none" : "230px",
                marginTop: isMobile ? 0 : `${FINAL_STAGGER[i]}px`,
              }}
            >
              {/* Small number circle */}
              <div
                style={{
                  width: isMobile ? "76px" : "120px",
                  height: isMobile ? "76px" : "120px",
                  flexShrink: 0,
                  borderRadius: "50%",
                  border: "1px solid rgba(200,169,106,0.28)",
                  background: "#1A2518",
                  boxShadow: "0 0 40px rgba(200,169,106,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: isMobile ? "24px" : "34px",
                    fontWeight: 300,
                    color: "rgba(200,169,106,0.80)",
                    lineHeight: 1,
                  }}
                >
                  {item.number}
                </span>
              </div>

              {/* Heading */}
              <h3
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: isMobile ? "13px" : "16px",
                  fontWeight: 400,
                  color: "#F5F2EC",
                  lineHeight: 1.32,
                  textAlign: "center",
                  whiteSpace: "pre-line",
                  marginBottom: "10px",
                  margin: "0 0 10px",
                }}
              >
                {item.heading}
              </h3>

              {/* Divider */}
              <div
                style={{
                  width: "22px",
                  height: "1px",
                  background: "rgba(200,169,106,0.30)",
                  marginBottom: "10px",
                  flexShrink: 0,
                }}
              />

              {/* Subtext */}
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: isMobile ? "11px" : "13px",
                  color: "rgba(245,242,236,0.44)",
                  lineHeight: 1.68,
                  textAlign: "center",
                  margin: 0,
                }}
              >
                {item.subtext}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
