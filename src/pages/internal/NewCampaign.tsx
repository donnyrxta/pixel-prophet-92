/**
 * New Campaign Page
 * Multi-step wizard: Upload → Preview → Generate → Review → Send
 */

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { internalApi, Lead, GeneratedEmailResult, EmailToSend } from '@/lib/internal-api';
import {
    Upload,
    FileSpreadsheet,
    Wand2,
    Eye,
    Send,
    CheckCircle2,
    XCircle,
    Loader2,
    ArrowLeft,
    ArrowRight,
    AlertCircle,
    Download,
    Edit3,
} from 'lucide-react';

type Step = 'upload' | 'preview' | 'generate' | 'review' | 'send' | 'complete';

interface LeadWithEmail extends Lead {
    generatedEmail?: GeneratedEmailResult['email'];
    error?: string;
    selected?: boolean;
}

export default function NewCampaign() {
    const navigate = useNavigate();
    const [step, setStep] = useState<Step>('upload');
    const [campaignName, setCampaignName] = useState('');
    const [csvContent, setCsvContent] = useState('');
    const [leads, setLeads] = useState<LeadWithEmail[]>([]);
    const [selectedLeads, setSelectedLeads] = useState<Set<number>>(new Set());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [progress, setProgress] = useState({ current: 0, total: 0 });
    const [sendResults, setSendResults] = useState<any>(null);

    // Step 1: File Upload
    const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setCsvContent(event.target?.result as string);
        };
        reader.readAsText(file);
    }, []);

    const handleParseLeads = async () => {
        if (!csvContent.trim()) {
            setError('Please upload or paste CSV content');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const result = await internalApi.uploadLeads(csvContent);
            if (result.leads.length === 0) {
                setError('No valid leads found. Make sure CSV has name and email columns.');
                return;
            }

            setLeads(result.leads.map(l => ({ ...l, selected: true })));
            setSelectedLeads(new Set(result.leads.map((_, i) => i)));
            setStep('preview');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to parse leads');
        } finally {
            setLoading(false);
        }
    };

    // Step 2: Preview and Select
    const toggleLead = (index: number) => {
        const newSelected = new Set(selectedLeads);
        if (newSelected.has(index)) {
            newSelected.delete(index);
        } else {
            newSelected.add(index);
        }
        setSelectedLeads(newSelected);
    };

    const selectAll = () => {
        setSelectedLeads(new Set(leads.map((_, i) => i)));
    };

    const selectNone = () => {
        setSelectedLeads(new Set());
    };

    // Step 3: Generate AI Emails
    const handleGenerateEmails = async () => {
        const selectedLeadsList = leads.filter((_, i) => selectedLeads.has(i));

        if (selectedLeadsList.length === 0) {
            setError('Please select at least one lead');
            return;
        }

        setLoading(true);
        setError('');
        setProgress({ current: 0, total: selectedLeadsList.length });
        setStep('generate');

        try {
            const result = await internalApi.generateEmails(selectedLeadsList);

            // Update leads with generated emails
            const updatedLeads = leads.map((lead, i) => {
                if (!selectedLeads.has(i)) return lead;

                const generated = result.results.find(r => r.lead.email === lead.email);
                return {
                    ...lead,
                    generatedEmail: generated?.email,
                    error: generated?.error,
                };
            });

            setLeads(updatedLeads);
            setProgress({ current: result.processed, total: result.processed });
            setStep('review');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to generate emails');
            setStep('preview');
        } finally {
            setLoading(false);
        }
    };

    // Step 4: Review Generated Emails
    const getReadyToSendLeads = () => {
        return leads.filter((l, i) =>
            selectedLeads.has(i) &&
            l.generatedEmail &&
            !l.generatedEmail.automation_flags.requires_manual_review
        );
    };

    const getManualReviewLeads = () => {
        return leads.filter((l, i) =>
            selectedLeads.has(i) &&
            l.generatedEmail?.automation_flags.requires_manual_review
        );
    };

    // Step 5: Send Campaign
    const handleSendCampaign = async (dryRun = false) => {
        if (!campaignName.trim()) {
            setError('Please enter a campaign name');
            return;
        }

        const readyLeads = getReadyToSendLeads();
        if (readyLeads.length === 0) {
            setError('No emails ready to send');
            return;
        }

        setLoading(true);
        setError('');
        setStep('send');

        try {
            // Create campaign
            const campaignResult = await internalApi.createCampaign(campaignName, readyLeads.length);
            const campaignId = campaignResult.campaign.id;

            // Prepare emails
            const emailsToSend: EmailToSend[] = readyLeads.map(lead => ({
                toEmail: lead.email,
                toName: lead.contactPerson || lead.name,
                subject: lead.generatedEmail!.initial_email.subject,
                body: lead.generatedEmail!.initial_email.body,
                leadScore: lead.generatedEmail!.initial_email.lead_score,
                propertyName: lead.name,
            }));

            // Send emails
            const sendResult = await internalApi.sendCampaign(emailsToSend, campaignId, dryRun);
            setSendResults(sendResult);

            // Save logs
            const logs = readyLeads.map((lead, i) => ({
                campaign_id: campaignId,
                property_name: lead.name,
                contact_name: lead.contactPerson,
                email: lead.email,
                website: lead.website,
                description: lead.description,
                rating: lead.rating,
                review_count: lead.numberOfReviews,
                email_subject: lead.generatedEmail!.initial_email.subject,
                email_body: lead.generatedEmail!.initial_email.body,
                follow_up_subject: lead.generatedEmail!.follow_up_email.subject,
                follow_up_body: lead.generatedEmail!.follow_up_email.body,
                lead_score: lead.generatedEmail!.initial_email.lead_score,
                personalization_hook: lead.generatedEmail!.initial_email.personalization_hook,
                offer_asset: lead.generatedEmail!.offer_asset.type,
                status: dryRun ? 'pending' : (sendResult.results[i]?.success ? 'sent' : 'failed'),
                requires_manual_review: lead.generatedEmail!.automation_flags.requires_manual_review,
                sent_at: dryRun ? null : new Date().toISOString(),
                follow_up_scheduled_at: dryRun ? null : new Date(Date.now() + lead.generatedEmail!.follow_up_email.send_delay_hours * 3600000).toISOString(),
            }));

            await internalApi.saveLogs(logs);

            // Update campaign status
            await internalApi.updateCampaign(campaignId, {
                status: dryRun ? 'draft' : 'active',
                sent_count: sendResult.summary.sent,
            });

            setStep('complete');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to send campaign');
            setStep('review');
        } finally {
            setLoading(false);
        }
    };

    // Render Steps
    const steps = [
        { id: 'upload', label: 'Upload', icon: Upload },
        { id: 'preview', label: 'Preview', icon: Eye },
        { id: 'generate', label: 'Generate', icon: Wand2 },
        { id: 'review', label: 'Review', icon: Edit3 },
        { id: 'send', label: 'Send', icon: Send },
    ];

    const currentStepIndex = steps.findIndex(s => s.id === step);

    return (
        <div className="max-w-5xl mx-auto">
            {/* Step Progress */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    {steps.map((s, i) => {
                        const Icon = s.icon;
                        const isActive = s.id === step;
                        const isComplete = i < currentStepIndex;

                        return (
                            <React.Fragment key={s.id}>
                                <div className="flex flex-col items-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isComplete ? 'bg-green-500' :
                                            isActive ? 'bg-blue-500' :
                                                'bg-gray-700'
                                        }`}>
                                        {isComplete ? (
                                            <CheckCircle2 className="w-6 h-6 text-white" />
                                        ) : (
                                            <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                                        )}
                                    </div>
                                    <span className={`mt-2 text-sm ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                        {s.label}
                                    </span>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className={`flex-1 h-1 mx-4 rounded ${isComplete ? 'bg-green-500' : 'bg-gray-700'
                                        }`} />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                    <button onClick={() => setError('')} className="ml-auto">
                        <XCircle className="w-5 h-5" />
                    </button>
                </div>
            )}

            {/* Step Content */}
            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-8">
                {/* Step 1: Upload */}
                {step === 'upload' && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Upload Leads</h2>
                        <p className="text-gray-400">
                            Upload a CSV file with your leads. Required columns: name, email.
                            Optional: contact_person, website, description, rating, review_count, category, address.
                        </p>

                        <div className="space-y-4">
                            {/* File Input */}
                            <label className="block">
                                <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                                    <FileSpreadsheet className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                                    <span className="text-gray-400">Click to upload CSV file</span>
                                    <input
                                        type="file"
                                        accept=".csv"
                                        onChange={handleFileUpload}
                                        className="hidden"
                                    />
                                </div>
                            </label>

                            <div className="text-center text-gray-500">or paste CSV content below</div>

                            {/* Text Area */}
                            <textarea
                                value={csvContent}
                                onChange={(e) => setCsvContent(e.target.value)}
                                placeholder="name,email,website,description&#10;Hotel Sunshine,manager@hotel.com,hotel.com,A lovely boutique hotel"
                                rows={10}
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                onClick={handleParseLeads}
                                disabled={loading || !csvContent.trim()}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ArrowRight className="w-5 h-5" />}
                                Parse Leads
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 2: Preview */}
                {step === 'preview' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-white">Preview Leads</h2>
                                <p className="text-gray-400">
                                    {selectedLeads.size} of {leads.length} leads selected
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={selectAll} className="px-3 py-1 text-sm text-blue-400 hover:text-blue-300">
                                    Select All
                                </button>
                                <button onClick={selectNone} className="px-3 py-1 text-sm text-gray-400 hover:text-gray-300">
                                    Deselect All
                                </button>
                            </div>
                        </div>

                        <div className="max-h-96 overflow-y-auto space-y-2">
                            {leads.map((lead, i) => (
                                <div
                                    key={i}
                                    onClick={() => toggleLead(i)}
                                    className={`p-4 rounded-lg cursor-pointer transition-all ${selectedLeads.has(i)
                                            ? 'bg-blue-500/20 border border-blue-500/30'
                                            : 'bg-gray-700/30 border border-transparent hover:border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="checkbox"
                                            checked={selectedLeads.has(i)}
                                            onChange={() => { }}
                                            className="w-5 h-5 rounded border-gray-500"
                                        />
                                        <div className="flex-1 min-w-0">
                                            <div className="text-white font-medium">{lead.name}</div>
                                            <div className="text-gray-400 text-sm truncate">{lead.email}</div>
                                        </div>
                                        {lead.website && (
                                            <div className="text-gray-500 text-sm">{lead.website}</div>
                                        )}
                                        {lead.rating && (
                                            <div className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-sm">
                                                ★ {lead.rating}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep('upload')}
                                className="inline-flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-all"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back
                            </button>
                            <button
                                onClick={handleGenerateEmails}
                                disabled={loading || selectedLeads.size === 0}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            >
                                <Wand2 className="w-5 h-5" />
                                Generate AI Emails
                            </button>
                        </div>
                    </div>
                )}

                {/* Step 3: Generating */}
                {step === 'generate' && (
                    <div className="py-12 text-center">
                        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">Generating Emails...</h2>
                        <p className="text-gray-400">
                            AI is crafting personalized emails for {selectedLeads.size} leads.
                        </p>
                        <p className="text-blue-400 mt-4">
                            {progress.current} / {progress.total} processed
                        </p>
                    </div>
                )}

                {/* Step 4: Review */}
                {step === 'review' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-bold text-white">Review Generated Emails</h2>
                            <p className="text-gray-400">
                                {getReadyToSendLeads().length} ready to send, {getManualReviewLeads().length} need review
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Campaign Name
                            </label>
                            <input
                                type="text"
                                value={campaignName}
                                onChange={(e) => setCampaignName(e.target.value)}
                                placeholder="e.g., December Hospitality Outreach"
                                className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="max-h-96 overflow-y-auto space-y-4">
                            {leads.filter((_, i) => selectedLeads.has(i)).map((lead, i) => (
                                <div
                                    key={i}
                                    className={`p-4 rounded-lg border ${lead.error
                                            ? 'bg-red-500/10 border-red-500/30'
                                            : lead.generatedEmail?.automation_flags.requires_manual_review
                                                ? 'bg-yellow-500/10 border-yellow-500/30'
                                                : 'bg-gray-700/30 border-gray-600'
                                        }`}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div>
                                            <div className="text-white font-medium">{lead.name}</div>
                                            <div className="text-gray-400 text-sm">{lead.email}</div>
                                        </div>
                                        {lead.generatedEmail && (
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded text-xs font-medium ${lead.generatedEmail.initial_email.lead_score >= 70
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : lead.generatedEmail.initial_email.lead_score >= 50
                                                            ? 'bg-yellow-500/20 text-yellow-400'
                                                            : 'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    Score: {lead.generatedEmail.initial_email.lead_score}
                                                </span>
                                                {lead.generatedEmail.automation_flags.requires_manual_review && (
                                                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs">
                                                        Needs Review
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {lead.error ? (
                                        <div className="text-red-400 text-sm">{lead.error}</div>
                                    ) : lead.generatedEmail ? (
                                        <div className="space-y-2">
                                            <div className="text-blue-400 font-medium">
                                                Subject: {lead.generatedEmail.initial_email.subject}
                                            </div>
                                            <div className="text-gray-300 text-sm whitespace-pre-wrap">
                                                {lead.generatedEmail.initial_email.body}
                                            </div>
                                            <div className="text-gray-500 text-xs italic">
                                                Hook: {lead.generatedEmail.initial_email.personalization_hook}
                                            </div>
                                        </div>
                                    ) : null}
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between">
                            <button
                                onClick={() => setStep('preview')}
                                className="inline-flex items-center gap-2 px-6 py-3 text-gray-400 hover:text-white transition-all"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                Back
                            </button>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleSendCampaign(true)}
                                    disabled={loading || !campaignName.trim()}
                                    className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all"
                                >
                                    <Download className="w-5 h-5" />
                                    Save as Draft
                                </button>
                                <button
                                    onClick={() => handleSendCampaign(false)}
                                    disabled={loading || !campaignName.trim() || getReadyToSendLeads().length === 0}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                                >
                                    <Send className="w-5 h-5" />
                                    Send {getReadyToSendLeads().length} Emails
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Sending */}
                {step === 'send' && (
                    <div className="py-12 text-center">
                        <Loader2 className="w-16 h-16 text-green-500 animate-spin mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-white mb-2">Sending Campaign...</h2>
                        <p className="text-gray-400">Your emails are being delivered via Brevo.</p>
                    </div>
                )}

                {/* Complete */}
                {step === 'complete' && (
                    <div className="py-12 text-center">
                        <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-10 h-10 text-green-400" />
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">Campaign Sent!</h2>

                        {sendResults && (
                            <div className="mt-6 inline-block text-left bg-gray-700/30 rounded-lg p-6">
                                <div className="grid grid-cols-3 gap-6 text-center">
                                    <div>
                                        <div className="text-3xl font-bold text-green-400">{sendResults.summary.sent}</div>
                                        <div className="text-gray-400 text-sm">Sent</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-yellow-400">{sendResults.summary.skipped}</div>
                                        <div className="text-gray-400 text-sm">Skipped</div>
                                    </div>
                                    <div>
                                        <div className="text-3xl font-bold text-red-400">{sendResults.summary.failed}</div>
                                        <div className="text-gray-400 text-sm">Failed</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-8 flex justify-center gap-4">
                            <button
                                onClick={() => navigate('/internal/logs')}
                                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700/50 transition-all"
                            >
                                View Logs
                            </button>
                            <button
                                onClick={() => navigate('/internal')}
                                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                            >
                                Back to Dashboard
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
