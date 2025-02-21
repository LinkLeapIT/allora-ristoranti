"use client";

import React, { useEffect, useState } from "react";
import ToggleFavouriteButton from "./toggle-favourite-button";
import { Products } from "@/type/productType";
import { Loader2 } from "lucide-react";

interface IsFavouriteProps {
  product: Products;
}

export default function IsFavourite({ product }: IsFavouriteProps) {
  const [favourites, setFavourites] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const res = await fetch("/api/favourites", { method: "GET" });
        if (res.ok) {
          const data = await res.json();
          setFavourites(data || {});
        } else {
          console.error("Failed to fetch favourites", res.status);
        }
      } catch (error) {
        console.error("Error fetching favourites", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const handleFavouriteToggle = (isFavourite: boolean) => {
    setFavourites((prev) => ({
      ...prev,
      [product.id]: isFavourite,
    }));
  };

  if (loading) return <div><Loader2 className="animate-spin" /></div>;

  return (
    <ToggleFavouriteButton
      productId={product.id}
      isFavourite={Boolean(favourites[product.id])}
      onFavouriteToggle={handleFavouriteToggle}
    />
  );
}
