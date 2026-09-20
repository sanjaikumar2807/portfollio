import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";

const TECH_ITEMS = [
  { name: "Python", color: "#3776ab", desc: "Core & Algorithms", ring: 1.8, speed: 0.7 },
  { name: "React", color: "#00f3ff", desc: "Interactive UI", ring: 2.5, speed: 0.6 },
  { name: "JavaScript", color: "#f7df1e", desc: "ES6+ Logic", ring: 3.2, speed: 0.5 },
  { name: "MySQL", color: "#00758f", desc: "Database Architecture", ring: 2.1, speed: 0.65 },
  { name: "Django", color: "#092e20", desc: "RESTful Backend", ring: 3.6, speed: 0.45 },
  { name: "Three.js", color: "#ff1e56", desc: "3D Visuals", ring: 2.8, speed: 0.55 },
  { name: "HTML5 / CSS3", color: "#e34f26", desc: "Responsive Design", ring: 1.5, speed: 0.75 },
  { name: "Git / GitHub", color: "#f05032", desc: "Version Control", ring: 3.9, speed: 0.4 },
];

function OrbitNode({ item, index, total }) {
  const groupRef = useRef();
  const initialAngle = (index / total) * Math.PI * 2;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * item.speed * 0.4 + initialAngle;
    const x = Math.cos(t) * item.ring;
    const z = Math.sin(t) * item.ring;
    const y = Math.sin(t * 1.5) * 0.4;
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        {/* Central glowing core mesh */}
        <mesh>
          <sphereGeometry args={[0.16, 16, 16]} />
          <meshStandardMaterial
            color={item.color}
            emissive={item.color}
            emissiveIntensity={1.8}
            roughness={0.1}
          />
        </mesh>
        {/* Outer subtle glow wireframe */}
        <mesh>
          <icosahedronGeometry args={[0.26, 1]} />
          <meshBasicMaterial color={item.color} wireframe transparent opacity={0.35} />
        </mesh>

        {/* HTML Badge floating above node */}
        <Html distanceFactor={8} position={[0, 0.35, 0]} center>
          <div
            style={{
              background: "rgba(5, 9, 15, 0.88)",
              border: `1px solid ${item.color}`,
              boxShadow: `0 0 16px ${item.color}44`,
              color: "white",
              padding: "4px 10px",
              borderRadius: "8px",
              fontSize: "11px",
              fontWeight: 700,
              whiteSpace: "nowrap",
              backdropFilter: "blur(6px)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {item.name}
          </div>
        </Html>
      </Float>
    </group>
  );
}

function OrbitRings() {
  return (
    <group rotation={[Math.PI / 6, 0, 0]}>
      {[1.5, 2.1, 2.8, 3.6].map((radius, i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[radius - 0.01, radius + 0.01, 64]} />
          <meshBasicMaterial color="#00f3ff" transparent opacity={0.1} />
        </mesh>
      ))}
    </group>
  );
}

export default function Skills3DOrbit() {
  return (
    <div
      style={{
        width: "100%",
        height: "clamp(280px, 48vw, 440px)",
        position: "relative",
        borderRadius: "16px",
        overflow: "hidden",
        background: "radial-gradient(circle at center, rgba(0, 243, 255, 0.08) 0%, rgba(3, 5, 7, 0.95) 75%)",
        border: "1px solid rgba(0, 243, 255, 0.2)",
        boxShadow: "inset 0 0 40px rgba(0, 243, 255, 0.05)",
        marginBottom: "48px",
        touchAction: "pan-y",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "16px",
          left: "20px",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00f3ff", display: "inline-block" }} />
          <span style={{ fontSize: "0.72rem", color: "#00f3ff", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700 }}>
            3D Skills Orbital Network
          </span>
        </div>
        <p style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)", margin: "4px 0 0 16px" }}>
          Drag to rotate constellation
        </p>
      </div>

      <Canvas camera={{ position: [0, 2.2, 5.5], fov: 50 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#00f3ff" />
        <pointLight position={[-10, -10, -10]} intensity={1.2} color="#ff1e56" />

        {/* Central Pulsing Sphere */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color="#00f3ff"
            emissive="#0066cc"
            emissiveIntensity={1.2}
            roughness={0.2}
            wireframe
          />
        </mesh>

        <OrbitRings />

        {TECH_ITEMS.map((item, idx) => (
          <OrbitNode key={item.name} item={item} index={idx} total={TECH_ITEMS.length} />
        ))}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxDistance={8}
          minDistance={3.5}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}
