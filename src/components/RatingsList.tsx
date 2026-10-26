'use client';

import Image from 'next/image';
import { Rating } from '@/types';
import StarRating from '@/components/ui/StarRating';
import { useI18n } from '@/i18n/I18nProvider';

interface RatingsListProps {
  ratings: Rating[];
}

const RatingsList: React.FC<RatingsListProps> = ({ ratings }) => {
  const { t } = useI18n();

  if (!ratings || ratings.length === 0) {
    return <p className="text-darkText/60">{t.menu.noReviews}</p>;
  }

  return (
    <ul className="space-y-3">
      {ratings.map((rating) => (
        <li key={rating.id} className="rounded-xl border border-line p-4">
          <div className="mb-2 flex items-center gap-3">
            <Image
              src={rating.userImage || '/assets/images/avatar.png'}
              alt=""
              className="h-10 w-10 rounded-full object-cover"
              width={40}
              height={40}
            />
            <div className="min-w-0">
              <p className="truncate font-medium text-darkText">{rating.userName}</p>
              <StarRating rating={rating.rating} />
            </div>
          </div>
          {rating.comment && <p className="text-darkText/80">{rating.comment}</p>}
        </li>
      ))}
    </ul>
  );
};

export default RatingsList;
