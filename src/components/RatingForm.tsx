'use client';

import { useState, useTransition } from 'react';
import Link from 'next/link';
import { Star } from 'lucide-react';
import { useAuth } from '@/app/context/auth';
import { addRating } from '@/actions/ratings';
import { useI18n } from '@/i18n/I18nProvider';

const RatingForm = ({ productId, onRatingSubmitted }: { productId: string, onRatingSubmitted: () => void }) => {
  const { currentUser } = useAuth();
  const { t } = useI18n();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || rating === 0) return;
    setError('');

    startTransition(async () => {
      const result = await addRating(productId, rating, comment);
      if (result.success) {
        setRating(5);
        setComment('');
        onRatingSubmitted();
      } else {
        setError(result.error || t.menu.reviewError);
      }
    });
  };

  if (!currentUser) {
    return (
      <p className="text-darkText/70">
        <Link href="/login" className="font-medium text-lightText underline">
          {t.menu.loginToReview}
        </Link>
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <fieldset>
        <legend className="mb-1 text-sm font-medium text-darkText">{t.menu.yourRating}</legend>
        <div className="flex gap-1" role="radiogroup">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              role="radio"
              aria-checked={rating === star}
              aria-label={`${star} / 5`}
              onClick={() => setRating(star)}
              className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-darkBg"
            >
              <Star
                className={`h-7 w-7 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-darkText/25'}`}
              />
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="comment" className="mb-1 block text-sm font-medium text-darkText">
          {t.menu.yourReview}
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="block w-full rounded-xl border border-line bg-white p-3 text-base text-darkText focus:border-lightText focus:outline-none focus:ring-2 focus:ring-lightText/30"
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="inline-flex h-11 items-center justify-center rounded-full bg-lightText px-6 text-sm font-medium text-white transition-colors hover:bg-lightText/90 disabled:opacity-60"
      >
        {isPending ? t.menu.submitting : t.menu.submitReview}
      </button>
    </form>
  );
};

export default RatingForm;
