import React, { useState } from 'react';
import axios from 'axios';

export default function Login({ onLoggedIn }) {
    const [form, setForm] = useState({ UserName: '', passWord: '' });
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!form.UserName || !form.passWord) {
            setError('Please enter username and password.');
            return;
        }
        try {
            await axios.post('http://localhost:3002/api/login', form, { withCredentials: true });
            setError('');
            onLoggedIn();
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed.');
        }
    };

    return (
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
            <h2 className="mb-4 text-2xl font-semibold text-brand">System Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
                    <input
                        type="text"
                        name="UserName"
                        value={form.UserName}
                        onChange={(e) => setForm({ ...form, UserName: e.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20" required />
                </div>
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                    <input
                        type="password"
                        name="passWord"
                        value={form.passWord}
                        onChange={(e) => setForm({ ...form, passWord: e.target.value })}
                        className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm focus:border-accent focus:ring-2 focus:ring-accent/20" required />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button className="w-full rounded-2xl bg-accent px-4 py-3 text-white transition hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    );
}
