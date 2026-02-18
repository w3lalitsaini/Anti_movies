import React, { useState, useEffect, useRef } from 'react';
import API from '../api/axios';
import { toast } from 'react-toastify';
import { Plus, Pencil, Trash2, X, Upload, Loader2, ImagePlus } from 'lucide-react';

const GENRES = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Horror', 'Romance', 'Animation', 'Documentary', 'Fantasy'];
const QUALITIES = ['CAM', 'HD', 'FHD', 'BluRay', '4K'];

const emptyForm = {
    title: '', description: '', poster: '', trailer: '',
    genre: [], director: '', language: '', runtime: '', quality: 'HD',
    releaseDate: '', isTrending: false,
    affiliateLinks: { netflix: '', amazon: '', hotstar: '', prime: '' },
    cast: [{ actorName: '', characterName: '', photo: '' }],
    screenshots: [],
    faqs: [{ question: '', answer: '' }],
};

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [uploadingPoster, setUploadingPoster] = useState(false);
    const [uploadingScreenshots, setUploadingScreenshots] = useState(false);
    const [uploadingActorPhoto, setUploadingActorPhoto] = useState(null);
    const posterInputRef = useRef();
    const screenshotsInputRef = useRef();
    const actorPhotoRefs = useRef([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [statsRes, moviesRes] = await Promise.all([
                API.get('/admin/stats'),
                API.get('/movies?limit=100'),
            ]);
            setStats(statsRes.data);
            setMovies(moviesRes.data.movies || moviesRes.data);
        } catch (err) {
            toast.error('Failed to load dashboard data');
        } finally {
            setLoading(false);
        }
    };

    // --- Cloudinary Upload Helpers ---
    const uploadImage = async (file) => {
        const data = new FormData();
        data.append('image', file);
        const res = await API.post('/upload/image', data, { headers: { 'Content-Type': 'multipart/form-data' } });
        return res.data.url;
    };

    const handlePosterUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingPoster(true);
        try {
            const url = await uploadImage(file);
            setForm(f => ({ ...f, poster: url }));
            toast.success('Poster uploaded!');
        } catch {
            toast.error('Poster upload failed');
        } finally {
            setUploadingPoster(false);
        }
    };

    const handleScreenshotsUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (!files.length) return;
        setUploadingScreenshots(true);
        try {
            const data = new FormData();
            files.forEach(f => data.append('images', f));
            const res = await API.post('/upload/images', data, { headers: { 'Content-Type': 'multipart/form-data' } });
            setForm(f => ({ ...f, screenshots: [...f.screenshots, ...res.data.urls] }));
            toast.success(`${res.data.urls.length} screenshot(s) uploaded!`);
        } catch {
            toast.error('Screenshots upload failed');
        } finally {
            setUploadingScreenshots(false);
        }
    };

    const handleActorPhotoUpload = async (e, idx) => {
        const file = e.target.files[0];
        if (!file) return;
        setUploadingActorPhoto(idx);
        try {
            const url = await uploadImage(file);
            const newCast = [...form.cast];
            newCast[idx] = { ...newCast[idx], photo: url };
            setForm(f => ({ ...f, cast: newCast }));
            toast.success('Actor photo uploaded!');
        } catch {
            toast.error('Actor photo upload failed');
        } finally {
            setUploadingActorPhoto(null);
        }
    };

    // --- Form Helpers ---
    const handleGenreToggle = (g) => {
        setForm(f => ({
            ...f,
            genre: f.genre.includes(g) ? f.genre.filter(x => x !== g) : [...f.genre, g]
        }));
    };

    const handleCastChange = (idx, field, val) => {
        const newCast = [...form.cast];
        newCast[idx] = { ...newCast[idx], [field]: val };
        setForm(f => ({ ...f, cast: newCast }));
    };

    const addCastRow = () => setForm(f => ({ ...f, cast: [...f.cast, { actorName: '', characterName: '', photo: '' }] }));
    const removeCastRow = (idx) => setForm(f => ({ ...f, cast: f.cast.filter((_, i) => i !== idx) }));

    const handleFaqChange = (idx, field, val) => {
        const newFaqs = [...form.faqs];
        newFaqs[idx] = { ...newFaqs[idx], [field]: val };
        setForm(f => ({ ...f, faqs: newFaqs }));
    };

    const addFaqRow = () => setForm(f => ({ ...f, faqs: [...f.faqs, { question: '', answer: '' }] }));
    const removeFaqRow = (idx) => setForm(f => ({ ...f, faqs: f.faqs.filter((_, i) => i !== idx) }));

    const removeScreenshot = (idx) => setForm(f => ({ ...f, screenshots: f.screenshots.filter((_, i) => i !== idx) }));

    const openCreate = () => {
        setEditingMovie(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEdit = (movie) => {
        setEditingMovie(movie);
        setForm({
            title: movie.title || '',
            description: movie.description || '',
            poster: movie.poster || '',
            trailer: movie.trailer || '',
            genre: movie.genre || [],
            director: movie.director || '',
            language: movie.language || '',
            runtime: movie.runtime || '',
            quality: movie.quality || 'HD',
            releaseDate: movie.releaseDate ? movie.releaseDate.split('T')[0] : '',
            isTrending: movie.isTrending || false,
            affiliateLinks: { netflix: '', amazon: '', hotstar: '', prime: '', ...movie.affiliateLinks },
            cast: movie.cast?.length > 0 ? movie.cast.map(c =>
                typeof c === 'string' ? { actorName: c, characterName: '', photo: '' } : c
            ) : [{ actorName: '', characterName: '', photo: '' }],
            screenshots: movie.screenshots || [],
            faqs: movie.faqs?.length > 0 ? movie.faqs : [{ question: '', answer: '' }],
        });
        setShowModal(true);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const payload = {
                ...form,
                cast: form.cast.filter(c => c.actorName.trim()),
                faqs: form.faqs.filter(f => f.question.trim()),
                screenshots: form.screenshots.filter(Boolean),
            };
            if (editingMovie) {
                await API.put(`/movies/${editingMovie._id}`, payload);
                toast.success('Movie updated!');
            } else {
                await API.post('/movies', payload);
                toast.success('Movie created!');
            }
            setShowModal(false);
            fetchData();
        } catch (err) {
            toast.error(err.response?.data?.message || 'Save failed');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this movie?')) return;
        try {
            await API.delete(`/movies/${id}`);
            toast.success('Movie deleted');
            fetchData();
        } catch {
            toast.error('Delete failed');
        }
    };

    if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

            {/* Stats */}
            {stats && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Movies', value: stats.totalMovies, color: 'text-primary' },
                        { label: 'Total Users', value: stats.totalUsers, color: 'text-blue-400' },
                        { label: 'Total Reviews', value: stats.totalReviews, color: 'text-accent' },
                        { label: 'Genres', value: stats.genreDistribution?.length || 0, color: 'text-green-400' },
                    ].map(s => (
                        <div key={s.label} className="glass rounded-xl p-5 text-center">
                            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
                            <p className="text-neutral-400 text-sm mt-1">{s.label}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Genre Chart */}
            {stats?.genreDistribution?.length > 0 && (
                <div className="glass rounded-xl p-6 mb-8">
                    <h2 className="font-bold mb-4">Genre Distribution</h2>
                    <div className="space-y-2">
                        {stats.genreDistribution.map(g => {
                            const max = Math.max(...stats.genreDistribution.map(x => x.count));
                            return (
                                <div key={g._id} className="flex items-center gap-3">
                                    <span className="text-sm text-neutral-400 w-20 flex-shrink-0">{g._id}</span>
                                    <div className="flex-1 bg-neutral-800 rounded-full h-3">
                                        <div className="bg-primary h-3 rounded-full transition-all" style={{ width: `${(g.count / max) * 100}%` }} />
                                    </div>
                                    <span className="text-sm text-neutral-400 w-6">{g.count}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Movies Table */}
            <div className="glass rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg">Manage Movies</h2>
                    <button onClick={openCreate} className="btn-primary flex items-center gap-2 py-2 px-4 text-sm">
                        <Plus className="w-4 h-4" /> Add Movie
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="border-b border-neutral-700 text-neutral-400">
                                <th className="text-left py-2 px-3">Poster</th>
                                <th className="text-left py-2 px-3">Title</th>
                                <th className="text-left py-2 px-3">Genre</th>
                                <th className="text-left py-2 px-3">Rating</th>
                                <th className="text-left py-2 px-3">Trending</th>
                                <th className="text-left py-2 px-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {movies.map(movie => (
                                <tr key={movie._id} className="border-b border-neutral-800 hover:bg-neutral-900/50">
                                    <td className="py-2 px-3">
                                        <img src={movie.poster} alt={movie.title}
                                            className="w-10 h-14 object-cover rounded"
                                            onError={(e) => { e.target.src = `https://via.placeholder.com/40x56/1a1a1a/e50914?text=M`; }} />
                                    </td>
                                    <td className="py-2 px-3 font-medium max-w-xs truncate">{movie.title}</td>
                                    <td className="py-2 px-3 text-neutral-400">{movie.genre?.join(', ')}</td>
                                    <td className="py-2 px-3 text-accent">{movie.rating?.toFixed(1)}</td>
                                    <td className="py-2 px-3">{movie.isTrending ? '🔥' : '—'}</td>
                                    <td className="py-2 px-3">
                                        <div className="flex gap-2">
                                            <button onClick={() => openEdit(movie)} className="p-1.5 bg-blue-900/40 hover:bg-blue-800/60 rounded-lg transition-colors">
                                                <Pencil className="w-4 h-4 text-blue-400" />
                                            </button>
                                            <button onClick={() => handleDelete(movie._id)} className="p-1.5 bg-red-900/40 hover:bg-red-800/60 rounded-lg transition-colors">
                                                <Trash2 className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-start justify-center p-4 overflow-y-auto">
                    <div className="glass rounded-2xl w-full max-w-3xl my-8">
                        <div className="flex items-center justify-between p-6 border-b border-neutral-700">
                            <h2 className="text-xl font-bold">{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
                            <button onClick={() => setShowModal(false)} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 space-y-6">
                            {/* Basic Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-neutral-400 mb-1">Title *</label>
                                    <input className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-primary"
                                        value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-neutral-400 mb-1">Description *</label>
                                    <textarea className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-primary resize-none h-24"
                                        value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Director</label>
                                    <input className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-primary"
                                        value={form.director} onChange={e => setForm(f => ({ ...f, director: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Language</label>
                                    <input className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-primary"
                                        placeholder="e.g. Hindi, English" value={form.language} onChange={e => setForm(f => ({ ...f, language: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Runtime</label>
                                    <input className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-primary"
                                        placeholder="e.g. 148 Minutes" value={form.runtime} onChange={e => setForm(f => ({ ...f, runtime: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Release Date</label>
                                    <input type="date" className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-primary"
                                        value={form.releaseDate} onChange={e => setForm(f => ({ ...f, releaseDate: e.target.value }))} />
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Quality</label>
                                    <select className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-primary"
                                        value={form.quality} onChange={e => setForm(f => ({ ...f, quality: e.target.value }))}>
                                        {QUALITIES.map(q => <option key={q} value={q}>{q}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm text-neutral-400 mb-1">Trailer URL</label>
                                    <input className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-primary"
                                        placeholder="https://youtube.com/..." value={form.trailer} onChange={e => setForm(f => ({ ...f, trailer: e.target.value }))} />
                                </div>
                                <div className="flex items-center gap-3 pt-6">
                                    <input type="checkbox" id="trending" className="w-4 h-4 accent-primary"
                                        checked={form.isTrending} onChange={e => setForm(f => ({ ...f, isTrending: e.target.checked }))} />
                                    <label htmlFor="trending" className="text-sm text-neutral-300">Mark as Trending 🔥</label>
                                </div>
                            </div>

                            {/* Poster Upload */}
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Movie Poster *</label>
                                <div className="flex gap-3 items-start">
                                    <div className="flex-1">
                                        <input className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2.5 px-4 text-sm focus:outline-none focus:border-primary mb-2"
                                            placeholder="Or paste image URL directly"
                                            value={form.poster} onChange={e => setForm(f => ({ ...f, poster: e.target.value }))} required />
                                        <input ref={posterInputRef} type="file" accept="image/*" className="hidden" onChange={handlePosterUpload} />
                                        <button type="button" onClick={() => posterInputRef.current.click()}
                                            disabled={uploadingPoster}
                                            className="flex items-center gap-2 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 text-sm py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                                            {uploadingPoster ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                            {uploadingPoster ? 'Uploading...' : 'Upload from Device'}
                                        </button>
                                    </div>
                                    {form.poster && (
                                        <img src={form.poster} alt="Poster preview" className="w-20 h-28 object-cover rounded-lg border border-neutral-700 flex-shrink-0"
                                            onError={(e) => { e.target.style.display = 'none'; }} />
                                    )}
                                </div>
                            </div>

                            {/* Genres */}
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Genres</label>
                                <div className="flex flex-wrap gap-2">
                                    {GENRES.map(g => (
                                        <button key={g} type="button" onClick={() => handleGenreToggle(g)}
                                            className={`px-3 py-1.5 rounded-full text-sm font-medium border transition-colors ${form.genre.includes(g) ? 'bg-primary border-primary text-white' : 'bg-neutral-900 border-neutral-700 text-neutral-400 hover:border-neutral-500'}`}>
                                            {g}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Affiliate Links */}
                            <div>
                                <label className="block text-sm text-neutral-400 mb-2">Affiliate / Watch Links</label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {['netflix', 'amazon', 'hotstar', 'prime'].map(platform => (
                                        <div key={platform}>
                                            <label className="block text-xs text-neutral-500 mb-1 capitalize">{platform}</label>
                                            <input className="w-full bg-neutral-900 border border-neutral-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary"
                                                placeholder={`https://${platform}.com/...`}
                                                value={form.affiliateLinks[platform]}
                                                onChange={e => setForm(f => ({ ...f, affiliateLinks: { ...f.affiliateLinks, [platform]: e.target.value } }))} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Cast */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-neutral-400">Cast Members</label>
                                    <button type="button" onClick={addCastRow} className="text-xs text-primary hover:underline flex items-center gap-1">
                                        <Plus className="w-3 h-3" /> Add Member
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {form.cast.map((member, idx) => (
                                        <div key={idx} className="flex gap-2 items-center bg-neutral-900 rounded-xl p-3">
                                            {/* Actor Photo */}
                                            <div className="flex-shrink-0">
                                                {member.photo ? (
                                                    <img src={member.photo} alt="Actor" className="w-10 h-10 rounded-full object-cover border border-neutral-700" />
                                                ) : (
                                                    <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                                                        <ImagePlus className="w-4 h-4 text-neutral-600" />
                                                    </div>
                                                )}
                                                <input ref={el => actorPhotoRefs.current[idx] = el} type="file" accept="image/*" className="hidden"
                                                    onChange={e => handleActorPhotoUpload(e, idx)} />
                                                <button type="button" onClick={() => actorPhotoRefs.current[idx]?.click()}
                                                    disabled={uploadingActorPhoto === idx}
                                                    className="text-xs text-neutral-500 hover:text-primary mt-1 block text-center w-full transition-colors">
                                                    {uploadingActorPhoto === idx ? '...' : 'Photo'}
                                                </button>
                                            </div>
                                            <input className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary"
                                                placeholder="Actor Name" value={member.actorName}
                                                onChange={e => handleCastChange(idx, 'actorName', e.target.value)} />
                                            <input className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary"
                                                placeholder="Character Name" value={member.characterName}
                                                onChange={e => handleCastChange(idx, 'characterName', e.target.value)} />
                                            <button type="button" onClick={() => removeCastRow(idx)} className="p-1.5 hover:bg-red-900/40 rounded-lg transition-colors">
                                                <X className="w-4 h-4 text-red-400" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Screenshots */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-neutral-400">Screenshots</label>
                                    <div className="flex items-center gap-2">
                                        <input ref={screenshotsInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleScreenshotsUpload} />
                                        <button type="button" onClick={() => screenshotsInputRef.current.click()}
                                            disabled={uploadingScreenshots}
                                            className="flex items-center gap-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 py-1.5 px-3 rounded-lg transition-colors disabled:opacity-50">
                                            {uploadingScreenshots ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
                                            {uploadingScreenshots ? 'Uploading...' : 'Upload Screenshots'}
                                        </button>
                                    </div>
                                </div>
                                {form.screenshots.length > 0 && (
                                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                                        {form.screenshots.map((url, idx) => (
                                            <div key={idx} className="relative group aspect-video">
                                                <img src={url} alt={`Screenshot ${idx + 1}`} className="w-full h-full object-cover rounded-lg" />
                                                <button type="button" onClick={() => removeScreenshot(idx)}
                                                    className="absolute top-1 right-1 bg-black/70 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <X className="w-3 h-3 text-white" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* FAQs */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-sm text-neutral-400">FAQs</label>
                                    <button type="button" onClick={addFaqRow} className="text-xs text-primary hover:underline flex items-center gap-1">
                                        <Plus className="w-3 h-3" /> Add FAQ
                                    </button>
                                </div>
                                <div className="space-y-3">
                                    {form.faqs.map((faq, idx) => (
                                        <div key={idx} className="bg-neutral-900 rounded-xl p-3 space-y-2">
                                            <div className="flex gap-2">
                                                <input className="flex-1 bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary"
                                                    placeholder="Question" value={faq.question}
                                                    onChange={e => handleFaqChange(idx, 'question', e.target.value)} />
                                                <button type="button" onClick={() => removeFaqRow(idx)} className="p-1.5 hover:bg-red-900/40 rounded-lg transition-colors">
                                                    <X className="w-4 h-4 text-red-400" />
                                                </button>
                                            </div>
                                            <textarea className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-2 px-3 text-sm focus:outline-none focus:border-primary resize-none h-16"
                                                placeholder="Answer" value={faq.answer}
                                                onChange={e => handleFaqChange(idx, 'answer', e.target.value)} />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex gap-3 pt-2 border-t border-neutral-700">
                                <button type="button" onClick={() => setShowModal(false)} className="btn-secondary flex-1 py-2.5">Cancel</button>
                                <button type="submit" disabled={saving} className="btn-primary flex-1 py-2.5 flex items-center justify-center gap-2">
                                    {saving ? <><Loader2 className="w-4 h-4 animate-spin" /> Saving...</> : (editingMovie ? 'Update Movie' : 'Create Movie')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
