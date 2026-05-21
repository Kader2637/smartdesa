"use client";

import { createContext, useContext, useEffect, useState } from "react";

const SmartDesaContext = createContext();

export const useSmartDesa = () => useContext(SmartDesaContext);

const DUMMY_PRODUCTS = [
  { id: 1, nama: "Kopi Arabika Gayo", penjual: "Pak Budi", kategori: "Kopi Lokal", harga: 65000, rating: 4.9, img: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?w=600&q=80", stock: 15 },
  { id: 2, nama: "Kerajinan Bambu", penjual: "Ibu Siti", kategori: "Kriya", harga: 120000, rating: 4.8, img: "/kerajinan-bambu.png", stock: 5 },
  { id: 3, nama: "Madu Hutan Liar", penjual: "Peternakan Desa", kategori: "Kesehatan", harga: 85000, rating: 5.0, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdPOLr56s6vvHgt3ub3Ho5FLAWFnijgjqA1Q&s", stock: 12 },
  { id: 4, nama: "Tenun Ikat Khas", penjual: "Kelompok Tenun", kategori: "Pakaian", harga: 250000, rating: 4.9, img: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=600&q=80", stock: 8 }
];

const DUMMY_SURATS = [
  {
    id: '#TKT-001', type: 'Surat Keterangan Tidak Mampu (SKTM)', status: 'selesai',
    wargaName: 'Sutrisno', wargaNik: '35070001', alasan: 'Untuk beasiswa pendidikan anak',
    date: new Date(Date.now() - 7 * 86400000).toISOString(),
    rtSigned: true, rtSignedBy: 'Bapak Sugeng (RT 01)', rtSignedDate: new Date(Date.now() - 6 * 86400000).toISOString(),
    adminSigned: true, adminSignedBy: 'H. Suharto (Kades)', adminSignedDate: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: '#TKT-002', type: 'Surat Keterangan Usaha (SKU)', status: 'menunggu_kades',
    wargaName: 'Siti Aminah', wargaNik: '35070002', alasan: 'Pendaftaran UMKM desa',
    date: new Date(Date.now() - 3 * 86400000).toISOString(),
    rtSigned: true, rtSignedBy: 'Bapak Sugeng (RT 01)', rtSignedDate: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: '#TKT-003', type: 'Surat Pengantar Nikah (NA)', status: 'menunggu_rt',
    wargaName: 'Abdul Kader', wargaNik: '35070004', alasan: 'Pernikahan bulan depan',
    date: new Date(Date.now() - 1 * 86400000).toISOString(),
  },
  {
    id: '#TKT-004', type: 'Surat Pindah Domisili', status: 'ditolak',
    wargaName: 'Agus Pramono', wargaNik: '35070005', alasan: 'Pindah ke kota',
    date: new Date(Date.now() - 10 * 86400000).toISOString(),
    rtSigned: false,
  },
  {
    id: '#TKT-005', type: 'Surat Keterangan Tidak Mampu (SKTM)', status: 'menunggu_rt',
    wargaName: 'Rini Yulianti', wargaNik: '35070006', alasan: 'Keringanan biaya rumah sakit',
    date: new Date(Date.now() - 86400000 / 2).toISOString(),
  },
];

export const GlobalProvider = ({ children }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Data States
  const [currentUser, setCurrentUser] = useState(null);
  const [surats, setSurats] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [wargaData, setWargaData] = useState([]);

  // ⚡ Bump this version to force-reset all localStorage on next load
  const DATA_VERSION = 'v5';

  // Load from local storage
  useEffect(() => {
    try {
      // Version check — if version mismatch, clear all data and reseed
      const storedVersion = localStorage.getItem('sd_data_version');
      if (storedVersion !== DATA_VERSION) {
        localStorage.clear();
        localStorage.setItem('sd_data_version', DATA_VERSION);
      }

      const storedUser   = localStorage.getItem('sd_currentUser');
      const storedSurats = localStorage.getItem('sd_surats');
      const storedProducts = localStorage.getItem('sd_products');
      const storedCart   = localStorage.getItem('sd_cart');
      const storedOrders = localStorage.getItem('sd_orders');
      const storedWarga  = localStorage.getItem('sd_warga');

      if (storedUser)   setCurrentUser(JSON.parse(storedUser));
      if (storedCart)   setCart(JSON.parse(storedCart));
      if (storedOrders) setOrders(JSON.parse(storedOrders));

      if (storedSurats) {
        setSurats(JSON.parse(storedSurats));
      } else {
        setSurats(DUMMY_SURATS);
        localStorage.setItem('sd_surats', JSON.stringify(DUMMY_SURATS));
      }

      if (storedWarga) {
        setWargaData(JSON.parse(storedWarga));
      } else {
        const dummyWarga = [
          { nik: '35070001', nama: 'Sutrisno',     rt: '01', rw: '01', status: 'Aktif', noHp: '081234567890' },
          { nik: '35070002', nama: 'Siti Aminah',  rt: '01', rw: '01', status: 'Aktif', noHp: '081234567891' },
          { nik: '35070003', nama: 'Budi Santoso', rt: '02', rw: '01', status: 'Aktif', noHp: '081234567892' },
          { nik: '35070004', nama: 'Abdul Kader',  rt: '02', rw: '01', status: 'Aktif', noHp: '081234567893' },
          { nik: '35070005', nama: 'Agus Pramono', rt: '03', rw: '02', status: 'Aktif', noHp: '081234567894' },
          { nik: '35070006', nama: 'Rini Yulianti',rt: '04', rw: '02', status: 'Aktif', noHp: '081234567895' },
          { nik: '35070007', nama: 'Dewi Kusuma',  rt: '01', rw: '02', status: 'Aktif', noHp: '081234567896' },
          { nik: '35070008', nama: 'Hendra Saputra',rt:'03', rw: '02', status: 'Aktif', noHp: '081234567897' },
        ];
        setWargaData(dummyWarga);
        localStorage.setItem('sd_warga', JSON.stringify(dummyWarga));
      }

      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts(DUMMY_PRODUCTS);
        localStorage.setItem('sd_products', JSON.stringify(DUMMY_PRODUCTS));
      }
    } catch (e) {
      console.error(e);
    }
    
    // Berikan waktu tunda loading agar animasi logo favicon tampil premium
    setTimeout(() => {
      setIsInitialized(true);
    }, 1800);
  }, []);

  // Sync to local storage when state changes
  useEffect(() => {
    if (isInitialized) localStorage.setItem('sd_currentUser', JSON.stringify(currentUser));
  }, [currentUser, isInitialized]);

  useEffect(() => {
    if (isInitialized) localStorage.setItem('sd_surats', JSON.stringify(surats));
  }, [surats, isInitialized]);

  useEffect(() => {
    if (isInitialized) localStorage.setItem('sd_products', JSON.stringify(products));
  }, [products, isInitialized]);

  useEffect(() => {
    if (isInitialized) localStorage.setItem('sd_cart', JSON.stringify(cart));
  }, [cart, isInitialized]);

  useEffect(() => {
    if (isInitialized) localStorage.setItem('sd_orders', JSON.stringify(orders));
  }, [orders, isInitialized]);

  useEffect(() => {
    if (isInitialized) localStorage.setItem('sd_warga', JSON.stringify(wargaData));
  }, [wargaData, isInitialized]);

  // Auth Functions
  const login = (role) => {
    const userRoleMap = {
      warga: { role: 'warga', name: 'Abdul Kader', nik: '3507123456789000' },
      rt: { role: 'rt', name: 'Bapak Sugeng (RT 01)', id: 'RT-01' },
      kades: { role: 'kades', name: 'Kepala Desa', id: 'KDS-1' },
      seller: { role: 'seller', name: 'Pak Budi UMKM', id: 'UMKM-1' },
      admin: { role: 'admin', name: 'Admin Sistem', id: 'ADM-1' }
    };
    setCurrentUser(userRoleMap[role] || null);
  };
  const logout = () => setCurrentUser(null);

  // Surat Functions
  const addSurat = (type, data) => {
    const idNum = Math.floor(Math.random() * 9000) + 1000;
    const newSurat = {
      id: `#SRT-${idNum}`,
      type,
      wargaName: currentUser?.name || 'Warga',
      wargaNik: currentUser?.nik || '3507XXX',
      status: 'menunggu_rt', // Flow: menunggu_rt -> menunggu_kades -> selesai
      data,
      date: new Date().toISOString()
    };
    setSurats(prev => [newSurat, ...prev]);
    return newSurat.id;
  };

  const updateSuratStatus = (id, newStatus, extraData = {}) => {
    setSurats(prev => prev.map(s => s.id === id ? { ...s, status: newStatus, ...extraData } : s));
  };

  const signSuratRT = (id) => {
    const rtMeta = {
      rtSigned: true,
      rtSignedBy: currentUser?.name || 'Ketua RT',
      rtSignedDate: new Date().toISOString(),
    };
    setSurats(prev => prev.map(s => s.id === id ? { ...s, status: 'menunggu_kades', ...rtMeta } : s));
  };

  const signSuratAdmin = (id) => {
    const adminMeta = {
      adminSigned: true,
      adminSignedBy: currentUser?.name || 'Admin / Kades',
      adminSignedDate: new Date().toISOString(),
    };
    setSurats(prev => prev.map(s => s.id === id ? { ...s, status: 'selesai', ...adminMeta } : s));
  };

  // Cart Functions
  const addToCart = (product, quantityToAdd = 1) => {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + quantityToAdd } : item);
      }
      return [...prev, { ...product, qty: quantityToAdd }];
    });
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id !== id));
  const clearCart = () => setCart([]);
  const updateQty = (id, qty) => setCart(prev => prev.map(i => i.id === id ? { ...i, qty } : i));

  // Order Functions
  const placeOrder = (paymentMethod) => {
    if (cart.length === 0) return null;
    let total = cart.reduce((sum, item) => sum + (item.harga * item.qty), 0);
    const orderId = `ORD-${Math.floor(Math.random() * 90000) + 10000}`;
    const newOrder = {
      id: orderId,
      items: cart,
      total,
      paymentMethod,
      status: paymentMethod === 'COD' ? 'menunggu_pengiriman' : 'dibayar',
      date: new Date().toISOString(),
      wargaName: currentUser?.name
    };
    
    // deduct stock
    const cartMap = {};
    cart.forEach(i => cartMap[i.id] = i.qty);
    setProducts(prev => prev.map(p => {
      if (cartMap[p.id]) {
        return { ...p, stock: Math.max(0, p.stock - cartMap[p.id]) };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return orderId;
  };

  // Warga CRUD Functions
  const addWarga = (warga) => {
    setWargaData(prev => [{ ...warga, noHp: warga.noHp || '-' }, ...prev]);
  };
  const updateWarga = (nik, updatedData) => {
    setWargaData(prev => prev.map(w => w.nik === nik ? { ...w, ...updatedData } : w));
  };
  const deleteWarga = (nik) => {
    setWargaData(prev => prev.filter(w => w.nik !== nik));
  };

  const contextValue = {
    isInitialized,
    currentUser, login, logout,
    surats, addSurat, updateSuratStatus, signSuratRT, signSuratAdmin,
    products, setProducts,
    cart, addToCart, removeFromCart, clearCart, updateQty,
    orders, placeOrder,
    wargaData, setWargaData, addWarga, updateWarga, deleteWarga
  };

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Sleek glowing blur shapes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-100/30 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-sky-100/20 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="flex flex-col items-center relative z-10 animate-in fade-in zoom-in duration-500">
          {/* Logo container with pulsing neon rings */}
          <div className="relative mb-6 flex items-center justify-center">
            {/* Spinning dashed outer boundary */}
            <div className="absolute w-28 h-28 border-2 border-dashed border-emerald-500/20 rounded-full animate-spin" style={{ animationDuration: '10s' }}></div>
            {/* Pulsing ring */}
            <div className="absolute w-24 h-24 border border-emerald-500/40 rounded-full animate-ping opacity-25"></div>
            
            {/* Logo Card */}
            <div className="relative bg-white p-5 rounded-[2.25rem] shadow-[0_20px_50px_rgba(16,185,129,0.08)] border border-slate-100/80 flex items-center justify-center w-20 h-20 transition-transform duration-300">
              <img 
                src="/favicon.png" 
                alt="SmartDesa Logo" 
                className="w-12 h-12 object-contain animate-bounce"
                style={{ animationDuration: '2.5s' }}
              />
            </div>
          </div>

          {/* Text Indicators */}
          <h3 className="text-slate-900 font-extrabold text-xl tracking-tight mb-2">SmartDesa Nusantara</h3>
          <p className="text-slate-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest flex items-center gap-2 mb-6 font-sans">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Sistem Digital Terintegrasi
          </p>

          {/* Clean Rounded Loading Capsule */}
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-emerald-50/60 border border-emerald-100/80 shadow-[0_4px_15px_rgba(16,185,129,0.04)]">
            <svg className="animate-spin h-3.5 w-3.5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-[10px] sm:text-xs font-bold text-emerald-700 tracking-wider uppercase font-mono">Memuat Sistem...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <SmartDesaContext.Provider value={contextValue}>
      {children}
    </SmartDesaContext.Provider>
  );
};
