import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';
import { Heart } from 'lucide-react';

const Favorites = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        const fetchFavorites = async () => {
            try {
                const { data } = await API.get('/auth/favorites');
                setMovies(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchFavorites();
    }, [user, navigate]);

    return (
        <div className="max-w-7xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <Heart className="text-primary w-8 h-8" /> My Favorites
            </h1>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {loading
                    ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                    : movies.length > 0
                        ? movies.map(m => <MovieCard key={m._id} movie={m} />)
                        : (
                            <div className="col-span-full text-center py-20">
                                <Heart className="w-16 h-16 text-neutral-700 mx-auto mb-4" />
                                <p className="text-neutral-500 text-lg">No favorites yet. Start adding movies!</p>
                            </div>
                        )
                }
            </div>
        </div>
    );
};

export default Favorites;
