//app/components/products/Products.tsx
"use client";

import React, { useEffect, useState, useMemo } from "react";
import ProductsData from "./ProductsData";
import Container from "../navbar/Container";
import { Products } from "../../../type/productType";
import LoadingSpinner from "@/components/loading-spinner";
import { fetchProducts } from "@/app/actions/createProduct";

type ProductProps = {
  searchTerm?: string;
  categoryFilter?: string;
  random: string;
  // Allow sort options: empty, price-based, newest, most popular, and random.
  sortBy?: "" | "price-asc" | "price-desc" | "newest";
};

export default function Product({
  searchTerm = "",
  categoryFilter = "",
  random = "",
  sortBy = "",
}: ProductProps) {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // 1) Fetch all products on mount
  useEffect(() => {
    const fetchProductsmenu = async () => {
      try {
        const fetched = await fetchProducts(); // assume it returns a plain array of Products
        setProducts(fetched);
      } catch (err) {
        if (err instanceof Error) {
          if (err.message.includes("Quota exceeded")) {
            setError(new Error("Quota exceeded. Please try again later."));
          } else {
            setError(err);
          }
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProductsmenu();
  }, []);
  
  // 2) Derived data: filter, search, and sort
  const filteredProducts = useMemo(() => {
    let temp = [...products];

    // Filter by category if set
    if (categoryFilter) {
        temp = temp.filter((p) => p.category === categoryFilter);
    }

    // Randomly select a product if 'random' is set
    if (random === "random" && temp.length > 0) {
        temp = [temp[Math.floor(Math.random() * temp.length)]];
    }

    // Search term filtering (by title or description)
    const lowerSearch = searchTerm.toLowerCase();
    if (lowerSearch) {
        temp = temp.filter(
            (p) =>
                p.title.toLowerCase().includes(lowerSearch) ||
                p.description.toLowerCase().includes(lowerSearch)
        );
    }

    // Sort the products based on the selected sort option
    if (sortBy === "price-asc") {
        temp.sort((a, b) => {
            const aPrice =
                a.sizes && a.sizes.length > 0 ? a.sizes[0].price : a.price ?? 0;
            const bPrice =
                b.sizes && b.sizes.length > 0 ? b.sizes[0].price : b.price ?? 0;
            return aPrice - bPrice;
        });
    } else if (sortBy === "price-desc") {
        temp.sort((a, b) => {
            const aPrice =
                a.sizes && a.sizes.length > 0 ? a.sizes[0].price : a.price ?? 0;
            const bPrice =
                b.sizes && b.sizes.length > 0 ? b.sizes[0].price : b.price ?? 0;
            return bPrice - aPrice;
        });
    } else if (sortBy === "newest") {
        temp.sort((a, b) => {
            return (
                new Date(b.createdAt || 0).getTime() -
                new Date(a.createdAt || 0).getTime()
            );
        });
    }
    return temp;
  }, [products, categoryFilter, searchTerm, sortBy, random]);


  if (loading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 relative">
      {filteredProducts.length > 0 ? (
        filteredProducts.map((item, index) => (
          <ProductsData key={index} product={item} />
        ))
      ) : (
        <div className="relative mt-20 flex items-center justify-center">
          <h1
            className="text-2xl font-semibold text-center absolute w-screen"
            style={{ color: "#333" }}
          >
            No products available
          </h1>
        </div>
      )}
    </Container>
  );
}
