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
import { UserProfile, useUser } from '@auth0/nextjs-auth0/client';
import { ApiProfile } from '@/lib/cimi/types/profile.types';

function MainMenu() {
  const session = useUser();
  const user: (UserProfile & ApiProfile) | undefined =
    session?.user as UserProfile & ApiProfile;

  if (null == session?.user) {
    return <Link href={'/api/auth/login'}>Sign in</Link>;
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
            <AvatarImage src={user?.picture || ''} alt={''} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-gray-200 p-1">
        <DropdownMenuItem asChild>
          <Link href={'/watchlist'}>Watchlist</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/messenger'}>My Messages</Link>
        </DropdownMenuItem>
        {user.roles.includes('ROLE_HOST') && (
          <DropdownMenuItem asChild>
            <Link href={'/hosting'}>Switch to Hosting</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem asChild>
          <Link href={'/profile'}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/api/auth/logout'}>Log out</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function HostMainMenu() {
  const session = useUser();
  const user = session?.user;

  if (null == session?.user) {
    return <Link href={'/api/auth/login'}>Sign in</Link>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border
            border-gray-300 p-1 shadow-md`}
        >
          <Menu />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-gray-200 p-1">
        <DropdownMenuItem asChild>
          <Link href={'/hosting'}>Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/hosting/listings'}>Manage Listings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/messenger'}>Inbox</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/profile'}>Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/api/auth/logout'}>Log out</Link>
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

export function HostNavbar() {
  return (
    <div
      className={
        'sticky right-0 top-0 z-50 border-b-2 border-gray-300 bg-[#EAEAEA]'
      }
    >
      <div className={'md:mx-auto md:w-full md:max-w-[1400px] md:px-4'}>
        <div className={`grid grid-cols-5 items-center px-8 py-2`}>
          <Link
            className={'order-1 col-span-3 text-2xl font-bold md:col-span-1'}
            href={'/'}
          >
            Cimi
          </Link>
          <div
            className={`order-2 col-span-2 justify-self-end md:order-3 md:col-span-1
              md:justify-self-center`}
          >
            <HostMainMenu />
          </div>
          <div
            className={`order-3 col-span-5 flex flex-wrap gap-4 justify-self-center py-4 md:order-2
              md:col-span-3`}
          >
            <PrettyLink href={'/hosting'}>Dashboard</PrettyLink>
            <PrettyLink href={'/hosting/listings'}>My Listings</PrettyLink>
            <PrettyLink href={'/messenger'}>Inbox</PrettyLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  return (
    <Header>
      <MainMenu />
    </Header>
  );
}
