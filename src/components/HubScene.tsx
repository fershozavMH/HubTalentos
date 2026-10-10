"use client";

import { Canvas, useFrame, useLoader, type ThreeEvent } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { founder, talents, type TalentId } from "@/data/talents";
import { faceCrop, type PersonId } from "@/data/faces";

export type SceneTarget = PersonId;

// @react-three/fiber 9 todavía crea un THREE.Clock interno; three lo marca como obsoleto.
const warn = console.warn;
console.warn = (...args: unknown[]) => {
  if (typeof args[0] === "string" && args[0].includes("THREE.Clock")) return;
  warn(...args);
};

type Props = {
  onHover: (label: string | null) => void;
  onSelect: (id: SceneTarget) => void;
  reduced: boolean;
  active: boolean;
};

const GOLD = "#c9a45c";
const GOLD_LIGHT = "#e6cd96";
const ORBIT_R = 2.75;
const TILT = 0.38;

const ORBIT_IDS: TalentId[] = talents.map((t) => t.id);
const PHOTO_URLS = [founder.photo, ...talents.map((t) => t.photo)];
const LABELS: Record<PersonId, string> = {
  gabriel: `${founder.name} · Coordinador del Hub`,
  ...(Object.fromEntries(talents.map((t) => [t.id, `${t.name} · ${t.field}`])) as Record<TalentId, string>),
};

function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function orbitPosition(angle: number, out: THREE.Vector3) {
  const z0 = Math.sin(angle) * ORBIT_R;
  return out.set(Math.cos(angle) * ORBIT_R, -z0 * Math.sin(TILT), z0 * Math.cos(TILT));
}

function makeHaloTexture() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(230,205,150,0.95)");
  g.addColorStop(0.45, "rgba(201,164,92,0.35)");
  g.addColorStop(1, "rgba(201,164,92,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function Scene({ onHover, onSelect, reduced }: Omit<Props, "active">) {
  const loaded = useLoader(THREE.TextureLoader, PHOTO_URLS);

  const maps = useMemo(() => {
    const ids: PersonId[] = ["gabriel", ...ORBIT_IDS];
    return loaded.map((tex, i) => {
      const c = faceCrop(ids[i]);
      const t = tex.clone();
      t.colorSpace = THREE.SRGBColorSpace;
      t.repeat.set(c.repeatX, c.repeatY);
      t.offset.set(c.offsetX, c.offsetY);
      t.anisotropy = 8;
      t.needsUpdate = true;
      return t;
    });
  }, [loaded]);

  const halo = useMemo(() => makeHaloTexture(), []);

  const dust = useMemo(() => {
    const rand = mulberry32(7);
    const n = 320;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 4.5 + rand() * 7;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.7;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 2;
    }
    return arr;
  }, []);

  const lines = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(ORBIT_IDS.length * 6), 3));
    const mat = new THREE.LineBasicMaterial({
      color: GOLD,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    return new THREE.LineSegments(geo, mat);
  }, []);

  const nodeRefs = useRef<(THREE.Group | null)[]>([]);
  const haloMats = useRef<(THREE.MeshBasicMaterial | null)[]>([]);
  const coreRef = useRef<THREE.Group>(null);
  const coreHalo = useRef<THREE.Mesh>(null);
  const latticeA = useRef<THREE.Mesh>(null);
  const latticeB = useRef<THREE.Mesh>(null);
  const dustRef = useRef<THREE.Points>(null);

  const angle = useRef(-Math.PI / 2);
  const speed = useRef(0.14);
  const hovered = useRef<number | null>(null);
  const hoverT = useRef<number[]>(ORBIT_IDS.map(() => 0));
  const tmp = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    const step = Math.min(dt, 0.05);

    const cam = state.camera;
    const aspect = state.size.width / state.size.height;
    const fitZ = THREE.MathUtils.clamp(4.5 / (Math.tan(THREE.MathUtils.degToRad(19)) * aspect), 10, 17);
    cam.position.z = THREE.MathUtils.damp(cam.position.z, fitZ, 4, step);

    if (!reduced) {
      cam.position.x = THREE.MathUtils.damp(cam.position.x, state.pointer.x * 1.4, 2.5, step);
      cam.position.y = THREE.MathUtils.damp(cam.position.y, 0.8 + state.pointer.y * 0.9, 2.5, step);
    }
    cam.lookAt(0, 0, 0);

    const targetSpeed = reduced ? 0 : hovered.current !== null ? 0.02 : 0.14;
    speed.current = THREE.MathUtils.damp(speed.current, targetSpeed, 3, step);
    angle.current += step * speed.current;

    const pos = lines.geometry.getAttribute("position") as THREE.BufferAttribute;
    ORBIT_IDS.forEach((_, i) => {
      const g = nodeRefs.current[i];
      if (!g) return;
      orbitPosition(angle.current + (i * Math.PI * 2) / ORBIT_IDS.length, tmp);
      g.position.copy(tmp);
      g.quaternion.copy(state.camera.quaternion);

      hoverT.current[i] = THREE.MathUtils.damp(hoverT.current[i], hovered.current === i ? 1 : 0, 8, step);
      const h = hoverT.current[i];
      const depth = THREE.MathUtils.clamp(tmp.z / ORBIT_R, -1, 1) * 0.5 + 0.5;
      g.scale.setScalar((0.84 + depth * 0.16) * (1 + h * 0.22));
      g.renderOrder = Math.round(depth * 10);
      const mat = haloMats.current[i];
      if (mat) mat.opacity = 0.05 + h * 0.55;

      pos.setXYZ(i * 2, 0, 0, 0);
      pos.setXYZ(i * 2 + 1, tmp.x, tmp.y, tmp.z);
    });
    pos.needsUpdate = true;

    if (coreRef.current) coreRef.current.quaternion.copy(state.camera.quaternion);
    if (coreHalo.current && !reduced) coreHalo.current.scale.setScalar(1 + Math.sin(t * 1.6) * 0.06);
    if (!reduced) {
      if (latticeA.current) {
        latticeA.current.rotation.y = t * 0.12;
        latticeA.current.rotation.x = t * 0.07;
      }
      if (latticeB.current) {
        latticeB.current.rotation.y = -t * 0.08;
        latticeB.current.rotation.z = t * 0.05;
      }
      if (dustRef.current) dustRef.current.rotation.y = t * 0.012;
    }
  });

  const setHover = (e: ThreeEvent<PointerEvent>, i: number | null, label: string | null) => {
    hovered.current = i;
    const el = e.nativeEvent.target as HTMLElement | null;
    if (el) el.style.cursor = label ? "pointer" : "";
    onHover(label);
  };

  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[3, 4, 6]} intensity={2.4} color="#fff3dc" />
      <pointLight position={[-5, -2, 4]} intensity={18} color={GOLD_LIGHT} distance={14} />

      <points ref={dustRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[dust, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.028} color={GOLD_LIGHT} transparent opacity={0.4} sizeAttenuation depthWrite={false} />
      </points>

      <mesh ref={latticeA}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial color={GOLD} wireframe transparent opacity={0.1} />
      </mesh>
      <mesh ref={latticeB}>
        <icosahedronGeometry args={[2.25, 0]} />
        <meshBasicMaterial color={GOLD_LIGHT} wireframe transparent opacity={0.05} />
      </mesh>

      <mesh rotation={[Math.PI / 2 + TILT, 0, 0]}>
        <torusGeometry args={[ORBIT_R, 0.014, 16, 240]} />
        <meshStandardMaterial color={GOLD} metalness={0.85} roughness={0.35} transparent opacity={0.7} />
      </mesh>
      <mesh rotation={[Math.PI / 2 + TILT, 0, 0]}>
        <torusGeometry args={[ORBIT_R + 0.95, 0.006, 8, 240]} />
        <meshBasicMaterial color={GOLD} transparent opacity={0.1} />
      </mesh>

      <primitive object={lines} />

      <group ref={coreRef}>
        <mesh ref={coreHalo} position-z={-0.05}>
          <circleGeometry args={[2.4, 64]} />
          <meshBasicMaterial map={halo} transparent opacity={0.28} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
        <mesh position-z={-0.02}>
          <torusGeometry args={[1.16, 0.06, 24, 128]} />
          <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.28} />
        </mesh>
        <mesh position-z={-0.14} rotation-x={Math.PI / 2}>
          <cylinderGeometry args={[1.16, 1.16, 0.22, 96]} />
          <meshStandardMaterial color="#1b2842" metalness={0.5} roughness={0.5} />
        </mesh>
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHover(e, null, LABELS.gabriel);
          }}
          onPointerOut={(e) => setHover(e, null, null)}
          onClick={(e) => {
            e.stopPropagation();
            onSelect("gabriel");
          }}
        >
          <circleGeometry args={[1.12, 96]} />
          <meshBasicMaterial map={maps[0]} toneMapped={false} />
        </mesh>
      </group>

      {ORBIT_IDS.map((id, i) => (
        <group
          key={id}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
        >
          <mesh position-z={-0.05}>
            <circleGeometry args={[1.25, 48]} />
            <meshBasicMaterial
              ref={(m) => {
                haloMats.current[i] = m;
              }}
              map={halo}
              transparent
              opacity={0.18}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
              toneMapped={false}
            />
          </mesh>
          <mesh position-z={-0.02}>
            <torusGeometry args={[0.75, 0.045, 20, 96]} />
            <meshStandardMaterial color={GOLD} metalness={0.9} roughness={0.28} />
          </mesh>
          <mesh position-z={-0.12} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.75, 0.75, 0.2, 64]} />
            <meshStandardMaterial color="#1b2842" metalness={0.5} roughness={0.5} />
          </mesh>
          <mesh
            onPointerOver={(e) => {
              e.stopPropagation();
              setHover(e, i, LABELS[id]);
            }}
            onPointerOut={(e) => setHover(e, null, null)}
            onClick={(e) => {
              e.stopPropagation();
              onSelect(id);
            }}
          >
            <circleGeometry args={[0.72, 64]} />
            <meshBasicMaterial map={maps[i + 1]} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </>
  );
}

export default function HubScene({ onHover, onSelect, reduced, active }: Props) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.8, 12], fov: 38 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <Scene onHover={onHover} onSelect={onSelect} reduced={reduced} />
    </Canvas>
  );
}
