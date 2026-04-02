import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Cursor from '@/components/Cursor';

const plusJakarta = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta',
});

export const metadata = {
  title: 'DesaSmart - Era Baru Digitalisasi Desa',
  description: 'Sistem Terintegrasi Layanan Warga, UMKM, dan Informasi Desa',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`scroll-smooth ${plusJakarta.variable}`}>
      <body className="font-sans text-slate-800 antialiased selection:bg-brand-500 selection:text-white relative">
        <Cursor />
        <Navbar />
        {/* Main Content Rendering Area */}
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </body>
    </html>
  );
}
