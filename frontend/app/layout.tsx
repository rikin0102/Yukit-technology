import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Providers } from '@/components/common/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import GlobalScrollBackground from '@/components/animations/GlobalScrollBackground';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  title: 'Yukti Technology | Software, AI & Startup Solutions',
  description: 'Yukti Technology architects world-class software development, AI solutions, web & mobile applications, and startup product suites with cutting-edge engineering.',
  icons: {
    icon: '/favicon.ico',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#F8FAFC] font-sans text-[#334155] antialiased flex flex-col selection:bg-[#FF7A00]/20 selection:text-[#FF7A00] relative">
        <Providers>
          {/* Global AI & Software Scroll-Animated Background */}
          <GlobalScrollBackground />
          <Header />
          <main className="flex-grow pt-20 relative z-10">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
