"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function UMKMPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilter, setActiveFilter] = useState('Semua');
    const [modalData, setModalData] = useState(null); 
    const [umkmList, setUmkmList] = useState([]);
    
    const [modalState, setModalState] = useState('product'); // 'product' | 'login'

    const baseData = [
        { id: 1, nama: "Kopi Arabika Gayo Asli", penjual: "Waroeng Budi", slug: "waroeng-budi", kategori: "Pertanian", harga: "Rp 65.000", rating: 4.9, terjual: 342, img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80", alamat: "Kawasan Pasar Tunjungtirto Utara" },
        { id: 2, nama: "Kerajinan Anyaman Bambu", penjual: "Sanggar Ibu Siti", slug: "sanggar-ibu-siti", kategori: "Kerajinan", harga: "Rp 120.000", rating: 4.8, terjual: 89, img: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=500&q=80", alamat: "Sentra Kriya Tunjungtirto RT 05" },
        { id: 3, nama: "Madu Hutan Liar Murni", penjual: "Kelompok Tani Alami", slug: "tani-alami", kategori: "Pertanian", harga: "Rp 85.000", rating: 5.0, terjual: 512, img: "https://images.unsplash.com/photo-1587049352847-4d4b1ed748d3?w=500&q=80", alamat: "Koperasi Tani Desa Tunjungtirto Lor" },
        { id: 4, nama: "Keripik Singkong Pedas", penjual: "Dapur Nori", slug: "dapur-nori", kategori: "Kuliner", harga: "Rp 15.000", rating: 4.7, terjual: 1024, img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&q=80", alamat: "Jl. Diponegoro Gang 2, Tunjungtirto" },
        { id: 5, nama: "Kain Batik Tulis Motif Padi", penjual: "Sanggar Ibu Siti", slug: "sanggar-ibu-siti", kategori: "Kerajinan", harga: "Rp 450.000", rating: 4.9, terjual: 45, img: "https://images.unsplash.com/photo-1605813800619-358055a40728?w=500&q=80", alamat: "Sentra Kriya Tunjungtirto RT 05" },
        { id: 6, nama: "Sambal Roa Tradisional", penjual: "Dapur Nori", slug: "dapur-nori", kategori: "Kuliner", harga: "Rp 35.000", rating: 4.8, terjual: 876, img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=500&q=80", alamat: "Jl. Diponegoro Gang 2, Tunjungtirto" },
        { id: 7, nama: "Beras Merah Organik (5kg)", penjual: "Kelompok Tani Alami", slug: "tani-alami", kategori: "Pertanian", harga: "Rp 90.000", rating: 4.9, terjual: 230, img: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=500&q=80", alamat: "Koperasi Tani Desa Tunjungtirto Lor" },
        { id: 8, nama: "Tas Rajut Tangan", penjual: "Nisa Craft", slug: "nisa-craft", kategori: "Kerajinan", harga: "Rp 85.000", rating: 4.6, terjual: 112, img: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500&q=80", alamat: "Perum Tunjung Permai Blok B2" }
    ];

    useEffect(() => {
        let filtered = baseData;
        if (activeFilter !== 'Semua') {
            filtered = filtered.filter(item => item.kategori === activeFilter);
        }
        if (searchQuery.trim() !== '') {
            filtered = filtered.filter(item => item.nama.toLowerCase().includes(searchQuery.toLowerCase()));
        }
        setUmkmList(filtered);
    }, [searchQuery, activeFilter]);

    const openProduct = (item) => {
        setModalData(item);
        setModalState('product');
    };

    const closeModal = () => {
        setModalData(null);
        setTimeout(() => setModalState('product'), 300);
    };

    const visitStore = () => {
        if(modalData) router.push(`/umkm/toko/${modalData.slug}`);
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen pb-32 ">
            
            {/* HERO SECTION - BENTO ASYMMETRICAL */}
            <section className="pt-40 pb-10 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[450px]">
                    {/* Main Banner */}
                    <div className="lg:col-span-8 rounded-[2.5rem] bg-slate-900 overflow-hidden relative group p-8 lg:p-12 flex flex-col justify-end animate-in fade-in slide-in-from-left-8 duration-700">
                        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" alt="UMKM" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
                        <div className="relative z-10">
                            <span className="bg-brand-500 text-white font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider mb-4 inline-block shadow-lg">Promo Spesial</span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-4">Mahakarya Desa, <br/>Kini Tersedia Global.</h1>
                            <p className="text-slate-300 max-w-md font-medium text-lg leading-relaxed">Berbelanja hasil karya pengrajin Tunjungtirto dan putar langsung ekonomi lokal kita.</p>
                        </div>
                    </div>
                    
                    {/* Side Banners */}
                    <div className="lg:col-span-4 flex flex-col gap-6 animate-in fade-in slide-in-from-right-8 duration-700 delay-200">
                        <div className="flex-1 rounded-[2rem] bg-orange-100 overflow-hidden relative group p-6 flex flex-col justify-end">
                            <img src="https://images.unsplash.com/photo-1599599810769-bcde5a160d32?w=500&q=80" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000" />
                            <div className="absolute inset-x-0 bottom-0 py-10 bg-gradient-to-t from-orange-900/80 to-transparent"></div>
                            <div className="relative z-10">
                                <h3 className="text-white font-extrabold text-2xl drop-shadow-md">Festival Kuliner</h3>
                                <p className="text-orange-50 font-medium text-sm drop-shadow">Diskon 20% khusus warga</p>
                            </div>
                        </div>
                        <div className="flex-1 rounded-[2rem] bg-emerald-800 overflow-hidden relative group p-6 flex items-center shadow-lg shadow-emerald-900/20">
                            <div className="absolute right-0 top-0 w-32 h-32 bg-emerald-500 blur-[50px] rounded-full opacity-50 mix-blend-screen"></div>
                            <div className="relative z-10 flex gap-4 items-center w-full">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur border border-white/30 rounded-2xl flex items-center justify-center text-white text-2xl shadow-xl shrink-0"><i className="fas fa-truck-fast"></i></div>
                                <div>
                                    <h3 className="text-white font-extrabold text-lg leading-tight mb-1">Bebas Ongkir</h3>
                                    <p className="text-emerald-200 text-xs font-medium leading-relaxed">Dalam ring 1 desa</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEARCH & FILTERS */}
            <section className="px-4 max-w-7xl mx-auto sticky top-24 z-30 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
                <div className="bg-white/80 backdrop-blur-2xl rounded-3xl p-3 shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-200/60 flex flex-col md:flex-row gap-3 items-center">
                    
                    {/* Search Field */}
                    <div className="relative w-full md:w-1/2">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <i className="fas fa-search text-slate-400"></i>
                        </div>
                        <input 
                            type="text" 
                            value={searchQuery} 
                            onChange={(e) => setSearchQuery(e.target.value)} 
                            placeholder="Cari kerajinan, makanan, kopi..." 
                            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-slate-50 border-none text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 transition-all font-sans" 
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors">
                                <i className="fas fa-times-circle"></i>
                            </button>
                        )}
                    </div>

                    <div className="hidden md:block w-px h-10 bg-slate-200"></div>

                    {/* Circular Icon Filters */}
                    <div className="flex gap-2 w-full md:w-auto overflow-x-auto no-scrollbar scroll-smooth p-1">
                        {[
                            { name: 'Semua', icon: 'fa-border-all', color: 'text-slate-600' },
                            { name: 'Kuliner', icon: 'fa-utensils', color: 'text-orange-500' },
                            { name: 'Kerajinan', icon: 'fa-palette', color: 'text-purple-500' },
                            { name: 'Pertanian', icon: 'fa-leaf', color: 'text-emerald-500' },
                        ].map(cat => (
                            <button 
                                key={cat.name} 
                                onClick={() => setActiveFilter(cat.name)} 
                                className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold transition-all shrink-0 border ${
                                    activeFilter === cat.name 
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-900/10' 
                                    : 'bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200'
                                }`}
                            >
                                <i className={`fas ${cat.icon} ${activeFilter === cat.name ? 'text-white' : cat.color}`}></i>
                                {cat.name}
                            </button>
                        ))}
                    </div>

                </div>
            </section>

            {/* PRODUCT GALLERY */}
            <main className="max-w-7xl mx-auto px-4 z-20 relative">
                {umkmList.length === 0 ? (
                    /* EMPTY STATE */
                    <div className="w-full bg-white rounded-[2.5rem] border border-slate-200 border-dashed p-16 flex flex-col items-center justify-center text-center shadow-sm animate-in zoom-in-95 mt-4">
                        <div className="w-32 h-32 border-8 border-slate-50 rounded-full flex items-center justify-center mb-6 relative">
                            <i className="fas fa-box-open text-5xl text-slate-300"></i>
                            <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-red-100 text-red-500 flex items-center justify-center animate-bounce border-2 border-white"><i className="fas fa-question text-xs"></i></div>
                        </div>
                        <h3 className="text-3xl font-extrabold text-slate-900 mb-3">Waduh, tidak ketemu!</h3>
                        <p className="text-slate-500 text-lg max-w-md mx-auto mb-8 font-medium">Bantu kami periksa ejaan dari "<span className="font-bold text-slate-700">{searchQuery}</span>" atau coba telusuri kategori lainnya.</p>
                        <button onClick={() => {setSearchQuery(''); setActiveFilter('Semua')}} className="px-8 py-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-brand-500 shadow-xl shadow-slate-900/10 transition-colors flex items-center gap-3">
                            <i className="fas fa-store"></i> Telusuri Etalase Lain
                        </button>
                    </div>
                ) : (
                    /* PRODUCT GRID */
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 animate-in fade-in duration-500 pt-4">
                        {umkmList.map((item, idx) => (
                            <div key={item.id} onClick={() => openProduct(item)} className="group cursor-pointer">
                                <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-slate-100 shadow-sm border border-slate-100 mb-4 isolate">
                                    <img src={item.img} alt={item.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0" />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500"></div>
                                    
                                    {/* Action Hover */}
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div className="w-14 h-14 rounded-full bg-white text-slate-900 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500 shadow-xl">
                                            <i className="fas fa-shopping-bag"></i>
                                        </div>
                                    </div>

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-slate-700 uppercase tracking-wider">{item.kategori}</div>
                                </div>
                                <div className="px-2">
                                    <p className="text-brand-600 font-extrabold text-lg mb-0.5">{item.harga}</p>
                                    <h3 className="font-bold text-slate-800 text-sm md:text-base leading-tight mb-2 group-hover:text-brand-600 transition-colors">{item.nama}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">⭐ {item.rating}</span>
                                        <span className="text-[10px] font-medium text-slate-400">{item.terjual} terjual</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* SUPER MODAL FOR PRODUCT AND LOGIN GUARD ONLY */}
            {modalData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 perspective-1000">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
                    
                    {/* Modal Content Wrapper */}
                    <div className={`bg-white rounded-[2.5rem] w-full shadow-2xl relative overflow-hidden transition-all duration-500 transform flex flex-col 
                        ${modalState === 'login' ? 'max-w-md scale-95' : 'max-w-4xl scale-100'} max-h-[90vh]`}
                    >
                        <button onClick={closeModal} className="absolute top-6 right-6 w-10 h-10 bg-black/5 hover:bg-slate-100 rounded-full flex items-center justify-center z-50 transition-colors"><i className="fas fa-times"></i></button>

                        {/* --- STATE: PRODUCT DETAIL --- */}
                        {modalState === 'product' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 h-full overflow-y-auto animate-in fade-in duration-300">
                                {/* Left: Image */}
                                <div className="h-64 md:h-auto md:min-h-[500px] relative">
                                    <img src={modalData.img} alt={modalData.nama} className="absolute inset-0 w-full h-full object-cover" />
                                </div>
                                {/* Right: Details */}
                                <div className="p-8 lg:p-10 flex flex-col bg-white">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="bg-brand-50 text-brand-600 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">{modalData.kategori}</span>
                                        <span className="text-slate-400 font-medium text-sm flex items-center gap-1.5"><i className="fas fa-star text-yellow-400"></i> {modalData.rating}</span>
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-2">{modalData.nama}</h2>
                                    <p className="text-3xl font-extrabold text-brand-600 mb-8">{modalData.harga}</p>
                                    
                                    <p className="text-slate-500 leading-relaxed mb-8 flex-1">Produk lokal berkualitas yang diproses secara profesional oleh {modalData.penjual}. Tingkatkan ekonomi mandiri warga dengan berbelanja secara kolektif.</p>
                                    
                                    {/* Store Route Link - Clean redirection */}
                                    <div onClick={visitStore} className="bg-slate-50 rounded-2xl p-4 flex items-center justify-between border border-slate-100 mb-8 hover:border-brand-200 hover:bg-brand-50/50 transition-colors group cursor-pointer">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 text-xl border border-slate-200 shadow-sm group-hover:text-brand-500 group-hover:border-brand-200 transition-colors">
                                                <i className="fas fa-store"></i>
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900 text-sm">{modalData.penjual}</p>
                                                <p className="text-xs text-slate-400 font-medium truncate max-w-[150px]"><i className="fas fa-map-marker-alt text-brand-500/70"></i> Kelurahan Tunjungtirto</p>
                                            </div>
                                        </div>
                                        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 group-hover:bg-brand-500 group-hover:text-white transition-colors">
                                            <i className="fas fa-chevron-right text-xs"></i>
                                        </div>
                                    </div>

                                    {/* Checkout Area */}
                                    <button onClick={() => setModalState('login')} className="w-full mt-auto bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/20 hover:-translate-y-1 transition-all flex justify-center items-center gap-3">
                                        Beli Sekarang <i className="fas fa-lock text-slate-400 text-xs"></i>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* --- STATE: AUTH GUARD --- */}
                        {modalState === 'login' && (
                            <div className="p-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-300 relative">
                                <button onClick={() => setModalState('product')} className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 p-2"><i className="fas fa-arrow-left"></i></button>
                                
                                <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner border border-red-100">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Autentikasi Diperlukan</h2>
                                <p className="text-slate-500 mb-8 leading-relaxed text-sm">Untuk mencegah tindak penipuan dan mengamankan transaksi elektronik, silakan masuk ke portal Identitas Warga terlebih dahulu.</p>
                                
                                <div className="w-full space-y-3">
                                    <Link href="/login" className="block w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-brand-500 shadow-xl shadow-slate-900/10 transition-colors">Masuk ke Akun Desa</Link>
                                    <button onClick={() => setModalState('product')} className="block w-full bg-slate-50 text-slate-600 font-bold py-4 rounded-xl border border-slate-200 hover:bg-slate-100 transition-colors">Batal & Kembali</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
