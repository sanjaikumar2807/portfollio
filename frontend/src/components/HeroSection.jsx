import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const roles = ["Fullstack Web Developer", "Python Engineer", "Problem Solver", "Tech Enthusiast", "UI Craftsman"];

const HeroSection = ({ profile }) => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = roles[roleIndex];
    let timeout;
    if (!deleting && displayed.length < role.length) {
      timeout = setTimeout(() => setDisplayed(role.slice(0, displayed.length + 1)), 75);
    } else if (!deleting && displayed.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 38);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  const words = (profile?.name || "SANJAIKUMAR S").split(" ");

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "100px clamp(16px, 5vw, 48px) clamp(48px, 8vw, 80px)",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <div className="hero-glow" />

      {/* Main Hero Container */}
      <div
        className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1200px] gap-10 lg:gap-12"
      >
        {/* Left: Name + Text Content (Centered on mobile, Left on desktop) */}
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left flex-1 min-w-0 w-full">
          {/* Greeting Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(0, 243, 255, 0.08)",
              border: "1px solid rgba(0, 243, 255, 0.25)",
              padding: "6px 14px",
              borderRadius: "9999px",
              marginBottom: "18px",
              boxShadow: "0 0 16px rgba(0, 243, 255, 0.12)",
            }}
          >
            <div
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: "#00f3ff",
                boxShadow: "0 0 8px #00f3ff",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.72rem",
                color: "#00f3ff",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              Open to Opportunities
            </span>
          </motion.div>

          {/* Name - Unified Responsive Display */}
          <div
            className="flex flex-wrap items-baseline justify-center lg:justify-start gap-x-3 gap-y-1 mb-3"
            style={{ width: "100%" }}
          >
            {words.map((word, wi) => (
              <div key={wi} style={{ display: "inline-flex", gap: "2px" }}>
                {word.split("").map((char, ci) => (
                  <motion.span
                    key={`${wi}-${ci}`}
                    className="name-letter"
                    initial={{ opacity: 0, y: 60, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: wi * 0.15 + ci * 0.03 + 0.3,
                      duration: 0.6,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    style={{
                      fontSize: "clamp(2.4rem, 6.5vw, 5.2rem)",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 900,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.05,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          {/* Typing Role Capsule */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              background: "rgba(0, 243, 255, 0.05)",
              border: "1px solid rgba(0, 243, 255, 0.2)",
              borderRadius: "100px",
              fontSize: "clamp(0.88rem, 2.2vw, 1.15rem)",
              color: "rgba(255,255,255,0.85)",
              fontWeight: 500,
              marginBottom: "18px",
              backdropFilter: "blur(8px)",
              boxShadow: "0 0 20px rgba(0, 243, 255, 0.08)",
            }}
          >
            <span style={{ color: "#00f3ff", fontWeight: 800 }}>{"<"}</span>
            <span style={{ color: "#fff", fontWeight: 600 }}>{displayed}</span>
            <span className="cursor-blink" style={{ color: "#00f3ff", fontWeight: 300 }}>|</span>
            <span style={{ color: "#00f3ff", fontWeight: 800 }}>{"/>"}</span>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "clamp(0.85rem, 2vw, 0.94rem)",
              maxWidth: "520px",
              lineHeight: 1.8,
              marginBottom: "28px",
            }}
          >
            {profile?.summary?.slice(0, 150)}...
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
            className="flex flex-wrap items-center justify-center lg:justify-start gap-3 w-full"
          >
            <a href={profile?.github} target="_blank" rel="noreferrer" className="btn-primary">
              <span>🐙</span>
              <span>GitHub</span>
            </a>
            <a href={profile?.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">
              <span>💼</span>
              <span>LinkedIn</span>
            </a>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-ghost"
            >
              <span>⚡</span>
              <span>Hire Me</span>
            </button>
          </motion.div>
        </div>

        {/* Right: Cyber Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1.0, ease: [0.215, 0.61, 0.355, 1] }}
          style={{
            flex: "0 0 auto",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "clamp(250px, 68vw, 380px)",
            height: "clamp(250px, 68vw, 380px)",
            margin: "12px auto 0",
          }}
        >
          {/* Outer glow ring */}
          <div
            style={{
              position: "absolute",
              width: "92%",
              height: "92%",
              borderRadius: "50%",
              border: "2px solid rgba(0, 243, 255, 0.25)",
              boxShadow: "0 0 40px rgba(0, 243, 255, 0.15), inset 0 0 40px rgba(0, 243, 255, 0.08)",
              animation: "spin-slow 20s linear infinite",
            }}
          />
          {/* Middle dashed orbit ring */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "1px dashed rgba(0, 243, 255, 0.18)",
              animation: "spin-slow 30s linear infinite reverse",
            }}
          />
          {/* Small orbiting cyan dot */}
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              animation: "spin-slow 8s linear infinite",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "0",
                left: "50%",
                transform: "translateX(-50%)",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#00f3ff",
                boxShadow: "0 0 16px #00f3ff, 0 0 32px rgba(0, 243, 255, 0.6)",
              }}
            />
          </div>

          {/* Profile Image with Cyber Frame */}
          <div
            style={{
              width: "78%",
              height: "78%",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              border: "3px solid rgba(0, 243, 255, 0.4)",
              boxShadow:
                "0 0 35px rgba(0, 243, 255, 0.3), 0 0 70px rgba(0, 243, 255, 0.12), inset 0 0 30px rgba(0, 0, 0, 0.5)",
            }}
          >
            <img
              src="/sanjai_hero.jpg"
              alt="SanjaiKumar S - Fullstack Developer"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
                filter: "brightness(1.05) contrast(1.05)",
              }}
            />
            {/* Subtle bottom vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "linear-gradient(180deg, transparent 65%, rgba(3, 5, 7, 0.65) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Floating HUD Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8 }}
            style={{
              position: "absolute",
              bottom: "10px",
              right: "4px",
              background: "rgba(3, 7, 18, 0.92)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(0, 243, 255, 0.35)",
              borderRadius: "10px",
              padding: "7px 13px",
              display: "flex",
              alignItems: "center",
              gap: "7px",
              boxShadow: "0 0 24px rgba(0, 243, 255, 0.2)",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#27c93f",
                boxShadow: "0 0 10px #27c93f",
                animation: "pulse-glow 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "0.68rem",
                fontWeight: 800,
                color: "white",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
              }}
            >
              READY TO HIRE
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Desktop Scroll Indicator (hidden on mobile to prevent overlapping) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="hidden lg:flex"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "50%",
          transform: "translateX(-50%)",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            color: "rgba(255,255,255,0.35)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
        >
          Scroll
        </span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
