"use client";

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

// Simple IntersectionObserver hook for entrance animations
function useOnScreen(ref) {
  const [isIntersecting, setIntersecting] = useState(false)
  useEffect(() => {
    if(!ref.current) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIntersecting(true)
        observer.disconnect()
      }
    }, { rootMargin: '0px 0px -100px 0px', threshold: 0.1 });
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
  return isIntersecting
}

function Reveal({ children, className = "", delay = 0 }) {
    const ref = useRef(null)
    const isVisible = useOnScreen(ref)
    
    return (
        <div 
            ref={ref} 
            style={{ transitionDelay: `${delay}ms` }}
            className={`transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} ${className}`}
        >
            {children}
        </div>
    )
}

// Custom Typewriter Component for Hero Section
const Typewriter = ({ words, delay = 100 }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeoutId;

    if (!isDeleting && currentText === word) {
      timeoutId = setTimeout(() => setIsDeleting(true), 1500); // Wait before deleting
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    } else {
      const nextChar = isDeleting 
        ? word.substring(0, currentText.length - 1) 
        : word.substring(0, currentText.length + 1);
        
      timeoutId = setTimeout(() => {
        setCurrentText(nextChar);
      }, isDeleting ? delay / 2 : delay);
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, currentWordIndex, words, delay]);

  return (
    <>
      {currentText}
      <span className="animate-pulse ml-1 text-slate-800" style={{ WebkitTextFillColor: 'initial' }}>|</span>
    </>
  );
};

export default function Home() {
  const [modalData, setModalData] = useState(null);

  // Stats Data
  const stats = [
      { id: 1, value: "15.420+", label: "Warga Terdaftar", icon: "fa-users" },
      { id: 2, value: "1.284", label: "Surat Diterbitkan", icon: "fa-file-signature" },
      { id: 3, value: "142", label: "UMKM Aktif", icon: "fa-store" },
      { id: 4, value: "99%", label: "Skor Kepuasan", icon: "fa-star" },
  ];

  // UMKM Data
  const umkmData = [
    { id: 1, nama: "Kopi Arabika Gayo", penjual: "Pak Budi", kategori: "Kopi Lokal", harga: "Rp 65.000", rating: 4.9, img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&q=80" },
    { id: 2, nama: "Kerajinan Bambu", penjual: "Ibu Siti", kategori: "Kriya", harga: "Rp 120.000", rating: 4.8, img: "https://images.unsplash.com/photo-1516707328634-11005fb4142f?w=600&q=80" },
    { id: 3, nama: "Madu Hutan Liar", penjual: "Peternakan Desa", kategori: "Kesehatan", harga: "Rp 85.000", rating: 5.0, img: "https://images.unsplash.com/photo-1587049352847-4d4b1ed748d3?w=600&q=80" },
    { id: 4, nama: "Tenun Ikat Khas", penjual: "Kelompok Tenun", kategori: "Pakaian", harga: "Rp 250.000", rating: 4.9, img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80" }
  ];

  return (
    <div className="overflow-hidden bg-white selection:bg-emerald-500 selection:text-white">
      
      {/* GLOBAL HERO KEYFRAMES */}
      <style jsx global>{`
        @keyframes custom-blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes custom-float {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        @keyframes custom-float-reverse {
          0% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-2deg); }
          100% { transform: translateY(0) rotate(0deg); }
        }
        .animate-custom-blob { animation: custom-blob 7s infinite alternate ease-in-out; }
        .animate-custom-float { animation: custom-float 6s ease-in-out infinite; }
        .animate-custom-float-reverse { animation: custom-float-reverse 7s ease-in-out infinite; }
      `}</style>
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[100vh] flex items-center pt-20 lg:pt-0 overflow-hidden">
        {/* Abstract Background Elements with Active Keyframes */}
        <div className="absolute top-0 inset-x-0 h-screen bg-slate-50/50 -z-20"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-emerald-200/40 rounded-full blur-[120px] mix-blend-multiply -z-10 animate-custom-blob"></div>
        <div className="absolute top-40 -left-20 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[100px] mix-blend-multiply -z-10 animate-custom-blob" style={{ animationDelay: '2s', animationDuration: '9s' }}></div>
        <div className="absolute bottom-[-100px] left-1/2 w-[800px] h-[300px] bg-brand-300/20 rounded-[100%] blur-[100px] mix-blend-multiply -z-10 animate-custom-blob" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-white via-white/80 to-transparent -z-10 pointer-events-none"></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay -z-10 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8 z-10">
          
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left animate-in slide-in-from-bottom-10 fade-in duration-1000">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-100 bg-emerald-50/50 backdrop-blur-sm text-emerald-700 font-semibold text-sm mb-6 shadow-[0_0_20px_rgba(16,185,129,0.15)] group hover:bg-emerald-100 hover:border-emerald-200 transition-all cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                Desa Tunjungtirto Go Digital
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
                Layanan Desa <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 via-teal-500 to-sky-500 relative inline-block drop-shadow-sm hover:scale-[1.02] transition-transform min-h-[1.2em]">
                    <Typewriter words={['Dalam Genggaman', 'Lebih Cepat & Praktis', 'Lebih Transparan']} delay={100} />
                    <svg className="absolute w-full h-4 -bottom-2 left-0 text-emerald-200/50 -z-10 animate-pulse" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor"></path></svg>
                </span>
            </h1>
            
            <p className="text-lg lg:text-xl text-slate-500 max-w-lg mb-8 leading-relaxed font-medium">
                Pusat administrasi tercerdas. Ajukan surat online, dukung UMKM lokal, dan bangun lingkungan lebih baik dengan satu aplikasi super.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Link href="/login" className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-center hover:bg-emerald-600 hover:scale-105 transition-all duration-300 shadow-xl shadow-slate-900/10 hover:shadow-emerald-600/30 flex justify-center items-center gap-2 group">
                    Akses Dasbor Warga <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </Link>
                <Link href="#fitur" className="px-8 py-4 bg-white/70 backdrop-blur-md text-slate-800 border border-slate-200 rounded-full font-bold text-center hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 flex items-center justify-center gap-2 group">
                    Pelajari Ekosistem <i className="fas fa-arrow-down text-emerald-500 group-hover:translate-y-1 transition-transform"></i>
                </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative lg:h-[600px] flex items-center justify-center lg:justify-end animate-in fade-in duration-1000 delay-300 fill-mode-both perspective-[2000px]">
              {/* Floating UI Elements Showcase with Physics */}
              <div className="relative w-[340px] md:w-[400px] aspect-[4/5] transform-style-3d group">
                  
                  {/* Central Glow behind cards */}
                  <div className="absolute inset-20 bg-emerald-400/20 blur-[60px] rounded-full group-hover:bg-brand-500/30 transition-colors duration-1000"></div>

                  {/* Card 1: E-KTP / ID Card */}
                  <div className="absolute top-10 left-[-10%] md:left-0 w-64 bg-white/90 backdrop-blur-2xl p-5 rounded-2xl shadow-2xl border border-white/80 -rotate-6 transform hover:rotate-0 hover:scale-110 hover:z-50 transition-all duration-500 z-10 animate-custom-float-reverse">
                      <div className="flex items-center gap-4 mb-4">
                          <img src="https://ui-avatars.com/api/?name=Budi+S&background=10b981&color=fff" className="w-12 h-12 rounded-full shadow-md border-2 border-white" alt="Avatar"/>
                          <div>
                              <p className="font-bold text-slate-800 leading-tight">Budi Santoso</p>
                              <p className="text-[10px] text-emerald-600 font-extrabold font-mono tracking-wider">NIK: 3507******</p>
                          </div>
                      </div>
                      <div className="space-y-2">
                           <div className="h-2 bg-slate-100 rounded-full w-full overflow-hidden"><div className="h-full bg-slate-200 w-1/3 animate-[shimmer_2s_infinite]"></div></div>
                           <div className="h-2 bg-slate-100 rounded-full w-4/5 overflow-hidden"><div className="h-full bg-slate-200 w-1/2 animate-[shimmer_2s_infinite]"></div></div>
                      </div>
                      <div className="mt-4 px-3 py-1.5 bg-emerald-50 rounded-lg border border-emerald-100 text-xs font-bold text-emerald-700 flex items-center justify-center gap-2 w-full shadow-inner">
                          <i className="fas fa-shield-check text-emerald-500"></i> Terverifikasi Desa
                      </div>
                  </div>

                  {/* Card 2: Market Order (Hero Image) */}
                  <div className="absolute top-[25%] right-[-10%] md:right-[-5%] w-72 bg-slate-900/95 backdrop-blur-2xl p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-slate-700/50 rotate-3 transform hover:-rotate-2 hover:scale-110 hover:z-50 transition-all duration-500 z-20 translate-x-4 animate-custom-float" style={{ animationDelay: '1s' }}>
                      <div className="w-full h-36 rounded-2xl bg-slate-800 overflow-hidden mb-4 relative group/img isolate">
                          <img src="https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=400&q=80" className="w-full h-full object-cover opacity-80 group-hover/img:scale-110 transition-transform duration-700" alt="Coffee"/>
                          <div className="absolute inset-0 bg-slate-900/20 group-hover/img:bg-transparent transition-colors z-10"></div>
                          <div className="absolute top-3 right-3 bg-brand-500 text-white text-[10px] font-bold px-2 py-1 rounded-lg z-20 shadow-lg">PRODUK LOKAL</div>
                      </div>
                      <h3 className="text-white font-extrabold text-lg leading-tight mb-1">Kopi Arabika Gayo</h3>
                      <p className="text-slate-400 text-xs flex justify-between items-center mb-4"><span>Rp 65.000</span> <span className="text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded flex items-center gap-1 font-bold"><i className="fas fa-star text-[10px]"></i> 4.9</span></p>
                      <button className="w-full py-3 bg-white text-slate-900 rounded-xl text-sm font-bold shadow-sm hover:bg-brand-500 hover:text-white transition-colors">Order di Pasar Warga &rarr;</button>
                  </div>

                  {/* Card 3: Notification */}
                  <div className="absolute bottom-[10%] left-[-5%] w-[270px] bg-white/95 backdrop-blur-xl p-4 rounded-2xl shadow-xl border border-white/80 -rotate-3 transform hover:rotate-2 hover:scale-110 transition-all duration-500 z-30 animate-custom-float-reverse" style={{ animationDelay: '0.5s', animationDuration: '5s' }}>
                      <div className="flex gap-4 items-center">
                          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0 border border-blue-100 shadow-inner relative">
                              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full"></span>
                              <i className="fas fa-file-signature text-lg"></i>
                          </div>
                          <div>
                              <p className="font-extrabold text-slate-800 text-sm">Surat Domisili <span className="text-emerald-500 ml-1"><i className="fas fa-check-circle"></i></span></p>
                              <p className="text-xs text-slate-500 mt-1 leading-snug">Pengajuan Keterangan Domisili Anda siap diunduh.</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section className="bg-slate-900 border-y border-slate-800 py-12 relative z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x divide-slate-800">
                  {stats.map((item, idx) => (
                      <Reveal delay={idx * 100} key={item.id}>
                          <div className={`flex flex-col ${idx % 2 === 0 ? 'items-start md:items-center' : 'items-start md:items-center'} pl-4 lg:pl-0`}>
                              <div className="flex items-center gap-3 mb-2">
                                  <i className={`fas ${item.icon} text-emerald-500 text-lg sm:text-2xl opacity-80`}></i>
                                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">{item.value}</h3>
                              </div>
                              <p className="text-slate-400 font-medium uppercase tracking-widest text-[10px] sm:text-xs">{item.label}</p>
                          </div>
                      </Reveal>
                  ))}
              </div>
          </div>
      </section>

      {/* 3. BENTO GRID FEATURES */}
      <section id="fitur" className="py-24 lg:py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                  <h2 className="text-brand-600 font-bold tracking-widest text-xs sm:text-sm uppercase mb-3">Ekosistem Digital</h2>
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                      Desain cerdas untuk <br className="hidden sm:block"/>kebutuhan warga masa kini.
                  </h3>
              </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[320px]">
            {/* Bento 1: Pelayanan */}
            <Reveal className="md:col-span-2 lg:col-span-2 row-span-1 rounded-[2rem] bg-white border border-slate-200 p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:shadow-xl hover:border-emerald-200 transition-all duration-500">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:bg-emerald-100 transition-colors duration-500"></div>
                <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <i className="fas fa-file-invoice"></i>
                    </div>
                    <h4 className="text-2xl font-extrabold text-slate-900 mb-3">E-Administrasi Kilat</h4>
                    <p className="text-slate-500 text-lg leading-relaxed max-w-md">Ajukan surat KTP, domisili, atau pengantar tanpa antre di kantor kelurahan. Unduh PDF dengan QR TTE langsung dari ponsel.</p>
                </div>
            </Reveal>

            {/* Bento 2: Lapor */}
            <Reveal delay={100} className="md:col-span-1 lg:col-span-2 row-span-1 rounded-[2rem] bg-slate-900 border border-slate-800 p-8 sm:p-10 shadow-lg relative overflow-hidden group hover:shadow-emerald-900/20 transition-all duration-500">
                <div className="absolute bottom-0 right-0 opacity-10 text-[180px] leading-none transform translate-y-1/4 translate-x-1/4 group-hover:-translate-y-4 transition-transform duration-700 pointer-events-none">
                    <i className="fas fa-bullhorn text-white"></i>
                </div>
                <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 bg-slate-800 text-white rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm border border-slate-700 group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-colors duration-500">
                        <i className="fas fa-camera"></i>
                    </div>
                    <h4 className="text-2xl font-extrabold text-white mb-3">Suara Warga (Lapor)</h4>
                    <p className="text-slate-400 text-lg leading-relaxed">Laporkan fasilitas rusak atau kejadian darurat dengan integrasi foto & GPS. Terhubung langsung ke kepala desa.</p>
                </div>
            </Reveal>

            {/* Bento 3: UMKM showcase abstract */}
            <Reveal delay={200} className="md:col-span-3 lg:col-span-2 row-span-1 rounded-[2rem] bg-gradient-to-br from-emerald-500 to-teal-600 p-8 sm:p-10 shadow-lg relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
                <div className="relative z-10 flex flex-col h-full text-white">
                    <div className="flex items-center gap-4 mb-auto">
                        <div className="flex -space-x-3">
                            <img className="w-12 h-12 rounded-full border-2 border-emerald-500 shadow-sm" src="https://ui-avatars.com/api/?name=Seller+A&background=fff" alt="" />
                            <img className="w-12 h-12 rounded-full border-2 border-emerald-500 shadow-sm" src="https://ui-avatars.com/api/?name=UMKM+B&background=e2e8f0" alt="" />
                            <div className="w-12 h-12 rounded-full border-2 border-emerald-500 bg-white shadow-sm flex items-center justify-center text-emerald-600 font-bold text-xs">+84</div>
                        </div>
                        <span className="text-emerald-100 font-medium font-sm">Penjual Aktif</span>
                    </div>
                    <div className="mt-8">
                        <h4 className="text-3xl font-extrabold text-white mb-2">Desa Marketplace</h4>
                        <p className="text-emerald-50 text-lg max-w-sm">Dukung ekonomi mandiri. Beli produk segar dan kerajinan otentik asli desa.</p>
                    </div>
                </div>
            </Reveal>

            {/* Bento 4: Statistik */}
            <Reveal delay={300} className="md:col-span-3 lg:col-span-2 row-span-1 rounded-[2rem] bg-white border border-slate-200 p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-emerald-200 transition-all duration-500">
                <div className="absolute bottom-0 right-0 w-full h-1/2 bg-gradient-to-t from-slate-50 to-transparent"></div>
                <div className="relative z-10 flex flex-col h-full">
                     <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                        <i className="fas fa-chart-pie"></i>
                    </div>
                    <h4 className="text-2xl font-extrabold text-slate-900 mb-2">Transparansi Data</h4>
                    <p className="text-slate-500 text-lg leading-relaxed">Statistik komprehensif pendataan warga, demografi, hingga transparansi dana desa.</p>
                </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 4. UMKM CAROUSEL */}
      <section className="py-24 lg:py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <Reveal>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                      <div>
                          <h2 className="text-brand-600 font-bold tracking-widest text-xs sm:text-sm uppercase mb-3">Marketplace</h2>
                          <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">Karya Tangan Desa</h3>
                      </div>
                      <Link href="/umkm" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-700 transition-colors group">
                          Jelajahi Semua <i className="fas fa-arrow-right transform group-hover:translate-x-1 transition-transform"></i>
                      </Link>
                  </div>
              </Reveal>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                  {umkmData.map((item, idx) => (
                      <Reveal delay={idx * 150} key={item.id}>
                          <div onClick={() => setModalData(item)} className="group cursor-pointer">
                              <div className="relative overflow-hidden rounded-[2rem] aspect-[4/5] bg-slate-100 mb-5 shadow-sm">
                                  <img src={item.img} alt={item.nama} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-slate-900/80 to-transparent flex justify-between items-end">
                                      <span className="bg-white/90 backdrop-blur text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full">{item.kategori}</span>
                                      <span className="bg-slate-900/80 backdrop-blur text-white text-xs font-bold px-2 py-1.5 rounded-lg flex items-center gap-1"><i className="fas fa-star text-yellow-400"></i> {item.rating}</span>
                                  </div>
                              </div>
                              <div className="px-2">
                                  <h4 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">{item.nama}</h4>
                                  <p className="text-sm text-slate-500 mb-2 font-medium">Oleh <span className="text-slate-700">{item.penjual}</span></p>
                                  <p className="text-lg font-extrabold text-emerald-600">{item.harga}</p>
                              </div>
                          </div>
                      </Reveal>
                  ))}
              </div>
          </div>
      </section>

        {/* MODAL UMKM PREVIEW */}
        {modalData && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-in fade-in duration-200" onClick={() => setModalData(null)}>
              <div className="bg-white rounded-[2rem] overflow-hidden max-w-sm w-full shadow-2xl relative animate-in zoom-in-95 duration-300" onClick={e => e.stopPropagation()}>
                  <button onClick={() => setModalData(null)} className="absolute top-4 right-4 w-10 h-10 bg-black/20 hover:bg-black/40 backdrop-blur text-white rounded-full flex items-center justify-center transition-colors z-10"><i className="fas fa-times"></i></button>
                  <div className="h-64 relative">
                      <img src={modalData.img} className="w-full h-full object-cover" alt={modalData.nama} />
                  </div>
                  <div className="p-8">
                      <span className="text-emerald-600 font-extrabold text-xs tracking-wider uppercase mb-2 block">{modalData.kategori}</span>
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{modalData.nama}</h3>
                      <p className="text-slate-500 text-sm mb-6 pb-6 border-b border-slate-100">Diproduksi dengan bahan lokal berkualitas unggul murni dari desa oleh UMKM {modalData.penjual}.</p>
                      
                      <div className="flex justify-between items-center bg-slate-50 p-4 rounded-2xl border border-slate-100">
                          <div>
                              <p className="text-[10px] uppercase font-bold text-slate-400 mb-0.5">Harga Produk</p>
                              <p className="text-2xl font-extrabold text-emerald-600">{modalData.harga}</p>
                          </div>
                          <Link href="/login" className="w-12 h-12 bg-slate-900 hover:bg-emerald-600 text-white rounded-xl flex items-center justify-center transition-colors shadow-lg">
                              <i className="fas fa-shopping-cart"></i>
                          </Link>
                      </div>
                  </div>
              </div>
          </div>
        )}

    </div>
  );
}
