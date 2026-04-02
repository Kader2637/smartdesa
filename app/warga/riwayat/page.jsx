import Link from 'next/link';

export default function RiwayatBelanjaWarga() {
    return (
        <div className="space-y-8 fade-in">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Riwayat Belanja</h1>
                    <p className="text-slate-500">Daftar transaksi UMKM yang pernah Anda selesaikan.</p>
                </div>
            </div>

            <div className="space-y-6">
                {[1, 2, 3].map((item) => (
                    <div key={item} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition">
                        <div className="flex justify-between items-start mb-4 border-b border-slate-50 pb-4">
                            <div>
                                <span className="text-xs text-slate-400 font-bold mb-1 block">28 Mar 2026 • Selesai</span>
                                <span className="text-sm font-bold text-slate-900">Toko: Kopi Pak Budi</span>
                            </div>
                            <button className="text-sm bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-bold transition">Beli Lagi</button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-6 mb-4">
                            <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=100&q=80" className="w-20 h-20 rounded-xl object-cover" alt="img" />
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-900">Kopi Arabika Gayo Asli (250gr)</h3>
                                <p className="text-sm text-slate-500 mt-1">1 x Rp 65.000</p>
                            </div>
                            <div className="text-left md:text-right border-l border-slate-100 pl-0 md:pl-6">
                                <p className="text-xs text-slate-400 font-bold mb-1">Total Belanja</p>
                                <p className="text-lg font-extrabold text-slate-900">Rp 65.000</p>
                            </div>
                        </div>
                        <div className="bg-brand-50 p-3 rounded-lg border border-brand-100 text-sm">
                            <p className="text-brand-700 font-medium">⭐ Anda memberikan rating 5 Bintang untuk pesanan ini.</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
