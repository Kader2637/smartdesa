"use client";

import { useState } from 'react';

export default function LaporPage() {
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            setSuccess(true);
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 pt-40 pb-20 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Suara Warga <span className="text-brand-500">Desa</span></h1>
                    <p className="text-slate-500 text-lg max-w-2xl mx-auto">Laporkan masalah fasilitas desa, lingkungan, atau layanan administrasi. Laporan Anda akan ditindaklanjuti secara transparan.</p>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Form Section */}
                    <div className="lg:col-span-3 bg-white rounded-3xl p-8 border border-slate-200 shadow-[0_10px_40px_rgb(0,0,0,0.03)] relative overflow-hidden">
                        {success ? (
                            <div className="flex flex-col items-center justify-center p-12 h-full text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-6">
                                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2">Laporan Diterima!</h3>
                                <p className="text-slate-500 mb-8 max-w-sm">Nomor Tiket Anda: <span className="font-bold text-slate-900">#RPT-0842</span>. Anda dapat melacak statusnya kapan saja.</p>
                                <button onClick={() => setSuccess(false)} className="bg-slate-900 text-white font-bold py-3 px-8 rounded-full hover:bg-brand-500 transition-colors">Kirim Laporan Baru</button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div><label className="block text-sm font-bold text-slate-700 mb-2">Judul Laporan</label><input required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" placeholder="Misal: Jalan Berlubang di RT 03" /></div>
                                <div><label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label><select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all text-slate-700">
                                    <option value="">Pilih Kategori...</option>
                                    <option>Infrastruktur & Lingkungan</option>
                                    <option>Pelayanan Publik</option>
                                    <option>Keamanan & Ketertiban</option>
                                    <option>Saran & Masukan</option>
                                </select></div>
                                <div><label className="block text-sm font-bold text-slate-700 mb-2">Detail Kejadian</label><textarea required rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white transition-all" placeholder="Jelaskan detail masalah yang Anda temui..."></textarea></div>
                                <div><label className="block text-sm font-bold text-slate-700 mb-2">Lampiran Bukti (Opsional)</label>
                                    <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer group">
                                        <svg className="w-8 h-8 text-slate-400 mx-auto mb-3 group-hover:text-brand-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                                        <p className="text-sm text-slate-500"><span className="font-bold text-brand-500">Klik untuk upload</span> atau drag and drop<br/><span className="text-xs">PNG, JPG up to 5MB</span></p>
                                    </div>
                                </div>
                                <button type="submit" disabled={submitting} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-brand-500 transition-colors flex items-center justify-center gap-2">
                                    {submitting ? 'Memproses Laporan...' : 'Kirim Laporan Sekarang'}
                                </button>
                            </form>
                        )}
                    </div>

                    {/* Feed Info */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
                            <div className="border-b border-slate-100 pb-4 mb-4"><h3 className="font-bold text-slate-900 text-lg">Aduan Publik Terbaru</h3></div>
                            <div className="overflow-y-auto pr-2 space-y-4">
                                {/* Dummy Feeds */}
                                {[
                                    { judul: "Lampu Penerangan Mati", id: "#RPT-0841", kat: "Infrastruktur", status: "Diproses", user: "Bpk. Wawan", time: "1 jam lalu" },
                                    { judul: "Sampah Pintu Air", id: "#RPT-0840", kat: "Lingkungan", status: "Selesai", user: "Ibu Rita", time: "Kemarin" },
                                    { judul: "Antrean Pustu Lama", id: "#RPT-0839", kat: "Pelayanan", status: "Diterima", user: "Anonim", time: "2 hari lalu" }
                                ].map((item, idx) => (
                                    <div key={idx} className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="font-bold text-sm text-slate-900">{item.judul}</h4>
                                            <span className={`text-[10px] font-bold px-2 py-1 rounded w-max ${item.status === 'Selesai' ? 'bg-green-100 text-green-600' : item.status === 'Diproses' ? 'bg-orange-100 text-orange-600' : 'bg-slate-200 text-slate-600'}`}>{item.status}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 mb-3">{item.id} • {item.kat}</p>
                                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-200">
                                            <div className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-[8px] font-bold text-slate-500">{item.user.charAt(0)}</div>
                                            <span className="text-xs text-slate-600 font-medium">{item.user}</span>
                                            <span className="text-xs text-slate-400 ml-auto">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
