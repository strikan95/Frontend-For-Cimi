import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { cn } from '@/lib/utils';
import { FilterProvider } from '@/lib/filter/useFilter';
import React from 'react';
import { Toaster } from '@/components/ui/toaster';
import ChatContextProvider from '@/lib/chat/ChatProvider';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <UserProvider>
        <FilterProvider>
          <body className={cn(inter.className, 'bg-gray-100 antialiased')}>
            <ChatContextProvider>
              {children}
              <Toaster />
            </ChatContextProvider>
          </body>
        </FilterProvider>
      </UserProvider>
    </html>
  );
}
