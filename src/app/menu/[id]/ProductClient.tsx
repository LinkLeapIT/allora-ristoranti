'use client';

import React, { useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Products } from '@/types';
import RatingsList from '@/components/RatingsList';
import RatingForm from '@/components/RatingForm';
import StarRating from '@/components/ui/StarRating';
import { useI18n } from '@/i18n/I18nProvider';
import { localizeProduct } from '@/i18n/localize';

interface ProductClientProps {
  product: Products;
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const router = useRouter();
  const { t, locale } = useI18n();
  const { title, description } = localizeProduct(product, locale);

  const isSoldOut = product.status === 'unavailable';
  const photo = product.images?.[0];
  const ratings = product.ratings ?? [];
  const average = useMemo(
    () => (ratings.length ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length : 0),
    [ratings]
  );
  const categoryName = t.categories[product.category] ?? product.category;

  const price = new Intl.NumberFormat(locale === 'it' ? 'it-IT' : 'en-US', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: Number.isInteger(product.price) ? 0 : 2,
  }).format(product.price ?? 0);

  return (
    <div className="min-h-screen bg-darkBg">
      <div className="mx-auto max-w-4xl px-4 py-6 md:py-10">
        <Link
          href="/menu"
          className="mb-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-lightText hover:underline"
        >
          <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          {t.menu.back}
        </Link>

        <article className="grid gap-6 md:grid-cols-2 md:gap-10">
          {photo ? (
            <Image
              src={photo}
              alt={title}
              width={640}
              height={640}
              priority
              className="aspect-square w-full rounded-2xl border border-line object-cover"
            />
          ) : (
            <div
              className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl border border-line bg-white md:aspect-square"
              aria-hidden="true"
            >
              <Image
                src="/assets/images/logo.png"
                alt=""
                width={160}
                height={142}
                priority
                className="h-auto w-28 opacity-50 md:w-44"
              />
            </div>
          )}

          <div className="self-center">
            <p className="text-sm font-medium uppercase tracking-wide text-lightText rtl:tracking-normal">
              {categoryName}
            </p>

            <h1 className="mt-1 font-heading text-4xl font-semibold leading-tight text-darkText md:text-5xl">
              {title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              {isSoldOut ? (
                <span className="rounded-full bg-red-50 px-4 py-1 text-base font-medium text-red-700">
                  {t.menu.soldOut}
                </span>
              ) : (
                <span className="rounded-full bg-darkBg px-4 py-1 text-xl font-medium text-lightText">
                  {price}
                </span>
              )}
              {average > 0 && (
                <span className="flex items-center gap-2 text-sm text-darkText/60">
                  <StarRating rating={average} />
                  ({ratings.length} {t.menu.reviews})
                </span>
              )}
            </div>

            <p className="mt-5 text-base leading-relaxed text-darkText/80 md:text-lg">
              {description}
            </p>

            {product.allergy && product.allergy.length > 0 && (
              <div className="mt-6 border-t border-line pt-5">
                <h2 className="text-sm font-medium text-darkText/60">{t.menu.allergyInfo}</h2>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {product.allergy.map((a) => (
                    <li
                      key={a}
                      className="flex h-9 min-w-9 items-center justify-center rounded-full border border-line bg-white px-3 text-sm font-medium text-lightText"
                    >
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </article>

        <section className="mt-12 md:mt-16" aria-labelledby="reviews-heading">
          <h2
            id="reviews-heading"
            className="mb-5 font-heading text-3xl font-semibold text-darkText md:text-4xl"
          >
            {t.menu.ratingsAndReviews}
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-line bg-white p-5">
              <h3 className="mb-4 font-heading text-2xl font-semibold text-darkText">
                {t.menu.leaveReview}
              </h3>
              <RatingForm productId={product.id} onRatingSubmitted={() => router.refresh()} />
            </div>

            <div className="rounded-2xl border border-line bg-white p-5">
              <h3 className="mb-4 font-heading text-2xl font-semibold text-darkText">
                {t.menu.customerReviews}
              </h3>
              <RatingsList ratings={ratings} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductClient;
