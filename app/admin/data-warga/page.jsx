"use client";

import { useSmartDesa } from '@/components/GlobalProvider';
import { useState } from 'react';
import Swal from 'sweetalert2';

export default function AdminDataMasyarakat() {
    const { wargaData, addWarga, updateWarga, deleteWarga } = useSmartDesa();
    const [selectedRT, setSelectedRT] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    // Dapatkan daftar RT yang unik
    const daftarRT = [...new Set(wargaData.map(w => w.rt))].sort();

    const displayedWarga = selectedRT 
        ? wargaData.filter(w => w.rt === selectedRT && (w.nama.toLowerCase().includes(searchTerm.toLowerCase()) || w.nik.includes(searchTerm)))
        : [];

    const handleAdd = () => {
        Swal.fire({
            title: `Tambah Warga RT ${selectedRT}`,
            html: `
                <input id="swal-nik" class="swal2-input" placeholder="NIK (16 Digit)" type="number">
                <input id="swal-nama" class="swal2-input" placeholder="Nama Lengkap">
                <input id="swal-rw" class="swal2-input" placeholder="RW (Contoh: 01)" type="number">
                <input id="swal-hp" class="swal2-input" placeholder="No. HP Valid">
            `,
            showCancelButton: true,
            confirmButtonText: 'Simpan',
            confirmButtonColor: '#10B981',
            cancelButtonText: 'Batal',
            preConfirm: () => {
                const nik = document.getElementById('swal-nik').value;
                const nama = document.getElementById('swal-nama').value;
                const rwVal = document.getElementById('swal-rw').value;
                const noHp = document.getElementById('swal-hp').value;
                
                if (!nik || !nama || !rwVal) {
                    Swal.showValidationMessage('NIK, Nama, dan RW wajib diisi!');
                    return false;
                }
                const rw = rwVal.padStart(2, '0');
                return { nik, nama, noHp, rt: selectedRT, rw, status: 'Aktif' };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                if (wargaData.some(w => w.nik === result.value.nik)) {
                    Swal.fire('Gagal!', 'Warga dengan NIK tersebut sudah terdaftar.', 'error');
                } else {
                    addWarga(result.value);
                    Swal.fire('Berhasil!', 'Data warga berhasil ditambahkan di RT tersebut.', 'success');
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
            text: `Anda yakin ingin menghapus ${warga.nama} dari sistem? Tindakan ini tidak bisa dibatalkan.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteWarga(warga.nik);
                Swal.fire('Terhapus!', 'Data warga berhasil dihapuskan.', 'success');
            }
        });
    };

    return (
        <div className="space-y-6 fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-1">Data Masyarakat Desa</h1>
                    <p className="text-slate-500 text-sm">Pusat arsip dan pemantauan data warga per Rukun Tetangga (RT).</p>
                </div>
            </div>

            {/* List RT Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {daftarRT.map(rt => (
                    <div 
                        key={rt} 
                        onClick={() => setSelectedRT(rt)}
                        className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                            selectedRT === rt 
                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/30' 
                            : 'bg-white border-slate-200 hover:border-emerald-300 text-slate-800'
                        }`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${
                                selectedRT === rt ? 'bg-white/20 text-white' : 'bg-emerald-50 text-emerald-600'
                            }`}>
                                <i className="fas fa-sitemap"></i>
                            </span>
                            <span className={`text-xl font-bold ${selectedRT === rt ? 'text-emerald-100' : 'text-slate-400'}`}>
                                <i className="fas fa-chevron-right text-sm"></i>
                            </span>
                        </div>
                        <h3 className="font-bold text-xl">RT {rt}</h3>
                        <p className={`text-xs mt-1 font-medium ${selectedRT === rt ? 'text-emerald-100' : 'text-slate-500'}`}>
                            {wargaData.filter(w => w.rt === rt).length} Warga Terdata
                        </p>
                    </div>
                ))}
            </div>

            {/* List Warga in Selected RT */}
            {selectedRT && (
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-slate-50/50 gap-4">
                        <h2 className="text-lg font-bold text-slate-900">
                            Data Warga <span className="text-emerald-600">RT {selectedRT}</span>
                        </h2>
                        <div className="flex items-center gap-3 w-full sm:w-auto">
                            <div className="relative">
                                <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                                <input 
                                    type="text" 
                                    placeholder="Cari NIK atau Nama..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 w-full sm:w-64 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all text-sm"
                                />
                            </div>
                            <button onClick={handleAdd} className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm flex items-center justify-center gap-2 transition-colors shrink-0">
                                <i className="fas fa-plus"></i> Tambah Warga
                            </button>
                        </div>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider font-bold text-slate-500">
                                <tr>
                                    <th className="p-4">NIK</th>
                                    <th className="p-4">Nama Lengkap</th>
                                    <th className="p-4">Alamat (RW)</th>
                                    <th className="p-4">No. HP</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-center">Aksi</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm divide-y divide-slate-50">
                                {displayedWarga.map((warga, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50 transition">
                                        <td className="p-4 font-mono text-slate-600">{warga.nik}</td>
                                        <td className="p-4 font-bold text-slate-800">{warga.nama}</td>
                                        <td className="p-4 text-slate-500">RW {warga.rw}</td>
                                        <td className="p-4 text-slate-500">{warga.noHp}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase border ${warga.status === 'Aktif' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                                {warga.status}
                                            </span>
                                        </td>
                                        <td className="p-4 flex justify-center gap-2">
                                            <button onClick={() => handleEdit(warga)} className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition flex items-center justify-center tooltip" title="Edit Data"><i className="fas fa-edit"></i></button>
                                            <button onClick={() => handleDelete(warga)} className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 hover:text-red-600 hover:bg-red-50 transition flex items-center justify-center tooltip" title="Hapus Data"><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                                {displayedWarga.length === 0 && (
                                    <tr><td colSpan="6" className="p-8 text-center text-slate-500">Data warga tidak ditemukan.</td></tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
            
            {!selectedRT && (
                <div className="border border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center text-2xl mb-4">
                        <i className="fas fa-hand-pointer"></i>
                    </div>
                    <p className="text-slate-500 font-medium">Pilih Rukun Tetangga (RT) di atas untuk melihat detail data warganya.</p>
                </div>
            )}
        </div>
    );
}
