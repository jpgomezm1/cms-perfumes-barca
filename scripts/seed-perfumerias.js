'use strict';

/**
 * Seed de reconstrucción — 9 perfumerías (Ruta de Fragancias, Barcelona).
 *
 * Reconstruye el contenido perdido con la nube a partir de:
 *  - Actividades REALES: proyecto-perfumes/ACTIVIDADES_PERFUMERIAS.md
 *  - Coordenadas exactas documentadas: COORDENADAS_FALTANTES.md (Jo Malone, Rosendo Mateu)
 *  - Direcciones reales verificadas por búsqueda web (Le Labo, Diptyque, Penhaligon's, Rosendo Mateu, Jo Malone, Arquinesia)
 *
 * Campos marcados "(por confirmar)" = no verificados; el cliente los ajusta desde el panel.
 *
 * Ejecutar (con Strapi DETENIDO para no chocar con el lock de SQLite):
 *   node scripts/seed-perfumerias.js
 */

const { createStrapi, compileStrapi } = require('@strapi/strapi');

const ROUTE_SLUG = 'scents-gothic'; // se mantiene el slug para no romper enlaces del frontend

const STOPS = [
  {
    name: 'Arquinesia',
    order: 1,
    type: 'Perfumería de Autor',
    walkTime: 'Punto de inicio',
    timeAtStop: '15-20 minutos',
    address: 'Carrer de la Princesa, 7, 08003 Barcelona',
    latitude: '41.3854',
    longitude: '2.1808',
    description:
      'Perfumería de autor nacida del amor por el Mediterráneo y las Islas Baleares. Ofrece una experiencia nicho de lujo, con packaging exquisito y un diseño de tienda cinematográfico.',
    activities: [
      {
        id: 'arquinesia-mediterraneo-description',
        title: 'El Mediterráneo en Palabras',
        type: 'text',
        description:
          'Describe con tus propias palabras qué aroma imaginas que representa el Mediterráneo según Arquinesia',
        points: 100,
        estimatedTime: '5 min',
        prompt:
          'Describe con tus propias palabras qué aroma imaginas que representa el Mediterráneo según Arquinesia.',
      },
    ],
  },
  {
    name: 'The Perfumery Barcelona',
    order: 2,
    type: 'Perfumería Nicho',
    walkTime: '5 min a pie',
    timeAtStop: '15-20 minutos',
    address: 'Barri Gòtic, Barcelona (dirección por confirmar)',
    latitude: '41.3828',
    longitude: '2.1765',
    description:
      'En pleno Barrio Gótico, un espacio inmersivo dedicado al arte de la perfumería nicho e independiente, en un ambiente contemporáneo y acogedor.',
    activities: [
      {
        id: 'perfumery-barcelona-caracteristica',
        title: 'Conociendo The Perfumery',
        type: 'quiz',
        description: 'Demuestra que conoces qué hace especial a The Perfumery Barcelona',
        points: 100,
        estimatedTime: '3 min',
        question:
          '¿Qué caracteriza a The Perfumery Barcelona frente a otras perfumerías de la ciudad?',
        options: [
          'Solo vende perfumes franceses',
          'Se centra en fragancias nicho e independientes',
          'Es una marca de moda con perfumes',
          'Fabrica sus propios perfumes',
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    name: 'Byredo',
    order: 3,
    type: 'Perfumería Nicho',
    walkTime: '5 min a pie',
    timeAtStop: '15-20 minutos',
    address: 'Eixample, Barcelona (dirección por confirmar)',
    latitude: '41.3913',
    longitude: '2.1655',
    description:
      'Casa sueca de fragancias nicho reconocida por su estética minimalista y sus composiciones contemporáneas de lujo.',
    activities: [
      {
        id: 'byredo-minimalista-photo',
        title: 'Estilo Minimalista',
        type: 'image',
        description: 'Captura la esencia minimalista de Byredo en una fotografía creativa',
        points: 100,
        estimatedTime: '5 min',
        prompt:
          'Tómate una foto reflejando el estilo minimalista de Byredo — fondos blancos, líneas limpias y un toque artístico.',
      },
    ],
  },
  {
    name: "Penhaligon's",
    order: 4,
    type: 'Casa Histórica de Perfumes',
    walkTime: '3 min a pie',
    timeAtStop: '15-20 minutos',
    address: 'Carrer del Consell de Cent, 302, 08007 Barcelona',
    latitude: '41.3912',
    longitude: '2.1642',
    description:
      'Histórica casa británica de perfumería fundada en 1870, célebre por sus fragancias distinguidas y su herencia inglesa.',
    activities: [
      {
        id: 'penhaligons-origen',
        title: 'Orígenes Históricos',
        type: 'quiz',
        description: 'Conoce de dónde proviene esta histórica casa de perfumes',
        points: 50,
        estimatedTime: '2 min',
        question: "¿De qué país proviene la histórica casa Penhaligon's?",
        options: ['Francia', 'Inglaterra', 'Italia', 'España'],
        correctAnswer: 1,
      },
    ],
  },
  {
    name: 'Xerjoff',
    order: 5,
    type: 'Alta Perfumería',
    walkTime: '5 min a pie',
    timeAtStop: '15-20 minutos',
    address: 'Barcelona (tienda por confirmar)',
    latitude: null,
    longitude: null,
    description:
      'Maison italiana de alta perfumería, sinónimo de lujo, materiales preciosos y craftsmanship artesanal.',
    activities: [
      {
        id: 'xerjoff-lujo-italiano',
        title: 'Lujo Italiano',
        type: 'text',
        description: 'Explora tu imaginación sobre el lujo italiano en las fragancias Xerjoff',
        points: 150,
        estimatedTime: '8 min',
        prompt:
          'Describe cómo imaginas el lujo italiano en una fragancia Xerjoff. ¿Qué materiales, colores o sensaciones te evoca?',
      },
    ],
  },
  {
    name: 'Diptyque',
    order: 6,
    type: 'Perfumería Parisina',
    walkTime: '6 min a pie',
    timeAtStop: '15-20 minutos',
    address: 'Carrer de Provença, 292, 08008 Barcelona',
    latitude: '41.3956',
    longitude: '2.1626',
    description:
      'Icónica casa parisina fundada en 1961, famosa por sus velas perfumadas y fragancias de espíritu artístico y bohemio.',
    activities: [
      {
        id: 'diptyque-parisino-photo',
        title: 'Espíritu Parisino',
        type: 'image',
        description: 'Captura la elegancia parisina característica de Diptyque',
        points: 100,
        estimatedTime: '5 min',
        prompt:
          'Haz una foto que capture el espíritu parisino de Diptyque — elegante, artístico y con un toque bohemio.',
      },
    ],
  },
  {
    name: 'Le Labo',
    order: 7,
    type: 'Perfumería Nicho',
    walkTime: '4 min a pie',
    timeAtStop: '15-20 minutos',
    address: 'Carrer del Rosselló, 226, 08008 Barcelona',
    latitude: '41.3949',
    longitude: '2.1596',
    description:
      'Marca de culto neoyorquina de perfumería nicho; cada fragancia se mezcla a mano en el momento y el frasco se personaliza con tu nombre.',
    activities: [
      {
        id: 'lelabo-experiencia-unica',
        title: 'Experiencia Única',
        type: 'quiz',
        description: 'Descubre qué hace única la experiencia de compra en Le Labo',
        points: 100,
        estimatedTime: '3 min',
        question: '¿Qué hace única la experiencia de compra en Le Labo?',
        options: [
          'Las fragancias se mezclan en el momento',
          'Cada frasco se personaliza con tu nombre',
          'Ambas',
          'Ninguna',
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    name: 'Jo Malone',
    order: 8,
    type: 'Perfumería Británica',
    walkTime: '5 min a pie',
    timeAtStop: '15-20 minutos',
    address: 'Passeig de Gràcia, 96, 08008 Barcelona',
    latitude: '41.3916853',
    longitude: '2.1645437',
    description:
      "Casa británica conocida por sus fragancias elegantes y el arte del 'fragrance combining' para crear aromas personales únicos.",
    activities: [
      {
        id: 'jomalone-combinacion-personal',
        title: 'Tu Combinación Ideal',
        type: 'text',
        description:
          'Crea tu propia combinación de fragancias Jo Malone que refleje tu personalidad',
        points: 100,
        estimatedTime: '6 min',
        prompt:
          'Crea tu combinación ideal de dos fragancias Jo Malone. Explica por qué reflejan tu personalidad.',
      },
    ],
  },
  {
    name: 'Rosendo Mateu',
    order: 9,
    type: 'Perfumería de Autor',
    walkTime: '2 min a pie',
    timeAtStop: '20-25 minutos',
    address: 'Carrer del Consell de Cent, 308, 08007 Barcelona',
    latitude: '41.3919862',
    longitude: '2.1638931',
    description:
      'Olfactive Expressions del maestro perfumista Rosendo Mateu, ex-perfumista de Puig, con una colección de autor inspirada en Barcelona.',
    activities: [
      {
        id: 'rosendo-mateu-historia',
        title: 'Historia del Maestro',
        type: 'quiz',
        description: 'Conoce la historia detrás de Rosendo Mateu antes de su marca',
        points: 150,
        estimatedTime: '4 min',
        question: '¿Quién fue Rosendo Mateu antes de lanzar su propia marca?',
        options: [
          'Un diseñador de moda',
          'Un perfumista maestro de Puig',
          'Un artista visual',
          'Un químico autodidacta',
        ],
        correctAnswer: 1,
      },
    ],
  },
];

function gmapsUrl(address) {
  if (!address || address.includes('por confirmar')) return null;
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address);
}

async function main() {
  const appContext = await compileStrapi();
  const app = await createStrapi(appContext).load();
  app.log.level = 'error';

  const docs = (uid) => app.documents(uid);

  // 1) Categoría FRAGRANCE
  const cats = await docs('api::category.category').findMany({ filters: { name: 'FRAGRANCE' } });
  const category = cats[0];
  if (!category) throw new Error('No se encontró la categoría FRAGRANCE');

  // 2) Curadora Sofia Martinez
  const curs = await docs('api::curator.curator').findMany({ filters: { name: 'Sofia Martinez' } });
  const curator = curs[0] || null;

  // 3) Ruta existente (por slug)
  const routes = await docs('api::route.route').findMany({ filters: { slug: ROUTE_SLUG } });
  const route = routes[0];
  if (!route) throw new Error('No se encontró la ruta con slug ' + ROUTE_SLUG);

  console.log('Categoría:', category.name, '| Curadora:', curator && curator.name, '| Ruta:', route.name);

  // 4) Actualizar la ruta para reflejar la ruta de perfumerías
  const totalPoints = STOPS.reduce(
    (acc, s) => acc + s.activities.reduce((a, act) => a + (act.points || 0), 0),
    0
  );
  await docs('api::route.route').update({
    documentId: route.documentId,
    data: {
      name: 'Perfumerías de Autor de Barcelona', // (revisar nombre con el cliente)
      tagline: 'Un recorrido olfativo por las casas de perfume más exclusivas de Barcelona',
      description:
        'Una experiencia sensorial premium por las perfumerías de autor y casas de fragancias nicho más emblemáticas de Barcelona: del Barrio Gótico al Eixample, descubre nueve espacios donde el lujo, la historia y el arte olfativo se encuentran.',
      distance: '~2.5 km',
      duration: '2-3 h',
      totalStops: STOPS.length,
      totalPoints,
      experienceType: 'Premium Experience',
      category: category.documentId,
      ...(curator ? { curator: curator.documentId } : {}),
    },
  });
  await docs('api::route.route').publish({ documentId: route.documentId });

  // Asegurar displayMode de la categoría
  await docs('api::category.category').update({
    documentId: category.documentId,
    data: { displayMode: 'routes', ...(category.color ? {} : { color: '#D4AF37' }) },
  });
  await docs('api::category.category').publish({ documentId: category.documentId });

  // 5) Borrar stops existentes (demo)
  const existing = await docs('api::stop.stop').findMany({ pagination: { pageSize: 200 } });
  console.log('Borrando', existing.length, 'stops demo...');
  for (const s of existing) {
    await docs('api::stop.stop').delete({ documentId: s.documentId });
  }

  // 6) Crear las 9 perfumerías
  let created = 0;
  for (const s of STOPS) {
    const doc = await docs('api::stop.stop').create({
      data: {
        name: s.name,
        order: s.order,
        type: s.type,
        walkTime: s.walkTime,
        timeAtStop: s.timeAtStop,
        description: s.description,
        address: s.address,
        latitude: s.latitude,
        longitude: s.longitude,
        activities: s.activities,
        googleMapsUrl: gmapsUrl(s.address),
        route: route.documentId,
        category: category.documentId,
      },
    });
    await docs('api::stop.stop').publish({ documentId: doc.documentId });
    created++;
    console.log(`  [${s.order}] ${s.name}  (coords: ${s.latitude || '—'}, ${s.longitude || '—'})`);
  }

  console.log(`\n✔ Listo: ${created} perfumerías creadas y publicadas. Total puntos: ${totalPoints}`);

  await app.destroy();
  process.exit(0);
}

main().catch((err) => {
  console.error('ERROR en el seed:', err);
  process.exit(1);
});
