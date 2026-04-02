"use client";

import { useState } from 'react';

export default function LaporanKomunitasWarga() {
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        setTimeout(() => {
            alert('Laporan berhasil dikirim!');
            setSubmitting(false);
            e.target.reset();
        }, 1000);
    };

    return (
        <div className="space-y-8 fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Laporan Komunitas</h1>
                    <p className="text-slate-500">Laporkan kejadian lingkungan, infrastruktur rusak, atau gangguan keamanan.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form Buat Laporan */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-slate-50 pb-4">Buat Laporan Baru</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Judul Laporan</label>
                            <input required type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Misal: Lampu Jalan Padam di RT 02" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Kategori</label>
                            <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none">
                                <option value="">Pilih Kategori Kedaruratan</option>
                                <option>Infrastruktur Jalan/Jembatan</option>
                                <option>Kebersihan & Lingkungan</option>
                                <option>Keamanan & Ketertiban</option>
                                <option>Lainnya</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Pesan Aduan</label>
                            <textarea required rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brand-500 outline-none" placeholder="Jelaskan detail yang memadai..."></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-2">Lampiran Bukti Foto</label>
                            <input type="file" className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-brand-50 file:text-brand-600 hover:file:bg-brand-100 cursor-pointer" />
                        </div>
                        <button type="submit" disabled={submitting} className="w-full bg-brand-500 text-white font-bold py-4 rounded-xl hover:bg-brand-600 transition shadow-lg mt-4 disabled:opacity-50">
                            {submitting ? 'Mengirim...' : 'Adukan Sekarang'}
                        </button>
                    </form>
                </div>

                {/* Feed Aduan Komunitas */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 flex flex-col h-[650px] overflow-hidden">
                    <h2 className="text-lg font-bold text-slate-900 mb-4 p-2">Feed Aduan Terbaru</h2>
                    <div className="overflow-y-auto space-y-4 pr-2">
                        {[
                            { title: "Lampu Penerangan Mati", id: "#RPT-0841", kat: "Infrastruktur", status: "Diproses", sender: "Anda", time: "1 jam lalu", me: true },
                            { title: "Sampah Pintu Air Menumpuk", id: "#RPT-0840", kat: "Lingkungan", status: "Selesai", sender: "Bpk. Wawan (RT 01)", time: "Kemarin", me: false },
                            { title: "Antrean Posyandu Lama", id: "#RPT-0839", kat: "Pelayanan", status: "Diterima", sender: "Ibu Rita", time: "2 hari lalu", me: false }
                        ].map((l, i) => (
                            <div key={i} className={`bg-white p-5 rounded-2xl shadow-sm border ${l.me ? 'border-brand-200' : 'border-slate-100'}`}>
                                <div className="flex justify-between items-start mb-2">
                                    <h4 className="font-bold text-slate-900 text-sm">{l.title}</h4>
                                    <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-md ${l.status === 'Selesai' ? 'bg-green-100 text-green-700' : l.status === 'Diproses' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-600'}`}>{l.status}</span>
                                </div>
                                <p className="text-xs text-slate-500 mb-3">{l.id} • {l.kat}</p>
                                <div className="flex items-center text-xs font-medium border-t border-slate-50 pt-3 mt-3">
                                    <span className={l.me ? 'text-brand-600 font-bold' : 'text-slate-600'}>{l.sender}</span>
                                    <span className="text-slate-400 ml-auto">{l.time}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
