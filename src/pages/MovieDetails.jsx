import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../api/axios";
import StarRating from "../components/StarRating";
import { useAuth } from "../context/AuthContext";
// FIXED IMPORTS: Added Monitor, Shield, and Zap
import {
  Download,
  Info,
  Star,
  Play,
  ChevronDown,
  Users,
  Image as ImageIcon,
  MessageCircle,
  HelpCircle,
  ExternalLink,
  ShoppingCart,
  Tv,
  Globe,
  Clock,
  Calendar,
  Monitor,
  Shield,
  Zap,
  Layout,
  FileText,
} from "lucide-react";

const GoogleAd = ({ label = "Advertisement" }) => (
  <div className="w-full bg-[#111] border border-neutral-800 p-3 my-8 rounded text-center">
    <p className="text-[10px] text-neutral-600 uppercase mb-2 tracking-widest">
      {label}
    </p>
    <div className="h-28 bg-black/40 flex items-center justify-center border border-dashed border-neutral-800 rounded">
      <span className="text-neutral-700 text-xs italic font-mono">
        ADSENSE_AD_SLOT
      </span>
    </div>
  </div>
);

const MovieDetails = () => {
  const { slug } = useParams();
  const { user } = useAuth();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    const fetchFullDetails = async () => {
      try {
        const { data } = await API.get(`/movies/${slug}`);
        setMovie(data);
        document.title = `${data.title} (${new Date(data.releaseDate).getFullYear()}) Full Movie Download - CineRate`;
      } catch (err) {
        toast.error("Error loading movie from database");
      } finally {
        setLoading(false);
      }
    };
    fetchFullDetails();
  }, [slug]);

  if (loading)
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-primary">
        <Zap className="w-12 h-12 animate-bounce mb-4" />
        <p className="font-black tracking-tighter text-xl">FETCHING DATA...</p>
      </div>
    );

  if (!movie)
    return (
      <div className="p-20 text-center bg-black text-white">
        Movie Not Found in Index.
      </div>
    );

  return (
    <div className="bg-[#050505] min-h-screen text-neutral-300 font-sans pb-20 selection:bg-primary selection:text-white">
      {/* 1. TOP ANNOUNCEMENT BAR (SEO & ADS FOCUSED) */}
      <div className="bg-primary/10 border-b border-primary/20 py-2 text-center text-[10px] font-bold text-primary uppercase tracking-[0.3em]">
        Direct Download Links are Now Active for {movie.title}
      </div>

      <div className="max-w-6xl mx-auto px-4 pt-8">
        {/* 2. MAIN HEADER TITLE */}
        <div className="text-center md:text-left mb-10">
          <h1 className="text-2xl md:text-4xl font-black text-white leading-tight mb-2">
            Download {movie.title} ({new Date(movie.releaseDate).getFullYear()}){" "}
            {movie.language} Audio [WEB-DL 720p 480p 1080p]
          </h1>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-[11px] font-bold uppercase tracking-widest text-neutral-500">
            <span className="text-primary">{movie.quality}</span>
            <span>•</span>
            <span>{movie.runtime}</span>
            <span>•</span>
            <span className="text-green-500">{movie.language}</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-10">
          {/* LEFT SIDE: POSTER & QUICK INFO */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative group p-1 bg-neutral-900 border border-neutral-800 rounded shadow-2xl">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-black/80 backdrop-blur-md text-white text-[10px] px-2 py-1 border border-white/20 rounded">
                  ⭐ {movie.rating}
                </span>
                <span className="bg-primary text-white text-[10px] px-2 py-1 rounded font-bold uppercase">
                  {movie.quality}
                </span>
              </div>
            </div>

            {/* Official Stream Box */}
            <div className="bg-[#111] p-5 rounded border border-neutral-800">
              <h4 className="text-[10px] font-black text-neutral-500 uppercase mb-4 tracking-widest flex items-center gap-2">
                <Shield className="w-3 h-3 text-green-500" /> Secure Streams
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {movie.affiliateLinks?.netflix && (
                  <a
                    href={movie.affiliateLinks.netflix}
                    className="bg-neutral-800 hover:bg-[#E50914] text-white text-xs py-2.5 rounded text-center font-bold transition-all"
                  >
                    Netflix
                  </a>
                )}
                {movie.affiliateLinks?.prime && (
                  <a
                    href={movie.affiliateLinks.prime}
                    className="bg-neutral-800 hover:bg-[#00A8E1] text-white text-xs py-2.5 rounded text-center font-bold transition-all"
                  >
                    Amazon Prime
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: THE TABLE (THE "BOLLY" LOOK) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-[#0f0f0f] border border-neutral-800 rounded shadow-xl overflow-hidden">
              <div className="bg-neutral-900 p-4 border-b border-neutral-800 flex items-center justify-between">
                <h2 className="font-black text-white uppercase text-xs tracking-tighter flex items-center gap-2">
                  <Info className="w-4 h-4 text-primary" /> Movie Encyclopedia
                </h2>
                <span className="text-[10px] text-neutral-500 font-mono">
                  ID: {movie._id.slice(-6).toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 text-sm">
                {[
                  { label: "Original Title", val: movie.title },
                  { label: "Director", val: movie.director },
                  {
                    label: "Release Date",
                    val: new Date(movie.releaseDate).toDateString(),
                  },
                  { label: "Runtime", val: movie.runtime },
                  { label: "Primary Language", val: movie.language },
                  {
                    label: "Quality Available",
                    val: "480p, 720p, 1080p, 2160p",
                  },
                  { label: "Total Reviews", val: movie.numReviews },
                  { label: "Genres", val: movie.genre?.join(", ") },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center p-4 border-b border-neutral-800/40 hover:bg-primary/[0.02]"
                  >
                    <span className="text-neutral-500 font-bold text-xs uppercase tracking-tighter">
                      {item.label}:
                    </span>
                    <span className="text-neutral-200 font-bold text-right ml-4">
                      {item.val || "---"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-neutral-900/30 p-6 rounded-lg border border-neutral-800 relative">
              <div className="absolute -top-3 left-6 bg-primary text-white text-[9px] font-black px-2 py-0.5 rounded">
                SYNOPSIS
              </div>
              <p className="text-neutral-400 text-sm leading-relaxed italic">
                {movie.description}
              </p>
            </div>
          </div>
        </div>

        <GoogleAd />

        {/* 3. CAST SECTION */}
        <div className="mt-16">
          <h3 className="text-lg font-black text-white mb-8 uppercase flex items-center gap-2">
            Cast & Crew
          </h3>
          <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
            {movie.cast?.map((c, i) => (
              <div key={i} className="flex-shrink-0 w-24 text-center group">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-neutral-800 mx-auto mb-3 group-hover:border-primary transition-colors">
                  <img
                    src={c.photo || "https://via.placeholder.com/100"}
                    alt={c.actorName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-white font-bold text-[11px] truncate">
                  {c.actorName}
                </p>
                <p className="text-neutral-600 text-[9px] uppercase truncate">
                  {c.characterName}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. SCREENSHOTS (THE "PROOF" SECTION) */}
        <div className="mt-16">
          <h3 className="text-lg font-black text-white mb-8 uppercase text-center border-b border-neutral-800 pb-4">
            Media Gallery & Screenshots
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {movie.screenshots?.map((img, i) => (
              <div
                key={i}
                className="border border-neutral-800 rounded overflow-hidden shadow-lg"
              >
                <img
                  src={img}
                  className="w-full h-auto hover:brightness-110 transition-all"
                  alt="Screenshot"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 5. DOWNLOAD LINKS (CENTRAL FOCUS) */}
        <div className="mt-20 bg-neutral-900 border-2 border-primary/10 rounded-3xl p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tighter">
            📥 DOWNLOAD OPTIONS
          </h2>
          <p className="text-xs text-neutral-500 uppercase tracking-widest mb-10 font-bold">
            Encrypted & High Speed Links
          </p>

          <div className="flex flex-col gap-4 max-w-lg mx-auto">
            <button className="flex justify-between items-center bg-[#1a1a1a] hover:bg-green-600 group p-5 rounded-xl border border-neutral-800 transition-all">
              <div className="text-left">
                <span className="block text-white font-black group-hover:text-white">
                  Download 480p
                </span>
                <span className="text-[10px] text-neutral-500 group-hover:text-green-100 font-bold uppercase">
                  Size: 400MB | MKV
                </span>
              </div>
              <Download className="w-6 h-6 text-green-500 group-hover:text-white group-hover:animate-bounce" />
            </button>
            <button className="flex justify-between items-center bg-[#1a1a1a] hover:bg-yellow-600 group p-5 rounded-xl border border-neutral-800 transition-all">
              <div className="text-left">
                <span className="block text-white font-black group-hover:text-white">
                  Download 720p
                </span>
                <span className="text-[10px] text-neutral-500 group-hover:text-yellow-100 font-bold uppercase">
                  Size: 1.1GB | HEVC
                </span>
              </div>
              <Download className="w-6 h-6 text-yellow-500 group-hover:text-white group-hover:animate-bounce" />
            </button>
            <button className="flex justify-between items-center bg-[#1a1a1a] hover:bg-red-600 group p-5 rounded-xl border border-neutral-800 transition-all">
              <div className="text-left">
                <span className="block text-white font-black group-hover:text-white">
                  Download 1080p
                </span>
                <span className="text-[10px] text-neutral-500 group-hover:text-red-100 font-bold uppercase">
                  Size: 2.4GB | 10bit
                </span>
              </div>
              <Download className="w-6 h-6 text-red-500 group-hover:text-white group-hover:animate-bounce" />
            </button>
          </div>
        </div>

        <GoogleAd label="Sponsored Content" />

        {/* 6. FAQ ACCORDION */}
        {movie.faqs?.length > 0 && (
          <div className="mt-20 max-w-3xl mx-auto">
            <h3 className="text-center font-black text-white mb-8 uppercase tracking-widest text-sm">
              Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {movie.faqs.map((f, i) => (
                <div
                  key={i}
                  className="bg-[#111] border border-neutral-800 rounded"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left font-bold text-xs uppercase text-neutral-300"
                  >
                    {f.question}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    />
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4 text-sm text-neutral-500 italic leading-relaxed">
                      {f.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. SEO CONTENT WALL */}
        <footer className="mt-24 pt-12 border-t border-neutral-900 text-center">
          <p className="text-[10px] text-neutral-700 leading-loose max-w-4xl mx-auto text-justify">
            <strong>CineRate Index:</strong> You are viewing details for{" "}
            {movie.title} ({new Date(movie.releaseDate).getFullYear()}). This
            file is available in {movie.language} Audio. Our team provides
            verified technical data for {movie.genre?.join(", ")}
            movies. If you are looking for {movie.title} download links, we
            offer multiple qualities including 480p SD, 720p HD, and 1080p Full
            HD. The runtime for this {movie.quality} movie is {movie.runtime}.
            Directed by {movie.director}. Please support the creators by
            watching officially on{" "}
            {Object.keys(movie.affiliateLinks || {}).join(", ") ||
              "Streaming Platforms"}
            .
          </p>
        </footer>
      </div>
    </div>
  );
};

export default MovieDetails;
