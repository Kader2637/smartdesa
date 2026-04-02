"use client";

import { useState } from 'react';

export default function LayananSuratWarga() {
    const [modalData, setModalData] = useState(null);

    const suratList = [
        { id: 1, nama: "Surat Keterangan Tidak Mampu (SKTM)", kategori: "Umum", estimasi: "1 Hari Kerja", icon: "fas fa-file-invoice-dollar" },
        { id: 2, nama: "Surat Pengantar Nikah (NA)", kategori: "Kependudukan", estimasi: "2 Hari Kerja", icon: "fas fa-ring" },
        { id: 3, nama: "Surat Pindah Domisili", kategori: "Kependudukan", estimasi: "1 Hari Kerja", icon: "fas fa-truck-moving" },
        { id: 4, nama: "Surat Keterangan Usaha (SKU)", kategori: "Perizinan", estimasi: "1 Hari Kerja", icon: "fas fa-store" },
        { id: 5, nama: "Surat Keterangan Kematian", kategori: "Kependudukan", estimasi: "1 Hari Kerja", icon: "fas fa-book-dead" },
        { id: 6, nama: "Surat Pengantar Kehilangan", kategori: "Umum", estimasi: "1 Jam (Auto)", icon: "fas fa-search" }
    ];

    return (
        <div className="space-y-8 fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Layanan Surat Menyurat</h1>
                    <p className="text-slate-500">Ajukan permohonan surat administrasi desa secara online tanpa ke kantor desa.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {suratList.map(item => (
                    <div key={item.id} onClick={() => setModalData(item)} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer group">
                        <div className="w-12 h-12 bg-slate-50 rounded-xl text-brand-600 flex items-center justify-center text-xl mb-4 group-hover:bg-brand-50 transition">
                            <i className={item.icon}></i>
                        </div>
                        <h3 className="font-bold text-slate-900 text-lg mb-2">{item.nama}</h3>
                        <div className="flex items-center justify-between mt-6">
                            <span className="text-xs font-bold text-slate-500 uppercase bg-slate-100 px-3 py-1 rounded-lg">{item.kategori}</span>
                            <span className="text-sm font-medium text-slate-500"><i className="far fa-clock mr-1"></i> {item.estimasi}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Riwayat Pengajuan */}
            <h2 className="text-xl font-bold text-slate-900 mt-12 mb-6">Riwayat Pengajuan Anda</h2>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-100 text-sm font-bold text-slate-600">
                        <tr>
                            <th className="p-4">No. Resi</th>
                            <th className="p-4">Jenis Surat</th>
                            <th className="p-4">Tanggal Pengajuan</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        <tr className="border-b border-slate-50 hover:bg-slate-50 transition">
                            <td className="p-4 font-mono font-medium text-slate-600">#SRT-8890</td>
                            <td className="p-4 font-bold text-slate-900">Surat Keterangan Tidak Mampu (SKTM)</td>
                            <td className="p-4 text-slate-500">20 Mar 2026</td>
                            <td className="p-4"><span className="px-3 py-1 text-[10px] font-bold uppercase text-blue-700 bg-blue-100 rounded-lg">Diproses RT</span></td>
                            <td className="p-4"><button className="text-brand-600 font-bold hover:underline">Detail</button></td>
                        </tr>
                        <tr className="hover:bg-slate-50 transition">
                            <td className="p-4 font-mono font-medium text-slate-600">#SRT-8854</td>
                            <td className="p-4 font-bold text-slate-900">Surat Pengantar Domisili</td>
                            <td className="p-4 text-slate-500">15 Feb 2026</td>
                            <td className="p-4"><span className="px-3 py-1 text-[10px] font-bold uppercase text-green-700 bg-green-100 rounded-lg">Selesai (Siap Unduh)</span></td>
                            <td className="p-4"><button className="text-brand-600 font-bold hover:underline">Unduh PDF</button></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {modalData && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full relative shadow-2xl">
                        <button onClick={() => setModalData(null)} className="absolute top-6 right-6 w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">X</button>
                        <i className={`${modalData.icon} text-4xl text-brand-500 mb-6 block`}></i>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{modalData.nama}</h3>
                        <p className="text-slate-500 mb-8">Pastikan Anda telah menyiapkan data diri dan dokumen pendukung sesuai persyaratan.</p>
                        <button onClick={() => { alert('Membuka Form Pengajuan...'); setModalData(null); }} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-brand-500 transition-colors shadow-lg">Lanjutkan Pengajuan</button>
                    </div>
                </div>
            )}
        </div>
    );
}
