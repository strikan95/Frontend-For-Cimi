'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, User } from 'lucide-react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { useEffect } from 'react';

function MenuContentLoggedOut() {
  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Link href={'/api/auth/login'}>Register</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Login</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}

function MenuContentLoggedIn() {
  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={'/create-a-listing/1'}>Create a listing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Keyboard shortcuts</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>Email</DropdownMenuItem>
              <DropdownMenuItem>Message</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>More...</DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuItem>New Team</DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>GitHub</DropdownMenuItem>
      <DropdownMenuItem>Support</DropdownMenuItem>
      <DropdownMenuItem disabled>API</DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <Link href={'/api/auth/logout'}>Log out</Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}

export function AvatarMenu() {
  const { user, isLoading } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          className={`flex cursor-pointer items-center justify-center gap-2 rounded-lg border
            border-gray-300 p-1 shadow-md`}
        >
          <Menu />
          <Avatar>
            <AvatarImage
              src={!isLoading && user?.picture ? user.picture : undefined}
              alt={!isLoading && user?.name ? user.name : undefined}
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      {user ? <MenuContentLoggedIn /> : <MenuContentLoggedOut />}
    </DropdownMenu>
  );
}
