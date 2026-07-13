'use strict';

/**
 * Seed i18n — reconstruye el contenido en ES (por defecto) y EN.
 * Requiere que los content-types tengan i18n activado (ver schema.json).
 * Ejecutar con Strapi DETENIDO:  node scripts/seed-i18n.js
 *
 * Campos localizados: textos (name, description, activities, etc.).
 * Campos compartidos entre idiomas: imágenes, coordenadas, slug, relaciones, orden.
 */

const { createStrapi, compileStrapi } = require('@strapi/strapi');

const ROUTE_SLUG = 'scents-gothic';

// ---- Contenido ES/EN ----
const CATEGORY = {
  slug: 'fragancias',
  color: '#D4AF37',
  displayMode: 'routes',
  es: { name: 'FRAGANCIAS', description: 'Explora los aromas más selectos y las perfumerías nicho de Barcelona.' },
  en: { name: 'FRAGRANCE', description: 'Explore the finest scents and niche perfumeries of Barcelona.' },
};

const CURATOR = {
  name: 'Sofia Martinez',
  es: {
    title: 'Maestra Perfumista y Especialista en Patrimonio Cultural',
    bio: 'Con más de 15 años de experiencia en alta perfumería y un profundo conocimiento del patrimonio cultural de Barcelona, Sofia crea experiencias sensoriales excepcionales que unen la historia con el arte contemporáneo de la fragancia.',
  },
  en: {
    title: 'Master Perfumer & Cultural Heritage Specialist',
    bio: "With over 15 years of experience in haute parfumerie and deep knowledge of Barcelona's cultural heritage, Sofia creates exceptional sensory experiences bridging history with contemporary fragrance artistry.",
  },
};

const ROUTE = {
  slug: ROUTE_SLUG,
  distance: '~2.5 km',
  duration: '2-3 h',
  totalStops: 9,
  totalPoints: 950,
  es: {
    name: 'Perfumerías de Autor de Barcelona',
    tagline: 'Un recorrido olfativo por las casas de perfume más exclusivas de Barcelona',
    description: 'Una experiencia sensorial premium por las perfumerías de autor y casas de fragancias nicho más emblemáticas de Barcelona: del Barrio Gótico al Eixample, descubre nueve espacios donde el lujo, la historia y el arte olfativo se encuentran.',
    experienceType: 'Experiencia Premium',
  },
  en: {
    name: "Barcelona's Signature Perfumeries",
    tagline: "An olfactory journey through Barcelona's most exclusive perfume houses",
    description: "A premium sensory experience through Barcelona's most iconic signature and niche perfume houses: from the Gothic Quarter to the Eixample, discover nine spaces where luxury, history and the art of scent meet.",
    experienceType: 'Premium Experience',
  },
};

const STOPS = [
  {
    order: 1, latitude: '41.3854', longitude: '2.1808',
    address: 'Carrer de la Princesa, 7, 08003 Barcelona',
    es: { name: 'Arquinesia', type: 'Perfumería de Autor', walkTime: 'Punto de inicio', timeAtStop: '15-20 minutos',
      description: 'Perfumería de autor nacida del amor por el Mediterráneo y las Islas Baleares. Ofrece una experiencia nicho de lujo, con packaging exquisito y un diseño de tienda cinematográfico.',
      activities: [{ id: 'arquinesia-mediterraneo-description', title: 'El Mediterráneo en Palabras', type: 'text', description: 'Describe con tus propias palabras qué aroma imaginas que representa el Mediterráneo según Arquinesia', points: 100, estimatedTime: '5 min', prompt: 'Describe con tus propias palabras qué aroma imaginas que representa el Mediterráneo según Arquinesia.' }] },
    en: { name: 'Arquinesia', type: 'Signature Perfumery', walkTime: 'Starting point', timeAtStop: '15-20 minutes',
      description: 'Signature perfumery born from a love of the Mediterranean and the Balearic Islands. It offers a luxury niche experience, with exquisite packaging and a cinematic store design.',
      activities: [{ id: 'arquinesia-mediterraneo-description', title: 'The Mediterranean in Words', type: 'text', description: 'Describe in your own words the scent you imagine represents the Mediterranean according to Arquinesia', points: 100, estimatedTime: '5 min', prompt: 'Describe in your own words the aroma you imagine represents the Mediterranean according to Arquinesia.' }] },
  },
  {
    order: 2, latitude: '41.3828', longitude: '2.1765',
    address: 'Barri Gòtic, Barcelona (dirección por confirmar)',
    es: { name: 'The Perfumery Barcelona', type: 'Perfumería Nicho', walkTime: '5 min a pie', timeAtStop: '15-20 minutos',
      description: 'En pleno Barrio Gótico, un espacio inmersivo dedicado al arte de la perfumería nicho e independiente, en un ambiente contemporáneo y acogedor.',
      activities: [{ id: 'perfumery-barcelona-caracteristica', title: 'Conociendo The Perfumery', type: 'quiz', description: 'Demuestra que conoces qué hace especial a The Perfumery Barcelona', points: 100, estimatedTime: '3 min', question: '¿Qué caracteriza a The Perfumery Barcelona frente a otras perfumerías de la ciudad?', options: ['Solo vende perfumes franceses', 'Se centra en fragancias nicho e independientes', 'Es una marca de moda con perfumes', 'Fabrica sus propios perfumes'], correctAnswer: 1 }] },
    en: { name: 'The Perfumery Barcelona', type: 'Niche Perfumery', walkTime: '5 min walk', timeAtStop: '15-20 minutes',
      description: 'In the heart of the Gothic Quarter, an immersive space dedicated to the art of independent, niche perfumery in a contemporary, welcoming atmosphere.',
      activities: [{ id: 'perfumery-barcelona-caracteristica', title: 'Getting to Know The Perfumery', type: 'quiz', description: 'Show that you know what makes The Perfumery Barcelona special', points: 100, estimatedTime: '3 min', question: 'What sets The Perfumery Barcelona apart from other perfumeries in the city?', options: ['It only sells French perfumes', 'It focuses on niche and independent fragrances', "It's a fashion brand with perfumes", 'It makes its own perfumes'], correctAnswer: 1 }] },
  },
  {
    order: 3, latitude: '41.3913', longitude: '2.1655',
    address: 'Eixample, Barcelona (dirección por confirmar)',
    es: { name: 'Byredo', type: 'Perfumería Nicho', walkTime: '5 min a pie', timeAtStop: '15-20 minutos',
      description: 'Casa sueca de fragancias nicho reconocida por su estética minimalista y sus composiciones contemporáneas de lujo.',
      activities: [{ id: 'byredo-minimalista-photo', title: 'Estilo Minimalista', type: 'image', description: 'Captura la esencia minimalista de Byredo en una fotografía creativa', points: 100, estimatedTime: '5 min', prompt: 'Tómate una foto reflejando el estilo minimalista de Byredo — fondos blancos, líneas limpias y un toque artístico.' }] },
    en: { name: 'Byredo', type: 'Niche Perfumery', walkTime: '5 min walk', timeAtStop: '15-20 minutes',
      description: 'Swedish niche fragrance house known for its minimalist aesthetic and contemporary luxury compositions.',
      activities: [{ id: 'byredo-minimalista-photo', title: 'Minimalist Style', type: 'image', description: "Capture Byredo's minimalist essence in a creative photograph", points: 100, estimatedTime: '5 min', prompt: "Take a photo reflecting Byredo's minimalist style — white backgrounds, clean lines and an artistic touch." }] },
  },
  {
    order: 4, latitude: '41.3912', longitude: '2.1642',
    address: 'Carrer del Consell de Cent, 302, 08007 Barcelona',
    es: { name: "Penhaligon's", type: 'Casa Histórica de Perfumes', walkTime: '3 min a pie', timeAtStop: '15-20 minutos',
      description: 'Histórica casa británica de perfumería fundada en 1870, célebre por sus fragancias distinguidas y su herencia inglesa.',
      activities: [{ id: 'penhaligons-origen', title: 'Orígenes Históricos', type: 'quiz', description: 'Conoce de dónde proviene esta histórica casa de perfumes', points: 50, estimatedTime: '2 min', question: "¿De qué país proviene la histórica casa Penhaligon's?", options: ['Francia', 'Inglaterra', 'Italia', 'España'], correctAnswer: 1 }] },
    en: { name: "Penhaligon's", type: 'Historic Perfume House', walkTime: '3 min walk', timeAtStop: '15-20 minutes',
      description: 'Historic British perfume house founded in 1870, celebrated for its distinguished fragrances and English heritage.',
      activities: [{ id: 'penhaligons-origen', title: 'Historic Origins', type: 'quiz', description: 'Learn where this historic perfume house comes from', points: 50, estimatedTime: '2 min', question: "Which country does the historic house Penhaligon's come from?", options: ['France', 'England', 'Italy', 'Spain'], correctAnswer: 1 }] },
  },
  {
    order: 5, latitude: null, longitude: null,
    address: 'Barcelona (tienda por confirmar)',
    es: { name: 'Xerjoff', type: 'Alta Perfumería', walkTime: '5 min a pie', timeAtStop: '15-20 minutos',
      description: 'Maison italiana de alta perfumería, sinónimo de lujo, materiales preciosos y craftsmanship artesanal.',
      activities: [{ id: 'xerjoff-lujo-italiano', title: 'Lujo Italiano', type: 'text', description: 'Explora tu imaginación sobre el lujo italiano en las fragancias Xerjoff', points: 150, estimatedTime: '8 min', prompt: 'Describe cómo imaginas el lujo italiano en una fragancia Xerjoff. ¿Qué materiales, colores o sensaciones te evoca?' }] },
    en: { name: 'Xerjoff', type: 'Haute Perfumery', walkTime: '5 min walk', timeAtStop: '15-20 minutes',
      description: 'Italian haute perfumery maison, synonymous with luxury, precious materials and artisan craftsmanship.',
      activities: [{ id: 'xerjoff-lujo-italiano', title: 'Italian Luxury', type: 'text', description: 'Explore your imagination about Italian luxury in Xerjoff fragrances', points: 150, estimatedTime: '8 min', prompt: 'Describe how you imagine Italian luxury in a Xerjoff fragrance. What materials, colors or sensations does it evoke?' }] },
  },
  {
    order: 6, latitude: '41.3956', longitude: '2.1626',
    address: 'Carrer de Provença, 292, 08008 Barcelona',
    es: { name: 'Diptyque', type: 'Perfumería Parisina', walkTime: '6 min a pie', timeAtStop: '15-20 minutos',
      description: 'Icónica casa parisina fundada en 1961, famosa por sus velas perfumadas y fragancias de espíritu artístico y bohemio.',
      activities: [{ id: 'diptyque-parisino-photo', title: 'Espíritu Parisino', type: 'image', description: 'Captura la elegancia parisina característica de Diptyque', points: 100, estimatedTime: '5 min', prompt: 'Haz una foto que capture el espíritu parisino de Diptyque — elegante, artístico y con un toque bohemio.' }] },
    en: { name: 'Diptyque', type: 'Parisian Perfumery', walkTime: '6 min walk', timeAtStop: '15-20 minutes',
      description: 'Iconic Parisian house founded in 1961, famous for its scented candles and fragrances with an artistic, bohemian spirit.',
      activities: [{ id: 'diptyque-parisino-photo', title: 'Parisian Spirit', type: 'image', description: 'Capture the Parisian elegance characteristic of Diptyque', points: 100, estimatedTime: '5 min', prompt: "Take a photo that captures Diptyque's Parisian spirit — elegant, artistic and with a bohemian touch." }] },
  },
  {
    order: 7, latitude: '41.3949', longitude: '2.1596',
    address: 'Carrer del Rosselló, 226, 08008 Barcelona',
    es: { name: 'Le Labo', type: 'Perfumería Nicho', walkTime: '4 min a pie', timeAtStop: '15-20 minutos',
      description: 'Marca de culto neoyorquina de perfumería nicho; cada fragancia se mezcla a mano en el momento y el frasco se personaliza con tu nombre.',
      activities: [{ id: 'lelabo-experiencia-unica', title: 'Experiencia Única', type: 'quiz', description: 'Descubre qué hace única la experiencia de compra en Le Labo', points: 100, estimatedTime: '3 min', question: '¿Qué hace única la experiencia de compra en Le Labo?', options: ['Las fragancias se mezclan en el momento', 'Cada frasco se personaliza con tu nombre', 'Ambas', 'Ninguna'], correctAnswer: 2 }] },
    en: { name: 'Le Labo', type: 'Niche Perfumery', walkTime: '4 min walk', timeAtStop: '15-20 minutes',
      description: 'New York cult niche perfumery brand; each fragrance is hand-blended on the spot and the bottle is personalized with your name.',
      activities: [{ id: 'lelabo-experiencia-unica', title: 'A Unique Experience', type: 'quiz', description: 'Discover what makes the Le Labo shopping experience unique', points: 100, estimatedTime: '3 min', question: 'What makes the shopping experience at Le Labo unique?', options: ['Fragrances are blended on the spot', 'Each bottle is personalized with your name', 'Both', 'Neither'], correctAnswer: 2 }] },
  },
  {
    order: 8, latitude: '41.3916853', longitude: '2.1645437',
    address: 'Passeig de Gràcia, 96, 08008 Barcelona',
    es: { name: 'Jo Malone', type: 'Perfumería Británica', walkTime: '5 min a pie', timeAtStop: '15-20 minutos',
      description: "Casa británica conocida por sus fragancias elegantes y el arte del 'fragrance combining' para crear aromas personales únicos.",
      activities: [{ id: 'jomalone-combinacion-personal', title: 'Tu Combinación Ideal', type: 'text', description: 'Crea tu propia combinación de fragancias Jo Malone que refleje tu personalidad', points: 100, estimatedTime: '6 min', prompt: 'Crea tu combinación ideal de dos fragancias Jo Malone. Explica por qué reflejan tu personalidad.' }] },
    en: { name: 'Jo Malone', type: 'British Perfumery', walkTime: '5 min walk', timeAtStop: '15-20 minutes',
      description: "British house known for its elegant fragrances and the art of 'fragrance combining' to create unique personal scents.",
      activities: [{ id: 'jomalone-combinacion-personal', title: 'Your Ideal Combination', type: 'text', description: 'Create your own combination of Jo Malone fragrances that reflects your personality', points: 100, estimatedTime: '6 min', prompt: 'Create your ideal combination of two Jo Malone fragrances. Explain why they reflect your personality.' }] },
  },
  {
    order: 9, latitude: '41.3919862', longitude: '2.1638931',
    address: 'Carrer del Consell de Cent, 308, 08007 Barcelona',
    es: { name: 'Rosendo Mateu', type: 'Perfumería de Autor', walkTime: '2 min a pie', timeAtStop: '20-25 minutos',
      description: 'Olfactive Expressions del maestro perfumista Rosendo Mateu, ex-perfumista de Puig, con una colección de autor inspirada en Barcelona.',
      activities: [{ id: 'rosendo-mateu-historia', title: 'Historia del Maestro', type: 'quiz', description: 'Conoce la historia detrás de Rosendo Mateu antes de su marca', points: 150, estimatedTime: '4 min', question: '¿Quién fue Rosendo Mateu antes de lanzar su propia marca?', options: ['Un diseñador de moda', 'Un perfumista maestro de Puig', 'Un artista visual', 'Un químico autodidacta'], correctAnswer: 1 }] },
    en: { name: 'Rosendo Mateu', type: 'Signature Perfumery', walkTime: '2 min walk', timeAtStop: '20-25 minutes',
      description: 'Olfactive Expressions by master perfumer Rosendo Mateu, former Puig perfumer, with a signature collection inspired by Barcelona.',
      activities: [{ id: 'rosendo-mateu-historia', title: "The Master's Story", type: 'quiz', description: 'Learn the story behind Rosendo Mateu before his brand', points: 150, estimatedTime: '4 min', question: 'Who was Rosendo Mateu before launching his own brand?', options: ['A fashion designer', 'A master perfumer at Puig', 'A visual artist', 'A self-taught chemist'], correctAnswer: 1 }] },
  },
];

function gmaps(address) {
  if (!address || address.includes('por confirmar')) return null;
  return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address);
}

async function main() {
  const app = await createStrapi(await compileStrapi()).load();
  app.log.level = 'error';
  const docs = (uid) => app.documents(uid);

  // 1) Locales
  const localesSvc = app.plugin('i18n').service('locales');
  const existing = await localesSvc.find();
  const have = new Set(existing.map((l) => l.code));
  if (!have.has('es')) await localesSvc.create({ code: 'es', name: 'Español (es)' });
  if (!have.has('en')) await localesSvc.create({ code: 'en', name: 'English (en)' });
  try { await localesSvc.setDefaultLocale({ code: 'es' }); } catch (e) { try { await localesSvc.setDefaultLocale('es'); } catch (e2) { console.log('no se pudo fijar default es:', e2.message); } }
  console.log('Locales listos:', (await localesSvc.find()).map((l) => l.code + (l.isDefault ? '*' : '')).join(', '));

  // 2) Imagen compartida para media requeridos (reutiliza una ya subida)
  const files = await app.db.query('plugin::upload.file').findMany({ limit: 100 });
  const pick = (re) => (files.find((f) => re.test(f.name)) || files[0]);
  const routeHero = pick(/route.*detail|hero|gothic|route1/i)?.id;
  const routeCard = pick(/route2|card|route/i)?.id;
  const catHero = pick(/fragance_page|fragance|page/i)?.id;
  const catCard = pick(/fragance_image|fragance|image/i)?.id;
  console.log('Media ids -> routeHero:', routeHero, 'catHero:', catHero, 'catCard:', catCard);

  // 3) Borrar contenido existente (a nivel de BD: todas las locales, borradores y publicados)
  for (const uid of ['api::stop.stop', 'api::route.route', 'api::category.category', 'api::curator.curator']) {
    await app.db.query(uid).deleteMany({ where: {} });
  }
  console.log('Contenido anterior borrado.');

  // Helper: crear en ES + localización EN + publicar ambas.
  // Los campos compartidos (shared) se pasan a ambas locales para satisfacer validación.
  async function createBilingual(uid, shared, esData, enData) {
    const created = await docs(uid).create({ data: { ...shared, ...esData }, locale: 'es' });
    await docs(uid).update({ documentId: created.documentId, locale: 'en', data: { ...shared, ...enData } });
    await docs(uid).publish({ documentId: created.documentId, locale: 'es' });
    await docs(uid).publish({ documentId: created.documentId, locale: 'en' });
    return created;
  }

  // 4) Categoría
  const category = await createBilingual('api::category.category',
    { slug: CATEGORY.slug, color: CATEGORY.color, displayMode: CATEGORY.displayMode, heroImage: catHero, cardImage: catCard },
    CATEGORY.es, CATEGORY.en);
  console.log('Categoría creada (es+en).');

  // 5) Curadora
  const curator = await createBilingual('api::curator.curator',
    { name: CURATOR.name }, CURATOR.es, CURATOR.en);
  console.log('Curadora creada (es+en).');

  // 6) Ruta
  const route = await createBilingual('api::route.route',
    { slug: ROUTE.slug, distance: ROUTE.distance, duration: ROUTE.duration, totalStops: ROUTE.totalStops,
      totalPoints: ROUTE.totalPoints, rating: 5, heroImage: routeHero, cardImage: routeCard,
      category: category.documentId, curator: curator.documentId },
    ROUTE.es, ROUTE.en);
  console.log('Ruta creada (es+en).');

  // 7) Stops
  let n = 0;
  for (const s of STOPS) {
    await createBilingual('api::stop.stop',
      { order: s.order, latitude: s.latitude, longitude: s.longitude, googleMapsUrl: gmaps(s.address),
        route: route.documentId, category: category.documentId },
      { ...s.es, address: s.address },
      { ...s.en, address: s.address });
    n++;
    console.log(`  [${s.order}] ${s.es.name} (es+en)`);
  }

  console.log(`\n✔ Listo: categoría + curadora + ruta + ${n} paradas, en ES y EN.`);
  await app.destroy();
  process.exit(0);
}

main().catch((e) => {
  console.error('ERROR seed-i18n:', e.message);
  if (e.details && e.details.errors) console.error('DETALLE:', JSON.stringify(e.details.errors, null, 2));
  process.exit(1);
});
