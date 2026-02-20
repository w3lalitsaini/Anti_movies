import React, { useState } from "react";
import siteConfig from "../config/siteConfig";
import {
  Mail,
  Send,
  MessageSquare,
  Phone,
  MapPin,
  Loader2,
} from "lucide-react";
import { toast } from "react-toastify";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Message sent successfully!");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20">
              <MessageSquare className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="text-4xl font-black uppercase italic tracking-tighter">
              Get In <span className="text-red-600">Touch</span>
            </h1>
          </div>
          <p className="text-neutral-500 max-w-md font-medium">
            Have questions or feedback? We'd love to hear from you. Our support
            team is available 24/7 to assist with your inquiries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-neutral-900/40 p-6 rounded-2xl border border-neutral-800 flex items-center gap-4">
            <Mail className="w-6 h-6 text-red-600" />
            <div>
              <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">
                Email Support
              </p>
              <p className="text-white font-bold text-sm tracking-tight">
                {siteConfig.contactEmail}
              </p>
            </div>
          </div>
          <div className="bg-neutral-900/40 p-6 rounded-2xl border border-neutral-800 flex items-center gap-4">
            <Send className="w-6 h-6 text-blue-500" />
            <div>
              <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">
                Telegram
              </p>
              <p className="text-white font-bold text-sm tracking-tight">
                @atozmovies_support
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8 md:p-10 space-y-6 border border-neutral-800/50"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] text-neutral-500 font-black uppercase tracking-widest ml-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-red-600 transition-colors"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] text-neutral-500 font-black uppercase tracking-widest ml-1">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-red-600 transition-colors"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-neutral-500 font-black uppercase tracking-widest ml-1">
                Subject
              </label>
              <input
                required
                type="text"
                placeholder="How can we help?"
                className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-red-600 transition-colors"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] text-neutral-500 font-black uppercase tracking-widest ml-1">
                Message
              </label>
              <textarea
                required
                rows="5"
                placeholder="Tell us more about your inquiry..."
                className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-red-600 transition-colors resize-none"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
            </div>
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-black uppercase tracking-[0.2em] text-xs transition-all flex items-center justify-center gap-3 shadow-xl shadow-red-900/20 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="glass rounded-3xl p-8 border border-neutral-800/50">
            <h3 className="text-white font-black text-xs uppercase mb-6 tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-600 rounded-full" /> Quick
              Support
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4 text-neutral-500" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">
                    Phone
                  </p>
                  <p className="text-white font-bold text-xs">
                    +1 (555) 000-0000
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-neutral-500" />
                </div>
                <div>
                  <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest">
                    Office
                  </p>
                  <p className="text-white font-bold text-xs tracking-tight leading-relaxed">
                    ATOZ MOVIES HQ
                    <br />
                    Digital Plaza, Suite 404
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-red-600 rounded-3xl p-8 text-white shadow-2xl shadow-red-900/40 relative overflow-hidden group">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />
            <h3 className="font-black text-lg uppercase italic tracking-tighter mb-2">
              Join Our Channel
            </h3>
            <p className="text-xs text-white/80 font-bold mb-6">
              Get instant updates on the latest uploads and technical news.
            </p>
            <a
              href={siteConfig.links.telegram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-white text-red-600 px-6 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-neutral-100 transition-colors"
            >
              <Send className="w-4 h-4" /> Telegram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
