import Image from 'next/image';
import { Rating } from '@/types';
import StarRating from '@/components/ui/StarRating';

interface RatingsListProps {
  ratings: Rating[];
}

const RatingsList: React.FC<RatingsListProps> = ({ ratings }) => {
  if (!ratings || ratings.length === 0) {
    return <p>No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {ratings.map((rating) => (
        <div key={rating.id} className="p-4 border rounded-lg shadow-sm">
          <div className="flex items-center mb-2">
            <Image 
              src={rating.userImage || '/assets/images/avatar.png'} 
              alt={rating.userName || 'User'} 
              className="w-10 h-10 rounded-full mr-4"
              width={40} 
              height={40} 
            />
            <div>
              <p className="font-bold">{rating.userName}</p>
              <StarRating rating={rating.rating} />
            </div>
          </div>
          <p>{rating.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default RatingsList;
