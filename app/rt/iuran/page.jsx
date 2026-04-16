"use client";

import { useState } from 'react';
import Swal from 'sweetalert2';

const DUMMY_IURAN = [
    { id: 1, warga: 'Siti Aminah', nik: '35070002', bulan: 'April 2026', jumlah: 10000, status: 'lunas' },
    { id: 2, warga: 'Sutrisno', nik: '35070001', bulan: 'April 2026', jumlah: 10000, status: 'belum' },
    { id: 3, warga: 'Agus Pramono', nik: '35070005', bulan: 'April 2026', jumlah: 10000, status: 'lunas' },
    { id: 4, warga: 'Abdul Kader', nik: '35070004', bulan: 'April 2026', jumlah: 10000, status: 'belum' },
];

export default function IuranRT() {
    const [iuran, setIuran] = useState(DUMMY_IURAN);

    const totalLunas = iuran.filter(i => i.status === 'lunas').length;
    const totalBelum = iuran.filter(i => i.status === 'belum').length;
    const totalKas = iuran.filter(i => i.status === 'lunas').reduce((s, i) => s + i.jumlah, 0);

    const handleTagih = (item) => {
        Swal.fire({
            title: 'Kirim Tagihan?',
            html: `Kirim pengingat iuran ke <b>${item.warga}</b> untuk bulan <b>${item.bulan}</b>?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Kirim!',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#F59E0B'
        }).then(result => {
            if (result.isConfirmed)  {
                Swal.fire({ title: 'Pengingat Terkirim!', text: `Notifikasi telah dikirim ke ${item.warga}.`, icon: 'success', timer: 1500, showConfirmButton: false });
            }
        });
    };

    const handleKonfirmasiLunas = (id, nama) => {
        Swal.fire({
            title: 'Konfirmasi Pembayaran?',
            html: `Tandai iuran <b>${nama}</b> sebagai lunas?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Lunas!',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#10B981'
        }).then(result => {
            if (result.isConfirmed) {
                setIuran(prev => prev.map(i => i.id === id ? { ...i, status: 'lunas' } : i));
                Swal.fire({ title: 'Dikonfirmasi!', text: 'Status iuran diperbarui.', icon: 'success', timer: 1500, showConfirmButton: false });
            }
        });
    };

    return (
        <div className="space-y-6 fade-in">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Uang Kas / Iuran RT</h1>
                <p className="text-slate-500 text-sm">Pantau dan kelola pembayaran iuran rutin warga RT Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center text-xl">
                        <i className="fas fa-wallet"></i>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Total Kas Terkumpul</p>
                        <p className="text-xl font-extrabold text-slate-900">Rp {totalKas.toLocaleString('id-ID')}</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Sudah Bayar</p>
                        <p className="text-xl font-extrabold text-slate-900">{totalLunas} Warga</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-xl flex items-center justify-center text-xl">
                        <i className="fas fa-clock"></i>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-1">Belum Bayar</p>
                        <p className="text-xl font-extrabold text-slate-900">{totalBelum} Warga</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="font-bold text-slate-800">Rekap Iuran — April 2026</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase font-bold text-slate-500">
                            <tr>
                                <th className="p-4">Warga</th>
                                <th className="p-4">Bulan</th>
                                <th className="p-4">Jumlah</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {iuran.map(item => (
                                <tr key={item.id} className="hover:bg-slate-50 transition">
                                    <td className="p-4">
                                        <p className="font-bold text-slate-900">{item.warga}</p>
                                        <p className="text-xs text-slate-400 font-mono">{item.nik}</p>
                                    </td>
                                    <td className="p-4 text-slate-600">{item.bulan}</td>
                                    <td className="p-4 font-bold text-slate-900">Rp {item.jumlah.toLocaleString('id-ID')}</td>
                                    <td className="p-4">
                                        <span className={`text-[10px] font-bold uppercase border px-2 py-1 rounded ${item.status === 'lunas' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                            {item.status === 'lunas' ? '✓ Lunas' : '✗ Belum Bayar'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center">
                                        {item.status === 'belum' ? (
                                            <div className="flex justify-center gap-2">
                                                <button onClick={() => handleTagih(item)} className="px-3 py-1.5 text-xs font-bold bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white border border-amber-200 rounded-lg transition">
                                                    <i className="fas fa-bell mr-1"></i> Tagih
                                                </button>
                                                <button onClick={() => handleKonfirmasiLunas(item.id, item.warga)} className="px-3 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-200 rounded-lg transition">
                                                    <i className="fas fa-check mr-1"></i> Lunas
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-emerald-500 text-xs font-bold flex items-center justify-center gap-1">
                                                <i className="fas fa-check-circle"></i> Lunas
                                            </span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
