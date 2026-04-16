"use client";

import { useSmartDesa } from '@/components/GlobalProvider';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function ArsipDataMasyarakatRT() {
    const { wargaData, addWarga, updateWarga, deleteWarga } = useSmartDesa();
    const [searchTerm, setSearchTerm] = useState('');

    // Asumsikan Ketua RT yang login adalah RT 01
    const defaultRT = '01';
    const defaultRW = '01';
    const myWarga = wargaData.filter(w => w.rt === defaultRT && w.rw === defaultRW);
    const filteredWarga = myWarga.filter(w => w.nama.toLowerCase().includes(searchTerm.toLowerCase()) || w.nik.includes(searchTerm));

    const handleAdd = () => {
        Swal.fire({
            title: 'Tambah Warga Baru',
            html: `
                <input id="swal-nik" class="swal2-input" placeholder="NIK (16 Digit)" type="number">
                <input id="swal-nama" class="swal2-input" placeholder="Nama Lengkap">
                <input id="swal-hp" class="swal2-input" placeholder="No. HP Valid">
            `,
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            confirmButtonColor: '#10B981',
            cancelButtonText: 'Batal',
            preConfirm: () => {
                const nik = document.getElementById('swal-nik').value;
                const nama = document.getElementById('swal-nama').value;
                const noHp = document.getElementById('swal-hp').value;
                if (!nik || !nama) {
                    Swal.showValidationMessage('NIK dan Nama wajib diisi!');
                    return false;
                }
                return { nik, nama, noHp, rt: defaultRT, rw: defaultRW, status: 'Aktif' };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // Check duplicate NIK
                if (wargaData.some(w => w.nik === result.value.nik)) {
                    Swal.fire('Gagal!', 'Warga dengan NIK tersebut sudah terdaftar di sistem.', 'error');
                } else {
                    addWarga(result.value);
                    Swal.fire('Berhasil!', 'Data warga berhasil ditambahkan.', 'success');
                }
            }
        });
    };

    const handleEdit = (warga) => {
        Swal.fire({
            title: 'Edit Data Warga',
            html: `
                <input id="swal-nama" class="swal2-input" placeholder="Nama Lengkap" value="${warga.nama}">
                <input id="swal-hp" class="swal2-input" placeholder="No. HP" value="${warga.noHp}">
                <select id="swal-status" class="swal2-input h-14">
                    <option value="Aktif" ${warga.status === 'Aktif' ? 'selected' : ''}>Aktif</option>
                    <option value="Pindah" ${warga.status === 'Pindah' ? 'selected' : ''}>Pindah</option>
                    <option value="Meninggal" ${warga.status === 'Meninggal' ? 'selected' : ''}>Meninggal</option>
                </select>
            `,
            showCancelButton: true,
            confirmButtonText: 'Perbarui',
            confirmButtonColor: '#F59E0B',
            cancelButtonText: 'Batal',
            preConfirm: () => {
                const nama = document.getElementById('swal-nama').value;
                const noHp = document.getElementById('swal-hp').value;
                const status = document.getElementById('swal-status').value;
                if (!nama) {
                    Swal.showValidationMessage('Nama tidak boleh kosong!');
                    return false;
                }
                return { nama, noHp, status };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                updateWarga(warga.nik, result.value);
                Swal.fire('Diperbarui!', 'Data warga berhasil diupdate.', 'success');
            }
        });
    };

    const handleDelete = (warga) => {
        Swal.fire({
            title: 'Hapus Warga?',
            text: `Anda yakin ingin menghapus data ${warga.nama} dari sistem?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteWarga(warga.nik);
                Swal.fire('Terhapus!', 'Data warga telah dihapus secara permanen.', 'success');
            }
        });
    };

    return (
        <div className="space-y-6 fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Arsip Data Masyarakat</h1>
                    <p className="text-slate-500 text-sm">Kelola dan pantau data warga di wilayah RT Anda.</p>
                </div>
                <div className="relative w-full sm:w-auto flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                        <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                        <input 
                            type="text" 
                            placeholder="Cari NIK/Nama..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all text-sm"
                        />
                    </div>
                    <button onClick={handleAdd} className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-colors">
                        <i className="fas fa-plus"></i> Tambah Warga
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center text-xl"><i className="fas fa-users"></i></div>
                    <div>
                        <p className="text-[10px] uppercase font-bold text-slate-400">Total Warga</p>
                        <p className="text-xl font-extrabold text-slate-800">{myWarga.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider font-bold text-slate-500">
                            <tr>
                                <th className="p-4">NIK</th>
                                <th className="p-4">Nama Lengkap</th>
                                <th className="p-4">No. HP</th>
                                <th className="p-4">Status</th>
                                <th className="p-4 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-slate-50">
                            {filteredWarga.map((warga, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition">
                                    <td className="p-4 font-mono text-slate-600">{warga.nik}</td>
                                    <td className="p-4 font-bold text-slate-800">{warga.nama}</td>
                                    <td className="p-4 text-slate-500">{warga.noHp}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${warga.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                            {warga.status}
                                        </span>
                                    </td>
                                    <td className="p-4 flex justify-center gap-2">
                                        <button onClick={() => handleEdit(warga)} className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:text-amber-600 hover:bg-amber-50 transition flex items-center justify-center tooltip" title="Edit Data"><i className="fas fa-edit"></i></button>
                                        <button onClick={() => handleDelete(warga)} className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:text-red-600 hover:bg-red-50 transition flex items-center justify-center tooltip" title="Hapus"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                            {filteredWarga.length === 0 && (
                                <tr><td colSpan="5" className="p-8 text-center text-slate-500">Data warga tidak ditemukan.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
