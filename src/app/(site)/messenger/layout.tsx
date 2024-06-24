import React from 'react';
import { HostNavbar, Navbar } from '@/components/Navigation';

function Layout({ children }: { children: React.ReactNode[] }) {
  return (
    <div className={'overflow-hidden bg-[#EAEAEA]'}>
      <div className={'h-fit w-full'}>
        {/* Nav */}
        <Navbar />

        <div className={'px-4 md:mx-auto md:w-full md:max-w-[1400px]'}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
