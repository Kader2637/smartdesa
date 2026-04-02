"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function BeritaPage() {
    const [activeTab, setActiveTab] = useState('Semua Kabar');
    const [searchQuery, setSearchQuery] = useState('');
    const categories = ['Semua Kabar', 'Pembangunan', 'Pemberdayaan', 'Kesehatan', 'Keamanan'];

    // Mock Database Berita
    const heroNews = {
        id: 1,
        title: "Peresmian BUMDes Megah Tunjungtirto Sebagai Roda Penggerak Ekonomi Mandiri Kawasan",
        excerpt: "Setelah melalui proses pembangunan selama kurang lebih 8 bulan, Badan Usaha Milik Desa (BUMDes) Tunjungtirto kini resmi berstandar nasional dan dinobatkan sebagai pusaran lumbung termaju seantero Jawa Timur.",
        date: "2 April 2026",
        category: "Pembangunan",
        readTime: "5 mnt baca",
        image: "https://images.unsplash.com/photo-1577412702755-644b41ad77eb?w=1200&q=80",
        author: "Humas BPD"
    };

    const regularNews = [
        {
            id: 2,
            title: "Pemerintah Desa Luncurkan Layanan Aduan Warga Berbasis AI",
            excerpt: "Sistem pelaporan kini terintegrasi langsung dengan pos jaga 24 jam untuk merespon cepat keadaan darurat warga di area pelosok desa.",
            date: "1 April 2026",
            category: "Keamanan",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
        },
        {
            id: 3,
            title: "Pelatihan Keterampilan Rajut Untuk Ibu PKK Tunjungtirto Lor",
            excerpt: "Menilik keseruan puluhan ibu-ibu warga Tunjungtirto Lor yang dilatih oleh pemateri professional untuk mendorong kemandirian bisnis.",
            date: "30 Mar 2026",
            category: "Pemberdayaan",
            image: "https://images.unsplash.com/photo-1590736969955-71cc94801759?w=600&q=80",
        },
        {
            id: 4,
            title: "Jadwal Posyandu Terpadu & Vaksinasi Polio Balita Bulan April",
            excerpt: "Bagi warga yang memiliki balita, diharapkan datang ke balai RW masing-masing sesuai jadwal surat edaran guna menjaga imunitas anak.",
            date: "28 Mar 2026",
            category: "Kesehatan",
            image: "https://images.unsplash.com/photo-1584515978043-47000d23f773?w=600&q=80",
        },
        {
            id: 5,
            title: "Realisasi Dana Desa Tahap I Digunakan untuk Pembaruan Aspal",
            excerpt: "Jalan utama poros desa akhirnya diperbaiki total demi kelancaran logistik distribusi UMKM yang selama ini sering terhambat.",
            date: "25 Mar 2026",
            category: "Pembangunan",
            image: "https://images.unsplash.com/photo-1510255375545-985f40de6d53?w=600&q=80",
        },
        {
            id: 6,
            title: "Musim Panen Tiba, Harga Beras Organik Kelompok Tani Melonjak",
            excerpt: "Kabar gembira bagi para petani padi Menthik Susu organik, harga serapan pasar kini berpihak mahal dan panen raya menuai sukses.",
            date: "22 Mar 2026",
            category: "Pemberdayaan",
            image: "https://images.unsplash.com/photo-1592982537447-6f2ae3e2fb7d?w=600&q=80",
        },
        {
            id: 7,
            title: "Bhabinkamtibmas Sita Puluhan Knalpot Brong Menjelang Ramadhan",
            excerpt: "Operasi ketertiban dilakukan serentak di titik keluar masuk perbatasan Tunjungtirto Karangploso guna menjamin kenyamanan ibadah sunyi.",
            date: "20 Mar 2026",
            category: "Keamanan",
            image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80",
        }
    ];

    // Logika Search Filter & Category Gabungan
    const isSearching = searchQuery.trim() !== '';
    let filteredNews = regularNews;

    if (activeTab !== 'Semua Kabar') {
        filteredNews = filteredNews.filter(n => n.category === activeTab);
    }
    
    if (isSearching) {
        filteredNews = filteredNews.filter(n => 
            n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
            n.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc] pt-40 pb-32">
            
            {/* Header Kabar Desa with Search Bar */}
            <div className="max-w-7xl mx-auto px-4 mt-8 mb-10 text-center md:text-left flex flex-col md:flex-row md:items-end justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-700">
                <div className="flex-1">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4 group cursor-default">
                        Warta<span className="text-brand-500 relative inline-block transition-transform duration-500 hover:-rotate-6 hover:scale-110">Desa</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-xl font-medium leading-relaxed">Platform informasi mutakhir. Temukan rangkuman liputan inspiratif secara transparan, langsung dari Tunjungtirto menuju telapak tangan Anda.</p>
                </div>
                
                {/* Modern Floating Search Bar */}
                <div className="w-full md:w-96 relative group z-20">
                    <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none transition-transform duration-300 group-focus-within:scale-110 group-focus-within:text-brand-500 text-slate-400">
                        <i className="fas fa-search text-lg"></i>
                    </div>
                    <input 
                        type="text" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Telusuri fenomena spesifik..." 
                        className="w-full pl-12 pr-12 py-4 rounded-3xl bg-white border border-slate-200 text-slate-900 font-bold placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-500/20 focus:border-brand-500 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1"
                    />
                    {isSearching && (
                        <button onClick={() => setSearchQuery('')} className="absolute inset-y-0 right-5 flex items-center text-slate-300 hover:text-red-500 transition-colors tooltip relative group/btn">
                            <i className="fas fa-times-circle text-xl"></i>
                        </button>
                    )}
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">

                {/* ANIMATED BG BLOBS */}
                <div className="absolute top-0 right-20 w-64 h-64 bg-blue-400/10 blur-[80px] rounded-full pointer-events-none"></div>
                <div className="absolute top-40 left-10 w-72 h-72 bg-emerald-400/10 blur-[90px] rounded-full pointer-events-none"></div>

                {/* HERO NEWS SECTION (Hanya tampil di tab Semua Kabar, dan bila tidak sedang Search) */}
                {activeTab === 'Semua Kabar' && !isSearching && (
                    <section className="mb-12 animate-in slide-in-from-bottom-12 fade-in duration-[800ms]">
                        <Link href={`/berita/${heroNews.id}`} className="block w-full h-auto md:h-[550px] bg-slate-900 rounded-[2.5rem] overflow-hidden relative group shadow-2xl shadow-slate-900/10 border border-slate-200">
                            <img src={heroNews.image} alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-110 transition-transform duration-[2000ms] ease-out" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                            
                            <div className="absolute inset-x-0 bottom-0 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row md:items-end justify-between gap-8 z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                                <div className="max-w-3xl">
                                    <div className="flex flex-wrap items-center gap-3 mb-5">
                                        <span className="bg-brand-500 text-white font-extrabold px-4 py-2 rounded-full text-[10px] sm:text-xs uppercase tracking-widest shadow-lg shadow-brand-500/40 relative overflow-hidden">
                                            <span className="absolute inset-0 bg-white/20 blur translate-x-[-100%] group-hover:animate-[shimmer_1.5s_infinite]"></span> Laporan Khusus
                                        </span>
                                        <span className="bg-white/20 backdrop-blur-md text-white font-bold px-3 py-1.5 rounded-full text-xs border border-white/30 flex items-center gap-1.5"><i className="far fa-clock"></i> {heroNews.readTime}</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight group-hover:text-brand-300 transition-colors drop-shadow-xl">{heroNews.title}</h2>
                                    <p className="text-slate-200 text-sm md:text-lg font-medium leading-relaxed max-w-2xl hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">{heroNews.excerpt}</p>
                                </div>
                                
                                <div className="shrink-0 flex items-center gap-3 bg-white/10 backdrop-blur-md p-3 pr-6 border border-white/20 rounded-[2rem] hover:bg-white/20 transition-colors">
                                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-slate-300 border border-slate-500 shadow-inner group-hover:rotate-12 transition-transform duration-300"><i className="fas fa-feather-alt"></i></div>
                                    <div>
                                        <p className="text-white text-xs font-bold uppercase tracking-wider">{heroNews.author}</p>
                                        <p className="text-slate-300 text-[10px] font-bold">{heroNews.date}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </section>
                )}

                {/* CATEGORIES / TABS */}
                <div className="flex items-center justify-center lg:justify-start mb-8 pb-4 relative z-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
                    <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 w-full lg:w-auto">
                        {categories.map(cat => (
                            <button 
                                key={cat} 
                                onClick={() => { setActiveTab(cat); setSearchQuery(''); }}
                                className={`text-xs md:text-sm font-extrabold px-6 py-3 rounded-full whitespace-nowrap transition-all duration-300 border ${
                                    activeTab === cat 
                                    ? 'bg-slate-900 border-slate-900 text-white shadow-[0_4px_15px_rgb(0,0,0,0.1)] -translate-y-1' 
                                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* SEARCH RESULTS INDICATOR */}
                {isSearching && (
                    <div className="mb-6 animate-in fade-in zoom-in-95 duration-300">
                        <p className="text-slate-600 font-medium text-lg">Menampilkan liputan terkait: <span className="font-extrabold text-slate-900 italic">"{searchQuery}"</span></p>
                    </div>
                )}

                {/* MASONRY/GRID NEWS LIST */}
                {filteredNews.length === 0 ? (
                    <div className="w-full py-20 lg:py-32 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-500">
                        <div className="w-40 h-40 border-[10px] border-slate-50 rounded-full flex items-center justify-center mb-6 relative">
                            <i className="far fa-frown-open text-6xl text-slate-300"></i>
                            <div className="absolute top-0 right-0 w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center border-4 border-white"><i className="fas fa-search text-white text-xs"></i></div>
                        </div>
                        <h3 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">Koran Belum Dicetak</h3>
                        <p className="text-slate-500 text-lg font-medium max-w-md">Tidak menemukan liputan berita pencarian. Silakan ganti kata kunci atau intip rubrik lain yang tertaut.</p>
                        <button onClick={() => {setSearchQuery(''); setActiveTab('Semua Kabar')}} className="mt-8 bg-slate-900 hover:bg-brand-500 text-white font-bold py-4 px-8 rounded-2xl transition-all hover:shadow-lg hover:shadow-brand-500/30 hover:-translate-y-1">
                            Kembali ke Beranda Warta
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mb-12">
                            {filteredNews.map((news, i) => (
                                <Link href={`/berita/${news.id}`} key={news.id} className="group bg-white rounded-3xl p-5 border border-slate-100/60 shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-2xl hover:shadow-brand-900/5 hover:-translate-y-2 hover:border-brand-100 transition-all duration-500 flex flex-col relative z-10 animate-in fade-in slide-in-from-bottom-12" style={{ animationDelay: `${i * 100}ms`, animationFillMode: 'both' }}>
                                    <div className="w-full aspect-[4/3] bg-slate-100 rounded-[1.5rem] overflow-hidden mb-6 relative isolate">
                                        <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1000ms] ease-out z-0" />
                                        
                                        <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/20 transition-colors duration-500 z-10"></div>
                                        
                                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-50 group-hover:scale-100 transition-all duration-500 z-20">
                                           <div className="w-14 h-14 rounded-full bg-white text-slate-900 border border-slate-100 flex items-center justify-center shadow-2xl">
                                               <i className="fas fa-glasses text-xl text-brand-500"></i>
                                           </div>
                                        </div>
                                        
                                        <div className="absolute top-3 left-3 z-20">
                                            <span className="bg-white/90 backdrop-blur-md text-slate-900 border border-white/50 font-extrabold px-3 py-1.5 rounded-xl text-[10px] uppercase tracking-wider shadow-sm">{news.category}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col flex-1 px-1">
                                        <div className="flex items-center gap-2 text-[11px] font-bold text-brand-500 mb-3 bg-brand-50 w-max px-2.5 py-1 rounded-md">
                                            <i className="far fa-calendar-alt"></i> Dipublikasi: {news.date}
                                        </div>
                                        <h3 className="text-xl font-extrabold text-slate-900 leading-snug mb-3 group-hover:text-brand-600 transition-colors line-clamp-3">
                                            {news.title}
                                        </h3>
                                        <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6 line-clamp-2">
                                            {news.excerpt}
                                        </p>
                                        
                                        <div className="mt-auto border-t border-slate-100/80 pt-4 flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                                                <span className="text-[10px] font-bold text-slate-400 uppercase">Jurnalisa Desa</span>
                                            </div>
                                            <span className="text-xs font-extrabold text-brand-600 group-hover:text-brand-700 transition-colors flex items-center gap-1 group-hover:translate-x-1 duration-300">Baca Selengkapnya <i className="fas fa-chevron-right text-[10px] mt-[1px]"></i></span>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        {/* MOCK PAGINATION COMPONENT */}
                        <div className="flex items-center justify-center gap-2 border-t border-slate-200 pt-8 mt-4 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '500ms', animationFillMode: 'both' }}>
                            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed shadow-sm transition-colors"><i className="fas fa-chevron-left"></i></button>
                            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-brand-500 text-white font-bold shadow-md shadow-brand-500/30">1</button>
                            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors shadow-sm hover:border-brand-300 hover:text-brand-600">2</button>
                            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors shadow-sm hover:border-brand-300 hover:text-brand-600">3</button>
                            <span className="px-2 text-slate-400 font-bold">...</span>
                            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors shadow-sm hover:border-brand-300 hover:text-brand-600">8</button>
                            <button className="w-10 h-10 rounded-xl flex items-center justify-center bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors shadow-sm hover:border-brand-300 hover:text-brand-600"><i className="fas fa-chevron-right"></i></button>
                        </div>
                    </>
                )}

            </div>

            {/* Custom Keyframes for shimmers running through CSS JSX Injection */}
            <style jsx global>{`
                @keyframes shimmer {
                    100% {
                        transform: translateX(100%);
                    }
                }
            `}</style>
        </div>
    );
}
