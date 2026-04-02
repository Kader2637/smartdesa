"use client";

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function StatistikGlobalPage() {
    const [chartReady, setChartReady] = useState(false);

    const initCharts = () => {
        if (!window.Chart) return;

        // Custom config default font
        window.Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";
        window.Chart.defaults.color = '#64748b';

        // 1. Demografi Chart (Bar)
        const ctxDemografi = document.getElementById('demografiChart');
        if (ctxDemografi) {
            new window.Chart(ctxDemografi.getContext('2d'), {
                type: 'bar',
                data: {
                    labels: ['0-14 Tahun', '15-24 Tahun', '25-34 Tahun', '35-44 Tahun', '45-54 Tahun', '55+ Tahun'],
                    datasets: [
                        {
                            label: 'Laki-laki',
                            data: [800, 950, 1100, 850, 600, 450],
                            backgroundColor: '#3b82f6', // blue-500
                            borderRadius: 4,
                        },
                        {
                            label: 'Perempuan',
                            data: [780, 920, 1050, 880, 620, 452],
                            backgroundColor: '#ec4899', // pink-500
                            borderRadius: 4,
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true, grid: { borderDash: [4, 4], color: '#e2e8f0' } },
                        x: { grid: { display: false } }
                    },
                    plugins: {
                        legend: { position: 'top', align: 'end' }
                    }
                }
            });
        }

        // 2. Umkm Chart (Doughnut)
        const ctxUmkm = document.getElementById('umkmChart');
        if (ctxUmkm) {
            new window.Chart(ctxUmkm.getContext('2d'), {
                type: 'doughnut',
                data: {
                    labels: ['Kuliner / Makanan', 'Jasa', 'Kriya / Kerajinan', 'Lainnya'],
                    datasets: [{
                        data: [45, 25, 20, 10],
                        backgroundColor: ['#f97316', '#3b82f6', '#10b981', '#94a3b8'], // orange, blue, emerald, slate
                        borderWidth: 0,
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '72%',
                    plugins: {
                        legend: { display: false }
                    }
                }
            });
        }

        // 3. Surat Chart (Line)
        const ctxSuratEl = document.getElementById('suratChart');
        if (ctxSuratEl) {
            const ctxSurat = ctxSuratEl.getContext('2d');
            let gradient = ctxSurat.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
            gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');

            new window.Chart(ctxSurat, {
                type: 'line',
                data: {
                    labels: ['Oktober', 'November', 'Desember', 'Januari', 'Februari', 'Maret'],
                    datasets: [{
                        label: 'Total Surat Terbit',
                        data: [180, 210, 195, 280, 240, 310],
                        borderColor: '#10b981', // emerald-500
                        backgroundColor: gradient,
                        borderWidth: 3,
                        pointBackgroundColor: '#ffffff',
                        pointBorderColor: '#10b981',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7,
                        fill: true,
                        tension: 0.4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: { beginAtZero: true, grid: { borderDash: [4, 4], color: '#e2e8f0' } },
                        x: { grid: { display: false } }
                    },
                    plugins: {
                        legend: { display: false },
                        tooltip: { mode: 'index', intersect: false }
                    },
                    interaction: { mode: 'nearest', axis: 'x', intersect: false }
                }
            });
        }
    };

    return (
        <div className="space-y-6 fade-in min-h-[80vh]">
            <Script 
                src="https://cdn.jsdelivr.net/npm/chart.js" 
                strategy="lazyOnload" 
                onLoad={() => {
                    setChartReady(true);
                    initCharts();
                }}
            />
            
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Pusat Data & Statistik Desa</h2>
                    <p className="text-slate-500 text-sm mt-1">Data real-time kependudukan, perputaran ekonomi UMKM, dan layanan administrasi.</p>
                </div>
                <button className="bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-200 px-5 py-2.5 rounded-xl text-sm font-bold shadow-sm transition flex items-center justify-center gap-2 whitespace-nowrap">
                    <i className="fas fa-print"></i> Cetak Laporan
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition">
                    <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-emerald-600 text-7xl group-hover:scale-110 transition-transform duration-500">
                        <i className="fas fa-users"></i>
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-2">Total Penduduk</p>
                    <h3 className="text-3xl font-extrabold text-slate-800">8,452 <span className="text-sm font-semibold text-slate-500 tracking-normal">Jiwa</span></h3>
                    <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mt-3 border border-emerald-100">
                        <i className="fas fa-arrow-up"></i> 1.2% dari tahun lalu
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition">
                    <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-blue-600 text-7xl group-hover:scale-110 transition-transform duration-500">
                        <i className="fas fa-home"></i>
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-2">Kepala Keluarga</p>
                    <h3 className="text-3xl font-extrabold text-slate-800">2,104 <span className="text-sm font-semibold text-slate-500 tracking-normal">KK</span></h3>
                    <div className="flex items-center gap-3 mt-3 text-xs font-bold bg-slate-50 border border-slate-100 rounded-md px-2 py-1 w-fit">
                        <span className="text-blue-600 flex items-center gap-1"><i className="fas fa-male"></i> 1,800</span>
                        <span className="text-slate-300">|</span>
                        <span className="text-pink-500 flex items-center gap-1"><i className="fas fa-female"></i> 304</span>
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition">
                    <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-orange-600 text-7xl group-hover:scale-110 transition-transform duration-500">
                        <i className="fas fa-store"></i>
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-2">UMKM Aktif</p>
                    <h3 className="text-3xl font-extrabold text-slate-800">142 <span className="text-sm font-semibold text-slate-500 tracking-normal">Usaha</span></h3>
                    <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md mt-3 border border-emerald-100">
                        <i className="fas fa-arrow-up"></i> +12 Bulan Ini
                    </div>
                </div>

                <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition">
                    <div className="absolute -right-4 -bottom-4 opacity-[0.03] text-indigo-600 text-7xl group-hover:scale-110 transition-transform duration-500">
                        <i className="fas fa-file-signature"></i>
                    </div>
                    <p className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mb-2">Surat Diterbitkan</p>
                    <h3 className="text-3xl font-extrabold text-slate-800">1,284 <span className="text-sm font-semibold text-slate-500 tracking-normal">Dokumen</span></h3>
                    <div className="inline-flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md mt-3 border border-slate-200">
                        Rata-rata 4 / hari
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-800">Demografi Usia Penduduk</h3>
                        <button className="text-slate-400 hover:text-emerald-600 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition"><i className="fas fa-ellipsis-v"></i></button>
                    </div>
                    <div className="relative h-72 w-full">
                        <canvas id="demografiChart"></canvas>
                        {!chartReady && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-emerald-500 animate-spin"></div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg text-slate-800">Sebaran Kategori UMKM</h3>
                        <button className="text-slate-400 hover:text-emerald-600 w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center transition"><i className="fas fa-ellipsis-v"></i></button>
                    </div>
                    <div className="relative h-56 w-full flex justify-center mb-4 flex-1">
                        <canvas id="umkmChart"></canvas>
                        {!chartReady && (
                            <div className="absolute inset-0 flex items-center justify-center mb-8">
                                <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-orange-500 animate-spin"></div>
                            </div>
                        )}
                    </div>
                    <div className="mt-auto grid grid-cols-2 gap-3 text-xs font-bold text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2.5"><span className="w-3 h-3 rounded-full bg-orange-500 shadow-sm shadow-orange-300"></span> Makanan (45%)</div>
                        <div className="flex items-center gap-2.5"><span className="w-3 h-3 rounded-full bg-blue-500 shadow-sm shadow-blue-300"></span> Jasa (25%)</div>
                        <div className="flex items-center gap-2.5"><span className="w-3 h-3 rounded-full bg-emerald-500 shadow-sm shadow-emerald-300"></span> Kriya (20%)</div>
                        <div className="flex items-center gap-2.5"><span className="w-3 h-3 rounded-full bg-slate-400 shadow-sm shadow-slate-300"></span> Lainnya (10%)</div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h3 className="font-bold text-lg text-slate-800">Tren Pengajuan Surat Administrasi (6 Bulan Terakhir)</h3>
                    <select className="border border-slate-200 text-sm font-bold text-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 bg-slate-50 cursor-pointer transition">
                        <option>Tahun 2026</option>
                        <option>Tahun 2025</option>
                    </select>
                </div>
                <div className="relative h-80 w-full">
                    <canvas id="suratChart"></canvas>
                    {!chartReady && (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full border-4 border-slate-200 border-t-emerald-500 animate-spin"></div>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}
