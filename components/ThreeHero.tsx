"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, OrbitControls, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.16;
    ref.current.rotation.y += delta * 0.22;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.25} floatIntensity={0.6}>
      <mesh ref={ref} position={[0.15, 0, 0]} scale={1.55}>
        <icosahedronGeometry args={[1, 4]} />
        <MeshDistortMaterial color="#ffd21a" roughness={0.27} metalness={0.18} distort={0.34} speed={1.6} />
      </mesh>
      <mesh rotation={[0.4, 0.4, 0.2]} scale={2.05}>
        <torusGeometry args={[1.55, 0.032, 16, 160]} />
        <meshStandardMaterial color="#ff3d9a" emissive="#ff3d9a" emissiveIntensity={0.18} />
      </mesh>
    </Float>
  );
}

export default function ThreeHero() {
  return (
    <div className="three-canvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.2], fov: 38 }} dpr={[1, 1.6]}>
        <ambientLight intensity={2.2} />
        <directionalLight position={[2, 3, 4]} intensity={2.6} />
        <pointLight position={[-3, -2, 3]} color="#ff3d9a" intensity={14} distance={8} />
        <Core />
        <Sparkles count={90} scale={6} size={1.5} speed={0.25} color="#ff3d9a" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
