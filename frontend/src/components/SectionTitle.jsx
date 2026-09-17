import React from "react";
import { motion } from "framer-motion";

const SectionTitle = ({ number, title, subtitle }) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
    style={{ textAlign: "center", marginBottom: "64px" }}
  >
    <motion.p
      initial={{ opacity: 0, letterSpacing: "0.6em" }}
      whileInView={{ opacity: 1, letterSpacing: "0.4em" }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.1 }}
      style={{
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "0.4em",
        textTransform: "uppercase",
        color: "#00f3ff",
        marginBottom: "12px",
      }}
    >
      {number} — {subtitle}
    </motion.p>
    <h2 className="section-title">{title}</h2>
    <div className="section-underline" />
  </motion.div>
);

export default SectionTitle;
