import { repositoryName } from '@/prismicio';
import { PrismicPreview } from '@prismicio/next';
import localFont from 'next/font/local';

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
      <body className="bg-slate-900 text-slate-100">
        <Header />
        <main>{children}</main>
        <div className="min-h-screen" />
      </body>
      <PrismicPreview repositoryName={repositoryName} />
    </html>
  );
}
