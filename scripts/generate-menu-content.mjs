// Generates src/content/products/*.mdx from the scanned menu data.
// Run: node scripts/generate-menu-content.mjs
// Re-running overwrites the generated files only (names listed in menu-data.mjs).
import { writeFileSync, mkdirSync, existsSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import matter from "gray-matter";
import { MENU } from "./menu-data.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const productsDir = join(root, "src", "content", "products");
const categoriesDir = join(root, "src", "content", "categories");
mkdirSync(productsDir, { recursive: true });
mkdirSync(categoriesDir, { recursive: true });

const slugify = (s) => s.toLowerCase().replace(/\s+/g, "-");
const ALLERGEN_LABEL = { it: "Allergeni", en: "Allergens", ar: "مسببات الحساسية" };

const categories = {
  "mezzah-fredda": "Mezzah Fredda",
  "mezzah-calda": "Mezzah Calda",
  arayes: "Arayes",
  pasti: "Pasti",
};
for (const [id, name] of Object.entries(categories)) {
  const file = join(categoriesDir, `${id}.mdx`);
  if (!existsSync(file)) writeFileSync(file, matter.stringify("", { name }));
}

const now = new Date().toISOString();
MENU.forEach((item, index) => {
  const slug = item.id;
  const file = join(productsDir, `${slug}.mdx`);
  const prev = existsSync(file) ? matter(readFileSync(file, "utf8")).data : {};

  const translations = {};
  for (const lang of ["it", "en", "ar"]) {
    const [title, description] = item[lang];
    translations[lang] = { title, description };
  }
  const [title, description] = item.it;

  const data = {
    title,
    description,
    price: item.price,
    category: slugify(item.category),
    status: "available",
    images: prev.images ?? [],
    allergy: item.al ? item.al.split(",").map((a) => a.trim()) : [],
    translations,
    sortOrder: index,
    createdAt: prev.createdAt ?? now,
  };
  writeFileSync(file, matter.stringify(`${description}\n`, data));
});

console.log(`Wrote ${MENU.length} products and ${Object.keys(categories).length} categories.`);
console.log(`Allergen label (reference): ${JSON.stringify(ALLERGEN_LABEL)}`);
