"use client";

import { useSmartDesa } from '@/components/GlobalProvider';
import Link from 'next/link';

const STATUS_BADGE = {
    menunggu_rt:     { label: 'Menunggu RT',   cls: 'text-blue-700 bg-blue-100 border-blue-200' },
    menunggu_kades:  { label: 'Menunggu TTE',  cls: 'text-amber-700 bg-amber-100 border-amber-200' },
    selesai:         { label: 'Selesai ✓',     cls: 'text-emerald-700 bg-emerald-100 border-emerald-200' },
    ditolak:         { label: 'Ditolak',        cls: 'text-red-700 bg-red-100 border-red-200' },
};

export default function WargaDashboard() {
    const { surats, orders, currentUser } = useSmartDesa();

    const recentSurats = surats.slice(0, 3);
    const recentOrders = orders?.slice(0, 2) ?? [];

    const suratProses   = surats.filter(s => s.status === 'menunggu_rt' || s.status === 'menunggu_kades').length;
    const suratSelesai  = surats.filter(s => s.status === 'selesai').length;
    const pesananAktif  = recentOrders.length;

    const nama = currentUser?.name?.split(' ')[0] || 'Warga';

    return (
        <div className="space-y-8 fade-in">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-brand-600 to-teal-500 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">
                        Selamat Datang, {nama}! 👋
                    </h1>
                    <p className="text-brand-50 mb-6 max-w-lg text-base leading-relaxed font-medium">
                        Ajukan surat administrasi, belanja produk UMKM lokal, atau kirim laporan kepada pengurus desa — semua dalam satu portal.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/warga/layanan" className="bg-white text-brand-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm text-sm">
                            <i className="fas fa-file-alt mr-2"></i> Ajukan Surat
                        </Link>
                        <Link href="/warga/pasar" className="bg-brand-700/50 backdrop-blur text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition border border-brand-400 text-sm">
                            <i className="fas fa-store mr-2"></i> Belanja UMKM
                        </Link>
                    </div>
                </div>
                <i className="fas fa-user-friends absolute right-4 -bottom-12 text-[12rem] text-white opacity-10"></i>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Surat Diproses</p>
                        <h3 className="text-3xl font-extrabold text-slate-900">{suratProses}</h3>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-2xl">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Surat Selesai</p>
                        <h3 className="text-3xl font-extrabold text-slate-900">{suratSelesai}</h3>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 text-2xl">
                        <i className="fas fa-check-circle"></i>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Pesanan Aktif</p>
                        <h3 className="text-3xl font-extrabold text-slate-900">{pesananAktif}</h3>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-2xl">
                        <i className="fas fa-box"></i>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Surats */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Riwayat Surat</h3>
                        <Link href="/warga/layanan" className="text-sm text-brand-600 font-bold hover:underline">Lihat Semua</Link>
                    </div>
                    <div className="space-y-3">
                        {recentSurats.length === 0 ? (
                            <div className="text-center py-8 text-slate-400">
                                <i className="fas fa-file-alt text-4xl mb-3 block opacity-30"></i>
                                <p className="text-sm font-medium">Belum ada pengajuan surat.</p>
                                <Link href="/warga/layanan" className="text-brand-500 text-sm font-bold mt-2 block hover:underline">Ajukan Sekarang →</Link>
                            </div>
                        ) : recentSurats.map(s => {
                            const badge = STATUS_BADGE[s.status] || {};
                            return (
                                <div key={s.id} className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center shrink-0">
                                        <i className="fas fa-file-signature text-sm"></i>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 text-sm truncate">{s.type}</h4>
                                        <p className="text-xs text-slate-400 font-medium">{new Date(s.date).toLocaleDateString('id-ID')}</p>
                                    </div>
                                    <span className={`px-2 py-1 text-[10px] font-bold uppercase border rounded-lg shrink-0 ${badge.cls}`}>{badge.label}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Layanan Cepat */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h3 className="text-xl font-bold text-slate-900 mb-6">Layanan Cepat</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { href: '/warga/layanan', icon: 'fas fa-file-invoice', label: 'Ajukan Surat', color: 'bg-blue-50 text-blue-600' },
                            { href: '/warga/pasar', icon: 'fas fa-shopping-basket', label: 'Pasar UMKM', color: 'bg-emerald-50 text-emerald-600' },
                            { href: '/warga/laporan', icon: 'fas fa-bullhorn', label: 'Buat Laporan', color: 'bg-amber-50 text-amber-600' },
                            { href: '/warga/keranjang', icon: 'fas fa-shopping-cart', label: 'Keranjang', color: 'bg-purple-50 text-purple-600' },
                        ].map((item, i) => (
                            <Link key={i} href={item.href} className="flex flex-col items-center justify-center gap-3 p-5 bg-slate-50 rounded-2xl border border-slate-100 hover:bg-slate-100 hover:shadow-md transition group">
                                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                                    <i className={item.icon}></i>
                                </div>
                                <span className="text-sm font-bold text-slate-700">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
