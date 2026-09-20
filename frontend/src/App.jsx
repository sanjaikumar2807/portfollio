import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Scene3D from "./components/Scene3D";
import Cursor from "./components/Cursor";
import NavBar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import SectionTitle from "./components/SectionTitle";
import SkillOrb from "./components/SkillOrb";
import ProjectCard from "./components/ProjectCard";
import Skills3DOrbit from "./components/Skills3DOrbit";
import WebShooter from "./components/WebShooter";
import TerminalModal from "./components/TerminalModal";
import ContactSection from "./components/ContactSection";
import ResumeModal from "./components/ResumeModal";
import { sounds } from "./utils/soundEffects";

const API_BASE = "http://127.0.0.1:8000/api";

const DEFAULT_PROFILE = {
  name: "SANJAIKUMAR S",
  email: "sanjaikumar1135@gmail.com",
  phone: "+91 8015501005",
  location: "Ramapuram, Tamil Nadu",
  summary: "Aspiring web developer with a strong foundation in Python, HTML, CSS, JavaScript, and MySQL, focused on building practical, user-friendly web applications. Experienced in end-to-end project development through personal and hackathon projects, including a real-time bus tracking platform and an automated bank challan system. Proven ability to lead a technical team under deadline pressure, with hands-on exposure to requirement analysis and rapid prototyping.",
  github: "https://github.com/sanjaikumar2807",
  linkedin: "https://www.linkedin.com/in/sanjai-kumar-71b78a326/",
};

const DEFAULT_EDUCATION = [
  {
    institution: "Adhiparasakthi Engineering College, Melmaruvathur",
    degree: "B.E. Computer Science and Engineering",
    cgpa: "8.33",
    year: "Expected 2027",
  },
  {
    institution: "Kingston Matric Hr. Sec. School, Vandavasi",
    degree: "Higher Secondary Certificate (HSC)",
    cgpa: "76%",
    year: "2023",
  },
  {
    institution: "Sendhamizh Matric Hr. Sec. School, Kilkodungalur",
    degree: "Secondary School Leaving Certificate (SSLC)",
    cgpa: "",
    year: "2021",
  }
];

const DEFAULT_PROJECTS = [
  {
    title: "MyBusstand — Real-Time Bus Tracking Web App",
    description: "Developed a web application that helps users in villages and towns track real-time bus arrival information. Designed a user-friendly, responsive interface and implemented live bus route tracking to reduce commuter waiting time.",
    technologies: "HTML, CSS, JavaScript",
    link: "",
  },
  {
    title: "Bank Challan Filling Machine — Hackathon Project",
    description: "Built an automated system to digitally fill bank challans, reducing manual effort and human error. Led a team during the hackathon, managing task distribution and delivering a working prototype within the deadline.",
    technologies: "Python, HTML, CSS",
    link: "https://agent-6a9852bffa2c504e9398e396--bankchallann.netlify.app",
  }
];

function App() {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [projects, setProjects] = useState(DEFAULT_PROJECTS);
  const [skills, setSkills] = useState([]);
  const [education, setEducation] = useState(DEFAULT_EDUCATION);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, prRes, sRes, eRes] = await Promise.all([
          axios.get(`${API_BASE}/profile/`),
          axios.get(`${API_BASE}/projects/`),
          axios.get(`${API_BASE}/skills/`),
          axios.get(`${API_BASE}/education/`),
        ]);
        if (pRes.data && !pRes.data.error) setProfile(pRes.data);
        if (prRes.data && prRes.data.length > 0) setProjects(prRes.data);
        if (sRes.data && sRes.data.length > 0) setSkills(sRes.data);
        if (eRes.data && eRes.data.length > 0) setEducation(eRes.data);
      } catch (err) {
        console.warn("Backend API unavailable, using fallback:", err);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const progress = (el.scrollTop / (el.scrollHeight - el.clientHeight)) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        color: "white",
        backgroundImage: "url(/spiderman_bg.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "radial-gradient(ellipse at top, rgba(13, 22, 38, 0.82) 0%, rgba(3, 5, 7, 0.94) 80%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* Spider-Man Cyber Web-Shooter Interactive Particles */}
      <WebShooter />

      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Custom Cursor */}
      <Cursor />

      {/* 3D Scene */}
      <Scene3D />

      {/* Top Navbar */}
      <NavBar name={profile.name} onOpenResume={() => setIsResumeOpen(true)} />

      {/* Hero Section */}
      <HeroSection profile={profile} />

      {/* ===== ABOUT + EDUCATION ===== */}
      <section id="about" style={{ position: "relative", zIndex: 1, padding: "clamp(70px, 10vw, 120px) clamp(16px, 4vw, 24px)", maxWidth: "1100px", margin: "0 auto" }}>
        <SectionTitle number="01" title="About Me" subtitle="The Person Behind the Code" />

        <div className="responsive-grid-2">
          {/* About Card */}
          <motion.div
            className="about-card"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
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
              <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.2em", color: "#00f3ff", textTransform: "uppercase" }}>
                Available for Roles & Opportunities
              </span>
            </div>

            <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.85, fontSize: "0.95rem", marginBottom: "32px" }}>
              {profile.summary}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "16px", marginBottom: "28px" }}>
              {[
                { label: "Location", value: profile.location },
                { label: "Email", value: profile.email, cyan: true },
                { label: "Phone", value: profile.phone },
              ].map(({ label, value, cyan }) =>
                value ? (
                  <div key={label}>
                    <p style={{ fontSize: "0.68rem", color: "rgba(255,255,255,0.35)", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "4px" }}>
                      {label}
                    </p>
                    <p style={{ fontSize: "0.85rem", fontWeight: 700, color: cyan ? "#00f3ff" : "white", wordBreak: "break-all" }}>
                      {value}
                    </p>
                  </div>
                ) : null
              )}
            </div>

            <motion.button
              onClick={() => {
                sounds.playClick();
                setIsResumeOpen(true);
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{
                background: "linear-gradient(135deg, rgba(0,243,255,0.15), rgba(0,102,204,0.3))",
                border: "1px solid rgba(0,243,255,0.4)",
                color: "#00f3ff",
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "0.82rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>📄 VIEW HOLOGRAPHIC CV</span>
            </motion.button>
          </motion.div>

          {/* Education & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.215, 0.61, 0.355, 1] }}
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <h3 style={{ fontSize: "1rem", fontWeight: 800, color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "8px" }}>
              Education
            </h3>
            {education.map((edu, i) => (
              <motion.div
                key={i}
                className="edu-card"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
              >
                <h4 style={{ color: "white", fontWeight: 800, fontSize: "0.95rem", marginBottom: "4px" }}>{edu.institution}</h4>
                <p style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.82rem" }}>{edu.degree}</p>
                <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
                  <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#00f3ff" }}>{edu.year}</span>
                  {edu.cgpa && <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "#bc13fe" }}>CGPA: {edu.cgpa}</span>}
                </div>
              </motion.div>
            ))}

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "8px" }}>
              {[
                { value: `${projects.length || 2}+`, label: "Core Projects" },
                { value: `${skills.length || 9}+`, label: "Tech Masteries" },
              ].map(({ value, label }) => (
                <motion.div
                  key={label}
                  className="stat-badge"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="stat-value">{value}</span>
                  <span className="stat-label">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===== SKILLS (3D ORBIT + BADGES) ===== */}
      <section id="skills" style={{ position: "relative", zIndex: 1, padding: "clamp(70px, 10vw, 120px) clamp(16px, 4vw, 24px)", maxWidth: "1100px", margin: "0 auto" }}>
        <SectionTitle number="02" title="Technical Skills" subtitle="Skills & 3D Constellation" />
        <Skills3DOrbit />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(clamp(130px, 22vw, 160px), 1fr))",
            gap: "16px",
          }}
        >
          {skills.map((skill, i) => (
            <SkillOrb key={i} skill={skill} index={i} />
          ))}
        </div>
      </section>

      {/* ===== FEATURED WORK ===== */}
      <section id="projects" style={{ position: "relative", zIndex: 1, padding: "clamp(70px, 10vw, 120px) clamp(16px, 4vw, 24px)", maxWidth: "1100px", margin: "0 auto" }}>
        <SectionTitle number="03" title="Projects" subtitle="Engineered Systems & Applications" />
        <div className="responsive-projects-grid">
          {projects.map((proj, i) => (
            <ProjectCard key={i} project={proj} index={i} />
          ))}
        </div>
      </section>

      {/* ===== CONTACT TRANSMISSION ===== */}
      <ContactSection profile={profile} />

      {/* ===== FOOTER ===== */}
      <footer style={{ position: "relative", zIndex: 1, padding: "48px clamp(16px, 4vw, 24px) 80px", textAlign: "center" }}>
        <div className="footer-line" style={{ marginBottom: "24px" }} />
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          © {new Date().getFullYear()} {profile.name} • Fullstack & AI Systems • Crafted with Antigravity
        </p>
      </footer>

      {/* Interactive Developer CLI Terminal (Ctrl + K) */}
      <TerminalModal profile={profile} projects={projects} skills={skills} />

      {/* Holographic Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
        skills={skills}
        projects={projects}
        education={education}
      />
    </div>
  );
}

export default App;
