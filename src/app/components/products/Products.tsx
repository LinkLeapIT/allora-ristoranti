import React, { useMemo } from "react";
import ProductsData from "./ProductsData";
import Container from "../navbar/Container";
import { Products } from "@/types";
import LoadingSpinner from "@/components/loading-spinner";
import { useI18n } from "@/i18n/I18nProvider";
import { localizeProduct } from "@/i18n/localize";

type ProductProps = {
  products: Products[];
  searchTerm?: string;
  categoryFilter?: string;
  random: string;
  sortBy?: "" | "price-asc" | "price-desc" | "newest";
  loading: boolean;
  error: Error | null;
};

export default function Product({
  products,
  searchTerm = "",
  categoryFilter = "",
  random = "",
  sortBy = "",
  loading,
  error,
}: ProductProps) {
  const { t, locale } = useI18n();
  const filteredProducts = useMemo(() => {
    let temp = [...products].filter((p) => p.status !== 'hidden');

    if (categoryFilter) {
      temp = temp.filter((p) => p.category === categoryFilter);
    }

    if (random === "random" && temp.length > 0) {
      temp = [temp[Math.floor(Math.random() * temp.length)]];
    }

    const lowerSearch = searchTerm.toLowerCase();
    if (lowerSearch) {
      temp = temp.filter((p) => {
        const l = localizeProduct(p, locale);
        return (
          l.title.toLowerCase().includes(lowerSearch) ||
          l.description.toLowerCase().includes(lowerSearch)
        );
      });
    }

    if (!sortBy) {
      // Keep the order of the printed menu; items without a position go last.
      temp.sort((a, b) => (a.sortOrder ?? 9999) - (b.sortOrder ?? 9999));
    } else if (sortBy === "price-asc") {
      temp.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    } else if (sortBy === "price-desc") {
      temp.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    } else if (sortBy === "newest") {
      temp.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );
    }

    return temp;
  }, [products, categoryFilter, searchTerm, sortBy, random, locale]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item) => (
          <ProductsData key={item.id} product={item} />
        ))
      ) : (
        <div className="col-span-full mt-20 flex items-center justify-center">
          <h1 className="text-2xl font-semibold text-center text-darkText">
            {t.menu.empty}
          </h1>
        </div>
      )}
    </Container>
  );
}
