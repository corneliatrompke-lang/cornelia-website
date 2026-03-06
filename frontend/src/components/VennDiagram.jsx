import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// ── SVG viewport ────────────────────────────────────────────────────────────
const W = 1000;
const H = 620; // Extended to give the arrow room below the circles

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

// ── Arrow SVG paths (from Venn arrow.svg — native viewBox 0 0 800 1755.029) ───
// Two filled paths; coloured gold and flipped vertically so the chevron
// (originally at the top/y≈0-420) ends up at the BOTTOM, pointing toward
// the heading section below.
// Transform: translate(427, 607) scale(0.183, -0.183)
//   • places the arrow from (427,286) to (573,607) — centred at INT_X=500
//   • negative scaleY flips the image so chevron faces down
const ARROW_P1 = "M420.28,1755.028c-8.777,0-17.428-4.183-22.759-11.991c-244.223-356.513-239.178-609.603-185.833-764.615c-61.837-50.491-110.874-121.141-136.29-212.324C24.906,584.897,65.076,401.004,191.586,234.307C285.982,109.916,393.858,39.589,398.4,36.646c12.798-8.258,29.833-4.56,38.106,8.22c8.258,12.78,4.579,29.833-8.185,38.108c-4.128,2.674-410.507,271.145-299.793,668.333c20.946,75.155,58.606,132.072,105.023,173.608c8.992-18.847,18.469-35.684,27.821-50.493c102.097-161.672,273.354-227.69,389.865-209.273c73.288,11.559,124.946,55.786,141.711,121.321c31.735,124.049-45.609,233.756-192.49,273.012c-111.863,29.921-238.568,14.43-341.562-47.8c-43.815,143.453-39.382,373.943,184.109,700.194c8.615,12.565,5.402,29.725-7.163,38.323C431.085,1753.466,425.647,1755.028,420.28,1755.028zM278.586,958.948c97.791,62.015,218.86,70.972,307.639,47.261c93.229-24.915,182.456-92.135,153.307-206.062c-14.379-56.2-60.617-74.814-96.892-80.521c-96.138-15.258-246.232,44.245-334.651,184.252C298.008,919.673,287.921,938,278.586,958.948z";
const ARROW_P2 = "M377.902,420.408c-2.064,0-4.165-0.233-6.282-0.719c-14.827-3.465-24.034-18.272-20.588-33.118c30.943-132.754,60.723-281.736,64.098-332.478c-55.286,1.722-227.745,28.558-382.559,57.078c-14.952,2.674-29.33-7.143-32.112-22.132C-2.288,74.071,7.602,59.693,22.59,56.929c408.783-75.28,425.783-58.157,437.072-46.866c11.541,11.559,28.99,29.006-54.926,389.038C401.774,411.828,390.43,420.408,377.902,420.408zM415.021,39.464L415.021,39.464L415.021,39.464z";

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

          {/* ─ Scroll-triggered arrow (from Venn arrow.svg, gold, flipped) ─
               Transform: translate(427,607) scale(0.183,-0.183)
               • centres the 800px-wide shape at INT_X=500 (427+146/2≈500)
               • negative scaleY flips so chevron faces downward toward heading ─ */}
          <motion.g
            transform="translate(427, 607) scale(0.183, -0.183)"
            initial={{ opacity: 0 }}
            animate={{ opacity: arrowVisible ? 0.88 : 0 }}
            transition={{ duration: 1.6, ease: [0.4, 0, 0.2, 1], delay: 0.4 }}
          >
            <path fill="#C8A96A" d={ARROW_P1} />
            <path fill="#C8A96A" d={ARROW_P2} />
          </motion.g>
        </svg>
      </section>
    </>
  );
};

export default VennDiagram;
