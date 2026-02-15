'use client';
import React from 'react';
import { BarChart3, TrendingUp, PieChart, Users } from 'lucide-react';

export default function AnalyticsSuite() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Avg Triage Time", val: "1.4s", icon: TrendingUp },
                    { label: "High Risk Correctness", val: "99.2%", icon: BarChart3 },
                    { label: "Patient Throughput", val: "420/hr", icon: Users },
                    { label: "Resource Efficiency", val: "88%", icon: PieChart },
                ].map((s, i) => (
                    <div key={i} className="glass-card p-6 flex flex-col items-center justify-center text-center">
                        <s.icon className="w-8 h-8 mb-4 text-blue-500" />
                        <div className="text-2xl font-bold mb-1">{s.val}</div>
                        <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.label}</div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="glass-card p-8 border-white/5 min-h-[300px] flex flex-col items-center justify-center">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-8">Risk Distribution Trends</div>
                    <div className="w-full flex items-end gap-4 h-40">
                        <div className="flex-1 bg-red-500/80 rounded-t-lg transition-all hover:bg-red-500" style={{ height: '40%' }} />
                        <div className="flex-1 bg-amber-500/80 rounded-t-lg transition-all hover:bg-amber-500" style={{ height: '70%' }} />
                        <div className="flex-1 bg-emerald-500/80 rounded-t-lg transition-all hover:bg-emerald-500" style={{ height: '90%' }} />
                        <div className="flex-1 bg-blue-500/80 rounded-t-lg transition-all hover:bg-blue-500" style={{ height: '55%' }} />
                    </div>
                    <div className="w-full h-1 bg-white/5 mt-4" />
                </div>

                <div className="glass-card p-8 border-blue-500/20 bg-blue-500/5">
                    <div className="text-xl font-bold italic mb-6">AI Predictive Insights</div>
                    <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-black/40 border border-white/5 text-[10px] leading-relaxed">
                            <span className="text-blue-400 font-bold uppercase block mb-1">Incoming Wave Alert</span>
                            A 12% increase in respiratory-related triage is predicted for the next 4 hours based on local weather shifts.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
