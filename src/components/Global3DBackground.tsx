import React, { useMemo, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import {
  EffectComposer,
  RenderPass,
  EffectPass,
  BloomEffect,
  DepthOfFieldEffect,
  VignetteEffect
} from 'postprocessing';
import { BackgroundPresetMode } from '../types';

// ─── SHOCKWAVE STATE MANAGER (SINGLETON FOR 3D CANVAS & EVENT PROPAGATION) ───
interface ShockwaveData {
  x: number;
  y: number;
  time: number;
  intensity: number;
}
const activeShockwaves: ShockwaveData[] = [];

export function triggerGlobal3DShockwave(x: number, y: number, intensity: number = 1.0) {
  activeShockwaves.push({ x, y, time: performance.now(), intensity });
  if (activeShockwaves.length > 5) activeShockwaves.shift();
}

// ─── CAMERA PARALLAX CONTROLLER WITH GYROSCOPIC TILT & SMOOTH LERP ───
export function CameraParallax({ presetMode = 'cosmic' }: { presetMode?: BackgroundPresetMode }) {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetRot = useRef(new THREE.Euler(0, 0, 0));

  useFrame(() => {
    // Parallax magnitude changes with preset
    const multiplier = presetMode === 'quantum' ? 0.65 : presetMode === 'zen' ? 0.15 : 0.4;
    const targetZ = presetMode === 'topographic' ? 7.2 : 8.0;

    targetPos.current.set(pointer.x * multiplier, pointer.y * (multiplier * 0.65), targetZ);
    camera.position.lerp(targetPos.current, 0.045);

    // Subtle 3D angular pitch & yaw tilt
    targetRot.current.set(
      -pointer.y * 0.05 * multiplier,
      pointer.x * 0.08 * multiplier,
      0
    );
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, targetRot.current.x, 0.04);
    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, targetRot.current.y, 0.04);
  });

  return null;
}

// ─── 3D TOPOGRAPHIC LOSS LANDSCAPE / DECISION BOUNDARY SURFACE ───
const decisionVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHoverIntensity;
  uniform float uShockwaveIntensity;
  uniform vec2 uShockwaveCenter;
  uniform float uShockwaveAge;
  uniform int uPresetMode; // 0=cosmic, 1=topographic, 2=constellation, 3=quantum, 4=zen

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying float vElevation;

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Normalizing grid coords (-1 to 1)
    vec2 p = (uv - 0.5) * 8.0;
    vec2 mPos = (uMouse - 0.5) * 8.0;
    float mDist = length(p - mPos);

    // 1. Autonomous multi-frequency terrain wave equations
    float wave1 = sin(p.x * 0.8 + uTime * 0.35) * cos(p.y * 0.75 + uTime * 0.28);
    float wave2 = sin(p.x * 1.6 - p.y * 1.3 + uTime * 0.2) * 0.35;
    float wave3 = cos(length(p) * 1.8 - uTime * 0.4) * 0.25;

    // 2. Interactive cursor terrain deformation (elevates when hovered)
    float cursorLift = exp(-mDist * 1.1) * uHoverIntensity * 0.8;
    float cursorSwirl = sin(mDist * 4.0 - uTime * 3.5) * exp(-mDist * 0.9) * uHoverIntensity * 0.35;

    // 3. Shockwave ripple displacement
    float shockDist = length(p - uShockwaveCenter);
    float shockRing = exp(-pow((shockDist - uShockwaveAge * 4.5), 2.0) * 1.5) * uShockwaveIntensity;
    float shockWave = sin(shockDist * 6.0 - uShockwaveAge * 10.0) * shockRing * 0.65;

    float totalElevation = (wave1 + wave2 + wave3 + cursorLift + cursorSwirl + shockWave);

    // If topographic mode is active, exaggerate 3D vertex displacement
    if (uPresetMode == 1) {
      pos.z += totalElevation * 1.8;
    } else {
      pos.z += totalElevation * 0.45;
    }

    vElevation = totalElevation;
    vWorldPosition = (modelMatrix * vec4(pos, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const decisionFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uHoverIntensity;
  uniform vec3 uColorHigh;
  uniform vec3 uColorLow;
  uniform vec3 uColorBoundary;
  uniform float uOpacity;
  uniform int uPresetMode;
  uniform bool uDarkMode;

  varying vec2 vUv;
  varying vec3 vWorldPosition;
  varying float vElevation;

  void main() {
    vec2 p = (vUv - 0.5) * 8.0;
    vec2 mPos = (uMouse - 0.5) * 8.0;
    float mDist = length(p - mPos);

    // Iso-contour lines and probability decision boundary
    float prob = 1.0 / (1.0 + exp(-vElevation * 1.8));
    
    // Topographic contour ridges
    float contourCount = uPresetMode == 1 ? 16.0 : 8.0;
    float contour = abs(fract(prob * contourCount - 0.5) - 0.5);
    float contourLine = smoothstep(0.06, 0.0, contour) * (uPresetMode == 1 ? 0.65 : 0.28);

    // Central decision frontier separator line
    float boundaryLine = smoothstep(0.08, 0.0, abs(prob - 0.5)) * 0.75;

    // Celestial cursor aura ripple
    float cursorGlow = smoothstep(2.2, 0.0, mDist) * uHoverIntensity * 0.5;
    vec3 magicalGlow = uDarkMode
      ? mix(vec3(0.88, 0.11, 0.28), vec3(0.98, 0.75, 0.25), sin(uTime * 1.5) * 0.5 + 0.5)
      : mix(vec3(0.88, 0.11, 0.28), vec3(0.95, 0.45, 0.55), sin(uTime * 1.5) * 0.5 + 0.5);

    vec3 baseColor = mix(uColorLow, uColorHigh, prob);
    vec3 finalColor = mix(baseColor, uColorBoundary, boundaryLine);
    finalColor += (uDarkMode ? vec3(0.9, 0.95, 1.0) : vec3(0.9, 0.2, 0.35)) * contourLine;
    finalColor += magicalGlow * cursorGlow;

    // Edge vignette mask
    float edgeDist = length(vUv - 0.5) * 2.0;
    float vignette = smoothstep(1.35, 0.2, edgeDist);

    float modeOpacity = uPresetMode == 4 ? 0.08 : uPresetMode == 1 ? 0.52 : uOpacity;
    gl_FragColor = vec4(finalColor, modeOpacity * vignette);
  }
`;

export function DecisionBoundaryPlane({ 
  darkMode, 
  presetMode = 'cosmic' 
}: { 
  darkMode: boolean;
  presetMode?: BackgroundPresetMode;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();

  const modeEnum = presetMode === 'cosmic' ? 0 : presetMode === 'topographic' ? 1 : presetMode === 'constellation' ? 2 : presetMode === 'quantum' ? 3 : 4;

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHoverIntensity: { value: 0.0 },
    uShockwaveIntensity: { value: 0.0 },
    uShockwaveCenter: { value: new THREE.Vector2(0, 0) },
    uShockwaveAge: { value: 0.0 },
    uColorHigh: { value: new THREE.Color(darkMode ? '#6366f1' : '#fecdd3') },
    uColorLow: { value: new THREE.Color(darkMode ? '#06b6d4' : '#fff5f7') },
    uColorBoundary: { value: new THREE.Color(darkMode ? '#fbbf24' : '#e11d48') },
    uOpacity: { value: darkMode ? 0.38 : 0.18 },
    uPresetMode: { value: modeEnum },
    uDarkMode: { value: darkMode }
  }), [darkMode, modeEnum]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.5;
      const targetMouseX = pointer.x * 0.5 + 0.5;
      const targetMouseY = pointer.y * 0.5 + 0.5;
      materialRef.current.uniforms.uMouse.value.x = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.x,
        targetMouseX,
        0.06
      );
      materialRef.current.uniforms.uMouse.value.y = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uMouse.value.y,
        targetMouseY,
        0.06
      );
      materialRef.current.uniforms.uHoverIntensity.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uHoverIntensity.value,
        1.0,
        0.04
      );

      // Check for latest shockwaves
      if (activeShockwaves.length > 0) {
        const latest = activeShockwaves[activeShockwaves.length - 1];
        const age = (performance.now() - latest.time) / 1000;
        if (age < 2.5) {
          materialRef.current.uniforms.uShockwaveAge.value = age;
          materialRef.current.uniforms.uShockwaveIntensity.value = (1.0 - age / 2.5) * latest.intensity;
          materialRef.current.uniforms.uShockwaveCenter.value.set(latest.x, latest.y);
        } else {
          materialRef.current.uniforms.uShockwaveIntensity.value = 0.0;
        }
      }
    }
  });

  return (
    <mesh position={[0, 0, -11]}>
      <planeGeometry args={[44, 32, 64, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={decisionVertexShader}
        fragmentShader={decisionFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// ─── 3D SYNAPTIC SPARK TRAIL PACKET SYSTEM ───
interface SparkParticle {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: THREE.Color;
  size: number;
}

// ─── 3D NEURAL POINT-CLOUD, DELAUNAY CONSTELLATION & ROTATING POLYHEDRA ───
export function NeuralPointCloudGroup({ 
  darkMode, 
  presetMode = 'cosmic' 
}: { 
  darkMode: boolean;
  presetMode?: BackgroundPresetMode;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const polyhedraRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const lastRippleTriggerRef = useRef<number>(0);

  // Generate 3D spatial points arranged in a deep Fibonacci lattice with orbital satellites
  const pointsData = useMemo(() => {
    const pts = [];
    const count = presetMode === 'quantum' ? 180 : presetMode === 'zen' ? 45 : 120;
    let seed = 42;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const colors = darkMode 
      ? ['#e11d48', '#38bdf8', '#818cf8', '#fbbf24', '#34d399', '#c084fc'] 
      : ['#e11d48', '#be123c', '#9f1239', '#fb7185', '#d97706', '#4f46e5'];

    for (let i = 0; i < count; i++) {
      // Golden spiral distribution for natural galactic node placement
      const theta = i * 2.39996323; // Golden angle in radians
      const r = Math.sqrt(i / count) * 13;
      const x = Math.cos(theta) * r + (rnd() - 0.5) * 2.5;
      const y = Math.sin(theta) * r * 0.75 + (rnd() - 0.5) * 2.0;
      const z = -7.0 + (rnd() * 4.5);
      const isHub = i % 12 === 0;

      pts.push({ 
        id: i,
        x, 
        y, 
        z, 
        baseX: x,
        baseY: y,
        baseZ: z,
        vx: 0,
        vy: 0,
        vz: 0,
        color: colors[Math.floor(rnd() * colors.length)], 
        baseSize: isHub ? (0.045 + rnd() * 0.02) : (0.022 + rnd() * 0.025),
        twinklePhase: rnd() * Math.PI * 2,
        twinkleSpeed: 0.8 + rnd() * 1.5,
        rippleGlow: 0.0,
        isHub,
        orbitRadius: isHub ? 0.35 + rnd() * 0.25 : 0,
        orbitSpeed: (rnd() > 0.5 ? 1 : -1) * (1.2 + rnd() * 1.5),
        orbitPhase: rnd() * Math.PI * 2
      });
    }
    return pts;
  }, [darkMode, presetMode]);

  // Compute 3D constellation link lines and adjacency table
  const { linesGeometry, adjacency } = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const adj: Map<number, Array<{ id: number; dist: number }>> = new Map();
    const maxDist = presetMode === 'constellation' ? 4.2 : 3.4;

    for (let i = 0; i < pointsData.length; i++) {
      adj.set(i, []);
    }

    for (let i = 0; i < pointsData.length; i++) {
      let conns = 0;
      const maxConns = pointsData[i].isHub ? 4 : 2;
      for (let j = i + 1; j < pointsData.length && conns < maxConns; j++) {
        const p1 = pointsData[i];
        const p2 = pointsData[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (d < maxDist) {
          positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
          const c1 = new THREE.Color(p1.color);
          const c2 = new THREE.Color(p2.color);
          colors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
          adj.get(i)?.push({ id: j, dist: d });
          adj.get(j)?.push({ id: i, dist: d });
          conns++;
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return { linesGeometry: geo, adjacency: adj };
  }, [pointsData, presetMode]);

  // Synaptic sparks traveling across connections
  const sparksRef = useRef<SparkParticle[]>([]);
  useEffect(() => {
    const sparks: SparkParticle[] = [];
    const sparkCount = presetMode === 'quantum' ? 24 : presetMode === 'zen' ? 4 : 14;

    for (let s = 0; s < sparkCount; s++) {
      const from = Math.floor(Math.random() * pointsData.length);
      const neighbors = adjacency.get(from) || [];
      if (neighbors.length > 0) {
        const to = neighbors[Math.floor(Math.random() * neighbors.length)].id;
        sparks.push({
          fromNode: from,
          toNode: to,
          progress: Math.random(),
          speed: 0.25 + Math.random() * 0.45,
          color: new THREE.Color(pointsData[from].color),
          size: 0.028
        });
      }
    }
    sparksRef.current = sparks;
  }, [pointsData, adjacency, presetMode]);

  // Instanced nodes and spark points
  const [instMesh, setInstMesh] = useState<THREE.InstancedMesh | null>(null);
  const [sparkMesh, setSparkMesh] = useState<THREE.InstancedMesh | null>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cObj = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.035) * 0.03;
      groupRef.current.rotation.x = Math.cos(t * 0.025) * 0.02;
    }
    if (polyhedraRef.current) {
      polyhedraRef.current.rotation.x += delta * 0.12;
      polyhedraRef.current.rotation.y += delta * 0.15;
    }

    if (!instMesh) return;

    // Approximate pointer position projected in 3D coordinates
    const ptr3DX = pointer.x * 9.5;
    const ptr3DY = pointer.y * 6.5;
    const now = performance.now();

    // Check if cursor interacts with any node to propagate energy ripples
    pointsData.forEach((p) => {
      const dx = p.x - ptr3DX;
      const dy = p.y - ptr3DY;
      const distToCursor = Math.sqrt(dx * dx + dy * dy);

      if (distToCursor < 1.8 && now - lastRippleTriggerRef.current > 200) {
        lastRippleTriggerRef.current = now;
        p.rippleGlow = 1.0;

        // Propagate to adjacent nodes with distance-based delay/decay
        const neighbors = adjacency.get(p.id) || [];
        neighbors.forEach(({ id: nId, dist }) => {
          const neighbor = pointsData[nId];
          if (neighbor) {
            const decay = Math.exp(-dist / 1.8);
            setTimeout(() => {
              neighbor.rippleGlow = Math.max(neighbor.rippleGlow, decay * 0.9);
            }, (dist / 3.0) * 120);
          }
        });
      }
    });

    // Check latest shockwaves to apply physical impulse to nodes
    let shockPushX = 0;
    let shockPushY = 0;
    let shockRadius = 0;
    if (activeShockwaves.length > 0) {
      const latest = activeShockwaves[activeShockwaves.length - 1];
      const age = (now - latest.time) / 1000;
      if (age < 2.0) {
        shockRadius = age * 6.0;
        shockPushX = latest.x * 8.0;
        shockPushY = latest.y * 5.5;
      }
    }

    pointsData.forEach((p, idx) => {
      // Elastic spring physics toward base position
      const springK = 2.8;
      const damping = 0.88;

      let targetX = p.baseX;
      let targetY = p.baseY;

      // Hub nodes have gentle 3D satellite drift
      if (p.isHub) {
        targetX += Math.cos(t * p.orbitSpeed + p.orbitPhase) * p.orbitRadius;
        targetY += Math.sin(t * p.orbitSpeed + p.orbitPhase) * p.orbitRadius;
      }

      // Cursor repulsion & magnetic vortex
      const dx = p.x - ptr3DX;
      const dy = p.y - ptr3DY;
      const distToCursor = Math.sqrt(dx * dx + dy * dy);
      const isHovered = distToCursor < 3.0;
      const hoverFactor = isHovered ? Math.max(0, 1 - distToCursor / 3.0) : 0;

      if (distToCursor < 2.8 && distToCursor > 0.05) {
        const force = (1 - distToCursor / 2.8) * 0.4;
        p.vx += (dx / distToCursor) * force;
        p.vy += (dy / distToCursor) * force;

        // Vortex spin torque
        p.vx += (-dy / distToCursor) * force * 0.35;
        p.vy += (dx / distToCursor) * force * 0.35;
      }

      // Shockwave ring impulse
      if (shockRadius > 0) {
        const sDx = p.x - shockPushX;
        const sDy = p.y - shockPushY;
        const sDist = Math.sqrt(sDx * sDx + sDy * sDy);
        const ringDiff = Math.abs(sDist - shockRadius);
        if (ringDiff < 1.2 && sDist > 0.1) {
          const sForce = (1 - ringDiff / 1.2) * 0.55;
          p.vx += (sDx / sDist) * sForce;
          p.vy += (sDy / sDist) * sForce;
          p.rippleGlow = Math.max(p.rippleGlow, sForce);
        }
      }

      // Integrate velocity and spring forces
      p.vx = (p.vx + (targetX - p.x) * springK * delta) * damping;
      p.vy = (p.vy + (targetY - p.y) * springK * delta) * damping;
      p.x += p.vx;
      p.y += p.vy;

      // Smooth decay of ripple energy
      if (p.rippleGlow > 0.01) {
        p.rippleGlow *= 0.94;
      } else {
        p.rippleGlow = 0;
      }

      // Dynamic scale with twinkle & starlight sheen
      const twinkle = 1.0 + Math.sin(t * p.twinkleSpeed + p.twinklePhase) * 0.22;
      const effectiveScale = p.baseSize * twinkle * (1.0 + hoverFactor * 0.95 + p.rippleGlow * 1.35);

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(effectiveScale, effectiveScale, effectiveScale);
      dummy.updateMatrix();
      instMesh.setMatrixAt(idx, dummy.matrix);

      cObj.set(p.color);
      const totalGlow = Math.min(1.0, hoverFactor * 0.8 + p.rippleGlow * 1.3);
      if (totalGlow > 0.01) {
        cObj.lerp(new THREE.Color('#ffffff'), totalGlow * 0.7);
        cObj.multiplyScalar(1.2 + totalGlow * 1.1);
      } else {
        cObj.multiplyScalar(0.95);
      }
      instMesh.setColorAt(idx, cObj);
    });

    instMesh.instanceMatrix.needsUpdate = true;
    if (instMesh.instanceColor) instMesh.instanceColor.needsUpdate = true;

    // Update synaptic sparks moving along edges
    if (sparkMesh && sparksRef.current.length > 0) {
      sparksRef.current.forEach((spark, sIdx) => {
        spark.progress += delta * spark.speed;
        if (spark.progress >= 1.0) {
          spark.progress = 0.0;
          spark.fromNode = spark.toNode;
          const nextNeighbors = adjacency.get(spark.toNode) || [];
          if (nextNeighbors.length > 0) {
            spark.toNode = nextNeighbors[Math.floor(Math.random() * nextNeighbors.length)].id;
          }
        }

        const pA = pointsData[spark.fromNode];
        const pB = pointsData[spark.toNode];
        if (pA && pB) {
          const sX = THREE.MathUtils.lerp(pA.x, pB.x, spark.progress);
          const sY = THREE.MathUtils.lerp(pA.y, pB.y, spark.progress);
          const sZ = THREE.MathUtils.lerp(pA.z, pB.z, spark.progress) + 0.05;

          dummy.position.set(sX, sY, sZ);
          const sparkScale = spark.size * (1.0 + Math.sin(spark.progress * Math.PI) * 0.6);
          dummy.scale.set(sparkScale, sparkScale, sparkScale);
          dummy.updateMatrix();
          sparkMesh.setMatrixAt(sIdx, dummy.matrix);

          cObj.set(spark.color);
          cObj.multiplyScalar(1.8); // High luminous bloom
          sparkMesh.setColorAt(sIdx, cObj);
        }
      });
      sparkMesh.instanceMatrix.needsUpdate = true;
      if (sparkMesh.instanceColor) sparkMesh.instanceColor.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {/* 3D Instanced Neural Nodes */}
      <instancedMesh
        ref={(el) => setInstMesh(el)}
        args={[undefined as any, undefined as any, pointsData.length]}
      >
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      {/* 3D Instanced Synaptic Sparks */}
      <instancedMesh
        ref={(el) => setSparkMesh(el)}
        args={[undefined as any, undefined as any, sparksRef.current.length || 14]}
      >
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      {/* 3D Delaunay & Constellation Connecting Lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={darkMode ? 0.22 : 0.32}
          depthWrite={false}
        />
      </lineSegments>

      {/* Rotating 3D Geometric Analytical Polyhedra (Icosahedron wireframe in corner) */}
      <group ref={polyhedraRef} position={[8.5, 4.2, -6.5]}>
        <mesh>
          <icosahedronGeometry args={[1.4, 0]} />
          <meshBasicMaterial 
            wireframe 
            color={darkMode ? '#e11d48' : '#e11d48'} 
            transparent 
            opacity={darkMode ? 0.18 : 0.25} 
          />
        </mesh>
        <mesh>
          <octahedronGeometry args={[0.8, 0]} />
          <meshBasicMaterial 
            wireframe 
            color={darkMode ? '#fbbf24' : '#be123c'} 
            transparent 
            opacity={darkMode ? 0.22 : 0.3} 
          />
        </mesh>
      </group>

      <group position={[-9.0, -3.8, -7.0]}>
        <mesh>
          <dodecahedronGeometry args={[1.2, 0]} />
          <meshBasicMaterial 
            wireframe 
            color={darkMode ? '#38bdf8' : '#fb7185'} 
            transparent 
            opacity={darkMode ? 0.16 : 0.22} 
          />
        </mesh>
      </group>
    </group>
  );
}

// ─── POSTPROCESSING EFFECT COMPOSER WITH TRY-CATCH SAFETY WRAPPER ───
interface PostProcessComposerProps {
  performanceTier: 'high' | 'medium' | 'low';
}

export function PostProcessComposer({ performanceTier }: PostProcessComposerProps) {
  const { gl, scene, camera, size } = useThree();
  const composerRef = useRef<EffectComposer | null>(null);

  useEffect(() => {
    if (performanceTier === 'low') {
      composerRef.current = null;
      return;
    }

    try {
      const composer = new EffectComposer(gl, {
        multisampling: performanceTier === 'high' ? 4 : 0,
        frameBufferType: THREE.HalfFloatType
      });

      composer.addPass(new RenderPass(scene, camera));

      const effects = [];

      // 1. Bloom Effect for synaptic node glow
      const bloomEffect = new BloomEffect({
        intensity: 0.42,
        luminanceThreshold: 0.25,
        luminanceSmoothing: 0.85,
        mipmapBlur: true
      });
      effects.push(bloomEffect);

      // 2. Depth of Field Effect (on high-tier devices)
      if (performanceTier === 'high') {
        const dofEffect = new DepthOfFieldEffect(camera, {
          focusDistance: 0.02,
          focalLength: 0.05,
          bokehScale: 2.2
        });
        effects.push(dofEffect);
      }

      // 3. Subtle Cinematic Vignette Effect
      const vignetteEffect = new VignetteEffect({
        offset: 0.2,
        darkness: 0.5
      });
      effects.push(vignetteEffect);

      composer.addPass(new EffectPass(camera, ...effects));
      composer.setSize(size.width, size.height);

      composerRef.current = composer;
    } catch (err) {
      console.warn('[Global3DBackground] Postprocessing initialization skipped, using fallback render:', err);
      composerRef.current = null;
    }

    return () => {
      if (composerRef.current) {
        composerRef.current.dispose();
        composerRef.current = null;
      }
    };
  }, [gl, scene, camera, size.width, size.height, performanceTier]);

  useFrame((_, delta) => {
    if (composerRef.current) {
      gl.autoClear = false;
      gl.clear();
      composerRef.current.render(delta);
    }
  }, 1);

  return null;
}

// ─── GLOBAL 3D BACKGROUND COMPONENT ───
export interface Global3DBackgroundProps {
  motionEnabled?: boolean;
  presetMode?: BackgroundPresetMode;
}

export const Global3DBackground: React.FC<Global3DBackgroundProps> = ({ 
  motionEnabled = true,
  presetMode = 'cosmic'
}) => {
  const [performanceTier, setPerformanceTier] = useState<'high' | 'medium' | 'low'>('high');
  const [isDark, setIsDark] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Global click listener to propagate shockwaves into 3D world
    const handleGlobalClick = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth - 0.5) * 2.0;
      const normY = -(e.clientY / window.innerHeight - 0.5) * 2.0;
      triggerGlobal3DShockwave(normX, normY, 1.2);
    };

    window.addEventListener('click', handleGlobalClick, { passive: true });

    // Hardware tier detection
    const cores = navigator.hardwareConcurrency || 4;
    const isMobile = window.innerWidth < 768;
    const isLowPower = cores <= 4 || isMobile;

    if (isLowPower) {
      setPerformanceTier('low');
    } else if (cores <= 6 || window.innerWidth < 1100) {
      setPerformanceTier('medium');
    } else {
      setPerformanceTier('high');
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 2 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 100 }}
        gl={{
          antialias: performanceTier !== 'low',
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, performanceTier === 'low' ? 1 : 1.75)}
        className="w-full h-full"
      >
        <perspectiveCamera position={[0, 0, 8]} fov={45} />

        {/* Gyroscopic Camera Parallax */}
        {motionEnabled && <CameraParallax presetMode={presetMode} />}

        <ambientLight intensity={isDark ? 0.65 : 0.85} />

        {/* 3D Decision Surface Waves & Loss Landscape (Z = -11) */}
        <DecisionBoundaryPlane darkMode={isDark} presetMode={presetMode} />

        {/* 3D Fibonacci Lattice, Synaptic Sparks & Rotating Polyhedra */}
        <NeuralPointCloudGroup darkMode={isDark} presetMode={presetMode} />

        {/* Post-Processing Pipeline (Bloom, DoF, Vignette) */}
        {motionEnabled && <PostProcessComposer performanceTier={performanceTier} />}
      </Canvas>
    </div>
  );
};
