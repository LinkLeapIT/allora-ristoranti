//app/components/productsData.tsx
"use client";

import React, { useState } from "react";
import { HiViewfinderCircle } from "react-icons/hi2";
import { Products } from "@/types";
import Image from "next/image";
import Link from "next/link";
import Rating from "@/app/components/products/Rating";
import { Badge } from "@/components/ui/badge";
import { useI18n } from "@/i18n/I18nProvider";
import { localizeProduct } from "@/i18n/localize";

interface ItemProps {
  product: Products;
}

const ProductsData = ({ product }: ItemProps) => {
  const { t, locale } = useI18n();
  const { title, description } = localizeProduct(product, locale);
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
            className={product.images?.[0] ? "w-full h-full object-cover" : "w-full h-full object-contain p-12 opacity-40"}
            src={product.images?.[0] || "/assets/images/logo.png"}
            alt="Product"
            width={300}
            height={300}
          />
        </div>
        {product.status !== 'available' && (
          <div className="absolute top-2 end-2">
            <Badge
              variant={
                product.status === "hidden" ? "secondary" : "destructive"
              }
            >
              {t.menu.status[product.status as keyof typeof t.menu.status] ?? product.status}
            </Badge>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between">
        <div className="flex items-start justify-between mb-2">
          <h3 className="min-w-0 break-words font-heading text-2xl font-semibold text-darkText">
            {title}
          </h3>
          {!isSoldOut && (
            <h3 className="shrink-0 ps-3 text-lg font-extrabold text-lightText">
              {product.price ? `${product.price} €` : "N/A"}
            </h3>
          )}
        </div>

        {isSoldOut ? (
          <div className="flex items-center justify-center h-16">
            <h3 className="text-xl font-bold text-red-500">{t.menu.soldOut}</h3>
          </div>
        ) : (
          <div className="h-20">
            <p className="text-sm text-darkText/70 line-clamp-3">{description}</p>
            {product.allergy && product.allergy.length > 0 && (
              <p className="mt-1 text-xs text-lightText">
                {t.menu.allergens}: {product.allergy.join(", ")}
              </p>
            )}
          </div>
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
              src={product.images?.[0] || "/assets/images/logo.png"}
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