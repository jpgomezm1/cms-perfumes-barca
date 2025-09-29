# 🎯 Strapi CMS - Mané Barcelona

## 📋 Guía de Inicio Rápido

### 1. Iniciar Strapi por primera vez

```bash
cd perfumes-cms
npm run develop
```

Este comando:
- Iniciará Strapi en modo desarrollo
- Abrirá automáticamente el navegador en `http://localhost:1337/admin`
- Te pedirá crear un usuario administrador (primera vez)

### 2. Crear el Usuario Administrador

En la primera ejecución, deberás crear una cuenta de administrador:
- **Nombre**: Tu nombre
- **Email**: email@example.com
- **Contraseña**: Mínimo 8 caracteres

### 3. Configurar Permisos Públicos

Una vez dentro del panel de administración:

1. Ve a **Settings** (⚙️) → **Users & Permissions Plugin** → **Roles** → **Public**
2. Activa los siguientes permisos:

   **Category:**
   - ✅ find
   - ✅ findOne

   **Route:**
   - ✅ find
   - ✅ findOne

   **Stop:**
   - ✅ find
   - ✅ findOne

   **Curator:**
   - ✅ find
   - ✅ findOne

3. Haz clic en **Save**

### 4. Estructura de Contenido

#### 📁 **Categories** (Categorías)
Crea las 4 categorías principales:

1. **Fragrance**
   - Name: FRAGRANCE
   - Slug: fragancias
   - Description: Explore the finest scents...
   - Hero Image: Subir imagen principal
   - Card Image: Subir imagen de tarjeta
   - Color: #E8B4B8 (opcional)

2. **Culture**
   - Name: CULTURE
   - Slug: cultura
   - Description: Immerse yourself in living art...

3. **Gastronomy**
   - Name: GASTRONOMY
   - Slug: gastronomia
   - Description: Savor authentic local flavors...

4. **Fashion**
   - Name: FASHION
   - Slug: fashion
   - Description: See how global icons...

#### 👤 **Curators** (Curadores)
Crea los perfiles de los expertos que curan las rutas:

- Name: Sofia Martinez
- Title: Master Perfumer & Cultural Heritage Specialist
- Bio: With over 15 years of experience...
- Image: Subir foto del curador

#### 🗺️ **Routes** (Rutas)
Para cada ruta:

1. Completa la información básica:
   - Name: Scents of the Gothic Quarter
   - Slug: scents-gothic
   - Tagline: A professional olfactory journey...
   - Description: (texto completo)

2. Imágenes:
   - Hero Image: Imagen grande para detalle
   - Card Image: Imagen para tarjeta

3. Detalles de la ruta:
   - Distance: 1.8 km
   - Duration: 75 min
   - Total Stops: 6
   - Experience Type: Premium Experience
   - Rating: 5

4. Información práctica:
   - Best Time: Morning hours (10-12 AM)...
   - Weather: Suitable for all weather...
   - Difficulty: Easy walking...
   - Accessibility: Most locations are wheelchair accessible...
   - To Bring: Professional notebook, camera...
   - Budget: €50-150

5. Relaciones:
   - Category: Selecciona la categoría
   - Curator: Selecciona el curador

#### 📍 **Stops** (Paradas)
Para cada parada dentro de una ruta:

1. Información básica:
   - Name: Les Topettes Boutique
   - Order: 1 (número de orden en la ruta)
   - Type: Artisan Perfumery
   - Walk Time: Starting Point
   - Time At Stop: 15-20 minutes

2. Contenido:
   - Description: (texto descriptivo completo)
   - Address: Carrer de la Diputació 145...
   - Activities: ["Activity 1", "Activity 2"] (formato JSON)

3. Imagen:
   - Image: Subir foto de la parada

4. Ubicación (opcional):
   - Latitude: 41.3851
   - Longitude: 2.1734

5. Relación:
   - Route: Seleccionar la ruta a la que pertenece

### 5. URLs de la API

Una vez configurado, tu API estará disponible en:

- **Categorías**: `http://localhost:1337/api/categories?populate=*`
- **Rutas**: `http://localhost:1337/api/routes?populate=*`
- **Paradas**: `http://localhost:1337/api/stops?populate=*`
- **Curadores**: `http://localhost:1337/api/curators?populate=*`

### 6. Subir Imágenes

1. Ve al Content Manager
2. Selecciona el tipo de contenido (Category, Route, Stop, Curator)
3. Haz clic en el campo de imagen
4. Arrastra y suelta la imagen o haz clic para buscar
5. La imagen se subirá automáticamente a `/public/uploads`

### 7. Publicar Contenido

⚠️ **Importante**: Todo el contenido debe estar **Published** para que aparezca en la API.

Después de crear/editar contenido:
1. Haz clic en **Save**
2. Haz clic en **Publish**

### 8. Comandos Útiles

```bash
# Modo desarrollo (con auto-reload)
npm run develop

# Modo producción
npm run build
npm run start

# Limpiar caché
npm run strapi clear-cache
```

### 9. Respaldo de Datos

Para exportar tu contenido:
```bash
npm run strapi export
```

Para importar contenido:
```bash
npm run strapi import
```

## 🔗 Endpoints del Frontend

El frontend React consumirá estos datos desde:
- Base URL: `http://localhost:1337/api`
- Todas las imágenes: `http://localhost:1337` + `image.url`

## 📝 Notas Importantes

1. **Orden de Creación**: Crea primero Categories y Curators, luego Routes, y finalmente Stops
2. **Relaciones**: Las relaciones se establecen seleccionando de listas desplegables
3. **JSON Fields**: Los campos como `activities` y `tags` deben usar formato JSON válido: `["item1", "item2"]`
4. **Imágenes**: Soporta JPG, PNG, WebP (máximo 10MB por defecto)
5. **Populate**: Siempre usar `?populate=*` en las consultas para obtener relaciones e imágenes

## 🆘 Soporte

Si tienes problemas:
1. Revisa que Strapi esté corriendo en `http://localhost:1337`
2. Verifica los permisos públicos en Settings → Roles → Public
3. Revisa la consola de Strapi para errores
4. Asegúrate de que el contenido esté **Published**