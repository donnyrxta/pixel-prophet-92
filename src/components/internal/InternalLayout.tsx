/**
 * Internal Layout Component
 * Protected wrapper for internal tools with navigation
 */

import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { internalApi } from '@/lib/internal-api';
import {
    LayoutDashboard,
    Mail,
    FileText,
    Settings,
    Lock,
    LogOut,
    ChevronRight
} from 'lucide-react';

const STORAGE_KEY = 'soho-internal-auth';

export default function InternalLayout() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Check for stored auth on mount
    useEffect(() => {
        const storedPassword = sessionStorage.getItem(STORAGE_KEY);
        if (storedPassword) {
            internalApi.setPassword(storedPassword);
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Test the password by making a simple API call
            internalApi.setPassword(password);
            await internalApi.getCampaigns();

            // If successful, store and authenticate
            sessionStorage.setItem(STORAGE_KEY, password);
            setIsAuthenticated(true);
        } catch (err) {
            setError('Invalid password or API error');
            internalApi.setPassword('');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem(STORAGE_KEY);
        internalApi.setPassword('');
        setIsAuthenticated(false);
        setPassword('');
    };

    // Login screen
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
                <div className="w-full max-w-md">
                    <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700 shadow-2xl p-8">
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 mb-4">
                                <Lock className="w-8 h-8 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white">Internal Tools</h1>
                            <p className="text-gray-400 mt-2">SoHo Connect Cold Outreach</p>
                        </div>

                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Access Password
                                </label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="Enter password"
                                    required
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? 'Verifying...' : 'Access Dashboard'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    const navItems = [
        { path: '/internal', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/internal/campaign/new', label: 'New Campaign', icon: Mail },
        { path: '/internal/logs', label: 'Campaign Logs', icon: FileText },
        { path: '/internal/settings', label: 'Settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 h-full w-64 bg-gray-800/50 backdrop-blur-xl border-r border-gray-700">
                <div className="p-6">
                    <h1 className="text-xl font-bold text-white">SoHo Outreach</h1>
                    <p className="text-sm text-gray-400">Internal Tools</p>
                </div>

                <nav className="px-3 space-y-1">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white border border-blue-500/30'
                                        : 'text-gray-400 hover:bg-gray-700/50 hover:text-white'
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span>{item.label}</span>
                                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-64 min-h-screen p-8">
                <Outlet />
            </main>
        </div>
    );
}
