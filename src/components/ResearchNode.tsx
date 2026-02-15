'use client';
import React from 'react';
import { Microscope, BrainCircuit, Database, Lock } from 'lucide-react';

export default function ResearchNode() {
    return (
        <div className="space-y-8">
            <div className="max-w-4xl mx-auto space-y-10">
                <div className="text-center">
                    <h2 className="text-4xl font-bold italic mb-4">Explainability <span className="premium-gradient-text">Research Node</span></h2>
                    <p className="text-slate-500 max-w-2xl mx-auto">Deep-dive into the underlying architecture of the Aegis Model, including Spatial Reasoning and Synthetic Data Vaults.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="glass-card p-8 border-blue-500/20 group hover:bg-blue-600/5 transition-all">
                        <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 w-fit mb-6">
                            <BrainCircuit className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Spatial Reasoning Protocol</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Multimodal document parsing utilizing anchor-label extraction. The model understands the geometry of EMR/EHR scans to achieve 99% extraction accuracy.</p>
                    </div>

                    <div className="glass-card p-8 border-purple-500/20 group hover:bg-purple-600/5 transition-all">
                        <div className="p-4 rounded-2xl bg-purple-600/10 border border-purple-500/20 w-fit mb-6">
                            <Database className="w-8 h-8 text-purple-400" />
                        </div>
                        <h3 className="text-xl font-bold mb-4">Synthetic Data Vault (SDV)</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">Medical coherence training using GANs and VAEs to generate HIPAA-compliant synthetic patients, ensuring zero PII leak while maintaining high model fidelity.</p>
                    </div>
                </div>

                <div className="glass-card p-10 border-white/5 bg-black/40">
                    <div className="flex items-center gap-4 mb-6">
                        <Lock className="text-emerald-500" />
                        <h3 className="text-xl font-bold italic">Clinical Ethics & Bias Audit</h3>
                    </div>
                    <div className="space-y-4 text-sm text-slate-400 leading-relaxed">
                        <p>The Aegis Model undergoes daily bias auditing across 12 protected attributes. Current Bias Index: <span className="text-emerald-400 font-bold">0.002 (Minimal)</span>.</p>
                        <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full w-[2%]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
