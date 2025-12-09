/**
 * Campaign Logs Page
 * View and filter outreach history
 */

import React, { useEffect, useState } from 'react';
import { internalApi, Campaign, OutreachLog } from '@/lib/internal-api';
import {
    Loader2,
    AlertCircle,
    Search,
    Filter,
    ChevronDown,
    ChevronUp,
    Mail,
    Calendar,
    ExternalLink,
} from 'lucide-react';

export default function CampaignLogs() {
    const [campaigns, setCampaigns] = useState<Campaign[]>([]);
    const [logs, setLogs] = useState<OutreachLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCampaign, setSelectedCampaign] = useState<string>('');
    const [selectedStatus, setSelectedStatus] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedLog, setExpandedLog] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, [selectedCampaign, selectedStatus]);

    const loadData = async () => {
        try {
            setLoading(true);
            const [campaignsRes, logsRes] = await Promise.all([
                internalApi.getCampaigns(),
                internalApi.getLogs(selectedCampaign || undefined, selectedStatus || undefined, 100),
            ]);
            setCampaigns(campaignsRes.campaigns || []);
            setLogs(logsRes.logs || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const filteredLogs = logs.filter(log => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            log.property_name?.toLowerCase().includes(query) ||
            log.email?.toLowerCase().includes(query) ||
            log.email_subject?.toLowerCase().includes(query)
        );
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'sent': return 'bg-green-500/20 text-green-400';
            case 'pending': return 'bg-blue-500/20 text-blue-400';
            case 'failed': return 'bg-red-500/20 text-red-400';
            case 'manual_review': return 'bg-yellow-500/20 text-yellow-400';
            case 'follow_up_sent': return 'bg-purple-500/20 text-purple-400';
            case 'responded': return 'bg-emerald-500/20 text-emerald-400';
            default: return 'bg-gray-500/20 text-gray-400';
        }
    };

    const formatDate = (dateStr?: string) => {
        if (!dateStr) return '—';
        return new Date(dateStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    if (loading && logs.length === 0) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Campaign Logs</h1>
                <p className="text-gray-400 mt-1">View and track all outreach activity</p>
            </div>

            {error && (
                <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                </div>
            )}

            {/* Filters */}
            <div className="flex flex-wrap gap-4 bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-4">
                <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name, email, or subject..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="flex gap-3">
                    <select
                        value={selectedCampaign}
                        onChange={(e) => setSelectedCampaign(e.target.value)}
                        className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Campaigns</option>
                        {campaigns.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>

                    <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="px-4 py-2 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">All Statuses</option>
                        <option value="pending">Pending</option>
                        <option value="sent">Sent</option>
                        <option value="failed">Failed</option>
                        <option value="manual_review">Manual Review</option>
                        <option value="follow_up_sent">Follow-up Sent</option>
                        <option value="responded">Responded</option>
                    </select>
                </div>
            </div>

            {/* Results */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 overflow-hidden">
                {filteredLogs.length === 0 ? (
                    <div className="p-12 text-center">
                        <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-500">No outreach logs found</p>
                    </div>
                ) : (
                    <div className="divide-y divide-gray-700">
                        {filteredLogs.map((log) => (
                            <div key={log.id} className="hover:bg-gray-700/30 transition-colors">
                                {/* Summary Row */}
                                <div
                                    className="p-4 cursor-pointer"
                                    onClick={() => setExpandedLog(expandedLog === log.id ? null : log.id)}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-3">
                                                <span className="text-white font-medium truncate">
                                                    {log.property_name || log.email}
                                                </span>
                                                {log.lead_score && (
                                                    <span className={`px-2 py-0.5 rounded text-xs ${log.lead_score >= 70 ? 'bg-green-500/20 text-green-400' :
                                                            log.lead_score >= 50 ? 'bg-yellow-500/20 text-yellow-400' :
                                                                'bg-red-500/20 text-red-400'
                                                        }`}>
                                                        {log.lead_score}
                                                    </span>
                                                )}
                                            </div>
                                            <div className="text-gray-400 text-sm truncate mt-1">
                                                {log.email_subject}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-4 text-sm">
                                            <span className="text-gray-500 hidden sm:inline">
                                                {formatDate(log.sent_at || log.created_at)}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(log.status)}`}>
                                                {log.status.replace('_', ' ')}
                                            </span>
                                            {expandedLog === log.id ? (
                                                <ChevronUp className="w-5 h-5 text-gray-500" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5 text-gray-500" />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {expandedLog === log.id && (
                                    <div className="px-4 pb-4 pt-0 border-t border-gray-700/50">
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
                                            {/* Lead Info */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                    Lead Details
                                                </h4>
                                                <div className="space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-500">Email</span>
                                                        <span className="text-white">{log.email}</span>
                                                    </div>
                                                    {log.contact_name && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Contact</span>
                                                            <span className="text-white">{log.contact_name}</span>
                                                        </div>
                                                    )}
                                                    {log.website && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Website</span>
                                                            <a
                                                                href={log.website.startsWith('http') ? log.website : `https://${log.website}`}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                                            >
                                                                {log.website} <ExternalLink className="w-3 h-3" />
                                                            </a>
                                                        </div>
                                                    )}
                                                    {log.rating && (
                                                        <div className="flex justify-between">
                                                            <span className="text-gray-500">Rating</span>
                                                            <span className="text-yellow-400">★ {log.rating}</span>
                                                        </div>
                                                    )}
                                                    {log.personalization_hook && (
                                                        <div className="mt-2 p-2 bg-gray-700/50 rounded text-gray-300 italic">
                                                            "{log.personalization_hook}"
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Email Content */}
                                            <div className="space-y-3">
                                                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                                                    Email Content
                                                </h4>
                                                <div className="space-y-2">
                                                    <div className="font-medium text-blue-400">
                                                        {log.email_subject}
                                                    </div>
                                                    <div className="text-gray-300 text-sm whitespace-pre-wrap bg-gray-700/30 rounded-lg p-3">
                                                        {log.email_body}
                                                    </div>
                                                </div>

                                                {log.follow_up_subject && (
                                                    <div className="pt-3 border-t border-gray-700/50">
                                                        <div className="text-xs text-gray-500 mb-2 flex items-center gap-2">
                                                            <Calendar className="w-4 h-4" />
                                                            Follow-up scheduled: {formatDate(log.follow_up_scheduled_at)}
                                                        </div>
                                                        <div className="font-medium text-purple-400 text-sm">
                                                            {log.follow_up_subject}
                                                        </div>
                                                        <div className="text-gray-400 text-sm mt-1">
                                                            {log.follow_up_body}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Stats Footer */}
            <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Showing {filteredLogs.length} of {logs.length} logs</span>
                {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            </div>
        </div>
    );
}
