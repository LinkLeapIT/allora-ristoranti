'use client';

import { useState, useTransition } from 'react';
import { useAuth } from '@/app/context/auth';
import { addRating } from '@/actions/ratings';

const RatingForm = ({ productId, onRatingSubmitted }: { productId: string, onRatingSubmitted: () => void }) => {
  const { currentUser } = useAuth();
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || rating === 0) return;

    startTransition(async () => {
      const result = await addRating(productId, rating, comment);
      if (result.success) {
        setRating(1);
        setComment('');
        onRatingSubmitted();
      } else {
        alert(result.error);
      }
    });
  };

  if (!currentUser) {
    return <p>Please log in to leave a rating.</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex items-center mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onClick={() => setRating(star)}
              className={`w-8 h-8 cursor-pointer ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Review</label>
        <textarea 
          id="comment"
          value={comment} 
          onChange={(e) => setComment(e.target.value)} 
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <button 
        type="submit" 
        disabled={isPending || rating === 0}
        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {isPending ? 'Submitting...' : 'Submit Rating'}
      </button>
    </form>
  );
};

export default RatingForm;
