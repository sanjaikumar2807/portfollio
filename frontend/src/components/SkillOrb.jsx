import React from "react";
import { motion } from "framer-motion";

const categoryColors = {
  Frontend: "#00f3ff",
  Backend: "#bc13fe",
  Database: "#f59e0b",
  Tools: "#10b981",
  Language: "#ef4444",
  Framework: "#6366f1",
  default: "#ffffff",
};

const SkillOrb = ({ skill, index }) => {
  const color = categoryColors[skill.category] || categoryColors.default;

  return (
    <motion.div
      className="skill-orb"
      style={{ "--orb-color": color }}
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.04, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      whileHover={{ scale: 1.08, y: -6 }}
    >
      <div className="skill-orb-inner">
        <span className="skill-orb-name">{skill.name}</span>
        <span className="skill-orb-cat">{skill.category}</span>
      </div>
    </motion.div>
  );
};

export default SkillOrb;
