'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowLeft, RefreshCw, AlertCircle, Info, AlertTriangle, Search, Clock } from 'lucide-react';
import Link from 'next/link';

interface LogEntry {
    id: string;
    timestamp: string;
    level: 'info' | 'warn' | 'error';
    source: string;
    message: string;
    data?: any;
}

export default function LogsPage() {
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/logs');
            const data = await res.json();
            setLogs(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLogs();
        const interval = setInterval(fetchLogs, 30000); // Auto refresh every 30s
        return () => clearInterval(interval);
    }, []);

    const filteredLogs = logs.filter(log =>
        log.message.toLowerCase().includes(filter.toLowerCase()) ||
        log.source.toLowerCase().includes(filter.toLowerCase())
    );

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'info': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
            case 'warn': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
            case 'error': return 'text-red-400 bg-red-400/10 border-red-400/20';
            default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
        }
    };

    const getLevelIcon = (level: string) => {
        switch (level) {
            case 'info': return <Info className="w-4 h-4" />;
            case 'warn': return <AlertTriangle className="w-4 h-4" />;
            case 'error': return <AlertCircle className="w-4 h-4" />;
            default: return <Info className="w-4 h-4" />;
        }
    };

    return (
        <main className="min-h-screen bg-[#020617] text-slate-200 p-8 md:p-12">
            <div className="max-w-6xl mx-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-4">
                        <Link href="/portal" className="p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-3xl font-bold italic">
                                System <span className="premium-gradient-text">Activity Logs</span>
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">Real-time clinical event monitoring and auditing</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-blue-400 transition-colors" />
                            <input
                                type="text"
                                placeholder="Search logs..."
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 text-sm w-full md:w-64 outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all"
                            />
                        </div>
                        <button
                            onClick={fetchLogs}
                            disabled={loading}
                            className="p-3 rounded-xl bg-blue-600/20 border border-blue-500/20 text-blue-400 hover:bg-blue-600/30 transition-all disabled:opacity-50"
                        >
                            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </header>

                <div className="glass-card overflow-hidden border-white/5 transition-all">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-white/10 bg-white/5">
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Timestamp</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Level</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Source</th>
                                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-500">Event Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {filteredLogs.length > 0 ? (
                                    filteredLogs.map((log) => (
                                        <tr key={log.id} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2 text-xs font-medium text-slate-400 border border-white/5 w-fit px-2 py-1 rounded-md bg-white/5">
                                                    <Clock className="w-3 h-3 text-slate-600" />
                                                    {new Date(log.timestamp).toLocaleTimeString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold border ${getLevelColor(log.level)}`}>
                                                    {getLevelIcon(log.level)}
                                                    {log.level.toUpperCase()}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap italic text-xs font-bold text-slate-500">
                                                {log.source}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-slate-300 font-medium">{log.message}</div>
                                                {log.data && (
                                                    <div className="mt-2 p-2 rounded bg-black/40 border border-white/5 text-[10px] text-slate-500 font-mono overflow-hidden">
                                                        {JSON.stringify(log.data)}
                                                    </div>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-500 italic">
                                            {loading ? 'Refreshing logs...' : 'No system logs found matching your criteria.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
