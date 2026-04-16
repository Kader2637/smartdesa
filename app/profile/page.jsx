import Link from 'next/link';

export const metadata = {
    title: 'Profil Desa Maju Bersama — SmartDesa Nusantara',
    description: 'Profil resmi Desa Maju Bersama: sejarah, visi misi, struktur pemerintahan desa, dan data kependudukan.',
};

const PERANGKAT = [
    {
        jabatan: 'Kepala Desa',
        nama: ' Kader',
        periode: 'Periode 2023–2029',
        foto: 'https://images.unsplascom/photo-1560250097-0b93528c311a?w=400&q=80',
        highlight: true,
    },
    {
        jabatan: 'Sekretaris Desa',
        nama: 'Dra. Ninik Rahayu',
        periode: 'Sejak 2018',
        foto: 'https://images.unsplascom/photo-1573496359142-b8d87734a5a2?w=400&q=80',
    },
    {
        jabatan: 'Kaur Keuangan',
        nama: 'Bambang Wijaya, S.E.',
        periode: 'Sejak 2020',
        foto: 'https://images.unsplascom/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    },
    {
        jabatan: 'Kaur Umum',
        nama: 'Sri Mulyani, A.Md.',
        periode: 'Sejak 2021',
        foto: 'https://images.unsplascom/photo-1580489944761-15a19d654956?w=400&q=80',
    },
    {
        jabatan: 'Kasi Pemerintahan',
        nama: 'Ahmad Fauzi, S.',
        periode: 'Sejak 2019',
        foto: 'https://images.unsplascom/photo-1500648767791-00dcc994a43e?w=400&q=80',
    },
    {
        jabatan: 'Kasi Pembangunan',
        nama: 'Endang Lestari',
        periode: 'Sejak 2022',
        foto: 'https://images.unsplascom/photo-1438761681033-6461ffad8d80?w=400&q=80',
    },
];

const STATISTIK = [
    { icon: 'fas fa-users', angka: '3.842', label: 'Total Penduduk', warna: 'from-blue-500 to-blue-600' },
    { icon: 'fas fa-home', angka: '1.024', label: 'Kepala Keluarga', warna: 'from-emerald-500 to-emerald-600' },
    { icon: 'fas fa-store', angka: '84', label: 'UMKM Aktif', warna: 'from-orange-500 to-orange-600' },
    { icon: 'fas fa-map', angka: '4.2 km²', label: 'Luas Wilayah', warna: 'from-purple-500 to-purple-600' },
];

const PRESTASI = [
    { tahun: '2024', icon: 'fas fa-trophy', judul: 'Desa Inovatif Terbaik Kabupaten', ket: 'Penghargaan dari Bupati atas inovasi layanan digital SmartDesa.', warna: 'bg-amber-50 border-amber-200 text-amber-700' },
    { tahun: '2023', icon: 'fas fa-award', judul: 'Desa Digital Percontohan Jawa Timur', ket: 'Ditunjuk sebagai desa percontohan program transformasi digital provinsi.', warna: 'bg-blue-50 border-blue-200 text-blue-700' },
    { tahun: '2022', icon: 'fas fa-leaf', judul: 'Juara 1 Lomba Kebersihan Lingkungan', ket: 'Meraih juara Adipura tingkat kecamatan atas kebersihan lingkungan.', warna: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
];

const GALERI = [
    { src: 'https://images.unsplascom/photo-1573153978668-a9c97fa0b1f5?w=600&q=80', alt: 'Pemandangan Desa', caption: 'Hamparan sawah desa di pagi hari' },
    { src: 'https://images.unsplascom/photo-1542044896530-3c9bca0c8e44?w=600&q=80', alt: 'Kegiatan Warga', caption: 'Gotong royong kerja bakti RT' },
    { src: 'https://images.unsplascom/photo-1533900298318-6b8da08a523e?w=600&q=80', alt: 'UMKM Desa', caption: 'Pameran produk UMKM unggulan' },
    { src: 'https://images.unsplascom/photo-1584553421349-17f25e9b5c03?w=600&q=80', alt: 'Posyandu', caption: 'Posyandu Balita aktif tiap bulan' },
    { src: 'https://images.unsplascom/photo-1592982537447-7440770cbfc9?w=600&q=80', alt: 'Pertanian', caption: 'Lahan pertanian organik warga' },
    { src: 'https://images.unsplascom/photo-1566073771259-6a8506099945?w=600&q=80', alt: 'Infrastruktur', caption: 'Jalan desa hasil pembangunan 2024' },
];

export default function ProfileDesaPage() {
    return (
        <main className="min-h-screen bg-white">

            {/* ─── HERO ─────────────────────────────────────────────── */}
            <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
                <img
                    src="desa.png"
                    alt="Desa Maju Bersama"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                {/* Floating badge */}
                <div className="absolute top-32 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-white/20 backdrop-blur-xl border border-white/30 text-white text-xs font-bold px-5 py-2 rounded-full shadow-xl flex items-center gap-2">
                        <i className="fas fa-map-marker-alt text-emerald-400"></i>
                        Kecamatan Singosari · Kabupaten Malang · Jawa Timur
                    </div>
                </div>

                <div className="relative z-10 max-w-6xl mx-auto px-6 pb-16 w-full">
                    <div className="max-w-3xl">
                        <span className="inline-block text-emerald-400 text-sm font-bold uppercase tracking-widest mb-3">— Profil Resmi</span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-none mb-5">
                            Desa Maju<br/>
                            <span className="text-emerald-400">Bersama</span>
                        </h1>
                        <p className="text-slate-300 text-lg max-w-xl leading-relaxed">
                            Berdiri sejak 1945 · Transformasi digital menuju desa mandiri dan sejahtera untuk seluruh warga.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-8">
                            <Link href="/layanan" className="px-6 py-3 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600 transition shadow-xl shadow-emerald-500/30">
                                <i className="fas fa-file-alt mr-2"></i> Akses Layanan
                            </Link>
                            <Link href="#struktur" className="px-6 py-3 bg-white/10 border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition backdrop-blur-sm">
                                <i className="fas fa-arrow-down mr-2"></i> Lihat Profil Lengkap
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── STATISTIK FLOATING CARDS ──────────────────────────── */}
            <section className="max-w-6xl mx-auto px-6 -mt-12 relative z-20 mb-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {STATISTIK.map((s, i) => (
                        <div key={i} className={`bg-gradient-to-br ${s.warna} text-white rounded-2xl p-6 shadow-xl text-center`}>
                            <i className={`${s.icon} text-3xl mb-3 opacity-80`}></i>
                            <p className="text-3xl font-extrabold leading-none">{s.angka}</p>
                            <p className="text-xs font-bold uppercase tracking-wider mt-2 opacity-80">{s.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── VISI MISI ─────────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-6 mb-24">
                <div className="text-center mb-12">
                    <span className="text-emerald-600 text-sm font-bold uppercase tracking-widest">Arah Pemerintahan</span>
                    <h2 className="text-4xl font-extrabold text-slate-900 mt-2">Visi & Misi Desa</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-8 border border-emerald-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-emerald-500/30">
                                <i className="fas fa-eye"></i>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider">Visi</p>
                                <h3 className="text-xl font-extrabold text-slate-900">Tujuan Besar</h3>
                            </div>
                        </div>
                        <p className="text-slate-700 text-lg leading-relaxed italic font-medium border-l-4 border-emerald-400 pl-6">
                            "Terwujudnya Desa Maju Bersama yang mandiri, berdaya saing, dan sejahtera berbasis kearifan lokal dan teknologi digital untuk seluruh masyarakat."
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-8 border border-blue-100">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center text-2xl shadow-lg shadow-blue-500/30">
                                <i className="fas fa-bullseye"></i>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-blue-500 uppercase tracking-wider">Misi</p>
                                <h3 className="text-xl font-extrabold text-slate-900">Langkah Nyata</h3>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {[
                                'Meningkatkan kualitas SDM melalui pendidikan dan pelatihan vokasi.',
                                'Mengembangkan perekonomian warga berbasis UMKM dan pertanian organik.',
                                'Meningkatkan layanan administrasi berbasis teknologi digital.',
                                'Menjaga kelestarian lingkungan hidup dan budaya lokal desa.',
                            ].map((m, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-700 text-sm">
                                    <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-extrabold shrink-0 mt-0.5 shadow-sm">{i + 1}</span>
                                    {m}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* ─── KEPALA DESA HIGHLIGHT ─────────────────────────────── */}
            <section className="bg-slate-900 text-white py-20 mb-24" id="struktur">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-emerald-400 text-sm font-bold uppercase tracking-widest">Pemimpin Desa</span>
                            <h2 className="text-4xl font-extrabold mt-2 mb-6"> Abdul Kader</h2>
                            <p className="text-slate-400 font-bold uppercase tracking-wider text-xs mb-5">Kepala Desa Maju Bersama · Periode 2023–2029</p>
                            <p className="text-slate-300 leading-relaxed mb-6">
                                Dipilih secara demokratis oleh seluruh warga pada Pilkades 2023, Bapak  Abdul Kader berkomitmen membawa Desa Maju Bersama menuju era transformasi digital dan pertumbuhan ekonomi yang inklusif bagi semua lapisan masyarakat.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <div className="bg-slate-800 rounded-xl px-4 py-2 text-sm font-bold flex items-center gap-2">
                                    <i className="fas fa-graduation-cap text-emerald-400"></i> Testing ya guys
                                </div>
                                <div className="bg-slate-800 rounded-xl px-4 py-2 text-sm font-bold flex items-center gap-2">
                                    <i className="fas fa-briefcase text-blue-400"></i> 15+ Tahun Pengalaman
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="absolute -top-4 -right-4 w-72 h-80 bg-emerald-500/20 rounded-3xl"></div>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsev8493DrcTiTsFcLExeWSucUB2NTKAd6ZQ&s"
                                alt="Kepala Desa  Kader"
                                className="relative z-10 w-full max-w-xs md:max-w-sm mx-auto rounded-3xl object-cover shadow-2xl aspect-[3/4]"
                            />
                            <div className="absolute -bottom-4 -left-4 bg-emerald-500 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-xl z-20">
                                <i className="fas fa-check-circle mr-2"></i>Menjabat 2023–2029
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── PERANGKAT DESA ────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-6 mb-24">
                <div className="text-center mb-12">
                    <span className="text-emerald-600 text-sm font-bold uppercase tracking-widest">Tim Kami</span>
                    <h2 className="text-4xl font-extrabold text-slate-900 mt-2">Perangkat Desa</h2>
                    <p className="text-slate-500 mt-3">Dedikasi penuh untuk melayani seluruh warga Desa Maju Bersama.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                    {PERANGKAT.filter(p => !p.highlight).map((p, i) => (
                        <div key={i} className="group text-center">
                            <div className="relative mb-4 overflow-hidden rounded-2xl aspect-square">
                                <img
                                    src={p.foto}
                                    alt={p.nama}
                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-3">
                                    <p className="text-white text-xs font-bold">{p.periode}</p>
                                </div>
                            </div>
                            <p className="font-extrabold text-slate-900 text-sm">{p.nama}</p>
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide mt-0.5">{p.jabatan}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── GALERI DESA ───────────────────────────────────────── */}
            <section className="bg-slate-50 py-20 mb-24">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <span className="text-emerald-600 text-sm font-bold uppercase tracking-widest">Kehidupan Desa</span>
                        <h2 className="text-4xl font-extrabold text-slate-900 mt-2">Galeri Foto</h2>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {GALERI.map((g, i) => (
                            <div key={i} className="group relative overflow-hidden rounded-2xl aspect-[4/3]">
                                <img src={g.src} alt={g.alt} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex items-end p-4">
                                    <p className="text-white text-sm font-bold">{g.caption}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── PRESTASI ──────────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-6 mb-24">
                <div className="text-center mb-12">
                    <span className="text-emerald-600 text-sm font-bold uppercase tracking-widest">Kebanggaan Bersama</span>
                    <h2 className="text-4xl font-extrabold text-slate-900 mt-2">Prestasi & Penghargaan</h2>
                </div>
                <div className="space-y-5">
                    {PRESTASI.map((item, i) => (
                        <div key={i} className={`flex items-start gap-6 border rounded-2xl p-6 ${item.warna} transition hover:shadow-md`}>
                            <div className="w-16 h-16 bg-white rounded-2xl flex flex-col items-center justify-center shadow-sm shrink-0">
                                <i className={`${item.icon} text-xl mb-1`}></i>
                                <span className="text-xs font-extrabold">{item.tahun}</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-extrabold text-slate-900 mb-1">{item.judul}</h3>
                                <p className="text-slate-600 text-sm">{item.ket}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ─── CTA ───────────────────────────────────────────────── */}
            <section className="max-w-6xl mx-auto px-6 mb-20">
                <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-3xl p-12 text-center text-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full translate-x-1/3 -translate-y-1/3"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-1/3 translate-y-1/3"></div>
                    <div className="relative">
                        <h2 className="text-4xl font-extrabold mb-4">Warga Desa Maju Bersama?</h2>
                        <p className="text-emerald-100 text-lg mb-10 max-w-xl mx-auto">Akses semua layanan administrasi, belanja UMKM lokal, dan buat laporan — semua dari satu platform digital desa.</p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <Link href="/login" className="px-8 py-4 bg-white text-emerald-700 font-extrabold rounded-2xl hover:bg-emerald-50 transition shadow-xl shadow-emerald-900/20 hover:-translate-y-0.5">
                                <i className="fas fa-sign-in-alt mr-2"></i> Masuk / Daftar Sekarang
                            </Link>
                            <Link href="/layanan" className="px-8 py-4 bg-white/10 border-2 border-white/40 text-white font-bold rounded-2xl hover:bg-white/20 transition backdrop-blur-sm">
                                <i className="fas fa-file-alt mr-2"></i> Urusi Surat Online
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
