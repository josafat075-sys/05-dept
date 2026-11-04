import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Cada archivo .md de src/content/ropa es UNA prenda.
const ropa = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/ropa' }),
  schema: z.object({
    nombre: z.string(),
    precio: z.number(),
    categoria: z.enum(['chaquetas', 'playeras', 'sudaderas', 'pantalones', 'accesorios']),
    imagen: z.string().optional(), // fotografía principal
    galeria: z.array(z.string()).default([]), // fotografías adicionales de la prenda
    color: z.string().default('#eaa7c7'), // color de fondo mientras no tengas foto
    tallas: z.array(z.string()).default([]),
    destacado: z.boolean().default(false),
    agotado: z.boolean().default(false),
    linkCompra: z.string().url().optional(), // Payment Link de Stripe / Mercado Pago
  }),
});

// Cada archivo .md de src/content/videos es UN video.
// Aquí solo subes un FRAGMENTO corto; el video completo vive en YouTube / TikTok / Instagram.
const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    titulo: z.string(),
    descripcion: z.string().default(''),
    fecha: z.coerce.date(),
    plataforma: z.enum(['youtube', 'tiktok', 'instagram']),
    url: z.string().url(), // enlace al video COMPLETO en su plataforma
    fragmento: z.string().optional(), // clip corto, ej: /videos/coleccion-01.mp4 (archivo en /public/videos)
    miniatura: z.string().optional(), // ej: /img/coleccion-01.jpg (en YouTube se toma sola si la omites)
    duracion: z.string().optional(), // duración del video completo, ej: "12:34"
    color: z.string().optional(), // color de fondo de la tarjeta (si lo omites, rota entre los colores de la marca)
    borrador: z.boolean().default(false), // true = no se publica
  }),
});

// Cada archivo .md de src/content/chunks es UN producto de Devil's Chunks (galletas y brownies).
const chunks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/chunks' }),
  schema: z.object({
    nombre: z.string(),
    precio: z.number(),
    categoria: z.enum(['brownies', 'galletas']),
    presentacion: z.string().optional(), // ej: "Pieza individual", "Caja de 6"
    descripcion: z.string().default(''),
    ingredientes: z.string().optional(), // recomendado: incluye alérgenos (gluten, nueces, lácteos, huevo…)
    imagen: z.string().optional(), // ej: /img/brownie-clasico.jpg (en public/img)
    color: z.string().default('#eaa7c7'), // color de fondo mientras no tengas foto
    agotado: z.boolean().default(false),
    orden: z.number().default(0), // para acomodarlos: menor número = primero
    linkPedido: z.string().url().optional(), // si lo omites, el botón abre WhatsApp
  }),
});

export const collections = { ropa, videos, chunks };
