import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../utils/soundEffects";

export default function ResumeModal({ isOpen, onClose, profile, skills, projects, education }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    sounds.playSuccess();
    window.print();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          background: "rgba(0, 0, 0, 0.8)",
          backdropFilter: "blur(12px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            sounds.playClick();
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 30 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          style={{
            width: "100%",
            maxWidth: "820px",
            maxHeight: "90vh",
            background: "#070c14",
            border: "1px solid rgba(0, 243, 255, 0.4)",
            borderRadius: "16px",
            boxShadow: "0 0 50px rgba(0, 243, 255, 0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            color: "white",
          }}
        >
          {/* Header Action Bar */}
          <div
            style={{
              padding: "16px 24px",
              background: "rgba(0, 243, 255, 0.06)",
              borderBottom: "1px solid rgba(0, 243, 255, 0.2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "1.1rem" }}>📄</span>
              <span style={{ fontWeight: 800, letterSpacing: "0.15em", color: "#00f3ff", fontSize: "0.85rem", textTransform: "uppercase" }}>
                CV Preview
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <button
                onClick={handlePrint}
                style={{
                  background: "linear-gradient(135deg, #00f3ff, #0077ff)",
                  border: "none",
                  padding: "6px 14px",
                  borderRadius: "6px",
                  color: "#030712",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                }}
              >
                PRINT / SAVE PDF 📥
              </button>
              <button
                onClick={() => {
                  sounds.playClick();
                  onClose();
                }}
                style={{
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "white",
                  borderRadius: "6px",
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                }}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Resume Printable Body */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "clamp(20px, 4vw, 36px) clamp(16px, 4vw, 40px)",
              display: "flex",
              flexDirection: "column",
              gap: "24px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            {/* Top Identity */}
            <div style={{ borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "18px" }}>
              <h1 style={{ fontSize: "clamp(1.5rem, 5vw, 2.2rem)", fontWeight: 900, letterSpacing: "-0.02em", margin: "0 0 6px 0", color: "#00f3ff" }}>
                {profile?.name || "SANJAIKUMAR S"}
              </h1>
              <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.7)", margin: "0 0 12px 0" }}>
                Aspiring Fullstack Web Developer & Python Enthusiast
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", fontSize: "0.82rem", color: "rgba(255,255,255,0.6)" }}>
                <span>📍 {profile?.location || "Ramapuram, Tamil Nadu"}</span>
                <span>✉️ {profile?.email || "sanjaikumar1135@gmail.com"}</span>
                <span>📞 {profile?.phone || "+91 8015501005"}</span>
                {profile?.github && <span>🔗 <a href={profile.github} target="_blank" rel="noreferrer" style={{ color: "#00f3ff" }}>GitHub</a></span>}
                {profile?.linkedin && <span>💼 <a href={profile.linkedin} target="_blank" rel="noreferrer" style={{ color: "#00f3ff" }}>LinkedIn</a></span>}
              </div>
            </div>

            {/* Summary */}
            <div>
              <h3 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#00f3ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "8px" }}>
                Professional Summary
              </h3>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.7, color: "rgba(255,255,255,0.8)", margin: 0 }}>
                {profile?.summary || "Aspiring web developer with a strong foundation in Python, HTML, CSS, JavaScript, and MySQL, focused on building practical, user-friendly web applications. Experienced in end-to-end project development through personal and hackathon projects."}
              </p>
            </div>

            {/* Core Skills */}
            <div>
              <h3 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#00f3ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
                Technical Core
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {[
                  "Python", "JavaScript (ES6+)", "React.js", "MySQL", "HTML5 & CSS3",
                  "TailwindCSS", "Three.js", "Django REST Framework", "Git & GitHub", "REST APIs"
                ].map((sk) => (
                  <span
                    key={sk}
                    style={{
                      background: "rgba(0, 243, 255, 0.08)",
                      border: "1px solid rgba(0, 243, 255, 0.25)",
                      padding: "4px 12px",
                      borderRadius: "9999px",
                      fontSize: "0.8rem",
                      color: "white",
                      fontWeight: 600,
                    }}
                  >
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h3 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#00f3ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "14px" }}>
                Featured Engineering Projects
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#00f3ff" }}>Real-time Bus Tracking Platform</span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>Hackathon Project</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", margin: "0 0 8px 0", lineHeight: 1.6 }}>
                    Architected an end-to-end tracking system connecting commuter web clients with real-time transit telemetry, route navigation, and arrival forecasting.
                  </p>
                  <div style={{ fontSize: "0.75rem", color: "rgba(0,243,255,0.7)" }}>Tech: Python, WebSockets, JavaScript, Leaflet/Maps, API integration</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.03)", padding: "16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                    <span style={{ fontWeight: 800, fontSize: "0.95rem", color: "#00f3ff" }}>Automated Bank Challan System</span>
                    <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>Financial Utility</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.75)", margin: "0 0 8px 0", lineHeight: 1.6 }}>
                    Designed an automated digital slip generation system reducing physical waiting times and validating transactions with relational integrity.
                  </p>
                  <div style={{ fontSize: "0.75rem", color: "rgba(0,243,255,0.7)" }}>Tech: Python, MySQL, HTML/CSS/JS, Transaction Security</div>
                </div>
              </div>
            </div>

            {/* Education */}
            {education && education.length > 0 && (
              <div>
                <h3 style={{ fontSize: "0.82rem", fontWeight: 800, color: "#00f3ff", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "12px" }}>
                  Academic Credentials
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {education.map((edu, idx) => (
                    <div key={idx} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.88rem" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{edu.degree}</div>
                        <div style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.5)" }}>{edu.institution}</div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ color: "#00f3ff", fontWeight: 700 }}>{edu.cgpa ? `CGPA: ${edu.cgpa}` : ""}</div>
                        <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>{edu.year}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
