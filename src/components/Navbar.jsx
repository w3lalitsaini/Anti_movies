import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  User,
  Heart,
  Bookmark,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Globe,
  Clapperboard,
  Zap,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (search) navigate(`/?search=${search}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Category data updated for AtoZ Movies branding
  const categories = [
    { name: "Dual Audio", icon: "💀", hasDropdown: true },
    { name: "Bollywood", hasDropdown: true },
    { name: "South Hindi", hasDropdown: false },
    { name: "Hollywood", hasDropdown: true },
    {
      name: "Web Series",
      icon: <Clapperboard className="w-4 h-4 text-red-500" />,
      hasDropdown: true,
    },
    {
      name: "Genre",
      icon: <Globe className="w-4 h-4 text-blue-400" />,
      hasDropdown: true,
    },
    { name: "By Year", hasDropdown: true },
  ];

  return (
    <header className="flex flex-col w-full sticky top-0 z-100 shadow-2xl">
      {/* Top Main Navbar */}
      <nav className="bg-[#050505] border-b border-neutral-800 px-6 py-3 flex items-center justify-between">
        {/* BRAND LOGO: AtoZ Movies Typography */}
        <Link to="/" className="flex items-center gap-1 group">
          <span className="text-white font-black text-2xl tracking-tighter uppercase transition-colors group-hover:text-red-500">
            AtoZ
          </span>
          <span className="bg-red-600 text-white px-1.5 rounded-sm font-black text-2xl tracking-tighter uppercase italic shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            Movies
          </span>
        </Link>

        {/* SEARCH BAR */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-xl mx-12 relative"
        >
          <input
            type="text"
            placeholder="Search for movies, series, or actors..."
            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg py-2.5 px-12 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 text-sm text-white transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Search className="absolute left-4 top-3 text-neutral-500 w-4 h-4" />
          <button
            type="submit"
            className="absolute right-3 top-2 bg-neutral-800 text-[10px] font-bold px-2 py-1 rounded text-neutral-400 hover:text-white transition-colors"
          >
            ENTER
          </button>
        </form>

        {/* USER ACTIONS */}
        <div className="flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/favorites"
                className="p-2 hover:bg-neutral-900 rounded-full transition-colors relative group"
              >
                <Heart className="w-5 h-5 text-neutral-400 group-hover:text-red-500" />
              </Link>
              <Link
                to="/watchlist"
                className="p-2 hover:bg-neutral-900 rounded-full transition-colors relative group"
              >
                <Bookmark className="w-5 h-5 text-neutral-400 group-hover:text-blue-500" />
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="p-2 hover:bg-neutral-900 rounded-full transition-colors relative group border border-red-900/30"
                >
                  <LayoutDashboard className="w-5 h-5 text-red-500" />
                </Link>
              )}
              <div className="h-8 w-px bg-neutral-800 mx-1"></div>
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-linear-to-tr from-red-600 to-red-400 flex items-center justify-center font-bold text-black text-xs">
                  {user.username?.charAt(0).toUpperCase()}
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="p-2 hover:bg-neutral-900 rounded-full transition-colors group"
              >
                <LogOut className="w-5 h-5 text-neutral-500 group-hover:text-white" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="text-white text-xs font-black uppercase tracking-widest hover:text-red-500 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-red-600 hover:bg-red-700 py-2 px-5 rounded font-black text-xs text-white uppercase tracking-tighter transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-red-900/20"
              >
                Join AtoZ
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Secondary Category Bar */}
      <div className="bg-[#111] border-b border-neutral-800 px-6 py-2.5 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="flex items-center gap-8 max-w-7xl mx-auto">
          <Link
            to="/"
            className="text-red-500 font-black text-xs uppercase flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          >
            <Zap className="w-3.5 h-3.5 fill-current" /> HOME
          </Link>

          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 group cursor-pointer"
            >
              {cat.icon && (
                <span className="text-xs group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
              )}
              <span className="text-neutral-300 text-[11px] font-black uppercase tracking-tight group-hover:text-white transition-colors">
                {cat.name}
              </span>
              {cat.hasDropdown && (
                <ChevronDown className="w-3 h-3 text-neutral-600 group-hover:text-red-500 transition-colors" />
              )}
            </div>
          ))}

          <div className="flex-1"></div>

          <div className="hidden lg:flex items-center gap-4 border-l border-neutral-800 pl-8">
            <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">
              Quality:
            </span>
            <span className="text-neutral-400 text-[10px] font-black border border-neutral-800 px-2 py-0.5 rounded">
              4K
            </span>
            <span className="text-neutral-400 text-[10px] font-black border border-neutral-800 px-2 py-0.5 rounded">
              1080P
            </span>
            <span className="text-neutral-400 text-[10px] font-black border border-neutral-800 px-2 py-0.5 rounded">
              720P
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
