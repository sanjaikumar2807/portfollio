import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../utils/soundEffects";

const links = [
  { label: "About",    id: "about",    icon: "👤" },
  { label: "Skills",   id: "skills",   icon: "⚡" },
  { label: "Projects", id: "projects", icon: "🚀" },
  { label: "Contact",  id: "contact",  icon: "📬" },
];

const NavBar = ({ name, onOpenResume }) => {
  const [scrolled, setScrolled]           = useState(false);
  const [isMuted, setIsMuted]             = useState(sounds.isMuted());
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ── Track scroll + active section ──────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      // Find which section is currently in view
      let current = "";
      for (const link of links) {
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 140) current = link.id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll(); // run once on mount
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Instant smooth scroll ───────────────────────────────────────────────────
  const scrollTo = (id) => {
    sounds.playClick();
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleToggleAudio = () => {
    const nextMute = sounds.toggleMute();
    setIsMuted(nextMute);
    if (!nextMute) sounds.playSuccess();
  };

  return (
    <>
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
          padding: "0 clamp(16px, 4vw, 36px)",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          transition: "background 0.4s, border-color 0.4s",
          background: scrolled || mobileMenuOpen ? "rgba(3,5,7,0.92)" : "rgba(3,5,7,0.5)",
          backdropFilter: "blur(20px)",
          borderBottom: scrolled || mobileMenuOpen
            ? "1px solid rgba(0,243,255,0.2)"
            : "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => {
            sounds.playWebSling?.() || sounds.playClick();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          style={{
            fontSize: "clamp(0.88rem, 2.5vw, 1.05rem)",
            fontWeight: 900,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            background: "linear-gradient(135deg, #00f3ff, #ff1e56)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontFamily: "'Outfit', sans-serif",
            cursor: "pointer",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          {name || "SANJAIKUMAR S"}
        </motion.div>

        {/* Desktop Navigation Links (> 768px) */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "6px" }}
        >
          {links.map((link, i) => {
            const isActive = activeSection === link.id;
            return (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.3 }}
                whileHover={{ y: -2 }}
                style={{
                  position: "relative",
                  background: isActive ? "rgba(0,243,255,0.1)" : "none",
                  border: "none",
                  color: isActive ? "#00f3ff" : "rgba(255,255,255,0.6)",
                  fontSize: "0.76rem",
                  fontWeight: 700,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  transition: "color 0.2s, background 0.2s",
                  outline: "none",
                }}
                onMouseEnter={(e) => { sounds.playHover?.(); e.currentTarget.style.color = "#00f3ff"; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    style={{
                      position: "absolute",
                      bottom: "2px",
                      left: "14px",
                      right: "14px",
                      height: "2px",
                      background: "#00f3ff",
                      borderRadius: "2px",
                      boxShadow: "0 0 8px #00f3ff",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}

          <div style={{ width: "1px", height: "22px", background: "rgba(255,255,255,0.12)", margin: "0 8px" }} />

          {/* CV Preview Button */}
          <motion.button
            onClick={() => { sounds.playClick(); if (onOpenResume) onOpenResume(); }}
            onMouseEnter={() => sounds.playHover?.()}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            style={{
              background: "rgba(0, 243, 255, 0.1)",
              border: "1px solid rgba(0, 243, 255, 0.4)",
              borderRadius: "7px",
              padding: "6px 14px",
              color: "#00f3ff",
              fontSize: "0.72rem",
              fontWeight: 800,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "5px",
              outline: "none",
            }}
          >
            <span>📄</span>
            <span>CV</span>
          </motion.button>

          {/* Audio Toggle */}
          <motion.button
            onClick={handleToggleAudio}
            whileHover={{ scale: 1.15 }}
            whileTap={{ scale: 0.9 }}
            title={isMuted ? "Audio Muted (Click to enable)" : "Audio Active (Click to mute)"}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.1rem",
              cursor: "pointer",
              padding: "4px 6px",
              filter: isMuted
                ? "grayscale(100%) opacity(0.45)"
                : "drop-shadow(0 0 8px #00f3ff)",
              outline: "none",
            }}
          >
            {isMuted ? "🔇" : "🔊"}
          </motion.button>
        </div>

        {/* Mobile Control Group (< 768px) */}
        <div className="flex md:hidden" style={{ alignItems: "center", gap: "10px" }}>
          {/* Quick Audio Toggle */}
          <button
            onClick={handleToggleAudio}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.1rem",
              cursor: "pointer",
              padding: "4px",
              outline: "none",
            }}
          >
            {isMuted ? "🔇" : "🔊"}
          </button>

          {/* Hamburger Menu Button */}
          <motion.button
            onClick={() => {
              sounds.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            whileTap={{ scale: 0.9 }}
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "8px",
              background: mobileMenuOpen ? "rgba(0,243,255,0.18)" : "rgba(255,255,255,0.06)",
              border: "1px solid rgba(0, 243, 255, 0.35)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              cursor: "pointer",
              outline: "none",
            }}
            aria-label="Toggle navigation menu"
          >
            <span
              style={{
                width: "20px",
                height: "2px",
                background: "#00f3ff",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform: mobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
            />
            <span
              style={{
                width: "20px",
                height: "2px",
                background: "#00f3ff",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                opacity: mobileMenuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                width: "20px",
                height: "2px",
                background: "#00f3ff",
                borderRadius: "2px",
                transition: "all 0.3s ease",
                transform: mobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Cyber Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              position: "fixed",
              top: "64px",
              left: 0,
              right: 0,
              zIndex: 99,
              background: "rgba(3, 7, 18, 0.96)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid rgba(0, 243, 255, 0.3)",
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.7)",
              padding: "20px 24px 28px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            {links.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <motion.button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "14px",
                    padding: "14px 18px",
                    borderRadius: "10px",
                    background: isActive ? "rgba(0,243,255,0.12)" : "rgba(255,255,255,0.03)",
                    border: isActive ? "1px solid rgba(0,243,255,0.35)" : "1px solid rgba(255,255,255,0.06)",
                    color: isActive ? "#00f3ff" : "white",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{link.icon}</span>
                  <span>{link.label}</span>
                  {isActive && (
                    <span style={{ marginLeft: "auto", color: "#00f3ff", fontSize: "0.8rem" }}>● Active</span>
                  )}
                </motion.button>
              );
            })}

            {/* Mobile CV Button */}
            <motion.button
              onClick={() => {
                sounds.playClick();
                setMobileMenuOpen(false);
                if (onOpenResume) onOpenResume();
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "14px 18px",
                marginTop: "6px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, rgba(0,243,255,0.2), rgba(0,119,255,0.3))",
                border: "1px solid rgba(0, 243, 255, 0.5)",
                color: "#00f3ff",
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
              }}
            >
              <span>📄</span>
              <span>VIEW HOLOGRAPHIC CV</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;

