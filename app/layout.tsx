import type React from 'react';
import type { Metadata } from 'next';
import { Inter, Geist_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { ScrollToTop } from '@/components/scroll-to-top';
import './globals.css';

const _inter = Inter({ subsets: ['latin'] });
const _geistMono = Geist_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'mycurrency - Buy & Sell Foreign Currency at Best Rates',
  description:
    "India's leading forex marketplace. Buy foreign currency, send money abroad, and get forex cards at the best exchange rates with doorstep delivery.",
  generator: '',
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
