"use client";

import Image from "next/image";
import { useState } from "react";
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
  const current = preview ?? selected;
  const currentArea = areas.find((a) => a.id === current);
  const matched = current ? talents.filter((t) => t.areas.includes(current)) : talents;

  return (
    <section id="areas" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <p className="eyebrow text-gold-400">Áreas que cubrimos</p>
            <h2 className="text-4xl font-medium leading-[1.08] text-cream-50 sm:text-5xl">¿Qué necesita tu empresa?</h2>
            <p className="max-w-lg text-lg text-cream-100/80">
              Elige un área y mira qué talentos de la red la cubren.
            </p>
          </div>

          <div role="group" aria-label="Áreas" className="grid gap-x-8 sm:grid-cols-2">
            {areas.map((a) => {
              const on = selected === a.id;
              return (
                <button
                  key={a.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setSelected(on ? null : a.id)}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setPreview(a.id)}
                  onPointerLeave={() => setPreview(null)}
                  onFocus={() => setPreview(a.id)}
                  onBlur={() => setPreview(null)}
                  className={`flex items-center gap-3 py-2 text-left text-[0.97rem] font-medium transition duration-300 ${
                    on
                      ? "text-gold-300"
                      : "text-cream-100/70 hover:text-cream-50"
                  }`}
                >
                  <span className={`size-1.5 shrink-0 rounded-full transition ${on ? "scale-150 bg-gold-400" : "bg-cream-100/30"}`} aria-hidden="true" />
                  {a.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col gap-5">
          <p aria-live="polite" className="min-h-14 font-display text-xl italic text-cream-100 sm:text-2xl">
            {currentArea ? (
              <>
                <span className="text-gold-400">{currentArea.label}:</span>{" "}
                {joinNames(matched.map((t) => t.name))}
              </>
            ) : (
              "Toda la red, un solo contacto."
            )}
          </p>

          <ul className="flex flex-col gap-1">
            {talents.map((t) => {
              const hit = !current || t.areas.includes(current);
              return (
                <li key={t.id}>
                  <button
                    type="button"
                    onClick={() => open(t.id)}
                    className={`group flex w-full items-center gap-5 py-2.5 text-left transition duration-500 ${
                      hit
                        ? "opacity-100 [transform:translateX(0)]"
                        : "opacity-30 grayscale [transform:translateX(-6px)]"
                    } ${current && hit ? "[transform:translateX(10px)]" : ""}`}
                  >
                    <span className="relative block size-16 shrink-0 overflow-hidden rounded-full ring-1 ring-gold-500/60 sm:size-[4.5rem]">
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
                      <span className="truncate text-sm text-cream-100/70">{t.role}</span>
                    </span>
                    <span className="text-gold-400 transition group-hover:translate-x-1" aria-hidden="true">
                      →
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
