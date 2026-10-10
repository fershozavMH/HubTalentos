import { reasons } from "@/data/talents";
import { Reveal } from "./Reveal";

export function Reasons() {
  return (
    <section id="por-que" className="relative overflow-hidden bg-navy-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex flex-col gap-6">
          <p className="eyebrow text-gold-400">Por qué con nosotros</p>
        </Reveal>

        <ul className="mt-12 grid gap-10 md:grid-cols-3 md:gap-12">
          {reasons.map((r, i) => (
            <li key={r.title}>
              <Reveal delay={i * 0.12} className="flex flex-col gap-4">
                <h3 className="text-3xl font-medium leading-[1.1] text-cream-50 sm:text-4xl">{r.title}</h3>
                <p className="max-w-xs text-cream-100/75">{r.text}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
