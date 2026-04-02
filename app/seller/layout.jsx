"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SellerLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();

    const navLinks = [
        { path: '/seller', icon: 'fas fa-chart-line', label: 'Ringkasan Toko' },
        { path: '/seller/produk', icon: 'fas fa-box-open', label: 'Manajemen Produk' },
        { path: '/seller/pesanan', icon: 'fas fa-shopping-bag', label: 'Pesanan Masuk', badge: 4 },
        { path: '/seller/pengiriman', icon: 'fas fa-truck-fast', label: 'Pengiriman' },
        { path: '/seller/pendapatan', icon: 'fas fa-wallet', label: 'Pendapatan' },
        { path: '/seller/profil', icon: 'fas fa-store', label: 'Profil Toko' }
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50">
            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800 transform transition-transform duration-300 lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="flex items-center justify-center h-16 border-b border-slate-800">
                    <div className="text-xl font-bold text-white flex items-center pr-12 lg:pr-0 tracking-wider">
                        Toko<span className="text-brand-400">Desa.</span>
                    </div>
                </div>
                <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-64px)]">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 mt-4 px-3">Dashboard Seller</div>
                    {navLinks.map((link) => (
                        <Link key={link.path} href={link.path} className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all ${pathname === link.path ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/20' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                            <i className={`${link.icon} w-6 text-center mr-3 text-lg`}></i> <span className="text-sm">{link.label}</span>
                            {link.badge && <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">{link.badge}</span>}
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
                        <h2 className="text-lg font-bold text-slate-800 hidden sm:block">Kopi Pak Budi (Toko Buka)</h2>
                    </div>
                    <div className="flex items-center space-x-5">
                        <button className="text-slate-500 hover:text-brand-600 transition relative">
                            <i className="fas fa-bell text-xl"></i>
                            <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </span>
                        </button>
                        
                        <div className="relative">
                            <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center space-x-2 focus:outline-none bg-slate-50 hover:bg-slate-100 p-1.5 pr-3 rounded-full border border-slate-200 transition">
                                <img className="h-7 w-7 rounded-full object-cover bg-white" src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=100&q=80" alt="Toko" />
                                <span className="font-bold text-xs text-slate-700 hidden md:block">Budi Kopi</span>
                            </button>
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-2 z-50">
                                    <Link href="/seller/profil" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"><i className="fas fa-store-alt mr-2 text-slate-400"></i> Profil Toko</Link>
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
