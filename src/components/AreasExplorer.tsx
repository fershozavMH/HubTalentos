"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { avatarStyle } from "@/data/faces";
import { areas, talents, type AreaId } from "@/data/talents";
import { Reveal } from "./Reveal";
import { useTalentDialog } from "./TalentDialog";

function joinNames(names: string[]) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} y ${names[names.length - 1]}`;
}

export function AreasExplorer() {
  const { open } = useTalentDialog();
  const [selected, setSelected] = useState<AreaId | null>(null);
  const [preview, setPreview] = useState<AreaId | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const current = preview ?? selected;
  const currentArea = areas.find((a) => a.id === current);
  const matched = current ? talents.filter((t) => t.areas.includes(current)) : talents;

  const select = (id: AreaId) => {
    const turnOn = selected !== id;
    setSelected(turnOn ? id : null);
    const el = resultRef.current;
    if (turnOn && el && window.matchMedia("(max-width: 1023px)").matches && el.getBoundingClientRect().top > window.innerHeight * 0.55) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section id="areas" className="relative overflow-hidden bg-navy-950 py-16 sm:py-28">
      <div className="relative mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-5">
            <p className="eyebrow text-gold-400">Áreas que cubrimos</p>
            <h2 className="text-[2rem] font-medium leading-[1.12] text-cream-50 sm:text-5xl">¿Qué necesita tu empresa?</h2>
            <p className="max-w-lg text-cream-100/80 sm:text-lg">
              Elige un área y mira qué talentos de la red la cubren.
            </p>
          </div>

          <div role="group" aria-label="Áreas" className="flex flex-wrap gap-2">
            {areas.map((a) => {
              const on = selected === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => select(a.id)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setPreview(a.id)}
                  onPointerLeave={() => setPreview(null)}
                  onFocus={() => setPreview(a.id)}
                  onBlur={() => setPreview(null)}
                  className={`min-h-11 rounded-full px-4 py-2 text-left text-[0.92rem] font-medium transition duration-300 ${
                    on
                      ? "bg-gold-500 text-navy-950"
                      : "bg-white/[0.07] text-cream-100/85 hover:bg-white/[0.13]"
                  }`}
                >
                  {a.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="min-w-0">
          <div ref={resultRef} className="flex scroll-mt-20 flex-col gap-4">
          <p aria-live="polite" className="min-h-[4.5rem] font-display text-xl italic leading-snug text-cream-100 sm:min-h-14 sm:text-2xl">
            {currentArea ? (
              <>
                <span className="text-gold-400">{currentArea.label}:</span>{" "}
                {joinNames(matched.map((t) => t.name))}
              </>
            ) : (
              "Toda la red, un solo contacto."
            )}
          </p>

          <ul className="flex flex-col">
            {talents.map((t) => {
              const hit = !current || t.areas.includes(current);
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => open(t.id)}
                    className={`group flex w-full items-center gap-4 rounded-sm px-3 py-2.5 text-left transition duration-500 sm:gap-5 ${
                      !hit
                        ? "opacity-30 grayscale"
                        : current
                          ? "bg-gold-500/15"
                          : ""
                    }`}
                  >
                    <span className="relative block size-14 shrink-0 overflow-hidden rounded-full ring-1 ring-gold-500/60 sm:size-16">
                      <Image
                        src={t.photo}
                        alt=""
                        fill
                        sizes="72px"
                        className="object-cover"
                        style={avatarStyle(t.id)}
                      />
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span className="font-display text-xl font-medium text-cream-50">{t.name}</span>
                      <span className="text-sm leading-snug text-cream-100/70">{t.role}</span>
                    </span>
                    <span className="text-gold-400 transition group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
