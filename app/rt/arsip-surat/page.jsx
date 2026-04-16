"use client";

import { useSmartDesa } from '@/components/GlobalProvider';

export default function ArsipSuratRT() {
    const { surats } = useSmartDesa();

    // Hanya tampilkan surat yang sudah ditandatangani RT
    const arsip = surats.filter(s => s.rtSigned === true);

    const STATUS_BADGE = {
        menunggu_kades: { label: 'Menunggu TTE Admin', class: 'bg-amber-100 text-amber-700 border-amber-100' },
        selesai:        { label: 'Selesai (TTE Lengkap)', class: 'bg-emerald-100 text-emerald-700 border-emerald-100' },
        ditolak:        { label: 'Ditolak Admin', class: 'bg-red-100 text-red-700 border-red-100' },
    };

    return (
        <div className="space-y-6 fade-in">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Arsip Surat Pengantar RT</h1>
                <p className="text-slate-500 text-sm">Riwayat seluruh surat yang telah Anda tandatangani sebagai Ketua RT.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                    <h2 className="font-bold text-slate-800">Total Ditandatangani: {arsip.length} Surat</h2>
                </div>

                {arsip.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                            <i className="fas fa-file-signature"></i>
                        </div>
                        <p className="text-slate-500 font-medium">Belum ada Surat Pengantar yang ditandatangani.</p>
                        <p className="text-xs text-slate-400 mt-1">Arsip akan muncul setelah Anda mem-verifikasi permohonan warga.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase font-bold text-slate-500">
                                <tr>
                                    <th className="p-4">ID Tiket</th>
                                    <th className="p-4">Nama Warga</th>
                                    <th className="p-4">Jenis Surat</th>
                                    <th className="p-4">TTD RT Oleh</th>
                                    <th className="p-4">Tanggal TTD RT</th>
                                    <th className="p-4">Status Lanjutan</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {arsip.map(surat => (
                                    <tr key={surat.id} className="hover:bg-slate-50 transition">
                                        <td className="p-4 font-mono font-bold text-slate-600">{surat.id}</td>
                                        <td className="p-4">
                                            <p className="font-bold text-slate-900">{surat.wargaName}</p>
                                            <p className="text-xs text-slate-400 font-mono">{surat.wargaNik}</p>
                                        </td>
                                        <td className="p-4 font-bold text-slate-700">{surat.type}</td>
                                        <td className="p-4">
                                            <span className="flex items-center gap-1.5 text-amber-600 font-bold text-xs">
                                                <i className="fas fa-pen-fancy"></i>
                                                {surat.rtSignedBy}
                                            </span>
                                        </td>
                                        <td className="p-4 text-slate-500 text-xs">
                                            {surat.rtSignedDate ? new Date(surat.rtSignedDate).toLocaleString('id-ID') : '-'}
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
