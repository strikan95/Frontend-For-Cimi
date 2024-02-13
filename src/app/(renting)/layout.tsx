import React from 'react';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      <div className="py-10">
        <Header />
        <main>
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
