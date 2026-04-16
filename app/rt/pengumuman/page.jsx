"use client";

import { useState } from 'react';
import Swal from 'sweetalert2';

const DUMMY_PENGUMUMAN = [
    { id: 1, judul: 'Jadwal Kerja Bakti Bersih Lingkungan', isi: 'Warga RT 01 dihimbau untuk mengikuti kerja bakti bersih lingkungan pada hari Minggu, 20 April 2026 pukul 07.00 WIB. Harap membawa peralatan masing-masing.', kategori: 'Kegiatan', penting: true, tanggal: '2026-04-16' },
    { id: 2, judul: 'Pemberitahuan Pemadaman Listrik PLN', isi: 'PLN akan melakukan pemeliharaan jaringan listrik pada tanggal 19 April 2026 pukul 08.00 - 16.00 WIB. Mohon persiapkan kebutuhan listrik cadangan.', kategori: 'Informasi', penting: false, tanggal: '2026-04-15' },
    { id: 3, judul: 'Pengumpulan Iuran Keamanan Bulan April', isi: 'Kepada seluruh warga, harap segera melunasi iuran keamanan bulan April 2026 sebesar Rp 10.000. Pembayaran dapat dilakukan kepada Ketua RT.', kategori: 'Keuangan', penting: true, tanggal: '2026-04-14' },
];

const KATEGORI_MAP = {
    Kegiatan: 'bg-blue-100 text-blue-700',
    Informasi: 'bg-slate-100 text-slate-600',
    Keuangan:  'bg-emerald-100 text-emerald-700',
    Darurat:   'bg-red-100 text-red-700',
};

export default function PengumumanRT() {
    const [pengumuman, setPengumuman] = useState(DUMMY_PENGUMUMAN);

    const handleTambah = () => {
        Swal.fire({
            title: 'Buat Pengumuman Baru',
            html: `
                <input id="swal-judul" class="swal2-input" placeholder="Judul Pengumuman">
                <select id="swal-kat" class="swal2-input h-14">
                    <option value="Informasi">Informasi</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Keuangan">Keuangan</option>
                    <option value="Darurat">Darurat / Mendesak</option>
                </select>
                <textarea id="swal-isi" class="swal2-textarea" placeholder="Isi pengumuman lengkap..."></textarea>
            `,
            showCancelButton: true,
            confirmButtonText: 'Publikasikan',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#F59E0B',
            preConfirm: () => {
                const judul = document.getElementById('swal-judul').value;
                const isi = document.getElementById('swal-isi').value;
                const kategori = document.getElementById('swal-kat').value;
                if (!judul || !isi) {
                    Swal.showValidationMessage('Judul dan isi tidak boleh kosong!');
                    return false;
                }
                return { judul, isi, kategori };
            }
        }).then(result => {
            if (result.isConfirmed) {
                const now = new Date().toISOString().split('T')[0];
                setPengumuman(prev => [
                    { id: Date.now(), ...result.value, penting: result.value.kategori === 'Darurat', tanggal: now },
                    ...prev
                ]);
                Swal.fire({ title: 'Dipublikasikan!', text: 'Pengumuman berhasil dikirim ke warga.', icon: 'success', timer: 1500, showConfirmButton: false });
            }
        });
    };

    const handleHapus = (id, judul) => {
        Swal.fire({
            title: 'Hapus Pengumuman?',
            text: `"${judul}" akan dihapus secara permanen.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then(result => {
            if (result.isConfirmed) {
                setPengumuman(prev => prev.filter(p => p.id !== id));
                Swal.fire({ title: 'Dihapus!', icon: 'success', timer: 1200, showConfirmButton: false });
            }
        });
    };

    return (
        <div className="space-y-6 fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Pengumuman RT</h1>
                    <p className="text-slate-500 text-sm">Buat dan kelola informasi atau pengumuman resmi untuk warga RT Anda.</p>
                </div>
                <button onClick={handleTambah} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-amber-500/20 flex items-center gap-2 transition">
                    <i className="fas fa-plus"></i> Buat Pengumuman
                </button>
            </div>

            <div className="space-y-4">
                {pengumuman.map(item => (
                    <div key={item.id} className={`bg-white rounded-2xl border shadow-sm p-5 relative ${item.penting ? 'border-amber-200' : 'border-slate-100'}`}>
                        {item.penting && (
                            <span className="absolute top-4 right-16 text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-1 rounded-lg border border-amber-200">
                                <i className="fas fa-bell mr-1"></i> Penting
                            </span>
                        )}
                        <button
                            onClick={() => handleHapus(item.id, item.judul)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-lg bg-slate-50 hover:bg-red-50 hover:text-red-500 text-slate-400 flex items-center justify-center transition"
                        >
                            <i className="fas fa-trash text-xs"></i>
                        </button>

                        <div className="flex items-start gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm shrink-0 ${item.kategori === 'Darurat' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                                <i className={item.kategori === 'Kegiatan' ? 'fas fa-calendar' : item.kategori === 'Keuangan' ? 'fas fa-wallet' : item.kategori === 'Darurat' ? 'fas fa-exclamation-triangle' : 'fas fa-bell'}></i>
                            </div>
                            <div className="flex-1 pr-20">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${KATEGORI_MAP[item.kategori] || 'bg-slate-100 text-slate-600'}`}>{item.kategori}</span>
                                    <span className="text-xs text-slate-400">{new Date(item.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mb-2">{item.judul}</h3>
                                <p className="text-sm text-slate-500 leading-relaxed">{item.isi}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {pengumuman.length === 0 && (
                    <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center">
                        <div className="w-14 h-14 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                            <i className="fas fa-bullhorn"></i>
                        </div>
                        <p className="text-slate-500 font-medium">Belum ada pengumuman. Buat yang pertama!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
