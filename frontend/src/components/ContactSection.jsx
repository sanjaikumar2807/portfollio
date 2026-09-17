import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import SectionTitle from "./SectionTitle";
import { sounds } from "../utils/soundEffects";

const API_BASE = "http://127.0.0.1:8000/api";

export default function ContactSection({ profile }) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [statusMsg, setStatusMsg] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    sounds.playClick();
    setStatus("sending");
    setStatusMsg("");

    try {
      const res = await axios.post(`${API_BASE}/contact/`, formData);
      sounds.playSuccess();
      setStatus("success");
      setStatusMsg(res.data.message || "Message transmitted successfully! Sanjai will reply soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Contact error:", err);
      setStatus("error");
      setStatusMsg("Connection timed out. You can email directly to sanjaikumar1135@gmail.com.");
    }
  };

  return (
    <section id="contact" style={{ position: "relative", zIndex: 1, padding: "120px 24px 80px", maxWidth: "1100px", margin: "0 auto" }}>
      <SectionTitle number="04" title="Contact Me" subtitle="Sanjaikumar S" />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "40px" }} className="md:grid-cols-2 grid-cols-1">
        {/* Left Side: Direct Contact Details & Availability */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          <div
            style={{
              background: "rgba(3, 7, 18, 0.75)",
              border: "1px solid rgba(0, 243, 255, 0.2)",
              borderRadius: "16px",
              padding: "32px",
              backdropFilter: "blur(12px)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  background: "#00f3ff",
                  boxShadow: "0 0 12px #00f3ff",
                }}
              />
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00f3ff", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Active & Ready to Connect
              </span>
            </div>

            <h3 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "14px", letterSpacing: "-0.02em" }}>
              Let's Build Something <span style={{ color: "#00f3ff" }}>Extraordinary.</span>
            </h3>

            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.95rem", lineHeight: 1.7, marginBottom: "28px" }}>
              Interested in fullstack web development, frontend engineering, or collaboration on ambitious projects? Drop a message right here.
            </p>

            {/* Quick Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontSize: "1.2rem" }}>📍</span>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Location</div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{profile?.location || "Ramapuram, Tamil Nadu"}</div>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontSize: "1.2rem" }}>✉️</span>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Direct Email</div>
                  <a href={`mailto:${profile?.email || "sanjaikumar1135@gmail.com"}`} style={{ color: "#00f3ff", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                    {profile?.email || "sanjaikumar1135@gmail.com"}
                  </a>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                <span style={{ fontSize: "1.2rem" }}>📞</span>
                <div>
                  <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase" }}>Phone</div>
                  <a href={`tel:${profile?.phone || "+918015501005"}`} style={{ color: "white", fontWeight: 600, fontSize: "0.9rem", textDecoration: "none" }}>
                    {profile?.phone || "+91 8015501005"}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Interactive Transmission Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "rgba(3, 7, 18, 0.75)",
              border: "1px solid rgba(0, 243, 255, 0.2)",
              borderRadius: "16px",
              padding: "36px",
              backdropFilter: "blur(12px)",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            }}
          >
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px" }}>
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Sanjaikumar S"
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  color: "white",
                  outline: "none",
                  fontSize: "0.95rem",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00f3ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px" }}>
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="e.g. sanjaikumar1135@gmail.com"
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  color: "white",
                  outline: "none",
                  fontSize: "0.95rem",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00f3ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "8px" }}>
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Let's talk about building something cool..."
                required
                style={{
                  width: "100%",
                  padding: "14px 16px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: "8px",
                  color: "white",
                  outline: "none",
                  fontSize: "0.95rem",
                  resize: "vertical",
                  transition: "border-color 0.2s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#00f3ff")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
              />
            </div>

            {statusMsg && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  background: status === "success" ? "rgba(0, 243, 255, 0.1)" : "rgba(255, 77, 109, 0.1)",
                  border: status === "success" ? "1px solid #00f3ff" : "1px solid #ff4d6d",
                  color: status === "success" ? "#00f3ff" : "#ff4d6d",
                }}
              >
                {statusMsg}
              </div>
            )}

            <motion.button
              type="submit"
              disabled={status === "sending"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                marginTop: "6px",
                padding: "16px",
                background: "linear-gradient(135deg, #00f3ff 0%, #0066cc 100%)",
                border: "none",
                borderRadius: "8px",
                color: "#030712",
                fontWeight: 800,
                fontSize: "0.9rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: status === "sending" ? "not-allowed" : "pointer",
                boxShadow: "0 0 24px rgba(0, 243, 255, 0.35)",
              }}
            >
              {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
