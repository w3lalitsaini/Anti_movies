import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  ShieldCheck,
} from "lucide-react";

const Footer = () => {
  return (
    /* xl:px-[200px] ensures the footer content stays centered between your side ads */
    <footer className="bg-[#0a0a0a] border-t border-neutral-800 pt-16 pb-8 px-6 xl:px-[200px] mt-20 relative z-20">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Section: Branding & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-1">
            <Link
              to="/"
              className="text-3xl font-black text-primary tracking-tighter uppercase italic"
            >
              CineRate
            </Link>
            <p className="text-neutral-400 mt-4 leading-relaxed">
              The world's most popular destination for Movie enthusiasts. Get
              the latest Dual Audio, Bollywood, and Hollywood updates instantly.
            </p>
            <div className="flex gap-4 mt-6">
              <Facebook className="w-5 h-5 text-neutral-500 hover:text-primary cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-neutral-500 hover:text-primary cursor-pointer transition-colors" />
              <Instagram className="w-5 h-5 text-neutral-500 hover:text-primary cursor-pointer transition-colors" />
              <Youtube className="w-5 h-5 text-neutral-500 hover:text-primary cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links for SEO */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
              Navigation
            </h4>
            <ul className="space-y-3 text-neutral-500 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/trending"
                  className="hover:text-primary transition-colors"
                >
                  Trending Now
                </Link>
              </li>
              <li>
                <Link
                  to="/dual-audio"
                  className="hover:text-primary transition-colors"
                >
                  Dual Audio Content
                </Link>
              </li>
              <li>
                <Link
                  to="/watchlist"
                  className="hover:text-primary transition-colors"
                >
                  My Watchlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Content Categories */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
              Categories
            </h4>
            <ul className="space-y-3 text-neutral-500 text-sm">
              <li>
                <Link
                  to="/?genre=Action"
                  className="hover:text-primary transition-colors"
                >
                  Action Movies
                </Link>
              </li>
              <li>
                <Link
                  to="/?genre=Bollywood"
                  className="hover:text-primary transition-colors"
                >
                  Bollywood Hits
                </Link>
              </li>
              <li>
                <Link
                  to="/?genre=Hollywood"
                  className="hover:text-primary transition-colors"
                >
                  Hollywood Classics
                </Link>
              </li>
              <li>
                <Link
                  to="/?genre=Sci-Fi"
                  className="hover:text-primary transition-colors"
                >
                  Science Fiction
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Professional Touch */}
          <div>
            <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-sm">
              Stay Updated
            </h4>
            <p className="text-neutral-500 text-xs mb-4">
              Subscribe to get notified about the latest movie releases.
            </p>
            <div className="flex bg-neutral-900 rounded-lg p-1 border border-neutral-800">
              <input
                type="email"
                placeholder="Email address"
                className="bg-transparent border-none text-white text-xs px-3 focus:outline-none w-full"
              />
              <button className="bg-primary text-black p-2 rounded-md hover:bg-yellow-500 transition-all">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-neutral-600 text-xs">
            <ShieldCheck className="w-4 h-4" />
            <span>Trusted by over 1 Million Cinephiles</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-neutral-500">
            <a href="#" className="hover:text-white transition-colors">
              DMCA
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact Us
            </a>
          </div>

          <div className="text-neutral-600 text-[10px] font-mono tracking-tighter">
            &copy; {new Date().getFullYear()} CINERATE MEDIA GROUP. ALL RIGHTS
            RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
