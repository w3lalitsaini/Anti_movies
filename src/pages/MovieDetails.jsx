import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import StarRating from "../components/StarRating";
import { useAuth } from "../context/AuthContext";
import {
  Download,
  Info,
  Play,
  ChevronDown,
  Users,
  MessageSquare,
  Copy,
  Check,
  Heart,
  Bookmark,
  SendHorizontal,
  Zap,
  Share2,
  Facebook,
  Twitter,
  Send,
  AlertCircle,
  ShieldCheck,
  ZapOff,
  Star,
  Film,
  Globe,
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import AdSense from "../components/AdSense";
import siteConfig from "../config/siteConfig";

const MovieDetails = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  // Interactions State
  const [isFavorite, setIsFavorite] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchFullDetails = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/movies/${slug}`);
        setMovie(data);
        document.title = `${data.title} (${new Date(data.releaseDate).getFullYear()}) Download Hindi Audio - AtoZ Movies`;

        if (user) {
          // FIX: Convert to String for comparison
          setIsFavorite(
            user.favorites?.some((m) => String(m._id || m) === data._id),
          );
          setInWishlist(
            user.watchlist?.some((m) => String(m._id || m) === data._id),
          );
        }

        const reviewRes = await API.get(`/reviews/${data._id}`);
        setReviews(reviewRes.data);
      } catch (err) {
        toast.error("Failed to load movie details");
      } finally {
        setLoading(false);
      }
    };
    fetchFullDetails();
  }, [slug, user]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("Link copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const toggleFavorite = async () => {
    if (!user) return toast.info("Please login to add favorites");
    try {
      const { data } = await API.post(`/auth/favorites/${movie._id}`);
      setIsFavorite(!isFavorite);
      toast.success(data.message);
    } catch (err) {
      toast.error("Error updating favorites");
    }
  };

  const toggleWishlist = async () => {
    if (!user) return toast.info("Please login to use Wishlist");
    try {
      const { data } = await API.post(`/auth/watchlist/${movie._id}`);
      setInWishlist(!inWishlist);
      toast.success(data.message);
    } catch (err) {
      toast.error("Error updating watchlist");
    }
  };

  // Updated: Navigate to Random Movie on Download Click
  const handleDownloadClick = async () => {
    toast.info("Verifying secure tunnel...", {
      icon: <ShieldCheck className="text-green-500" />,
    });
    try {
      // Better approach: Ask backend for a random movie or handle empty list
      const { data } = await API.get("/movies?limit=10&page=1"); // Or specific endpoint

      const otherMovies = data.movies.filter((m) => m.slug !== slug);

      if (otherMovies.length > 0) {
        const randomMovie =
          otherMovies[Math.floor(Math.random() * otherMovies.length)];
        setTimeout(() => {
          navigate(`/movie/${randomMovie.slug}`);
          window.scrollTo(0, 0);
        }, 1200);
      } else {
        // Handle case where no other movies exist
        toast.error("No other movies found to redirect to.");
      }
    } catch (err) {
      toast.error("Server busy. Try again later.");
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("Login required to rate");
    if (userRating === 0) return toast.warning("Please select a star rating");

    setIsSubmitting(true);
    try {
      await API.post(`/reviews/${movie._id}`, {
        rating: userRating,
        comment: reviewText,
      });

      toast.success("Review submitted to AtoZ Community!");
      const reviewRes = await API.get(`/reviews/${movie._id}`);
      setReviews(reviewRes.data);
      setReviewText("");
      setUserRating(0);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <Zap className="w-12 h-12 text-red-600 animate-pulse mb-4" />
        <h2 className="text-white font-black tracking-widest uppercase italic">
          ATOZ LOADING...
        </h2>
      </div>
    );

  if (!movie)
    return (
      <div className="p-20 text-center bg-black text-white">
        Movie not found.
      </div>
    );

  return (
    <div className="bg-[#050505] min-h-screen text-neutral-300 font-sans pb-20 selection:bg-red-600 selection:text-white">
      <Helmet>
        <title>{`${movie.title} (${new Date(movie.releaseDate).getFullYear()}) Full Movie Download - AtoZ Movies`}</title>
        <meta
          name="description"
          content={`Download ${movie.title} in ${movie.quality} ${movie.language}. ${movie.description.substring(0, 150)}...`}
        />
        <meta
          name="keywords"
          content={`${movie.title}, download ${movie.title}, ${movie.language} movie, ${movie.quality} download, AtoZ Movies`}
        />
        <meta
          property="og:title"
          content={`${movie.title} (${new Date(movie.releaseDate).getFullYear()}) - AtoZ Movies`}
        />
        <meta
          property="og:description"
          content={movie.description.substring(0, 160)}
        />
        <meta property="og:image" content={movie.poster} />
        <meta property="og:type" content="video.movie" />
      </Helmet>

      {/* BRANDED ANNOUNCEMENT BAR */}
      <div className="bg-red-600 py-2 text-center text-[10px] font-black text-white uppercase tracking-[0.3em] sticky top-0 z-50">
        OFFICIAL {movie.quality} WEB-DL DOWNLOAD SOURCE • {movie.title} •{" "}
        {movie.language}
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        {/* BREADCRUMBS & MAIN TITLE */}
        <div className="mb-8 border-l-4 border-red-600 pl-6">
          <nav className="text-[10px] text-neutral-600 uppercase mb-2 flex gap-2 font-bold">
            <Link to="/" className="hover:text-red-500 transition-colors">
              AtoZ HOME
            </Link>{" "}
            /<span>{movie.genre?.[0]}</span> /
            <span className="text-red-500">{movie.title}</span>
          </nav>
          <h1 className="text-2xl md:text-5xl font-black text-white leading-tight uppercase tracking-tighter italic">
            Download {movie.title} ({new Date(movie.releaseDate).getFullYear()}){" "}
            {movie.language} {movie.quality}
          </h1>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: POSTER & ACTIONS */}
          <div className="lg:col-span-4 space-y-5">
            <div className="bg-[#111] p-1.5 border border-neutral-800 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] relative group overflow-hidden">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-auto rounded transition-transform duration-700 group-hover:scale-105"
              />
              {movie.isTrending && (
                <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] px-3 py-1.5 rounded font-black italic shadow-xl">
                  🔥 TOP TRENDING
                </div>
              )}
            </div>

            <div className="flex items-center justify-between bg-neutral-900/50 p-4 rounded-lg border border-neutral-800">
              <div className="text-center flex-1 border-r border-neutral-800">
                <p className="text-[10px] text-neutral-500 font-bold uppercase">
                  IMDb
                </p>
                <p className="text-white font-black text-lg">
                  ⭐ {movie.rating?.toFixed(1) || "7.5"}
                </p>
              </div>
              <div className="text-center flex-1">
                <p className="text-[10px] text-neutral-500 font-bold uppercase">
                  Votes
                </p>
                <p className="text-white font-black text-lg">
                  {movie.numReviews || "1.2k"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={toggleFavorite}
                className={`flex items-center justify-center gap-2 py-4 rounded font-black text-[10px] uppercase tracking-widest transition-all border ${isFavorite ? "bg-red-600 border-red-500 text-white" : "bg-neutral-900 border-neutral-800 hover:border-red-600 text-neutral-400"}`}
              >
                <Heart
                  className={`w-3.5 h-3.5 ${isFavorite ? "fill-current" : ""}`}
                />{" "}
                Favorite
              </button>
              <button
                onClick={toggleWishlist}
                className={`flex items-center justify-center gap-2 py-4 rounded font-black text-[10px] uppercase tracking-widest transition-all border ${inWishlist ? "bg-blue-600 border-blue-500 text-white" : "bg-neutral-900 border-neutral-800 hover:border-blue-600 text-neutral-400"}`}
              >
                <Bookmark
                  className={`w-3.5 h-3.5 ${inWishlist ? "fill-current" : ""}`}
                />{" "}
                Watchlist
              </button>
            </div>

            {movie.trailer && (
              <a
                href={movie.trailer}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-3 w-full py-5 bg-neutral-900 hover:bg-red-600 border border-neutral-800 hover:border-red-500 text-white rounded-lg font-black transition-all group italic uppercase text-xs tracking-widest"
              >
                <Play className="w-5 h-5 fill-current text-red-500 group-hover:text-white" />{" "}
                Watch Trailer
              </a>
            )}
          </div>

          {/* RIGHT COLUMN: DATA TABLE */}
          <div className="lg:col-span-8 space-y-8">
            <AdSense slot={siteConfig.ads.slots.movieDetailsTechnical} />

            <div className="bg-[#0c0c0c] border border-neutral-800 rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-neutral-900/50 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
                <h3 className="text-xs font-black text-white uppercase flex items-center gap-2 italic tracking-widest">
                  <Info className="w-4 h-4 text-red-600" /> Technical Details
                </h3>
                <span className="text-[10px] font-black text-red-600 bg-red-600/10 px-2 py-1 rounded">
                  VERIFIED CONTENT
                </span>
              </div>
              <div className="grid md:grid-cols-2 text-[13px]">
                {[
                  {
                    k: "Director",
                    v: movie.director,
                    icon: <Users className="w-3 h-3" />,
                  },
                  {
                    k: "Audio",
                    v: movie.language,
                    icon: <Globe className="w-3 h-3" />,
                  },
                  {
                    k: "Runtime",
                    v: movie.runtime,
                    icon: <Zap className="w-3 h-3" />,
                  },
                  {
                    k: "Release",
                    v: new Date(movie.releaseDate).toDateString(),
                    icon: <Film className="w-3 h-3" />,
                  },
                  {
                    k: "Quality",
                    v: movie.quality,
                    icon: <Star className="w-3 h-3" />,
                  },
                  {
                    k: "Genres",
                    v: movie.genre?.join(", "),
                    icon: <ShieldCheck className="w-3 h-3" />,
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between p-5 border-b border-neutral-800/40 hover:bg-red-600/[0.02] transition-colors"
                  >
                    <span className="text-neutral-500 font-black uppercase text-[10px] tracking-widest flex items-center gap-2">
                      {item.icon} {item.k}:
                    </span>
                    <span className="text-white font-bold ml-4">
                      {item.v || "N/A"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/20 p-8 rounded-lg border border-dashed border-neutral-800 relative">
              <div className="absolute -top-3 left-6 bg-[#050505] px-3 text-[10px] font-black text-red-600 tracking-widest uppercase italic">
                Synopsis / Plot
              </div>
              <p className="leading-relaxed text-neutral-400 text-base font-medium italic">
                "{movie.description}"
              </p>
            </div>

            {/* CAST SECTION */}
            <div className="space-y-4">
              <h4 className="text-white font-black text-xs uppercase tracking-widest italic flex items-center gap-2">
                <Users className="w-4 h-4 text-red-600" /> Leading Cast Members
              </h4>
              <div className="flex flex-wrap gap-3">
                {movie.cast?.map((actor, idx) => (
                  <div
                    key={idx}
                    className="bg-neutral-900 border border-neutral-800 px-4 py-2 rounded-full text-xs font-bold text-neutral-300"
                  >
                    {actor.actorName}{" "}
                    <span className="text-neutral-600 mx-1">as</span>{" "}
                    <span className="text-red-500">
                      {actor.characterName || "Lead"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SCREENSHOTS */}

        {movie.screenshots?.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] flex-1 bg-neutral-900"></div>
              <h3 className="text-red-600 font-black uppercase text-xs tracking-[0.5em] italic">
                PREVIEW SCREENSHOTS
              </h3>
              <div className="h-[2px] flex-1 bg-neutral-900"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {movie.screenshots.map((img, i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg border border-neutral-800 shadow-xl group"
                >
                  <img
                    src={img}
                    alt="AtoZ Preview"
                    className="w-full grayscale group-hover:grayscale-0 transition-all duration-700 cursor-zoom-in"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        <AdSense slot={siteConfig.ads.slots.movieDetailsReviews} />

        <AdSense slot={siteConfig.ads.slots.movieDetailsReviews} />
        {/* DOWNLOAD SECTION */}
        <div className="mt-20 bg-[#0c0c0c] border-2 border-red-600/20 rounded-3xl p-8 md:p-14 shadow-[0_0_80px_rgba(220,38,38,0.1)] relative text-center">
          <div className="flex flex-col items-center justify-center gap-3 mb-12">
            <Zap className="w-10 h-10 text-red-600 fill-current mb-2" />
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic leading-none">
              G-DIRECT DOWNLOAD LINKS
            </h2>
            <p className="text-neutral-500 font-bold text-xs uppercase tracking-[0.2em]">
              Fast • Secure • No-Ads Premium
            </p>
          </div>

          <div className="flex flex-col gap-6 max-w-4xl mx-auto">
            {[
              {
                res: "480p",
                label: "SD x264",
                size: "450MB",
                color: "bg-[#00A341]",
              },
              {
                res: "720p",
                label: "HD x264",
                size: "1.2GB",
                color: "bg-red-600",
              },
              {
                res: "1080p",
                label: "FHD x264",
                size: "2.5GB",
                color: "bg-[#1877F2]",
              },
            ].map((link, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-center gap-6 bg-neutral-900/40 p-5 rounded-2xl border border-neutral-800/50 hover:border-red-600/30 transition-all"
              >
                <div className="flex items-center gap-4 w-48 border-r border-neutral-800 md:pr-4">
                  <span className="bg-neutral-800 p-3 rounded font-black text-xs text-white italic">
                    {link.res}
                  </span>
                  <div className="text-left">
                    <p className="text-white font-black text-sm">
                      {link.label}
                    </p>
                    <p className="text-[10px] text-red-500 font-black uppercase">
                      SIZE: {link.size}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleDownloadClick}
                  className={`flex-1 w-full ${link.color} hover:brightness-125 text-white py-5 rounded-xl font-black flex items-center justify-center gap-4 transition-all transform hover:scale-[1.02] shadow-xl text-xs tracking-widest`}
                >
                  <Download className="w-5 h-5" /> DOWNLOAD NOW
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3 justify-center text-neutral-500">
              <ShieldCheck className="w-5 h-5 text-green-600" />{" "}
              <span className="text-[10px] font-black uppercase">
                Malware Scanned
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center text-neutral-500">
              <Zap className="w-5 h-5 text-yellow-500" />{" "}
              <span className="text-[10px] font-black uppercase">
                High Speed Servers
              </span>
            </div>
            <div className="flex items-center gap-3 justify-center text-neutral-500">
              <AlertCircle className="w-5 h-5 text-red-600" />{" "}
              <span className="text-[10px] font-black uppercase">
                Direct Cloud Links
              </span>
            </div>
          </div>
        </div>

        {/* SOCIAL SHARE */}
        <div className="mt-20 border-t border-neutral-900 pt-10">
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `AtoZ Movies - Download ${movie.title}: ${window.location.href}`,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#25D366]/10 text-[#25D366] px-6 py-3 rounded-full font-black text-[10px] uppercase border border-[#25D366]/20 hover:bg-[#25D366] hover:text-white transition-all shadow-lg shadow-[#25D366]/10"
            >
              <MessageSquare className="w-4 h-4" /> WhatsApp
            </a>
            <a
              href={`https://t.me/share/url?url=${encodeURIComponent(
                window.location.href,
              )}&text=${encodeURIComponent(`Check out ${movie.title} on AtoZ Movies!`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#26A5E4]/10 text-[#26A5E4] px-6 py-3 rounded-full font-black text-[10px] uppercase border border-[#26A5E4]/20 hover:bg-[#26A5E4] hover:text-white transition-all shadow-lg shadow-[#26A5E4]/10"
            >
              <Send className="w-4 h-4" /> Telegram
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                window.location.href,
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-[#1877F2]/10 text-[#1877F2] px-6 py-3 rounded-full font-black text-[10px] uppercase border border-[#1877F2]/20 hover:bg-[#1877F2] hover:text-white transition-all shadow-lg shadow-[#1877F2]/10"
            >
              <Facebook className="w-4 h-4" /> Facebook
            </a>
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                window.location.href,
              )}&text=${encodeURIComponent(`Watch ${movie.title} on AtoZ Movies!`)}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 bg-black/10 text-white px-6 py-3 rounded-full font-black text-[10px] uppercase border border-neutral-800 hover:bg-white hover:text-black transition-all"
            >
              <Twitter className="w-4 h-4" /> Twitter
            </a>
            <button
              onClick={handleCopy}
              className="flex items-center gap-2 bg-neutral-900 text-neutral-400 px-6 py-3 rounded-full font-black text-[10px] uppercase border border-neutral-800 hover:text-white transition-all"
            >
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}{" "}
              Copy Link
            </button>
          </div>
        </div>

        {/* RECOMMENDED SECTION */}
        <RecommendedMovies currentSlug={slug} />

        {/* RATING SECTION */}
        <AdSense slot={siteConfig.ads.slots.movieDetailsReviews} />

        <div className="mt-20 bg-[#0c0c0c] border border-neutral-800 rounded-3xl p-10">
          <h3 className="text-white font-black text-xl mb-10 uppercase tracking-tighter flex items-center gap-3 italic">
            <div className="w-2 h-8 bg-red-600"></div> User Reviews
          </h3>

          <form onSubmit={handleReviewSubmit} className="space-y-8 mb-16">
            <div className="flex flex-col md:flex-row gap-10">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                  Your Rating:
                </p>
                <StarRating
                  rating={userRating}
                  onRate={(val) => setUserRating(val)}
                  size={32}
                />
              </div>
              <div className="flex-1 space-y-4">
                <p className="text-[10px] font-black text-neutral-500 uppercase tracking-widest">
                  Comment Box:
                </p>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Type your review for the AtoZ community..."
                  className="w-full bg-black border border-neutral-800 rounded-2xl p-6 text-sm focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all h-32 text-white font-medium"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700 text-white font-black px-12 py-4 rounded-full flex items-center gap-3 disabled:opacity-50 transition-all uppercase text-[11px] tracking-widest italic shadow-lg shadow-red-900/20"
              >
                {isSubmitting ? "SENDING..." : "POST REVIEW"}{" "}
                <SendHorizontal className="w-4 h-4" />
              </button>
            </div>
          </form>

          <div className="space-y-6">
            <p className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] mb-4">
              Community Feedback ({reviews.length})
            </p>
            {reviews.length === 0 ? (
              <p className="text-neutral-600 text-xs italic font-bold">
                No reviews yet. Be the first to review this movie!
              </p>
            ) : (
              reviews.map((rev, index) => (
                <div
                  key={rev._id || index}
                  className="border-l-2 border-neutral-800 pl-6 py-2"
                >
                  <div className="flex items-center gap-4 mb-2">
                    <span className="text-white font-black text-xs uppercase tracking-tighter italic">
                      {rev.user?.username || "AtoZ Member"}
                    </span>
                    <StarRating rating={rev.rating} readOnly size={12} />
                  </div>
                  <p className="text-neutral-400 text-sm font-medium leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* ATOZ SEO FOOTER */}
        <footer className="mt-24 pt-12 border-t border-neutral-900 text-center">
          <p className="text-[10px] text-neutral-800 leading-relaxed max-w-5xl mx-auto uppercase font-bold tracking-tight">
            AtoZ Movies Database: {movie.title} Download Link. Technical details
            are provided for indexing and archival purposes. Starring{" "}
            {movie.cast?.map((c) => c.actorName).join(", ")}. This title is
            available for high-speed download in {movie.quality} quality. All
            files are hosted on secure encrypted cloud storage for safety.
            Official Network: AtoZMovies.
          </p>
        </footer>
      </div>
    </div>
  );
};

const RecommendedMovies = ({ currentSlug }) => {
  const [recommended, setRecommended] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecommended = async () => {
      try {
        const { data } = await API.get(
          `/movies/${currentSlug}/recommendations`,
        );
        setRecommended(data);
      } catch (err) {
        console.error("Recommendations failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchRecommended();
  }, [currentSlug]);

  if (loading || recommended.length === 0) return null;

  return (
    <div className="mt-24">
      <div className="flex items-center gap-4 mb-10">
        <h3 className="text-white font-black text-xl uppercase tracking-tighter italic">
          <span className="text-red-500">Recommended</span> AtoZ Content
        </h3>
        <div className="h-px flex-1 bg-neutral-900" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {recommended.map((m) => (
          <Link
            key={m._id}
            to={`/movie/${m.slug}`}
            className="group relative bg-[#0c0c0c] rounded-lg overflow-hidden border border-neutral-800 hover:border-red-600/50 transition-all"
            onClick={() => window.scrollTo(0, 0)}
          >
            <div className="aspect-2/3 overflow-hidden">
              <img
                src={m.poster}
                alt={m.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h4 className="text-[10px] font-black text-neutral-400 uppercase truncate group-hover:text-white transition-colors">
                {m.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
