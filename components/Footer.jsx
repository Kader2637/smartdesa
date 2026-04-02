"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown'; 

export default function Footer() {
    const pathname = usePathname() || '/';
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { sender: 'ai', text: 'Halo! 👋 Di sini Smart Desa Nusantara. Ada yang bisa saya bantu terkait layanan desa atau UMKM hari ini?' }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    if (pathname.startsWith('/warga') || pathname.startsWith('/admin') || pathname.startsWith('/seller')) {
        return null;
    }

    const handleSendMessage = async (text) => {
        if (!text.trim()) return;

        setMessages((prev) => [...prev, { sender: 'user', text }]);
        setInputValue("");
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: text })
            });
            
            const data = await res.json();
            
            if (data.reply) {
                setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }]);
            } else {
                setMessages((prev) => [...prev, { sender: 'ai', text: "Maaf, sistem sedang gangguan. Coba lagi nanti." }]);
            }
        } catch (error) {
            setMessages((prev) => [...prev, { sender: 'ai', text: "Gagal menyambung ke server." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <footer className="bg-[#0b1120] text-slate-300 relative overflow-hidden border-t border-slate-800">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none"></div>
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-teal-500/10 blur-[100px] rounded-full translate-y-1/2 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 relative z-10">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-[2.5rem] p-10 md:p-16 border border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full"></div>
                        <div className="relative z-10 max-w-2xl text-center md:text-left">
                            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">Siap mentransformasi desa Anda menuju era digital?</h2>
                            <p className="text-slate-400 text-lg">Bergabunglah dengan ekosistem SmartDesa Nusantara untuk mendigitalkan administrasi, memperluas jangkauan UMKM, dan menyejahterakan warga.</p>
                        </div>
                        <div className="relative z-10 shrink-0">
                            <Link href="/login" className="inline-flex items-center justify-center gap-3 px-8 py-4 text-sm font-bold bg-emerald-500 text-white rounded-full hover:bg-emerald-400 hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25">
                                Mulai Sekarang <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>

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

            {isChatOpen && (
                <div className="fixed bottom-24 right-4 sm:right-8 z-50 w-[380px] sm:w-[420px] max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 fade-in duration-300">
                    <div className="bg-gradient-to-r from-emerald-600 to-teal-500 p-4 flex justify-between items-center text-white">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                <i className="fas fa-robot text-sm"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm leading-tight">Asisten SmartDesa</h3>
                                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse"></span> Online
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsChatOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/20 transition-colors"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>

                    <div className="p-4 bg-slate-50 flex-1 overflow-y-auto min-h-[350px] max-h-[450px] flex flex-col gap-3">
                        {messages.map((msg, index) => (
                            <div key={index} className={`max-w-[85%] p-3 text-sm rounded-2xl shadow-sm border ${
                                msg.sender === 'user' 
                                ? 'bg-emerald-500 text-white rounded-tr-sm self-end border-emerald-600' 
                                : 'bg-white text-slate-700 rounded-tl-sm self-start border-slate-100'
                            }`}>
                                {msg.sender === 'user' ? (
                                    msg.text
                                ) : (
                                    <div className="flex flex-col gap-2 [&>p]:mb-1 [&>ul]:list-disc [&>ul]:ml-5 [&>ol]:list-decimal [&>ol]:ml-5 [&>strong]:font-bold text-slate-700">
                                        <ReactMarkdown>{msg.text}</ReactMarkdown>
                                    </div>
                                )}
                            </div>
                        ))}

                        {isLoading && (
                            <div className="bg-white p-3 rounded-2xl rounded-tl-sm border border-slate-100 text-slate-400 self-start w-max flex gap-1">
                                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                                <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {messages.length === 1 && (
                        <div className="px-4 pb-2 bg-slate-50 space-y-2">
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider ml-1">Saran Pertanyaan</p>
                            <div className="flex flex-wrap gap-2">
                                {["Cara buat SKTM?", "Lapor gangguan", "Daftar UMKM"].map((q, idx) => (
                                    <button 
                                        key={idx} onClick={() => handleSendMessage(q)}
                                        className="text-xs px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full hover:bg-emerald-200 transition-colors"
                                    >
                                        {q}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="p-3 bg-white border-t border-slate-100 flex gap-2">
                        <input 
                            type="text" 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
                            placeholder="Ketik pesan Anda..." 
                            className="flex-1 px-4 py-2 bg-slate-100 rounded-full text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                        />
                        <button 
                            onClick={() => handleSendMessage(inputValue)}
                            disabled={isLoading || !inputValue.trim()}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform shadow-md ${
                                isLoading || !inputValue.trim() ? 'bg-slate-300 cursor-not-allowed text-white/50' : 'bg-emerald-500 text-white hover:bg-emerald-600 active:scale-95'
                            }`}
                        >
                            <i className="fas fa-paper-plane text-sm -ml-0.5 mt-0.5"></i>
                        </button>
                    </div>
                </div>
            )}

            <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40">
                <button 
                    onClick={() => setIsChatOpen(!isChatOpen)}
                    className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 group ${
                        isChatOpen 
                        ? 'bg-slate-700 hover:bg-slate-800 scale-90' 
                        : 'bg-emerald-500 hover:bg-emerald-400 hover:-translate-y-1 hover:shadow-emerald-500/40'
                    }`}
                    aria-label="Toggle Chatbot"
                >
                    <i className={`fas ${isChatOpen ? 'fa-times text-xl' : 'fa-comment-dots text-2xl group-hover:animate-pulse'}`}></i>
                    
                    {!isChatOpen && (
                        <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-red-500 border-2 border-[#0b1120] rounded-full animate-bounce"></span>
                    )}
                </button>
            </div>
        </>
    );
}