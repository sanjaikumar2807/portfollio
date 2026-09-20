import React, { useState } from "react";
import { motion } from "framer-motion";

const ProjectCard = ({ project, index }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    // Only apply 3D tilt on devices with hover/mouse
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const techs = project.technologies
    ? project.technologies.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
        transition: "transform 0.15s ease",
      }}
      className="project-card"
    >
      <div className="project-shimmer" />
      <span className="project-number">0{index + 1}</span>
      {project.link ? (
        <a 
          href={project.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <h3
            className="project-title"
            style={{
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "color 0.2s",
            }}
          >
            <span>{project.title}</span>
            <span style={{ color: "#00f3ff", fontSize: "1.1rem" }}>↗</span>
          </h3>
        </a>
      ) : (
        <h3 className="project-title">{project.title}</h3>
      )}
      <p className="project-desc">{project.description}</p>
      <div className="project-tags">
        {techs.slice(0, 6).map((t, i) => (
          <span key={i} className="project-tag">{t}</span>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectCard;
