import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import { User, Mail, Shield } from 'lucide-react';

const Profile = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) { navigate('/login'); return; }
        const fetchProfile = async () => {
            try {
                const { data } = await API.get('/auth/profile');
                setProfile(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (loading) return (
        <div className="max-w-2xl mx-auto px-6 py-20 animate-pulse">
            <div className="h-32 w-32 bg-neutral-800 rounded-full mx-auto mb-6" />
            <div className="h-8 bg-neutral-800 rounded w-1/2 mx-auto mb-4" />
            <div className="h-4 bg-neutral-800 rounded w-1/3 mx-auto" />
        </div>
    );

    return (
        <div className="max-w-2xl mx-auto px-6 py-16">
            <div className="glass rounded-2xl p-8 text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-4xl font-bold mx-auto mb-6">
                    {profile?.username?.[0]?.toUpperCase()}
                </div>
                <h1 className="text-3xl font-bold mb-2">{profile?.username}</h1>
                <div className="flex items-center justify-center gap-2 text-neutral-400 mb-2">
                    <Mail className="w-4 h-4" />
                    <span>{profile?.email}</span>
                </div>
                <div className="flex items-center justify-center gap-2 mb-8">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className={`capitalize font-semibold ${profile?.role === 'admin' ? 'text-primary' : 'text-neutral-400'}`}>
                        {profile?.role}
                    </span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-neutral-900 rounded-xl p-4">
                        <p className="text-3xl font-bold text-primary">{profile?.favorites?.length || 0}</p>
                        <p className="text-neutral-400 text-sm mt-1">Favorites</p>
                    </div>
                    <div className="bg-neutral-900 rounded-xl p-4">
                        <p className="text-3xl font-bold text-primary">{profile?.watchlist?.length || 0}</p>
                        <p className="text-neutral-400 text-sm mt-1">Watchlist</p>
                    </div>
                </div>

                <button onClick={handleLogout} className="btn-primary w-full py-3">
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Profile;
