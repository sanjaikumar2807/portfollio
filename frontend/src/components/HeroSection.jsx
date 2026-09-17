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
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 48px",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      <div className="hero-glow" />

      {/* Two-column Hero: Left text + Right photo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          width: "100%",
          gap: "48px",
          flexWrap: "wrap",
        }}
      >
        {/* Left: Name + Text Content */}
        <div style={{ flex: 1, minWidth: "360px" }}>
          {/* Greeting Tag */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "rgba(0, 243, 255, 0.08)",
              border: "1px solid rgba(0, 243, 255, 0.25)",
              padding: "6px 14px",
              borderRadius: "9999px",
              marginBottom: "20px",
            }}
          >
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#00f3ff", boxShadow: "0 0 8px #00f3ff" }} />
            <span style={{ fontSize: "0.72rem", color: "#00f3ff", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase" }}>
              Open to Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <div style={{ marginBottom: "16px" }}>
            {words.map((word, wi) => (
              <div key={wi} style={{ display: "flex", gap: "4px", marginBottom: "4px" }}>
                {word.split("").map((char, ci) => (
                  <motion.span
                    key={`${wi}-${ci}`}
                    className="name-letter"
                    initial={{ opacity: 0, y: 80, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      delay: wi * 0.3 + ci * 0.04 + 0.4,
                      duration: 0.7,
                      ease: [0.215, 0.61, 0.355, 1],
                    }}
                    style={{
                      fontSize: "clamp(2.5rem, 7vw, 5.5rem)",
                      fontFamily: "'Outfit', sans-serif",
                      fontWeight: 900,
                      letterSpacing: "-0.03em",
                      lineHeight: 1,
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          {/* Typing role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "clamp(1rem, 2.5vw, 1.3rem)",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 500,
              marginBottom: "14px",
              height: "36px",
            }}
          >
            <span style={{ color: "#00f3ff", fontWeight: 700 }}>{"<"}</span>
            <span style={{ color: "#fff" }}>{displayed}</span>
            <span className="cursor-blink" style={{ color: "#00f3ff", fontWeight: 300 }}>|</span>
            <span style={{ color: "#00f3ff", fontWeight: 700 }}>{"/>"}</span>
          </motion.div>

          {/* Summary */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.9 }}
            style={{
              color: "rgba(255,255,255,0.5)",
              fontSize: "0.92rem",
              maxWidth: "500px",
              lineHeight: 1.8,
              marginBottom: "36px",
            }}
          >
            {profile?.summary?.slice(0, 140)}...
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.0, duration: 0.9 }}
            style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}
          >
            <a href={profile?.github} target="_blank" rel="noreferrer" className="btn-primary">
              GitHub
            </a>
            <a href={profile?.linkedin} target="_blank" rel="noreferrer" className="btn-secondary">
              LinkedIn
            </a>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-ghost"
            >
              Hire Me
            </button>
          </motion.div>
        </div>

        {/* Right: Cyber Profile Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.215, 0.61, 0.355, 1] }}
          style={{
            flex: "0 0 auto",
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Outer glow ring */}
          <div
            style={{
              position: "absolute",
              width: "370px",
              height: "370px",
              borderRadius: "50%",
              border: "2px solid rgba(0, 243, 255, 0.2)",
              boxShadow: "0 0 40px rgba(0, 243, 255, 0.1), inset 0 0 40px rgba(0, 243, 255, 0.05)",
              animation: "spin-slow 20s linear infinite",
            }}
          />
          {/* Middle dashed orbit ring */}
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              border: "1px dashed rgba(0, 243, 255, 0.12)",
              animation: "spin-slow 30s linear infinite reverse",
            }}
          />
          {/* Small orbiting dot */}
          <div
            style={{
              position: "absolute",
              width: "400px",
              height: "400px",
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
                boxShadow: "0 0 16px #00f3ff, 0 0 32px rgba(0, 243, 255, 0.5)",
              }}
            />
          </div>

          {/* Profile Image with Gradient Mask */}
          <div
            style={{
              width: "320px",
              height: "320px",
              borderRadius: "50%",
              overflow: "hidden",
              position: "relative",
              border: "3px solid rgba(0, 243, 255, 0.35)",
              boxShadow:
                "0 0 30px rgba(0, 243, 255, 0.25), 0 0 60px rgba(0, 243, 255, 0.1), inset 0 0 30px rgba(0, 0, 0, 0.4)",
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
            {/* Inner gradient shimmer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: "50%",
                background:
                  "linear-gradient(180deg, transparent 60%, rgba(3, 5, 7, 0.6) 100%)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Floating Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2 }}
            style={{
              position: "absolute",
              bottom: "15px",
              right: "-10px",
              background: "rgba(3, 7, 18, 0.88)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0, 243, 255, 0.3)",
              borderRadius: "10px",
              padding: "8px 14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 0 20px rgba(0, 243, 255, 0.15)",
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
            <span style={{ fontSize: "0.7rem", fontWeight: 700, color: "white", letterSpacing: "0.1em" }}>
              READY TO HIRE
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8 }}
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          Scroll
        </span>
        <div className="scroll-line" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
