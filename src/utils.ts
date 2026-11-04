// Nombres bonitos para mostrar en pantalla
const ETIQUETAS: Record<string, string> = {
  chaquetas: 'Chaquetas',
  playeras: 'Playeras',
  sudaderas: 'Sudaderas',
  pantalones: 'Pantalones',
  accesorios: 'Accesorios',
  brownies: 'Brownies',
  galletas: 'Galletas',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  instagram: 'Instagram',
};

export const etiqueta = (slug: string) => ETIQUETAS[slug] ?? slug;

export const precio = (n: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(n);

export const fechaLarga = (d: Date) =>
  new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long', year: 'numeric' }).format(d);

export const fechaCorta = (d: Date) =>
  new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short', year: '2-digit' }).format(d).replace(/\./g, '');

// Colores de fondo que van rotando en las tarjetas de video (paleta de la marca)
export const PANELES = ['#eac119', '#e4007c', '#eaa7c7', '#c63f3e', '#eae4da', '#7a0f23'];

// Elige texto negro o blanco según el fondo, para que siempre se lea
export function textoSobre(hex: string): string {
  const n = parseInt(hex.replace('#', '').padEnd(6, '0').slice(0, 6), 16);
  const lin = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * lin((n >> 16) & 255) + 0.7152 * lin((n >> 8) & 255) + 0.0722 * lin(n & 255);
  const contrasteNegro = (L + 0.05) / (0.012 + 0.05);
  const contrasteBlanco = 1.05 / (L + 0.05);
  return contrasteNegro >= contrasteBlanco ? '#1d1d1b' : '#eae4da';
}

// Minúsculas y sin acentos, para que "sudadera" encuentre "Sudadéra"
export const normalizar = (t: string) =>
  t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

// Enlace de WhatsApp con mensaje listo. Devuelve undefined si el número no es válido todavía.
// El número va solo con dígitos y lada de país, ej: 5215512345678 (México: 521 + 10 dígitos).
export function waLink(numero: string, mensaje: string): string | undefined {
  const limpio = numero.replace(/[\s+()-]/g, '');
  if (!/^\d{10,15}$/.test(limpio)) return undefined;
  return `https://wa.me/${limpio}?text=${encodeURIComponent(mensaje)}`;
}

// Miniatura automática de YouTube a partir del enlace del video.
// Devuelve undefined si el enlace no apunta a un video concreto.
export function miniaturaYoutube(url: string): string | undefined {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/))([\w-]{11})/);
  return m ? `https://img.youtube.com/vi/${m[1]}/hqdefault.jpg` : undefined;
}
