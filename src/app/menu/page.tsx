'use client';

import React, { useEffect, useState } from "react";
import { Search, ArrowUpDown, X } from "lucide-react";
import Product from "../components/products/Products";
import { Products } from "@/types";
import { getProducts } from "@/app/actions/productActions";
import { useI18n } from "@/i18n/I18nProvider";

type SortBy = "" | "price-asc" | "price-desc" | "newest";
type Category = { id: string; name: string };

const CATEGORY_ORDER = ["mezzah-fredda", "mezzah-calda", "arayes", "pasti"];
const rank = (id: string) => {
  const i = CATEGORY_ORDER.indexOf(id);
  return i === -1 ? CATEGORY_ORDER.length : i;
};

export default function Page() {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("");
  const [products, setProducts] = useState<Products[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  // The site header is sticky and changes height, so the toolbar tracks it.
  const [headerHeight, setHeaderHeight] = useState(72);

  useEffect(() => {
    const load = async () => {
      try {
        setProducts(await getProducts());
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    const loadCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) return;
        const data: Category[] = await response.json();
        setCategories([...data].sort((a, b) => rank(a.id) - rank(b.id)));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    load();
    loadCategories();
  }, []);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    const update = () => setHeaderHeight(header.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(header);
    return () => observer.disconnect();
  }, []);

  const categoryLabel = (cat: Category) => t.categories[cat.id] ?? cat.name;

  const chipClass = (active: boolean) =>
    `inline-flex h-10 shrink-0 snap-start items-center rounded-full border px-4 text-sm font-medium transition-colors ${
      active
        ? "border-lightText bg-lightText text-white"
        : "border-line bg-white text-darkText hover:bg-darkBg"
    }`;

  return (
    <div className="min-h-screen bg-darkBg">
      <header className="px-4 pb-4 pt-8 text-center md:pt-12">
        <h1 className="font-heading text-4xl font-semibold text-darkText md:text-5xl">
          {t.menu.title}
        </h1>
        <p className="mt-1 text-sm text-darkText/60 md:text-base">{t.menu.subtitle}</p>
      </header>

      <div
        className="sticky z-30 border-b border-line bg-darkBg/95 backdrop-blur"
        style={{ top: headerHeight }}
      >
        <div className="mx-auto max-w-contentContainer px-4 py-3">
          <div className="mb-3 flex gap-2">
            <div className="relative min-w-0 flex-1">
              <Search
                className="pointer-events-none absolute start-3 top-1/2 h-5 w-5 -translate-y-1/2 text-darkText/40"
                aria-hidden="true"
              />
              <input
                type="search"
                inputMode="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.menu.searchPlaceholder}
                aria-label={t.menu.searchPlaceholder}
                className={`h-11 w-full rounded-xl border border-line bg-white ps-10 ${searchTerm ? "pe-10" : "pe-3"} text-base text-darkText placeholder:text-darkText/40 focus:border-lightText focus:outline-none focus:ring-2 focus:ring-lightText/30`}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label={t.menu.clearSearch}
                  className="absolute end-1 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-darkText/50 hover:text-darkText"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            <div className="relative shrink-0">
              <ArrowUpDown
                className="pointer-events-none absolute start-3 top-1/2 h-4 w-4 -translate-y-1/2 text-darkText/50"
                aria-hidden="true"
              />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortBy)}
                aria-label={t.menu.sortBy}
                className="h-11 w-[7.25rem] appearance-none truncate rounded-xl border border-line bg-white ps-9 pe-2 text-sm text-darkText focus:border-lightText focus:outline-none focus:ring-2 focus:ring-lightText/30 md:w-44"
              >
                <option value="">{t.menu.sortBy}</option>
                <option value="price-asc">{t.menu.priceAsc}</option>
                <option value="price-desc">{t.menu.priceDesc}</option>
                <option value="newest">{t.menu.newest}</option>
              </select>
            </div>
          </div>

          <div className="-mx-4 flex snap-x scroll-px-4 gap-2 overflow-x-auto px-4 pb-1 scrollbar-hide md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
            <button
              type="button"
              onClick={() => setCategoryFilter("")}
              aria-pressed={!categoryFilter}
              className={chipClass(!categoryFilter)}
            >
              {t.menu.all}
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                aria-pressed={categoryFilter === cat.id}
                className={chipClass(categoryFilter === cat.id)}
              >
                {categoryLabel(cat)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-contentContainer px-4 py-6 md:py-10">
        <Product
          products={products}
          categories={categories}
          searchTerm={searchTerm}
          categoryFilter={categoryFilter}
          sortBy={sortBy}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}
