import { repositoryName } from '@/prismicio';
import { PrismicPreview } from '@prismicio/next';
import localFont from 'next/font/local';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import './globals.css';

const urbanist = localFont({
  src: '../../public/fonts/Urbanist-VariableFont.woff2',
  weight: '100 900',
  display: 'swap',
  variable: '--font-urbanist',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={urbanist.variable}>
      <body className="relative min-h-screen bg-slate-900 text-slate-100">
        <Header />
        <main>{children}</main>
        <Footer />
        <div className="background-gradient absolute inset-0 -z-50 min-h-screen" />
        <div className="pointer-events-none absolute inset-0 -z-40 h-full bg-[url('/noisetexture.jpg')] opacity-20 mix-blend-soft-light" />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
