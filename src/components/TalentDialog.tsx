"use client";

import Image from "next/image";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { talents, whatsappLink, type TalentId } from "@/data/talents";

type Ctx = { open: (id: TalentId) => void };

const TalentDialogContext = createContext<Ctx | null>(null);

export function useTalentDialog() {
  const ctx = useContext(TalentDialogContext);
  if (!ctx) throw new Error("useTalentDialog debe usarse dentro de TalentDialogProvider");
  return ctx;
}

export function TalentDialogProvider({ children }: { children: ReactNode }) {
  const [currentId, setCurrentId] = useState<TalentId | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const open = useCallback((id: TalentId) => setCurrentId(id), []);
  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || !currentId) return;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [currentId]);

  const index = currentId ? talents.findIndex((t) => t.id === currentId) : -1;
  const talent = index >= 0 ? talents[index] : null;
  const go = (delta: number) =>
    setCurrentId(talents[(index + delta + talents.length) % talents.length].id);

  const value = useMemo(() => ({ open }), [open]);

  return (
    <TalentDialogContext.Provider value={value}>
      {children}
      <dialog
        ref={dialogRef}
        className="talent-dialog"
        aria-labelledby="talent-dialog-title"
        onClose={() => setCurrentId(null)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
      >
        {talent && (
          <article
            key={talent.id}
            className="relative grid max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-md bg-navy-900 text-cream-100 shadow-[0_40px_120px_-20px_rgb(0_0_0/0.7)] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:min-h-full">
              <Image
                src={talent.photo}
                alt={`Retrato de ${talent.name}`}
                fill
                sizes="(min-width: 768px) 36vw, 100vw"
                className="object-cover object-top"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/10 to-transparent md:bg-gradient-to-r md:from-transparent md:via-transparent md:to-navy-900" />
            </div>

            <div className="flex min-w-0 flex-col gap-5 p-5 sm:gap-6 sm:p-9 md:p-10">
              <button
                type="button"
                onClick={close}
                aria-label="Cerrar"
                className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-navy-950/70 text-cream-100 backdrop-blur transition hover:bg-gold-500 hover:text-navy-950"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>

              <header className="flex flex-col gap-3 pr-10">
                <p className="eyebrow text-gold-400">{talent.field}</p>
                <h2 id="talent-dialog-title" className="text-3xl font-medium leading-[1.1] text-cream-50 sm:text-4xl">
                  {talent.name}
                </h2>
                <p className="font-semibold text-gold-300">{talent.role}</p>
                {talent.credentials?.map((c) => (
                  <p key={c} className="text-sm text-cream-100/65">
                    {c}
                  </p>
                ))}
              </header>

              <p className="font-display text-xl italic leading-snug text-cream-50">
                {talent.quote}
              </p>

              <div className="flex flex-col gap-3 text-[0.98rem] text-cream-100/85">
                {talent.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <section aria-labelledby="dlg-services" className="flex flex-col gap-3">
                <h3 id="dlg-services" className="eyebrow !font-sans text-gold-400">
                  Servicios
                </h3>
                <ul className="flex flex-col gap-2 text-[0.95rem]">
                  {talent.services.map((s) => (
                    <li key={s.text} className="flex gap-3">
                      <span className="mt-[0.6em] size-1 shrink-0 rounded-full bg-gold-500" aria-hidden="true" />
                      <span>
                        {s.title && <strong className="font-semibold text-cream-50">{s.title}: </strong>}
                        {s.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>

              <section aria-labelledby="dlg-collab" className="flex flex-col gap-2">
                <h3 id="dlg-collab" className="eyebrow !font-sans text-gold-400">
                  {talent.collaborationsLabel}
                </h3>
                <p className="text-[0.95rem] text-cream-100/80">{talent.collaborations}</p>
                {talent.highlight && (
                  <p className="mt-2 font-display text-lg italic text-gold-300">
                    {talent.highlight}
                  </p>
                )}
              </section>

              <div className="mt-2 flex flex-wrap items-center justify-between gap-4 pt-4">
                <a
                  href={whatsappLink(
                    `Hola Gabriel, vi el Hub de Talentos y me interesa conectar con ${talent.name} (${talent.field}).`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-sm bg-gold-500 px-5 py-3 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
                >
                  Quiero conectar con {talent.firstName}
                  <span aria-hidden="true">→</span>
                </a>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => go(-1)}
                    aria-label="Talento anterior"
                    className="grid size-11 place-items-center rounded-sm bg-white/[0.07] text-cream-100 transition hover:bg-gold-500 hover:text-navy-950"
                  >
                    ←
                  </button>
                  <span className="min-w-12 text-center text-sm tabular-nums text-cream-100/60">
                    {index + 1} / {talents.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => go(1)}
                    aria-label="Talento siguiente"
                    className="grid size-11 place-items-center rounded-sm bg-white/[0.07] text-cream-100 transition hover:bg-gold-500 hover:text-navy-950"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </article>
        )}
      </dialog>
    </TalentDialogContext.Provider>
  );
}
