import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, Heart, Bookmark, LayoutDashboard, LogOut } from 'lucide-react';

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

    return (
        <nav className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold text-primary">CineRate</Link>
            
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-8 relative">
                <input 
                    type="text" 
                    placeholder="Search movies..." 
                    className="w-full bg-neutral-900 border border-neutral-700 rounded-full py-2 px-10 focus:outline-none focus:border-primary"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-neutral-500 w-5 h-5" />
            </form>

            <div className="flex items-center gap-6">
                {user ? (
                    <>
                        <Link to="/favorites" title="Favorites"><Heart className="hover:text-primary cursor-pointer w-6 h-6" /></Link>
                        <Link to="/watchlist" title="Watchlist"><Bookmark className="hover:text-primary cursor-pointer w-6 h-6" /></Link>
                        {user.role === 'admin' && (
                            <Link to="/admin" title="Admin Dashboard"><LayoutDashboard className="hover:text-primary cursor-pointer w-6 h-6" /></Link>
                        )}
                        <Link to="/profile" title="Profile"><User className="hover:text-primary cursor-pointer w-6 h-6" /></Link>
                        <button onClick={handleLogout} title="Logout"><LogOut className="hover:text-primary cursor-pointer w-6 h-6" /></button>
                    </>
                ) : (
                    <div className="flex gap-4">
                        <Link to="/login" className="btn-secondary py-1 px-4">Login</Link>
                        <Link to="/signup" className="btn-primary py-1 px-4">Sign Up</Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
