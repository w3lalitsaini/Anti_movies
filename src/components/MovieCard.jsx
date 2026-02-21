import React from "react";
import { Link } from "react-router-dom";
import { Star, PlayCircle } from "lucide-react";

const MovieCard = ({ movie }) => {
  const movieIdentifier = movie.slug || movie._id;
  const releaseYear = movie.releaseDate
    ? new Date(movie.releaseDate).getFullYear()
    : "";

  return (
    <Link
      to={`/movie/${movieIdentifier}`}
      className="group relative rounded-xl overflow-hidden bg-secondary border border-neutral-800 hover:border-primary transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-primary/20"
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={
            movie.poster ||
            `https://via.placeholder.com/300x450/1a1a1a/e50914?text=${encodeURIComponent(
              movie.title,
            )}`
          }
          alt={`${movie.title} poster`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/300x450/1a1a1a/e50914?text=${encodeURIComponent(
              movie.title,
            )}`;
          }}
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-sm text-neutral-300 line-clamp-3 mb-3">
            {movie.description}
          </p>

          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white">
            <PlayCircle className="w-4 h-4" />
            View Details
          </div>
        </div>

        {/* Optional Trending Badge */}
        {movie.isTrending && (
          <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] px-3 py-1 rounded-full font-bold shadow-lg">
            🔥 Trending
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-white truncate">
          {movie.title} {releaseYear && `(${releaseYear})`}
        </h3>

        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-accent fill-accent" />
            <span className="text-sm text-accent font-bold">
              {movie.rating?.toFixed(1) || "N/A"}
            </span>
          </div>

          <div className="flex gap-1 flex-wrap">
            {movie.genre?.slice(0, 2).map((g) => (
              <span
                key={g}
                className="text-xs bg-neutral-800 text-neutral-300 px-2 py-0.5 rounded-full"
              >
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
