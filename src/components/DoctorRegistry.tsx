'use client';
import React from 'react';
import { User, Clipboard, Activity, Star } from 'lucide-react';
import { motion } from 'framer-motion';

const doctors = [
    { id: 1, name: "Dr. Jane Doe", specialty: "Emergency Medicine", status: "Active", patients: 12, rating: 4.9 },
    { id: 2, name: "Dr. Mark Sloan", specialty: "Cardiology", status: "In Surgery", patients: 4, rating: 4.8 },
    { id: 3, name: "Dr. Meredith Grey", specialty: "General Surgery", status: "Consulting", patients: 8, rating: 5.0 },
    { id: 4, name: "Dr. Derek Shepherd", specialty: "Neurosurgery", status: "On Call", patients: 2, rating: 4.9 },
];

export default function DoctorRegistry() {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {doctors.map((dr, i) => (
                    <motion.div
                        key={dr.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card p-6 border-white/5 hover:border-blue-500/30 transition-all"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center border border-blue-500/20">
                                <User className="text-blue-400" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm italic">{dr.name}</h3>
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{dr.specialty}</p>
                            </div>
                        </div>
                        <div className="space-y-3 pt-4 border-t border-white/5">
                            <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-slate-500">Status</span>
                                <span className={dr.status === 'Active' ? 'text-emerald-400' : 'text-amber-400'}>{dr.status}</span>
                            </div>
                            <div className="flex justify-between text-[10px] font-bold">
                                <span className="text-slate-500">Active Load</span>
                                <span>{dr.patients} Patients</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className="text-slate-500">Peer Rating</span>
                                <div className="flex items-center gap-1 text-blue-400">
                                    <Star size={10} fill="currentColor" /> {dr.rating}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            {/* AI Scheduling Optimization Card */}
            <div className="glass-card p-8 border-purple-500/20 bg-purple-500/5">
                <div className="flex items-center gap-3 mb-6">
                    <Activity className="text-purple-400" />
                    <h2 className="text-xl font-bold italic">AI Resource Optimization</h2>
                </div>
                <p className="text-sm text-slate-400 leading-relaxed mb-6">Aegis AI has optimized clinical rotations for the Porur branch, reducing surgeon fatigue by 14% this quarter.</p>
                <div className="flex gap-4">
                    <button className="px-6 py-2 bg-purple-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Generate Schedule</button>
                    <button className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">Audit Logs</button>
                </div>
            </div>
        </div>
    );
}
