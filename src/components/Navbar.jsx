import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, Bookmark, LayoutDashboard, LogOut, ChevronDown, Globe, Clapperboard } from 'lucide-react';

const Navbar = () => {
    const [search, setSearch] = useState('');
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userInfo'));

    const handleSearch = (e) => {
        e.preventDefault();
        if (search) navigate(`/?search=${search}`);
    };

    const handleLogout = () => {
        localStorage.removeItem('userInfo');
        window.location.reload();
    };

    // Category data for the secondary bar
    const categories = [
        { name: 'Dual Audio', icon: '💀', hasDropdown: true },
        { name: 'Bollywood Movies', hasDropdown: true },
        { name: 'Tamil', hasDropdown: false },
        { name: 'Telugu', hasDropdown: false },
        { name: 'Hollywood', hasDropdown: true },
        { name: 'Web Series', icon: <Clapperboard className="w-4 h-4" />, hasDropdown: true },
        { name: 'Genre', icon: <Globe className="w-4 h-4 text-blue-400" />, hasDropdown: true },
        { name: 'By Year', hasDropdown: true },
    ];

    return (
        <header className="flex flex-col w-full sticky top-0 z-50">
            {/* Main Navbar */}
            <nav className="glass px-6 py-4 flex items-center justify-between border-b border-neutral-800">
                <Link to="/" className="text-2xl font-bold text-primary">CineRate</Link>
                
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8 relative">
                    <input 
                        type="text" 
                        placeholder="Search movies..." 
                        className="w-full bg-neutral-900 border border-neutral-700 rounded-full py-2 px-10 focus:outline-none focus:border-primary text-white"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Search className="absolute left-3 top-2.5 text-neutral-500 w-5 h-5" />
                </form>

                <div className="flex items-center gap-6">
                    {user ? (
                        <>
                            <Link to="/favorites" title="Favorites"><Heart className="hover:text-primary cursor-pointer w-6 h-6 text-white" /></Link>
                            <Link to="/watchlist" title="Watchlist"><Bookmark className="hover:text-primary cursor-pointer w-6 h-6 text-white" /></Link>
                            {user.role === 'admin' && (
                                <Link to="/admin" title="Admin Dashboard"><LayoutDashboard className="hover:text-primary cursor-pointer w-6 h-6 text-white" /></Link>
                            )}
                            <Link to="/profile" title="Profile"><User className="hover:text-primary cursor-pointer w-6 h-6 text-white" /></Link>
                            <button onClick={handleLogout} title="Logout"><LogOut className="hover:text-primary cursor-pointer w-6 h-6 text-white" /></button>
                        </>
                    ) : (
                        <div className="flex gap-4">
                            <Link to="/login" className="btn-secondary py-1 px-4 border border-white rounded text-white">Login</Link>
                            <Link to="/signup" className="bg-primary hover:bg-opacity-80 py-1 px-4 rounded text-black font-semibold">Sign Up</Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Secondary Category Bar (Based on your image) */}
            <div className="bg-[#2a2a2a] border-b border-neutral-700 px-6 py-2 overflow-x-auto whitespace-nowrap scrollbar-hide">
                <div className="flex items-center gap-8 max-w-7xl mx-auto">
                    <Link to="/" className="text-white font-bold text-sm uppercase hover:text-primary">HOME</Link>
                    
                    {categories.map((cat, index) => (
                        <div key={index} className="flex items-center gap-1 group cursor-pointer">
                            {cat.icon && <span className="text-sm">{cat.icon}</span>}
                            <span className="text-white text-sm font-medium hover:text-primary transition-colors">
                                {cat.name}
                            </span>
                            {cat.hasDropdown && <ChevronDown className="w-4 h-4 text-neutral-400 group-hover:text-primary" />}
                        </div>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Navbar;