import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Left / right alternating positions — same y per side for consistency.
// On 1280×800: left circle (x:22) center at 282px, right (x:78) at 998px.
// 450px circle radius = 225px — both stay within screen.
const ITEMS = [
  {
    number: "01",
    heading: "From Reactive\nto Responsive",
    subtext: "Lead from clarity rather than fear, even under extraordinary pressure.",
    x: 22, y: 51,   // LEFT
  },
  {
    number: "02",
    heading: "From Isolation\nto Influence",
    subtext: "Build cultures of trust that attract and retain exceptional talent.",
    x: 78, y: 55,   // RIGHT
  },
  {
    number: "03",
    heading: "From Depletion\nto Sustainability",
    subtext: "Your capacity grows rather than diminishes with the demands of leadership.",
    x: 22, y: 51,   // LEFT
  },
  {
    number: "04",
    heading: "From Performance\nto Presence",
    subtext: "Bring your full intelligence to every room, every decision, every relationship.",
    x: 78, y: 55,   // RIGHT
  },
];

// Wavy two-segment cubic bezier paths (viewBox 0 0 100 100)
// C1 (22,51) ↔ C2 (78,55) — diagonal with organic waves
const SEG12 = "M 22,51 C 36,44 43,63 50,52 C 57,41 65,63 78,55";
// C2 (78,55) ↔ C3 (22,51) — return wave, mirrored rhythm
const SEG23 = "M 78,55 C 64,48 57,65 50,55 C 43,45 36,64 22,51";
// C3 (22,51) ↔ C4 (78,55) — same diagonal as SEG12
const SEG34 = "M 22,51 C 36,44 43,63 50,52 C 57,41 65,63 78,55";

// 500vh: 4 individual phases (×100vh each) + 1 final all-4 phase (×100vh)
// scrollYProgress 0–0.80 = individual; 0.80–1.0 = final row

const CIRCLE_LARGE = 450;  // individual view
const CIRCLE_SMALL = 178;  // final all-4 row

export default function TransformationSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // ── Circles (slower: enter/exit over 0.12 each) ──────────────────

  // C1: visible from start, slow exit
  const c1o = useTransform(scrollYProgress, [0, 0.15, 0.24], [1, 1, 0]);
  const c1s = useTransform(scrollYProgress, [0, 0.15, 0.24], [1, 1, 0.92]);

  // C2: slow fade-in at 0.22, slow fade-out at 0.36
  const c2o = useTransform(scrollYProgress, [0.22, 0.34, 0.36, 0.46], [0, 1, 1, 0]);
  const c2s = useTransform(scrollYProgress, [0.22, 0.34, 0.36, 0.46], [0.84, 1, 1, 0.92]);

  // C3
  const c3o = useTransform(scrollYProgress, [0.42, 0.54, 0.56, 0.66], [0, 1, 1, 0]);
  const c3s = useTransform(scrollYProgress, [0.42, 0.54, 0.56, 0.66], [0.84, 1, 1, 0.92]);

  // C4 individual — exits before final row
  const c4o = useTransform(scrollYProgress, [0.62, 0.74, 0.76, 0.84], [0, 1, 1, 0]);
  const c4s = useTransform(scrollYProgress, [0.62, 0.74, 0.76, 0.84], [0.84, 1, 1, 0.92]);

  // ── Wavy segments (slower draw: over 0.14, visible until exit) ────

  // Seg 1→2
  const seg12PL = useTransform(scrollYProgress, [0.15, 0.30], [0, 1]);
  const seg12O  = useTransform(scrollYProgress, [0.15, 0.24, 0.36, 0.46], [0, 0.85, 0.85, 0]);

  // Seg 2→3
  const seg23PL = useTransform(scrollYProgress, [0.35, 0.50], [0, 1]);
  const seg23O  = useTransform(scrollYProgress, [0.35, 0.46, 0.56, 0.66], [0, 0.85, 0.85, 0]);

  // Seg 3→4
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
      style={{ height: "500vh", background: "#121212" }}
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
        {/* ── Header — compact spacing ────────────────────────────── */}
        <div
          style={{
            position: "absolute",
            top: "28px",
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
              fontSize: "clamp(26px, 3vw, 42px)",
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

        {/* ── Wavy nerve segments ─────────────────────────────────── */}
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
                stroke="rgba(200,169,106,0.18)"
                strokeWidth="2.0"
                fill="none"
                strokeLinecap="round"
                style={{ pathLength: pl, opacity, filter: "blur(6px)" }}
              />
              {/* Crisp centre line */}
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

        {/* ── Individual circles ──────────────────────────────────── */}
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
                width: `${CIRCLE_LARGE}px`,
                height: `${CIRCLE_LARGE}px`,
                borderRadius: "50%",
                border: "1px solid rgba(200,169,106,0.30)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "10%",
                background: "#151515",
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
                  fontSize: "clamp(24px, 2.4vw, 30px)",
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
                  fontSize: "clamp(14px, 1.4vw, 18px)",
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
        ))}

        {/* ── Final view: all 4 circles in a row ─────────────────── */}
        <motion.div
          style={{
            position: "absolute",
            top: "108px",          // clears the header
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "22px",
            paddingLeft: "24px",
            paddingRight: "24px",
            opacity: finalO,
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          {/* Subtle horizontal connector behind circles */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "5%",
              right: "5%",
              height: "1px",
              background:
                "linear-gradient(to right, transparent 0%, rgba(200,169,106,0.25) 15%, rgba(200,169,106,0.25) 85%, transparent 100%)",
              zIndex: 0,
            }}
          />

          {ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                width: `${CIRCLE_SMALL}px`,
                height: `${CIRCLE_SMALL}px`,
                flexShrink: 0,
                borderRadius: "50%",
                border: "1px solid rgba(200,169,106,0.28)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "13%",
                background: "#151515",
                boxShadow: "0 0 40px rgba(200,169,106,0.06)",
                textAlign: "center",
                boxSizing: "border-box",
                position: "relative",
                zIndex: 1,
              }}
            >
              <span
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "9px",
                  letterSpacing: "0.22em",
                  color: "#C8A96A",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                {item.number}
              </span>
              <span
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: "13px",
                  fontWeight: 400,
                  color: "#F5F2EC",
                  lineHeight: 1.3,
                  display: "block",
                  whiteSpace: "pre-line",
                }}
              >
                {item.heading}
              </span>
              <div
                style={{
                  width: "18px",
                  height: "1px",
                  background: "rgba(200,169,106,0.30)",
                  margin: "8px auto",
                  flexShrink: 0,
                }}
              />
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "10px",
                  color: "rgba(245,242,236,0.42)",
                  lineHeight: 1.65,
                  maxWidth: "86%",
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
