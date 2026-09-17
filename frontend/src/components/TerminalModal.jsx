import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sounds } from "../utils/soundEffects";

export default function TerminalModal({ profile, projects, skills }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    { type: "sys", text: "SANJAI OS [Version 3.4.0 - CYBER_NODE]" },
    { type: "sys", text: "Logged in as guest@sanjai-portfolio" },
    { type: "sys", text: "Type 'help' to see all available commands." },
  ]);
  const [cmdHistory, setCmdHistory] = useState([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [matrixActive, setMatrixActive] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  // Global Ctrl + K shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        sounds.playClick();
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
      sounds.playClick();
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleCommand = (cmd) => {
    const clean = cmd.trim().toLowerCase();
    if (!clean) return;

    sounds.playClick();
    setCmdHistory((prev) => [...prev, cmd]);
    setHistoryIdx(-1);

    const newEntries = [{ type: "user", text: `guest@sanjai:~$ ${cmd}` }];

    switch (clean) {
      case "help":
        newEntries.push({
          type: "out",
          text: `AVAILABLE COMMANDS:
  help        - Show this manual
  about       - Summary and developer profile
  skills      - List core technical proficiencies
  projects    - Show developed platforms and apps
  contact     - Reach out via Email, Phone, LinkedIn
  spiderman   - Spider-Man Easter Egg trigger
  matrix      - Toggle Cyber Matrix Digital Rain
  clear       - Wipe terminal screen
  exit        - Close this terminal session`,
        });
        break;

      case "about":
      case "bio":
        newEntries.push({
          type: "out",
          text: `${profile?.name || "SANJAIKUMAR S"}
${profile?.location || "Ramapuram, Tamil Nadu"}
--------------------------------------------------
${profile?.summary || "Aspiring web developer specialized in Python, JavaScript, and modern fullstack systems."}`,
        });
        break;

      case "skills":
        const skillText = (skills && skills.length > 0)
          ? skills.map((s) => `• ${s.name.padEnd(16)} [${"#".repeat(Math.floor(s.proficiency / 10))}${"-".repeat(10 - Math.floor(s.proficiency / 10))}] ${s.proficiency}% (${s.category})`).join("\n")
          : "• Python, JavaScript, React, MySQL, HTML5, CSS3, Three.js, Django";
        newEntries.push({ type: "out", text: skillText });
        break;

      case "projects":
        const projText = (projects && projects.length > 0)
          ? projects.map((p, i) => `[${i + 1}] ${p.title}
    Tech: ${p.technologies}
    Info: ${p.description}`).join("\n\n")
          : `[1] Real-time Bus Tracking Platform (Python, WebSockets, Maps)
[2] Automated Bank Challan Generation System (MySQL, Python, Web)`;
        newEntries.push({ type: "out", text: projText });
        break;

      case "contact":
        newEntries.push({
          type: "out",
          text: `CONTACT CHANNELS:
  Email    : ${profile?.email || "sanjaikumar1135@gmail.com"}
  Phone    : ${profile?.phone || "+91 8015501005"}
  GitHub   : ${profile?.github || "https://github.com/sanjaikumar"}
  LinkedIn : ${profile?.linkedin || "https://linkedin.com/in/sanjaikumar"}`,
        });
        break;

      case "spiderman":
        sounds.playWebSling();
        newEntries.push({
          type: "cyber",
          text: `🕷️ "With great power comes great responsibility!"
🕸️ Cyber Web-Shooter loaded. Click anywhere on screen to fire web strands!`,
        });
        break;

      case "matrix":
        setMatrixActive((prev) => !prev);
        newEntries.push({
          type: "cyber",
          text: !matrixActive ? "🟢 MATRIX DIGITAL STREAM INITIATED..." : "⚪ MATRIX STREAM TERMINATED.",
        });
        break;

      case "clear":
        setHistory([]);
        setInput("");
        return;

      case "exit":
      case "quit":
        setIsOpen(false);
        return;

      default:
        newEntries.push({
          type: "err",
          text: `Command not recognized: '${clean}'. Type 'help' for instructions.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newEntries]);
    setInput("");
  };

  const onKeyDown = (e) => {
    sounds.playTerminal();
    if (e.key === "Enter") {
      handleCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = historyIdx + 1 < cmdHistory.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - nextIdx] || "");
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput("");
      }
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 9980,
          display: "flex",
          alignItems: "center",
          gap: "10px",
          background: "rgba(3, 7, 18, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(0, 243, 255, 0.4)",
          padding: "10px 18px",
          borderRadius: "9999px",
          color: "#00f3ff",
          fontSize: "0.82rem",
          fontWeight: 700,
          letterSpacing: "0.15em",
          cursor: "pointer",
          boxShadow: "0 0 24px rgba(0, 243, 255, 0.25)",
        }}
      >
        <span style={{ color: "#00f3ff", fontSize: "0.95rem" }}>&gt;_</span>
        <span>TERMINAL</span>
        <span
          style={{
            fontSize: "0.65rem",
            padding: "2px 6px",
            background: "rgba(0, 243, 255, 0.12)",
            borderRadius: "4px",
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(0, 243, 255, 0.2)",
          }}
        >
          Ctrl+K
        </span>
      </motion.button>

      {/* Terminal Modal Dialog */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              background: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(10px)",
            }}
            onClick={(e) => {
              if (e.target === e.currentTarget) setIsOpen(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              style={{
                width: "100%",
                maxWidth: "720px",
                height: "460px",
                background: "rgba(5, 9, 15, 0.95)",
                border: "1px solid rgba(0, 243, 255, 0.35)",
                borderRadius: "14px",
                boxShadow: "0 0 45px rgba(0, 243, 255, 0.2)",
                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                fontFamily: "'Space Grotesk', monospace",
              }}
            >
              {/* Header Bar */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 18px",
                  background: "rgba(0, 243, 255, 0.05)",
                  borderBottom: "1px solid rgba(0, 243, 255, 0.15)",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ff5f56" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#ffbd2e" }} />
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#27c93f" }} />
                  <span style={{ fontSize: "0.75rem", color: "#00f3ff", marginLeft: "10px", fontWeight: 600 }}>
                    guest@sanjai-cyber-hud:~
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(255,255,255,0.6)",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    padding: "4px 8px",
                  }}
                >
                  ✕
                </button>
              </div>

              {/* Console Body */}
              <div
                style={{
                  flex: 1,
                  padding: "16px 20px",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  fontSize: "0.85rem",
                  lineHeight: 1.6,
                }}
                onClick={() => inputRef.current?.focus()}
              >
                {history.map((item, i) => (
                  <div key={i}>
                    {item.type === "sys" && (
                      <span style={{ color: "rgba(255,255,255,0.4)" }}>{item.text}</span>
                    )}
                    {item.type === "user" && (
                      <span style={{ color: "#00f3ff", fontWeight: 700 }}>{item.text}</span>
                    )}
                    {item.type === "out" && (
                      <pre style={{ color: "rgba(255,255,255,0.85)", margin: 0, whiteSpace: "pre-wrap" }}>
                        {item.text}
                      </pre>
                    )}
                    {item.type === "cyber" && (
                      <pre style={{ color: "#00f3ff", textShadow: "0 0 8px #00f3ff", margin: 0, whiteSpace: "pre-wrap" }}>
                        {item.text}
                      </pre>
                    )}
                    {item.type === "err" && (
                      <span style={{ color: "#ff4d6d" }}>{item.text}</span>
                    )}
                  </div>
                ))}

                {/* Active Input Line */}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "#00f3ff", fontWeight: 700 }}>guest@sanjai:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    style={{
                      flex: 1,
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      color: "white",
                      fontFamily: "'Space Grotesk', monospace",
                      fontSize: "0.85rem",
                    }}
                    autoFocus
                  />
                </div>
                <div ref={bottomRef} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
