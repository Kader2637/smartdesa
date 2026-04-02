"use client";

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function StoreProfilePage({ params }) {
    // Di real app, params.id/slug akan dipakai fetch DB.
    const baseData = [
        { id: 1, nama: "Kopi Arabika Gayo Asli", penjual: "Waroeng Budi", slug: "waroeng-budi", kategori: "Pertanian", harga: "Rp 65.000", rating: 4.9, terjual: 342, img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=500&q=80", lat: -7.940, lng: 112.600, alamat: "Kawasan Pasar Tunjungtirto Utara", desc: "Produk andalan kami." },
        { id: 2, nama: "Kopi Hitam Robusta", penjual: "Waroeng Budi", slug: "waroeng-budi", kategori: "Pertanian", harga: "Rp 40.000", rating: 4.5, terjual: 89, img: "https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?w=500&q=80", lat: -7.940, lng: 112.600, alamat: "Kawasan Pasar Tunjungtirto Utara" },
        { id: 3, nama: "Bubuk Coklat Organik", penjual: "Waroeng Budi", slug: "waroeng-budi", kategori: "Kuliner", harga: "Rp 25.000", rating: 4.8, terjual: 211, img: "https://images.unsplash.com/photo-1622384792671-55c9183490fd?w=500&q=80", lat: -7.940, lng: 112.600, alamat: "Kawasan Pasar Tunjungtirto Utara" },
    ];
    
    const storeDefaults = {
        "waroeng-budi": {
            namaToko: "Waroeng Budi",
            lat: -7.940,
            lng: 112.600,
            alamat: "Jl. Raya Pasar Tunjungtirto RT 02 RW 01, Malang",
            banner: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1920&q=80",
            avatar: "https://ui-avatars.com/api/?name=Waroeng+Budi&background=047857&color=fff",
            memberSince: "Ags 2024",
            totalSales: "2.1k",
            rating: "4.9",
        },
        "sanggar-ibu-siti": {
            namaToko: "Sanggar Ibu Siti",
            lat: -7.942,
            lng: 112.605,
            alamat: "Kawasan Sentra Kriya, Desa Tunjungtirto Blok C",
            banner: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=1920&q=80",
            avatar: "https://ui-avatars.com/api/?name=Ibu+Siti&background=6d28d9&color=fff",
            memberSince: "Jan 2025",
            totalSales: "890",
            rating: "4.8"
        }
    };

    const [storeInfo, setStoreInfo] = useState(null);
    const [products, setProducts] = useState([]);
    
    // Purchase Modal States
    const [modalData, setModalData] = useState(null);
    const [modalState, setModalState] = useState('product'); // 'product' | 'login'
    
    const mapRef = useRef(null);
    const mapInstance = useRef(null);

    useEffect(() => {
        const slug = params?.id || "waroeng-budi"; 
        setStoreInfo(storeDefaults[slug] || storeDefaults["waroeng-budi"]);
        setProducts(baseData.filter(p => p.slug === slug).length > 0 ? baseData.filter(p => p.slug === slug) : baseData);
    }, [params]);

    // Handle map loading
    useEffect(() => {
        if (!storeInfo) return;

        const loadMap = () => {
            if (window.L && mapRef.current && !mapInstance.current) {
                mapInstance.current = window.L.map(mapRef.current, {
                    zoomControl: false 
                }).setView([storeInfo.lat, storeInfo.lng], 16);
                
                window.L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
                    maxZoom: 19,
                    attribution: '&copy; OSM contributors'
                }).addTo(mapInstance.current);

                window.L.control.zoom({ position: 'bottomright' }).addTo(mapInstance.current);
                
                const customIcon = window.L.divIcon({
                    className: 'custom-pin',
                    html: `<div class="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-emerald-500 relative">
                             <img src="${storeInfo.avatar}" class="w-full h-full rounded-full object-cover"/>
                             <div class="absolute -bottom-[8px] w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-emerald-500"></div>
                           </div>`,
                    iconSize: [40, 40],
                    iconAnchor: [20, 48]
                });

                window.L.marker([storeInfo.lat, storeInfo.lng], {icon: customIcon}).addTo(mapInstance.current)
                    .bindPopup(`<div class="font-bold text-center text-xs opacity-90">${storeInfo.namaToko}</div>`)
                    .openPopup();
            }
        };

        if (!document.getElementById('leaflet-script')) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.id = 'leaflet-script';
            script.onload = loadMap;
            document.body.appendChild(script);
        } else {
            setTimeout(loadMap, 200);
        }

        return () => {
            if (mapInstance.current) {
                mapInstance.current.remove();
                mapInstance.current = null;
            }
        };
    }, [storeInfo]);

    if(!storeInfo) return <div className="h-screen bg-slate-50 flex items-center justify-center animate-pulse">Memuat Toko...</div>;

    const closeModal = () => {
        setModalData(null);
        setTimeout(() => setModalState('product'), 300);
    };

    return (
        <div className="bg-[#f8fafc] min-h-screen relative pt-20 md:pt-20 pb-10">
            <style jsx global>{`
                .leaflet-popup-content-wrapper { border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); padding:0; }
                .leaflet-popup-content { margin: 6px 10px; font-family: inherit; }
                .leaflet-popup-tip-container { display: none; }
                .leaflet-bottom.leaflet-right { margin-bottom: 20px; margin-right: 20px; }
                .leaflet-control-zoom a { border: none !important; border-radius: 6px !important; margin-bottom: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.1) !important; color: #1e293b !important; }
            `}</style>


            {/* 1. EDGE-TO-EDGE HERO COVER */}
            <div className="w-full h-[35vh] min-h-[300px] relative z-0 animate-in fade-in duration-1000 border-y border-slate-200">
                <img src={storeInfo.banner} className="w-full h-full object-cover" alt="Banner Toko" />
            </div>

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative">
                
                {/* 2. FLOATING INFO CARD */}
                <div className="relative -mt-20 z-20 mb-8 lg:mb-12 animate-in slide-in-from-bottom-8 fade-in duration-700">
                    <div className="bg-white/90 backdrop-blur-2xl p-6 lg:p-8 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white flex flex-col md:flex-row items-center gap-6 md:gap-10">
                        <div className="w-28 h-28 lg:w-36 lg:h-36 rounded-full border-4 border-white shadow-lg bg-slate-100 shrink-0 overflow-hidden relative -mt-12 md:mt-0">
                            <img src={storeInfo.avatar} className="w-full h-full object-cover" alt="Logo Toko" />
                        </div>
                        
                        <div className="flex-1 text-center md:text-left">
                            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                                <h1 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">{storeInfo.namaToko}</h1>
                                <i className="fas fa-check-circle text-emerald-500 text-xl lg:text-2xl mt-1"></i>
                            </div>
                            <p className="text-slate-500 font-medium mb-4">{storeInfo.alamat}</p>
                            
                            {/* Tags/Badges */}
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                                <span className="bg-emerald-50 text-emerald-700 font-bold px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5"><i className="fas fa-star text-yellow-500"></i> {storeInfo.rating} Reputasi</span>
                                <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs"><i className="fas fa-box-open text-slate-400 mr-1"></i> {storeInfo.totalSales} Penjualan</span>
                                <span className="bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs"><i className="fas fa-calendar-check text-slate-400 mr-1"></i> Mitra Sejak {storeInfo.memberSince}</span>
                            </div>
                        </div>
                        
                        <div className="shrink-0 flex gap-3 w-full md:w-auto">
                           <a href={`https://wa.me/`} target="_blank" className="flex-1 md:flex-none text-center bg-brand-50 text-brand-600 font-bold px-8 py-4 rounded-2xl hover:bg-brand-100 transition-colors shadow-sm">
                               <i className="fab fa-whatsapp mr-2 text-xl"></i>Hubungi (WA)
                           </a>
                        </div>
                    </div>
                </div>

                {/* 3. UBER-EATS STYLE MAIN LAYOUT (3-COLUMN DYNAMIC) */}
                <div className="flex flex-col lg:flex-row gap-8 pb-32">
                    
                    {/* LEFT SIDE: PRODUCT GALLERY (Dominate Area) */}
                    <div className="flex-1 order-2 lg:order-1">
                        <div className="mb-6 flex items-end justify-between">
                            <h2 className="text-2xl lg:text-3xl font-extrabold text-slate-900 leading-none">Etalase Toko</h2>
                            <div className="bg-slate-200 text-slate-600 text-sm font-bold px-3 py-1 rounded-lg">{products.length} Barang Tersedia</div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6 animate-in slide-in-from-bottom-8 fade-in delay-200 duration-700">
                            {products.map(p => (
                                <div key={p.id} onClick={() => { setModalData(p); setModalState('product'); }} className="group bg-white rounded-[2rem] overflow-hidden border border-slate-100 hover:border-brand-200 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 transition-all duration-300 cursor-pointer flex flex-col h-full">
                                    <div className="aspect-[4/5] bg-slate-50 relative overflow-hidden isolate">
                                         <img src={p.img} alt={p.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 z-0" />
                                         <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors z-10 duration-500"></div>
                                         <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-700 uppercase tracking-wider z-20">{p.kategori}</div>
                                         
                                         {/* Hover Plus Button */}
                                         <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 shadow-lg transition-all duration-300 z-20">
                                             <i className="fas fa-plus"></i>
                                         </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <p className="text-brand-600 font-extrabold text-lg mb-1">{p.harga}</p>
                                        <h3 className="font-bold text-slate-800 text-sm md:text-base leading-snug group-hover:text-brand-600 transition-colors line-clamp-2 mb-2">{p.nama}</h3>
                                        <div className="mt-auto flex items-center gap-2">
                                            <span className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-100"><i className="fas fa-star text-yellow-500"></i> {p.rating}</span>
                                            <span className="text-[10px] font-medium text-slate-400">{p.terjual} trjual</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT SIDE: STICKY MAP SIDEBAR */}
                    <div className="w-full lg:w-[350px] shrink-0 order-1 lg:order-2">
                        <div className="sticky top-28 flex flex-col gap-6 animate-in slide-in-from-right-8 fade-in delay-300 duration-700">
                            
                            {/* Map Box Component */}
                            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col">
                                <div className="h-[250px] relative bg-slate-100">
                                    <div ref={mapRef} className="absolute inset-0 w-full h-full z-0"></div>
                                    
                                    {/* Transparent Action Overlay Map */}
                                    <div className="absolute bottom-3 right-3 z-10">
                                        <a href={`https://www.google.com/maps/search/?api=1&query=${storeInfo.lat},${storeInfo.lng}`} target="_blank" className="bg-white/90 backdrop-blur hover:bg-brand-500 hover:text-white px-3 py-2 text-xs font-bold text-slate-700 rounded-xl shadow-lg transition-colors flex items-center gap-2 border border-slate-200">
                                            <i className="fas fa-location-arrow"></i> G-Maps
                                        </a>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-2 flex items-center gap-2"><i className="fas fa-map-pin text-brand-500"></i> Titik Lokasi Valid</h3>
                                    <p className="text-slate-900 font-bold text-sm leading-relaxed mb-4">{storeInfo.alamat}</p>
                                </div>
                            </div>

                            {/* Schedule Box */}
                            <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
                                <h3 className="text-slate-400 font-bold text-xs uppercase tracking-widest mb-4 flex items-center gap-2"><i className="far fa-clock text-green-500"></i> Buka Sekarang</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm font-medium border-b border-slate-50 pb-2"><span className="text-slate-500">Senin - Jumat</span><span className="text-slate-900 font-bold">08:00 - 17:00</span></div>
                                    <div className="flex justify-between items-center text-sm font-medium border-b border-slate-50 pb-2"><span className="text-slate-500">Sabtu</span><span className="text-slate-900 font-bold">08:00 - 14:00</span></div>
                                    <div className="flex justify-between items-center text-sm font-medium"><span className="text-slate-500">Minggu</span><span className="bg-red-50 text-red-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">Tutup</span></div>
                                </div>
                            </div>
                            
                        </div>
                    </div>

                </div>
            </div>

            {/* SUPER MODAL FOR PRODUCT CHECKOUT (SAME BEHAVIOR AS MAIN MARKETPLACE) */}
            {modalData && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-10 perspective-1000">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" onClick={closeModal}></div>
                    
                    <div className={`bg-white rounded-[2.5rem] w-full shadow-2xl relative overflow-hidden transition-all duration-500 transform flex flex-col 
                        ${modalState === 'login' ? 'max-w-md scale-95' : 'max-w-4xl scale-100'} max-h-[90vh]`}
                    >
                        <button onClick={closeModal} className="absolute top-6 right-6 w-10 h-10 bg-black/5 hover:bg-slate-100 rounded-full flex items-center justify-center z-50 transition-colors"><i className="fas fa-times"></i></button>

                        {/* --- STATE: PRODUCT DETAIL --- */}
                        {modalState === 'product' && (
                            <div className="grid grid-cols-1 md:grid-cols-2 h-full overflow-y-auto animate-in fade-in duration-300">
                                <div className="h-64 md:h-auto md:min-h-[500px] relative">
                                    <img src={modalData.img} alt={modalData.nama} className="absolute inset-0 w-full h-full object-cover" />
                                </div>
                                <div className="p-8 lg:p-10 flex flex-col bg-white">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="bg-brand-50 text-brand-600 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider">{modalData.kategori}</span>
                                        <span className="text-slate-400 font-medium text-sm flex items-center gap-1.5"><i className="fas fa-star text-yellow-400"></i> {modalData.rating}</span>
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-slate-900 leading-tight mb-2">{modalData.nama}</h2>
                                    <p className="text-3xl font-extrabold text-brand-600 mb-6">{modalData.harga}</p>
                                    
                                    <p className="text-slate-500 leading-relaxed mb-6 font-medium text-sm">Produk asli dibuat oleh {modalData.penjual}. Kualitas nomor satu langsung dari Tunjungtirto, beli sekarang juga sebelum kehabisan stok yang menipis!</p>
                                    
                                    {/* Action items detailed */}
                                    <div className="grid grid-cols-2 gap-4 mb-auto pt-4 border-t border-slate-100">
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold mb-1 uppercase">Terjual</p>
                                            <p className="text-lg font-bold text-slate-900">{modalData.terjual} Buah</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-slate-400 font-bold mb-1 uppercase">Penyedia</p>
                                            <p className="text-lg font-bold text-slate-900">{modalData.penjual}</p>
                                        </div>
                                    </div>

                                    {/* Checkout Area */}
                                    <div className="mt-8">
                                        <button onClick={() => setModalState('login')} className="w-full bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-brand-600 hover:shadow-xl hover:shadow-brand-500/20 hover:-translate-y-1 transition-all flex justify-center items-center gap-3">
                                            Masukkan Ke Keranjang Sistem <i className="fas fa-lock text-slate-400 text-xs"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* --- STATE: AUTH GUARD --- */}
                        {modalState === 'login' && (
                            <div className="p-10 flex flex-col items-center text-center animate-in zoom-in-95 duration-300 relative">
                                <button onClick={() => setModalState('product')} className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 p-2"><i className="fas fa-arrow-left text-lg"></i></button>
                                
                                <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center text-4xl mb-6 shadow-inner border border-red-100">
                                    <i className="fas fa-lock"></i>
                                </div>
                                <h2 className="text-2xl font-extrabold text-slate-900 mb-3">Sistem Pembayaran Terkunci</h2>
                                <p className="text-slate-500 mb-8 leading-relaxed text-sm">Untuk mencegah tindak penipuan dan mengamankan transaksi elektronik, silakan masuk ke portal Identitas Warga terlebih dahulu. Proses ini memakan waktu kurang dari semenit.</p>
                                
                                <div className="w-full space-y-3">
                                    <Link href="/login" className="block w-full bg-slate-900 text-white font-bold py-4 rounded-2xl hover:bg-brand-500 shadow-xl shadow-slate-900/10 transition-colors">Akses Akun Desa</Link>
                                    <button onClick={() => setModalState('product')} className="block w-full bg-slate-50 text-slate-600 font-bold py-4 rounded-2xl border border-slate-200 hover:bg-slate-100 transition-colors">Batal</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </div>
    );
}
