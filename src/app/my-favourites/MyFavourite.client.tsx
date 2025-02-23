// app/my-favourite/MyFavourite.client.tsx
"use client";

import React from "react";
import { Products } from "@/type/productType";
import ProductsData from "@/app/components/products/ProductsData";

interface MyFavouriteClientProps {
  products: Products[];
}

export default function MyFavouriteClient({ products }: MyFavouriteClientProps) {
  return (
    <div>
      {products.length === 0 ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
          <p className="text-center text-2xl md:text-4xl text-link font-extrabold -mt-36 z-10">
            You have not added any products to favourites yet.
          </p>
        </div>
      ) : (
        <div className="min-h-screen ">
          <div className='absolute top-0 left-0 w-full h-full bg-black opacity-60'></div>
          <div className="z-10 relative">
            <h1 className="text-3xl text-link font-bold text-center mb-6">
              My Favourite Products
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-8">
              {products.map((product) => (
                <ProductsData key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
