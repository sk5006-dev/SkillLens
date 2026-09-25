"use client";

import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function AnimatedLights() {
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);
  const light3 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    if (light1.current) {
      light1.current.position.x = Math.sin(time * 0.7) * 3;
      light1.current.position.y = Math.cos(time * 0.5) * 3;
      light1.current.position.z = Math.cos(time * 0.3) * 2;
    }

    if (light2.current) {
      light2.current.position.x = Math.cos(time * 0.5) * 3;
      light2.current.position.y = Math.sin(time * 0.8) * 3;
      light2.current.position.z = Math.sin(time * 0.4) * 2;
    }

    if (light3.current) {
      light3.current.position.x = Math.sin(time * 0.4) * 3;
      light3.current.position.y = Math.cos(time * 0.6) * 3;
      light3.current.position.z = Math.sin(time * 0.6) * 2;
    }
  });

  return (
    <group>
      {/* Primary Light - Violet (#6C63FF) */}
      <pointLight ref={light1} intensity={2.0} distance={12} color="#6C63FF" />
      {/* Secondary Light - Cyan (#00D4FF) */}
      <pointLight ref={light2} intensity={2.0} distance={12} color="#00D4FF" />
      {/* Accent Light - Purple (#8B5CF6) */}
      <pointLight ref={light3} intensity={2.0} distance={12} color="#8B5CF6" />
      {/* Soft fill light */}
      <ambientLight intensity={0.15} />
    </group>
  );
}
