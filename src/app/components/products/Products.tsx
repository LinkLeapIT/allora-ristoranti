import React, { useMemo } from "react";
import ProductsData from "./ProductsData";
import Container from "../navbar/Container";
import { Products } from "@/types";
import LoadingSpinner from "@/components/loading-spinner";

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
      temp = temp.filter(
        (p) =>
          p.title.toLowerCase().includes(lowerSearch) ||
          p.description.toLowerCase().includes(lowerSearch)
      );
    }

    if (sortBy === "price-asc") {
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
  }, [products, categoryFilter, searchTerm, sortBy, random]);

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
        <div className="relative mt-20 flex items-center justify-center">
          <h1
            className="text-2xl font-semibold text-center absolute w-screen text-darkText"
          >
            No products available
          </h1>
        </div>
      )}
    </Container>
  );
}
