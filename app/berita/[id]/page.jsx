"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function BeritaDetailPage({ params }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    
    // Unwrapping params directly for nextjs simulated logic
    const newsId = params?.id || '1';

    // Mock specific news article data fetching
    const [article, setArticle] = useState(null);

    useEffect(() => {
        // Mocking an API call delay
        const timer = setTimeout(() => {
            setArticle({
                id: newsId,
                title: "Peresmian BUMDes Megah Tunjungtirto Sebagai Roda Penggerak Ekonomi Mandiri Kawasan",
                content: `
                    <p>Setelah melalui proses pembangunan selama kurang lebih 8 bulan, Badan Usaha Milik Desa (BUMDes) Tunjungtirto kini resmi berstandar nasional dan dinobatkan sebagai pusaran lumbung termaju seantero Jawa Timur.</p>
                    <p>BUMDes ini didirikan atas asas keadilan swadaya warga setempat. Melalui musyawarah panjang, seluruh dusun menyepakati bahwa perputaran uang dan laba dari penjualan komoditas harus dikembalikan sepenuhnya pada warga miskin serta untuk membiayai beasiswa anak-anak desa yang berprestasi.</p>
                    <h3>Dukungan Penuh Bupati</h3>
                    <p>Bupati Malang bersama jajaran TNI dan POLRI setempat berkesempatan melakukan prosesi pemotongan tumpeng. "Ini bukan sekadar bangunan semen dan bata, ini adalah tugu kemerdekaan finansial warga desa. Saya perintahkan kecamatan lain segera meniru ketekunan Tunjungtirto!" tegas Bupati dalam orasi panggungnya.</p>
                    <p>Dengan adanya pasar digital yang diinisiasi oleh BUMDes, pedagang pasar malam, dan pengerajin anyaman bambu kini punya lapak gratis untuk menjual dagangannya secara daring.</p>
                `,
                date: "2 April 2026",
                category: "Pembangunan",
                readTime: "5 mnt baca",
                image: "https://images.unsplash.com/photo-1577412702755-644b41ad77eb?w=1600&q=80",
                author: "Humas BPD",
                authorRole: "Jurnalis Aparatur Desa",
                authorAvatar: "https://ui-avatars.com/api/?name=Humas+BPD&background=020617&color=fff",
                tags: ["BUMDes", "Ekonomi", "Bupati", "Peresmian"]
            });
            setIsLoading(false);
        }, 600);

        return () => clearTimeout(timer);
    }, [newsId]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center animate-pulse">
                <div className="flex flex-col items-center">
                    <i className="far fa-newspaper text-5xl text-brand-500/50 mb-4 animate-bounce"></i>
                    <p className="font-bold text-slate-400">Mencetak Lembar Berita...</p>
                </div>
            </div>
        );
    }

    if (!article) return <div className="min-h-screen flex items-center justify-center">Artikel tidak ditemukan</div>;

    return (
        <div className="bg-white min-h-screen pb-32 pt-20 md:pt-28">
            
            {/* ARTICLE HERO - WRAPPED IN CONTAINER TO AVOID NAVBAR */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative isolate">
                <div className="w-full h-[50vh] min-h-[400px] bg-slate-900 relative rounded-3xl overflow-hidden border border-slate-200">
                    
                    {/* Back button strictly positioned relative to this hero */}
                    <div className="absolute top-6 left-6 z-50">
                        <button onClick={() => router.back()} className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/40 transition-colors shadow-lg">
                            <i className="fas fa-arrow-left"></i>
                        </button>
                    </div>

                    <img src={article.image} alt="News Cover" className="absolute inset-0 w-full h-full object-cover opacity-60 animate-in fade-in duration-1000" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
                    
                    {/* Article Top Meta */}
                    <div className="absolute inset-x-0 bottom-0 p-6 md:p-12 flex flex-col items-center text-center animate-in slide-in-from-bottom-12 fade-in duration-700">
                        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
                            <span className="bg-brand-500 text-white font-extrabold px-3 py-1.5 rounded-full text-xs uppercase tracking-widest shadow-lg">{article.category}</span>
                            <span className="bg-white/20 backdrop-blur-md text-white font-medium px-3 py-1.5 rounded-full text-xs border border-white/30"><i className="far fa-clock"></i> {article.readTime}</span>
                            <span className="bg-white/20 backdrop-blur-md text-white font-medium px-3 py-1.5 rounded-full text-xs border border-white/30"><i className="far fa-calendar-alt"></i> Ditulis pada {article.date}</span>
                        </div>
                        
                        <h1 className="text-3xl md:text-5xl lg:text-5xl font-extrabold text-white mb-2 leading-tight max-w-4xl drop-shadow-xl">{article.title}</h1>
                    </div>
                </div>
            </div>

            {/* AUTHOR FLOATING CARD */}
            <div className="max-w-4xl mx-auto px-4 relative z-20 -mt-8 mb-12 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-200">
                <div className="bg-white rounded-3xl p-4 md:p-6 shadow-2xl shadow-slate-900/10 border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <img src={article.authorAvatar} alt="Author" className="w-14 h-14 rounded-full shadow-inner" />
                        <div>
                            <p className="font-extrabold text-slate-900 text-sm md:text-base leading-none mb-1">{article.author}</p>
                            <p className="text-slate-500 text-xs md:text-sm font-medium">{article.authorRole}</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-100 transition-colors"><i className="fab fa-facebook-f text-sm"></i></button>
                        <button className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-100 transition-colors"><i className="fab fa-twitter text-sm"></i></button>
                        <button className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center hover:bg-emerald-100 transition-colors"><i className="fas fa-link text-sm"></i></button>
                    </div>
                </div>
            </div>

            {/* ARTICLE CONTENT */}
            <article className="max-w-3xl mx-auto px-6 md:px-8 prose prose-slate md:prose-lg lg:prose-xl prose-headings:font-extrabold prose-p:leading-relaxed prose-p:font-medium prose-a:text-brand-600 prose-img:rounded-3xl animate-in fade-in duration-1000 delay-300">
                {/* Simulated rendering of HTML content */}
                <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
                
                {/* Tags */}
                <div className="mt-12 flex flex-wrap gap-2 pt-8 border-t border-slate-200">
                    <span className="font-bold text-sm text-slate-400 mr-2 flex items-center">KATA KUNCI:</span>
                    {article.tags.map(tag => (
                        <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 cursor-pointer transition-colors">#{tag}</span>
                    ))}
                </div>
            </article>

            {/* READ NEXT / SUGGESTION MODULE */}
            <div className="max-w-5xl mx-auto px-4 mt-24">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-extrabold text-slate-900">Mungkin Anda Terlewat</h3>
                    <Link href="/berita" className="text-sm font-bold text-brand-600 hover:text-brand-700">Lihat Semua Topik &rarr;</Link>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Dummy related card 1 */}
                    <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 flex gap-4 cursor-pointer hover:bg-slate-100 transition-colors group">
                        <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1592982537447-6f2ae3e2fb7d?w=400&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-[10px] uppercase font-bold text-brand-500 mb-2">Pemberdayaan</span>
                            <h4 className="font-bold text-slate-800 leading-snug line-clamp-2">Musim Panen Tiba, Harga Beras Organik Kelompok Tani Melonjak</h4>
                        </div>
                    </div>
                    {/* Dummy related card 2 */}
                    <div className="bg-slate-50 rounded-3xl p-4 border border-slate-100 flex gap-4 cursor-pointer hover:bg-slate-100 transition-colors group">
                        <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <span className="text-[10px] uppercase font-bold text-brand-500 mb-2">Keamanan</span>
                            <h4 className="font-bold text-slate-800 leading-snug line-clamp-2">Pemerintah Desa Luncurkan Layanan Aduan Warga Berbasis AI</h4>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
