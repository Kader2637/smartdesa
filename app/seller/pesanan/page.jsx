"use client";

import { useState } from 'react';

export default function PesananSellerPage() {
    const [activeTab, setActiveTab] = useState('baru');
    const [resiModal, setResiModal] = useState(false);
    const [activeOrder, setActiveOrder] = useState(null);
    const [resiNumber, setResiNumber] = useState('');
    const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

    const [orders, setOrders] = useState([
        { id: '#ORD-99120', status: 'baru', time: '30 Menit yang lalu', title: 'Kopi Arabika Gayo Asli (2x)', customer: 'Bu Ratna (RT 01)', price: 130000, img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=200&q=80', note: '' },
        { id: '#ORD-99119', status: 'baru', time: '1 Jam yang lalu', title: 'Madu Hutan Liar Murni (1x)', customer: 'Pak Joko (RT 04)', price: 85000, img: 'https://images.unsplash.com/photo-1587049352847-4d4b1ed748d3?w=200&q=80', note: 'Tolong double bubble wrap' },
        { id: '#ORD-99002', status: 'diproses', time: 'Kemarin', title: 'Keripik Singkong Level 5 (5x)', customer: 'Mbak Ajeng (Luaran Desa)', price: 75000, img: '', note: '' }
    ]);

    const showToast = (msg, type = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
    };

    const processOrder = (order) => {
        setOrders(orders.map(o => o.id === order.id ? { ...o, status: 'diproses' } : o));
        showToast(`Pesanan ${order.id} dipindahkan ke tahap kemas!`);
    };

    const handleOpenResiModal = (order) => {
        setActiveOrder(order);
        setResiNumber('');
        setResiModal(true);
    };

    const shipOrder = () => {
        setOrders(orders.map(o => o.id === activeOrder.id ? { ...o, status: 'dikirim' } : o));
        setResiModal(false);
        showToast(`Pesanan ${activeOrder.id} telah dikirim!`);
    };

    const filteredOrders = orders.filter(o => o.status === activeTab);
    const countBaru = orders.filter(o => o.status === 'baru').length;
    const countDiproses = orders.filter(o => o.status === 'diproses').length;

    return (
        <div className="space-y-6 fade-in min-h-[80vh]">
            <h1 className="font-bold text-slate-800 text-2xl hidden md:block mb-6">Pesanan Masuk</h1>

            {/* Tabs */}
            <div className="flex border-b border-slate-200 mb-6 font-medium text-sm">
                <button 
                    onClick={() => setActiveTab('baru')} 
                    className={`px-6 py-3 border-b-2 font-bold flex items-center gap-2 transition ${activeTab === 'baru' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Pesanan Baru {countBaru > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{countBaru}</span>}
                </button>
                <button 
                    onClick={() => setActiveTab('diproses')} 
                    className={`px-6 py-3 border-b-2 font-bold flex items-center gap-2 transition ${activeTab === 'diproses' ? 'border-emerald-500 text-emerald-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                >
                    Perlu Dikirim {countDiproses > 0 && <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full">{countDiproses}</span>}
                </button>
            </div>

            {/* Orders List */}
            <div className="space-y-4 relative">
                {filteredOrders.map(order => (
                    <div key={order.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition">
                        <div className="flex justify-between items-center mb-4 border-b border-slate-100 pb-3">
                            <div className="flex gap-3 items-center">
                                <span className="font-bold text-slate-800 tracking-wider">{order.id}</span>
                                <span className="text-xs text-slate-400"><i className="far fa-clock"></i> {order.time}</span>
                            </div>
                            <span className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide ${order.status === 'baru' ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-emerald-100 text-emerald-700'}`}>
                                {order.status === 'baru' ? 'Perlu Diproses' : 'Sedang Dikemas'}
                            </span>
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-6">
                            <div className="flex-1 flex gap-4">
                                <div className="w-20 h-20 rounded-xl bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                                    {order.img ? (
                                        <img src={order.img} className="w-full h-full object-cover" alt={order.title} />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-slate-400 bg-orange-50 text-orange-400">
                                            <i className="fas fa-box text-3xl"></i>
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-800 text-lg">{order.title}</h4>
                                    <p className="text-xs text-slate-600 font-semibold mb-2"><i className="fas fa-map-marker-alt text-emerald-500"></i> {order.customer}</p>
                                    {order.note && (
                                        <div className="bg-yellow-50 text-yellow-700 text-xs px-2 py-1 flex items-center gap-1 rounded border border-yellow-200 w-max">
                                            <i className="fas fa-comment-dots"></i> Catatan: "{order.note}"
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <div className="w-full md:w-64 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 flex flex-col justify-center">
                                <p className="text-sm text-slate-500 mb-1">Total Pendapatan</p>
                                <p className="text-xl font-extrabold text-emerald-600 mb-4">Rp {order.price.toLocaleString('id-ID')}</p>
                                
                                {order.status === 'baru' && (
                                    <button onClick={() => processOrder(order)} className="w-full bg-emerald-500 text-white font-bold py-2 rounded-xl text-sm shadow cursor-pointer hover:bg-emerald-600 transition">
                                        Terima & Kemas
                                    </button>
                                )}
                                {order.status === 'diproses' && (
                                    <button onClick={() => handleOpenResiModal(order)} className="w-full border-2 border-emerald-500 text-emerald-600 font-bold py-2.5 rounded-xl text-sm shadow-sm hover:bg-emerald-50 transition">
                                        Input Resi & Kirim
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}

                {/* Empty State */}
                {filteredOrders.length === 0 && (
                    <div className="text-center p-12 bg-white rounded-2xl border border-dashed border-slate-300">
                        <i className="fas fa-box-open text-4xl text-slate-300 mb-3 block"></i>
                        <p className="text-slate-500 font-medium block">Tidak ada pesanan di kategori ini.</p>
                    </div>
                )}
            </div>

            {/* Input Resi Modal */}
            {resiModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 text-left">
                    <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-xl text-slate-800">Kirim Pesanan</h3>
                        </div>
                        <div className="p-6">
                            <p className="text-sm text-slate-500 mb-4">Pilih jasa logistik dan masukkan nomor resi untuk pesanan <strong>{activeOrder?.id}</strong>.</p>
                            <div className="mb-4">
                                <label className="block text-sm font-bold text-slate-700 mb-2">Kurir Pengiriman</label>
                                <select className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
                                    <option>Kurir BUMDes (Lokal)</option>
                                    <option>JNT Express</option>
                                    <option>JNE Reguler</option>
                                </select>
                            </div>
                            <div className="mb-2">
                                <label className="block text-sm font-bold text-slate-700 mb-2">No. Resi Pengiriman</label>
                                <input 
                                    type="text" 
                                    placeholder="Kosongkan jika Kurir Lokal" 
                                    value={resiNumber}
                                    onChange={(e) => setResiNumber(e.target.value)}
                                    className="w-full border border-slate-200 rounded-lg px-4 py-3 uppercase focus:outline-none focus:ring-2 focus:ring-emerald-500 font-bold text-slate-800 tracking-wider"
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                            <button onClick={() => setResiModal(false)} className="px-4 py-2 bg-slate-200 font-bold text-slate-600 rounded-lg transition hover:bg-slate-300">Batal</button>
                            <button onClick={shipOrder} className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-lg transition">Kirim Barang</button>
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
