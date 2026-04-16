"use client";

import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

export default function ProdukSellerPage() {
    // State
    const [search, setSearch] = useState('');
    const [toast, setToast] = useState({ show: false, msg: '', type: 'success' });
    const [addProductModal, setAddProductModal] = useState(false);
    const [editPriceModal, setEditPriceModal] = useState(false);
    const [editStockModal, setEditStockModal] = useState(false);
    
    const [activeProduct, setActiveProduct] = useState(null);
    const [tempVal, setTempVal] = useState(0);
    const [newProduct, setNewProduct] = useState({ name: '', category: 'Kuliner', price: 0, stock: 0 });

    const [products, setProducts] = useState([
        { id: 1, name: 'Kopi Arabika Gayo Asli', sold: 342, category: 'Pertanian', price: 65000, stock: 45, img: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=100&q=80' },
        { id: 2, name: 'Kerajinan Anyaman Bambu', sold: 89, category: 'Kerajinan', price: 120000, stock: 0, img: '' },
        { id: 3, name: 'Madu Hutan Liar Murni (250ml)', sold: 512, category: 'Pertanian', price: 85000, stock: 12, img: 'https://images.unsplash.com/photo-1587049352847-4d4b1ed748d3?w=100&q=80' }
    ]);

    // Derived state
    const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

    // Helpers
    const showToast = (msg, type = 'success') => {
        setToast({ show: true, msg, type });
        setTimeout(() => setToast({ show: false, msg: '', type: 'success' }), 3000);
    };

    // Actions
    const handleOpenAddModal = () => {
        setNewProduct({ name: '', category: 'Kuliner', price: 0, stock: 0 });
        setAddProductModal(true);
    };

    const saveNewProduct = () => {
        if (!newProduct.name || newProduct.price <= 0) {
            return showToast('Data produk tidak valid!', 'error');
        }
        setProducts([{
            id: Date.now(), 
            name: newProduct.name, 
            category: newProduct.category,
            price: parseInt(newProduct.price), 
            stock: parseInt(newProduct.stock), 
            sold: 0, 
            img: ''
        }, ...products]);
        setAddProductModal(false);
        showToast(`Produk ${newProduct.name} berhasil ditambahkan!`);
    };

    const handleOpenEditPrice = (prod) => {
        setActiveProduct(prod);
        setTempVal(prod.price);
        setEditPriceModal(true);
    };

    const savePrice = () => {
        setProducts(products.map(p => p.id === activeProduct.id ? { ...p, price: parseInt(tempVal) } : p));
        setEditPriceModal(false);
        showToast(`Harga ${activeProduct.name} telah diupdate!`);
    };

    const handleOpenEditStock = (prod) => {
        setActiveProduct(prod);
        setTempVal(prod.stock);
        setEditStockModal(true);
    };

    const saveStock = () => {
        setProducts(products.map(p => p.id === activeProduct.id ? { ...p, stock: parseInt(tempVal) } : p));
        setEditStockModal(false);
        showToast(`Stok ${activeProduct.name} telah diupdate menjadi ${tempVal}`);
    };

    const deleteProduct = (id, name) => {
        Swal.fire({
            title: 'Hapus Produk?',
            html: `Produk <b>${name}</b> akan dihapus secara permanen.`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#EF4444',
            cancelButtonColor: '#94A3B8',
            confirmButtonText: 'Ya, Hapus!',
            cancelButtonText: 'Batal'
        }).then(result => {
            if (result.isConfirmed) {
                setProducts(products.filter(p => p.id !== id));
                showToast('Produk berhasil dihapus secara permanen.');
            }
        });
    };

    return (
        <div className="space-y-6 fade-in relative min-h-[80vh]">
            {/* Action Bar */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:w-80">
                    <i className="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
                    <input 
                        type="text" 
                        placeholder="Cari nama produk..." 
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-2.5 w-full bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 text-sm outline-none shadow-sm transition"
                    />
                </div>
                
                <button 
                    onClick={handleOpenAddModal}
                    className="bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-emerald-600 shadow-lg shadow-emerald-500/30 transition w-full md:w-auto justify-center"
                >
                    <i className="fas fa-plus"></i> Tambah Produk Baru
                </button>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                                <th className="p-4 font-bold">Info Produk</th>
                                <th className="p-4 font-bold">Kategori</th>
                                <th className="p-4 font-bold text-center">Harga</th>
                                <th className="p-4 font-bold text-center">Stok</th>
                                <th className="p-4 font-bold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-slate-700 divide-y divide-slate-100">
                            {filteredProducts.map(product => (
                                <tr key={product.id} className="hover:bg-slate-50 transition">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-lg bg-slate-200 flex items-center justify-center overflow-hidden border border-slate-200 text-slate-400 flex-shrink-0">
                                                {product.img ? (
                                                    <img src={product.img} className="w-full h-full object-cover" alt={product.name} />
                                                ) : (
                                                    <i className="fas fa-image"></i>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-800">{product.name}</p>
                                                <p className="text-xs text-slate-500">Terjual: <span>{product.sold}</span></p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2.5 py-1 rounded text-xs font-bold ${
                                            product.category === 'Pertanian' ? 'bg-emerald-100 text-emerald-700' :
                                            product.category === 'Kerajinan' ? 'bg-purple-100 text-purple-700' :
                                            product.category === 'Kuliner' ? 'bg-orange-100 text-orange-700' :
                                            'bg-emerald-100 text-emerald-700'
                                        }`}>
                                            {product.category}
                                        </span>
                                    </td>
                                    <td className="p-4 text-center font-bold text-slate-800 whitespace-nowrap">
                                        Rp {product.price.toLocaleString('id-ID')}
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className={`inline-flex items-center rounded-lg p-1 ${product.stock > 0 ? 'bg-slate-100' : 'bg-red-100'}`}>
                                            <span className={`font-bold px-3 py-1 ${product.stock > 0 ? 'text-slate-800' : 'text-red-600'}`}>
                                                {product.stock}
                                            </span>
                                        </div>
                                        {product.stock === 0 && (
                                            <p className="text-[10px] text-red-500 mt-1 font-bold block">Habis!</p>
                                        )}
                                    </td>
                                    <td className="p-4 text-center">
                                        <div className="flex items-center justify-center gap-2">
                                            <button onClick={() => handleOpenEditPrice(product)} className="w-8 h-8 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition" title="Edit Harga">
                                                <i className="fas fa-tag"></i>
                                            </button>
                                            <button onClick={() => handleOpenEditStock(product)} className="w-8 h-8 rounded bg-orange-50 text-orange-600 hover:bg-orange-100 flex items-center justify-center transition" title="Update Stok">
                                                <i className="fas fa-boxes"></i>
                                            </button>
                                            <button onClick={() => deleteProduct(product.id, product.name)} className="w-8 h-8 rounded bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition" title="Hapus Produk">
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}

                            {filteredProducts.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-slate-400">
                                        <i className="fas fa-box-open text-4xl mb-3 opacity-50 block"></i>
                                        <p>Produk tidak ditemukan.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tambah Produk Modal */}
            {addProductModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                            <h3 className="font-bold text-xl text-slate-800">Tambah Produk Baru</h3>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Nama Produk</label>
                                <input 
                                    type="text" 
                                    value={newProduct.name} 
                                    onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                                    className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Kategori</label>
                                    <select 
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                        className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    >
                                        <option>Kuliner</option>
                                        <option>Kerajinan</option>
                                        <option>Pertanian</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Harga (Rp)</label>
                                    <input 
                                        type="number" 
                                        value={newProduct.price}
                                        onChange={(e) => setNewProduct({...newProduct, price: parseInt(e.target.value) || 0})}
                                        className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-1">Stok Awal</label>
                                <input 
                                    type="number" 
                                    value={newProduct.stock}
                                    onChange={(e) => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                                    className="w-full border border-slate-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                            <button onClick={() => setAddProductModal(false)} className="px-5 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-xl transition">Batal</button>
                            <button onClick={saveNewProduct} className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl shadow-lg transition">Simpan Produk</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Harga Modal */}
            {editPriceModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <h3 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2"><i className="fas fa-tag text-blue-500"></i> Ubah Harga</h3>
                            <p className="text-sm text-slate-500 mb-4">Ubah harga untuk <strong>{activeProduct?.name}</strong>.</p>
                            
                            <label className="block text-sm font-bold text-slate-700 mb-1">Harga Baru (Rp)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-slate-400">Rp</span>
                                <input 
                                    type="number" 
                                    value={tempVal}
                                    onChange={(e) => setTempVal(e.target.value)}
                                    className="w-full border border-slate-200 rounded-lg pl-10 pr-4 py-3 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                            <button onClick={() => setEditPriceModal(false)} className="px-4 py-2 bg-slate-200 hover:bg-slate-300 font-bold rounded-lg transition">Batal</button>
                            <button onClick={savePrice} className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition">Simpan Harga</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Stok Modal */}
            {editStockModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-3xl w-full max-w-sm overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <div className="p-6">
                            <h3 className="font-bold text-xl text-slate-800 mb-4 flex items-center gap-2"><i className="fas fa-boxes text-orange-500"></i> Update Stok</h3>
                            <p className="text-sm text-slate-500 mb-4">Ubah jumlah stok tersedia untuk <strong>{activeProduct?.name}</strong>.</p>
                            
                            <label className="block text-sm font-bold text-slate-700 mb-1">Total Stok Saat Ini</label>
                            <input 
                                type="number" 
                                value={tempVal}
                                onChange={(e) => setTempVal(parseInt(e.target.value) || 0)}
                                className="w-full border border-slate-200 rounded-lg px-4 py-3 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-center"
                            />
                            
                            <div className="flex items-center justify-between gap-4 mt-4">
                                <button onClick={() => setTempVal(Math.max(0, tempVal - 10))} className="w-full py-2 bg-red-100 text-red-600 rounded font-bold hover:bg-red-200 transition">-10</button>
                                <button onClick={() => setTempVal(tempVal + 10)} className="w-full py-2 bg-emerald-100 text-emerald-700 rounded font-bold hover:bg-emerald-200 transition">+10</button>
                            </div>
                        </div>
                        <div className="px-6 py-4 border-t border-slate-100 flex justify-end gap-3 bg-slate-50">
                            <button onClick={() => setEditStockModal(false)} className="px-4 py-2 bg-slate-200 font-bold rounded-lg transition">Batal</button>
                            <button onClick={saveStock} className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition">Simpan Stok</button>
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
