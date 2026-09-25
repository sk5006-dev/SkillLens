"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function FloatingCube() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const elapsedTime = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.cos(elapsedTime * 0.6) * 0.2;
    groupRef.current.rotation.y = elapsedTime * 0.15;
    groupRef.current.rotation.z = elapsedTime * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Outer Wireframe Cube */}
      <mesh>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshBasicMaterial
          color="#00D4FF"
          wireframe
          transparent
          opacity={0.25}
        />
      </mesh>
      {/* Inner Solid/Physical Cube */}
      <mesh>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshPhysicalMaterial
          color="#8B5CF6"
          roughness={0.1}
          metalness={0.6}
          transparent
          opacity={0.7}
        />
      </mesh>
    </group>
  );
}
