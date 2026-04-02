"use client";

import { useState } from 'react';

export default function PendapatanSellerPage() {
    const [modalTarik, setModalTarik] = useState(false);
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [balance, setBalance] = useState(1450000);
    const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });

    const [records, setRecords] = useState([
        { id: 1, type: 'in', title: 'Pemasukan Pesanan Selesai', desc: '#ORD-98921 - Dari BUMDes Pay', time: 'Hari ini, 14:02', amount: 130000, status: 'sukses', label: 'Berhasil' },
        { id: 2, type: 'in', title: 'Pemasukan Pesanan Selesai', desc: '#ORD-98910 - Dari DANA', time: 'Kemarin, 10:15', amount: 85000, status: 'sukses', label: 'Berhasil' },
        { id: 3, type: 'out', title: 'Penarikan Saldo', desc: 'Bank BRI a.n Budi Mulya ****1120', time: '28 Mar 2026, 09:00', amount: 2000000, status: 'sukses', label: 'Sukses Cair' }
    ]);

    const showToast = (msg, type = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
    };

    const processWithdraw = () => {
        const w = parseInt(withdrawAmount);
        if (isNaN(w) || w < 50000) {
            return showToast('Penarikan minimal Rp 50.000!', 'error');
        }
        if (w > balance) {
            return showToast('Saldo Anda tidak mencukupi!', 'error');
        }

        setBalance(balance - w);
        setRecords([{
            id: Date.now(), 
            type: 'out', 
            title: 'Penarikan Saldo Instan', 
            desc: 'Bank BRI a.n Budi Mulya ****1120', 
            time: 'Baru saja', 
            amount: w, 
            status: 'proses', 
            label: 'Proses Transfer'
        }, ...records]);
        
        setModalTarik(false);
        setWithdrawAmount('');
        showToast(`Dana ditarik sebesar Rp ${w.toLocaleString('id-ID')}! Sedang di proses Bank.`);
    };

    return (
        <div className="space-y-6 fade-in min-h-[80vh]">
            <div className="flex items-center gap-4 mb-6">
                <div className="flex flex-col">
                    <h1 className="font-bold text-slate-800 text-2xl leading-tight hidden md:block">Riwayat Pendapatan</h1>
                    <p className="text-sm text-slate-500">Mutasi Rekening Toko</p>
                </div>
            </div>

            {/* Saldo Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white mb-8 relative overflow-hidden flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Deco bg */}
                <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-10 -translate-y-10">
                    <i className="fas fa-coins text-9xl"></i>
                </div>
                
                <div className="relative z-10 text-center md:text-left">
                    <p className="text-emerald-100 font-medium mb-1 tracking-wider uppercase text-xs">Total Saldo Bisa Ditarik</p>
                    <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">Rp {balance.toLocaleString('id-ID')}</h2>
                </div>
                <button 
                    onClick={() => setModalTarik(true)} 
                    className="relative z-10 bg-white text-emerald-600 font-bold px-8 py-3.5 rounded-xl text-lg hover:shadow-xl transition flex items-center gap-2 hover:bg-emerald-50"
                >
                    <i className="fas fa-hand-holding-usd"></i> Tarik Dana
                </button>
            </div>

            {/* Mutasi Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                    <h3 className="font-bold text-slate-800 text-lg">Catatan Mutasi Terbaru</h3>
                </div>

                <div className="divide-y divide-slate-100">
                    {records.map(rec => (
                        <div key={rec.id} className="p-5 flex justify-between items-center hover:bg-slate-50 transition">
                            <div className="flex items-start gap-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl flex-shrink-0 ${rec.type === 'in' ? 'bg-emerald-50 text-emerald-500' : 'bg-red-50 text-red-500'}`}>
                                    <i className={`fas ${rec.type === 'in' ? 'fa-arrow-down' : 'fa-arrow-up'}`}></i>
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800 text-lg">{rec.title}</p>
                                    <p className="text-sm text-slate-500">{rec.desc}</p>
                                    <p className="text-xs text-slate-400 mt-1">{rec.time}</p>
                                </div>
                            </div>
                            <div className="text-right flex-shrink-0">
                                <p className={`text-xl font-extrabold ${rec.type === 'in' ? 'text-emerald-600' : 'text-red-600'}`}>
                                    {rec.type === 'in' ? '+' : '-'} Rp {rec.amount.toLocaleString('id-ID')}
                                </p>
                                <span className={`text-xs font-bold px-2 rounded-lg py-0.5 whitespace-nowrap ${rec.status === 'sukses' ? 'text-emerald-600 bg-emerald-100' : 'text-blue-600 bg-blue-100'}`}>
                                    {rec.label}
                                </span>
                            </div>
                        </div>
                    ))}
                    
                    {records.length === 0 && (
                        <div className="p-8 text-center text-slate-500">
                            Belum ada riwayat transaksi.
                        </div>
                    )}
                </div>
            </div>

            {/* Modal Tarik Saldo */}
            {modalTarik && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 text-left">
                    <div className="bg-white rounded-3xl w-full max-w-sm p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <h3 className="font-extrabold text-2xl text-slate-800 mb-2">Tarik Saldo</h3>
                        <p className="text-sm text-slate-500 mb-6">Pindahkan dana hasil penjualan ke rekening Bank pribadi Anda secara instan.</p>
                        
                        <div className="bg-emerald-50 rounded-xl p-4 mb-6 border border-emerald-100 text-center">
                            <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mb-1">Total Yang Bisa Ditarik</p>
                            <p className="text-2xl font-extrabold text-emerald-700">Rp {balance.toLocaleString('id-ID')}</p>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Jumlah Penarikan (Rp)</label>
                            <input 
                                type="number" 
                                value={withdrawAmount}
                                onChange={(e) => setWithdrawAmount(e.target.value)}
                                placeholder="Minimal Rp 50.000" 
                                className="w-full border border-slate-200 rounded-lg px-4 py-3 text-lg font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-sm font-bold text-slate-700 mb-2">Rekening Tujuan</label>
                            <select className="w-full border border-slate-200 rounded-lg px-4 py-3 text-sm font-medium text-slate-600 bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-slate-100">
                                <option>BRI - 0989xxxx1120 (a.n Budi)</option>
                                <option className="text-emerald-600 font-bold">+ Tambah Rekening Lain</option>
                            </select>
                        </div>
                        
                        <div className="flex gap-3 mt-8">
                            <button onClick={() => setModalTarik(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl hover:bg-slate-200 transition">Batal</button>
                            <button onClick={processWithdraw} className="flex-1 py-3 bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-600 transition">Tarik Sekarang</button>
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
