"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSmartDesa } from '@/components/GlobalProvider';

export default function RTLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();
    const { currentUser, logout } = useSmartDesa();

    const menuItems = [
        { path: '/rt', icon: 'fas fa-pen-fancy', label: 'Verifikasi & Pengantar RT' },
        { path: '/rt/arsip-surat', icon: 'fas fa-file-signature', label: 'Arsip Surat Ditandatangani' },
        { path: '/rt/data-warga', icon: 'fas fa-users', label: 'Data Warga' },
        { path: '/rt/pengaduan', icon: 'fas fa-exclamation-triangle', label: 'Pengaduan Warga' },
        { path: '/rt/iuran', icon: 'fas fa-wallet', label: 'Uang Kas / Iuran' },
        { path: '/rt/pengumuman', icon: 'fas fa-bullhorn', label: 'Pengumuman RT' },
    ];

    const isCurrentPath = (path) => pathname === path;

    return (
        <div className="flex h-screen overflow-hidden bg-slate-50 text-slate-800">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div 
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-20 bg-black bg-opacity-50 lg:hidden"
                ></div>
            )}

            {/* Sidebar */}
            <aside 
                className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-slate-200 transform transition-transform duration-300 lg:static lg:translate-x-0 lg:flex lg:flex-col shadow-sm ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-center h-20 border-b border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-2xl text-emerald-600 tracking-tight">
                        <i className="fas fa-leaf"></i> Smart<span className="text-slate-800">Desa</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Pelayanan RT</p>
                    
                    {menuItems.map((item) => (
                        <Link 
                            key={item.path} 
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                                isCurrentPath(item.path) 
                                    ? 'bg-amber-50 text-amber-600 font-semibold' 
                                    : 'text-slate-500 hover:text-amber-600 hover:bg-slate-50'
                            }`}
                        >
                            <i className={`${item.icon} w-5 text-center`}></i> 
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 z-10 relative">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="text-slate-500 focus:outline-none lg:hidden hover:text-amber-600"
                        >
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <button 
                                onClick={() => setProfileOpen(!profileOpen)} 
                                className="flex items-center gap-3 focus:outline-none hover:bg-slate-50 p-1.5 rounded-xl transition"
                            >
                                <img 
                                    src={`https://ui-avatars.com/api/?name=${encodeURI(currentUser?.name || 'RT')}&background=F59E0B&color=fff`}
                                    alt="Avatar" 
                                    className="h-9 w-9 rounded-full object-cover shadow-sm"
                                />
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-semibold text-slate-700 leading-tight">{currentUser?.name || 'Ketua RT'}</p>
                                    <p className="text-xs text-slate-500">Panel Rukun Tetangga</p>
                                </div>
                                <i className="fas fa-chevron-down text-xs text-slate-400 ml-1"></i>
                            </button>
                            
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <button onClick={() => { logout(); window.location.href = '/login'; }} className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition cursor-pointer">
                                        <i className="fas fa-sign-out-alt mr-2 text-red-400"></i> Keluar
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>
                
                {/* Scrollable Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-50 p-4 md:p-6 custom-scrollbar">
                    {children}
                </main>
            </div>
        </div>
    );
}
