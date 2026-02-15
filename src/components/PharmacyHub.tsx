'use client';
import React from 'react';
import { Pill, Container, ShieldAlert, Zap } from 'lucide-react';

const meds = [
    { name: "Aspirin", stock: "High", usage: "+12% Today", alert: false },
    { name: "Morphine", stock: "Critical", usage: "+45% ICU", alert: true },
    { name: "Insulin", stock: "Optimal", usage: "Stable", alert: false },
];

export default function PharmacyHub() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {meds.map((med, i) => (
                    <div key={i} className="glass-card p-6 border-white/5">
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 rounded-xl bg-blue-600/10">
                                <Pill className="text-blue-400 w-6 h-6" />
                            </div>
                            {med.alert && <ShieldAlert className="text-red-500 w-5 h-5 animate-bounce" />}
                        </div>
                        <h3 className="font-bold text-lg mb-1">{med.name}</h3>
                        <div className="flex justify-between items-end mt-4">
                            <div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase">Stock Level</div>
                                <div className={`text-xs font-bold ${med.stock === 'Critical' ? 'text-red-500' : 'text-emerald-400'}`}>{med.stock}</div>
                            </div>
                            <div className="text-right">
                                <div className="text-[10px] font-bold text-slate-500 uppercase">Velocity</div>
                                <div className="text-xs font-bold text-slate-300">{med.usage}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* AI Interaction Check */}
            <div className="glass-card p-8 border-blue-500/20 bg-blue-500/5">
                <div className="flex items-center gap-3 mb-6">
                    <Zap className="text-blue-400" />
                    <h2 className="text-xl font-bold italic">AI Interaction Guard</h2>
                </div>
                <div className="p-4 rounded-xl border border-blue-500/20 bg-black/40 text-xs font-medium text-blue-300">
                    Aegis AI successfully prevented 4 drug-to-patient contraindications in the last 24 hours.
                </div>
            </div>
        </div>
    );
}
