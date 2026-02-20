import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { Zap, Mail, Lock, User } from "lucide-react";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    setLoading(true);
    try {
      const { data } = await API.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });
      login(data);
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-[#050505]"
      style={{
        backgroundImage:
          "radial-gradient(circle at bottom left, #2a0505 0%, #050505 60%)",
      }}
    >
      <div className="bg-[#0c0c0c] border border-neutral-800 rounded-2xl p-8 w-full max-w-md shadow-2xl relative overflow-hidden">
        {/* Brand Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-red-600"></div>

        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex items-center gap-1 bg-black p-2 rounded-lg border border-neutral-800">
              <span className="text-white font-black text-xl tracking-tighter uppercase">
                AtoZ
              </span>
              <span className="bg-red-600 text-white px-1 rounded-sm font-black text-xl tracking-tighter uppercase italic">
                Movies
              </span>
            </div>
          </div>
          <h1 className="text-2xl font-black text-white uppercase italic tracking-tighter">
            Create Account
          </h1>
          <p className="text-neutral-500 text-xs font-bold mt-2 uppercase tracking-widest">
            Join the premier movie network
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative group">
            <User className="absolute left-3 top-3.5 w-5 h-5 text-neutral-600 group-focus-within:text-red-600 transition-colors" />
            <input
              type="text"
              name="username"
              placeholder="USERNAME"
              className="w-full bg-black border border-neutral-800 rounded-lg py-3.5 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-neutral-700 uppercase"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-neutral-600 group-focus-within:text-red-600 transition-colors" />
            <input
              type="email"
              name="email"
              placeholder="EMAIL ADDRESS"
              className="w-full bg-black border border-neutral-800 rounded-lg py-3.5 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-neutral-700 uppercase"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-neutral-600 group-focus-within:text-red-600 transition-colors" />
            <input
              type="password"
              name="password"
              placeholder="PASSWORD"
              className="w-full bg-black border border-neutral-800 rounded-lg py-3.5 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-neutral-700 uppercase"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-neutral-600 group-focus-within:text-red-600 transition-colors" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="CONFIRM PASSWORD"
              className="w-full bg-black border border-neutral-800 rounded-lg py-3.5 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-neutral-700 uppercase"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-4 rounded-lg text-xs font-black uppercase tracking-[0.2em] transition-all transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              "CREATING..."
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                REGISTER NOW
              </>
            )}
          </button>
        </form>

        <p className="text-center text-neutral-500 text-[10px] font-bold mt-8 uppercase tracking-widest">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-red-600 hover:text-red-500 transition-colors"
          >
            Sign In here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
