"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function AdminDashboardPage() {
    const [feedList, setFeedList] = useState([
        { 
            id: 1, name: 'Agus Supriyadi', role: 'RT 04 / RW 02', time: '2 Jam yang lalu', status: 'Menunggu Tanggapan', 
            text: 'Lapor Pak Kades, lampu jalan di pertigaan gang mangga mati sejak 2 hari yang lalu. Mohon segera diperbaiki karena kalau malam sangat gelap dan rawan. Terima kasih.',
            likes: 45, comments: 12, liked: false, showReply: false
        },
        { 
            id: 2, name: 'Siti Maimunah', role: '', time: 'Kemarin, 14:30 WIB', status: 'Selesai Ditangani', 
            text: 'Alhamdulillah, terima kasih banyak perangkat desa. Pipa saluran air bersih yang bocor di dekat balai desa sudah diperbaiki pagi ini. 🙏',
            likes: 128, comments: 5, liked: true, showReply: false
        }
    ]);

    const toggleLike = (id) => {
        setFeedList(feedList.map(item => {
            if (item.id === id) {
                return { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 };
            }
            return item;
        }));
    };

    const toggleReply = (id) => {
        setFeedList(feedList.map(item => item.id === id ? { ...item, showReply: !item.showReply } : item));
    };

    return (
        <div className="space-y-8 fade-in">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Statistik Global Desa</h2>
                <p className="text-slate-500 text-sm mt-1">Pantauan terpusat untuk Warga, UMKM, dan Administrasi (Data per 31 Mar 2026).</p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex justify-between items-center group hover:border-emerald-200 transition">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Total Warga Aktif</p>
                        <h3 className="text-3xl font-extrabold text-slate-800">1,245</h3>
                    </div>
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        <i className="fas fa-users"></i>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex justify-between items-center group hover:border-emerald-200 transition">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">UMKM Terverifikasi</p>
                        <h3 className="text-3xl font-extrabold text-slate-800">84</h3>
                    </div>
                    <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        <i className="fas fa-store"></i>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex justify-between items-center group hover:border-emerald-200 transition">
                    <div>
                        <p className="text-sm font-medium text-slate-500 mb-1">Total Transaksi (Global)</p>
                        <h3 className="text-3xl font-extrabold text-slate-800">Rp 45.2Jt</h3>
                    </div>
                    <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        <i className="fas fa-chart-line"></i>
                    </div>
                </div>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex justify-between items-center group hover:border-emerald-200 transition relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-16 h-16 bg-red-50 rounded-bl-full -mr-2 -mt-2"></div>
                    <div className="relative z-10 w-full flex justify-between items-center">
                        <div>
                            <p className="text-sm font-medium text-slate-500 mb-1">Perlu Validasi</p>
                            <h3 className="text-3xl font-extrabold text-red-600">12</h3>
                        </div>
                        <div className="w-14 h-14 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-2xl animate-pulse">
                            <i className="fas fa-bell"></i>
                        </div>
                    </div>
                </div>
            </div>

            {/* Moderation & Validation Split */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* Moderasi Produk Baru */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                            <i className="fas fa-box-open text-orange-500"></i> Moderasi Produk Baru
                        </h3>
                        <Link href="/admin/moderasi-produk" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Lihat Semua</Link>
                    </div>
                    <div className="p-0 divide-y divide-slate-100 flex-1">
                        <div className="p-4 flex items-center justify-between hover:bg-slate-50 transition">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-lg object-cover flex items-center justify-center text-slate-400">
                                    <i className="fas fa-image text-xl"></i>
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-800">Kopi Robusta Lereng (250g)</p>
                                    <p className="text-xs text-slate-500">Toko: <span className="font-medium text-emerald-700">UMKM Abah Jajang</span></p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="w-8 h-8 flex items-center justify-center bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-lg text-xs font-bold hover:bg-emerald-100 transition tooltip" title="Setujui">
                                    <i className="fas fa-check"></i>
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center bg-red-50 text-red-600 border border-red-100 rounded-lg text-xs font-bold hover:bg-red-100 transition tooltip" title="Tolak">
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Validasi Surat */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                            <i className="fas fa-file-signature text-blue-500"></i> Validasi Pengajuan Surat
                        </h3>
                        <Link href="/admin/validasi-surat" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">Lihat Semua</Link>
                    </div>
                    <div className="p-0 divide-y divide-slate-100 flex-1">
                        <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between hover:bg-slate-50 transition gap-4 sm:gap-0">
                            <div>
                                <p className="text-sm font-bold text-slate-800 line-clamp-1">Surat Keterangan Tidak Mampu (SKTM)</p>
                                <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5"><i className="far fa-user text-slate-400"></i> Joko Anwar (NIK: 357301...)</p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-sm shadow-blue-500/30 hover:bg-blue-700 transition flex items-center gap-1.5">
                                    <i className="fas fa-stamp"></i> Validasi
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* Forum Komunitas & Laporan Warga */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex justify-between items-center">
                    <div>
                        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                            <i className="fas fa-bullhorn text-red-500"></i> Forum Komunitas & Laporan Warga
                        </h3>
                        <p className="text-xs text-slate-500 mt-1 hidden sm:block">Pantau, tanggapi, atau moderasi laporan dari warga desa.</p>
                    </div>
                    <button className="text-emerald-600 text-sm font-bold hover:underline whitespace-nowrap">Ke Forum</button>
                </div>

                <div className="p-6 space-y-6 bg-slate-50/50">
                    {feedList.map((feed) => (
                        <div key={feed.id} className="bg-white border border-slate-200 shadow-sm p-5 rounded-2xl transition hover:border-slate-300">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 mb-4">
                                <div className="flex items-center gap-3">
                                    <img src={`https://ui-avatars.com/api/?name=${encodeURI(feed.name)}&background=random`} className="w-10 h-10 rounded-full" alt={feed.name} />
                                    <div>
                                        <div className="flex items-center flex-wrap gap-2">
                                            <p className="text-sm font-bold text-slate-800">{feed.name}</p>
                                            {feed.role && <span className="text-[10px] font-bold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-full">{feed.role}</span>}
                                        </div>
                                        <p className="text-xs text-slate-500 mt-0.5">{feed.time}</p>
                                    </div>
                                </div>
                                <span className={`${feed.status === 'Selesai Ditangani' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} border ${feed.status === 'Selesai Ditangani' ? 'border-green-200' : 'border-red-200'} px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wide`}>
                                    {feed.status}
                                </span>
                            </div>

                            <p className="text-sm text-slate-700 mb-4 leading-relaxed">{feed.text}</p>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-slate-100 pt-4 gap-4 sm:gap-0">
                                <div className="flex gap-4">
                                    <button 
                                        onClick={() => toggleLike(feed.id)}
                                        className={`text-sm font-bold transition flex items-center gap-1.5 focus:outline-none ${feed.liked ? 'text-emerald-600' : 'text-slate-500 hover:text-emerald-600'}`}
                                    >
                                        <i className={`${feed.liked ? 'fas' : 'far'} fa-thumbs-up`}></i> <span>{feed.likes}</span> <span className="hidden sm:inline">Upvote</span>
                                    </button>
                                    <button className="text-sm font-bold text-slate-500 hover:text-blue-600 transition flex items-center gap-1.5">
                                        <i className="far fa-comment-alt"></i> <span>{feed.comments}</span> <span className="hidden sm:inline">Komentar</span>
                                    </button>
                                </div>

                                <div className="flex gap-2 w-full sm:w-auto">
                                    <button 
                                        onClick={() => toggleReply(feed.id)}
                                        className="flex-1 sm:flex-none bg-blue-50 text-blue-600 border border-blue-100 px-4 py-2 rounded-lg text-xs font-bold hover:bg-blue-100 transition"
                                    >
                                        Tanggapi
                                    </button>
                                    <button className="w-10 flex items-center justify-center bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold hover:bg-red-100 hover:text-red-600 hover:border-red-200 transition">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>

                            {feed.showReply && (
                                <div className="mt-4 flex gap-3 items-start p-4 bg-slate-50 rounded-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                                    <img src="https://ui-avatars.com/api/?name=Admin+Desa&background=10B981&color=fff" className="w-8 h-8 rounded-full shadow-sm" alt="Admin" />
                                    <div className="flex-1 flex flex-col sm:flex-row gap-2">
                                        <input type="text" placeholder="Tulis tanggapan resmi dari pihak desa..." className="flex-1 border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" />
                                        <button className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-emerald-700 transition">Kirim</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Pantauan Transaksi Global Marketplace */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-5 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                    <h3 className="text-base font-bold text-slate-800">Pantauan Transaksi Global Marketplace</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="p-4 font-bold">ID Transaksi</th>
                                <th className="p-4 font-bold">Pembeli</th>
                                <th className="p-4 font-bold">UMKM</th>
                                <th className="p-4 font-bold">Total</th>
                                <th className="p-4 font-bold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                            <tr className="hover:bg-slate-50 transition cursor-pointer">
                                <td className="p-4 font-bold text-slate-800">#TRX-9901</td>
                                <td className="p-4">Andi Wijaya</td>
                                <td className="p-4 font-bold text-emerald-700">Toko Makmur</td>
                                <td className="p-4 font-bold">Rp 125.000</td>
                                <td className="p-4">
                                    <span className="bg-yellow-100 text-yellow-700 border border-yellow-200 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide">Dikemas</span>
                                </td>
                            </tr>
                            <tr className="hover:bg-slate-50 transition cursor-pointer">
                                <td className="p-4 font-bold text-slate-800">#TRX-9900</td>
                                <td className="p-4">Budi Santoso</td>
                                <td className="p-4 font-bold text-emerald-700">Kopi Abah Jajang</td>
                                <td className="p-4 font-bold">Rp 65.000</td>
                                <td className="p-4">
                                    <span className="bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wide">Selesai</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    );
}
