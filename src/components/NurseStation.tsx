'use client';
import React from 'react';
import { Thermometer, Heart, Droplets, Clock, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const activeMonitoring = [
    { room: "ICU-201", patient: "John W.", vitals: { hr: 98, bp: "145/92", o2: "94%" }, priority: "High" },
    { room: "ICU-205", patient: "Sarah K.", vitals: { hr: 72, bp: "120/80", o2: "98%" }, priority: "Stable" },
    { room: "WARD-12", patient: "Mike P.", vitals: { hr: 85, bp: "130/85", o2: "96%" }, priority: "Medium" },
];

export default function NurseStation() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-bold italic mb-4 flex items-center gap-2">
                        <Droplets className="text-blue-500" /> Active IV Monitoring
                    </h2>
                    <div className="space-y-4">
                        {activeMonitoring.map((m, i) => (
                            <div key={i} className="glass-card p-6 flex flex-wrap items-center justify-between gap-6">
                                <div className="space-y-1">
                                    <div className="text-[10px] font-bold text-slate-500 uppercase">{m.room}</div>
                                    <div className="text-lg font-bold">{m.patient}</div>
                                </div>
                                <div className="flex gap-8">
                                    <div className="text-center">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">HR</div>
                                        <div className="text-emerald-400 font-bold">{m.vitals.hr}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">BP</div>
                                        <div className="font-bold">{m.vitals.bp}</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">O2</div>
                                        <div className="text-blue-400 font-bold">{m.vitals.o2}</div>
                                    </div>
                                </div>
                                <div className={`px-4 py-1 rounded-full text-[10px] font-bold uppercase border ${m.priority === 'High' ? 'bg-red-500/10 border-red-500 text-red-500 animate-pulse' : 'bg-green-500/10 border-green-500 text-green-500'}`}>
                                    {m.priority}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="space-y-6">
                    <div className="glass-card p-8 border-amber-500/20">
                        <div className="flex items-center gap-3 mb-6">
                            <Clock className="text-amber-500" />
                            <h2 className="text-lg font-bold">Shift Protocols</h2>
                        </div>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-xs text-slate-400">
                                <AlertCircle size={14} className="text-amber-500 flex-shrink-0" />
                                Review Triage Queue every 15 minutes.
                            </li>
                            <li className="flex gap-3 text-xs text-slate-400">
                                <AlertCircle size={14} className="text-amber-500 flex-shrink-0" />
                                Emergency bypass for critical patients (Siren active).
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
