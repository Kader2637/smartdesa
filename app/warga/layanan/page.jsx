"use client";

import { useState } from 'react';
import { useSmartDesa } from '@/components/GlobalProvider';
import Swal from 'sweetalert2';

export default function LayananSuratWarga() {
    const { surats, addSurat, currentUser } = useSmartDesa();
    const [modalData, setModalData] = useState(null);
    const [formData, setFormData] = useState({ nik: '', nama: currentUser?.name || '', alasan: '' });

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
                            <th className="p-4">Tgl. Ajuan</th>
                            <th className="p-4 text-center">✍️ TTD RT</th>
                            <th className="p-4 text-center">🖊️ TTE Admin</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Aksi</th>
                        </tr>
                    </thead>
                    <tbody className="text-sm">
                        {surats.map((surat) => (
                            <tr key={surat.id} className="border-b border-slate-50 hover:bg-slate-50 transition">
                                <td className="p-4 font-mono font-medium text-slate-600">{surat.id}</td>
                                <td className="p-4 font-bold text-slate-900">{surat.type}</td>
                                <td className="p-4 text-slate-500 text-xs">{new Date(surat.date).toLocaleDateString('id-ID')}</td>
                                <td className="p-4 text-center">
                                    {surat.rtSigned ? (
                                        <span className="inline-flex flex-col items-center gap-0.5">
                                            <i className="fas fa-check-circle text-amber-500"></i>
                                            <span className="text-[9px] text-amber-600 font-bold">{surat.rtSignedBy}</span>
                                        </span>
                                    ) : (
                                        <i className="fas fa-minus text-slate-200"></i>
                                    )}
                                </td>
                                <td className="p-4 text-center">
                                    {surat.adminSigned ? (
                                        <span className="inline-flex flex-col items-center gap-0.5">
                                            <i className="fas fa-fingerprint text-emerald-500"></i>
                                            <span className="text-[9px] text-emerald-600 font-bold">{surat.adminSignedBy}</span>
                                        </span>
                                    ) : (
                                        <i className="fas fa-minus text-slate-200"></i>
                                    )}
                                </td>
                                <td className="p-4">
                                    {surat.status === 'menunggu_rt' && <span className="px-2 py-1 text-[10px] font-bold uppercase text-blue-700 bg-blue-100 rounded-lg">Menunggu RT</span>}
                                    {surat.status === 'menunggu_kades' && <span className="px-2 py-1 text-[10px] font-bold uppercase text-amber-700 bg-amber-100 rounded-lg">Menunggu TTE</span>}
                                    {surat.status === 'selesai' && <span className="px-2 py-1 text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 rounded-lg">✓ Selesai</span>}
                                    {surat.status === 'ditolak' && <span className="px-2 py-1 text-[10px] font-bold uppercase text-red-700 bg-red-100 rounded-lg">Ditolak</span>}
                                </td>
                                <td className="p-4">
                                    {surat.status === 'selesai' ? (
                                        <button className="text-brand-600 font-bold hover:underline flex items-center gap-1 text-xs"><i className="fas fa-download"></i> Unduh PDF</button>
                                    ) : (
                                        <span className="text-slate-300 text-xs">—</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                        {surats.length === 0 && (
                            <tr>
                                <td colSpan="7" className="p-8 text-center text-slate-500">Belum ada riwayat pengajuan surat.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {modalData && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-8 max-w-lg w-full relative shadow-2xl max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setModalData(null)} className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center font-bold text-slate-500 transition-colors">X</button>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-brand-50 text-brand-600 rounded-2xl flex items-center justify-center text-3xl">
                                <i className={modalData.icon}></i>
                            </div>
                            <div>
                                <h3 className="text-xl font-extrabold text-slate-900 leading-tight">{modalData.nama}</h3>
                                <p className="text-sm font-bold text-brand-600 uppercase tracking-wide mt-1">{modalData.kategori}</p>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 mb-6 flex gap-3">
                            <i className="fas fa-info-circle text-amber-500 mt-0.5"></i>
                            <p className="text-sm text-amber-800 font-medium">Lengkapi form berikut dengan data yang valid. Proses memakan waktu estimasi {modalData.estimasi}.</p>
                        </div>

                        <form onSubmit={(e) => {
                            e.preventDefault();
                            if (!formData.nik || !formData.nama || !formData.alasan) {
                                Swal.fire('Data Belum Lengkap', 'Harap lengkapi semua isian wajib sebelum submit.', 'warning');
                                return;
                            }
                            const id = addSurat(modalData.nama, { ...formData });
                            Swal.fire({
                                title: 'Pengajuan Berhasil!',
                                html: `ID Tiket Anda: <b>${id}</b><br/><br/>Silahkan tunggu verifikasi dari RT setempat.`,
                                icon: 'success',
                                confirmButtonText: 'Tutup'
                            });
                            setModalData(null); 
                            setFormData({ nik: '', nama: currentUser?.name || '', alasan: '' });
                        }} className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Nomor Induk Kependudukan (NIK)</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.nik}
                                    onChange={(e) => setFormData({...formData, nik: e.target.value})}
                                    placeholder="Masukkan 16 digit NIK" 
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Nama Lengkap Sesuai KTP</label>
                                <input 
                                    type="text" 
                                    required
                                    value={formData.nama}
                                    onChange={(e) => setFormData({...formData, nama: e.target.value})}
                                    placeholder="Contoh: Budi Santoso" 
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900" 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Keperluan / Keterangan</label>
                                <textarea 
                                    rows="3" 
                                    required
                                    value={formData.alasan}
                                    onChange={(e) => setFormData({...formData, alasan: e.target.value})}
                                    placeholder="Jelaskan secara singkat keperluan surat ini..." 
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-900 resize-none" 
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1.5">Unggah Foto KTP</label>
                                <div className="border border-dashed border-slate-300 bg-slate-50 p-4 rounded-xl text-center cursor-pointer hover:border-brand-400 hover:bg-brand-50 transition">
                                    <i className="fas fa-cloud-upload-alt text-2xl text-slate-400 mb-2"></i>
                                    <p className="text-sm text-slate-600 font-medium">Klik untuk unggah file <span className="font-bold text-brand-600">Jpg/Png</span></p>
                                </div>
                            </div>
                            
                            <button 
                                type="submit"
                                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-brand-500 transition-colors shadow-lg mt-6"
                            >
                                Submit Pengajuan
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
