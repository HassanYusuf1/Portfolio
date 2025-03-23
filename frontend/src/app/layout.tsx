// src/app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Montserrat, Roboto_Mono } from 'next/font/google';
import CustomCursor from '@/components/ui/CustomCursor';

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
  title: 'Hassan Yusuf | Programmvareutvikler & Profesjonell Idrettsutøver',
  description: 'Personlig portefølje for Hassan Yusuf, utvikler av moderne webløsninger med React, Next.js og ASP.NET Core.',
  keywords: 'Hassan Yusuf, web utvikling, portfolio, React, Next.js, ASP.NET Core',
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
      </body>
    </html>
  );
}