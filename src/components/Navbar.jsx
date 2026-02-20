import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
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
  const [activeDropdown, setActiveDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Handle clicking outside to close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (search.trim()) navigate(`/?search=${search}`);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const categories = [
    {
      name: "Dual Audio",
      icon: "💀",
      items: ["Hindi-English", "Hindi-Tamil", "Hindi-Telugu", "Multi-Audio"],
    },
    {
      name: "Bollywood",
      items: ["2024 Hits", "Classic Movies", "Action", "Romance"],
    },
    {
      name: "South Hindi",
      items: null, // No dropdown
    },
    {
      name: "Hollywood",
      items: ["Marvel/DC", "Sci-Fi", "Horror", "Animation"],
    },
    {
      name: "Web Series",
      icon: <Clapperboard className="w-3.5 h-3.5 text-red-500" />,
      items: ["Netflix", "Amazon Prime", "Hotstar", "HBO Max"],
    },
    {
      name: "Genre",
      icon: <Globe className="w-3.5 h-3.5 text-blue-400" />,
      items: ["Action", "Adventure", "Crime", "Fantasy", "Mystery"],
    },
    {
      name: "By Year",
      items: ["2025", "2024", "2023", "2022", "Older"],
    },
  ];

  return (
    <header className="flex flex-col w-full sticky top-0 z-[100] shadow-2xl">
      {/* Top Main Navbar */}
      <nav className="bg-[#050505] border-b border-neutral-800 px-6 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 group">
          <span className="text-white font-black text-2xl tracking-tighter uppercase transition-colors group-hover:text-red-500">
            AtoZ
          </span>
          <span className="bg-red-600 text-white px-1.5 rounded-sm font-black text-2xl tracking-tighter uppercase italic shadow-[0_0_15px_rgba(220,38,38,0.3)]">
            Movies
          </span>
        </Link>

        {/* Search Bar */}
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

        {/* User Actions */}
        <div className="flex items-center gap-5">
          {user ? (
            <div className="flex items-center gap-4">
              <Link
                to="/favorites"
                className="p-2 hover:bg-neutral-900 rounded-full transition-colors group"
              >
                <Heart className="w-5 h-5 text-neutral-400 group-hover:text-red-500" />
              </Link>
              <Link
                to="/watchlist"
                className="p-2 hover:bg-neutral-900 rounded-full transition-colors group"
              >
                <Bookmark className="w-5 h-5 text-neutral-400 group-hover:text-blue-500" />
              </Link>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="p-2 hover:bg-neutral-900 rounded-full transition-colors group border border-red-900/30"
                >
                  <LayoutDashboard className="w-5 h-5 text-red-500" />
                </Link>
              )}
              <div className="h-8 w-px bg-neutral-800 mx-1"></div>
              <Link
                to="/profile"
                className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center font-bold text-black text-xs"
              >
                {user.username?.charAt(0).toUpperCase()}
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
                className="bg-red-600 hover:bg-red-700 py-2 px-5 rounded font-black text-xs text-white uppercase tracking-tighter transition-all shadow-lg"
              >
                Join AtoZ
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Secondary Category Bar */}
      <div
        className="bg-[#111]  border-b border-neutral-800 px-6 py-2.5 relative"
        ref={dropdownRef}
      >
        <div className="flex items-center gap-8 max-w-7xl mx-auto">
          <Link
            to="/"
            className="text-red-500 font-black text-xs uppercase flex items-center gap-1.5 hover:opacity-80 transition-opacity shrink-0"
          >
            <Zap className="w-3.5 h-3.5 fill-current" /> HOME
          </Link>

          <div className="flex items-center gap-8">
            {categories.map((cat, index) => (
              <div key={index} className="relative flex items-center">
                <button
                  onClick={() =>
                    cat.items &&
                    setActiveDropdown(
                      activeDropdown === cat.name ? null : cat.name,
                    )
                  }
                  className="flex items-center gap-1.5 group cursor-pointer focus:outline-none whitespace-nowrap"
                >
                  {cat.icon && (
                    <span className="text-xs group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </span>
                  )}
                  <span
                    className={`text-[11px] font-black uppercase tracking-tight transition-colors ${activeDropdown === cat.name ? "text-red-500" : "text-neutral-300 group-hover:text-white"}`}
                  >
                    {cat.name}
                  </span>
                  {cat.items && (
                    <ChevronDown
                      className={`w-3 h-3 text-neutral-600 transition-transform ${activeDropdown === cat.name ? "rotate-180 text-red-500" : ""}`}
                    />
                  )}
                </button>

                {/* Dropdown Menu Content */}
                {activeDropdown === cat.name && cat.items && (
                  <div className="absolute top-[calc(100%+10px)] left-0 min-w-[160px] bg-[#0a0a0a] border border-neutral-800 rounded shadow-2xl py-2 z-[110]">
                    {cat.items.map((subItem, i) => (
                      <Link
                        key={i}
                        to={`/filter?category=${cat.name}&value=${subItem}`}
                        className="block px-4 py-2 text-[10px] font-bold text-neutral-400 hover:text-white hover:bg-red-600/10 transition-colors uppercase"
                        onClick={() => setActiveDropdown(null)}
                      >
                        {subItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex-1"></div>

          {/* Quality Badges */}
          <div className="hidden lg:flex items-center gap-4 border-l border-neutral-800 pl-8 shrink-0">
            <span className="text-[10px] font-bold text-neutral-500 uppercase">
              Quality:
            </span>
            {["4K", "1080P", "720P"].map((q) => (
              <span
                key={q}
                className="text-neutral-400 text-[10px] font-black border border-neutral-800 px-2 py-0.5 rounded"
              >
                {q}
              </span>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
