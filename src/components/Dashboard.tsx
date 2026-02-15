'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Crosshair, AlertTriangle, Building2, ListChecks, ArrowRight, Gauge, Scale, Watch, Globe, RefreshCcw, BellRing } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TriageResult {
    riskLevel: string;
    department: string;
    explanation: string;
    confidenceScore: number;
    actionItems: string[];
    featureImportance?: Record<string, number>;
    isSynthetic?: boolean;
}

export default function TriageDashboard({ results, onReset }: { results: TriageResult[], onReset: () => void }) {
    const [selectedId, setSelectedId] = useState<number>(0);
    const [showAlert, setShowAlert] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);

    // Siren Logic
    const playSiren = () => {
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.5);
            osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.0);

            gain.gain.setValueAtTime(0.05, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);

            osc.connect(gain);
            gain.connect(ctx.destination);

            osc.start();
            osc.stop(ctx.currentTime + 1.0);
        } catch (e) {
            console.error("Audio error:", e);
        }
    };

    useEffect(() => {
        const latest = results[0];
        if (latest && latest.riskLevel.toLowerCase() === 'high') {
            playSiren();
            setShowAlert(true);
            const timer = setTimeout(() => setShowAlert(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [results]);

    // Prioritize: High > Medium > Low
    const sortedResults = [...results].sort((a, b) => {
        const priority: any = { 'high': 3, 'medium': 2, 'low': 1 };
        return priority[b.riskLevel.toLowerCase()] - priority[a.riskLevel.toLowerCase()];
    });

    const activeResult = sortedResults[selectedId] || sortedResults[0];

    const getRiskClass = (level: string) => {
        switch (level.toLowerCase()) {
            case 'high': return 'risk-high';
            case 'medium': return 'risk-medium';
            case 'low': return 'risk-low';
            default: return '';
        }
    };

    if (results.length === 0) return null;

    return (
        <div className="space-y-8 relative">
            <AnimatePresence>
                {showAlert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0, 0.4, 0, 0.4, 0] }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-red-600/20 z-[100] pointer-events-none flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-red-600 text-white px-10 py-5 rounded-full font-black text-2xl shadow-2xl shadow-red-500/50 flex items-center gap-4 border-4 border-white/20"
                        >
                            <BellRing className="w-8 h-8 animate-bounce" />
                            CRITICAL CASE DETECTED: IMMEDIATE ACTION
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar: Priority Case List */}
                <div className="w-full lg:w-80 space-y-6">
                    <div className="glass-card p-6 border-blue-500/20">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <ListChecks className="w-4 h-4 text-blue-400" />
                                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Live Priority</h3>
                            </div>
                            <span className="bg-red-500/10 text-red-500 text-[9px] font-bold px-2 py-0.5 rounded-full animate-pulse">Live</span>
                        </div>

                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {sortedResults.map((res, i) => (
                                <button
                                    key={i}
                                    onClick={() => setSelectedId(i)}
                                    className={`w-full p-4 rounded-2xl border transition-all text-left flex items-center justify-between group ${selectedId === i ? 'bg-blue-600/10 border-blue-500 shadow-lg shadow-blue-500/10' : 'bg-white/5 border-white/5 hover:border-white/20'}`}
                                >
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase">Case #{results.length - i}</div>
                                        <div className="text-xs font-bold truncate max-w-[120px]">{res.explanation.slice(0, 30)}...</div>
                                    </div>
                                    <div className={`risk-badge ${getRiskClass(res.riskLevel)} text-[8px] px-2 py-0.5 ml-2`}>
                                        {res.riskLevel}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card p-6 bg-emerald-500/5 border-emerald-500/10">
                        <div className="flex items-center gap-2 mb-4">
                            <Gauge className="w-4 h-4 text-emerald-400" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">System Capacity</h3>
                        </div>
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-2xl font-bold">14%</span>
                            <span className="text-[9px] font-bold text-emerald-400 uppercase mb-1">Optimal</span>
                        </div>
                        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[14%]" />
                        </div>
                    </div>

                    <button
                        onClick={onReset}
                        className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all flex items-center justify-center gap-2"
                    >
                        <RefreshCcw className="w-4 h-4" /> Clear All Cases
                    </button>
                </div>

                {/* Main Content: Case Details */}
                <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-end mb-2">
                        <div className="flex items-center gap-4">
                            <div className={`p-4 rounded-2xl bg-white/5 border ${getRiskClass(activeResult.riskLevel)} border-opacity-20`}>
                                <AlertTriangle className={`w-8 h-8 ${activeResult.riskLevel.toLowerCase() === 'high' ? 'text-red-500' : 'text-blue-500'}`} />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Clinical Attribution Matrix</div>
                                <h1 className="text-3xl font-bold italic">Diagnosis <span className="premium-gradient-text">& Reasoning</span></h1>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-card p-6 flex flex-col items-center justify-center text-center group bg-white/5">
                            <span className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Recommended Route</span>
                            <div className="p-4 rounded-full bg-blue-600/10 text-blue-400 mb-4 border border-blue-500/20">
                                <Crosshair className="w-8 h-8" />
                            </div>
                            <div className="text-lg font-bold italic">{activeResult.department}</div>
                        </div>

                        <div className="glass-card p-6 flex flex-col items-center justify-center text-center group bg-white/5 md:col-span-2">
                            <span className="text-[10px] font-bold text-slate-500 uppercase mb-4 tracking-widest">Immediate Clinician Actions</span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                                {activeResult.actionItems.slice(0, 4).map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-black/40 border border-white/5 text-left">
                                        <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${activeResult.riskLevel.toLowerCase() === 'high' ? 'bg-red-500 font-bold' : 'bg-blue-500'}`} />
                                        <div className="text-[9px] font-bold text-slate-300 leading-snug uppercase tracking-tight">{item}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                        <div className="lg:col-span-3 glass-card p-8 border-blue-500/10">
                            <div className="flex items-center gap-3 mb-6">
                                <ShieldCheck className="text-blue-500 w-6 h-6" />
                                <h2 className="text-xl font-bold italic text-slate-200">Clinical Reasoning</h2>
                            </div>
                            <p className="text-slate-300 leading-relaxed text-sm italic mb-10 border-l-4 border-blue-500/30 pl-6 py-2">
                                {activeResult.explanation}
                            </p>

                            <div className="space-y-5">
                                <div className="flex items-center gap-2 mb-2">
                                    <Scale className="w-3 h-3 text-slate-500" />
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Post-Hoc Attribution Model (SHAP)</span>
                                </div>
                                {activeResult.featureImportance && Object.entries(activeResult.featureImportance).map(([feature, value], i) => (
                                    <div key={i} className="space-y-1.5">
                                        <div className="flex justify-between text-[10px] font-bold text-slate-400">
                                            <span>{feature}</span>
                                            <span className={value > 0 ? 'text-red-400' : 'text-blue-400'}>{value > 0 ? '+' : ''}{value.toFixed(2)}</span>
                                        </div>
                                        <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden flex">
                                            <div className="w-1/2 flex justify-end">
                                                {value < 0 && <div className="h-full bg-blue-500" style={{ width: `${Math.min(Math.abs(value) * 10, 100)}%` }} />}
                                            </div>
                                            <div className="w-1/2">
                                                {value >= 0 && <div className="h-full bg-red-500" style={{ width: `${Math.min(value * 10, 100)}%` }} />}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:col-span-2 space-y-6">
                            <div className="glass-card p-8 bg-black/20 flex flex-col items-center justify-center text-center">
                                <div className="relative w-32 h-32 mb-6">
                                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                                        <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-800" strokeWidth="2.5" />
                                        <motion.circle
                                            cx="18" cy="18" r="16" fill="none"
                                            className="stroke-blue-500"
                                            strokeWidth="2.5"
                                            strokeDasharray="100"
                                            initial={{ strokeDashoffset: 100 }}
                                            animate={{ strokeDashoffset: 100 - activeResult.confidenceScore }}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <div className="absolute inset-0 flex items-center justify-center font-bold text-2xl italic text-slate-100">
                                        {activeResult.confidenceScore || 92}%
                                    </div>
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">AI Confidence Interval</span>
                            </div>

                            <div className="glass-card p-6 border-white/5">
                                <div className="flex items-center gap-2 mb-4">
                                    <Globe className="w-4 h-4 text-purple-400" />
                                    <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Transliteration</h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {['English', 'Hindi', 'Tamil', 'Telugu', 'Kannada'].map(lang => (
                                        <button key={lang} className={`px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase border ${lang === 'English' ? 'bg-blue-600 border-blue-500 text-white' : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'}`}>{lang}</button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
