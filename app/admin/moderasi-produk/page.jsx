"use client";

import { useState } from 'react';
import Swal from 'sweetalert2';

export default function ModerasiProdukPage() {
    const [activeTab, setActiveTab] = useState('pending');
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [rejectReason, setRejectReason] = useState('');

    const [products, setProducts] = useState([
        {
            id: 1, name: 'Kopi Robusta Lereng Arjuno (250g)', shop: 'UMKM Abah Jajang', category: 'Minuman', price: 'Rp 45.000', stock: 24, status: 'pending',
            image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=300&q=80',
            desc: 'Kopi asli yang ditanam di lereng gunung Arjuno oleh petani lokal. Dipetik dari biji merah pilihan dan di-roasting medium dark. Harum dan mantap.'
        },
        {
            id: 2, name: 'Kerajinan Anyaman Bambu Set', shop: 'Karya Ibu PKK', category: 'Kerajinan', price: 'Rp 120.000', stock: 5, status: 'pending',
            image: 'https://images.unsplash.com/photo-1516707328634-11005fb4142f?w=300&q=80',
            desc: 'Satu set anyaman bambu berisi 3 rantang. Asli buatan tangan ibu-ibu PKK desa. Cocok untuk hiasan atau tempat penyajian makanan tradisional.'
        },
        {
            id: 3, name: 'Beras Organik Mentik Wangi', shop: 'Koperasi Tani Makmur', category: 'Sembako', price: 'Rp 75.000', stock: 100, status: 'pending',
            image: 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=300&q=80',
            desc: 'Beras hasil panen warga desa. 100% Organik tanpa pestisida kimia, pulen dan sangat wangi. Kemasan zak 5 Kg.'
        },
        {
            id: 4, name: 'Sambal Pecel Khas Desa', shop: 'Warung Bu Sri', category: 'Makanan', price: 'Rp 25.000', stock: 15, status: 'approved',
            image: 'https://images.unsplash.com/photo-1596649281559-86bc2e8251e6?w=300&q=80',
            desc: 'Sambal pecel pedas sedang racikan Bu Sri. Tahan 1 bulan di suhu ruang. Dibuat menggunakan kacang tanah oven kualitas super.'
        },
        {
            id: 5, name: 'Parang/Golok Tajam', shop: 'Pandai Besi Pak Slamet', category: 'Perkakas', price: 'Rp 150.000', stock: 2, status: 'rejected', reason: 'Foto produk melanggar standar (terlalu gelap dan menampilkan benda tajam tanpa sensor). Silakan unggah foto yang lebih aman sesuai panduan desa.',
            image: 'https://images.unsplash.com/photo-1584857467334-727b3d30b656?w=300&q=80',
            desc: 'Golok baja asli untuk keperluan berkebun dan bertani.'
        }
    ]);

    const filteredProducts = products.filter(p => p.status === activeTab);

    const openDetail = (product) => {
        setSelectedProduct(product);
        setShowDetailModal(true);
    };

    const approveProduct = (product) => {
        Swal.fire({
            title: 'Setujui Produk?',
            html: `Produk <b>${product.name}</b> akan ditayangkan di Marketplace.`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Ya, Setujui!',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#10B981'
        }).then(result => {
            if (result.isConfirmed) {
                setProducts(products.map(p => p.id === product.id ? { ...p, status: 'approved' } : p));
                Swal.fire({ title: 'Disetujui!', text: 'Produk kini tayang di Marketplace.', icon: 'success', timer: 1500, showConfirmButton: false });
            }
        });
    };

    const openRejectModal = (product) => {
        setSelectedProduct(product);
        Swal.fire({
            title: 'Tolak Produk?',
            html: `Berikan alasan penolakan untuk <b>${product.name}</b>:`,
            input: 'textarea',
            inputPlaceholder: 'Misal: Foto produk terlalu buram, silakan upload ulang...',
            showCancelButton: true,
            confirmButtonText: 'Tolak Produk',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#EF4444',
            inputValidator: (value) => {
                if (!value) return 'Alasan penolakan tidak boleh kosong!';
            }
        }).then(result => {
            if (result.isConfirmed) {
                setProducts(products.map(p => p.id === product.id ? { ...p, status: 'rejected', reason: result.value } : p));
                Swal.fire({ title: 'Ditolak', text: 'Produk telah ditolak dan penjual akan diberitahu.', icon: 'error', timer: 1500, showConfirmButton: false });
            }
        });
    };

    const confirmReject = () => {
        // kept for compatibility but now handled by Swal inline
    };

    return (
        <div className="space-y-6 fade-in min-h-[80vh]">
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Moderasi Produk UMKM</h2>
                    <p className="text-slate-500 text-sm mt-1">Verifikasi kelayakan, foto, dan harga produk sebelum tayang di Marketplace.</p>
                </div>
            </div>

            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-2 mb-6">
                <button 
                    onClick={() => setActiveTab('pending')}
                    className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${activeTab === 'pending' ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <i className="fas fa-clock"></i> Menunggu Validasi
                    <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full">{products.filter(p => p.status === 'pending').length}</span>
                </button>
                <button 
                    onClick={() => setActiveTab('approved')}
                    className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${activeTab === 'approved' ? 'bg-emerald-100 text-emerald-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <i className="fas fa-check-circle"></i> Disetujui
                </button>
                <button 
                    onClick={() => setActiveTab('rejected')}
                    className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${activeTab === 'rejected' ? 'bg-red-100 text-red-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                    <i className="fas fa-times-circle"></i> Ditolak
                </button>
            </div>

            <div className="space-y-4">
                {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col md:flex-row gap-4 items-start md:items-center transition hover:shadow-md">
                        <img src={product.image} alt="Product" className="w-24 h-24 object-cover rounded-lg border border-slate-100" />
                        
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-500">{product.category}</span>
                            </div>
                            <h3 className="text-base font-bold text-slate-800">{product.name}</h3>
                            <p className="text-sm text-slate-500 mb-2"><i className="fas fa-store mr-1"></i> <span>{product.shop}</span></p>
                            <div className="flex gap-4 text-sm font-semibold">
                                <span className="text-emerald-600">{product.price}</span>
                                <span className="text-slate-400">Stok: <span>{product.stock}</span></span>
                            </div>
                            {product.status === 'rejected' && (
                                <p className="text-xs text-red-600 mt-2 bg-red-50 p-2 rounded border border-red-100">
                                    <strong>Alasan Ditolak:</strong> <span>{product.reason}</span>
                                </p>
                            )}
                        </div>

                        <div className="flex flex-col gap-2 w-full md:w-auto mt-4 md:mt-0">
                            <button onClick={() => openDetail(product)} className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-slate-200 transition">
                                <i className="fas fa-eye mr-1"></i> Detail
                            </button>

                            {product.status === 'pending' && (
                                <div className="flex gap-2">
                                    <button onClick={() => approveProduct(product)} className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm shadow-emerald-500/30 hover:bg-emerald-700 transition">
                                        <i className="fas fa-check mr-1"></i> Setujui
                                    </button>
                                    <button onClick={() => openRejectModal(product)} className="flex-1 bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-100 transition tooltip" title="Tolak">
                                        <i className="fas fa-times"></i>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                {filteredProducts.length === 0 && (
                    <div className="bg-white rounded-xl border border-slate-200 border-dashed p-10 text-center animate-in fade-in zoom-in-95">
                        <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                            <i className="fas fa-box-open"></i>
                        </div>
                        <h3 className="text-base font-bold text-slate-800">Tidak ada produk</h3>
                        <p className="text-sm text-slate-500 mt-1">Daftar produk untuk kategori ini masih kosong.</p>
                    </div>
                )}
            </div>

            {/* Modal Detail */}
            {showDetailModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowDetailModal(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 z-10 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-slate-800">Detail Lengkap Produk</h3>
                            <button onClick={() => setShowDetailModal(false)} className="text-slate-400 hover:text-slate-700 bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition">
                                <i className="fas fa-times"></i>
                            </button>
                        </div>
                        <div>
                            <img src={selectedProduct.image} className="w-full h-48 object-cover rounded-xl mb-4 border border-slate-100" alt="Product Zoom" />
                            <h4 className="text-xl font-bold text-slate-800">{selectedProduct.name}</h4>
                            <p className="text-sm text-slate-500 mb-4"><i className="fas fa-store text-emerald-500 mr-1"></i> {selectedProduct.shop}</p>

                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-4">
                                <p className="text-sm text-slate-700 font-bold mb-1">Deskripsi:</p>
                                <p className="text-sm text-slate-600 leading-relaxed">{selectedProduct.desc}</p>
                            </div>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button onClick={() => setShowDetailModal(false)} className="bg-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-300 transition">Tutup Detail</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Tolak */}
            {showRejectModal && selectedProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={() => setShowRejectModal(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 z-10 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-lg font-bold text-red-600 flex items-center gap-2">
                                <i className="fas fa-exclamation-triangle"></i> Tolak Produk
                            </h3>
                            <button onClick={() => setShowRejectModal(false)} className="text-slate-400 hover:text-slate-700"><i className="fas fa-times text-xl"></i></button>
                        </div>

                        <p className="text-sm text-slate-600 mb-4 leading-relaxed">Berikan alasan kenapa produk <strong className="text-slate-800">{selectedProduct.name}</strong> dari <strong className="text-slate-800">{selectedProduct.shop}</strong> ditolak. Alasan ini akan dibaca oleh UMKM.</p>

                        <textarea 
                            value={rejectReason}
                            onChange={(e) => setRejectReason(e.target.value)}
                            rows="3" 
                            className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition" 
                            placeholder="Misal: Foto produk terlalu buram, silakan upload ulang dengan foto yang lebih terang."
                        ></textarea>

                        <div className="mt-6 flex justify-end gap-3">
                            <button onClick={() => setShowRejectModal(false)} className="bg-slate-100 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-200 transition">Batal</button>
                            <button onClick={confirmReject} className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-red-500/30 hover:bg-red-700 transition">Konfirmasi Tolak</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Toast Notification */}
            {showToast && (
                <div className="fixed bottom-6 right-6 bg-emerald-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-4 z-[100] animate-in slide-in-from-bottom-5">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                        <i className="fas fa-check-circle text-xl"></i>
                    </div>
                    <div>
                        <p className="font-bold text-sm">Berhasil Disetujui!</p>
                        <p className="text-xs text-emerald-100">Produk kini tayang di Marketplace.</p>
                    </div>
                </div>
            )}
        </div>
    );
}
