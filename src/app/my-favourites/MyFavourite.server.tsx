// app/my-favourite/MyFavourite.server.tsx
import React from "react";
import { getUserFavourites } from "@/data/favourites";
import { getProductsById } from "@/data/products";
import MyFavouriteClient from "./MyFavourite.client";
import { Products } from "@/type/productType";

export default async function MyFavourite() {
  // Fetch the user's favourites (an object mapping product IDs to true)
  const favourites = await getUserFavourites();

  // Remove any extra keys (like "uid") and get an array of product IDs
  const productIds = Object.keys(favourites).filter((key) => key !== "uid");

  // Fetch product data for these IDs
  const products: Products[] = await getProductsById(productIds);

  // Render the client component, passing down the product data
  return <MyFavouriteClient products={products} />;
}
//
