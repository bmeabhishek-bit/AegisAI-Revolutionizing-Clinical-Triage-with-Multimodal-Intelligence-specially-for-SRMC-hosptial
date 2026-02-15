'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Database, FileCode, Radio, ArrowRight, CheckCircle2, Info, Activity, Zap } from 'lucide-react';
import Link from 'next/link';

export default function IntegrationHub() {
    return (
        <div className="space-y-8 pb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Connection Status */}
                <div className="glass-card p-8 border-emerald-500/20 bg-emerald-500/5">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-emerald-500/10">
                            <Radio className="w-6 h-6 text-emerald-400 animate-pulse" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Real-time Data Stream</h3>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">HL7 / FHIR Gateway</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                            <span className="text-slate-500">Node Status</span>
                            <span className="text-emerald-400 font-bold">Connected</span>
                        </div>
                        <div className="flex justify-between text-sm py-2 border-b border-white/5">
                            <span className="text-slate-500">Active EHV Input</span>
                            <span className="text-white font-bold">Ramachandra_EHR_v4.2.ehv</span>
                        </div>
                        <div className="flex justify-between text-sm py-2">
                            <span className="text-slate-500">Latency</span>
                            <span className="text-white font-bold">12ms</span>
                        </div>
                    </div>
                </div>

                {/* Documentation Section */}
                <div className="glass-card p-8 border-blue-500/20">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="p-3 rounded-xl bg-blue-500/10">
                            <FileCode className="w-6 h-6 text-blue-400" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold">Developer Docs</h3>
                            <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Integration Protocol</p>
                        </div>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-6">
                        To ingest real medical files (EHV, HL7, DICOM), use our secure endpoint with your API key.
                    </p>
                    <button className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 transition-all">
                        View API Documentation <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Integration Steps */}
            <div className="glass-card p-10 border-white/5">
                <h3 className="text-2xl font-bold italic mb-8">How to connect <span className="premium-gradient-text">Real Patient Data</span></h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    <div className="space-y-4">
                        <div className="text-4xl font-black text-slate-800">01</div>
                        <h4 className="font-bold text-lg">Export from EMR</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Export your patient records in .ehv or .hl7 format from your existing hospital management system (e.g., Epic, Cerner).
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="text-4xl font-black text-slate-800">02</div>
                        <h4 className="font-bold text-lg">Secure Upload</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            Send the encrypted files to our `/api/ingest` endpoint or drag them into the Quick Import station.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div className="text-4xl font-black text-slate-800">03</div>
                        <h4 className="font-bold text-lg">AI Categorization</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">
                            The Gemini engine automatically parses the unstructured medical data into categorized vital signs and histories.
                        </p>
                    </div>
                </div>
            </div>

            {/* Security Banner */}
            <div className="p-6 rounded-2xl bg-blue-600/5 border border-blue-500/20 flex items-center gap-6">
                <ShieldCheck className="w-10 h-10 text-blue-400" />
                <div>
                    <h4 className="font-bold">Enterprise-Grade Security</h4>
                    <p className="text-xs text-slate-500 mt-1">All data ingestion follows strict HIPAA and GDPR guidelines with 256-bit AES encryption.</p>
                </div>
                <Link href="/portal/logs" className="p-8 glass-card border-white/5 hover:border-blue-500/30 transition-all group col-span-1 md:col-span-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 group-hover:bg-blue-600 transition-all">
                                <Activity className="w-8 h-8 text-blue-400 group-hover:text-white" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold italic">System Activity Logs</h3>
                                <p className="text-slate-500 text-sm">Real-time clinical audit trail and event monitoring.</p>
                            </div>
                        </div>
                        <div className="p-3 rounded-full border border-white/10 group-hover:border-blue-500/30 group-hover:text-blue-400 transition-all">
                            <Zap className="w-5 h-5" />
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}
