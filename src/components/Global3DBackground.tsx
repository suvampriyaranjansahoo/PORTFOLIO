import React, { useMemo, useRef, useEffect, useState, Component, ReactNode, ErrorInfo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';

// ─── POSTPROCESSING SAFETY ERROR BOUNDARY ───
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ThreePostProcessingErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[GlobalBackground3D] Postprocessing fallback activated:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// ─── CAMERA PARALLAX COMPONENT ───
export function CameraParallax() {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));

  useFrame(() => {
    targetPos.current.set(pointer.x * 0.4, pointer.y * 0.25, 8);
    camera.position.lerp(targetPos.current, 0.04);
    camera.lookAt(0, 0, -5);
  });

  return null;
}

// ─── DECISION BOUNDARY FIELD PLANE SHADER (Z = -12) ───
const decisionVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const decisionFragmentShader = `
  uniform float uTime;
  uniform vec3 uColorHigh;
  uniform vec3 uColorLow;
  uniform vec3 uColorBoundary;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 p = (vUv - 0.5) * 8.0;
    float wave1 = sin(p.x * 0.7 + uTime * 0.25) * cos(p.y * 0.65 + uTime * 0.2);
    float wave2 = sin(p.x * 1.4 - p.y * 1.1 + uTime * 0.15) * 0.45;
    float dist = p.x * 0.45 + p.y * 0.35 + wave1 + wave2;

    float prob = 1.0 / (1.0 + exp(-dist * 2.2));
    float contour = abs(fract(prob * 8.0 - 0.5) - 0.5);
    float contourLine = smoothstep(0.04, 0.0, contour) * 0.32;
    float boundaryLine = smoothstep(0.08, 0.0, abs(prob - 0.5)) * 0.75;

    vec3 baseColor = mix(uColorLow, uColorHigh, prob);
    vec3 finalColor = mix(baseColor, uColorBoundary, boundaryLine);
    finalColor += vec3(1.0) * contourLine;

    float edgeDist = length(vUv - 0.5) * 2.0;
    float vignette = smoothstep(1.3, 0.25, edgeDist);

    gl_FragColor = vec4(finalColor, uOpacity * vignette * 0.55);
  }
`;

function DecisionBoundaryPlane({ darkMode }: { darkMode: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColorHigh: { value: new THREE.Color(darkMode ? '#6366f1' : '#4f46e5') },
    uColorLow: { value: new THREE.Color(darkMode ? '#06b6d4' : '#0891b2') },
    uColorBoundary: { value: new THREE.Color(darkMode ? '#f59e0b' : '#d97706') },
    uOpacity: { value: darkMode ? 0.45 : 0.28 }
  }), [darkMode]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.5;
    }
  });

  return (
    <mesh position={[0, 0, -12]}>
      <planeGeometry args={[42, 30, 32, 32]} />
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

// ─── 3D NEURAL POINT-CLOUD & SYNAPTIC CONNECTIONS (Z = -4 to Z = 2) ───
function NeuralPointCloudGroup({ darkMode }: { darkMode: boolean }) {
  const groupRef = useRef<THREE.Group>(null);

  // Generate 3D spatial points
  const pointsData = useMemo(() => {
    const pts = [];
    const count = 96;
    let seed = 123;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const colors = darkMode 
      ? ['#38bdf8', '#818cf8', '#fbbf24', '#34d399'] 
      : ['#0284c7', '#6366f1', '#d97706', '#059669'];

    for (let i = 0; i < count; i++) {
      const x = (rnd() - 0.5) * 22;
      const y = (rnd() - 0.5) * 16;
      const z = -4 + rnd() * 6; // Real z-depth between -4 and +2
      const color = colors[Math.floor(rnd() * colors.length)];
      pts.push({ x, y, z, color, size: 0.08 + rnd() * 0.12 });
    }
    return pts;
  }, [darkMode]);

  // Compute 3D constellation link lines
  const linesGeometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const maxDist = 3.6;

    for (let i = 0; i < pointsData.length; i++) {
      let conns = 0;
      for (let j = i + 1; j < pointsData.length && conns < 3; j++) {
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
          conns++;
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [pointsData]);

  // Instanced nodes
  const [instMesh, setInstMesh] = useState<THREE.InstancedMesh | null>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const cObj = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    if (!instMesh) return;
    pointsData.forEach((p, idx) => {
      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(p.size, p.size, p.size);
      dummy.updateMatrix();
      instMesh.setMatrixAt(idx, dummy.matrix);

      cObj.set(p.color);
      cObj.multiplyScalar(1.6); // slight boost for bloom threshold
      instMesh.setColorAt(idx, cObj);
    });
    instMesh.instanceMatrix.needsUpdate = true;
    if (instMesh.instanceColor) instMesh.instanceColor.needsUpdate = true;
  }, [instMesh, pointsData, dummy, cObj]);

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.05) * 0.03;
      groupRef.current.rotation.x = Math.cos(t * 0.04) * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      <instancedMesh
        ref={(el) => setInstMesh(el)}
        args={[undefined as any, undefined as any, pointsData.length]}
      >
        <sphereGeometry args={[1, 14, 14]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={darkMode ? 0.22 : 0.32}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// ─── POST-PROCESSING PIPELINE WITH TIER GUARDS ───
interface PostProcessComposerProps {
  performanceTier: 'high' | 'medium' | 'low';
}

function PostProcessComposer({ performanceTier }: PostProcessComposerProps) {
  if (performanceTier === 'low') {
    return null;
  }

  return (
    <ThreePostProcessingErrorBoundary>
      <EffectComposer multisampling={performanceTier === 'high' ? 4 : 0}>
        <Bloom
          intensity={0.35}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        {performanceTier === 'high' && (
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.05}
            bokehScale={2.2}
          />
        )}
        <Vignette eskil={false} offset={0.18} darkness={0.55} />
      </EffectComposer>
    </ThreePostProcessingErrorBoundary>
  );
}

// ─── GLOBAL 3D BACKGROUND COMPONENT ───
export interface Global3DBackgroundProps {
  motionEnabled?: boolean;
}

export const Global3DBackground: React.FC<Global3DBackgroundProps> = ({ motionEnabled = true }) => {
  const [performanceTier, setPerformanceTier] = useState<'high' | 'medium' | 'low'>('high');
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Detect dark mode
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'));
    };
    checkDark();

    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    // Performance detection
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

    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none select-none overflow-hidden" style={{ zIndex: 2 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
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
        {/* Subtle mouse parallax */}
        {motionEnabled && <CameraParallax />}

        <ambientLight intensity={isDark ? 0.6 : 0.8} />

        {/* Layer 1: Decision Boundary Field Plane at Z = -12 */}
        <DecisionBoundaryPlane darkMode={isDark} />

        {/* Layer 2: Point Cloud & Neural Group at Z = -4 to Z = 2 */}
        <NeuralPointCloudGroup darkMode={isDark} />

        {/* Layer 3: Bloom, DepthOfField & Vignette Postprocessing with error boundary & tier guard */}
        {motionEnabled && <PostProcessComposer performanceTier={performanceTier} />}
      </Canvas>
    </div>
  );
};
