import { ProductRatingSummary } from '@/types';

const RatingDisplay = ({ summary }: { summary: ProductRatingSummary }) => {
  return (
    <div className="flex items-center">
      <span className="text-lg font-bold">{summary.average.toFixed(1)}</span>
      <span className="ml-2 text-sm text-gray-500">({summary.count} ratings)</span>
    </div>
  );
};

export default RatingDisplay;
