"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const pathname = usePathname() || '/';
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // A helper to determine if the link is active
    const isActive = (path) => pathname === path ? 'text-emerald-600 font-bold' : 'text-slate-600 hover:text-emerald-600';

    if (pathname.startsWith('/warga') || pathname.startsWith('/admin') || pathname.startsWith('/seller') || pathname.startsWith('/rt')) {
        return null;
    }

    return (
        <header className={`fixed inset-x-0 z-50 transition-all duration-500 ease-in-out ${scrolled ? 'top-2 sm:top-4' : 'top-0'}`}>
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <nav className={`relative flex items-center justify-between transition-all duration-500 ease-in-out ${scrolled ? 'bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-full px-5 py-3 md:px-8 border border-white/50' : 'bg-transparent py-5 px-2 md:px-4'}`}>

                    <div className="w-10 md:hidden"></div>

                    <Link
                        href="/"
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:static md:translate-x-0 md:translate-y-0 flex items-center group z-50"
                    >
                        <div className="relative flex items-center justify-center">
                            <Image
                                src="/logo.png"
                                alt="SmartDesa Nusantara"
                                width={300}
                                height={80}
                                className="w-48 md:w-34 md:h-16 max-h-15 md:max-h-50 h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                                priority
                            />
                        </div>
                    </Link>

                    <div className="hidden md:flex items-center gap-1 bg-slate-50/50 rounded-full px-2 py-1.5 backdrop-blur-sm border border-slate-100/50">
                        <Link href="/" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive('/')} ${pathname === '/' ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'hover:bg-white/60'}`}>Beranda</Link>
                        <Link href="/profile" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive('/profile')} ${pathname === '/profile' ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'hover:bg-white/60'}`}>Profile</Link>
                        <Link href="/layanan" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive('/layanan')} ${pathname === '/layanan' ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'hover:bg-white/60'}`}>Layanan</Link>
                        <Link href="/umkm" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive('/umkm')} ${pathname === '/umkm' ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'hover:bg-white/60'}`}>UMKM</Link>
                        <Link href="/berita" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive('/berita')} ${pathname === '/berita' ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'hover:bg-white/60'}`}>Berita</Link>
                        <Link href="/lapor" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive('/lapor')} ${pathname === '/lapor' ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'hover:bg-white/60'}`}>Lapor</Link>
                        <Link href="/#lacak-surat" className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${isActive('/#lacak-surat')} ${pathname === '/#lacak-surat' ? 'bg-white shadow-sm ring-1 ring-slate-100' : 'hover:bg-white/60'}`}>Lacak Surat</Link>
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <Link href="/login" className="px-5 py-2.5 text-sm font-bold text-slate-700 hover:text-emerald-600 transition-colors">
                            Masuk
                        </Link>
                        <Link href="/login" className="px-6 py-2.5 text-sm font-bold bg-slate-900 text-white rounded-full hover:bg-emerald-600 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-emerald-500/25 hover:-translate-y-0.5">
                            Daftar Warga
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
                        aria-label="Toggle Menu"
                    >
                        <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl transition-transform duration-300`}></i>
                    </button>

                </nav>

                {/* Mobile Menu Dropdown */}
                <div className={`md:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden transition-all duration-300 origin-top flex flex-col ${mobileMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 pointer-events-none'}`}>
                    <div className="p-4 flex flex-col gap-1">
                        <Link onClick={() => setMobileMenuOpen(false)} href="/" className={`px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${isActive('/')} ${pathname === '/' ? 'bg-emerald-50 text-emerald-700' : 'bg-transparent'}`}>Beranda</Link>
                        <Link onClick={() => setMobileMenuOpen(false)} href="/layanan" className={`px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${isActive('/layanan')} ${pathname === '/layanan' ? 'bg-emerald-50 text-emerald-700' : 'bg-transparent'}`}>Layanan Desa</Link>
                        <Link onClick={() => setMobileMenuOpen(false)} href="/umkm" className={`px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${isActive('/umkm')} ${pathname === '/umkm' ? 'bg-emerald-50 text-emerald-700' : 'bg-transparent'}`}>Pasar UMKM</Link>
                        <Link onClick={() => setMobileMenuOpen(false)} href="/berita" className={`px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${isActive('/berita')} ${pathname === '/berita' ? 'bg-emerald-50 text-emerald-700' : 'bg-transparent'}`}>Portal Berita</Link>
                        <Link onClick={() => setMobileMenuOpen(false)} href="/#lacak-surat" className={`px-4 py-3 rounded-2xl text-sm font-bold transition-colors ${isActive('/#lacak-surat')} ${pathname === '/#lacak-surat' ? 'bg-emerald-50 text-emerald-700' : 'bg-transparent'}`}>Lacak Surat Saya</Link>
                    </div>
                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
                        <Link onClick={() => setMobileMenuOpen(false)} href="/login" className="flex-1 py-3 text-center rounded-xl bg-white border border-slate-200 text-slate-700 text-sm font-bold hover:bg-slate-50">Masuk</Link>
                        <Link onClick={() => setMobileMenuOpen(false)} href="/login" className="flex-1 py-3 text-center rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 shadow-md shadow-emerald-600/20">Daftar</Link>
                    </div>
                </div>
            </div>
        </header>
    );
}