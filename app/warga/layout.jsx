"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function WargaLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { path: '/warga', icon: 'fas fa-home', label: 'Dashboard' },
        { path: '/warga/layanan', icon: 'fas fa-envelope-open-text', label: 'Layanan Surat' },
        { path: '/warga/laporan', icon: 'fas fa-bullhorn', label: 'Laporan Komunitas' }
    ];

    const belanjaLinks = [
        { path: '/warga/pasar', icon: 'fas fa-store-alt', label: 'Pasar Desa' },
        { path: '/warga/keranjang', icon: 'fas fa-shopping-cart', label: 'Keranjang', badge: 3 },
        { path: '/warga/pesanan', icon: 'fas fa-truck', label: 'Status Pesanan' },
        { path: '/warga/riwayat', icon: 'fas fa-history', label: 'Riwayat Belanja' }
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-center h-16 border-b border-slate-200">
                    <div className="text-2xl font-bold text-brand-600 flex items-center pr-12 lg:pr-0">
                        <i className="fas fa-leaf mr-2"></i> SmartDesa
                    </div>
                </div>
                <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-64px)]">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-4 px-3">Menu Warga</div>
                    {navLinks.map((link) => (
                        <Link key={link.path} href={link.path} className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition-all ${pathname === link.path ? 'bg-brand-50 text-brand-600 border-r-4 border-brand-500' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'}`}>
                            <i className={`${link.icon} w-6 text-center mr-2 text-lg`}></i> {link.label}
                        </Link>
                    ))}

                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-6 px-3">Belanja UMKM</div>
                    {belanjaLinks.map((link) => (
                        <Link key={link.path} href={link.path} className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition-all ${pathname === link.path ? 'bg-brand-50 text-brand-600 border-r-4 border-brand-500' : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'}`}>
                            <i className={`${link.icon} w-6 text-center mr-2 text-lg`}></i> {link.label}
                            {link.badge && <span className="ml-auto bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{link.badge}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Mobile overlay */}
            {sidebarOpen && (
                <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-slate-900 bg-opacity-50 z-40 lg:hidden focus:outline-none"></div>
            )}

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <header className="h-16 bg-white/90 backdrop-blur border-b border-slate-200 flex items-center justify-between px-6 z-30">
                    <div className="flex items-center">
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-slate-500 hover:text-slate-700 focus:outline-none lg:hidden mr-4">
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                        <h2 className="text-xl font-bold text-slate-800 hidden sm:block">Portal Warga</h2>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button className="text-slate-500 hover:text-brand-600 transition relative">
                            <i className="fas fa-bell text-xl"></i>
                            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        </button>
                        
                        <div className="relative">
                            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2 focus:outline-none">
                                <img className="h-9 w-9 rounded-full object-cover border-2 border-brand-500 p-0.5 bg-white" src="https://ui-avatars.com/api/?name=Budi+Santoso&background=10b981&color=fff" alt="User" />
                                <span className="font-bold text-sm text-slate-700 hidden md:block">Budi Santoso</span>
                                <i className="fas fa-chevron-down text-xs text-slate-500 hidden md:block"></i>
                            </button>
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                                    <Link href="/warga/profil" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"><i className="fas fa-user-circle mr-2 text-slate-400"></i> Profil Saya</Link>
                                    <Link href="/warga/pengaturan" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"><i className="fas fa-cog mr-2 text-slate-400"></i> Pengaturan</Link>
                                    <div className="border-t border-slate-100 my-1"></div>
                                    <Link href="/" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium"><i className="fas fa-sign-out-alt mr-2 text-red-400"></i> Keluar</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-4 lg:p-8 bg-slate-50">
                    {children}
                </main>
            </div>
        </div>
    );
}
