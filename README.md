# Hub de Talentos · Landing

Landing interactiva para **Hub de Talentos by Gabriel Iván Buchanan**, construida a partir del PDF de presentación.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Three.js con `@react-three/fiber` · Motion.

## Uso

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Qué incluye

- **Hero 3D**: Gabriel al centro y los cinco talentos orbitando. Parallax con el puntero, hover con etiqueta, clic abre el perfil. Se pausa fuera de pantalla y tiene alternativa sin WebGL.
- **Cómo funciona**: las tres etapas (Diagnóstico, Conexión, Acompañamiento) con línea que se dibuja al hacer scroll y tarjetas con inclinación 3D.
- **Coordinador**: perfil de Gabriel y trayectoria.
- **Áreas**: elige un área y se resaltan los talentos que la cubren.
- **Talentos**: tarjetas con inclinación 3D y un diálogo de perfil completo (servicios, colaboraciones, navegación anterior/siguiente, botón a WhatsApp).
- **Contacto**: datos con botón de copiar y enlace a WhatsApp con mensaje prellenado.
- Respeta `prefers-reduced-motion`, navegación por teclado y diálogo nativo `<dialog>`.

## Dónde editar

| Qué | Archivo |
| --- | --- |
| Textos, servicios, colaboraciones, contacto, áreas | `src/data/talents.ts` |
| Posición del rostro en cada foto (recortes circulares) | `src/data/faces.ts` |
| Fotos | `public/talents/*.jpg` |
| Colores y tipografías | `src/app/globals.css` (bloque `@theme`) |
| Escena 3D | `src/components/HubScene.tsx` |

## Pendientes de confirmar con Gabriel

- **Facebook y LinkedIn**: el PDF solo trae el nombre "Gabriel Ivan", sin URL. Se muestran como texto. Agrega los enlaces en `contact` y en `Contact.tsx` (`href`).
- **Mapa área → talento** (`areas` dentro de cada talento): se dedujo de los servicios de cada ficha; conviene que Gabriel lo valide.
- **Dominio y metadatos Open Graph**: falta imagen para compartir (`og:image`).
