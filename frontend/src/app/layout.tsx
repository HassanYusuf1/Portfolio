// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Roboto_Mono } from 'next/font/google';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollToTop from '@/components/ui/ScrollToTop';

// Font declarations
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hassan Yusuf | Programvareutvikler & Profesjonell Idrettsutøver',
  description: 'Personlig portefølje for Hassan Yusuf, utvikler av moderne webløsninger med React, Next.js og ASP.NET Core.',
  keywords: ['Hassan Yusuf', 'web utvikling', 'portfolio', 'React', 'Next.js', 'ASP.NET Core', 'frontend', 'backend', 'fullstack'],
  authors: [{ name: 'Hassan Yusuf' }],
  creator: 'Hassan Yusuf',
  openGraph: {
    type: 'website',
    locale: 'nb_NO',
    url: 'https://hassanyusuf.com',
    siteName: 'Hassan Yusuf Portfolio',
    title: 'Hassan Yusuf | Programvareutvikler & Profesjonell Idrettsutøver',
    description: 'Personlig portefølje for Hassan Yusuf, utvikler av moderne webløsninger med React, Next.js og ASP.NET Core.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hassan Yusuf Portfolio'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hassan Yusuf | Programvareutvikler & Profesjonell Idrettsutøver',
    description: 'Personlig portefølje for Hassan Yusuf, utvikler av moderne webløsninger med React, Next.js og ASP.NET Core.',
    images: ['/images/og-image.jpg'],
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html 
      lang="no" 
      className={`${montserrat.variable} ${robotoMono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <CustomCursor />
        {children}
        <ScrollToTop />
      </body>
    </html>
  );
}