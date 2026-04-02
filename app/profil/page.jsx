"use client";

import { useEffect, useState } from 'react';

export default function ProfilPage() {
    const [scrolled, setScrolled] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY);
            const reveals = document.querySelectorAll('.reveal');
            reveals.forEach(el => {
                const windowHeight = window.innerHeight;
                const elementTop = el.getBoundingClientRect().top;
                if (elementTop < windowHeight - 100) el.classList.add('active');
            });
        };
        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="bg-slate-50 min-h-screen pb-20">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <img src="https://images.unsplash.com/photo-1596404983050-6e469bb0fcbe?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80" alt="Desa" className="absolute inset-0 w-full h-full object-cover" style={{ transform: `translateY(${scrolled * 0.5}px)` }} />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900"></div>
                
                <div className="relative z-10 text-center px-4 max-w-4xl pt-20">
                    <span className="inline-block py-1 px-3 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 text-sm font-bold tracking-wider uppercase mb-6 backdrop-blur-md">Kecamatan Sukamakmur</span>
                    <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">Desa <span className="text-brand-400">Nusantara Jaya</span></h1>
                    <p className="text-xl text-slate-300 font-light max-w-2xl mx-auto leading-relaxed mb-10">Menjadi desa percontohan nasional dalam integrasi tata kelola digital, pelestarian budaya, dan kemandirian ekonomi.</p>
                </div>

                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 animate-bounce text-white">
                    <span className="text-xs font-bold uppercase tracking-widest text-brand-400">Jelajahi</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                </div>
            </section>

            {/* Sambutan */}
            <section className="py-24 bg-white relative z-20 -mt-10 rounded-t-[3rem] shadow-2xl mx-4 lg:mx-12">
                <div className="max-w-6xl mx-auto px-4 z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="reveal order-2 lg:order-1">
                            <span className="text-brand-600 font-bold tracking-wider text-sm uppercase mb-4 block">Sambutan Kades</span>
                            <h2 className="text-4xl font-extrabold text-slate-900 mb-6 leading-tight">"Digitalisasi Bukan Menghapus Tradisi, Tapi Memperkuat Identitas."</h2>
                            <p className="text-slate-600 text-lg mb-6 leading-relaxed">Selamat datang di Desa Nusantara Jaya. Kami berkomitmen memberikan pelayanan terbaik bagi warga. Melalui DesaSmart, seluruh urusan administrasi, transaksi, dan aspirasi dapat diakses dalam genggaman tangan.</p>
                            <p className="text-slate-600 text-lg leading-relaxed mb-8">Bersama, kita wujudkan desa yang mandiri, sejahtera, dan siap menyongsong Indonesia Emas.</p>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-slate-200 overflow-hidden"><img src="https://ui-avatars.com/api/?name=Budi+Santoso&background=10b981&color=fff" alt="Kades" className="w-full h-full object-cover" /></div>
                                <div><h4 className="font-bold text-slate-900 text-lg">H. Budi Santoso, S.Sos</h4><p className="text-brand-600 text-sm font-semibold">Kepala Desa</p></div>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 reveal">
                            <div className="relative">
                                <div className="absolute inset-0 bg-brand-500 rounded-3xl translate-x-4 translate-y-4"></div>
                                <img src="https://images.unsplash.com/photo-1544717305-27f2540b5184?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Kades" className="relative rounded-3xl z-10 w-full object-cover aspect-[4/5] shadow-xl grayscale hover:grayscale-0 transition-all duration-700" />
                                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl z-20">
                                    <div className="flex items-center gap-4 text-slate-900"><div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-500"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div><div><p className="text-sm font-bold text-slate-500">Masa Jabatan</p><p className="text-xl font-extrabold">2021 - 2027</p></div></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Demografi */}
            <section className="py-24 bg-slate-900">
                <div className="max-w-7xl mx-auto px-4 text-center reveal">
                    <span className="text-brand-400 font-bold tracking-wider text-sm uppercase mb-4 block">Statistik Real-time</span>
                    <h2 className="text-4xl font-extrabold text-white mb-16">Pusat Data Warga</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-800">
                        <div><p className="text-5xl font-extrabold text-white mb-2">15,420</p><p className="text-slate-400 uppercase tracking-widest text-xs font-bold">Total Warga</p></div>
                        <div><p className="text-5xl font-extrabold text-brand-400 mb-2">4,120</p><p className="text-slate-400 uppercase tracking-widest text-xs font-bold">Kepala Keluarga</p></div>
                        <div><p className="text-5xl font-extrabold text-white mb-2">32<span className="text-2xl">%</span></p><p className="text-slate-400 uppercase tracking-widest text-xs font-bold">Usia Produktif</p></div>
                        <div><p className="text-5xl font-extrabold text-brand-400 mb-2">124</p><p className="text-slate-400 uppercase tracking-widest text-xs font-bold">UMKM Aktif</p></div>
                    </div>
                </div>
            </section>
        </div>
    );
}
