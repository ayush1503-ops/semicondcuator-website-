"use client";

import { Component, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

/* ================================================================== */
/* Deterministic helpers                                                */
/* ================================================================== */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}
const smooth = (p: number, a: number, b: number) =>
  THREE.MathUtils.smoothstep(THREE.MathUtils.clamp((p - a) / (b - a), 0, 1), 0, 1);
const lerpStops = (
  t: number,
  stops: { t: number; v: number }[]
) => {
  let i = 0;
  while (i < stops.length - 2 && t > stops[i + 1].t) i++;
  const a = stops[i];
  const b = stops[i + 1];
  const raw = THREE.MathUtils.clamp((t - a.t) / (b.t - a.t), 0, 1);
  const k = raw * raw * (3 - 2 * raw);
  return THREE.MathUtils.lerp(a.v, b.v, k);
};

/* ================================================================== */
/* Package layer geometry                                               */
/* Dimensions: substrate 6.4 sq · die 2.9 sq · lid 4.0 sq (scene units) */
/* ================================================================== */
const SUB_TOP = -0.29;

/* — BGA solder array (instanced spheres) — */
function useBgaLayout() {
  return useMemo(() => {
    const pts: [number, number, number][] = [];
    const n = 13;
    const pitch = 0.44;
    for (let gx = 0; gx < n; gx++)
      for (let gz = 0; gz < n; gz++)
        pts.push([(gx - (n - 1) / 2) * pitch, -0.815, (gz - (n - 1) / 2) * pitch]);
    return pts;
  }, []);
}

/* — copper routing on substrate top (Manhattan, seeded) — */
function useTraces() {
  return useMemo(() => {
    const rand = seeded(9);
    const arr: { p: [number, number, number]; s: [number, number, number]; gold: boolean }[] = [];
    const dieHalf = 1.55;
    for (let side = 0; side < 4; side++) {
      for (let lane = 0; lane < 15; lane++) {
        const off = -2.55 + lane * 0.36 + (rand() - 0.5) * 0.08;
        const run1 = 0.45 + rand() * 0.75;
        const jog = (rand() - 0.5) * 0.5;
        const w = 0.035 + rand() * 0.025;
        // segment 1: outward from die edge
        const m1 = dieHalf + run1 / 2;
        // segment 2: after jog, to near edge
        const start2 = dieHalf + run1;
        const end2 = 3.18;
        const m2 = (start2 + end2) / 2;
        const l2 = end2 - start2 - 0.06;
        const place = (along: number, lateral: number, len: number, wid: number, gold: boolean) => {
          let x = lateral;
          let z = along;
          let sx = wid;
          let sz = len;
          if (side === 1) { x = along; z = -lateral; sx = len; sz = wid; }
          else if (side === 2) { x = -lateral; z = -along; sx = wid; sz = len; }
          else if (side === 3) { x = -along; z = lateral; sx = len; sz = wid; }
          arr.push({ p: [x, SUB_TOP + 0.007, z], s: [sx, 0.014, sz], gold });
        };
        const gold = rand() > 0.9;
        place(m1, off, run1 - 0.04, w, gold);
        if (l2 > 0.12) place(m2, off + jog, l2, w, gold);
      }
    }
    return arr;
  }, []);
}

/* — gold contact pads near substrate perimeter — */
function usePads() {
  return useMemo(() => {
    const arr: [number, number, number][] = [];
    for (let side = 0; side < 4; side++) {
      for (let row = 0; row < 2; row++)
        for (let i = 0; i < 14; i++) {
          const off = -2.6 + i * 0.4 + (row === 1 ? 0.2 : 0);
          const along = 2.82 + row * 0.24;
          let x = off, z = along;
          if (side === 1) { x = along; z = -off; }
          else if (side === 2) { x = -off; z = -along; }
          else if (side === 3) { x = -along; z = off; }
          arr.push([x, SUB_TOP + 0.007, z]);
        }
    }
    return arr;
  }, []);
}

/* — die floorplan micro-cells — */
function useDieCells() {
  return useMemo(() => {
    const rand = seeded(42);
    const cells: { p: [number, number, number]; s: [number, number, number]; c: THREE.Color }[] = [];
    const tones = ["#141924", "#171D2A", "#1A2130", "#12161F"].map((h) => new THREE.Color(h));
    const accent = new THREE.Color("#232C42");
    const pick = () => (rand() > 0.82 ? accent : tones[(rand() * tones.length) | 0]);
    // logic cluster (upper-left region)
    for (let i = 0; i < 64; i++) {
      cells.push({
        p: [-1.3 + rand() * 1.15, -0.062, 0.12 + rand() * 1.15],
        s: [0.08 + rand() * 0.22, 0.018, 0.08 + rand() * 0.22],
        c: pick(),
      });
    }
    // logic cluster 2 (lower-left)
    for (let i = 0; i < 40; i++) {
      cells.push({
        p: [-1.3 + rand() * 1.15, -0.062, -1.28 + rand() * 1.05],
        s: [0.07 + rand() * 0.18, 0.018, 0.07 + rand() * 0.18],
        c: pick(),
      });
    }
    // SRAM arrays — tight, regular (upper-right)
    for (let gx = 0; gx < 9; gx++)
      for (let gz = 0; gz < 7; gz++)
        cells.push({
          p: [0.28 + gx * 0.128, -0.062, 0.14 + gz * 0.155],
          s: [0.1, 0.016, 0.13],
          c: tones[rand() > 0.88 ? 3 : 1].clone(),
        });
    // SRAM (lower-right)
    for (let gx = 0; gx < 9; gx++)
      for (let gz = 0; gz < 4; gz++)
        cells.push({
          p: [0.28 + gx * 0.128, -0.062, -1.05 + gz * 0.155],
          s: [0.1, 0.016, 0.13],
          c: tones[rand() > 0.88 ? 0 : 2].clone(),
        });
    // IO ring
    for (let i = 0; i < 12; i++) {
      const t = -1.28 + i * 0.232;
      const c = new THREE.Color("#1C2231");
      cells.push({ p: [t, -0.062, -1.365], s: [0.17, 0.016, 0.07], c });
      cells.push({ p: [t, -0.062, 1.365], s: [0.17, 0.016, 0.07], c });
      cells.push({ p: [-1.365, -0.062, t], s: [0.07, 0.016, 0.17], c });
      cells.push({ p: [1.365, -0.062, t], s: [0.07, 0.016, 0.17], c });
    }
    // align all cells onto the die's top surface
    return cells.map((c) => ({
      ...c,
      p: [c.p[0], SUB_TOP + 0.16 + 0.009, c.p[2]] as [number, number, number],
    }));
  }, []);
}

/* ================================================================== */
/* Scene choreography                                                   */
/* ================================================================== */
type SceneProps = {
  progress: { current: number };
  onDomUpdate: (p: number) => void;
};

const CAM = {
  pos: [
    { t: 0.0, v: [11.2, 6.4, 13.9] },
    { t: 0.18, v: [8.0, 4.6, 10.2] },
    { t: 0.4, v: [4.9, 2.8, 7.5] },
    { t: 0.635, v: [2.5, 2.8, 3.4] },
    { t: 0.84, v: [6.4, 4.4, 8.4] },
    { t: 1.0, v: [9.8, 5.6, 11.6] },
  ],
  look: [
    { t: 0.0, v: [0, -0.2, 0] },
    { t: 0.4, v: [0, -0.25, 0] },
    { t: 0.635, v: [0.05, -0.1, 0.05] },
    { t: 0.84, v: [0, 0.55, 0] },
    { t: 1.0, v: [0, -0.1, 0] },
  ],
};
const YAW = [
  { t: 0.0, v: -0.45 },
  { t: 0.4, v: 0.55 },
  { t: 0.635, v: 1.02 },
  { t: 0.84, v: 1.42 },
  { t: 1.0, v: 1.02 },
];
const PITCH = [
  { t: 0.0, v: 0.5 },
  { t: 0.3, v: 0.32 },
  { t: 0.635, v: 0.56 },
  { t: 0.84, v: 0.4 },
  { t: 1.0, v: 0.48 },
];

function lerpStops3(t: number, stops: { t: number; v: number[] }[]) {
  let i = 0;
  while (i < stops.length - 2 && t > stops[i + 1].t) i++;
  const a = stops[i];
  const b = stops[i + 1];
  const raw = THREE.MathUtils.clamp((t - a.t) / (b.t - a.t), 0, 1);
  const k = raw * raw * (3 - 2 * raw);
  return new THREE.Vector3(
    THREE.MathUtils.lerp(a.v[0], b.v[0], k),
    THREE.MathUtils.lerp(a.v[1], b.v[1], k),
    THREE.MathUtils.lerp(a.v[2], b.v[2], k)
  );
}

function CameraRig({ progress }: { progress: { current: number } }) {
  const { camera, size } = useThree();
  const fovRef = useRef(0);
  const sp = useRef(0);
  useFrame((_, delta) => {
    sp.current = THREE.MathUtils.damp(sp.current, progress.current, 3.4, delta);
    const p = sp.current;
    const pos = lerpStops3(p, CAM.pos);
    const look = lerpStops3(p, CAM.look);
    const a = 1 - Math.pow(0.0005, delta);
    camera.position.lerp(pos, a);
    camera.lookAt(look);
    const targetFov = size.width / size.height < 0.85 ? 50 : 38;
    if (Math.abs(targetFov - fovRef.current) > 0.5 && camera instanceof THREE.PerspectiveCamera) {
      camera.fov = targetFov;
      camera.updateProjectionMatrix();
      fovRef.current = targetFov;
    }
  });
  return null;
}

/* ================================================================== */
/* The package model                                                    */
/* ================================================================== */
function PackageModel({ progress, onDomUpdate }: SceneProps) {
  const root = useRef<THREE.Group>(null);
  const lid = useRef<THREE.Group>(null);
  const die = useRef<THREE.Group>(null);
  const bgaRef = useRef<THREE.InstancedMesh>(null);
  const ballsHome = useRef<Float32Array | null>(null);
  const tracesRef = useRef<THREE.InstancedMesh>(null);
  const padsRef = useRef<THREE.InstancedMesh>(null);
  const cellsRef = useRef<THREE.InstancedMesh>(null);
  const sp = useRef(0);

  const bga = useBgaLayout();
  const traces = useTraces();
  const pads = usePads();
  const cells = useDieCells();

  useEffect(() => {
    const tmp = new THREE.Object3D();
    const b = bgaRef.current;
    if (b) {
      bga.forEach((pt, i) => {
        tmp.position.set(...pt);
        tmp.scale.setScalar(1);
        tmp.updateMatrix();
        b.setMatrixAt(i, tmp.matrix);
      });
      b.instanceMatrix.needsUpdate = true;
      ballsHome.current = new Float32Array(bga.flat());
    }
    const t = tracesRef.current;
    if (t) {
      traces.forEach((tr, i) => {
        tmp.position.set(...tr.p);
        tmp.scale.set(...tr.s);
        tmp.updateMatrix();
        t.setMatrixAt(i, tmp.matrix);
      });
      t.instanceMatrix.needsUpdate = true;
    }
    const pd = padsRef.current;
    if (pd) {
      pads.forEach((pt, i) => {
        tmp.position.set(...pt);
        tmp.scale.set(1, 1, 1);
        tmp.updateMatrix();
        pd.setMatrixAt(i, tmp.matrix);
      });
      pd.instanceMatrix.needsUpdate = true;
    }
    const c = cellsRef.current;
    if (c) {
      cells.forEach((cell, i) => {
        tmp.position.set(...cell.p);
        tmp.scale.set(...cell.s);
        tmp.updateMatrix();
        c.setMatrixAt(i, tmp.matrix);
        c.setColorAt(i, cell.c);
      });
      c.instanceMatrix.needsUpdate = true;
      if (c.instanceColor) c.instanceColor.needsUpdate = true;
    }
  }, [bga, traces, pads, cells]);

  useFrame((state, delta) => {
    sp.current = THREE.MathUtils.damp(sp.current, progress.current, 3.4, delta);
    const p = sp.current;

    // turntable — bounded, never continuous
    if (root.current) {
      root.current.rotation.y = lerpStops(p, YAW) + Math.sin(state.clock.elapsedTime * 0.2) * 0.008;
      root.current.rotation.x = lerpStops(p, PITCH);
    }
    // layer separation — lid slides aside first, then the full stack opens
    const reassemble = 1 - smooth(p, 0.87, 0.93);
    const lidK = smooth(p, 0.44, 0.6) * reassemble;
    const stackK = smooth(p, 0.64, 0.78) * reassemble;
    if (lid.current) {
      lid.current.position.y = lidK * 1.15 + stackK * 0.9;
      lid.current.position.x = lidK * -2.3 * (1 - stackK);
    }
    if (die.current) die.current.position.y = stackK * 0.85;
    // BGA drifts down to reveal the interconnect joint
    const b = bgaRef.current;
    const home = ballsHome.current;
    if (b && home) {
      const tmp = new THREE.Object3D();
      const drop = stackK * 0.55;
      for (let i = 0; i < bga.length; i++) {
        tmp.position.set(home[i * 3], home[i * 3 + 1] - drop, home[i * 3 + 2]);
        tmp.updateMatrix();
        b.setMatrixAt(i, tmp.matrix);
      }
      b.instanceMatrix.needsUpdate = true;
    }

    onDomUpdate(p);
  });

  return (
    <group ref={root} position={[0, 0.12, 0]}>
      {/* ---- nickel heat spreader (IHS) ---- */}
      <group ref={lid}>
        <RoundedBox args={[4.0, 0.3, 4.0]} radius={0.045} smoothness={12} position={[0, 0.0, 0]}>
          <meshPhysicalMaterial
            color="#313944"
            metalness={1}
            roughness={0.32}
            clearcoat={0.25}
            clearcoatRoughness={0.5}
            envMapIntensity={1.0}
          />
        </RoundedBox>
        {/* etched marking — restrained */}
        <group position={[0, 0.157, 0]}>
          <mesh position={[-0.55, 0, -0.55]}>
            <boxGeometry args={[0.34, 0.006, 0.03]} />
            <meshStandardMaterial color="#242A33" metalness={0.9} roughness={0.5} />
          </mesh>
          <mesh position={[-0.5, 0, -0.28]}>
            <boxGeometry args={[0.44, 0.006, 0.03]} />
            <meshStandardMaterial color="#242A33" metalness={0.9} roughness={0.5} />
          </mesh>
          <mesh position={[-0.45, 0, -0.01]}>
            <boxGeometry args={[0.54, 0.006, 0.03]} />
            <meshStandardMaterial color="#242A33" metalness={0.9} roughness={0.5} />
          </mesh>
          {/* brand square mark */}
          <mesh position={[0.55, 0, -0.5]}>
            <boxGeometry args={[0.3, 0.006, 0.3]} />
            <meshStandardMaterial color="#2C333E" metalness={0.9} roughness={0.45} />
          </mesh>
          <mesh position={[0.55, 0.004, -0.5]}>
            <boxGeometry args={[0.1, 0.006, 0.1]} />
            <meshStandardMaterial color="#242A33" metalness={0.9} roughness={0.5} />
          </mesh>
          {/* pin-1 dot */}
          <mesh position={[-1.62, 0.001, 1.62]}>
            <cylinderGeometry args={[0.055, 0.055, 0.008, 24]} />
            <meshStandardMaterial color="#242A33" metalness={0.9} roughness={0.5} />
          </mesh>
        </group>
        {/* underside — recessed cavity with ledge rails (cap read from below) */}
        <mesh position={[0, -0.17, 0]}>
          <boxGeometry args={[3.4, 0.1, 3.4]} />
          <meshStandardMaterial color="#12161D" metalness={0.6} roughness={0.55} envMapIntensity={0.4} />
        </mesh>
        {([
          { p: [0, -0.2, -1.9], s: [4.0, 0.1, 0.2] },
          { p: [0, -0.2, 1.9], s: [4.0, 0.1, 0.2] },
          { p: [-1.9, -0.2, 0], s: [0.2, 0.1, 3.6] },
          { p: [1.9, -0.2, 0], s: [0.2, 0.1, 3.6] },
        ] as const).map((r, i) => (
          <mesh key={i} position={r.p as unknown as [number, number, number]}>
            <boxGeometry args={r.s as unknown as [number, number, number]} />
            <meshStandardMaterial color="#4A535F" metalness={1} roughness={0.35} />
          </mesh>
        ))}
      </group>

      {/* ---- silicon die ---- */}
      <group ref={die}>
        <RoundedBox args={[2.9, 0.16, 2.9]} radius={0.02} smoothness={8} position={[0, SUB_TOP + 0.08, 0]}>
          <meshPhysicalMaterial
            color="#0E1219"
            metalness={1}
            roughness={0.2}
            clearcoat={0.6}
            clearcoatRoughness={0.18}
            envMapIntensity={1.35}
          />
        </RoundedBox>
        {/* seal ring — four thin rails on the die edge */}
        {([
          { p: [0, SUB_TOP + 0.162, -1.415], s: [2.83, 0.012, 0.05] },
          { p: [0, SUB_TOP + 0.162, 1.415], s: [2.83, 0.012, 0.05] },
          { p: [-1.415, SUB_TOP + 0.162, 0], s: [0.05, 0.012, 2.83] },
          { p: [1.415, SUB_TOP + 0.162, 0], s: [0.05, 0.012, 2.83] },
        ] as const).map((r, i) => (
          <mesh key={i} position={r.p as unknown as [number, number, number]}>
            <boxGeometry args={r.s as unknown as [number, number, number]} />
            <meshStandardMaterial color="#8C6D3F" metalness={1} roughness={0.42} />
          </mesh>
        ))}
        {/* floorplan cells */}
        <instancedMesh ref={cellsRef} args={[undefined, undefined, cells.length]} frustumCulled={false}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial metalness={0.75} roughness={0.42} envMapIntensity={0.9} />
        </instancedMesh>
        {/* die fiducials */}
        <mesh position={[-1.2, SUB_TOP + 0.162, -1.2]}>
          <cylinderGeometry args={[0.035, 0.035, 0.012, 16]} />
          <meshStandardMaterial color="#C09A5A" metalness={1} roughness={0.35} />
        </mesh>
        <mesh position={[1.2, SUB_TOP + 0.162, 1.2]}>
          <cylinderGeometry args={[0.035, 0.035, 0.012, 16]} />
          <meshStandardMaterial color="#C09A5A" metalness={1} roughness={0.35} />
        </mesh>
      </group>

      {/* ---- organic substrate ---- */}
      <group>
        <RoundedBox args={[6.4, 0.42, 6.4]} radius={0.05} smoothness={10} position={[0, SUB_TOP - 0.21, 0]}>
          <meshStandardMaterial color="#161B22" metalness={0.3} roughness={0.6} envMapIntensity={0.7} />
        </RoundedBox>
        {/* copper routing */}
        <instancedMesh ref={tracesRef} args={[undefined, undefined, traces.length]} frustumCulled={false}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#A3773F" metalness={0.95} roughness={0.45} envMapIntensity={0.8} />
        </instancedMesh>
        {/* gold pads */}
        <instancedMesh ref={padsRef} args={[undefined, undefined, pads.length]} frustumCulled={false}>
          <boxGeometry args={[0.15, 0.014, 0.1]} />
          <meshStandardMaterial color="#B08D57" metalness={1} roughness={0.38} envMapIntensity={0.8} />
        </instancedMesh>
        {/* die-attach shadow frame (underfill edge) */}
        <mesh position={[0, SUB_TOP + 0.001, 0]}>
          <boxGeometry args={[3.06, 0.008, 3.06]} />
          <meshStandardMaterial color="#1E242E" metalness={0.4} roughness={0.55} />
        </mesh>
      </group>

      {/* ---- BGA solder balls ---- */}
      <instancedMesh ref={bgaRef} args={[undefined, undefined, bga.length]} frustumCulled={false}>
        <sphereGeometry args={[0.093, 12, 12]} />
        <meshStandardMaterial color="#C7CDD6" metalness={1} roughness={0.26} envMapIntensity={0.9} />
      </instancedMesh>
    </group>
  );
}

/* ================================================================== */
/* Error boundary → static fallback                                     */
/* ================================================================== */
class GLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { err: boolean }> {
  state = { err: false };
  static getDerivedStateFromError() {
    return { err: true };
  }
  render() {
    return this.state.err ? this.props.fallback : this.props.children;
  }
}

function StaticVis() {
  return (
    <div className="absolute inset-0 bg-[#05070B]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/die-top.jpg"
        alt="Silicon die surface detail"
        className="h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#05070B_85%)]" />
    </div>
  );
}

/* ================================================================== */
/* Canvas root                                                          */
/* ================================================================== */
export default function ChipCanvas({ progress, onDomUpdate }: SceneProps) {
  return (
    <GLBoundary fallback={<StaticVis />}>
      <Canvas
        camera={{ position: [11.2, 6.4, 13.9], fov: 38, near: 0.1, far: 90 }}
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.05,
        }}
      >
        <color attach="background" args={["#05070B"]} />
        <fog attach="fog" args={["#05070B", 18, 40]} />
        <ambientLight intensity={0.18} />
        <directionalLight position={[4, 7, 3]} intensity={0.5} color="#EAF1FF" />

        <Environment resolution={128} frames={1}>
          <color attach="background" args={["#05070B"]} />
          {/* broad overhead key */}
          <Lightformer intensity={4.2} position={[0, 5, 0]} rotation-x={Math.PI / 2} scale={[9, 9, 1]} color="#F2F6FF" />
          {/* tall rim strip, cool white */}
          <Lightformer intensity={2.4} position={[-6, 1.2, -4]} rotation-y={Math.PI / 3} scale={[0.7, 7, 1]} color="#CFE6F2" />
          {/* second rim, dimmer */}
          <Lightformer intensity={1.3} position={[6, 0.6, -5]} rotation-y={-Math.PI / 3} scale={[0.5, 8, 1]} color="#DFE9FF" />
          {/* low frontal fill */}
          <Lightformer intensity={0.5} position={[0, -0.5, 7]} scale={[7, 2.5, 1]} color="#39455C" />
        </Environment>

        <PackageModel progress={progress} onDomUpdate={onDomUpdate} />
        <CameraRig progress={progress} />

        <ContactShadows position={[0, -0.8, 0]} opacity={0.55} scale={15} blur={2.6} far={3.2} resolution={512} color="#02040A" />
      </Canvas>
    </GLBoundary>
  );
}
