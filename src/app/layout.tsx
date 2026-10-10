import type { Metadata, Viewport } from "next";
import "@fontsource-variable/newsreader/wght.css";
import "@fontsource-variable/newsreader/wght-italic.css";
import "@fontsource-variable/dm-sans/wght.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hub de Talentos · Gabriel Iván Buchanan",
  description:
    "Red de talento empresarial. Diagnóstico, conexión y acompañamiento con especialistas probados en estructura, ventas, marketing, legal, marca y tecnología.",
  openGraph: {
    title: "Hub de Talentos",
    description:
      "Sabemos lo que es cargar la empresa solo. Aquí está el equipo que te faltaba.",
    locale: "es_MX",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#101a2e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-MX" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
