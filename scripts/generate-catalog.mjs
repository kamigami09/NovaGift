/**
 * Catalog generator — builds data/categories.ts + data/products.ts and copies
 * images into public/products/<cat>/<product>/ from "Website_real images/Website".
 *
 * Re-run any time you add/rename images:  npm run catalog
 * Originals are never modified (images are COPIED, not moved).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

// Image optimization settings
const IMG_MAX_WIDTH = 1100;   // px — plenty for cards + product gallery
const IMG_QUALITY = 78;       // webp quality

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const SRC = path.join(root, "Website_real images", "Website");
const OUT_IMG = path.join(root, "public", "products");

const CITIES = ["casablanca", "rabat", "tanger", "marrakech", "tetouan", "agadir", "kenitra", "fes", "fès", "maroc"];
const CITY_LABEL = {
  casablanca: "Casablanca", rabat: "Rabat", tanger: "Tanger", marrakech: "Marrakech",
  tetouan: "Tétouan", agadir: "Agadir", kenitra: "Kénitra", fes: "Fès", "fès": "Fès", maroc: "Maroc",
};

// ---------- helpers ----------
const stripAccents = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
function slugify(s) {
  return stripAccents(s)
    .toLowerCase()
    .replace(/['’"]/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}
function parsePrice(s) {
  // "2 500 Dh", "1 200 Dh", "120 Dh", trailing "-150", "-80"
  const dh = s.match(/(\d[\d\s]*)\s*dh/i);
  if (dh) return parseInt(dh[1].replace(/\s/g, ""), 10);
  const trail = s.match(/-(\d{2,4})(?:\.[a-z]+)?$/i);
  if (trail) return parseInt(trail[1], 10);
  return null;
}
function detectCity(name) {
  const n = stripAccents(name).toLowerCase();
  for (const c of CITIES) {
    const cc = stripAccents(c);
    if (new RegExp(`(^|[^a-z])${cc}([^a-z]|$)`).test(n)) return c === "fès" ? "fes" : c;
  }
  return null;
}
const titleCase = (s) => s.replace(/\b\w/g, (m) => m.toUpperCase());

// product-type detection: first matching rule wins. Source = folder name (subfolder)
// or file base name (loose image), accent-stripped + lowercased.
// [ regex, SEO type name, default starting price (MAD) ]
const TYPE_RULES = [
  // bureau
  [/porte.?document|conferencier/, "Porte-document conférencier en similicuir A4", 120],
  [/organisateur/, "Organisateur de bureau", 80],
  [/pot.?a.?stylo.*horloge|horloge/, "Pot à stylo avec horloge de bureau", 90],
  [/pot.?a.?stylo/, "Pot à stylo de bureau", 60],
  [/porte.?carte.?visite|porte.?carte/, "Porte-cartes de visite", 25],
  [/tapis.?souris.*chargeur|chargeur.*tapis/, "Tapis de souris avec chargeur sans fil", 110],
  [/tapis.?souris/, "Tapis de souris", 35],
  [/support.?telephone/, "Support téléphone de bureau", 30],
  [/lampe/, "Lampe de bureau avec chargeur sans fil", 220],
  [/notebook.?arabesque|arabesque/, "Notebook arabesque", 50],
  [/notebook.?bambou|carnet.*bambou/, "Notebook écologique en bambou", 50],
  [/notebook.?liege|liege/, "Notebook écologique en liège", 35],
  [/notebook.?elastique|elastique/, "Notebook à élastique", 35],
  [/notebook.?tissu/, "Notebook en tissu", 45],
  [/bloc.?note.?ecologique|carnet.?ecologique|ecologique/, "Bloc-notes écologique", 35],
  [/bloc.?note.?croco|croco/, "Bloc-notes en cuir façon croco", 50],
  [/bloc.?note.?jean|jean/, "Bloc-notes en jean similicuir", 45],
  [/bloc.?note.?similicuir|notebook.?similicuir|similicuir/, "Bloc-notes en similicuir", 55],
  [/bloc.?note.?poche|poche/, "Agenda à poche en similicuir", 55],
  [/bloc.?note|notebook|carnet|agenda/, "Bloc-notes personnalisable", 45],
  [/stylo.?vip|stylo.?de.?luxe|stylo.?cadeaux.*haut|vip/, "Stylo VIP de luxe", 35],
  [/stylo.?bois|stylo.?bambou/, "Stylo en bois bambou", 12],
  [/stylo.?metal/, "Stylo métallique", 15],
  [/stylo.?ecologique|stylo.*plastique/, "Stylo écologique", 8],
  [/stylo/, "Stylo publicitaire", 10],
  // coffret
  [/coffret.*powerbank|powerbank.*coffret|coffret.*high.?tech/, "Coffret high-tech avec powerbank", 300],
  [/coffret.*usb|usb.*coffret|coffret.?notebook.?usb/, "Coffret notebook et clé USB", 180],
  [/coffret.?agenda|agenda.*stylo|coffret.?notebook.*stylo/, "Coffret agenda et stylo", 100],
  [/coffret.?liege|coffret.?ecologique|ecologique/, "Coffret cadeau écologique", 80],
  [/coffret.?arabesque/, "Coffret cadeau arabesque", 120],
  [/coffret.?vip|coffret.?4.?piece|coffret.?cadeaux?.*vip/, "Coffret cadeau VIP haut de gamme", 500],
  [/petit.?coffret/, "Petit coffret cadeau", 80],
  [/coffret/, "Coffret cadeau d'entreprise", 120],
  // evenementiel
  [/bracelet.?silicone.?piscine|silicone.?piscine/, "Bracelet en silicone pour piscine", 5],
  [/bracelet.?vinyl/, "Bracelet vinyle à usage unique", 2],
  [/bracelet.?silicone|bracelet/, "Bracelet en silicone", 5],
  [/badge.?magnetique/, "Badge magnétique", 12],
  [/badge|carte.?pvc/, "Badge PVC", 8],
  [/balle.?antistress|antistress/, "Balle anti-stress", 15],
  [/tour.?de.?cou|lanyard/, "Tour de cou lanyard", 12],
  [/eventail/, "Éventail publicitaire", 10],
  [/bougie/, "Bougie événementielle", 35],
  [/diffuseur/, "Diffuseur d'arôme", 60],
  // gourde / mug
  [/gourde.?bambou/, "Gourde en bambou", 40],
  [/gourde.?thermos|gourde.?isotherme/, "Gourde isotherme thermos", 60],
  [/gourde/, "Gourde personnalisable", 40],
  [/mug.?isotherme/, "Mug isotherme", 60],
  [/mug.?porcelin|mug.?porcelaine|porcelin/, "Mug en porcelaine", 30],
  [/mug.?elegant/, "Mug élégant", 60],
  [/mug|tasse/, "Mug céramique", 25],
  // high tech
  [/multicable|multicharge|cable/, "Câble multicharge 4 sorties", 40],
  [/powerbank.?small|powerbank/, "Powerbank batterie externe", 150],
  [/usb.?twister|twister/, "Clé USB twister", 60],
  [/carte.?cle.?usb|carte.?usb/, "Clé USB format carte", 50],
  [/usb.?ecologique|usb.*bois|cle.?usb.?ecologique/, "Clé USB écologique en bois", 75],
  [/usb|cle.?usb/, "Clé USB publicitaire", 70],
  [/souris.?sans.?fil|souris/, "Souris sans fil", 60],
  [/enceinte/, "Enceinte Bluetooth", 120],
  [/chauffe.?tasse/, "Chauffe-tasse avec chargeur sans fil", 110],
  [/high.?tech/, "Cadeau high-tech d'entreprise", 90],
  // porte cle
  [/porte.?cle.?voiture|forme.?voiture/, "Porte-clés forme voiture", 12],
  [/porte.?cle.?camion|forme.?camion/, "Porte-clés forme camion", 12],
  [/porte.?cle.?maison/, "Porte-clés forme maison", 12],
  [/porte.?cle.*bois|porte.?cle.?bois/, "Porte-clés en bois", 15],
  [/porte.?cle.?fabrication|fabrication/, "Porte-clés fabrication sur mesure", 12],
  [/porte.?cle/, "Porte-clés", 12],
  // textile / sacs
  [/casquette/, "Casquette brodée", 22],
  [/gilet/, "Gilet", 20],
  [/polo/, "Polo", 55],
  [/t.?shirt/, "T-shirt", 40],
  [/sac.?isotherme/, "Sac isotherme", 60],
  [/sac.?marathon/, "Sac marathon en tissu", 22],
  [/sac.?papier|sac.?en.?papier/, "Sac en papier kraft", 10],
  [/sac.?a.?dos/, "Sac à dos", 180],
  [/tote.?bag|sac.?en.?tissu|sac.?ecologique/, "Tote bag en tissu", 25],
  [/parapluie/, "Parapluie", 70],
  [/sac/, "Sac publicitaire", 30],
  // trophée
  [/medaille/, "Médaille", 30],
  [/coupe/, "Coupe trophée", 300],
  [/trophee/, "Trophée", 300],
  // generic fallbacks (keep last)
  [/goodies/, "Pack goodies d'entreprise", 50],
];

// category-level default price (last resort)
const CAT_DEFAULT_PRICE = {
  "bloc-notes-carnets-bureau-personnalises-maroc": 45,
  "coffrets-cadeaux-entreprise-personnalises-maroc": 120,
  "bracelets-evenementiels-objets-personnalises-maroc": 10,
  "gourdes-mugs-bouteilles-personnalises-maroc": 45,
  "objets-high-tech-personnalises-maroc": 90,
  "porte-cles-personnalises-pas-chers-maroc": 12,
  "textile-tote-bags-sacs-personnalises-maroc": 40,
  "trophees-coupes-recompenses-personnalises-maroc": 250,
};

function detectType(source) {
  const n = stripAccents(source).toLowerCase();
  for (const [re, name, price] of TYPE_RULES) if (re.test(n)) return { name, price };
  return null;
}

// derive a readable name from a filename when no rule matches
function deriveName(file) {
  let t = stripAccents(path.basename(file).replace(/\.[a-z]+$/i, "")).toLowerCase();
  t = t.replace(/personnalis[ae]e?|avec|logo|pour|entreprise|cadeaux?|goodies|maroc|publicitaire|objet|haut|de|gamme/g, " ")
    .replace(/casablanca|rabat|tanger|marrakech|tetouan|agadir|kenitra|fes/g, " ")
    .replace(/\d+/g, " ").replace(/[^a-z]+/g, " ").trim();
  const words = t.split(/\s+/).filter(Boolean).slice(0, 3);
  return words.length ? titleCase(words.join(" ")) : "Objet publicitaire";
}

// ---------- category mapping ----------
const CATEGORY_MAP = {
  "Bloc note et bureautique": {
    name: "Bloc-notes, carnets et articles de bureau personnalisés",
    slug: "bloc-notes-carnets-bureau-personnalises-maroc",
    shortLabel: "Bureautique", icon: "📓",
    custom: ["Gravure laser", "Dorure à chaud", "Impression logo"],
  },
  "COFFRET": {
    name: "Coffrets cadeaux d'entreprise personnalisés",
    slug: "coffrets-cadeaux-entreprise-personnalises-maroc",
    shortLabel: "Coffrets", icon: "🎁",
    custom: ["Gravure laser", "Impression logo", "Marquage à chaud"],
  },
  "Evenementielle et Bracelet": {
    name: "Bracelets événementiels et objets personnalisés pour événements",
    slug: "bracelets-evenementiels-objets-personnalises-maroc",
    shortLabel: "Événementiel", icon: "🎫",
    custom: ["Impression couleur", "Sérigraphie", "Marquage logo"],
  },
  "Gourde et Mug": {
    name: "Gourdes, mugs et bouteilles personnalisés",
    slug: "gourdes-mugs-bouteilles-personnalises-maroc",
    shortLabel: "Gourdes & Mugs", icon: "🥤",
    custom: ["Gravure laser", "Impression UV", "Sérigraphie"],
  },
  "High tech": {
    name: "Objets high-tech personnalisés",
    slug: "objets-high-tech-personnalises-maroc",
    shortLabel: "High-Tech", icon: "🔌",
    custom: ["Gravure laser", "Impression UV", "Marquage logo"],
  },
  "Porte Clé (entre 10-15 Dh aleatoire": {
    name: "Porte-clés personnalisés pas chers",
    slug: "porte-cles-personnalises-pas-chers-maroc",
    shortLabel: "Porte-clés", icon: "🔑",
    custom: ["Impression logo", "Gravure", "Marquage couleur"],
  },
  "Textile et Sacs": {
    name: "Textile, tote bags et sacs personnalisés",
    slug: "textile-tote-bags-sacs-personnalises-maroc",
    shortLabel: "Textile & Sacs", icon: "👕",
    custom: ["Broderie", "Sérigraphie", "Flocage"],
  },
  "Trophée et coupe": {
    name: "Trophées, coupes et récompenses personnalisés",
    slug: "trophees-coupes-recompenses-personnalises-maroc",
    shortLabel: "Trophées", icon: "🏆",
    custom: ["Gravure laser", "Impression UV", "Marquage logo"],
  },
};

const BASE_TAGS = ["objets publicitaires", "cadeaux d'entreprise", "personnalisé", "avec logo", "Maroc", "goodies"];

const isImg = (f) => /\.(png|jpe?g|webp)$/i.test(f);

// ---------- build ----------
const usedSlugs = new Set();
function uniqueSlug(base) {
  let s = base, i = 2;
  while (usedSlugs.has(s)) s = `${base}-${i++}`;
  usedSlugs.add(s);
  return s;
}

const categories = [];
const products = [];

// reset output image dir
fs.rmSync(OUT_IMG, { recursive: true, force: true });
fs.mkdirSync(OUT_IMG, { recursive: true });

const warnings = [];

const catFolders = fs.readdirSync(SRC, { withFileTypes: true }).filter((d) => d.isDirectory());

for (const catDir of catFolders) {
  const meta = CATEGORY_MAP[catDir.name];
  if (!meta) { warnings.push(`Unknown category folder skipped: ${catDir.name}`); continue; }
  const catPath = path.join(SRC, catDir.name);
  const catSlug = meta.slug;
  const catProducts = [];

  // entries
  const entries = fs.readdirSync(catPath, { withFileTypes: true });
  const subfolders = entries.filter((e) => e.isDirectory());
  const looseImgs = entries.filter((e) => e.isFile() && isImg(e.name)).map((e) => e.name);

  // ---- products from subfolders ----
  for (const sub of subfolders) {
    const subPath = path.join(catPath, sub.name);
    const imgs = fs.readdirSync(subPath).filter(isImg);
    if (imgs.length === 0) { warnings.push(`Empty subfolder: ${catDir.name}/${sub.name}`); continue; }
    const det = detectType(sub.name);
    const typeName = det?.name || titleCase(sub.name.replace(/\d[\d\s]*d[hH].*/i, "").trim());
    const price = parsePrice(sub.name) ?? det?.price ?? CAT_DEFAULT_PRICE[catSlug] ?? null;
    catProducts.push(await makeProduct({ catDir, meta, catSlug, typeName, price, subName: sub.name, imgFiles: imgs.map((f) => ({ abs: path.join(subPath, f), file: f })) }));
  }

  // ---- products from loose images: group by detected type ----
  const groups = new Map();
  for (const f of looseImgs) {
    const det = detectType(f);
    const typeName = det?.name || deriveName(f);
    if (!groups.has(typeName)) groups.set(typeName, { files: [], typePrice: det?.price ?? null });
    groups.get(typeName).files.push(f);
  }
  for (const [typeName, { files, typePrice }] of groups) {
    const price = files.map((f) => parsePrice(f)).find((p) => p != null) ?? typePrice ?? CAT_DEFAULT_PRICE[catSlug] ?? null;
    catProducts.push(await makeProduct({ catDir, meta, catSlug, typeName, price, subName: null, imgFiles: files.map((f) => ({ abs: path.join(catPath, f), file: f })) }));
  }

  // category hero from first product
  const hero = catProducts[0]?.images.default || "/images/hero-novagift-showcase.png";
  categories.push({
    id: catSlug,
    name: meta.name,
    slug: catSlug,
    shortLabel: meta.shortLabel,
    description: `Découvrez notre sélection de ${meta.name.toLowerCase()} avec logo pour entreprises au Maroc. Idéal pour événements, cadeaux clients et communication professionnelle à Casablanca, Rabat, Marrakech et Tanger.`,
    intro: `Nova Gift conçoit des ${meta.name.toLowerCase()} pour les entreprises marocaines. ${meta.shortLabel} de qualité, marquage personnalisé (logo, couleurs) et livraison partout au Maroc. Demandez un devis gratuit sous 48h.`,
    seoTitle: `${meta.name} | Nova Gift Maroc`,
    seoDescription: `${meta.name} avec logo au Maroc. Marquage de qualité, devis gratuit sous 48h. Livraison Casablanca, Rabat, Marrakech, Tanger.`,
    keywords: [meta.name.toLowerCase(), ...BASE_TAGS.slice(0, 5), "Casablanca", "Rabat"],
    heroImage: hero,
    image: hero,
    icon: meta.icon,
    productCount: catProducts.length,
    faq: [
      { question: `Quelle est la quantité minimum pour les ${meta.shortLabel.toLowerCase()} personnalisés ?`, answer: "La plupart de nos articles sont disponibles à partir de 50 pièces (100 pièces pour les petits objets). Contactez-nous pour les quantités exactes." },
      { question: "Quelles techniques de personnalisation proposez-vous ?", answer: `Nous proposons ${meta.custom.join(", ").toLowerCase()} selon le produit, avec votre logo et vos couleurs.` },
      { question: "Livrez-vous partout au Maroc ?", answer: "Oui, nous livrons partout au Maroc : Casablanca, Rabat, Marrakech, Tanger et toutes les villes." },
    ],
    relatedSlugs: [],
  });

  products.push(...catProducts);
}

// fill relatedSlugs (other categories)
for (const c of categories) c.relatedSlugs = categories.filter((x) => x.slug !== c.slug).slice(0, 3).map((x) => x.slug);

async function makeProduct({ catDir, meta, catSlug, typeName, price, subName, imgFiles }) {
  const name = `${typeName} personnalisé avec logo`;
  const slug = uniqueSlug(slugify(typeName + "-personnalise"));
  const prodSlug = slug;
  const outDir = path.join(OUT_IMG, catSlug, prodSlug);
  fs.mkdirSync(outDir, { recursive: true });

  // build variants (optimize + convert to webp with clean names)
  const colors = [];
  const cityset = new Set();
  const usedVarKeys = new Set();
  let idx = -1;
  for (const { abs, file } of imgFiles) {
    idx++;
    const city = detectCity(file);
    if (city && city !== "maroc") cityset.add(CITY_LABEL[city]);
    // variant label: city, else cleaned token, else Version N
    let label = city ? CITY_LABEL[city] : null;
    if (!label) {
      let t = stripAccents(path.basename(file).replace(/\.[a-z]+$/i, "")).toLowerCase();
      t = t.replace(/personnalis[ae]|avec|logo|pour|entreprise|cadeaux?|goodies|maroc/g, " ").replace(/\d+/g, " ").replace(/[^a-z]+/g, " ").trim();
      label = t ? titleCase(t.split(/\s+/).slice(-2).join(" ")) : `Version ${idx + 1}`;
    }
    let key = slugify(label) || `v${idx + 1}`;
    while (usedVarKeys.has(key)) key = `${key}-${idx + 1}`;
    usedVarKeys.add(key);
    const outName = `${key}.webp`;
    try {
      await sharp(abs).rotate().resize({ width: IMG_MAX_WIDTH, withoutEnlargement: true }).webp({ quality: IMG_QUALITY }).toFile(path.join(outDir, outName));
    } catch (e) {
      warnings.push(`Image failed (${catDir.name}/${file}): ${e.message}`);
      continue;
    }
    const webPath = `/products/${catSlug}/${prodSlug}/${outName}`;
    colors.push({
      name: label,
      value: "#1C2B4A",
      image: webPath,
      alt: `${typeName} personnalisé avec logo${city && city !== "maroc" ? " à " + CITY_LABEL[city] : " au Maroc"}`,
    });
  }

  const cities = [...cityset];
  const cityKeywords = cities.length ? cities : ["Maroc"];
  const priceLabel = price != null ? `À partir de ${price} Dh` : null;
  const tags = [...new Set([...BASE_TAGS, meta.shortLabel.toLowerCase(), ...cities])];

  const longDescription = `${name.charAt(0).toUpperCase() + name.slice(1)} est un objet publicitaire idéal pour promouvoir votre entreprise au Maroc. ${subName ? `Modèle « ${subName.replace(/\d[\d\s]*d[hH].*/i, "").trim()} », ` : ""}personnalisable avec votre logo (${meta.custom.join(", ").toLowerCase()}). Parfait pour vos événements, salons professionnels, cadeaux clients et campagnes de communication${cities.length ? " à " + cities.join(", ") : " partout au Maroc"}.${price != null ? ` Prix à partir de ${price} Dh selon quantité.` : ""}`;

  return {
    id: prodSlug,
    slug: prodSlug,
    name,
    categorySlug: catSlug,
    categoryName: meta.name,
    category: meta.shortLabel,
    subcategory: subName ? titleCase(subName.replace(/\d[\d\s]*d[hH].*/i, "").trim()) : typeName,
    shortDescription: `${typeName} personnalisé avec logo pour entreprises au Maroc.${price != null ? ` À partir de ${price} Dh.` : ""}`,
    longDescription,
    images: { default: colors[0]?.image || "/images/hero-novagift-showcase.png" },
    colors,
    minQuantity: price != null && price <= 15 ? 100 : 50,
    price: price ?? null,
    priceLabel,
    customization: meta.custom,
    features: [
      "Personnalisation avec votre logo",
      `Marquage : ${meta.custom.join(", ").toLowerCase()}`,
      "Idéal cadeaux d'entreprise & événements",
      "Livraison partout au Maroc",
    ],
    tags,
    cityKeywords,
    seoTitle: `${typeName} personnalisé Maroc | Nova Gift`,
    seoDescription: `${typeName} personnalisé avec logo pour entreprise au Maroc.${price != null ? ` À partir de ${price} Dh.` : ""} Devis gratuit 48h. Livraison Casablanca, Rabat, Marrakech, Tanger.`,
    keywords: [`${slugify(typeName).replace(/-/g, " ")} personnalisé maroc`, "objets publicitaires maroc", `${meta.shortLabel.toLowerCase()} entreprise maroc`],
  };
}

// ---------- emit TS ----------
const header = "// AUTO-GENERATED by scripts/generate-catalog.mjs — do not edit by hand.\n// Re-run `npm run catalog` after adding/renaming images.\n\n";

const catTs = header + `export interface CategoryFAQ { question: string; answer: string; }
export interface Category {
  id: string; name: string; slug: string; shortLabel: string;
  description: string; intro: string; seoTitle: string; seoDescription: string;
  keywords: string[]; heroImage: string; image: string; icon: string;
  productCount: number; faq: CategoryFAQ[]; relatedSlugs: string[];
}

export const categories: Category[] = ${JSON.stringify(categories, null, 2)};

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
`;

const prodTs = header + `export interface ProductColor { name: string; value: string; image: string; alt: string; }
export interface Product {
  id: string; slug: string; name: string;
  categorySlug: string; categoryName: string; category: string; subcategory: string;
  shortDescription: string; longDescription: string;
  images: { default: string; [k: string]: string };
  colors: ProductColor[];
  minQuantity: number; price: number | null; priceLabel: string | null;
  customization: string[]; features: string[];
  tags: string[]; cityKeywords: string[];
  seoTitle: string; seoDescription: string; keywords: string[];
}

export const products: Product[] = ${JSON.stringify(products, null, 2)};

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((p) => p.categorySlug === categorySlug);
}
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id).slice(0, limit);
}
`;

fs.writeFileSync(path.join(root, "data", "categories.ts"), catTs);
fs.writeFileSync(path.join(root, "data", "products.ts"), prodTs);

// ---------- report ----------
console.log(`\n✅ Catalog generated`);
console.log(`   Categories: ${categories.length}`);
console.log(`   Products:   ${products.length}`);
console.log(`   Variants:   ${products.reduce((a, p) => a + p.colors.length, 0)}`);
console.log(`   Priced:     ${products.filter((p) => p.price != null).length}/${products.length}`);
console.log(`\n   Per category:`);
for (const c of categories) console.log(`     - ${c.name}: ${c.productCount} produits`);
if (warnings.length) { console.log(`\n   ⚠️ Warnings:`); warnings.forEach((w) => console.log("     - " + w)); }
console.log("");
