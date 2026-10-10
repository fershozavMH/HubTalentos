"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useRef } from "react";
import { stages } from "@/data/talents";
import { Reveal } from "./Reveal";

export function Stages() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 60%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const scaleX = useTransform(smooth, [0, 1], [0, 1]);
  const scaleY = scaleX;

  return (
    <section id="como-funciona" className="relative bg-navy-900 py-16 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="flex max-w-3xl flex-col gap-6">
          <p className="eyebrow text-gold-400">Qué hacemos</p>
          <h2 className="text-4xl font-medium leading-[1.08] text-cream-50 sm:text-5xl">
            Toda empresa está en una etapa identificable
          </h2>
          <p className="max-w-2xl text-lg text-cream-100/80">
            Ya sea para apagar un fuego, implementar un proceso o evolucionar toda la organización, te ayudamos a definir
            qué necesitas y te conectamos con el talento correcto para llegar al siguiente nivel.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-16">
          <div className="absolute left-0 right-0 top-0 hidden h-px bg-gold-500/20 md:block" aria-hidden="true">
            <motion.div style={{ scaleX, transformOrigin: "left" }} className="h-full bg-gold-400" />
          </div>
          <div className="absolute bottom-0 left-0 top-0 w-px bg-gold-500/20 md:hidden" aria-hidden="true">
            <motion.div style={{ scaleY, transformOrigin: "top" }} className="h-full w-full bg-gold-400" />
          </div>

          <ol className="grid gap-8 pl-7 md:grid-cols-3 md:gap-10 md:pl-0 md:pt-10">
            {stages.map((s, i) => (
              <li key={s.title} className="relative">
                <span
                  className="absolute -left-[1.875rem] top-[1.2rem] size-2.5 rounded-full bg-gold-400 md:-top-[2.9rem] md:left-0"
                  aria-hidden="true"
                />
                <Reveal delay={i * 0.12} className="h-full">
                  <div className="flex h-full flex-col gap-4 md:pr-6">
                    <span
                      className="font-display text-5xl font-medium leading-none text-gold-500/70"
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-medium text-cream-50">{s.title}</h3>
                    <p className="text-cream-100/75">{s.text}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
