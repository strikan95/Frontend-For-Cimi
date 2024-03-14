import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import AvailabilityManager from '@/app/(site)/hosting/_components/property-manager/AvailabilityManager';

type Props = {
  id: number;
};

function PropertyListItemMenu({ id }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className={`h-8 w-8 cursor-pointer text-center`}>
          <p className={'text-2xl font-bold'}>...</p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 border-gray-200 p-1">
        <DropdownMenuItem asChild>
          <Link href={'/hosting'}>View Listing</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <AvailabilityManager />
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/hosting/inbox'}>View Calendar</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/profile'}>Archive</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/api/auth/logout'}>Delete</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default PropertyListItemMenu;
