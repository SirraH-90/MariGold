import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  count?: number;
  className?: string;
}

export function StarRating({ rating, size = 16, showValue = false, count, className = '' }: StarRatingProps) {
  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => {
          const fillPercent = Math.max(0, Math.min(1, rating - (star - 1)));
          return (
            <div key={star} className="relative" style={{ width: size, height: size }}>
              <Star
                size={size}
                className="absolute inset-0 text-beige-dark"
                strokeWidth={1.5}
              />
              <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent * 100}%` }}>
                <Star
                  size={size}
                  className="text-gold fill-gold"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          );
        })}
      </div>
      {showValue && <span className="text-sm text-brown-light font-medium">{rating.toFixed(1)}</span>}
      {count !== undefined && (
        <span className="text-sm text-brown-light/60">({count})</span>
      )}
    </div>
  );
}
