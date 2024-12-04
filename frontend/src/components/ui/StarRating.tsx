import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '../../lib/utils';

interface StarRatingProps {
  value: number;
  onChange: (rating: number) => void;
  disabled?: boolean;
}

export function StarRating({ value, onChange, disabled }: StarRatingProps) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          disabled={disabled}
          onClick={() => onChange(rating)}
          className={cn(
            'focus:outline-none',
            disabled && 'cursor-not-allowed opacity-50'
          )}
        >
          <Star
            className={cn(
              'h-6 w-6',
              rating <= value ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            )}
          />
        </button>
      ))}
    </div>
  );
}