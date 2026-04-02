import Link from 'next/link';

export default function WargaDashboard() {
    return (
        <div className="space-y-8 fade-in">
            {/* Welcome Banner */}
            <div className="bg-gradient-to-r from-brand-600 to-teal-500 rounded-3xl p-8 mb-8 text-white shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-3xl lg:text-4xl font-extrabold mb-3 tracking-tight">Selamat Pagi, Budi! ☀️</h1>
                    <p className="text-brand-50 mb-6 max-w-lg text-lg leading-relaxed font-medium">Apa yang ingin Anda lakukan hari ini? Ajukan dokumen penting atau mulai belanja dari UMKM tetangga kita.</p>
                    <div className="flex flex-wrap gap-4">
                        <Link href="/warga/layanan" className="bg-white text-brand-600 px-6 py-3 rounded-xl font-bold hover:bg-slate-50 transition shadow-sm text-sm">
                            <i className="fas fa-file-alt mr-2"></i> Buat Surat
                        </Link>
                        <Link href="/warga/pasar" className="bg-brand-700/50 backdrop-blur text-white px-6 py-3 rounded-xl font-bold hover:bg-brand-700 transition border border-brand-400 text-sm">
                            <i className="fas fa-store mr-2"></i> Belanja UMKM
                        </Link>
                    </div>
                </div>
                <i className="fas fa-user-friends absolute right-4 -bottom-12 text-[12rem] text-white opacity-10"></i>
            </div>

            {/* Stats/Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Surat Diproses</p>
                        <h3 className="text-3xl font-extrabold text-slate-900">1</h3>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 text-2xl">
                        <i className="fas fa-spinner fa-spin"></i>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Pesanan Aktif</p>
                        <h3 className="text-3xl font-extrabold text-slate-900">2</h3>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-2xl">
                        <i className="fas fa-box"></i>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition">
                    <div>
                        <p className="text-sm font-bold text-slate-500 mb-1">Laporan Komunitas</p>
                        <h3 className="text-3xl font-extrabold text-slate-900">0</h3>
                    </div>
                    <div className="w-14 h-14 rounded-full bg-purple-50 flex items-center justify-center text-purple-500 text-2xl">
                        <i className="fas fa-bullhorn"></i>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Letters */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Pengajuan Surat</h3>
                        <Link href="/warga/layanan" className="text-sm text-brand-600 font-bold hover:underline">Lihat Semua</Link>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mr-4 text-xl">
                                <i className="fas fa-file-signature"></i>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900">Surat Keterangan Tidak Mampu (SKTM)</h4>
                                <p className="text-xs text-slate-500 font-medium">Diajukan: 20 Mar 2026</p>
                            </div>
                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 border border-blue-200 rounded-lg">Diproses RT</span>
                        </div>
                        <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="w-12 h-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mr-4 text-xl">
                                <i className="fas fa-file-contract"></i>
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900">Surat Pengantar Domisili</h4>
                                <p className="text-xs text-slate-500 font-medium">Diajukan: 15 Feb 2026</p>
                            </div>
                            <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-100 border border-green-200 rounded-lg">Selesai</span>
                        </div>
                    </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold text-slate-900">Pesanan (UMKM)</h3>
                        <Link href="/warga/pesanan" className="text-sm text-brand-600 font-bold hover:underline">Lacak Pesanan</Link>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <img src="https://images.unsplash.com/photo-1605333396914-2561666fd0b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" className="w-14 h-14 rounded-xl object-cover mr-4" alt="Product" />
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900">Beras Merah Lokal (5kg)</h4>
                                <p className="text-xs text-slate-500 font-medium">Toko: Warung Makmur</p>
                            </div>
                            <div className="text-right">
                                <span className="block px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-orange-700 bg-orange-100 border border-orange-200 rounded-lg mb-2">Dikirim</span>
                                <span className="text-sm font-extrabold text-brand-600">Rp 75.000</span>
                            </div>
                        </div>
                        <div className="flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <img src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80" className="w-14 h-14 rounded-xl object-cover mr-4" alt="Product" />
                            <div className="flex-1">
                                <h4 className="font-bold text-slate-900">Keripik Pisang Coklat</h4>
                                <p className="text-xs text-slate-500 font-medium">Toko: Cemilan Neng Hani</p>
                            </div>
                            <div className="text-right">
                                <span className="block px-3 py-1 text-[10px] uppercase tracking-wider font-bold text-yellow-700 bg-yellow-100 border border-yellow-200 rounded-lg mb-2">Dikemas</span>
                                <span className="text-sm font-extrabold text-brand-600">Rp 30.000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
