"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

export default function LayananPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Semua');
    const [currentPage, setCurrentPage] = useState(1);

    // Multi-step modal state
    const [modalData, setModalData] = useState(null);
    const [currentStep, setCurrentStep] = useState(0); // 0: detail, 1: tnc, 2: form, 3: upload, 4: success
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [formData, setFormData] = useState({ nik: '', nama: '', keperluan: '' });

    const ITEMS_PER_PAGE = 6;

    const baseData = [
        { 
            id: 1, 
            nama: "Surat Keterangan Tidak Mampu (SKTM)", 
            kategori: "Kesejahteraan", 
            estimasi: "1 Hari Kerja", 
            tipe: "Online",
            icon: "fa-hand-holding-heart", 
            gradient: "from-emerald-500 to-teal-600",
            color: "emerald",
            syarat: ["Scan KTP Asli", "Scan KK Asli", "Surat Pengantar RT/RW", "Foto Rumah Tampak Depan"] 
        },
        { 
            id: 2, 
            nama: "Surat Pengantar Nikah (NA)", 
            kategori: "Kependudukan", 
            estimasi: "2 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-ring", 
            gradient: "from-rose-500 to-red-600",
            color: "rose",
            syarat: ["KTP Calon Suami & Istri", "KK Kedua Belah Pihak", "Akta Kelahiran", "Pas Foto 3x4 (4 Lembar)"] 
        },
        { 
            id: 3, 
            nama: "Surat Pindah Domisili", 
            kategori: "Kependudukan", 
            estimasi: "1 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-exchange-alt", 
            gradient: "from-blue-500 to-indigo-600",
            color: "blue",
            syarat: ["KTP Asli", "KK Asli", "Alamat Tujuan Lengkap", "Alasan Pindah"] 
        },
        { 
            id: 4, 
            nama: "Pembuatan Kartu Keluarga (KK) Baru", 
            kategori: "Kependudukan", 
            estimasi: "3 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-users", 
            gradient: "from-sky-500 to-blue-600",
            color: "sky",
            syarat: ["Buku Nikah Asli", "KK Lama (Jika Pecah KK)", "KTP Suami Istri"] 
        },
        { 
            id: 5, 
            nama: "Surat Izin Usaha Mikro (IUMK)", 
            kategori: "Perizinan", 
            estimasi: "2 Hari Kerja", 
            tipe: "Online",
            icon: "fa-store", 
            gradient: "from-amber-500 to-orange-600",
            color: "amber",
            syarat: ["KTP Pemohon", "Foto Tempat Usaha", "Surat Pengantar RT/RW"] 
        },
        { 
            id: 6, 
            nama: "Surat Keterangan Usaha (SKU)", 
            kategori: "Perizinan", 
            estimasi: "1 Hari Kerja", 
            tipe: "Online",
            icon: "fa-briefcase", 
            gradient: "from-yellow-500 to-amber-600",
            color: "yellow",
            syarat: ["KTP Asli", "KK Asli", "Tujuan Pembuatan SKU"] 
        },
        { 
            id: 7, 
            nama: "Surat Keterangan Kematian", 
            kategori: "Kependudukan", 
            estimasi: "1 Hari Kerja", 
            tipe: "Online",
            icon: "fa-dove", 
            gradient: "from-slate-600 to-slate-800",
            color: "slate",
            syarat: ["KTP Almarhum", "KTP Pelapor", "Surat Keterangan Kematian RS/Dokter/RT"] 
        },
        { 
            id: 8, 
            nama: "Surat Pengantar SKCK", 
            kategori: "Umum", 
            estimasi: "1 Hari Kerja", 
            tipe: "Online",
            icon: "fa-shield-alt", 
            gradient: "from-purple-500 to-indigo-600",
            color: "purple",
            syarat: ["KTP Asli", "KK Asli", "Tujuan Pembuatan SKCK"] 
        },
        { 
            id: 9, 
            nama: "Surat Pengantar Domisili Sementara", 
            kategori: "Kependudukan", 
            estimasi: "1 Hari Kerja", 
            tipe: "Online",
            icon: "fa-home", 
            gradient: "from-teal-500 to-emerald-600",
            color: "teal",
            syarat: ["KTP Daerah Asal", "Surat Pengantar RT/RW Setempat"] 
        },
        { 
            id: 10, 
            nama: "Surat Kehilangan", 
            kategori: "Umum", 
            estimasi: "Bisa Ditunggu", 
            tipe: "Online",
            icon: "fa-exclamation-triangle", 
            gradient: "from-red-500 to-rose-600",
            color: "red",
            syarat: ["Berita Acara Kehilangan dari RT", "KTP Asli (Jika Tidak Hilang)"] 
        },
        { 
            id: 11, 
            nama: "Izin Keramaian (Acara Desa)", 
            kategori: "Perizinan", 
            estimasi: "3 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-bullhorn", 
            gradient: "from-pink-500 to-rose-600",
            color: "pink",
            syarat: ["KTP Panitia Penyelenggara", "Proposal Acara Singkat", "Denah Lokasi", "Persetujuan Tetangga Sekitar"] 
        },
        { 
            id: 12, 
            nama: "Surat Keterangan Bersih Diri (SKBD)", 
            kategori: "Kependudukan", 
            estimasi: "1 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-user-check", 
            gradient: "from-cyan-500 to-blue-600",
            color: "cyan",
            syarat: ["KTP Pemohon", "KK Asli", "Surat Pengantar RT/RW", "Pernyataan Bebas Catatan Kriminal"] 
        },
        { 
            id: 13, 
            nama: "Surat Keterangan Beda Nama", 
            kategori: "Kependudukan", 
            estimasi: "2 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-signature", 
            gradient: "from-orange-500 to-amber-600",
            color: "amber",
            syarat: ["Scan KTP", "Scan KK", "Akta Kelahiran", "Ijazah / Buku Baptis / Dokumen Pembanding Lainnya"] 
        },
        { 
            id: 14, 
            nama: "Surat Keterangan Penghasilan Orang Tua", 
            kategori: "Kesejahteraan", 
            estimasi: "1 Hari Kerja", 
            tipe: "Online",
            icon: "fa-money-bill-wave", 
            gradient: "from-emerald-600 to-green-700",
            color: "emerald",
            syarat: ["KTP Pemohon", "Slip Gaji / Surat Pernyataan Penghasilan RT", "Scan KK Asli"] 
        },
        { 
            id: 15, 
            nama: "Surat Pengantar Pembuatan Paspor", 
            kategori: "Umum", 
            estimasi: "2 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-passport", 
            gradient: "from-indigo-600 to-violet-700",
            color: "indigo",
            syarat: ["Scan KTP Asli", "Scan KK Asli", "Scan Akta Kelahiran / Buku Nikah", "Surat Keterangan Domisili Kerja"] 
        },
        { 
            id: 16, 
            nama: "Surat Izin Domisili Usaha (SITU)", 
            kategori: "Perizinan", 
            estimasi: "3 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-building", 
            gradient: "from-cyan-500 to-blue-600",
            color: "cyan",
            syarat: ["KTP Pemegang Izin Usaha", "Akte Pendirian Perusahaan", "Persetujuan Tetangga (Kanan, Kiri, Depan, Belakang)", "Bukti Kepemilikan Lahan/Sewa"] 
        },
        { 
            id: 17, 
            nama: "Surat Keterangan Duda / Janda", 
            kategori: "Kependudukan", 
            estimasi: "2 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-heart-broken", 
            gradient: "from-fuchsia-500 to-purple-600",
            color: "fuchsia",
            syarat: ["KTP Asli", "KK Asli", "Akta Perceraian Asli / Akta Kematian Pasangan Terdahulu", "Surat Pernyataan Belum Menikah Lagi (Materai 10.000)"] 
        },
        { 
            id: 18, 
            nama: "Surat Pengantar Pendaftaran TNI / POLRI", 
            kategori: "Umum", 
            estimasi: "2 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-user-shield", 
            gradient: "from-slate-700 to-zinc-900",
            color: "slate",
            syarat: ["KTP Calon Pendaftar", "KTP Orang Tua", "KK Asli", "Ijazah Terakhir", "SKCK Aktif"] 
        },
        { 
            id: 19, 
            nama: "Surat Keterangan Ahli Waris", 
            kategori: "Kependudukan", 
            estimasi: "3 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-users-cog", 
            gradient: "from-yellow-600 to-orange-700",
            color: "yellow",
            syarat: ["Surat Kematian Pewaris", "Surat Pernyataan Ahli Waris (RT/RW)", "KTP & KK Seluruh Ahli Waris", "Buku Nikah Pewaris Asli"] 
        },
        { 
            id: 20, 
            nama: "Surat Keterangan Ralat Kartu Keluarga", 
            kategori: "Kependudukan", 
            estimasi: "2 Hari Kerja", 
            tipe: "Online",
            icon: "fa-edit", 
            gradient: "from-blue-600 to-sky-700",
            color: "blue",
            syarat: ["KK Lama yang Salah Cetak", "Dokumen Acuan (KTP / Akta Lahir / Buku Nikah)", "Formulir Perubahan Data (F1.01)"] 
        },
        { 
            id: 21, 
            nama: "Surat Pengantar Bantuan Sosial (Bansos)", 
            kategori: "Kesejahteraan", 
            estimasi: "1 Hari Kerja", 
            tipe: "Online",
            icon: "fa-hands-holding", 
            gradient: "from-teal-600 to-emerald-700",
            color: "teal",
            syarat: ["KTP Asli", "KK Asli", "Surat Keterangan Tidak Mampu (SKTM)", "Foto Kondisi Rumah Terbaru"] 
        },
        { 
            id: 22, 
            nama: "Surat Keterangan Domisili Yayasan / LSM", 
            kategori: "Perizinan", 
            estimasi: "3 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-landmark", 
            gradient: "from-violet-500 to-fuchsia-600",
            color: "purple",
            syarat: ["Akte Notaris Pendirian Yayasan", "Surat Pengantar RT/RW", "KTP Ketua Pengurus", "Foto Kantor/Sekretariat Yayasan"] 
        },
        { 
            id: 23, 
            nama: "Surat Izin Mendirikan Bangunan (IMB / PBG)", 
            kategori: "Perizinan", 
            estimasi: "3 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-tools", 
            gradient: "from-amber-600 to-yellow-700",
            color: "amber",
            syarat: ["Sertifikat Tanah Asli", "KTP Pemilik Tanah", "Gambar Rencana Bangunan (Denah)", "Bukti Lunas PBB Tahun Terakhir"] 
        },
        { 
            id: 24, 
            nama: "Surat Keterangan Kepemilikan Tanah (Sporadik)", 
            kategori: "Umum", 
            estimasi: "5 Hari Kerja", 
            tipe: "Fisik",
            icon: "fa-map-marked-alt", 
            gradient: "from-yellow-700 to-amber-800",
            color: "yellow",
            syarat: ["Surat Alas Hak / Riwayat Tanah", "Surat Pengantar RT/RW", "Pernyataan Penguasaan Fisik Bidang Tanah (Saksi Tetangga)", "Dokumentasi Batas Tanah"] 
        },
        { 
            id: 25, 
            nama: "Surat Keterangan Kelakuan Baik (SKKB)", 
            kategori: "Kependudukan", 
            estimasi: "1 Hari Kerja", 
            tipe: "Online",
            icon: "fa-smile", 
            gradient: "from-green-500 to-teal-600",
            color: "emerald",
            syarat: ["KTP Pemohon", "KK Asli", "Surat Pengantar RT/RW Setempat"] 
        },
        { 
            id: 26, 
            nama: "Surat Keterangan Hamil / Melahirkan", 
            kategori: "Kesejahteraan", 
            estimasi: "1 Hari Kerja", 
            tipe: "Online",
            icon: "fa-baby", 
            gradient: "from-pink-400 to-rose-500",
            color: "pink",
            syarat: ["KTP Ibu Hamil", "KK Asli", "Buku KIA / Surat Keterangan Bidan / Rumah Sakit"] 
        }
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
        setCurrentPage(1); // Reset to page 1 on filter/search change
    }, [searchQuery, activeFilter]);

    // Pagination calculations
    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    // Get count for each category
    const getCategoryCount = (category) => {
        if (category === 'Semua') return baseData.length;
        return baseData.filter(d => d.kategori === category).length;
    };

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
        }, 300); 
    };

    return (
        <div className="bg-slate-50 min-h-screen pt-36 pb-32 selection:bg-emerald-500 selection:text-white relative font-sans">
            {/* Ambient Background Glows */}
            <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-100/20 rounded-full blur-[130px] mix-blend-multiply pointer-events-none -z-10 animate-pulse"></div>
            <div className="absolute top-[40%] left-[-15%] w-[550px] h-[550px] bg-sky-100/20 rounded-full blur-[130px] mix-blend-multiply pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '6s' }}></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* ─── TITLE BANNER / HEADER ─────────────────────────────── */}
                <div className="text-center md:text-left mb-12">
                    <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100/80 text-xs font-extrabold text-emerald-700 shadow-sm mb-4"
                    >
                        <i className="fas fa-bolt text-amber-500 animate-pulse"></i> Portal Mandiri Warga 24 Jam
                    </motion.div>
                    
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.1]"
                    >
                        Pusat Pelayanan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Digital Desa</span>
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-slate-500 text-sm md:text-base font-semibold mt-3 max-w-xl"
                    >
                        Pilih jenis layanan administrasi yang Anda butuhkan, isi berkas dan ajukan secara online dalam beberapa menit saja.
                    </motion.p>
                </div>

                {/* ─── TWO COLUMN MAIN SECTION ───────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    
                    {/* LEFT PANEL: Sticky Sidebar (Search & Categories) */}
                    <aside className="lg:col-span-4 xl:col-span-3 flex flex-col gap-6 lg:sticky lg:top-36 h-fit self-start">
                        {/* Search Card Widget */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-3">Cari Layanan</h4>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-emerald-500">
                                    <i className="fas fa-search text-sm"></i>
                                </div>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-50/50 pl-10 pr-10 py-3 border border-slate-200/80 rounded-2xl text-sm placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 transition-all font-semibold text-slate-800"
                                    placeholder="Ketik kata kunci..."
                                />
                                {searchQuery && (
                                    <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600">
                                        <i className="fas fa-times-circle"></i>
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Category List Navigation Widget */}
                        <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                            <h4 className="text-xs font-black uppercase text-slate-400 tracking-wider mb-4">Kategori Menu</h4>
                            <nav className="flex flex-col gap-1.5">
                                {[
                                    { name: 'Semua', icon: 'fa-th-large' },
                                    { name: 'Kependudukan', icon: 'fa-id-card' },
                                    { name: 'Perizinan', icon: 'fa-file-signature' },
                                    { name: 'Umum', icon: 'fa-folder-open' },
                                    { name: 'Kesejahteraan', icon: 'fa-hand-holding-heart' }
                                ].map(cat => {
                                    const isActive = activeFilter === cat.name;
                                    return (
                                        <button
                                            key={cat.name}
                                            onClick={() => setActiveFilter(cat.name)}
                                            className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between transition-all duration-300 group cursor-pointer ${
                                                isActive
                                                    ? 'bg-slate-900 text-white shadow-md'
                                                    : 'hover:bg-slate-50 text-slate-600 hover:text-slate-900'
                                            }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-colors ${
                                                    isActive ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-slate-200/80 group-hover:text-slate-600'
                                                }`}>
                                                    <i className={`fas ${cat.icon}`}></i>
                                                </div>
                                                <span className="text-xs font-extrabold">{cat.name}</span>
                                            </div>
                                            <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full ${
                                                isActive ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                                            }`}>
                                                {getCategoryCount(cat.name)}
                                            </span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>

                        {/* Customer Support Widget */}
                        <div className="bg-gradient-to-br from-emerald-600 to-teal-800 rounded-3xl p-6 text-white shadow-xl shadow-emerald-700/10 relative overflow-hidden">
                            <div className="absolute top-[-30px] right-[-30px] w-24 h-24 bg-white/10 rounded-full blur-xl pointer-events-none"></div>
                            <div className="w-10 h-10 bg-white/15 rounded-2xl flex items-center justify-center mb-4 text-emerald-300 text-lg">
                                <i className="fas fa-headset animate-pulse"></i>
                            </div>
                            <h4 className="text-sm font-extrabold mb-1">Butuh Bantuan?</h4>
                            <p className="text-[11px] text-emerald-100 font-semibold leading-relaxed mb-4">
                                Tim administrasi balai desa kami siap memandu Anda melalui layanan chat mandiri.
                            </p>
                            <a 
                                href="https://wa.me/#" 
                                target="_blank" 
                                className="w-full bg-white text-emerald-800 font-black text-center py-2.5 rounded-xl hover:bg-emerald-50 hover:-translate-y-0.5 active:translate-y-0 text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-950/20"
                            >
                                <i className="fab fa-whatsapp text-sm text-emerald-600"></i>
                                Hubungi WhatsApp Desa
                            </a>
                        </div>
                    </aside>

                    {/* RIGHT PANEL: Dynamic paginated directory */}
                    <main className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">
                        
                        {/* Grid Header Info */}
                        <div className="flex items-center justify-between bg-white px-6 py-4 rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
                            <span className="text-xs font-extrabold text-slate-500">
                                Kategori aktif: <span className="text-slate-900">{activeFilter}</span>
                            </span>
                            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">
                                {filteredData.length} Dokumen Tersedia
                            </span>
                        </div>

                        {/* Paginated Grid Display */}
                        {paginatedData.length > 0 ? (
                            <>
                                <motion.div 
                                    key={`${activeFilter}-${searchQuery}-${currentPage}`}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                                >
                                    {paginatedData.map((item) => (
                                        <div 
                                            key={item.id} 
                                            onClick={() => setModalData(item)} 
                                            className="group relative bg-white rounded-[2rem] p-8 border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.012)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.05)] hover:border-emerald-500/20 transition-all duration-500 cursor-pointer flex flex-col justify-between h-full overflow-hidden"
                                        >
                                            {/* Ambient Hover Backdrop Glow */}
                                            <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${
                                                item.color === 'emerald' ? 'from-emerald-500/5 to-teal-500/5' :
                                                item.color === 'rose' ? 'from-rose-500/5 to-red-500/5' :
                                                item.color === 'blue' ? 'from-blue-500/5 to-indigo-500/5' :
                                                item.color === 'sky' ? 'from-sky-500/5 to-blue-500/5' :
                                                item.color === 'amber' ? 'from-amber-500/5 to-orange-500/5' :
                                                item.color === 'yellow' ? 'from-yellow-500/5 to-amber-500/5' :
                                                item.color === 'slate' ? 'from-slate-500/5 to-slate-800/5' :
                                                item.color === 'purple' ? 'from-purple-500/5 to-indigo-500/5' :
                                                item.color === 'teal' ? 'from-teal-500/5 to-emerald-500/5' :
                                                item.color === 'red' ? 'from-red-500/5 to-rose-500/5' :
                                                'from-pink-500/5 to-rose-500/5'
                                            } rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}></div>

                                            <div>
                                                {/* Header Card Meta */}
                                                <div className="flex justify-between items-center mb-6">
                                                    <div className={`w-12 h-12 bg-gradient-to-br ${item.gradient} text-white rounded-2xl flex items-center justify-center text-lg shadow-sm shadow-emerald-100 group-hover:scale-108 group-hover:rotate-3 transition-all duration-300`}>
                                                        <i className={`fas ${item.icon}`}></i>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {/* Online vs Fisik badge */}
                                                        <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-lg ${
                                                            item.tipe === 'Online' 
                                                                ? 'bg-emerald-50 text-emerald-600 border border-emerald-100/50' 
                                                                : 'bg-amber-50 text-amber-600 border border-amber-100/50'
                                                        }`}>
                                                            {item.tipe === 'Online' ? 'Proses Online' : 'Ke Kantor'}
                                                        </span>
                                                        <span className={`text-[9px] font-extrabold px-2.5 py-1 rounded-lg border tracking-wider uppercase bg-slate-50 text-slate-500 border-slate-100`}>
                                                            {item.kategori}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Service Title */}
                                                <h3 className="text-lg font-black text-slate-900 leading-snug mb-3 group-hover:text-emerald-600 transition-colors">
                                                    {item.nama}
                                                </h3>
                                            </div>

                                            {/* Footer Card Meta */}
                                            <div className="pt-5 border-t border-slate-100/80 flex items-center justify-between mt-5">
                                                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                                    <i className="far fa-clock text-slate-300"></i> {item.estimasi}
                                                </span>
                                                
                                                {/* Morphing Hover Action Button */}
                                                <div className="flex items-center gap-1.5 text-[10px] font-extrabold text-emerald-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-300">
                                                    <span>Ajukan</span>
                                                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-md">
                                                        <i className="fas fa-arrow-right text-[8px]"></i>
                                                    </div>
                                                </div>
                                                <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center group-hover:hidden transition-all">
                                                    <i className="fas fa-chevron-right text-[8px]"></i>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </motion.div>

                                {/* ─── DYNAMIC PAGINATION CONTROLS ───────────────────────── */}
                                {totalPages > 1 && (
                                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200/60 mt-8">
                                        <span className="text-xs sm:text-sm font-extrabold text-slate-500 text-center sm:text-left">
                                            Menampilkan <span className="text-slate-900">{startIndex + 1}</span> - <span className="text-slate-900">{Math.min(endIndex, filteredData.length)}</span> dari <span className="text-slate-900">{filteredData.length}</span> dokumen layanan
                                        </span>
                                        <div className="flex items-center gap-2">
                                            {/* Prev Button */}
                                            <button 
                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                disabled={currentPage === 1}
                                                className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
                                            >
                                                <i className="fas fa-chevron-left text-xs"></i>
                                            </button>
                                            
                                            {/* Page Number Buttons */}
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                <button
                                                    key={page}
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`w-10 h-10 rounded-xl font-extrabold text-xs transition-all shadow-sm cursor-pointer ${
                                                        currentPage === page
                                                            ? 'bg-slate-900 text-white shadow-md scale-105'
                                                            : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    {page}
                                                </button>
                                            ))}
                                            
                                            {/* Next Button */}
                                            <button 
                                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                disabled={currentPage === totalPages}
                                                className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-slate-500 flex items-center justify-center hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed"
                                            >
                                                <i className="fas fa-chevron-right text-xs"></i>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* Elegant Empty State inside main panel */
                            <div className="w-full bg-white rounded-[2rem] border border-slate-200 border-dashed p-16 flex flex-col items-center justify-center text-center shadow-sm">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-5 text-slate-400 ring-8 ring-slate-50/50">
                                    <i className="fas fa-search-minus text-2xl"></i>
                                </div>
                                <h3 className="text-xl font-extrabold text-slate-900 mb-2">Layanan Tidak Ditemukan</h3>
                                <p className="text-slate-500 text-xs sm:text-sm max-w-sm mx-auto mb-6 font-semibold">
                                    Maaf, kami tidak dapat menemukan surat <span className="font-bold text-slate-800">"{searchQuery}"</span> dalam filter ini. Coba ketik kata kunci yang lain.
                                </p>
                                <button 
                                    onClick={() => { setSearchQuery(''); setActiveFilter('Semua') }} 
                                    className="px-5 py-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-extrabold rounded-xl text-xs transition-colors flex items-center gap-2 cursor-pointer"
                                >
                                    <i className="fas fa-undo"></i> Reset Semua Filter
                                </button>
                            </div>
                        )}
                    </main>
                </div>
            </div>

            {/* ─── MULTI-STEP MODAL WINDOW ─────────────────────────────── */}
            {modalData && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 max-w-xl w-full shadow-2xl relative overflow-hidden flex flex-col animate-in zoom-in-95 duration-300 h-full max-h-[85vh]">
                        {/* Close Button */}
                        {currentStep !== 3 && currentStep !== 4 && (
                            <button onClick={closeModal} className="absolute top-6 right-6 w-10 h-10 bg-slate-100 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center font-bold text-slate-500 transition-colors z-20 cursor-pointer">
                                <i className="fas fa-times"></i>
                            </button>
                        )}

                        {/* Top Stepper Progressive Progress Capsule */}
                        {currentStep < 4 && (
                            <div className="mb-8 pb-4 border-b border-slate-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-2.5 py-1.5 rounded-md">Langkah {currentStep + 1} dari 4</span>
                                    <h4 className="font-extrabold text-slate-800 text-sm">
                                        {currentStep === 0 ? "Detail Persyaratan" :
                                         currentStep === 1 ? "Pernyataan Keaslian" :
                                         currentStep === 2 ? "Formulir Biodata" : "Proses Upload"}
                                    </h4>
                                </div>
                                <div className="flex gap-1.5">
                                    {[0, 1, 2, 3].map((step) => (
                                        <div 
                                            key={step} 
                                            className={`h-1.5 rounded-full transition-all duration-500 ${
                                                currentStep === step ? 'w-8 bg-emerald-500' :
                                                currentStep > step ? 'w-2 bg-emerald-300' : 'w-2 bg-slate-200'
                                            }`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Scrollable Form Content Area */}
                        <div className="overflow-y-auto flex-1 px-1 custom-scrollbar pb-6 relative z-10">

                            {/* STEP 0: Detail Persyaratan */}
                            {currentStep === 0 && (
                                <div className="animate-in slide-in-from-right-6 fade-in duration-300">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${modalData.gradient} text-white rounded-2xl flex items-center justify-center text-2xl shadow-md shrink-0`}>
                                            <i className={`fas ${modalData.icon}`}></i>
                                        </div>
                                        <div>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">{modalData.kategori}</span>
                                            <div className="text-xs font-extrabold text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded border border-emerald-100 flex items-center gap-1.5 w-max">
                                                <i className="far fa-clock"></i> Estimasi Proses: {modalData.estimasi}
                                            </div>
                                        </div>
                                    </div>
                                    <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-6 leading-tight">{modalData.nama}</h3>

                                    <div className="bg-slate-50/50 rounded-3xl p-6 border border-slate-200/60 mb-6">
                                        <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2 text-sm mb-4"><i className="fas fa-file-alt text-emerald-500"></i> Dokumen Persyaratan:</h4>
                                        <ul className="space-y-3.5 text-slate-600 ml-1">
                                            {modalData.syarat.map((s, i) => (
                                                <li key={i} className="flex gap-3 items-start text-sm font-semibold">
                                                    <div className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                                                        <i className="fas fa-check text-emerald-600 text-[8px]"></i>
                                                    </div>
                                                    <span>{s}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}

                            {/* STEP 1: Syarat & Ketentuan / Persetujuan */}
                            {currentStep === 1 && (
                                <div className="animate-in slide-in-from-right-6 fade-in duration-300">
                                    <div className="text-center mb-6">
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Pernyataan Komitmen Etik</h3>
                                        <p className="text-sm text-slate-400 mt-1">Harap konfirmasi keabsahan dokumen Anda.</p>
                                    </div>
                                    <div className="bg-amber-50/60 rounded-2xl p-6 border border-amber-100 text-sm text-amber-800 leading-relaxed max-h-64 overflow-y-auto mb-6">
                                        <p className="mb-3 font-extrabold text-amber-900 flex items-center gap-2"><i className="fas fa-shield-alt text-amber-600"></i> Deklarasi Integritas Data Warga:</p>
                                        <ul className="list-decimal pl-5 space-y-2.5 font-semibold text-amber-800/90 text-xs sm:text-sm">
                                            <li>Semua informasi dan berkas pendukung yang saya unggah adalah <span className="font-bold text-amber-900">ASLI, VALID, dan SAH</span> sesuai hukum.</li>
                                            <li>Apabila ditemukan pemalsuan identitas atau pemalsuan dokumen pendukung, saya bersedia menerima sanksi administratif hingga diproses secara hukum.</li>
                                            <li>Saya menyetujui data pribadi saya diproses oleh Pemerintah Desa secara digital demi kelancaran administrasi kependudukan.</li>
                                        </ul>
                                    </div>
                                    <label className="flex items-start gap-4 p-4 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-50 transition-colors shadow-sm bg-white focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-200">
                                        <input type="checkbox" className="mt-1 w-5 h-5 text-emerald-600 rounded-lg border-slate-300 focus:ring-emerald-500 cursor-pointer" required id="tnc-check" />
                                        <span className="text-sm font-bold text-slate-700 leading-snug">Saya menjamin secara sadar dan menyetujui seluruh syarat & ketentuan di atas.</span>
                                    </label>
                                </div>
                            )}

                            {/* STEP 2: Formulir Data Warga */}
                            {currentStep === 2 && (
                                <div className="animate-in slide-in-from-right-6 fade-in duration-300">
                                    <div className="mb-6">
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">Data Pengaju Surat</h3>
                                        <p className="text-sm text-slate-400 mt-1">Lengkapi biodata penerima dokumen di bawah ini.</p>
                                    </div>
                                    <form className="space-y-5">
                                        <div>
                                            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-widest mb-2">Nomor Induk Kependudukan (NIK)</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                                    <i className="fas fa-id-card"></i>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    value={formData.nik} 
                                                    onChange={e => setFormData({ ...formData, nik: e.target.value })} 
                                                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 font-mono transition-all text-slate-800 placeholder-slate-400 font-medium" 
                                                    placeholder="16 Digit Angka NIK" 
                                                    maxLength={16}
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-widest mb-2">Nama Lengkap Pemohon</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                                                    <i className="fas fa-user"></i>
                                                </div>
                                                <input 
                                                    type="text" 
                                                    value={formData.nama} 
                                                    onChange={e => setFormData({ ...formData, nama: e.target.value })} 
                                                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 font-bold transition-all text-slate-800 placeholder-slate-400" 
                                                    placeholder="Sesuai KTP (Contoh: ABDUL KADER)" 
                                                />
                                            </div>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-widest mb-2">Keperluan Pengajuan</label>
                                            <div className="relative">
                                                <div className="absolute top-3.5 left-4 text-slate-400">
                                                    <i className="fas fa-align-left"></i>
                                                </div>
                                                <textarea 
                                                    value={formData.keperluan} 
                                                    onChange={e => setFormData({ ...formData, keperluan: e.target.value })} 
                                                    rows="3" 
                                                    className="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl pl-11 pr-4 py-3.5 focus:outline-none focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/10 font-bold transition-all text-slate-800 placeholder-slate-400 resize-none" 
                                                    placeholder="Jelaskan secara singkat keperluan pengajuan surat..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </form>
                                    <div className="mt-5 p-3.5 bg-blue-50/80 rounded-2xl flex items-start gap-3 border border-blue-100">
                                        <i className="fas fa-info-circle text-blue-500 mt-0.5 text-sm"></i>
                                        <p className="text-xs text-blue-800 font-bold leading-relaxed">Keamanan Data Terjamin: Seluruh berkas yang Anda unggah otomatis dienkripsi dan disensor (watermark) oleh sistem demi privasi warga.</p>
                                    </div>
                                </div>
                            )}

                            {/* STEP 3: Uploading Progress bar */}
                            {currentStep === 3 && (
                                <div className="animate-in fade-in zoom-in-95 h-64 flex flex-col items-center justify-center text-center">
                                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Mengamankan & Mengirim Berkas</h3>
                                    <p className="text-sm text-slate-400 mb-8">Data sedang diunggah dan dienkripsi aman pada server...</p>

                                    <div className="relative w-28 h-28 mb-6 flex items-center justify-center">
                                        {/* Background outer pulse ring */}
                                        <div className="absolute w-24 h-24 border border-emerald-500 rounded-full animate-ping opacity-25"></div>
                                        
                                        <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
                                            <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="6" />
                                            <circle cx="50" cy="50" r="42" fill="none" stroke="#10b981" strokeWidth="6" strokeDasharray="263.89" strokeDashoffset={263.89 - (263.89 * uploadProgress) / 100} className="transition-all duration-200 ease-out" />
                                        </svg>
                                        <div className="absolute inset-0 flex items-center justify-center font-extrabold text-2xl text-slate-955">
                                            {uploadProgress}%
                                        </div>
                                    </div>
                                    <p className="text-xs font-extrabold text-emerald-600 animate-pulse uppercase tracking-wider font-mono">Mohon tetap buka halaman ini</p>
                                </div>
                            )}

                            {/* STEP 4: Success State */}
                            {currentStep === 4 && (
                                <div className="animate-in zoom-in-95 fade-in text-center flex flex-col items-center pt-8 pb-4 duration-500">
                                    <div className="relative mb-6">
                                        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl scale-125 animate-pulse"></div>
                                        <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center text-4xl shadow-lg shadow-emerald-500/30 relative z-10 animate-bounce" style={{ animationDuration: '2s' }}>
                                            <i className="fas fa-check"></i>
                                        </div>
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Pengajuan Berhasil!</h3>
                                    <p className="text-slate-500 text-sm mb-8 max-w-sm font-medium">Permohonan dokumen <strong className="text-slate-800">{modalData.nama}</strong> Anda telah terkirim dan masuk antrean persetujuan RT setempat.</p>

                                    <div className="w-full bg-slate-50 border border-slate-200/80 rounded-3xl p-6 mb-4 border-dashed relative overflow-hidden">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-slate-100 rounded-full blur-xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 relative z-10">Nomor Resi / Tiket Pelacakan</p>
                                        <p className="text-3xl font-mono font-extrabold text-slate-900 tracking-wider relative z-10">#SRT-{Math.floor(1000 + Math.random() * 9000)}</p>
                                        <p className="text-xs text-slate-400 mt-2.5 relative z-10 font-semibold">Simpan nomor ini untuk memantau status pengurusan surat Anda di dashboard atau widget Lacak Surat.</p>
                                    </div>
                                </div>
                            )}

                        </div>

                        {/* Sticky Action Buttons */}
                        <div className="pt-6 border-t border-slate-100 flex gap-3 mt-auto bg-white relative z-10 w-full shrink-0">
                            {currentStep === 0 && (
                                <button onClick={() => setCurrentStep(1)} className="w-full flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer outline-none border border-slate-900 hover:border-emerald-600">
                                    <span>Mulai Pengajuan</span>
                                    <i className="fas fa-arrow-right text-xs opacity-80"></i>
                                </button>
                            )}

                            {currentStep === 1 && (
                                <>
                                    <button onClick={() => setCurrentStep(0)} className="w-1/3 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-colors cursor-pointer border border-transparent">Kembali</button>
                                    <button onClick={() => {
                                        if (document.getElementById('tnc-check').checked) setCurrentStep(2);
                                        else {
                                            Swal.fire({
                                                title: 'Persetujuan Diperlukan',
                                                text: 'Anda harus menyetujui syarat & ketentuan sebelum melanjutkan.',
                                                icon: 'warning',
                                                confirmButtonText: 'Saya Mengerti',
                                                confirmButtonColor: '#10b981',
                                                customClass: {
                                                    popup: 'rounded-[2rem] font-sans',
                                                    confirmButton: 'rounded-xl px-6 py-3 font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition'
                                                }
                                            });
                                        }
                                    }} className="w-2/3 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border border-slate-900 hover:border-emerald-600">Setuju & Lanjutkan</button>
                                </>
                            )}

                            {currentStep === 2 && (
                                <>
                                    <button onClick={() => setCurrentStep(1)} className="w-1/3 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl hover:bg-slate-200 transition-colors cursor-pointer border border-transparent">Kembali</button>
                                    <button onClick={() => {
                                        if (formData.nik && formData.nama && formData.keperluan) {
                                            if (formData.nik.trim().length !== 16 || isNaN(formData.nik)) {
                                                Swal.fire({
                                                    title: 'Format NIK Tidak Valid',
                                                    text: 'Nomor Induk Kependudukan (NIK) harus terdiri dari 16 digit angka.',
                                                    icon: 'error',
                                                    confirmButtonText: 'Perbaiki NIK',
                                                    confirmButtonColor: '#ef4444',
                                                    customClass: {
                                                        popup: 'rounded-[2rem] font-sans',
                                                        confirmButton: 'rounded-xl px-6 py-3 font-bold text-sm bg-red-500 hover:bg-red-600 text-white transition'
                                                    }
                                                });
                                            } else {
                                                handleUploadClick();
                                            }
                                        } else {
                                            Swal.fire({
                                                title: 'Form Belum Lengkap',
                                                text: 'Harap lengkapi semua data pengajuan (NIK, Nama, dan Keperluan) sebelum mengirim berkas.',
                                                icon: 'error',
                                                confirmButtonText: 'Lengkapi Sekarang',
                                                confirmButtonColor: '#10b981',
                                                customClass: {
                                                    popup: 'rounded-[2rem] font-sans',
                                                    confirmButton: 'rounded-xl px-6 py-3 font-bold text-sm bg-emerald-500 hover:bg-emerald-600 text-white transition'
                                                }
                                            });
                                        }
                                    }} className="w-2/3 bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer border border-slate-900 hover:border-emerald-600">Upload & Kirim Berkas</button>
                                </>
                            )}

                            {currentStep === 4 && (
                                <button onClick={closeModal} className="w-full flex-1 bg-emerald-600 text-white font-bold py-4 rounded-2xl hover:bg-emerald-700 shadow-lg shadow-emerald-500/30 transition-colors cursor-pointer border border-transparent">
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
