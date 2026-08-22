import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DecisionBoundaryFieldProps {
  position?: [number, number, number];
  opacity?: number;
  darkMode?: boolean;
}

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorHigh;
  uniform vec3 uColorLow;
  uniform vec3 uColorBoundary;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    vec2 p = (vUv - 0.5) * 8.0;
    
    // Non-linear decision manifold function (XGBoost non-linear frontier approximation)
    float wave1 = sin(p.x * 0.7 + uTime * 0.25) * cos(p.y * 0.65 + uTime * 0.2);
    float wave2 = sin(p.x * 1.4 - p.y * 1.1 + uTime * 0.15) * 0.45;
    float dist = p.x * 0.45 + p.y * 0.35 + wave1 + wave2;

    // Sigmoid probability
    float prob = 1.0 / (1.0 + exp(-dist * 2.2));

    // Contour lines / Decision equipotential isolines
    float contour = abs(fract(prob * 10.0 - 0.5) - 0.5);
    float contourLine = smoothstep(0.04, 0.0, contour) * 0.35;
    
    // Boundary line at prob = 0.5 (where default decision threshold flips)
    float boundaryLine = smoothstep(0.07, 0.0, abs(prob - 0.5)) * 0.85;

    // Grid coordinates
    vec2 gridUv = abs(fract(p * 1.5 - 0.5) - 0.5);
    float grid = smoothstep(0.03, 0.0, min(gridUv.x, gridUv.y)) * 0.14;

    // Base color blend
    vec3 baseColor = mix(uColorLow, uColorHigh, prob);
    vec3 finalColor = mix(baseColor, uColorBoundary, boundaryLine);
    finalColor += vec3(1.0) * (contourLine + grid * 0.6);

    // Subtle edge fade
    float edgeDist = length(vUv - 0.5) * 2.0;
    float vignette = smoothstep(1.2, 0.2, edgeDist);

    gl_FragColor = vec4(finalColor, uOpacity * vignette * 0.85);
  }
`;

export const DecisionBoundaryField: React.FC<DecisionBoundaryFieldProps> = ({
  position = [0, 0, -12],
  opacity = 0.65,
  darkMode = true
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => {
    return {
      uTime: { value: 0 },
      uColorHigh: { value: new THREE.Color(darkMode ? '#f43f5e' : '#e11d48') },
      uColorLow: { value: new THREE.Color(darkMode ? '#0284c7' : '#0369a1') },
      uColorBoundary: { value: new THREE.Color(darkMode ? '#fbbf24' : '#d97706') },
      uOpacity: { value: opacity }
    };
  }, [darkMode, opacity]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.6;
      materialRef.current.uniforms.uOpacity.value = opacity;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[36, 26, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};
