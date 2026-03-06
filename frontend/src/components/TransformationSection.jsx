import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ITEMS = [
  {
    number: "01",
    heading: "From Reactive to Responsive",
    subtext: "Lead from clarity rather than fear, even under extraordinary pressure.",
    x: 50, y: 30,
  },
  {
    number: "02",
    heading: "From Isolation to Influence",
    subtext: "Build cultures of trust that attract and retain exceptional talent.",
    x: 17, y: 50,
  },
  {
    number: "03",
    heading: "From Depletion to Sustainability",
    subtext: "Your capacity grows rather than diminishes with the demands of leadership.",
    x: 76, y: 67,
  },
  {
    number: "04",
    heading: "From Performance to Presence",
    subtext: "Bring your full intelligence to every room, every decision, every relationship.",
    x: 25, y: 76,
  },
];

// Wavy nerve path connecting all 4 circle centres (viewBox 0 0 100 100)
const NERVE_PATH =
  "M 50,30 C 58,38 8,44 17,50 C 26,56 92,60 76,67 C 60,74 4,72 25,76";

export default function TransformationSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Nerve line draws continuously 0 → 1
  const pathLength = useTransform(scrollYProgress, [0.04, 0.94], [0, 1]);

  // ── Circle 1 — enter then exit ──────────────────────────────
  const c1o = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0, 1, 1, 0]);
  const c1s = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [0.7, 1, 1, 0.85]);
  const c1y = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.3], [24, 0, 0, -18]);

  // ── Circle 2 — enter then exit ──────────────────────────────
  const c2o = useTransform(scrollYProgress, [0.28, 0.38, 0.5, 0.6], [0, 1, 1, 0]);
  const c2s = useTransform(scrollYProgress, [0.28, 0.38, 0.5, 0.6], [0.7, 1, 1, 0.85]);
  const c2y = useTransform(scrollYProgress, [0.28, 0.38, 0.5, 0.6], [24, 0, 0, -18]);

  // ── Circle 3 — enter then exit ──────────────────────────────
  const c3o = useTransform(scrollYProgress, [0.58, 0.68, 0.8, 0.88], [0, 1, 1, 0]);
  const c3s = useTransform(scrollYProgress, [0.58, 0.68, 0.8, 0.88], [0.7, 1, 1, 0.85]);
  const c3y = useTransform(scrollYProgress, [0.58, 0.68, 0.8, 0.88], [24, 0, 0, -18]);

  // ── Circle 4 — enters and stays ─────────────────────────────
  const c4o = useTransform(scrollYProgress, [0.86, 0.96], [0, 1]);
  const c4s = useTransform(scrollYProgress, [0.86, 0.96], [0.7, 1]);
  const c4y = useTransform(scrollYProgress, [0.86, 0.96], [24, 0]);

  const anims = [
    { opacity: c1o, scale: c1s, y: c1y },
    { opacity: c2o, scale: c2s, y: c2y },
    { opacity: c3o, scale: c3s, y: c3y },
    { opacity: c4o, scale: c4s, y: c4y },
  ];

  return (
    <>
      <style>{`
        @keyframes nerveGlow {
          0%, 100% { opacity: 0.2; }
          50%       { opacity: 0.7; }
        }
        .nerve-halo { animation: nerveGlow 3s ease-in-out infinite; }
      `}</style>

      <section
        ref={sectionRef}
        style={{ height: "180vh", background: "#121212" }}
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
          {/* ── Header ── */}
          <div
            style={{
              position: "absolute",
              top: "48px",
              left: 0,
              right: 0,
              textAlign: "center",
              zIndex: 10,
            }}
          >
            <p
              style={{
                fontFamily: "Manrope, sans-serif",
                fontSize: "11px",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#C8A96A",
                marginBottom: "14px",
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
                color: "rgba(245,242,236,0.4)",
                marginTop: "10px",
              }}
            >
              When leaders regulate their nervous system, everything changes.
            </p>
          </div>

          {/* ── SVG nerve line (no nodes) ── */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 1,
            }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {/* Outer glow — pulses */}
            <motion.path
              className="nerve-halo"
              d={NERVE_PATH}
              stroke="rgba(200,169,106,0.18)"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength, filter: "blur(5px)" }}
            />
            {/* Mid glow */}
            <motion.path
              className="nerve-halo"
              d={NERVE_PATH}
              stroke="rgba(200,169,106,0.28)"
              strokeWidth="0.55"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength, filter: "blur(1.5px)" }}
            />
            {/* Crisp centre line */}
            <motion.path
              d={NERVE_PATH}
              stroke="rgba(200,169,106,0.6)"
              strokeWidth="0.16"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength }}
            />
          </svg>

          {/* ── Circles — one visible at a time ── */}
          {ITEMS.map((item, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                left: `${item.x}%`,
                top: `${item.y}%`,
                translateX: "-50%",
                translateY: "-50%",
                opacity: anims[i].opacity,
                scale: anims[i].scale,
                y: anims[i].y,
                textAlign: "center",
                zIndex: 5,
              }}
            >
              {/* Circle */}
              <div
                style={{
                  width: "280px",
                  height: "280px",
                  borderRadius: "50%",
                  border: "1px solid rgba(200,169,106,0.35)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "36px",
                  background: "rgba(18,18,18,0.85)",
                  backdropFilter: "blur(16px)",
                  boxShadow:
                    "0 0 60px rgba(200,169,106,0.08), inset 0 0 0 1px rgba(200,169,106,0.08)",
                  margin: "0 auto",
                }}
              >
                <span
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "10px",
                    letterSpacing: "0.22em",
                    color: "#C8A96A",
                    marginBottom: "10px",
                    display: "block",
                  }}
                >
                  {item.number}
                </span>
                <span
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontSize: "15px",
                    fontWeight: 400,
                    color: "#F5F2EC",
                    lineHeight: 1.38,
                    display: "block",
                  }}
                >
                  {item.heading}
                </span>
              </div>

              {/* Subtext */}
              <p
                style={{
                  maxWidth: "220px",
                  margin: "12px auto 0",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "12px",
                  color: "rgba(245,242,236,0.45)",
                  lineHeight: 1.65,
                }}
              >
                {item.subtext}
              </p>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
