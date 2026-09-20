import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import SectionTitle from "./SectionTitle";
import { sounds } from "../utils/soundEffects";

const API_BASE = "http://127.0.0.1:8000/api";

export default function ContactSection({ profile }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus]     = useState("idle"); // idle | sending | success | error
  const [statusMsg, setStatusMsg] = useState("");
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    sounds.playClick?.();
    setStatus("sending");
    setStatusMsg("");

    // ── Try Django backend (sends real email to sanjaikumar1135@gmail.com) ──
    try {
      await axios.post(`${API_BASE}/contact/`, formData);
      sounds.playSuccess?.();
      setStatus("success");
      setStatusMsg("✅ Message transmitted successfully! Sanjai will reply soon.");
      setFormData({ name: "", email: "", message: "" });
      return;
    } catch (apiErr) {
      console.warn("Backend unavailable, trying mailto fallback:", apiErr);
    }

    // ── Fallback: open mailto link ──────────────────────────────────────────
    try {
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body    = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.open(
        `mailto:${profile?.email || "sanjaikumar1135@gmail.com"}?subject=${subject}&body=${body}`,
        "_blank"
      );
      setStatus("success");
      setStatusMsg("📬 Your email client opened — please hit Send to complete the transmission!");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setStatusMsg(
        `❌ Could not send. Email directly: ${profile?.email || "sanjaikumar1135@gmail.com"}`
      );
    }
  };

  const inputBase = {
    width: "100%",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.04)",
    borderRadius: "10px",
    color: "white",
    outline: "none",
    fontSize: "0.95rem",
    transition: "border-color 0.25s, box-shadow 0.25s, background 0.25s",
    boxSizing: "border-box",
    fontFamily: "inherit",
  };

  const inputStyle = (field) => ({
    ...inputBase,
    border: focusedField === field
      ? "1px solid #00f3ff"
      : "1px solid rgba(255,255,255,0.12)",
    boxShadow: focusedField === field
      ? "0 0 18px rgba(0,243,255,0.18)"
      : "none",
    background: focusedField === field
      ? "rgba(0,243,255,0.04)"
      : "rgba(255,255,255,0.04)",
  });

  const contactCards = [
    {
      icon: "📍",
      label: "Location",
      value: profile?.location || "Ramapuram, Tamil Nadu",
      href: null,
    },
    {
      icon: "✉️",
      label: "Email",
      value: profile?.email || "sanjaikumar1135@gmail.com",
      href: `mailto:${profile?.email || "sanjaikumar1135@gmail.com"}`,
      cyan: true,
    },
    {
      icon: "📞",
      label: "Phone",
      value: profile?.phone || "+91 8015501005",
      href: `tel:${(profile?.phone || "+918015501005").replace(/\s/g, "")}`,
    },
    {
      icon: "💼",
      label: "LinkedIn",
      value: "linkedin.com/in/sanjai-kumar",
      href: profile?.linkedin || "https://www.linkedin.com/in/sanjai-kumar-71b78a326/",
      cyan: true,
    },
    {
      icon: "🐙",
      label: "GitHub",
      value: "github.com/sanjaikumar2807",
      href: profile?.github || "https://github.com/sanjaikumar2807",
    },
  ];

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(70px, 10vw, 120px) clamp(16px, 4vw, 24px) 80px",
        maxWidth: "1100px",
        margin: "0 auto",
      }}
    >
      <SectionTitle number="04" title="Contact Me" subtitle="Send a Message Directly" />

      <div className="responsive-contact-grid">
        {/* ── Left: Info Panel ─────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {/* Main Card */}
          <div
            style={{
              background: "rgba(3, 7, 18, 0.78)",
              border: "1px solid rgba(0, 243, 255, 0.2)",
              borderRadius: "18px",
              padding: "clamp(20px, 4vw, 32px)",
              backdropFilter: "blur(14px)",
            }}
          >
            {/* Live dot */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "18px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#00f3ff",
                  boxShadow: "0 0 12px #00f3ff",
                  animation: "pulse-glow 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  color: "#00f3ff",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                }}
              >
                Active &amp; Ready to Connect
              </span>
            </div>

            <h3
              style={{
                fontSize: "1.75rem",
                fontWeight: 900,
                marginBottom: "12px",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
              }}
            >
              Let's Build Something{" "}
              <span style={{ color: "#00f3ff" }}>Extraordinary.</span>
            </h3>

            <p
              style={{
                color: "rgba(255,255,255,0.6)",
                fontSize: "0.9rem",
                lineHeight: 1.75,
                marginBottom: "28px",
              }}
            >
              Fill the form — your message goes straight to my Gmail inbox. 
              Open to fullstack roles, collaborations, and ambitious builds.
            </p>

            {/* Contact info rows */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {contactCards.map(({ icon, label, value, href, cyan }) => (
                <motion.div
                  key={label}
                  style={{ display: "flex", alignItems: "center", gap: "14px" }}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    style={{
                      width: "38px",
                      height: "38px",
                      borderRadius: "10px",
                      background: "rgba(0,243,255,0.08)",
                      border: "1px solid rgba(0,243,255,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: "0.67rem",
                        color: "rgba(255,255,255,0.38)",
                        textTransform: "uppercase",
                        letterSpacing: "0.12em",
                        marginBottom: "2px",
                      }}
                    >
                      {label}
                    </div>
                    {href ? (
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: cyan ? "#00f3ff" : "white",
                          fontWeight: 600,
                          fontSize: "0.88rem",
                          textDecoration: "none",
                          wordBreak: "break-all",
                        }}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ color: "white", fontWeight: 600, fontSize: "0.88rem" }}>
                        {value}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ── Right: Contact Form ───────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(3, 7, 18, 0.78)",
              border: "1px solid rgba(0, 243, 255, 0.2)",
              borderRadius: "18px",
              padding: "clamp(20px, 4vw, 36px)",
              backdropFilter: "blur(14px)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div style={{ marginBottom: "4px" }}>
              <p style={{ fontSize: "0.7rem", color: "rgba(0,243,255,0.7)", letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>
                📡 Message Transmission Panel
              </p>
              <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.45)", marginTop: "4px" }}>
                Your message will be delivered directly to my Gmail inbox.
              </p>
            </div>

            {/* Name */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "8px",
                  fontWeight: 700,
                }}
              >
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sanjaikumar S"
                required
                style={inputStyle("name")}
                onFocus={() => setFocusedField("name")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Email */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "8px",
                  fontWeight: 700,
                }}
              >
                Your Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. yourname@gmail.com"
                required
                style={inputStyle("email")}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Message */}
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "0.72rem",
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  marginBottom: "8px",
                  fontWeight: 700,
                }}
              >
                Message *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Let's talk about building something extraordinary..."
                required
                style={{ ...inputStyle("message"), resize: "vertical" }}
                onFocus={() => setFocusedField("message")}
                onBlur={() => setFocusedField(null)}
              />
            </div>

            {/* Status Banner */}
            <AnimatePresence>
              {statusMsg && (
                <motion.div
                  key="status"
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.97 }}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "10px",
                    fontSize: "0.86rem",
                    fontWeight: 600,
                    background:
                      status === "success"
                        ? "rgba(0, 243, 255, 0.08)"
                        : "rgba(255, 77, 109, 0.08)",
                    border:
                      status === "success"
                        ? "1px solid rgba(0,243,255,0.35)"
                        : "1px solid rgba(255,77,109,0.35)",
                    color: status === "success" ? "#00f3ff" : "#ff4d6d",
                  }}
                >
                  {statusMsg}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: status !== "sending" ? 1.02 : 1 }}
              whileTap={{ scale: status !== "sending" ? 0.97 : 1 }}
              style={{
                marginTop: "2px",
                padding: "16px",
                background:
                  status === "sending"
                    ? "linear-gradient(135deg, #005577 0%, #003366 100%)"
                    : "linear-gradient(135deg, #00f3ff 0%, #0066cc 100%)",
                border: "none",
                borderRadius: "10px",
                color: status === "sending" ? "rgba(255,255,255,0.5)" : "#030712",
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: status === "sending" ? "not-allowed" : "pointer",
                boxShadow:
                  status !== "sending" ? "0 0 28px rgba(0, 243, 255, 0.35)" : "none",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              {status === "sending" ? (
                <>
                  <span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>⏳</span>
                  TRANSMITTING...
                </>
              ) : (
                <>🚀 SEND TO GMAIL</>
              )}
            </motion.button>

            <p style={{ textAlign: "center", fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", marginTop: "-8px" }}>
              Delivered to sanjaikumar1135@gmail.com
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
