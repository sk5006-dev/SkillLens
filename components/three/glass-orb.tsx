"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function GlassOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsedTime = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(elapsedTime * 0.5) * 0.15;
    meshRef.current.rotation.y = elapsedTime * 0.1;
    meshRef.current.rotation.x = elapsedTime * 0.05;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color="#FFFFFF"
        transmission={0.9}
        opacity={1}
        roughness={0.05}
        metalness={0.02}
        ior={1.5}
        thickness={1.5}
        specularIntensity={1.0}
        clearcoat={1.0}
        clearcoatRoughness={0.05}
      />
    </mesh>
  );
}
