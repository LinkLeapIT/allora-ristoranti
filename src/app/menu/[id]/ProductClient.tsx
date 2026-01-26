'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import { Products, Rating } from '@/types';
import RatingsList from '@/components/RatingsList';
import RatingForm from '@/components/RatingForm';
import StarRating from '@/components/ui/StarRating';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';

interface ProductClientProps {
  product: Products;
}

const ProductClient: React.FC<ProductClientProps> = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [quantity, setQuantity] = useState<number>(1);
  const [ratings, setRatings] = useState<Rating[]>(product.ratings || []);
  const [averageRating, setAverageRating] = useState<number>(0);
  const isSoldOut = product.status === 'unavailable';

  useEffect(() => {
    if (ratings.length > 0) {
      const total = ratings.reduce((acc: any, rating: any) => acc + rating.rating, 0);
      setAverageRating(total / ratings.length);
    }
  }, [ratings]);

  const handleRatingSubmitted = () => {
    router.refresh();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div className="relative flex items-center justify-center bg-darkBg rounded-lg overflow-hidden shadow-lg">
          <Image
            src={product.images?.[0] || '/allor-bbq.jpg'}
            alt="Product Image"
            width={600}
            height={600}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-4 right-4">
            <Badge
              variant={
                product.status === "available"
                  ? "success"
                  : product.status === "hidden"
                  ? "secondary"
                  : "destructive"
              }
              className="text-lg px-4 py-2"
            >
              {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-lightText mb-2">
              {product?.title}
            </h1>
            {averageRating > 0 && (
              <div className="flex items-center gap-2">
                <StarRating rating={averageRating} />
                <span className="text-lg text-gray-400">({ratings.length} reviews)</span>
              </div>
            )}
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            {product?.description}
          </p>
          
          {!isSoldOut && product.allergy && product.allergy.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-lightText mb-3">Allergy Information</h2>
              <div className="flex flex-wrap gap-3">
                {product.allergy.map((option) => (
                  <Badge key={option} variant="outline" className="text-md px-3 py-1">
                    {option}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-lightText mb-8 text-center">Ratings & Reviews</h2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-darkBg p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-lightText mb-4">Leave a Review</h3>
            <RatingForm
              productId={product.id}
              onRatingSubmitted={handleRatingSubmitted}
            />
          </div>
          <div className="bg-darkBg p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-lightText mb-4">Customer Reviews</h3>
            <RatingsList ratings={ratings} />
          </div>
        </div>
      </div>

      <Toaster />
    </div>
  );
};

export default ProductClient;
