"use client";

import { useState } from 'react';

export default function KelolaUserPage() {
    const [activeTab, setActiveTab] = useState('all');
    const [showAddModal, setShowAddModal] = useState(false);
    const [editMode, setEditMode] = useState(false);

    const [formData, setFormData] = useState({ id: null, name: '', nik: '', phone: '', role: 'warga', address: '' });

    const [users, setUsers] = useState([
        { id: 1, name: 'Budi Santoso', nik: '3573012345670001', phone: '081234567890', role: 'warga', status: 'active', address: 'RT 01 / RW 02 Dusun Krajan', avatar: 'https://ui-avatars.com/api/?name=Budi+Santoso&background=f1f5f9&color=64748b' },
        { id: 2, name: 'Siti Aminah', nik: '3573012345670002', phone: '085678901234', role: 'warga', status: 'active', address: 'RT 03 / RW 01 Dusun Krajan', avatar: 'https://ui-avatars.com/api/?name=Siti+Aminah&background=f1f5f9&color=64748b' },
        { id: 3, name: 'Keripik Tempe Bu Ninik', nik: '3573012345670003', phone: '082233445566', role: 'umkm', status: 'active', address: 'Perumahan Asri Blok C-2', avatar: 'https://ui-avatars.com/api/?name=Keripik+Bu+Ninik&background=fff7ed&color=ea580c' },
        { id: 4, name: 'Bengkel Motor Jaya', nik: '3573012345670004', phone: '081998877665', role: 'umkm', status: 'pending', address: 'Jl. Raya Tunjungtirto No. 45', avatar: 'https://ui-avatars.com/api/?name=Bengkel+Jaya&background=fff7ed&color=ea580c' },
        { id: 5, name: 'Joko Anwar', nik: '3573012345670005', phone: '087766554433', role: 'warga', status: 'inactive', address: 'RT 05 / RW 03 Dusun Sukamaju', avatar: 'https://ui-avatars.com/api/?name=Joko+Anwar&background=f1f5f9&color=64748b' },
        { id: 6, name: 'Warung Kopi Cak Man', nik: '3573012345670006', phone: '081211223344', role: 'umkm', status: 'pending', address: 'Pertigaan Pasar Desa', avatar: 'https://ui-avatars.com/api/?name=Warung+Cak+Man&background=fff7ed&color=ea580c' },
    ]);

    const filteredUsers = users.filter(u => {
        if (activeTab === 'all') return true;
        if (activeTab === 'pending') return u.status === 'pending';
        return u.role === activeTab;
    });

    const pendingCount = users.filter(u => u.status === 'pending').length;

    const toggleStatus = (id) => {
        setUsers(users.map(u => {
            if (u.id === id) {
                return { ...u, status: u.status === 'active' ? 'inactive' : 'active' };
            }
            return u;
        }));
    };

    const verifyUser = (id) => {
        if (confirm('Verifikasi UMKM ini? Akun akan menjadi aktif dan bisa berjualan di Marketplace.')) {
            setUsers(users.map(u => u.id === id ? { ...u, status: 'active' } : u));
        }
    };

    const deleteUser = (id) => {
        if (confirm('Apakah Anda yakin ingin menghapus pengguna ini secara permanen?')) {
            setUsers(users.filter(u => u.id !== id));
        }
    };

    const openEditModal = (user) => {
        setEditMode(true);
        setFormData(user);
        setShowAddModal(true);
    };

    const openCreateModal = () => {
        setEditMode(false);
        setFormData({ id: null, name: '', nik: '', phone: '', role: 'warga', address: '' });
        setShowAddModal(true);
    };

    const saveUser = (e) => {
        e.preventDefault();
        
        let bg = formData.role === 'umkm' ? 'fff7ed' : 'f1f5f9';
        let color = formData.role === 'umkm' ? 'ea580c' : '64748b';
        let avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=${bg}&color=${color}`;

        if (editMode) {
            setUsers(users.map(u => u.id === formData.id ? { ...formData, avatar: avatarUrl } : u));
        } else {
            let newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
            setUsers([{ ...formData, id: newId, status: 'active', avatar: avatarUrl }, ...users]);
        }

        setShowAddModal(false);
        setFormData({ id: null, name: '', nik: '', phone: '', role: 'warga', address: '' });
        setEditMode(false);
    };

    return (
        <div className="space-y-6 fade-in min-h-[80vh]">
            <style jsx>{`
                .toggle-checkbox:checked { right: 0; border-color: #10B981; }
                .toggle-checkbox:checked + .toggle-label { background-color: #10B981; }
            `}</style>
            
            <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Manajemen Pengguna</h2>
                    <p className="text-slate-500 text-sm mt-1">Kelola data warga, setujui pendaftaran UMKM, dan atur hak akses sistem.</p>
                </div>
                <button 
                    onClick={openCreateModal}
                    className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition flex items-center justify-center gap-2 whitespace-nowrap"
                >
                    <i className="fas fa-user-plus"></i> Tambah Pengguna
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0"><i className="fas fa-users"></i></div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Total Warga</p>
                        <p className="text-xl font-extrabold text-slate-800">1,245</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition">
                    <div className="w-12 h-12 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center text-xl shrink-0"><i className="fas fa-store"></i></div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Total UMKM</p>
                        <p className="text-xl font-extrabold text-slate-800">84</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition">
                    <div className="w-12 h-12 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center text-xl shrink-0"><i className="fas fa-hourglass-half"></i></div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Menunggu Verif</p>
                        <p className="text-xl font-extrabold text-slate-800">{pendingCount}</p>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-emerald-200 transition">
                    <div className="w-12 h-12 rounded-xl bg-red-50 text-red-600 flex items-center justify-center text-xl shrink-0"><i className="fas fa-user-lock"></i></div>
                    <div>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Akun Dibekukan</p>
                        <p className="text-xl font-extrabold text-slate-800">{users.filter(u => u.status === 'inactive').length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-white p-2 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-2 mb-6">
                <button onClick={() => setActiveTab('all')} className={`px-4 py-2 rounded-lg text-sm transition ${activeTab === 'all' ? 'bg-slate-800 text-white font-bold shadow-sm' : 'text-slate-500 hover:bg-slate-50'}`}>Semua</button>
                <button onClick={() => setActiveTab('warga')} className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${activeTab === 'warga' ? 'bg-blue-100 text-blue-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}><i className="fas fa-user"></i> Warga</button>
                <button onClick={() => setActiveTab('umkm')} className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${activeTab === 'umkm' ? 'bg-orange-100 text-orange-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}><i className="fas fa-store"></i> UMKM / Penjual</button>
                <button onClick={() => setActiveTab('pending')} className={`px-4 py-2 rounded-lg text-sm transition flex items-center gap-2 ${activeTab === 'pending' ? 'bg-yellow-100 text-yellow-700 font-bold' : 'text-slate-500 hover:bg-slate-50'}`}>
                    <i className="fas fa-exclamation-circle"></i> Butuh Verifikasi
                    {pendingCount > 0 && <span className="bg-yellow-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow-sm">{pendingCount}</span>}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse whitespace-nowrap">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-[11px] uppercase tracking-wider">
                                <th className="p-4 font-extrabold">Profil Pengguna</th>
                                <th className="p-4 font-extrabold">NIK / Kontak</th>
                                <th className="p-4 font-extrabold">Peran (Role)</th>
                                <th className="p-4 font-extrabold text-center">Status</th>
                                <th className="p-4 font-extrabold text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 text-sm">
                            {filteredUsers.map(user => (
                                <tr key={user.id} className="hover:bg-slate-50/70 transition">
                                    <td className="p-4">
                                        <div className="flex items-center gap-3">
                                            <img src={user.avatar} className="w-10 h-10 rounded-full object-cover bg-slate-200 shadow-sm" alt="Avatar"/>
                                            <div>
                                                <p className="font-bold text-slate-800">{user.name}</p>
                                                <p className="text-[11px] font-medium text-slate-500 py-0.5">{user.address}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <p className="text-slate-700 font-mono text-xs font-bold mb-1"><i className="far fa-id-card text-slate-400 mr-2"></i>{user.nik}</p>
                                        <p className="text-xs text-emerald-600 font-medium"><i className="fab fa-whatsapp text-emerald-500 mr-2"></i>{user.phone}</p>
                                    </td>
                                    <td className="p-4">
                                        {user.role === 'warga' && <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold border border-blue-100"><i className="fas fa-user mr-1"></i> Warga</span>}
                                        {user.role === 'umkm' && <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-lg text-xs font-bold border border-orange-100"><i className="fas fa-store mr-1"></i> UMKM</span>}
                                    </td>
                                    <td className="p-4 text-center">
                                        {user.status === 'active' && <span className="text-emerald-500 font-bold text-xs"><i className="fas fa-circle-check mr-1"></i> Aktif</span>}
                                        {user.status === 'inactive' && <span className="text-red-500 font-bold text-xs"><i className="fas fa-ban mr-1"></i> Dibekukan</span>}
                                        {user.status === 'pending' && <span className="text-yellow-600 font-bold text-xs"><i className="fas fa-clock mr-1"></i> Menunggu</span>}
                                    </td>
                                    <td className="p-4 w-40">
                                        <div className="flex items-center justify-center gap-3">
                                            {user.status === 'pending' ? (
                                                <button onClick={() => verifyUser(user.id)} className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-200 transition">
                                                    Verifikasi
                                                </button>
                                            ) : (
                                                <label className="flex items-center cursor-pointer" title="Aktifkan / Nonaktifkan Akun">
                                                    <div className="relative">
                                                        <input type="checkbox" className="sr-only toggle-checkbox" checked={user.status === 'active'} onChange={() => toggleStatus(user.id)} />
                                                        <div className="block bg-slate-200 w-10 h-6 rounded-full transition toggle-label"></div>
                                                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition transform shadow-sm ${user.status === 'active' ? 'translate-x-4' : ''}`}></div>
                                                    </div>
                                                </label>
                                            )}
                                            
                                            <button onClick={() => openEditModal(user)} className="text-slate-400 hover:text-blue-600 p-2 transition rounded-xl hover:bg-blue-50" title="Edit Data"><i className="fas fa-edit"></i></button>
                                            <button onClick={() => deleteUser(user.id)} className="text-slate-400 hover:text-red-600 p-2 transition rounded-xl hover:bg-red-50" title="Hapus Akun"><i className="fas fa-trash-alt"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredUsers.length === 0 && (
                                <tr>
                                    <td colSpan="5" className="p-16 text-center text-slate-500 bg-slate-50/50">
                                        <i className="fas fa-folder-open text-4xl mb-3 text-slate-300"></i>
                                        <p className="font-medium text-sm">Tidak ada data pengguna yang ditemukan.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="p-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between text-sm text-slate-500 gap-4">
                    <p>Menampilkan <span className="font-bold text-slate-800">1</span> sampai <span className="font-bold text-slate-800">{Math.min(10, filteredUsers.length)}</span> dari <span className="font-bold text-slate-800">{filteredUsers.length}</span> pengguna</p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition font-bold text-xs uppercase" disabled>Sebelumnnya</button>
                        <button className="px-4 py-2 bg-emerald-50 text-emerald-600 font-bold border border-emerald-100 rounded-lg">1</button>
                        <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition">2</button>
                        <button className="px-4 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 transition font-bold text-xs uppercase">Selanjutnya</button>
                    </div>
                </div>
            </div>

            {/* Modal Tambah / Edit */}
            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" onClick={() => setShowAddModal(false)}></div>
                    <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 z-10 animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
                            <h3 className="text-xl font-bold text-slate-800">{editMode ? 'Edit Data Pengguna' : 'Tambah Pengguna Baru'}</h3>
                            <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-700 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center transition"><i className="fas fa-times"></i></button>
                        </div>

                        <form onSubmit={saveUser} className="space-y-5 text-sm">
                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Nama Lengkap / Nama Usaha <span className="text-red-500">*</span></label>
                                <input 
                                    type="text" 
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    required 
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition" 
                                    placeholder="Masukkan nama..."
                                />
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block font-bold text-slate-700 mb-2">NIK <span className="text-red-500">*</span></label>
                                    <input 
                                        type="text" 
                                        value={formData.nik}
                                        onChange={(e) => setFormData({...formData, nik: e.target.value})}
                                        required 
                                        maxLength="16" 
                                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono text-xs transition" 
                                        placeholder="16 digit NIK"
                                    />
                                </div>
                                <div>
                                    <label className="block font-bold text-slate-700 mb-2">No. WhatsApp</label>
                                    <input 
                                        type="text" 
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                        className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition" 
                                        placeholder="0812..."
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Peran (Role) <span className="text-red-500">*</span></label>
                                <select 
                                    value={formData.role}
                                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white font-medium transition cursor-pointer"
                                >
                                    <option value="warga">Warga Biasa</option>
                                    <option value="umkm">UMKM / Penjual</option>
                                </select>
                            </div>
                            <div>
                                <label className="block font-bold text-slate-700 mb-2">Alamat Domisili</label>
                                <textarea 
                                    value={formData.address}
                                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    rows="3" 
                                    className="w-full border border-slate-300 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition" 
                                    placeholder="Alamat lengkap beserta RT/RW..."
                                ></textarea>
                            </div>

                            <div className="pt-2 flex justify-end gap-3 mt-8">
                                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition">Batal</button>
                                <button type="submit" className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:bg-emerald-700 transition flex items-center gap-2">
                                    <i className="fas fa-save"></i> Simpan Pengguna
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
