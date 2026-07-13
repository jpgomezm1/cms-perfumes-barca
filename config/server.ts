export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  // En producción (Railway/proxy inverso) fija PUBLIC_URL con la URL pública del CMS.
  url: env('PUBLIC_URL', undefined),
  // Necesario detrás de un proxy (Railway, Render, Nginx) para cookies/redirects del admin.
  // En Strapi 5 el formato es objeto { koa: boolean } (el booleano suelto NO activa app.proxy).
  proxy: { koa: env.bool('IS_PROXIED', false) },
  app: {
    keys: env.array('APP_KEYS'),
  },
});
