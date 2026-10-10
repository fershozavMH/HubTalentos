"use client";

import Image from "next/image";
import { talents } from "@/data/talents";
import { avatarStyle } from "@/data/faces";
import { Reveal } from "./Reveal";
import { useTalentDialog } from "./TalentDialog";
import { TiltCard } from "./TiltCard";

export function TalentGrid() {
  const { open } = useTalentDialog();

  return (
    <section id="talentos" className="bg-cream-100 py-24 text-ink sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex max-w-3xl flex-col gap-6">
          <p className="eyebrow text-gold-700">La red</p>
          <h2 className="text-4xl font-medium leading-[1.08] text-navy-900 sm:text-5xl">Los especialistas del Hub</h2>
          <p className="max-w-2xl text-lg text-ink-soft">
            Entra a cada perfil para ver sus servicios, su trayectoria y con qué empresas han colaborado.
          </p>
        </Reveal>

        <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 [perspective:1600px]">
          {talents.map((t, i) => (
            <li key={t.id}>
              <Reveal delay={(i % 3) * 0.1} className="h-full">
                <TiltCard
                  as="button"
                  type="button"
                  onClick={() => open(t.id)}
                  aria-label={`Ver perfil de ${t.name}, ${t.field}`}
                  max={10}
                  className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-md bg-navy-900 text-left shadow-[0_24px_50px_-30px_rgb(16_26_46/0.55)] transition-shadow duration-500 hover:shadow-[0_36px_70px_-30px_rgb(16_26_46/0.7)]"
                >
                  <Image
                    src={t.photo}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
                    className="object-cover object-top transition duration-700 ease-out group-hover:scale-[1.06]"
                    style={t.id === "carel" ? { objectPosition: "50% 20%" } : undefined}
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/35 to-transparent" aria-hidden="true" />

                  <span className="absolute inset-x-0 bottom-0 flex flex-col gap-1.5 p-6 [transform:translateZ(50px)]">
                    <span className="eyebrow text-gold-400">{t.field}</span>
                    <span className="font-display text-3xl font-medium leading-none text-cream-50">{t.name}</span>
                    <span className="text-sm text-cream-100/80">{t.role}</span>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-gold-300">
                      Ver perfil
                      <span className="transition group-hover:translate-x-1.5" aria-hidden="true">
                        →
                      </span>
                    </span>
                  </span>
                </TiltCard>
              </Reveal>
            </li>
          ))}

          <li>
            <Reveal delay={0.2} className="h-full">
              <TiltCard
                max={6}
                className="flex aspect-[4/5] w-full flex-col justify-between gap-6 p-2 sm:p-4"
              >
                <ul className="flex -space-x-3" aria-hidden="true">
                  {talents.map((t) => (
                    <li key={t.id} className="relative block size-12 overflow-hidden rounded-full ring-2 ring-cream-100">
                      <Image src={t.photo} alt="" fill sizes="48px" className="object-cover" style={avatarStyle(t.id)} />
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col gap-4 [transform:translateZ(40px)]">
                  <p className="font-display text-3xl font-medium leading-[1.1] text-navy-900">
                    Empieza por el diagnóstico.
                  </p>
                  <p className="text-ink-soft">
                    Una plática de confianza para identificar en qué etapa está tu empresa y qué necesita para dar el siguiente
                    paso.
                  </p>
                  <a
                    href="#contacto"
                    className="inline-flex w-fit items-center gap-2 rounded-sm bg-navy-900 px-5 py-3 text-sm font-semibold text-cream-50 transition hover:bg-navy-700"
                  >
                    Agenda tu diagnóstico <span aria-hidden="true">→</span>
                  </a>
                </div>
              </TiltCard>
            </Reveal>
          </li>
        </ul>
      </div>
    </section>
  );
}
