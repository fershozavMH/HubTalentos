"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { avatarStyle } from "@/data/faces";
import { contact, founder, whatsappLink } from "@/data/talents";
import { Reveal } from "./Reveal";

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copiar ${label}`}
      className="shrink-0 rounded-sm bg-white/[0.07] px-3 py-1.5 text-xs font-semibold text-gold-300 transition hover:bg-gold-500 hover:text-navy-950"
    >
      {copied ? "Copiado" : "Copiar"}
    </button>
  );
}

type Row = { label: string; value: string; href?: string; copy?: boolean };

export function Contact() {
  const rows: Row[] = [
    { label: "WhatsApp", value: contact.whatsappDisplay, copy: true },
    { label: "Correo", value: contact.email, copy: true },
    { label: "Instagram", value: contact.instagram, href: contact.instagramUrl },
    { label: "Facebook", value: contact.facebook },
    { label: "LinkedIn", value: contact.linkedin },
  ];

  return (
    <section id="contacto" className="relative overflow-hidden bg-navy-950 py-24 sm:py-32">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(48rem 30rem at 85% 10%, rgb(36 53 87 / 0.6), transparent 70%)",
        }}
      />
      <div className="relative mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <Reveal className="flex flex-col gap-8">
          <p className="eyebrow text-gold-400">Siguiente paso</p>
          <h2 className="text-[clamp(3rem,7vw,5.2rem)] font-medium leading-[1] tracking-[-0.02em] text-cream-50">
            Agenda tu
            <br />
            diagnóstico
          </h2>
          <p className="max-w-xl text-lg text-cream-100/80">
            Una plática de confianza para identificar en qué etapa está tu empresa y qué necesita para dar el siguiente paso.
          </p>

          <div className="flex flex-wrap items-center gap-5">
            <a
              href={whatsappLink("Hola Gabriel, quiero agendar mi diagnóstico del Hub de Talentos.")}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-sm bg-gold-500 px-7 py-3.5 font-semibold text-navy-950 transition hover:bg-gold-300"
            >
              Escríbeme por WhatsApp
              <span aria-hidden="true" className="transition group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>

          <div className="mt-4 flex items-center gap-5">
            <span className="relative block size-20 shrink-0 overflow-hidden rounded-full ring-1 ring-gold-500/60">
              <Image
                src={founder.photo}
                alt={`Retrato de ${founder.name}`}
                fill
                sizes="80px"
                className="object-cover"
                style={avatarStyle("gabriel")}
              />
            </span>
            <div>
              <p className="font-display text-2xl font-medium text-cream-50">{founder.name}</p>
              <p className="text-gold-400">{founder.brand}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} className="flex flex-col justify-center">
          <dl className="flex flex-col">
            {rows.map((r) => (
              <div
                key={r.label}
                className="grid grid-cols-[6.5rem_minmax(0,1fr)_auto] items-center gap-4 border-b border-cream-100/10 py-5 first:border-t"
              >
                <dt className="eyebrow !text-[0.7rem] text-gold-400">{r.label}</dt>
                <dd className="min-w-0 break-words text-cream-50">
                  {r.href ? (
                    <a href={r.href} target="_blank" rel="noopener noreferrer" className="underline decoration-gold-500/50 underline-offset-4 hover:decoration-gold-300">
                      {r.value}
                    </a>
                  ) : (
                    r.value
                  )}
                </dd>
                {r.copy ? <CopyButton value={r.value} label={r.label} /> : <span />}
              </div>
            ))}
          </dl>
          <p className="mt-6 text-sm text-cream-100/60">{contact.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
