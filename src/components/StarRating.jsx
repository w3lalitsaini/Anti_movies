import React, { useState } from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating = 0, onRate, readOnly = false }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`w-6 h-6 transition-colors ${
                        star <= (hover || rating)
                            ? 'text-accent fill-accent'
                            : 'text-neutral-600'
                    } ${!readOnly ? 'cursor-pointer' : ''}`}
                    onClick={() => !readOnly && onRate && onRate(star)}
                    onMouseEnter={() => !readOnly && setHover(star)}
                    onMouseLeave={() => !readOnly && setHover(0)}
                />
            ))}
        </div>
    );
};

export default StarRating;
