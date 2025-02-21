// src/components/FavouritesCount.server.tsx
"use server";

import { getUserFavourites } from "@/data/favourites";
import React from "react";

export default async function FavouritesCount() {
  const userFavourites = await getUserFavourites();
  // Assuming the favourites document is an object with keys as product IDs,
  // the count is the number of keys.
  const count = Object.keys(userFavourites).length;

  return (
    <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600/70 text-xs text-white">
      {count}
    </span>
  );
}
