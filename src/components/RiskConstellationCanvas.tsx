import React, { useState, useMemo, useRef, useEffect, Component, ReactNode, ErrorInfo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer, Bloom, DepthOfField, Vignette } from '@react-three/postprocessing';
import { generateShapClusters, CLUSTERS, ShapPoint, ClusterInfo } from '../utils/shapClusterGenerator';
import { DecisionBoundaryField } from './DecisionBoundaryField';
import { Sparkles, Activity, ShieldCheck, AlertTriangle, Filter, Eye, Layers } from 'lucide-react';

// ─── STEP 5: POSTPROCESSING SAFETY FALLBACK ERROR BOUNDARY ───
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class PostProcessingErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[RiskConstellationCanvas] Post-processing pipeline disabled due to GPU/context constraint:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

// ─── STEP 2: CAMERA PARALLAX CONTROLLER ───
function CameraParallax() {
  const { camera, pointer } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 7.5));

  useFrame(() => {
    targetPos.current.set(pointer.x * 0.4, pointer.y * 0.25, 7.5);
    camera.position.lerp(targetPos.current, 0.04);
    camera.lookAt(0, 0, -5);
  });

  return null;
}

// ─── 3D POINT CLOUD & CONSTELLATION MESH ───
interface PointCloudSceneProps {
  points: ShapPoint[];
  selectedCluster: string;
  onHoverPoint: (point: ShapPoint | null, screenPos?: { x: number; y: number }) => void;
  hoveredPointId: string | null;
  darkMode: boolean;
}

function PointCloudScene({
  points,
  selectedCluster,
  onHoverPoint,
  hoveredPointId,
  darkMode
}: PointCloudSceneProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { size, raycaster, camera, pointer } = useThree();

  // Subtle natural orbital breathing
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.06;
      groupRef.current.rotation.x = Math.cos(t * 0.06) * 0.04;
    }
  });

  const filteredPoints = useMemo(() => {
    if (selectedCluster === 'all') return points;
    return points.filter((p) => p.cluster === selectedCluster);
  }, [points, selectedCluster]);

  // Handle pointer interactions across 3D points
  const handlePointerMove = (e: any) => {
    e.stopPropagation();
    if (e.instanceId !== undefined && filteredPoints[e.instanceId]) {
      const p = filteredPoints[e.instanceId];
      // Convert normalized device coords to screen coords
      const screenX = ((pointer.x + 1) / 2) * size.width;
      const screenY = ((-pointer.y + 1) / 2) * size.height;
      onHoverPoint(p, { x: screenX, y: screenY });
    }
  };

  const handlePointerOut = () => {
    onHoverPoint(null);
  };

  // Instanced mesh for high performance rendering (360+ points with 0 overhead)
  const [instancedMesh, setInstancedMesh] = useState<THREE.InstancedMesh | null>(null);

  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorObj = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    if (!instancedMesh) return;

    filteredPoints.forEach((p, idx) => {
      dummy.position.set(p.x, p.y, p.z);
      const isHovered = p.id === hoveredPointId;
      const scale = isHovered ? p.size * 2.2 : p.size * 1.2;
      dummy.scale.set(scale, scale, scale);
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(idx, dummy.matrix);

      colorObj.set(p.color);
      if (isHovered) {
        colorObj.multiplyScalar(2.0); // Boost brightness for bloom
      }
      instancedMesh.setColorAt(idx, colorObj);
    });

    instancedMesh.count = filteredPoints.length;
    instancedMesh.instanceMatrix.needsUpdate = true;
    if (instancedMesh.instanceColor) {
      instancedMesh.instanceColor.needsUpdate = true;
    }
  }, [instancedMesh, filteredPoints, hoveredPointId, dummy, colorObj]);

  // Compute nearest neighbor connection lines for constellation aesthetic
  const linesGeometry = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const maxConnDist = 2.4;

    for (let i = 0; i < filteredPoints.length; i++) {
      let connections = 0;
      for (let j = i + 1; j < filteredPoints.length && connections < 3; j++) {
        const p1 = filteredPoints[i];
        const p2 = filteredPoints[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dz = p1.z - p2.z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxConnDist && (p1.cluster === p2.cluster || selectedCluster === 'all')) {
          positions.push(p1.x, p1.y, p1.z, p2.x, p2.y, p2.z);
          const c1 = new THREE.Color(p1.color);
          const c2 = new THREE.Color(p2.color);
          colors.push(c1.r, c1.g, c1.b, c2.r, c2.g, c2.b);
          connections++;
        }
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    return geo;
  }, [filteredPoints, selectedCluster]);

  return (
    <group ref={groupRef} position={[0, 0, -1]}>
      {/* 3D Instanced Risk Points */}
      <instancedMesh
        ref={(el) => setInstancedMesh(el)}
        args={[undefined as any, undefined as any, points.length]}
        onPointerMove={handlePointerMove}
        onPointerOut={handlePointerOut}
      >
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      {/* Constellation Link Lines */}
      <lineSegments geometry={linesGeometry}>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={darkMode ? 0.28 : 0.42}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}

// ─── POSTPROCESSING WRAPPER WITH HARDWARE GUARDS ───
interface PostProcessEffectsProps {
  performanceTier: 'high' | 'medium' | 'low';
}

function PostProcessEffects({ performanceTier }: PostProcessEffectsProps) {
  if (performanceTier === 'low') {
    return null; // Skip completely on low-end/mobile devices
  }

  return (
    <PostProcessingErrorBoundary>
      <EffectComposer multisampling={performanceTier === 'high' ? 4 : 0}>
        <Bloom
          intensity={0.4}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
        {performanceTier === 'high' && (
          <DepthOfField
            focusDistance={0.02}
            focalLength={0.05}
            bokehScale={2.5}
          />
        )}
        <Vignette eskil={false} offset={0.15} darkness={0.6} />
      </EffectComposer>
    </PostProcessingErrorBoundary>
  );
}

// ─── MAIN COMPONENT ───
export interface RiskConstellationCanvasProps {
  darkMode?: boolean;
  className?: string;
  showControls?: boolean;
}

export const RiskConstellationCanvas: React.FC<RiskConstellationCanvasProps> = ({
  darkMode = true,
  className = '',
  showControls = true
}) => {
  const [points] = useState<ShapPoint[]>(() => generateShapClusters());
  const [selectedCluster, setSelectedCluster] = useState<string>('all');
  const [hoveredPoint, setHoveredPoint] = useState<ShapPoint | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);

  // ─── STEP 6: HARDWARE CONCURRENCY & VIEWPORT PERFORMANCE DETECTION ───
  const [performanceTier, setPerformanceTier] = useState<'high' | 'medium' | 'low'>('high');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const cores = navigator.hardwareConcurrency || 4;
    const isMobileWidth = window.innerWidth < 768;
    const isLowPower = cores <= 4 || isMobileWidth;

    if (isLowPower) {
      setPerformanceTier('low');
    } else if (cores <= 6 || window.innerWidth < 1100) {
      setPerformanceTier('medium');
    } else {
      setPerformanceTier('high');
    }
  }, []);

  const activeClusterInfo = useMemo(() => {
    return CLUSTERS.find((c) => c.key === selectedCluster) || CLUSTERS[0];
  }, [selectedCluster]);

  return (
    <div className={`relative w-full h-[480px] sm:h-[540px] rounded-2xl overflow-hidden border border-[#dfe3e9] dark:border-white/10 bg-[#090d16] ${className}`}>
      {/* ─── SINGLE UNIFIED WEBGL CANVAS ROOT ─── */}
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true
        }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
        className="w-full h-full"
      >
        {/* STEP 2: CAMERA PARALLAX WITH PERSPECTIVE */}
        <CameraParallax />

        {/* Ambient & Directional Lighting */}
        <ambientLight intensity={darkMode ? 0.6 : 0.9} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />

        {/* STEP 3: DEPTH SEPARATION */}
        {/* Layer 1: Distant Decision Boundary Field Plane at z = -12 */}
        <DecisionBoundaryField position={[0, 0, -12]} opacity={darkMode ? 0.65 : 0.45} darkMode={darkMode} />

        {/* Layer 2: Point Cloud & Constellation Group centered at z = -1 */}
        <PointCloudScene
          points={points}
          selectedCluster={selectedCluster}
          onHoverPoint={(pt, pos) => {
            setHoveredPoint(pt);
            if (pos) setHoverPos(pos);
          }}
          hoveredPointId={hoveredPoint?.id || null}
          darkMode={darkMode}
        />

        {/* STEP 4 & 5 & 6: POSTPROCESSING WITH FALLBACK & TIER GUARDS */}
        <PostProcessEffects performanceTier={performanceTier} />
      </Canvas>

      {/* ─── HUD OVERLAYS & TELEMETRY ─── */}
      <div className="absolute top-4 left-4 pointer-events-none z-10 flex flex-col gap-1.5">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-mono text-cyan-400">
          <Activity className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
          <span>3D SHAP RISK CONSTELLATION & DECISION FIELD</span>
        </div>
        <div className="text-[10px] font-mono text-gray-400 px-1">
          Perspective Z-Depth: -12.00 (Manifold) / -1.00 (Points) · {performanceTier.toUpperCase()} Profile
        </div>
      </div>

      {/* ─── CLUSTER FILTER BUTTONS ─── */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 z-10 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15">
            {CLUSTERS.map((c) => {
              const isSelected = selectedCluster === c.key;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCluster(c.key)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-white text-black font-semibold shadow-sm'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  <span>{c.label}</span>
                  <span className="text-[10px] opacity-70">({c.count})</span>
                </button>
              );
            })}
          </div>

          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-gray-300">
            <Layers className="w-3.5 h-3.5 text-amber-400" />
            <span>Hover points for SHAP Feature Attribution</span>
          </div>
        </div>
      )}

      {/* ─── HOVERED SHAP INSPECTOR CARD ─── */}
      {hoveredPoint && (
        <div className="absolute top-4 right-4 z-20 pointer-events-none max-w-xs p-3.5 rounded-xl bg-[#0f1420]/90 backdrop-blur-md border border-white/20 text-white shadow-2xl space-y-2 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
            <span className="font-mono text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: hoveredPoint.color }} />
              {hoveredPoint.clusterName}
            </span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/10 text-gray-300">
              {hoveredPoint.id}
            </span>
          </div>

          <div className="space-y-1 text-xs">
            <div className="flex justify-between text-gray-400">
              <span>Risk Probability:</span>
              <span className="font-mono font-bold text-white">{(hoveredPoint.shapScore * 100).toFixed(1)}%</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Primary Driver:</span>
              <span className="font-mono text-cyan-300">{hoveredPoint.primaryFeature}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>Observed Value:</span>
              <span className="font-mono font-semibold text-white">{hoveredPoint.featureValue}</span>
            </div>
            <div className="flex justify-between text-gray-400">
              <span>SHAP Delta:</span>
              <span className={`font-mono font-bold ${hoveredPoint.marginalDelta.startsWith('+') ? 'text-rose-400' : 'text-emerald-400'}`}>
                {hoveredPoint.marginalDelta}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
