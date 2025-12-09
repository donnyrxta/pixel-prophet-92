/**
 * Internal Dashboard Page
 * Overview stats and quick actions
 */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { internalApi, Campaign, OutreachLog } from '@/lib/internal-api';
import {
    Mail,
    Users,
    TrendingUp,
    Clock,
    PlusCircle,
    ArrowRight,
    Loader2,
    AlertCircle
} from 'lucide-react';

interface Stats {
    totalCampaigns: number;
    totalEmailsSent: number;
    totalLeads: number;
    pendingFollowUps: number;
    recentCampaigns: Campaign[];
    recentLogs: OutreachLog[];
}

export default function InternalDashboard() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const [campaignsRes, logsRes] = await Promise.all([
                internalApi.getCampaigns(),
                internalApi.getLogs(undefined, undefined, 100),
            ]);

            const campaigns = campaignsRes.campaigns || [];
            const logs = logsRes.logs || [];

            setStats({
                totalCampaigns: campaigns.length,
                totalEmailsSent: logs.filter(l => l.status === 'sent').length,
                totalLeads: logs.length,
                pendingFollowUps: logs.filter(l => l.follow_up_scheduled_at && !l.follow_up_sent_at).length,
                recentCampaigns: campaigns.slice(0, 5),
                recentLogs: logs.slice(0, 10),
            });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load stats');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 bg-red-500/20 border border-red-500/30 rounded-xl text-red-400">
                <div className="flex items-center gap-3">
                    <AlertCircle className="w-6 h-6" />
                    <span>{error}</span>
                </div>
            </div>
        );
    }

    const statCards = [
        {
            label: 'Total Campaigns',
            value: stats?.totalCampaigns || 0,
            icon: Mail,
            color: 'from-blue-500 to-blue-600'
        },
        {
            label: 'Emails Sent',
            value: stats?.totalEmailsSent || 0,
            icon: TrendingUp,
            color: 'from-green-500 to-emerald-600'
        },
        {
            label: 'Total Leads',
            value: stats?.totalLeads || 0,
            icon: Users,
            color: 'from-purple-500 to-purple-600'
        },
        {
            label: 'Pending Follow-ups',
            value: stats?.pendingFollowUps || 0,
            icon: Clock,
            color: 'from-orange-500 to-amber-600'
        },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400 mt-1">Cold Outreach Overview</p>
                </div>
                <Link
                    to="/internal/campaign/new"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/25"
                >
                    <PlusCircle className="w-5 h-5" />
                    New Campaign
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.label}
                            className="relative overflow-hidden bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-6"
                        >
                            <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5`} />
                            <div className="relative">
                                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br ${stat.color} mb-4`}>
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <div className="text-3xl font-bold text-white">{stat.value}</div>
                                <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Campaigns */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Recent Campaigns</h2>
                        <Link
                            to="/internal/logs"
                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                        >
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {stats?.recentCampaigns.length === 0 ? (
                        <div className="text-center py-8">
                            <Mail className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-500">No campaigns yet</p>
                            <Link
                                to="/internal/campaign/new"
                                className="text-blue-400 hover:text-blue-300 text-sm mt-2 inline-block"
                            >
                                Create your first campaign
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {stats?.recentCampaigns.map((campaign) => (
                                <div
                                    key={campaign.id}
                                    className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                                >
                                    <div>
                                        <div className="text-white font-medium">{campaign.name}</div>
                                        <div className="text-gray-400 text-sm">
                                            {campaign.sent_count} / {campaign.total_leads} sent
                                        </div>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${campaign.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                            campaign.status === 'active' ? 'bg-blue-500/20 text-blue-400' :
                                                campaign.status === 'paused' ? 'bg-yellow-500/20 text-yellow-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                        }`}>
                                        {campaign.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Recent Emails */}
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white">Recent Outreach</h2>
                        <Link
                            to="/internal/logs"
                            className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
                        >
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {stats?.recentLogs.length === 0 ? (
                        <div className="text-center py-8">
                            <Users className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-500">No outreach yet</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {stats?.recentLogs.slice(0, 5).map((log) => (
                                <div
                                    key={log.id}
                                    className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg"
                                >
                                    <div className="min-w-0 flex-1">
                                        <div className="text-white font-medium truncate">
                                            {log.property_name || log.email}
                                        </div>
                                        <div className="text-gray-400 text-sm truncate">{log.email_subject}</div>
                                    </div>
                                    <div className="flex items-center gap-3 ml-4">
                                        {log.lead_score && (
                                            <span className={`px-2 py-1 rounded text-xs font-medium ${log.lead_score >= 70 ? 'bg-green-500/20 text-green-400' :
                                                    log.lead_score >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                                                        'bg-red-500/20 text-red-400'
                                                }`}>
                                                {log.lead_score}
                                            </span>
                                        )}
                                        <span className={`px-2 py-1 rounded text-xs ${log.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                                                log.status === 'pending' ? 'bg-blue-500/20 text-blue-400' :
                                                    'bg-gray-500/20 text-gray-400'
                                            }`}>
                                            {log.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
