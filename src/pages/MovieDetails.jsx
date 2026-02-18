import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from '../api/axios';
import StarRating from '../components/StarRating';
import { useAuth } from '../context/AuthContext';
import { ExternalLink, Calendar, Clock, Globe, ChevronDown, ChevronUp, Star, Play, X, Copy, Check, Loader2 } from 'lucide-react';

const GoogleAd = ({ className }) => (
    <div className={`flex flex-col items-center justify-center p-4 bg-neutral-900/50 border border-dashed border-neutral-700 rounded-lg text-neutral-500 text-sm ${className}`}>
        <p className="mb-2 text-xs uppercase tracking-widest opacity-60">Advertisement</p>
        <div className="w-full h-24 bg-neutral-800/50 flex items-center justify-center rounded">
            Google AdSense Placeholder
        </div>
    </div>
);

const MovieDetails = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [movie, setMovie] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [reviewForm, setReviewForm] = useState({ rating: 0, comment: '' });
    const [submitting, setSubmitting] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);
    const [lightboxImg, setLightboxImg] = useState(null);
    const [copied, setCopied] = useState(false);
    const [downloadAdOpen, setDownloadAdOpen] = useState(false);
    const [downloadTimer, setDownloadTimer] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchAll = async () => {
            setLoading(true);
            try {
                const [movieRes, reviewsRes, recsRes] = await Promise.all([
                    API.get(`/movies/${id}`),
                    API.get(`/reviews/${id}`),
                    API.get(`/movies/${id}/recommendations`),
                ]);
                setMovie(movieRes.data);
                setReviews(reviewsRes.data);
                setRecommendations(recsRes.data);
            } catch (err) {
                toast.error('Failed to load movie details');
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, [id]);

    // Handle fake download flow
    const initiateDownload = () => {
        setDownloadTimer(5);
        setDownloadAdOpen(true);
    };

    useEffect(() => {
        let interval;
        if (downloadAdOpen && downloadTimer > 0) {
            interval = setInterval(() => setDownloadTimer(prev => prev - 1), 1000);
        } else if (downloadAdOpen && downloadTimer === 0) {
            // Timer finished, redirect
            setDownloadAdOpen(false);
            if (recommendations.length > 0) {
                const random = recommendations[Math.floor(Math.random() * recommendations.length)];
                navigate(`/movie/${random._id}`);
            } else {
                navigate('/');
            }
        }
        return () => clearInterval(interval);
    }, [downloadAdOpen, downloadTimer, recommendations, navigate]);

    const pageUrl = window.location.href;
    const shareText = movie ? `Check out ${movie?.title} on CineRate! ⭐ ${movie?.rating?.toFixed(1)}/5` : '';

    const shareLinks = [
        { name: 'WhatsApp', color: 'bg-green-600 hover:bg-green-500', emoji: '💬', url: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + pageUrl)}` },
        { name: 'Facebook', color: 'bg-blue-700 hover:bg-blue-600', emoji: '📘', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}` },
        { name: 'Twitter / X', color: 'bg-neutral-900 hover:bg-neutral-800 border border-neutral-600', emoji: '🐦', url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(pageUrl)}` },
        { name: 'Telegram', color: 'bg-sky-600 hover:bg-sky-500', emoji: '✈️', url: `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}` },
        { name: 'Reddit', color: 'bg-orange-600 hover:bg-orange-500', emoji: '🤖', url: `https://reddit.com/submit?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(shareText)}` },
    ];

    const handleCopyLink = () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
            setCopied(true);
            toast.success('Link copied!');
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleAddToFavorites = async () => {
        if (!user) return toast.error('Please login first');
        try {
            await API.post(`/auth/favorites/${id}`);
            toast.success('Added to favorites!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed');
        }
    };

    const handleAddToWatchlist = async () => {
        if (!user) return toast.error('Please login first');
        try {
            await API.post(`/auth/watchlist/${id}`);
            toast.success('Added to watchlist!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed');
        }
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        if (!user) return toast.error('Please login to leave a review');
        if (reviewForm.rating === 0) return toast.error('Please select a rating');
        setSubmitting(true);
        try {
            await API.post(`/reviews/${id}`, reviewForm);
            toast.success('Review submitted!');
            const [reviewsRes, movieRes] = await Promise.all([
                API.get(`/reviews/${id}`),
                API.get(`/movies/${id}`),
            ]);
            setReviews(reviewsRes.data);
            setMovie(movieRes.data);
            setReviewForm({ rating: 0, comment: '' });
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) return (
        <div className="max-w-7xl mx-auto px-4 py-10 animate-pulse">
            <div className="flex gap-6">
                <div className="w-56 h-80 bg-neutral-800 rounded-xl flex-shrink-0" />
                <div className="flex-1 space-y-4">
                    <div className="h-10 bg-neutral-800 rounded w-3/4" />
                    <div className="h-4 bg-neutral-800 rounded w-1/2" />
                    <div className="h-32 bg-neutral-800 rounded" />
                </div>
            </div>
        </div>
    );

    if (!movie) return <div className="text-center py-20 text-neutral-500">Movie not found.</div>;

    return (
        <div className="bg-dark min-h-screen pb-20">
            {/* Lightbox */}
            {lightboxImg && (
                <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer" onClick={() => setLightboxImg(null)}>
                    <img src={lightboxImg} alt="Screenshot" className="max-w-screen max-h-screen rounded-xl object-contain shadow-2xl" />
                    <button className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
                        <X className="w-6 h-6 text-white" />
                    </button>
                </div>
            )}

            {/* Download Ad Interstitial Modal */}
            {downloadAdOpen && (
                <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4">
                    <div className="glass max-w-lg w-full p-8 rounded-2xl text-center space-y-6 border border-primary/20 shadow-[0_0_50px_rgba(229,9,20,0.3)]">
                        <h2 className="text-2xl font-bold text-white">Preparing Your Download...</h2>
                        <div className="bg-neutral-800 rounded-xl p-8 flex items-center justify-center border border-dashed border-neutral-600">
                            <div className="text-center">
                                <p className="text-neutral-400 text-sm mb-2 uppercase tracking-widest">Sponsored Advertisement</p>
                                <div className="text-3xl font-bold text-primary">GOOGLE ADS</div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
                            <p className="text-xl font-bold text-white">Please wait {downloadTimer} seconds</p>
                            <p className="text-neutral-400 text-sm">Your download link is being generated securely.</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Hero / Header Section */}
            <div className="relative h-72 md:h-96 overflow-hidden">
                <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover blur-sm opacity-50 scale-105"
                    onError={(e) => { e.target.src = `https://via.placeholder.com/1280x400/1a0a0a/e50914?text=${encodeURIComponent(movie.title)}`; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/80 to-transparent" />
            </div>

            <div className="max-w-5xl mx-auto px-4 -mt-64 relative z-10">
                {/* Movie Header Card */}
                <div className="glass rounded-2xl p-6 mb-8 shadow-2xl shadow-black/50">
                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Poster */}
                        <div className="flex-shrink-0 mx-auto md:mx-0">
                            <img src={movie.poster} alt={movie.title} className="w-56 rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.5)] border border-neutral-800"
                                onError={(e) => { e.target.src = `https://via.placeholder.com/176x264/1a1a1a/e50914?text=${encodeURIComponent(movie.title)}`; }} />
                        </div>

                        {/* Info */}
                        <div className="flex-1 space-y-4">
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-white mb-2 leading-tight">{movie.title}</h1>
                                <div className="flex flex-wrap items-center gap-3 text-sm">
                                    <div className="flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded text-yellow-500 font-bold">
                                        <Star className="w-3.5 h-3.5 fill-current" /> {movie.rating?.toFixed(1) || 'N/A'}
                                    </div>
                                    <span className="text-neutral-400">{movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}</span>
                                    {movie.quality && <span className="bg-neutral-800 px-2 py-0.5 rounded text-xs font-bold text-neutral-300 border border-neutral-700">{movie.quality}</span>}
                                    {movie.runtime && <span className="text-neutral-400">{movie.runtime}</span>}
                                </div>
                            </div>

                            {/* Genres & Director */}
                            <div className="space-y-1 text-sm text-neutral-300">
                                <p><span className="text-neutral-500">Director:</span> <span className="text-white font-medium">{movie.director || 'Unknown'}</span></p>
                                <p className="flex flex-wrap gap-2 items-center">
                                    <span className="text-neutral-500">Genres:</span>
                                    {movie.genre?.map(g => (
                                        <span key={g} className="text-primary hover:text-red-400 cursor-pointer transition-colors">{g}</span>
                                    ))}
                                </p>
                                <p><span className="text-neutral-500">Language:</span> {movie.language || 'English'}</p>
                            </div>

                            {/* Action Buttons (Fav/Watchlist) */}
                            <div className="flex gap-3 pt-2">
                                <button onClick={handleAddToFavorites} className="btn-secondary text-sm py-2 px-5 bg-neutral-800 hover:bg-neutral-700 border-neutral-700">❤️ Favorite</button>
                                <button onClick={handleAddToWatchlist} className="btn-secondary text-sm py-2 px-5 bg-neutral-800 hover:bg-neutral-700 border-neutral-700">🔖 Watchlist</button>
                                {movie.trailer && (
                                    <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm py-2 px-5 bg-neutral-800 hover:bg-neutral-700 border-neutral-700 flex items-center gap-2">
                                        <Play className="w-3 h-3" /> Trailer
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* AD #1 */}
                <GoogleAd className="mb-8" />

                {/* Description */}
                <div className="glass rounded-xl p-6 mb-8 border-l-4 border-primary">
                    <h2 className="text-xl font-bold text-white mb-3">Plot Summary</h2>
                    <p className="text-neutral-300 leading-relaxed text-lg">{movie.description}</p>
                </div>

                {/* AD #2 */}
                <GoogleAd className="mb-8" />

                {/* Cast Table */}
                {movie.cast?.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 border-b border-neutral-800 pb-2">Top Cast</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {movie.cast.map((member, i) => (
                                <div key={i} className="glass rounded-xl p-3 text-center group hover:bg-neutral-800/80 transition-colors">
                                    {typeof member === 'object' ? (
                                        <>
                                            <div className="w-20 h-20 mx-auto rounded-full overflow-hidden mb-3 border-2 border-neutral-700 group-hover:border-primary transition-colors">
                                                {member.photo ? (
                                                    <img src={member.photo} alt={member.actorName} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full bg-neutral-800 flex items-center justify-center text-xl font-bold text-neutral-600">{member.actorName?.[0]}</div>
                                                )}
                                            </div>
                                            <p className="font-bold text-white text-sm truncate">{member.actorName}</p>
                                            <p className="text-xs text-neutral-400 truncate">{member.characterName}</p>
                                        </>
                                    ) : (
                                        <p className="font-medium text-white">{member}</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Screenshots */}
                {movie.screenshots?.length > 0 && (
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4 border-b border-neutral-800 pb-2">Screenshots</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {movie.screenshots.map((img, i) => (
                                <div key={i} className="group relative aspect-video rounded-xl overflow-hidden cursor-pointer border border-neutral-800 hover:border-primary/50 transition-colors"
                                    onClick={() => setLightboxImg(img)}>
                                    <img src={img} alt="Screenshot" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <div className="bg-black/60 p-2 rounded-full border border-white/20">
                                            <ExternalLink className="w-5 h-5 text-white" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* AD #3 */}
                <GoogleAd className="mb-8" />

                {/* Reviews & FAQs Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                     {/* Reviews */}
                    <div className="glass rounded-2xl p-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                           <Star className="w-5 h-5 text-yellow-500 fill-current" /> User Reviews
                        </h2>
                        {reviews.length > 0 ? (
                            <div className="space-y-4 max-h-80 overflow-y-auto custom-scrollbar pr-2">
                                {reviews.map(review => (
                                    <div key={review._id} className="bg-neutral-900/50 p-3 rounded-xl border border-neutral-800">
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="font-bold text-sm text-neutral-200">{review.user?.username}</span>
                                            <StarRating rating={review.rating} readOnly size={12} />
                                        </div>
                                        <p className="text-neutral-400 text-sm italic">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-neutral-500 text-sm text-center py-4">No reviews yet.</p>
                        )}
                        
                        {/* Add Review */}
                        <div className="mt-4 pt-4 border-t border-neutral-700">
                             {user ? (
                                <form onSubmit={handleReviewSubmit} className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm font-medium">Rate it:</span>
                                        <StarRating rating={reviewForm.rating} onRate={(r) => setReviewForm({ ...reviewForm, rating: r })} size={16} />
                                    </div>
                                    <textarea 
                                        placeholder="Write a review..." 
                                        className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-3 text-sm focus:border-primary focus:outline-none resize-none h-20"
                                        value={reviewForm.comment}
                                        onChange={e => setReviewForm({...reviewForm, comment: e.target.value})}
                                        required
                                    />
                                    <button type="submit" disabled={submitting} className="w-full btn-primary py-2 text-xs font-bold uppercase tracking-wider">
                                        {submitting ? 'Posting...' : 'Post Review'}
                                    </button>
                                </form>
                             ) : (
                                 <p className="text-center text-sm text-neutral-400"><Link to="/login" className="text-primary hover:underline">Login</Link> to review.</p>
                             )}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div className="glass rounded-2xl p-6 h-fit">
                        <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
                        {movie.faqs?.length > 0 ? (
                            <div className="space-y-2">
                                {movie.faqs.map((faq, i) => (
                                    <div key={i} className="border border-neutral-700 rounded-lg overflow-hidden bg-neutral-900/30">
                                        <button className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-neutral-800 transition-colors"
                                            onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                                            <span className="font-medium text-sm text-neutral-300">{faq.question}</span>
                                            <ChevronDown className={`w-4 h-4 text-neutral-500 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                                        </button>
                                        {openFaq === i && (
                                            <div className="px-4 py-3 bg-neutral-900/80 text-neutral-400 text-sm border-t border-neutral-800 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-neutral-500 text-sm">No FAQs available yet.</p>
                        )}
                    </div>
                </div>

                {/* AD #4 */}
                <GoogleAd className="mb-12" />

                {/* Recommendations Section */}
                {recommendations.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 border-l-4 border-primary pl-4">Recommended For You</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {recommendations.map(rec => (
                                <Link key={rec._id} to={`/movie/${rec._id}`} className="group block">
                                    <div className="relative aspect-[2/3] rounded-xl overflow-hidden mb-2">
                                        <img src={rec.poster} alt={rec.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" 
                                            onError={(e) => { e.target.src = `https://via.placeholder.com/200x300/1a1a1a/e50914?text=Movie`; }}/>
                                        <div className="absolute top-2 right-2 bg-black/80 text-primary text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                                            <Star className="w-3 h-3 fill-current" /> {rec.rating?.toFixed(1)}
                                        </div>
                                    </div>
                                    <h3 className="font-bold text-neutral-200 text-sm truncate group-hover:text-primary transition-colors">{rec.title}</h3>
                                    <p className="text-xs text-neutral-500 truncate">{rec.genre?.slice(0, 2).join(', ')}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* Social Share Bar (Bottom) */}
                <div className="glass rounded-xl p-6 mb-8 text-center bg-gradient-to-br from-neutral-900/90 to-neutral-900/50">
                    <p className="text-white font-bold mb-4 text-lg">Share this movie with friends!</p>
                    <div className="flex flex-wrap justify-center gap-3">
                        {shareLinks.map(s => (
                            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" 
                                className={`${s.color} text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-bold text-sm transition-transform hover:-translate-y-1 shadow-lg`}>
                                <span className="text-base">{s.emoji}</span> {s.name}
                            </a>
                        ))}
                        <button onClick={handleCopyLink} className="bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 font-bold text-sm transition-transform hover:-translate-y-1 shadow-lg border border-neutral-600">
                             {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} {copied ? 'Copied' : 'Copy Link'}
                        </button>
                    </div>
                </div>

                {/* Download Links Section (Bottom) */}
                <div id="download-section" className="glass rounded-2xl p-8 border border-primary/20 shadow-[0_0_50px_rgba(229,9,20,0.15)] relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                    
                    <h2 className="text-3xl font-black text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-400 to-white animate-pulse tracking-wider">
                        ⚡ DOWNLOAD LINKS ⚡
                    </h2>

                    <div className="max-w-2xl mx-auto space-y-6">
                        {[
                            { label: '480p x264', size: '450MB', color: 'from-green-600 to-green-800', q: 'SD' },
                            { label: '720p x264', size: '1.2GB', color: 'from-blue-600 to-blue-800', q: 'HD' },
                            { label: '1080p x264', size: '2.5GB', color: 'from-purple-600 to-purple-800', q: 'FHD' },
                        ].map((dl, i) => (
                            <div key={i} className="flex flex-col sm:flex-row items-center gap-4 bg-neutral-900/50 p-2 rounded-xl border border-neutral-800/50 hover:border-neutral-600 transition-colors">
                                <div className="flex items-center gap-3 pl-4">
                                    <span className={`text-[10px] font-black bg-neutral-800 text-white px-2 py-1 rounded uppercase border border-neutral-700`}>{dl.q}</span>
                                    <div className="text-left">
                                        <p className="font-bold text-white leading-none mb-1">{dl.label}</p>
                                        <p className="text-xs text-neutral-500">Size: {dl.size}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={initiateDownload}
                                    className={`w-full sm:flex-1 bg-gradient-to-r ${dl.color} hover:brightness-110 text-white font-bold py-3 px-6 rounded-lg shadow-lg flex items-center justify-center gap-2 transform active:scale-95 transition-all text-sm uppercase tracking-wide`}
                                >
                                    <span className="animate-bounce">⬇️</span> Download Now
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    <p className="text-center text-xs text-neutral-600 mt-6">
                        By clicking download, you agree to our terms of service. 
                        Files are hosted on third-party servers.
                    </p>
                </div>
                
                {/* AD #5 (Last) */}
                <GoogleAd className="mt-8" />
            </div>
        </div>
    );
};

export default MovieDetails;
