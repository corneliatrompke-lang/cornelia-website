import React, { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

// ── SVG viewport ────────────────────────────────────────────────────────────
const W = 1000;
const H = 650;
const LY = 255;
const R = 200;

// Final (resting) circle positions
const LX_FINAL = 340;
const RX_FINAL = 660;
// Starting positions — well outside the SVG viewBox (W=1000, R=200)
// At LX_START=-300: right edge at -300+200=-100 → 100px off-screen left
const LX_START = -300;
const RX_START = 1300;  // left edge at 1300-200=1100 → 100px off-screen right

// ── Circle text path — CW so text at the top reads left → right ─────────────
const circPath = (cx, cy, r) =>
  `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy} A ${r} ${r} 0 0 1 ${cx - r} ${cy}`;

// ── Keywords ─────────────────────────────────────────────────────────────────
const L_BASE = "LEADERSHIP  ·  EXECUTIVE DEPTH  ·  SYSTEMIC CLARITY  ·  ORGANISATIONAL CHANGE  ·  ";
const R_BASE = "NERVOUS SYSTEM  ·  TRANSFORMATION  ·  NARM  ·  INTEGRAL COACHING  ·  SOMATIC AWARENESS  ·  ";
const L_TEXT = L_BASE.repeat(2);
const R_TEXT = R_BASE.repeat(2);

// ── Arrow ────────────────────────────────────────────────────────────────────
const ARROW_PATH = "M300.561,253.553c-15.914,70.003-23.502,160.711,38.749,196.467c51.57,29.621,115.255-0.867,168.63-27.094c120.933-59.424,277.616-93.406,381.844-8.01c11.224,9.197,21.8,20.056,26.627,33.741c12.947,36.703-19.027,72.681-48.13,98.524c-187.353,166.367-389.068,354.299-418.554,603.116c-9.321,78.659,6.455,170.42,73.444,212.688c44.586,28.131,102.813,27.214,152.488,9.562c49.675-17.653,92.526-50.127,133.633-83.134c175.773-141.138,336.186-301.146,517.448-435.162s389.329-243.112,613.937-262.276c62.071-5.296,144.859,14.092,148.251,76.296c2.076,38.069-29.316,68.697-58.311,93.452c-218.065,186.176-445.786,361.355-654.48,557.978s-399.598,417.051-527.953,673.447c-53.303,106.476-92.369,243.922-18.103,336.996c44.494,55.763,121.164,78.995,192.183,72.247c71.019-6.748,137.096-39.732,196.195-79.689c190.523-128.813,319.126-327.91,462.185-507.982s320.635-354.011,546.945-394.943c53.501-9.677,119.18-6.28,148.091,39.765c30.309,48.272,0.959,111.088-31.733,157.779c-177.951,254.155-460.732,429.965-599.912,707.255c-21.492,42.819-38.064,97.94-8.422,135.579c37.636,47.79,112.848,27.15,169.235,4.322c113.133-45.803,285.316-169.326,409.542-95.691c71.166,42.185,99.683,129.332,162.712,181.171c4.677,3.847,9.417,7.612,14.206,11.308";
const ARROW_POLY = "2318.201,2675.158 2710.598,2746.461 2576.181,2370.952";

// ─────────────────────────────────────────────────────────────────────────────

const VennDiagram = () => {
  const outerRef = useRef(null);
  const [lx, setLx] = useState(LX_START);
  const [rx, setRx] = useState(RX_START);
  const [paused, setPaused] = useState(false);
  const { t } = useLanguage();

  // Scroll tracking on the outer 280vh container
  const { scrollYProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end end"],
  });

  // Phase 1 (0 → 0.6): circles converge to final positions
  const lxMotion = useTransform(scrollYProgress, [0, 0.6], [LX_START, LX_FINAL]);
  const rxMotion = useTransform(scrollYProgress, [0, 0.6], [RX_START, RX_FINAL]);

  // Phase 2 (0.65 → 0.82): arrow fades in after circles fully meet
  const arrowOpacity = useTransform(scrollYProgress, [0.65, 0.82], [0, 0.88]);

  // Labels + logo fade in as circles close in
  const labelOpacity = useTransform(scrollYProgress, [0.42, 0.62], [0, 1]);

  useMotionValueEvent(lxMotion, "change", (v) => setLx(Math.round(v)));
  useMotionValueEvent(rxMotion, "change", (v) => setRx(Math.round(v)));

  // ── Derived geometry (recalculated every render from lx/rx state) ──────────
  const intX    = (lx + rx) / 2;
  const dHalf   = (rx - lx) / 2;
  const overlap = dHalf < R;
  const hLens   = overlap ? Math.sqrt(Math.max(0, R * R - dHalf * dHalf)) : 0;
  const botY    = LY + hLens;
  const lEdge   = rx - R;
  const rEdge   = lx + R;

  // Dynamic SVG paths
  const leftPath   = circPath(lx, LY, R);
  const rightPath  = circPath(rx, LY, R);
  const bottomLens = overlap && lEdge < rEdge
    ? `M ${rEdge} ${LY} A ${R} ${R} 0 0 1 ${intX} ${botY} A ${R} ${R} 0 0 1 ${lEdge} ${LY} Z`
    : "M 0 0 Z";

  const orbit = (side) => ({
    transformBox:      "view-box",
    transformOrigin:   `${side === "left" ? lx : rx}px ${LY}px`,
    animation:         `vennOrbit${side === "left" ? "CW" : "CCW"} ${side === "left" ? "60" : "48"}s linear infinite`,
    animationPlayState: paused ? "paused" : "running",
  });

  const textAttrs = {
    fontSize:      "12",
    fill:          "rgba(245,242,236,0.35)",
    fontFamily:    "Manrope, sans-serif",
    letterSpacing: "3.5",
  };

  return (
    <>
      {/* ── Mobile: scrolling marquee (unchanged) ── */}
      <section
        className="md:hidden bg-charcoal py-5 overflow-hidden"
        data-testid="marquee-section"
      >
        <div className="marquee-outer">
          <div className="marquee-track">
            {[t.home.marquee, t.home.marquee].map((text, i) => (
              <span
                key={i}
                className="ct-overline text-ivory/40 pr-8"
                style={{ fontSize: "10px" }}
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Desktop: 280vh scroll container with sticky SVG ── */}
      <div
        ref={outerRef}
        className="hidden md:block bg-charcoal"
        style={{ height: "280vh", position: "relative" }}
        data-testid="venn-section"
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: "56px",
            overflow: "hidden",
          }}
        >
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="xMidYMid meet"
            className="w-full block"
            style={{ maxHeight: `${H}px`, overflow: "hidden" }}
            aria-hidden="true"
          >
            <defs>
              <clipPath id="vennViewClip">
                <rect x="0" y="0" width={W} height={H} />
              </clipPath>
              <path id="vennLeft"  d={leftPath}  />
              <path id="vennRight" d={rightPath} />
              <mask id="bottomLensMask">
                <rect width={W} height={H} fill="black" />
                <path d={bottomLens} fill="white" />
              </mask>
            </defs>

            {/* ─ All content clipped to viewBox — nothing renders outside ─ */}
            <g clipPath="url(#vennViewClip)">

            {/* ─ Layer 1: Right circle text (base) ─ */}
            <g style={orbit("right")}>
              <text {...textAttrs}>
                <textPath href="#vennRight">{R_TEXT}</textPath>
              </text>
            </g>

            {/* ─ Layer 2: Left circle text (dominates top-lens) ─ */}
            <g style={orbit("left")}>
              <text {...textAttrs}>
                <textPath href="#vennLeft">{L_TEXT}</textPath>
              </text>
            </g>

            {/* ─ Layer 3: Right circle text masked to bottom-lens (interlocking illusion) ─ */}
            <g mask="url(#bottomLensMask)" style={orbit("right")}>
              <text {...textAttrs}>
                <textPath href="#vennRight">{R_TEXT}</textPath>
              </text>
            </g>

            {/* ─ Circle labels — always visible, move in with their circles ─ */}
            <text
              x={lx} y={LY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="18"
              fontFamily="Cormorant Garamond, serif"
              fontWeight="700"
              fill="#C8A96A"
              letterSpacing="2"
            >
              NARM
            </text>
            <text
              x={rx} y={LY}
              textAnchor="middle" dominantBaseline="middle"
              fontSize="18"
              fontFamily="Cormorant Garamond, serif"
              fontWeight="700"
              fill="#C8A96A"
              letterSpacing="2"
            >
              Integral Coaching
            </text>

            {/* ─ CT logo — fades in as circles fully converge ─ */}
            <motion.g style={{ opacity: labelOpacity }}>
              <image
                href="/ct-logo-mark.png"
                x={intX - 28}
                y={LY - 28}
                width="56"
                height="56"
              />
            </motion.g>

            {/* ─ Invisible hover targets ─ */}
            <circle
              cx={lx} cy={LY} r={R}
              fill="transparent"
              style={{ cursor: "default" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            />
            <circle
              cx={rx} cy={LY} r={R}
              fill="transparent"
              style={{ cursor: "default" }}
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            />

            {/* ─ Arrow — fades in after circles meet ─ */}
            <motion.g
              transform={`translate(${intX}, 283) rotate(43.6) scale(0.1) translate(-300.561, -253.553)`}
              style={{ opacity: arrowOpacity }}
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

            </g>{/* end vennViewClip */}
          </svg>
        </div>
      </div>
    </>
  );
};

export default VennDiagram;
