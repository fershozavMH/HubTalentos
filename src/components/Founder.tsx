import Image from "next/image";
import { founder } from "@/data/talents";
import { Reveal } from "./Reveal";
import { TiltCard } from "./TiltCard";

export function Founder() {
  return (
    <section id="coordinador" className="bg-cream-100 py-24 text-ink sm:py-32">
      <div className="mx-auto grid max-w-7xl items-start gap-14 px-5 sm:px-8 lg:grid-cols-[5fr_7fr] lg:gap-20">
        <Reveal className="mx-auto w-full max-w-md [perspective:1400px] lg:sticky lg:top-28 lg:max-w-none">
          <TiltCard max={7} glare className="relative aspect-[4/5] w-full">
            <span
              className="absolute -bottom-5 -right-5 size-full rounded-md bg-cream-200 [transform:translateZ(-30px)]"
              aria-hidden="true"
            />
            <div className="relative size-full overflow-hidden rounded-md bg-cream-200 shadow-[0_40px_80px_-30px_rgb(16_26_46/0.5)]">
              <Image
                src={founder.photo}
                alt={`Retrato de ${founder.name}`}
                fill
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover object-top"
              />
            </div>
          </TiltCard>
        </Reveal>

        <Reveal className="flex flex-col gap-6" delay={0.1}>
          <p className="eyebrow text-gold-700">{founder.field}</p>
          <h2 className="text-4xl font-medium leading-[1.08] text-navy-900 sm:text-5xl">{founder.name}</h2>
          <p className="font-semibold text-gold-700">{founder.brand}</p>
          <p className="font-display text-2xl italic leading-snug text-navy-900">{founder.quote}</p>

          <div className="flex max-w-2xl flex-col gap-4 text-ink-soft">
            {founder.bio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <h3 className="eyebrow !font-sans text-gold-700">Trayectoria</h3>
            <ul className="flex max-w-2xl flex-col gap-3">
              {founder.trajectory.map((t) => (
                <li key={t} className="flex gap-3">
                  <span className="mt-[0.65em] size-1 shrink-0 rounded-full bg-gold-700" aria-hidden="true" />
                  <span className="text-ink">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
