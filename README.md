# Prototipo — Saving The Amazon

Prototipo de alta fidelidad para presentar al cliente, construido para demostrar la propuesta
de `Propuesta_Fase1_SavingTheAmazon.pdf`: una página propia (no Shopify), rápida, bilingüe,
con un proceso de donación diseñado para donar y no para comprar.

## Cómo verlo

```bash
npm install
npm run dev
```

Abre `http://localhost:3000`.

## Qué incluye (alcance de este prototipo)

- **Home** (`/`) — menú simplificado (3 opciones + CTA), cifras reales de la fundación,
  proceso en 3 pasos, grilla de proyectos, sección "Nosotros", aliados, CTA final.
- **Landing de campaña** (`/campanas/siembra-un-arbol`) — header mínimo (sin el menú de
  30+ enlaces), un solo botón de "Donar", coherente con lo que vería alguien que llega
  desde un anuncio de Google.
- **Flujo de donación** (`/donar`) — sin lenguaje de tienda ("agotado", "variante"), con
  monto/frecuencia, dedicatoria del árbol y datos del donante. El botón "Confirmar
  donación" es una simulación visual — no hay pasarela de pago real conectada.
- **Selector ES/EN** en todo el sitio, sin textos sueltos sin traducir.

## Qué NO incluye todavía

- Integración real de pago (PSE / tarjetas) — falta definir proveedor con el cliente.
- Panel de noticias y formulario de contacto conectado (mencionados en la propuesta).
- Landings para las otras 2 campañas (Amazonía con Propósito, Apadrina el Amazonas) —
  hoy enlazan al mismo flujo de donación con el nombre de campaña en la URL.
- Contenido definitivo del cliente (fotos, videos, cifras actualizadas, textos finales) —
  la propuesta pide este material antes de construir la versión real. Este prototipo usa
  textos e imágenes tomados del sitio actual de Saving The Amazon solo para fines de
  presentación interna.

## Stack

Next.js 16 + TypeScript + Tailwind CSS v4 + Framer Motion + lucide-react, siguiendo las
mismas convenciones que `pharma-dream-web` y `Tia-Anny`.
