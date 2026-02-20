import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import API from "../api/axios";
import { Zap, Mail, Lock } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await API.post("/auth/login", { email, password });
      login(data);
      toast.success(`Welcome back, ${data.username}!`);
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-[#050505]"
      style={{
        backgroundImage:
          "radial-gradient(circle at top right, #2a0505 0%, #050505 60%)",
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
            Member Access
          </h1>
          <p className="text-neutral-500 text-xs font-bold mt-2 uppercase tracking-widest">
            Sign in to your AtoZ account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative group">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-neutral-600 group-focus-within:text-red-600 transition-colors" />
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              className="w-full bg-black border border-neutral-800 rounded-lg py-3.5 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-neutral-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="relative group">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-neutral-600 group-focus-within:text-red-600 transition-colors" />
            <input
              type="password"
              placeholder="PASSWORD"
              className="w-full bg-black border border-neutral-800 rounded-lg py-3.5 pl-10 pr-4 text-xs font-bold text-white focus:outline-none focus:border-red-600 transition-all placeholder:text-neutral-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-3.5 rounded-lg text-xs font-black uppercase tracking-[0.2em] transition-all transform hover:scale-[1.02] disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              "PROCESSING..."
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current" />
                SIGN IN NOW
              </>
            )}
          </button>
        </form>

        <p className="text-center text-neutral-500 text-[10px] font-bold mt-8 uppercase tracking-widest">
          New to the network?{" "}
          <Link
            to="/signup"
            className="text-red-600 hover:text-red-500 transition-colors"
          >
            Join AtoZ Movies
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
