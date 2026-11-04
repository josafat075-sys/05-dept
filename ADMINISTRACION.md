# Administrar 05 DEPT. sin editar código

El panel visual está preparado en `/admin/`. Desde ahí podrás administrar productos y videos/publicaciones desde computadora o celular.

## Qué puedes hacer

### Productos / Ropa
- Crear, editar y eliminar prendas.
- Subir fotografía principal y una galería de fotos adicionales desde tu dispositivo.
- Cambiar nombre, precio, categoría, color y tallas.
- Marcar una prenda como favorita para la portada.
- Marcarla como **Vendido / No disponible**. La tienda muestra la etiqueta “Vendido” y desactiva el pedido.
- Escribir la descripción.

### Videos / Publicaciones
- Crear y editar publicaciones de YouTube, TikTok o Instagram.
- Añadir enlace, descripción, fecha, miniatura y fragmento de video.
- Guardar una publicación como borrador para que no aparezca en la web.

Las imágenes y clips que subas se guardan en `public/uploads/` y se sirven desde `/uploads/`.

## Activar el acceso privado al panel

El editor y sus formularios ya están preparados. Falta conectar el repositorio real y activar la autenticación; por eso el acceso no quedará operativo hasta completar estos pasos. No compartas contraseñas ni tokens por chat.

Para simplificar la autenticación de Decap con GitHub, este proyecto está configurado para **Decap Turbo** (`turbo-github`). La documentación oficial indica que el plan Free permite un sitio y un usuario, suficiente para comenzar administrándolo tú solo.

1. Sube el proyecto a un repositorio de GitHub. Puedes llamarlo `05-dept` y usar la rama `main`.
2. Crea tu cuenta en https://turbo.decapcms.org/.
3. En Decap Turbo crea una organización y conecta GitHub instalando la aplicación de Decap Turbo en la cuenta que contiene tu repositorio.
4. Crea un sitio en Decap Turbo con estos datos:
   - Proveedor: GitHub.
   - Repositorio: el repositorio donde subiste 05 DEPT.
   - Rama: `main`.
   - Config path: `public/admin/config.yml`.
   - Admin URL: la dirección publicada de tu sitio terminada en `/admin/` (por ejemplo `https://tu-sitio.netlify.app/admin/`).
5. Decap Turbo te mostrará un **Site ID** (UUID). Copia ese valor.
6. Abre `public/admin/config.yml` y reemplaza `PENDIENTE-DECAP-TURBO` por el Site ID real. Guarda y sube ese cambio a GitHub.
7. Despliega el proyecto en Netlify con:
   - Build command: `npm run build`
   - Publish directory: `dist`
8. Abre `https://TU-DOMINIO/admin/` e inicia sesión con tu cuenta de Decap Turbo. Solo las personas a las que des acceso al sitio podrán editarlo.

Enlaces oficiales:
- [Decap Turbo: primeros pasos](https://decapcms.org/docs/turbo-getting-started/)
- [Conectar un sitio y configurar `turbo_site_id`](https://decapcms.org/docs/turbo-connecting-a-site/)
- [Astro + Decap CMS](https://docs.astro.build/en/guides/cms/decap-cms/)

## Activar pedidos por WhatsApp

Abre `src/config.ts` y reemplaza `TU-NUMERO` por tu número real con código de país, solo dígitos y sin `+`, espacios ni guiones. Para México usa `52` seguido de los 10 dígitos del celular. Ejemplo ficticio: `528441234567`.

Cuando publiques ese cambio, las fichas de producto disponibles mostrarán **Consultar por WhatsApp** con el nombre de la prenda escrito en el mensaje. Las prendas marcadas como vendidas no ofrecerán pedido.

## Cómo será el flujo diario

1. Entras a `tudominio.com/admin/`.
2. Abres **Productos / Ropa** o **Videos / Publicaciones**.
3. Pulsas **New** / **Nuevo**, subes fotos y completas los datos.
4. Guardas y publicas.
5. Netlify detecta el cambio en GitHub, reconstruye el sitio y actualiza la tienda.

La primera conexión de GitHub, Decap Turbo y Netlify sí requiere configuración. Después, la gestión habitual se hace desde el panel visual; no necesitas editar archivos de código para añadir prendas o publicaciones.
