"use client";

import { useSmartDesa } from '@/components/GlobalProvider';

export default function AdminArsipSurat() {
    const { surats } = useSmartDesa();

    const arsip = surats.filter(s => s.adminSigned === true && s.status === 'selesai');

    const allHistory = surats.filter(s => s.status !== 'menunggu_rt');

    const STATUS_BADGE = {
        menunggu_kades: { label: 'Menunggu TTE Admin', class: 'bg-amber-100 text-amber-700 border-amber-100' },
        selesai:        { label: 'Selesai', class: 'bg-emerald-100 text-emerald-700 border-emerald-100' },
        ditolak:        { label: 'Ditolak', class: 'bg-red-100 text-red-700 border-red-100' },
        menunggu_rt:    { label: 'Menunggu RT', class: 'bg-slate-100 text-slate-600 border-slate-100' },
    };

    return (
        <div className="space-y-6 fade-in">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Arsip Surat & Riwayat TTE</h1>
                <p className="text-slate-500 text-sm">Riwayat seluruh surat yang telah diproses dan ditandatangani secara elektronik oleh Admin/Kades.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl"><i className="fas fa-check-double"></i></div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Surat TTE Selesai</p>
                        <p className="text-2xl font-extrabold text-slate-900">{arsip.length}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center text-xl"><i className="fas fa-hourglass-half"></i></div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Menunggu TTE</p>
                        <p className="text-2xl font-extrabold text-slate-900">{surats.filter(s => s.status === 'menunggu_kades').length}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-xl"><i className="fas fa-times-circle"></i></div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Ditolak</p>
                        <p className="text-2xl font-extrabold text-slate-900">{surats.filter(s => s.status === 'ditolak').length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="font-bold text-slate-800">Semua Riwayat Surat ({allHistory.length})</h2>
                </div>
                {allHistory.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                            <i className="fas fa-file-alt"></i>
                        </div>
                        <p className="text-slate-500 font-medium">Belum ada riwayat surat.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase font-bold text-slate-500">
                                <tr>
                                    <th className="p-4">ID Tiket</th>
                                    <th className="p-4">Nama Warga</th>
                                    <th className="p-4">Jenis Surat</th>
                                    <th className="p-4">TTD RT</th>
                                    <th className="p-4">TTE Admin</th>
                                    <th className="p-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {allHistory.map(surat => (
                                    <tr key={surat.id} className="hover:bg-slate-50 transition">
                                        <td className="p-4 font-mono font-bold text-slate-600">{surat.id}</td>
                                        <td className="p-4">
                                            <p className="font-bold text-slate-900">{surat.wargaName}</p>
                                            <p className="text-xs text-slate-400 font-mono">{surat.wargaNik}</p>
                                        </td>
                                        <td className="p-4 font-bold text-slate-700">{surat.type}</td>
                                        <td className="p-4">
                                            {surat.rtSigned ? (
                                                <span className="text-amber-600 font-bold text-xs flex items-center gap-1">
                                                    <i className="fas fa-pen-fancy"></i> {surat.rtSignedBy}
                                                </span>
                                            ) : (
                                                <span className="text-slate-300 text-xs">—</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {surat.adminSigned ? (
                                                <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                                                    <i className="fas fa-fingerprint"></i> {surat.adminSignedBy}
                                                </span>
                                            ) : (
                                                <span className="text-slate-300 text-xs">—</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {STATUS_BADGE[surat.status] ? (
                                                <span className={`text-[10px] font-bold uppercase border px-2 py-1 rounded ${STATUS_BADGE[surat.status].class}`}>
                                                    {STATUS_BADGE[surat.status].label}
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 text-xs">—</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
