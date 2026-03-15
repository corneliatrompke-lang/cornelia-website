import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import NeuralCanvas from "../../components/NeuralCanvas";
import ScrollReveal from "../../components/ScrollReveal";
import HeroContactForm from "../../components/HeroContactForm";
import { useLanguage } from "../../context/LanguageContext";
import { useContactForm } from "../../context/ContactFormContext";
import SEOHead from "../../components/SEOHead";

// ─── Assets ───────────────────────────────────────────────────────────────────
const HERO_VIDEO_DESKTOP =
  "https://customer-assets.emergentagent.com/job_nervous-system-exec/artifacts/mglao982_Hero%202%20-%20desktop.mp4";
const HERO_VIDEO_MOBILE =
  "https://customer-assets.emergentagent.com/job_nervous-system-exec/artifacts/j6z9yj5l_Hero%20-%20mobile.mp4";

const GUIDE_BG =
  "https://customer-assets.emergentagent.com/job_nervous-system-exec/artifacts/mix18bkw_Cornelia%20Trompke_0691.jpg";

// ─── Content ──────────────────────────────────────────────────────────────────
const GUIDE_STATS = [
  { value: "30+", label: "Years of Personal\nMeditation Practice" },
  { value: "10+", label: "Years Teaching\nMeditation to Leaders" },
];

const WHAT_OPENS = [
  {
    number: "01",
    title: "Attention",
    subtitle: "Presence as Precision",
    body: "Deep practice sharpens your capacity to hold sustained focus in environments of constant fragmentation. Leaders who have done this work consistently report a qualitative shift in their attention — less reactive, more deliberate, more genuinely available to what matters.",
    citation: "Harvard Medical School",
  },
  {
    number: "02",
    title: "Emotional Regulation",
    subtitle: "The Regulated Leader",
    body: "When you regulate your own nervous system, you change the nervous system of every room you walk into. Meditation builds the genuine capacity for non-reactive, wise response — even under the most demanding and high-stakes conditions you face.",
    citation: "Harvard Medical School",
  },
  {
    number: "03",
    title: "Cognitive Flexibility",
    subtitle: "Space Between Stimulus and Response",
    body: "Stillness creates the space between stimulus and response where real choice actually lives. Regular practice improves your ability to shift perspective, hold complexity without collapse, and find genuinely novel approaches to the problems that won't budge.",
    citation: "Harvard Business School",
  },
  {
    number: "04",
    title: "Creative Capacity",
    subtitle: "Solutions That Come From Stillness",
    body: "The clearest solutions rarely arrive in meeting rooms. They emerge in the silence that follows. Meditation activates the kind of thinking that becomes available when the analytical mind steps aside and a deeper intelligence has room to speak.",
    citation: "Harvard Business School",
  },
];

const EXPERIENCE_ELEMENTS = [
  {
    number: "01",
    label: "Quiet Reflection",
    role: "The Inner Chamber",
    description:
      "Unstructured hours where your nervous system settles on its own terms. Not forced silence — genuine stillness. Space for what has been waiting, patiently and quietly, to finally be heard.",
  },
  {
    number: "02",
    label: "Guided Practice",
    role: "The Architecture",
    description:
      "Instruction in meditation forms suited to the executive mind — rigorous, intelligent, and adapted to leaders. Whether you have never practiced before or have practiced for years, the guidance meets you exactly where you are.",
  },
  {
    number: "03",
    label: "Dialogue",
    role: "The Field",
    description:
      "Small-group conversation that allows insights to settle and deepen through exchange. The quality of connection between participants — at this level of openness — often produces its own profound kind of clarity.",
  },
];

const TIMELINE_DAYS = [
  {
    day: "Day 1",
    title: "Arrival & Settling",
    description:
      "Evening arrival. First guided session together. The transition from operational pace into the conditions for genuine stillness — slower than you expect, and exactly what you need.",
  },
  {
    day: "Day 2",
    title: "Foundation",
    description:
      "Morning and afternoon practice. Establishing the inner architecture. Your nervous system begins to settle in ways that the pace of normal life doesn't permit.",
  },
  {
    day: "Day 3",
    title: "Deepening",
    description:
      "Extended practice periods. The work goes deeper. Insights begin to emerge — not forced, but arising naturally in the extended quiet of a mind that is finally still.",
  },
  {
    day: "Day 4",
    title: "Integration",
    description:
      "Small-group dialogue. Patterns become visible when shared. Inquiry takes on new depth and honesty when met with the stillness of the previous days.",
  },
  {
    day: "Day 5",
    title: "Return",
    description:
      "Morning practice. Closing dialogue. Carrying what has genuinely shifted back into leadership — as changed capacity and presence, not just as memory.",
  },
];

const UPCOMING_RETREATS = [
  {
    date: "April 2026",
    location: "Oman — Muscat Region",
    duration: "5 days",
    spots: "4 places remaining",
    status: "Open",
  },
  {
    date: "September 2026",
    location: "Costa Rica — Península de Osa",
    duration: "5 days",
    spots: "6 places remaining",
    status: "Open",
  },
  {
    date: "December 2026",
    location: "Oman — Hajar Mountains",
    duration: "3 days",
    spots: "Enquiries welcome",
    status: "Forming",
  },
];

const FORMAT_ITEMS = [
  { label: "Duration", value: "3 or 5 days residential" },
  { label: "Location", value: "Oman, Costa Rica, and select European locations — carefully chosen for stillness and focus" },
  { label: "Group Size", value: "Small groups only — maximum 8 participants" },
  { label: "Who This Is For", value: "Leaders currently engaged in one of Cornelia's programmes" },
  { label: "Practice Level", value: "All levels — from complete beginners to experienced practitioners" },
  { label: "Language", value: "German or English" },
  { label: "Investment", value: "Shared on application" },
];

// ─── Concentric Circles ───────────────────────────────────────────────────────
const CirclesViz = ({ activePhase, size = 500 }) => {
  const s = size / 500;
  const cx = size / 2;
  const rings = [
    { inset: `${Math.round(180 * s)}px` },
    { inset: `${Math.round(90 * s)}px` },
    { inset: "0px" },
  ];
  const radii = [70 * s, 160 * s, 250 * s];
  return (
    <div style={{ position: "relative", width: `${size}px`, height: `${size}px`, flexShrink: 0 }}>
      {rings.map((ring, i) => {
        const lit = activePhase >= i;
        return (
          <motion.div
            key={i}
            animate={{
              borderColor: lit
                ? `rgba(200,169,106,${0.75 - i * 0.18})`
                : "rgba(200,169,106,0.06)",
              boxShadow: lit
                ? `0 0 ${20 + i * 14}px rgba(200,169,106,${0.12 - i * 0.025})`
                : "none",
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            style={{
              position: "absolute",
              inset: ring.inset,
              borderRadius: "50%",
              border: "1px solid",
            }}
          />
        );
      })}
      {/* Label mapping */}
      {EXPERIENCE_ELEMENTS.map((el, i) => {
        const angles = [0, -60, -120];
        const rad = (angles[i] * Math.PI) / 180;
        const x = cx + radii[i] * Math.cos(rad);
        const y = cx + radii[i] * Math.sin(rad);
        return (
          <motion.span
            key={i}
            animate={{ opacity: activePhase >= i ? 0.7 : 0.12 }}
            transition={{ duration: 0.8 }}
            style={{
              position: "absolute",
              left: x,
              top: y,
              transform: "translate(-50%, -50%)",
              fontFamily: "Manrope, sans-serif",
              fontSize: "9px",
              fontWeight: 500,
              letterSpacing: "1.8px",
              textTransform: "uppercase",
              color: "rgba(200,169,106,1)",
              whiteSpace: "nowrap",
            }}
          >
            {el.label}
          </motion.span>
        );
      })}
      {/* Center label */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          textAlign: "center",
        }}
      >
        <span
          style={{
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "11px",
            fontStyle: "italic",
            color: "rgba(200,169,106,0.4)",
            whiteSpace: "nowrap",
          }}
        >
          Stillness
        </span>
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
const MeditationRetreat = () => {
  const { t } = useLanguage();
  const { heroOpenFn, finalCtaOpenFn } = useContactForm();
  const testimonials = t.home.testimonials.items;

  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroBgY = useTransform(heroScroll, [0, 1], ["0%", "-12%"]);

  const circlesRef = useRef(null);
  const { scrollYProgress: circlesProgress } = useScroll({ target: circlesRef, offset: ["start start", "end end"] });
  const [activeElement, setActiveElement] = useState(-1);
  useMotionValueEvent(circlesProgress, "change", (v) => {
    if (v < 0.06)       setActiveElement(-1);
    else if (v < 0.38)  setActiveElement(0);
    else if (v < 0.68)  setActiveElement(1);
    else                setActiveElement(2);
  });

  const [activeOpen, setActiveOpen] = useState(null);
  const [openWhatOpensMobile, setOpenWhatOpensMobile] = useState(0);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" ? window.innerWidth < 768 : false);
  const [isNarrow, setIsNarrow] = useState(typeof window !== "undefined" ? window.innerWidth < 1200 : false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showFinalForm, setShowFinalForm] = useState(false);

  useEffect(() => {
    const h = () => { setIsMobile(window.innerWidth < 768); setIsNarrow(window.innerWidth < 1200); };
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const timerRef = useRef(null);
  const restartTimer = (len) => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActiveTestimonial((p) => (p + 1) % len), 6000);
  };
  useEffect(() => { restartTimer(testimonials.length); return () => clearInterval(timerRef.current); }, [testimonials.length]);
  useEffect(() => {
    heroOpenFn.current     = () => setShowContactForm(true);
    finalCtaOpenFn.current = () => setShowFinalForm(true);
    return () => { heroOpenFn.current = null; finalCtaOpenFn.current = null; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setShowContactForm(false); setShowFinalForm(false); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);
      
  return (
    <div className="bg-[#F5F2EC]">
      <SEOHead
        title="Executive Meditation Retreat — Leadership Retreat Germany & Europe"
        description="An immersive 3–5 day residential executive retreat for leaders ready to step outside operations. Guided meditation, structured reflection, and deep dialogue at selected locations in Germany and Europe."
        path="/executive-retreats"
        jsonLd={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "Service",
              "@id": "https://corneliatrompke.com/executive-retreats#service",
              "name": "Executive Meditation Retreat",
              "description": "An immersive 3–5 day residential retreat for leaders ready to step outside the pace of operations — guided meditation, structured reflection, and deep dialogue.",
              "url": "https://corneliatrompke.com/executive-retreats",
              "serviceType": "Executive Retreat",
              "provider": { "@id": "https://corneliatrompke.com/#organization" },
              "areaServed": "Europe",
              "availableLanguage": [{ "@type": "Language", "name": "German" }, { "@type": "Language", "name": "English" }],
              "offers": { "@type": "Offer", "description": "3 or 5 days residential. Individual or small group (2–4 participants). Selected locations across Germany and Europe." },
              "location": { "@type": "VirtualLocation", "name": "Selected retreat locations across Germany and Europe" },
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://corneliatrompke.com" },
                { "@type": "ListItem", "position": 2, "name": "Work With Me", "item": "https://corneliatrompke.com/work-with-me" },
                { "@type": "ListItem", "position": 3, "name": "Executive Retreats", "item": "https://corneliatrompke.com/executive-retreats" },
              ],
            },
          ],
        }}
      />
      <section className="pt-[6px] px-3 md:px-4 pb-3" style={{ background: "#F5F2EC" }} data-testid="hero-section">
        <div ref={heroRef} className="relative overflow-hidden w-full" style={{ borderRadius: "20px", minHeight: "96vh" }}
          onClick={showContactForm ? () => setShowContactForm(false) : undefined}>
          <motion.video
            key={isMobile ? "retreat-mobile" : "retreat-desktop"}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
            style={{ position: "absolute", left: 0, right: 0, top: 0, width: "100%", height: "115%", objectFit: "cover", objectPosition: "center 30%", y: heroBgY }}
          >
            <source src={isMobile ? HERO_VIDEO_MOBILE : HERO_VIDEO_DESKTOP} type="video/mp4" />
          </motion.video>
          {/* Directional gradient */}
          <div className="absolute inset-0 z-[1]" style={{ background: isMobile ? "linear-gradient(to top, rgba(15,26,18,0.96) 0%, rgba(15,26,18,0.88) 22%, rgba(15,26,18,0.72) 42%, rgba(15,26,18,0.30) 62%, rgba(15,26,18,0.08) 100%)" : "linear-gradient(to right, rgba(15,26,18,0.96) 0%, rgba(15,26,18,0.88) 22%, rgba(15,26,18,0.72) 42%, rgba(15,26,18,0.30) 62%, rgba(15,26,18,0.08) 100%)" }} />
          <div className="absolute top-0 left-0 right-0 z-[2]" style={{ height: "130px", background: "linear-gradient(to bottom, rgba(15,26,18,0.70) 0%, rgba(15,26,18,0.2) 70%, transparent 100%)" }} />
          <NeuralCanvas opacity={0.06} nodeCount={35} />

          <motion.div className="absolute inset-y-0 left-0 z-10 p-8 md:p-14"
            style={{ overflowY: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}
            animate={{ maxWidth: showContactForm ? "580px" : "860px" }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <ScrollReveal delay={0.1}><p className="ct-overline text-gold mb-6">02 — Executive Retreat</p></ScrollReveal>
            <ScrollReveal delay={0.25}>
              <h1 className="text-ivory leading-[1.04]" data-testid="retreat-hero-headline"
                style={{ fontFamily: "Figtree, sans-serif", fontSize: showContactForm ? (isMobile ? "30px" : "55px") : "clamp(40px, 6.5vw, 84px)", fontWeight: 400, transition: "font-size 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
                Stillness as a Leadership Practice
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.42}>
              <p className="mt-5 max-w-[520px] leading-relaxed" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "22px", fontStyle: "italic", color: "rgba(227,222,215,0.65)" }}>
                Away from operations. Into clarity.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.58}>
              <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "12px", marginTop: "36px", marginBottom: "40px" }}>
                <button onClick={() => setShowContactForm(true)} className="btn-hero-pill" data-testid="retreat-hero-cta" style={{ border: "none", cursor: "pointer" }}>
                  Inquire About Retreats
                </button>
              </div>
            </ScrollReveal>
          </motion.div>

          <AnimatePresence>
            {showContactForm && (<>
              <motion.div key="mr-veil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }}
                style={{ position: "absolute", inset: 0, zIndex: 15, background: "linear-gradient(to right, transparent 30%, rgba(5,10,7,0.55) 70%)", pointerEvents: "none" }} />
              <motion.div key="mr-panel" initial={{ opacity: 0, x: "100%" }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: "100%" }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }} onClick={e => e.stopPropagation()}
                style={{ position: "absolute", right: "clamp(24px, 4vw, 56px)", top: "10%", height: "80%", width: "clamp(360px, 40%, 520px)", borderRadius: "16px", background: "rgba(8,16,11,0.25)", backdropFilter: "blur(28px) saturate(1.6)", WebkitBackdropFilter: "blur(28px) saturate(1.6)", border: "1px solid rgba(200,169,106,0.18)", zIndex: 20, overflowY: "auto" }}
                data-testid="retreat-contact-form-panel">
                <HeroContactForm onClose={() => setShowContactForm(false)} sendFrom="Executive Retreat — Hero Section" />
              </motion.div>
            </>)}
          </AnimatePresence>
        </div>
      </section>

      {/* ══ 2. THE INVITATION — Ivory, editorial two-column ══════════════════ */}
      <section className="ct-section" style={{ background: "#F5F2EC" }} data-testid="retreat-invitation">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "32px" : "80px", alignItems: "flex-start" }}>
            {/* Left: large pull quote */}
            <div style={{ flex: isMobile ? "none" : "0 0 44%" }}>
              <ScrollReveal>
                <p className="ct-overline text-sage mb-8">The Retreat</p>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(32px, 3.8vw, 52px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "#121212",
                    lineHeight: 1.25,
                  }}
                >
                  "Stillness is not a retreat from leadership. It is one of the most powerful tools a leader can develop."
                </p>
                <div
                  style={{
                    width: "40px",
                    height: "1px",
                    background: "rgba(200,169,106,0.5)",
                    marginTop: "36px",
                  }}
                />
                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "11px",
                    fontWeight: 500,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: "rgba(18,18,18,0.35)",
                    marginTop: "16px",
                  }}
                >
                  Cornelia Trompke
                </p>
              </ScrollReveal>
            </div>

            {/* Right: body */}
            <div style={{ flex: 1, paddingTop: isMobile ? "0" : "68px" }}>
              {[
                "For leaders working with me in programmes, I regularly offer 3–5 day executive meditation retreats. I have practiced meditation for over 30 years and have been teaching it to leaders for more than a decade.",
                "When practiced with real rigour and genuine guidance, meditation strengthens self-regulation, deepens insight, and creates the clarity and cognitive flexibility that leadership at the highest level demands. These retreats create the conditions that daily operational life cannot.",
                "What I offer in these retreats is not a wellness programme. It is a structured, intelligent, and personally guided introduction to the kind of practice that changes the architecture of how you lead — from the inside out.",
              ].map((para, i) => (
                <ScrollReveal key={i} delay={0.08 * i}>
                  <p
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "15px",
                      fontWeight: 300,
                      color: "rgba(18,18,18,0.55)",
                      lineHeight: 1.85,
                      marginBottom: "24px",
                    }}
                  >
                    {para}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 3. THE GUIDE — Ivory → Forest gradient, authority visuals ════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #F5F2EC 0%, #CDD8C4 22%, #8A9A80 42%, #2A3825 62%, #162018 80%, #0F1A12 100%)",
          paddingTop: "120px",
          paddingBottom: "140px",
        }}
        data-testid="retreat-guide"
      >
        {/* Faint large decorative numeral */}
        <div
          style={{
            position: "absolute",
            right: "-40px",
            top: "40px",
            fontFamily: "Cormorant Garamond, serif",
            fontSize: "420px",
            fontWeight: 300,
            color: "rgba(18,18,18,0.025)",
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          30
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-16 relative z-10">

          {/* Section heading */}
          <ScrollReveal>
            <p className="ct-overline text-sage mb-5">The Guide</p>
            <h2
              style={{
                fontFamily: "Figtree, sans-serif",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 400,
                color: "#121212",
                lineHeight: 1.1,
                maxWidth: "680px",
                marginBottom: "72px",
              }}
            >
              Thirty Years of Practice. A Decade of Teaching Leaders.
            </h2>
          </ScrollReveal>

          {/* Two-column layout */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "40px" : "80px", alignItems: "flex-start" }}>

            {/* Left: Stats + quote */}
            <div style={{ flex: isMobile ? "none" : "0 0 42%" }}>
              {/* Stat blocks */}
              <div style={{ display: "flex", gap: "2px", marginBottom: "52px" }}>
                {GUIDE_STATS.map((stat, i) => (
                  <ScrollReveal key={i} delay={0.12 * i}>
                    <div
                      style={{
                        flex: 1,
                        background: i === 0
                          ? "rgba(18,18,18,0.05)"
                          : "rgba(200,169,106,0.07)",
                        border: "1px solid rgba(18,18,18,0.08)",
                        padding: isMobile ? "24px 20px" : "32px 28px",
                        marginRight: "2px",
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "Cormorant Garamond, serif",
                          fontSize: "clamp(56px, 6vw, 80px)",
                          fontWeight: 300,
                          color: i === 1 ? "#8B5240" : "#121212",
                          lineHeight: 1,
                          marginBottom: "12px",
                        }}
                      >
                        {stat.value}
                      </p>
                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "11px",
                          fontWeight: 400,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: "rgba(18,18,18,0.45)",
                          lineHeight: 1.6,
                          whiteSpace: "pre-line",
                        }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* Credential divider */}
              <ScrollReveal delay={0.25}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "32px" }}>
                  <div style={{ width: "28px", height: "1px", background: "rgba(200,169,106,0.5)" }} />
                  <span
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "9px",
                      fontWeight: 600,
                      letterSpacing: "2.5px",
                      textTransform: "uppercase",
                      color: "rgba(200,169,106,0.65)",
                    }}
                  >
                    NARM · Somatic · Integral · Contemplative
                  </span>
                </div>
              </ScrollReveal>

              {/* Pull quote in transition zone */}
              <ScrollReveal delay={0.35}>
                <p
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(20px, 2.2vw, 28px)",
                    fontWeight: 400,
                    fontStyle: "italic",
                    color: "rgba(245,242,236,0.55)",
                    lineHeight: 1.45,
                    maxWidth: "480px",
                  }}
                >
                  "What I offer in these retreats is not a wellness programme. It is a rigorous, intelligent introduction to the kind of practice that changes the architecture of leadership."
                </p>
              </ScrollReveal>
            </div>

            {/* Right: atmospheric image + body text */}
            <div style={{ flex: 1 }}>

              {/* Framed atmospheric image */}
              <ScrollReveal delay={0.15}>
                <div
                  style={{
                    position: "relative",
                    borderRadius: "4px",
                    overflow: "hidden",
                    marginBottom: "44px",
                    height: "340px",
                  }}
                >
                  <img
                    src={GUIDE_BG}
                    alt="Contemplative forest landscape"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      filter: "saturate(0.65) brightness(0.88)",
                    }}
                  />
                  {/* Subtle gold border frame */}
                  <div
                    style={{
                      position: "absolute",
                      inset: "12px",
                      border: "1px solid rgba(200,169,106,0.22)",
                      borderRadius: "2px",
                      pointerEvents: "none",
                    }}
                  />
                  {/* Caption overlay */}
                  <div
                    style={{
                      position: "absolute",
                      bottom: "20px",
                      left: "24px",
                      right: "24px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <div style={{ width: "20px", height: "1px", background: "rgba(200,169,106,0.55)" }} />
                    <span
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "9px",
                        fontWeight: 400,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "#6B3A2A",
                      }}
                    >
                      Retreat Environment
                    </span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Body paragraphs — light colors for gradient midzone */}
              {[
                "Meditation is not a technique I use with clients. It is the ground from which this entire body of work emerges. I began practicing in my early twenties and have studied across traditions, completed extended silent retreats, and spent years integrating these practices with the neuroscience of self-regulation.",
                "Research from Harvard Medical School and Harvard Business School confirms what practitioners have known for centuries: regular meditation practice can improve attention, emotional regulation, cognitive flexibility, and creative problem-solving — capacities essential for leaders operating in complex environments.",
              ].map((para, i) => (
                <ScrollReveal key={i} delay={0.2 + i * 0.12}>
                  <p
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "14px",
                      fontWeight: 300,
                      color: "rgba(245,242,236,0.52)",
                      lineHeight: 1.85,
                      marginBottom: "22px",
                    }}
                  >
                    {para}
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Dark cluster: eliminates sub-pixel gaps between consecutive dark sections ─── */}
      <div style={{ background: "#0F1A12", marginTop: "-2px" }}>

      {/* ══ 4. WHAT OPENS — For Whom accordion style, deep forest ════════════ */}
      <section
        className="ct-section"
        style={{ background: "#0F1A12" }}
        data-testid="retreat-what-opens"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div className="max-w-[600px] mx-auto mb-16 text-center">
            <ScrollReveal>
              <p className="ct-overline text-gold/60 mb-5">What Opens</p>
              <h2
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: "clamp(28px, 3.5vw, 46px)",
                  fontWeight: 400,
                  color: "#F5F2EC",
                  lineHeight: 1.1,
                }}
              >
                Four Capacities That Open in You
              </h2>
            </ScrollReveal>
          </div>

          {/* Horizontal accordion / Mobile vertical accordion */}
          {isMobile ? (
            <div>
              {WHAT_OPENS.map((item, i) => {
                const isOpen = openWhatOpensMobile === i;
                return (
                  <div key={i} style={{ borderBottom: "1px solid rgba(245,242,236,0.08)" }} data-testid={`what-opens-item-${i}`}>
                    <button
                      onClick={() => setOpenWhatOpensMobile(isOpen ? null : i)}
                      style={{ width: "100%", textAlign: "left", padding: "20px 0", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <div style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(200,169,106,0.65)", flexShrink: 0 }}>{item.number}</span>
                        <span style={{ fontFamily: "Figtree, sans-serif", fontSize: "18px", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.3 }}>{item.title}</span>
                      </div>
                      <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "22px", fontWeight: 300, color: "rgba(245,242,236,0.35)", lineHeight: 1, transform: isOpen ? "rotate(45deg)" : "none", transition: "transform 0.3s ease", flexShrink: 0, marginLeft: "12px" }}>+</span>
                    </button>
                    {isOpen && (
                      <div style={{ paddingBottom: "20px", paddingRight: "8px" }}>
                        <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "14px", fontStyle: "italic", color: "rgba(200,169,106,0.6)", marginBottom: "10px" }}>{item.subtitle}</p>
                        <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(227,222,215,0.5)", lineHeight: 1.75, marginBottom: "12px" }}>{item.body}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                          <div style={{ width: "16px", height: "1px", background: "rgba(200,169,106,0.35)" }} />
                          <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(200,169,106,0.4)" }}>{item.citation}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
          <div className="flex" style={{ height: "420px", overflow: "hidden" }}>
            {WHAT_OPENS.map((item, i) => {
              const isActive = activeOpen === i;
              return (
                <div
                  key={i}
                  onMouseEnter={() => setActiveOpen(i)}
                  onMouseLeave={() => setActiveOpen(null)}
                  data-testid={`what-opens-item-${i}`}
                  style={{
                    flex: isActive ? 3.5 : 1,
                    transition: "flex 0.65s cubic-bezier(0.4, 0, 0.2, 1), background 0.4s ease",
                    position: "relative",
                    overflow: "hidden",
                    borderRight:
                      i < WHAT_OPENS.length - 1
                        ? "1px solid rgba(245,242,236,0.07)"
                        : "none",
                    cursor: "default",
                    background: isActive ? "rgba(200,169,106,0.04)" : "transparent",
                  }}
                >
                  {/* Collapsed: rotated title */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      padding: "40px 0",
                      opacity: isActive ? 0 : 1,
                      transition: "opacity 0.2s ease",
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        writingMode: "vertical-rl",
                        transform: "rotate(180deg)",
                        fontFamily: "Figtree, sans-serif",
                        fontSize: "clamp(13px, 1.6vw, 18px)",
                        fontWeight: 400,
                        letterSpacing: "0.08em",
                        color: "rgba(245,242,236,0.4)",
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "28px",
                        fontWeight: 300,
                        color: "rgba(200,169,106,0.12)",
                        lineHeight: 1,
                        paddingBottom: "4px",
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Expanded */}
                  <div
                    style={{
                      opacity: isActive ? 1 : 0,
                      transition: "opacity 0.35s ease 0.22s",
                      padding: "48px 52px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "flex-end",
                      minWidth: "380px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        color: "rgba(200,169,106,0.8)",
                        marginBottom: "8px",
                        display: "block",
                      }}
                    >
                      {item.number}
                    </span>
                    <h3
                      style={{
                        fontFamily: "Figtree, sans-serif",
                        fontSize: "clamp(20px, 2vw, 28px)",
                        fontWeight: 400,
                        color: "#F5F2EC",
                        lineHeight: 1.2,
                        marginBottom: "6px",
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "14px",
                        fontStyle: "italic",
                        color: "rgba(200,169,106,0.6)",
                        marginBottom: "18px",
                      }}
                    >
                      {item.subtitle}
                    </p>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "13px",
                        fontWeight: 300,
                        color: "rgba(227,222,215,0.5)",
                        lineHeight: 1.75,
                        maxWidth: "360px",
                        marginBottom: "20px",
                      }}
                    >
                      {item.body}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "18px", height: "1px", background: "rgba(200,169,106,0.35)" }} />
                      <span
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "9px",
                          fontWeight: 500,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: "rgba(200,169,106,0.4)",
                        }}
                      >
                        {item.citation}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          )}{/* end isMobile what-opens conditional */}

          {/* Research note */}
          <ScrollReveal delay={0.2}>
            <div
              style={{
                marginTop: "40px",
                paddingTop: "24px",
                borderTop: isMobile ? "none" : "1px solid rgba(245,242,236,0.07)",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <div style={{ width: "28px", height: "1px", background: "rgba(200,169,106,0.3)" }} />
              <p
                style={{
                  fontFamily: "Manrope, sans-serif",
                  fontSize: "12px",
                  fontWeight: 300,
                  color: "rgba(245,242,236,0.28)",
                  lineHeight: 1.6,
                }}
              >
                Research drawn from studies at Harvard Medical School and Harvard Business School on the effects of regular meditation practice on executive performance.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══ 5. THE EXPERIENCE — Concentric circles, deep forest ══════════════ */}
      <div
        ref={circlesRef}
        style={{ background: "#0F1A12", position: "relative" }}
        data-testid="retreat-experience"
      >
        {/* Section heading */}
        <div
          className="max-w-[1400px] mx-auto px-6 md:px-16"
          style={{ paddingTop: "140px", paddingBottom: "80px" }}
        >
          <ScrollReveal>
            <p className="ct-overline text-gold/60 mb-5">The Experience</p>
            <h2
              style={{
                fontFamily: "Figtree, sans-serif",
                fontSize: "clamp(28px, 3.5vw, 46px)",
                fontWeight: 400,
                color: "#F5F2EC",
                lineHeight: 1.1,
              }}
            >
              Three Dimensions of the Retreat
            </h2>
          </ScrollReveal>
        </div>

        {isMobile ? (
          /* ── Mobile: same sticky-scroll as desktop, vertical layout ── */
          <div style={{ height: "260vh" }}>
            <div
              style={{
                position: "sticky",
                top: 0,
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
                padding: "0 24px 24px",
              }}
            >
              {/* Circles — update with scroll */}
              <div style={{ marginBottom: "24px", flexShrink: 0 }}>
                <CirclesViz activePhase={activeElement} size={200} />
              </div>

              {/* Element rows */}
              <div style={{ width: "100%" }}>
                {EXPERIENCE_ELEMENTS.map((el, i) => {
                  const isActive = activeElement >= i;
                  const isCurrent = activeElement === i;
                  return (
                    <div
                      key={i}
                      data-testid={`experience-row-${i}`}
                      style={{
                        borderTop: i > 0 ? "1px solid rgba(245,242,236,0.1)" : "none",
                        paddingTop: i > 0 ? "18px" : "0",
                        paddingBottom: "18px",
                        paddingLeft: "16px",
                        borderLeft: `2px solid ${isCurrent ? "rgba(200,169,106,0.65)" : isActive ? "rgba(200,169,106,0.3)" : "rgba(200,169,106,0.08)"}`,
                        transition: "border-color 0.6s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "baseline", gap: "10px", marginBottom: "5px" }}>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: isActive ? "rgba(200,169,106,0.85)" : "rgba(200,169,106,0.2)", transition: "color 0.6s ease" }}>
                          {el.number}
                        </span>
                        <span style={{ fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 400, letterSpacing: "1px", color: isActive ? "rgba(245,242,236,0.35)" : "rgba(245,242,236,0.12)", textTransform: "uppercase", transition: "color 0.6s ease" }}>
                          {el.role}
                        </span>
                      </div>
                      <h3 style={{ fontFamily: "Figtree, sans-serif", fontSize: "17px", fontWeight: 400, color: isActive ? "rgba(245,242,236,0.88)" : "rgba(245,242,236,0.18)", lineHeight: 1.2, transition: "color 0.6s ease" }}>
                        {el.label}
                      </h3>
                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                            animate={{ opacity: 1, height: "auto", marginTop: "7px" }}
                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                            transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
                            style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(245,242,236,0.45)", lineHeight: 1.7, overflow: "hidden" }}
                          >
                            {el.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ paddingBottom: "40px" }} />
          </div>
        ) : (
        /* ── Desktop/Tablet: sticky scroll — 260vh drives the three-step reveal ── */
        <div style={{ height: "260vh" }}>
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <div className="max-w-[1400px] mx-auto px-6 md:px-16 w-full">
              <div style={{ display: "flex", alignItems: "center", gap: isNarrow ? "48px" : "0" }}>

                {/* Left: circles — smaller on tablet to create breathing room */}
                <div
                  style={{
                    flex: isNarrow ? "0 0 42%" : "0 0 50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CirclesViz activePhase={activeElement} size={isNarrow ? 380 : 500} />
                </div>

                {/* Right: element rows */}
                <div style={{ flex: 1 }}>
                  {EXPERIENCE_ELEMENTS.map((el, i) => {
                    const isActive = activeElement >= i;
                    const isCurrent = activeElement === i;
                    return (
                      <div
                        key={i}
                        style={{
                          borderTop: i > 0 ? "1px solid rgba(245,242,236,0.08)" : "none",
                          paddingTop: i > 0 ? "32px" : "0",
                          paddingBottom: "32px",
                          paddingLeft: "20px",
                          borderLeft: `2px solid ${
                            isCurrent
                              ? "rgba(200,169,106,0.65)"
                              : isActive
                              ? "rgba(200,169,106,0.3)"
                              : "rgba(200,169,106,0.07)"
                          }`,
                          transition: "border-color 0.6s ease",
                        }}
                        data-testid={`experience-row-${i}`}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "baseline",
                            gap: "12px",
                            marginBottom: "8px",
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "Manrope, sans-serif",
                              fontSize: "10px",
                              fontWeight: 600,
                              letterSpacing: "2px",
                              textTransform: "uppercase",
                              color: isActive
                                ? "rgba(200,169,106,0.85)"
                                : "rgba(200,169,106,0.18)",
                              transition: "color 0.6s ease",
                            }}
                          >
                            {el.number}
                          </span>
                          <span
                            style={{
                              fontFamily: "Manrope, sans-serif",
                              fontSize: "10px",
                              fontWeight: 400,
                              letterSpacing: "1px",
                              color: isActive
                                ? "rgba(245,242,236,0.32)"
                                : "rgba(245,242,236,0.1)",
                              textTransform: "uppercase",
                              transition: "color 0.6s ease",
                            }}
                          >
                            {el.role}
                          </span>
                        </div>
                        <h3
                          style={{
                            fontFamily: "Figtree, sans-serif",
                            fontSize: "clamp(18px, 2vw, 26px)",
                            fontWeight: 400,
                            color: isActive
                              ? "rgba(245,242,236,0.88)"
                              : "rgba(245,242,236,0.18)",
                            lineHeight: 1.2,
                            transition: "color 0.6s ease",
                          }}
                        >
                          {el.label}
                        </h3>
                        <AnimatePresence>
                          {isActive && (
                            <motion.p
                              initial={{ opacity: 0, height: 0, marginTop: 0 }}
                              animate={{ opacity: 1, height: "auto", marginTop: "10px" }}
                              exit={{ opacity: 0, height: 0, marginTop: 0 }}
                              transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
                              style={{
                                fontFamily: "Manrope, sans-serif",
                                fontSize: "13px",
                                fontWeight: 300,
                                color: "rgba(245,242,236,0.42)",
                                lineHeight: 1.75,
                                overflow: "hidden",
                              }}
                            >
                              {el.description}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}

                  {/* Closing phrase */}
                  <AnimatePresence>
                    {activeElement >= 2 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        style={{
                          marginTop: "28px",
                          paddingLeft: "20px",
                          borderLeft: "2px solid rgba(200,169,106,0.15)",
                        }}
                      >
                        <p
                          style={{
                            fontFamily: "Cormorant Garamond, serif",
                            fontSize: "18px",
                            fontStyle: "italic",
                            color: "rgba(200,169,106,0.45)",
                            lineHeight: 1.5,
                          }}
                        >
                          "Insights don't just arrive. They settle."
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}{/* end isMobile experience conditional */}

        <div style={{ paddingBottom: "80px" }} />
      </div>

      {/* ══ 6. THE PLACES — Timeline + Upcoming Retreats ═════════════════════ */}
      <section
        className="ct-section"
        style={{ background: "#0F1A12" }}
        data-testid="retreat-places"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">

          {/* Part A: 5-day timeline */}
          <div style={{ marginBottom: "100px" }}>
            <ScrollReveal>
              <p className="ct-overline text-gold/60 mb-5">The Five Days</p>
              <h2
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: "clamp(28px, 3.2vw, 44px)",
                  fontWeight: 400,
                  color: "#F5F2EC",
                  lineHeight: 1.1,
                  marginBottom: "64px",
                }}
              >
                A Day-by-Day Architecture
              </h2>
            </ScrollReveal>

            {/* Timeline — horizontal on desktop, vertical on mobile */}
            {isMobile ? (
              /* Mobile: vertical timeline */
              <div style={{ paddingLeft: "16px", borderLeft: "1px solid rgba(200,169,106,0.25)" }}>
                {TIMELINE_DAYS.map((day, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-30px" }}
                    transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.08 }}
                    style={{ paddingBottom: "36px", position: "relative" }}
                    data-testid={`timeline-day-${i}`}
                  >
                    {/* Dot */}
                    <div style={{ position: "absolute", left: "-21px", top: "4px", width: "9px", height: "9px", borderRadius: "50%", background: "#C8A96A", border: "2px solid #0F1A12", boxShadow: "0 0 0 1px rgba(200,169,106,0.4)" }} />
                    <span style={{ display: "block", fontFamily: "Manrope, sans-serif", fontSize: "9px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(200,169,106,0.8)", marginBottom: "8px" }}>{day.day}</span>
                    <h4 style={{ fontFamily: "Figtree, sans-serif", fontSize: "18px", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.2, marginBottom: "10px" }}>{day.title}</h4>
                    <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "13px", fontWeight: 300, color: "rgba(245,242,236,0.45)", lineHeight: 1.75 }}>{day.description}</p>
                  </motion.div>
                ))}
              </div>
            ) : (
            /* Desktop: horizontal timeline */
            <div style={{ position: "relative" }}>
              {/* Connecting line */}
              <div
                style={{
                  position: "absolute",
                  top: "24px",
                  left: "24px",
                  right: "24px",
                  height: "1px",
                  background:
                    "linear-gradient(to right, rgba(200,169,106,0.5), rgba(200,169,106,0.15), rgba(200,169,106,0.5))",
                }}
              />

              <div style={{ display: "flex", gap: "0" }}>
                {TIMELINE_DAYS.map((day, i) => (
                  <ScrollReveal key={i} delay={0.08 * i} direction="up">
                    <div
                      style={{
                        flex: 1,
                        paddingTop: "52px",
                        paddingRight: i < TIMELINE_DAYS.length - 1 ? "28px" : "0",
                        paddingLeft: i > 0 ? "28px" : "0",
                        position: "relative",
                      }}
                      data-testid={`timeline-day-${i}`}
                    >
                      {/* Day marker dot */}
                      <div
                        style={{
                          position: "absolute",
                          top: "20px",
                          left: i > 0 ? "28px" : "0",
                          width: "9px",
                          height: "9px",
                          borderRadius: "50%",
                          background: "#C8A96A",
                          border: "2px solid #0F1A12",
                          boxShadow: "0 0 0 1px rgba(200,169,106,0.4)",
                        }}
                      />

                      <span
                        style={{
                          display: "block",
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "9px",
                          fontWeight: 600,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: "rgba(200,169,106,0.8)",
                          marginBottom: "10px",
                        }}
                      >
                        {day.day}
                      </span>
                      <h4
                        style={{
                          fontFamily: "Figtree, sans-serif",
                          fontSize: "clamp(16px, 1.6vw, 20px)",
                          fontWeight: 400,
                          color: "#F5F2EC",
                          lineHeight: 1.2,
                          marginBottom: "12px",
                        }}
                      >
                        {day.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "13px",
                          fontWeight: 300,
                          color: "rgba(245,242,236,0.45)",
                          lineHeight: 1.75,
                        }}
                      >
                        {day.description}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            )}{/* end isMobile timeline conditional */}
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, rgba(245,242,236,0.12), transparent)",
              marginBottom: "80px",
            }}
          />

          {/* Part B: Upcoming retreats */}
          <div>
            <ScrollReveal>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  justifyContent: "space-between",
                  marginBottom: "40px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontSize: "clamp(22px, 2.8vw, 36px)",
                    fontWeight: 400,
                    color: "#F5F2EC",
                    lineHeight: 1.1,
                  }}
                >
                  Upcoming Retreats
                </h3>
                <p
                  style={{
                    fontFamily: "Manrope, sans-serif",
                    fontSize: "12px",
                    fontWeight: 300,
                    color: "rgba(245,242,236,0.38)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Places are limited
                </p>
              </div>
            </ScrollReveal>

            {UPCOMING_RETREATS.map((retreat, i) => (
              <ScrollReveal key={i} delay={0.1 * i}>
                <div
                  style={{
                    borderTop: "1px solid rgba(245,242,236,0.08)",
                    padding: "28px 0",
                    display: "flex",
                    flexDirection: isMobile ? "column" : "row",
                    alignItems: isMobile ? "flex-start" : "center",
                    gap: isMobile ? "16px" : "32px",
                  }}
                  data-testid={`upcoming-retreat-${i}`}
                >
                  {/* Date */}
                  <div style={{ flexShrink: 0, minWidth: "120px" }}>
                    <p
                      style={{
                        fontFamily: "Cormorant Garamond, serif",
                        fontSize: "22px",
                        fontWeight: 400,
                        color: "#F5F2EC",
                        lineHeight: 1.1,
                      }}
                    >
                      {retreat.date}
                    </p>
                  </div>

                  {/* Location + duration */}
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: "Figtree, sans-serif",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#F5F2EC",
                        marginBottom: "4px",
                      }}
                    >
                      {retreat.location}
                    </p>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "12px",
                        fontWeight: 300,
                        color: "rgba(245,242,236,0.42)",
                      }}
                    >
                      {retreat.duration}
                    </p>
                  </div>

                  {/* Spots + CTA row */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: isMobile ? "space-between" : "flex-start", gap: isMobile ? "0" : "20px", width: isMobile ? "100%" : "auto", flexShrink: 0 }}>
                    <span
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                        color:
                          retreat.status === "Open"
                            ? "rgba(80,130,80,0.9)"
                            : "rgba(200,169,106,0.8)",
                        background:
                          retreat.status === "Open"
                            ? "rgba(80,130,80,0.08)"
                            : "rgba(200,169,106,0.08)",
                        padding: "5px 12px",
                        borderRadius: "2px",
                        border: `1px solid ${
                          retreat.status === "Open"
                            ? "rgba(80,130,80,0.18)"
                            : "rgba(200,169,106,0.18)"
                        }`,
                      }}
                    >
                      {retreat.spots}
                    </span>

                    <button
                      onClick={() => setShowFinalForm(true)}
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "#C8A96A",
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid rgba(200,169,106,0.35)",
                        paddingBottom: "2px",
                        transition: "border-color 0.25s ease, color 0.25s ease",
                        cursor: "pointer",
                      }}
                      data-testid={`retreat-apply-${i}`}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </ScrollReveal>
            ))}

            {/* Bottom border */}
            <div style={{ borderTop: "1px solid rgba(245,242,236,0.08)" }} />
          </div>
        </div>
      </section>

      {/* ══ 7. FORMAT — Deep forest, same label/value rows ═══════════════════ */}
      <section
        className="ct-section"
        style={{ background: "#0F1A12" }}
        data-testid="retreat-format"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: isMobile ? "32px" : "80px", alignItems: "flex-start" }}>

            {/* Left: heading */}
            <div style={{ flex: isMobile ? "none" : "0 0 38%" }}>
              <ScrollReveal>
                <p className="ct-overline text-gold/60 mb-5">Format</p>
                <h2
                  style={{
                    fontFamily: "Figtree, sans-serif",
                    fontSize: "clamp(28px, 3.2vw, 44px)",
                    fontWeight: 400,
                    color: "#F5F2EC",
                    lineHeight: 1.1,
                  }}
                >
                  The Structure of a Retreat
                </h2>
              </ScrollReveal>
            </div>

            {/* Right: format rows */}
            <div style={{ flex: 1, paddingTop: "64px" }}>
              {FORMAT_ITEMS.map((item, i) => (
                <ScrollReveal key={i} delay={0.07 * i}>
                  <div
                    style={{
                      borderTop: i > 0 ? "1px solid rgba(245,242,236,0.07)" : "none",
                      padding: "22px 0",
                      display: "flex",
                      gap: "40px",
                      alignItems: "baseline",
                    }}
                    data-testid={`format-row-${i}`}
                  >
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "2px",
                        textTransform: "uppercase",
                        color: "rgba(200,169,106,0.55)",
                        flexShrink: 0,
                        minWidth: "100px",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "Manrope, sans-serif",
                        fontSize: "14px",
                        fontWeight: 300,
                        color: "rgba(245,242,236,0.6)",
                        lineHeight: 1.7,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
              <div style={{ borderTop: "1px solid rgba(245,242,236,0.07)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 8. TESTIMONIALS — Deep forest, glassmorphic card ════════════════ */}
      <section
        className="ct-section relative overflow-hidden"
        style={{ background: "#0F1A12" }}
        data-testid="retreat-testimonials"
      >
        <NeuralCanvas opacity={0.05} nodeCount={28} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-16">
          <ScrollReveal>
            <p className="ct-overline mb-10" style={{ color: "rgba(200,169,106,0.45)" }}>
              {t.home.testimonials.overline}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div
              style={{
                display: "flex",
                minHeight: "400px",
                background: "rgba(245,242,236,0.04)",
                backdropFilter: "blur(22px)",
                WebkitBackdropFilter: "blur(22px)",
                border: "1px solid rgba(200,169,106,0.14)",
                borderRadius: "16px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* Quote — full width */}
              <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "48px 36px" : "64px 80px", position: "relative" }}>
                <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "120px", lineHeight: 1, color: "rgba(200,169,106,0.06)", position: "absolute", top: "16px", left: "52px", userSelect: "none", pointerEvents: "none" }}>&ldquo;</span>
                <div style={{ position: "relative", minHeight: "220px" }}>
                  {testimonials.map((item, i) => (
                    <div key={i} style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "center", opacity: i === activeTestimonial ? 1 : 0, transform: i === activeTestimonial ? "translateY(0)" : "translateY(14px)", transition: "opacity 0.8s ease, transform 0.8s ease", pointerEvents: i === activeTestimonial ? "auto" : "none" }}>
                      <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 400, color: "#F5F2EC", lineHeight: 1.45, fontStyle: "italic" }}>
                        "{item.text}"
                      </p>
                      <div style={{ marginTop: "32px", display: "flex", alignItems: "center", gap: "14px" }}>
                        <div style={{ width: "28px", height: "1px", background: "rgba(200,169,106,0.5)" }} />
                        <div>
                          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 500, color: "rgba(200,169,106,0.9)", letterSpacing: "1.5px", textTransform: "uppercase" }}>{item.author}</p>
                          <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "12px", fontWeight: 300, color: "rgba(227,222,215,0.4)", marginTop: "3px" }}>{item.company}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Progress bar */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(200,169,106,0.07)" }}>
                <div key={activeTestimonial} style={{ height: "100%", background: "rgba(200,169,106,0.4)", animation: "progressSlide 6s linear forwards" }} />
              </div>
            </div>
          </ScrollReveal>
          {/* Text-based author navigation */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0", marginTop: "4px", paddingLeft: "4px", borderTop: "1px solid rgba(200,169,106,0.12)" }}>
            {testimonials.map((item, i) => (
              <button
                key={i}
                onClick={() => { setActiveTestimonial(i); restartTimer(testimonials.length); }}
                data-testid={`testimonial-nav-${i}`}
                style={{ background: "none", border: "none", padding: "20px 32px 20px 0", cursor: "pointer", textAlign: "left", position: "relative" }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: i === activeTestimonial ? "rgba(200,169,106,0.65)" : "transparent", transition: "background 0.4s ease" }} />
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 600, letterSpacing: "0.20em", textTransform: "uppercase", color: i === activeTestimonial ? "#F5F2EC" : "rgba(245,242,236,0.28)", transition: "color 0.4s ease", marginBottom: "4px" }}>
                  {item.author}
                </p>
                <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "10px", fontWeight: 300, color: i === activeTestimonial ? "rgba(200,169,106,0.70)" : "rgba(200,169,106,0.22)", transition: "color 0.4s ease", letterSpacing: "0.05em" }}>
                  {item.company}
                </p>
              </button>
            ))}
          </div>
        </div>
        <style>{`@keyframes progressSlide { from { width: 0%; } to { width: 100%; } }`}</style>
      </section>

      {/* ══ 9. FINAL CTA — Forest → Ivory gradient ═══════════════════════════ */}
      <section
        className="ct-section relative overflow-hidden"
        style={{
          background:
            "linear-gradient(to bottom, #0F1A12 0%, #162018 25%, #2A3825 48%, #8A9A80 68%, #CDD8C4 85%, #F5F2EC 100%)",
        }}
        data-testid="retreat-cta"
        data-final-cta="true"
        onClick={showFinalForm ? () => setShowFinalForm(false) : undefined}
      >
        <NeuralCanvas opacity={0.04} nodeCount={22} />
        <div className="relative z-10 max-w-[760px] mx-auto px-6">
          <ScrollReveal>
            <motion.div
              animate={{
                padding: showFinalForm
                  ? isMobile ? "32px 28px 36px" : "36px 56px 44px"
                  : isMobile ? "52px 28px" : "80px 72px",
                textAlign: showFinalForm ? "left" : "center",
              }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={e => e.stopPropagation()}
              style={{
                background: "rgba(15,26,18,0.92)",
                backdropFilter: "blur(28px)",
                WebkitBackdropFilter: "blur(28px)",
                border: "1px solid rgba(200,169,106,0.25)",
                borderRadius: "20px",
                position: "relative",
                overflow: showFinalForm ? "auto" : "hidden",
              }}
              data-testid="retreat-final-cta-card"
            >
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200,169,106,0.05) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", top: 0, left: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "48px", height: "1px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "absolute", bottom: 0, right: 0, width: "1px", height: "48px", background: "rgba(200,169,106,0.35)", zIndex: 1 }} />
              <div style={{ position: "relative", zIndex: 10 }}>
                <AnimatePresence mode="wait">
                  {!showFinalForm ? (
                    <motion.div
                      key="retreat-cta-content"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h2 style={{ fontFamily: "Figtree, sans-serif", fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, lineHeight: 1.1, color: "#F5F2EC" }}>
                        When You're Ready to Go Deeper
                      </h2>
                      <p style={{ fontFamily: "Manrope, sans-serif", fontSize: "15px", fontWeight: 300, color: "rgba(227,222,215,0.45)", lineHeight: 1.75, marginTop: "18px" }}>
                        Retreats are offered to leaders engaged in one of Cornelia's programmes. Enquiries are welcomed — to understand whether the timing and format are the right fit.
                      </p>
                      <button
                        onClick={() => setShowFinalForm(true)}
                        className="btn-secondary"
                        style={{ marginTop: "40px", borderRadius: "8px", display: "inline-block", cursor: "pointer" }}
                        data-testid="retreat-apply-btn"
                      >
                        Inquire About Retreats
                      </button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="retreat-form-content"
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <HeroContactForm onClose={() => setShowFinalForm(false)} noPadding sendFrom="Executive Retreat — Final CTA Section" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      </div>{/* end dark cluster */}

    </div>
  );
};

export default MeditationRetreat;
