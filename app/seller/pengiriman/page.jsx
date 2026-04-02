"use client";

import { useState } from 'react';

export default function PengirimanSellerPage() {
    const [resiModal, setResiModal] = useState(false);
    const [trackModal, setTrackModal] = useState(false);
    const [activeDelivery, setActiveDelivery] = useState(null);
    const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

    const [deliveries, setDeliveries] = useState([
        { id: '#ORD-99001', type: 'lokal', status: 'sedang diantar', courier: 'Mulyadi', customer: 'Bu Sri (Luaran Desa)', product: 'Kopi Gayo 1kg', resi: '' },
        { id: '#ORD-99002', type: 'ekspedisi', status: 'sedang diantar', courier: '', customer: 'Bapak JND (Luar Kota)', product: 'Kerajinan Anyaman', resi: 'JNT88012000X' },
    ]);

    const showToast = (msg, type = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
    };

    const handleOpenResiModal = (d) => {
        setActiveDelivery(d);
        setResiModal(true);
    };

    const completeDelivery = () => {
        setDeliveries(deliveries.map(d => d.id === activeDelivery.id ? { ...d, status: 'selesai' } : d));
        setResiModal(false);
        showToast(`Pengiriman ${activeDelivery.id} berhasil diselesaikan!`);
    };

    return (
        <div className="space-y-6 fade-in min-h-[80vh]">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex flex-col">
                    <h1 className="font-bold text-slate-800 text-2xl leading-tight hidden md:block">Status Pengiriman</h1>
                    <p className="text-sm text-slate-500">Pantau perjalanan pesanan yang dikirim</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-6">
                <div className="p-5 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                    <h3 className="font-bold text-slate-800">Paket Dalam Perjalanan</h3>
                </div>

                <div className="divide-y divide-slate-100">
                    {deliveries.map(d => (
                        <div key={d.id} className="p-5 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 hover:bg-slate-50 transition">
                            <div className="flex gap-4">
                                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 ${d.type === 'lokal' ? 'bg-teal-50 text-teal-600' : 'bg-blue-50 text-blue-600'}`}>
                                    <i className={`fas ${d.type === 'lokal' ? 'fa-shipping-fast' : 'fa-truck-loading'}`}></i>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-lg">{d.id}</p>
                                    <p className="text-sm text-slate-500 font-medium">{d.customer}</p>
                                    <div className="flex items-center gap-2 mt-2">
                                        <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded border border-slate-200 font-medium whitespace-nowrap">
                                            <i className="fas fa-box text-slate-400 mr-1"></i> {d.product}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-1 w-full flex items-center px-4">
                                {d.type === 'lokal' ? (
                                    <ol className="relative border-l border-emerald-500 w-full pl-6 space-y-4">
                                        <li className="relative">
                                            <div className="absolute w-3 h-3 rounded-full -left-[1.65rem] top-1 bg-emerald-500"></div>
                                            <p className={`text-sm font-bold ${d.status === 'selesai' ? 'text-emerald-600' : 'text-slate-800'}`}>
                                                {d.status === 'selesai' ? 'Terkirim ke Pembeli' : 'Menuju Alamat Tujuan'}
                                            </p>
                                            <p className="text-xs text-slate-500">Kurir BUMDes - {d.courier}</p>
                                        </li>
                                    </ol>
                                ) : (
                                    <p className="text-sm text-slate-500 p-2 font-medium bg-slate-100 rounded-lg w-full text-center border-dashed border border-slate-300">
                                        Resi: <span className="font-bold text-slate-800 text-lg uppercase tracking-wider ml-2">{d.resi}</span>
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-col items-center justify-center gap-2 lg:border-l border-slate-100 lg:pl-6 w-full lg:w-48 mt-4 lg:mt-0">
                                {d.status === 'sedang diantar' && (
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">Sedang Diantar</span>
                                )}
                                {d.status === 'selesai' && (
                                    <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                                        <i className="fas fa-check mr-1"></i> Selesai
                                    </span>
                                )}

                                {/* Actions */}
                                {(d.type === 'lokal' && d.status !== 'selesai') && (
                                    <button 
                                        onClick={() => handleOpenResiModal(d)}
                                        className="w-full text-xs font-bold text-teal-700 hover:text-teal-800 border border-teal-200 bg-white hover:bg-teal-50 py-2 rounded-lg transition"
                                    >
                                        Konfirmasi COD
                                    </button>
                                )}
                                {d.type === 'ekspedisi' && (
                                    <button 
                                        onClick={() => { setActiveDelivery(d); setTrackModal(true); }}
                                        className="w-full text-xs font-bold text-slate-600 hover:text-slate-800 hover:bg-slate-100 py-2 rounded-lg transition border border-transparent"
                                    >
                                        <i className="fas fa-map-marker-alt mr-1"></i> Lacak Resi
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Selesai Modal (COD) */}
            {resiModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 text-left">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <h3 className="font-bold text-xl text-slate-800 mb-2">Konfirmasi Barang Sampai</h3>
                        <p className="text-sm text-slate-500 mb-6">Pastikan warga telah menerima paket <strong>{activeDelivery?.id}</strong> dan lunas dibayar jika menggunakan COD.</p>
                        
                        <div className="flex gap-3">
                            <button onClick={() => setResiModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition">Batal</button>
                            <button onClick={completeDelivery} className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition">Ya, Terkirim!</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Lacak Resi Ekspedisi Modal */}
            {trackModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 text-left">
                    <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button onClick={() => setTrackModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                            <i className="fas fa-times text-xl"></i>
                        </button>
                        <h3 className="font-bold text-xl text-slate-800 mb-1">Pelacakan Paket</h3>
                        <p className="text-sm font-bold mb-6 font-mono text-blue-600">{activeDelivery?.resi}</p>
                        
                        <div className="h-64 overflow-y-auto mb-4 pr-2">
                            <ol className="relative border-l border-slate-200 w-full pl-6 space-y-6">
                                <li className="relative">
                                    <div className="absolute w-4 h-4 rounded-full -left-[1.8rem] top-1 bg-emerald-400 border-4 border-white shadow"></div>
                                    <p className="text-sm font-bold text-emerald-600">Transit Terminal Bandung</p>
                                    <p className="text-xs text-slate-500">Menuju HUB pusat. (Hari ini, 08:30)</p>
                                </li>
                                <li className="relative">
                                    <div className="absolute w-3 h-3 rounded-full -left-[1.65rem] top-1 bg-slate-300"></div>
                                    <p className="text-sm font-bold text-slate-600">Terima oleh Kurir Ekspedisi</p>
                                    <p className="text-xs text-slate-500">Pick-up via gerai DesaSmart. (Kemarin, 19:10)</p>
                                </li>
                                <li className="relative">
                                    <div className="absolute w-3 h-3 rounded-full -left-[1.65rem] top-1 bg-slate-300"></div>
                                    <p className="text-sm font-bold text-slate-600">Pesanan Dibuat</p>
                                    <p className="text-xs text-slate-500">Resi telah di generate. (Kemarin, 15:00)</p>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {toast.show && (
                <div className="fixed bottom-6 right-6 z-[100] animate-in slide-in-from-bottom-5">
                    <div className="bg-slate-800 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${toast.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'}`}>
                            <i className={`fas ${toast.type === 'success' ? 'fa-check' : 'fa-info'}`}></i>
                        </div>
                        <p className="font-bold text-sm">{toast.msg}</p>
                    </div>
                </div>
            )}
        </div>
    );
}
