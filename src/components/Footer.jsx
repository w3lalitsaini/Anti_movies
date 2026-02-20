import React from "react";
import { Link } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  ShieldCheck,
  Send,
  Zap,
} from "lucide-react";
import siteConfig from "../config/siteConfig";

const Footer = () => {
  return (
    <footer className="bg-[#050505] border-t border-neutral-800 pt-16 pb-8 px-6 xl:px-[200px] mt-20 relative z-20">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Section: Branding & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 lg:col-span-1">
            {/* BRAND LOGO */}
            <Link to="/" className="flex items-center gap-1 mb-6">
              <span className="text-white font-black text-3xl tracking-tighter uppercase">
                AtoZ
              </span>
              <span className="bg-red-600 text-white px-1.5 rounded-sm font-black text-3xl tracking-tighter uppercase italic">
                Movies
              </span>
            </Link>

            <p className="text-neutral-500 mt-4 text-sm leading-relaxed">
              AtoZ Movies is the premier destination for high-quality movie
              downloads. We provide the latest Bollywood, Hollywood, and South
              Hindi Dubbed content in 480p, 720p, and 1080p WEB-DL qualities.
            </p>

            <div className="flex gap-4 mt-6">
              <a
                href={siteConfig.links.facebook}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 rounded hover:bg-red-600 hover:text-white text-neutral-500 transition-all cursor-pointer"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 rounded hover:bg-blue-400 hover:text-white text-neutral-500 transition-all cursor-pointer"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.links.youtube}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 rounded hover:bg-red-500 hover:text-white text-neutral-500 transition-all cursor-pointer"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noreferrer"
                className="p-2 bg-neutral-900 rounded hover:bg-blue-500 hover:text-white text-neutral-500 transition-all cursor-pointer"
              >
                <Send className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links for SEO */}
          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-xs flex items-center gap-2">
              <div className="w-1 h-4 bg-red-600"></div> Explore AtoZ
            </h4>
            <ul className="space-y-3 text-neutral-500 text-[13px] font-bold uppercase tracking-tight">
              <li>
                <Link to="/" className="hover:text-red-500 transition-colors">
                  Search Database
                </Link>
              </li>
              <li>
                <Link
                  to="/trending"
                  className="hover:text-red-500 transition-colors"
                >
                  Trending Now
                </Link>
              </li>
              <li>
                <Link
                  to="/dual-audio"
                  className="hover:text-red-500 transition-colors"
                >
                  Dual Audio 18+
                </Link>
              </li>
              <li>
                <Link
                  to="/web-series"
                  className="hover:text-red-500 transition-colors"
                >
                  Netflix Series
                </Link>
              </li>
            </ul>
          </div>

          {/* Content Categories */}
          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-xs flex items-center gap-2">
              <div className="w-1 h-4 bg-red-600"></div> Categories
            </h4>
            <ul className="space-y-3 text-neutral-500 text-[13px] font-bold uppercase tracking-tight">
              <li>
                <Link
                  to="/?genre=Action"
                  className="hover:text-red-500 transition-colors"
                >
                  Action & Sci-Fi
                </Link>
              </li>
              <li>
                <Link
                  to="/?genre=Bollywood"
                  className="hover:text-red-500 transition-colors"
                >
                  Bollywood Hindi
                </Link>
              </li>
              <li>
                <Link
                  to="/?genre=Hollywood"
                  className="hover:text-red-500 transition-colors"
                >
                  Hollywood English
                </Link>
              </li>
              <li>
                <Link
                  to="/?genre=South"
                  className="hover:text-red-500 transition-colors"
                >
                  South Hindi Dubbed
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter / Professional Touch */}
          <div>
            <h4 className="text-white font-black mb-6 uppercase tracking-[0.2em] text-xs flex items-center gap-2">
              <div className="w-1 h-4 bg-red-600"></div> Telegram Alerts
            </h4>
            <p className="text-neutral-500 text-xs mb-4 leading-loose">
              Join our Telegram channel or subscribe for the latest upload
              notifications.
            </p>
            <div className="flex bg-neutral-900 rounded p-1 border border-neutral-800">
              <input
                type="email"
                placeholder="Enter Email Address"
                className="bg-transparent border-none text-white text-[10px] font-bold px-3 focus:outline-none w-full uppercase"
              />
              <button className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-all">
                <Mail className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* SEO Technical Footer */}
        <div className="bg-neutral-900/20 p-6 rounded-lg border border-neutral-800/50 mb-8">
          <p className="text-[10px] text-neutral-600 leading-relaxed text-justify uppercase font-medium">
            Disclaimer: AtoZMovies.com does not store any files on its server.
            All contents are provided by non-affiliated third parties. AtoZ
            Movies indexes technical metadata of films including{" "}
            {new Date().getFullYear()} releases. We encourage users to watch
            movies in theaters or buy official streaming subscriptions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2 text-neutral-500 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="w-4 h-4 text-red-600" />
            <span>Secure SSL Encrypted Browsing</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-[10px] font-black uppercase text-neutral-500">
            <Link
              to={siteConfig.footerLinks.dmca}
              className="hover:text-red-500 transition-colors"
            >
              DMCA
            </Link>
            <Link
              to={siteConfig.footerLinks.privacy}
              className="hover:text-red-500 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to={siteConfig.footerLinks.contact}
              className="hover:text-red-500 transition-colors"
            >
              Contact
            </Link>
            <Link
              to={siteConfig.footerLinks.sitemap}
              className="hover:text-red-500 transition-colors"
            >
              Sitemap
            </Link>
          </div>

          <div className="text-neutral-700 text-[10px] font-black tracking-tighter uppercase">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-red-900">ATOZ MOVIES</span> NETWORK.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
