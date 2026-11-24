import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import ClientProviders from '@/components/ClientProviders';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin', 'devanagari'],
  variable: '--font-poppins-var',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mahatma Phule Krishi Vidyapeeth, Rahuri | म.फु.कृ.वि. राहुरी',
  description: 'Official Portal of Mahatma Phule Krishi Vidyapeeth (MPKV), Rahuri, Ahilyanagar',
  icons: {
    icon: [
      { url: '/media/logos/Logo.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/media/logos/Logo.png',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mr" className={`font-scale-md ${poppins.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&subset=devanagari,latin&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`min-h-screen flex flex-col bg-[#faf9f6] text-slate-800 antialiased font-sans ${poppins.className}`} suppressHydrationWarning>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
