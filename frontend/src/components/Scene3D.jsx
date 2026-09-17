import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float, MeshDistortMaterial } from "@react-three/drei";

function AnimatedShape({ position, color, speed, scale, geometry }) {
  const meshRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = t * speed * 0.25;
      meshRef.current.rotation.y = t * speed * 0.4;
    }
  });
  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry === "octa" ? <octahedronGeometry args={[1, 0]} /> : <icosahedronGeometry args={[1, 0]} />}
        <MeshDistortMaterial
          color={color}
          speed={2}
          distort={0.28}
          radius={1}
          transparent
          opacity={0.65}
          wireframe={false}
        />
      </mesh>
    </Float>
  );
}

function WebParticles() {
  const points = useRef();
  const count = 220;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.getElapsedTime() * 0.018;
      points.current.rotation.x = state.clock.getElapsedTime() * 0.008;
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial color="#00f3ff" size={0.055} transparent opacity={0.45} sizeAttenuation />
    </points>
  );
}

const Scene3D = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
    <Canvas camera={{ position: [0, 0, 9], fov: 60 }}>
      <ambientLight intensity={0.15} />
      <pointLight position={[10, 10, 8]} intensity={0.8} color="#00f3ff" />
      <pointLight position={[-10, -8, -8]} intensity={0.8} color="#bc13fe" />
      <pointLight position={[0, -12, 0]} intensity={0.4} color="#f59e0b" />
      <Stars radius={100} depth={60} count={2800} factor={3} saturation={0} fade speed={0.4} />
      <WebParticles />
      <AnimatedShape position={[-3.5, 2.2, -2]} color="#00f3ff" speed={1.0} scale={0.9} geometry="octa" />
      <AnimatedShape position={[3.8, -1.8, -3]} color="#bc13fe" speed={1.4} scale={0.7} geometry="icosa" />
      <AnimatedShape position={[-1, -3.2, -1]} color="#f59e0b" speed={0.7} scale={0.45} geometry="octa" />
      <AnimatedShape position={[2, 3.5, -4]} color="#10b981" speed={1.1} scale={0.35} geometry="icosa" />
    </Canvas>
  </div>
);

export default Scene3D;
