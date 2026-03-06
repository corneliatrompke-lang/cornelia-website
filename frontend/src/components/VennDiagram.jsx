import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// Two distinct keyword sets
const LEFT_TEXT  = "EXECUTIVE DEPTH  ·  SYSTEMIC CLARITY  ·  ORGANISATIONAL CHANGE  ·  LEADERSHIP  ·  ";
const RIGHT_TEXT = "NERVOUS SYSTEM  ·  TRANSFORMATION  ·  NARM  ·  INTEGRAL COACHING  ·  ";

// SVG viewport
const W  = 900;
const H  = 480;

// Circle geometry
const LX = 320;  // left circle centre x
const LY = 210;  // left circle centre y (shared y)
const RX = 580;  // right circle centre x
const R  = 185;  // radius

// Intersection lens bottom tip:
//   y = LY + sqrt(R² - (midX - LX)²)
//   midX = (LX + RX) / 2 = 450
//   y = 210 + sqrt(185² - 130²) ≈ 210 + 131.6 = 341.6
const INT_X      = (LX + RX) / 2;   // 450
const INT_Y_BOTTOM = 344;            // ≈ bottom tip of lens

const VennDiagram = () => {
  const [hovered, setHovered] = useState(false);
  const { t } = useLanguage();

  return (
    <>
      {/* ── Mobile: keep original scrolling marquee ── */}
      <section
        className="md:hidden bg-stone py-5 overflow-hidden"
        data-testid="marquee-section"
      >
        <div className="marquee-outer">
          <div className="marquee-track">
            {[t.home.marquee, t.home.marquee].map((text, i) => (
              <span
                key={i}
                className="ct-overline text-charcoal/50 pr-8"
                style={{ fontSize: "10px" }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop: Venn diagram ── */}
      <section
        className="hidden md:block bg-stone relative"
        style={{ paddingTop: "50px", paddingBottom: "60px" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        data-testid="venn-section"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full block"
          style={{ maxHeight: "440px", margin: "0 auto" }}
          aria-hidden="true"
        >
          <defs>
            {/* ── Circular orbit paths for text ── */}
            <path
              id="vennLeftOrbit"
              d={`M ${LX},${LY} m -${R},0 a ${R},${R} 0 1,1 ${2*R},0 a ${R},${R} 0 1,1 -${2*R},0`}
            />
            <path
              id="vennRightOrbit"
              d={`M ${RX},${LY} m -${R},0 a ${R},${R} 0 1,1 ${2*R},0 a ${R},${R} 0 1,1 -${2*R},0`}
            />

            {/* ── Clip path to shade intersection ── */}
            <clipPath id="vennLeftClip">
              <circle cx={LX} cy={LY} r={R} />
            </clipPath>

            {/* ── Open chevron arrowhead ── */}
            <marker
              id="vennArrowHead"
              markerWidth="12"
              markerHeight="12"
              refX="6"
              refY="6"
              orient="auto"
            >
              <path
                d="M 2,2 L 10,6 L 2,10"
                fill="none"
                stroke="rgba(18,18,18,0.45)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>
          </defs>

          {/* ── Subtle fills ── */}
          <circle cx={LX} cy={LY} r={R} fill="rgba(18,18,18,0.016)" stroke="none" />
          <circle cx={RX} cy={LY} r={R} fill="rgba(18,18,18,0.016)" stroke="none" />
          {/* Intersection – slightly more opaque */}
          <circle cx={RX} cy={LY} r={R} fill="rgba(18,18,18,0.022)" clipPath="url(#vennLeftClip)" stroke="none" />

          {/* ── Circle outlines ── */}
          <circle cx={LX} cy={LY} r={R} fill="none" stroke="rgba(18,18,18,0.13)" strokeWidth="1" />
          <circle cx={RX} cy={LY} r={R} fill="none" stroke="rgba(18,18,18,0.13)" strokeWidth="1" />

          {/* ── Left orbit text ── */}
          <g className={hovered ? "venn-orbit-left venn-orbit-paused" : "venn-orbit-left"}>
            <text
              fontSize="9"
              fill="rgba(18,18,18,0.50)"
              fontFamily="Manrope, sans-serif"
              letterSpacing="2.5"
            >
              <textPath href="#vennLeftOrbit">{LEFT_TEXT}</textPath>
            </text>
          </g>

          {/* ── Right orbit text (spins opposite direction) ── */}
          <g className={hovered ? "venn-orbit-right venn-orbit-paused" : "venn-orbit-right"}>
            <text
              fontSize="9"
              fill="rgba(18,18,18,0.50)"
              fontFamily="Manrope, sans-serif"
              letterSpacing="2.5"
            >
              <textPath href="#vennRightOrbit">{RIGHT_TEXT}</textPath>
            </text>
          </g>

          {/* ── Intersection label ── */}
          <text
            x={INT_X}
            y={LY}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
            fill="rgba(18,18,18,0.28)"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            letterSpacing="2"
          >
            Integration
          </text>

          {/* ── Curved arrow – emerges on hover ──
               Starts at the bottom tip of the intersection lens,
               curves in a gentle S-shape, arrowhead points downward
               toward the next section's heading. ── */}
          <motion.path
            d={`M ${INT_X},${INT_Y_BOTTOM + 4}
                C ${INT_X - 38},${INT_Y_BOTTOM + 52}
                  ${INT_X + 30},${INT_Y_BOTTOM + 80}
                  ${INT_X - 5},${H - 14}`}
            fill="none"
            stroke="rgba(18,18,18,0.42)"
            strokeWidth="1.3"
            strokeLinecap="round"
            markerEnd="url(#vennArrowHead)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: hovered ? 1 : 0, opacity: hovered ? 1 : 0 }}
            transition={{ duration: 0.72, ease: [0.4, 0, 0.2, 1] }}
          />
        </svg>
      </section>
    </>
  );
};

export default VennDiagram;
