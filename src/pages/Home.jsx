import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import API from '../api/axios';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';
import { ChevronRight, TrendingUp, Filter } from 'lucide-react';

const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Sci-Fi', 'Thriller', 'Romance', 'Animation', 'Documentary'];

const Home = () => {
    const [movies, setMovies] = useState([]);
    const [trending, setTrending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [trendingLoading, setTrendingLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search') || '';

    useEffect(() => {
        const fetchTrending = async () => {
            try {
                const { data } = await API.get('/movies/trending');
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
        <div>
            {/* Hero Section */}
            {heroMovie && (
                <div className="relative h-[70vh] overflow-hidden">
                    <img
                        src={heroMovie.poster || `https://via.placeholder.com/1280x720/1a0a0a/e50914?text=${encodeURIComponent(heroMovie.title)}`}
                        alt={heroMovie.title}
                        className="w-full h-full object-cover"
                        onError={(e) => { e.target.src = `https://via.placeholder.com/1280x720/1a0a0a/e50914?text=${encodeURIComponent(heroMovie.title)}`; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
                    <div className="absolute bottom-16 left-8 md:left-16 max-w-xl">
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-5 h-5 text-primary" />
                            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Trending #1</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{heroMovie.title}</h1>
                        <p className="text-neutral-300 text-lg mb-6 line-clamp-3">{heroMovie.description}</p>
                        <div className="flex gap-4">
                            <Link to={`/movie/${heroMovie._id}`} className="btn-primary px-8 py-3 text-lg">
                                View Details
                            </Link>
                            {heroMovie.affiliateLinks?.netflix && (
                                <a href={heroMovie.affiliateLinks.netflix} target="_blank" rel="noopener noreferrer"
                                    className="btn-secondary px-8 py-3 text-lg">
                                    Watch on Netflix
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Trending Section */}
                {!search && (
                    <section className="mb-12">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <TrendingUp className="text-primary w-6 h-6" /> Trending Now
                            </h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {trendingLoading
                                ? Array(5).fill(0).map((_, i) => <SkeletonCard key={i} />)
                                : trending.map(m => <MovieCard key={m._id} movie={m} />)
                            }
                        </div>
                    </section>
                )}

                {/* AdSense Placeholder */}
                <div className="glass rounded-xl p-4 mb-10 text-center text-neutral-500 border border-dashed border-neutral-700">
                    <p className="text-sm">Advertisement — Google AdSense</p>
                    {/* Replace with: <ins className="adsbygoogle" ... /> */}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center gap-4 mb-8">
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-neutral-400" />
                        <span className="text-neutral-400 font-medium">Filter:</span>
                    </div>
                    <select
                        className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                        value={selectedGenre}
                        onChange={(e) => { setSelectedGenre(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">All Genres</option>
                        {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                    </select>
                    <select
                        className="bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-2 focus:outline-none focus:border-primary"
                        value={sortBy}
                        onChange={(e) => { setSortBy(e.target.value); setCurrentPage(1); }}
                    >
                        <option value="">Sort By</option>
                        <option value="rating">Top Rated</option>
                        <option value="newest">Newest</option>
                    </select>
                    {search && (
                        <span className="text-neutral-400">
                            Results for: <span className="text-white font-semibold">"{search}"</span>
                        </span>
                    )}
                </div>

                {/* Movie Grid */}
                <section>
                    <h2 className="text-2xl font-bold mb-6">{search ? 'Search Results' : 'All Movies'}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {loading
                            ? Array(12).fill(0).map((_, i) => <SkeletonCard key={i} />)
                            : movies.length > 0
                                ? movies.map(m => <MovieCard key={m._id} movie={m} />)
                                : <p className="col-span-full text-center text-neutral-500 py-20">No movies found.</p>
                        }
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center gap-2 mt-10">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                                        currentPage === page
                                            ? 'bg-primary text-white'
                                            : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    )}
                </section>

                {/* Affiliate Links Section */}
                <section className="mt-16 glass rounded-2xl p-8">
                    <h3 className="text-xl font-bold mb-6 text-center">Watch on Your Favorite Platform</h3>
                    <div className="flex flex-wrap justify-center gap-6">
                        <a href="https://www.netflix.com" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-red-900/30 border border-red-800 rounded-xl px-8 py-4 hover:bg-red-900/50 transition-colors">
                            <span className="text-2xl font-black text-red-500">N</span>
                            <span className="font-semibold">Netflix</span>
                        </a>
                        <a href="https://www.amazon.com/Prime-Video" target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 bg-blue-900/30 border border-blue-800 rounded-xl px-8 py-4 hover:bg-blue-900/50 transition-colors">
                            <span className="text-2xl font-black text-blue-400">a</span>
                            <span className="font-semibold">Amazon Prime</span>
                        </a>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Home;
