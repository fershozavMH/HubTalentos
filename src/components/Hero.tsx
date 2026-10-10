import { HeroScene } from "./HeroScene";

export function Hero() {
  return (
    <section id="inicio" className="relative overflow-hidden bg-navy-950">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(56rem 38rem at 76% 42%, rgb(36 53 87 / 0.7), transparent 70%)",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-4 px-5 pb-8 pt-24 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:pb-14 lg:pt-24">
        <div className="flex flex-col gap-6 sm:gap-8">
          <p className="rise eyebrow text-gold-400" style={{ "--d": "0.05s" } as React.CSSProperties}>
            Red de talento empresarial
          </p>

          <div className="flex flex-col gap-5">
            <h1
              className="rise text-[clamp(3.4rem,8.5vw,6.6rem)] font-medium leading-[0.95] tracking-[-0.025em] text-cream-50"
              style={{ "--d": "0.15s" } as React.CSSProperties}
            >
              Hub de
              <br />
              Talentos
            </h1>
            <p className="rise font-display text-xl text-cream-100/90 sm:text-2xl" style={{ "--d": "0.3s" } as React.CSSProperties}>
              <span className="italic text-gold-400">by</span>{" "}
              <span className="font-semibold tracking-wide text-gold-400">Gabriel Iván Buchanan</span>
            </p>
          </div>

          <p
            className="rise max-w-xl font-display text-xl italic leading-snug text-cream-100/90 sm:text-2xl"
            style={{ "--d": "0.45s" } as React.CSSProperties}
          >
            Sabemos lo que es cargar la empresa solo.
            <strong className="block font-semibold not-italic text-gold-400">Aquí está el equipo que te faltaba.</strong>
          </p>

          <div className="rise grid gap-3 sm:flex sm:flex-wrap sm:items-center sm:gap-4" style={{ "--d": "0.6s" } as React.CSSProperties}>
            <a
              href="#contacto"
              className="group inline-flex items-center justify-center gap-3 rounded-sm bg-gold-500 px-7 py-3.5 text-[0.95rem] font-semibold text-navy-950 transition hover:bg-gold-300"
            >
              Agenda tu diagnóstico
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#talentos"
              className="inline-flex items-center justify-center rounded-sm bg-white/[0.06] px-7 py-3.5 text-[0.95rem] font-medium text-cream-100 transition hover:bg-white/10"
            >
              Conoce a los talentos
            </a>
          </div>

          <p className="rise eyebrow text-cream-100/50" style={{ "--d": "0.75s" } as React.CSSProperties}>
            Diagnóstico · Conexión · Acompañamiento
          </p>
        </div>

        <div className="rise" style={{ "--d": "0.35s" } as React.CSSProperties}>
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
