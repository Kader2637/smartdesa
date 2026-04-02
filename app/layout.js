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
  metadataBase: new URL('https://smartdesanusantara.web.id'),
  title: {
    default: 'SmartDesa Nusantara - Era Baru Digitalisasi Desa',
    template: '%s | SmartDesa Nusantara'
  },
  description: 'Sistem Terintegrasi Layanan Warga, UMKM, dan Informasi Desa untuk mewujudkan Desa Digital yang mandiri.',
  keywords: ['Smart Desa', 'Desa Digital', 'Nusantara', 'Layanan Warga', 'UMKM Desa'],
  authors: [{ name: 'SmartDesa Nusantara' }],
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'SmartDesa Nusantara - Era Baru Digitalisasi Desa',
    description: 'Sistem Terintegrasi Layanan Warga, UMKM, dan Informasi Desa.',
    url: 'https://smartdesanusantara.web.id',
    siteName: 'SmartDesa Nusantara',
    images: [
      {
        url: '/favicon.png',
        width: 1200,
        height: 630,
        alt: 'SmartDesa Nusantara Logo',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SmartDesa Nusantara',
    description: 'Era Baru Digitalisasi Desa di Indonesia.',
    images: ['/favicon.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`scroll-smooth ${plusJakarta.variable}`}>
      <body className="font-sans text-slate-800 antialiased selection:bg-brand-500 selection:text-white relative">
        <Cursor />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
      </body>
    </html>
  );
}