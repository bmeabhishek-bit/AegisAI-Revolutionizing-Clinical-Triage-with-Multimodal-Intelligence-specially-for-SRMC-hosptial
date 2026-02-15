'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Upload, Send, Activity, User, Clipboard, Thermometer, HeartPulse, Mic, AlertCircle, ShieldCheck, Zap } from 'lucide-react';

interface TriageResult {
    riskLevel: string;
    department: string;
    explanation: string;
    confidenceScore: number;
    actionItems: string[];
}

export default function TriageForm({ onResult }: { onResult: (res: TriageResult) => void }) {
    const [loading, setLoading] = useState(false);
    const [listening, setListening] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        age: '',
        gender: 'Male',
        symptoms: '',
        bp: '',
        heartRate: '',
        temp: '',
        preExisting: ''
    });

    const normalizeData = (data: any) => {
        const normalized: any = {};
        const mapping: any = {
            age: ['age', 'patientage', 'patient age', 'years', 'yrs'],
            gender: ['gender', 'sex'],
            symptoms: ['symptoms', 'clinicalfindings', 'findings', 'complaints', 'chief complaint'],
            bp: ['bp', 'bloodpressure', 'blood pressure', 'vitals.bp'],
            heartRate: ['heartrate', 'pulse', 'hr', 'bpm', 'vitals.hr'],
            temp: ['temp', 'temperature', 'bodytemp', 'vitals.temp'],
            preExisting: ['preexisting', 'history', 'medicalhistory', 'past medical history', 'conditions']
        };

        Object.keys(mapping).forEach(targetKey => {
            const aliases = mapping[targetKey];
            const foundKey = Object.keys(data).find(k =>
                aliases.includes(k.toLowerCase().trim().replace(/[:\-_]/g, ''))
            );
            if (foundKey) {
                normalized[targetKey] = data[foundKey];
            }
        });

        return normalized;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('/api/triage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.error) {
                alert(`Triage Error: ${data.error}`);
            } else {
                onResult(data);
            }
        } catch (err) {
            console.error(err);
            alert('An unexpected error occurred during triage.');
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Reset image preview if not an image
        if (file.type.startsWith('image/')) {
            setImagePreview(URL.createObjectURL(file));
        } else {
            setImagePreview(null);
        }

        setLoading(true);
        const reader = new FileReader();
        reader.onload = async () => {
            const base64 = (reader.result as string).split(',')[1];
            try {
                // Determine mimeType for .ehv, .csv etc
                let mimeType = file.type;
                if (!mimeType) {
                    if (file.name.endsWith('.ehv')) mimeType = 'text/plain';
                    else if (file.name.endsWith('.csv')) mimeType = 'text/csv';
                    else mimeType = 'application/octet-stream';
                }

                const res = await fetch('/api/parse-doc', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ fileData: base64, mimeType }),
                });
                const data = await res.json();
                if (data.error) {
                    alert(data.error);
                } else {
                    const normalizedData = normalizeData(data);
                    setFormData(prev => ({ ...prev, ...normalizedData }));
                }
            } catch (err) {
                console.error(err);
                alert('An unexpected error occurred while parsing the document.');
            } finally {
                setLoading(false);
            }
        };
        reader.readAsDataURL(file);
    };

    const toggleListening = () => {
        setListening(!listening);
        if (!listening) {
            // Simulated voice input for demo
            setTimeout(() => {
                setFormData(prev => ({
                    ...prev,
                    symptoms: prev.symptoms + (prev.symptoms ? " " : "") + "Patient reports acute pulmonary distress and sharp stabbing pain in the upper abdomen."
                }));
                setListening(false);
            }, 3000);
        }
    };

    return (
        <div className="glass-card p-6 md:p-10 w-full max-w-4xl mx-auto border-white/10">
            <div className="flex flex-col md:flex-row gap-10">
                {/* Left Side: Upload & Quick Stats */}
                <div className="w-full md:w-1/3 space-y-6">
                    <div className="relative group overflow-hidden rounded-2xl border border-dashed border-white/20 hover:border-blue-500/50 transition-colors bg-white/5">
                        {!imagePreview ? (
                            <label className="flex flex-col items-center justify-center py-10 px-4 cursor-pointer">
                                <Upload className="w-10 h-10 mb-4 text-blue-500 group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-bold text-slate-300">Quick Import</span>
                                <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-tighter">EHR / EMR / .EHV / CSV</span>
                                <input type="file" className="hidden" onChange={handleFileUpload} />
                            </label>
                        ) : (
                            <div className="relative aspect-square">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button onClick={() => setImagePreview(null)} className="p-2 bg-red-500 rounded-full text-white">
                                        <AlertCircle className="w-5 h-5 rotate-45" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="space-y-3">
                        <div className="p-4 rounded-xl bg-blue-600/5 border border-blue-500/20 flex items-center gap-3">
                            <ShieldCheck className="w-5 h-5 text-blue-400" />
                            <div>
                                <div className="text-[10px] uppercase font-bold text-slate-500">SHAP/LIME Engine</div>
                                <div className="text-[9px] font-medium text-slate-400 leading-tight">Post-hoc Attribution Active</div>
                            </div>
                        </div>
                        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 flex items-center gap-3">
                            <Activity className="w-5 h-5 text-amber-500" />
                            <div>
                                <div className="text-[10px] uppercase font-bold text-slate-500">Synthetic Data Vault</div>
                                <div className="text-[9px] font-medium text-slate-400 leading-tight">SDV-Powered Clinical Simulation</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Form */}
                <form onSubmit={handleSubmit} className="flex-1 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase ml-1">
                                <User className="w-4 h-4" /> Patient Age
                            </label>
                            <input
                                type="text"
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700"
                                placeholder="e.g. 45"
                                required
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase ml-1">
                                <HeartPulse className="w-4 h-4" /> Gender
                            </label>
                            <select
                                value={formData.gender}
                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            >
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1.5 relative">
                        <label className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase ml-1">
                            <Clipboard className="w-4 h-4" /> Symptoms & Observation
                        </label>
                        <textarea
                            value={formData.symptoms}
                            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                            className="w-full bg-black/40 border border-white/10 rounded-xl p-3 h-28 focus:ring-2 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-700 resize-none"
                            placeholder="Describe symptoms or use voice input..."
                            required
                        />
                        <button
                            type="button"
                            onClick={toggleListening}
                            className={`absolute bottom-3 right-3 p-3 rounded-full transition-all ${listening ? 'bg-red-500 animate-pulse' : 'bg-blue-600/20 hover:bg-blue-600/40'
                                }`}
                        >
                            <Mic className={`w-4 h-4 ${listening ? 'text-white' : 'text-blue-400'}`} />
                        </button>
                    </div>

                    {/* Clickable Quick Symptoms */}
                    <div className="flex flex-wrap gap-2 px-1">
                        {['Chest Pain', 'High Fever', 'Breathlessness', 'Severe Headache', 'Dizziness', 'Muscle Pain'].map(symptom => (
                            <button
                                key={symptom}
                                type="button"
                                onClick={() => setFormData(prev => ({
                                    ...prev,
                                    symptoms: prev.symptoms ? `${prev.symptoms}, ${symptom}` : symptom
                                }))}
                                className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:bg-blue-600/20 hover:border-blue-500/50 hover:text-blue-400 transition-all active:scale-95"
                            >
                                + {symptom}
                            </button>
                        ))}
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Blood Pressure</label>
                            <input
                                type="text"
                                value={formData.bp}
                                onChange={(e) => setFormData({ ...formData, bp: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-sm outline-none focus:border-blue-500/50"
                                placeholder="120/80"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1">Heart Rate</label>
                            <input
                                type="text"
                                value={formData.heartRate}
                                onChange={(e) => setFormData({ ...formData, heartRate: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-sm outline-none focus:border-blue-500/50"
                                placeholder="72"
                            />
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold text-slate-500 uppercase ml-1 flex items-center gap-1">
                                <Thermometer className="w-2 h-2" /> Temp
                            </label>
                            <input
                                type="text"
                                value={formData.temp}
                                onChange={(e) => setFormData({ ...formData, temp: e.target.value })}
                                className="w-full bg-black/40 border border-white/10 rounded-xl p-2.5 text-sm outline-none focus:border-blue-500/50"
                                placeholder="36.6"
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Zap className="w-5 h-5 fill-current" />}
                        {loading ? 'Consulting Medical AI...' : 'Analyze Case Now'}
                    </button>
                </form>
            </div>
        </div>
    );
}
