'use client';

import React, { useState } from 'react';
import TriageForm from '@/components/TriageForm';
import TriageDashboard from '@/components/Dashboard';
import HospitalMap from '@/components/HospitalMap';
import IntegrationHub from '@/components/IntegrationHub';
import DoctorRegistry from '@/components/DoctorRegistry';
import NurseStation from '@/components/NurseStation';
import PharmacyHub from '@/components/PharmacyHub';
import AnalyticsSuite from '@/components/AnalyticsSuite';
import ResearchNode from '@/components/ResearchNode';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, LayoutDashboard, MapPin, User, LogOut, Users, HeartPulse, Pill, BarChart3, Microscope } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function PortalPage() {
    const [results, setResults] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<'intake' | 'map' | 'integration' | 'doctors' | 'nursing' | 'pharmacy' | 'analytics' | 'research'>('intake');

    return (
        <main className="min-h-screen bg-[#020617] text-slate-200">
            {/* Sidebar / Navigation */}
            <nav className="fixed left-0 top-0 h-full w-20 md:w-64 bg-slate-950/50 border-r border-white/5 flex flex-col items-center md:items-start py-8 px-4 z-50">
                <Link href="/" className="mb-12 px-2">
                    <div className="bg-white/80 p-1 rounded-lg backdrop-blur-sm group transition-all hover:bg-white">
                        <Image src="/logo.png" alt="Aegis Logo" width={120} height={40} className="h-8 w-auto md:h-10 mix-blend-multiply" />
                    </div>
                </Link>

                <div className="flex-1 w-full space-y-2">
                    <button
                        onClick={() => setActiveTab('intake')}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === 'intake' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'hover:bg-white/5 text-slate-500'}`}
                    >
                        <Activity className="w-6 h-6" />
                        <span className="hidden md:block font-bold text-sm">Clinical Intake</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('map')}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === 'map' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'hover:bg-white/5 text-slate-500'}`}
                    >
                        <MapPin className="w-6 h-6" />
                        <span className="hidden md:block font-bold text-sm">Facility Ecology</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('doctors')}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === 'doctors' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'hover:bg-white/5 text-slate-500'}`}
                    >
                        <Users className="w-6 h-6" />
                        <span className="hidden md:block font-bold text-sm">Physicians</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('nursing')}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === 'nursing' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'hover:bg-white/5 text-slate-500'}`}
                    >
                        <HeartPulse className="w-6 h-6" />
                        <span className="hidden md:block font-bold text-sm">Nursing Ops</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('pharmacy')}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === 'pharmacy' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'hover:bg-white/5 text-slate-500'}`}
                    >
                        <Pill className="w-6 h-6" />
                        <span className="hidden md:block font-bold text-sm">Pharmacy Hub</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('analytics')}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'hover:bg-white/5 text-slate-500'}`}
                    >
                        <BarChart3 className="w-6 h-6" />
                        <span className="hidden md:block font-bold text-sm">Analytics Suite</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('research')}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === 'research' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'hover:bg-white/5 text-slate-500'}`}
                    >
                        <Microscope className="w-6 h-6" />
                        <span className="hidden md:block font-bold text-sm">Research Node</span>
                    </button>

                    <button
                        onClick={() => setActiveTab('integration')}
                        className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all ${activeTab === 'integration' ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20' : 'hover:bg-white/5 text-slate-500'}`}
                    >
                        <LayoutDashboard className="w-6 h-6" />
                        <span className="hidden md:block font-bold text-sm">System Logs</span>
                    </button>
                </div>

                <div className="w-full border-t border-white/5 pt-6 space-y-4">
                    <div className="flex items-center gap-3 px-2">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">JD</div>
                        <div className="hidden md:block">
                            <div className="text-xs font-bold">Dr. Jane Doe</div>
                            <div className="text-[10px] text-slate-500">Chief Registrar</div>
                        </div>
                    </div>
                    <Link href="/" className="flex items-center gap-4 p-3 rounded-xl text-red-400 hover:bg-red-400/10 transition-all w-full">
                        <LogOut className="w-6 h-6" />
                        <span className="hidden md:block font-bold text-sm">Sign Out</span>
                    </Link>
                </div>
            </nav>

            {/* Main Content Area */}
            <div className="pl-20 md:pl-64 pt-8 pb-12 px-6 md:px-12">
                <header className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-bold italic">
                            {activeTab === 'intake' ? 'Clinical Intake' :
                                activeTab === 'map' ? 'Hospital Ecology' :
                                    activeTab === 'doctors' ? 'Physician Registry' :
                                        activeTab === 'nursing' ? 'Nursing Operations' :
                                            activeTab === 'pharmacy' ? 'Pharmacy Hub' :
                                                activeTab === 'analytics' ? 'Analytics Suite' :
                                                    activeTab === 'research' ? 'Research Node' :
                                                        'System Architecture'}
                            <span className="premium-gradient-text ml-3">Portal</span>
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Dr. Ramachandra Hospital, Porur • Active Monitoring Node
                        </p>
                    </div>
                    <div className="hidden md:flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-600">
                        <span>Server: <span className="text-emerald-500">Online</span></span>
                        <span>Uptime: 99.9%</span>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === 'intake' && (
                        <motion.div
                            key="intake"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full space-y-10"
                        >
                            <TriageForm onResult={(res) => setResults(prev => [res, ...prev])} />

                            <AnimatePresence>
                                {results.length > 0 && (
                                    <TriageDashboard
                                        results={results}
                                        onReset={() => setResults([])}
                                    />
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}

                    {activeTab === 'map' && (
                        <motion.div
                            key="map"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full"
                        >
                            <HospitalMap />
                        </motion.div>
                    )}

                    {activeTab === 'doctors' && (
                        <motion.div
                            key="doctors"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full"
                        >
                            <DoctorRegistry />
                        </motion.div>
                    )}

                    {activeTab === 'nursing' && (
                        <motion.div
                            key="nursing"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full"
                        >
                            <NurseStation />
                        </motion.div>
                    )}

                    {activeTab === 'pharmacy' && (
                        <motion.div
                            key="pharmacy"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full"
                        >
                            <PharmacyHub />
                        </motion.div>
                    )}

                    {activeTab === 'analytics' && (
                        <motion.div
                            key="analytics"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full"
                        >
                            <AnalyticsSuite />
                        </motion.div>
                    )}

                    {activeTab === 'research' && (
                        <motion.div
                            key="research"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full"
                        >
                            <ResearchNode />
                        </motion.div>
                    )}

                    {activeTab === 'integration' && (
                        <motion.div
                            key="integration"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="w-full"
                        >
                            <IntegrationHub />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
