'use client';

import React from 'react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PrettyLink } from '@/components/ui/link';
import { signIn, signOut, useSession } from 'next-auth/react';

function MainMenu() {
  const { data } = useSession();

  if (null == data?.user) {
    return (
      <>
        <button onClick={() => signIn()}>Sign in</button>
        <Link href={'/auth/register'}>Signup</Link>
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border
            border-gray-300 p-1 shadow-md`}
        >
          <Menu />
          <Avatar>
            <AvatarImage src={data.user.image || ''} alt={''} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-gray-200 p-1">
        <DropdownMenuItem asChild>
          <Link href={'/messenger'}>My Messages</Link>
        </DropdownMenuItem>
        {data.user.roles?.includes('ROLE_HOST') && (
          <>
            <DropdownMenuItem asChild>
              <Link href={'/hosting/listings'}>My Listings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={'/create-a-listing'}>Create a listing</Link>
            </DropdownMenuItem>
          </>
        )}
        <DropdownMenuItem asChild>
          <Link href={'/profile'}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'#'} onClick={() => signOut()}>
            Log out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={
        'sticky right-0 top-0 z-30 border-b-2 border-gray-300 bg-[#EAEAEA]'
      }
    >
      <div className={'md:mx-auto md:w-full md:max-w-[1400px] md:px-4'}>
        <div className={`flex h-16 items-center justify-between px-8 py-2`}>
          <Link className={'text-2xl font-bold'} href={'/'}>
            Cimi
          </Link>
          <div className={'flex w-full items-center justify-end gap-6'}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const { data } = useSession();

  return (
    <Header>
      <MainMenu />
    </Header>
  );
}
