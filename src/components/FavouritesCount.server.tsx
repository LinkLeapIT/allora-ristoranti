"use server";

import { getUserFavourites } from "@/data/favourites";
import React from "react";

export default async function FavouritesCount() {
  try {
    const userFavourites = await getUserFavourites();
    const count = Object.keys(userFavourites).length;

    return (
      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600/70 text-xs text-white">
        {count}
      </span>
    );
  } catch (error) {
    console.error("Error fetching favourites:", error);
    return (
      <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-600/70 text-xs text-white">
        0
      </span>
    );
  }
}
