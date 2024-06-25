import React from 'react';
import { Navbar } from '@/components/Navigation';

function Layout({ children }: { children: React.ReactNode[] }) {
  return (
    <div className={'bg-[#EAEAEA]'}>
      <div className={'w-full'}>
        {/* Nav */}
        <Navbar />

        <div className={'px-4 pb-16 md:mx-auto md:w-full md:max-w-[1400px]'}>
          {children}
        </div>
        <div className={'bg-[#252a34] text-white'}>
          <div className={'md:mx-auto md:w-full md:max-w-[1400px] md:px-4'}>
            <div className={'flex h-16 items-center py-2'}>Footer</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
