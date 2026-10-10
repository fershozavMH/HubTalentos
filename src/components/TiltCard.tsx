"use client";

import { useRef, type ComponentType, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  max?: number;
  as?: ElementType;
  glare?: boolean;
} & Record<string, unknown>;

export function TiltCard({
  children,
  className = "",
  max = 9,
  as = "div",
  glare = true,
  ...rest
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const Tag = as as unknown as ComponentType<Record<string, unknown>>;

  const enabled = () =>
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || !enabled()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.dataset.active = "true";
    el.style.setProperty("--ry", `${(px - 0.5) * 2 * max}deg`);
    el.style.setProperty("--rx", `${-(py - 0.5) * 2 * max}deg`);
    el.style.setProperty("--gx", `${px * 100}%`);
    el.style.setProperty("--gy", `${py * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.dataset.active = "false";
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
  };

  return (
    <Tag
      ref={ref}
      className={`tilt relative ${className}`}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      {...rest}
    >
      {children}
      {glare && <span className="tilt-glare absolute inset-0 rounded-[inherit]" aria-hidden="true" />}
    </Tag>
  );
}
