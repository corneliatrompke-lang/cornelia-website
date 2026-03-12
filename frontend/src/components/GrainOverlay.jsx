import React from "react";

/**
 * GrainOverlay — subtle organic noise texture applied as a fixed full-screen layer.
 * Uses SVG feTurbulence (fractalNoise) so the texture is rendered natively in the browser.
 * mix-blend-mode: screen → grain is visible on dark forest-green surfaces,
 * and virtually invisible on the light ivory sections.
 */
const GrainOverlay = () => (
  <div
    aria-hidden="true"
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      zIndex: 9997,
      pointerEvents: "none",
      opacity: 0.038,
      mixBlendMode: "screen",
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      style={{ display: "block" }}
    >
      <filter
        id="ct-forest-grain"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        colorInterpolationFilters="sRGB"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.68 0.72"
          numOctaves="4"
          seed="23"
          stitchTiles="stitch"
        />
        {/* Slight warm-green tint to make it feel organic, not pure white noise */}
        <feColorMatrix
          type="matrix"
          values="0.85 0 0 0 0.04
                  0    0.85 0 0 0.06
                  0    0 0.85 0 0.02
                  0    0 0    1 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#ct-forest-grain)" />
    </svg>
  </div>
);

export default GrainOverlay;
