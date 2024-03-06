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
import { getSession } from '@auth0/nextjs-auth0';

async function MainMenu() {
  const session = await getSession();
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
          <Avatar>
            <AvatarImage src={user?.picture} alt={''} />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-gray-200 p-1">
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
export function Navbar() {
  return (
    <div
      className={
        'sticky right-0 top-0 z-50 border-b-2 border-gray-300 bg-[#EAEAEA]'
      }
    >
      <div className={'md:mx-auto md:w-full md:max-w-[1400px] md:px-4'}>
        <div className={`flex h-16 items-center justify-between px-8 py-2`}>
          <h1 className={'text-2xl font-bold'}>Cimi</h1>
          <div className={'flex items-center gap-6'}>
            <MainMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
