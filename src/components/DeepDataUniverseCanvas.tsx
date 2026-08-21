import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  size: number;
  color: string;
  alpha: number;
  label?: string;
  clusterId?: number;
  pulsePhase?: number;
}

interface Edge3D {
  p1: number;
  p2: number;
  opacity: number;
  color?: string;
}

interface DataStream {
  points: { x: number; y: number; z: number }[];
  progress: number;
  speed: number;
  length: number;
  color: string;
  pulseSize: number;
  cycleDelay: number;
  currentDelay: number;
}

interface Polyhedron3D {
  center: { x: number; y: number; z: number };
  vertices: { x: number; y: number; z: number }[];
  edges: [number, number][];
  faces: [number, number, number][];
  rotX: number;
  rotY: number;
  rotZ: number;
  rotSpeedX: number;
  rotSpeedY: number;
  rotSpeedZ: number;
  scale: number;
  color: string;
  glassFill: string;
}

interface OrbitalRing3D {
  center: { x: number; y: number; z: number };
  radius: number;
  tiltX: number;
  tiltY: number;
  rotSpeed: number;
  angle: number;
  segments: number;
  ticks: number;
  color: string;
  beaconAngle: number;
}

export const DeepDataUniverseCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Camera & Parallax State
    const camera = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      yaw: 0,
      pitch: 0,
      targetYaw: 0,
      targetPitch: 0,
      scrollY: window.scrollY || 0,
      targetScrollY: window.scrollY || 0,
      focalLength: 680,
    };

    const handleResize = () => {
      if (!canvas) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      initUniverse();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / width - 0.5) * 2;
      const normY = (e.clientY / height - 0.5) * 2;
      camera.targetYaw = normX * 0.18;
      camera.targetPitch = normY * 0.14;
      camera.targetX = normX * 60;
      camera.targetY = normY * 45;
    };

    const handleScroll = () => {
      camera.targetScrollY = window.scrollY || 0;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Mathematical Telemetry Labels
    const telemetryLabels = [
      'dim: 512d', 'λ = 0.842', 'z_score: +2.84', 'AUC: 0.857', 'μ: 1.042',
      'lat: 37.77°', 'loss: 0.012', 'k-means: 4', 'RICE: 840', 'ROC-90.5%',
      'p < 0.001', 'DAG: sync', 'CLV: 4.8x', 'SHAP: +0.428', 'latency: 12ms',
    ];

    // Palettes
    const darkPalette = {
      electricBlue: 'rgba(56, 189, 248,',
      violet: 'rgba(168, 85, 247,',
      indigo: 'rgba(99, 102, 241,',
      cyan: 'rgba(6, 182, 212,',
      amber: 'rgba(216, 163, 79,',
      slate: 'rgba(148, 163, 184,',
    };

    let nodes3D: Point3D[] = [];
    let edges3D: Edge3D[] = [];
    let polyhedra: Polyhedron3D[] = [];
    let orbitalRings: OrbitalRing3D[] = [];
    let dataStreams: DataStream[] = [];

    const initUniverse = () => {
      nodes3D = [];
      edges3D = [];
      polyhedra = [];
      orbitalRings = [];
      dataStreams = [];

      const area = width * height;
      const count = Math.min(130, Math.max(70, Math.floor(area / 12000)));

      // 1. Generate Microscopic Data Nodes across 3D depth space
      for (let i = 0; i < count; i++) {
        // Distribute in 3D volume
        const x = (Math.random() - 0.5) * width * 1.5;
        const y = (Math.random() - 0.5) * height * 1.8;
        const z = (Math.random() - 0.5) * 800; // -400 (near) to +400 (deep)

        const colors = [
          darkPalette.electricBlue,
          darkPalette.violet,
          darkPalette.indigo,
          darkPalette.cyan,
          darkPalette.amber,
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() < 0.2 ? Math.random() * 2.2 + 2.0 : Math.random() * 1.4 + 0.8;
        const hasLabel = Math.random() < 0.12;

        nodes3D.push({
          x,
          y,
          z,
          baseX: x,
          baseY: y,
          baseZ: z,
          size,
          color,
          alpha: Math.random() * 0.5 + 0.35,
          label: hasLabel ? telemetryLabels[Math.floor(Math.random() * telemetryLabels.length)] : undefined,
          clusterId: Math.floor(Math.random() * 4),
          pulsePhase: Math.random() * Math.PI * 2,
        });
      }

      // 2. Form Sparse Analytical Graph Edges between neighboring nodes in 3D
      for (let i = 0; i < nodes3D.length; i++) {
        let connections = 0;
        for (let j = i + 1; j < nodes3D.length; j++) {
          if (connections >= 2) break;
          const dx = nodes3D[i].x - nodes3D[j].x;
          const dy = nodes3D[i].y - nodes3D[j].y;
          const dz = nodes3D[i].z - nodes3D[j].z;
          const dist3D = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (dist3D < 220 && Math.random() < 0.45) {
            edges3D.push({
              p1: i,
              p2: j,
              opacity: (1 - dist3D / 220) * 0.25,
              color: nodes3D[i].color,
            });
            connections++;
          }
        }
      }

      // 3. Sparse Translucent Crystalline Geometry & Wireframes
      // Polyhedron A: Octahedron in upper left quadrant
      polyhedra.push({
        center: { x: -width * 0.28, y: -height * 0.22, z: 80 },
        vertices: [
          { x: 0, y: -55, z: 0 },
          { x: 55, y: 0, z: 0 },
          { x: 0, y: 0, z: 55 },
          { x: -55, y: 0, z: 0 },
          { x: 0, y: 0, z: -55 },
          { x: 0, y: 55, z: 0 },
        ],
        edges: [
          [0, 1], [0, 2], [0, 3], [0, 4],
          [5, 1], [5, 2], [5, 3], [5, 4],
          [1, 2], [2, 3], [3, 4], [4, 1]
        ],
        faces: [
          [0, 1, 2], [0, 2, 3], [0, 3, 4], [0, 4, 1],
          [5, 2, 1], [5, 3, 2], [5, 4, 3], [5, 1, 4]
        ],
        rotX: 0.2,
        rotY: 0.4,
        rotZ: 0,
        rotSpeedX: 0.003,
        rotSpeedY: 0.004,
        rotSpeedZ: 0.0015,
        scale: 1,
        color: 'rgba(99, 102, 241, 0.45)',
        glassFill: 'rgba(99, 102, 241, 0.025)',
      });

      // Polyhedron B: Rhombic Dodecahedron prism in lower right quadrant
      polyhedra.push({
        center: { x: width * 0.32, y: height * 0.25, z: -40 },
        vertices: [
          { x: -35, y: -35, z: -35 },
          { x: 35, y: -35, z: -35 },
          { x: 35, y: 35, z: -35 },
          { x: -35, y: 35, z: -35 },
          { x: -35, y: -35, z: 35 },
          { x: 35, y: -35, z: 35 },
          { x: 35, y: 35, z: 35 },
          { x: -35, y: 35, z: 35 },
          { x: 0, y: -50, z: 0 },
          { x: 0, y: 50, z: 0 },
        ],
        edges: [
          [0, 1], [1, 2], [2, 3], [3, 0],
          [4, 5], [5, 6], [6, 7], [7, 4],
          [0, 4], [1, 5], [2, 6], [3, 7],
          [8, 0], [8, 1], [8, 4], [8, 5],
          [9, 2], [9, 3], [9, 6], [9, 7]
        ],
        faces: [
          [0, 1, 2], [0, 2, 3],
          [4, 5, 6], [4, 6, 7]
        ],
        rotX: 0.5,
        rotY: -0.3,
        rotZ: 0.2,
        rotSpeedX: -0.0025,
        rotSpeedY: 0.0035,
        rotSpeedZ: 0.002,
        scale: 1,
        color: 'rgba(168, 85, 247, 0.4)',
        glassFill: 'rgba(168, 85, 247, 0.02)',
      });

      // 4. Orbital Concentric Coordinate Rings
      orbitalRings.push({
        center: { x: width * 0.25, y: -height * 0.18, z: 120 },
        radius: 140,
        tiltX: 1.1,
        tiltY: 0.4,
        rotSpeed: 0.002,
        angle: 0,
        segments: 48,
        ticks: 12,
        color: 'rgba(56, 189, 248, 0.35)',
        beaconAngle: 0,
      });

      orbitalRings.push({
        center: { x: -width * 0.22, y: height * 0.3, z: 60 },
        radius: 170,
        tiltX: 0.8,
        tiltY: -0.5,
        rotSpeed: -0.0015,
        angle: 0.5,
        segments: 60,
        ticks: 16,
        color: 'rgba(99, 102, 241, 0.3)',
        beaconAngle: Math.PI,
      });

      // 5. Animated "Data Current" Splines & Luminous Trajectories
      const streamDefs = [
        {
          pts: [
            { x: -width * 0.45, y: -height * 0.35, z: -100 },
            { x: -width * 0.15, y: -height * 0.1, z: 50 },
            { x: width * 0.1, y: height * 0.05, z: -20 },
            { x: width * 0.4, y: height * 0.3, z: 80 }
          ],
          color: darkPalette.cyan,
          speed: 0.0035,
        },
        {
          pts: [
            { x: width * 0.42, y: -height * 0.3, z: 40 },
            { x: width * 0.18, y: -height * 0.05, z: -80 },
            { x: -width * 0.1, y: height * 0.15, z: 20 },
            { x: -width * 0.38, y: height * 0.38, z: -50 }
          ],
          color: darkPalette.violet,
          speed: 0.0028,
        },
        {
          pts: [
            { x: -width * 0.3, y: height * 0.35, z: 60 },
            { x: 0, y: height * 0.2, z: -40 },
            { x: width * 0.3, y: height * 0.4, z: 100 }
          ],
          color: darkPalette.amber,
          speed: 0.004,
        }
      ];

      streamDefs.forEach((def, idx) => {
        dataStreams.push({
          points: def.pts,
          progress: (idx * 0.33) % 1,
          speed: def.speed,
          length: 0.18,
          color: def.color,
          pulseSize: 3.5,
          cycleDelay: 0,
          currentDelay: 0,
        });
      });
    };

    handleResize();

    // 3D Math Helper Functions
    const project = (
      p: { x: number; y: number; z: number },
      camX: number,
      camY: number,
      yaw: number,
      pitch: number,
      scrollOffsetZ: number
    ): { x: number; y: number; scale: number; depth: number; visible: boolean } => {
      // 1. Translate relative to camera
      let x = p.x - camX;
      let y = p.y - camY;
      let z = p.z + scrollOffsetZ;

      // 2. Rotate Pitch (X axis)
      const cosP = Math.cos(pitch);
      const sinP = Math.sin(pitch);
      const y1 = y * cosP - z * sinP;
      const z1 = y * sinP + z * cosP;

      // 3. Rotate Yaw (Y axis)
      const cosY = Math.cos(yaw);
      const sinY = Math.sin(yaw);
      const x2 = x * cosY + z1 * sinY;
      const z2 = -x * sinY + z1 * cosY;

      // 4. Perspective Projection with focal length
      const f = camera.focalLength;
      const depth = z2;

      // If object is behind camera plane, clip
      if (depth <= -f + 40) {
        return { x: 0, y: 0, scale: 0, depth, visible: false };
      }

      const scale = f / (f + depth);
      const screenX = width / 2 + x2 * scale;
      const screenY = height / 2 + y1 * scale;

      const visible = screenX >= -80 && screenX <= width + 80 && screenY >= -80 && screenY <= height + 80;

      return {
        x: screenX,
        y: screenY,
        scale,
        depth,
        visible,
      };
    };

    const rotatePoint3D = (
      p: { x: number; y: number; z: number },
      rx: number,
      ry: number,
      rz: number
    ) => {
      let { x, y, z } = p;
      // X rotation
      let cos = Math.cos(rx);
      let sin = Math.sin(rx);
      let y1 = y * cos - z * sin;
      let z1 = y * sin + z * cos;
      // Y rotation
      cos = Math.cos(ry);
      sin = Math.sin(ry);
      let x2 = x * cos + z1 * sin;
      let z2 = -x * sin + z1 * cos;
      // Z rotation
      cos = Math.cos(rz);
      sin = Math.sin(rz);
      let x3 = x2 * cos - y1 * sin;
      let y3 = x2 * sin + y1 * cos;
      return { x: x3, y: y3, z: z2 };
    };

    // Spline Interpolation Helper (Catmull-Rom or cubic Bezier)
    const getSplinePoint = (pts: { x: number; y: number; z: number }[], t: number) => {
      if (pts.length === 0) return { x: 0, y: 0, z: 0 };
      if (pts.length === 1) return pts[0];
      const p = Math.max(0, Math.min(0.999, t)) * (pts.length - 1);
      const idx = Math.floor(p);
      const localT = p - idx;
      const p0 = pts[Math.max(0, idx - 1)];
      const p1 = pts[idx];
      const p2 = pts[Math.min(pts.length - 1, idx + 1)];
      const p3 = pts[Math.min(pts.length - 1, idx + 2)];

      // Catmull-Rom spline equation in 3D
      const calcAxis = (v0: number, v1: number, v2: number, v3: number, tVal: number) => {
        return (
          0.5 *
          (2 * v1 +
            (-v0 + v2) * tVal +
            (2 * v0 - 5 * v1 + 4 * v2 - v3) * tVal * tVal +
            (-v0 + 3 * v1 - 3 * v2 + v3) * tVal * tVal * tVal)
        );
      };

      return {
        x: calcAxis(p0.x, p1.x, p2.x, p3.x, localT),
        y: calcAxis(p0.y, p1.y, p2.y, p3.y, localT),
        z: calcAxis(p0.z, p1.z, p2.z, p3.z, localT),
      };
    };

    // Main Render Loop
    const render = () => {
      // Smooth Camera Interpolation (LERP)
      camera.x += (camera.targetX - camera.x) * 0.05;
      camera.y += (camera.targetY - camera.y) * 0.05;
      camera.yaw += (camera.targetYaw - camera.yaw) * 0.06;
      camera.pitch += (camera.targetPitch - camera.pitch) * 0.06;
      camera.scrollY += (camera.targetScrollY - camera.scrollY) * 0.08;

      // Scroll-derived parallax delta
      const scrollProgressZ = (camera.scrollY * 0.12) % 600 - 300;
      const scrollRotation = camera.scrollY * 0.0003;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Depth-of-Field Background Grid Planes (Sub-pixel coordinate ticks)
      const gridSpacing = 160;
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.035)';
      ctx.lineWidth = 1;

      // Draw faint coordinate crosshairs across the 3D analytical plane
      for (let gx = -width * 0.6; gx <= width * 0.6; gx += gridSpacing) {
        for (let gy = -height * 0.6; gy <= height * 0.6; gy += gridSpacing) {
          const pt = project(
            { x: gx, y: gy, z: 350 },
            camera.x,
            camera.y,
            camera.yaw + scrollRotation,
            camera.pitch,
            0
          );
          if (pt.visible && pt.scale > 0.3) {
            const crossSize = 3 * pt.scale;
            ctx.beginPath();
            ctx.moveTo(pt.x - crossSize, pt.y);
            ctx.lineTo(pt.x + crossSize, pt.y);
            ctx.moveTo(pt.x, pt.y - crossSize);
            ctx.lineTo(pt.x, pt.y + crossSize);
            ctx.stroke();
          }
        }
      }

      // 2. Render 3D Orbital Rings
      orbitalRings.forEach((ring) => {
        ring.angle += ring.rotSpeed;
        ring.beaconAngle += ring.rotSpeed * 2.5;

        const ringPoints: { x: number; y: number; z: number }[] = [];
        for (let i = 0; i <= ring.segments; i++) {
          const theta = (i / ring.segments) * Math.PI * 2 + ring.angle;
          const px = Math.cos(theta) * ring.radius;
          const py = Math.sin(theta) * ring.radius;
          // Apply ring tilt
          const rotated = rotatePoint3D({ x: px, y: py, z: 0 }, ring.tiltX, ring.tiltY, 0);
          ringPoints.push({
            x: ring.center.x + rotated.x,
            y: ring.center.y + rotated.y,
            z: ring.center.z + rotated.z,
          });
        }

        // Draw segmented ring curve
        ctx.beginPath();
        let first = true;
        for (let i = 0; i < ringPoints.length; i++) {
          const proj = project(
            ringPoints[i],
            camera.x,
            camera.y,
            camera.yaw + scrollRotation,
            camera.pitch,
            scrollProgressZ * 0.3
          );
          if (proj.visible) {
            if (first) {
              ctx.moveTo(proj.x, proj.y);
              first = false;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
        }
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Orbiting Beacon Pulse
        const beaconLocal = rotatePoint3D(
          {
            x: Math.cos(ring.beaconAngle) * ring.radius,
            y: Math.sin(ring.beaconAngle) * ring.radius,
            z: 0,
          },
          ring.tiltX,
          ring.tiltY,
          0
        );
        const beaconProj = project(
          {
            x: ring.center.x + beaconLocal.x,
            y: ring.center.y + beaconLocal.y,
            z: ring.center.z + beaconLocal.z,
          },
          camera.x,
          camera.y,
          camera.yaw + scrollRotation,
          camera.pitch,
          scrollProgressZ * 0.3
        );

        if (beaconProj.visible) {
          ctx.beginPath();
          ctx.arc(beaconProj.x, beaconProj.y, 2.5 * beaconProj.scale, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(56, 189, 248, 0.85)';
          ctx.shadowColor = 'rgba(56, 189, 248, 0.8)';
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      // 3. Render Sparse Floating Crystalline Polyhedra (Wireframes + Translucent Glass Faces)
      polyhedra.forEach((poly) => {
        poly.rotX += poly.rotSpeedX;
        poly.rotY += poly.rotSpeedY;
        poly.rotZ += poly.rotSpeedZ;

        // Transform vertices
        const transformedVertices = poly.vertices.map((v) => {
          const rotated = rotatePoint3D(
            { x: v.x * poly.scale, y: v.y * poly.scale, z: v.z * poly.scale },
            poly.rotX,
            poly.rotY,
            poly.rotZ
          );
          return {
            x: poly.center.x + rotated.x,
            y: poly.center.y + rotated.y,
            z: poly.center.z + rotated.z,
          };
        });

        // Project vertices
        const projectedVertices = transformedVertices.map((v) =>
          project(
            v,
            camera.x,
            camera.y,
            camera.yaw + scrollRotation * 0.8,
            camera.pitch,
            scrollProgressZ * 0.4
          )
        );

        // Draw Translucent Glass Faces
        poly.faces.forEach((face) => {
          const p0 = projectedVertices[face[0]];
          const p1 = projectedVertices[face[1]];
          const p2 = projectedVertices[face[2]];

          if (p0.visible && p1.visible && p2.visible) {
            ctx.beginPath();
            ctx.moveTo(p0.x, p0.y);
            ctx.lineTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.closePath();
            ctx.fillStyle = poly.glassFill;
            ctx.fill();
          }
        });

        // Draw Wireframe Edges
        ctx.strokeStyle = poly.color;
        ctx.lineWidth = 1.0;
        poly.edges.forEach(([i1, i2]) => {
          const p1 = projectedVertices[i1];
          const p2 = projectedVertices[i2];
          if (p1.visible && p2.visible) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        });

        // Highlight Vertex Nodes
        projectedVertices.forEach((pv) => {
          if (pv.visible) {
            ctx.beginPath();
            ctx.arc(pv.x, pv.y, 2 * pv.scale, 0, Math.PI * 2);
            ctx.fillStyle = poly.color;
            ctx.fill();
          }
        });
      });

      // 4. Render Analytical Graph Edges between Nodes
      edges3D.forEach((edge) => {
        const n1 = nodes3D[edge.p1];
        const n2 = nodes3D[edge.p2];
        if (!n1 || !n2) return;

        const p1 = project(
          n1,
          camera.x,
          camera.y,
          camera.yaw + scrollRotation,
          camera.pitch,
          scrollProgressZ
        );
        const p2 = project(
          n2,
          camera.x,
          camera.y,
          camera.yaw + scrollRotation,
          camera.pitch,
          scrollProgressZ
        );

        if (p1.visible && p2.visible) {
          const avgScale = (p1.scale + p2.scale) * 0.5;
          const alpha = edge.opacity * Math.min(1, avgScale * 1.5);
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `${edge.color} ${alpha})`;
          ctx.lineWidth = Math.max(0.5, 0.8 * avgScale);
          ctx.stroke();
        }
      });

      // 5. Render Animated Luminous "Data Currents" (Spline trajectories with pulse packets)
      dataStreams.forEach((stream) => {
        stream.progress += stream.speed;
        if (stream.progress > 1) {
          stream.progress = 0;
        }

        // Draw faint trajectory guide path
        const samples = 35;
        ctx.beginPath();
        let pathStarted = false;
        for (let s = 0; s <= samples; s++) {
          const st = s / samples;
          const pt3D = getSplinePoint(stream.points, st);
          const proj = project(
            pt3D,
            camera.x,
            camera.y,
            camera.yaw + scrollRotation,
            camera.pitch,
            scrollProgressZ * 0.6
          );
          if (proj.visible) {
            if (!pathStarted) {
              ctx.moveTo(proj.x, proj.y);
              pathStarted = true;
            } else {
              ctx.lineTo(proj.x, proj.y);
            }
          }
        }
        ctx.strokeStyle = `${stream.color} 0.08)`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw Luminous Packet with Phosphor Tail
        const tailSegments = 12;
        for (let k = 0; k < tailSegments; k++) {
          const tailT = stream.progress - (k * stream.length) / tailSegments;
          if (tailT >= 0 && tailT <= 1) {
            const tailPt3D = getSplinePoint(stream.points, tailT);
            const tailProj = project(
              tailPt3D,
              camera.x,
              camera.y,
              camera.yaw + scrollRotation,
              camera.pitch,
              scrollProgressZ * 0.6
            );

            if (tailProj.visible) {
              const headFactor = 1 - k / tailSegments;
              const radius = stream.pulseSize * tailProj.scale * (0.4 + 0.6 * headFactor);
              const alpha = headFactor * 0.75 * Math.min(1, tailProj.scale * 1.5);

              ctx.beginPath();
              ctx.arc(tailProj.x, tailProj.y, Math.max(0.6, radius), 0, Math.PI * 2);
              ctx.fillStyle = `${stream.color} ${alpha})`;

              if (k === 0) {
                ctx.shadowColor = `${stream.color} 0.9)`;
                ctx.shadowBlur = 10 * tailProj.scale;
                ctx.fill();
                ctx.shadowBlur = 0;
              } else {
                ctx.fill();
              }
            }
          }
        }
      });

      // 6. Render Microscopic Data Nodes with Depth-of-Field Scaling & Monospace Telemetry
      ctx.font = '9px "IBM Plex Mono", monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';

      nodes3D.forEach((node) => {
        node.pulsePhase = (node.pulsePhase || 0) + 0.025;
        const pulse = Math.sin(node.pulsePhase) * 0.25 + 1.0;

        const proj = project(
          node,
          camera.x,
          camera.y,
          camera.yaw + scrollRotation,
          camera.pitch,
          scrollProgressZ
        );

        if (proj.visible) {
          // Depth-of-field: scale & alpha diminish for far nodes, near nodes are crisp and luminous
          const dofScale = proj.scale;
          const renderRadius = node.size * dofScale * pulse;
          const nodeAlpha = Math.min(0.9, node.alpha * dofScale * 1.6);

          // Draw Core Node
          ctx.beginPath();
          ctx.arc(proj.x, proj.y, Math.max(0.8, renderRadius), 0, Math.PI * 2);
          ctx.fillStyle = `${node.color} ${nodeAlpha})`;

          // Foreground nodes get soft bloom glow
          if (dofScale > 0.85) {
            ctx.shadowColor = `${node.color} 0.6)`;
            ctx.shadowBlur = 8 * dofScale;
            ctx.fill();
            ctx.shadowBlur = 0;
          } else {
            ctx.fill();
          }

          // Render micro-telemetry label on prominent foreground/midground nodes
          if (node.label && dofScale > 0.75 && nodeAlpha > 0.4) {
            ctx.fillStyle = `rgba(148, 163, 184, ${nodeAlpha * 0.65})`;
            ctx.fillText(node.label, proj.x + renderRadius + 5, proj.y);
          }
        }
      });

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] opacity-40 dark:opacity-100 transition-opacity duration-300"
    />
  );
};
