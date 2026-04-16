"use client";

import { useSmartDesa } from '@/components/GlobalProvider';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function AdminValidasiSurat() {
    const { surats, updateSuratStatus, signSuratAdmin } = useSmartDesa();

    const pendingSurats = surats.filter(s => s.status === 'menunggu_kades');

    const handleTTE = (surat) => {
        Swal.fire({
            title: '🖊️ Terapkan TTE Admin?',
            html: `
                <div style="text-align:left;border:1px solid #e2e8f0;border-radius:12px;padding:16px;background:#f8fafc;font-family:monospace;font-size:12px;line-height:1.8;">
                    <p style="text-align:center;font-weight:bold;font-size:14px;margin:0 0 8px 0;">SURAT KETERANGAN RESMI</p>
                    <p style="text-align:center;font-size:11px;color:#64748b;margin-bottom:12px;">No: ${surat.id.replace('#','SK/')}/DESA/${new Date().getFullYear()}</p>
                    <hr style="border:none;border-top:1px solid #cbd5e1;margin:8px 0;"/>
                    <table style="width:100%;font-size:11px;">
                        <tr><td>Jenis</td><td>: <b>${surat.type}</b></td></tr>
                        <tr><td>Nama</td><td>: <b>${surat.wargaName}</b></td></tr>
                        <tr><td>NIK</td><td>: ${surat.wargaNik}</td></tr>
                        <tr><td>Pengantar RT</td><td>: <b>${surat.rtSignedBy || '-'}</b></td></tr>
                    </table>
                    <br/>
                    <p style="text-align:right;font-size:11px;">Desa Maju Bersama, ${new Date().toLocaleDateString('id-ID')}</p>
                    <p style="text-align:right;font-weight:bold;margin-top:24px;">Kepala Desa / Admin</p>
                </div>
            `,
            showCancelButton: true,
            confirmButtonText: '✍️ Terapkan TTE Resmi',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#1e293b',
            width: '580px',
        }).then(result => {
            if (result.isConfirmed) {
                signSuratAdmin(surat.id);
                Swal.fire({
                    title: '✐ TTE Berhasil!',
                    text: `Tanda Tangan Elektronik resmi telah diterapkan untuk ${surat.type} milik ${surat.wargaName}.`,
                    icon: 'success',
                    confirmButtonColor: '#10B981'
                });
            }
        });
    };

    const handleTolak = (id) => {
        Swal.fire({
            title: 'Tolak Permohonan?',
            text: 'Surat akan dikembalikan dan warga perlu mengajukan ulang.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            confirmButtonText: 'Ya, Tolak',
            cancelButtonText: 'Batal'
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
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Validasi & TTE Dokumen</h1>
                    <p className="text-slate-500 text-sm">Otorisasi akhir dan Tanda Tangan Elektronik (Kepala Desa/Admin).</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h2 className="text-base font-bold text-slate-800">Menunggu TTE ({pendingSurats.length})</h2>
                    <div className="text-xs font-bold px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg"><i className="fas fa-shield-alt mr-1"></i> secured</div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100 text-sm font-bold text-slate-600">
                            <tr>
                                <th className="p-4">ID Tiket</th>
                                <th className="p-4">Pemohon</th>
                                <th className="p-4">Jenis Dokumen</th>
                                <th className="p-4 text-center">Aksi (TTE)</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {pendingSurats.map((surat) => (
                                <tr key={surat.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                                    <td className="p-4 font-mono font-bold text-slate-600">{surat.id}</td>
                                    <td className="p-4">
                                        <p className="font-bold text-slate-900">{surat.wargaName}</p>
                                        <p className="text-[10px] uppercase font-bold text-slate-400 font-mono mt-0.5">{surat.wargaNik}</p>
                                    </td>
                                    <td className="p-4 font-bold text-slate-700">{surat.type}</td>
                                    <td className="p-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => handleTolak(surat.id)}
                                                className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 hover:bg-red-500 hover:text-white transition-colors flex items-center justify-center shadow-sm"
                                                title="Tolak"
                                            >
                                                <i className="fas fa-ban"></i>
                                            </button>
                                            <button 
                                                onClick={() => handleTTE(surat)}
                                                className="px-4 py-2 bg-slate-900 text-white hover:bg-brand-500 rounded-xl font-bold transition-colors shadow-lg flex items-center gap-2"
                                            >
                                                <i className="fas fa-fingerprint"></i>
                                                Pratinjau & TTE
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {pendingSurats.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="p-8 text-center text-slate-500 font-medium">Semua dokumen warga telah ditandatangani.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
