import React from 'react';
import { HostNavbar } from '@/components/Navigation';

function Layout({ children }: { children: React.ReactNode[] }) {
  return (
    <div className={'bg-[#EAEAEA]'}>
      <div className={'w-full'}>
        {/* Nav */}
        <HostNavbar />

        <div className={'px-4 md:mx-auto md:w-full md:max-w-[1400px]'}>
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
