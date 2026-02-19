import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import API from "../api/axios";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { TrendingUp, Filter, Play } from "lucide-react";

const GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Romance",
  "Animation",
  "Documentary",
];

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);
  const [trendingLoading, setTrendingLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await API.get("/movies/trending");
        setTrending(data);
      } catch (err) {
        console.error("Trending fetch error:", err);
      } finally {
        setTrendingLoading(false);
      }
    };
    fetchTrending();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: currentPage,
          limit: 12,
          ...(selectedGenre && { genre: selectedGenre }),
          ...(sortBy && { sort: sortBy }),
          ...(search && { search }),
        });
        const { data } = await API.get(`/movies?${params}`);
        setMovies(data.movies);
        setTotalPages(data.totalPages);
      } catch (err) {
        console.error("Movies fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [currentPage, selectedGenre, sortBy, search]);

  const heroMovie = trending[0];

  // Reusable Ad Slot Component
  const AdSlot = ({ label, className = "" }) => (
    <div
      className={`glass border border-dashed border-neutral-700 flex flex-col items-center justify-center bg-neutral-900/40 overflow-hidden ${className}`}
    >
      <span className="text-[9px] uppercase tracking-[0.2em] text-neutral-600 mb-1">
        Sponsored Content
      </span>
      <span className="text-xs font-mono text-neutral-500">{label}</span>
    </div>
  );

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-white">
      <Helmet>
        <title>
          {heroMovie
            ? `Watch ${heroMovie.title} Online | CineRate HD Movies`
            : "CineRate | Watch Latest Bollywood, Hollywood & Dual Audio Movies"}
        </title>
        <meta
          name="description"
          content={
            heroMovie
              ? `Stream ${heroMovie.title} in HD. ${heroMovie.description?.substring(0, 150)}...`
              : "Stream the latest movies in HD. Download Bollywood, Hollywood, and Tamil movies with dual audio support."
          }
        />
        {/* OpenGraph for Social Media Sharing */}
        <meta
          property="og:title"
          content={heroMovie?.title || "CineRate - Latest Movies"}
        />
        <meta
          property="og:description"
          content={
            heroMovie?.description || "Watch the latest movies in HD quality."
          }
        />
        <meta
          property="og:image"
          content={heroMovie?.poster || "/default-banner.jpg"}
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* FIXED SIDE ADS (Hiding handled by padding below) */}
      <aside className="hidden xl:block fixed left-4 top-28 w-[160px] h-[calc(100vh-140px)] z-10">
        <AdSlot label="Left Skyscraper" className="h-full w-full rounded-lg" />
      </aside>
      <aside className="hidden xl:block fixed right-4 top-28 w-[160px] h-[calc(100vh-140px)] z-10">
        <AdSlot label="Right Skyscraper" className="h-full w-full rounded-lg" />
      </aside>

      {/* Hero Section */}
      {heroMovie && (
        <div className="relative h-[80vh] w-full overflow-hidden">
          <img
            src={heroMovie.poster}
            alt={heroMovie.title}
            className="w-full h-full object-cover transform scale-105 animate-slow-zoom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

          <div className="absolute bottom-20 left-6 md:left-20 lg:left-32 max-w-2xl z-20">
            <div className="flex items-center gap-2 mb-4">
              <span className="bg-primary/20 text-primary border border-primary/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter">
                #1 Trending This Week
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight leading-none italic uppercase">
              {heroMovie.title}
            </h1>
            <p className="text-neutral-300 text-lg mb-8 line-clamp-3 font-medium max-w-lg">
              {heroMovie.description}
            </p>
            <div className="flex flex-wrap gap-4">
              // Find this line inside your Hero Section (around line 140)
              <Link
                to={`/movie/${heroMovie.slug || heroMovie._id}`} // Updated to use slug first
                className="bg-primary hover:bg-yellow-400 text-black font-bold px-10 py-4 rounded-full flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <Play className="fill-current w-5 h-5" /> WATCH NOW
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      {/* xl:px-[200px] provides the necessary gutter so content doesn't touch the side ads */}
      <main className="max-w-[1600px] mx-auto px-6 xl:px-[200px] py-12 relative z-20">
        {/* AD SLOT: Top Leaderboard */}
        <AdSlot
          label="728x90 Top Leaderboard"
          className="w-full h-24 mb-16 rounded-2xl shadow-2xl"
        />

        {/* Trending Section */}
        {!search && (
          <section className="mb-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
                <TrendingUp className="text-primary w-8 h-8" />
                Trending <span className="text-primary italic">Now</span>
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {trendingLoading
                ? Array(5)
                    .fill(0)
                    .map((_, i) => <SkeletonCard key={i} />)
                : trending.map((m) => <MovieCard key={m._id} movie={m} />)}
            </div>
          </section>
        )}

        {/* AD SLOT: Mid-Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <AdSlot label="Native Content Ad" className="h-40 rounded-2xl" />
          <AdSlot label="Marketing Promo" className="h-40 rounded-2xl" />
        </div>

        {/* Discovery Section (Filters) */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-neutral-900/50 p-6 rounded-3xl border border-neutral-800">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-neutral-800 rounded-2xl">
              <Filter className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="font-bold text-white leading-none">
                Filter Library
              </h4>
              <p className="text-xs text-neutral-500 mt-1">
                Discover by genre or release
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <select
              className="bg-neutral-800 border-none text-white rounded-xl px-5 py-3 focus:ring-2 focus:ring-primary cursor-pointer transition-all"
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Categories</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              className="bg-neutral-800 border-none text-white rounded-xl px-5 py-3 focus:ring-2 focus:ring-primary cursor-pointer transition-all"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Sort: Default</option>
              <option value="rating">Top Rated</option>
              <option value="newest">Latest Uploads</option>
            </select>
          </div>
        </div>

        {/* Movie Grid */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-3xl font-black uppercase tracking-tighter">
              {search ? `Search: ${search}` : "Library"}
            </h2>
            <div className="h-[2px] flex-1 bg-neutral-800" />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {loading
              ? Array(12)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              : movies.map((m) => <MovieCard key={m._id} movie={m} />)}
          </div>

          {/* AD SLOT: Bottom Leaderboard */}
          <AdSlot
            label="970x250 Large Ad"
            className="w-full h-64 mt-20 mb-10 rounded-3xl"
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-3 mt-12 pb-20">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 400, behavior: "smooth" });
                    }}
                    className={`w-12 h-12 rounded-2xl font-bold transition-all ${
                      currentPage === page
                        ? "bg-primary text-black scale-110 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                        : "bg-neutral-900 text-neutral-500 hover:bg-neutral-800"
                    }`}
                  >
                    {page}
                  </button>
                ),
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Home;
