import Link from 'next/link';

export default function SellerDashboard() {
    return (
        <div className="space-y-8 fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Ringkasan Toko Harian</h1>
                    <p className="text-slate-500">Pantau performa <span className="font-bold text-slate-700">Kopi Pak Budi</span> periode April 2026.</p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-2 bg-green-50 text-green-700 font-bold px-3 py-1.5 rounded-lg border border-green-200 text-sm">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div> Toko Buka
                    </span>
                    <button className="bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition font-bold text-sm">
                        <i className="fas fa-cog"></i>
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center text-lg mb-4">
                            <i className="fas fa-wallet"></i>
                        </div>
                        <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Pendapatan (Bln Ini)</p>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">Rp 4.250.000</h3>
                        <p className="text-xs font-bold text-green-500"><i className="fas fa-arrow-up mr-1"></i>+12.5% vs Bln lalu</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg mb-4">
                            <i className="fas fa-shopping-bag"></i>
                        </div>
                        <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Pesanan Baru</p>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">4 <span className="text-sm text-slate-500 font-medium">Pesanan</span></h3>
                        <p className="text-xs font-bold text-slate-500">Perlu diproses segera</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center text-lg mb-4">
                            <i className="fas fa-truck-fast"></i>
                        </div>
                        <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Sedang Dikirim</p>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">12 <span className="text-sm text-slate-500 font-medium">Paket</span></h3>
                        <p className="text-xs font-bold text-slate-500">Oleh Kurir BUMDes</p>
                    </div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
                    <div className="relative z-10">
                        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg mb-4">
                            <i className="fas fa-eye"></i>
                        </div>
                        <p className="text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Kunjungan Toko</p>
                        <h3 className="text-2xl font-extrabold text-slate-900 mb-2">842 <span className="text-sm text-slate-500 font-medium">Views</span></h3>
                        <p className="text-xs font-bold text-green-500"><i className="fas fa-arrow-up mr-1"></i>+5.2% vs Bln lalu</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Tugas Cepat */}
                <div className="lg:col-span-2 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Pesanan Menunggu Respon</h3>
                        <Link href="/seller/pesanan" className="text-sm font-bold text-brand-600 hover:text-brand-700">Lihat Semua</Link>
                    </div>
                    
                    <div className="space-y-4">
                        {[1, 2].map((i) => (
                            <div key={i} className="flex flex-col sm:flex-row gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-100">
                                <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=100&q=80" className="w-16 h-16 rounded-xl object-cover" alt="Product" />
                                <div className="flex-1">
                                    <div className="flex justify-between items-start mb-1">
                                        <h4 className="font-bold text-slate-900 text-sm">Kopi Arabika Gayo Asli (250gr)</h4>
                                        <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded uppercase">Baru</span>
                                    </div>
                                    <p className="text-xs text-slate-500 mb-2">INV/202604/00{i} • Bpk. Wawan (RT 01)</p>
                                    <p className="text-sm font-extrabold text-brand-600">2 x Rp 65.000 = Rp 130.000</p>
                                </div>
                                <div className="flex sm:flex-col justify-end gap-2 mt-4 sm:mt-0">
                                    <button className="bg-slate-900 text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-slate-800 transition">Terima Pesanan</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Info Produk */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 shadow-sm border border-slate-800 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-500/20 rounded-full blur-2xl"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-xl mb-6">
                            <i className="fas fa-box-open"></i>
                        </div>
                        <h3 className="text-xl font-bold mb-2">Performa Produk Anda</h3>
                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">2 dari 15 produk Anda mulai kehabisan stok. Perbarui ketersediaan untuk terus menerima pesanan warga.</p>
                        
                        <div className="mt-auto space-y-3">
                            <div className="flex justify-between items-center bg-white/10 p-3 rounded-xl border border-white/5">
                                <span className="text-sm font-medium">Total Produk Aktif</span>
                                <span className="font-bold">15</span>
                            </div>
                            <div className="flex justify-between items-center bg-red-500/20 p-3 rounded-xl border border-red-500/30">
                                <span className="text-sm font-medium text-red-200">Stok Menipis</span>
                                <span className="font-bold text-red-400">2</span>
                            </div>
                        </div>
                        <Link href="/seller/produk" className="mt-6 text-center w-full bg-brand-500 hover:bg-brand-600 text-white py-3 rounded-xl font-bold transition text-sm">Kelola Produk</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
