import Link from 'next/link';

export default function PesananWarga() {
    return (
        <div className="space-y-8 fade-in">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Status Pesanan</h1>
                    <p className="text-slate-500">Pantau proses pengiriman pesanan Anda secara real-time.</p>
                </div>
            </div>

            <div className="space-y-6">
                {/* Order 1 */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 relative">
                    <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
                        <div>
                            <span className="text-xs text-slate-400 font-bold mb-1 block">INV/20260402/UMKM/001</span>
                            <span className="text-sm font-bold text-slate-900">Toko: Warung Makmur</span>
                        </div>
                        <span className="px-3 py-1 text-[10px] uppercase font-bold text-orange-700 bg-orange-100 border border-orange-200 rounded-lg">Dikirim (Kurir BUMDes)</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <img src="https://images.unsplash.com/photo-1605333396914-2561666fd0b2?w=100&q=80" className="w-20 h-20 rounded-xl object-cover" alt="img" />
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900">Beras Merah Lokal (5kg)</h3>
                            <p className="text-sm text-slate-500 mt-1">1 x Rp 75.000</p>
                        </div>
                        <div className="text-left md:text-right border-l border-slate-100 pl-0 md:pl-6">
                            <p className="text-xs text-slate-400 font-bold mb-1">Total Belanja</p>
                            <p className="text-lg font-extrabold text-brand-600">Rp 75.000</p>
                        </div>
                    </div>

                    {/* Tracking Status */}
                    <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
                        <p className="text-sm font-bold text-slate-900 mb-4">Lacak Pengiriman</p>
                        <div className="flex items-start gap-4">
                            <div className="flex flex-col items-center">
                                <div className="w-6 h-6 rounded-full bg-brand-500 text-white flex items-center justify-center text-xs"><i className="fas fa-check"></i></div>
                                <div className="w-0.5 h-10 bg-brand-500"></div>
                                <div className="w-6 h-6 rounded-full bg-orange-400 text-white flex items-center justify-center text-xs animate-pulse"><i className="fas fa-truck"></i></div>
                                <div className="w-0.5 h-10 bg-slate-200"></div>
                                <div className="w-6 h-6 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center text-xs"><i className="fas fa-home"></i></div>
                            </div>
                            <div className="flex flex-col gap-5 pt-0.5 pb-1 w-full justify-between h-auto">
                                <div>
                                    <h4 className="text-sm font-bold text-slate-900">Pesanan Diproses Penjual</h4>
                                    <p className="text-xs text-slate-400">02 Apr 2026, 09:30</p>
                                </div>
                                <div className="mt-2">
                                    <h4 className="text-sm font-bold text-slate-900 text-orange-600">Pesanan Sedang Dikirim</h4>
                                    <p className="text-xs text-slate-400">Kurir BUMDes - Bpk. Agus (0812345678) • 02 Apr 2026, 13:45</p>
                                </div>
                                <div className="mt-4">
                                    <h4 className="text-sm font-bold text-slate-400">Pesanan Tiba di Tujuan</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order 2 */}
                <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
                    <div className="flex justify-between items-start mb-6 border-b border-slate-50 pb-4">
                        <div>
                            <span className="text-xs text-slate-400 font-bold mb-1 block">INV/20260402/UMKM/002</span>
                            <span className="text-sm font-bold text-slate-900">Toko: Cemilan Neng Hani</span>
                        </div>
                        <span className="px-3 py-1 text-[10px] uppercase font-bold text-yellow-700 bg-yellow-100 border border-yellow-200 rounded-lg">Dikemas Penjual</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <img src="https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=100&q=80" className="w-20 h-20 rounded-xl object-cover" alt="img" />
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-900">Keripik Pisang Coklat</h3>
                            <p className="text-sm text-slate-500 mt-1">2 x Rp 15.000</p>
                        </div>
                        <div className="text-left md:text-right border-l border-slate-100 pl-0 md:pl-6">
                            <p className="text-xs text-slate-400 font-bold mb-1">Total Belanja</p>
                            <p className="text-lg font-extrabold text-brand-600">Rp 30.000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
