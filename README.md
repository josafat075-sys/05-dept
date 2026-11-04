# 05 DEPT.

Tienda de ropa + videos + proyecto Devil's Chunks. Sitio estático hecho con Astro.

## Arrancar

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera la carpeta dist/
```

Necesitas Node.js 18.20 o superior (mejor la versión LTS actual).

## Dónde cambiar cada cosa

| Quiero cambiar…                         | Archivo                                    |
| --------------------------------------- | ------------------------------------------ |
| Nombre, redes, correo                   | `src/config.ts`                            |
| Colores (paleta)                        | `src/styles/global.css` (variables `:root`) |
| Frases de la cinta que corre            | `src/components/Navbar.astro`              |
| Textos de la portada                    | `src/pages/index.astro`                    |
| Sección Devil's Chunks                  | `src/pages/devils-chunks.astro`            |
| Logos (05 DEPT. y Devil's Chunks)       | `public/img/`                              |
| Colores de las tarjetas de video        | `PANELES` en `src/utils.ts`                |

## Agregar una prenda

Crea un archivo en `src/content/ropa/` (por ejemplo `abrigo-lana.md`):

```md
---
nombre: Abrigo de Lana
precio: 2990
categoria: chaquetas      # chaquetas | playeras | sudaderas | pantalones | accesorios
imagen: /img/abrigo-lana.jpg   # el archivo va en public/img/
tallas: ["S", "M", "L"]
destacado: true
linkCompra: https://buy.stripe.com/...   # tu enlace de pago
---

Descripción en Markdown.
```

## Agregar un video

Aquí solo subes un **fragmento** corto; el video completo se queda en su plataforma.
Crea un archivo en `src/content/videos/` (por ejemplo `mi-video.md`):

```md
---
titulo: Detrás de la colección 02
descripcion: Del boceto a la prenda.
fecha: 2026-11-10
plataforma: youtube          # youtube | tiktok | instagram
url: https://www.youtube.com/watch?v=XXXXXXXXXXX   # el video COMPLETO
duracion: "12:34"            # duración del video completo
fragmento: /videos/mi-video.mp4   # clip corto (opcional)
miniatura: /img/mi-video.jpg      # opcional; en YouTube se toma sola
---
```

- Al pasar el cursor sobre la tarjeta se reproduce el fragmento (sin sonido).
- Al hacer clic se abre el video completo en su plataforma, en otra pestaña.
- Con `borrador: true` no se publica.
- El color de fondo de cada tarjeta rota entre los colores de la marca. Para fijar uno, agrega `color: "#e4007c"` al video.

### Cómo preparar el fragmento y la miniatura

Con [ffmpeg](https://ffmpeg.org) (gratis). Un clip de 8 segundos desde el segundo 5, sin audio, ligero:

```bash
ffmpeg -i original.mp4 -ss 00:00:05 -t 8 -an -vf "scale=-2:720" -c:v libx264 -crf 28 -movflags +faststart public/videos/mi-video.mp4
```

La miniatura (un cuadro del video):

```bash
ffmpeg -i original.mp4 -ss 00:00:06 -frames:v 1 -vf "scale=1280:-2" public/img/mi-video.jpg
```

Usa nombres de archivo sin acentos ni espacios. Procura que cada fragmento pese menos de 3 MB.

## Agregar un producto de Devil's Chunks (galletas y brownies)

Crea un archivo en `src/content/chunks/` (por ejemplo `brownie-clasico.md`):

```md
---
nombre: Brownie Clásico
precio: 45
categoria: brownies          # brownies | galletas
presentacion: Pieza individual   # o "Caja de 6"
descripcion: Intenso, húmedo y con costra crujiente.
ingredientes: Harina de trigo, chocolate, mantequilla, huevo, azúcar. Contiene gluten, lácteos y huevo.
imagen: /img/brownie-clasico.jpg   # el archivo va en public/img/
orden: 1                     # menor número = aparece primero
agotado: false
---
```

- Incluye siempre los **alérgenos** en `ingredientes` (gluten, nueces, lácteos, huevo…).
- El botón **Pedir** abre WhatsApp con el mensaje ya escrito. Pon tu número en `src/config.ts` (campo `whatsapp`, solo dígitos con lada de país, por ejemplo `5215512345678`). Mientras diga `TU-NUMERO`, los botones salen como "Próximamente".
- Si prefieres un enlace de pago, agrega `linkPedido: https://...` al producto.

## Cobrar

Este proyecto no incluye carrito. Lo más simple: crear un **Payment Link** en Stripe o Mercado Pago por prenda y pegarlo en `linkCompra`.

## Publicar

Sube la carpeta a GitHub y conéctala a Netlify, Vercel o Cloudflare Pages (build: `npm run build`, salida: `dist`).
No olvides cambiar `site` en `astro.config.mjs`.

## Administrar la tienda sin tocar código

El panel de Decap CMS está preparado en `public/admin/`.

- En el sitio publicado se abrirá en `/admin/`.
- Gestiona prendas en **Productos / Ropa**.
- Gestiona clips y novedades en **Videos / Publicaciones**.
- Sube fotos y fragmentos desde el propio editor.
- Marca prendas como **Vendido / No disponible**.

Antes de que el inicio de sesión funcione hay que conectar el repositorio real de GitHub y configurar OAuth. Sigue la guía `ADMINISTRACION.md`; no publiques el panel con el repositorio de ejemplo `TU-USUARIO/05-dept`.

Para activar pedidos por WhatsApp, sustituye `TU-NUMERO` en `src/config.ts` por tu celular con código de país, solo dígitos.

## Administrar la tienda sin tocar código

El panel de Decap CMS está preparado en `public/admin/` y se abrirá en `/admin/` al publicar el sitio.

- **Productos / Ropa:** crear, editar, subir fotos, cambiar precios/tallas y marcar prendas como vendidas.
- **Videos / Publicaciones:** publicar novedades, enlaces, miniaturas y clips; también guardar borradores.

Antes de iniciar sesión, conecta el repo de GitHub con Decap Turbo y reemplaza `PENDIENTE-DECAP-TURBO` en `public/admin/config.yml` por el Site ID que te entregue. Sigue la guía `ADMINISTRACION.md`.

Para activar pedidos por WhatsApp, sustituye `TU-NUMERO` en `src/config.ts` por tu celular con código de país, solo dígitos.
