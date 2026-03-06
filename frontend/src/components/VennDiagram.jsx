import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// ── SVG viewport ────────────────────────────────────────────────────────────
const W = 1000;
const H = 650; // Extended to give chevron room below circles

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

// ── Arrow SVG data (from Venn arrow3.svg — native viewBox 0 0 3000 3000) ─────
// Stroke-based path + filled polygon arrowhead.
// Path flows top-left → bottom-right; polygon chevron is already at the bottom,
// so NO vertical flip is needed.
// Transform: translate(450, 253) scale(0.033, 0.129)
//   • maps path bounding box (x 300-2711, y 253-2746) into SVG units:
//     width 80px centred at INT_X=500; height 321px from y=286 to y=607
//   • vectorEffect="non-scaling-stroke" keeps stroke at a fixed 2px regardless of scale
const ARROW_PATH = "M300.561,253.553c-15.914,70.003-23.502,160.711,38.749,196.467c51.57,29.621,115.255-0.867,168.63-27.094c120.933-59.424,277.616-93.406,381.844-8.01c11.224,9.197,21.8,20.056,26.627,33.741c12.947,36.703-19.027,72.681-48.13,98.524c-187.353,166.367-389.068,354.299-418.554,603.116c-9.321,78.659,6.455,170.42,73.444,212.688c44.586,28.131,102.813,27.214,152.488,9.562c49.675-17.653,92.526-50.127,133.633-83.134c175.773-141.138,336.186-301.146,517.448-435.162s389.329-243.112,613.937-262.276c62.071-5.296,144.859,14.092,148.251,76.296c2.076,38.069-29.316,68.697-58.311,93.452c-218.065,186.176-445.786,361.355-654.48,557.978s-399.598,417.051-527.953,673.447c-53.303,106.476-92.369,243.922-18.103,336.996c44.494,55.763,121.164,78.995,192.183,72.247c71.019-6.748,137.096-39.732,196.195-79.689c190.523-128.813,319.126-327.91,462.185-507.982s320.635-354.011,546.945-394.943c53.501-9.677,119.18-6.28,148.091,39.765c30.309,48.272,0.959,111.088-31.733,157.779c-177.951,254.155-460.732,429.965-599.912,707.255c-21.492,42.819-38.064,97.94-8.422,135.579c37.636,47.79,112.848,27.15,169.235,4.322c113.133-45.803,285.316-169.326,409.542-95.691c71.166,42.185,99.683,129.332,162.712,181.171c4.677,3.847,9.417,7.612,14.206,11.308";
const ARROW_POLY = "2318.201,2675.158 2710.598,2746.461 2576.181,2370.952";

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

          {/* ─ CT logo mark at intersection centre ─ */}
          <image
            href="/ct-logo-mark.png"
            x={INT_X - 28}
            y={LY - 28}
            width="56"
            height="56"
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

          {/* ─ Scroll-triggered arrow (Venn arrow3.svg, gold, uniform scale + rotation) ─
               transform reads right-to-left:
               1. translate(-300.561,-253.553) — move path start to origin
               2. scale(0.1)                  — uniform scale (preserves proportions)
               3. rotate(43.6)                — tilt 43.6° CW so start→end goes straight down
               4. translate(500,283)          — place start at logo bottom, INT_X=500
               Result: start=(500,283), end≈(500,607) — both centre-aligned ─ */}
          <motion.g
            transform="translate(500, 283) rotate(43.6) scale(0.1) translate(-300.561, -253.553)"
            initial={{ opacity: 0 }}
            animate={{ opacity: arrowVisible ? 0.88 : 0 }}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
          >
            <path
              d={ARROW_PATH}
              fill="none"
              stroke="#C8A96A"
              strokeWidth="2"
              strokeLinecap="round"
              strokeMiterlimit="10"
              vectorEffect="non-scaling-stroke"
            />
            <polygon points={ARROW_POLY} fill="#C8A96A" />
          </motion.g>
        </svg>
      </section>
    </>
  );
};

export default VennDiagram;
