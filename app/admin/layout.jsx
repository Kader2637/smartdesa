"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { path: '/admin', icon: 'fas fa-shield-alt', label: 'Dashboard Admin' },
        { path: '/admin/moderasi-produk', icon: 'fas fa-check-circle', label: 'Moderasi Produk' },
        { path: '/admin/validasi-surat', icon: 'fas fa-file-signature', label: 'Validasi Surat' },
        { path: '/admin/kelola-user', icon: 'fas fa-users-cog', label: 'Kelola User & UMKM' },
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
                    <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-2">Pusat Kendali</p>
                    
                    {menuItems.map((item) => (
                        <Link 
                            key={item.path} 
                            href={item.path}
                            className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                                isCurrentPath(item.path) 
                                    ? 'bg-emerald-50 text-emerald-600 font-semibold' 
                                    : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'
                            }`}
                        >
                            <i className={`${item.icon} w-5 text-center`}></i> 
                            <span>{item.label}</span>
                        </Link>
                    ))}

                    <p className="px-4 text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 mt-6">Akses Cepat</p>
                    <Link 
                        href="/warga/pasar"
                        className="flex items-center gap-3 px-4 py-2.5 text-slate-500 hover:text-emerald-600 hover:bg-slate-50 rounded-lg transition-colors"
                    >
                        <i className="fas fa-store w-5 text-center"></i> <span>Belanja (Marketplace)</span>
                    </Link>
                    <Link 
                        href="/admin/statistik"
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                            isCurrentPath('/admin/statistik')
                                ? 'bg-emerald-50 text-emerald-600 font-semibold'
                                : 'text-slate-500 hover:text-emerald-600 hover:bg-slate-50'
                        }`}
                    >
                        <i className="fas fa-chart-line w-5 text-center"></i> <span>Statistik Global</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden">
                {/* Header */}
                <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-slate-200 z-10 relative">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarOpen(true)}
                            className="text-slate-500 focus:outline-none lg:hidden hover:text-emerald-600"
                        >
                            <i className="fas fa-bars text-xl"></i>
                        </button>
                        <div className="hidden md:flex relative">
                            <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                            <input 
                                type="text" 
                                placeholder="Cari data warga, UMKM, resi..."
                                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 w-72 text-sm outline-none transition-all focus:w-80"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-5">
                        <div className="relative">
                            <button 
                                onClick={() => setProfileOpen(!profileOpen)} 
                                className="flex items-center gap-3 focus:outline-none hover:bg-slate-50 p-1.5 rounded-xl transition"
                            >
                                <img 
                                    src="https://ui-avatars.com/api/?name=Admin+Desa&background=10B981&color=fff"
                                    alt="Avatar" 
                                    className="h-9 w-9 rounded-full object-cover shadow-sm"
                                />
                                <div className="hidden md:block text-left">
                                    <p className="text-sm font-semibold text-slate-700 leading-tight">Kepala Admin</p>
                                    <p className="text-xs text-slate-500">Supervisi Sistem</p>
                                </div>
                                <i className="fas fa-chevron-down text-xs text-slate-400 ml-1"></i>
                            </button>
                            
                            {profileOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 border border-slate-100 z-50 animate-in fade-in zoom-in-95 duration-200">
                                    <Link href="/admin/pengaturan" className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 hover:text-emerald-600 transition">
                                        <i className="fas fa-cog mr-2 text-slate-400"></i> Pengaturan
                                    </Link>
                                    <div className="border-t border-slate-100 my-1"></div>
                                    <Link href="/" className="block px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition">
                                        <i className="fas fa-sign-out-alt mr-2 text-red-400"></i> Logout
                                    </Link>
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
