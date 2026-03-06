import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ITEMS = [
  {
    number: "01",
    heading: "From Reactive to Responsive",
    subtext: "Lead from clarity rather than fear, even under extraordinary pressure.",
    x: 50, y: 34,
  },
  {
    number: "02",
    heading: "From Isolation to Influence",
    subtext: "Build cultures of trust that attract and retain exceptional talent.",
    x: 17, y: 53,
  },
  {
    number: "03",
    heading: "From Depletion to Sustainability",
    subtext: "Your capacity grows rather than diminishes with the demands of leadership.",
    x: 76, y: 70,
  },
  {
    number: "04",
    heading: "From Performance to Presence",
    subtext: "Bring your full intelligence to every room, every decision, every relationship.",
    x: 25, y: 85,
  },
];

// SVG path through circle centers (viewBox 0 0 100 100, preserveAspectRatio none)
// Each C-end matches the circle's x,y position exactly
const NERVE_PATH =
  "M 50,34 C 58,40 10,46 17,53 C 24,60 90,60 76,70 C 62,80 6,82 25,85";

// Pulse nodes at each circle centre
const NODES = ITEMS.map((it) => ({ cx: it.x, cy: it.y }));

export default function TransformationSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Nerve line draws as user scrolls through the section
  const pathLength = useTransform(scrollYProgress, [0.04, 0.86], [0, 1]);

  // Circle 1 — centre, visible immediately
  const c1o = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const c1s = useTransform(scrollYProgress, [0, 0.12], [0.55, 1]);
  const c1y = useTransform(scrollYProgress, [0, 0.12], [28, 0]);

  // Circle 2 — left
  const c2o = useTransform(scrollYProgress, [0.26, 0.4], [0, 1]);
  const c2s = useTransform(scrollYProgress, [0.26, 0.4], [0.55, 1]);
  const c2y = useTransform(scrollYProgress, [0.26, 0.4], [28, 0]);

  // Circle 3 — right
  const c3o = useTransform(scrollYProgress, [0.48, 0.62], [0, 1]);
  const c3s = useTransform(scrollYProgress, [0.48, 0.62], [0.55, 1]);
  const c3y = useTransform(scrollYProgress, [0.48, 0.62], [28, 0]);

  // Circle 4 — left
  const c4o = useTransform(scrollYProgress, [0.68, 0.82], [0, 1]);
  const c4s = useTransform(scrollYProgress, [0.68, 0.82], [0.55, 1]);
  const c4y = useTransform(scrollYProgress, [0.68, 0.82], [28, 0]);

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
          0%, 100% { opacity: 0.25; }
          50%       { opacity: 0.75; }
        }
        @keyframes nodePulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1;   }
        }
        .nerve-halo { animation: nerveGlow  3s ease-in-out infinite; }
        .nerve-node { animation: nodePulse  2.4s ease-in-out infinite; }
      `}</style>

      <section
        ref={sectionRef}
        style={{ height: "320vh", background: "#121212" }}
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

          {/* ── SVG nerve line ── */}
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
            {/* Outer halo — pulsing glow */}
            <motion.path
              className="nerve-halo"
              d={NERVE_PATH}
              stroke="rgba(200,169,106,0.18)"
              strokeWidth="1.4"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength, filter: "blur(4px)" }}
            />
            {/* Inner halo */}
            <motion.path
              className="nerve-halo"
              d={NERVE_PATH}
              stroke="rgba(200,169,106,0.3)"
              strokeWidth="0.6"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength, filter: "blur(1px)" }}
            />
            {/* Crisp centre line */}
            <motion.path
              d={NERVE_PATH}
              stroke="rgba(200,169,106,0.65)"
              strokeWidth="0.18"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength }}
            />
            {/* Pulsing nodes at each circle centre */}
            {NODES.map((n, i) => (
              <circle
                key={i}
                className="nerve-node"
                cx={n.cx}
                cy={n.cy}
                r="0.8"
                fill="#C8A96A"
                style={{ animationDelay: `${i * 0.6}s` }}
              />
            ))}
          </svg>

          {/* ── Circles ── */}
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
                  width: "196px",
                  height: "196px",
                  borderRadius: "50%",
                  border: "1px solid rgba(200,169,106,0.3)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "28px",
                  background: "rgba(18,18,18,0.82)",
                  backdropFilter: "blur(14px)",
                  boxShadow:
                    "0 0 48px rgba(200,169,106,0.07), inset 0 0 0 1px rgba(200,169,106,0.07)",
                  margin: "0 auto",
                }}
              >
                <span
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "9.5px",
                    letterSpacing: "0.22em",
                    color: "#C8A96A",
                    marginBottom: "9px",
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
                    lineHeight: 1.35,
                    display: "block",
                  }}
                >
                  {item.heading}
                </span>
              </div>

              {/* Subtext */}
              <p
                style={{
                  maxWidth: "172px",
                  margin: "10px auto 0",
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "11px",
                  color: "rgba(245,242,236,0.42)",
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
