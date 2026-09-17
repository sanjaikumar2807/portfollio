import React, { useEffect, useRef } from "react";
import { sounds } from "../utils/soundEffects";

export default function WebShooter() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const webs = [];

    class CyberWeb {
      constructor(x, y) {
        this.originX = x;
        this.originY = y;
        this.life = 1;
        this.decay = 0.016;
        this.rings = 4;
        this.rays = 12;
        this.radius = 0;
        this.maxRadius = 140 + Math.random() * 60;
        this.color = Math.random() > 0.4 ? "rgba(0, 243, 255," : "rgba(255, 30, 86,";
        this.nodes = [];

        // Generate perimeter anchors
        for (let i = 0; i < this.rays; i++) {
          const angle = (i / this.rays) * Math.PI * 2;
          this.nodes.push({
            angle,
            dist: this.maxRadius * (0.8 + Math.random() * 0.4),
          });
        }
      }

      update() {
        this.life -= this.decay;
        this.radius += (this.maxRadius - this.radius) * 0.18;
      }

      draw(c) {
        if (this.life <= 0) return;
        c.save();
        const alpha = Math.max(0, this.life);

        // Draw radial anchor lines (rays)
        c.strokeStyle = `${this.color} ${alpha * 0.75})`;
        c.lineWidth = 1.2;
        c.shadowColor = this.color.includes("0, 243") ? "#00f3ff" : "#ff1e56";
        c.shadowBlur = 10 * alpha;

        for (let i = 0; i < this.rays; i++) {
          const node = this.nodes[i];
          const currDist = (this.radius / this.maxRadius) * node.dist;
          const endX = this.originX + Math.cos(node.angle) * currDist;
          const endY = this.originY + Math.sin(node.angle) * currDist;

          c.beginPath();
          c.moveTo(this.originX, this.originY);
          c.lineTo(endX, endY);
          c.stroke();

          // Small node lights
          c.fillStyle = `${this.color} ${alpha})`;
          c.beginPath();
          c.arc(endX, endY, 2.5 * alpha, 0, Math.PI * 2);
          c.fill();
        }

        // Concentric spiral/ring segments
        for (let r = 1; r <= this.rings; r++) {
          const ringFraction = r / this.rings;
          const currentRingRadius = this.radius * ringFraction;
          c.beginPath();
          for (let i = 0; i <= this.rays; i++) {
            const node = this.nodes[i % this.rays];
            const px = this.originX + Math.cos(node.angle) * currentRingRadius;
            const py = this.originY + Math.sin(node.angle) * currentRingRadius;
            if (i === 0) c.moveTo(px, py);
            else c.lineTo(px, py);
          }
          c.strokeStyle = `${this.color} ${alpha * 0.45})`;
          c.lineWidth = 1;
          c.stroke();
        }

        // Center glowing impact dot
        c.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
        c.beginPath();
        c.arc(this.originX, this.originY, 4 * alpha, 0, Math.PI * 2);
        c.fill();

        c.restore();
      }
    }

    const handleClick = (e) => {
      // Avoid triggering when clicking interactive inputs or buttons directly
      const tag = e.target.tagName.toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select") return;
      
      webs.push(new CyberWeb(e.clientX, e.clientY));
      sounds.playWebSling();
    };

    window.addEventListener("pointerdown", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = webs.length - 1; i >= 0; i--) {
        webs[i].update();
        webs[i].draw(ctx);
        if (webs[i].life <= 0) {
          webs.splice(i, 1);
        }
      }
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointerdown", handleClick);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9990,
      }}
    />
  );
}
