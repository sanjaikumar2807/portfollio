import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { sounds } from "../utils/soundEffects";

const links = [
  { label: "About", id: "about" },
  { label: "Technical Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Contact", id: "contact" }
];

const NavBar = ({ name, onOpenResume }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(sounds.isMuted());

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    sounds.playClick();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleToggleAudio = () => {
    const nextMute = sounds.toggleMute();
    setIsMuted(nextMute);
    if (!nextMute) sounds.playSuccess();
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "16px 36px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "all 0.5s",
        background: scrolled ? "rgba(3,5,7,0.85)" : "rgba(3,5,7,0.4)",
        backdropFilter: "blur(20px)",
        borderBottom: scrolled ? "1px solid rgba(0,243,255,0.15)" : "1px solid rgba(255,255,255,0.04)",
      }}
    >
      {/* Brand logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        onClick={() => {
          sounds.playWebSling();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        style={{
          fontSize: "1.1rem",
          fontWeight: 900,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          background: "linear-gradient(135deg, #00f3ff, #ff1e56)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          fontFamily: "'Outfit', sans-serif",
          cursor: "pointer",
        }}
      >
        {name || "SANJAIKUMAR S"}
      </motion.div>

      {/* Nav items + Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <div style={{ display: "flex", gap: "24px" }}>
          {links.map((link, i) => (
            <motion.button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              onMouseEnter={() => sounds.playHover()}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * i + 0.3 }}
              whileHover={{ y: -2 }}
              style={{
                background: "none",
                border: "none",
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.78rem",
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                transition: "color 0.2s",
                padding: "4px 0",
                cursor: "pointer",
              }}
              onMouseEnterCapture={(e) => (e.target.style.color = "#00f3ff")}
              onMouseLeaveCapture={(e) => (e.target.style.color = "rgba(255,255,255,0.6)")}
            >
              {link.label}
            </motion.button>
          ))}
        </div>

        {/* Action button: Holographic Resume Preview */}
        <motion.button
          onClick={() => {
            sounds.playClick();
            if (onOpenResume) onOpenResume();
          }}
          onMouseEnter={() => sounds.playHover()}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            background: "rgba(0, 243, 255, 0.1)",
            border: "1px solid rgba(0, 243, 255, 0.4)",
            borderRadius: "6px",
            padding: "6px 14px",
            color: "#00f3ff",
            fontSize: "0.72rem",
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span>📄</span>
          <span>CV PREVIEW</span>
        </motion.button>

        {/* Audio Mute / Unmute Toggle */}
        <motion.button
          onClick={handleToggleAudio}
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.9 }}
          title={isMuted ? "Audio Muted (Click to enable SFX)" : "Audio Active (Click to mute)"}
          style={{
            background: "none",
            border: "none",
            fontSize: "1.1rem",
            cursor: "pointer",
            padding: "4px",
            filter: isMuted ? "grayscale(100%) opacity(0.5)" : "drop-shadow(0 0 8px #00f3ff)",
          }}
        >
          {isMuted ? "🔇" : "🔊"}
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default NavBar;
