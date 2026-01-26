//app/components/productsData.tsx
"use client";

import React, { useState } from "react";
import { HiViewfinderCircle } from "react-icons/hi2";
import { Products } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Rating from "@/app/components/products/Rating";
import { Badge } from "@/components/ui/badge";

interface ItemProps {
  product: Products;
}

const ProductsData = ({ product }: ItemProps) => {
  const [zoomed, setZoomed] = useState(false);

  const handleOpenZoom = () => setZoomed(true);
  const handleCloseZoom = () => setZoomed(false);
  const isSoldOut = product.status === "unavailable";

  return (
    <div className="bg-darkBg rounded-lg overflow-hidden shadow-lg group">
      <div className="relative">
        <div
          className="w-full h-64 bg-darkBg cursor-zoom-in"
          onClick={handleOpenZoom}
        >
          <Image
            className="w-full h-full object-cover"
            src={product.images?.[0] || "/allor-bbq.jpg"}
            alt="Product"
            width={300}
            height={300}
          />
        </div>
        {product.status !== 'available' && (
          <div className="absolute top-2 right-2">
            <Badge
              variant={
                product.status === "hidden" ? "secondary" : "destructive"
              }
            >
              {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
            </Badge>
          </div>
        )}
        {product.allergy && product.allergy.length > 0 && (
          <div className="absolute top-2 left-2 flex flex-col gap-y-1">
            {product.allergy.map((item, index) => (
              <Badge key={index} variant="destructive">
                {item}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-extrabold bg-gradient-to-r from-darkText to-lightText bg-clip-text text-transparent">
            {product.title}
          </h3>
          {!isSoldOut && (
            <h3 className="text-lg font-extrabold text-lightText">
              {product.price ? `${product.price} €` : "N/A"}
            </h3>
          )}
        </div>

        {isSoldOut ? (
          <div className="flex items-center justify-center h-16">
            <h3 className="text-xl font-bold text-red-500">Sold Out</h3>
          </div>
        ) : (
          <p className="text-sm text-gray-400 h-16 line-clamp-3">
            {product.description}
          </p>
        )}

        <div className="flex items-center justify-between mt-4">
          <Link href={`/menu/${product.slug}`}>
            <HiViewfinderCircle className="text-darkText text-2xl hover:text-lightText duration-300 cursor-pointer" />
          </Link>
          <Rating ratings={product.ratings ?? []} />
        </div>
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 cursor-zoom-out"
          onClick={handleCloseZoom}
        >
          <div className="relative max-w-4xl w-full h-auto">
            <Image
              src={product.images?.[0] || "/allor-bbq.jpg"}
              alt="Zoomed Image"
              className="object-contain w-full max-h-[90vh]"
              width={1000}
              height={1000}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsData;