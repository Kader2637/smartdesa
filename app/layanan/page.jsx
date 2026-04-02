"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function LayananPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Semua');
    
    // Multi-step modal state
    const [modalData, setModalData] = useState(null);
    const [currentStep, setCurrentStep] = useState(0); // 0: detail, 1: tnc, 2: form, 3: upload, 4: success
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [formData, setFormData] = useState({ nik: '', nama: '', keperluan: '' });

    const baseData = [
        { id: 1, nama: "Surat Keterangan Tidak Mampu (SKTM)", kategori: "Kesejahteraan", estimasi: "1 Hari Kerja", icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z", syarat: ["Scan KTP Asli", "Scan KK Asli", "Surat Pengantar RT/RW", "Foto Rumah Tampak Depan"] },
        { id: 2, nama: "Surat Pengantar Nikah (NA)", kategori: "Kependudukan", estimasi: "2 Hari Kerja", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", syarat: ["KTP Calon Suami & Istri", "KK Kedua Belah Pihak", "Akta Kelahiran", "Pas Foto 3x4 (4 Lembar)"] },
        { id: 3, nama: "Surat Pindah Domisili", kategori: "Kependudukan", estimasi: "1 Hari Kerja", icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4", syarat: ["KTP Asli", "KK Asli", "Alamat Tujuan Lengkap", "Alasan Pindah"] },
        { id: 4, nama: "Pembuatan Kartu Keluarga (KK) Baru", kategori: "Kependudukan", estimasi: "3 Hari Kerja", icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z", syarat: ["Buku Nikah Asli", "KK Lama (Jika Pecah KK)", "KTP Suami Istri"] },
        { id: 5, nama: "Surat Izin Usaha Mikro (IUMK)", kategori: "Perizinan", estimasi: "2 Hari Kerja", icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4", syarat: ["KTP Pemohon", "Foto Tempat Usaha", "Surat Pengantar RT/RW"] },
        { id: 6, nama: "Surat Keterangan Usaha (SKU)", kategori: "Perizinan", estimasi: "1 Hari Kerja", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01", syarat: ["KTP Asli", "KK Asli", "Tujuan Pembuatan SKU"] },
        { id: 7, nama: "Surat Keterangan Kematian", kategori: "Kependudukan", estimasi: "1 Hari Kerja", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", syarat: ["KTP Almarhum", "KTP Pelapor", "Surat Keterangan Kematian RS/Dokter/RT"] },
        { id: 8, nama: "Surat Pengantar SKCK", kategori: "Umum", estimasi: "1 Hari Kerja", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", syarat: ["KTP Asli", "KK Asli", "Tujuan Pembuatan SKCK"] },
        { id: 9, nama: "Surat Pengantar Domisili Sementara", kategori: "Kependudukan", estimasi: "1 Hari Kerja", icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", syarat: ["KTP Daerah Asal", "Surat Pengantar RT/RW Setempat"] },
        { id: 10, nama: "Surat Kehilangan", kategori: "Umum", estimasi: "Bisa Ditunggu", icon: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z", syarat: ["Berita Acara Kehilangan dari RT", "KTP Asli (Jika Tidak Hilang)"] },
        { id: 11, nama: "Izin Keramaian (Acara Desa)", kategori: "Perizinan", estimasi: "3 Hari Kerja", icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", syarat: ["KTP Panitia Penyelenggara", "Proposal Acara Singkat", "Denah Lokasi", "Persetujuan Tetangga Sekitar"] }
    ];

    const [filteredData, setFilteredData] = useState(baseData);

    useEffect(() => {
        let f = baseData;
        if (activeFilter !== 'Semua') {
            f = f.filter(d => d.kategori === activeFilter);
        }
        if (searchQuery.trim() !== '') {
            f = f.filter(d => d.nama.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setFilteredData(f);
    }, [searchQuery, activeFilter]);

    // Handle Mock Upload Next Step
    const handleUploadClick = () => {
        setCurrentStep(3); // Upload phase
        setIsUploading(true);
        setUploadProgress(0);

        let progress = 0;
        const interval = setInterval(() => {
            progress += 10;
            setUploadProgress(progress);
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    setIsUploading(false);
                    setCurrentStep(4); // Success phase
                }, 500);
            }
        }, 150);
    };

    const closeModal = () => {
        setModalData(null);
        setTimeout(() => {
            setCurrentStep(0);
            setUploadProgress(0);
            setIsUploading(false);
            setFormData({ nik: '', nama: '', keperluan: '' });
        }, 300); // clear after animation
    };

    return (
        <div className="bg-slate-50 min-h-screen pt-40 pb-32">
            
            {/* HERO SECTION */}
            <section className="relative px-4 pb-16">
                <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-emerald-500/10 blur-[100px] rounded-full -z-10 animate-blob pointer-events-none"></div>
                <div className="absolute top-20 left-1/4 w-[300px] h-[300px] bg-teal-500/10 blur-[100px] rounded-full -z-10 animate-blob animation-delay-2000 pointer-events-none"></div>

                <div className="max-w-4xl mx-auto text-center z-10 animate-in fade-in slide-in-from-bottom-12 duration-1000">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-emerald-100 text-sm font-semibold text-emerald-700 shadow-sm mb-6">
                        <i className="fas fa-bolt text-yellow-500"></i> Layanan 24/7 Tanpa Antre di Kelurahan
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                        Pusat Layanan <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Digital Warga.</span>
                    </h1>

                    <p className="text-lg md:text-xl text-slate-500 mb-12 max-w-2xl mx-auto font-medium">Ajukan dokumen kependudukan, perizinan, dan keperluan lainnya langsung dari rumah Anda.</p>

                    <div className="relative max-w-2xl mx-auto group">
                        <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-colors group-focus-within:text-emerald-500">
                            <i className="fas fa-search text-xl text-slate-400 group-focus-within:text-emerald-500"></i>
                        </div>
                        <input 
                            type="text" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            className="block w-full pl-16 pr-6 py-6 bg-white/80 backdrop-blur-xl border-2 border-slate-200 rounded-3xl text-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-xl shadow-slate-200/50" 
                            placeholder="Cari layanan administrasi... (mis: SKTM, Domisili)" 
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-6 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                                <i className="fas fa-times-circle text-xl"></i>
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* SERVICES DIRECTORY */}
            <section className="relative max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
                    <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                        Direktori Layanan <span className="bg-slate-200 text-slate-700 text-sm font-bold px-3 py-1 rounded-lg ml-2">{filteredData.length}</span>
                    </h2>
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
                        {['Semua', 'Kependudukan', 'Perizinan', 'Umum', 'Kesejahteraan'].map(cat => (
                             <button 
                                key={cat} 
                                onClick={() => setActiveFilter(cat)} 
                                className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-sm whitespace-nowrap ${
                                    activeFilter === cat 
                                        ? 'bg-slate-900 text-white hover:bg-slate-800' 
                                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                             >
                                {cat}
                             </button>
                        ))}
                    </div>
                </div>

                {filteredData.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-500">
                        {filteredData.map((item, idx) => (
                            <div key={item.id} onClick={() => setModalData(item)} className="bg-white rounded-[2rem] p-7 border border-slate-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-xl hover:shadow-emerald-500/10 hover:border-emerald-100 transition-all cursor-pointer group flex flex-col h-full animate-in slide-in-from-bottom-4 fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-slate-50 text-slate-600 border border-slate-100 rounded-2xl flex items-center justify-center group-hover:bg-emerald-50 group-hover:text-emerald-600 group-hover:border-emerald-100 transition-colors duration-300 shadow-sm">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon}></path></svg>
                                    </div>
                                    <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{item.kategori}</span>
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-6 flex-1 group-hover:text-emerald-700 transition-colors">{item.nama}</h3>
                                <div className="pt-5 border-t border-slate-100 flex justify-between items-center text-sm font-medium text-slate-500">
                                    <span className="flex items-center gap-1.5"><i className="far fa-clock text-slate-400"></i> {item.estimasi}</span>
                                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                                        <i className="fas fa-chevron-right text-xs"></i>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // EMPTY STATE (NO DATA)
                    <div className="w-full bg-white rounded-[2rem] border border-slate-200 border-dashed p-16 flex flex-col items-center justify-center text-center shadow-sm animate-in fade-in zoom-in-95">
                        <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-300 ring-8 ring-slate-50/50">
                            <i className="fas fa-search-minus text-4xl"></i>
                        </div>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Layanan Tidak Ditemukan</h3>
                        <p className="text-slate-500 max-w-md mx-auto mb-8">Maaf, kami tidak dapat menemukan layanan <span className="font-bold text-slate-700">"{searchQuery}"</span> dalam kategori <span className="font-bold text-slate-700">"{activeFilter}"</span>. Silakan coba kata kunci lain.</p>
                        <button onClick={() => {setSearchQuery(''); setActiveFilter('Semua')}} className="px-6 py-3 bg-emerald-50 text-emerald-700 font-bold rounded-xl hover:bg-emerald-100 transition-colors flex items-center gap-2">
                            <i className="fas fa-undo"></i> Reset Semua Filter
                        </button>
                    </div>
                )}
            </section>

            {/* MULTI-STEP MODAL OVERLAY */}
            {modalData && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 max-w-xl w-full shadow-2xl relative overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 h-full max-h-[85vh]">
                        {/* Close button - visible conditionally */}
                        {currentStep !== 3 && currentStep !== 4 && (
                            <button onClick={closeModal} className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center font-bold text-slate-500 transition-colors z-20">
                                <i className="fas fa-times"></i>
                            </button>
                        )}
                        
                        {/* Step Indicators Top Bar */}
                        {currentStep > 0 && currentStep < 4 && (
                            <div className="flex items-center justify-between mb-8 pb-4 relative z-10 px-2 lg:px-0 mt-2">
                                <div className="flex items-center gap-2 w-full">
                                    {[1, 2, 3].map((step) => (
                                        <div key={step} className="flex-1 flex flex-col items-center relative">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 relative z-10 ${
                                                currentStep === step ? 'bg-emerald-600 text-white ring-4 ring-emerald-100' :
                                                currentStep > step ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                                {currentStep > step ? <i className="fas fa-check"></i> : step}
                                            </div>
                                            {/* Line connector */}
                                            {step < 3 && (
                                                <div className={`absolute top-4 left-1/2 w-full h-[2px] -z-0 ${currentStep > step ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Scrollable Content Area */}
                        <div className="overflow-y-auto flex-1 px-1 custom-scrollbar pb-4 relative z-10">

                            {/* STEP 0: Modal Detail Awal */}
                            {currentStep === 0 && (
                                <div className="animate-in slide-in-from-right-8 fade-in">
                                    <div className="flex items-center gap-4 mb-8 pr-12">
                                        <div className="w-16 h-16 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={modalData.icon}></path></svg>
                                        </div>
                                        <div>
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{modalData.kategori}</span>
                                            <div className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded inline-block mt-1">Estimasi: {modalData.estimasi}</div>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-slate-900 mb-8 leading-tight">{modalData.nama}</h3>
                                    
                                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 mb-8">
                                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><i className="fas fa-list-ul text-emerald-500"></i> Persyaratan Berkas:</h4>
                                        <ul className="space-y-3 text-sm text-slate-600 font-medium ml-1">
                                            {modalData.syarat.map((s, i) => (
                                                <li key={i} className="flex gap-3 items-start">
                                                    <i className="fas fa-check-circle text-emerald-500 mt-0.5"></i>
                                                    <span>{s}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* STEP 1: Syarat & Ketentuan */}
                            {currentStep === 1 && (
                                <div className="animate-in slide-in-from-right-8 fade-in">
                                    <div className="text-center mb-6">
                                        <h3 className="text-2xl font-extrabold text-slate-900">Persetujuan Etik</h3>
                                        <p className="text-sm text-slate-500 mt-2">Harap baca ketentuan pengajuan layanan ini dengan seksama.</p>
                                    </div>
                                    <div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200 text-sm text-yellow-800 leading-relaxed max-h-64 overflow-y-auto mb-6">
                                        <p className="mb-3 font-bold">Dengan melanjutkan pengajuan dokumen ini, saya bertanda tangan di bawah ini secara etis digital menyatakan bahwa:</p>
                                        <ul className="list-decimal pl-5 space-y-2">
                                            <li>Semua informasi dan berkas pendukung yang saya unggah adalah <span className="font-bold">ASLI dan BENAR</span>.</li>
                                            <li>Apabila ditemukan pemalsuan identitas atau dokumen pendukung, saya bersedia diproses sesuai dengan hukum perundang-undangan yang berlaku.</li>
                                            <li>Saya menyetujui data saya diproses oleh Pemerintah Desa untuk keperluan pengarsipan administrasi kependudukan.</li>
                                        </ul>
                                    </div>
                                    <label className="flex items-start gap-4 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                                        <input type="checkbox" className="mt-1 w-5 h-5 text-emerald-600 rounded focus:ring-emerald-500" required id="tnc-check" />
                                        <span className="text-sm font-medium text-slate-700">Saya memahami dan menyetujui seluruh syarat & ketentuan di atas.</span>
                                    </label>
                                </div>
                            )}

                            {/* STEP 2: Pengisian Form Data */}
                            {currentStep === 2 && (
                                <div className="animate-in slide-in-from-right-8 fade-in">
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-extrabold text-slate-900">Data Pemohon</h3>
                                        <p className="text-sm text-slate-500 mt-1">Lengkapi informasi dasar penerima dokumen.</p>
                                    </div>
                                    <form className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Nomor Induk Kependudukan (NIK)</label>
                                            <input type="text" value={formData.nik} onChange={e => setFormData({...formData, nik: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 font-mono transition-all" placeholder="16 Digit Angka NIK" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Nama Lengkap Sesuai KTP</label>
                                            <input type="text" value={formData.nama} onChange={e => setFormData({...formData, nama: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 font-medium transition-all" placeholder="Misal: Budi Santoso" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">Tujuan / Keterangan Keperluan</label>
                                            <textarea value={formData.keperluan} onChange={e => setFormData({...formData, keperluan: e.target.value})} rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 font-medium transition-all" placeholder="Penjelasan singkat keperluan surat ini diajukan..."></textarea>
                                        </div>
                                    </form>
                                    <div className="mt-4 p-3 bg-blue-50 rounded-xl flex items-start gap-3 border border-blue-100">
                                        <i className="fas fa-info-circle text-blue-500 mt-0.5"></i>
                                        <p className="text-xs text-blue-700 font-medium leading-relaxed">Penyensoran KTP akan dilakukan secara otomatis oleh sistem kami demi menjaga keamanan privasi data Anda.</p>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Uploading State */}
                            {currentStep === 3 && (
                                <div className="animate-in fade-in zoom-in-95 h-64 flex flex-col items-center justify-center text-center">
                                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Memproses Dokumen</h3>
                                    <p className="text-sm text-slate-500 mb-10">Sistem mengunggah dan mengenkripsi data secara aman...</p>
                                    
                                    <div className="relative w-24 h-24 mb-6">
                                        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                                            <circle cx="50" cy="50" r="45" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="282.7" strokeDashoffset={282.7 - (282.7 * uploadProgress) / 100} className="transition-all duration-200 ease-out" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center font-bold text-xl text-slate-900">
                                            {uploadProgress}%
                                        </div>
                                    </div>
                                    <p className="text-xs font-bold text-emerald-600 animate-pulse">Mohon jangan menutup halaman ini.</p>
                                </div>
                            )}

                            {/* STEP 4: Success State */}
                            {currentStep === 4 && (
                                <div className="animate-in zoom-in-95 fade-in text-center flex flex-col items-center pt-8 pb-4">
                                    <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-5xl mb-6 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                                        <i className="fas fa-check"></i>
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-slate-900 mb-3">Pengajuan Berhasil!</h3>
                                    <p className="text-slate-500 mb-8 max-w-sm">Berkas permohonan <strong>{modalData.nama}</strong> Anda telah terkirim dengan sukses ke Meja Kepala Desa.</p>
                                    
                                    <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-200 mb-8 border-dashed">
                                        <p className="text-xs font-bold text-slate-500 uppercase mb-1">Nomor Resi Pelacakan</p>
                                        <p className="text-2xl font-mono font-extrabold text-slate-900 tracking-wider">#SRT-{Math.floor(1000 + Math.random() * 9000)}</p>
                                        <p className="text-xs text-slate-400 mt-2">Simpan nomor ini untuk mengecek status dokumen.</p>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Sticky Action Buttons */}
                        <div className="pt-6 border-t border-slate-100 flex gap-3 mt-auto bg-white relative z-10 w-full shrink-0">
                            {currentStep === 0 && (
                                <button onClick={() => setCurrentStep(1)} className="w-full flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all outline-none">
                                    Mulai Pengajuan <i className="fas fa-arrow-right ml-2 opacity-70"></i>
                                </button>
                            )}
                            
                            {currentStep === 1 && (
                                <>
                                    <button onClick={() => setCurrentStep(0)} className="w-1/3 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-colors">Kembali</button>
                                    <button onClick={() => {
                                        if(document.getElementById('tnc-check').checked) setCurrentStep(2);
                                        else alert('Anda harus menyetujui syarat & ketentuan terlebih dahulu.');
                                    }} className="w-2/3 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all">Lanjutkan Pengisian Form</button>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    <button onClick={() => setCurrentStep(1)} className="w-1/3 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-colors">Kembali</button>
                                    <button onClick={() => {
                                        if(formData.nik && formData.nama && formData.keperluan) {
                                            handleUploadClick();
                                        } else alert('Harap isi semua biodata pengajuan.');
                                    }} className="w-2/3 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all">Upload & Kirim Berkas</button>
                                </>
                            )}

                            {currentStep === 4 && (
                                <button onClick={closeModal} className="w-full flex-1 bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 transition-colors">
                                    Kembali ke Direktori
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
}
