import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { Bookmark, Zap, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Watchlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchWatchlist = async () => {
      try {
        const { data } = await API.get("/auth/watchlist");
        setMovies(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchWatchlist();
  }, [user, navigate]);

  return (
    <div className="bg-[#050505] min-h-screen text-neutral-300 font-sans pb-20">
      <Helmet>
        <title>My Watchlist - AtoZ Movies Network</title>
      </Helmet>

      {/* HEADER SECTION */}
      <div className="bg-blue-600 py-2 text-center text-[10px] font-black text-white uppercase tracking-[0.3em] sticky top-0 z-50">
        PERSONAL QUEUE • PENDING WATCHLIST • TOTAL: {movies.length}
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-12">
        <div className="flex items-center justify-between mb-10 border-l-4 border-blue-600 pl-6">
          <div>
            <nav className="text-[10px] text-neutral-600 uppercase mb-2 flex gap-2 font-bold">
              <Link to="/" className="hover:text-red-500 transition-colors">
                AtoZ HOME
              </Link>{" "}
              /{" "}
              <Link
                to="/profile"
                className="hover:text-red-500 transition-colors"
              >
                PROFILE
              </Link>{" "}
              /<span className="text-blue-500">WATCHLIST</span>
            </nav>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter italic flex items-center gap-4">
              <Bookmark className="w-8 h-8 md:w-12 md:h-12 text-blue-600 fill-current" />
              My Watchlist
            </h1>
          </div>
          <Link
            to="/profile"
            className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase text-neutral-500 hover:text-white transition-colors border border-neutral-800 px-4 py-2 rounded"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Profile
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {loading ? (
            Array(12)
              .fill(0)
              .map((_, i) => <SkeletonCard key={i} />)
          ) : movies.length > 0 ? (
            movies.map((m) => <MovieCard key={m._id} movie={m} />)
          ) : (
            <div className="col-span-full py-32 text-center bg-neutral-900/10 border border-dashed border-neutral-800 rounded-3xl">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-neutral-900 rounded-full">
                  <Bookmark className="w-12 h-12 text-neutral-700" />
                </div>
              </div>
              <h3 className="text-xl font-black text-white uppercase italic mb-2 tracking-tight">
                Your queue is empty
              </h3>
              <p className="text-neutral-500 text-xs font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">
                You haven't added any movies to watch later. Start building your
                personal queue now.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all italic shadow-lg shadow-blue-900/20"
              >
                <Zap className="w-3.5 h-3.5 fill-current" /> Explore Movies
              </Link>
            </div>
          )}
        </div>

        <div className="mt-20 text-center text-[10px] font-bold text-neutral-800 uppercase tracking-widest border-t border-neutral-900 pt-10">
          AtoZ Movies Database Archive &bull; Secured Connection Active
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
