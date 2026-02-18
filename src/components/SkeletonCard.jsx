import React from 'react';

const SkeletonCard = () => {
    return (
        <div className="rounded-xl overflow-hidden bg-secondary border border-neutral-800 animate-pulse">
            <div className="aspect-[2/3] bg-neutral-800" />
            <div className="p-3 space-y-2">
                <div className="h-4 bg-neutral-700 rounded w-3/4" />
                <div className="h-3 bg-neutral-800 rounded w-1/2" />
            </div>
        </div>
    );
};

export default SkeletonCard;
