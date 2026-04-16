"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSmartDesa } from '@/components/GlobalProvider';
import Swal from 'sweetalert2';

export default function PasarDesaWarga() {
    const { products, addToCart } = useSmartDesa();
    const router = useRouter();
    const [modalData, setModalData] = useState(null);
    const [cartQty, setCartQty] = useState(1);

    const openModal = (item) => {
        setModalData(item);
        setCartQty(1);
    };

    return (
        <div className="space-y-8 fade-in">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 mb-2">Pasar Desa</h1>
                    <p className="text-slate-500">Dukung UMKM tetangga. Beli produk lokal berkualitas langsung dari aplikasi.</p>
                </div>
                <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <input type="text" placeholder="Cari produk..." className="px-4 py-2 outline-none w-48 lg:w-64" />
                    <button className="bg-brand-500 text-white px-4 py-2 hover:bg-brand-600 transition"><i className="fas fa-search"></i></button>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(item => (
                    <div key={item.id} onClick={() => openModal(item)} className="bg-white rounded-2xl p-3 shadow-sm border border-slate-100 hover:shadow-md transition cursor-pointer group">
                        <div className="relative aspect-square overflow-hidden rounded-xl mb-3 bg-slate-100">
                            <img src={item.img} alt={item.nama} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[10px] font-bold text-slate-700 uppercase">{item.kategori}</span>
                        </div>
                        <h3 className="font-bold text-slate-900 text-sm mb-1 leading-tight line-clamp-2">{item.nama}</h3>
                        <p className="text-xs text-slate-400 mb-2">{item.penjual}</p>
                        <div className="flex justify-between items-center mt-2 pt-2 border-t border-slate-50">
                            <span className="font-extrabold text-brand-600 text-sm">Rp {item.harga.toLocaleString('id-ID')}</span>
                            <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-bold">⭐ {item.rating}</span>
                        </div>
                        <div className="mt-2 text-[10px] font-bold text-slate-400">
                            Stok: {item.stock} unit
                        </div>
                    </div>
                ))}
            </div>

            {/* Modal Detail Produk */}
            {modalData && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl p-6 lg:p-8 max-w-2xl w-full relative shadow-2xl flex flex-col md:flex-row gap-8">
                        <button onClick={() => setModalData(null)} className="absolute top-4 right-4 w-8 h-8 md:top-6 md:right-6 md:w-10 md:h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500 z-10">X</button>
                        
                        <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden bg-slate-100">
                            <img src={modalData.img} alt={modalData.nama} className="w-full h-full object-cover" />
                        </div>
                        
                        <div className="w-full md:w-1/2 flex flex-col pt-2 md:pt-0">
                            <span className="text-brand-600 font-bold text-[10px] md:text-xs uppercase tracking-wider mb-1">{modalData.kategori}</span>
                            <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-2 leading-tight">{modalData.nama}</h3>
                            <p className="text-slate-500 mb-4 text-xs md:text-sm">Produk olahan asli dari {modalData.penjual}. Kualitas terjamin dan dibuat dengan bahan pilihan terbaik.</p>
                            
                            <div className="mt-auto">
                                <div className="flex justify-between items-end mb-6">
                                    <div>
                                        <p className="text-[10px] text-slate-400 font-bold mb-1">TOTAL HARGA</p>
                                        <p className="text-2xl font-extrabold text-slate-900">Rp {(modalData.harga * cartQty).toLocaleString('id-ID')}</p>
                                    </div>
                                    <div className="flex items-center gap-3 bg-slate-100 rounded-xl p-1">
                                        <button 
                                            onClick={() => setCartQty(q => Math.max(1, q - 1))}
                                            className="w-8 h-8 rounded-lg bg-white text-slate-600 font-bold shadow-sm hover:bg-slate-50"
                                        >-</button>
                                        <span className="text-sm font-bold w-4 text-center">{cartQty}</span>
                                        <button 
                                            onClick={() => setCartQty(q => Math.min(modalData.stock, q + 1))}
                                            className="w-8 h-8 rounded-lg bg-white text-slate-600 font-bold shadow-sm hover:bg-slate-50"
                                        >+</button>
                                    </div>
                                </div>
                                
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => {
                                            if (modalData.stock === 0) return Swal.fire('Stok Habis', 'Maaf, produk ini sedang kosong.', 'error');
                                            addToCart(modalData, cartQty);
                                            Swal.fire({
                                                title: 'Berhasil!',
                                                text: `${cartQty}x ${modalData.nama} ditambahkan ke keranjang.`,
                                                icon: 'success',
                                                toast: true,
                                                position: 'top-end',
                                                showConfirmButton: false,
                                                timer: 2000
                                            });
                                            setModalData(null);
                                        }}
                                        className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-50 transition text-sm shadow-sm"
                                    >
                                        + Keranjang
                                    </button>
                                    <button 
                                        onClick={() => {
                                            if (modalData.stock === 0) return Swal.fire('Stok Habis', 'Maaf, produk ini sedang kosong.', 'error');
                                            addToCart(modalData, cartQty);
                                            setModalData(null);
                                            router.push('/warga/keranjang');
                                        }}
                                        className="flex-1 bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-emerald-600 transition text-sm shadow-lg shadow-slate-900/20 hover:shadow-emerald-500/30"
                                    >
                                        Beli Langsung
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
