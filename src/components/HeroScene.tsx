"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { avatarStyle } from "@/data/faces";
import { talents } from "@/data/talents";
import { useTalentDialog } from "./TalentDialog";
import type { SceneTarget } from "./HubScene";

const HubScene = dynamic(() => import("./HubScene"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

function SceneSkeleton() {
  return (
    <div className="grid h-full w-full place-items-center" aria-hidden="true">
      <div className="size-40 animate-pulse rounded-full bg-gold-500/10" />
    </div>
  );
}

let webglCache: boolean | null = null;
function detectWebGL() {
  if (webglCache === null) {
    try {
      const c = document.createElement("canvas");
      webglCache = !!(c.getContext("webgl2") || c.getContext("webgl"));
    } catch {
      webglCache = false;
    }
  }
  return webglCache;
}

const noopSubscribe = () => () => {};
const subscribeReduced = (cb: () => void) => {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getReduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const IDLE_CAPTION = "Toca o pasa el cursor sobre un talento";

export function HeroScene() {
  const { open } = useTalentDialog();
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  const webgl = useSyncExternalStore(noopSubscribe, detectWebGL, () => true);
  const reduced = useSyncExternalStore(subscribeReduced, getReduced, () => false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onSelect = useCallback(
    (id: SceneTarget) => {
      if (id === "gabriel") {
        document.getElementById("coordinador")?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        open(id);
      }
    },
    [open],
  );

  return (
    <div className="flex flex-col items-center gap-3">
      <div ref={wrapRef} className="relative h-[340px] w-full sm:h-[500px] lg:h-[620px]">
        {webgl ? (
          <>
            <div className="absolute inset-0" aria-hidden="true">
              <HubScene onHover={setLabel} onSelect={onSelect} reduced={reduced} active={visible} />
            </div>
            <p className="sr-only">
              Escena interactiva: Gabriel Iván Buchanan al centro y cinco especialistas en órbita. Los mismos perfiles están en la sección Talentos.
            </p>
          </>
        ) : (
          <ul className="grid h-full grid-cols-3 content-center justify-items-center gap-6 px-4">
            {talents.map((t) => (
              <li key={t.id}>
                <button type="button" onClick={() => open(t.id)} className="group flex flex-col items-center gap-2">
                  <span className="relative block size-20 overflow-hidden rounded-full ring-1 ring-gold-500/60">
                    <Image src={t.photo} alt="" fill sizes="80px" className="object-cover" style={avatarStyle(t.id)} />
                  </span>
                  <span className="text-xs text-cream-100/80 group-hover:text-gold-300">{t.firstName}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <p
        aria-live="polite"
        className="min-h-6 text-center text-sm tracking-wide text-gold-300/90 transition-opacity"
      >
        {label ?? IDLE_CAPTION}
      </p>
    </div>
  );
}
