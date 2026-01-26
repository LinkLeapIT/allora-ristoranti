import React from 'react';

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<span key={i}>★</span>);
    } else if (i - 0.5 <= rating) {
      stars.push(<span key={i}>½</span>);
    } else {
      stars.push(<span key={i} className="text-gray-300 dark:text-gray-600">☆</span>);
    }
  }

  return <div className="flex text-yellow-400">{stars}</div>;
};

export default StarRating;
