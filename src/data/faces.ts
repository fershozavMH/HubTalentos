import type { CSSProperties } from "react";
import type { TalentId } from "./talents";

export type PersonId = "gabriel" | TalentId;

/**
 * Posición aproximada del rostro dentro de cada foto (fracciones 0–1, y medida desde arriba)
 * y la proporción alto/ancho de la imagen guardada en /public/talents.
 * Se usa para recortar retratos circulares tanto en CSS como en la escena 3D.
 */
export const faces: Record<PersonId, { x: number; y: number; aspect: number }> = {
  gabriel: { x: 0.52, y: 0.34, aspect: 1.25 },
  arylene: { x: 0.56, y: 0.28, aspect: 1.25 },
  yuri: { x: 0.52, y: 0.4, aspect: 1.25 },
  manuel: { x: 0.52, y: 0.22, aspect: 1.25 },
  carel: { x: 0.51, y: 0.24, aspect: 1 },
  julio: { x: 0.52, y: 0.32, aspect: 1.25 },
  fernando: { x: 0.51, y: 0.25, aspect: 1.25 },
};

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/**
 * Estilo para un <img> con object-cover dentro de un contenedor cuadrado con overflow-hidden:
 * acerca el rostro y lo centra.
 */
export function avatarStyle(id: PersonId, zoom = 1.7): CSSProperties {
  const f = faces[id];
  const overflow = f.aspect - 1;
  const p = overflow > 0 ? clamp((f.y * f.aspect - 0.5) / overflow, 0, 1) : 0.5;
  const faceInBox = f.y * f.aspect - p * overflow;
  return {
    objectPosition: `50% ${p * 100}%`,
    transformOrigin: `${f.x * 100}% ${faceInBox * 100}%`,
    transform: `translate(${(0.5 - f.x) * 100}%, ${(0.5 - faceInBox) * 100}%) scale(${zoom})`,
  };
}

/** Recorte cuadrado centrado en el rostro, en coordenadas UV de three.js. */
export function faceCrop(id: PersonId, size = 0.62) {
  const f = faces[id];
  const repeatX = size;
  const repeatY = size / f.aspect;
  return {
    repeatX,
    repeatY,
    offsetX: clamp(f.x - repeatX / 2, 0, 1 - repeatX),
    offsetY: clamp(1 - f.y - repeatY / 2, 0, 1 - repeatY),
  };
}
