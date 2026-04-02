"use client";

import { useState } from 'react';

export default function ProfilTokoSellerPage() {
    const [saved, setSaved] = useState(false);
    const [isStoreOpen, setIsStoreOpen] = useState(true);
    const [storeName, setStoreName] = useState('Toko Desa Makmur');

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="space-y-6 fade-in min-h-[80vh]">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex flex-col">
                    <h1 className="font-bold text-slate-800 text-2xl leading-tight hidden md:block">Pengaturan Toko Anda</h1>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="w-full max-w-3xl pb-12">
                    
                    {saved && (
                        <div className="mb-6 bg-emerald-100 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-xl flex items-center gap-3 font-medium animate-in fade-in slide-in-from-top-4">
                            <i className="fas fa-check-circle text-xl"></i> Perubahan profil toko berhasil disimpan ke dalam sistem!
                        </div>
                    )}

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-sm">
                        
                        <div className="p-8 border-b border-slate-100 text-center relative pointer-events-none">
                            <div className={`absolute top-0 left-0 w-full h-24 transition duration-500 ${isStoreOpen ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : 'bg-slate-300'}`}></div>
                            
                            <div className={`relative w-32 h-32 mx-auto rounded-full bg-white border-4 border-white shadow-xl flex items-center justify-center overflow-hidden mb-4 mt-8 pointer-events-auto cursor-pointer group ${!isStoreOpen ? 'opacity-60 grayscale' : ''}`}>
                                <img src={`https://ui-avatars.com/api/?name=${encodeURI(storeName)}&background=10B981&color=fff&size=512`} alt={storeName} className="w-full h-full object-cover group-hover:opacity-50 transition" />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                                    <i className="fas fa-camera text-slate-800 text-2xl"></i>
                                </div>
                            </div>
                            <h2 className="text-2xl font-extrabold text-slate-800 relative z-10">{storeName}</h2>
                            <p className="text-slate-500 mb-2 relative z-10">Terdaftar sejak Jan 2026</p>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Nama Toko</label>
                                    <input 
                                        type="text" 
                                        value={storeName}
                                        onChange={(e) => setStoreName(e.target.value)}
                                        className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Kategori Utama</label>
                                    <select className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition bg-white">
                                        <option>Pertanian & Hasil Bumi</option>
                                        <option>Kerajinan Tangan</option>
                                        <option>Kuliner Lokal</option>
                                        <option>Konveksi & Pakaian</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Deskripsi Toko (Slogan)</label>
                                <textarea 
                                    rows="3" 
                                    className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                                    defaultValue="Menjual hasil pertanian terbaik langsung dari petani di Desa. Murah, Segar, dan dipanen setiap paginya secara mandiri."
                                ></textarea>
                            </div>

                            <div className="border-t border-slate-100 pt-6"></div>

                            <h4 className="font-bold text-lg text-slate-800 mb-4 flex items-center gap-2"><i className="fas fa-clock text-emerald-500"></i> Jam Operasional Toko</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Jam Buka Pagi</label>
                                    <input type="time" defaultValue="08:00" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Jam Tutup Sore</label>
                                    <input type="time" defaultValue="17:00" className="w-full border border-slate-200 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white" />
                                </div>
                            </div>

                            <div className={`flex items-center gap-3 mt-4 border border-slate-100 p-4 rounded-xl cursor-pointer transition ${isStoreOpen ? 'bg-emerald-50/50' : 'bg-slate-50'}`} onClick={() => setIsStoreOpen(!isStoreOpen)}>
                                <button className={`w-12 h-6 rounded-full relative transition focus:outline-none ${isStoreOpen ? 'bg-emerald-500' : 'bg-slate-300'}`}>
                                    <span className={`absolute top-1 left-0 w-4 h-4 bg-white rounded-full transition transform shadow-sm ${isStoreOpen ? 'translate-x-6' : 'translate-x-1'}`}></span>
                                </button>
                                <div>
                                    <span className="font-bold text-slate-700 text-sm block">{isStoreOpen ? 'Toko Sedang Buka' : 'Toko Sedang Tutup'}</span>
                                    <span className="text-xs text-slate-500">{isStoreOpen ? 'Menerima pesanan masuk dan nampak oleh warga' : 'Tidak kelihatan di beranda warga'}</span>
                                </div>
                            </div>

                        </div>
                        
                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
                            <button className="px-5 py-2.5 font-bold text-slate-600 hover:text-slate-800 bg-slate-200 rounded-xl transition">Batalkan</button>
                            <button onClick={handleSave} className="px-6 py-2.5 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition">Kunci Perubahan</button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
