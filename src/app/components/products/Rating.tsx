import React from 'react';
import { Rating } from '@/types';
import StarRating from '../ui/StarRating';

interface RatingProps {
  ratings: Rating[];
}

const AverageRating: React.FC<RatingProps> = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return <p className="text-sm text-gray-500 dark:text-gray-400">No ratings yet</p>;
  }

  const averageRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;

  return (
    <div className="flex items-center space-x-2">
      <StarRating rating={averageRating} />
      <p className="text-sm text-gray-600 dark:text-gray-300">
        ({ratings.length} {ratings.length === 1 ? 'review' : 'reviews'})
      </p>
    </div>
  );
};

export default AverageRating;
