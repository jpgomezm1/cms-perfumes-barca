# Dockerfile para el CMS Strapi en Railway.
# Corre como root para poder escribir en el volumen persistente montado en
# /app/public/uploads (los volúmenes de Railway se montan como root).
FROM node:22-bookworm-slim

# Dependencias de runtime (openssl para Strapi; sharp trae su propio libvips)
RUN apt-get update \
 && apt-get install -y --no-install-recommends openssl \
 && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Instalar dependencias (incluye devDeps: se necesitan para `strapi build`)
COPY package.json package-lock.json ./
RUN npm ci

# Copiar el resto del proyecto y construir el panel admin
COPY . .
ENV NODE_ENV=production
RUN npm run build

EXPOSE 1337
CMD ["npm", "run", "start"]
