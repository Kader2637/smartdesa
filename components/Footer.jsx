"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname() || '/';

    // Hide on dashboard pages
    if (pathname.startsWith('/warga') || pathname.startsWith('/admin') || pathname.startsWith('/seller')) {
        return null;
    }

    return (
        <footer className="bg-[#0b1120] text-slate-300 relative overflow-hidden border-t border-slate-800">
            {/* Background Glows */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none"></div>
            <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full translate-y-1/2 pointer-events-none"></div>

            {/* CTA Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 relative z-10">
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 md:p-16 border border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full"></div>
                    <div className="relative z-10 max-w-2xl text-center md:text-left">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Siap mentransformasi desa Anda menuju era digital?</h2>
                        <p className="text-slate-400 text-lg">Bergabunglah dengan ekosistem SmartDesa untuk mendigitalkan administrasi, memperluas jangkauan UMKM, dan menyejahterakan warga.</p>
                    </div>
                    <div className="relative z-10 shrink-0">
                        <Link href="/login" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold bg-emerald-500 text-white rounded-full hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25">
                            Mulai Sekarang <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main Footer Links */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10 border-t border-slate-800/50">
                <div className="lg:col-span-4">
                    <Link href="/" className="flex items-center gap-3 mb-6 w-max group">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:rotate-12 transition-transform duration-300">
                            <i className="fas fa-leaf text-xl"></i>
                        </div>
                        <span className="font-extrabold text-white tracking-tight text-3xl">
                            Smart<span className="text-emerald-500">Desa</span>
                        </span>
                    </Link>
                    <p className="text-slate-400 leading-relaxed mb-8 max-w-sm">
                        Platform tata kelola desa pintar terintegrasi. Menghubungkan warga, pemerintah desa, dan UMKM dalam satu ekosistem digital yang modern dan efisien.
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all duration-300"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all duration-300"><i className="fab fa-twitter"></i></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all duration-300"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-emerald-500 hover:text-white transition-all duration-300"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>

                <div className="lg:col-span-2 lg:col-start-6">
                    <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Platform</h4>
                    <ul className="space-y-4">
                        <li><Link href="/" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 transition-opacity"></div> Beranda</Link></li>
                        <li><Link href="/layanan" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 transition-opacity"></div> Layanan Desa</Link></li>
                        <li><Link href="/lapor" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 transition-opacity"></div> Pelaporan Warga</Link></li>
                        <li><Link href="/umkm" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 transition-opacity"></div> Pasar UMKM</Link></li>
                    </ul>
                </div>

                <div className="lg:col-span-2">
                    <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Informasi</h4>
                    <ul className="space-y-4">
                        <li><Link href="/berita" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 transition-opacity"></div> Berita Terkini</Link></li>
                        <li><Link href="/profil" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 transition-opacity"></div> Profil Desa</Link></li>
                        <li><Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 transition-opacity"></div> Transparansi Dana</Link></li>
                        <li><Link href="#" className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 transition-opacity"></div> Kebijakan Privasi</Link></li>
                    </ul>
                </div>

                <div className="lg:col-span-3">
                    <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-sm">Hubungi Kami</h4>
                    <ul className="space-y-5">
                        <li className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 text-emerald-500">
                                <i className="fas fa-map-marker-alt"></i>
                            </div>
                            <div className="text-slate-400 leading-relaxed">
                                <span className="block text-white font-medium mb-1">Kantor Kepala Desa</span>
                                Jl. Raya Tunjungtirto No. 01, Kec. Singosari, Kab. Malang, Jawa Timur 65153
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-emerald-500">
                                <i className="fas fa-envelope"></i>
                            </div>
                            <div className="text-slate-400 flex flex-col justify-center h-10">
                                <span className="block hover:text-emerald-400 transition-colors cursor-pointer">pemdes@tunjungtirto.desa.id</span>
                            </div>
                        </li>
                        <li className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center shrink-0 text-emerald-500">
                                <i className="fas fa-phone-alt"></i>
                            </div>
                            <div className="text-slate-400 flex flex-col justify-center h-10">
                                <span className="block hover:text-emerald-400 transition-colors cursor-pointer">(0341) 456-7890</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800/80">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Pemerintah Desa Tunjungtirto. Hak Cipta Dilindungi.</p>
                    <p className="flex items-center gap-1">Ditenagai oleh <span className="font-bold text-emerald-500 flex items-center"><i className="fas fa-bolt mr-1 text-yellow-500"></i> Next.js</span></p>
                </div>
            </div>
            
            <style jsx>{`
                li:hover > a > div { opacity: 1; }
            `}</style>
        </footer>
    );
}
