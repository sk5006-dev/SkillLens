"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const elapsedTime = state.clock.getElapsedTime();
    // Up and down movement
    meshRef.current.position.y = Math.sin(elapsedTime * 0.8) * 0.25;
    // Rotation
    meshRef.current.rotation.y = elapsedTime * 0.2;
    meshRef.current.rotation.x = elapsedTime * 0.1;
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshPhysicalMaterial
        color="#6C63FF"
        roughness={0.15}
        metalness={0.9}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        reflectivity={1.0}
      />
    </mesh>
  );
}
