"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Products } from "@/types";
import { useI18n } from "@/i18n/I18nProvider";
import { localizeProduct } from "@/i18n/localize";

interface ItemProps {
  product: Products;
}

const ProductsData = ({ product }: ItemProps) => {
  const { t, locale } = useI18n();
  const { title, description } = localizeProduct(product, locale);
  const isSoldOut = product.status === "unavailable";
  const photo = product.images?.[0];

  // Latin digits in every language so prices read the same on the page.
  const price = new Intl.NumberFormat(locale === "it" ? "it-IT" : "en-US", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: Number.isInteger(product.price) ? 0 : 2,
  }).format(product.price ?? 0);

  return (
    <Link
      href={`/menu/${product.slug}`}
      className={`group flex h-full gap-3 rounded-2xl border border-line bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-lightText/60 hover:shadow-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-lightText ${
        isSoldOut ? "opacity-60" : ""
      }`}
    >
      {photo ? (
        <Image
          src={photo}
          alt=""
          width={76}
          height={76}
          className="h-[76px] w-[76px] shrink-0 rounded-xl object-cover"
        />
      ) : (
        <div
          className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-xl bg-darkBg"
          aria-hidden="true"
        >
          <Image src="/assets/images/logo.png" alt="" width={56} height={56} className="h-auto w-12 opacity-60" />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 break-words font-heading text-xl font-semibold leading-tight text-darkText md:text-2xl">
            {title}
          </h3>
          {isSoldOut ? (
            <span className="shrink-0 rounded-full bg-red-50 px-3 py-0.5 text-sm font-medium text-red-700">
              {t.menu.soldOut}
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-darkBg px-3 py-0.5 text-sm font-medium text-lightText">
              {price}
            </span>
          )}
        </div>

        <p className="mb-2 mt-1.5 line-clamp-3 text-sm leading-relaxed text-darkText/70">
          {description}
        </p>

        {product.allergy && product.allergy.length > 0 && (
          <p className="text-xs text-darkText/50">
            {t.menu.allergens}:{" "}
            <span className="font-medium text-lightText">{product.allergy.join(", ")}</span>
          </p>
        )}
      </div>
    </Link>
  );
};

export default ProductsData;
