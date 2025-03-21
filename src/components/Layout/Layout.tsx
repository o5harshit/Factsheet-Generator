
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <Header />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer />
      <Toaster />
      <Sonner position="top-right" closeButton />
    </div>
  );
};

export default Layout;
