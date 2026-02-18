import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import { Film, Mail, Lock, User } from 'lucide-react';

const Signup = () => {
    const [form, setForm] = useState({ username: '', email: '', password: '', confirmPassword: '' });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            return toast.error('Passwords do not match');
        }
        setLoading(true);
        try {
            const { data } = await API.post('/auth/register', {
                username: form.username,
                email: form.email,
                password: form.password,
            });
            login(data);
            toast.success('Account created successfully!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed');
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
                    <h1 className="text-3xl font-bold text-white">Join CineRate</h1>
                    <p className="text-neutral-400 mt-2">Create your account</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <User className="absolute left-3 top-3.5 w-5 h-5 text-neutral-500" />
                        <input type="text" name="username" placeholder="Username"
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                            value={form.username} onChange={handleChange} required />
                    </div>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3.5 w-5 h-5 text-neutral-500" />
                        <input type="email" name="email" placeholder="Email address"
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                            value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-neutral-500" />
                        <input type="password" name="password" placeholder="Password"
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                            value={form.password} onChange={handleChange} required />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-3.5 w-5 h-5 text-neutral-500" />
                        <input type="password" name="confirmPassword" placeholder="Confirm Password"
                            className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:border-primary transition-colors"
                            value={form.confirmPassword} onChange={handleChange} required />
                    </div>
                    <button type="submit" disabled={loading}
                        className="w-full btn-primary py-3 text-lg disabled:opacity-50">
                        {loading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-center text-neutral-400 mt-6">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary hover:underline font-semibold">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
