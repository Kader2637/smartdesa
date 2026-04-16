"use client";

import { useSmartDesa } from '@/components/GlobalProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function DashboardRT() {
    const { currentUser, surats, signSuratRT, updateSuratStatus } = useSmartDesa();
    const router = useRouter();

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'rt') {
            router.push('/login');
        }
    }, [currentUser, router]);

    if (!currentUser) return null;

    const pendingSurats = surats.filter(s => s.status === 'menunggu_rt');

    const handleTTD = (surat) => {
        // Step 1: Show preview of Surat Pengantar RT
        Swal.fire({
            title: '📄 Pra-Tanda Tangan RT',
            html: `
                <div style="text-align:left; border:1px solid #e2e8f0; border-radius:12px; padding:16px; background:#f8fafc; margin-bottom:12px; font-family:monospace; font-size:12px; line-height:1.8;">
                    <p style="text-align:center; font-weight:bold; font-size:14px; margin:0 0 8px 0;">SURAT PENGANTAR RT</p>
                    <p style="text-align:center; font-size:11px; color:#64748b; margin-bottom:12px;">Nomor: SP-RT01/${new Date().getFullYear()}/${surat.id.replace('#','')}</p>
                    <hr style="border:none; border-top:1px solid #cbd5e1; margin:8px 0;"/>
                    <p>Yang bertanda tangan di bawah ini, Ketua RT 01 RW 01, menerangkan bahwa:</p>
                    <br/>
                    <table style="width:100%;font-size:11px;">
                        <tr><td>Nama</td><td>: <b>${surat.wargaName}</b></td></tr>
                        <tr><td>NIK</td><td>: ${surat.wargaNik}</td></tr>
                        <tr><td>Keperluan</td><td>: <b>${surat.type}</b></td></tr>
                    </table>
                    <br/>
                    <p>Adalah benar warga RT 01 RW 01 yang berdomisili di wilayah kami dan dipandang layak untuk mengajukan permohonan tersebut.</p>
                    <br/>
                    <p style="text-align:right;">Desa Maju Bersama, ${new Date().toLocaleDateString('id-ID')}</p>
                    <p style="text-align:right;">Ketua RT 01</p>
                    <br/><br/>
                    <p style="text-align:right;font-weight:bold;">(${currentUser.name})</p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: '✍️ Tanda Tangan & Teruskan ke Admin',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#10B981',
            width: '600px',
        }).then(result => {
            if (result.isConfirmed) {
                signSuratRT(surat.id);
                Swal.fire({
                    title: 'Surat Pengantar RT Ditandatangani!',
                    html: `Permohonan <b>${surat.wargaName}</b> berhasil diteruskan ke Admin/Kades untuk proses TTE.`,
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false
                });
            }
        });
    };

    const handleTolak = (id, name) => {
        Swal.fire({
            title: 'Tolak Permohonan?',
            html: `Tolak permohonan dari <b>${name}</b>? Surat akan dikembalikan ke warga.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, Tolak',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8'
        }).then(result => {
            if (result.isConfirmed) {
                updateSuratStatus(id, 'ditolak');
                Swal.fire({ title: 'Ditolak', text: 'Permohonan telah ditolak.', icon: 'error', timer: 1500, showConfirmButton: false });
            }
        });
    };

    return (
        <div className="space-y-6 fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Verifikasi & Surat Pengantar RT</h1>
                    <p className="text-slate-500 text-sm">Tinjau permohonan warga dan terbitkan Surat Pengantar RT sebelum diteruskan ke Admin.</p>
                </div>
            </div>

            {/* Penjelasan Alur */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
                <i className="fas fa-info-circle text-amber-500 mt-0.5 shrink-0"></i>
                <div className="text-sm text-amber-800">
                    <p className="font-bold mb-1">Alur Pengajuan Surat:</p>
                    <p className="text-amber-700">Warga Ajukan → <b>RT Tanda Tangan Pengantar</b> → Admin/Kades TTE → Surat Selesai</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-base font-bold text-slate-800">Menunggu Surat Pengantar RT ({pendingSurats.length})</h2>
                    <span className={`text-xs font-bold px-3 py-1.5 rounded-lg ${pendingSurats.length > 0 ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                        {pendingSurats.length > 0 ? `${pendingSurats.length} Perlu Ditindak` : 'Semua Bersih ✓'}
                    </span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100 text-sm font-bold text-slate-600">
                            <tr>
                                <th className="p-4">ID Tiket</th>
                                <th className="p-4">Nama Pemohon</th>
                                <th className="p-4">Jenis Surat</th>
                                <th className="p-4">Tanggal Masuk</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {pendingSurats.map((surat) => (
                                <tr key={surat.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                                    <td className="p-4 font-mono font-bold text-slate-600">{surat.id}</td>
                                    <td className="p-4">
                                        <p className="font-bold text-slate-900">{surat.wargaName}</p>
                                        <p className="text-[10px] uppercase font-bold text-slate-400 font-mono mt-0.5">NIK: {surat.wargaNik}</p>
                                    </td>
                                    <td className="p-4 font-bold text-slate-700">{surat.type}</td>
                                    <td className="p-4 text-slate-500">{new Date(surat.date).toLocaleDateString('id-ID')}</td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => handleTolak(surat.id, surat.wargaName)}
                                                className="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center shadow-sm"
                                                title="Tolak"
                                            >
                                                <i className="fas fa-times"></i>
                                            </button>
                                            <button 
                                                onClick={() => handleTTD(surat)}
                                                className="px-4 py-2 bg-amber-500 text-white hover:bg-amber-600 rounded-xl font-bold transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2 text-xs"
                                            >
                                                <i className="fas fa-pen-fancy"></i> TTD Pengantar RT
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {pendingSurats.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-500 font-medium">Tidak ada antrean surat saat ini.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
