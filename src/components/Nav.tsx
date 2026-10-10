"use client";

import { useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";

const links = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#areas", label: "Áreas" },
  { href: "#talentos", label: "Talentos" },
  { href: "#contacto", label: "Contacto" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        scrolled || menu ? "bg-navy-950/80 shadow-[0_1px_0_rgb(255_255_255/0.05)] backdrop-blur-md" : ""
      }`}
    >
      <nav aria-label="Principal" className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-3" onClick={() => setMenu(false)}>
          <svg viewBox="0 0 64 64" className="size-8" aria-hidden="true">
            <circle cx="32" cy="32" r="21" fill="none" stroke="#c9a45c" strokeWidth="2.5" />
            <path d="M22 20v24M42 20v24M22 32h20" stroke="#faf7f1" strokeWidth="4.5" strokeLinecap="round" />
            <circle cx="32" cy="9" r="3.4" fill="#c9a45c" />
          </svg>
          <span className="font-display text-xl font-semibold tracking-tight text-cream-50">Hub de Talentos</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-sm text-cream-100/75 transition hover:text-cream-50">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contacto"
              className="inline-flex rounded-sm bg-gold-500 px-4 py-2 text-sm font-semibold text-navy-950 transition hover:bg-gold-300"
            >
              Agenda tu diagnóstico
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="grid size-10 place-items-center rounded-sm bg-white/[0.06] text-cream-100 md:hidden"
          aria-expanded={menu}
          aria-controls="menu-movil"
          aria-label={menu ? "Cerrar menú" : "Abrir menú"}
          onClick={() => setMenu((m) => !m)}
        >
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {menu ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 8h16M4 16h16" />}
          </svg>
        </button>
      </nav>

      <div id="menu-movil" hidden={!menu} className="bg-navy-950/95 px-5 pb-6 pt-2 md:hidden">
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                onClick={() => setMenu(false)}
                className="block py-3.5 font-display text-2xl text-cream-50"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contacto"
          onClick={() => setMenu(false)}
          className="mt-5 flex justify-center rounded-sm bg-gold-500 px-5 py-3 font-semibold text-navy-950"
        >
          Agenda tu diagnóstico
        </a>
      </div>
    </header>
  );
}
