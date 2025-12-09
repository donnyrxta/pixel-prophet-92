/**
 * Internal Settings Page
 * Configuration and API settings
 */

import React, { useState } from 'react';
import { Settings, Save, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function InternalSettings() {
    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-white">Settings</h1>
                <p className="text-gray-400 mt-1">Configure your cold outreach preferences</p>
            </div>

            {saved && (
                <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400 flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5" />
                    Settings saved successfully
                </div>
            )}

            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Campaign Defaults
                </h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Quality Score Threshold
                        </label>
                        <input
                            type="number"
                            defaultValue={50}
                            min={0}
                            max={100}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-gray-500 text-sm mt-1">
                            Leads below this score will require manual review
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Follow-up Delay (hours)
                        </label>
                        <input
                            type="number"
                            defaultValue={72}
                            min={1}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-gray-500 text-sm mt-1">
                            Time to wait before sending follow-up emails
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Rate Limit (seconds between emails)
                        </label>
                        <input
                            type="number"
                            defaultValue={3}
                            min={1}
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-gray-500 text-sm mt-1">
                            Delay between sending each email to avoid rate limits
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-xl rounded-xl border border-gray-700 p-6 space-y-6">
                <h2 className="text-xl font-semibold text-white">Sender Configuration</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Sender Name
                        </label>
                        <input
                            type="text"
                            defaultValue="SoHo Connect"
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Sender Email
                        </label>
                        <input
                            type="email"
                            defaultValue="info@sohoconnect.co.zw"
                            className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <p className="text-gray-500 text-sm mt-1">
                            Must be verified in Brevo
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-6">
                <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                        <h3 className="text-yellow-400 font-medium">Environment Variables</h3>
                        <p className="text-gray-400 text-sm mt-1">
                            API keys and sensitive settings must be configured as environment variables on your hosting provider.
                            Required variables: <code className="text-yellow-300">OPENROUTER_API_KEY</code>,{' '}
                            <code className="text-yellow-300">BREVO_API_KEY</code>,{' '}
                            <code className="text-yellow-300">INTERNAL_API_PASSWORD</code>
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                >
                    <Save className="w-5 h-5" />
                    Save Settings
                </button>
            </div>
        </div>
    );
}
