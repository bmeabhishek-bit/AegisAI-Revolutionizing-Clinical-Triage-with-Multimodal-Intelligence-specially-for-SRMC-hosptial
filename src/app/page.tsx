'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ShieldCheck, Zap, Globe, ArrowRight, CheckCircle2, Star, Users, PieChart, HeartPulse } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 selection:bg-blue-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-slate-950/50 backdrop-blur-xl border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-white/90 p-1 rounded-lg mix-blend-screen brightness-110">
            <Image src="/logo.png" alt="Aegis Logo" width={120} height={40} className="h-8 md:h-10 w-auto mix-blend-multiply" />
          </div>
          <div className="hidden lg:block">
            <div className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Specialized Center</div>
            <div className="text-xs font-bold text-white tracking-tight">Dr. Ramachandra Hospital</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Platform</a>
          <a href="#solutions" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Case Studies</a>
          <Link href="/login" className="bg-white/5 hover:bg-white/10 border border-white/10 px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all">
            Personnel Login
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] -z-10 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-indigo-600/10 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-widest mb-8"
          >
            <Zap className="w-3 h-3" /> Redefining Acute Care Triage
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-tight italic px-2"
          >
            The Future of <span className="premium-gradient-text">Medical Decision</span> Intelligence.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Aegis AI streamlines patient prioritization through advanced multimodal analysis, reducing wait times and saving lives with millisecond precision.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row items-center justify-center gap-4"
          >
            <Link href="/login" className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/20 transition-all active:scale-[0.98]">
              Enter System Workspace <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="w-full md:w-auto bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold px-10 py-5 rounded-2xl transition-all">
              Request Live Demo
            </button>
          </motion.div>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-20 pt-12 border-t border-white/5 flex flex-col items-center gap-8"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-600">Trusted by Global Medical Centers</p>
            <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
              {/* Placeholders for hospital logos */}
              <div className="text-xl font-bold font-serif">ST. MARKS</div>
              <div className="text-xl font-bold font-serif">MAYO CLINIC</div>
              <div className="text-xl font-bold font-serif">OXFORD HEALTH</div>
              <div className="text-xl font-bold font-serif">CEDARS SINAI</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 px-6 bg-slate-950/30 border-y border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Activity,
                title: "Multimodal Analysis",
                desc: "Simultaneously process patient history, EHR data, and live imaging via Gemini 2.0 Flash."
              },
              {
                icon: ShieldCheck,
                title: "Explainable AI",
                desc: "Get deep clinical reasoning for every triage decision to ensure physician alignment."
              },
              {
                icon: Globe,
                title: "Multilingual Support",
                desc: "Integrated translation for 40+ languages to bridge gaps in critical patient care."
              }
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                className="glass-card p-10 border-white/5 hover:border-blue-500/30 transition-all group"
              >
                <div className="p-4 rounded-2xl bg-blue-600/10 border border-blue-500/20 w-fit mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <feature.icon className="w-8 h-8 text-blue-400 group-hover:text-white transition-all" />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Accuracy Rate", val: "99.2%" },
            { label: "Wait Time Redux", val: "42m" },
            { label: "Hospitals Saved", val: "1.2k+" },
            { label: "Triage Requests", val: "4M+" }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-6xl font-bold mb-2 premium-gradient-text">{stat.val}</div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 mb-20">
        <div className="max-w-4xl mx-auto glass-card p-12 md:p-20 text-center relative overflow-hidden bg-blue-600/5 group border-blue-500/10">
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 italic">Ready to transform your <span className="premium-gradient-text">Triage Protocol?</span></h2>
            <Link href="/login" className="inline-flex items-center gap-3 bg-white text-black font-bold px-10 py-5 rounded-2xl hover:bg-slate-200 transition-all active:scale-95">
              Get Started for Healthcare <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          {/* Subtle background decoration */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-[100px] -z-10 group-hover:bg-blue-600/10 transition-all" />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5 bg-black/40">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="space-y-4">
            <Image src="/logo.png" alt="Aegis Logo" width={100} height={32} className="h-8 w-auto opacity-50 grayscale brightness-200" />
            <p className="text-slate-500 text-xs font-medium max-w-[250px]">
              Dr. Ramachandra Hospital — Leading clinical decision support in Porur.
            </p>
          </div>

          <div className="flex gap-20">
            <div className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-600">
              <p className="text-slate-400 mb-2">Hospital Platform</p>
              <p className="hover:text-white cursor-pointer">Security</p>
              <p className="hover:text-white cursor-pointer">EHR Connect</p>
            </div>
            <div className="space-y-4 text-xs font-bold uppercase tracking-widest text-slate-600">
              <p className="text-slate-400 mb-2">Porur Branch</p>
              <p className="hover:text-white cursor-pointer">About</p>
              <p className="hover:text-white cursor-pointer">Ethics</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/5 text-[10px] font-bold text-slate-700 uppercase tracking-widest text-center md:text-left">
          © 2026 Dr. Ramachandra Hospital Systems • Porur, Chennai.
        </div>
      </footer>
    </main>
  );
}
