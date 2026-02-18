import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { Film, Mail, Lock } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { data } = await API.post('/auth/login', { email, password });
            login(data);
            toast.success(`Welcome back, ${data.username}!`);
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{background: 'radial-gradient(ellipse at center, #1a0a0a 0%, #0a0a0a 70%)'}}>
            <div className="glass rounded-2xl p-8 w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="flex justify-center mb-4">
                        <Film className="w-12 h-12 text-primary" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="text-neutral-400 mt-2">Sign in to CineRate</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-5 h-5 text-neutral-500" />
                        <input
                            type="email"
                            placeholder="Email address"
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-neutral-500" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn-primary py-3 text-lg disabled:opacity-50"
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <p className="text-center text-neutral-400 mt-6">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-primary hover:underline font-semibold">Sign Up</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
