'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Activity, Users, RefreshCw, ExternalLink, Globe, Navigation } from 'lucide-react';

const BRANCHES = [
    { id: 'main', name: 'Main Emergency Wing', lat: 13.0386, lng: 80.1444, load: 'High', patients: 64 },
    { id: 'opd', name: 'OPD Block A', lat: 13.0392, lng: 80.1450, load: 'Medium', patients: 32 },
    { id: 'cardio', name: 'Cardiovascular Center', lat: 13.0378, lng: 80.1438, load: 'Low', patients: 12 },
    { id: 'trauma', name: 'Trauma Care Unit', lat: 13.0380, lng: 80.1455, load: 'Critical', patients: 89 },
];

export default function HospitalMap() {
    const [selected, setSelected] = useState<any>(null);
    const [updating, setUpdating] = useState(false);
    const [viewMode, setViewMode] = useState<'standard' | 'satellite'>('standard');

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setViewMode('standard')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'standard' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'}`}
                    >
                        Standard View
                    </button>
                    <button
                        onClick={() => setViewMode('satellite')}
                        className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${viewMode === 'satellite' ? 'bg-blue-600 text-white' : 'bg-white/5 text-slate-400'}`}
                    >
                        Satellite Matrix
                    </button>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-widest">
                        <Activity className="w-3 h-3" /> Porur Campus Sync
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Google Map Style Container */}
                <div className="lg:col-span-2 relative h-[500px] rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                    {/* Real Google Map Iframe for Porur */}
                    <iframe
                        src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1000!2d80.1444!3d13.0386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1700000000000&maptype=${viewMode === 'satellite' ? 'satellite' : 'roadmap'}&zoom=19`}
                        className={`w-full h-full grayscale-[0.3] contrast-[1.1] brightness-[0.9] transition-all group-hover:grayscale-0 group-hover:brightness-100 ${viewMode === 'satellite' ? 'invert-0 brightness-100 contrast-100' : ''}`}
                        loading="lazy"
                    />

                    {/* Custom UI Overlays */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                    {/* Interactive Hotspots (Overlay on top of iframe) */}
                    <div className="absolute inset-0">
                        {BRANCHES.map((branch, i) => (
                            <button
                                key={branch.id}
                                onClick={() => setSelected(branch)}
                                className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 group/pin"
                                style={{ left: `${30 + (i * 15)}%`, top: `${30 + (i * 10)}%` }} // Positioned over the hospital area in iframe
                            >
                                <div className="relative">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 border-white/50 shadow-2xl transition-all group-hover/pin:scale-125 ${branch.load === 'Critical' ? 'bg-red-500' :
                                        branch.load === 'High' ? 'bg-orange-500' :
                                            'bg-blue-500'
                                        }`}>
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="absolute top-12 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-lg border border-white/10 opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap">
                                        <span className="text-[10px] font-bold text-white uppercase tracking-tighter">{branch.name}</span>
                                    </div>
                                    {branch.load === 'Critical' && (
                                        <div className="absolute inset-0 rounded-full animate-ping bg-red-500 opacity-40 scale-150" />
                                    )}
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="absolute bottom-6 left-6 flex items-center gap-4">
                        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center gap-4 group-hover:border-blue-500/50 transition-colors">
                            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                                <Navigation className="w-4 h-4" />
                            </div>
                            <div>
                                <div className="text-[10px] font-bold text-slate-500 uppercase">Emergency Transit</div>
                                <div className="text-sm font-bold">Porur Center Hub • Active</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Panel */}
                <div className="space-y-6">
                    <AnimatePresence mode="wait">
                        {selected ? (
                            <motion.div
                                key={selected.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="glass-card p-8 border-blue-500/20"
                            >
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="p-4 rounded-2xl bg-blue-600/10 text-blue-400 border border-blue-500/20">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold italic">{selected.name}</h3>
                                        <p className="text-sm text-slate-500">Live Telemedicine Uplink Connected</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <span className="text-sm text-slate-400">Patient Load</span>
                                        <span className="text-lg font-bold">{selected.patients} Active</span>
                                    </div>
                                    <div className="flex justify-between items-center p-4 rounded-2xl bg-white/5 border border-white/10">
                                        <span className="text-sm text-slate-400">Department Status</span>
                                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${selected.load === 'Critical' ? 'bg-red-500/20 text-red-400' :
                                            selected.load === 'High' ? 'bg-orange-500/20 text-orange-400' :
                                                'bg-emerald-500/20 text-emerald-400'
                                            }`}>{selected.load}</span>
                                    </div>
                                </div>

                                <button className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold flex items-center justify-center gap-3 shadow-xl overflow-hidden relative group">
                                    <span className="relative z-10">Deploy Medical Response</span>
                                    <ExternalLink className="w-4 h-4 relative z-10" />
                                    <div className="absolute inset-0 bg-white/10 transform translate-y-full group-hover:translate-y-0 transition-transform" />
                                </button>
                            </motion.div>
                        ) : (
                            <div className="glass-card p-12 text-center border-dashed border-white/10">
                                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <MapPin className="w-8 h-8 text-slate-600" />
                                </div>
                                <h3 className="text-xl font-bold italic text-slate-300">Hub Monitoring</h3>
                                <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                                    Click on a location hotspot in the Porur ecosystem to monitor real-time clinical loads.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="glass-card p-6 border-white/5 hover:border-blue-500/20 transition-all">
                            <div className="text-3xl font-bold premium-gradient-text italic">12.4m</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Transit Radius</div>
                        </div>
                        <div className="glass-card p-6 border-white/5 hover:border-blue-500/20 transition-all">
                            <div className="text-3xl font-bold premium-gradient-text italic">8 / 12</div>
                            <div className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Active Dr. Ambu</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
