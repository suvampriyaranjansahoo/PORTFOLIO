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
  uniform vec2 uMouse;
  uniform float uHoverIntensity;
  uniform vec3 uColorHigh;
  uniform vec3 uColorLow;
  uniform vec3 uColorBoundary;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    vec2 p = (vUv - 0.5) * 8.0;
    
    // Magical pointer shimmer disturbance
    vec2 mPos = (uMouse - 0.5) * 8.0;
    float mDist = length(p - mPos);
    float magicWave = sin(mDist * 3.5 - uTime * 3.0) * exp(-mDist * 0.85) * uHoverIntensity * 0.6;

    float wave1 = sin(p.x * 0.7 + uTime * 0.25 + magicWave) * cos(p.y * 0.65 + uTime * 0.2);
    float wave2 = sin(p.x * 1.4 - p.y * 1.1 + uTime * 0.15) * 0.45;
    float dist = p.x * 0.45 + p.y * 0.35 + wave1 + wave2 + magicWave * 0.4;

    float prob = 1.0 / (1.0 + exp(-dist * 2.2));
    float contour = abs(fract(prob * 8.0 - 0.5) - 0.5);
    float contourLine = smoothstep(0.04, 0.0, contour) * 0.28;
    float boundaryLine = smoothstep(0.08, 0.0, abs(prob - 0.5)) * 0.65;

    // Magical celestial cursor aura ripple
    float cursorGlow = smoothstep(2.4, 0.0, mDist) * uHoverIntensity * 0.45;
    vec3 magicalGlowColor = mix(vec3(0.38, 0.74, 0.98), vec3(0.98, 0.75, 0.25), sin(uTime * 1.5) * 0.5 + 0.5);

    vec3 baseColor = mix(uColorLow, uColorHigh, prob);
    vec3 finalColor = mix(baseColor, uColorBoundary, boundaryLine);
    finalColor += vec3(1.0) * contourLine;
    finalColor += magicalGlowColor * cursorGlow;

    float edgeDist = length(vUv - 0.5) * 2.0;
    float vignette = smoothstep(1.3, 0.25, edgeDist);

    gl_FragColor = vec4(finalColor, uOpacity * vignette * 0.45);
  }
`;

function DecisionBoundaryPlane({ darkMode }: { darkMode: boolean }) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uHoverIntensity: { value: 0.0 },
    uColorHigh: { value: new THREE.Color(darkMode ? '#6366f1' : '#4f46e5') },
    uColorLow: { value: new THREE.Color(darkMode ? '#06b6d4' : '#0891b2') },
    uColorBoundary: { value: new THREE.Color(darkMode ? '#f59e0b' : '#d97706') },
    uOpacity: { value: darkMode ? 0.38 : 0.22 }
  }), [darkMode]);

  useFrame((_, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.45;
      // Convert normalized pointer [-1, 1] to UV [0, 1]
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
    }
  });

  return (
    <mesh position={[0, 0, -12]}>
      <planeGeometry args={[44, 32, 32, 32]} />
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

// ─── 3D NEURAL POINT-CLOUD & SYNAPTIC CONNECTIONS (NORMALIZED SIZE & MAGICAL HOVER GLOW) ───
function NeuralPointCloudGroup({ darkMode }: { darkMode: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Generate 3D spatial points with normal, delicate node sizing and deep z-placement
  const pointsData = useMemo(() => {
    const pts = [];
    const count = 108;
    let seed = 123;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };

    const colors = darkMode 
      ? ['#38bdf8', '#818cf8', '#fbbf24', '#34d399', '#c084fc'] 
      : ['#0284c7', '#6366f1', '#d97706', '#059669', '#7c3aed'];

    for (let i = 0; i < count; i++) {
      const x = (rnd() - 0.5) * 24;
      const y = (rnd() - 0.5) * 18;
      // Position nodes safely at depth between -7.5 and -2.5 (no giant foreground orbs)
      const z = -7.5 + rnd() * 5.0;
      const color = colors[Math.floor(rnd() * colors.length)];
      // Subtle, normal-sized delicate radius (0.024 - 0.055)
      pts.push({ 
        x, 
        y, 
        z, 
        color, 
        baseSize: 0.024 + rnd() * 0.032,
        twinklePhase: rnd() * Math.PI * 2,
        twinkleSpeed: 0.8 + rnd() * 1.4
      });
    }
    return pts;
  }, [darkMode]);

  // Compute 3D constellation link lines
  const linesGeometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const maxDist = 3.2;

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

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.04) * 0.025;
      groupRef.current.rotation.x = Math.cos(t * 0.03) * 0.018;
    }

    if (!instMesh) return;

    // Approximate pointer position projected in 3D coordinates
    const ptr3DX = pointer.x * 10;
    const ptr3DY = pointer.y * 7;

    pointsData.forEach((p, idx) => {
      // Check distance to mouse pointer for magical celestial hover effect
      const dx = p.x - ptr3DX;
      const dy = p.y - ptr3DY;
      const distToCursor = Math.sqrt(dx * dx + dy * dy);
      const isHovered = distToCursor < 3.2;
      const hoverFactor = isHovered ? Math.max(0, 1 - distToCursor / 3.2) : 0;

      // Magical subtle twinkle
      const twinkle = 1.0 + Math.sin(t * p.twinkleSpeed + p.twinklePhase) * 0.18;
      const scale = p.baseSize * twinkle * (1.0 + hoverFactor * 0.9);

      dummy.position.set(p.x, p.y, p.z);
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      instMesh.setMatrixAt(idx, dummy.matrix);

      cObj.set(p.color);
      // Brighten on hover for a luminous magical starlight sheen
      if (isHovered) {
        cObj.lerp(new THREE.Color('#ffffff'), hoverFactor * 0.65);
        cObj.multiplyScalar(1.2 + hoverFactor * 0.8);
      } else {
        cObj.multiplyScalar(0.95);
      }
      instMesh.setColorAt(idx, cObj);
    });

    instMesh.instanceMatrix.needsUpdate = true;
    if (instMesh.instanceColor) instMesh.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      <instancedMesh
        ref={(el) => setInstMesh(el)}
        args={[undefined as any, undefined as any, pointsData.length]}
      >
        <sphereGeometry args={[1, 10, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={darkMode ? 0.18 : 0.26}
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
