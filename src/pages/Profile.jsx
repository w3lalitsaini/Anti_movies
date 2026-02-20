import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { User, Mail, Shield, LogOut, Zap, Heart, Bookmark } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const { data } = await API.get("/auth/profile");
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
    navigate("/");
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center">
        <Zap className="w-12 h-12 text-red-600 animate-pulse mb-4" />
        <h2 className="text-white font-black tracking-widest uppercase italic">
          LOADING PROFILE...
        </h2>
      </div>
    );

  return (
    <div className="bg-[#050505] min-h-screen text-neutral-300 font-sans pb-20">
      <Helmet>
        <title>{`${profile?.username} - User Profile | AtoZ Movies`}</title>
      </Helmet>

      {/* HEADER SECTION */}
      <div className="bg-red-600 py-2 text-center text-[10px] font-black text-white uppercase tracking-[0.3em] sticky top-0 z-50">
        MEMBER PROFILE DASHBOARD • ATOZ MOVIES OFFICIAL NETWORK
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12">
        <div className="bg-[#0c0c0c] border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          {/* Cover Accent */}
          <div className="h-24 bg-linear-to-r from-red-600 to-red-900"></div>

          <div className="px-8 pb-10 relative">
            {/* Avatar */}
            <div className="absolute -top-12 left-8">
              <div className="w-24 h-24 bg-black border-4 border-[#0c0c0c] rounded-2xl flex items-center justify-center text-4xl font-black text-red-600 shadow-xl overflow-hidden">
                <span className="bg-neutral-900 w-full h-full flex items-center justify-center italic">
                  {profile?.username?.[0]?.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="pt-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter">
                  {profile?.username}
                </h1>
                <div className="flex flex-wrap items-center gap-4 mt-3">
                  <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-black uppercase tracking-widest">
                    <Mail className="w-3.5 h-3.5 text-red-600" />
                    {profile?.email}
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-500 text-[10px] font-black uppercase tracking-widest border-l border-neutral-800 pl-4">
                    <Shield className="w-3.5 h-3.5 text-red-600" />
                    Role:{" "}
                    <span className="text-white">
                      {profile?.role === "admin" ? "ADMINISTRATOR" : "MEMBER"}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 bg-neutral-900 border border-neutral-800 hover:border-red-600 text-neutral-400 hover:text-white px-6 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all italic"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out from Network
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
              <Link
                to="/favorites"
                className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-xl hover:border-red-600 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <Heart className="w-6 h-6 text-red-600 group-hover:fill-current transition-all" />
                  <span className="text-4xl font-black text-white italic">
                    {profile?.favorites?.length || 0}
                  </span>
                </div>
                <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
                  Saved Favorites
                </h3>
              </Link>

              <Link
                to="/watchlist"
                className="bg-neutral-900/40 border border-neutral-800 p-6 rounded-xl hover:border-blue-600 transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <Bookmark className="w-6 h-6 text-blue-500 group-hover:fill-current transition-all" />
                  <span className="text-4xl font-black text-white italic">
                    {profile?.watchlist?.length || 0}
                  </span>
                </div>
                <h3 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em]">
                  Personal Watchlist
                </h3>
              </Link>
            </div>

            {profile?.role === "admin" && (
              <div className="mt-8">
                <Link
                  to="/admin"
                  className="block w-full text-center bg-red-600/10 border border-red-600/30 hover:bg-red-600 text-red-600 hover:text-white py-4 rounded-xl font-black text-[11px] uppercase tracking-[0.3em] transition-all italic"
                >
                  Enter Command Center (Admin Dashboard)
                </Link>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 text-center text-[10px] font-bold text-neutral-700 uppercase tracking-widest">
          AtoZ Movies Database Archive &bull; Protocol v2.5
        </div>
      </div>
    </div>
  );
};

export default Profile;
