'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedHeroGeometries() {
  const meshRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const knotRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(t / 4) * 0.2;
      meshRef.current.rotation.y = Math.cos(t / 2) * 0.3;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15;
      ringRef.current.rotation.x = t * 0.1;
    }
    if (knotRef.current) {
      knotRef.current.rotation.y = -t * 0.2;
      knotRef.current.rotation.z = Math.sin(t * 0.5) * 0.2;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Central Distorted Bhagwa & Gold Sphere */}
      <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
        <Sphere args={[1.4, 64, 64]} position={[0, 0, 0]}>
          <MeshDistortMaterial
            color="#C96A00"
            emissive="#1E1B4B"
            roughness={0.2}
            metalness={0.8}
            distort={0.4}
            speed={2}
          />
        </Sphere>
      </Float>

      {/* Orbiting Wireframe Ring */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[2.5, 0.03, 16, 100]} />
        <meshStandardMaterial color="#D4A017" wireframe emissive="#C96A00" emissiveIntensity={0.5} />
      </mesh>

      {/* Floating Accent Torus Knot */}
      <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
        <mesh ref={knotRef} position={[3, 1.2, -1]} scale={0.6}>
          <torusKnotGeometry args={[1, 0.25, 128, 32]} />
          <meshStandardMaterial
            color="#D4A017"
            metalness={0.9}
            roughness={0.1}
            wireframe={true}
          />
        </mesh>
      </Float>

      {/* Background Floating Secondary Geometry */}
      <Float speed={1.8} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-3, -1.5, -2]} scale={0.75}>
          <icosahedronGeometry args={[1.2, 1]} />
          <meshStandardMaterial
            color="#1565C0"
            wireframe
            transparent
            opacity={0.35}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function ServiceHeroCanvas() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-gradient-to-b from-[#1E1B4B] to-[#1565C0]" />;
  }

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFF8F0" />
        <pointLight position={[-10, -10, -5]} intensity={0.8} color="#C96A00" />
        <AnimatedHeroGeometries />
      </Canvas>
    </div>
  );
}
