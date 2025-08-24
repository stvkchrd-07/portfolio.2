"use client";
import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useTheme } from 'next-themes';
import * as THREE from 'three';

type ParticlesProps = { isDark: boolean };

const Particles: React.FC<ParticlesProps> = ({ isDark }) => {
  const points = useRef<THREE.Points>(null);

  const particleCount = 2000;
  const positions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  const mouse = useRef<[number, number]>([0, 0]);

  React.useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mouse.current[0] = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current[1] = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    if (points.current) {
      points.current.rotation.y = -0.04 * elapsedTime;
      points.current.rotation.x = -0.04 * elapsedTime;
    }

    if (mouse.current[0] !== 0 && mouse.current[1] !== 0) {
      const targetX = mouse.current[0] * 0.2;
      const targetY = mouse.current[1] * 0.2;
      if (points.current) {
        points.current.rotation.y += (targetX - points.current.rotation.y) * 0.01;
        points.current.rotation.x += (targetY - points.current.rotation.x) * 0.01;
      }
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={isDark ? 0xFFFFFF : 0x000000} size={0.02} sizeAttenuation transparent opacity={0.8} />
    </points>
  );
};

const ThreeCanvas = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Canvas
      id="bg-canvas"
      camera={{ position: [0, 0, 10], fov: 75 }}
      dpr={[1, 2]} // Optimize for different pixel ratios
      performance={{ min: 0.5 }} // Allow frame drops if needed
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundColor: isDark ? '#000000' : '#FFFFFF',
      }}
    >
      <Suspense fallback={null}>
        <Particles isDark={isDark} />
      </Suspense>
    </Canvas>
  );
};

export default ThreeCanvas;