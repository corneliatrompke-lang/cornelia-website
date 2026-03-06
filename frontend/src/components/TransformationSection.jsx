import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Positions kept within safe viewport bounds so circles never clip off-screen.
// At min(44vmin, 380px) ≈ 352px diameter on a 1080×800 screen (radius 176px).
// Safe x: 18–82 %, safe y: 42–76 % (reserves ~150px for header at top).
const ITEMS = [
  {
    number: "01",
    heading: "From Reactive\nto Responsive",
    subtext: "Lead from clarity rather than fear, even under extraordinary pressure.",
    x: 52, y: 57,
  },
  {
    number: "02",
    heading: "From Isolation\nto Influence",
    subtext: "Build cultures of trust that attract and retain exceptional talent.",
    x: 24, y: 54,
  },
  {
    number: "03",
    heading: "From Depletion\nto Sustainability",
    subtext: "Your capacity grows rather than diminishes with the demands of leadership.",
    x: 70, y: 62,
  },
  {
    number: "04",
    heading: "From Performance\nto Presence",
    subtext: "Bring your full intelligence to every room, every decision, every relationship.",
    x: 47, y: 65,
  },
];

// Short connecting segments between adjacent circle centres (viewBox 0 0 100 100).
// Each segment is only shown during the transition to the NEXT circle —
// so on step 2 you see only the line from step 1, never the whole path.
const SEG12 = "M 52,57 C 44,56 36,54 24,54";
const SEG23 = "M 24,54 C 42,57 57,60 70,62";
const SEG34 = "M 70,62 C 62,63 54,64 47,65";

// Circle size: ~44 % of the shorter viewport dimension, capped at 380 px
const SZ = "min(44vmin, 380px)";

export default function TransformationSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Circle 1 ─ visible the moment the section enters; fades out at ≈ 25 %
  const c1o = useTransform(scrollYProgress, [0, 0.20, 0.27], [1, 1, 0]);
  const c1s = useTransform(scrollYProgress, [0, 0.20, 0.27], [1, 1, 0.92]);

  // ── Circle 2 ─ enters at 25 %, leaves at 50 %
  const c2o = useTransform(scrollYProgress, [0.25, 0.33, 0.45, 0.52], [0, 1, 1, 0]);
  const c2s = useTransform(scrollYProgress, [0.25, 0.33, 0.45, 0.52], [0.82, 1, 1, 0.92]);

  // ── Circle 3 ─ enters at 50 %, leaves at 75 %
  const c3o = useTransform(scrollYProgress, [0.50, 0.58, 0.70, 0.77], [0, 1, 1, 0]);
  const c3s = useTransform(scrollYProgress, [0.50, 0.58, 0.70, 0.77], [0.82, 1, 1, 0.92]);

  // ── Circle 4 ─ enters at 75 %, stays visible
  const c4o = useTransform(scrollYProgress, [0.75, 0.86], [0, 1]);
  const c4s = useTransform(scrollYProgress, [0.75, 0.86], [0.82, 1]);

  // ── Segment 1 → 2 ─ draws as circle 1 fades; fades before circle 3 enters
  const seg12PL = useTransform(scrollYProgress, [0.20, 0.29], [0, 1]);
  const seg12O  = useTransform(scrollYProgress, [0.20, 0.27, 0.44, 0.52], [0, 0.85, 0.85, 0]);

  // ── Segment 2 → 3 ─ draws as circle 2 fades
  const seg23PL = useTransform(scrollYProgress, [0.45, 0.54], [0, 1]);
  const seg23O  = useTransform(scrollYProgress, [0.45, 0.52, 0.69, 0.77], [0, 0.85, 0.85, 0]);

  // ── Segment 3 → 4 ─ draws as circle 3 fades; stays to end
  const seg34PL = useTransform(scrollYProgress, [0.70, 0.79], [0, 1]);
  const seg34O  = useTransform(scrollYProgress, [0.70, 0.77, 0.95, 1.0], [0, 0.85, 0.85, 0.85]);

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
      style={{ height: "400vh", background: "#121212" }}
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
        {/* ── Section header ── */}
        <div
          style={{
            position: "absolute",
            top: "44px",
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
              marginBottom: "12px",
            }}
          >
            The Transformation
          </p>
          <h2
            style={{
              fontFamily: "Figtree, sans-serif",
              fontSize: "clamp(26px, 3vw, 44px)",
              fontWeight: 400,
              color: "#F5F2EC",
              lineHeight: 1.15,
            }}
          >
            What Becomes Possible
          </h2>
          <p
            style={{
              fontFamily: "Manrope, sans-serif",
              fontSize: "15px",
              color: "rgba(245,242,236,0.38)",
              marginTop: "8px",
            }}
          >
            When leaders regulate their nervous system, everything changes.
          </p>
        </div>

        {/* ── Nerve-line segments (one per transition) ── */}
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
              {/* Soft outer glow */}
              <motion.path
                d={d}
                stroke="rgba(200,169,106,0.22)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength: pl, opacity, filter: "blur(4px)" }}
              />
              {/* Crisp centre line */}
              <motion.path
                d={d}
                stroke="rgba(200,169,106,0.70)"
                strokeWidth="0.16"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength: pl, opacity }}
              />
            </React.Fragment>
          ))}
        </svg>

        {/* ── Circles — one visible at a time, all text inside ── */}
        {ITEMS.map((item, i) => (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: `${item.x}%`,
              top: `${item.y}%`,
              translateX: "-50%",
              translateY: "-50%",
              opacity: circles[i].o,
              scale: circles[i].s,
              zIndex: 5,
            }}
          >
            <div
              style={{
                width: SZ,
                height: SZ,
                borderRadius: "50%",
                border: "1px solid rgba(200,169,106,0.32)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "11%",
                // Solid background — no backdrop-filter to avoid ghost rendering at low opacity
                background: "#151515",
                boxShadow: "0 0 80px rgba(200,169,106,0.07)",
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
                  fontSize: "clamp(15px, 1.7vmin, 20px)",
                  fontWeight: 400,
                  color: "#F5F2EC",
                  lineHeight: 1.32,
                  display: "block",
                  whiteSpace: "pre-line",
                }}
              >
                {item.heading}
              </span>

              <div
                style={{
                  width: "28px",
                  height: "1px",
                  background: "rgba(200,169,106,0.32)",
                  margin: "14px auto",
                  flexShrink: 0,
                }}
              />

              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "clamp(11px, 1.2vmin, 13px)",
                  color: "rgba(245,242,236,0.48)",
                  lineHeight: 1.68,
                  maxWidth: "78%",
                  margin: 0,
                }}
              >
                {item.subtext}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
