import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const BANNER_SRC =
  "https://images.unsplash.com/photo-1671735250135-fc322596644a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";
const CIRCLE_SRC =
  "https://images.unsplash.com/photo-1572866649630-bd38af3d527c?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";
const SQUARE_SRC =
  "https://images.unsplash.com/photo-1684963948721-e24aa0d82911?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85";

export default function FoundationSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);

  // Scroll progress: 0 when section enters viewport bottom, 1 when section is ~20% from top
  const { scrollYProgress: fp } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "start 15%"],
  });

  // ── Banner — drifts down from above into position ──────────────
  const bannerY = useTransform(fp, [0, 0.55], [-50, 0]);
  const bannerO = useTransform(fp, [0, 0.30], [0, 1]);

  // ── Circle — slides in from the right ──────────────────────────
  const circleX = useTransform(fp, [0.08, 0.60], [100, 0]);
  const circleO = useTransform(fp, [0.08, 0.40], [0, 1]);

  // ── Square — slides in from the lower-left ─────────────────────
  const squareX = useTransform(fp, [0.05, 0.58], [-80, 0]);
  const squareY = useTransform(fp, [0.05, 0.58], [40, 0]);
  const squareO = useTransform(fp, [0.05, 0.38], [0, 1]);

  // ── Content card — rises from below ────────────────────────────
  const cardY = useTransform(fp, [0.35, 0.72], [70, 0]);
  const cardO = useTransform(fp, [0.35, 0.62], [0, 1]);

  // ── Text inside card — only after card reaches final position ──
  const dividerO = useTransform(fp, [0.70, 0.78], [0, 1]);
  const headingY = useTransform(fp, [0.74, 0.86], [20, 0]);
  const headingO = useTransform(fp, [0.74, 0.86], [0, 1]);
  const bodyY    = useTransform(fp, [0.80, 0.92], [16, 0]);
  const bodyO    = useTransform(fp, [0.80, 0.92], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="bg-ivory"
      style={{ paddingBottom: "140px" }}
      data-testid="philosophy-section"
    >
      {/* ── Desktop: scroll-assembled collage ─────────────────── */}
      <div
        className="hidden md:block max-w-[1400px] mx-auto px-6 md:px-16"
        style={{ overflow: "hidden" }}
      >
        <div className="relative">

          {/* Banner — slides down from above */}
          <motion.div
            style={{
              margin: "140px auto 0",
              width: "75%",
              height: "460px",
              overflow: "hidden",
              y: bannerY,
              opacity: bannerO,
            }}
          >
            <img
              src={BANNER_SRC}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
            />
          </motion.div>

          {/* Circle — slides in from the right */}
          <motion.div
            style={{
              position: "absolute",
              right: 0,
              top: "140px",
              width: "290px",
              height: "290px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "6px solid #F5F2EC",
              boxShadow: "0 12px 48px rgba(18,18,18,0.20)",
              zIndex: 2,
              x: circleX,
              opacity: circleO,
            }}
          >
            <img
              src={CIRCLE_SRC}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
            />
          </motion.div>

          {/* Square — slides in from the lower-left */}
          <motion.div
            style={{
              position: "absolute",
              left: "calc(12.5% - 40px)",
              top: "280px",
              width: "250px",
              height: "250px",
              overflow: "hidden",
              border: "6px solid #F5F2EC",
              boxShadow: "0 12px 48px rgba(18,18,18,0.20)",
              zIndex: 2,
              rotate: -5,
              x: squareX,
              y: squareY,
              opacity: squareO,
            }}
          >
            <img
              src={SQUARE_SRC}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>

          {/* Content card — rises from below; text only after card lands */}
          <motion.div
            className="mx-auto text-center"
            style={{
              maxWidth: "608px",
              marginTop: "-100px",
              position: "relative",
              zIndex: 3,
              background: "#F5F2EC",
              padding: "24px 24px 0",
              y: cardY,
              opacity: cardO,
            }}
          >
            {/* Divider — appears once card is settled */}
            <motion.div
              className="ct-divider mx-auto mb-8"
              style={{ background: "rgba(18,18,18,0.2)", opacity: dividerO }}
            />

            {/* Heading */}
            <motion.h2
              className="text-charcoal leading-[1.15]"
              style={{
                fontFamily: "Figtree, sans-serif",
                fontSize: "clamp(28px, 4vw, 46px)",
                fontWeight: 400,
                y: headingY,
                opacity: headingO,
              }}
            >
              {t.home.philosophy.headline}
            </motion.h2>

            {/* Body paragraphs */}
            <motion.div style={{ y: bodyY, opacity: bodyO }}>
              {t.home.philosophy.body.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  className="text-charcoal/65 mt-6 leading-relaxed"
                  style={{ fontFamily: "Manrope, sans-serif", fontSize: "17px", fontWeight: 300 }}
                >
                  {para}
                </p>
              ))}
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* ── Mobile: simple scroll-reveal ──────────────────────── */}
      <div className="md:hidden max-w-[720px] mx-auto px-6 text-center" style={{ paddingTop: "60px" }}>
        <div className="ct-divider mx-auto mb-8" style={{ background: "rgba(18,18,18,0.2)" }} />
        <h2
          className="text-charcoal leading-[1.15]"
          style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 400 }}
        >
          {t.home.philosophy.headline}
        </h2>
        {t.home.philosophy.body.split("\n\n").map((para, i) => (
          <p
            key={i}
            className="text-charcoal/65 mt-6 leading-relaxed"
            style={{ fontFamily: "Manrope, sans-serif", fontSize: "17px", fontWeight: 300 }}
          >
            {para}
          </p>
        ))}
      </div>
    </section>
  );
}
