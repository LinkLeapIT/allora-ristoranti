import React, { useMemo } from "react";
import ProductsData from "./ProductsData";
import { Products } from "@/types";
import { useI18n } from "@/i18n/I18nProvider";
import { localizeProduct } from "@/i18n/localize";
import { Reveal } from "@/components/motion";

type Category = { id: string; name: string };

type ProductProps = {
  products: Products[];
  categories: Category[];
  searchTerm?: string;
  categoryFilter?: string;
  sortBy?: "" | "price-asc" | "price-desc" | "newest";
  loading: boolean;
  error: Error | null;
};

const GRID = "grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3";

function Skeleton() {
  return (
    <div className={GRID} aria-hidden="true">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-line bg-white p-4">
          <div className="mb-3 h-5 w-2/3 rounded bg-darkBg" />
          <div className="mb-2 h-3 w-full rounded bg-darkBg" />
          <div className="mb-2 h-3 w-5/6 rounded bg-darkBg" />
          <div className="h-3 w-1/3 rounded bg-darkBg" />
        </div>
      ))}
    </div>
  );
}

export default function Product({
  products,
  categories,
  searchTerm = "",
  categoryFilter = "",
  sortBy = "",
  loading,
  error,
}: ProductProps) {
  const { t, locale } = useI18n();

  const visible = useMemo(() => {
    let list = products.filter((p) => p.status !== "hidden");

    if (categoryFilter) {
      list = list.filter((p) => p.category === categoryFilter);
    }

    const q = searchTerm.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => {
        const l = localizeProduct(p, locale);
        return (
          l.title.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
        );
      });
    }

    const byPrinted = (a: Products, b: Products) =>
      (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999);

    if (sortBy === "price-asc") list.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (sortBy === "price-desc") list.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    else if (sortBy === "newest")
      list.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
    else list.sort(byPrinted);

    return list;
  }, [products, categoryFilter, searchTerm, sortBy, locale]);

  // Group by category in menu order. A chosen sort shows one flat list instead.
  const sections = useMemo(() => {
    if (sortBy) return [{ id: "all", name: "", items: visible }];

    const known = categories.map((c) => ({
      id: c.id,
      name: t.categories[c.id] ?? c.name,
      items: visible.filter((p) => p.category === c.id),
    }));
    const knownIds = new Set(categories.map((c) => c.id));
    const other = visible.filter((p) => !knownIds.has(p.category));
    if (other.length) {
      known.push({ id: "other", name: t.categories[other[0].category] ?? other[0].category, items: other });
    }
    return known.filter((s) => s.items.length > 0);
  }, [visible, categories, sortBy, t]);

  if (loading) return <Skeleton />;

  if (error) {
    return (
      <p role="alert" className="py-16 text-center text-lg text-darkText">
        {t.menu.loadError}
      </p>
    );
  }

  if (visible.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="font-heading text-2xl font-semibold text-darkText">
          {searchTerm ? t.menu.noResults : t.menu.empty}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={`cat-${section.id}`}>
          {section.name && (
            <Reveal className="mb-4 flex items-baseline gap-3" y={12}>
              <h2
                id={`cat-${section.id}`}
                className="font-heading text-3xl font-semibold text-darkText md:text-4xl"
              >
                {section.name}
              </h2>
              <span className="text-sm text-darkText/50">
                {section.items.length} {t.menu.dishes}
              </span>
              <span className="h-px flex-1 translate-y-[-4px] bg-line" aria-hidden="true" />
            </Reveal>
          )}
          <div className={GRID}>
            {section.items.map((item, index) => (
              <Reveal key={item.id} className="h-full" delay={(index % 3) * 0.07} y={16}>
                <ProductsData product={item} />
              </Reveal>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
