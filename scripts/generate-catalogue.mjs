// Generate a branded PDF catalogue from data/products.ts + data/categories.ts.
// Run: node scripts/generate-catalogue.mjs
// Output: public/catalogue-cadeaux-publicitaires-nova-gift-maroc.pdf
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import PDFDocument from "pdfkit";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const NAVY = "#1C2B4A";
const GOLD = "#B8860B";
const GREY = "#555555";

// --- Lightweight parse of the TS data files (we only need a few text fields) ---
function readField(block, field) {
  const m = block.match(new RegExp(`"?${field}"?:\\s*"((?:[^"\\\\]|\\\\.)*)"`));
  return m ? m[1].replace(/\\"/g, '"') : "";
}
function readArray(block, field) {
  const m = block.match(new RegExp(`"?${field}"?:\\s*\\[([^\\]]*)\\]`));
  if (!m) return [];
  return [...m[1].matchAll(/"((?:[^"\\]|\\.)*)"/g)].map((x) => x[1]);
}

const productsSrc = fs.readFileSync(path.join(root, "data/products.ts"), "utf8");
// Split product objects by the "id:" delimiter inside the array
const productBlocks = productsSrc
  .split(/\n\s*\{\s*\n\s*"?id"?:/)
  .slice(1)
  .map((b) => "id:" + b);

const products = productBlocks.map((b) => ({
  name: readField(b, "name"),
  categoryName: readField(b, "categoryName"),
  shortDescription: readField(b, "shortDescription"),
  customization: readArray(b, "customization"),
  minQuantity: (b.match(/"?minQuantity"?:\s*(\d+)/) || [])[1] || "",
}));

// Group by category, preserving first-seen order
const byCat = new Map();
for (const p of products) {
  if (!byCat.has(p.categoryName)) byCat.set(p.categoryName, []);
  byCat.get(p.categoryName).push(p);
}

const outPath = path.join(
  root,
  "public/catalogue-cadeaux-publicitaires-nova-gift-maroc.pdf"
);
const doc = new PDFDocument({
  size: "A4",
  margin: 56,
  info: {
    Title: "Catalogue Cadeaux Publicitaires & Objets Personnalisés — Nova Gift Maroc",
    Author: "Nova Gift",
    Subject:
      "Catalogue de cadeaux d'entreprise, goodies personnalisés et objets publicitaires au Maroc",
    Keywords:
      "cadeaux publicitaires Maroc, goodies personnalisés, objets publicitaires, marquage corporate, cadeaux entreprise Casablanca Rabat Marrakech Tanger",
  },
});
doc.pipe(fs.createWriteStream(outPath));

// ---------- Cover ----------
doc.rect(0, 0, doc.page.width, doc.page.height).fill(NAVY);
doc.fillColor(GOLD).fontSize(13).text("NOVA GIFT", 56, 120, { characterSpacing: 4 });
doc
  .fillColor("#FFFFFF")
  .fontSize(34)
  .text("Catalogue Cadeaux Publicitaires", 56, 200, { width: 460 });
doc
  .fillColor("#FFFFFF")
  .fontSize(34)
  .text("& Objets Personnalisés au Maroc", { width: 460 });
doc
  .moveDown(1)
  .fillColor("#C9D2E3")
  .fontSize(13)
  .text(
    "Goodies personnalisés, objets publicitaires et cadeaux d'entreprise avec marquage corporate de qualité. Gravure laser, broderie, sérigraphie, dorure à chaud. Livraison partout au Maroc : Casablanca, Rabat, Marrakech, Tanger.",
    { width: 460 }
  );
doc
  .fillColor(GOLD)
  .fontSize(12)
  .text("contact@novagift.me  ·  +212 693 567 650  ·  novagift.me", 56, 720);

// ---------- Category sections ----------
let first = true;
for (const [cat, items] of byCat) {
  doc.addPage();
  if (first) first = false;
  doc.fillColor(NAVY).fontSize(20).text(cat);
  doc.moveTo(56, doc.y + 4).lineTo(539, doc.y + 4).strokeColor(GOLD).lineWidth(2).stroke();
  doc.moveDown(1);
  for (const p of items) {
    if (doc.y > 720) doc.addPage();
    doc.fillColor(NAVY).fontSize(13).text(p.name, { continued: false });
    doc.fillColor(GREY).fontSize(10).text(p.shortDescription, { width: 483 });
    const meta = [];
    if (p.customization?.length) meta.push("Marquage : " + p.customization.join(", "));
    if (p.minQuantity) meta.push("Qté min : " + p.minQuantity);
    if (meta.length) doc.fillColor(GOLD).fontSize(9).text(meta.join("   ·   "));
    doc.moveDown(0.8);
  }
}

// ---------- Closing CTA ----------
doc.addPage();
doc.fillColor(NAVY).fontSize(22).text("Demandez votre devis gratuit sous 48h", { width: 483 });
doc
  .moveDown(0.6)
  .fillColor(GREY)
  .fontSize(12)
  .text(
    "Nova Gift est votre partenaire marocain pour des goodies personnalisés et objets publicitaires premium. Contactez-nous pour un devis sur mesure adapté à votre budget et vos délais.",
    { width: 483 }
  );
doc.moveDown(1).fillColor(NAVY).fontSize(13).text("contact@novagift.me");
doc.text("+212 693 567 650  (WhatsApp)");
doc.text("novagift.me");

doc.end();
console.log("Catalogue PDF generated:", path.relative(root, outPath), "(" + products.length + " produits)");
