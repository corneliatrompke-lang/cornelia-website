import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";

const BANNER_VIDEO_SRC = "/videos/foundation-intro.mp4";
const BANNER_POSTER_SRC = "/images/banner-image.webp";

// Fixed nav height — sticky inner content starts below this
const NAV_H = 80;

const N_PARTICLES = 70;

function initParticles(w, h) {
  const cx = w * 0.5;
  const cardCY = h * 0.75;
  return Array.from({ length: N_PARTICLES }, (_, i) => {
    const angle = (i / N_PARTICLES) * Math.PI * 2 + Math.random() * 0.5;
    const r = 100 + Math.random() * 360;
    return {
      sx: cx + Math.cos(angle) * r,
      sy: cardCY * 0.65 + Math.sin(angle) * r * 0.55,
      tx: cx + (Math.random() - 0.5) * 200,
      ty: cardCY + (Math.random() - 0.5) * 80,
      size: Math.random() * 3.0 + 0.8,
      baseA: Math.random() * 0.60 + 0.25,
      sf: 0.50 + Math.random() * 0.50,
      phase: Math.random() * Math.PI * 2,
    };
  });
}

// Helper function to interpolate values based on scroll progress
const interpolate = (progress, inputRange, outputRange) => {
  if (progress <= inputRange[0]) return outputRange[0];
  if (progress >= inputRange[inputRange.length - 1]) return outputRange[outputRange.length - 1];
  
  for (let i = 0; i < inputRange.length - 1; i++) {
    if (progress >= inputRange[i] && progress <= inputRange[i + 1]) {
      const t = (progress - inputRange[i]) / (inputRange[i + 1] - inputRange[i]);
      return outputRange[i] + t * (outputRange[i + 1] - outputRange[i]);
    }
  }
  return outputRange[outputRange.length - 1];
};

export default function FoundationSection() {
  const { t } = useLanguage();
  const outerRef  = useRef(null);
  const canvasRef = useRef(null);
  const videoRef = useRef(null);
  const particlesRef = useRef([]);
  const progressRef  = useRef(0);
  const rafRef = useRef(null);
  const [fp, setFp] = useState(0);
  const [isVideoInView, setIsVideoInView] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // JS-based responsive detection — avoids CSS class specificity conflicts
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : true
  );
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Video play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting && entry.intersectionRatio >= 0.5;
        setIsVideoInView(inView);
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  // Autoplay with sound when in view, pause when out of view
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoInView) {
      // Try to play with sound
      video.muted = false;
      const playPromise = video.play();
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            setIsMuted(false);
          })
          .catch(() => {
            // Autoplay with sound blocked, try muted
            video.muted = true;
            setIsMuted(true);
            video.play().then(() => setIsPlaying(true)).catch(() => {});
          });
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, [isVideoInView]);

  // Sync playing state with video events
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(video.muted);

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
    };
  }, []);

  // Video control handlers
  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen().catch(() => {});
    }
  };

  // Manual scroll tracking for reliability (RAF-throttled to reduce reflows)
  useEffect(() => {
    let rafId = null;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        rafId = requestAnimationFrame(() => {
          if (!outerRef.current) {
            ticking = false;
            return;
          }
          const rect = outerRef.current.getBoundingClientRect();
          const sectionHeight = outerRef.current.offsetHeight;
          const viewportHeight = window.innerHeight;
          
          // offset: ["start end", "end end"]
          // Progress starts at 0 when section top reaches viewport bottom
          // Progress ends at 1 when section bottom reaches viewport bottom
          const startPoint = viewportHeight; // section top at viewport bottom
          const endPoint = 0; // section bottom at viewport bottom
          
          const scrolled = startPoint - rect.top;
          const totalScrollable = sectionHeight;
          const progress = Math.max(0, Math.min(1, scrolled / totalScrollable));
          
          setFp(progress);
          progressRef.current = progress;
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // Desktop pins at fp ≈ 0.333 (100vh / 300vh)
  // Mobile  pins at fp ≈ 0.500 (100vh / 200vh)
  // Animations mapped so after-pin range = old total range → identical scroll speed

  // ── Banner slide-down reveal: starts showing bottom ~30%, slides to full ──
  const bannerSlide = interpolate(fp, [0, 0.333], [-518, 0]);

  // ── Desktop: images assemble after section pins ──────────────
  const circleX = interpolate(fp, [0.37, 0.72], [620, 0]);
  const circleO = interpolate(fp, [0.37, 0.52], [0, 1]);

  // ── Card rises after banner settles ─────────────────────────────
  const cardY = interpolate(fp, [0.50, 0.65], [180, 0]);
  const cardO = interpolate(fp, [0.50, 0.62], [0, 1]);

  // ── Text cascade ───────────────────────────────────────────────
  const dividerScaleX = interpolate(fp, [0.79, 0.87], [0, 1]);
  const dividerO      = interpolate(fp, [0.79, 0.85], [0, 1]);

  const headingY = interpolate(fp, [0.82, 0.91], [-100, 0]);
  const headingO = interpolate(fp, [0.82, 0.91], [0, 1]);

  const para0Y = interpolate(fp, [0.88, 0.95], [80, 0]);
  const para0O = interpolate(fp, [0.88, 0.95], [0, 1]);

  const para1Y = interpolate(fp, [0.92, 0.98], [80, 0]);
  const para1O = interpolate(fp, [0.92, 0.98], [0, 1]);

  // ── Mobile: text cascade after pin (fp=0.5) ─────────────────
  const mHeadingY = interpolate(fp, [0.60, 0.73], [-80, 0]);
  const mHeadingO = interpolate(fp, [0.59, 0.71], [0, 1]);

  const mPara0Y = interpolate(fp, [0.69, 0.80], [60, 0]);
  const mPara0O = interpolate(fp, [0.68, 0.79], [0, 1]);

  const mPara1Y = interpolate(fp, [0.78, 0.89], [60, 0]);
  const mPara1O = interpolate(fp, [0.76, 0.88], [0, 1]);

  // ── Particle canvas RAF ────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initP = () => {
      const w = (canvas.width  = canvas.offsetWidth  || 1200);
      const h = (canvas.height = canvas.offsetHeight || 700);
      particlesRef.current = initParticles(w, h);
    };

    initP();
    let alive = true;

    const loop = (ts) => {
      if (!alive) return;
      const prog = progressRef.current;

      if (prog > 0.02 && prog < 0.99) {
        const ctx = canvas.getContext("2d");
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        const conv    = Math.min(1, Math.max(0, (prog - 0.03) / 0.68));
        const fadeIn  = Math.min(1, prog / 0.18);
        const fadeOut = conv > 0.85 ? Math.max(0, 1 - (conv - 0.85) / 0.15) : 1;
        const tw = ts * 0.0012;

        particlesRef.current.forEach((p) => {
          const t = Math.pow(Math.min(1, conv * p.sf), 0.70);
          const x = p.sx + (p.tx - p.sx) * t;
          const y = p.sy + (p.ty - p.sy) * t;
          const twinkle = 0.60 + 0.40 * Math.sin(tw + p.phase);
          const a = p.baseA * fadeIn * fadeOut * twinkle;
          if (a < 0.01) return;

          const grd = ctx.createRadialGradient(x, y, 0, x, y, p.size * 4.0);
          grd.addColorStop(0, `rgba(200,169,106,${a * 0.70})`);
          grd.addColorStop(1, "rgba(200,169,106,0)");
          ctx.beginPath();
          ctx.arc(x, y, p.size * 4.0, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          ctx.beginPath();
          ctx.arc(x, y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(200,169,106,${a})`;
          ctx.fill();
        });
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", initP);
    return () => {
      alive = false;
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", initP);
    };
  }, []);

  return (
    // ── Outer section: 300vh on desktop (scroll driver), 150vh on mobile ──
    <section
      ref={outerRef}
      className="bg-ivory"
      style={{ height: isDesktop ? "300vh" : "200vh" }}
      data-testid="philosophy-section"
    >
      {/* ── Pinned inner frame: sticky on both desktop and mobile ───── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
          background: "#F5F2EC",
        }}
      >
        {/* Particle canvas — fills full sticky frame */}
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            zIndex: 10,
          }}
        />

        {/* ── Desktop collage ───────────────────────────────────── */}
        {/* Sub-container offset by nav height so images start below nav */}
        {isDesktop && <div
          style={{
            position: "absolute",
            top: NAV_H + 32,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {/* Centred layout wrapper */}
          <div
            style={{
              position: "relative",
              maxWidth: "1400px",
              margin: "0 auto",
              height: "100%",
            }}
          >
            {/* Banner — slides down from above, revealing bottom-first */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "13%",
                right: "13%",
                height: "clamp(350px, 55vh, 550px)",
                overflow: "hidden",
                transform: `translateY(${bannerSlide}px)`,
                transition: "transform 0.1s ease-out",
              }}
            >
              <video
                ref={videoRef}
                loop
                playsInline
                poster={BANNER_POSTER_SRC}
                preload="auto"
                style={{ 
                  width: "100%", 
                  height: "100%", 
                  objectFit: "cover", 
                  objectPosition: "center center",
                  borderRadius: "4px",
                }}
              >
                <source src={BANNER_VIDEO_SRC} type="video/mp4" />
              </video>
              
              {/* Custom Video Controls */}
              <div
                style={{
                  position: "absolute",
                  bottom: "16px",
                  left: "16px",
                  display: "flex",
                  gap: "8px",
                  zIndex: 10,
                }}
              >
                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pause" : "Play"}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(255,255,255,0.9)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    transition: "transform 0.15s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  {isPlaying ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#121212">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#121212">
                      <polygon points="5,3 19,12 5,21" />
                    </svg>
                  )}
                </button>

                {/* Mute/Unmute Button */}
                <button
                  onClick={toggleMute}
                  aria-label={isMuted ? "Unmute" : "Mute"}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(255,255,255,0.9)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    transition: "transform 0.15s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  {isMuted ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#121212">
                      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="#121212">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  )}
                </button>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  aria-label="Fullscreen"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    border: "none",
                    background: "rgba(255,255,255,0.9)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                    transition: "transform 0.15s ease",
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                  onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#121212">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Card centering wrapper
                top scales with banner: maintains ~13% overlap */}
            <div
              style={{
                position: "absolute",
                top: "clamp(300px, 45vh, 450px)",
                left: "50%",
                transform: "translateX(-50%)",
                width: "clamp(440px, 55%, 676px)",
                textAlign: "center",
                zIndex: 3,
              }}
            >
              <div
                style={{
                  background: "#F5F2EC",
                  padding: "28px 28px 0",
                  transform: `translateY(${cardY}px)`,
                  opacity: cardO,
                  transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
                }}
              >
                {/* Divider scales from centre */}
                <div
                  className="ct-divider mx-auto mb-6"
                  style={{
                    background: "rgba(18,18,18,0.2)",
                    opacity: dividerO,
                    transform: `scaleX(${dividerScaleX})`,
                    transformOrigin: "center",
                    transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
                  }}
                />

                {/* Heading — clips down from above, warm gold gradient tint */}
                <div style={{ overflow: "hidden", position: "relative" }}>
                  <h2
                    className="leading-[1.15]"
                    style={{
                      fontFamily: "Figtree, sans-serif",
                      fontSize: "clamp(26px, 3.2vw, 44px)",
                      fontWeight: 400,
                      background: "linear-gradient(160deg, #121212 30%, #3D2916 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      transform: `translateY(${headingY}px)`,
                      opacity: headingO,
                      transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
                    }}
                  >
                    {t.home.philosophy.headline}
                  </h2>
                </div>

                {/* Paragraphs clip up individually */}
                {t.home.philosophy.body.split("\n\n").map((para, i) => {
                  const py = i === 0 ? para0Y : para1Y;
                  const po = i === 0 ? para0O : para1O;
                  return (
                    <div key={i} style={{ overflow: "hidden", position: "relative" }}>
                      <p
                        className="text-charcoal/65 mt-5 leading-relaxed"
                        style={{
                          fontFamily: "Manrope, sans-serif",
                          fontSize: "16px",
                          fontWeight: 300,
                          transform: `translateY(${py}px)`,
                          opacity: po,
                          transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
                        }}
                      >
                        {para}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>}

        {/* ── Mobile: scroll-driven text cascade (text only, no images) ── */}
        {!isDesktop && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: `${NAV_H + 20}px 28px 48px`,
              textAlign: "center",
              zIndex: 2,
            }}
          >
            {/* Heading — drops from above */}
            <div style={{ overflow: "hidden", position: "relative", width: "100%" }}>
              <h2
                className="leading-[1.15]"
                style={{
                  fontFamily: "Figtree, sans-serif",
                  fontSize: "clamp(28px, 7vw, 44px)",
                  fontWeight: 400,
                  background: "linear-gradient(160deg, #121212 30%, #3D2916 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  transform: `translateY(${mHeadingY}px)`,
                  opacity: mHeadingO,
                  transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
                }}
              >
                {t.home.philosophy.headline}
              </h2>
            </div>

            {/* Paragraphs rise from below */}
            {t.home.philosophy.body.split("\n\n").map((para, i) => {
              const py = i === 0 ? mPara0Y : mPara1Y;
              const po = i === 0 ? mPara0O : mPara1O;
              return (
                <div key={i} style={{ overflow: "hidden", position: "relative", width: "100%" }}>
                  <p
                    className="text-charcoal/65 mt-5 leading-relaxed"
                    style={{
                      fontFamily: "Manrope, sans-serif",
                      fontSize: "16px",
                      fontWeight: 300,
                      transform: `translateY(${py}px)`,
                      opacity: po,
                      transition: "transform 0.1s ease-out, opacity 0.1s ease-out",
                    }}
                  >
                    {para}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
