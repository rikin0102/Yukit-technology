'use client';

import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface ServiceCardCanvasProps {
  type: 'website' | 'webapp' | 'ai' | 'mobile' | 'cloud' | 'api' | 'design' | 'support';
}

function CardGeometry({ type }: { type: ServiceCardCanvasProps['type'] }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4;
      meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    }
  });

  const renderGeometry = () => {
    switch (type) {
      case 'website':
        return <sphereGeometry args={[1.1, 24, 24]} />;
      case 'webapp':
        return <boxGeometry args={[1.4, 1.4, 1.4]} />;
      case 'ai':
        return <octahedronGeometry args={[1.3, 0]} />;
      case 'mobile':
        return <cylinderGeometry args={[0.9, 0.9, 1.6, 16]} />;
      case 'cloud':
        return <torusGeometry args={[1.1, 0.4, 16, 32]} />;
      case 'api':
        return <icosahedronGeometry args={[1.2, 0]} />;
      case 'design':
        return <torusKnotGeometry args={[0.9, 0.25, 64, 16]} />;
      case 'support':
        return <dodecahedronGeometry args={[1.2, 0]} />;
      default:
        return <sphereGeometry args={[1.1, 24, 24]} />;
    }
  };

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={meshRef} scale={1}>
        {renderGeometry()}
        <meshStandardMaterial
          color="#C5A880"
          emissive="#2a1f10"
          roughness={0.25}
          metalness={0.8}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

export default function ServiceCardCanvas({ type }: ServiceCardCanvasProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-full h-full bg-[rgba(197,168,128,0.03)]" />;
  }

  return (
    <div className="w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#FCE7CA" />
        <CardGeometry type={type} />
      </Canvas>
    </div>
  );
}
