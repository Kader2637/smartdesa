"use client";

import { useState } from 'react';
import Swal from 'sweetalert2';

const DUMMY_PENGADUAN = [
    { id: '#ADU-001', warga: 'Siti Aminah', masalah: 'Lampu gang RT 01 padam sejak 3 hari lalu', kategori: 'Infrastruktur', status: 'baru', waktu: '2 jam lalu' },
    { id: '#ADU-002', warga: 'Sutrisno', masalah: 'Parit samping rumah mampet dan bau', kategori: 'Kebersihan', status: 'proses', waktu: '1 hari lalu' },
    { id: '#ADU-003', warga: 'Budi Santoso', masalah: 'Ada orang asing keliling perumahan mencurigakan', kategori: 'Keamanan', status: 'selesai', waktu: '3 hari lalu' },
];

const STATUS_MAP = {
    baru: { label: 'Baru', class: 'bg-blue-100 text-blue-700 border-blue-100' },
    proses: { label: 'Diproses', class: 'bg-amber-100 text-amber-700 border-amber-100' },
    selesai: { label: 'Selesai', class: 'bg-emerald-100 text-emerald-700 border-emerald-100' },
};

export default function PengaduanRT() {
    const [pengaduan, setPengaduan] = useState(DUMMY_PENGADUAN);

    const handleProses = (id) => {
        Swal.fire({
            title: 'Proses Pengaduan?',
            text: 'Tandai pengaduan ini sebagai sedang ditangani.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Proses!',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#F59E0B'
        }).then(result => {
            if (result.isConfirmed) {
                setPengaduan(prev => prev.map(p => p.id === id ? { ...p, status: 'proses' } : p));
                Swal.fire({ title: 'Diproses!', text: 'Warga akan segera dihubungi.', icon: 'success', timer: 1500, showConfirmButton: false });
            }
        });
    };

    const handleSelesai = (id) => {
        Swal.fire({
            title: 'Selesaikan Pengaduan?',
            text: 'Tandai masalah ini sudah berhasil diselesaikan.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Selesai!',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#10B981'
        }).then(result => {
            if (result.isConfirmed) {
                setPengaduan(prev => prev.map(p => p.id === id ? { ...p, status: 'selesai' } : p));
                Swal.fire({ title: 'Diselesaikan!', text: 'Laporan warga telah ditangani.', icon: 'success', timer: 1500, showConfirmButton: false });
            }
        });
    };

    return (
        <div className="space-y-6 fade-in">
            <div>
                <h1 className="text-2xl font-bold text-slate-900 mb-1">Pengaduan Warga</h1>
                <p className="text-slate-500 text-sm">Kelola dan tindak lanjuti laporan / aduan dari warga RT Anda.</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {['baru','proses','selesai'].map(s => (
                    <div key={s} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 text-center">
                        <p className="text-2xl font-extrabold text-slate-900">{pengaduan.filter(p => p.status === s).length}</p>
                        <p className="text-xs font-bold text-slate-400 uppercase mt-1">{STATUS_MAP[s].label}</p>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="font-bold text-slate-800">Daftar Pengaduan Masuk ({pengaduan.length})</h2>
                </div>
                <div className="divide-y divide-slate-50">
                    {pengaduan.map(item => (
                        <div key={item.id} className="p-5 hover:bg-slate-50 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-sm font-bold shrink-0">
                                    <i className="fas fa-comment-dots"></i>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-mono text-xs text-slate-400">{item.id}</span>
                                        <span className={`text-[10px] font-bold uppercase border px-2 py-0.5 rounded ${STATUS_MAP[item.status].class}`}>{STATUS_MAP[item.status].label}</span>
                                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-bold">{item.kategori}</span>
                                    </div>
                                    <p className="text-sm font-bold text-slate-800">{item.masalah}</p>
                                    <p className="text-xs text-slate-400 mt-1">dari <span className="font-semibold text-slate-600">{item.warga}</span> • {item.waktu}</p>
                                </div>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                {item.status === 'baru' && (
                                    <button onClick={() => handleProses(item.id)} className="px-3 py-1.5 text-xs font-bold bg-amber-50 text-amber-600 hover:bg-amber-500 hover:text-white border border-amber-200 rounded-lg transition">
                                        <i className="fas fa-spinner mr-1"></i> Proses
                                    </button>
                                )}
                                {item.status === 'proses' && (
                                    <button onClick={() => handleSelesai(item.id)} className="px-3 py-1.5 text-xs font-bold bg-emerald-50 text-emerald-600 hover:bg-emerald-500 hover:text-white border border-emerald-200 rounded-lg transition">
                                        <i className="fas fa-check mr-1"></i> Selesaikan
                                    </button>
                                )}
                                {item.status === 'selesai' && (
                                    <span className="px-3 py-1.5 text-xs font-bold text-emerald-600 flex items-center gap-1">
                                        <i className="fas fa-check-circle"></i> Tuntas
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
