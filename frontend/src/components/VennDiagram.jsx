import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// ── SVG viewport ────────────────────────────────────────────────────────────
const W = 1000;
const H = 490;

// ── Circle geometry ──────────────────────────────────────────────────────────
const LX = 340;   // Left circle centre X
const LY = 255;   // Shared centre Y
const RX = 660;   // Right circle centre X
const R  = 200;   // Radius

// Derived values
const INT_X   = (LX + RX) / 2;                                      // 500
const D_HALF  = (RX - LX) / 2;                                      // 160
const H_LENS  = Math.round(Math.sqrt(R * R - D_HALF * D_HALF));     // 120
const BOT_Y   = LY + H_LENS;                                         // 375
const L_EDGE  = RX - R;                                               // 460
const R_EDGE  = LX + R;                                               // 540

// ── Circle text path — CW so text at the top reads left → right ────────────
// sweep=1 (CW): leftmost → (upward via 12 o-clock) → rightmost → (downward via 6 o-clock) → back
const circPath = (cx, cy, r) =>
  `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} A ${r} ${r} 0 0 1 ${cx - r} ${cy}`;

// ── Bottom-lens mask path ────────────────────────────────────────────────────
// Traces the region where y ≥ LY inside both circles (right circle appears on
// top here, giving the interlocking / chain-link illusion).
// Start at R_EDGE (3-o-clock of left circle), arc CW down left circle to
// bottom crossing, arc CW up right circle back to L_EDGE, close path.
const BOTTOM_LENS = [
  `M ${R_EDGE} ${LY}`,
  `A ${R} ${R} 0 0 1 ${INT_X} ${BOT_Y}`,  // left circle — CW (3-o-clock down to 4-5)
  `A ${R} ${R} 0 0 1 ${L_EDGE} ${LY}`,    // right circle — CW (7-8-o-clock up to 9)
  "Z",
].join(" ");

// ── Keywords ─────────────────────────────────────────────────────────────────
// Repeated 2× — sufficient to fill circumference at 12 px font size
const L_BASE = "LEADERSHIP  ·  EXECUTIVE DEPTH  ·  SYSTEMIC CLARITY  ·  ORGANISATIONAL CHANGE  ·  ";
const R_BASE = "NERVOUS SYSTEM  ·  TRANSFORMATION  ·  NARM  ·  INTEGRAL COACHING  ·  SOMATIC AWARENESS  ·  ";
const L_TEXT = L_BASE.repeat(2);
const R_TEXT = R_BASE.repeat(2);

// ── Twisted arrow — teardrop self-crossing loop + downward S-curve ───────────
// The loop is a closed cubic bezier (P0 = P3) creating a self-intersecting
// teardrop at the lens centre.  The second segment is the downward tail.
const ARROW = [
  `M ${INT_X} ${LY + 14}`,
  `C ${INT_X + 48} ${LY - 67} ${INT_X - 48} ${LY - 97} ${INT_X} ${LY + 14}`,
  `C ${INT_X - 5} ${LY + 27} ${INT_X - 20} ${LY + 115} ${INT_X - 5} ${H - 18}`,
].join(" ");

// ─────────────────────────────────────────────────────────────────────────────

const VennDiagram = () => {
  const [paused,       setPaused]       = useState(false);
  const [arrowVisible, setArrowVisible] = useState(false);
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  // Trigger arrow once section scrolls into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setArrowVisible(true), 300);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Inline animation style — handles transform-origin and play-state
  const orbit = (side) => ({
    transformBox:      "view-box",
    transformOrigin:   `${side === "left" ? LX : RX}px ${LY}px`,
    animation:         `vennOrbit${side === "left" ? "CW" : "CCW"} ${side === "left" ? "60" : "48"}s linear infinite`,
    animationPlayState: paused ? "paused" : "running",
  });

  const textAttrs = {
    fontSize:      "12",
    fill:          "rgba(18,18,18,0.46)",
    fontFamily:    "Manrope, sans-serif",
    letterSpacing: "3.5",
  };

  return (
    <>
      {/* ── Mobile: scrolling marquee ── */}
      <section
        className="md:hidden bg-ivory py-5 overflow-hidden"
        data-testid="marquee-section"
      >
        <div className="marquee-outer">
          <div className="marquee-track">
            {[t.home.marquee, t.home.marquee].map((text, i) => (
              <span
                key={i}
                className="ct-overline text-charcoal/40 pr-8"
                style={{ fontSize: "10px" }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop: SVG Venn ── */}
      <section
        ref={sectionRef}
        className="hidden md:block bg-ivory"
        style={{ paddingTop: "56px", paddingBottom: "0" }}
        data-testid="venn-section"
      >
        <svg
          viewBox={`0 0 ${W} ${H}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full block"
          style={{ maxHeight: `${H}px` }}
          aria-hidden="true"
        >
          <defs>
            {/* Text orbit paths */}
            <path id="vennLeft"  d={circPath(LX, LY, R)} />
            <path id="vennRight" d={circPath(RX, LY, R)} />

            {/* Filter: make black background of CT logo transparent */}
            <filter id="removeBlackBg" colorInterpolationFilters="sRGB">
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        1 1 1 -1 0"
              />
            </filter>

            {/* Arrow marker — Gold open chevron */}
            <marker
              id="vennArrowHead"
              markerWidth="14" markerHeight="14"
              refX="7" refY="7"
              orient="auto"
            >
              <path
                d="M 2 2 L 12 7 L 2 12"
                fill="none"
                stroke="#C8A96A"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </marker>

            {/* Bottom-lens mask — right circle text sits on top here */}
            <mask id="bottomLensMask">
              <rect width={W} height={H} fill="black" />
              <path d={BOTTOM_LENS} fill="white" />
            </mask>
          </defs>

          {/* ─ Layer 1: Right circle text (base layer, everywhere) ─ */}
          <g style={orbit("right")}>
            <text {...textAttrs}>
              <textPath href="#vennRight">{R_TEXT}</textPath>
            </text>
          </g>

          {/* ─ Layer 2: Left circle text (on top — dominates top-lens area) ─ */}
          <g style={orbit("left")}>
            <text {...textAttrs}>
              <textPath href="#vennLeft">{L_TEXT}</textPath>
            </text>
          </g>

          {/* ─ Layer 3: Right circle text masked to bottom-lens only
                        (right circle appears in front of left circle here,
                        creating the interlocking chain-link illusion) ─ */}
          <g mask="url(#bottomLensMask)" style={orbit("right")}>
            <text {...textAttrs}>
              <textPath href="#vennRight">{R_TEXT}</textPath>
            </text>
          </g>

          {/* ─ CT logo mark at intersection centre (replaces "Integration" text) ─ */}
          <image
            href="https://customer-assets.emergentagent.com/job_nervous-system-exec/artifacts/k6ify51i_Cornelia%20Trompke%20Logo%20Mark.png"
            x={INT_X - 28}
            y={LY - 28}
            width="56"
            height="56"
            filter="url(#removeBlackBg)"
          />

          {/* ─ Circle heading labels ─ */}
          <text
            x={LX} y={LY}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="18"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fill="rgba(18,18,18,0.30)"
            letterSpacing="2"
          >
            Executive
          </text>
          <text
            x={RX} y={LY}
            textAnchor="middle" dominantBaseline="middle"
            fontSize="18"
            fontFamily="Cormorant Garamond, serif"
            fontStyle="italic"
            fill="rgba(18,18,18,0.30)"
            letterSpacing="2"
          >
            Advisory
          </text>

          {/* ─ Invisible hover targets — pause orbit on circle hover ─ */}
          <circle
            cx={LX} cy={LY} r={R}
            fill="transparent"
            style={{ cursor: "default" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          />
          <circle
            cx={RX} cy={LY} r={R}
            fill="transparent"
            style={{ cursor: "default" }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          />

          {/* ─ Scroll-triggered Gold S-curve arrow ─ */}
          <motion.path
            d={ARROW}
            fill="none"
            stroke="#C8A96A"
            strokeWidth="2.2"
            strokeLinecap="round"
            markerEnd="url(#vennArrowHead)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: arrowVisible ? 1 : 0,
              opacity:    arrowVisible ? 1 : 0,
            }}
            transition={{
              pathLength: { duration: 1.6, ease: [0.4, 0, 0.2, 1] },
              opacity:    { duration: 0.4, ease: "easeOut" },
            }}
          />
        </svg>
      </section>
    </>
  );
};

export default VennDiagram;
