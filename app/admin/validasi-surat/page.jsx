"use client";

import { useState } from 'react';

export default function ValidasiSuratPage() {
    const [activeTab, setActiveTab] = useState('pending');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showPublishModal, setShowPublishModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    
    const [selectedSurat, setSelectedSurat] = useState(null);
    const [rejectReason, setRejectReason] = useState('');
    const [nomorSurat, setNomorSurat] = useState('');
    const [isSigned, setIsSigned] = useState(false);
    
    const currentDate = '31 Maret 2026';

    const [suratList, setSuratList] = useState([
        { id: 1, type: 'Surat Keterangan Tidak Mampu (SKTM)', name: 'Joko Anwar', nik: '3573012345670001', date: '31 Mar 2026, 09:15', status: 'pending', icon: 'fa-hand-holding-heart', address: 'Jl. Merdeka Gg. 4 No. 12, RT 02 / RW 01', purpose: 'Persyaratan pengajuan keringanan biaya rawat inap rumah sakit.' },
        { id: 2, type: 'Surat Pengantar Nikah', name: 'Siti Aminah', nik: '3573012345670002', date: '31 Mar 2026, 10:30', status: 'pending', icon: 'fa-ring', address: 'Perumahan Desa Asri Blok C-4, RT 05 / RW 02', purpose: 'Pengurusan administrasi pernikahan di KUA Kecamatan Singosari.' },
        { id: 3, type: 'Surat Keterangan Domisili', name: 'Agus Supriyadi', nik: '3573012345670004', date: '29 Mar 2026, 11:00', status: 'approved', icon: 'fa-map-marked-alt', address: 'Jl. Raya Desa No. 45, RT 03 / RW 01', purpose: 'Persyaratan melamar pekerjaan di luar kota.' },
    ]);

    const filteredSurat = suratList.filter(s => s.status === activeTab);

    const openDetail = (surat) => {
        setSelectedSurat(surat);
        setShowDetailModal(true);
    };

    const openPublishModal = (surat) => {
        setSelectedSurat(surat);
        setIsSigned(false);
        const randomNum = Math.floor(Math.random() * 900) + 100;
        setNomorSurat(`140/${randomNum}/35.07.24/2026`);
        setShowPublishModal(true);
    };

    const publishSurat = () => {
        if (!isSigned) {
            alert("Gagal menerbitkan! Anda belum membubuhkan Tanda Tangan Elektronik.");
            return;
        }
        if (nomorSurat === '') {
            alert("Nomor surat tidak boleh kosong!");
            return;
        }

        setSuratList(suratList.map(s => s.id === selectedSurat.id ? { ...s, status: 'approved' } : s));
        setShowPublishModal(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3500);
    };

    const confirmReject = () => {
        if(rejectReason.trim() === '') {
            alert("Alasan tidak boleh kosong!");
            return;
        }
        setSuratList(suratList.map(s => s.id === selectedSurat.id ? { ...s, status: 'rejected', reason: rejectReason } : s));
        setShowRejectModal(false);
    };

    return (
        <div className="space-y-6 fade-in min-h-[80vh]">
            <style jsx>{`
                .font-serif-surat { font-family: 'Times New Roman', Times, serif; }
                .ttd-stamp { animation: stampIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
                @keyframes stampIn {
                    0% { transform: scale(2) rotate(-15deg); opacity: 0; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
            `}</style>
            
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Penerbitan Surat Administrasi</h2>
                    <p className="text-slate-500 text-sm mt-1">Periksa berkas warga, *generate* surat otomatis, dan bubuhkan TTE.</p>
                </div>
            </div>

            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-2 mb-6">
                <button 
                    onClick={() => setActiveTab('pending')}
                    className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${activeTab === 'pending' ? 'bg-blue-100 text-blue-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <i className="fas fa-inbox"></i> Antrean
                    <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">{suratList.filter(s => s.status === 'pending').length}</span>
                </button>
                <button 
                    onClick={() => setActiveTab('approved')}
                    className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${activeTab === 'approved' ? 'bg-emerald-100 text-emerald-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <i className="fas fa-paper-plane"></i> Surat Terbit
                </button>
                <button 
                    onClick={() => setActiveTab('rejected')}
                    className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${activeTab === 'rejected' ? 'bg-red-100 text-red-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <i className="fas fa-times-circle"></i> Berkas Ditolak
                </button>
            </div>

            <div className="space-y-4">
                {filteredSurat.map((surat) => (
                    <div key={surat.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 sm:p-5 flex flex-col md:flex-row gap-4 sm:gap-5 items-start md:items-center transition hover:shadow-md">
                        <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shrink-0 ${
                            surat.status === 'pending' ? 'bg-blue-50 text-blue-500' : 
                            surat.status === 'approved' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'
                        }`}>
                            <i className={`fas text-xl sm:text-2xl ${surat.icon}`}></i>
                        </div>

                        <div className="flex-1 w-full">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                <h3 className="text-sm sm:text-base font-bold text-slate-800">{surat.type}</h3>
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500 flex items-center">
                                    <i className="far fa-clock mr-1"></i> {surat.date}
                                </span>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-1 text-xs sm:text-sm text-slate-600 mt-2">
                                <p><i className="far fa-user w-4 text-slate-400"></i> <strong className="text-slate-700">{surat.name}</strong></p>
                                <p><i className="far fa-id-card w-4 text-slate-400"></i> NIK: <span>{surat.nik}</span></p>
                                <p className="md:col-span-2 truncate"><i className="fas fa-map-marker-alt w-4 text-slate-400"></i> <span>{surat.address}</span></p>
                            </div>

                            {surat.status === 'rejected' && (
                                <div className="mt-3 p-2.5 bg-red-50 border border-red-100 rounded-lg text-xs text-red-700">
                                    <strong><i className="fas fa-exclamation-triangle mr-1"></i> Alasan Penolakan:</strong> <span>{surat.reason}</span>
                                </div>
                            )}
                            {surat.status === 'approved' && (
                                <div className="mt-3 p-2.5 bg-emerald-50 border border-emerald-100 rounded-lg text-xs text-emerald-700 flex items-center font-medium">
                                    <i className="fas fa-check-circle mr-2 text-emerald-500 text-base"></i> Surat elektronik telah diterbitkan ke akun warga.
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto mt-4 md:mt-0">
                            <button onClick={() => openDetail(surat)} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition whitespace-nowrap text-center">
                                <i className="fas fa-folder-open mr-1"></i> Cek Berkas
                            </button>

                            {surat.status === 'pending' && (
                                <button onClick={() => openPublishModal(surat)} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 transition flex justify-center items-center gap-2 whitespace-nowrap shadow-sm shadow-blue-500/30 w-full sm:w-auto">
                                    <i className="fas fa-pen-nib"></i> Proses Surat
                                </button>
                            )}
                            {surat.status === 'approved' && (
                                <button className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-50 transition flex justify-center items-center gap-2 whitespace-nowrap w-full sm:w-auto">
                                    <i className="fas fa-download"></i> Unduh Arsip
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {filteredSurat.length === 0 && (
                    <div className="bg-white rounded-xl border border-slate-200 border-dashed p-10 text-center animate-in fade-in zoom-in-95">
                        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                            <i className={activeTab === 'pending' ? "fas fa-check" : "fas fa-inbox"}></i>
                        </div>
                        <h3 className="text-base font-bold text-slate-800">Bersih!</h3>
                        <p className="text-sm text-slate-500 mt-1">Tidak ada pengajuan surat di kategori ini.</p>
                    </div>
                )}
            </div>

            {/* Modal Detail Berkas */}
            {showDetailModal && selectedSurat && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" onClick={() => setShowDetailModal(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Detail Pengajuan Berkas</h3>
                                <p className="text-sm text-slate-500 font-medium">{selectedSurat.type}</p>
                            </div>
                            <button onClick={() => setShowDetailModal(false)} className="text-slate-400 hover:text-slate-700 bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider text-emerald-600">Data Pemohon</h4>
                                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-5 text-sm">
                                    <div>
                                        <p className="text-slate-500 text-xs mb-1">Nama Lengkap</p>
                                        <p className="font-bold text-slate-800">{selectedSurat.name}</p>
                                    </div>
                                    <div>
                                        <p className="text-slate-500 text-xs mb-1">NIK</p>
                                        <p className="font-bold text-slate-800">{selectedSurat.nik}</p>
                                    </div>
                                    <div className="sm:col-span-2">
                                        <p className="text-slate-500 text-xs mb-1">Alamat</p>
                                        <p className="font-bold text-slate-800">{selectedSurat.address}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="text-xs font-bold text-slate-800 mb-3 uppercase tracking-wider text-emerald-600">Lampiran Bukti</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="border border-slate-200 rounded-xl p-3 bg-white hover:border-slate-300 transition cursor-pointer group">
                                        <p className="text-xs font-bold text-slate-500 text-center mb-3">Foto KTP / KK</p>
                                        <div className="relative overflow-hidden rounded-lg">
                                            <img src="https://images.unsplash.com/photo-1633265486064-086b219458ce?w=400&q=80" className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500" alt="KTP" />
                                        </div>
                                    </div>
                                    <div className="border border-slate-200 rounded-xl p-3 flex flex-col items-center justify-center bg-slate-50 hover:bg-slate-100 transition cursor-pointer min-h-[160px]">
                                        <i className="fas fa-file-pdf text-4xl text-red-500 mb-3 drop-shadow-sm"></i>
                                        <p className="text-sm font-bold text-slate-700">Pengantar_RT.pdf</p>
                                        <span className="text-xs text-slate-500 mt-1">245 KB</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {selectedSurat.status === 'pending' && (
                            <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row justify-end gap-3">
                                <button 
                                    onClick={() => { setShowDetailModal(false); setShowRejectModal(true); }}
                                    className="w-full sm:w-auto bg-white border border-red-200 text-red-600 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-red-50 text-center transition"
                                >
                                    Tolak Berkas Keliru
                                </button>
                                <button 
                                    onClick={() => { setShowDetailModal(false); openPublishModal(selectedSurat); }}
                                    className="w-full sm:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/30 hover:bg-blue-700 text-center transition"
                                >
                                    Berkas Valid &rarr; Proses TTD
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Modal Penerbitan Surat (TTD) */}
            {showPublishModal && selectedSurat && (
                <div className="fixed inset-0 z-[60] flex items-start justify-center p-2 sm:p-4 overflow-y-auto custom-scrollbar">
                    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-md transition-opacity" onClick={() => setShowPublishModal(false)}></div>
                    <div className="relative text-left transition-all w-full max-w-4xl my-4 sm:my-8 flex flex-col gap-4 z-10 animate-in slide-in-from-bottom-8 duration-300">
                        <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b-4 border-blue-600 sticky top-4 z-20">
                            <div>
                                <h3 className="text-xl font-bold text-slate-800">Penerbitan Surat Otomatis</h3>
                                <p className="text-sm text-slate-500 mt-1">Lengkapi nomor surat dan bubuhkan Tanda Tangan Elektronik.</p>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                                <label className="text-sm font-bold text-slate-700 whitespace-nowrap">No. Surat:</label>
                                <input 
                                    type="text" 
                                    value={nomorSurat}
                                    onChange={(e) => setNomorSurat(e.target.value)}
                                    className="border border-slate-300 rounded-lg px-4 py-2.5 text-sm w-full sm:w-56 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none bg-yellow-50 font-mono font-bold"
                                    placeholder="140/xxx/35.07/2026"
                                />
                            </div>
                        </div>

                        {/* Kertas Surat Mockup */}
                        <div className="bg-white rounded-lg shadow-2xl mx-auto w-full p-8 sm:p-12 md:p-16 font-serif-surat text-black min-h-[800px]">
                            
                            <div className="border-b-[5px] border-double border-black pb-4 sm:pb-6 mb-6 sm:mb-8 text-center flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Lambang_Kabupaten_Malang.png/410px-Lambang_Kabupaten_Malang.png" alt="Logo" className="w-20 sm:w-24 drop-shadow-md" />
                                <div>
                                    <h2 className="font-bold text-xl sm:text-2xl uppercase tracking-wider">Pemerintah Kabupaten Malang</h2>
                                    <h2 className="font-bold text-xl sm:text-2xl uppercase tracking-wider mt-1">Kecamatan Singosari</h2>
                                    <h1 className="font-bold text-2xl sm:text-3xl uppercase tracking-widest mt-1">Desa Tunjungtirto</h1>
                                    <p className="text-sm sm:text-base mt-2">Jl. Raya Tunjungtirto No. 01, Kodepos 65153, Email: pemdes@tunjungtirto.desa.id</p>
                                </div>
                            </div>

                            <div className="text-center mb-8 sm:mb-10">
                                <h3 className="font-bold text-xl sm:text-2xl uppercase underline">{selectedSurat.type.split(' (')[0]}</h3>
                                <p className="text-base sm:text-lg mt-2">Nomor: <span>{nomorSurat || '...........................'}</span></p>
                            </div>

                            <div className="text-justify leading-relaxed space-y-4 sm:space-y-6 mb-10 sm:mb-14 text-base sm:text-lg">
                                <p className="indent-8">
                                    Yang bertanda tangan di bawah ini, Kepala Desa Tunjungtirto, Kecamatan Singosari, Kabupaten Malang, menerangkan dengan sebenarnya bahwa:
                                </p>

                                <div className="ml-0 sm:ml-12 mb-6 overflow-x-auto">
                                    <table className="w-full max-w-2xl text-left">
                                        <tbody>
                                            <tr><td className="w-32 sm:w-48 pb-3 align-top font-bold">Nama</td><td className="w-4 pb-3 align-top">:</td><td className="font-bold pb-3 uppercase align-top">{selectedSurat.name}</td></tr>
                                            <tr><td className="pb-3 align-top font-bold">NIK</td><td className="w-4 pb-3 align-top">:</td><td className="pb-3 align-top">{selectedSurat.nik}</td></tr>
                                            <tr><td className="pb-3 align-top font-bold">Pekerjaan</td><td className="w-4 pb-3 align-top">:</td><td className="pb-3 align-top">Wiraswasta / Swasta</td></tr>
                                            <tr><td className="pb-3 align-top font-bold">Alamat domisili</td><td className="w-4 pb-3 align-top">:</td><td className="pb-3 align-top">{selectedSurat.address}</td></tr>
                                        </tbody>
                                    </table>
                                </div>

                                <p className="indent-8">
                                    Orang tersebut di atas adalah benar-benar warga Desa Tunjungtirto yang terdaftar dan berdomisili pada alamat tersebut. Surat keterangan ini dibuat berdasarkan pengajuan yang bersangkutan untuk keperluan:
                                </p>
                                <p className="font-bold italic text-center text-lg my-6 px-4 py-2 border-y border-dashed border-slate-300">
                                    "{selectedSurat.purpose}"
                                </p>
                                <p className="indent-8">
                                    Demikian surat keterangan ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya oleh pihak yang berkepentingan.
                                </p>
                            </div>

                            <div className="flex justify-center sm:justify-end mt-12 sm:mt-16 text-base sm:text-lg">
                                <div className="text-center w-full sm:w-72 relative">
                                    <p>Tunjungtirto, <span>{currentDate}</span></p>
                                    <p className="font-bold mb-6 mt-1">Kepala Desa</p>

                                    {!isSigned ? (
                                        <div 
                                            onClick={() => setIsSigned(true)}
                                            className="h-28 sm:h-32 relative flex flex-col items-center justify-center border-2 border-dashed border-blue-300 bg-blue-50/50 cursor-pointer rounded-xl hover:bg-blue-50 transition group mx-auto w-56 sm:w-full"
                                        >
                                            <i className="fas fa-fingerprint mb-2 text-3xl text-blue-400 group-hover:text-blue-600 transition"></i>
                                            <p className="text-sm font-bold text-blue-600 font-sans">Tap Untuk TTD</p>
                                        </div>
                                    ) : (
                                        <div className="h-28 sm:h-32 relative flex items-center justify-center ttd-stamp mx-auto w-56 sm:w-full select-none pointer-events-none">
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" className="w-16 h-16 sm:w-20 sm:h-20 absolute left-0 opacity-80 mix-blend-multiply" alt="QR TTE" />
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Signature_of_John_Hancock.svg" className="w-32 sm:w-40 h-auto opacity-90 relative z-10" alt="TTD Kades" />
                                            <div className="absolute w-24 h-24 sm:w-28 sm:h-28 border-4 border-blue-800 rounded-full right-0 top-0 opacity-30 rotate-12 flex items-center justify-center pointer-events-none mix-blend-multiply">
                                                <p className="text-[8px] sm:text-[10px] font-sans text-blue-800 font-bold text-center leading-tight">PEMERINTAH DESA<br/>TUNJUNGTIRTO</p>
                                            </div>
                                        </div>
                                    )}

                                    <p className="font-bold mt-4 underline decoration-2 underline-offset-4">Ir. BAMBANG SETIAWAN, M.Si</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4 mb-10 sm:mb-4 px-2 sm:px-0">
                            <button onClick={() => setShowPublishModal(false)} className="w-full sm:w-auto bg-slate-800 text-white px-6 py-3.5 rounded-xl font-bold hover:bg-slate-700 shadow-xl order-2 sm:order-1 text-center transition">Batal Proses</button>
                            <button 
                                onClick={publishSurat}
                                className={`w-full sm:w-auto text-white px-8 py-3.5 rounded-xl font-bold shadow-xl transition flex items-center justify-center gap-3 order-1 sm:order-2 ${isSigned && nomorSurat !== '' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30' : 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'}`}
                            >
                                <i className="fas fa-paper-plane text-xl"></i> Terbitkan & Kirim ke Warga
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Penolakan */}
            {showRejectModal && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" onClick={() => setShowRejectModal(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-start mb-5">
                            <h3 className="text-lg font-bold text-red-600 flex items-center gap-2">
                                <i className="fas fa-undo-alt"></i> Kembalikan Berkas
                            </h3>
                            <button onClick={() => setShowRejectModal(false)} className="text-slate-400 hover:text-slate-700"><i className="fas fa-times text-xl"></i></button>
                        </div>
                        <p className="text-sm text-slate-600 mb-4">Beritahu warga bagian mana dari berkasnya yang kurang atau salah agar dapat diperbaiki.</p>
                        <textarea 
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            rows="4" 
                            className="w-full border border-slate-300 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 transition" 
                            placeholder="Cth: Foto KTP terpotong/buram, silakan ulangi memfoto dengan cahaya yang lebih terang..."
                        ></textarea>
                        <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
                            <button onClick={() => setShowRejectModal(false)} className="w-full sm:w-auto bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-200 text-center transition">Batal</button>
                            <button onClick={confirmReject} className="w-full sm:w-auto bg-red-600 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/30 hover:bg-red-700 text-center transition">Tolak Berkas</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Sukses Terbit */}
            {showToast && (
                <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 z-[100] animate-in slide-in-from-bottom-5">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                        <i className="fas fa-envelope-open-text text-2xl"></i>
                    </div>
                    <div>
                        <p className="font-bold text-base">Surat Resmi Diterbitkan!</p>
                        <p className="text-xs text-emerald-100">Dokumen e-Surat PDF telah masuk ke akun pemohon.</p>
                    </div>
                </div>
            )}

        </div>
    );
}
