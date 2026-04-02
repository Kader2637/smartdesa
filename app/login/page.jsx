"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
    const [identifier, setIdentifier] = useState(''); // Email or NIK
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSimulation = (e) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            const iden = identifier.toLowerCase();

            // Simple demo router based on keywords
            if (iden.includes('admin')) {
                router.push('/admin');
            } else if (iden.includes('seller') || iden.includes('umkm')) {
                router.push('/seller');
            } else {
                // Default goes to Warga
                router.push('/warga');
            }
        }, 1000);
    };

    // Helper functions for easy demonstration
    const autofill = (role) => {
        if (role === 'admin') {
            setIdentifier('admin@smartdesa.id');
            setPassword('superadmin123');
        } else if (role === 'seller') {
            setIdentifier('seller@umkm.id');
            setPassword('seller123');
        } else if (role === 'warga') {
            setIdentifier('3507111222333444'); // Mock NIK
            setPassword('warga123');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 pt-32 md:pt-40 pb-20 relative overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-500/20 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-[1100px] bg-white/80 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white flex overflow-hidden relative z-10 animate-in zoom-in-95 duration-700">
                
                {/* Left Side: Forms */}
                <div className="w-full lg:w-[45%] p-8 md:p-12 lg:p-16 flex flex-col justify-center relative">
                    <Link href="/" className="absolute top-6 left-6 md:top-8 md:left-8 w-10 h-10 bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center rounded-full transition-colors">
                        <i className="fas fa-arrow-left"></i>
                    </Link>

                    <div className="mb-8 text-center lg:text-left mt-8 lg:mt-0">
                        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Portal <span className="text-brand-500">Desa</span></h2>
                        <p className="text-slate-500 font-medium">{activeTab === 'login' ? 'Selamat datang kembali! Silakan masuk ke akun Anda.' : 'Pendaftaran identitas digital warga.'}</p>
                    </div>

                    {/* Tab Switcher */}
                    <div className="flex bg-slate-100 p-1 rounded-2xl mb-8 relative">
                        <div className={`absolute inset-y-1 w-[calc(50%-4px)] bg-white rounded-xl shadow-sm transition-all duration-300 ease-out ${activeTab === 'register' ? 'translate-x-full left-[2px]' : 'translate-x-0 left-[4px]'}`}></div>
                        <button onClick={() => setActiveTab('login')} className={`flex-1 py-3 text-sm font-bold z-10 transition-colors ${activeTab === 'login' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}>Masuk</button>
                        <button onClick={() => setActiveTab('register')} className={`flex-1 py-3 text-sm font-bold z-10 transition-colors ${activeTab === 'register' ? 'text-brand-600' : 'text-slate-500 hover:text-slate-700'}`}>Daftar (Warga)</button>
                    </div>

                    {/* DYNAMIC FORMS */}
                    <div className="relative overflow-hidden">
                        {/* FORM LOGIN */}
                        {activeTab === 'login' && (
                            <form onSubmit={handleSimulation} className="space-y-5 animate-in slide-in-from-left-8 fade-in duration-300">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">NIK atau Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400"><i className="far fa-id-card"></i></div>
                                        <input type="text" required value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all focus:bg-white" placeholder="Cth: 3507xxxxxxxx atau budi@desa.id" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Kata Sandi</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400"><i className="fas fa-lock"></i></div>
                                        <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all focus:bg-white" placeholder="• • • • • • • •" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between text-sm py-1">
                                    <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" className="rounded text-brand-500 w-4 h-4 border-slate-300 focus:ring-brand-500" /><span className="text-slate-600 font-medium">Ingat Perangkat</span></label>
                                    <a href="#" className="font-bold text-brand-600 hover:text-brand-700 transition-colors tooltip relative group">Lupa Sandi?
                                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-3 py-1.5 rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap">Hubungi Kantor Desa</span>
                                    </a>
                                </div>
                                <button type="submit" disabled={isLoading} className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-brand-500 hover:shadow-xl hover:shadow-brand-500/20 active:scale-[0.98] transition-all flex justify-center items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed">
                                    {isLoading ? <i className="fas fa-circle-notch fa-spin"></i> : "Masuk"}
                                </button>
                            </form>
                        )}

                        {/* FORM REGISTER */}
                        {activeTab === 'register' && (
                            <form onSubmit={(e) => { e.preventDefault(); setActiveTab('login') }} className="space-y-4 animate-in slide-in-from-right-8 fade-in duration-300">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nama Lengkap Sesuai KTP</label>
                                    <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all focus:bg-white" placeholder="Cth: Budi Santoso" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Nomor Induk Kependudukan (NIK)</label>
                                    <input type="number" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all focus:bg-white" placeholder="16 Digit NIK" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Buat Kata Sandi Akses</label>
                                    <input type="password" required className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all focus:bg-white" placeholder="Minimal 8 karakter" />
                                </div>
                                <button type="submit" className="w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-brand-500 hover:shadow-xl hover:shadow-brand-500/20 active:scale-[0.98] transition-all mt-2">
                                    Ajukan Registrasi Warga
                                </button>
                            </form>
                        )}
                    </div>

                    {/* DEMO SHORTCUTS */}
                    <div className="mt-10 pt-6 border-t border-slate-100">
                        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-4 flex items-center justify-center lg:justify-start gap-2">
                            <i className="fas fa-magic"></i> Modus Demonstrasi Akses
                        </p>
                        <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                            <button type="button" onClick={() => autofill('warga')} className="bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 font-bold text-xs px-3 py-2 rounded-lg transition-colors shadow-sm"><i className="far fa-user mr-1"></i> Mode Warga</button>
                            <button type="button" onClick={() => autofill('seller')} className="bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 font-bold text-xs px-3 py-2 rounded-lg transition-colors shadow-sm"><i className="fas fa-store mr-1"></i> Mode Penjual</button>
                            <button type="button" onClick={() => autofill('admin')} className="bg-slate-100 hover:bg-purple-50 text-slate-600 hover:text-purple-600 font-bold text-xs px-3 py-2 rounded-lg transition-colors shadow-sm"><i className="fas fa-shield-alt mr-1"></i> Mode Admin</button>
                        </div>
                    </div>

                </div>
                
                {/* Right Side: Image Banner */}
                <div className="hidden lg:block w-[55%] relative overflow-hidden group">
                    <img src="https://asset.kompas.com/crops/dNdJCL4pO3DFT4Cm3Wuf48HO7hA=/0x0:1000x667/1200x800/data/photo/2022/05/29/6293992a8d709.jpg" alt="Desa Digital" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                    
                    {/* Glassmorphism overlays */}
                    <div className="absolute inset-0 bg-slate-900/40 mix-blend-multiply"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent flex flex-col justify-end p-16">
                        
                        {/* Trust Badges */}
                        <div className="flex gap-4 mb-8">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xl shadow-xl"><i className="fas fa-shield-check"></i></div>
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white text-xl shadow-xl"><i className="fas fa-fingerprint"></i></div>
                        </div>

                        <h2 className="text-4xl font-extrabold text-white mb-4 leading-[1.2]">Gerbang Layanan<br/>Desa Digital Masa Depan.</h2>
                        <p className="text-slate-300 font-medium text-lg max-w-md leading-relaxed">Kelola administrasi, surat menyurat, berjualan di pasar warga, hingga pengajuan komplain terpadu dalam satu wadah interaktif.</p>
                        
                        <div className="mt-8 flex gap-2">
                             <div className="w-2 h-2 rounded-full bg-brand-500"></div>
                             <div className="w-2 h-2 rounded-full bg-white/30"></div>
                             <div className="w-2 h-2 rounded-full bg-white/30"></div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
