'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Mail, Lock, ArrowRight, Activity, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate auth
        setTimeout(() => {
            router.push('/portal');
        }, 1500);
    };

    return (
        <main className="min-h-screen flex items-center justify-center p-4 bg-[#020617] overflow-hidden relative">
            {/* Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-blue-600/10 blur-[150px] rounded-full -z-10" />
            <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-indigo-600/10 blur-[150px] rounded-full -z-10" />

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card p-8 md:p-12 w-full max-w-md border-white/10"
            >
                <div className="text-center mb-10">
                    <Link href="/" className="inline-block mb-8">
                        <Image src="/logo.png" alt="Aegis Logo" width={200} height={60} className="h-12 w-auto mx-auto" />
                    </Link>
                    <h1 className="text-2xl font-bold italic mb-2">Welcome Back, <span className="premium-gradient-text">Registrar</span></h1>
                    <p className="text-slate-500 text-sm">Secure biometric authentication & portal access.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                                <Mail className="w-3 h-3" /> Email Address
                            </label>
                            <input
                                type="email"
                                defaultValue="admin@aegis-health.ai"
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="name@hospital.com"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-2">
                                <Lock className="w-3 h-3" /> Personnel PIN
                            </label>
                            <input
                                type="password"
                                defaultValue="••••••••"
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? (
                            <Activity className="animate-spin w-5 h-5" />
                        ) : (
                            <>Authorize Session <ArrowRight className="w-4 h-4" /></>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-8 border-t border-white/5 text-center">
                    <div className="flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest">
                        <ShieldCheck className="w-3 h-3 text-emerald-500" /> AES-256 End-to-End Encryption
                    </div>
                </div>
            </motion.div>

            {/* Decorative footer text */}
            <div className="absolute bottom-8 text-[10px] font-bold text-slate-700 uppercase tracking-[0.3em]">
                System Architecture v4.0.2 // Aegis Health Systems
            </div>
        </main>
    );
}
