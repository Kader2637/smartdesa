import Link from 'next/link';

export default function KeranjangWarga() {
    return (
        <div className="space-y-8 fade-in">
            <div className="flex items-end justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Keranjang Belanja</h1>
                    <p className="text-slate-500">Periksa kembali pesanan Anda sebelum checkout.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {/* Item 1 */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 relative">
                        <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=100&q=80" className="w-20 h-20 rounded-xl object-cover" alt="img" />
                        <div className="flex-1">
                            <span className="text-[10px] uppercase font-bold text-brand-600 mb-1 block">Toko: Pak Budi</span>
                            <h3 className="font-bold text-slate-900 text-sm">Kopi Arabika Gayo Asli</h3>
                            <p className="font-extrabold text-brand-600 text-sm mt-1">Rp 65.000</p>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                            <button className="text-slate-400 hover:text-slate-600 font-bold text-lg leading-none">-</button>
                            <span className="font-bold text-sm text-slate-900">2</span>
                            <button className="text-brand-600 hover:text-brand-700 font-bold text-lg leading-none">+</button>
                        </div>
                        <button className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition"><i className="fas fa-trash-alt"></i></button>
                    </div>

                    {/* Item 2 */}
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 relative">
                        <img src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=100&q=80" className="w-20 h-20 rounded-xl object-cover" alt="img" />
                        <div className="flex-1">
                            <span className="text-[10px] uppercase font-bold text-brand-600 mb-1 block">Toko: Mpok Nori</span>
                            <h3 className="font-bold text-slate-900 text-sm">Keripik Singkong Pedas</h3>
                            <p className="font-extrabold text-brand-600 text-sm mt-1">Rp 15.000</p>
                        </div>
                        <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
                            <button className="text-slate-400 hover:text-slate-600 font-bold text-lg leading-none">-</button>
                            <span className="font-bold text-sm text-slate-900">1</span>
                            <button className="text-brand-600 hover:text-brand-700 font-bold text-lg leading-none">+</button>
                        </div>
                        <button className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition"><i className="fas fa-trash-alt"></i></button>
                    </div>
                </div>

                {/* Ringkasan */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-max sticky top-24">
                    <h3 className="font-bold text-lg text-slate-900 mb-6">Ringkasan Belanja</h3>
                    
                    <div className="space-y-3 mb-6 border-b border-slate-100 pb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Total Harga (3 Barang)</span>
                            <span className="font-bold text-slate-900">Rp 145.000</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Ongkos Kirim (BUMDes)</span>
                            <span className="font-bold text-slate-900">Rp 5.000</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between mb-8 items-center">
                        <span className="font-bold text-slate-900">Total Tagihan</span>
                        <span className="text-xl font-extrabold text-brand-600">Rp 150.000</span>
                    </div>

                    <button className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-brand-500 transition shadow-lg text-sm">
                        Lanjut Pembayaran (QRIS)
                    </button>
                </div>
            </div>
        </div>
    );
}
