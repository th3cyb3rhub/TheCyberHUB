'use client';

import { useState } from 'react';

interface RatingStarsProps {
    rating: number;
    size?: 'sm' | 'md' | 'lg';
    interactive?: boolean;
    onChange?: (rating: number) => void;
}

export function RatingStars({ rating, size = 'md', interactive = false, onChange }: RatingStarsProps) {
    const [hoverRating, setHoverRating] = useState(0);

    const sizeClasses = {
        sm: 'w-3 h-3',
        md: 'w-4 h-4',
        lg: 'w-5 h-5',
    };

    const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

    const handleClick = (value: number) => {
        if (interactive && onChange) {
            onChange(value);
        }
    };

    const handleMouseEnter = (value: number) => {
        if (interactive) {
            setHoverRating(value);
        }
    };

    const handleMouseLeave = () => {
        if (interactive) {
            setHoverRating(0);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent, value: number) => {
        if (interactive && onChange) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onChange(value);
            }
        }
    };

    return (
        <div
            className="flex items-center gap-0.5"
            onMouseLeave={handleMouseLeave}
            role={interactive ? 'radiogroup' : 'img'}
            aria-label={interactive ? 'Rating selection' : `Rating: ${rating.toFixed(1)} out of 5 stars`}
        >
            {[1, 2, 3, 4, 5].map((value) => {
                const filled = value <= Math.floor(displayRating);
                const partial = !filled && value === Math.ceil(displayRating) && displayRating % 1 !== 0;
                const fillPercent = partial ? (displayRating % 1) * 100 : 0;
                const isSelected = interactive && value === Math.round(rating);

                return (
                    <button
                        key={value}
                        type="button"
                        className={`relative ${interactive ? 'cursor-pointer hover:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1 rounded' : 'cursor-default'}`}
                        onClick={() => handleClick(value)}
                        onMouseEnter={() => handleMouseEnter(value)}
                        onKeyDown={(e) => handleKeyDown(e, value)}
                        disabled={!interactive}
                        role={interactive ? 'radio' : undefined}
                        aria-checked={interactive ? isSelected : undefined}
                        aria-label={`${value} star${value !== 1 ? 's' : ''}`}
                        tabIndex={interactive ? 0 : -1}
                    >
                        {/* Empty star (background) */}
                        <svg
                            className={`${sizeClasses[size]} text-muted-foreground/30`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            aria-hidden="true"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>

                        {/* Filled star (overlay) */}
                        {(filled || partial) && (
                            <svg
                                className={`${sizeClasses[size]} text-yellow-400 absolute inset-0`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                style={partial ? { clipPath: `inset(0 ${100 - fillPercent}% 0 0)` } : undefined}
                                aria-hidden="true"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        )}
                    </button>
                );
            })}

            {!interactive && (
                <span className={`ml-1 ${size === 'sm' ? 'text-xs' : 'text-sm'} text-muted-foreground`} aria-hidden="true">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
}
