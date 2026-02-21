import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import API from "../api/axios";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { TrendingUp, Filter, Play, Zap } from "lucide-react";

import siteConfig from "../config/siteConfig";
import AdSense from "../components/AdSense";

const GENRES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Thriller",
  "Romance",
  "Animation",
  "South",
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
        console.error(err);
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
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [currentPage, selectedGenre, sortBy, search]);

  const heroMovie = trending[0];

  return (
    <div className="relative min-h-screen bg-[#050505] text-white font-sans">
      <Helmet>
        <title>{siteConfig.seo.defaultTitle}</title>
        <meta name="description" content={siteConfig.seo.defaultDescription} />
        <meta
          name="keywords"
          content="movie reviews, film ratings, Bollywood reviews, Hollywood reviews, web series ratings"
        />
        <meta
          property="og:title"
          content="AtoZ Movies | Honest Reviews & Ratings"
        />
        <meta
          property="og:description"
          content="Explore trending Bollywood and Hollywood movies with reviews, ratings and technical details."
        />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Split Hero Section */}
      {trending.length >= 3 && !search && (
        <section className="px-6 md:px-10 py-8 bg-[#050505] border-b border-neutral-800">
          <div className="grid md:grid-cols-3 gap-6 h-auto md:h-[75vh]">
            {/* LEFT: Main Featured Movie */}
            <div className="relative md:col-span-2 rounded-2xl overflow-hidden group">
              <img
                src={trending[0].poster}
                alt={trending[0].title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/40" />

              <div className="relative z-20 h-full flex items-center p-6 md:p-12">
                <div className="max-w-xl">
                  <span className="bg-red-600 text-white text-[10px] px-3 py-1 rounded-full font-bold uppercase tracking-widest inline-block mb-4">
                    🔥 Featured
                  </span>

                  <h1 className="text-3xl md:text-5xl font-black mb-4">
                    {trending[0].title}
                  </h1>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-300 mb-4">
                    {trending[0].releaseDate && (
                      <span>
                        {new Date(trending[0].releaseDate).getFullYear()}
                      </span>
                    )}
                    <span className="text-yellow-400 font-bold">
                      ⭐ {trending[0].rating?.toFixed(1) || "N/A"}
                    </span>
                  </div>

                  <p className="text-neutral-300 text-sm md:text-base line-clamp-3 mb-6">
                    {trending[0].description}
                  </p>

                  <Link
                    to={`/movie/${trending[0].slug || trending[0]._id}`}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-md transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* RIGHT: Two Smaller Movies */}
            <div className="grid grid-rows-2 gap-6">
              {trending.slice(1, 3).map((movie) => (
                <div
                  key={movie._id}
                  className="relative rounded-2xl overflow-hidden group"
                >
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />

                  <div className="relative z-20 h-full flex flex-col justify-end p-6">
                    <h3 className="text-xl font-bold mb-2">{movie.title}</h3>

                    <div className="flex items-center gap-3 text-xs text-neutral-300 mb-3">
                      {movie.releaseDate && (
                        <span>{new Date(movie.releaseDate).getFullYear()}</span>
                      )}
                      <span className="text-yellow-400 font-bold">
                        ⭐ {movie.rating?.toFixed(1) || "N/A"}
                      </span>
                    </div>

                    <p className="text-neutral-400 text-xs line-clamp-2 mb-4">
                      {movie.description}
                    </p>

                    <Link
                      to={`/movie/${movie.slug || movie._id}`}
                      className="bg-white text-black text-xs font-bold px-4 py-2 rounded-md w-fit hover:bg-red-600 hover:text-white transition-all"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* TOP AD: Poster Ad (9153983942) */}
        <AdSense slot={siteConfig.ads.slots.homeTop} />

        {/* Trending Grid */}
        {!search && (
          <section className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="text-red-600 w-6 h-6" />
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">
                Trending <span className="text-red-600">AtoZ</span>
              </h2>
              <div className="h-px flex-1 bg-neutral-800 ml-4"></div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {trendingLoading
                ? Array(5)
                    .fill(0)
                    .map((_, i) => <SkeletonCard key={i} />)
                : trending.map((m) => <MovieCard key={m._id} movie={m} />)}
            </div>
          </section>
        )}

        {/* IN-ARTICLE AD (2125541166) */}
        <AdSense slot="2125541166" format="fluid" />

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10 bg-neutral-900/40 p-4 rounded-xl border border-neutral-800">
          <div className="flex gap-2">
            <select
              className="bg-black border border-neutral-700 text-[11px] font-bold uppercase p-2 rounded focus:border-red-600 outline-none"
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Genres</option>
              {GENRES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            <select
              className="bg-black border border-neutral-700 text-[11px] font-bold uppercase p-2 rounded focus:border-red-600 outline-none"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">Newest First</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
          <span className="text-[10px] font-black text-neutral-500 tracking-[0.2em] uppercase">
            AtoZ Movies Database
          </span>
        </div>

        {/* Main Library Grid */}
        <section>
          <h2 className="text-xl font-black mb-8 uppercase tracking-widest border-l-4 border-red-600 pl-4">
            {search ? `Search Results: ${search}` : "Latest Uploads"}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {loading
              ? Array(12)
                  .fill(0)
                  .map((_, i) => <SkeletonCard key={i} />)
              : movies.map((m) => <MovieCard key={m._id} movie={m} />)}
          </div>

          {/* AUTORELAXED AD (5985180530) */}
          <AdSense slot="5985180530" format="autorelaxed" />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-16">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`w-10 h-10 rounded font-black text-xs transition-all ${
                      currentPage === page
                        ? "bg-red-600 text-white"
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

      {/* SEO FOOTER */}
      <footer className="bg-black border-t border-neutral-900 py-10 px-6 text-center">
        <div className="flex items-center justify-center gap-1 mb-4">
          <span className="text-white font-black text-xl tracking-tighter">
            AtoZ
          </span>
          <span className="bg-red-600 text-white px-1 rounded-sm font-black text-xl tracking-tighter italic">
            MOVIES
          </span>
        </div>
        <p className="text-[9px] text-neutral-600 max-w-2xl mx-auto uppercase leading-loose font-bold">
          AtoZMovies.com is a movie indexing service. We provide details,
          ratings, and technical specs for educational purposes only. Download
          Bollywood, Hollywood, and South Hindi Dubbed movies in multiple
          qualities.
        </p>
      </footer>
    </div>
  );
};

export default Home;
