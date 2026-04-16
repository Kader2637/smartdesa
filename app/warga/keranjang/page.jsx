"use client";

import Link from 'next/link';
import { useState } from 'react';
import { useSmartDesa } from '@/components/GlobalProvider';
import Swal from 'sweetalert2';

export default function KeranjangWarga() {
    const { cart, removeFromCart, updateQty, placeOrder } = useSmartDesa();
    const [paymentMethod, setPaymentMethod] = useState('Transfer Bank');
    const [isProcessing, setIsProcessing] = useState(false);

    const totalHarga = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    const ongkir = cart.length > 0 ? 5000 : 0;
    const grandTotal = totalHarga + ongkir;

    const handleCheckout = () => {
        setIsProcessing(true);
        setTimeout(() => {
            const orderId = placeOrder(paymentMethod);
            setIsProcessing(false);
            if (orderId) {
                Swal.fire({
                    title: '🎉 Pesanan Berhasil!',
                    html: `ID Pesanan: <b>${orderId}</b><br/>Metode: <b>${paymentMethod}</b>`,
                    icon: 'success',
                    confirmButtonText: 'Lihat Riwayat',
                    confirmButtonColor: '#10B981'
                });
            }
        }, 1500);
    };

    if (cart.length === 0) {
        return (
            <div className="space-y-8 fade-in flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center text-4xl mb-4">
                    <i className="fas fa-shopping-cart"></i>
                </div>
                <h2 className="text-xl font-bold text-slate-900">Keranjang Anda Kosong</h2>
                <p className="text-slate-500 mb-6">Mulai belanja produk UMKM lokal terbaik dari desa kita.</p>
                <Link href="/umkm" className="px-6 py-3 bg-brand-500 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-brand-600 transition">
                    <i className="fas fa-store"></i> Menuju Pasar Desa
                </Link>
            </div>
        );
    }

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
                    {cart.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center gap-4 relative">
                            <img src={item.img} className="w-20 h-20 rounded-xl object-cover" alt={item.nama} />
                            <div className="flex-1">
                                <span className="text-[10px] uppercase font-bold text-brand-600 mb-1 block">Toko: {item.penjual}</span>
                                <h3 className="font-bold text-slate-900 text-sm">{item.nama}</h3>
                                <p className="font-extrabold text-brand-600 text-sm mt-1">Rp {item.harga.toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 w-max mt-2 sm:mt-0">
                                <button onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))} className="text-slate-400 hover:text-slate-600 font-bold text-lg leading-none w-6 h-6 flex items-center justify-center">-</button>
                                <span className="font-bold text-sm text-slate-900 min-w-[1.5rem] text-center">{item.qty}</span>
                                <button onClick={() => updateQty(item.id, item.qty + 1)} className="text-brand-600 hover:text-brand-700 font-bold text-lg leading-none w-6 h-6 flex items-center justify-center">+</button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition"><i className="fas fa-trash-alt"></i></button>
                        </div>
                    ))}
                </div>

                {/* Ringkasan */}
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 h-max sticky top-24">
                    <h3 className="font-bold text-lg text-slate-900 mb-6">Ringkasan Belanja</h3>
                    
                    <div className="space-y-3 mb-6 border-b border-slate-100 pb-6">
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Total Harga ({cart.length} Barang)</span>
                            <span className="font-bold text-slate-900">Rp {totalHarga.toLocaleString('id-ID')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">Ongkos Kirim (BUMDes)</span>
                            <span className="font-bold text-slate-900">Rp {ongkir.toLocaleString('id-ID')}</span>
                        </div>
                    </div>
                    
                    <div className="flex justify-between mb-8 items-center">
                        <span className="font-bold text-slate-900">Total Tagihan</span>
                        <span className="text-xl font-extrabold text-brand-600">Rp {grandTotal.toLocaleString('id-ID')}</span>
                    </div>

                    <div className="mb-6">
                        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Metode Pembayaran</p>
                        <select 
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20 block"
                        >
                            <option value="Transfer Bank">Transfer Bank</option>
                            <option value="QRIS / GoPay">QRIS / GoPay</option>
                            <option value="COD">Bayar di Tempat (COD)</option>
                        </select>
                    </div>

                    <button 
                        onClick={handleCheckout}
                        disabled={isProcessing}
                        className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-brand-500 transition shadow-lg text-sm flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isProcessing ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-lock"></i>}
                        {isProcessing ? 'Memproses Pesanan...' : 'Bayar Sekarang'}
                    </button>
                </div>
            </div>
        </div>
    );
}
